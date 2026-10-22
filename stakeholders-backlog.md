# Stakeholder Analysis, Product Backlog and Sprint Plan: Use Case 2

**Module:** UFCFTR-30-3 Distributed and Enterprise Software Development
**Project:** Bristol Regional Food Network, Digital Marketplace (fictitious case study)


---

## Part 1: Stakeholder analysis

### 1.1 Summary

| Stakeholder | Type | Role in Use Case 2 | Interest | Influence on design |
|---|---|---|---|---|
| Customers (3 segments) | Primary actors | Browse, fill basket, confirm and pay | High | High |
| Producers | Secondary actors | Receive sub-orders, prepare and fulfil | High | High |
| Marketplace operations | Operator | Own the order, calculate commission, keep records | High | High |
| Payment service | External system | Process payment, return result | Medium | High (technical) |
| Logistics (delivery and collection) | Supporting process | Get goods from producer to customer | Medium | Medium |
| Regulators and standards bodies | External influence | Constrain data, payment and consumer handling | Low (day to day) | High (constraints) |

### 1.2 Customers

| | |
|---|---|
| **Segments** | Young professionals and families; community groups (schools, care facilities, voluntary organisations); independent restaurants and cafés |
| **Needs** | Browse and buy local produce in one order across several producers; accurate stock; clear breakdown of who supplies what; clear delivery or collection arrangements |
| **Pain points today** | Limited farm shop opening hours (families); difficulty finding reliable, consistent suppliers (community groups); admin overhead of many small suppliers (restaurants) |
| **Concerns** | Paying for something that turns out to be unavailable; payment failure losing their basket; unclear responsibility when an order has several producers |
| **Depends on** | Marketplace (ordering and payment), producers (fulfilment) |
| **Design impact** | Stock check before payment; amend-order loop; per-producer summary at review; retry after a declined payment; confirmation listing each producer |
| **Segment differences** | Families want convenience and one-off baskets; community groups want consistency; restaurants want low admin and likely repeat orders. *(Decide whether UC2 covers repeat orders or leaves them for later.)* |

### 1.3 Producers

| | |
|---|---|
| **Profile** | About forty SMEs within a twenty-mile radius; technical ability varies widely; some work only by email and phone and spend about fifteen hours a week on customer communication |
| **Needs** | Orders visible with at least 48 hours' notice; clear quantities and delivery or collection details; weekly payment with a clear audit trail |
| **Concerns** | Being told of orders that later fail payment; short notice; unclear commission deductions; extra admin |
| **Depends on** | Marketplace for orders and payment; payment service indirectly; logistics for getting goods to customers |
| **Design impact** | Producer notification only after successful payment; delivery date options that respect the 48-hour lead time; sub-order per producer with its own amount; simple, clear notifications |

### 1.4 Marketplace operations (network administration)

| | |
|---|---|
| **Needs** | Reliable order records; automatic 5% commission; consistent inventory; ability to trace customers, products and producers |
| **Concerns** | Overselling; mismatched commission and settlement amounts; no audit trail |
| **Depends on** | Payment service, producers, inventory data |
| **Design impact** | Order split and commission calculation as defined, auditable steps; inventory updated after payment; clear order and payment status; exception paths rather than silent failure |

### 1.5 Payment service (external or sandbox)

| | |
|---|---|
| **Needs** | Valid payment requests; clear handling of its responses (success, declined, unavailable) |
| **Constraint** | The case study requires sandbox or simulated payments only, never live systems or real financial data |
| **Concerns for the system** | Temporary outages; duplicate submissions on retry; card data must never be stored by the marketplace |
| **Design impact** | Bounded retry with a timer; defined fallback when retries run out; idempotent or checked retries *(decide how)*; sandbox keys kept out of the repository |

### 1.6 Logistics (delivery and collection)

