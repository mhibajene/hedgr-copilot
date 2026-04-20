# HEDGR RETAIL UI STATUS VOCABULARY DRAFT

Status: Paper exploration only  
Authority: Non-sequencing, non-implementation  
Scope: First-pass bounded retail-facing vocabulary draft for Stability Status on the current C3 retail dashboard baseline  
Last updated: 2026-04-14

---

## 1. Purpose

This document defines a **first-pass bounded vocabulary draft** for the **Stability Status** layer on the calm-money **C3** retail dashboard baseline.

The dashboard is already in the right **emotional lane**: calm, money-first, and structurally promising. The goal is **not** richer system language or a more active-sounding surface, but a **calmer and more interpretable** retail vocabulary—enough consequence that status reads as trust-relevant, not decorative.

**Nothing in this document is approved final UX copy**, implementation authorization, or product approval. This remains a governance and critique artifact for continuing exploration within read-only, informational posture.

---

## 2. Authority boundary

This vocabulary draft reinforces the same constraints as the status-copy exploration stack and `docs/ops/HEDGR_STATUS.md`:

- **Read-only and informational** posture remains: status must not imply execution, accounting authority, or live policy as product truth.
- **Allocation** remains **informational, not accounting truth**; status and allocation stay distinct interpretive layers.
- **No richer visible engine**, full state-machine language in the primary layer, or **deterministic runtime semantics** are authorized by this draft.
- **No stronger retail risk-state language** (including labels such as `At risk`) is authorized here.
- **No wording in this document is approved final copy.** Candidate labels and lines are critique prompts for bounded exploration—not verbatim shipping language.
- **No outcome in this document is product approval** or sequencing authority. Shipped work remains gated by `docs/ops/HEDGR_STATUS.md` (including §7 / §7a when explicitly sequenced) and `AGENTS.md` discipline.

Status should **clarify posture**, not narrate the engine. This draft does not widen information architecture or add surfaces.

---

## 3. Inputs

**Immediate anchors** (read first for alignment):

- `docs/ops/HEDGR_RETAIL_UI_STATUS_LANGUAGE_GUARDRAILS.md` — interpretive vs operational bounds; acceptable pattern types; out-of-bounds language; core principles.
- `docs/ops/HEDGR_RETAIL_UI_STATUS_COPY_MICRO_TEST_READOUT.md` — same-frame A / B / C signal; Treatment B as working centerline; unresolved semantics.
- `docs/ops/HEDGR_RETAIL_UI_MEANING_REFINEMENT_BRIEF.md` — §6.1 Stability Status meaning; §6.5 bounded status vocabulary; translate-before-use themes.

**Supporting context:**

- `docs/ops/HEDGR_RETAIL_UI_STATUS_COPY_MICRO_TEST.md` — micro-test definition; same-frame discipline; explicit out-of-scope list.
- `docs/ops/HEDGR_RETAIL_UI_STATUS_COPY_COMPARISON.md` — bounded copy directions; comparative criteria; separation of interpretation, engine exposure, and advisory.
- `docs/ops/HEDGR_RETAIL_UI_STATUS_MEANING_TEST_NOTE.md` — “meaning without machinery” frame; supporting-line test; evaluation criteria.
- `docs/ops/HEDGR_RETAIL_UI_PASS_RESOLUTION_NOTE.md` — accept / translate / defer; bounded supporting-line direction; deferred state machine and risk labels.
- `docs/ops/HEDGR_RETAIL_UI_PROTOTYPE_CRITIQUE_READOUT.md` — prototype reality; status language under ongoing scrutiny.
- `docs/ops/HEDGR_RETAIL_UI_PAPER_REVIEW_READOUT.md` — static review; Hedgr truth and status discipline.
- `docs/ops/HEDGR_STATUS.md` — sole implementation and sequencing authority for shipped surfaces; read-only and informational constraints.
- `AGENTS.md` — repo execution standard; engine-facing read order when any work touches shipped trust surfaces.

---

## 4. Why a vocabulary draft is needed

The status-copy work (comparison, meaning test note, same-frame micro-test, guardrails) has produced **enough signal** to move from isolated copy tests toward a **bounded vocabulary draft**: a small set of **candidate labels** paired with **draft one-line meanings**, each with explicit **may imply** and **must not imply** boundaries.

The purpose is to:

- define **candidate labels** acceptable to keep exploring under calm-money, read-only posture;
- define **one-line meaning directions** (critique-only) so labels do not read as pure atmosphere;
- state **what each may help communicate** when governed;
- state **what each must not imply** relative to honesty, disclosure, and non-advisory discipline.

This remains **governance and critique material**, not a productized language set, copy deck, or shipping spec.

---

## 5. Vocabulary design principles

### 5.1 Calm

Labels should feel emotionally steady and non-theatrical.

### 5.2 Interpretable

Labels should be understandable without prior crypto or systems knowledge.

### 5.3 Bounded

Labels and meanings must stay short and avoid system exposition.

### 5.4 Honest

Labels must not overclaim, imply guarantees, or imply hidden thresholds.

### 5.5 Money-first compatible

Labels must support the calm-money posture rather than compete with the portfolio anchor.

---

