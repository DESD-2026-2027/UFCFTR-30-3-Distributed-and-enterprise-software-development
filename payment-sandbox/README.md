# Use Case 2 simulated payment sandbox

Run `python -m unittest -v` inside this folder. Requires Python 3.10+; no external packages.

For example, use `PaymentSandbox().pay("order-123", [ProducerOrder("farm", Decimal("40.00"), Decimal("3.00"))])`.

The simulator is intentionally **not** a deployed Camunda service. It computes revenue allocations, returns forced approval/decline/outage responses and applies in-memory idempotency. Application orchestration must implement declined-payment limits, outage delays, pending expiry, transactional inventory and producer notifications. A real payment gateway is out of scope.
