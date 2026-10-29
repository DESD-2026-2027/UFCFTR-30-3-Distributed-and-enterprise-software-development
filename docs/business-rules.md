# Business Rules — Use Case 2: Customer Multi-Vendor Order, Checkout and Payment

**Owner:** Fares | **Team:** DESD Group 41 — Bristol Regional Food Network | **Sprint:** 1 (design), with sandbox prototype for later sprints

## Scope and authoritative project decisions

These rules follow `docs/functional-scope-proposal.md` in the team's supplied repository. The strategic BPMN is a design diagram: Camunda execution is scheduled for Sprints 2–3. GBP is used throughout. A simulated payment gateway must not handle live money.

| ID | Business rule | Acceptance criterion |
|---|---|---|
| BR-01 | Compute marketplace commission per producer order as **5% of that producer's items subtotal**, excluding delivery fees. | `commission = round_half_up(item_subtotal × 0.05, 2)`; the delivery fee is not commissionable. |
| BR-02 | Split a customer order into one producer-specific sub-order per producer before settlement calculation. | Each producer sub-order contains only its own items and shipping choice. |
| BR-03 | Customer pays the aggregated item and delivery charges **without adding the commission on top**; the marketplace share is taken from producer proceeds. | For each producer, `producer_due = item_subtotal − commission + delivery_fee`; `customer_total = Σ(item_subtotal + delivery_fee)`. |
| BR-04 | Payment declines permit the customer to retry a maximum of **three payment attempts**. | On the third decline, status `PAYMENT_FAILED`; preserve the basket and inform the customer. |
| BR-05 | Gateway timeout or HTTP 503 enters an outage retry path, with up to **three retries** and a **30-second interval** between retries. | If still unavailable, mark order `PAYMENT_PENDING`; stock remains unchanged. |
| BR-06 | A `PAYMENT_PENDING` order can be retried within **24 hours**; after the hold expires it becomes `CANCELLED`. | No inventory reduction or producer notifications during pending or cancelled states. |
| BR-07 | Use a unique order reference/idempotency key; prevent multiple order or payment creation on duplicate confirmation. | Identical reference/payload returns the previous response, while conflicting payload is rejected. |
| BR-08 | Confirm order only after approved payment and successful atomic inventory deduction. | Stock is decremented atomically; producers receive notifications only after confirmation. |
| BR-09 | Keep financial amounts in decimal GBP, rounding monetary commissions to two decimal places. | No binary floating-point accounting; all monetary outputs display 2 decimal places. |
| BR-10 | Record settlement amounts but do not perform real producer-bank payouts or live payment collection. | Sandbox-only response; settlement report shows producer dues. |

## Worked multi-vendor example

| Producer | Items | Delivery | Commission (5% items) | Producer due |
|---|---:|---:|---:|---:|
| Farm A | £40.00 | £3.00 | £2.00 | £41.00 |
| Bakery B | £20.00 | £2.00 | £1.00 | £21.00 |
| **Total** | **£60.00** | **£5.00** | **£3.00** | **£62.00** |

Customer payment is **£65.00**; marketplace commission is **£3.00**, not an extra customer charge. This is consistent with the scope proposal's producer revenue split. Settlement amounts are records only.

## Checkout/payment decisions

1. Verify inventory and segregate producer orders. Review delivery/collection choices.
2. Calculate item subtotal, delivery charges, commission, producer dues and customer total.
3. Send payment request using the unique order reference to a sandbox gateway.
4. `APPROVED` → atomically deduct stock → mark `CONFIRMED` → notify producers and issue receipt.
5. `DECLINED` → offer customer retry (at most 3 total attempts); then `PAYMENT_FAILED` and retain basket.
6. `UNAVAILABLE` / `TIMEOUT` → retry up to 3 additional times with 30-second delays; then `PAYMENT_PENDING` with 24-hour retry window and no stock reduction; after expiry `CANCELLED`.

## Integration and modelling status

The team's current strategic model is `BPMN/Strategicbpmn.bpmn`, which already has a `PayementService` participant. The accompanying separate Camunda draft is a payment illustration, **not a replacement for the merged strategic BPMN**. The draft retains the three incoming-flow warnings at the user's request, and does not yet model every timeout, timer, stock and producer-notification path. The sandbox is deterministic and unit-testable; it does not implement deployed Camunda jobs, persistent payments, real stock updates or 30-second waiting. The operational BPMN and execution wiring belong to Sprints 2–3.

## Source

Team repository snapshot (main at commit `ca68cd8`, 28 October 2026), especially `README.md` and `docs/functional-scope-proposal.md`.
