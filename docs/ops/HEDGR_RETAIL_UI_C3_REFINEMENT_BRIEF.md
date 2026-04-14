# HEDGR RETAIL UI C3 REFINEMENT BRIEF

Status: Paper exploration only  
Authority: Non-sequencing, non-implementation  
Scope: Targeted refinement brief for Variant C3 with complementary C4 disclosure-label testing  
Last updated: 2026-04-14

---

## 1. Purpose

This document defines the next refinement posture for the Hedgr retail UI exploration stack following the second-pass Concept C variant score run.

The current critique outcome indicates that **Variant C3 — Actions before activity** is the strongest structural refinement baseline for continued paper critique, with **Variant C4 — Alternate disclosure label** retained as a complementary semantic thread.

This brief exists to:

1. narrow the refinement focus to the most promising current baseline
2. define the structural discipline expected of the C3 posture
3. carry the disclosure-label question without reopening broader concept comparison
4. preserve critique momentum without implying implementation authority

This document does **not**:

- authorize implementation
- approve C3 as product direction
- create sequencing authority
- override `docs/ops/HEDGR_STATUS.md`
- function as an ADR or decision log

This is a paper refinement brief only.

---

## 2. Authority boundary

This refinement brief must be interpreted under current repo truth:

1. Stability Engine retail presentation remains read-only and informational
2. allocation remains informational, not accounting truth
3. no refinement in this pass should reward execution semantics, hidden-model authority, or broadened operational posture
4. Activity-related refinement remains bounded and does not imply approved IA expansion unless later named in `HEDGR_STATUS.md`
5. C3 remains a critique baseline only, not an approved concept

This is a refinement instruction for paper critique, not a product instruction.

---

## 3. Inputs

This brief should be read alongside:

- `HEDGR_RETAIL_UI_EXPLORATION_SYNTHESIS.md`
- `HEDGR_RETAIL_UI_PAPER_EXPLORATION_MATRIX.md`
- `HEDGR_RETAIL_UI_SCREEN_ANATOMY_COMPARISON.md`
- `HEDGR_RETAIL_UI_LOW_FIDELITY_WIRE_DESCRIPTIONS.md`
- `HEDGR_RETAIL_UI_CRITIQUE_SCORECARD.md`
- `HEDGR_RETAIL_UI_FIRST_PASS_CRITIQUE_READOUT.md`
- `HEDGR_RETAIL_UI_SECOND_PASS_CRITIQUE_BRIEF.md`
- `HEDGR_RETAIL_UI_CONCEPT_C_VARIANT_MATRIX.md`
- `HEDGR_RETAIL_UI_SECOND_PASS_VARIANT_SCORE_RUN.md`

The second-pass score run is the immediate anchor for this brief.

---

## 4. Why C3 is the active refinement baseline

The current critique stack indicates that C3 is the strongest refinement path because it improves order without collapsing Hedgr into either edge case:

- not too simplified into Concept A behavior
- not too orientation-heavy into Concept B or C2 behavior

C3 is currently the best candidate for preserving the core dual requirement:

- money-first clarity
- visible structural truth

This brief treats that conclusion as a critique posture only.

---

## 5. Refinement objective

The objective of this pass is:

**Refine the C3 baseline so that Actions, Activity, and Allocation / Trust Detail no longer compete for equal prominence, while preserving Hedgr’s protected money posture and carrying forward the disclosure-label question through C4.**

This means the next pass should optimize for:

- cleaner reading order
- lower mid-layer congestion
- bounded activity meaning
- sufficient visible trust detail
- calmer disclosure access

Not for:

- more blocks
- more explanation
- more dashboard behavior
- more expressive variation

---

## 6. Required structural posture for C3

The C3 baseline should continue to assume this order:

1. Portfolio Value
2. Stability Status
3. Primary Actions
4. Activity / Money Reality
5. Allocation / Trust Detail
6. Disclosure entry point

This order should remain the structural default unless a later critique pass produces a stronger reason to change it.

The main purpose of this order is to keep the product reading as:

1. money first
2. protection status second
3. user control third
4. orientation fourth
5. structured truth beneath
6. deeper explanation last

This is the current best hedge against both over-operational feel and dashboard drift.

---

## 7. Above-the-fold discipline

### 7.1 What must remain above the fold

The refined C3 posture should preserve the following above-the-fold priorities:

- Portfolio Value as the primary emotional anchor
- Stability Status as the immediate contextual signal
- clearly readable Primary Actions
- a restrained Activity / Money Reality slice
- enough Allocation / Trust Detail presence to preserve Hedgr truth

