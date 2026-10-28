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
- [x] Finish Monday.com board with all sprint deadlines and owners (Rayan)
- [ ] Add module leaders to the repo and protect `main` (Sadik)
- [x] Commit README with team, roles and board link (Sadik)
- [x] Prepare individual stand-up updates (all)

### Fri 23 Oct: Scope and analysis
- [ ] Write `docs/functional-scope-proposal.md`: two functionalities, rationale, confirmation boundary, actor-to-responsibility table (Nour)
- [ ] Write `docs/stakeholders.md` (Rayan)
- [ ] Write `docs/business-rules.md`: 5% commission, decline retry, payment outage handling (Fares)
- [ ] Draft `docs/data-model.md` (Sadik)
- [ ] Open PRs and review each other's work (all)

### Sat 24 to Mon 26 Oct: Strategic BPMN
- [ ] Draft Customer and Producers pools (Rayan)
- [ ] Draft Payment Service pool and payment message flows (Fares)
- [ ] Draft Logistics/Collection pool (Sadik)
- [ ] Draft Marketplace pool with lanes, plus the four collapsed sub-processes and process relationships (Nour)
- [ ] Group review against the checklist below (all, Mon 26)
- [ ] Export `.bpmn`, `.svg`, `.png` to `docs/strategic-bpmn/` and merge via PR (Nour)


### Mon 26 to Tue 27 Oct: Agreement and audit
- [ ] Get tutor sign-off on the two functionalities and record the feedback in `docs/` (Nour)
- [ ] Draft Contribution Matrix (Sadik)


### Wed 28 Oct: Backlog and sprint plan)
- [ ] Commit `docs/product-backlog.md` (Rayan)

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
