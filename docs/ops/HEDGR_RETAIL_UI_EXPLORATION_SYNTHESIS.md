# HEDGR RETAIL UI EXPLORATION SYNTHESIS

Status: Exploration-only  
Authority: Non-sequencing, non-implementation  
Scope: Retail UI exploration framing for Stability Engine-adjacent surfaces  
Last updated: 2026-04-14

---

## 1. Purpose

This document consolidates existing repo-native UI exploration material into a single working synthesis for retail UI exploration.

It exists to:

1. reconcile current doctrine, accepted governance framing, and shipped trust-surface posture
2. capture surfaced retail presentation gaps
3. translate external product lessons into Hedgr-relevant exploration questions
4. define bounded concept directions for future paper exploration

This document does **not**:

- authorize implementation work
- override `docs/ops/HEDGR_STATUS.md`
- create backlog authority
- sequence tickets
- widen the current Stability Engine boundary

`docs/ops/HEDGR_STATUS.md` §7 / §7a remain the sole implementation-sequencing authority. Exploration notes, concept notes, and disposition artifacts are framing inputs only.

---

## 2. Authority boundary

This synthesis must be read under current repo truth:

1. the Stability Engine remains read-only and informational in the current phase
2. allocation bands remain informational, not accounting truth
3. no hidden execution, fund movement, or autonomous reallocation may be implied
4. no live backend engine coupling is authorized in the current phase
5. broader information architecture expansion, action-strip work, onboarding expansion, and v2/v3-style retail surface widening remain prerequisite-gated unless later explicitly sequenced in `HEDGR_STATUS.md` §7 / §7a

This document is therefore a **governed exploration artifact**, not a redesign brief.

---

## 3. Source inputs

This synthesis is grounded in the following repo-native inputs already identified in the repository review:

1. `docs/ops/HEDGR_STABILITY_ENGINE_UI_EXPLORATION_NOTE.md`
   - primary retail critique frame
   - anchor questions around hero hierarchy, terminology, CTA doctrine, `Advanced Details`, no-score posture, and Atlas subordination

2. `docs/ops/HEDGR_STABILITY_ENGINE_UI_VARIANT_DISPOSITION.md`
   - disposition of current retail UI variant work
   - replace / retain / retire guidance
   - explicit concern around doctrine-risky disclosure models

3. `docs/ops/HEDGR_ATLAS_PRODUCT_CONCEPT_NOTE.md`
   - future-facing clarity-layer concept note
   - non-executing and subordinate to repo sequencing truth

4. `docs/ops/HEDGR_STATUS.md`
   - governing posture
   - active constraints
   - live source for current sequencing posture, active constraints, and whether any ticket is currently named in §7 / §7a (including §7a when an execution brief is present)
   - transition-readiness gating

This synthesis does not depend on any specific active or named ticket in §7 / §7a.

5. `docs/ops/HEDGR_STABILITY_ENGINE_TRUST_SURFACE_TEST_COVERAGE_MATRIX.md`
   - governance evidence map of shipped Stability Engine trust surfaces to existing automated test linkage (covered / partially covered / uncovered)—context only; not backlog authority

6. Supporting doctrine and UX constraints already embedded in Hedgr’s constitutional and UX documents:
   - trust before growth
   - safety over speed
   - simplicity as obligation
   - portfolio value before deeper allocation detail
   - risk visible before return
   - no gamification of yield

7. External lesson lenses used here only as critique inputs, not product authority:
   - Stables
   - Quicken

---

## 4. Why this synthesis is needed

The repo already contains exploration-oriented material, but that material is currently distributed across multiple documents with different roles:

- critique frame
- disposition verdict
- future concept note
- doctrine and sequencing control

What is missing is a single artifact that translates those materials into one exploration decision frame for retail UI work.

The gap is not lack of doctrine.  
The gap is lack of a consolidated exploration synthesis that answers:

1. what retail UI problem is now being explored
2. which repo-confirmed gaps matter most
3. how external lessons should be interpreted under Hedgr doctrine
4. which concept directions are worth paper exploration
5. what must remain out of bounds

---

## 5. Current repo-confirmed exploration questions

The repo already leaves several retail UI questions intentionally open. This synthesis preserves them as active exploration questions rather than treating them as resolved decisions.

### 5.1 CTA legitimacy question

Under what conditions is `Review withdrawal availability` a valid user-facing action, and when must it remain absent?

The repo review indicates this is state-contingent only and must not become a default CTA in calm or “within expected range” states.

### 5.2 Disclosure labeling question

Is `Advanced Details` the correct label for the deeper disclosure layer, or is the semantic role correct while the wording remains unresolved?

This remains open.

### 5.3 Warmth ceiling question

