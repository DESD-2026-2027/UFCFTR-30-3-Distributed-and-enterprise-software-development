# Business Rules — Use Case 2: Multi-Vendor Checkout and Payment

**Project:** DESD Group 41 — Bristol Regional Food Network  
**Owner:** Fares | **Jira:** KAN-19 (confirm issue association before opening a PR)  
**Sprint:** 2 | **Status:** Revised against Functionality 2 BPMN; ready for review, not yet merged  
**Functional scope:** Functionality 1 — Multi-Vendor Basket Inventory Validation & Order Segregation; Functionality 2 — Resilient Payment Processing, Marketplace Settlement & Vendor Notification.

## 1. Purpose and authoritative references

This document states the business rules that govern basket validation, the checkout-to-payment hand-off, simulated payment execution, producer-level commission allocations, exception handling, and the point at which orders become confirmed. The principal source is Nour's `docs/functional-scope-proposal.md`; the team's supplied **strategic BPMN diagram** is used to trace the normal successful sequence. The Task 1/2 assessment brief requires traceability from strategic to operational BPMN and executable Camunda behaviour. The supplied operational `payment-and-settlement.bpmn` is now the **specific process reference** for Functionality 2. The rules below reflect Nour’s approved scope, while the traceability section distinguishes what is actually drawn in the BPMN from what remains an implementation or policy decision.

## 2. Business rules

| ID | Business rule | Owner / trace |
|---|---|---|
| BR-01 | A signed-in customer can submit one basket containing items from multiple producers for a single checkout. | Customer / Marketplace; Functionality 1 |
| BR-02 | Before payment, verify each basket item's available stock against its producer's current inventory. If any item is insufficient, inform the customer and allow basket amendment; do not proceed to payment with invalid quantities. | Inventory / Marketplace; Functionality 1 |
| BR-03 | Read each producer's supported fulfilment options (delivery, collection or both); where both are available, ask the customer to choose. Show the correct option for each producer's items. | Marketplace / Customer; Functionality 1 |
| BR-04 | Segregate the single customer basket into exactly one producer-specific sub-order per producer represented in it, containing only that producer's items. | Order Service; Functionality 1 |
| BR-05 | Present the combined order for customer review and confirmation before sending payment to the sandbox gateway. | Customer / Marketplace; scope confirmation boundary |
| BR-06 | Compute marketplace commission **separately for each producer sub-order** at **5% of that producer's item subtotal**. Do not charge commission on delivery fees. Delivery fees are allocated fully to the relevant producer. | Finance Service; Functionality 2 |
| BR-07 | The customer payment amount is the sum of item subtotals and delivery fees across the basket. Record each producer's amount owed as item subtotal minus marketplace commission plus that producer's delivery fee; no bank payout is executed. | Finance Service; Functionality 2 |
| BR-08 | Use an external simulated/sandbox Payment Service for checkout; do not process genuine cards, real payments or bank settlements. | Payment Gateway; scope constraints |
| BR-09 | On a payment **decline**, offer the customer another payment attempt, up to **three total customer attempts**. After the third decline, mark the order `PAYMENT_FAILED`, inform the customer and retain the basket. | Finance Service / Customer; Functionality 2 |
| BR-10 | For a payment-service **timeout or HTTP 503**, apply a technical attempt counter and retry **up to three times** with a **30-second timer between retries**. This technical outage path is distinct from a customer-decline attempt. | Finance Service / Payment Gateway; Functionality 2 |
| BR-11 | If all permitted outage retries fail, set the order to `PAYMENT_PENDING`; deduct no inventory and allow the customer to return to retry within **24 hours**. If unresolved after that window, mark it `CANCELLED`. | Finance Service / Order Service; Functionality 2 |
| BR-12 | Prevent duplicate checkout/payment execution: disable the confirm action after its first click, include a unique checkout/order reference with the payment request, and return the existing result on repeated submission of that reference instead of creating a second order or payment. | Marketplace / Payment Gateway; Functionality 2 |
| BR-13 | Only after payment success may the order become `CONFIRMED`, stock be deducted **atomically**, producer-specific orders be released, producer notifications be sent, and the customer receipt be generated. No stock deduction or producer notification occurs on decline, outage, or pending payment. The operational BPMN places a stock-deduction attempt immediately after payment approval and confirmation only after a successful deduction. | Inventory / Order Service; scope confirmation boundary |
| BR-14 | Calculate and record GBP values without floating-point rounding drift. Use integer pence or an equivalent exact decimal representation; consistently round allocations to penny precision. | Finance Service; scope risk mitigation |

### 2.1 Status transitions and outcome handling

