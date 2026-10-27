# Stakeholder Analysis – Bristol Regional Food Network Marketplace

**Module:** UFCFTR-30-3 Distributed and Enterprise Software Development – Task 1
**Use case:** Use Case 2 – Customer Multi-Vendor Order, Checkout and Payment
**Owner:** Rayyan Tahir (stakeholders and backlog)
**Feeds into:** product backlog (Jira, key `KAN`), strategic BPMN, i* SD/SR models (Sprint 2)

---

## Status at a glance

| # | Section | Needed for | Status |
|---|---|---|---|
| 1 | [Scope and method](#1-scope-and-method) | Sprint 1 | Done |
| 2 | [Stakeholder identification](#2-stakeholder-identification) | Sprint 1 | Done |
| 3 | [Derived requirements](#3-derived-requirements) | Sprint 1 (backlog) | Drafted; 15 questions in 3.6 open |
| 4 | [User stories](#4-user-stories) | Sprint 1 (`docs/product-backlog.md`) | **Do now** |
| 5 | [Prioritisation: power/interest grid](#5-prioritisation-powerinterest-grid) | Sprint 1 if time allows | Drafted |
| 6 | [Conflicts and tensions](#6-conflicts-and-tensions) | Sprint 2 (i* models) | Drafted |
| 7 | [Traceability matrix](#7-traceability-matrix) | Sprint 2 and 3 | Later |
| 8 | [LESP considerations](#8-lesp-considerations) | Sprint 3 | Later |
| 9 | [References](#9-references) | All | Ongoing |

---

## 1. Scope and method

**What is analysed.** The Bristol Regional Food Network digital marketplace. Stakeholders are identified across the whole enterprise (Layer 1) so the strategic BPMN and i* SD model cover the full system. Stakeholders involved in Use Case 2 are then analysed in depth (Layer 2) for the requirements, backlog, i* SR model, operational BPMN and Camunda implementation.

**Sources.**
- Bristol Regional Food Network case study (v2)
- Task 1 Use Cases (Use Case 2 is the one delivered)
- Functional Scope Proposal (`doc/functional-scope-proposal.md`)
- UFCFTR-30-3 Task 1 assessment brief
- Requirements Handling lecture (stakeholder groups, FR/NFR, user stories)

**Method.** Document analysis of the case study. Each stakeholder is classified as local (within the 20-mile network area) or virtual (online or indirect), and by relevance to Use Case 2: core, supporting, or out of scope.

**Limitation.** Stakeholders are inferred from documents, not interviewed. Assumptions are recorded as open questions in 2.3 and checked with the module team at stand-ups.

---

## 2. Stakeholder identification

### 2.1 Stakeholder register

| ID | Stakeholder | Wants | Cares about | Relies on | Local / Virtual | UC2 | Evidence |
|---|---|---|---|---|---|---|---|
| SH1 | Young professionals and families | Add products from several producers to one basket; basket accepted; know delivery or collection; order paid and confirmed | Convenient buying outside farm-shop hours; seamless checkout; clear supplier information; secure payment and data | Platform (stock check, confirmation); producers (supply); payment provider | Local | Core | Case study, Background, Customers; UC2 |
| SH2 | Community groups (schools, care facilities, voluntary organisations) | Add products from several producers to one basket; basket accepted; know delivery or collection; order paid and confirmed; local supply for catering | Reliable, consistent supply | Platform; producers for consistent supply | Local | Core | Case study, Background |
| SH3 | Independent restaurants and cafés | Add products from several producers to one basket; basket accepted; know delivery or collection; order paid and confirmed; many producers in one order | Low admin across many small suppliers | Platform to split the order by producer | Local | Core | Case study, Background; UC2 para 4 |
| SH4 | Low-tech producers (email/phone ordering) | Cut ~15 h/week of customer communication; notified of orders with at least 48 h notice; amount owed recorded | Little technical effort; transparent audit trail | Platform (notification, commission, orders released only once paid); customers for orders | Local | Core | Case study, Producers; UC2 |
| SH5 | Digitally basic producers (social media) | Manage orders despite limited technical expertise and resources; cut customer communication; notified of orders with at least 48 h notice; amount owed recorded | Little technical effort; transparent audit trail | Platform (notification, commission, orders released only once paid); customers for orders | Local | Core | Case study, Producers; UC2 |
| SH6 | Bristol Regional Food Network (owner) | Grow the network of 40 SMEs; 5% commission calculated automatically; one checkout for multi-vendor orders | Viable business; revenue protected if payment fails; compliance; traceable records | Producers (stock, fulfilment); customers (orders); payment provider; regulators' rules | Local | Core | Case study, Background and Core Functionality; UC2 |
| SH7 | Payment service provider (sandbox) | Authorise or decline each payment (success, decline from card issuer, or unavailable) | None stated | Platform for a payment request with a unique order reference | Virtual | Core | Case study disclaimer; UC2 |
| SH8 | Development team | Deliver within sprints using Camunda and sandbox payments only | None stated | Module team for scope sign-off | Local | Supporting | Assessment brief |

### 2.1.1 Stakeholder profiles

One profile per stakeholder in the register. Goals and softgoals are named directly in each profile so the i* models can reuse the wording. Influence and interest follow the grid in section 5. Where the sources are silent the profile says "Not stated" rather than guessing; items marked (inferred) are my reading of the case study.

#### SH1: Young professionals and families

| Field | Detail |
|---|---|
| **Who they are** | Local individual buyers who want to buy from regional producers outside farm-shop opening hours. |
| **Type** | Human, External |
| **Role in Use Case 2** | Builds a basket from one or several producers, amends it if stock is short, chooses delivery or collection, reviews and confirms the order, pays, retries if declined, and receives confirmation. |
| **Functionalities involved** | Both (F1 and F2) |
| **Current problems (pain points)** | Farm shops are only open at limited hours; buying from several producers means dealing with each one separately (inferred). |
| **Goals (things they want done)** | • Add products from several producers to one basket<br>• Have the basket accepted (stock confirmed)<br>• Know the delivery or collection arrangements<br>• Pay and receive order confirmation |
| **Softgoals (qualities they care about)** | • Convenient buying<br>• Seamless checkout<br>• Clear supplier information<br>• Secure payment and personal data |
| **Depends on** | The platform for the stock check and confirmation; producers for supply; the payment provider for authorisation. |
| **Others depend on them for** | Orders and payment (network owner, producers). |
| **Concerns and risks** | An item unavailable at checkout; payment declined or the payment service down; payment and personal data exposed. |
| **Influence / Interest** | Low, High → Keep informed |
| **Source** | CS Background, Customers; UC2 |
| **Used later in** | i* actor "Customer"; BPMN pool/lane "Customer" |

#### SH2: Community groups (schools, care facilities, voluntary organisations)

| Field | Detail |
|---|---|
| **Who they are** | Organisations that regularly source local food for catering. |
| **Type** | Organisation, External |
| **Role in Use Case 2** | Builds a basket, chooses delivery or collection, confirms the order, pays and receives confirmation. |
| **Functionalities involved** | Both (F1 and F2) |
| **Current problems (pain points)** | Not stated beyond the need for a dependable local supply. |
| **Goals (things they want done)** | • Add products from several producers to one basket<br>• Have the basket accepted (stock confirmed)<br>• Know the delivery or collection arrangements<br>• Pay and receive order confirmation<br>• Obtain local supply for catering |
| **Softgoals (qualities they care about)** | • Reliable, consistent supply<br>• Seamless checkout |
| **Depends on** | The platform; producers for consistent supply. |
| **Others depend on them for** | Orders and payment. |
| **Concerns and risks** | Whether they can pay by invoice rather than card (open question in 2.3); a supply failure affecting catering. |
| **Influence / Interest** | Low, High → Keep informed |
| **Source** | CS Background |
| **Used later in** | i* actor "Customer" (specialisation or same actor as SH1); BPMN lane "Customer" |

#### SH3: Independent restaurants and cafés

| Field | Detail |
|---|---|
| **Who they are** | Local food businesses that want to source from many small producers. |
| **Type** | Organisation, External |
| **Role in Use Case 2** | Multi-vendor checkout, relying on the platform to split one order across producers. |
| **Functionalities involved** | Both (F1 and F2) |
| **Current problems (pain points)** | Ordering from many small suppliers means a lot of administration. |
| **Goals (things they want done)** | • Add products from several producers to one basket<br>• Have the basket accepted (stock confirmed)<br>• Know the delivery or collection arrangements<br>• Pay and receive order confirmation<br>• Order from many producers in one order |
| **Softgoals (qualities they care about)** | • Low administration across many suppliers<br>• Seamless checkout |
| **Depends on** | The platform to split the order by producer. |
| **Others depend on them for** | Orders and payment; larger multi-vendor baskets. |
| **Concerns and risks** | Whether they can pay by invoice rather than card (open question in 2.3); a split order where one producer cannot fulfil its part. |
| **Influence / Interest** | Low, High → Keep informed |
| **Source** | CS Background; UC2 para 4 |
| **Used later in** | i* actor "Customer"; BPMN lane "Customer" |

#### SH4: Low-tech producers (email and phone ordering)

| Field | Detail |
|---|---|
| **Who they are** | Small producers in the network of 40 SMEs who currently take orders by email and phone. |
| **Type** | Human / Organisation, External |
| **Role in Use Case 2** | Supplies stock that is checked at checkout; is notified of their own order element after payment succeeds; has the amount owed recorded. |
| **Functionalities involved** | Both (F1 stock and fulfilment options; F2 notification and amount owed) |
| **Current problems (pain points)** | About 15 hours a week spent on customer communication; little technical capacity. |
| **Goals (things they want done)** | • Receive orders without manual customer communication<br>• Be notified with at least 48 hours' notice<br>• Have the amount owed recorded |
| **Softgoals (qualities they care about)** | • Little technical effort<br>• Transparent audit trail<br>• Adequate lead time |
| **Depends on** | The platform for notification, commission calculation and releasing orders only once paid; customers for orders. |
| **Others depend on them for** | Stock and fulfilment (customers, network owner). |
| **Concerns and risks** | Notification arrives by a channel they do not use (open question); less than 48 hours' notice (T1); commission reducing earnings (T2); no payout step in scope (Q1). |
| **Influence / Interest** | High, High → Manage closely |
| **Source** | CS Producers; UC2 |
| **Used later in** | i* actor "Producer"; BPMN pool/lane "Producer" |

#### SH5: Digitally basic producers (social media)

| Field | Detail |
|---|---|
| **Who they are** | Small producers in the network who sell mainly through social media. |
| **Type** | Human / Organisation, External |
| **Role in Use Case 2** | Supplies stock that is checked at checkout; is notified of their own order element after payment succeeds; has the amount owed recorded. |
| **Functionalities involved** | Both (F1 and F2) |
| **Current problems (pain points)** | Limited technical expertise and resources to manage orders. |
| **Goals (things they want done)** | • Receive orders without manual customer communication<br>• Be notified with at least 48 hours' notice<br>• Have the amount owed recorded<br>• Manage orders despite limited expertise and resources |
| **Softgoals (qualities they care about)** | • Little technical effort<br>• Transparent audit trail<br>• Adequate lead time |
| **Depends on** | The platform for notification, commission calculation and releasing orders only once paid; customers for orders. |
| **Others depend on them for** | Stock and fulfilment (customers, network owner). |
| **Concerns and risks** | Notification arrives by a channel they do not use (open question); less than 48 hours' notice (T1); commission reducing earnings (T2); no payout step in scope (Q1); less capacity to cope with a platform that assumes technical skill. |
| **Influence / Interest** | High, High → Manage closely |
| **Source** | CS Producers; UC2 |
| **Used later in** | i* actor "Producer" (same actor as SH4 unless the models need to distinguish them); BPMN pool/lane "Producer" |

#### SH6: Bristol Regional Food Network (owner)

| Field | Detail |
|---|---|
| **Who they are** | The organisation that runs the marketplace and the network of 40 SMEs within a 20-mile area. |
| **Type** | Organisation, Internal |
| **Role in Use Case 2** | Owns the checkout; takes a 5% commission on each producer order; needs revenue protected if payment fails. |
| **Functionalities involved** | Both (F1 order segregation; F2 commission and settlement records) |
| **Current problems (pain points)** | Not stated directly; the case study frames the need to grow the network and replace manual commission handling (inferred). |
| **Goals (things they want done)** | • Grow the network of 40 SMEs<br>• Calculate the 5% commission automatically<br>• Offer one checkout for multi-vendor orders |
| **Softgoals (qualities they care about)** | • Viable business<br>• Revenue protected<br>• Regulatory compliance<br>• Traceable records |
| **Depends on** | Producers for stock and fulfilment; customers for orders; the payment provider for authorisation; regulators' rules. |
| **Others depend on them for** | The marketplace itself and the rules it runs under (producers, customers). |
| **Concerns and risks** | Failed or pending payments losing revenue; non-compliance with data protection and financial regulations; traceability against data minimisation (T6). |
| **Influence / Interest** | High, High → Manage closely |
| **Source** | CS Background and Core Functionality; UC2 |
| **Used later in** | i* actor "Network Owner / Marketplace"; BPMN pool "Marketplace" |

#### SH7: Payment service provider (sandbox)

| Field | Detail |
|---|---|
| **Who they are** | An external, simulated payment service used for all payments. |
| **Type** | System, External |
| **Role in Use Case 2** | Authorises or declines each payment; may be unavailable (timeout or 503). |
| **Functionalities involved** | F2 |
| **Current problems (pain points)** | Not applicable (an external system); its failures are what the retry design handles. |
| **Goals (things they want done)** | • Authorise or decline each payment request |
| **Softgoals (qualities they care about)** | • Not stated |
| **Depends on** | The platform for a payment request with a unique order reference. |
| **Others depend on them for** | Payment authorisation (customers, network owner, order confirmation). |
| **Concerns and risks** | Timeouts and 503s; duplicate submissions of the same reference (FR14). |
| **Influence / Interest** | High, Low → Keep satisfied |
| **Source** | CS disclaimer; UC2 |
| **Used later in** | i* actor (dependee for "Payment authorised"); BPMN external pool "Payment Service" |

#### SH8: Development team

| Field | Detail |
|---|---|
| **Who they are** | The module team building the Camunda processes within the sprint plan. |
| **Type** | Human, Internal |
| **Role in Use Case 2** | Designs, implements and tests both functionalities using sandbox payments only. |
| **Functionalities involved** | Both (F1 and F2) |
| **Current problems (pain points)** | Not stated; constraints are fixed sprints, Camunda, and sandbox-only payments. |
| **Goals (things they want done)** | • Deliver both functionalities within the sprints |
| **Softgoals (qualities they care about)** | • Not stated |
| **Depends on** | The module team for scope sign-off. |
| **Others depend on them for** | The delivered system. |
| **Concerns and risks** | Unresolved questions Q1 to Q3 change what gets built; sign-off planned for Wed 28 Oct. |
| **Influence / Interest** | High, High → Manage closely (through the plan and stand-ups) |
| **Source** | Assessment brief |
| **Used later in** | Not an actor in the models; appears in planning only (proposed) |

### 2.2 Out-of-scope stakeholders

Identified from the case study and use cases but not analysed in depth, because they do not take part in Use Case 2. They remain visible in the strategic BPMN where relevant.

| Stakeholder | L / V | Why out of scope | Where it belongs |
|---|---|---|---|
| Organic certification body | Virtual | Verifies organic claims at product listing, before checkout | UC1 – product listing |
| Food safety authority (FSA / local environmental health) | Virtual | Involved only after a food-safety incident is reported | UC3 – quality incidents |
| Third-party courier service | Local delivery, virtual integration | Case study names no delivery provider; each producer offers delivery or collection (proposal) | Not modelled (design decision) |
| Marketplace administrator | Local | Role named only in UC3; UC2 has no administrator step and the proposal automates the payment exception path | UC3 – exceptions and incidents |
| Customer's card issuer | Virtual | Makes the decline decision but is reached only through the payment provider (SH7) | Represented by SH7 |
| HMRC | Virtual | Indirect: needs producer income records for tax reporting, but takes no part in checkout or payment | Represented by producers (SH4, SH5), whose audit trails support tax reporting |

### 2.3 Open questions

- [x] **Marketplace administrator:** resolved: moved out of the core set to 2.2 (UC3 stakeholder). UC2 never names the role and the proposal automates the whole payment exception path.
- [ ] **Tutor sign-off:** the two functionalities in the proposal still need agreement with the module team (planned Wed 28 Oct).
- [ ] **Regulators:** should the data protection regulator (ICO) and the financial services regulator (FCA) be modelled as stakeholders? The case study only says transactions must "comply with current data protection and financial services regulations" and names neither body. Alternative: treat them as regulatory constraints (requirements and Section 8) rather than actors.
- [ ] **Payment method:** do community groups and restaurants pay by invoice rather than card? The proposal only describes card payment through a sandbox gateway; assume card payment unless told otherwise (affects SH2, SH3).
- [x] **Who delivers?** Resolved: each producer offers delivery, collection or both, set in its profile (proposal, Functionality 1). No courier is modelled.
- [x] **Notification service:** resolved: our own component, the Producer Notification Dispatcher (proposal, Functionality 2).
- [x] **Second major functionality:** resolved: the proposal defines both (basket validation and order segregation; resilient payment, commission and vendor notification).

## 3. Derived requirements




### 3.1 Functional requirements

Customers = SH1, SH2, SH3. Producers = SH4, SH5. Network owner = SH6. Payment provider = SH7.


**Functionality 1: Multi-Vendor Basket Inventory Validation & Order Segregation**

| ID | Requirement | Stakeholders | Source | Priority (MoSCoW) |
|---|---|---|---|---|
| FR1 | When the customer proceeds to checkout, the system gathers every item in the basket. The basket may contain items from one producer or from several. | Customers | UC2 para 2; CS Customers (single-vendor and multi-vendor); Proposal F1 | TBC |
| FR2 | The system checks each basket item against the producer's current stock, in real time, for the quantity requested. | Customers, Producers | UC2 para 2; Proposal F1 | TBC |
| FR3 | If an item is unavailable or stock is insufficient, the system informs the customer and asks them to amend the basket (Customer Cart Amendment Form). | Customers | UC2 para 2; Proposal F1 | TBC |
| FR4 | The system identifies the producers involved in the basket. | Producers, Network owner | UC2 para 3; Proposal F1 | TBC |
| FR5 | For each producer involved, the system reads from the producer's profile whether that producer offers delivery, collection or both. | Customers, Producers | UC2 para 3; Proposal F1 (Fulfilment Options Service) | TBC |
| FR6 | Where a producer offers both delivery and collection, the customer chooses one (Delivery or Collection Selection Form). Where the producer offers one option only, that option applies and no form is shown. | Customers, Producers | Proposal F1 and section 3 diagram | TBC |
| FR7 | The system presents the order for review, showing each producer's responsibilities, the delivery arrangements and the collection procedures that apply. | Customers | UC2 para 3; CS Customers | TBC |
| FR8 | The customer confirms the purchase. Confirmation happens before the order is split and before payment is submitted. | Customers | UC2 para 3; Proposal section 3 diagram (contradicted by the proposal's F1 bullet list; see C1, Q14) | TBC |
| FR9 | After confirmation the system creates the overall marketplace order and separates it into producer-specific order elements. | Customers, Producers, Network owner | UC2 para 4; Proposal F1 (Order Segregation Engine) | TBC |

**Functionality 2: Resilient Payment Processing, Marketplace Settlement & Vendor Notification**

| ID | Requirement | Stakeholders | Source | Priority (MoSCoW) |
|---|---|---|---|---|
| FR10 | The system calculates the basket total and the amount attributable to each producer. | Producers, Network owner | UC2 para 7; Proposal F2 | TBC |
| FR11 | The system calculates the marketplace commission for each producer order, at the rate and on the base set in BR1. The proposal's diagram places this before payment is submitted; UC2 does not say when. | Network owner, Producers | UC2 para 7; CS Core Functionality; Proposal F2 and section 3 diagram | TBC |
| FR12 | The system records what each producer is owed. It does not transfer funds to producers. | Producers, Network owner | Proposal F2 (out of scope: payouts); conflicts with CS Core Functionality and CS Producers (see C3, Q1) | TBC |
| FR13 | The system collects the customer's payment details (Payment Entry Form) and submits the payment to a sandbox or simulated payment service.| Customers, Payment provider | UC2 para 5 and final para; Proposal F2. The sources do not say whether the checkout is one payment or one per producer (see Q9) | TBC |
| FR14 | Each checkout is given a unique order reference, which is sent with the payment request. If the same reference is submitted again, the system returns the existing result instead of creating a second order or payment. | Customers, Network owner | Proposal F2 | TBC |
| FR15 | If payment succeeds, the order status becomes `CONFIRMED`. | Customers | UC2 para 5; Proposal section 3 | TBC |
| FR16 | If payment is declined, the system informs the customer and offers a retry (Payment Declined - Retry Form), up to the attempt limit in BR2. At the limit the order becomes `PAYMENT_FAILED`, the customer is informed and the basket is kept.  | Customers, Payment provider | UC2 para 6 (retry, no limit given); Proposal F2 (sets the limit) | TBC |
| FR17 | If the payment service times out or returns a 503, the system follows a retry path with an attempt counter, within the retry limit and wait time in BR3, rather than terminating. | Customers, Payment provider | UC2 para 6; Proposal F2 | TBC |
| FR18 | If the outage retries are exhausted, the order becomes `PAYMENT_PENDING` and no stock is deducted. The customer may return and retry within the hold period in BR4, after which the order becomes `CANCELLED`.  | Customers | Proposal F2 only. Whether stock is held or re-checked (Q4) and whether the customer is told (Q15) are not stated | TBC |
| FR19 | Once payment has succeeded, the system deducts stock atomically: every quantity is updated, or none is. | Producers, Customers | UC2 para 5; Proposal F2 (Inventory Deduction Service) | TBC |
| FR20 | Once payment has succeeded, the system notifies each relevant producer and releases that producer's fulfilment order. Neither happens before payment succeeds. | Producers | UC2 para 5; Proposal F2 and section 3 | TBC |
| FR21 | Once payment has succeeded, the system generates a customer receipt.  | Customers | Proposal section 3 diagram only; not in the proposal F2 scope list and not in UC2 | TBC |

MoSCoW is left as TBC because no source states priorities. It is a team decision for the backlog step.

### 3.3 Non-functional requirements

| ID | Requirement | Type | Source | How tested |
|---|---|---|---|---|
| NFR1 | Producer notification must not make the customer wait. | Performance / responsiveness | Proposal F2 purpose | Confirm an order; check the customer confirmation appears without waiting for producer notification to finish |
| NFR2 | Only sandbox or simulated payment environments are used. No live payment systems or real financial data, in development or testing. | Constraint | CS disclaimer; UC2 last para | Review payment client configuration; use test card data only |
| NFR3 | Financial transactions comply with current data protection and financial services regulations. | Legal / compliance | CS System Requirements, Core Functionality | Assess in the LESP review (section 8) |
| NFR4 | The record of what each producer is owed (FR12) provides a transparent audit trail suitable for tax reporting and accounting. | Auditability | CS Producers (financial requirements) | Inspect stored records for one order: amount, commission and producer are traceable to the order reference |
| NFR5 | Both functionalities are implemented as executable Camunda processes (user tasks, Forms, service tasks) and are kept for reuse in Task 2. | Constraint | Brief (Process Automation; Task 1 and Task 2) | Deploy and run both processes end to end in Camunda |

### 3.4 Business rules

| ID | Rule | Type | Source | How tested |
|---|---|---|---|---|
| BR1 | Commission is 5% of the item subtotal of each producer order. Delivery fees are excluded (see Q3: no source defines a delivery fee). | Business rule | UC2; CS; Proposal F2 | Order with item subtotal 100 and delivery fee 5: commission is 5.00, not 5.25 |
| BR2 | A maximum of 3 payment attempts after declines. The third decline sets `PAYMENT_FAILED` and the basket is kept. | Business rule | Proposal F2 | Decline 3 times; check status and basket |
| BR3 | A maximum of 3 outage retries, 30 s apart, then `PAYMENT_PENDING`. The proposal does not say whether the first failed call counts as one of the 3 (Q10). | Business rule | Proposal F2 | Simulate 503 repeatedly; time the retries |
| BR4 | A `PAYMENT_PENDING` order is held for 24 hours, then `CANCELLED`. No stock is deducted during the hold. | Business rule | Proposal F2 | Check status after the hold; check stock unchanged |
| BR5 | Stock is deducted and producers are notified only after payment succeeds. | Business rule | Proposal section 3 | Fail a payment; check stock and producer notifications are untouched |
| BR6 | Each checkout has one unique order reference, sent with the payment request. | Business rule | Proposal F2 | Inspect payment request; resubmit the reference |
| BR7 | Each producer offers delivery, collection or both, set in its profile. | Business rule | Proposal F1 (resolved in 2.3) | Check checkout behaviour for a producer of each type |
| BR8 | Producers are not paid out by the system. It only calculates and records what each producer is owed. | Scope boundary | Proposal F2 out of scope | Confirm no payout step exists in the process |



### 3.6 Open questions for the module team

For the sign-off meeting (planned Wed 28 Oct). Q1 to Q3 affect what gets built, so they matter most.

1. **Producer settlement.** The case study requires weekly payment settlements to producers. The proposal excludes payouts and only records what is owed. Is recording the amount owed enough for Task 1, or must a settlement step be modelled? (C3, FR12)
2. **48-hour lead time.** Producers are promised a minimum 48 hours' notice. Should checkout capture a delivery or collection date and enforce the 48 hours, or is the lead time handled outside this use case? (C4)
3. **Delivery fees.** The proposal excludes delivery fees from the commission base. Do delivery fees exist in our scope, and if so where is the fee set, and does the customer pay it at checkout? (C5, BR1)
4. **Stock during `PAYMENT_PENDING`.** No stock is deducted during the 24-hour hold, so another customer could buy the last item in that time. Should stock be reserved for the hold and released on cancellation, or should stock be re-checked when the customer retries?
5. **Re-validation after amendment.** After the customer amends the basket, is the stock check repeated? The proposal's diagram shows an arrow into the amend form but none back out.
6. **Browsing and search.** UC2 begins with browsing, searching and adding to the basket, and the case study requires both. Neither functionality covers them. Are they assumed to exist already, or should one functionality be widened? (C6)
7. **Customer receipt.** The receipt appears only in the proposal's diagram. Is it a required output of F2? (C7, FR21)
8. **Marketplace administrator.** No administrator appears in UC2 or in either functionality, so we have moved the role to out-of-scope stakeholders in 2.2 (UC3). Confirm. (C8, 2.3)
9. **One payment or one per producer.** The proposal gives each checkout one unique order reference sent with the payment request, but also calculates amounts per producer. Is the customer charged once for the whole basket, or once per producer order? (FR10, FR13)
10. **Retry limits.** UC2 says the customer is given the opportunity to retry but sets no limit. The 3 attempts, 3 retries, 30-second wait and 24-hour hold are all the proposal's own figures. Are these acceptable? Also, for outages, does "up to 3 retries" count the first failed call or only the calls after it? (BR2, BR3, BR4)
11. **Order status and failed orders.** The order and its producer-specific elements are created before payment, but the proposal names no status for that period (only `CONFIRMED`, `PAYMENT_FAILED`, `PAYMENT_PENDING`, `CANCELLED`). What status does an order have between creation and payment? If it ends as `PAYMENT_FAILED` or `CANCELLED`, what happens to those records?
12. **Producer notification channel.** Some producers use only email and telephone (CS Producers). The proposal names a Producer Notification Dispatcher but no channel.


---

## 4. User stories

*Status: do now. Each story is a Jira issue under the Use Case 2 epic and is copied into `docs/product-backlog.md`.*

| Jira key | Story (As a… I want… so that…) | Acceptance criteria (Gherkin) | Traces to | Priority |
|---|---|---|---|---|
| KAN-? | | | | |

Include the alternate courses: insufficient stock, payment declined, payment service unavailable, delivery vs collection, order confirmation.

---

## 5. Prioritisation: power/interest grid

*Status: drafted. Placements are judgements from the case study, not from interviews.*

| ID | Power | Interest | Quadrant | Justification |
|---|---|---|---|---|
| SH1 | Low | High | Keep informed | Strong purchasing intent (CS Background), but families and professionals are many and individually replaceable, and they do not set rules. |
| SH2 | Low | High | Keep informed | Regularly need reliable local supply for catering (CS Background), but have no say in how the platform works. |
| SH3 | Low | High | Keep informed | Want local sourcing without the admin of many suppliers (CS Background), but no say in the platform. |
| SH4 | High | High | Manage closely | The marketplace has nothing to sell without producers: they list products, hold the stock and fulfil orders. Orders, notice and amounts owed directly affect their time and income (CS Producers). |
| SH5 | High | High | Manage closely | Like SH4, the marketplace depends on them for stock and fulfilment, but they have less technical capacity, so the platform has to fit them (CS Producers). |
| SH6 | High | High | Manage closely | Owns the marketplace, sets the 5% commission and is the business that must grow (CS Background and Core Functionality). |
| SH7 | High | Low | Keep satisfied | Its availability and responses decide the payment retry and exception design (UC2 para 6; Proposal F2), but it has no stake in the marketplace's goals. |
| SH8 | High | High | Manage closely | Builds the system within the sprint plan, using Camunda and sandbox payments only (assessment brief). Managed through the plan and stand-ups. |

Quadrants: manage closely (high/high), keep satisfied (high power, low interest), keep informed (low power, high interest), monitor (low/low).

---

## 6. Conflicts and tensions

*Status: drafted, needed for the i\* models in Sprint 2. Six tensions, each with a design response.*

| # | Tension | Stakeholders | Why it matters | Design response | i* representation |
|---|---|---|---|---|---|
| T1 | Customer convenience vs the producers' 48-hour lead time | SH1 to SH3 vs SH4, SH5 | Customers buy to avoid the limits of farm-shop opening hours (CS Background). Producers need at least 48 hours to prepare (CS Producers). No source puts a delivery or collection date in checkout. | Pending the lead-time question in section 3. If checkout captures a date, offer only dates at least 48 hours after the order. | Customer softgoal "Convenient buying" with a hurt link from producer softgoal "Adequate lead time" |
| T2 | 5% commission vs producer earnings | SH6 vs SH4, SH5 | The owner needs the commission to stay viable (Proposal F2 rationale). Producers want transparent, auditable earnings (CS Producers). | Commission only on the item subtotal, and delivery fees go fully to the producer (Proposal F2). Record the amount owed for each producer order with an audit trail. | Owner goal "Commission calculated" against producer softgoal "Transparent earnings", resolved by a task "Record amount owed" |
| T3 | Simplicity for low-tech producers vs multi-vendor complexity | SH4, SH5 vs SH1 to SH3, SH6 | Producers have little technical expertise (CS Producers). Checkout must handle multi-vendor orders seamlessly (CS Customers). | The system does the splitting. Each producer is notified of only their own order element (UC2 para 4; Proposal F1 and F2). | Producer softgoal "Little technical effort" against customer softgoal "Seamless checkout", resolved by task "Split order by producer" |
| T4 | Payment retry waits and the 24-hour hold vs customer convenience | SH1 to SH3 vs SH6, SH7 | Retrying and holding protect revenue when the payment service fails (Proposal F2) but make the customer wait or come back later. | Bounded retries (BR2, BR3), basket kept after a failure, and a limited hold before cancellation (BR4). | Customer softgoal "Quick checkout" against owner softgoal "Revenue protected", with SH7 as the dependee for "Payment authorised" |
| T5 | Checking stock before payment vs preventing overselling | SH1 to SH3 vs SH4, SH5 | Stock is checked before payment but deducted only after it, which avoids rollbacks (Proposal section 3). Between the check and the deduction another customer could buy the same item. | Check stock before payment and deduct atomically after it. Whether stock is reserved during a pending order is an open question in section 3. | Producer goal "Stock accurate" against customer goal "Order confirmed" |
| T6 | Traceability records vs data minimisation | SH6, SH4, SH5 vs SH1 to SH3 | The case study requires records linking customers, products and producers, and audit trails (CS Quality Assurance; CS Producers). It also requires compliance with data protection regulations (CS Core Functionality). | Keep only the fields needed for the order and the audit trail. Take the legal detail into the LESP review (section 8). | Owner softgoal "Traceable records" against customer softgoal "Privacy of personal data" |

Not used as a tension: the earlier idea of "fast delivery". The case study never mentions delivery speed, only opening-hours convenience, so T1 is worded from the case study.

---

## 7. Traceability matrix

*Status: later. Fill the stakeholder, goal, requirement and story columns now; the i\*, BPMN and Camunda columns as that work develops (Sprint 2 and 3).*

| Stakeholder | Goal | Requirement | Story | i* element | Strategic BPMN | Operational BPMN / Camunda |
|---|---|---|---|---|---|---|
| | | | | | | |

---

## 8. LESP considerations

*Status: later (assessed in Sprint 3). Each issue tied to a stakeholder and a design decision, citing the relevant legislation or professional standard.*

| Category | Issue | Stakeholder | Design decision |
|---|---|---|---|
| Legal | | | |
| Ethical | | | |
| Social | | | |
| Professional | | | |

---

## 9. References

*UWE Harvard format.*

- Bristol Regional Food Network (2026) *Digital Marketplace Case Study v2*. UFCFTR-30-3, University of the West of England.
- Rachidi, N. (2026) *Functional Scope Proposal & Architectural Boundaries*. UFCFTR-30-3 group repository, `doc/functional-scope-proposal.md`.
- University of the West of England (2026) *UFCFTR-30-3 Task 1 Assessment Brief*. Bristol: UWE.
- University of the West of England (2026) *UFCFTR-30-3 Task 1 Use Cases*. Bristol: UWE.
- University of the West of England (2026) *Requirements Handling* [lecture slides]. UFCFTR-30-3. Bristol: UWE.
