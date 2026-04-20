# HEDGR RETAIL UI STATUS COPY MICRO TEST

Status: Paper exploration only  
Authority: Non-sequencing, non-implementation  
Scope: Same-frame micro-test for comparing Stability Status copy treatments on the current C3 retail dashboard baseline  
Last updated: 2026-04-14

---

## 1. Purpose

This document defines a **constrained same-frame micro-test** for the **Stability Status** layer on the calm-money retail dashboard baseline (C3).

The **base screen remains fixed**: layout, hierarchy, and all non-status blocks stay as-is. **Only the status-copy treatment changes** across variants—label alone, label plus one supporting line, or label plus a slightly stronger line—so reviewers isolate **copy effect** on meaning and trust, not layout drift or feature invention.

All example wording below is **critique-only test material**, not approved final UX copy, implementation authorization, or sequencing authority.

---

## 2. Authority boundary

This micro-test assumes and preserves current repo posture:

- Stability Engine retail presentation remains **read-only and informational**; status must not imply execution, accounting authority, or live policy as product truth.
- **Allocation** remains **informational, not accounting truth**; status and allocation stay distinct interpretive layers.
- No framing here authorizes a **richer visible engine**, deterministic runtime semantics, or threshold/trigger disclosure in the primary layer.
- **Stronger retail risk-state language** (including labels such as `At risk`) is **not** authorized by this test.
- **No wording in this test is approved final copy.** Examples exist to compare interpretation and tone under honest informational bounds—not to ship verbatim.
- **No outcome in this document is product approval.** Shipped work remains gated by `docs/ops/HEDGR_STATUS.md` (including §7 / §7a when explicitly sequenced) and `AGENTS.md` discipline.

---

## 3. Inputs

**Immediate anchors**

- `docs/ops/HEDGR_RETAIL_UI_STATUS_COPY_COMPARISON.md` — bounded A / B / C copy directions; comparative criteria; working signal framed as non-final critique.
- `docs/ops/HEDGR_RETAIL_UI_STATUS_MEANING_TEST_NOTE.md` — status-meaning test pass; supporting-line direction; evaluation criteria; “meaning without machinery” frame.

**Supporting context**

- `docs/ops/HEDGR_RETAIL_UI_MEANING_REFINEMENT_BRIEF.md` — §6.1 Stability Status meaning; §6.5 bounded status vocabulary; translate-before-use boundaries.
- `docs/ops/HEDGR_RETAIL_UI_PASS_RESOLUTION_NOTE.md` — accept / translate / defer; “Stability Status needs more meaning” and example supporting-line direction.
- `docs/ops/HEDGR_RETAIL_UI_PROTOTYPE_CRITIQUE_READOUT.md` — prototype reality; status language under critique.
- `docs/ops/HEDGR_RETAIL_UI_PAPER_REVIEW_READOUT.md` — static review; Hedgr truth and status discipline.
- `docs/ops/HEDGR_RETAIL_UI_CRITIQUE_SCORECARD.md` — repeatable doctrine-safe critique language (trust legibility, calmness, hierarchy).
- `docs/ops/HEDGR_STATUS.md` — sole implementation and sequencing authority for shipped surfaces; exploration docs remain subordinate.
- `AGENTS.md` — repo execution standard; engine-facing read order if any future work touches shipped trust surfaces.

---

## 4. Why a same-frame micro-test is needed

Status copy should be judged **inside one stable dashboard frame**. If structure or hierarchy shifts between variants, reviewers conflate **layout effect** with **copy effect**—and may mistake density, scan path, or block emphasis for “better meaning.”

This micro-test holds **structure and hierarchy fixed** and varies **only the Stability Status wording**. The goal is to **isolate interpretive impact**: does a small explanatory line improve legibility without sounding operational, advisory, or like hidden **system implication**?

---

## 5. Fixed frame assumptions

The micro-test assumes the **current C3 baseline** remains unchanged outside the status block.

The frame should preserve:

