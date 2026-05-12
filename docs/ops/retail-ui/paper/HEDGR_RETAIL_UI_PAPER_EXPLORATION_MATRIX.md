# HEDGR RETAIL UI PAPER EXPLORATION MATRIX

Status: Paper exploration only  
Authority: Non-sequencing, non-implementation  
Scope: Comparative retail UI exploration for Stability Engine-adjacent surfaces  
Last updated: 2026-04-14

---

## 1. Purpose

This document applies the framing established in `HEDGR_RETAIL_UI_EXPLORATION_SYNTHESIS.md` to a bounded paper-only comparison of three retail UI directions.

It exists to:

1. compare alternative top-layer retail presentations
2. test hierarchy, money-feel, and doctrine fit
3. surface risks and tensions before any implementation discussion
4. preserve exploration discipline without implying backlog authority

This document does **not**:

- authorize implementation
- override `docs/ops/HEDGR_STATUS.md`
- create ticket or sequencing authority
- approve broader IA expansion
- approve Activity-surface expansion
- reinterpret doctrine

`docs/ops/HEDGR_STATUS.md` remains the live source for current execution posture and whether any follow-on work is explicitly named.

---

## 2. Authority boundary

This paper pass must be read under current repo truth:

1. Stability Engine retail presentation remains read-only and informational
2. allocation bands are not accounting truth
3. no execution semantics, fund movement, or autonomous reallocation may be implied
4. no concept in this document should be read as approved product direction
5. any elevation of Activity here is exploratory hierarchy work only, not approved surface expansion unless later named in `HEDGR_STATUS.md`

This is a comparison artifact, not a redesign brief.

---

## 3. Shared evaluation reference

These concepts should be read against the evaluation criteria defined in `HEDGR_RETAIL_UI_EXPLORATION_SYNTHESIS.md`, especially:

- read-only truth preservation
- no execution semantics
- no ledger/accounting drift
- risk visibility
- calm, non-gamified presentation
- fast money comprehension
- Hedgr distinctiveness
- disciplined hierarchy
- controlled warmth
- deeper disclosure that clarifies rather than mystifies

---

## 4. Comparison surface

Each concept is intentionally limited to the same bounded retail surface:

1. primary money anchor
2. stability status placement
3. action posture
4. activity placement
5. allocation / trust disclosure position

Out of scope:

- onboarding
- broader navigation changes
- new feature surfaces
- implementation detail
- backend coupling
- approval of Activity expansion
- new trust-surface mechanics

---

## 5. Concept A — Money-first

### 5.1 Core idea

This direction prioritizes immediate financial familiarity.

The interface should feel closest to a trusted money product at first glance, with structural explanation pushed lower in the hierarchy.

### 5.2 Proposed hierarchy

1. Portfolio Value
2. Stability Status
3. Primary Actions
4. Recent Activity
5. Allocation / Trust Detail
6. Advanced Disclosure

### 5.3 Primary user impression

“I can immediately tell how much I have, whether things are stable, and what I can do.”

### 5.4 Strengths

- strongest first-glance simplicity
- strongest “real money” feel
- lowest cognitive load
- best alignment with Stables-style balance anchoring
- likely strongest first-impression trust for non-crypto users

### 5.5 Doctrine fit

Strong on:

- calmness
- simplicity
- money-first hierarchy
- reduction of unnecessary system density

Needs care on:

- maintaining visible protection logic
- ensuring allocation structure is not buried too deeply
- avoiding oversimplification that weakens Hedgr distinctiveness

### 5.6 Risks

- may under-express structured protection
- may feel too generic if trust detail is pushed too low
- may reduce Hedgr’s differentiated thesis to “safe balance screen”
- could create pressure to over-use Activity as a substitute trust surface

### 5.7 Open questions

- how low can allocation detail sit before doctrine clarity weakens?
- how much activity can be shown without implying approved Activity-surface expansion?
- what is the minimum deeper disclosure needed to preserve Hedgr truth?

---

## 6. Concept B — Financial control center

### 6.1 Core idea

This direction prioritizes user orientation and financial legibility.

The interface should help a user understand not only what they have, but also what changed and what deserves attention.

### 6.2 Proposed hierarchy

1. Portfolio Value
2. Stability Status
3. Financial Summary Blocks
4. Recent Movement / Activity
5. Primary Actions
6. Allocation / Trust Detail
7. Advanced Disclosure

### 6.3 Primary user impression

“I understand my current financial state, not just my balance.”

### 6.4 Strengths