How far can presentation refinement go before retail seriousness, authority, and institutional trust are weakened?

This remains one of the most important unresolved exploration constraints.

### 5.4 Financial familiarity question

How can Hedgr feel more like a real money product without weakening risk visibility, seriousness, or read-only truth?

This question is not explicitly solved by the current repo artifacts and is central to this synthesis.

---

## 6. Surfaced retail UI gaps

This section translates repo truth and external critique into the key retail presentation gaps that exploration should address.

### 6.1 Money-feel gap

Hedgr’s current trust-surface doctrine is strong, but the top layer can still risk feeling more like a governed system explanation than a native money product.

This is where the Stables lesson is most useful.

The exploration target is not “make it feel like crypto, but simpler.”  
The target is “make it feel like protected money.”

### 6.2 Financial legibility gap

The repo strongly protects informational truth, but that alone does not guarantee fast user orientation.

A user should be able to answer, quickly:

- what do I have
- what is available
- what changed
- what is protected
- what needs attention

This is where Quicken is instructive.

### 6.3 Activity trust gap

**Design hypothesis:** recent activity and money-history surfaces may be under-leveraged as trust surfaces.

Financial products often earn trust not only through balances and status, but through legible history.  
For Hedgr, activity should help reinforce money reality without drifting into ledger duplication. That hypothesis is worth testing in paper exploration only and does not imply approved Activity-surface expansion unless later named in `docs/ops/HEDGR_STATUS.md` §7 / §7a.

### 6.4 Hierarchy gap

There is still an unresolved ordering problem across:

- portfolio value
- stability status
- actions
- activity
- allocation detail
- trust explanations

Repo doctrine already states that portfolio value should lead and that deeper allocation detail follows later in the hierarchy. The exploration task is to turn that rule into clearer retail presentation logic.

### 6.5 Warmth calibration gap

The repo now admits constrained warmth as a presentation track, but the line between “warmer” and “less serious” is still unsettled.

This is not a visual styling detail.  
It is a trust and doctrine question.

### 6.6 Hidden-model gap

The variant disposition feedback identified doctrine risk when deeper details begin to imply hidden thresholds, rebalance triggers, score logic, or model authority that exceeds the current read-only boundary.

Exploration must resolve this by making deeper disclosure feel clarifying, not mystical.

---

## 7. External lesson translation

External references are useful here only when translated into Hedgr’s own trust model.

### 7.1 Lesson from Stables

Stables demonstrates the value of:

- balance-first anchoring
- minimal primary actions
- quiet visual tone
- low cognitive branching
- recent money activity that feels native and real

The lesson is not to imitate Stables aesthetically.  
The lesson is that digital money products build trust when they feel like actual money products before they feel like systems.

### 7.2 Lesson from Quicken

Quicken demonstrates the value of:

- categorized financial summaries
- fast orientation around recent movement
- financial information grouped into understandable units
- visible “what changed” logic
- money comprehension, not just balance display

The lesson is not to turn Hedgr into a personal finance manager.  
The lesson is that users trust systems that help them understand their financial state at a glance.

### 7.3 Implication for Hedgr

Taken together, these lessons suggest that Hedgr’s retail direction should move toward a **protected money account** posture:

- money-first at the top layer
- structured protection beneath it
- calm, financial, legible summaries
- recent activity as a trust surface
- deeper trust detail below the primary money layer

This direction is more consistent with Hedgr doctrine than either a crypto-wallet framing or a treasury-console framing.

---

## 8. Exploration thesis

**Hedgr retail UI should evolve toward a Protected Money Account presentation: money-first at the top layer, structured protection beneath it, and recent financial reality made legible without clutter or doctrine drift.**

This thesis implies:

1. the interface should feel like a trusted money product before it feels like a system explainer
2. stability and protection must remain visible
3. deeper disclosure must not become shadow accounting
4. warmth may refine presentation, but must not dissolve seriousness
5. activity and orientation deserve more prominence than they currently appear to have in exploration materials

---

## 9. Bounded concept directions

These are exploration directions only. They are not roadmap items and not implementation recommendations.

### 9.1 Direction A — Money-first

**Primary influence:** Stables

**Goal**  
Make Hedgr feel immediately like protected money.

**Characteristics**
- dominant balance anchor
- one-line stability status
- minimal primary actions
- recent activity elevated
- allocation detail lower on page
- reduced explainer density above the fold

**Strength**
- strongest emotional simplicity
- strongest first-glance familiarity
- strongest “real money” feel

**Risk**
- can under-express Hedgr’s differentiated structural protection
- may push too much explanatory value below the fold

### 9.2 Direction B — Financial control center

**Primary influence:** Quicken

