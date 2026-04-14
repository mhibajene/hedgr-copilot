# HEDGR RETAIL UI FIRST PASS CRITIQUE READOUT

Status: Paper exploration only  
Authority: Non-sequencing, non-implementation  
Scope: First-pass critique readout for bounded retail UI concept comparison  
Last updated: 2026-04-14

---

## 1. Purpose

This document records the first-pass critique outcome from the current retail UI exploration stack.

It consolidates the initial comparative judgment across:

- `HEDGR_RETAIL_UI_EXPLORATION_SYNTHESIS.md`
- `HEDGR_RETAIL_UI_PAPER_EXPLORATION_MATRIX.md`
- `HEDGR_RETAIL_UI_SCREEN_ANATOMY_COMPARISON.md`
- `HEDGR_RETAIL_UI_LOW_FIDELITY_WIRE_DESCRIPTIONS.md`
- `HEDGR_RETAIL_UI_CRITIQUE_SCORECARD.md`

It exists to:

1. document the current critique baseline
2. preserve the rationale behind the first-pass ranking
3. identify doctrine risks that remain unresolved
4. guide further paper exploration without implying implementation authority

This document does **not**:

- authorize implementation
- create sequencing authority
- approve a concept direction
- update `docs/ops/HEDGR_STATUS.md`
- function as a decision log or ADR

This is a paper critique readout only.

---

## 2. Authority boundary

This readout must be interpreted under current repo truth:

1. Stability Engine retail presentation remains read-only and informational
2. allocation is informational, not accounting truth
3. no concept reviewed here is an approved product direction
4. no critique outcome should be treated as roadmap authority
5. Activity-related judgments remain exploratory only and do not imply approved IA expansion unless later named in `HEDGR_STATUS.md`

This is a critique artifact, not a governance action.

---

## 3. Concepts reviewed

The first-pass critique covered three bounded concepts:

### 3.1 Concept A — Money-first
Used to test the lower bound of visible complexity and the strongest money-feel posture.

### 3.2 Concept B — Financial control center
Used to test the upper bound of financial legibility and orientation density.

### 3.3 Concept C — Protected money account
**Exploration default for comparison only**

Used as the current centerline for critique because it most directly tests the balance between financial familiarity and structural truth.

---

## 4. Score summary

### 4.1 Concept A — Money-first

| Criterion | Score | Short rationale |
|----------|------:|-----------------|
| Money-feel | 5 | Strongest immediate “real money” impression. Fastest familiarity. |
| Doctrine fit | 3 | Safe at the top layer, but risks pushing structured protection too low. |
| Hierarchy clarity | 5 | Cleanest sequence. Very little ambiguity. |
| Trust legibility | 3 | Feels trustworthy, but can under-explain why. |
| Activity restraint | 4 | Activity is present but unlikely to dominate. |
| Allocation visibility | 2 | Biggest weakness. Protection logic risks becoming too recessive. |
| Disclosure clarity | 4 | Easier to keep deeper disclosure bounded because less is competing above fold. |
| Calmness and tone | 5 | Strongest calmness. Lowest stimulation. |
| Hedgr distinctiveness | 3 | Can drift toward generic “safe balance app” if not carefully anchored. |

**Total score:** 34/45

### 4.2 Concept B — Financial control center

| Criterion | Score | Short rationale |
|----------|------:|-----------------|
| Money-feel | 3 | Still financial, but less immediate and less calm than A. |
| Doctrine fit | 3 | Can fit doctrine, but more exposed to density and scope creep. |
| Hierarchy clarity | 3 | More informative, but easier to clutter or confuse. |
| Trust legibility | 4 | Better at helping users interpret recent money state. |
| Activity restraint | 2 | Highest risk of activity becoming a broader surface. |
| Allocation visibility | 4 | Easier to show protection context without burying it. |
| Disclosure clarity | 3 | More elements increase risk that deeper disclosure feels layered or over-authored. |
| Calmness and tone | 3 | More likely to feel dashboard-like rather than calm. |
| Hedgr distinctiveness | 3 | Could drift toward PFM territory if overbuilt. |

**Total score:** 28/45

### 4.3 Concept C — Protected money account

**Exploration default for comparison only**

| Criterion | Score | Short rationale |
|----------|------:|-----------------|
| Money-feel | 4 | Strong money impression, though slightly less immediate than A. |
| Doctrine fit | 5 | Best balance between money familiarity and visible structural truth. |
| Hierarchy clarity | 4 | Strong if disciplined, though more fragile than A. |
| Trust legibility | 5 | Best candidate for making protection understandable without overexposure. |
| Activity restraint | 3 | Manageable, but needs strict control to avoid surface creep. |
| Allocation visibility | 5 | Strongest balance of visibility without over-centralizing it. |
| Disclosure clarity | 4 | Good potential, but depends on keeping deeper detail bounded and non-mystical. |
| Calmness and tone | 4 | Can stay calm if explanatory density is controlled. |
| Hedgr distinctiveness | 5 | Most clearly expresses Hedgr as protected money, not generic finance or crypto. |

