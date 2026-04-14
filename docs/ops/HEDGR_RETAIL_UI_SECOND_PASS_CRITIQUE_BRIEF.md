# HEDGR RETAIL UI SECOND PASS CRITIQUE BRIEF

Status: Paper exploration only  
Authority: Non-sequencing, non-implementation  
Scope: Targeted second-pass critique brief for Concept C refinement under bounded retail UI exploration  
Last updated: 2026-04-14

---

## 1. Purpose

This document defines the focus of the second-pass critique cycle for Hedgr retail UI exploration.

The first pass established that **Concept C — Protected money account** is the most useful current centerline for continued paper critique. This document narrows the next critique cycle to the unresolved tensions within that centerline.

It exists to:

1. focus critique on the most important unresolved structural questions
2. prevent re-opening the full concept comparison unnecessarily
3. keep the next pass disciplined and doctrine-safe
4. prepare a tighter refinement loop without implying implementation authority

This document does **not**:

- authorize implementation
- approve Concept C as product direction
- create sequencing authority
- override `docs/ops/HEDGR_STATUS.md`
- function as an ADR or decision log

This is a targeted critique brief only.

---

## 2. Authority boundary

This second-pass brief must be interpreted under current repo truth:

1. Stability Engine retail presentation remains read-only and informational
2. allocation remains informational, not accounting truth
3. no critique in this pass should reward execution semantics, hidden-model authority, or broadened operational posture
4. Activity-related exploration remains bounded and does not imply approved IA expansion unless later named in `HEDGR_STATUS.md`
5. Concept C remains an exploration baseline only, not an approved concept

This is a refinement brief, not a roadmap instruction.

---

## 3. Inputs

This brief should be read alongside:

- `HEDGR_RETAIL_UI_EXPLORATION_SYNTHESIS.md`
- `HEDGR_RETAIL_UI_PAPER_EXPLORATION_MATRIX.md`
- `HEDGR_RETAIL_UI_SCREEN_ANATOMY_COMPARISON.md`
- `HEDGR_RETAIL_UI_LOW_FIDELITY_WIRE_DESCRIPTIONS.md`
- `HEDGR_RETAIL_UI_CRITIQUE_SCORECARD.md`
- `HEDGR_RETAIL_UI_FIRST_PASS_CRITIQUE_READOUT.md`

The first-pass readout is the immediate anchor for this document.

---

## 4. Why a second pass is needed

The first pass was useful because it clarified the role of the three concepts:

- Concept A = simplicity edge probe
- Concept B = legibility edge probe
- Concept C = current centerline for continued critique

That comparison work is sufficient for now.

The next need is not another broad comparison.  
The next need is a narrower refinement pass focused on the unresolved structural tensions inside Concept C.

This brief exists to keep that pass focused.

---

## 5. Second-pass critique objective

The objective of the second pass is:

**Refine the Concept C centerline enough to reduce ambiguity around hierarchy, trust detail placement, activity role, and disclosure structure, without widening scope or weakening doctrine fit.**

This means the second pass should test refinement questions, not new concept families.

---

## 6. Core unresolved tensions to examine

### 6.1 Minimum visible Allocation / Trust Detail above the fold

The first pass confirmed that Concept C is strongest when it preserves visible structural truth.

The unresolved question is how much of that truth must appear above the fold to keep the product meaningfully Hedgr, without introducing clutter or over-weighting trust mechanics too early.

Second-pass critique should test:

- minimal above-the-fold presence
- restrained above-the-fold presence
- heavier above-the-fold presence

The goal is not precision for its own sake.  
The goal is to find the lightest viable trust-detail footprint that still preserves Hedgr truth.

### 6.2 Order of Actions versus Activity

Concept C currently assumes a money-first structure with actions and activity both near the upper half of the screen.

The unresolved question is whether:

- Actions should precede Activity
- Activity should precede Actions
- or both need stricter visual separation even if their order remains unchanged

This matters because the wrong ordering can make the screen feel either too operational or too dashboard-like.

### 6.3 Boundary and naming of `Activity / Money Reality`

