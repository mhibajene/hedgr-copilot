# Hedgr Active Doctrine Index

**Status:** Canonical repo-defined completeness index

**Authority:** `docs/ops/HEDGR_STATUS.md` §7a / `BRIDGE-P1-001` R2

**Date adopted:** 2026-07-19

**Scope:** Active doctrine membership for source-bound Repo Authority Projection generation

## Authority boundary

This index declares the complete active doctrine set consumed by the HedgrOps Bridge. It does not change doctrine meaning, precedence, implementation authority, ADR status, or ticket sequencing.

- `.cursorrules` remains the authority for doctrine precedence.
- `docs/ops/HEDGR_STATUS.md` §7 / §7a remains the authority for execution sequencing.
- Accepted ADRs remain indexed separately by `docs/decisions/SPRINT-2-ADR-INDEX.md`.
- Inclusion here does not make a doctrine document executable or override a narrower accepted ADR.
- Omission from the active set means the file is not an active doctrine input for Repo Authority Projection completeness; it may remain historical, draft, internal support, or another non-doctrine artifact.
- The Bridge must consume this exact index and must not discover, expand, or infer doctrine membership.

## Active doctrine set

| Order | Path | Repo-recorded posture |
| ----- | ---- | --------------------- |
| 1 | `docs/doctrine/hedgr-constitutional-charter.md` | Binding constitutional charter |
| 2 | `docs/doctrine/hedgr-governance-philosophy.md` | Binding governance operating philosophy |
| 3 | `docs/doctrine/hedgr-ux-constitution.md` | Canonical UX / trust / interaction doctrine |
| 4 | `docs/doctrine/hedgr-ux-constitution-addendum.md` | Binding extension to the UX Constitution |
| 5 | `docs/doctrine/d05-hedgr-consitutional-calibration.md` | Active, binding company-wide calibration |
| 6 | `docs/doctrine/hedgr-stability-engine.md` | Canonical Stability Engine specification |
| 7 | `docs/doctrine/hedgr-stability-model™ (Internal).md` | Binding internal Stability Model mechanics |
| 8 | `docs/doctrine/hedgr-stability-model™.md` | Public Stability Model summary |
| 9 | `docs/doctrine/hedgr-system-overview.md` | Canonical system architecture overview |
| 10 | `docs/doctrine/hedgr-product-surfaces.md` | Canonical product-surface definition |
| 11 | `docs/doctrine/hedgr-default-allocation-policy.md` | Binding retail allocation policy |
| 12 | `docs/doctrine/hedgr-retail-allocation-ux-specification.md` | Binding retail allocation UX specification |
| 13 | `docs/doctrine/hedgr-ai-copilot-trust-and-decision-framework.md` | Canonical Copilot trust and decision reference |
| 14 | `docs/doctrine/hedgr-mvp-project-specification.md` | Canonical doctrine-grade MVP baseline |
| 15 | `docs/doctrine/hedgr-whitepaper.md` | Canonical whitepaper |
| 16 | `docs/doctrine/hedgrops-decision-governance-and-adr-export-standard.md` | Decision governance and ADR export standard |

## Explicit non-members

The following repo files are not members of the active doctrine set:

- `docs/doctrine/PHASE_3_TRANSITION_MEMO.md` — Draft; not active authority.
- `docs/doctrine/hedgr-mvp-project-specification-v0.md` — Archived and explicitly non-authoritative.
- `docs/doctrine/hedgr-whitepaper-v0.md` — Superseded by the canonical whitepaper.

## Change control

Changes to membership require a repo-governed update that states why a document became active, inactive, superseded, or historical. The Bridge may report the index and its immutable revision; it may not decide membership, reconcile doctrine conflicts, or synthesize missing doctrine.
