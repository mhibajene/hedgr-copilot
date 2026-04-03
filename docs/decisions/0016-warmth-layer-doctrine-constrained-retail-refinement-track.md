# ADR 0016 — Warmth Layer as a doctrine-constrained retail refinement track during the read-only Stability Engine phase

- **Status:** Accepted
- **Date:** 2026-04-02
- **Accepted:** 2026-04-04
- **Decision Type:** UX/Trust
- **Strategic Horizon:** Short-term (MVP / immediate sprint)
- **Visibility:** Internal
- **Owners:** Hedgr Core

---

## Acceptance note

This ADR is **Accepted** as the institutional boundary for a **Warmth Layer** presentation-refinement track during the read-only Stability Engine phase.

This ADR originated during the **read-only Stability Engine** phase; its acceptance now records a **continuing boundary reference** for **future, scoped** presentation refinement—not a phase change. It remains **subordinate** to current repo authority in **`docs/ops/HEDGR_STATUS.md`** (including **§7** / **§7a** sequencing and any superseding ops updates).

**Acceptance does not authorize implementation** of Warmth-scope UI changes by itself. Shipping presentation work remains subject to **`docs/ops/HEDGR_STATUS.md` §7** / **§7a** and must remain consistent with **ADR 0013** (informational allocation), **ADR 0014** (read-only Sprint 2 engine), **ADR 0015** (engine as system center; Copilot containment), and **ADR 0017** where the transaction review dev seam applies.

---

## Context

Hedgr’s current Stability Engine trust surfaces are increasingly coherent, disciplined, and doctrine-aligned, but they risk reading as overly mechanical for retail users.

During Phase 3 Stability Engine implementation, an opportunity emerged to refine the UI in parallel through a constrained **Warmth Layer** that improves:

- readability
- emotional accessibility
- retail approachability
- action legibility

without weakening the current system posture.

This decision is required because the current phase remains explicitly:

- read-only
- posture-first
- non-executing
- trust-first
- governance-constrained

Current implementation posture also makes the boundary explicit:

- the Stability Engine remains read-only and informational
- allocation bands remain informational, not accounting truth
- no hidden execution, fund movement, or autonomous reallocation may be introduced
- no ledger duplication or balance truth should be implied by engine UI
- no live backend engine coupling should be introduced in the current phase

The question is not whether Hedgr should become more exciting.

The question is whether Hedgr can become more readable, humane, and retail-legible without introducing doctrine drift.

---

## Decision

Hedgr will introduce a **Warmth Layer** as a **parallel, doctrine-constrained retail refinement track** during the current read-only Stability Engine phase.

This track is approved to refine **presentation**, not product truth.

The Warmth Layer may improve:

- geometry
- spacing
- typography hierarchy
- terminology clarity
- humane microcopy
- action discoverability
- progressive explanation

The Warmth Layer may not introduce or imply:

- executed fund movement
- hidden automation
- allocation as accounting truth
- ledger duplication
- engine authority beyond current phase posture
- APY-led framing
- gamified trust or stability semantics

This decision formalizes the Warmth Layer as an allowed design and UX refinement stream while keeping the current read-only Stability Engine boundary intact.

---

## Rationale

### Why this option

Hedgr doctrine does not permit excitement-led financial UX.

It does require:

- trust
- clarity
- restraint
- comprehension
- calmness
- visible risk

The correct move is therefore not a redesign.

The correct move is a constrained refinement pass that makes the interface feel more humane and legible without changing system meaning.

### Why now

The current Stability Engine trust cluster now has enough structure to refine safely. Existing merged surfaces include:

- posture header
- notice banner
- allocation bands
- explainability layer
- protective guidance
- review snapshot
- cadence cue
- change signal
- recent stability memory

These form a coherent trust cluster that can be refined visually and linguistically without widening execution scope.

### Why not defer entirely

Deferring all warmth work creates a risk that Hedgr remains doctrinally correct but emotionally distant.

