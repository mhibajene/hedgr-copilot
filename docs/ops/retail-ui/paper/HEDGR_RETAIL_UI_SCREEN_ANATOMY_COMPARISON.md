# HEDGR RETAIL UI SCREEN ANATOMY COMPARISON

Status: Paper exploration only  
Authority: Non-sequencing, non-implementation  
Scope: Screen-structure comparison for bounded retail dashboard exploration  
Last updated: 2026-04-14

---

## 1. Purpose

This document translates the comparative directions in `HEDGR_RETAIL_UI_PAPER_EXPLORATION_MATRIX.md` into screen-anatomy form.

It exists to:

1. compare structural dashboard layouts at the zone level
2. test above-the-fold hierarchy before visual design work
3. identify doctrine risks created by placement, not only wording
4. support paper critique without implying implementation authority

This document does **not**:

- authorize implementation
- approve a redesign
- widen current retail IA scope
- approve Activity-surface expansion
- define acceptance criteria
- override `docs/ops/HEDGR_STATUS.md`

`docs/ops/HEDGR_STATUS.md` remains the live source for execution posture and whether any follow-on retail work is explicitly named.

---

## 2. Authority boundary

This anatomy comparison must be read under current repo truth:

1. Stability Engine presentation remains read-only and informational
2. allocation bands are not accounting truth
3. no zone should imply fund movement, live execution, or autonomous reallocation
4. no structure here should be read as approved product direction
5. any elevation of Activity is exploratory hierarchy work only, not approved surface expansion unless later named in `HEDGR_STATUS.md`

This is a structural comparison artifact, not a spec.

---

## 3. Shared dashboard zones

All concepts are compared using the same bounded zone set.

### Zone A — Portfolio Value
Primary money anchor.

### Zone B — Stability Status
Current protection posture shown in plain, calm language.

### Zone C — Primary Actions
Bounded retail actions only. No execution-heavy semantics.

### Zone D — Activity / Money Reality
Recent money movement, recent financial state, or equivalent trust-orientation surface.

### Zone E — Allocation / Trust Detail
Visible structured protection layer, kept informational.

### Zone F — Advanced Disclosure
Deeper explanatory layer. Must clarify without implying hidden-model authority.

---

## 4. Anatomy comparison rules

Each concept below is assessed using the same questions:

1. what is above the fold?
2. what is visually dominant?
3. what is delayed lower in the page?
4. what trust signal is strengthened?
5. what doctrine risk is introduced?
6. what first impression is most likely?

No concept should be interpreted as a visual recommendation. This pass is about structural sequencing only.

---

## 5. Concept A — Money-first

### 5.1 Zone order

1. Zone A — Portfolio Value
2. Zone B — Stability Status
3. Zone C — Primary Actions
4. Zone D — Activity / Money Reality
5. Zone E — Allocation / Trust Detail
6. Zone F — Advanced Disclosure

### 5.2 Above-the-fold posture

Above the fold should contain:

- Portfolio Value
- Stability Status
- Primary Actions
- first slice of Activity

Allocation / Trust Detail begins near fold edge or below it.

### 5.3 What is intentionally pushed lower

- structured allocation explanation
- deeper trust detail
- advanced disclosure
- any nuanced rationale for protection posture

### 5.4 Structural trust benefit

This anatomy makes the product feel closest to a familiar money account.

It prioritizes immediate recognition:

- how much money is here
- whether things appear stable
- what the user can do
- whether recent money activity feels normal

### 5.5 Doctrine risk

This structure can weaken Hedgr’s distinctiveness if structured protection becomes too recessive.

Main risk:

- the product feels trustworthy because it looks familiar, not because it makes protection legible

### 5.6 Likely first impression

“This looks like money I recognize.”

### 5.7 Best use case for critique

Use this concept to test the outer limit of simplicity:

- how little visible structure can Hedgr show before truth weakens?

---

## 6. Concept B — Financial control center

### 6.1 Zone order

1. Zone A — Portfolio Value
2. Zone B — Stability Status
3. Zone D — Activity / Money Reality
4. Zone C — Primary Actions
5. Zone E — Allocation / Trust Detail
6. Zone F — Advanced Disclosure

### 6.2 Above-the-fold posture

Above the fold should contain:

- Portfolio Value
- Stability Status
- a stronger money-reality or recent-movement layer
- reduced but still visible action posture

This concept gives more vertical space to orientation than to action.

### 6.3 What is intentionally pushed lower

