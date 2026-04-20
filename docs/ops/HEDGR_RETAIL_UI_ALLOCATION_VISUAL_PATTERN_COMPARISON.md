# HEDGR RETAIL UI ALLOCATION VISUAL PATTERN COMPARISON

Status: Paper exploration only  
Authority: Non-sequencing, non-implementation  
Scope: Bounded visual-pattern comparison for Allocation / Trust Detail on the current C3 retail dashboard baseline  
Last updated: 2026-04-14

---

## 1. Purpose

This document compares a **small bounded set of visual-pattern directions** for the **Allocation / Trust Detail** layer on the current calm-money **C3** retail dashboard baseline.

The dashboard is already in the right emotional lane: calm, money-first, and structurally promising. The open question is **not** whether allocation should exist or where it belongs in the stack, but **how it should read**—so users grasp protected-money **structure** faster without raising visual temperature.

The goal is **clearer grasp, not more visual intensity**: better immediate interpretation and scan path within the existing hierarchy, not a new hero surface or louder treatment.

Nothing in this document is an approved final UI pattern, implementation mandate, or product decision. It is a **critique-oriented pattern comparison** only, subordinate to `docs/ops/HEDGR_STATUS.md` and `AGENTS.md`.

---

## 2. Authority boundary

This comparison reinforces the same posture as the allocation legibility and meaning passes:

- **Read-only and informational** retail presentation for Stability Engine surfaces remains in force; this doc does not introduce execution semantics or operational authority.
- **Allocation is not accounting truth**—bands and targets remain interpretive trust surfaces, not ledger, policy, or runtime state (aligned with ADR **0013** and `HEDGR_STATUS.md`).
- **No richer visible engine** is authorized here: no protocol-level disclosure, policy narration, or “live engine” semantics surfaced through allocation presentation.
- **No broader information architecture** is implied: C3 order and layer roles stay fixed; comparison is about **how** allocation reads, not **where** it sits relative to Portfolio Value or Stability Status.
- **No visual pattern named in this document is approved final UI direction.**
- **No outcome in this document is product approval** or sequencing under `HEDGR_STATUS.md` **§7** / **§7a**.

---

## 3. Inputs

Read this comparison alongside the exploration stack, with these **immediate anchors**:

1. **`docs/ops/HEDGR_RETAIL_UI_ALLOCATION_LEGIBILITY_BRIEF.md`** — bounded refinement framing for allocation legibility; distribution read, calm weighting, and informational trust.
2. **`docs/ops/HEDGR_RETAIL_UI_PASS_RESOLUTION_NOTE.md`** — pass resolution; **§6.2** accepts stronger **immediate** allocation legibility within trust-surface discipline (readability, not excitement).
3. **`docs/ops/HEDGR_RETAIL_UI_MEANING_REFINEMENT_BRIEF.md`** — cross-cutting meaning pass; **§6.2** treats allocation legibility as governed meaning, not machinery.

**Supporting context:**

4. **`docs/ops/HEDGR_RETAIL_UI_PROTOTYPE_CRITIQUE_READOUT.md`** — C3-R2 prototype readout; trust detail visible but weighting still an open question (“slightly softer than ideal” in cleaner stacks).
5. **`docs/ops/HEDGR_RETAIL_UI_PAPER_REVIEW_READOUT.md`** — static side-by-side critique; reinforces judgment of trust-detail weight and hierarchy under comparison.
6. **`docs/ops/HEDGR_RETAIL_UI_C3_REFINEMENT_BRIEF.md`** — C3 centerline, order discipline, subordinate placement of Allocation / Trust Detail.
7. **`docs/ops/HEDGR_RETAIL_UI_C3_REFINEMENT_NOTES.md`** — C3-R1–R4 variables; **trust-detail weight** as an explicit refinement dimension paired with separation and disclosure tone.
8. **`docs/ops/HEDGR_RETAIL_UI_SECOND_PASS_VARIANT_SCORE_RUN.md`** — second-pass Concept C scores; C3 as refinement baseline; allocation visibility as a scored lens without shadow accounting.
9. **`docs/ops/HEDGR_RETAIL_UI_CRITIQUE_SCORECARD.md`** — repeatable criteria (e.g. allocation visibility, hierarchy clarity, doctrine fit, calmness, trust legibility).
10. **`docs/ops/HEDGR_STATUS.md`** — sole implementation and sequencing authority; exploration remains subordinate.
11. **`AGENTS.md`** — repo execution standard; engine-facing read order if any future work touches shipped trust surfaces.

