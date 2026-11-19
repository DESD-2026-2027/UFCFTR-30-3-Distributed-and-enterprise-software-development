# End-to-End Traceability Matrix — Use Case 2

**Module:** UFCFTR-30-3 Distributed and Enterprise Software Development (Task 1)  
**Use Case:** Use Case 2 – Customer Multi-Vendor Order, Checkout and Payment  
**Chain:** `i* SD/SR (D1–D21)` → `Functional Scope (SC-1..SC-9)` → `Strategic BPMN (StratFinal.bpmn)` → `Operational BPMNs (F1 & F2)` → `Camunda 8 Implementation` → `Task 2`

---

## 1. Actor & Pool Alignment

| i\* Actor (SD / SR) | Scope Role (RACI) | Strategic (`StratFinal.bpmn`) | Operational F1 (`Basket-checkout-rebuilt.bpmn`) | Operational F2 (`payment-and-settlement (1) (1).bpmn`) | Boundary Note |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Customer** | Customer | `Participant_Customer_BB` (Blackbox) | `Participant_0la15as` (`Process_078f3ih`, Executable) | `Participant_087i48m` (`customer-payment`, Executable) | Expanded in F1 & F2 for Camunda Forms |
| **Marketplace** | Order / Inventory / Finance Services | `Participant_Marketplace` | `Participant_1mlpheh` (`Process_0e7opzs`, Executable) | `Participant_Main` (`payment-and-settlement`) & `Participant_1rg7np6` (Settlement) | Split into bounded services for Task 2 |
| **Payment service** | Payment Gateway | `Participant_077zaes` (Blackbox) | `Participant_Payment` (Blackbox — F2 hand-off) | `Participant_PaymentService` (Blackbox — sandbox) | External sandbox gateway (`D13`, `D14`, `D20`, `D21`) |
| **Producer** | Producers | `Participant_0pqihqw` (Blackbox) | Data-driven (`fulfilmentOptions`, `producerOrders`) | `Participant_Producers` (Blackbox) | Notified after Confirmation Boundary (`D15`, `D16`) |
| *(Fulfilment)* | Logistics | `Participant_Logistics` (Stage 1 & Stage 2) | Pre-checkout options via `fulfilmentOptions` (`D12`) | Settlement recorded in `Process_1222pet` | Physical fulfilment (`D7`, `D8`, `D18`, `D19`) deferred to Task 2 |

---

## 2. Master End-to-End Traceability Matrix (`D1`–`D21` & `SC-1`–`SC-9`)