**Total score:** 39/45

Totals are directional only: they support critique and comparison, not automatic concept selection logic.

---

## 5. Comparative readout

### 5.1 Which concept feels most like real money the fastest?

**Concept A — Money-first**

This concept delivers the cleanest immediate familiarity and the strongest direct answer to the Stables lesson.

### 5.2 Which concept preserves doctrine best?

**Concept C — Protected money account**

This concept best preserves visible structured protection while still feeling like a money product rather than a system console.

### 5.3 Which concept has the clearest hierarchy?

**Concept A — Money-first**

Concept A has the strongest raw hierarchy simplicity. Concept C remains viable here, but only if its mid-layer density is tightly controlled.

### 5.4 Which concept makes protection easiest to understand?

**Concept C — Protected money account**

Concept C gives protection enough visible surface area to matter without allowing it to take over the entire product identity.

### 5.5 Which concept introduces the most scope-creep risk?

**Concept B — Financial control center**

This concept is the most exposed to drift into broader dashboard behavior, activity expansion, or PFM-like sprawl.

### 5.6 Which concept is the best current centerline for further critique?

**Concept C — Protected money account**

Concept C is the best current centerline because it most directly expresses the dual Hedgr requirement:

- feel like real money
- remain structurally truthful

---

## 6. Main strengths and doctrine risks

### 6.1 Concept A — Money-first

**Main strength**  
Best money-feel and strongest hierarchy simplicity.

**Main doctrine risk**  
Structured protection may become too invisible.

**Main unresolved question**  
How little visible allocation / trust detail can Hedgr show before the product stops feeling meaningfully Hedgr?

### 6.2 Concept B — Financial control center

**Main strength**  
Best orientation and “what changed?” legibility.

**Main doctrine risk**  
Highest risk of IA drift and dashboard sprawl.

**Main unresolved question**  
Does this improve trust, or just add more financial information density?

### 6.3 Concept C — Protected money account

**Main strength**  
Best centerline between familiarity and structural truth.

**Main doctrine risk**  
Mid-layer congestion: Actions, Activity, and Allocation / Trust Detail may compete for equal prominence above the fold.

**Main unresolved question**  
What is the minimum visible trust / allocation layer needed above the fold to preserve Hedgr truth without clutter?

---

## 7. Working rank order

Current first-pass ranking:

1. **Concept C — Protected money account**
2. **Concept A — Money-first**
3. **Concept B — Financial control center**

This rank order is critique-oriented only.  
It does not constitute concept approval.

---

## 8. Interpretation of the result

The current critique outcome suggests:

- **Concept C** is currently the strongest Hedgr-native centerline for continued paper critique
- **Concept A** is the strongest simplicity pressure test
- **Concept B** is still useful, but primarily as an upper-bound probe for financial legibility rather than as the likely baseline direction

The practical reading is not “Concept C wins.”

The practical reading is:

**Concept C is currently the most useful concept for continued critique because it best carries the product tension Hedgr actually needs to solve.**

---

## 9. Questions carried forward

The first-pass critique does not resolve the following:

1. the exact boundary and naming of Activity / Money Reality relative to broader IA expansion
2. the minimum viable Allocation / Trust Detail needed above the fold
3. whether actions should always precede activity in the centerline concept
4. what should replace or preserve `Advanced Details`
5. where the warmth ceiling should be set once structure is more fixed

These remain exploration and governance-sensitive questions.

---

## 10. Recommended next critique posture

The current recommendation for further paper critique is:

1. continue using **Concept C** as the baseline
2. use **Concept A** to keep the system honest on simplicity
3. use **Concept B** to keep the system honest on legibility and orientation density

The main discipline risk is mid-layer congestion, especially if Actions, Activity, and Allocation / Trust Detail begin competing for equal prominence above the fold.

This should remain a critique posture only, not an implementation recommendation.

---

## 11. Closing position

This first-pass readout does not identify a final answer.

It identifies the most disciplined current centerline.

The strongest present conclusion is that Hedgr should continue exploring a retail posture that feels:

- financially native
- calm
- legible
- structurally honest
- protective without becoming abstract

The product should not feel like a crypto dashboard.  
It should not feel like a generic finance app either.

It should feel like protected money.