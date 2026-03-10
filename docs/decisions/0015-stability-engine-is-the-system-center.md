# ADR 0015 — Stability Engine Is the System Center

**Status:** Accepted  
**Date:** 2026-03-10  
**Owners:** Hedgr Core  
**Scope:** Product architecture, roadmap logic, backlog sequencing, frontend trust expression, Copilot containment, operational trust

---

## Context

Hedgr's original product framing included wallet, Copilot, UX, and partner rails as prominent delivery surfaces. However, constitutional and strategic doctrine now make clear that these are supporting layers, not the product core.

D05 states:

- Hedgr is not a wallet
- the wallet is proof
- the Stability Engine is the product
- governance is the moat

The Constitutional Charter requires capital preservation above all, liquidity as sacred, visible risk, and governance before scale. The Stability Model and Default Allocation Policy show that Hedgr's real differentiation lives in managed allocation structure, liquidity minimums, exposure caps, stress adjustments, and disciplined capital governance. The Retail Allocation UX Specification further defines the retail interface as the visible layer of the Stability Engine, not a marketing surface.

Without a formal decision, roadmap and implementation work may continue to drift toward wallet-first sequencing, feature-led prioritization, or Copilot-led differentiation. That would create doctrinal mismatch and weaken system coherence.

---

## Decision

Hedgr's roadmap, backlog, and architecture are formally re-centered on the **Stability Engine** as the system center and primary product core.

From this point forward:

- The **Stability Engine** is the product core.
- The **wallet** is the validation and access surface.
- **Copilot** is the explanation and restraint layer.
- **Rails, custody, and ops** are the trust-delivery layer.
- **UX** is the visible expression of treasury doctrine.

All roadmap items must justify themselves by strengthening one of these:

1. Engine integrity
2. Trust expression of the engine
3. Reliable access to the engine

Work that does not support one of those must be deprioritized or challenged.

---

## Consequences

### Positive
- Aligns execution with constitutional doctrine.
- Reduces roadmap ambiguity and backlog drift.
- Makes trust, liquidity, and governance the actual sequencing center.
- Creates a stronger long-term moat around allocation governance rather than wallet surfaces.
- Clarifies the role of UX, Copilot, and rails as dependent but essential layers.

### Trade-offs
- Short-term feature velocity may appear slower.
- Some wallet-centric work will need deprioritization or reclassification.
- Engine, governance, and trust-expression work become more demanding operationally.
- Team discipline burden increases around ADRs, policy traceability, and versioning.

---

## Implementation Notes

- Release planning should be organized around:
  - Engine Core
  - Governance Infrastructure
  - Trust Expression
  - Operational Trust
  - Copilot Containment
- Wallet UI must express engine posture and allocation discipline, not compete with it.
- Copilot must remain advisory, non-directive, and subordinate to engine and policy logic.
- Rails and withdrawal reliability remain critical because users only experience the product truthfully if access works under stress.
- Product copy and roadmap language should avoid reverting to wallet-first or APY-first framing.

---

## Related ADRs

- [ADR 0013 — Allocation Bands Are Informational, Not Accounting](./0013-allocation-bands-informational-not-accounting.md)
- [ADR 0014 — Stability Engine Is Read-Only in Sprint 2](./0014-stability-engine-read-only-in-sprint-2.md)

---

## Follow-ups

- Refactor roadmap and work dashboard around Stability Engine-centered tracks.
- Ensure Sprint 2 tickets reference this ADR where relevant.
- Update MVP implementation briefs to reflect engine-first sequencing.
- Create or maintain a Sprint 2 ADR index so Cursor implementation stays aligned with doctrine.
- Revisit this ADR only if market evidence or regulatory constraints force a different system center.
