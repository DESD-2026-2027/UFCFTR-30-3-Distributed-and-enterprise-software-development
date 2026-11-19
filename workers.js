/**
 * Camunda 8 / Zeebe Job Workers for Functionality 1 (Checkout up to payment request)
 * Matches: Functi_fixed (1).bpmn (Camunda Cloud 8.6)
 *
 * All monetary amounts in `producers` (`itemSubtotal`, `deliveryFee`), `orderTotal`,
 * and `deliveryFee` are integer pence (e.g. 1250 = £12.50).
 *
 * Setup:
 *   npm init -y && npm install @camunda8/sdk dotenv
 *   Configure Camunda 8 connection via environment variables (or .env):
 *     CAMUNDA_AUTH_STRATEGY=OAUTH | NONE (default: NONE for local Zeebe)
 *     ZEEBE_ADDRESS=localhost:26500
 *     (or CAMUNDA_ZEEBE_ADDRESS, CAMUNDA_CLIENT_ID, CAMUNDA_CLIENT_SECRET, etc.)
 *   Run:
 *     node workers.js
 */

try {
  require("dotenv").config();
} catch (_) {
  // dotenv is optional if environment variables are set directly
}

const { Camunda8 } = require("@camunda8/sdk");

const camunda = new Camunda8();
const zeebe = camunda.getZeebeGrpcApiClient();

/**
 * Fallback inventory catalog (used when cart items don't carry an explicit `availableQty`).
 * Replace with real database / inventory service lookups in production.
 */
const DEFAULT_STOCK_CATALOG = new Map([
  ["PROD-001", 20],
  ["PROD-002", 10],
  ["PROD-003", 5],
]);

/**
 * In-memory snapshot of original cart item & fulfilment option metadata keyed by `orderRef`
 * so `cust-submitamendedcart` and `cust-submitchoice` can restore fields (`producerId`,
 * `price`, `deliveryFee`, etc.) that Camunda Tasklist dynamiclist forms omit on submit.
 */
const cartItemMetadataCache = new Map();
const fulfilmentMetadataCache = new Map();

function cacheCartItems(orderRef, cartItems = []) {
  if (!orderRef || !Array.isArray(cartItems)) return;
  const existing = cartItemMetadataCache.get(orderRef) || { byKey: new Map(), byList: [] };
  const byList = [];
  for (const item of cartItems) {
    const entry = {
      productId: item.productId,
      producerId: item.producerId,
      producerName: item.producerName || item.Producer,
      price: item.price,
      productName: item.productName || item.Product || item.name,
      availableQuantity:
        item.availableQuantity !== undefined && item.availableQuantity !== null && item.availableQuantity !== ""
          ? Number(item.availableQuantity)
          : item.availableQty !== undefined && item.availableQty !== null && item.availableQty !== ""
            ? Number(item.availableQty)
            : undefined,
    };
    if (entry.producerId !== undefined || entry.price !== undefined) {
      byList.push(entry);
      for (const k of [item.productId, item.productName, item.Product, item.name]) {
        if (k) existing.byKey.set(k, entry);
      }
    }
  }
  if (byList.length > 0) {
    existing.byList = byList;
  }
  cartItemMetadataCache.set(orderRef, existing);
}

function cacheFulfilmentOptions(orderRef, fulfilmentOptions = []) {
  if (!orderRef || !Array.isArray(fulfilmentOptions)) return;
  const existing = fulfilmentMetadataCache.get(orderRef) || { byName: new Map(), byList: [] };
  const byList = [];
  for (const opt of fulfilmentOptions) {
    const entry = {
      producerId: opt.producerId,
      producerName: opt.producerName || opt.producerId,
      deliveryFee: normalizePence(opt.deliveryFee),
      offersDelivery: Boolean(opt.offersDelivery),
      offersCollection: Boolean(opt.offersCollection),
    };
    if (entry.producerId !== undefined) {
      byList.push(entry);
      if (entry.producerName) {
        existing.byName.set(entry.producerName, entry);
      }
    }
  }
  if (byList.length > 0) {
    existing.byList = byList;
  }
  fulfilmentMetadataCache.set(orderRef, existing);
}

function normalizePence(value) {
  const num = Number(value ?? 0);
  return Number.isFinite(num) ? Math.round(num) : 0;
}

/**
 * Helper to register a Zeebe send-task worker that publishes a BPMN message.
 */
