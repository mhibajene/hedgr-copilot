# HEDGR RETAIL UI CONCEPT C VARIANT MATRIX

Status: Paper exploration only  
Authority: Non-sequencing, non-implementation  
Scope: Targeted Concept C variant comparison for second-pass retail UI critique  
Last updated: 2026-04-14

---

## 1. Purpose

This document translates the second-pass critique brief into a bounded comparison of Concept C variants.

It exists to:

1. isolate the unresolved tensions inside the current Concept C centerline
2. compare small structural variations without reopening the full A/B/C concept set
3. support disciplined second-pass critique
4. reduce ambiguity around hierarchy, trust-detail placement, activity role, and disclosure structure

This document does **not**:

- authorize implementation
- approve Concept C as product direction
- create sequencing authority
- override `docs/ops/HEDGR_STATUS.md`
- function as an ADR or decision log

This is a paper comparison artifact only.

---

## 2. Authority boundary

This variant matrix must be interpreted under current repo truth:

1. Stability Engine retail presentation remains read-only and informational
2. allocation remains informational, not accounting truth
3. no variant should imply fund movement, autonomous reallocation, or hidden operational authority
4. Activity-related variation remains bounded and does not imply approved IA expansion unless later named in `HEDGR_STATUS.md`
5. no variant outcome should be treated as roadmap authority or concept approval

This is a refinement artifact, not a product instruction.

---

## 3. Inputs

This matrix should be read alongside:

- `HEDGR_RETAIL_UI_EXPLORATION_SYNTHESIS.md`
- `HEDGR_RETAIL_UI_PAPER_EXPLORATION_MATRIX.md`
- `HEDGR_RETAIL_UI_SCREEN_ANATOMY_COMPARISON.md`
- `HEDGR_RETAIL_UI_LOW_FIDELITY_WIRE_DESCRIPTIONS.md`
- `HEDGR_RETAIL_UI_CRITIQUE_SCORECARD.md`
- `HEDGR_RETAIL_UI_FIRST_PASS_CRITIQUE_READOUT.md`
- `HEDGR_RETAIL_UI_SECOND_PASS_CRITIQUE_BRIEF.md`

The second-pass critique brief is the immediate framing input for this document.

---

## 4. Baseline being refined

The baseline under refinement is:

**Concept C — Protected money account**

This centerline currently aims to balance:

- money-first familiarity
- visible structural truth
- restrained actions
- bounded activity meaning
- disciplined disclosure

The purpose of this matrix is not to replace Concept C.  
It is to test which internal variation of Concept C best resolves its known tensions.

---

## 5. Variant comparison rules

All variants in this matrix must obey the same constraints:

1. keep the same bounded dashboard zone set
2. avoid new product surfaces
3. avoid implementation detail
4. avoid APY-first posture
5. avoid crypto-native metaphors
6. avoid score language
7. avoid hidden-model authority cues
8. remain calm, readable, and structurally honest

These are tension-isolation variants, not new concepts.

---

## 6. Shared dashboard zones

All variants use the same zone language:

### Zone A — Portfolio Value
Primary money anchor.

### Zone B — Stability Status
Current protection posture shown in plain, calm language.

### Zone C — Primary Actions
Bounded retail actions only.

### Zone D — Activity / Money Reality
Recent financial orientation layer. Naming and role remain under test.

### Zone E — Allocation / Trust Detail
Visible structured protection layer, kept informational.

### Zone F — Advanced Disclosure
Deeper explanatory layer. Label remains under test.

---

## 7. Variant C1 — Lower trust-detail emphasis

### 7.1 Tension being tested

What is the smallest viable above-the-fold Allocation / Trust Detail footprint that still preserves Hedgr truth?

### 7.2 Structural change from baseline

This variant reduces the visible prominence of Zone E above the fold.

### 7.3 Proposed zone order

1. Zone A — Portfolio Value
2. Zone B — Stability Status
3. Zone C — Primary Actions
4. Zone D — Activity / Money Reality
5. Zone E — Allocation / Trust Detail
6. Zone F — Advanced Disclosure

### 7.4 Above-the-fold posture

Above the fold should contain:

- full Zone A
- full Zone B
- full Zone C
- first slice of Zone D
- little or no visible Zone E beyond an entry cue or summary line

### 7.5 Expected benefit

- cleaner first-glance money feel
- lower mid-layer density
- reduced risk of above-the-fold congestion

### 7.6 Main risk

- structured protection may become too recessive
- Hedgr truth may feel secondary rather than integral

### 7.7 Main critique question

How light can trust detail become before the screen starts drifting toward Concept A?

---

## 8. Variant C2 — Activity before actions

### 8.1 Tension being tested

Does earlier financial orientation improve comprehension, or does it pull the screen toward dashboard behavior?

### 8.2 Structural change from baseline

This variant moves Zone D above Zone C.

### 8.3 Proposed zone order