In volatile economies, trust is not only structural correctness. It is also:

- legibility
- calmness
- comprehension
- the felt ability to understand what the system is signaling

The Warmth Layer exists to strengthen that trust perception without weakening truth boundaries.

---

## Scope

### Allowed now

#### Visual warmth refinements

- softer corner radii
- more breathing room between trust surfaces
- reduced control-panel density
- calmer grouping and spacing
- stronger typography hierarchy
- softer support-text treatment where readability is preserved

#### Terminology refinements

- `Advanced details` → `Model details`
- `History` → `Activity`

#### Humane microcopy

- plain-language wording
- calmer explanations
- better retail readability
- less mechanically phrased status/support copy

#### Progressive explanation

- constrained tooltips
- clarification layers
- orientation-first language
- onboarding support patterns that remain calm and non-promotional

---

## Constrained scope

The following may be explored, but only under explicit doctrine review.

### Action Strip

Allowed only if:

- status still precedes action
- actions remain visually subordinate
- no urgency framing appears
- no conversion-first posture is introduced

### Activity surface

Allowed only if it reflects:

- real user-visible lifecycle state
- real local memory/orientation surfaces
- real product truth already present in the frontend boundary

Not allowed if it becomes:

- shadow accounting
- a pseudo-ledger
- execution theater
- a fake operational feed

### Onboarding warmth layer

Allowed only if it is:

- educational
- calming
- plain-language
- low-pressure
- non-speculative

### Enhanced review or context surfaces

Allowed only if they describe:

- what the system is signaling
- what posture the user is seeing
- what remains available

Not allowed if they imply:

- funds moved
- the engine executed treasury changes
- settled allocation history
- authoritative system chronology beyond the current read-only phase

---

## Explicit exclusions

The Warmth Layer does **not** authorize:

- numeric stability scoring
- gamified safety or stability indicators
- APY-led hierarchy
- yield-first visual emphasis
- celebratory yield interactions
- streaks, rewards, or engagement gimmicks
- copy implying automatic reallocation unless canonically true
- copy implying hidden fund movement
- balance partitioning as engine truth
- ledger duplication
- backend engine coupling
- runtime authority expansion
- policy or treasury semantics inside presentation-layer UI

These exclusions are mandatory because the current phase remains read-only and informational, and because allocation bands remain informational rather than accounting truth.

---

## Copy rules

Warmth Layer copy must:

- prefer orientation over promise
- prefer calm description over dramatic phrasing
- prefer posture and targets over movement language
- preserve the legitimacy of waiting or doing nothing
- remain explanatory, not directive
- avoid certainty the product cannot prove

### Approved direction

- `current system targets`
- `protective posture`
- `within expected range`
- `growth capacity is currently capped lower`
- `no action is required`

### Disallowed direction

- `your allocation has been adjusted`
- `funds were moved`
- `capital shield activated`
- `yield was reduced for your capital`
- `fully protected`

---

## Implementation sequencing

### Warmth Layer v1 — safe refinements

- geometry softening
- spacing pass
- typography refinement
- terminology updates
- microcopy polish

### Warmth Layer v2 — constrained surfaces

- Action Strip exploration
- Activity surface exploration
- onboarding warmth layer
- explanatory tooltip layer

### Warmth Layer v3 — deferred pending stronger product truth

- richer activity or history semantics
- allocation history visualization
- engine-action phrasing
- any UI that risks looking like execution authority or shadow accounting

---

## Assumptions

This decision assumes:

- the Stability Engine remains read-only during the current phase
- current trust surfaces are stable enough to refine without widening scope
- design refinement can proceed in parallel without displacing core engine implementation
- the Warmth Layer is treated as a doctrine-governed refinement track, not a feature expansion track
- all affected copy and hierarchy changes will be reviewed against existing doctrine and current repo posture

---

## Risks and trade-offs

### 1. Doctrine drift