function createMessageRelayWorker({
  taskType,
  messageName,
  correlateByOrderRef = true,
  idempotent = false,
  buildVariables,
}) {
  return zeebe.createWorker({
    taskType,
    taskHandler: async (job) => {
      const vars = job.variables || {};
      const orderRef = vars.orderRef;

      if (correlateByOrderRef && !orderRef) {
        return job.fail(`Missing orderRef for ${taskType}`);
      }

      const payload = buildVariables ? buildVariables(vars, job) : {};
      const msgRequest = {
        name: messageName,
        variables: payload,
        timeToLive: 60000,
      };

      if (correlateByOrderRef) {
        msgRequest.correlationKey = String(orderRef);
      }
      if (idempotent && orderRef) {
        msgRequest.messageId = `${messageName}-${orderRef}`;
      }

      await zeebe.publishMessage(msgRequest);
      console.log(`[${taskType}] Published "${messageName}" (orderRef=${orderRef || "N/A"})`);
      return job.complete(payload);
    },
  });
}

// ---------------------------------------------------------------------------
// Customer Process Workers (Process_Customer)
// ---------------------------------------------------------------------------

// Task_Cust_SubmitBasket -> Msg_Cust_Basket ("Basket submitted for checkout")
createMessageRelayWorker({
  taskType: "cust-submitbasket",
  messageName: "Basket submitted for checkout",
  correlateByOrderRef: false,
  buildVariables: (vars) => {
    const cartItems = Array.isArray(vars.cartItems) ? vars.cartItems : [];
    const fulfilmentOptions = Array.isArray(vars.fulfilmentOptions) ? vars.fulfilmentOptions : [];
    cacheCartItems(vars.orderRef, cartItems);
    cacheFulfilmentOptions(vars.orderRef, fulfilmentOptions);

    return {
      orderRef: vars.orderRef,
      cartItems,
      fulfilmentOptions,
      deliveryFee: normalizePence(vars.deliveryFee),
      commissionRate: vars.commissionRate ?? 0.05,
      customerId: vars.customerId ?? null,
    };
  },
});

// Task_Cust_SubmitAmendedCart -> Msg_Cart_Amended ("Amended cart submitted")
createMessageRelayWorker({
  taskType: "cust-submitamendedcart",
  messageName: "Amended cart submitted",
  correlateByOrderRef: true,
  buildVariables: (vars) => {
    const cached = cartItemMetadataCache.get(vars.orderRef);
    const rawItems = Array.isArray(vars.cartItems) ? vars.cartItems : [];

    // Restore productId, producerId, and price if omitted by amend-cart-form
    const cartItems = rawItems
      .map((item, idx) => {
        const key = item.productId || item.productName || item.Product || item.name;
        const prev = cached?.byKey.get(key) || cached?.byList[idx];
        return {
          ...prev,
          ...item,
          productId: item.productId ?? prev?.productId,
          producerId: item.producerId ?? prev?.producerId,
          producerName: item.producerName ?? item.Producer ?? prev?.producerName,
          productName: item.productName ?? item.Product ?? item.name ?? prev?.productName,
          price: normalizePence(item.price ?? prev?.price),
          availableQuantity:
            item.availableQuantity !== undefined && item.availableQuantity !== null && item.availableQuantity !== ""
              ? Number(item.availableQuantity)
              : prev?.availableQuantity,
          quantity: Number(item.quantity ?? 0),
        };
      })
      .filter((item) => item.quantity > 0);

    cacheCartItems(vars.orderRef, cartItems);
    return { cartItems };
  },
});

// Task_Cust_SubmitChoice -> Msg_Choice_Submitted ("Delivery or collection choice submitted")
createMessageRelayWorker({
  taskType: "cust-submitchoice",
  messageName: "Delivery or collection choice submitted",
  correlateByOrderRef: true,
  buildVariables: (vars) => {
    const cached = fulfilmentMetadataCache.get(vars.orderRef);
    const submitted = Array.isArray(vars.fulfilmentOptions) ? vars.fulfilmentOptions : [];

    // Restore producerId, deliveryFee, offersDelivery, offersCollection if stripped by dynamiclist
    const fulfilmentOptions = submitted.map((opt, idx) => {
      const prev = cached?.byName.get(opt.producerName) || cached?.byList[idx];
      return {
        ...prev,
        ...opt,
        producerId: opt.producerId ?? prev?.producerId,
        producerName: opt.producerName ?? prev?.producerName,
        deliveryFee: opt.deliveryFee !== undefined ? normalizePence(opt.deliveryFee) : (prev?.deliveryFee ?? 0),
        offersDelivery: opt.offersDelivery ?? prev?.offersDelivery ?? true,
        offersCollection: opt.offersCollection ?? prev?.offersCollection ?? false,
      };
    });

    return { fulfilmentOptions };
  },
});

