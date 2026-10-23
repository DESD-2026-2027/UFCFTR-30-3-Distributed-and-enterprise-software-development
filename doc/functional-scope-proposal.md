# Functional Scope Proposal & Architectural Boundaries
**Module**: UFCFTR-30-3 Distributed and Enterprise Software Development  
**Use Case**: Use Case 2 – Customer Multi-Vendor Order, Checkout and Payment  
**Author**: Nour  
**Sprint**: Sprint 1 (Strategic Process Analysis & Project Setup)  
 

---

## 1. Executive Summary & Purpose
This document formally identifies and scopes the **two candidate major functionalities**  for the Multi-Vendor Marketplace Platform. 

In accordance with the assessment brief, these functionalities establish the foundation for Sprint 1 strategic analysis and will be implemented as executable business processes using Camunda in Sprints 2 and 3.

---

## 2. Selection & Scoping of the Two Candidate Major Functionalities

### Functionality 1: Multi-Vendor Basket Inventory Validation & Order Segregation
* **High-Level Purpose**: To check, in real time, that every item in a basket with products from several producers is in stock, work out whether each producer offers delivery or collection, and split the main checkout into separate orders for each producer.
* **Business Rationale**: In a multi-vendor marketplace, items originate from distinct physical locations with varying stock quantities and fulfillment options. Preventing overselling requires strict transactional validation before payment is initiated.
* **Process Scope**:
  * **In Scope**:
    * Gathering all items in the basket from different producers when checkout starts.
    * Checking each item against the producer's current stock in real time.
    * User interaction: telling the customer and letting them change their basket when stock is too low.
    * Working out whether each producer offers delivery or collection, based on their profile.
    * Splitting the single order into producer-specific items.
    * customer reviewing and confirming the purchase
  * **Out of Scope**: Financial card processing, payment authorization, and post-payment dispatch.
* **Camunda Implementation Elements (Target for Sprints 2 & 3)**:
  * *User Tasks*: Customer Cart Amendment Form when stock levels are insufficient, Delivery or Collection Selection Form (shown only when a producer offers both)
  * *Service Tasks*: Stock Verification Service, Fulfilment Options Service (reads each producer's delivery and collection settings), Order Segregation Engine.
  * *Exclusive Gateways (XOR)*: Stock Check Decision (`All Available` vs. `Insufficient Stock`).

---

### Functionality 2: Resilient Payment Processing, Marketplace Settlement & Vendor Notification
* **High-Level Purpose**: To send payments to an external payment service, keep the process going safely if that service goes down, calculate the marketplace's 5% commission, update stock levels, and send notifications to producers without making the customer wait. Fault tolerance is needed during any payment service downtime.
* **Business Rationale**: Payment is the most important point in the sale. If payment fails or the network goes down for a short time, the system must protect revenue by offering retries and handling outages smoothly. Accurate revenue sharing also keeps the business viable.
* **Process Scope**:
  * **In Scope**:
    * Calculating the basket total and the 5% marketplace commission for each producer order. The commission is charged on the item subtotal only, not on delivery       fees. Delivery fees go fully to the producer.
    * Connecting to an external or simulated (sandbox) payment service.
    * Handling payment decline scenarios by prompting customer retry, up to 3 attempts. After the third decline, the order is marked `PAYMENT_FAILED`, the customer is informed, and the basket is kept.
    * Exception handling for payment service timeouts/503 errors: retry with an attempt counter, up to 3 retries with a 30-second wait between them. If all retries fail, the order is marked `PAYMENT_PENDING`, no stock is deducted, and the customer can return and retry within 24 hours. After that, the order is `CANCELLED`.
    * * Preventing duplicate orders and payments: the confirm button is disabled after the first click, and each checkout has a unique order reference that is sent with the payment request. If the same reference is submitted again, the system returns the existing result instead of creating a new order or payment.
    * Atomic stock deduction(a step that's fully done/not done, usualy represented by a boolend as well, so the stock numbers are never half updated) once payment is confirmed.
    * Sending order notifications to the relevant producers.
  * **Out of Scope**: Physical parcel courier dispatch and vendor bank payouts. The system only calculates and records what each producer is owed.
* **Camunda Implementation Elements (Target for Sprints 2 & 3)**:
  * *User Tasks*: Payment Entry Form, Payment Declined - Retry Form.
  * *Service Tasks*: Commission Calculation Engine, Sandbox Payment API Client, Inventory Deduction Service, Producer Notification Dispatcher.
  * *Boundary Events,* (a special event attached to the edge of a step that happens once a condition is triggered. Going to be used to catch errors, timeouts and other problems) *Timers & Gateways*: Payment Gateway Error Handling Boundary Event, Retry Wait Timer (30 seconds between retries), Retry Limit Check Gateway (`Attempts Remaining` vs. `Limit Reached`), Payment Status Decision Gateway (`Success`, `Declined`, `Service Unavailable`).


## 3. Order Confirmation Boundary
This little Diagram shows the Confirmation route that an order takes to transition from a tentative pending state to a legally binding, committed business contract.

```text
[Customer Basket]
       │
       ▼
[Stock Validation] ──(Insufficient)──> [Amend Cart Form]
       │ (Available)
       ▼
[Fulfilment Options Check] ──(Both Offered)──> [Delivery / Collection Selection Form]
       │ (Single Option)                                   │
       │<──────────────────────────────────────────────────┘
       ▼
[Customer Order Review & Confirmation]
       │
       ▼
[Order Segregation & 5% Commission Calculation]
       │
       ▼
[Payment Submission (Sandbox Gateway)]
       ├── (Declined) ───────────────> [Prompt Payment Retry (max 3 attempts)]
       │                                  └── (Limit reached) ──> Order 'PAYMENT_FAILED', basket kept
       ├── (Gateway Timeout / 503) ──> [Wait & Retry Path (attempt counter, max 3)]
       │                                  └── (Limit reached) ──> Order 'PAYMENT_PENDING' (24h hold, no stock deducted)
       │
       ▼ (Payment Succeeded)
================== CONFIRMATION BOUNDARY ==================
  * Order status changed to 'CONFIRMED'
  * Stock officially decremented from inventory
  * Multi-vendor fulfillment orders released to producers
  * Customer receipt generated
===========================================================
```


Inventory is not decremented, and producers are not notified, until payment authorization has succeeded. This avoids complex inventory rollbacks  and prevents producers from fulfilling unpaid orders.

4. Actor-to-Responsibility Matrix (RACI)

A governance matrix identifying who is Responsible (R), Accountable (A), Consulted (C), and Informed (I) for each activity

| Process Phase / Activity | Customer | Order Service | Inventory Service | Finance Service | Producers | Payment Gateway |
|---|---|---|---|---|---|---|
| Add Items & Initiate Checkout | A / R | I | C | - | - | - |
| Verify Multi-Vendor Stock | I | A | R | - | C | - |
| Amend Cart (if Stock Insufficient) | A / R | C | I | - | - | - |
| Select Delivery vs. Collection | A / R | C | - | - | C | - |
| Split Order by Producer | - | A / R | I | I | - | - |
| Calculate 5% Marketplace Fee | - | I | - | A / R | - | - |
| Submit & Process Payment | C | I | - | A | - | R |
| Payment Outage Exception/Retry | I | - | - | A / R | - | C |
| Decrement Stock on Success | - | I | A / R | - | I | - |
| Notify Producers of Fulfillment | - | A / R | - | I | I | - |