**Prototype and Paper readouts** are especially relevant because they showed Allocation / Trust Detail as **present** and structurally honest, but—in cleaner C3-R2 stacks—still somewhat **passive** or **softly weighted** relative to Hedgr’s trust ambition. That gap motivates this pattern-level comparison without widening IA.

---

## 4. Why this comparison is needed

The allocation layer is **visible and useful**, but it can still read as **too list-like** or **too passive**: informative rows that require reading to infer **how protection is split**, rather than a calm, immediate **distributional** read.

This comparison tests whether allocation can become:

- **easier to grasp at a glance** (immediate structure, not row-by-row discovery),
- **more clearly distributional** (split and posture felt as proportion, not only as labels),
- **more meaningfully weighted as Hedgr truth** (distinct from generic supporting copy),

while remaining:

- **calm** (no chart theater, no yield or performance framing),
- **subordinate** (secondary to Portfolio Value and Stability Status),
- **informational** (trust surface, not operational console),
- **non-performative** (no cues that imply precision, live engine state, or “how you did”).

The framing stays **governance-safe**: comprehension and relative salience within informational bounds, not new claims or richer risk machinery on the main card.

---

## 5. Fixed assumptions

This comparison assumes:

- the **C3 baseline frame** and layer **order** remain fixed;
- **Portfolio Value** and **Stability Status** remain **primary** in the reading hierarchy;
- **Allocation / Trust Detail** stays in the **same place** in the stack (subordinate trust layer, not promoted);
- the allocation layer stays **informational** and **honesty-bounded** (no accounting-truth drift);
- **no engine-level disclosure** or **richer risk signaling** is introduced in this pass—only bounded **presentation pattern** hypotheticals for critique.

---

## 6. Comparison set

Exactly **three** pattern directions—pattern-level only, not component specifications.

### 6.1 Pattern A — Current list pattern

- **Current control** for familiarity and doctrine alignment.
- **Strongest familiarity** and lowest risk of accidental precision theater—rows read as interpretive targets, not measured slices.
- **Weakest at-a-glance distribution read**—the split may require scanning multiple lines before the posture “clicks.”
- **Useful baseline** for legibility comparison and for detecting **performative drift** in B or C.

### 6.2 Pattern B — Calm proportional pattern

- Introduces a **restrained visual distribution cue** (e.g. calm segment or proportion read) to support **immediate split comprehension**.
- Intended to improve **immediate grasp** of how allocation **distributes** without turning the block into a chart or scoreboard.
- Must stay **bounded and non-theatrical**—static, low-motion, subordinate visual weight.
- **Risk:** if overdressed, implies **false precision** or “measured truth” beyond what informational bands can honestly support.

### 6.3 Pattern C — Hybrid pattern

- **Combines list clarity** (labels, plain language) with **light visual weighting** (modest proportional or grouping cue) so structure and detail reinforce each other.
- **Likely strongest candidate** for balancing **grasp** and **calmness**—if restraint holds.
- **Risk:** without discipline, **visual weighting + rows** can read **busy** or compete with mid-stack layers; hierarchy must stay clearly below money and status.

---

## 7. What reviewers should judge

Use these criteria side by side—critique verdicts only:

- **Immediate grasp** — how fast the split reads as structure, without relying on dense reading.
- **Calmness** — visual temperature stays low; no dashboard or crypto-console energy.
- **Trust legibility** — reads as informational trust and protected-money posture, not performance or ranking.
- **Subordinate hierarchy** — allocation never rivals Portfolio Value or Stability Status for prominence.
- **Retail-natural readability** — feels like calm money, not engineering exposition.
- **Avoidance of performance theater** — no APY-first, yield, or “returns story” framing.
- **Avoidance of accounting-truth implication** — no cue that bands are ledger-exact or live operational state.
- **Fit with Hedgr’s protected-money identity** — structure feels honestly bounded and category-defining, not generic PFM chrome.

