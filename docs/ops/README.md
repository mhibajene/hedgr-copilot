# Hedgr Ops Docs Index

Status: Navigation index  
Scope: `docs/ops/`

This file organizes operational and governance documentation. It is a directory guide only. It does not authorize implementation, sequence work, or alter the authority of `docs/ops/HEDGR_STATUS.md`.

## Canonical Anchors

These files remain at the root of `docs/ops/` because they are common workflow and governance anchors:

- `HEDGR_STATUS.md` - canonical handoff file; merged truth and `§7` / `§7a` sequencing authority.
- `NOTION_GOVERNANCE_STAGING.md` - manual copy source for downstream Notion governance reconciliation.
- `HEDGR_SPRINT_PLANNING_PROTOCOL.md` - sprint planning and candidate-ticket procedure, subordinate to `HEDGR_STATUS.md`.
- `runbook.md` - PR, QA, label, and merge workflow.

## Folder Map

- `runbooks/` - local operations, CI, QA, secrets, observability, infra, and repo workflow procedures.
- `governance/class-b/` - Class B eligibility, gap, dependency, and legal / compliance prerequisite artifacts.
- `governance/copilot/` - Codex / Copilot governance conventions, briefs, critique readouts, and advisory-lane artifacts.
- `governance/mvp/` - MVP phase alignment, product concept notes, MVP Acceptance Framework, and MVP Evidence Register (institutional acceptance criteria; non-executing). Governing principle: ADR **0024** (`docs/decisions/0024-mvp-acceptance-is-evidence-gated-not-feature-gated.md`).
- `stability-engine/` - Stability Engine trust-surface evidence and UI governance disposition artifacts.
- `retail-ui/allocation/` - allocation presentation, legibility, family, and micro-test artifacts.
- `retail-ui/header/` - header and upper-shell refinement artifacts.
- `retail-ui/status-language/` - status copy, balanced-line, vocabulary, and meaning-refinement artifacts.
- `retail-ui/paper/` - Paper board, mockup, static reference, and low-fidelity UI artifacts.
- `retail-ui/prototype/` - prototype exploration, C3, visual reference, and spike artifacts.
- `retail-ui/implementation-readouts/` - bounded shipped-route and implementation readout artifacts.
- `reviews/` - recurring Weekly and MVP Process Review outputs and review usage guide.

## Authority Boundaries

- `§7` / `§7a` in `HEDGR_STATUS.md` remain the only activation surfaces.
- Folder placement does not imply queue order, implementation approval, ADR acceptance, or product readiness.
- Review, readout, critique, dependency-map, and eligibility artifacts remain subordinate evidence unless absorbed through the governed repo chain.
- Notion mirrors repo truth; it must not run ahead of `HEDGR_STATUS.md` or accepted ADRs.
