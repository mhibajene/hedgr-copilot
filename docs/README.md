# Hedgr Docs Index

Status: Navigation index  
Scope: `docs/`

This file explains where repo documentation belongs. It is a navigation aid only; it does not create sequencing authority, implementation authority, or doctrine.

## Authority Map

1. `.cursorrules` governs doctrine, product posture, architecture invariants, and anti-drift rules.
2. `AGENTS.md` governs repo execution, CI posture, agent roles, and operating rules.
3. `docs/ops/HEDGR_STATUS.md` is the canonical handoff file for merged implementation truth, strategic continuity, and `§7` / `§7a` sequencing authority.
4. `docs/decisions/` holds accepted ADRs and decision records.
5. `docs/doctrine/` holds doctrine and product/system source material.
6. Other `docs/ops/**` artifacts are subordinate operating, governance, evidence, review, or readout material unless explicitly elevated through the governed repo chain.
7. MVP institutional acceptance criteria (non-executing) live under `docs/ops/governance/mvp/` — see `HEDGR_MVP_ACCEPTANCE_FRAMEWORK.md` and `HEDGR_MVP_EVIDENCE_REGISTER.md`. Governing principle: ADR **0024** (**Accepted**; `docs/decisions/0024-mvp-acceptance-is-evidence-gated-not-feature-gated.md`). These define institutional “done” and evidence recording only; they do not alter implementation authority.

## Where Files Belong

- `architecture/` - system architecture, runtime posture, and technical overview material.
- `contracts/` - API, policy, and contract surface documentation.
- `copilot/` - AI Copilot reference docs and threat-model material.
- `decisions/` - ADRs and decision indexes.
- `doctrine/` - doctrine, constitutional, whitepaper, allocation, UX, and product baseline documents.
- `modules/` - module-level implementation or responsibility notes.
- `ops/` - repo operations, governance status, reviews, runbooks, and bounded evidence/readout artifacts.
- `strategy/` - strategic thesis documents.
- `ui/` - static UI references or mirror artifacts.

## Operating Rule

When a document could fit multiple folders, place it by authority and use:

1. canonical status / sequencing material in `docs/ops/`
2. durable doctrine in `docs/doctrine/`
3. accepted decisions in `docs/decisions/`
4. operational procedure in `docs/ops/runbooks/`
5. subordinate governance evidence in `docs/ops/governance/`
6. lane-specific critique or readout artifacts in the relevant `docs/ops/<lane>/` folder

Do not move canonical authority files casually. If a path is referenced by `AGENTS.md`, `.cursor/commands/**`, CI, or `HEDGR_STATUS.md`, move it only through an explicit docs-reorganization ticket with reference updates.