| Trigger | Order status / action | Inventory | Producer notification |
|---|---|---|---|
| Basket incomplete, insufficient stock or unconfirmed review | Checkout remains unconfirmed; request customer correction | No permanent deduction | None |
| Sandbox payment approved | `CONFIRMED`; record order and allocation; release producer orders | Atomic deduction on confirmed success | Send once |
| Payment declined, attempts remain | Keep checkout unconfirmed; show payment retry form | No deduction | None |
| Third customer payment decline | `PAYMENT_FAILED`; retain basket, inform customer | No deduction | None |
| Payment-service timeout / 503 | Wait 30 seconds, retry within the technical retry limit; avoid assuming whether a timed-out charge succeeded | No deduction until success confirmed | None |
| All outage retries exhausted | `PAYMENT_PENDING` for up to 24 hours; allow customer to return | No deduction | None |
| Pending unresolved after 24 hours | `CANCELLED` | No deduction | None |
| Repeated submission with same reference | Return stored result without creating new payment or order | No second deduction | No duplicate notification |

**Important ambiguity:** Nour's scope says “up to 3 retries” for outage errors but does not unambiguously define whether the original gateway call counts toward that three. The operational BPMN must fix and test one interpretation. The three *customer decline attempts* are explicitly total attempts.

## 3. Commission and producer allocations (illustrative example)

| Producer | Item subtotal | Delivery fee | Commission (5% items) | Amount recorded as owed |
|---|---:|---:|---:|---:|
| Producer A | £40.00 | £3.00 | £2.00 | £41.00 |
| Producer B | £20.00 | £2.00 | £1.00 | £21.00 |
| **Total** | **£60.00** | **£5.00** | **£3.00** | **£62.00** |

Customer pays **£65.00** in the simulated checkout. Marketplace commission totals **£3.00** and producer amounts owed total **£62.00**. These are internal settlement records, **not vendor bank transfers**.

## 4. Traceability to `payment-and-settlement.bpmn` (Functionality 2)

The **uploaded operational BPMN** is the process reference for this revision. Its collaboration has **Payment**, **Payment Service (gateway)**, **Customer**, **Producers**, and a distinct **Settlement** process. The source is a BPMN design; the presence of elements does not itself establish a successful Camunda deployment or passing execution tests.

| Business rule | BPMN activity / event / decision | Observation |
|---|---|---|
| BR-06, BR-07 | `Calculate subtotal` (`Calc`); settlement task `Calculate commission and producer dues` (`Task_Calculate_Settlement`) | Commission/producer dues are calculated in the distinct Settlement process; exact 5% formula and delivery exclusion are specified by Nour’s scope, **not encoded in visible task names**. |
| BR-08 | `Send payment request to gateway` (`Send`); Payment Service participant; `Payment result` (`GwRes`) | Approved, Declined and Unavailable branches are explicitly labelled. |
| BR-09 | `Increase attempts` (`IncAtt`), `Attempts left?` (`GwAtt`), `Inform Customer to Retry`, `New Payment info received`, `PAYMENT FAILED, Keeps basket` | The decline branch explicitly separates customer retry from final payment failure; the numerical three-attempt rule comes from Nour’s scope (gateway conditions need executable validation). |
| BR-10 | `Increase outage retries` (`IncOut`), `Retries left?` (`GwRetries`), `Wait 30 seconds` (`Wait`) | The timer event explicitly has `PT30S`. Retry-count gateway implementation needs confirmation. |
| BR-11 | `set Payment Pending`, event-based gateway, `Customer retries within 24 hours` (`MsgRetry`), `24-hour hold expires` (`Hold`), `Set Canceled` | The timeout is explicitly `PT24H`; pending retries loop back to the gateway request. The BPMN shows a competing retry-message/timer branch. |
| BR-12 | `Check order reference` (`Check`), `Already processed?` (`GwDup`), `Return previous result` (`RetPrev`) | Duplicate detection is explicitly modelled. The UI confirm-button lock comes from scope, not this diagram. |
| BR-13 | Approved -> `Deduct stock` (`Deduct`) -> `Stock reduced?` -> `Mark order CONFIRMED` -> `Send receipt to Customer` | Success only confirms after the stock check. A separate `Item out of stock` branch goes to `Void Payment` and customer notification; voiding is represented but the actual integration/compensation is not verified. |
| BR-07, BR-13 | `Settlement requested` -> `Calculate commission and producer dues` -> `Notify producers` -> `Settlement Confirmed` | A separate settlement process models internal allocation and notification; the scope **excludes real bank payouts**. The settlement request follows the confirmed-order end event. |
| BR-01 to BR-05 | Interface from previously validated checkout | These Functionality 1 rules remain sourced from Nour's scope. The supplied Functionality 2 BPMN is not proof that Functionality 1 is implemented. |

### 4.1 Model-to-policy distinctions