A warmth initiative can quietly become a consumer-fintech makeover.

- **Trade-off:** better accessibility vs weakened institutional restraint

### 2. Execution theater

Friendlier copy or activity surfaces may imply engine actions the product does not actually perform.

- **Trade-off:** stronger emotional reassurance vs loss of narrative integrity

### 3. Hierarchy slippage

Visual warmth changes may accidentally make actions or yield more prominent than stability posture.

- **Trade-off:** improved usability vs weakened trust-first weighting

### 4. Scope creep

Parallel refinement work may expand into redesign churn or pseudo-feature build.

- **Trade-off:** useful iteration vs delivery distraction during a sensitive architectural phase

### 5. False trust gains

A softer UI may feel safer without actually improving user understanding.

- **Trade-off:** aesthetic improvement vs genuine comprehension

---

## Mitigations

To manage the above risks:

- all Warmth Layer work must be reviewed against current doctrine and repo posture
- any change touching stability language, allocation wording, activity semantics, or hierarchy requires doctrine review
- numeric stability scoring remains prohibited
- APY must never become a primary visual anchor
- any activity-like surface must be explicitly checked for shadow-ledger drift
- copy must be reviewed for executed-movement overclaim
- Warmth Layer work should ship incrementally and reversibly, not as a large redesign batch

---

## Reversibility

**Reversible**

This decision is reversible because the Warmth Layer concerns:

- presentation
- wording
- hierarchy refinement
- limited UI structure

It does not alter:

- backend architecture
- financial logic
- policy logic
- ledger state

### Rollback path

- revert copy modules
- revert local UI refinements
- remove non-essential exploratory surfaces
- preserve core Stability Engine trust surfaces as already merged

---

## Revisit / kill criteria

Revisit or halt this decision if:

- Warmth Layer changes begin to introduce execution semantics
- trust surfaces begin to imply accounting truth
- action or yield becomes visually dominant over posture and stability
- numeric scoring or gamification pressure re-enters designs
- scope starts displacing Phase 3 core work
- design refinements cannot be maintained without repeated doctrine exceptions

Kill the track if it becomes a stealth redesign or materially weakens the trust-first posture.

---

## Strategic pillar alignment

### Supports

- **Security & Trust** — improves legibility and comprehension without weakening truth boundaries
- **Simplicity & UX** — reduces cognitive friction and improves readability
- **Education & Empowerment** — helps users understand posture, allocation, and protective framing more clearly
- **Scalability** — creates a clearer retail presentation layer that can later scale across products and markets

### Tensions

- **Sustainable Yield Generation** — only if warmth work slips into yield-led presentation
- **Regulatory Awareness** — only if language begins to overstate protection or certainty

No direct pillar violation exists if the decision remains constrained to presentation refinement and doctrine-safe wording.

---

## Consequences

### Positive

- Hedgr becomes more retail-legible without becoming hype-led
- trust surfaces can feel calmer and more humane
- readability improves without widening the engine boundary
- the product can better support recurring review behavior through clarity rather than theater

### Negative

- introduces another review layer for copy and hierarchy decisions
- creates a risk of accidental drift if execution discipline weakens
- may tempt non-core redesign work during an active implementation phase

### Neutral / operational

- should be treated as a parallel refinement track, not a core architecture track
- should be implemented incrementally
- should remain easy to reverse

---

## Follow-on artifacts

- Warmth Layer backlog classified into v1 / v2 / deferred
- constitutional alignment check by trust surface
- component-level delta memo with banned-pattern list
- copy review pass across posture, review, activity, and withdrawal wording

---

## Closing principle

Hedgr will not become warmer by becoming louder.

It will become warmer by becoming:

- clearer
- calmer
- easier to read
- easier to trust
- easier to understand

The Warmth Layer is approved only as a doctrine-constrained refinement track during the read-only Stability Engine phase.

It improves presentation.

It does not widen truth.