**Goal**  
Make Hedgr feel like a disciplined financial overview surface.

**Characteristics**
- balance plus summary blocks
- recent movement and categorized financial orientation
- review cues or reminders
- higher density of financial state information

**Strength**
- strongest orientation
- strongest day-to-day comprehension
- strongest “I understand my money” feel

**Risk**
- can become busy
- can drift toward conventional PFM patterns
- may dilute Hedgr’s core read-only Stability Engine framing

### 9.3 Direction C — Protected money account

**Exploration default for comparison only**

This direction is a synthesis baseline for paper comparison, not a governance decision, implementation recommendation, or product consensus.

**Goal**  
Merge Stables’ simplicity with Quicken’s legibility inside Hedgr doctrine.

**Characteristics**
- portfolio value first
- stability status second
- recent activity or money reality third
- any elevation of activity in this direction is exploratory hierarchy work only, not approved Activity-surface expansion unless later named in `docs/ops/HEDGR_STATUS.md` §7 / §7a
- actions present but restrained
- allocation visible but controlled
- trust detail and disclosure below
- no APY-first framing
- no crypto-native metaphors

**Strength**
- best alignment with current doctrine
- best chance of preserving seriousness while improving money-feel
- supports both protection visibility and user comprehension

**Risk**
- hardest to balance cleanly
- easiest to overload if hierarchy is not disciplined

---

## 10. Replace / retain / retire synthesis

This section consolidates the repo’s disposition logic into a single exploration aid.

### 10.1 Replace

Replace the following patterns in future exploration:

- `Total Treasury` with `Portfolio Value`
- any hero framing that feels institutional-internal rather than retail-financial
- copy implying executed movement when only informational posture exists
- labels that read like backend status instead of retail financial meaning
- disclosure patterns that imply hidden thresholds as runtime truth

### 10.2 Retain

Retain the following non-negotiables:

- read-only posture
- visible protection logic
- informational allocation framing
- seriousness and authority
- risk visibility
- calm tone
- no-score doctrine
- Atlas subordination to current retail truth

### 10.3 Retire

Retire the following patterns from exploration unless doctrine changes explicitly:

- score-based framing
- game-like bars or labels
- defensive or rebalance triggers as user-facing authority
- hidden-model truth feeling
- threshold-as-authority UI
- notice copy implying completed system action
- disclosure that makes the system seem more operationally agentic than current repo truth permits

---

## 11. Evaluation criteria for paper exploration

Each concept direction should be judged against the same criteria.

### 11.1 Trust and doctrine

1. Does it preserve read-only truth?
2. Does it avoid execution semantics?
3. Does it avoid accounting or ledger-truth drift?
4. Does it keep risk visible?
5. Does it remain calm and non-gamified?

### 11.2 Money comprehension

6. Does it feel like real money within the first few seconds?
7. Can a user understand their financial state quickly?
8. Does activity reinforce credibility?
9. Is the safest interpretation clearer after 10 seconds than it was at first glance?

### 11.3 Hedgr distinctiveness

10. Does it still feel unmistakably Hedgr?
11. Does it preserve structured protection as part of the product thesis?
12. Does it avoid collapsing into either a crypto wallet or a generic PFM app?

### 11.4 Presentation discipline

13. Is hierarchy strict and legible?
14. Is warmth controlled rather than indulgent?
15. Does deeper disclosure clarify rather than mystify?

---

## 12. Explicit non-goals

This synthesis does not do any of the following:

1. approve a dashboard redesign
2. approve broader IA expansion
3. recommend a next implementation ticket
4. prescribe new tests or CI work
5. widen the Stability Engine boundary
6. authorize action-strip, onboarding, or v2/v3 retail surface work
7. reinterpret doctrine beyond existing repo truth
8. turn external reference products into product authority

---

## 13. Suggested next use

This document should be used as the framing layer for a **paper-only concept pass**.

That next pass, if done, should:

1. stay explicitly non-implementing
2. test the three bounded directions in low-fidelity form
3. compare hierarchy, money-feel, and doctrine fit
4. use the evaluation criteria in this document
5. avoid creating implied backlog authority

A later governance review may choose to retire, refine, or preserve any concept direction. That review would still not constitute implementation approval unless `docs/ops/HEDGR_STATUS.md` §7 / §7a are updated accordingly.

---

## 14. Closing position

Hedgr does not need a more exciting retail UI.

It needs a more legible one.

The exploration priority is therefore not novelty.  
It is disciplined improvement in:

- money-feel
- financial comprehension
- hierarchy
- trust preservation
- doctrine-safe warmth

The right retail direction is not “more crypto-native.”  
It is “more financially native, while remaining structurally truthful.”