// Task_Cust_ConfirmOrder -> Msg_Order_Confirmed ("Order confirmed by customer")
createMessageRelayWorker({
  taskType: "cust-confirmorder",
  messageName: "Order confirmed by customer",
  correlateByOrderRef: true,
  buildVariables: () => ({
    orderConfirmed: true,
  }),
});

// ---------------------------------------------------------------------------
// Marketplace Process Workers (Process_Marketplace)
// ---------------------------------------------------------------------------

// Task_Market_CheckStock
zeebe.createWorker({
  taskType: "market-checkstock",
  taskHandler: async (job) => {
    const vars = job.variables || {};
    const rawCartItems = Array.isArray(vars.cartItems) ? vars.cartItems : [];
    const fulfilmentOptions = Array.isArray(vars.fulfilmentOptions) ? vars.fulfilmentOptions : [];
    const producerNameById = new Map(
      fulfilmentOptions.map((opt) => [opt.producerId, opt.producerName || opt.producerId])
    );

    const shortageItems = [];
    const cartItems = rawCartItems.map((item) => {
      const requested = Number(item.quantity ?? 0);
      const itemId = item.productId || item.productName || item.name;
      const available =
        item.availableQuantity !== undefined && item.availableQuantity !== null && item.availableQuantity !== ""
          ? Number(item.availableQuantity)
          : item.availableQty !== undefined && item.availableQty !== null && item.availableQty !== ""
            ? Number(item.availableQty)
            : DEFAULT_STOCK_CATALOG.get(itemId) ?? requested;

      const productName = item.productName || item.Product || item.name || item.productId || "Item";
      const producerName =
        item.producerName || item.Producer || producerNameById.get(item.producerId) || item.producerId || "";

      if (requested > available) {
        shortageItems.push({
          producerId: item.producerId,
          producerName,
          productId: item.productId,
          productName,
          requestedQuantity: requested,
          availableQuantity: available,
          price: normalizePence(item.price),
        });
      }

      return {
        ...item,
        productName,
        producerName,
        availableQuantity: available,
        price: normalizePence(item.price),
      };
    });

    cacheCartItems(vars.orderRef, cartItems);

    // Drop producers from fulfilmentOptions if all their items were removed during Amend cart
    const activeProducerIds = new Set(cartItems.map((i) => i.producerId).filter(Boolean));
    const filteredFulfilmentOptions =
      activeProducerIds.size > 0
        ? fulfilmentOptions.filter((opt) => activeProducerIds.has(opt.producerId))
        : fulfilmentOptions;

    const stockStatus = shortageItems.length === 0 ? "ALL_AVAILABLE" : "INSUFFICIENT";
    console.log(
      `[market-checkstock] orderRef=${vars.orderRef} stockStatus=${stockStatus} shortages=${shortageItems.length}`
    );

    return job.complete({
      stockStatus,
      cartItems,
      shortageItems,
      fulfilmentOptions: filteredFulfilmentOptions,
    });
  },
});

// Task_Market_NotifyShortage -> Msg_Stock_Shortage ("Stock shortage notified")
createMessageRelayWorker({
  taskType: "market-notifyshortage",
  messageName: "Stock shortage notified",
  correlateByOrderRef: true,
  buildVariables: (vars) => ({
    cartItems: Array.isArray(vars.cartItems) ? vars.cartItems : [],
    shortageItems: Array.isArray(vars.shortageItems) ? vars.shortageItems : [],
  }),
});

// Task_Market_RequestChoice -> Msg_Choice_Request ("Delivery or collection choice requested")
createMessageRelayWorker({
  taskType: "market-requestchoice",
  messageName: "Delivery or collection choice requested",
  correlateByOrderRef: true,
  buildVariables: (vars) => {
    const fulfilmentOptions = Array.isArray(vars.fulfilmentOptions) ? vars.fulfilmentOptions : [];
    cacheFulfilmentOptions(vars.orderRef, fulfilmentOptions);
    return { fulfilmentOptions };
  },
});

