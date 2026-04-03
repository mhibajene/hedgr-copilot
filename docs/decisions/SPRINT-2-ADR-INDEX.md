# Sprint 2 ADR Index

## Purpose

This index lists the architecture decisions that govern Sprint 2 of Hedgr's Stability Engine Foundation.

Sprint 2 is read-only, posture-first, and non-executing. These ADRs exist to ensure implementation remains aligned with Hedgr's Stability-Engine-led roadmap, trust-first UX doctrine, and ledger-first architecture.

---

## Sprint 2 Doctrine Summary

- Stability Engine is the system center
- Sprint 2 engine surfaces are read-only
- Allocation bands are informational, not accounting
- Ledger remains canonical
- UX must communicate posture calmly and truthfully
- No execution semantics should enter Sprint 2

---

## Governing ADRs

### ADR 0016 — Warmth Layer as a doctrine-constrained retail refinement track during the read-only Stability Engine phase
**Meta:** Proposed · UX/Trust · Short-term (MVP / immediate sprint) · Internal

**Why it matters**  
Defines the **Warmth Layer** as an allowed parallel track to refine retail presentation (layout, typography, microcopy, discoverability) while the Stability Engine remains read-only—without reframing product truth.

**Notes**  
Permits UI warmth refinement in parallel; does not widen truth boundaries or execution authority.

**Constrains**
- presentation and trust-legibility work running alongside the read-only engine phase
- doctrine review for constrained surfaces called out in the ADR (e.g. Action Strip, Activity, onboarding warmth, context/review)

**Prevents**
- execution semantics and hidden fund movement
- allocation as accounting truth and ledger duplication
- APY-led framing and gamified stability language
- engine authority beyond current phase posture

**File**  
`docs/decisions/0016-warmth-layer-doctrine-constrained-retail-refinement-track.md`

---

### ADR 0015 — Stability Engine Is the System Center
**Why it matters**  
Defines the Stability Engine as Hedgr's product core and re-centers roadmap, backlog, and architecture around it.

**Constrains**
- Sprint 2 planning
- ticket sequencing
- UX role
- Copilot role
- release framing

**Prevents**
- wallet-first drift
- feature-led sequencing
- Copilot overreach
- APY-led framing

**File**  
`docs/decisions/0015-stability-engine-is-the-system-center.md`

---

### ADR 0014 — Stability Engine Is Read-Only in Sprint 2
**Why it matters**  
Defines the read-only architectural boundary for Sprint 2 engine work.

**Constrains**
- `EngineState` contract
- mock provider
- simulator behavior
- UI responsibilities

**Prevents**
- execution leakage
- premature backend coupling
- treasury instruction semantics in frontend state
- routing/mutation creep

**File**  
`docs/decisions/0014-stability-engine-read-only-in-sprint-2.md`

---

### ADR 0013 — Allocation Bands Are Informational, Not Accounting
**Why it matters**  
Protects against using engine posture and allocation bands as accounting truth.

**Constrains**
- allocation band UI
- `EngineState` semantics
- explanatory copy
- dashboard interpretation

**Prevents**
- shadow accounting
- ledger duplication
- misleading "funds already moved" UX
- balance-like misuse of target percentages

**File**  
`docs/decisions/0013-allocation-bands-informational-not-accounting.md`

---

## Ticket Mapping

### MC-S2-001 — Canonical EngineState contract
**Governed by**
- ADR 0014
- ADR 0013
- ADR 0015

### MC-S2-002 — Mock engine state provider
**Governed by**
- ADR 0014
- ADR 0015

### MC-S2-003 — Posture badge + notice banner
**Governed by**
- ADR 0014
- ADR 0015

### MC-S2-004 — Allocation bands UI
**Governed by**
- ADR 0013
- ADR 0014
- ADR 0015

### MC-S2-005 — Governance linkage for engine-facing changes
**Governed by**
- ADR 0013
- ADR 0014
- ADR 0015

Documentation and review-path alignment only (e.g. `AGENTS.md`, PR template, handoff). No runtime or product-behavior change by itself.

### MC-S2-006 — Stability communication copy
**Governed by**
- ADR 0013
- ADR 0014
- ADR 0015

Product-facing trust copy for posture context, notices, and allocation panel; read-only informational framing only. See `docs/ops/HEDGR_STATUS.md` §6 (MC-S2-006).

### MC-S2-019 — Withdrawal fallback-path clarity
**Governed by**
- ADR 0013
- ADR 0014
- ADR 0015

Read-only, frontend-centered withdrawal trust-surface refinement; clarifies constrained / slower non-final withdrawal path meaning; no new public transaction states; no backend fallback logic; no support workflow integration; no execution or accounting semantics.

**Index posture:** Merged / shipped. Canonical merged truth: `docs/ops/HEDGR_STATUS.md` §6 (`MC-S2-019`); shipped summary: §25.

### Merged implementation ids (canonical merged truth)

The following shipped under **`MC-S4-*`** ids; see **`docs/ops/HEDGR_STATUS.md`** for merged file lists and posture.

#### MC-S4-001 — Canonical Stability notice copy contract
**Governed by**
- ADR 0013
- ADR 0014
- ADR 0015

#### MC-S4-002 — Local posture simulator (hard dev-only boundaries)
**Governed by**
- ADR 0014
- ADR 0015

#### MC-S4-003 — Stability Engine trust-surface test coverage
**Governed by**
- ADR 0014
- ADR 0015

**Planning note:** Early drafts sometimes labeled simulator / notice work as `MC-S2-005` / `MC-S2-006`. **Merged truth** uses **`MC-S4-001`** / **`MC-S4-002`** / **`MC-S4-003`** as above. **`MC-S2-005`** is reserved for the Sprint 2 **governance-linkage** ticket in this index.

---

## Usage Rule

Before implementing any Sprint 2 ticket:

1. Check the relevant ADRs in this index.
2. Confirm the ticket does not violate read-only boundaries.
3. Confirm the ticket does not introduce accounting or execution semantics.
4. Confirm the output supports calm, trust-first, posture-based UX.
5. For Warmth Layer or adjacent retail presentation refinement on ADR 0016 constrained surfaces, confirm alignment with ADR 0016 (presentation only; no truth or execution widening).

If a ticket conflicts with one of these ADRs, stop and escalate before implementing.

---

## Follow-up

Update this index whenever:

- a new Sprint 2 ADR is accepted
- a ticket gains or loses doctrinal dependencies
- Sprint 2 scope materially changes
