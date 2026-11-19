# Sprint Backlog

**Module:** UFCFTR-30-3 Distributed and Enterprise Software Development (Task 1)<br>
**Use case:** Use Case 2, Customer Multi-Vendor Order, Checkout and Payment<br>
**Scope:** The strategic BPMN covers Use Case 2 only, as advised by our supervisor.<br>

The sprint backlog is the set of items from the [product backlog](product-backlog.md) that the group commits to in one sprint, broken into tasks. It is agreed at sprint planning and tracked on the Jira board (KAN). The "Product backlog item" column links each task to the product backlog.

**Status values:** To Do, In Progress, In Review, Done.

---

## Sprint 1: Strategic Process Analysis and Project Setup

**Sprint window:** 12 to 29 October 2026 (submission deadline: 29 October, 14:00)
**Sprint goal:** Deliver a strategic BPMN model of the marketplace, a scoped pair of major functionalities, an initial product backlog and a sprint plan, with a clear repository history from every member.

| Jira ID | Product backlog item | Task | Owner | Due | Status |
|---|---|---|---|---|---|
| KAN-16 | Repository and project setup | Create the GitHub repository and Jira board| Rayyan | 22 Oct | Done |
| KAN-13 | Repository and project setup | Protect `main` | Sadik | 22 Oct | Done |
| KAN-14 | Scope | Write the functional scope proposal (two functionalities, rationale, actor-to-responsibility table) and define the success criteria | Nour | 26 Oct | Done |
| KAN-8 | Stakeholders | Write the stakeholder analysis | Rayyan | 26 Oct | Done |
| KAN-19 | Business rules | Write the business rules (5% commission, decline retry, payment outage handling) | Fares | 26 Oct | To Do |
| KAN-10 | Strategic BPMN | Draw the Customer and Producers pools | Rayyan | 26 Oct | Done |
| KAN-11 | Strategic BPMN | Draw the Payment Service pool and payment message flows | Fares | 26 Oct | Done |
| KAN-12 | Strategic BPMN | Draw the Logistics/Collection pool | Sadik | 26 Oct | Done |
| KAN-9 | Strategic BPMN | Draw the Marketplace pool (lanes and collapsed sub-processes) | Nour | 26 Oct | Done |
| KAN-15 | Strategic BPMN | Merge all pools into one strategic BPMN and export `.bpmn`, `.svg`, `.png` | Nour | 27 Oct | Done |
| KAN-17 | Product backlog | Write user stories with acceptance criteria | Rayyan | 27 Oct | Done |
| KAN-18 | Product backlog | Add MoSCoW priorities and sprint milestones | Rayyan | 27 Oct | Done |
| KAN-21 | Repository and project setup | Write the README with team, roles and board link | Sadik | 28 Oct | Done |
| KAN-22 | Project management | Draft the Contribution Matrix | Sadik | 28 Oct | Done |

### Sprint 1 meetings

| Date | Type | Attendees | What we covered |
|---|---|---|---|
| 19 Oct 2026 | Online meeting | All | Assigned roles and planned what we need to do for Sprint 1. |
| 22 Oct 2026 | In-person meeting | All | Created the GitHub repository and the Jira project management board. |
| 23 Oct 2026 | In-person meeting | All | Sat together and started on individual strategic BPMNs and on the individual files: stakeholder analysis, business rules, sprint plan and product backlog.|
| 27 Oct 2026 | In-person meeting | All | Merged the strategic BPMN. |
---

## Sprint 2: Operational BPMN, i* Models and Camunda

**Sprint window:** 2 November to 19 November 2026 (sprint review on 19 November)
**Sprint goal:** Turn the strategic BPMN into operational BPMN for both functionalities, model the actors and their dependencies in i*, and run the processes in Camunda.

| Jira ID | Product backlog item | Task | Owner | Due | Status |
|---|---|---|---|---|---|
| KAN-27 | Business rules | Fix `docs/business-rules.md` (carried over from Sprint 1) | Fares | 16 Nov | Done |
| KAN-28 | Product backlog | Improve and update the product backlog (carried over from Sprint 1) | Rayyan | 16 Nov | Done |
| KAN-29 | Strategic BPMN | Make the strategic BPMN less detailed | Nour | 16 Nov | Done |
| KAN-30 | Project management | Update the sprint backlog and Jira | Sadik | 16 Nov | Done |
| KAN-32 | Functionality 1 | Operational BPMN for the marketplace order: basket, stock check, shortage choices and producer orders | Nour | 16 Nov | Done |
| KAN-33 | Functionality 2 | Operational BPMN for payment, settlement and vendor notification | Sadik | 16 Nov | Done |
| KAN-34 | i* models | Build the Strategic Dependency (SD) model | Fares, Rayyan | 16 Nov | Done |
| KAN-35 | i* models | Build the Strategic Rationale (SR) model for the Marketplace and Payment Service | Fares | 16 Nov | Done |
| KAN-36 | i* models | Build the Strategic Rationale (SR) model for the Customer and Producer | Rayyan | 16 Nov | Done |
| KAN-37 | Functionality 1 | Camunda: deploy and test, with forms | Nour | 17 Nov | Done |
| KAN-38 | Functionality 2 | Camunda: deploy and test, with forms and failure paths | Sadik | 17 Nov | Done |
| KAN-31 | Traceability | Link the i* models, strategic BPMN and operational BPMN in `docs/traceability.md` | Nour | 17 Nov | Done |

### Sprint 2 meetings

| Date | Type | Attendees | What we covered |
|---|---|---|---|
| 3 Nov 2026 | Online meeting | All | First meeting after the Sprint 1 review. Planned the next stand-up: terminology, make the BPMN less detailed, make the sprint backlog more proper, fix the product backlog for Sprint 1. |
| 9 Nov 2026 | Online meeting | All | Planned what we need to do for Sprint 2 and assigned roles. |
| 17 Nov 2026 | In person Meet up | All | Reviewing and testing Operational BPMN, and checking it against the i* models. |


---

## Sprint 3

To be planned