- deeper allocation explanation
- advanced disclosure
- some action prominence

### 6.4 Structural trust benefit

This anatomy helps the user answer:

- what changed?
- what is happening with my money?
- what deserves my attention?

It may improve comprehension without adding execution power.

### 6.5 Doctrine risk

This structure is most exposed to density creep and product-class drift.

Main risks:

- Activity begins to feel like a broader retail surface
- the dashboard starts reading like a PFM tool
- summaries compete with the primary money anchor

### 6.6 Likely first impression

“This helps me understand my current financial state.”

### 6.7 Best use case for critique

Use this concept to test the outer limit of financial legibility:

- how much orientation can Hedgr add before it stops feeling like Hedgr?

---

## 7. Concept C — Protected money account

**Exploration default for comparison only**  
This concept is the current centerline for anatomy critique. It is not a governance decision, implementation recommendation, or product consensus.

### 7.1 Zone order

1. Zone A — Portfolio Value
2. Zone B — Stability Status
3. Zone C — Primary Actions
4. Zone D — Activity / Money Reality
5. Zone E — Allocation / Trust Detail
6. Zone F — Advanced Disclosure

### 7.2 Above-the-fold posture

Above the fold should contain:

- Portfolio Value
- Stability Status
- Primary Actions
- a restrained slice of Activity or Money Reality
- the beginning of Allocation / Trust Detail, depending on vertical density

This concept aims to let the user feel money-first confidence while still sensing that structured protection exists.

### 7.3 What is intentionally pushed lower

- fuller allocation explanation
- deeper trust mechanics
- advanced disclosure
- any detail that risks hidden-model overtones

### 7.4 Structural trust benefit

This anatomy tries to preserve the dual signal Hedgr needs:

- “this is my money”
- “this money is being handled with discipline”

It is the strongest candidate for combining familiarity with structural truth.

### 7.5 Doctrine risk

This concept can become cluttered faster than A and can become ambiguous faster than B.

Main risks:

- too many mid-level blocks competing above the fold
- insufficient distinction between Activity and Trust Detail
- disclosure layers hinting at hidden authority instead of clear explanation

### 7.6 Likely first impression

“This feels like protected money, not just a balance.”

### 7.7 Best use case for critique

Use this concept to test the target Hedgr balance:

- how can Hedgr feel financially native without concealing structural discipline?

---

## 8. Above-the-fold comparison summary

### Concept A
Best for immediate simplicity and familiarity.

### Concept B
Best for orientation and “what changed?” comprehension.

### Concept C
Best for combining money-feel with visible structured protection.

---

## 9. Structural tensions surfaced

### 9.1 Portfolio Value vs structural explanation
All concepts confirm the same hierarchy rule:

Portfolio Value must remain the primary emotional anchor.

The unresolved question is how quickly structured protection must appear after that anchor.

### 9.2 Activity vs scope control
Activity is structurally useful as a trust and orientation surface, but any upward movement risks being misread as approved IA expansion.

This remains exploratory only.

### 9.3 Actions vs trust density
If actions appear too high without enough context, the screen can feel more operational than protective.

If trust detail appears too high without enough restraint, the screen can feel overly system-authored.

### 9.4 Disclosure vs hidden-model risk
Deeper detail is necessary for Hedgr truth, but the structure must avoid implying:

- runtime thresholds as authority
- concealed model truth
- executed defensive behavior
- unexplained machine discretion

---

## 10. Working anatomy readout

For paper exploration, the strongest critique posture is:

1. use Concept C as the structural centerline
2. use Concept A to test the lower bound of visible complexity
3. use Concept B to test the upper bound of orientation density

This does **not** approve Concept C.  
It identifies Concept C as the most useful comparison baseline for future critique.

---

## 11. Questions to carry into visual exploration later

These should remain open after this anatomy pass:

1. how much of Zone E should be visible above the fold in the centerline concept?
2. whether Zone D should read more like recent activity or broader money reality
3. whether Zone C should always sit above Zone D in the centerline concept
4. what label should replace or preserve `Advanced Details`
5. where the warmth ceiling sits once anatomy is fixed

---

## 12. Closing position

This anatomy pass is not trying to find the most polished dashboard.

It is trying to find the most trustworthy structure.

The sequencing priority remains:

- money first
- status second
- action with restraint
- activity with scope discipline
- protection visible but not overbearing
- disclosure available but not mystical

A good Hedgr dashboard should feel calm before it feels intelligent.