# HEDGR RETAIL UI ALLOCATION PATTERN MICRO TEST READOUT

Status: Paper exploration only  
Authority: Non-sequencing, non-implementation  
Scope: Readout of same-frame Allocation / Trust Detail pattern micro-test on the current C3 retail dashboard baseline  
Last updated: 2026-04-14

---

## 1. Purpose

This document records the outcome of the **same-frame allocation-pattern micro-test** defined in `docs/ops/HEDGR_RETAIL_UI_ALLOCATION_PATTERN_MICRO_TEST.md`, comparing **Pattern A**, **Pattern B**, and **Pattern C** for the **Allocation / Trust Detail** layer on the calm-money **C3** retail dashboard baseline.

The **C3 frame remained fixed**: same structure, same order, same mock data, and the same non-allocation blocks. **Only the allocation presentation pattern** varied across fixtures. The purpose was to **isolate pattern effect** on **at-a-glance grasp**, **calmness**, **subordinate hierarchy**, and **trust-surface honesty**—not to rehearse layout shifts, IA changes, or a richer visible engine.

Nothing in this document is an **approved final UI pattern**, implementation mandate, or product decision. It is **critique readout only**, subordinate to `docs/ops/HEDGR_STATUS.md` and `AGENTS.md`, and aligned with the allocation legibility framing in `docs/ops/HEDGR_RETAIL_UI_ALLOCATION_LEGIBILITY_BRIEF.md`, `docs/ops/HEDGR_RETAIL_UI_ALLOCATION_VISUAL_PATTERN_COMPARISON.md`, `docs/ops/HEDGR_RETAIL_UI_PASS_RESOLUTION_NOTE.md` (**§6.2**), and `docs/ops/HEDGR_RETAIL_UI_MEANING_REFINEMENT_BRIEF.md` (**§6.2**).

---

## 2. Authority boundary

This readout reinforces the same governance posture as the micro-test and the broader retail exploration stack:

- **Read-only and informational** Stability Engine retail presentation remains in force; this readout does not introduce execution semantics, operational claims, or protocol-level disclosure.
- **Allocation is not accounting truth**—bands and targets remain interpretive trust surfaces, not ledger, policy, or live operational state (ADR **0013**, `docs/ops/HEDGR_STATUS.md`).
- **No richer visible engine** is authorized by this readout: no engine narration, runtime semantics, or “live” implication surfaced through allocation **pattern** choices.
- **No visual pattern discussed here is approved final UI direction.**
- **No outcome in this document is product approval** or sequencing under `docs/ops/HEDGR_STATUS.md` **§7** / **§7a**.
- **Information architecture and allocation’s layer position** are not widened or moved by this critique; judgments apply **only** to how allocation **reads** inside the **existing** subordinate slot.

Prototype and Paper precedent (`docs/ops/HEDGR_RETAIL_UI_PROTOTYPE_CRITIQUE_READOUT.md`, `docs/ops/HEDGR_RETAIL_UI_PAPER_REVIEW_READOUT.md`) and shared criteria (`docs/ops/HEDGR_RETAIL_UI_CRITIQUE_SCORECARD.md`) inform vocabulary only; they do not convert this readout into implementation authority.

---

## 3. Test reviewed

The micro-test compared **three** allocation presentation treatments on the **same** C3 frame, holding **structure**, **hierarchy**, and **everything outside the allocation block** constant. The central critique question:

**Which allocation pattern best improves at-a-glance grasp while preserving calmness, subordinate hierarchy, and trust-surface honesty?**

All treatments remain **critique prompts only**—not specs, not approved components.

### 3.1 Pattern A — Current list pattern

**Pattern A** was the **familiarity and calmness control**: the current list-like baseline against which proportional and hybrid cues are judged for **temperature**, **precision implication**, and **performative drift**.

### 3.2 Pattern B — Calm proportional pattern

**Pattern B** was the **direct challenge to passive, list-like reading**: a restrained proportional or distributional cue intended to improve **immediate split comprehension** without chart theater.

### 3.3 Pattern C — Hybrid pattern

**Pattern C** **combined list clarity with light visual weighting** so row-level labels and a modest structural cue could reinforce each other—testing whether **grasp** could improve without promoting allocation in the hierarchy.

---

## 4. What the micro-test confirmed

Holding the frame constant made several distinctions easier to hold with discipline:

- **Pattern effect** became easier to judge because **hierarchy effect** did not move: Portfolio Value and Stability Status stayed primary; allocation stayed subordinate. Reviewers could separate **how allocation reads** from **whether the stack was redesigned**.
- **Allocation legibility** can improve **without** changing the broader dashboard structure—consistent with pass resolution (**§6.2**) and the legibility brief: stronger **immediate** read, not a new anchor layer.
- **Stronger visual treatment** can buy **grasp**, but it quickly raises **precision implication** (segments that feel measured or exact) and **visual temperature** risk if the cue reads decorative, chart-like, or “live.”
- **Hybrid** treatments can balance **clarity** and **calmness**, but only if **restraint** holds: list + cue can slide into **mid-layer busyness** or **competition** with adjacent blocks if weighting is not tightly bounded.

Throughout, the test remained a check against conflating **layout or hierarchy changes** with **allocation presentation** alone.

---

## 5. Pattern-by-pattern read

Comparative, **non-final** reads for critique. These are not component specs or shipping briefs.

### 5.1 Pattern A — Current list pattern

