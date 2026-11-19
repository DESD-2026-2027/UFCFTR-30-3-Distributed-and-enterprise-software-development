const { Camunda8 } = require('@camunda8/sdk');

const CUSTOMER_PROCESS_ID = 'customer-payment'; 

const c8 = new Camunda8({
  ZEEBE_GRPC_ADDRESS: 'localhost:26500',
  CAMUNDA_SECURE_CONNECTION: false,
  ZEEBE_INSECURE_CONNECTION: true,
  CAMUNDA_AUTH_STRATEGY: 'NONE',
});
const zeebe = c8.getZeebeGrpcApiClient();

async function main() {
  const mode = process.argv[2] || 'happy';

  if (mode === 'return') {
    const orderRef = process.argv[3];
    if (!orderRef) throw new Error('Usage: node start.js return ORD-123456');
    await zeebe.publishMessage({
      name: 'customer-returns-to-retry',
      correlationKey: orderRef,
      variables: { orderRef },
      timeToLive: 5 * 60 * 1000,
    });
    console.log(`Customer returned for order ${orderRef}`);
    return;
  }

  const orderRef = `ORD-${Date.now()}`;
  const res = await zeebe.createProcessInstance({
    bpmnProcessId: CUSTOMER_PROCESS_ID,
    variables: {
      orderRef,
      scenario: mode,
      items: [
        { producerId: 'farm-a', price: 40, quantity: 1 },
        { producerId: 'bakery-b', price: 20, quantity: 1 },
      ],
      deliveryFee: 5,
      commissionRate: 0.05,
      // one entry per producer, amounts in pence
      producers: [
        { producerId: 'farm-a', itemSubtotal: 4000, deliveryFee: 300 },
        { producerId: 'bakery-b', itemSubtotal: 2000, deliveryFee: 200 },
      ],
    },
  });
  console.log(`Started ${mode} run.  Order reference: ${orderRef}`);
  console.log(`Process instance key: ${res.processInstanceKey}`);
}

main()
  .then(() => setTimeout(() => process.exit(0), 500))
  .catch((e) => { console.error('Could not start:', e.message); process.exit(1); });