1. Zone A — Portfolio Value
2. Zone B — Stability Status
3. Zone D — Activity / Money Reality
4. Zone C — Primary Actions
5. Zone E — Allocation / Trust Detail
6. Zone F — Advanced Disclosure

### 8.4 Above-the-fold posture

Above the fold should contain:

- full Zone A
- full Zone B
- visible Zone D
- reduced but still present Zone C
- beginning of Zone E only if density permits

### 8.5 Expected benefit

- stronger “what changed?” legibility
- improved orientation before action
- stronger test of money-state comprehension

### 8.6 Main risk

- greater scope-creep signal around Activity
- higher risk of dashboard or PFM drift
- reduced immediacy of action posture

### 8.7 Main critique question

Does earlier Activity clarify the screen, or does it change the product class impression?

---

## 9. Variant C3 — Actions before activity

### 9.1 Tension being tested

Does stronger action clarity improve money-feel while keeping Activity bounded?

### 9.2 Structural change from baseline

This variant reinforces Zone C before Zone D and increases their separation.

### 9.3 Proposed zone order

1. Zone A — Portfolio Value
2. Zone B — Stability Status
3. Zone C — Primary Actions
4. Zone D — Activity / Money Reality
5. Zone E — Allocation / Trust Detail
6. Zone F — Advanced Disclosure

### 9.4 Above-the-fold posture

Above the fold should contain:

- full Zone A
- full Zone B
- clearly separated Zone C
- restrained first slice of Zone D
- beginning of Zone E depending on density

### 9.5 Expected benefit

- stronger money-product familiarity
- clearer operational orientation
- lower risk that Activity dominates the reading path

### 9.6 Main risk

- may feel too action-forward if context is too thin
- may weaken the interpretive value of the money-reality layer
- could still suffer congestion if separation is not clear enough

### 9.7 Main critique question

Does stronger action precedence create clarity, or does it make the screen feel too operational for Hedgr’s posture?

---

## 10. Variant C4 — Alternate disclosure label

### 10.1 Tension being tested

Can the deeper disclosure layer become clearer and calmer through labeling change alone?

### 10.2 Structural change from baseline

This variant keeps the baseline structure but changes only the language used for Zone F.

### 10.3 Label directions to test

Possible bounded alternatives:

- Learn more
- How this is protected
- Protection details
- Allocation details
- How this works

These are prompts for critique only, not approved copy directions.

### 10.4 Expected benefit

- calmer access to deeper explanation
- less technical or opaque disclosure framing
- lower risk that “Advanced Details” feels too system-authored

### 10.5 Main risk

- softer labels may understate seriousness
- some alternatives may drift too educational or too operational
- role clarity may remain unresolved even if the label improves

### 10.6 Main critique question

Is the current problem primarily the label, or the deeper disclosure role itself?

---

## 11. Comparative review grid

| Variant | Primary tension tested | Main potential gain | Main doctrine risk |
|--------|-------------------------|---------------------|--------------------|
| C1 — Lower trust-detail emphasis | Minimum visible trust detail | Cleaner money-feel, lower clutter | Protection becomes too recessive |
| C2 — Activity before actions | Orientation before action | Better “what changed?” legibility | Dashboard drift, Activity scope creep |
| C3 — Actions before activity | Action clarity before orientation | Stronger money-product familiarity | Over-operational feel, thin context |
| C4 — Alternate disclosure label | Disclosure naming and tone | Calmer, clearer deep explanation entry | Label improves while role remains unresolved |

---

## 12. Second-pass evaluation focus

These variants should be judged with special attention to:

1. hierarchy discipline
2. doctrine fit
3. trust-detail sufficiency
4. activity scope restraint
5. disclosure clarity
6. calmness under informational pressure
7. avoidance of mid-layer congestion

The second pass is not trying to find the most expressive variant.  
It is trying to find the most disciplined refinement of the current centerline.

---

## 13. Working hypotheses

The current working hypotheses behind this pass are:

1. Concept C likely remains the right overall centerline
2. its biggest structural risk is mid-layer congestion
3. the trust-detail layer may need to become lighter, but not disappear
4. the Activity layer may need stricter role definition before any hierarchy decision feels stable
5. the disclosure issue may be partly semantic, not purely structural

These are hypotheses for critique, not conclusions.

---

## 14. Questions to answer through this matrix

The second-pass critique should aim to answer:

1. which variant best preserves Concept C while reducing congestion?
2. how much trust detail is necessary above the fold?
3. should Activity or Actions come first in the centerline?
4. is `Activity / Money Reality` one layer or two different candidate roles?
5. is the disclosure problem mostly naming, mostly structure, or both?

---

## 15. Closing position

This matrix is not meant to generate more concepts.

It is meant to reduce ambiguity inside the one concept already identified as the most useful centerline for continued critique.

The second pass should improve discipline, not breadth.

The right refinement will likely be the one that best preserves:

- money-first clarity
- visible structural truth
- bounded activity meaning
- calm disclosure
- low congestion