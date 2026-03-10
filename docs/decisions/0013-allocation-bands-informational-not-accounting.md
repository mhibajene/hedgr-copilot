# ADR 0013 — Allocation Bands Are Informational, Not Accounting

**Status:** Accepted  
**Date:** 2026-03-08  
**Owners:** Hedgr Core  
**Scope:** `apps/frontend` (dashboard allocation visualization, engine-driven target display)

---

## Context

Sprint 2 introduces dashboard allocation bands driven by `EngineState`, including:

- `liquidityTargetPct`
- `coreTargetPct`
- `yieldCapPct`

These values are intended to communicate system posture and target structure to users. However, without a formal boundary, users or future implementers could misinterpret these values as:

- actual balances
- executed portfolio positions
- settled treasury allocations
- user-specific holdings

That would create shadow accounting risk and weaken Hedgr’s ledger-first architecture.

Hedgr’s canonical financial state remains the ledger and its transaction history. Allocation bands in Sprint 2 are purely explanatory and must not become an alternate financial truth.

---

## Decision

Allocation bands rendered from `EngineState` are **informational projections only**.

They represent system target posture, not:

- ledger balances
- executed allocations
- settled positions
- guaranteed outcomes
- user-owned asset partitions

The dashboard may display allocation bands to explain how Hedgr is currently prioritizing liquidity, core allocation, and yield capacity at a system level.

These bands must not be treated as accounting data.

The ledger remains the sole source of truth for financial state shown to the user.

---

## Consequences

### Positive
- Protects against shadow accounting.
- Preserves clarity between system posture and actual balances.
- Keeps Sprint 2 UI safely within architectural scope.
- Supports trust-first communication by avoiding overstated claims about fund placement.

### Trade-offs
- Users may need additional explanatory copy to understand that the bands are targets, not live positions.
- The UI must work harder to distinguish informational guidance from financial facts.

---

## Implementation Notes

- Allocation band labels and supporting copy should clearly communicate “target” or “current protection posture” rather than executed allocation.
- The dashboard must not visually imply that funds have already moved.
- Allocation visualizations must not be reused as balance components.
- Any future execution layer that performs actual treasury movement must be reflected through explicit transaction and ledger flows, not through direct reinterpretation of UI bands.

---

## Related ADRs

- [ADR 0014 — Stability Engine Is Read-Only in Sprint 2](./0014-stability-engine-read-only-in-sprint-2.md)
- [ADR 0015 — Stability Engine Is the System Center](./0015-stability-engine-is-the-system-center.md)

---

## Follow-ups

- Add copy guidance for allocation bands in the UX layer.
- Consider a small explanatory hint or caption where needed to reduce misinterpretation.
- Reassess the visualization contract once live treasury execution exists.