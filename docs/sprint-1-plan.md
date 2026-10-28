# Sprint 1 Plan: Strategic Process Analysis and Project Setup

**Module:** UFCFTR-30-3 Distributed and Enterprise Software Development (Task 1)<br>
**Use case:** Use Case 2, Customer Multi-Vendor Order, Checkout and Payment
**Scope note:** The strategic BPMN covers Use Case 2 only, as advised by our supervisor.
**Sprint window:** 22 to 29 October 2026 (submission deadline: 29 October)

## Sprint Goal

Deliver a strategic BPMN model of the marketplace, a scoped pair of major functionalities agreed with the module team, and an initial product backlog and sprint plan, with a clear repository history from every member.

## Task Plan

### Done
- [x] Create GitHub repository and Jira board (Rayyan)
- [x] Manage Jira board and GitHub repository, and check work is pushed and reviewed (Sadik, ongoing)
- [x] Divide team roles (all)
- [x] Write Sprint 1 plan (all)

### Thu 22 Oct: Setup
- [x] Finish Jira board with all sprint deadlines and owners (Rayyan)
- [x] Protect `main` (Sadik)
- [x] Ask module leaders about repo access; they will be added as collaborators at the end of the semester (Sadik)
- [x] Commit README with team, roles and board link (Sadik)
- [x] Prepare individual stand-up updates (all)

### Fri 23 Oct: Scope and analysis
- [x] Write `docs/functional-scope-proposal.md`: two functionalities, rationale, confirmation boundary, actor-to-responsibility table (Nour)
- [x] Write `docs/stakeholders.md` (Rayyan)
- [x] Write `docs/business-rules.md`: 5% commission, decline retry, payment outage handling (Fares)
- [x] Open PRs and review each other's work (all)

### Sat 24 to Mon 26 Oct: Strategic BPMN
- [x] Draft Customer and Producers pools (Rayyan)
- [x] Draft Payment Service pool and payment message flows (Fares)
- [x] Draft Logistics/Collection pool (Sadik)
- [x] Draft Marketplace pool with lanes, plus the four collapsed sub-processes and process relationships (Nour)
- [x] Group review against the checklist below (all, Mon 26)
- [x] Export `.bpmn`, `.svg`, `.png` to `docs/strategic-bpmn/` and merge via PR (Nour)


### Mon 26 to Tue 27 Oct: Backlog 
- [x] Commit `docs/product-backlog.md` (Rayyan)

### Wed 28 Oct: Agreement and audit
- [ ] Get tutor sign-off on the two functionalities and record the feedback in `docs/` (Nour)
- [x] Check every member has merged PRs and commits; reassign a review or documentation task if not (Sadik)
- [x] Check the README links to the BPMN, scope document, backlog and this plan (Sadik)
- [x] Draft Contribution Matrix (Sadik)

### Thu 29 Oct: Submission day (before 14:00)
- [x] Final read-through of all artefacts (all)
- [x] Tag and push: `git tag -a v1.0-sprint1 -m "Sprint 1: Strategic BPMN and backlog"` then `git push origin v1.0-sprint1` (Sadik)
- [x] Rehearse explanations so every member can answer questions (all)

## Dependencies and Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Tutor sign-off on the two functionalities is delayed | Scope cannot be final | Ask at the first available lab session or stand-up; record any feedback |
| A member has no commits by Wed 28 | Uneven contribution evidence | Assign a review or documentation task immediately |
| BPMN too detailed | Loses strategic abstraction marks | Group review checklist on Mon 26 |
| Late merge conflicts in shared docs | Lost work, rushed commits | Small PRs, one owner per file |

## Next Sprint

Sprint 2 begins on 2 November 2026: i* SD/SR models, two operational BPMN models and initial Camunda automation. The shared data model (`docs/data-model.md`, Sadik) is also planned for Sprint 2.
