# HEDGR RETAIL UI ALLOCATION PATTERN MICRO TEST

Status: Paper exploration only  
Authority: Non-sequencing, non-implementation  
Scope: Same-frame micro-test for comparing Allocation / Trust Detail presentation patterns on the current C3 retail dashboard baseline  
Last updated: 2026-04-14

---

## 1. Purpose

This document defines a **constrained same-frame micro-test** for the **Allocation / Trust Detail** layer on the calm-money **C3** retail dashboard baseline.

The **base screen remains fixed**: same structure, same order, same mock data, same non-allocation blocks. **Only the allocation presentation pattern** changes across fixtures (Patterns **A / B / C**).

The aim is to **isolate pattern effect** on **immediate grasp**, **trust legibility**, and **calmness**—not to rehearse a new layout, IA shift, or whole-screen visual language pass.

Nothing in this document is an approved final UI pattern, implementation ticket, or product decision. It is **critique protocol** only, subordinate to `docs/ops/HEDGR_STATUS.md` and `AGENTS.md`.

---

## 2. Authority boundary

This micro-test reinforces the same governance posture as the allocation exploration stack:

- **Read-only and informational** Stability Engine retail presentation remains in force; the test does not introduce execution semantics or operational claims.
- **Allocation is not accounting truth**—bands and targets stay interpretive trust surfaces, not ledger, policy, or live operational state (aligned with ADR **0013** and `HEDGR_STATUS.md`).
- **No richer visible engine** is authorized by this test: no protocol-level disclosure, policy narration, or runtime semantics surfaced through allocation.
- **No visual pattern described here is approved final UI direction.**
- **No outcome of this test is product approval** or sequencing under `HEDGR_STATUS.md` **§7** / **§7a**.

---

## 3. Inputs

Read this micro-test alongside the exploration stack, with these **immediate anchors**:

1. **`docs/ops/HEDGR_RETAIL_UI_ALLOCATION_VISUAL_PATTERN_COMPARISON.md`** — defines Patterns **A / B / C** at pattern level and the comparative questions this same-frame exercise is meant to answer.
2. **`docs/ops/HEDGR_RETAIL_UI_ALLOCATION_LEGIBILITY_BRIEF.md`** — bounded allocation legibility objectives: distribution read, calm weighting, informational trust, explicit deferrals.

**Supporting context:**

3. **`docs/ops/HEDGR_RETAIL_UI_PASS_RESOLUTION_NOTE.md`** — **§6.2** accepts stronger **immediate** allocation legibility without performance theater.
4. **`docs/ops/HEDGR_RETAIL_UI_MEANING_REFINEMENT_BRIEF.md`** — **§6.2** frames allocation legibility as governed meaning, not machinery.
5. **`docs/ops/HEDGR_RETAIL_UI_PROTOTYPE_CRITIQUE_READOUT.md`** — same-frame discipline echoes prototype/Paper comparison; trust-detail **weight** remains an open refinement dimension.
6. **`docs/ops/HEDGR_RETAIL_UI_PAPER_REVIEW_READOUT.md`** — side-by-side static comparison as a precedent for isolating variables.
7. **`docs/ops/HEDGR_RETAIL_UI_CRITIQUE_SCORECARD.md`** — shared criteria (e.g. allocation visibility, hierarchy clarity, doctrine fit, calmness, trust legibility).
8. **`docs/ops/HEDGR_STATUS.md`** — sole implementation and sequencing authority; this test does not authorize shipped work.
9. **`AGENTS.md`** — repo execution standard; engine-facing governance if any future work touches shipped trust surfaces.

---

## 4. Why a same-frame micro-test is needed

Patterns **A / B / C** should be judged inside the **identical dashboard frame** so reviewers attribute differences to **allocation presentation**, not to **hierarchy changes**, **spacing experiments elsewhere**, or **accidental mid-stack redesign**.

Hold constant:

- **structure** (C3 order and layer roles),
- **hierarchy** (Portfolio Value and Stability Status remain primary; allocation stays subordinate),
- **everything outside the allocation block** (actions, activity, disclosure entry, global chrome),

and vary **only** how Allocation / Trust Detail **reads** (list vs restrained proportional cue vs hybrid).

The goal is to **isolate visual legibility impact**: **pattern effect**, not **hierarchy effect**. Without a fixed frame, improvements or failures become ambiguous—reviewers cannot separate **precision implication** or **performative drift** from unrelated layout noise.

---

## 5. Fixed frame assumptions

The micro-test assumes the **current C3 baseline** remains **locked** for all three fixtures.

The frame should preserve:

- **Portfolio Value** as the **primary** financial anchor.
- **Stability Status** in its **current** location and weight relative to the portfolio card.
- **Restrained actions** — no new actions, no rebalance/stabilise semantics, no symmetry experiments in this test.
- **Bounded activity** — same section role and naming as the baseline fixture; no feed expansion or IA drift.
- **Allocation / Trust Detail** in the **same subordinate layer** and position in the stack—not moved, not promoted to a competing hero.

**No other block** is reworked for this exercise. If something outside allocation changes between fixtures, the run is **not** a valid same-frame micro-test: it confounds **pattern effect** with **hierarchy effect** and invites false conclusions about **precision implication** vs honest informational bounds.

---

## 6. Comparison set

Exactly **three** allocation presentation treatments. All are **critique prompts only**—not specs, not approved components.

### 6.1 Pattern A — Current list pattern

- **Lower-bound familiarity control** and **current baseline** for calm-money reading.
- **Weakest at-a-glance distribution read** — split may require line-by-line scan before posture feels clear.

### 6.2 Pattern B — Calm proportional pattern

- **Restrained visual distribution cue** intended to improve **immediate split comprehension** without chart theater.
- **Strongest direct challenge** to passive, list-like reading — tests how much proportional signal buys grasp at acceptable governance cost.

### 6.3 Pattern C — Hybrid pattern

- **List clarity** plus **light visual weighting** — detail and structure reinforce each other.
- Intended to **balance grasp and calmness**; **likely strongest centerline candidate** if **restraint** holds and the block does not read busy or competitive.

---

## 7. What reviewers should judge

Apply consistently across **A / B / C** on the **same** frame (critique notes only):

- **Immediate grasp** — how fast the split reads as structure; distinguish from mere **visual weighting**.
- **Calmness** — low visual temperature; no loud or crypto-console energy.
- **Trust legibility** — informational posture and protection framing, not performance or ranking.
- **Subordinate hierarchy** — allocation stays clearly below Portfolio Value and Stability Status; watch for **hierarchy effect** smuggled in via accidental emphasis.
- **Retail-natural readability** — calm money, not engineering exposition.
- **Avoidance of performance theater** — no APY-first, yield, or outcomes framing.
- **Avoidance of accounting-truth implication** — no cue that bands are exact, live, or ledger-true; watch **precision implication** especially in **B**.
- **Fit with Hedgr’s protected-money identity** — bounded, honest, category-defining; guard against **performative drift** (looking “active” beyond what the system supports).

---

## 8. Expected comparative signal

**Working hypothesis only—not a conclusion or approval.**

- **Pattern A** remains the **calm familiarity control** and the check against **precision implication** and theater in **B** and **C**.
- **Pattern B** is the **strongest direct challenge** to passive, list-like reading—best for learning whether a proportional cue materially improves **immediate grasp**.
- **Pattern C** is the **likely strongest current centerline candidate** if reviewers can preserve **calmness** and **subordinate hierarchy** while gaining clearer distributional read.

If the frame drifts, this signal is **not valid**—the test has mixed **pattern effect** with other variables.

---

## 9. Explicitly out of scope

The following are **out of scope** for this micro-test:

- **Whole-screen redesign** — would destroy same-frame isolation; violates the purpose of the exercise.
- **Protocol-level disclosure** — would shift allocation toward engine narration; contradicts informational posture.
- **Richer risk-state visualization** — needs doctrine and thresholds; risks alarm theater; not a pattern-only test.
- **Motion-based allocation feedback** — confounds legibility with animation; pass resolution favors **static** clarity first.
- **APY or yield-performance emphasis** — contradicts liquidity-before-yield doctrine; poisons trust-legibility judgment.
- **Legal/trust sign-off on final visual treatment** — this doc defines critique protocol only; governance remains separate.

---

## 10. Suggested next outputs

Critique-oriented artifacts (not implementation sequencing):

1. **Paper or prototype same-frame comparison** executing this protocol: three fixtures, **only** allocation pattern varies.
2. **Short readout** on which pattern **best improves grasp** without **raising visual temperature** or implying **accounting truth**—discussion input only.
3. **Narrowed note** on **acceptable allocation visual-pattern families** (what “calm proportional” may include or exclude at pattern level).
4. **Label review** for allocation sublabels **only if** pattern testing exposes a genuine naming gap—not a default copy exercise.

---

## 11. Working conclusion

The role of this test is to **isolate** whether a change in **allocation presentation** improves **legibility** and **distributional read** **without** changing the **character** of the dashboard—calm, money-first, subordinate trust detail.

**Allocation pattern should be tested in isolation before broader visual language is allowed to expand.**