| | |
|---|---|
| **What the case study says** | Checkout must communicate delivery arrangements and collection procedures per supplier. It does not name a courier or logistics provider |
| **Needs** | Clear delivery or collection method per producer; enough lead time to prepare goods |
| **Concerns** | Delivery promised that producers cannot meet; customers unsure where and when to collect |
| **Design impact** | Delivery or collection choice per producer at checkout, constrained by the 48-hour rule |
| **Assumption to confirm** | *(Do producers deliver themselves, do customers collect, or is a shared courier assumed? Record the group's decision in section 1.8.)* |

### 1.7 Regulators and standards (supporting)

| Area | Relevance to UC2 |
|---|---|
| Data protection (UK GDPR, Data Protection Act 2018) | Customer details and order history |
| Payments (including PCI DSS expectations) | No card data stored; sandbox only |
| Consumer law | Order information, cancellation and refunds |

*(Verify these against primary sources and cite them in UWE Harvard in your LESP notes.)*

### 1.8 Tensions and assumptions

**Tensions between stakeholders**

- Customers want fast checkout; the system needs stock checks.
- Customers want quick delivery; producers need at least 48 hours.
- Reserving stock at checkout prevents overselling but can hold stock for customers who never pay.
- Producers want little admin; the network wants complete records.

**Assumptions to decide (record the decision and date)**

| # | Question | Decision |
|---|---|---|
| A1 | Reserve stock at checkout or only after payment? | [decision] |
| A2 | When is commission calculated, and is it shown to the customer? | [decision] |
| A3 | Payment retry limit and delay, and what happens afterwards? | [decision] |
| A4 | What if one producer's items become unavailable after confirmation? | [decision] |
| A5 | Delivery model: producer delivery, collection, or both? | [decision] |

---

## Part 2: Product backlog

**Format:** *As a [stakeholder], I want [capability] so that [benefit].*
**Priority:** M = Must, S = Should, C = Could · **Size:** S, M, L · **Sprint:** 2 or 3

| ID | Epic | Story | Acceptance criteria | Priority | Size | Sprint | Owner |
|---|---|---|---|---|---|---|---|
| PB-01 | A. Basket and availability | As a customer, I want to add items from several producers to one basket so that I can order in one go | Basket accepts items from two or more producers | M | S | 2 | [ ] |
| PB-02 | A | As the marketplace, I want to check stock for every basket item at checkout so that I never confirm unavailable goods | Each item checked against available quantity before proceeding | M | M | 2 | [ ] |
| PB-03 | A | As a customer, I want to be told which items are unavailable so that I can amend or cancel | Message lists the affected items; I can change quantities or cancel; the check runs again after amending | M | M | 2 | [ ] |
| PB-04 | B. Order preparation | As the marketplace, I want to identify the producers in an order so that responsibilities are clear | Every item maps to exactly one producer | M | S | 2 | [ ] |
| PB-05 | B | As a customer, I want delivery or collection options per producer so that I know how I will receive each part | Options shown per producer; earliest date respects the 48-hour lead time | M | M | 2 | [ ] |
| PB-06 | B | As a customer, I want to review and confirm my order so that I do not pay for a mistake | Summary shows items, producers, arrangements and totals; confirm, go back or cancel | M | M | 2 | [ ] |
| PB-07 | B | As the marketplace, I want the order split into producer sub-orders so that each producer sees only their part | One sub-order per producer with its own items and amount | M | M | 2 | [ ] |
| PB-08 | C. Payment | As the network, I want the 5% commission calculated automatically so that settlement is accurate | Commission plus producer amounts equals the order total | M | M | 2 | [ ] |
| PB-09 | C | As the marketplace, I want to submit payment to a sandbox service so that no real money or data is used | Sandbox call works; no live keys in the repo | M | M | 2 | [ ] |
| PB-10 | C | As a customer, I want to retry a declined payment so that I do not lose my order | Decline message shown; retry or cancel offered; cancel releases stock | M | M | 2 | [ ] |
| PB-11 | C | As the marketplace, I want a bounded retry when the payment service is unavailable so that the process does not simply stop | Timer-based retry up to the agreed limit, then the agreed fallback | S | L | 2 to 3 | [ ] |
| PB-12 | D. Confirmation | As the marketplace, I want inventory updated after successful payment so that stock stays correct | Quantities reduce only after success; failure or cancel releases any reservation | M | M | 2 | [ ] |
| PB-13 | D | As a producer, I want to be notified of my sub-order so that I can prepare in time | Notification has items, quantities, arrangements; sent only after payment | M | M | 2 | [ ] |
| PB-14 | D | As a customer, I want an order confirmation so that I know what to expect | Confirmation lists each producer's items and arrangements | S | S | 2 to 3 | [ ] |
| PB-15 | E. Quality and exceptions | As the marketplace, I want a defined outcome when one producer's items become unavailable after confirmation so that orders are not left inconsistent | Agreed behaviour documented and modelled (decision A4) | S | L | 3 | [ ] |
| PB-16 | F. Modelling and traceability | As the team, we want i\* SD and SR models so that stakeholder goals trace to design | Models complete and consistent with the strategic BPMN | M | L | 2 | [ ] |
| PB-17 | F | As the team, we want UC2 modelled as an operational BPMN so that the process is clear before automation | Pools, lanes, gateways, events, message flows and exception paths present | M | L | 2 | [ ] |
| PB-18 | F | As the team, we want a traceability table so that goals link to processes and Camunda elements | One row per major goal, kept up to date | S | S | 2 | [ ] |
| PB-19 | G. Automation | As the team, we want UC2 running in Camunda so that we can demonstrate it | Process deploys and runs the happy path with user tasks and Forms | M | L | 2 | [ ] |
| PB-20 | G | As the team, we want Camunda service tasks and process variables for UC2 so that logic is automated | Stock check, split, commission, payment and notification tasks work with agreed variables | M | L | 2 to 3 | [ ] |
| PB-21 | H. Compliance | As the team, we want legal, ethical, social and professional notes tied to our design so that we can justify decisions | Notes reference specific processes, data and decisions, with citations | S | M | 3 | [ ] |
| PB-22 | H | As the team, we want a repo README that explains setup so that markers can run our work | Instructions tested on a clean machine | M | S | 2 | [ ] |

*Add Use Case 1 (or your agreed second functionality) items once confirmed with the module team.*

---

## Part 3: Sprint plan (Sprint 2: 22 October to 2 November 2026)

### 3.1 Sprint goal

By the Sprint 2 review on 2 November, show: completed i\* SD and SR models, a detailed operational BPMN for Use Case 2 (and the second functionality), clear traceability between them, and an initial executable Camunda process with user tasks and Forms.

### 3.2 Sprint scope

**In scope:** PB-01 to PB-10, PB-12, PB-13, PB-16 to PB-20, PB-22
**Stretch or Sprint 3:** PB-11 (full retry behaviour), PB-14, PB-15, PB-21

### 3.3 Ownership

| Member | Role | Main backlog items |
|---|---|---|
| Member 1 | Stakeholders and backlog | PB-16, UC2 forms (PB-03, PB-06), backlog and board upkeep |
| Member 2 | Payment and compliance | PB-08, PB-09, PB-10, PB-11, PB-21 |
| Member 3 | Process modelling | PB-17, PB-04, PB-05, PB-07 (modelling), strategic BPMN updates |
| Member 4 | Camunda and repository | PB-19, PB-20, PB-12, PB-13, PB-18, PB-22 |

*(Adjust to your real names and agreed roles. Every member should have a modelling item, a build item and an admin item.)*

### 3.4 Timeline

| Date | Focus | Output |
|---|---|---|
| Thu 22 Oct | Stakeholders, rules, setup | This document, repo, board, first commits |
| Fri 23 Oct | Second functionality confirmed; start drafts | i\* actor lists; BPMN outlines |
| Sat 24 to Sun 25 Oct | Drafting | i\* SD draft; UC2 BPMN sections |
| Mon 26 Oct | Check-in and peer review | Handoffs between sections agreed |
| Tue 27 to Wed 28 Oct | Skeleton Camunda process | Happy path deploys and runs |
| Thu 29 Oct | Service tasks and variables | Stock check, split, commission, payment working |
| Fri 30 Oct | Exception paths; i\* SR | Declined, unavailable, out-of-stock paths |
| Sat 31 Oct | Consistency and traceability | Traceability table; diagrams match running process |
| Sun 1 Nov | Rehearsal | README tested; full demo run-through |
| Mon 2 Nov | **Sprint 2 review** | Live demonstration |

### 3.5 Definition of done (per backlog item)

- Work committed on the owner's branch from their own account
- Pull request reviewed by another member and merged to `main`
- Board card moved to Done with a link to the evidence
- Model or process matches the traceability table
- Owner can explain it at a stand-up or demo

### 3.6 Ways of working

- Weekly stand-ups: each member gives their own update (done, next, blockers, evidence)
- Branch per member, merge to `main` only through reviewed pull requests
- No secrets or keys in the repository
- Models and diagrams drawn by the group; any AI help with code stated in the README

### 3.7 Risks

| Risk | Mitigation | Owner |
|---|---|---|
| Second functionality not confirmed in time | Proceed with Use Case 1 as an assumption and tell the module team | [ ] |
| Camunda setup problems | Same environment for everyone; document steps in README | [ ] |
| Uneven contribution | One owner per card; reviews; weekly board check | [ ] |
| Models drift from the running process | Update the traceability table weekly | [ ] |