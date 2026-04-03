# Sprint 2 ADR Index

## Purpose

This index lists the architecture decisions that govern Sprint 2 of Hedgr's Stability Engine Foundation.

Sprint 2 is read-only, posture-first, and non-executing. These ADRs exist to ensure implementation remains aligned with Hedgr's Stability-Engine-led roadmap, trust-first UX doctrine, and ledger-first architecture.

**Interpretation (index scope).** This index organizes Sprint 2 doctrinal context for readers and sequencing reference within that sprint. It does not, by itself, authorize Sprint 3 continuation, Sprint 3 ticket ordering, or any implementation work.

**Traceability — post-foundation boundary readiness (MC-S3-001).** The canonical transition-readiness taxonomy, classification-not-authorization rule, and inherited Phase 4/5 inventory framing live in `docs/ops/HEDGR_STATUS.md` **§6b**. That section does not authorize work; **`HEDGR_STATUS.md` §7** names approved implementation tickets.

**Traceability — governance continuity (MC-S3-002).** Sprint and transition **ticket sequencing** and the **approved next** implementation ticket are authoritative only in **`HEDGR_STATUS.md` §7** (brief in **§7a** when active). **§6b** remains classification and scrutiny input, not authorization—do not treat inventory rows or disposition labels as approval.

**Traceability — ADR 0016 acceptance (MC-S3-003).** ADR **0016** is **Accepted** as a boundary reference for constrained retail presentation during the read-only engine phase; **`HEDGR_STATUS.md` §7** / **§7a** still govern any **implementation** ticket. Acceptance is **not** a substitute for **§7**-named scoped work.

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
**Meta:** Accepted · UX/Trust · Short-term (MVP / immediate sprint) · Internal

**Why it matters**  
Frames the **Warmth Layer** as a *doctrinal reference* for how retail presentation (layout, typography, microcopy, discoverability) may be refined while the Stability Engine remains read-only—without reframing product truth. **Accepted:** this decision is institutionally binding for *scope and red lines* on warmth work; it is **not** a substitute for **`HEDGR_STATUS.md` §7** naming an implementation ticket.

**Notes**  
Constrained UI warmth work may proceed only when **§7** / **§7a** authorize a scoped ticket and the work stays presentation-only: no execution semantics, no allocation-as-accounting, no engine or Copilot authority widening (see **Constrains** / **Prevents** below).

**Constrains**
- intended scope of presentation and trust-legibility work that might run alongside the read-only engine phase when ops posture and accepted ADRs align
- doctrine review for constrained surfaces called out in the ADR (e.g. Action Strip, Activity, onboarding warmth, context/review), if and when that ADR is accepted or reflected in ops authority

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

### ADR 0017 — Transaction review simulator dev seam (MC-S2-021 boundary note)
**Why it matters**  
Documents boundaries for the dev-only deposit/withdraw URL review seam so it is not mistaken for product semantics, fallback pricing, or an open-ended simulation control plane.

**Constrains**
- `apps/frontend/lib/tx/tx-review-simulator.ts`
- `apps/frontend/lib/dev/local-simulation-guard.ts`
- deposit/withdraw pages when review params are present

**Prevents**
- treating review bypass as precedent for prod execution or pricing
- undocumented expansion of tx simulation query flags

**File**  
`docs/decisions/0017-transaction-review-simulator-dev-seam-mc-s2-021.md`

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

### MC-S2-021 — Transaction mock-state observability seam
**Governed by**
- ADR 0014 (read-only / non-executing posture, by analogy)
- ADR 0017 (seam boundaries)

Dev-only, review-only URL seam for deposit/withdraw mock flows; not customer-facing; no new `PublicTxStatus`; no backend changes.

**Index posture:** Merged / shipped. Canonical merged truth: `docs/ops/HEDGR_STATUS.md` §6 (`MC-S2-021`); shipped summary: §27.

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

Even where this index is only indirectly relevant, engine-facing work remains subject to `AGENTS.md` and current authority in `docs/ops/HEDGR_STATUS.md`.

Before implementing any Sprint 2 ticket, or Warmth-layer / adjacent presentation work that cites this index:

1. Check the relevant ADRs in this index.
2. Confirm the ticket does not violate read-only boundaries.
3. Confirm the ticket does not introduce accounting or execution semantics.
4. Confirm the output supports calm, trust-first, posture-based UX.
5. **Defer to current authority in `docs/ops/HEDGR_STATUS.md`** for what is in scope, merged, and allowed in the repo right now—especially **§7** / **§7a** for the approved next ticket; **§6b** is taxonomy only. This index and any **Proposed** ADR are not sufficient on their own to authorize implementation.
6. For Warmth Layer or adjacent retail presentation refinement on ADR 0016 constrained surfaces, with **0016** **Accepted**, treat it as a binding *boundary* input—but still require **`HEDGR_STATUS.md` §7** / **§7a** for scoped implementation; stay presentation-only with no truth or execution widening.

If a ticket conflicts with one of these ADRs, stop and escalate before implementing.

---

## Follow-up

Update this index whenever:

- a new Sprint 2 ADR is accepted
- a ticket gains or loses doctrinal dependencies
- Sprint 2 scope materially changes
