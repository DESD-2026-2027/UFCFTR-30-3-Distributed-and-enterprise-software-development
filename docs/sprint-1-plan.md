# Sprint 1 Plan: Strategic Process Analysis and Project Setup

**Module:** UFCFTR-30-3 Distributed and Enterprise Software Development (Task 1)
**Use case:** Use Case 2, Customer Multi-Vendor Order, Checkout and Payment
**Sprint window:** 22 to 29 October 2026 (submission deadline: 29 October)

## Sprint Goal

Deliver a strategic BPMN model of the marketplace, a scoped pair of major functionalities agreed with the module team, and an initial product backlog and sprint plan, with a clear repository history from every member.

## Task Plan

### Done
- [x] Create GitHub repository (Sadik)
- [x] Divide team roles (all)
- [x] Write Sprint 1 plan (all)

### Thu 22 Oct: Setup
- [ ] Finish Monday.com board with all sprint deadlines and owners (Rayamn)
- [ ] Add module leaders to the repo and protect `main` (Sadik)
- [ ] Commit README with team, roles and board link (Sadik)
- [ ] Prepare individual stand-up updates (all)

### Fri 23 Oct: Scope and analysis
- [ ] Write `docs/functional-scope-proposal.md`: two functionalities, rationale, confirmation boundary, actor-to-responsibility table (Nour)
- [ ] Write `docs/stakeholders.md` (Rayamn)
- [ ] Write `docs/business-rules.md`: 5% commission, decline retry, payment outage handling (Fares)
- [ ] Draft `docs/data-model.md` (Sadik)
- [ ] Open PRs and review each other's work (all)

### Sat 24 to Mon 26 Oct: Strategic BPMN
- [ ] Draft Customer and Producers pools (Rayamn)
- [ ] Draft Payment Service pool and payment message flows (Fares)
- [ ] Draft Logistics/Collection pool (Sadik)
- [ ] Draft Marketplace pool with lanes, plus the four collapsed sub-processes and process relationships (Nour)
- [ ] Group review against the checklist below (all, Mon 26)
- [ ] Export `.bpmn`, `.svg`, `.png` to `docs/strategic-bpmn/` and merge via PR (Nour)

**Review checklist**
- [ ] Delivery and collection both appear
- [ ] External payment service interaction is shown
- [ ] Message flows are dashed and run between pools only
- [ ] No form fields or micro-level logic

### Mon 26 to Tue 27 Oct: Backlog and sprint plan
- [ ] Write user stories, including delivery/collection, order confirmation and payment service outage (Rayamn, Fares)
- [ ] Add MoSCoW priorities and Gherkin acceptance criteria (Rayamn)
- [ ] Mirror stories on the board with Sprint 1/2/3 milestones (Rayamn)
- [ ] Commit `docs/product-backlog.md` (Rayamn)

### Wed 28 Oct: Agreement and audit
- [ ] Get tutor sign-off on the two functionalities and record the feedback in `docs/` (Nour)
- [ ] Check every member has merged PRs and commits; reassign a review or documentation task if not (Sadik)
- [ ] Check the README links to the BPMN, scope document, backlog and this plan (Sadik)
- [ ] Draft Contribution Matrix (Sadik)

### Thu 29 Oct: Submission day (before 14:00)
- [ ] Final read-through of all artefacts (all)
- [ ] Tag and push: `git tag -a v1.0-sprint1 -m "Sprint 1: Strategic BPMN and backlog"` then `git push origin v1.0-sprint1` (Sadik)
- [ ] Rehearse explanations so every member can answer questions (all)

## Dependencies and Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Tutor sign-off on the two functionalities is delayed | Scope cannot be final | Ask at the first available lab session or stand-up; record any feedback |
| A member has no commits by Wed 28 | Uneven contribution evidence | Assign a review or documentation task immediately |
| BPMN too detailed | Loses strategic abstraction marks | Group review checklist on Mon 26 |
| Late merge conflicts in shared docs | Lost work, rushed commits | Small PRs, one owner per file |

## Next Sprint

Sprint 2 begins on 2 November 2026: i* SD/SR models, two operational BPMN models and initial Camunda automation.
