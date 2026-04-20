# HEDGR RETAIL UI ALLOCATION VISUAL PATTERN GUARDRAILS

Status: Paper exploration only  
Authority: Non-sequencing, non-implementation  
Scope: Visual-pattern guardrails for Allocation / Trust Detail on the current C3 retail dashboard baseline  
Last updated: 2026-04-14

---

## 1. Purpose

This document defines **visual-pattern guardrails** for the **Allocation / Trust Detail** layer on the calm-money **C3** retail dashboard baseline.

The dashboard is already in the right emotional lane: calm, money-first, and structurally promising. The open question is **not** whether allocation should carry more meaning in the product story, but **how visual meaning must stay bounded** so legibility gains do not collapse into over-assertion, precision implication, or trust-surface theater.

The goal is to support **future pattern refinement and critique** without drifting into implied accounting truth, “live” operational reads, chart-theatrical treatment, or hierarchy creep relative to **Portfolio Value** and **Stability Status**.

Nothing in this document is **approved final UI treatment**, an implementation mandate, or product approval. It is a **governance-safe documentation artifact** only—subordinate to `docs/ops/HEDGR_STATUS.md` and `AGENTS.md`.

---

## 2. Authority boundary

This document reinforces the same posture as the allocation micro-test stack and retail exploration canon:

- **Read-only and informational** Stability Engine retail presentation remains in force; these guardrails do not introduce execution semantics, protocol-level logic, or operational claims.
- **Allocation is not accounting truth**—bands and targets remain interpretive trust surfaces, not ledger, policy, or live operational state (ADR **0013**, `docs/ops/HEDGR_STATUS.md`).
- **No richer visible engine** is authorized here: no runtime narration, hidden model surfacing, or “live engine” semantics implied through allocation **pattern** choices.
- **No broader information architecture** is implied: C3 order and layer roles stay fixed; guardrails address **how** allocation may read, not **where** it sits or whether the stack widens.
- **No visual pattern described here is approved final UI direction.**
- **No outcome in this document is product approval** or sequencing under `docs/ops/HEDGR_STATUS.md` (implementation authority remains **§7** / **§7a** when explicitly named).

---

## 3. Inputs

Read these guardrails alongside the exploration stack.

**Immediate anchors:**

1. **`docs/ops/HEDGR_RETAIL_UI_ALLOCATION_PATTERN_MICRO_TEST_READOUT.md`** — pattern-level outcomes for Patterns A / B / C on the fixed C3 frame; precision, temperature, busyness, and hierarchy risks.
2. **`docs/ops/HEDGR_RETAIL_UI_ALLOCATION_VISUAL_PATTERN_COMPARISON.md`** — defines Patterns A / B / C and the comparative questions allocation presentation must answer.
3. **`docs/ops/HEDGR_RETAIL_UI_ALLOCATION_LEGIBILITY_BRIEF.md`** — bounded allocation legibility objectives: distribution read, calm weighting, informational trust, explicit deferrals.

**Supporting context:**

4. **`docs/ops/HEDGR_RETAIL_UI_ALLOCATION_PATTERN_MICRO_TEST.md`** — same-frame critique protocol; what must be held constant; explicit out-of-scope items (motion, yield-first, whole-screen drift).
5. **`docs/ops/HEDGR_RETAIL_UI_PASS_RESOLUTION_NOTE.md`** — pass resolution; allocation needs stronger **immediate** legibility **without** performance theater (readability, not excitement).
6. **`docs/ops/HEDGR_RETAIL_UI_MEANING_REFINEMENT_BRIEF.md`** — cross-cutting meaning pass; allocation legibility as governed meaning, not machinery.
7. **`docs/ops/HEDGR_RETAIL_UI_PROTOTYPE_CRITIQUE_READOUT.md`** — trust-detail weight and mid-stack congestion precedent; vocabulary for critique only.
8. **`docs/ops/HEDGR_RETAIL_UI_PAPER_REVIEW_READOUT.md`** — static comparison precedent; trust-detail presence vs softness.
9. **`docs/ops/HEDGR_RETAIL_UI_CRITIQUE_SCORECARD.md`** — shared criteria (e.g. allocation visibility, hierarchy clarity, doctrine fit, calmness, trust legibility).
10. **`docs/ops/HEDGR_STATUS.md`** — sole implementation and sequencing authority; informational allocation bands; no shadow accounting.
11. **`AGENTS.md`** — repo execution standard; engine-facing read order if any future work touches shipped trust surfaces.

---

## 4. Why guardrails are needed

Allocation is becoming one of the defining **trust surfaces** of Hedgr—the layer where protected-money **structure** becomes tangible after money and status.

The allocation pattern micro-test showed that **stronger visual meaning buys grasp**, but quickly raises:

- **precision implication** (segments or cues read as measured, exact, or ledger-true),
- **visual temperature** (decorative, chart-adjacent, or “dashboard” energy),
- **hierarchy creep** (allocation visually contesting mid-stack blocks or feeling like a second hero),
- **performative drift** (scoreboard, instrument, or “how you did” reads the informational surface cannot support).

Guardrails keep future exploration **calm, honest, subordinate, and interpretable**—so reviewers can improve structural grasp without simulating precision, activity, or engine authority the system does not carry.

---

## 5. Core visual principles

### 5.1 Structural, not performative

Allocation visuals may clarify **distribution and posture**, but must not feel like performance tracking, scorekeeping, or chart theater.