- **Portfolio Value** as the primary anchor
- **Stability Status** in its current location and weight
- **Restrained actions** — subordinate to state; no new action semantics in this test
- **Bounded activity** — narrow role; no surface expansion
- **Visible but secondary allocation / trust detail** — informational, not accounting truth

**No other block is reworked** in this test: not allocation weighting experiments, not activity naming, not action asymmetry—those are separate critique cycles. Here, **same frame, different status meaning treatments** only.

---

## 6. Comparison set

Exactly three status-copy treatments. All examples are **critique prompts only**, not approved wording.

### 6.1 Treatment A — Label only

**Example**

- `Balanced`

**Read**

- **Lower-bound calmness control** — minimal text, lowest density.
- **Minimal meaning support** — may still read as atmospheric relative to B and C.

### 6.2 Treatment B — Label + bounded supporting line

**Example**

- `Balanced`
- `Your funds are within the current protection range.`

**Read**

- **Likely strongest centerline candidate** for this comparison pass.
- **Intended to add bounded interpretability** without exposing machinery or thresholds.

### 6.3 Treatment C — Label + slightly stronger explanatory line

**Example direction**

- `Balanced`
- `Your funds remain within the current protection range and available structure.`

**Read**

- **Upper-bound meaning stress test** — more explanatory weight in one line.
- **Higher risk** of denser, more **system-authored** tone if not governed.

---

## 7. What reviewers should judge

- **calmness** — no louder or more urgent than the fixed baseline frame
- **immediate interpretability** — understood in one pass without secondary explanation
- **trustworthiness** — honest, non-promissory, aligned with read-only informational truth
- **non-theatrical tone** — no dashboard theater or fake precision
- **money-first fit** — status supports the portfolio anchor; it does not compete with it
- **avoidance of hidden-engine implication** — no suggestion of secret rules, guaranteed outcomes, or deterministic behavior
- **fit with Hedgr’s protected-money identity** — unmistakably Hedgr, not generic fintech wellness

---

## 8. Expected comparative signal

**Working hypothesis only** — not a conclusion, approval, or ship decision:

- **Treatment B** is likely the **strongest current centerline** for improving interpretability while preserving calm money.
- **Treatment A** remains a **useful calmness control** and lower bound.
- **Treatment C** remains a **useful upper-bound stress test** for how much meaning one line can carry.

Validate or revise this hypothesis with **same-frame** evidence (Paper or prototype), not by redesigning the screen.

---

## 9. Explicitly out of scope

The following are explicitly out of scope for this micro-test:

- **Final status-copy approval** — requires governance and honesty review; this artifact only structures critique.
- **Broader status vocabulary design** — deferred: implies a full retail lexicon beyond isolated wording comparison.
- **Threshold or trigger disclosure** — deferred: would imply deterministic rules not established for this layer.
- **Advisory or guidance layer design** — deferred: translate-before-use; blurs into “what to do” unless explicitly governed.
- **Action hierarchy changes** — out of scope: would mix **layout effect** with copy effect; separate pass.
- **Whole-screen redesign** — out of scope: violates same-frame discipline; only status copy varies here.
- **Legal/trust sign-off on copy** — out of scope: any ship candidate needs separate review.

---

## 10. Suggested next outputs

Critique-oriented artifacts (not implementation sequencing):

1. A **Paper or prototype same-frame comparison** of **A / B / C** on the C3 baseline—status block only varying.
2. A **short readout** on which treatment best **preserves calm money** while **improving meaning**, with scorecard-aligned rationale.
3. A **narrowed list of acceptable supporting-line patterns** (length bounds, honesty constraints, must-not-imply lines)—still pre-ship.
4. A **short list of phrases or semantics to avoid** in status copy (e.g. deterministic guarantees, operational commands, hidden-engine theater).

These support **review and iteration**, not a build ticket unless later named under `HEDGR_STATUS.md`.

---

## 11. Working conclusion

The role of this test is to **isolate** whether a **small amount of explanatory copy** improves Stability Status meaning **without** changing the calm-money character of the dashboard—by holding **copy effect** apart from **layout effect** and **system implication**.

**Status meaning should be tested in isolation before broader system language is allowed to expand.**
