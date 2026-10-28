# DESD Group 41: Bristol Regional Food Network

**Module**: UFCFTR-30-3 Distributed and Enterprise Software Development (2026-27)<br>
**Chosen use case**: Use Case 2, Customer Multi-Vendor Order, Checkout and Payment<br><br>
Jira board: https://desd2026-2027.atlassian.net/jira/software/projects/KAN/boards/2?filter=&groupBy=none

## Team and roles (subject to change)

| Member | Role | Responsibilities | Main deliverables |
|---|---|---|---|
| **Nour** | Strategic BPMN and Scope | Marketplace pool of the strategic BPMN and the merge into one model; agreeing the two major functionalities with the module team | `docs/strategic-bpmn/`, `docs/functional-scope-proposal.md` |
| **Rayyan** | Stakeholders and Backlog | Set up the GitHub repository and Jira board; stakeholder analysis; Customer and Producers pools of the strategic BPMN; user stories, priorities and product backlog | `docs/stakeholders.md`, `docs/product-backlog.md` |
| **Fares** | Business Rules and Payment | Business rules for Use Case 2 (5% commission, retry on decline, payment outage handling); Payment Service pool of the strategic BPMN; simulated payment service setup | `docs/business-rules.md`, payment sandbox |
| **Sadik** | Repository and Project Management | Managing the Jira board and GitHub repository (checking work is pushed, reviewed and merged correctly); branch protection; Logistics/Collection pool of the strategic BPMN; README; Sprint 1 plan; Contribution Matrix; shared data model (Sprint 2) | `README.md`, `docs/sprint-1-plan.md`, `docs/contribution-matrix.md`, `docs/data-model.md` |

All members review each other's pull requests and take part in the sprint reviews.

## Scope

The strategic BPMN covers Use Case 2.


## Repository structure

- `docs/strategic-bpmn/`: strategic BPMN model (`.bpmn` plus image exports)
- `docs/functional-scope-proposal.md`: the two major functionalities proposed to the module team
- `docs/stakeholders.md`: stakeholder analysis
- `docs/product-backlog.md`: product backlog
- `docs/sprint-1-plan.md`: Sprint 1 plan
- `docs/business-rules.md`: business rules for Use Case 2
- `docs/contribution-matrix.md`: Contribution Matrix (updated as the sprints progress)
- `docs/data-model.md`: shared data model (Sprint 2)

Further folders (i* models, operational BPMN, Camunda forms, service task code) will be added as the sprints progress.

## How to open the diagrams

Open the `.bpmn` files in Camunda Modeler (Camunda 8, diagrams created for version 8.6). The strategic BPMN is a design diagram and is not executable. The executable processes are built in Sprints 2 and 3.

## Access

The module team will be added as collaborators at the end of the semester, as confirmed by the module leaders.

## Working rules

- Never work directly on `main`.
- One Jira issue is one branch, and the issue key goes in the branch name, commit messages and pull request title (for example `KAN-3`).
- Every pull request needs a review from a teammate before it is merged.
- Never commit passwords, API keys or `.env` files.
- Keep branches short-lived and commits small.
- Everyone commits their own work under their own account.