The first pass left both the function and naming of this layer unresolved.

The second pass should test whether this zone is best understood as:

- recent activity
- money reality
- recent movement
- another bounded framing

The naming question matters because language will shape perceived scope.  
The role question matters because this zone can easily drift into broader IA expansion if left semantically loose.

### 6.4 Mid-layer congestion risk

The main known failure mode of Concept C is mid-layer congestion.

The second pass should treat this as a primary discipline problem, especially where:

- Actions
- Activity / Money Reality
- Allocation / Trust Detail

begin competing for equal prominence.

The goal is not to add explanation.  
The goal is to reduce structural crowding.

### 6.5 Disclosure label and role

The deeper disclosure layer remains semantically unresolved.

The second pass should test:

- whether `Advanced Details` remains acceptable
- whether a calmer, clearer replacement is needed
- whether the role of the disclosure layer is being expressed correctly even if the label changes

This layer must remain bounded, optional, and clarifying.  
It must not imply hidden-model truth, runtime thresholds, or invisible authority.

---

## 7. Questions the second pass should answer

The second-pass critique should aim to answer the following questions as clearly as possible:

1. What is the minimum viable Allocation / Trust Detail presence above the fold?
2. Should Actions sit above Activity in the centerline, or should Activity come first?
3. What should the bounded role of `Activity / Money Reality` actually be?
4. What naming best preserves scope discipline for that zone?
5. How can Concept C reduce mid-layer congestion without collapsing into Concept A?
6. What disclosure label best communicates optional clarification without sounding technical or hidden?
7. At what point does warmth or presentation refinement begin weakening seriousness?

---

## 8. What the second pass should not do

The second pass should **not**:

- reopen the full A/B/C concept comparison
- introduce new dashboard zones
- add new product surfaces
- widen Activity into a broader feature set
- resolve implementation details
- create component or engineering requirements
- assume approval for any follow-on work

This is refinement of the current centerline only.

---

## 9. Suggested refinement method

The second pass should use a narrow paper-comparison approach.

Recommended method:

1. keep Concept C fixed as the baseline
2. produce a small number of C-variants that each test one tension at a time
3. evaluate those variants against the existing critique scorecard
4. record trade-offs in prose, not just scores
5. prefer structural clarity over expressive variation

The purpose of the method is to isolate tensions, not to generate design breadth.

---

## 10. Suggested C-variant test set

A minimal second-pass set could include:

### Variant C1 — Lower trust-detail emphasis
Tests the smallest viable above-the-fold Allocation / Trust Detail footprint.

### Variant C2 — Activity before actions
Tests whether earlier financial orientation improves comprehension or creates dashboard drift.

### Variant C3 — Actions before activity
Tests whether stronger operational clarity improves the money-feel while keeping Activity bounded.

### Variant C4 — Alternate disclosure label
Tests whether the deeper disclosure layer becomes more legible with calmer naming.

These are not new concepts.  
They are tension-isolation variants of the same centerline.

---

## 11. Evaluation focus for the second pass

The second pass should put special weight on:

- hierarchy discipline
- doctrine fit
- trust-detail sufficiency
- activity scope restraint
- disclosure clarity
- calmness under increased informational pressure

Money-feel still matters, but the second pass should not re-litigate the full question already tested in the first pass.

---

## 12. Expected output of the second pass

A strong second-pass output should produce:

1. a clearer preferred Concept C posture
2. a narrower view of above-the-fold trust-detail requirements
3. a clearer position on Actions vs Activity ordering
4. a tighter semantic definition for `Activity / Money Reality`
5. a clearer recommendation on disclosure labeling

That output would still remain critique-only unless later absorbed into a governance-approved path.

---

## 13. Closing position

The second pass should not chase novelty.

It should reduce ambiguity.

The first pass already identified the likely centerline.  
The next pass should make that centerline more structurally disciplined.

The goal is not a more expressive dashboard.

The goal is a clearer one:

- less congestion
- better hierarchy
- bounded activity meaning
- sufficient structural truth
- calmer disclosure