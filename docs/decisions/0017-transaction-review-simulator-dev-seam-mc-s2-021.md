# ADR 0017 — Transaction review simulator seam (MC-S2-021 boundary note)

**Status:** Accepted  
**Date:** 2026-04-03  
**Owners:** Hedgr Core  
**Scope:** `apps/frontend` deposit/withdraw routes, local dev-only reviewability

---

## Context

MC-S2-021 adds a **dev-only**, **URL-driven** seam so reviewers can surface existing deposit/withdraw trust UI (including withdraw non-final trust strips) when FX rate absence would otherwise block the mock confirm path, and optionally hold the withdraw mock in `PENDING` for sustained inspection.

Without documented boundaries, future work might treat this seam as precedent for production behavior, fallback pricing, or a growing internal “simulation control plane.”

This ADR records **implementation boundaries only**. It does **not** expand product doctrine, execution authority, or customer-facing semantics.

---

## Decision

1. **Enablement** matches the shared local dev simulation guard (`isLocalDevSimulationSeamEnabled`): off in CI, `NODE_ENV` of `test` or `production`, and when `NEXT_PUBLIC_APP_ENV` is not `dev`.

2. **Query parameters** (`txReviewBypassFx=1`, `txReviewHoldPending=1`) are **review-only**, **simulation-only**, and **ticket-scoped**. They are not a generic transaction simulation framework. Additional flags require a new ticket and governance.

3. **`bypassFxForConfirm`** is a **reviewability override** for the local page guard only. It must not be cited as precedent for customer-facing continuation without pricing certainty, fallback pricing, or degraded execution product rules.

4. **Deposit** ledger rows may use `amount_usd: 0` / `fx_rate: 0` only as **technical placeholders** when the review bypass runs without a rate; the UI must **not** present these as real conversion truth (preview remains explicitly unavailable).

5. A **visible dev-only banner** is required whenever the seam is active on deposit/withdraw, to separate mocked review state from runtime product truth.

6. **No** new `PublicTxStatus` values, backend transaction-state changes, or production-facing controls are introduced by this seam.

---

## Consequences

- Engineers and reviewers have a single place to read what the seam is allowed to do.
- Product and compliance discussions should not treat URL params or bypass behavior as shipped customer contracts.
- Future expansion of simulation surfaces should default to **new ADRs or status-doc tickets**, not ad-hoc query growth under MC-S2-021.

---

## References

- `docs/ops/HEDGR_STATUS.md` §6 (`MC-S2-021`), §27 (completed ticket summary)
- `apps/frontend/lib/dev/local-simulation-guard.ts`
- `apps/frontend/lib/tx/tx-review-simulator.ts`
- `docs/decisions/0014-stability-engine-read-only-in-sprint-2.md` (read-only Sprint 2 posture, by analogy)
