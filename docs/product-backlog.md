# Product Backlog: Bristol Regional Food Network

Module: UFCFTR-30-3 Distributed and Enterprise Software Development, Task 1<br>
Use case: Use Case 2, Customer Multi-Vendor Order, Checkout and Payment<br>
Owner: Rayyan Tahir<br>
Last updated: 29 October 2026

This is our product backlog for Use Case 2. It turns the requirements in the stakeholder analysis (FR1 to FR20 and NFR1 to NFR7) into user stories and other work items for Sprints 2 and 3. The same items are tracked on our [Jira board](https://desd2026-2027.atlassian.net/jira/software/projects/KAN/boards/2) under the project key `KAN`.

Related documents: `docs/stakeholder-analysis.md`, `docs/functional-scope-proposal.md` and `docs/sprint-1-plan.md`.

## How the backlog works

### Priorities

We use MoSCoW. Each story takes the priority of the requirements it comes from, as proposed in section 3.1 of the stakeholder analysis. From now on, this backlog is where priorities are kept up to date.

- Must: Use Case 2 does not work, or the brief is not met, without it.
- Should: important, but the use case still works without it for now.
- Could: useful if we have time.
- Won't (this release): agreed as out of scope for now.

### Estimates

Stories are estimated in story points using 1, 2, 3, 5 and 8. Points show how big a story is compared with the others, not how many hours it takes. A story bigger than 8 should be split. The points below are first estimates and will be agreed as a team at Sprint 2 planning.

### Status

Each item is To Do, In Progress, In Review or Done. These match the columns on our Jira board.

### Ready and done

A story is ready to go into a sprint when it has acceptance criteria, an estimate and a link to at least one FR or NFR.

A story is done when:
- its acceptance criteria pass when the process runs in Camunda (NFR5)
- it only uses the sandbox payment service and test data (NFR2)
- all amounts are in GBP and whole pence (NFR7)
- its pull request has been reviewed by another team member and merged into `main`

## Epics

- E1: Multi-Vendor Basket Inventory Validation & Order Segregation (Functionality 1), covering FR1 to FR9
- E2: Resilient Payment Processing, Marketplace Settlement & Vendor Notification (Functionality 2), covering FR10 to FR20
- E3: Quality and constraints. NFR4 has its own story. NFR1, NFR2, NFR5, NFR6 and NFR7 are covered inside other stories or by the definition of done.

## User stories

Stories are listed in priority order, then in the order they happen during checkout. In the Stakeholders column, Customers means SH1 to SH3, Producers means SH4 and SH5, Network owner is SH6 and Payment provider is SH7.


### Functionality 1: Multi-Vendor Basket Inventory Validation & Order Segregation (E1)

Checks that everything in a basket from one or more producers is in stock, works out whether each producer delivers or offers collection, lets the customer review and confirm, and then splits the order into a separate order for each producer.

| ID | Jira | User story | Traces to | Stakeholders | MoSCoW | Points | Sprint | Owner | Status |
|---|---|---|---|---|---|---|---|---|---|
| US1 | | As a customer, I want to check out one basket that holds items from one or more producers, so that I pay once instead of ordering from each producer separately. | FR1, FR4; G1, G8; SG1 | Customers, Network owner | Must | 2 | 2 | Nour | To Do |
| US2 | | As a customer, I want each item checked against the producer's current stock before I pay, and to be able to change my basket if something is short, so that I never pay for something that cannot be supplied. | FR2, FR3; G2; SG5 | Customers, Producers | Must | 5 | 2 | Nour | To Do |
| US3 | | As a customer, I want to see whether each producer delivers, offers collection or both, and to choose where there is a choice, so that I know how each part of my order will arrive. | FR5, FR6; G3 | Customers, Producers | Must | 3 | 2 | Nour | To Do |
| US4 | | As a customer, I want to review my order, including each producer's items and delivery or collection arrangements, before I confirm it, so that I know exactly what I am agreeing to. | FR7, FR8; G3; SG3 | Customers | Must | 3 | 2 | Nour | To Do |
| US5 | | As a producer, I want to receive only my own part of a multi-vendor order, so that I prepare just the items I supply. | FR9, FR4; G8; SG6 | Producers, Customers, Network owner | Must | 5 | 2 | Nour | To Do |

### Functionality 2: Resilient Payment Processing, Marketplace Settlement & Vendor Notification (E2), plus quality (E3)

Works out the 5% commission, takes payment through the sandbox payment service, handles declined payments and payment service outages without losing the order, and once payment succeeds, confirms the order, updates stock and notifies each producer.

| ID | Jira | User story | Traces to | Stakeholders | MoSCoW | Points | Sprint | Owner | Status |
|---|---|---|---|---|---|---|---|---|---|
| US6 | | As the network owner, I want the 5% commission calculated automatically for each producer order, so that commission is never handled manually. | FR10, FR11, NFR7; G7; SG9 | Network owner, Producers | Must | 3 | 3 | Fares | To Do |
| US7 | | As a customer, I want to enter my payment details and pay through the payment service, so that I can complete my order. | FR12, NFR2; G4, G9; SG4 | Customers, Payment provider | Must | 5 | 3 | Fares | To Do |
| US8 | | As a customer, I want my order to be placed and paid only once, even if I accidentally click confirm twice or the page resends my request, so that I am never charged twice. | FR13, NFR6; SG10 | Customers, Network owner | Must | 3 | 3 | Sadik | To Do |
| US9 | | As a customer, I want to be told my order is confirmed as soon as payment succeeds, so that I know the purchase went through. | FR14; G4 | Customers | Must | 1 | 3 | Rayyan | To Do |
| US10 | | As a customer, I want to retry a declined payment, so that one failed card attempt does not lose my order. | FR15; G4, G9; SG2, SG10 | Customers, Network owner, Payment provider | Must | 5 | 3 | Fares | To Do |
| US11 | | As the network owner, I want checkout to keep going when the payment service times out or is unavailable, so that orders and revenue are not lost. | FR16, NFR6; G9; SG10 | Network owner, Customers, Payment provider | Must | 8 | 3 | Fares | To Do |
| US12 | | As a producer, I want stock reduced only after payment succeeds, and for every item or none, so that my stock levels are always correct. | FR18 | Producers, Customers | Must | 3 | 3 | Sadik | To Do |
| US13 | | As a producer, I want to be notified of my order element once it is paid, so that I receive orders without emails and phone calls. | FR19, NFR1; G5, G6; SG7 | Producers | Must | 3 | 3 | Rayyan | To Do |
| US14 | | As a customer, I want to return and pay for an order that was held during a payment outage, so that I do not have to rebuild my basket. | FR17; SG2, SG10 | Customers, Network owner | Should | 5 | 3 | Sadik | To Do |
| US15 | | As a producer, I want a clear record of each order's amount, commission and producer, linked to the order reference, so that I can use it for tax reporting and accounting. (E3) | NFR4; SG8, SG12 | Producers, Network owner | Should | 3 | 3 | Rayyan | To Do |
| US16 | | As a customer, I want a receipt once payment succeeds, so that I have a record of what I bought and paid. | FR20 | Customers | Could | 2 | 3 | Rayyan | To Do |

In total the Must stories come to 49 points, the Should stories to 8 and the Could story to 2. The sprint numbers are our current plan and may change at Sprint 2 planning.