### 7.2 What must not dominate above the fold

The following should not dominate the top layer:

- explanatory density
- trust-detail complexity
- activity interpretation blocks
- operational cues that overpower the money anchor
- disclosure language that feels technical or model-authored

### 7.3 What must remain structurally subordinate

Allocation / Trust Detail must be visible enough to matter, but not so prominent that it competes with Portfolio Value or Stability Status for top-layer primacy.

Activity / Money Reality must be useful enough to orient, but not so heavy that it reclassifies the screen into dashboard behavior.

---

## 8. Actions versus Activity separation

The main structural reason C3 outperformed C2 is not just order.  
It is separation.

The next pass should therefore treat Actions and Activity as distinct layers with clearly different jobs:

### Actions
Purpose:
- confirm user control
- preserve money-product familiarity
- remain bounded and restrained

### Activity / Money Reality
Purpose:
- provide light orientation
- answer “what changed?” at a glance
- reinforce money reality without becoming a broader feature surface

The key discipline question is not whether both are present.  
It is whether they are visually and semantically separated enough that they do not compete.

The next pass should test:

- stronger spacing separation
- lower visual weight for Activity
- tighter summarization of the Activity / Money Reality layer

---

## 9. Role of `Activity / Money Reality`

This layer remains under refinement and should be treated as bounded.

At this stage, the allowed role of the layer is:

- light financial orientation
- recent money-state reinforcement
- trust support through legible money reality

The layer should not drift toward:

- a full activity center
- a dashboard summary engine
- a planning surface
- a broader feed
- a second primary anchor

The naming remains unresolved.

The role, however, should now be narrowed enough that future critique can test naming against a clearer functional boundary.

---

## 10. Allocation / Trust Detail requirement

The second-pass result suggests that visible trust detail must remain present above the fold, but in a lighter and more disciplined form than a heavy explanatory block.

The current refinement standard should be:

- visible enough to preserve Hedgr distinctiveness
- light enough to avoid crowding the upper reading path
- clear enough to feel like structural truth, not system opacity

The next pass should not ask whether trust detail exists.

It should ask:

**What is the lightest above-the-fold trust-detail footprint that still makes the product unmistakably Hedgr?**

---

## 11. C4 disclosure-label companion thread

C4 should remain active, but as a companion semantic thread rather than a competing structural direction.

The next pass should carry disclosure-label testing alongside C3 in order to answer:

- whether the current disclosure friction is primarily naming
- whether calmer wording improves trust without weakening seriousness
- whether the deeper layer sounds optional and clarifying rather than technical or hidden

At this stage, C4 should not trigger deeper structural rewrites.

It should remain a bounded language test attached to the C3 posture.

---

## 12. Failure modes to avoid

The next pass should explicitly avoid the following failure modes:

### 12.1 Mid-layer congestion
Actions, Activity, and Allocation / Trust Detail should not regain equal visual weight.

### 12.2 Dashboard drift
Activity / Money Reality should not become so prominent that the product reads like a broader financial dashboard.

### 12.3 Recessive trust truth
Trust detail should not become so faint that the screen effectively collapses into generic money-app behavior.

### 12.4 Disclosure opacity
The deeper explanatory layer should not feel hidden, mystical, overly technical, or model-authored.

### 12.5 Over-correction through explanation
The answer to congestion should not be additional explanatory content.

The preferred lever remains order, separation, and weight discipline.

---

## 13. Questions this refinement pass should answer

The next C3-focused pass should aim to answer:

1. what is the minimum viable above-the-fold Allocation / Trust Detail footprint?
2. how much separation do Actions need from Activity to keep the reading path clean?
3. what is the narrowest valid role for `Activity / Money Reality`?
4. which disclosure label best supports calm, bounded explanation?
5. how far can refinement go before warmth begins weakening seriousness?

These questions should be answered through paper critique, not implementation design.

---

## 14. Suggested next artifact

The most useful next artifact after this brief is a targeted C3 refinement paper pass, such as:

`HEDGR_RETAIL_UI_C3_REFINEMENT_NOTES.md`

That artifact should compare a small number of C3 refinements against:

- trust-detail weight
- Actions / Activity separation
- Activity role clarity
- disclosure-label options

This should remain tightly bounded and non-implementing.

---

## 15. Closing position

The current refinement task is not to reinvent the dashboard.

It is to make the strongest current centerline more disciplined.

The right next move is not more concept breadth.

It is tighter control over:

- order
- separation
- role clarity
- disclosure tone
- trust-detail weight

The product should continue moving toward protected money that feels calm, legible, and structurally honest.