| Scope Ref | i\* SD Dependencies & SR Rationale | Strategic BPMN (`StratFinal.bpmn`) | Operational BPMN (F1 / F2) | Camunda Implementation (Workers / Forms / Scripts) | Key Variables |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **SC-1** Multi-vendor basket, single checkout | **D5** *Seamless checkout*, **D9** *Order placed*, **D19** *Orders*<br>**SR:** *Check out a multi-producer basket*, *Run multi-vendor checkout* | `Start_Market_Order`, `Task_CheckStock` | **F1:** `StartEvent_1`, `Activity_1po4dxd`, `Event_1kgrb3p` | Worker `cust-submitbasket` | `orderRef`, `customerId`, `cartItems`, `fulfilmentOptions` |
| **SC-2** Stock check & basket amendment | **D1** *Basket accepted (stock confirmed)*, **D11** *Current stock levels*<br>**SR:** *Verify stock for each item*, *Amend basket if items are unavailable* | `Task_CheckStock`, `GW_StockConfirmed`, `DataObjRef_Basket` | **F1:** `Activity_0ltbqzc`, `Gateway_0jnzon5`, `Activity_08a5mis`, `Activity_0hsk9tx`, `Activity_1b538ry`, `Event_1rz5idz` | Workers `market-checkstock`, `market-notifyshortage`, `cust-submitamendedcart`; Form `amend-cart-form` | `stockStatus`, `shortageItems`, `cartItems` |
| **SC-8** Delivery vs collection per producer | **D2** *Delivery/collection known*, **D12** *Delivery/collection options*<br>**SR:** *Read producer fulfilment options*, *Choose delivery or collection* | `Task_SelectFulfilment`, Logistics `Task_Identify` / `Task_Options` | **F1:** `Gateway_0sca150`, `Activity_0hgo6c2`, `Activity_0wdccu0`, `Activity_1iotub3`, `Event_0yhtaxv` | Workers `market-requestchoice`, `cust-submitchoice`; Form `fulfilment-choice-form` | `fulfilmentOptions` (`offersDelivery`, `offersCollection`, `fulfilmentMethod`, `deliveryFee`) |
| **SC-3** Split basket into N producer orders + review | **D3** *Order split by producer*, **D9** *Order placed*<br>**SR:** *Split order into producer sub-orders*, *Review and confirm order*, *Clear supplier information* | `Task_SelectFulfilment`, `DataObjRef_Summary`, `GW_OrderConfirmed` | **F1:** `Activity_02otoo8` (Multi-Instance), `Activity_1fvlqhg`, `Activity_08g6kv2`, `Activity_1wxxtu9`, `Event_1teav3h` | Workers `market-createproducerorder`, `market-sendsummary`, `cust-confirmorder`; Form `review-confirm-order-form` | `producerOrders`, `itemsTotal`, `deliveryTotal`, `orderTotal`, `orderConfirmed` |
| **SC-9** Prevent duplicate orders & payments | **D14** *Payment request with order reference*<br>**SR:** *Check order reference (ignore duplicates)*, *Traceable records* | `Task_CheckStock`, `Task_PaySelect` | **F1:** `StartEvent_1`, `Activity_0flbx5k`, `Activity_04qtz5g`<br>**F2:** `Check`, `GwDup`, `RetPrev`, `EndDup` | FEEL `orderRef` generator; `messageId` in `market-paymentrequested`; Workers `check-order-reference`, `return-previous-result` | `orderRef`, `alreadyProcessed` |
| **SC-4** 5% commission on items only (delivery 100% to producer) | **D16** *Transparent audit trail*<br>**SR:** *Calculate the 5% commission automatically*, *Calculate subtotal, commission and producer dues*, *Viable business* | `Task_PaySelect` | **F1:** `Activity_04qtz5g` passes `producers` & `commissionRate` (pence)<br>**F2:** `Calc` script | Worker `market-paymentrequested`; FEEL script `Calc` | `commissionRate` (`0.05`), `producers`, `itemSubtotal`, `deliveryFee`, `commission`, `producerDue` |
| **SC-5** Declined payment retry (max 3 → `PAYMENT_FAILED`) | **D10** *Payment details*, **D13** *Payment authorised*, **D21** *Payment result*<br>**SR:** *Retry declined payment up to 3 times*, *Re-enter payment details after a decline*, *Revenue protected* | `Task_PaySelect`, `GW_Market_Confirmed`, `Activity_14h3lmb` | **F2:** `GwRes` (`DECLINED`) → `IncAtt` → `GwAtt` (`attempts < 3` → `Activity_07p5zi5` → `CRetry` → `Send`; else `SetFailed` → `Activity_170e7dv` → `EndFail`) | Workers `send-payment-request`, `inform-customer-retry`, `set-payment-failed`, `inform-payment-failed`; Form `customer-retry-payment` | `paymentStatus`, `attempts` |
| **SC-6** Outage / 503 retry (3 × 30s → `PAYMENT_PENDING` 24h) | **D20** *Payment service available*<br>**SR:** *Retry outage, then hold order as PAYMENT_PENDING*, *Revenue protected*, *Seamless checkout* | `Task_PaySelect`, `GW_Market_Confirmed` | **F2:** `GwRes` (`Unavailable`) → `IncOut` → `GwRetries` (`outageRetries <= 3` → `Wait` `PT30S` → `Send`; else `Activity_0ilcv6z` → `GwEvt`: `Hold` `PT24H` → `Activity_1pqw9il` → `EndCancel` or `MsgRetry`) | Workers `set-payment-pending`, `set-canceled`, `send-retry-request`; Timers `PT30S`, `PT24H` | `outageRetries`, `orderRef` |
| **SC-7** Confirmation Boundary: stock deduction, receipt & producer notification | **D4** *Order confirmed*, **D15** *Notified for their own orders*, **D16** *Transparent audit trail*, **D17** *Little technical effort*<br>**SR:** *Deduct stock after payment approval*, *Mark order CONFIRMED and send receipt*, *Record settlement amounts per order reference*, *Notify producers of their order shares* | `Activity_0ylt8yi`, `Task_ReleaseOrder`, `DataObjRef_OrderRecord`, Logistics `Activity_0etbqaw` | **F2:** `Deduct` → `Gateway_0ikljwa` → `Confirm` → `Receipt` → `Event_1ca0udy` → `Process_1222pet` (`SetStart` → `Record` → `Notify` → `Event_030vq3x`) | Workers `deduct-stock`, `void-payment`, `mark-order-confirmed`, `issue-receipt`, `request-settlement`, `record-settlement-amounts`, `notify-producers` | `stockOk`, `orderRef`, `producers` |

