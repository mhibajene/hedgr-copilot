# ADR 0022 — MC-S3-005: Warmth Layer v1 constrained presentation refinement (closeout record)

**Status:** Accepted  
**Date:** 2026-04-06  
**Owners:** Hedgr Core  
**Scope:** Presentation-only frontend refinement — shipped Stability Engine trust cluster in `apps/frontend` (**§36**, **§6** `MC-S3-005`)

**Notion mirror (non-authoritative):** D-022

---

## Interpretation

This document records **`MC-S3-005`** as a **presentation-only** ticket on **already-shipped** read-only Stability Engine trust surfaces. It is **not** new product doctrine, **not** execution or accounting authority, and **not** permission to widen the engine boundary, Copilot, policy integration, or the transaction-review dev seam. **ADR 0016** remains the *boundary* reference; this ADR is a **closeout record** for a **§7**-authorized implementation.

---

## Context

Under **ADR 0016** and **`HEDGR_STATUS.md` §7** / **§7a**, Warmth Layer work must stay presentation-only: geometry, spacing, typography, humane microcopy, and retail legibility **without** changing trust meaning. **`MC-S3-004`** regression tests must continue to guard **`ENGINE_NOTICE_COPY`** and **`getMockEngineState`** notice wiring.

Canonical completion detail: **`HEDGR_STATUS.md` §36** and **§6** (`MC-S3-005`).

---

## Decision

1. **`MC-S3-005`** is **closed** as **presentation-only** refinement on the dashboard engine trust cluster and ticket-local `lib/engine` copy modules, with test updates limited to tracking presentation/copy deltas.

2. **No** new `EnginePosture` values, **no** new trust states, **no** information-architecture restructuring that changes perceived IA, **no** backend or live engine coupling, **no** policy or Copilot widening, **no** expansion of ADR **0017** transaction-review seam semantics.

3. **No** new governing product ADR under ticket intent; **ADR 0022** exists for **traceability** only.

4. Sequencing: **§7** / **§7a** record completion; **no** successor is named until governance updates **§7**.

---

## Consequences

- Operators and reviewers have a **repo-native closeout** aligned with **§36** for the first scoped Warmth implementation pass.
- This ADR must **not** be cited as authorization for future warmth or engine work without a fresh **§7**-named ticket.

---

## References

- `docs/ops/HEDGR_STATUS.md` **§6** (`MC-S3-005`), **§7**, **§7a**, **§36**
- `docs/decisions/0016-warmth-layer-doctrine-constrained-retail-refinement-track.md`
- `docs/decisions/0013-allocation-bands-informational-not-accounting.md`
- `docs/decisions/0014-stability-engine-read-only-in-sprint-2.md`
- `docs/decisions/0015-stability-engine-is-the-system-center.md`
- `docs/decisions/0017-transaction-review-simulator-dev-seam-mc-s2-021.md`
- `docs/decisions/0021-mc-s3-004-regression-resistance-for-shipped-trust-surfaces.md`
- `AGENTS.md` (CI hermetic posture)
