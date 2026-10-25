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
  * **Out of Scope**: Financial card processing, payment authorization, and post-payment dispatch.
* **Camunda Implementation Elements (Target for Sprints 2 & 3)**:
  * *User Tasks*: Customer Cart Amendment Form when stock levels are insufficient.
  * *Service Tasks*: Stock Verification Service, Order Segregation Engine.
  * *Exclusive Gateways (XOR)*: Stock Check Decision (`All Available` vs. `Insufficient Stock`).

---

