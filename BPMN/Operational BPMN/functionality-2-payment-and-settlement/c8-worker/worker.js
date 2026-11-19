const { Camunda8 } = require('@camunda8/sdk');

const c8 = new Camunda8({
  ZEEBE_GRPC_ADDRESS: 'localhost:26500',
  CAMUNDA_SECURE_CONNECTION: false,
  ZEEBE_INSECURE_CONNECTION: true,
  CAMUNDA_AUTH_STRATEGY: 'NONE',
});
const zeebe = c8.getZeebeGrpcApiClient();

const TTL_MS = 5 * 60 * 1000; // a published message waits this long for its catch event

async function send(name, v, variables = {}) {
  console.log(`   message sent: ${name}  (orderRef ${v.orderRef})`);
  await zeebe.publishMessage({
    name,
    correlationKey: String(v.orderRef),
    variables: { orderRef: v.orderRef, ...variables },
    timeToLive: TTL_MS,
  });
}

function worker(type, handler) {
  zeebe.createWorker({
    taskType: type,
    taskHandler: async (job) => {
      const v = job.variables;
      console.log(`[${type}]  order ${v.orderRef}  scenario ${v.scenario}`);
      try {
        const out = (await handler(v)) || {};
        return job.complete(out);
      } catch (err) {
        console.error(`   FAILED: ${err.message}`);
        return job.fail({ errorMessage: err.message, retries: 0 });
      }
    },
  });
}

// ---------- Payment process ----------
worker('check-order-reference', async (v) => ({ alreadyProcessed: v.scenario === 'duplicate' }));
worker('return-previous-result', async () => ({}));

worker('send-payment-request', async (v) => {
  const attempts = v.attempts || 0;
  const outage = v.outageRetries || 0;
  let paymentStatus = 'APPROVED';
  switch (v.scenario) {
    case 'declined': paymentStatus = 'DECLINED'; break;
    case 'declined-then-ok': paymentStatus = attempts < 1 ? 'DECLINED' : 'APPROVED'; break;
    case 'unavailable': paymentStatus = 'UNAVAILABLE'; break;
    case 'unavailable-twice': paymentStatus = outage < 2 ? 'UNAVAILABLE' : 'APPROVED'; break;
    default: paymentStatus = 'APPROVED';
  }
  console.log(`   gateway answers: ${paymentStatus}  (attempts ${attempts}, outageRetries ${outage})`);
  return { paymentStatus };
});

worker('deduct-stock', async (v) => ({ stockOk: v.scenario !== 'outofstock' }));
worker('void-payment', async () => ({}));
worker('mark-order-confirmed', async () => ({}));
worker('set-payment-pending', async () => ({}));
worker('set-canceled', async () => ({}));
worker('set-payment-failed', async () => ({}));

// customer notices (Payment pool -> Customer pool)
worker('issue-receipt', async (v) => { await send('receipt-issued', v); });
worker('inform-customer-retry', async (v) => { await send('payment-declined-retry', v); });
worker('inform-payment-failed', async (v) => { await send('payment-failed-notice', v); });
worker('inform-item-unavailable', async (v) => { await send('item-unavailable-notice', v); });

// message end event at the end of the Payment pool -> starts Settlement
worker('request-settlement', async (v) => {
  await send('settlement-requested', v, {
    itemSubtotal: v.itemSubtotal,
    deliveryTotal: v.deliveryTotal,
    commission: v.commission,
    producerDue: v.producerDue,
    customerTotal: v.customerTotal,
  });
});

// ---------- Customer process ----------
worker('send-payment-details', async (v) => {
  await send('payment-requested', v, {
    items: v.items,
    deliveryFee: v.deliveryFee,
    commissionRate: v.commissionRate,
    producers: v.producers,
    scenario: v.scenario,
  });
});
worker('send-new-payment-details', async (v) => { await send('new-payment-info', v); });
worker('send-retry-request', async (v) => { await send('customer-retries-payment', v); });

// ---------- Settlement process ----------
worker('record-settlement-amounts', async () => ({}));
worker('notify-producers', async () => ({}));

console.log('Workers are running. Leave this window open. Press Ctrl+C to stop.');
