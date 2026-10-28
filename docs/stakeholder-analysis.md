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
| 3 | [Derived requirements](#3-derived-requirements) | Sprint 1 (backlog) | Drafted; 5 questions open in 3.3 |
| 4 | [Conflicts and tensions](#4-conflicts-and-tensions) | Sprint 2 (i* models) | Not started |
| 5 | [Dependencies](#5-dependencies) | Sprint 2 (i* SD model) | Drafted |
| 6 | [LESP considerations](#6-lesp-considerations) | Sprint 3 | Not started |
| 7 | [References](#7-references) | All | Ongoing |

---

## 1. Scope and method

**What is analysed.** The Bristol Regional Food Network digital marketplace. Stakeholders are identified across the whole enterprise (Layer 1) so the strategic BPMN and i* SD model cover the full system. Stakeholders involved in Use Case 2 are then analysed in depth (Layer 2) for the requirements, backlog, i* SR model, operational BPMN and Camunda implementation.

**Sources.**
- Bristol Regional Food Network case study (v2)
- Task 1 Use Cases (Use Case 2 is the one delivered)
- Functional Scope Proposal (`docs/functional-scope-proposal.md`)
- UFCFTR-30-3 Task 1 assessment brief
- Requirements Handling lecture (stakeholder groups, FR/NFR, user stories)

**Method.** Document analysis of the case study. Each stakeholder is classified as local (within the 20-mile network area) or virtual (online or indirect), and by relevance to Use Case 2: core, supporting, or out of scope.

**Limitation.** Stakeholders are identified from documents, not interviews. Assumptions are recorded as open questions (2.3 and 3.3) and checked with the module team at stand-ups.

---

## 2. Stakeholder identification

### 2.1 Stakeholder register

| ID | Stakeholder | Wants | Relies on | Local / Virtual | UC2 | Evidence |
|---|---|---|---|---|---|---|
| SH1 | Young professionals and families | Add products from one or more producers to one basket (G1); basket accepted (G2); know delivery or collection (G3); order paid and confirmed (G4) | Platform (stock check, confirmation); producers (supply); payment provider | Local | Core | Case study, Background, Customers; UC2 |
| SH2 | Community groups (schools, care facilities, voluntary organisations) | Add products from one or more producers to one basket (G1); basket accepted (G2); know delivery or collection (G3); order paid and confirmed (G4) | Platform; producers for consistent supply | Local | Core | Case study, Background |
| SH3 | Independent restaurants and cafés | Add products from one or more producers to one basket (G1); basket accepted (G2); know delivery or collection (G3); order paid and confirmed (G4) | Platform to split the order by producer | Local | Core | Case study, Background; UC2 §4 |
| SH4 | Low-tech producers (email/phone ordering) | Cut ~15 h/week of customer communication (G5); notified of orders with at least 48 h notice (G6) | Platform (notification, commission, orders released only once paid); customers for orders | Local | Core | Case study, Producers; UC2 |
| SH5 | Digitally basic producers (social media) | Cut customer communication (G5, inferred); notified of orders with at least 48 h notice (G6) | Platform (notification, commission, orders released only once paid); customers for orders | Local | Core | Case study, Producers; UC2 |
| SH6 | Bristol Regional Food Network (owner) | 5% commission calculated automatically (G7); one checkout for multi-vendor orders (G8) | Producers (stock, fulfilment); customers (orders); payment provider; regulators' rules | Local | Core | Case study, Background and Core Functionality; UC2 |
| SH7 | Payment service provider (sandbox) | Return an approve or decline result for each payment request (G9) | Platform for a payment request with a unique order reference | Virtual | Core | Case study disclaimer; UC2 |
| SH8 | Development team | Deliver within sprints using Camunda and sandbox payments only (G10) | Module team for scope sign-off | Local | Supporting | Assessment brief |

### 2.1.1 Goals and softgoals

IDs used in the stakeholder profiles (2.1.2) and available to the i* models. A goal is something a stakeholder wants done. A softgoal is a quality they care about, with no clear pass or fail.

**Goals**

| ID | Goal | What it means | Stakeholders | Related requirements |
|---|---|---|---|---|
| G1 | Add products from one or more producers to one basket | The customer can put items from one or more producers into a single basket and check out once. | Customers (SH1 to SH3) | FR1, FR4 |
| G2 | Have the basket accepted (stock confirmed) | Every item is checked against the producer's current stock before the customer pays; the customer amends the basket if not. | Customers (SH1 to SH3) | FR2, FR3 |
| G3 | Know the delivery or collection arrangements | The customer sees, before confirming, whether each producer delivers, offers collection or both, and chooses where there is a choice. | Customers (SH1 to SH3) | FR5 to FR7 |
| G4 | Pay and receive order confirmation | The customer pays through the sandbox payment service, can retry a declined payment, and is told the order is confirmed. | Customers (SH1 to SH3) | FR12 to FR15, FR20 |
| G5 | Receive orders without manual customer communication | Producers get orders from the platform instead of by email and phone, which removes about 15 hours a week of communication. The 15 hours is stated in the case study for email and phone producers (SH4); for SH5 it is inferred. | Producers (SH4, SH5) | FR19 |
| G6 | Be notified with at least 48 hours' notice | Producers get at least 48 hours' notice of an order, enough time to prepare it. The case study sets this minimum for all producers. Not enforced at checkout yet. | Producers (SH4, SH5) | FR19 |
| G7 | Calculate the 5% commission automatically | The platform works out the commission on each producer order without manual handling. | Network owner (SH6) | FR10, FR11 |
| G8 | Offer one checkout for multi-vendor orders | The marketplace gives customers one checkout instead of one per producer. | Network owner (SH6) | FR1, FR9 |
| G9 | Return an approve or decline result for each payment request | The payment provider tells the platform whether each payment request is approved or declined. Our platform reacts to the result (FR14, FR15); it does not decide. | Payment provider (SH7) | FR12, FR14 to FR16 |
| G10 | Deliver both functionalities within the sprints | The team builds Functionality 1 and 2 in the sprint plan, using Camunda and sandbox payments. | Development team (SH8) | NFR2, NFR5 |

**Softgoals**

| ID | Softgoal | What it means | Stakeholders | Related requirements |
|---|---|---|---|---|
| SG1 | Convenient buying | Buying from regional producers is easier than visiting each farm shop in its opening hours. | Customers (SH1 to SH3) | FR1 |
| SG2 | Seamless checkout | Checkout flows without dead ends, errors or long waits. In tension with the payment retry waits and the pending hold. | Customers (SH1 to SH3) | FR3, FR15 to FR17 |
| SG3 | Clear supplier information | The customer can see which producer supplies what and how it will arrive. | Customers (SH1 to SH3) | FR7 |
| SG4 | Secure payment and personal data | Payment details and personal data are not exposed. | Customers (SH1 to SH3) | NFR2, NFR3 |
| SG5 | Reliable, consistent supply | Community groups can find and rely on a consistent local source for catering. | Community groups (SH2) | FR2 |
| SG6 | Low administration across many suppliers | Ordering from many producers does not mean dealing with each one separately. | Restaurants and cafés (SH3) | FR9 |
| SG7 | Little technical effort | Producers can use the platform with little technical skill or setup. | Producers (SH4, SH5) | FR19 |
| SG8 | Transparent audit trail | Records are clear enough for tax reporting and accounting. | Producers (SH4, SH5) | NFR4 |
| SG9 | Viable business | The marketplace earns enough to keep running, mainly through commission. | Network owner (SH6) | FR11 |
| SG10 | Revenue protected | Revenue is not lost when a payment fails or is pending. | Network owner (SH6) | FR15 to FR17, NFR6 |
| SG11 | Regulatory compliance | Transactions follow data protection and financial services rules. | Network owner (SH6) | NFR3 |
| SG12 | Traceable records | Records link customers, products and producers so a problem with a product can be traced. | Network owner (SH6) | FR13, NFR4 |

### 2.1.2 Stakeholder profiles

One profile per stakeholder in the register. Goals and softgoals are listed by ID; see 2.1.1 for what each one means.

#### SH1: Young professionals and families

| Field | Detail |
|---|---|
| **Who they are** | Local individual buyers who want to buy from regional producers outside farm-shop opening hours. |
| **Type** | Human, External |
| **Role in Use Case 2** | Builds a basket from one or more producers, amends it if stock is short, chooses delivery or collection, reviews and confirms the order, pays, retries if declined, and receives confirmation. |
| **Functionalities involved** | Both (F1 and F2) |
| **Current problems (pain points)** | Farm shops are only open at limited hours; buying from several producers means dealing with each one separately (inferred). |
| **Goals (things they want done)** | G1, G2, G3, G4 |
| **Softgoals (qualities they care about)** | SG1, SG2, SG3, SG4 |
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
| **Goals (things they want done)** | G1, G2, G3, G4 |
| **Softgoals (qualities they care about)** | SG1, SG2, SG3, SG4, SG5 |
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
| **Goals (things they want done)** | G1, G2, G3, G4 |
| **Softgoals (qualities they care about)** | SG1, SG2, SG3, SG4, SG6 |
| **Concerns and risks** | Whether they can pay by invoice rather than card (open question in 2.3); a split order where one producer cannot fulfil its part. |
| **Influence / Interest** | Low, High → Keep informed |
| **Source** | CS Background; UC2 §4 |
| **Used later in** | i* actor "Customer"; BPMN lane "Customer" |

#### SH4: Low-tech producers (email and phone ordering)

| Field | Detail |
|---|---|
| **Who they are** | Small producers in the network of 40 SMEs who currently take orders by email and phone. |
| **Type** | Human / Organisation, External |
| **Role in Use Case 2** | Supplies stock that is checked at checkout; is notified of their own order element after payment succeeds. |
| **Functionalities involved** | Both (F1 stock and fulfilment options; F2 notification) |
| **Current problems (pain points)** | About 15 hours a week spent on customer communication; little technical capacity. |
| **Goals (things they want done)** | G5, G6 |
| **Softgoals (qualities they care about)** | SG7, SG8 |
| **Concerns and risks** | Less than 48 hours' notice; commission reducing earnings; no payout step in scope (Q1). |
| **Influence / Interest** | High, High → Manage closely |
| **Source** | CS Producers; UC2 |
| **Used later in** | i* actor "Producer"; BPMN pool/lane "Producer" |

#### SH5: Digitally basic producers (social media)

| Field | Detail |
|---|---|
| **Who they are** | Small producers in the network who sell mainly through social media. |
| **Type** | Human / Organisation, External |
| **Role in Use Case 2** | Supplies stock that is checked at checkout; is notified of their own order element after payment succeeds. |
| **Functionalities involved** | Both (F1 and F2) |
| **Current problems (pain points)** | Limited technical expertise and resources to manage orders. |
| **Goals (things they want done)** | G5, G6 |
| **Softgoals (qualities they care about)** | SG7, SG8 |
| **Concerns and risks** | Less than 48 hours' notice; commission reducing earnings; no payout step in scope (Q1); less capacity to cope with a platform that assumes technical skill. |
| **Influence / Interest** | High, High → Manage closely |
| **Source** | CS Producers; UC2 |
| **Used later in** | i* actor "Producer" (same actor as SH4 unless the models need to distinguish them); BPMN pool/lane "Producer" |

#### SH6: Bristol Regional Food Network (owner)

| Field | Detail |
|---|---|
| **Who they are** | The organisation that runs the marketplace and the network of 40 SMEs within a 20-mile area. |
| **Type** | Organisation, Internal |
| **Role in Use Case 2** | Owns the checkout; takes a 5% commission on each producer order; needs revenue protected if payment fails. |
| **Functionalities involved** | Both (F1 order segregation; F2 commission calculation) |
| **Current problems (pain points)** | Not stated directly; the case study frames the need to connect the 40 SMEs with more customers and replace manual commission handling (inferred). |
| **Goals (things they want done)** | G7, G8 |
| **Softgoals (qualities they care about)** | SG9, SG10, SG11, SG12 |
| **Concerns and risks** | Failed or pending payments losing revenue; non-compliance with data protection and financial regulations; traceability against data minimisation. |
| **Influence / Interest** | High, High → Manage closely |
| **Source** | CS Background and Core Functionality; UC2 |
| **Used later in** | i* actor "Marketplace"; BPMN pool "Marketplace" |

#### SH7: Payment service provider (sandbox)

| Field | Detail |
|---|---|
| **Who they are** | An external, simulated payment service used for all payments. |
| **Type** | System, External |
| **Role in Use Case 2** | Authorises or declines each payment; may be unavailable (timeout or 503). |
| **Functionalities involved** | F2 |
| **Current problems (pain points)** | Not applicable (an external system); its failures are what the retry design handles. |
| **Goals (things they want done)** | G9 |
| **Softgoals (qualities they care about)** | Not stated |
| **Concerns and risks** | Timeouts and 503s; duplicate submissions of the same reference (FR13). |
| **Influence / Interest** | High, Low → Keep satisfied |
| **Source** | CS disclaimer; UC2 |
| **Used later in** | i* actor "Payment Service"; BPMN external pool "Payment Service" |

#### SH8: Development team

| Field | Detail |
|---|---|
| **Who they are** | The module team building the Camunda processes within the sprint plan. |
| **Type** | Human, Internal |
| **Role in Use Case 2** | Designs, implements and tests both functionalities using sandbox payments only. |
| **Functionalities involved** | Both (F1 and F2) |
| **Current problems (pain points)** | Not stated; constraints are fixed sprints, Camunda, and sandbox-only payments. |
| **Goals (things they want done)** | G10 |
| **Softgoals (qualities they care about)** | Not stated |
| **Concerns and risks** | Open questions in 3.3 affect scope; sign-off planned for Wed 28 Oct. |
| **Influence / Interest** | High, High → Manage closely (through the plan and stand-ups) |
| **Source** | Assessment brief |
| **Used later in** | Not an actor in the models; appears in planning only |

### 2.2 Out-of-scope stakeholders

Identified from the case study and use cases but not analysed in depth, because they do not take part in Use Case 2. They remain visible in the strategic BPMN where relevant.

| Stakeholder | Local / Virtual | Why out of scope | Where it belongs |
|---|---|---|---|
| Organic certification body | Virtual | Verifies organic claims at product listing, before checkout | UC1 – product listing |
| Food safety authority (FSA / local environmental health) | Virtual | Involved only after a food-safety incident is reported | UC3 – quality incidents |
| Third-party courier service | Local delivery, virtual integration | Case study names no delivery provider; each producer offers delivery or collection (proposal) | Not modelled (design decision) |
| Marketplace administrator | Local | Role named only in UC3; UC2 has no administrator step and the proposal automates the payment exception path | UC3 – exceptions and incidents |
| Customer's card issuer | Virtual | Makes the decline decision but is reached only through the payment provider (SH7) | Represented by SH7 |
| HMRC | Virtual | Indirect: needs producer income records for tax reporting, but takes no part in checkout or payment | Represented by producers (SH4, SH5), whose audit trails support tax reporting |

### 2.3 Open questions

- [ ] **Regulators:** should ICO and FCA be modelled as actors, or treated as regulatory constraints in requirements? The case study names neither body explicitly.
- [ ] **Payment method:** do community groups and restaurants pay by invoice rather than card? Assumed card unless told otherwise (affects SH2, SH3).

## 3. Derived requirements

### 3.1 Functional requirements

Customers = SH1, SH2, SH3. Producers = SH4, SH5. Network owner = SH6. Payment provider = SH7.

**Source key:** UC2 = Use Case 2 (§ = paragraph number); CS = case study; F1 / F2 = proposal Functionality 1 / 2; F§*n* = proposal section *n* (F§3 is the confirmation diagram); Q*n* = open question *n* in 3.3.

**Functionality 1: Multi-Vendor Basket Inventory Validation & Order Segregation**

| ID | Requirement | Stakeholders | Source | Priority (MoSCoW) |
|---|---|---|---|---|
| FR1 | When the customer proceeds to checkout, the system gathers every item in the basket. The basket may contain items from one producer or from several. | Customers | UC2 §1–2; CS; F1 | Must |
| FR2 | The system checks each basket item against the producer's current stock, in real time, for the quantity requested. | Customers, Producers | UC2 §2; F1 | Must |
| FR3 | If an item is unavailable or stock is insufficient, the system informs the customer and asks them to amend the basket (Customer Cart Amendment Form). | Customers | UC2 §2; F1 | Must |
| FR4 | The system identifies the producers involved in the basket. | Producers, Network owner | UC2 §3; F1 | Must |
| FR5 | For each producer involved, the system reads from the producer's profile whether that producer offers delivery, collection or both. | Customers, Producers | UC2 §3; F1 | Must |
| FR6 | Where a producer offers both delivery and collection, the customer chooses one (Delivery or Collection Selection Form). Where the producer offers one option only, that option applies and no form is shown. | Customers, Producers | F1; F§3 | Must |
| FR7 | The system presents the order for review, showing each producer's responsibilities, the delivery arrangements and the collection procedures that apply. | Customers | UC2 §3; CS | Must |
| FR8 | The customer confirms the purchase. Confirmation happens before the order is split and before payment is submitted. | Customers | UC2 §3–4; F§3 | Must |
| FR9 | After confirmation the system creates the overall marketplace order and separates it into producer-specific order elements. | Customers, Producers, Network owner | UC2 §4; F1 | Must |

**Functionality 2: Resilient Payment Processing, Marketplace Settlement & Vendor Notification**

| ID | Requirement | Stakeholders | Source | Priority (MoSCoW) |
|---|---|---|---|---|
| FR10 | The system calculates the basket total and the amount attributable to each producer. | Producers, Network owner | UC2 §7; F2 | Must |
| FR11 | The system calculates the marketplace commission for each producer order, at the rate and on the base set in the business rules. The proposal's diagram places this before payment is submitted; UC2 does not say when. | Network owner, Producers | UC2 §7; CS; F2; F§3 | Must |
| FR12 | The system collects the customer's payment details (Payment Entry Form) and submits the payment to a sandbox or simulated payment service. | Customers, Payment provider | UC2 §5; F2 (Q5) | Must |
| FR13 | The confirm button is disabled after the first click. Each checkout is given a unique order reference, which is sent with the payment request. If the same reference is submitted again, the system returns the existing result instead of creating a second order or payment. | Customers, Network owner | F2 | Must |
| FR14 | If payment succeeds, the order status becomes `CONFIRMED`. | Customers | UC2 §5; F§3 | Must |
| FR15 | If payment is declined, the system informs the customer and offers a retry (Payment Declined - Retry Form), up to the attempt limit in the business rules. At the limit the order becomes `PAYMENT_FAILED`, the customer is informed and the basket is kept. | Customers, Network owner, Payment provider | UC2 §6; F2 | Must |
| FR16 | If the payment service times out or returns a 503, the system follows a retry path with an attempt counter, within the retry limit and wait time in the business rules, rather than terminating. | Customers, Network owner, Payment provider | UC2 §6; F2 | Must |
| FR17 | If the outage retries are exhausted, the order becomes `PAYMENT_PENDING` and no stock is deducted. The customer may return and retry within the hold period in the business rules, after which the order becomes `CANCELLED`. | Customers, Network owner | F2 only (Q3) | Should |
| FR18 | Once payment has succeeded, the system deducts stock atomically: every quantity is updated, or none is. | Producers, Customers | UC2 §5; F2 | Must |
| FR19 | Once payment has succeeded, the system notifies each relevant producer and releases that producer's fulfilment order. Neither happens before payment succeeds. | Producers | UC2 §5; F2; F§3 | Must |
| FR20 | Once payment has succeeded, the system generates a customer receipt. | Customers | F§3 only | Could |

No source states priorities, so these are proposed and will be confirmed by the team before the backlog is committed. Won't have: browsing and search (Q4) and producer payouts (Q1).

### 3.2 Non-functional requirements

| ID | Requirement | Type | Source | How tested |
|---|---|---|---|---|
| NFR1 | Producer notification must not make the customer wait. | Performance / responsiveness | F2 | Confirm an order; check the customer confirmation appears without waiting for producer notification to finish |
| NFR2 | Only sandbox or simulated payment environments are used. No live payment systems or real financial data, in development or testing. | Constraint | CS; UC2 | Review payment client configuration; use test card data only |
| NFR3 | Financial transactions comply with current data protection and financial services regulations. | Legal / compliance | CS | Assess in the LESP review (section 6) |
| NFR4 | Financial records provide a transparent audit trail suitable for tax reporting and accounting. | Auditability | CS | Inspect stored records for one order: amount, commission and producer are traceable to the order reference |
| NFR5 | Both functionalities are implemented as executable Camunda processes (user tasks, forms, service tasks) and are kept for reuse in Task 2. | Constraint | Brief | Deploy and run both processes end to end in Camunda |
| NFR6 | A payment service timeout or outage does not lose the order or create a duplicate payment. | Reliability / fault tolerance | UC2 §6; F2 | Simulate a 503 in the sandbox; check the order ends as `PAYMENT_PENDING`, no stock is deducted and resubmitting the same reference creates no second payment |
| NFR7 | All amounts are in GBP and calculated in whole pence, so splitting the 5% commission across producers never leaves fractional pennies unaccounted for. | Accuracy | F§6; F§7 | For a multi-producer order, check that the producer-specific order elements plus commission add up exactly to the basket total, in pence |

### 3.3 Open questions for the module team

For the sign-off meeting (Wed 28 Oct). Each question affects scope or the design of the i* models.

1. **Producer settlement.** The proposal excludes payouts and only records what is owed. Is that enough, or must a settlement step be modelled? Affects whether a payout actor enters the i* SD model.
2. **Delivery fees.** The proposal excludes delivery fees from the commission base. Do delivery fees exist in our scope, and does the customer pay them at checkout? Affects FR10, FR11.
3. **Stock during `PAYMENT_PENDING`.** No stock is deducted during the 24-hour hold. Should stock be reserved, or re-checked when the customer retries?
4. **Browsing and search.** UC2 begins with browsing and searching, but neither functionality covers them. Are they assumed to exist already, or should one functionality be widened?
5. **One payment or one per producer.** The proposal gives each checkout one unique order reference, but also calculates amounts per producer. Is the customer charged once for the whole basket, or once per producer order? Affects FR10, FR12.

---

## 4. Conflicts and tensions

*Status: not started (Sprint 2, alongside the i\* SD/SR models).*

---

## 5. Dependencies

*Status: drafted for the i\* SD model in Sprint 2. Dependencies are recorded only here; the profiles (2.1.2) hold goals and softgoals. Actors follow the profiles' "Used later in" lines: Customer = SH1 to SH3, Producer = SH4 and SH5, Marketplace = SH6, Payment Service = SH7. Dependum types follow i\*: goal, softgoal, task, resource.*

| ID | Depender | Dependee | Dependum | Type | Why it matters |
|---|---|---|---|---|---|
| D1 | Customer | Marketplace | Basket accepted (stock confirmed) | Goal | A customer should not pay for items that cannot be supplied (FR2, FR3). |
| D2 | Customer | Marketplace | Delivery or collection arrangements known | Goal | The customer needs to know how the order arrives before confirming (FR5 to FR7). |
| D3 | Customer | Marketplace | Order split by producer | Goal | Restaurants and cafés rely on the platform to divide one order across producers (FR9). |
| D4 | Customer | Marketplace | Order confirmed | Goal | The customer only knows the purchase went through once payment succeeds (FR14). |
| D5 | Customer | Marketplace | Seamless checkout | Softgoal | Shared by all customer groups; in tension with the retry waits and the pending hold. |
| D6 | Customer | Marketplace | Secure payment and personal data | Softgoal | Payment and personal data must not be exposed (NFR2, NFR3). |
| D7 | Customer | Producer | Order fulfilled | Goal | Producers hold the stock and fulfil the order. Fulfilment itself is outside both functionalities, but it is a strategic dependency at enterprise level (SD model only). |
| D8 | Customer | Producer | Reliable, consistent supply | Softgoal | Community groups need dependable local supply for catering (SH2). |
| D9 | Marketplace | Customer | Order placed | Goal | The network earns revenue and commission only when customers order. |
| D10 | Marketplace | Customer | Payment details | Resource | Needed to submit the payment (FR12). |
| D11 | Marketplace | Producer | Current stock levels | Resource | The real-time stock check is only as good as the producer's stock data (FR2). |
| D12 | Marketplace | Producer | Delivery and collection options in the producer profile | Resource | Read to decide whether the customer is asked to choose (FR5, FR6). |
| D13 | Marketplace | Payment Service | Payment authorised | Goal | An order is confirmed, and producers are notified, only after authorisation. Its declines and outages drive the retry design (FR14 to FR17). |
| D14 | Payment Service | Marketplace | Payment request with a unique order reference | Resource | Lets a repeated submission return the existing result rather than a second payment (FR13). |
| D15 | Producer | Marketplace | Producer notified of their own order element | Goal | Producers get orders without manual customer communication, and only once paid (FR19). |
| D16 | Producer | Marketplace | Transparent audit trail | Softgoal | Supports tax reporting and accounting (NFR4). |
| D17 | Producer | Marketplace | Little technical effort | Softgoal | Low-tech and digitally basic producers cannot take on a complex platform. |
| D18 | Producer | Marketplace | Adequate lead time | Softgoal | At least 48 hours' notice, which checkout does not currently enforce. |
| D19 | Producer | Customer | Orders | Resource | Producers get no income without customers placing orders. |
| D20 | Marketplace | Payment Service | Payment service available | Softgoal | Timeouts and outages drive the retry path and the pending hold (FR16, FR17, NFR6). |

Not listed as dependencies: the regulators, because whether the ICO and FCA are actors is still open (2.3). Producer settlement is also left out, because payouts are not in scope (Q1).

---

## 6. LESP considerations

*Status: not started (Sprint 3). Each issue will be tied to a stakeholder and a design decision, citing the relevant legislation or professional standard.*

| Category | Issue | Stakeholder | Design decision |
|---|---|---|---|
| Legal | | | |
| Ethical | | | |
| Social | | | |
| Professional | | | |

---

## 7. References

*UWE Harvard format.*

- Bristol Regional Food Network (2026) *Digital Marketplace Case Study v2*. UFCFTR-30-3, University of the West of England.
- Rachidi, N. (2026) *Functional Scope Proposal & Architectural Boundaries*. UFCFTR-30-3 group repository, `docs/functional-scope-proposal.md`.
- University of the West of England (2026) *UFCFTR-30-3 Task 1 Assessment Brief*. Bristol: UWE.
- University of the West of England (2026) *UFCFTR-30-3 Task 1 Use Cases*. Bristol: UWE.
- University of the West of England (2026) *Requirements Handling* [lecture slides]. UFCFTR-30-3. Bristol: UWE.