- **Three customer attempts:** The decline branch has a counter and limit check; maintain the scope's maximum of three total customer attempts. Do not confuse this with the outage retry counter.
- **Outage retries:** There is an explicit 30-second timer and retry check. Whether "three retries" counts the initial gateway attempt must be agreed and encoded consistently.
- **Pending state:** After technical retries are exhausted, payment becomes pending and either a retry request arrives or the 24-hour timer expires. No stock is deducted on that route.
- **Stock failure after payment:** The BPMN includes `Void Payment`. This is **not evidence that live refunds are implemented**. The agreed scope excludes post-payment refunds. Team review is required on whether sandbox voiding is an allowed compensation and what the confirmed status should be if it fails.
- **Settlement timing:** The operational BPMN launches a separate settlement path after order confirmation and receipt. Internal producer dues must reflect 5% of item subtotals, plus 100% of each producer's delivery fee. Producer bank transfers are excluded.
- **Technical completeness:** A BPMN label does not demonstrate that gateway conditions, scripts, connector jobs, message correlations, timers and error handlers run in Camunda. These should be tested independently.

### 4.2 Path-level acceptance scenarios

| Test case | Expected behaviour | Diagram basis |
|---|---|---|
| New unique order reference | Calculate subtotal, send sandbox payment request | `Check` -> `GwDup` -> `Calc` -> `Send` |
| Duplicate order reference | Return prior result; no additional charge | `GwDup` -> `RetPrev` -> `EndDup` |
| Approved and stock successfully deducted | Confirm once, send receipt, start settlement and producer notification | `GwRes` -> `Deduct` -> `Confirm` -> `Receipt` -> Settlement |
| Approved but stock deduction fails | Follow failure/void branch, notify customer; do not mark order confirmed | Stock gateway -> `Void Payment` -> item unavailable |
| Declined, attempts remain | Prompt customer to re-enter payment details | `IncAtt` -> `GwAtt` -> `Inform Customer to Retry` |
| Third decline | Mark `PAYMENT_FAILED`, keep basket, inform customer | `GwAtt` -> `SetFailed` -> customer notice |
| Gateway unavailable with technical retries remaining | Wait 30 seconds and resubmit using same order reference | `IncOut` -> `GwRetries` -> `Wait` -> `Send` |
| Gateway unavailable after limit | Mark `PAYMENT_PENDING`; await retry or 24-hour expiry | `GwRetries` -> `set Payment Pending` -> event-based gateway |
| Pending expiry | Mark order cancelled | `Hold` -> `Set Canceled` -> `EndCancel` |
| Pending customer retry before expiry | Re-enter payment request flow without duplicate processing | `MsgRetry` -> `Send` |

## 5. Scope exclusions and unresolved decisions

Not included: real-money transactions, actual producer bank payouts, real courier dispatch/tracking, refunds and cancellations after successful payment, account registration, promotions and producer product management.

**Team review required:**

1. Confirm exact counter semantics for the three outage retries (original attempt included or not) and how to reconcile an indeterminate timed-out payment with idempotency.
2. Nour's scope identifies a **10-minute soft inventory reservation** as a *proposed risk mitigation*, not an approved business rule; decide whether and how it coexists with the 24-hour pending state.
3. Agree whether the `Void Payment` sandbox compensation step in the operational BPMN is permitted under Nour’s no-post-payment-refunds boundary, and define the failure outcome if voiding fails.
4. Verify gateway decision conditions, correlation identifiers, and timer/message subscriptions by executing this supplied operational BPMN in the agreed Camunda environment.
5. Confirm that Jira `KAN-19` is the intended business-rules ticket; the older Faris PR #17 was titled `KAN-23`.

## 6. Acceptance checks

- Basket with products from N different producers produces N correctly segregated producer sub-orders and one overall customer checkout.
- Missing stock blocks payment and exposes an amendment path; producer-specific fulfilment choices are shown correctly.
- Every producer gets 5% commission on items only; delivery fees are excluded and retained for that producer; GBP totals reconcile exactly.
- Payment success yields exactly one confirmation, one atomic stock deduction and the correct producer notifications.
- Three consecutive customer declines yield `PAYMENT_FAILED` with the basket retained.
- Timeout/503 enters the 30-second technical retry route, then `PAYMENT_PENDING` and 24-hour cancellation path when exhausted; no stock is deducted while pending.
- Repeated confirm clicks or repeated payment requests bearing the same checkout reference never generate duplicate charges, orders, stock deductions or notifications.
- Camunda demonstration must eventually show both happy paths and applicable exception paths; this document alone does not establish implementation.

## 7. Sources and review state

1. Nour, `docs/functional-scope-proposal.md` — sections 2–8 (primary agreed functional scope; retrieved from the supplied GitHub repository ZIP).
2. Sadik / team, uploaded `payment-and-settlement.bpmn` — Functionality 2 operational BPMN; used for the concrete activity and error-path mapping. The strategic diagram is contextual only.
3. `UFCFTR-30-3 -First Sit - Task 1 2.pdf` — assessment brief, Task 1 operational BPMN and Camunda requirements and Sprint 2 criteria.
4. Fares, previous `docs/business-rules.md` — used as baseline, but revised to match Nour's approved scope.

**Review status:** Updated against the supplied operational `payment-and-settlement.bpmn` and Nour’s scope; awaiting teammate review of retry-limit implementation, stock-failure voiding, and executable conditions. SD/SR diagrams and Functionality 1 BPMN were not modified.