- **Strongest familiarity and calmness**; lowest risk that rows imply **ledger-exact** or measured slices.
- **Weakest immediate distribution read**—the split may require line-by-line scan before posture feels structurally clear.
- **Useful as a lower-bound control** and as the baseline that catches **performative drift** in B or C.

### 5.2 Pattern B — Calm proportional pattern

- **Strongest direct gain in split comprehension** at the pattern level—posture can read as proportion sooner than in a passive list.
- **Useful challenge to passivity**; best for learning how much proportional signal buys grasp at acceptable governance cost.
- **Highest risk of precision implication** or quiet **chart-theater** if overdressed or **over-read** as exact, live, or operational.

### 5.3 Pattern C — Hybrid pattern

- **Strongest likely balance of grasp and calmness** when executed with discipline—list clarity plus a **light** structural cue.
- **Preserves list clarity** while improving **structural read**; aligns with the legibility brief’s aim: structure visible at a glance **without** more machinery on the card.
- **Still carries risk** of **busyness** or **mid-layer competition** (e.g. with Actions or Activity) if the cue and rows both assert visual weight.

---

## 6. Comparative readout

Disciplined, **likely** comparative answers—hypotheses for discussion, **not** approval. **Pattern effect** is not **hierarchy effect**; **grasp** is not permission to imply **accounting truth**.

### 6.1 Which pattern preserved calmness best?

**Likely: Pattern A.** List-like informational rows stay coolest and least chart-adjacent when the goal is minimal visual temperature.

### 6.2 Which pattern improved immediate grasp best?

**Likely: Pattern B or Pattern C**, with a disciplined distinction: B may win raw **split-at-a-glance**; C may win **grasp** when reviewers require **row clarity** and **trust-language** anchoring alongside a proportional cue. Neither should be read as authorizing **precision** or **live-state** claims.

### 6.3 Which pattern best preserved trust-surface honesty?

**Likely: Pattern C, if restraint held; otherwise Pattern A as safer fallback.** C can pair interpretive labels with a **bounded** cue that does not pretend to measured truth; A avoids proportional cues that might be misread as exact. B is honest only if the proportional treatment stays explicitly **interpretive** and non-exact in feel.

### 6.4 Which pattern most risked precision implication?

**Likely: Pattern B.** Segmented or proportional visuals are the easiest to **over-read** as measured, ledger-true, or “live” unless strongly tempered.

### 6.5 Which pattern most risked hierarchy creep or mid-layer busyness?

**Likely: Pattern C.** List plus weighting doubles surface assertiveness; without tight spacing and subordination, the block can feel like a **competing** mid-layer relative to Actions or Activity—even when hierarchy **on paper** is unchanged.

### 6.6 Which pattern is the strongest current centerline?

**Likely: Pattern C, if calmness and subordination were preserved**—matching the working hypothesis in the micro-test and pattern-comparison docs. **Pattern A** remains the **control**; **Pattern B** remains the **stress test** for passivity vs. precision risk.

---

## 7. Working signal

**Critique signal only—not approval.**

- **Pattern A** remains the **calm familiarity control** and the check against **precision implication** and **performative drift** in B and C.
- **Pattern B** is the **strongest direct challenge** to passive, list-like reading—best for learning whether a proportional cue materially improves **immediate grasp** at acceptable governance cost.
- **Pattern C** is the **strongest current centerline candidate** **if** reviewers preserve **calmness**, **subordinate hierarchy**, and **trust-surface honesty** while gaining a clearer distributional read.

Any “winner” is input for the **next critique cycle**, not a ship decision under `docs/ops/HEDGR_STATUS.md`.

---

## 8. What remains unresolved

- Whether **Pattern B’s** proportional cue feels **too exact** or too **“live”** for an informational band surface.
- Whether **Pattern C** stays **restrained enough** under **real fixture density** (long labels, edge cases, future copy).
- Whether any pattern introduces **subtle competition** with **Actions** or **Activity**—a **mid-layer salience** problem that can be mistaken for **pattern** success.
- Whether **allocation sublabels** remain **strong enough** once the **visual pattern** changes (naming may lag visual weight).
- What **pattern features** must be **explicitly avoided** to prevent **performative drift** (decorative charts, reward-like emphasis, false exactness).

---

## 9. Suggested next outputs

Critique-oriented follow-ons—**not** implementation sequencing:

1. A **narrowed note** on **acceptable allocation visual-pattern families** (what “calm proportional” may include or exclude at pattern level).
2. A **short list of pattern traits or cues to avoid** (precision-like segmentation, animated or “live” reads, scoreboard framing).
3. A **follow-on micro-test** **only if** one unresolved variable clearly needs **isolation** (e.g. density vs. cue strength)—not a default expansion of scope.
4. A **label review** **only if** pattern testing exposed a **real naming weakness**—not a default copy exercise.

Allocation visual-pattern screening guidance is captured in `docs/ops/HEDGR_RETAIL_UI_ALLOCATION_VISUAL_PATTERN_GUARDRAILS.md`.

These support **review and iteration**, not authorization to build.

---

## 10. Working conclusion

The micro-test supports **improving allocation legibility** through **bounded visual treatment**—clearer structural read within the **existing** trust layer—rather than through **louder trust theater**, richer engine exposure, or implied operational exactness.

**The strongest allocation pattern is the one that improves structural grasp without making the trust layer look more active or more exact than the system can honestly support.**