### 5.2 Interpretive, not exact

Allocation visuals may suggest **structure**, but must not imply ledger-true precision, measured operational state, or live balance truth.

### 5.3 Calm, not heated

Allocation visuals should improve grasp **without** raising the emotional temperature of the screen.

### 5.4 Subordinate, not competing

Allocation visuals must remain **secondary** to **Portfolio Value** and **Stability Status**.

### 5.5 Plain, not technical

Allocation visuals should feel **retail-natural** and trust-supporting, not system-heavy or institutional-console-like.

---

## 6. Acceptable pattern types

Patterns in this section are **acceptable to continue exploring** in Paper or prototype critique—not approved treatments.

### 6.1 Plain list pattern

- Acceptable as the **calm** baseline and familiarity anchor.
- Useful as a **control** when judging temperature and precision drift in other patterns.
- **Weakest** on immediate structural / distributional grasp (split may require line-by-line scan).

### 6.2 Light structural weighting

- Acceptable when it improves **distributional read** without feeling chart-like or hero-sized.
- Should remain **restrained** and **clearly subordinate** to money and status.
- Should **not** imply exactness, live measurement, or operational state.

### 6.3 Hybrid list-plus-cue pattern

- Acceptable when **row clarity remains primary** and the visual cue stays **secondary**.
- Useful as a **likely centerline family** if restraint holds (list + light structural cue).
- Must stay tightly bounded to avoid **mid-layer busyness** and accidental emphasis.

---

## 7. Risky pattern types requiring caution

These patterns may still be **useful in critique** but require **explicit caution** and same-frame discipline. This section is cautionary, not a prohibition list for all futures.

### 7.1 Proportional or segmented cues

They can improve **grasp**, but may imply **measured exactness** or a **“live”** truth if overdressed or over-read. Treat as interpretive structure, not measured slices.

### 7.2 Dual-encoding treatments

**List plus cue** can improve clarity, but can also create **mid-layer busyness** or **subtle hierarchy creep** if both rows and the cue assert weight.

### 7.3 High-salience distribution visuals

Treatments with **too much contrast, shape emphasis, or visual gravity** risk pulling allocation **upward** in the hierarchy—even when layout order is unchanged on paper.

### 7.4 Cue patterns that feel chart-adjacent

Visuals resembling **small charts, progress meters, or dashboard instruments** are risky **even if static**; they invite precision and performance readings.

---

## 8. Out-of-bounds pattern types

The following are **out of bounds for the current allocation layer posture**—the calm-money, informational, subordinate C3 baseline. Stated boundaries support critique screening; they do not themselves authorize shipping alternatives.

### 8.1 Chart-theater patterns

Examples to avoid:

- mini charts
- dashboard meters
- trophy or reward-like visuals
- yield-display or APY-first styling

### 8.2 Precision-coded patterns

Examples to avoid:

- visuals that read as **exact live allocation measurements**
- cues that imply **ledger truth** or **operational exactness**

### 8.3 Motion or animation-driven patterns

Examples to avoid:

- animated distribution changes
- motion-led emphasis
- cues that make allocation feel **active** or **reactive** (static clarity should be exhausted first; see pass resolution and legibility deferrals)

### 8.4 Hierarchy-breaking patterns

Examples to avoid:

- treatments that **visually compete** with **Portfolio Value**
- treatments that **visually rival** **Stability Status**
- cues that **dominate** adjacent **Actions** or **Activity** blocks

---

## 9. Pattern constraints

Practical constraints for allocation pattern exploration:

- Keep weighting **restrained**; prefer modest structural signal over salience.
- Preserve **row clarity**; do not sacrifice scan of labels for decorative geometry.
- Avoid **chart-like geometry** and instrument metaphors.
- Avoid strong **“live”** signals (pulsing, real-time styling, false exactness).
- Keep **contrast subordinate** to the portfolio card and status layer.
- Avoid **decorative precision** (over-fine segmentation, fake decimal fidelity).
- Keep the pattern readable under **low visual attention** (calm scan path).
- Keep the layer **clearly secondary** to **money** and **status**.

---

## 10. Working pattern signal

**Critique signal only—not approval or final pattern selection.**

- **Pattern A** (current list-like treatment) remains the **calm familiarity control** and the check against precision implication and performative drift.
- **Pattern B** (calm proportional / distributional cue) remains the **strongest direct challenge** to passive list-like reading—and the **highest precision-risk family** if overdressed or over-read.
- **Pattern C** (hybrid list plus light weighting) remains the **strongest current centerline family** **if** calmness and subordination hold; it balances grasp with row-level trust language when restrained.
- Any future pattern exploration should be screened against **restraint first, novelty second**.

---

## 11. Suggested next uses

These guardrails are for **critique and screening**, not implementation sequencing:

1. **Screen** future allocation pattern variants before fixtures multiply scope.
2. **Narrow** acceptable visual-pattern families consistent with informational honesty.
3. **Evaluate** Paper or prototype fixtures against precision, temperature, and hierarchy creep.
4. **Reject** cues quickly when they drift toward theater, false exactness, or competition with money and status.

---

## 12. Working conclusion

The allocation micro-test supports **better legibility** only within **strict visual boundaries**: clearer protected-money **structure** without louder trust theater, richer engine exposure, or implied operational exactness.

**Allocation visuals should clarify protected-money structure, not simulate precision or perform activity.**