// Task_Market_SplitOrder (multi-instance over fulfilmentOptions -> producerOrder)
zeebe.createWorker({
  taskType: "market-createproducerorder",
  taskHandler: async (job) => {
    const vars = job.variables || {};
    const producer = vars.producer || {};
    const cartItems = Array.isArray(vars.cartItems) ? vars.cartItems : [];

    const producerItems = cartItems.filter((item) =>
      producer.producerId
        ? item.producerId === producer.producerId
        : item.producerName === producer.producerName
    );
    const itemSubtotal = producerItems.reduce(
      (sum, item) => sum + normalizePence(item.price) * Number(item.quantity ?? 0),
      0
    );

    // Matches fulfilment-choice.form (`fulfilmentMethod`: "DELIVERY" | "COLLECTION")
    const fulfilmentMethod =
      producer.fulfilmentMethod ||
      (producer.offersDelivery ? "DELIVERY" : "COLLECTION");
    const isCollection = String(fulfilmentMethod).toUpperCase() === "COLLECTION";
    const deliveryFee = isCollection ? 0 : normalizePence(producer.deliveryFee);

    const producerName =
      producer.producerName ||
      producerItems[0]?.producerName ||
      producer.producerId;

    const producerOrder = {
      producerId: producer.producerId,
      producerName,
      fulfilmentMethod: isCollection ? "COLLECTION" : "DELIVERY",
      itemSubtotal,
      deliveryFee,
      // Formatted in pounds for review-confirm-order-form
      itemsPrice: (itemSubtotal / 100).toFixed(2),
      deliveryPrice: (deliveryFee / 100).toFixed(2),
      subtotal: ((itemSubtotal + deliveryFee) / 100).toFixed(2),
    };

    console.log(
      `[market-createproducerorder] orderRef=${vars.orderRef} producerId=${producer.producerId} (${fulfilmentMethod}) itemSubtotal=${itemSubtotal}p deliveryFee=${deliveryFee}p`
    );

    return job.complete({ producerOrder });
  },
});

// Task_Market_SendSummary -> Msg_Order_Summary ("Order summary ready for review")
zeebe.createWorker({
  taskType: "market-sendsummary",
  taskHandler: async (job) => {
    const vars = job.variables || {};
    const orderRef = vars.orderRef;
    if (!orderRef) {
      return job.fail("Missing orderRef for market-sendsummary");
    }

    const producerOrders = Array.isArray(vars.producerOrders) ? vars.producerOrders : [];
    const totalItemsPence = producerOrders.reduce(
      (sum, p) => sum + normalizePence(p.itemSubtotal),
      0
    );
    const totalDeliveryPence = producerOrders.reduce(
      (sum, p) => sum + normalizePence(p.deliveryFee),
      0
    );
    const totalPence = totalItemsPence + totalDeliveryPence;
    // Formatted in pounds for review-confirm-order-form
    const itemsTotalPounds = (totalItemsPence / 100).toFixed(2);
    const deliveryTotalPounds = (totalDeliveryPence / 100).toFixed(2);
    const orderTotalPounds = (totalPence / 100).toFixed(2);

    await zeebe.publishMessage({
      name: "Order summary ready for review",
      correlationKey: String(orderRef),
      variables: {
        producerOrders,
        itemsTotal: itemsTotalPounds,
        deliveryTotal: deliveryTotalPounds,
        orderTotal: orderTotalPounds,
      },
      timeToLive: 60000,
    });

    console.log(
      `[market-sendsummary] Published "Order summary ready for review" (orderRef=${orderRef}, items=£${itemsTotalPounds}, delivery=£${deliveryTotalPounds}, total=£${orderTotalPounds})`
    );
    return job.complete({ orderTotal: totalPence, deliveryFee: totalDeliveryPence });
  },
});

// Task_Market_NotifyTimeout -> Msg_Cust_Timeout ("Checkout timeout notification")
createMessageRelayWorker({
  taskType: "market-notifytimeout",
  messageName: "Checkout timeout notification",
  correlateByOrderRef: true,
  buildVariables: () => ({
    timedOut: true,
  }),
});

// Task_Market_RequestPayment -> Msg_Payment_Requested ("payment-requested")
// Starts Functionality 2 (payment-and-settlement and customer-payment)
createMessageRelayWorker({
  taskType: "market-paymentrequested",
  messageName: "payment-requested",
  correlateByOrderRef: false,
  idempotent: true,
  buildVariables: (vars) => ({
    orderRef: vars.orderRef,
    producers: Array.isArray(vars.producers) ? vars.producers : [],
    items: Array.isArray(vars.items) ? vars.items : [],
    deliveryFee: normalizePence(vars.deliveryFee),
    orderTotal: normalizePence(vars.orderTotal),
    commissionRate: vars.commissionRate ?? 0.05,
    customerId: vars.customerId ?? null,
  }),
});

console.log("Functionality 1 Zeebe workers started and polling...");

process.on("SIGINT", async () => {
  console.log("Shutting down Zeebe client...");
  await zeebe.close();
  process.exit(0);
});