Keep distinctions sharp: **immediate grasp** is not the same as **visual weighting**; **visual weighting** must not slide into **performative drift** or **precision implication**.

---

## 8. Pattern-by-pattern read

Comparative, non-final reads for critique.

### 8.1 Pattern A — Current list pattern

- **Preserves:** calm tone, clear informational boundary, low risk of implying measured splits; strong **control** for doctrine checks.
- **Lacks:** fastest **distributional** scan; may stay **passive** or wallpaper-adjacent unless typography and grouping already carry weight.
- **Why it remains useful:** every comparison needs a **familiar, calm baseline** to detect when B or C raise temperature or imply too much precision.

### 8.2 Pattern B — Calm proportional pattern

- **May improve:** **immediate** sense of how money is **split**; stronger “posture at a glance” without adding explanatory blocks.
- **Risks:** **precision implication** if segments look too exact; **visual temperature** if the cue reads decorative or chart-like; must not feel like a second hero.
- **Why it is useful:** it is the **strongest direct challenge** to passive, list-only reading—useful to learn how much proportional signal helps before adding row detail.

### 8.3 Pattern C — Hybrid pattern

- **Why it may be the strongest current centerline candidate:** it can pair **row-level clarity** (names, plain labels) with a **light structural cue**, matching the legibility brief’s aim: clearer structure **without** more machinery or density.
- **Balance it tries to hold:** **grasp** (distributional read) vs **calmness** (subordinate, informational); **weight** vs **honesty bounds**.
- **Restraint risks:** **busy** mid-layer if list + cue both assert; risk of **competing** with Actions/Activity if separation and spacing are not held constant in critique fixtures.

---

## 9. Working signal

**Critique signal only—not approval.**

- **Pattern A** remains useful as the **calm familiarity control** and the check against precision and theater drift.
- **Pattern B** is the **strongest direct challenge** to passive, list-like reading—best for testing whether proportional cues buy meaningful grasp at acceptable governance cost.
- **Pattern C** is the **likely strongest current centerline candidate** if reviewers can hold **calmness** and **subordination** while gaining a clearer distributional read.

Any “winner” here is a **hypothesis for the next critique cycle**, not a ship decision.

---

## 10. Explicitly out of scope

The following are **out of scope** for this pattern comparison:

- **Protocol-level disclosure inside allocation** — would shift the layer toward engine narration; contradicts informational posture; belongs in governed disclosure paths if ever, not main-card pattern tests.
- **Richer risk-state visualization** — needs thresholds, doctrine, and communications rules; risks alarm theater or over-claiming; calmer status language stays upstream for this pass.
- **Motion-based allocation feedback** — motion can imply sophistication or reward; pass resolution defers rich motion until **static** clarity is exhausted.
- **APY or yield-performance emphasis** — contradicts liquidity-before-yield and non-yield-first doctrine; allocation stays posture/trust, not returns marketing.
- **Whole-screen redesign** — C3 order and roles are fixed; comparison is local to allocation **presentation pattern** hypotheticals.
- **Legal/trust sign-off on final visual treatment** — this doc produces no approved strings or treatments; governance remains separate from critique artifacts.

---

## 11. Suggested next outputs

Critique-oriented follow-ons (not implementation sequencing):

1. **Paper or prototype same-frame comparison** of Patterns **A / B / C** on the **unchanged** C3 baseline—same mock data, same hierarchy, allocation-only pattern variation.
2. **Short readout** on which pattern **best improves grasp** without **raising visual temperature** or competing with Portfolio Value / Stability Status—verdict for discussion only.
3. **Narrowed note** on **acceptable allocation visual-pattern families** (what “calm proportional” may include or exclude at pattern level).
4. **Label review for allocation sublabels** only if pattern testing surfaces a **real naming** gap—governed test set, not a ship list.

These support **review and iteration**, not authorization to build.

---

## 12. Working conclusion

The allocation layer should become **easier to read as structure**—how protected money is **split and framed**—without becoming **more performative** or implying authority the system does not carry.

**Allocation should read more clearly as protected-money structure without looking more active than the system can honestly support.**
