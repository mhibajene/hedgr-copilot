# ADR 0021 — MC-S3-004: regression resistance for shipped Stability Engine trust surfaces (closeout record)

**Status:** Accepted  
**Date:** 2026-04-06  
**Owners:** Hedgr Core  
**Scope:** Hermetic frontend test contract only — `apps/frontend/__tests__/engine-notices-and-mock-contract.test.ts` (**§35**)

**Notion mirror (non-authoritative):** D-021

---

## Interpretation

This document records **`MC-S3-004`** as a **test-only** ticket that **locks existing** notice copy and mock notice wiring. It is **not** new doctrine, **not** Warmth implementation, and **not** authorization to expand engine semantics. **ADR 0016** acceptance does **not** imply this ticket or successor work; **§7** / **§7a** remain the implementation gates.

---

## Context

Shipped Stability Engine trust surfaces already expose **`ENGINE_NOTICE_COPY`** and **`getMockEngineState`** notice behavior for non-`normal` postures. Without a focused Vitest contract, informational / non-ledger framing could drift during refactors.

Canonical completion detail: **`HEDGR_STATUS.md` §35**; merged PR **#111**.

---

## Decision

1. **`MC-S3-004`** is **closed** as **test-only** regression protection: Vitest asserts **`ENGINE_NOTICE_COPY`** completeness and informational framing for non-`normal` postures, and **`getMockEngineState`** notice wiring consistency.

2. **No** new `EnginePosture` values, **no** new product behavior, **no** implementation widening beyond mirroring **already-shipped** trust semantics.

3. **No** ADR or doctrine change under ticket intent (this ADR is a **closeout record**, not a new boundary expansion).

4. Sequencing: **§7** / **§7a** record completion per governance discipline; **no** successor is implied by this ADR.

---

## Consequences

- CI gains a **stable contract** for notice copy and mock notices without claiming new runtime authority.
- Reviewers should not cite these tests as **ledger truth** or **execution intent**; they guard **copy and wiring** only.

---

## References

- `docs/ops/HEDGR_STATUS.md` **§6** (`MC-S3-004`), **§7**, **§7a**, **§35**
- `apps/frontend/__tests__/engine-notices-and-mock-contract.test.ts`
- `docs/decisions/0014-stability-engine-read-only-in-sprint-2.md`
- `docs/decisions/0013-allocation-bands-informational-not-accounting.md`
- `docs/decisions/0016-warmth-layer-doctrine-constrained-retail-refinement-track.md` (acceptance ≠ implementation)
- `docs/decisions/0020-mc-s3-003-adr-0016-accepted-and-authority-surfaces-reconciled.md`
- `AGENTS.md` (CI hermetic posture)