## 6. Candidate status labels

Four candidates only—bounded exploration within the guardrails, not an exhaustive lexicon.

### 6.1 Balanced

Likely **current baseline label** in exploration frames. Calm and legible. May need a **supporting line** to avoid feeling too atmospheric or decorative without bounded consequence.

### 6.2 Within expected range

More explicit but slightly more formal. Useful as a **bounded interpretive alternative** when the goal is plain bounded variance without drama. Risk of sounding **clinical** if not paired with calm supporting copy.

### 6.3 Protective

Strong **Hedgr fit** when posture is about emphasis on safety. Useful **only when framed carefully**. Requires caution to avoid **overclaim**, insurance-like reading, or **guarantee-adjacent** interpretation.

### 6.4 Conservative

Calm and broadly understandable. Useful as a **posture term**. Risk of reading as an **investment-style setting** or user-controlled mode if not carefully framed as interpretive status, not a selectable strategy label.

---

## 7. Candidate one-line meanings

Draft **critique-only** directions—**not** approved copy. Each line is a prompt for Paper or prototype micro-tests, honesty review, and vocabulary governance.

### 7.1 Balanced

Possible line:

- `Your funds are within the current protection range.`

### 7.2 Within expected range

Possible line:

- `Your funds remain within the current expected protection posture.`

### 7.3 Protective

Possible line:

- `Your funds are currently positioned with greater emphasis on protection.`

### 7.4 Conservative

Possible line:

- `Your funds are currently positioned with lower exposure and steadier protection.`

All lines above are **critique prompts only**. They must be judged against **protection range** honesty (see guardrails §7.1), length, and non-advisory boundaries before any product use is considered.

---

## 8. What each label may imply

Bounded, positive **interpretive** signals—still subject to governance, not promises.

- **Balanced** may communicate steadiness and normalcy within the current informational framing.
- **Within expected range** may communicate bounded variance without alarm or theatrical precision.
- **Protective** may communicate emphasis on safety relative to other postures, if language stays non-promissory and posture-clarifying.
- **Conservative** may communicate restraint and lower exposure as interpretive posture, if it does not read as a user-selected investment mode.

---

## 9. What each label must not imply

Explicit **non-implications** for the current Stability Status layer under read-only posture.

- **Balanced** must not imply precision, guarantees, mechanical equilibrium, or math the user can rely on literally as accounting or policy truth.
- **Within expected range** must not imply disclosed thresholds, governed statistical boundaries, or cutoffs unless those are actually surfaced and supportable for retail UI here—no fake precision or hidden rules.
- **Protective** must not imply guaranteed protection, insurance-like safety, hard downside shielding, or outcome certainty.
- **Conservative** must not imply user-selected mode, portfolio control, discretionary investment-advisor semantics, or a labeled “strategy setting” unless separately governed and true for the product.

Across all four: no **advisory or directive** subtext, no **deterministic engine** narration, no **stronger retail risk-state escalation**, no **threshold/trigger disclosure** smuggled through wording.

---

## 10. Working comparative read

Likely current signal—**non-final**, not approval.

- **Balanced** is likely the **strongest current centerline** for calm and familiarity; it pairs naturally with a bounded supporting line (per micro-test readout Treatment B pattern).
- **Within expected range** is useful as a **more explicit** alternative but may feel **slightly clinical**; worth critique against retail-natural tone.
- **Protective** is **promising for Hedgr distinctiveness** but **governance-sensitive** (guarantee-adjacent readings).
- **Conservative** is **potentially useful** as posture language but needs caution so it does not read as an **investment-style** or **settings** label.

---

## 11. Explicitly out of scope

The following remain **out of scope** for this draft:

- **Final status vocabulary approval** — requires governance, honesty bounds, and alignment with doctrine; this doc does not freeze labels or glosses for production.
- **Richer state-machine design** — would imply breadth and deterministic coverage beyond a bounded interpretive layer; deferred.
- **Stronger retail risk-state escalation** — e.g. `At risk` and similar; deferred until thresholds, communications doctrine, and trust/legal clarity exist.
- **Threshold or trigger disclosure** — would suggest operational rules not established for this primary layer; deferred.
- **Advisory guidance under status** — “what to do” or obligation framing; translate-before-use only; not accepted here.
- **Legal/trust sign-off on wording** — any ship candidate needs separate review; this artifact is pre-decision.

---

## 12. Suggested next uses

Critique-oriented next steps—not implementation sequencing:

1. **Screen** future status-copy variants against this bounded set and the language guardrails before debate drifts toward machinery or advice.
2. **Narrow** acceptable **label + supporting-line** pairings under explicit must-not-imply lists and honesty bounds.
3. **Inform** Paper or prototype **same-frame** micro-tests (status block only varying) on the C3 baseline.
4. **Feed** a later **bounded retail-facing status model** note—still subordinate to `HEDGR_STATUS.md` §7 / §7a for any shipped work.

---

## 13. Working conclusion

The Stability Status vocabulary should become **more interpretable** without becoming **more dramatic** or **more machine-authored**. The right refinement deepens calm trust, not dashboard theater.

**The right status vocabulary should make posture easier to understand, not make the system sound more active.**