---

## 3. F1 → F2 Hand-Off Contract

| From → To | Message | Correlation / Idempotency | Payload (Integer Pence) |
| :--- | :--- | :--- | :--- |
| F1 `Activity_04qtz5g` (`market-paymentrequested`) → F2 `Start` | `payment-requested` | `orderRef` + `messageId: payment-requested-${orderRef}` | `orderRef`, `producers` (`producerId`, `itemSubtotal`, `deliveryFee`), `items`, `deliveryFee`, `orderTotal`, `commissionRate`, `customerId` |
| F2 `Event_1ca0udy` (`request-settlement`) → Settlement `SetStart` | `settlement-requested` | `orderRef` | Confirmed order & settlement dues per producer |

---

## 4. Exceptions, Softgoals & LESP Mapping (MO2)

| LESP / Softgoal Area | i\* Softgoal / Dependency | Model & Implementation Control |
| :--- | :--- | :--- |
| **Data privacy & security (UK GDPR / PCI-DSS)** | **D6** *Secure payment and personal data*, *Regulatory compliance* | Sandbox payment gateway (`Participant_PaymentService`) isolates card handling; no real personal/card data stored in Marketplace variables |
| **Post-payment stock race (Consumer Rights Act 2015)** | **D1** *Basket accepted*, **D4** *Order confirmed* | `Gateway_0ikljwa` (`stockOk = false`) triggers `void-payment` + `inform-item-unavailable` so customers are never charged for unavailable goods |
| **Financial accuracy & auditability (Ethical / Professional)** | **D16** *Transparent audit trail*, *Traceable records*, *Viable business* | Integer-pence arithmetic prevents rounding drift; `review-confirm-order-form` separates per-producer products & delivery before confirmation; `Record` logs settlement per `orderRef` |
| **Duplicate charging prevention (Professional)** | **D14** *Payment request with order reference*, *Regulatory compliance* | Unique `orderRef`, idempotent `messageId`, and F2 `check-order-reference` / `GwDup` |
| **Checkout timeouts & outage resilience (Social / Usability)** | **D5** *Seamless checkout*, **D20** *Payment service available*, **D17** *Little technical effort* | Three `PT15M` F1 timers notify customers cleanly on inactivity; F2 handles outages via 3 × `PT30S` retries + `PT24H` retry hold |

---

## 5. Scope Refinements & Task 2 Integration Readiness

* **Deferred to Task 2 (`D7`, `D8`, `D18`, `D19`):** Physical fulfilment (`Task_Prepare`, `Task_Deliver`, `Catch_Market_Delivered` in `StratFinal.bpmn`) — including *Order fulfilled* (`D7`), *Reliable supply* (`D8`), and *Adequate lead time / 48h notice* (`D18`) — integrates downstream of F2's `Event_030vq3x` (*Settlement Confirmed*).
* **Sprint 1 → Sprint 2/3 Refinements:**
  * Order splitting (`Activity_02otoo8`) runs before `review-confirm-order-form` so customers inspect exact per-producer product and delivery totals prior to confirmation.
  * Open Questions resolved: post-payment stock shortage voids payment (`Activity_0ech7b5`), and the `PT24H` hold deducts no stock until payment succeeds.
  * F2 outage handling uses an explicit `GwRes` (`Unavailable`) branch rather than an attached error boundary event (same retry/hold behaviour).
* **Service & Alignment Next Steps:**
  * Swap `DEFAULT_STOCK_CATALOG` and in-memory caches in `workers.js` for real Inventory/Order microservices in Task 2.
  * Align F2's `Calc` script to iterate per producer in integer pence (matching `SC-4` and F1's `producers` payload) and clarify F2's `Start` trigger (`payment-requested` from F1 vs `Flow_1h698aw` from `customer-payment`).
