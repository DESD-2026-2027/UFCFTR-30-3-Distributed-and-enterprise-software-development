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
| 2 | [Stakeholder identification](#2-stakeholder-identification) | Sprint 1 | Done; profiles in 2.4 drafted; SH7 decision open |
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

| ID | Stakeholder | Role and key expectation | Local / Virtual | UC2 | Evidence |
|---|---|---|---|---|---|
| SH1 | Young professionals and families | Buy local produce without visiting several farm shops in limited opening hours | Local | Core | Case study, Background |
| SH2 | Community groups (schools, care facilities, voluntary organisations) | Reliable, consistent local supply for catering | Local | Core | Case study, Background |
| SH3 | Independent restaurants and cafés | Source locally from many producers without the admin of separate relationships | Local | Core | Case study, Background |
| SH4 | Low-tech producers (email/phone ordering) | Cut ~15 h/week spent on customer communication; be notified of orders with at least 48 h lead time; amount owed recorded with a transparent audit trail | Local | Core | Case study, Producers; UC2 |
| SH5 | Digitally basic producers (social media) | Manage orders despite limited technical expertise and resources; same lead-time and audit-trail needs as SH4 | Local | Core | Case study, Producers; UC2 |
| SH6 | Bristol Regional Food Network (owner) | Grow the network of 40 SMEs beyond farmers' markets and farm gate sales; 5% commission calculated automatically | Local | Core | Case study, Background and Core Functionality; UC2 |
| SH7 | Marketplace administrator | Resolve failed payments and exceptions; oversee orders and incidents | Local | To confirm | UC3 names the role; UC2 exception path (the proposal automates it) |
| SH8 | Payment service provider (sandbox) | Authorise payments; returns success, decline (from card issuer) or unavailable | Virtual | Core | Case study disclaimer; UC2 |
| SH9 | Development team | Deliver within sprints using Camunda and sandbox payments only | Local | Supporting | Assessment brief |

### 2.2 Out-of-scope stakeholders

Identified from the case study and use cases but not analysed in depth, because they do not take part in Use Case 2. They remain visible in the strategic BPMN where relevant.

| Stakeholder | L / V | Why out of scope | Where it belongs |
|---|---|---|---|
| Organic certification body | Virtual | Verifies organic claims at product listing, before checkout | UC1 – product listing |
| Food safety authority (FSA / local environmental health) | Virtual | Involved only after a food-safety incident is reported | UC3 – quality incidents |
| Third-party courier service | Local delivery, virtual integration | Case study names no delivery provider; each producer offers delivery or collection (proposal) | Not modelled (design decision) |
| Customer's card issuer | Virtual | Makes the decline decision but is reached only through the payment provider (SH8) | Represented by SH8 |
| HMRC | Virtual | Indirect: needs producer income records for tax reporting, but takes no part in checkout or payment | Represented by producers (SH4, SH5), whose audit trails support tax reporting |

### 2.3 Open questions

- [ ] **SH7 (administrator):** UC2 never names the role and the proposal automates the whole payment exception path. Keep SH7 as a core stakeholder, or move it to 2.2 as a UC3 stakeholder? The cross-check in 3.5 (C8) found no administrator in either functionality or in the proposal's RACI matrix, which argues for moving it. Confirm at sign-off (Q8).
- [ ] **Tutor sign-off:** the two functionalities in the proposal still need agreement with the module team (planned Wed 28 Oct).
- [ ] **Regulators:** should the data protection regulator (ICO) and the financial services regulator (FCA) be modelled as stakeholders? The case study only says transactions must "comply with current data protection and financial services regulations" and names neither body. Alternative: treat them as regulatory constraints (requirements and Section 8) rather than actors.
- [ ] **Payment method:** do community groups and restaurants pay by invoice rather than card? The proposal only describes card payment through a sandbox gateway; assume card payment unless told otherwise (affects SH2, SH3).
- [x] **Who delivers?** Resolved: each producer offers delivery, collection or both, set in its profile (proposal, Functionality 1). No courier is modelled.
- [x] **Notification service:** resolved: our own component, the Producer Notification Dispatcher (proposal, Functionality 2).
- [x] **Second major functionality:** resolved: the proposal defines both (basket validation and order segregation; resilient payment, commission and vendor notification).

### 2.4 Core stakeholder profiles

Profiles for the Core stakeholders: SH1 to SH6 and SH8. SH7 is left out until its open question in 2.3 is settled, and SH9 is Supporting. Items come from the case study (CS), Use Case 2 (UC2) and Nour's proposal ("Proposal"). Dependencies are typed as goal, softgoal, task or resource, which is what the i* SD model needs in Sprint 2. "Marketplace platform" means the system run by the Network owner (SH6). Where a source names no softgoal for a stakeholder, the profile says so instead of inventing one.

#### SH1 Young professionals and families

| Type | Item | UC2 step | Evidence |
|---|---|---|---|
| Goal | Find products and add them from one or more producers to the basket | Browse, basket | CS Background (cannot visit several farm shops); CS Customers; UC2 para 1 |
| Goal | Have the basket accepted at checkout in the quantities wanted | Checkout | UC2 para 2 |
| Goal | Know how each producer's items reach them (delivery or collection) | Checkout | UC2 para 3; CS Customers |
| Goal | Order paid and confirmed | Pay | UC2 para 5 |
| Softgoal | Convenient buying, not tied to farm-shop opening hours | All | CS Background |
| Softgoal | Seamless checkout for single-vendor and multi-vendor orders | Checkout | CS Customers |
| Softgoal | Clear information on each supplier's responsibilities, delivery and collection | Checkout, review | CS Customers |
| Softgoal | Secure payment and protected personal data | Pay | CS System Requirements |
| Task | Browse and search; add to basket | Browse, basket | UC2 para 1; CS Customers |
| Task | Amend the basket when stock is insufficient | Checkout | UC2 para 2; Proposal F1 (Customer Cart Amendment Form) |
| Task | Choose delivery or collection where a producer offers both | Checkout | Proposal F1 (Delivery or Collection Selection Form) |
| Task | Review and confirm the order | Checkout | UC2 para 3 |
| Task | Enter payment details; retry if declined | Pay | UC2 para 6; Proposal F2 (Payment Entry and Retry Forms) |
| Resource (provides) | Basket contents, delivery or collection choice, payment details, confirmation | Basket to pay | UC2 paras 1 to 5 |
| Resource (needs) | Product information (category, harvest date, farm origin, seasonal availability); stock result; delivery and collection arrangements; order status | Browse to confirm | CS Customers; UC2 paras 2 and 3 |
| Dependency | On Marketplace platform for: basket checked against current stock (task); order confirmed (goal); seamless checkout (softgoal) | Checkout, pay | UC2 paras 2 and 5; CS Customers |
| Dependency | On Producers for: supplying the ordered goods (goal) | After payment | Proposal section 3 (fulfilment orders released to producers) |
| Dependency | On Payment provider, through the platform, for: payment authorised (goal) | Pay | UC2 para 5 |

#### SH2 Community groups

Same tasks, resources and dependencies as SH1, because UC2 does not distinguish customer types. Differences:

| Type | Item | Evidence |
|---|---|---|
| Goal | Obtain local supply for catering | CS Background |
| Softgoal | Reliable and consistent supply | CS Background |
| Dependency | On Producers for: consistent supply (softgoal) | CS Background |
| Open point | Whether groups pay by invoice rather than card is unresolved. Card payment is assumed, as in 2.3 | Section 2.3 |

#### SH3 Independent restaurants and cafés

Same tasks, resources and dependencies as SH1. Differences:

| Type | Item | Evidence |
|---|---|---|
| Goal | Source ingredients locally from many producers in one order | CS Background; UC2 para 4 |
| Softgoal | Low administrative effort across many small suppliers | CS Background |
| Dependency | On Marketplace platform for: one order split into producer-specific elements (task) | UC2 para 4; Proposal F1 (Order Segregation Engine) |
| Open point | Invoice versus card, as for SH2 | Section 2.3 |

#### SH4 and SH5 Producers

SH4 takes orders by email and phone. SH5 has a basic social media presence. They share the profile below.

| Type | Item | UC2 step | Evidence |
|---|---|---|---|
| Goal | Be told about each order that includes their products | Notify producers | UC2 para 5; Proposal F2 (Producer Notification Dispatcher) |
| Goal | Receive only their own order element | Order split | UC2 para 4 |
| Goal | Have the amount owed to them recorded | Pay | UC2 para 7; Proposal F2; CS Producers |
| Goal | Have at least 48 hours' notice of incoming orders (not covered by Functionality 1 or 2) | Notify producers | CS Producers |
| Goal (SH4) | Cut about 15 hours a week spent on customer communication | All | CS Producers |
| Goal (SH5) | Manage orders despite limited technical expertise and resources | All | CS Producers |
| Softgoal | Little technical effort and no extensive training | All | CS Producers |
| Softgoal | Transparent, auditable earnings suitable for tax and accounting | Pay | CS Producers (financial requirements) |
| Softgoal | Adequate lead time to prepare products | Notify producers | CS Producers |
| Task | Keep products, stock and delivery or collection settings up to date | Before browse | CS Core Functionality; Proposal F1 (producer profile) |
| Task | Fulfil their own order element (deliver, or make ready for collection) | After notification | Proposal F1 and section 3 |
| Resource (provides) | Product listings, stock quantities, delivery and collection settings | Before browse | CS Core Functionality; Proposal F1 |
| Resource (needs) | Order notification; record of the amount owed | Notify producers | UC2 para 5; Proposal F2 |
| Dependency | On Marketplace platform for: order notification (resource); commission and amount owed calculated and recorded (goal) | Pay, notify | UC2 paras 5 and 7 |
| Dependency | On Marketplace platform for: orders released only once paid (goal) | Pay, notify | Proposal section 3 |
| Dependency | On Customers for: placing orders (goal) | Checkout | CS Background |

#### SH6 Bristol Regional Food Network (owner)

| Type | Item | UC2 step | Evidence |
|---|---|---|---|
| Goal | Grow the network of 40 SMEs beyond farmers' markets and farm gate sales | All | CS Background |
| Goal | Aggregate multi-vendor orders in one checkout | Checkout, order split | CS Core Functionality; UC2 para 4 |
| Goal | Payments collected and the amount for each producer calculated | Pay | UC2 para 7; CS Core Functionality |
| Goal | The 5% commission calculated automatically | Pay | UC2 para 7; CS Core Functionality |
| Goal | Transactions comply with data protection and financial services regulations | Pay | CS Core Functionality |
| Softgoal | Viable business through accurate revenue sharing | Pay | Proposal F2 (business rationale) |
| Softgoal | Revenue protected when payment fails or the service goes down | Pay | Proposal F2 (business rationale) |
| Softgoal | Transparency about each supplier's responsibilities | Checkout | CS Core Functionality |
| Task | Run the marketplace: validate the basket, split the order, take payment, notify producers | Checkout to notify | UC2 paras 2 to 5 |
| Task | Calculate commission and record the amount each producer is owed | Pay | UC2 para 7; Proposal F2 |
| Resource (provides) | The platform; the commission rule; the producer network | All | CS Background; Proposal F2 |
| Resource (needs) | Product and stock data; customer orders; payment results | Basket to pay | UC2 |
| Dependency | On Producers for: products and stock data (resource); fulfilling orders (task) | Browse, notify | CS Core Functionality; Proposal section 3 |
| Dependency | On Customers for: orders placed (goal) | Basket | CS Background |
| Dependency | On Payment provider for: payment authorised (goal); service available (softgoal) | Pay | UC2 paras 5 and 6 |

#### SH8 Payment service provider (sandbox)

| Type | Item | UC2 step | Evidence |
|---|---|---|---|
| Goal | Authorise or decline each payment request | Pay | UC2 para 5; CS disclaimer |
| Softgoal | None stated. The sources describe a sandbox service and give it no quality of its own | | CS disclaimer; UC2 final para |
| Task | Process the request and return success, decline or unavailable | Pay | Register 2.1; UC2 paras 5 and 6 |
| Resource (provides) | Payment result | Pay | UC2 para 5 |
| Resource (needs) | Payment request: amount, payment details, unique order reference | Pay | Proposal F2 |
| Dependency | Marketplace platform depends on SH8 for: payment authorised (goal) | Pay | UC2 para 5 |
| Dependency | SH8 depends on Marketplace platform for: payment request with order reference (resource) | Pay | Proposal F2 |

---

## 3. Derived requirements




### 3.1 Functional requirements

Customers = SH1, SH2, SH3. Producers = SH4, SH5. Network owner = SH6. Payment provider = SH8.


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
8. **Marketplace administrator (SH7).** No administrator appears in UC2 or in either functionality. Confirm SH7 moves out of the core stakeholder set and belongs to UC3. (C8, 2.3)
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
| SH5 | High | High | Manage closely | Same dependence as SH4, with less technical capacity, so the platform has to fit them (CS Producers). |
| SH6 | High | High | Manage closely | Owns the marketplace, sets the 5% commission and is the business that must grow (CS Background and Core Functionality). |
| SH7 | Low | Low | Monitor (provisional) | No administrator appears in UC2 or either functionality, and the proposal automates the exception path. Depends on the SH7 question in 2.3. |
| SH8 | High | Low | Keep satisfied | Its availability and responses decide the payment retry and exception design (UC2 para 6; Proposal F2), but it has no stake in the marketplace's goals. |
| SH9 | High | High | Manage closely | Builds the system within the sprint plan, using Camunda and sandbox payments only (assessment brief). Managed through the plan and stand-ups. |

Quadrants: manage closely (high/high), keep satisfied (high power, low interest), keep informed (low power, high interest), monitor (low/low).

---

## 6. Conflicts and tensions

*Status: drafted, needed for the i\* models in Sprint 2. Six tensions, each with a design response.*

| # | Tension | Stakeholders | Why it matters | Design response | i* representation |
|---|---|---|---|---|---|
| T1 | Customer convenience vs the producers' 48-hour lead time | SH1 to SH3 vs SH4, SH5 | Customers buy to avoid the limits of farm-shop opening hours (CS Background). Producers need at least 48 hours to prepare (CS Producers). No source puts a delivery or collection date in checkout. | Pending the lead-time question in section 3. If checkout captures a date, offer only dates at least 48 hours after the order. | Customer softgoal "Convenient buying" with a hurt link from producer softgoal "Adequate lead time" |
| T2 | 5% commission vs producer earnings | SH6 vs SH4, SH5 | The owner needs the commission to stay viable (Proposal F2 rationale). Producers want transparent, auditable earnings (CS Producers). | Commission only on the item subtotal, and delivery fees go fully to the producer (Proposal F2). Record the amount owed for each producer order with an audit trail. | Owner goal "Commission calculated" against producer softgoal "Transparent earnings", resolved by a task "Record amount owed" |
| T3 | Simplicity for low-tech producers vs multi-vendor complexity | SH4, SH5 vs SH1 to SH3, SH6 | Producers have little technical expertise (CS Producers). Checkout must handle multi-vendor orders seamlessly (CS Customers). | The system does the splitting. Each producer is notified of only their own order element (UC2 para 4; Proposal F1 and F2). | Producer softgoal "Little technical effort" against customer softgoal "Seamless checkout", resolved by task "Split order by producer" |
| T4 | Payment retry waits and the 24-hour hold vs customer convenience | SH1 to SH3 vs SH6, SH8 | Retrying and holding protect revenue when the payment service fails (Proposal F2) but make the customer wait or come back later. | Bounded retries (BR2, BR3), basket kept after a failure, and a limited hold before cancellation (BR4). | Customer softgoal "Quick checkout" against owner softgoal "Revenue protected", with SH8 as the dependee for "Payment authorised" |
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
