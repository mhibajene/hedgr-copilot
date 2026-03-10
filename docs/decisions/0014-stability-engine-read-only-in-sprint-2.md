# ADR 0014 — Stability Engine Is Read-Only in Sprint 2

**Status:** Accepted  
**Date:** 2026-03-10  
**Owners:** Hedgr Core  
**Scope:** `apps/frontend`, Sprint 2 Stability Engine foundation, local simulation, dashboard posture communication

---

## Context

Sprint 2 introduces the first frontend representation of the Hedgr Stability Engine, including:

- canonical `EngineState`
- mock engine state provider
- posture communication UI
- allocation target visualization
- local posture simulation for safe frontend testing

At this stage, no live engine computation, treasury execution, or ledger mutation should be introduced through the Sprint 2 frontend layer.

Without a formal architectural boundary, implementers may start using the Stability Engine surface as an execution object, policy engine, or accounting substitute. That would create premature coupling between frontend posture communication and treasury operations.

Hedgr's constitutional doctrine requires capital preservation above all, liquidity before yield optimization, visible risk, and governance before scale. The Stability Model also separates structural allocation governance from execution mechanics and treats withdrawal reliability as mission-critical. Sprint 2 therefore needs an explicit read-only boundary.

---

## Decision

For Sprint 2, the Stability Engine surface exposed to the frontend is **read-only**.

This means Sprint 2 engine-related frontend code may:

- represent current posture
- display target allocation structure
- render calm explanatory notices
- support safe local simulation for UI validation

Sprint 2 engine-related frontend code may not:

- execute rebalancing
- mutate balances
- initiate routing
- encode transaction authority
- act as a treasury instruction layer
- substitute for policy approval or market-availability decisions
- become a ledger or accounting source

Any execution-capable engine behavior is out of scope for Sprint 2 and must be introduced later through a separate, explicitly governed contract.

---

## Consequences

### Positive
- Preserves a clean separation between communication layer and execution layer.
- Prevents premature coupling to backend or treasury operations.
- Keeps Sprint 2 reversible, mockable, and low-risk.
- Supports deterministic UI development without implying live operational authority.
- Protects withdrawal-first doctrine by avoiding unsafe execution shortcuts.

### Trade-offs
- Sprint 2 will not demonstrate full engine mechanics.
- Some future additive migration will be required when execution contracts are introduced.
- Teams must be disciplined about not overloading read-only posture types with operational meaning.

---

## Implementation Notes

- `EngineState` and related Sprint 2 types are posture outputs only.
- Frontend engine representations must remain transport-friendly and mockable.
- Local simulation is permitted only for UI and state-validation purposes.
- No engine-related Sprint 2 component should expose verbs such as rebalance, suspend, recall, or route.
- No hook, provider, or UI surface may imply treasury action authority.
- Any later execution architecture must be introduced via a distinct ADR and separate typed contract.

---

## Related ADRs

- [ADR 0013 — Allocation Bands Are Informational, Not Accounting](./0013-allocation-bands-informational-not-accounting.md)
- [ADR 0015 — Stability Engine Is the System Center](./0015-stability-engine-is-the-system-center.md)

---

## Follow-ups

- Create and maintain a canonical `EngineState` contract for Sprint 2.
- Ensure mock providers and simulator utilities remain non-executing.
- Reference this ADR in all Sprint 2 engine foundation tickets.
- Reassess the read-only boundary when Sprint 3 introduces explicit execution intent or backend engine computation.
