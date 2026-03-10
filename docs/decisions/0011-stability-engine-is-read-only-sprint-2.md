# ADR 0011 — Stability Engine is Read-Only in Sprint 2

**Status:** Accepted  
**Date:** 2026-03-08  
**Owners:** Hedgr Core  
**Scope:** `apps/frontend` (engine state contract, dashboard posture UI, allocation target visualization)

---

## Context

Sprint 1.1 established the minimum viable financial substrate for Hedgr:

- Ledger schema v2 as the canonical UI source of truth for balances and activity.
- Canonical transaction identity via `txn_ref`.
- Deterministic frontend ↔ backend contracts.
- Hermetic CI and E2E behavior.
- Trust-first communication patterns for financial UX.

Sprint 2 introduces the Hedgr Stability Engine. The goal of this phase is to surface system posture and allocation intent without introducing capital movement, treasury routing, or shadow accounting.

Without an explicit architectural boundary, the engine could drift into:

- mutating balances directly
- generating implicit accounting state
- coupling UI posture to execution side effects
- weakening rollback safety for early architecture work

We need a clear decision that preserves ledger integrity while allowing the engine contract and communication layer to ship.

---

## Decision

For Sprint 2, the Stability Engine is **read-only**.

The engine may produce a pure `EngineState` object used for:

- posture communication
- allocation target visualization
- future execution inputs

The engine may **not**:

- mutate balances
- write ledger transactions
- trigger treasury actions
- call DeFi providers
- ingest live market signals
- act as an accounting source of truth

In Sprint 2, all financial state remains governed by the existing transaction and ledger model.

The engine is therefore an **advisory posture layer**, not an execution system.

---

## Consequences

### Positive
- Preserves the ledger as the sole financial source of truth.
- Prevents shadow accounting during early engine rollout.
- Keeps Sprint 2 reversible and low risk.
- Allows posture and trust communication to be validated before execution complexity is introduced.
- Maintains hermetic CI and E2E behavior.

### Trade-offs
- The engine cannot yet demonstrate real treasury response.
- Some future execution concepts must be deferred until a later sprint.
- Additional integration work will be required when execution is introduced.

---

## Implementation Notes

- `EngineState` must remain a pure frontend contract.
- Engine-related modules must have no network dependency in Sprint 2.
- Dashboard posture badges, notices, and allocation bands must render from deterministic mock state only.
- Any future execution layer must sit downstream of the engine and generate ledger transactions explicitly rather than mutating balances directly.

---

## Follow-ups

- Introduce a separate ADR when moving from posture-only output to execution intent.
- Define the execution boundary that converts approved engine output into explicit transaction flows.
- Reassess rollback and feature-flag requirements before any live treasury action is introduced.