- strongest orientation
- strongest short-horizon comprehension
- best use of Quicken-style financial legibility
- likely strongest support for “what changed?” understanding
- may improve daily usefulness without adding execution power

### 6.5 Doctrine fit

Strong on:

- legibility
- information structuring
- helping users understand context
- making money state more explainable

Needs care on:

- avoiding density creep
- avoiding drift into conventional PFM patterns
- avoiding hierarchy dilution where summaries compete with core balance/status anchors

### 6.6 Risks

- easiest direction to overbuild
- may feel too busy for the current read-only scope
- may imply broader IA or Activity expansion
- may weaken Hedgr uniqueness by becoming “financial dashboard” rather than “protected money account”

### 6.7 Open questions

- which summary units are legitimate under current posture?
- how much categorization is useful before it feels like a separate product class?
- does this direction improve trust, or only information density?

---

## 7. Concept C — Protected money account

**Exploration default for comparison only**  
This direction is presented as the current synthesis baseline for paper comparison. It is not a governance decision, implementation recommendation, or product consensus.

### 7.1 Core idea

This direction combines the simplicity of a money-first product with enough structured disclosure to preserve Hedgr’s doctrine and differentiation.

It aims to make Hedgr feel like protected money first, with visible structure beneath that top layer.

### 7.2 Proposed hierarchy

1. Portfolio Value
2. Stability Status
3. Primary Actions
4. Recent Activity or Money Reality
5. Allocation Split / Trust Detail
6. Advanced Disclosure

### 7.3 Primary user impression

“My money is here, it is being handled carefully, and I can understand the structure if I want to.”

### 7.4 Strengths

- best balance between familiarity and doctrine
- strongest alignment with current synthesis thesis
- preserves money-feel without abandoning structural truth
- keeps Hedgr distinct from both crypto wallets and generic finance apps
- most likely to preserve seriousness while improving comprehension

### 7.5 Doctrine fit

Strong on:

- money-first hierarchy
- visible protection posture
- controlled disclosure
- calm presentation
- retaining structured protection as part of the product story

Needs care on:

- keeping the hierarchy disciplined
- avoiding clutter between activity, actions, and allocation
- ensuring disclosure clarifies rather than hints at hidden model authority

### 7.6 Risks

- hardest to execute cleanly
- easiest to overload through “just one more explanatory block”
- may create ambiguity between money layer and trust-detail layer
- any elevation of activity here is exploratory hierarchy work only, not approved Activity-surface expansion

### 7.7 Open questions

- what is the minimum visible allocation/trust layer required to preserve Hedgr truth?
- how should activity appear without becoming a broader product surface?
- where is the right boundary between summary clarity and over-explanation?

---

## 8. Comparative readout

### 8.1 Best for immediate familiarity

**Concept A — Money-first**

This is the cleanest option for first-glance trust and the strongest direct answer to the Stables lesson.

### 8.2 Best for financial orientation

**Concept B — Financial control center**

This is the strongest option for helping users quickly interpret recent money state and change.

### 8.3 Best fit to current Hedgr doctrine

**Concept C — Protected money account**

This is the strongest current synthesis baseline because it best preserves the dual requirement:

- feel like real money
- remain structurally truthful

### 8.4 Key tension across all concepts

The same tension remains across all three:

Hedgr must become more financially native at the top layer without hiding the structural truth that makes it distinct.

---

## 9. Working comparison verdict

For paper exploration, the preferred comparison posture is:

1. use **Concept C** as the baseline
2. use **Concept A** as the simplicity edge probe
3. use **Concept B** as the legibility edge probe

This does **not** mean Concept C is approved.  
It means Concept C is the most useful centerline for comparative critique.

---

## 10. Questions for later governance review

These questions are explicitly deferred and should not be treated as resolved by this document:

1. whether Activity deserves greater prominence in a future approved retail surface
2. whether `Advanced Details` remains the correct disclosure label
3. where the warmth ceiling should be set in retail presentation
4. whether any follow-on retail hierarchy work should be named in `HEDGR_STATUS.md`
5. how much allocation visibility is required at the top layer versus lower disclosure layers

---

## 11. Closing position

This paper pass is not trying to find the most impressive concept.

It is trying to find the most disciplined one.

The comparison priority is:

- clearer money-feel
- better financial comprehension
- stronger hierarchy
- preserved doctrine truth
- lower risk of misread

The right direction will not be the most expressive.

It will be the one that makes Hedgr feel most trustworthy without pretending to be simpler than it really is.