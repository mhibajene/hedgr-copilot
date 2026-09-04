# Hedgr Stability Reasoning Independent Retest Instrument

**Status:** Fixed reviewer-facing instrument; submissions and Founder disposition pending<br>
**Ticket:** `SE-REASON-001-RETEST-001` (nested inside open `SE-REASON-001`)<br>
**Authority:** Internal **D-098** / `docs/ops/HEDGR_STATUS.md` **§230** and active **§7a** brief<br>
**Instrument version:** 1.0 — fixed on 3 September 2026 before reviewer exposure<br>
**Visibility:** Internal<br>
**Execution class:** Class A informational, synthetic, research-only, and non-executing

This instrument tests whether independent reviewers can apply the retained, non-canonical Stability Engine reasoning candidate consistently. It does not test product comprehension, model validity, suitability, safety, accounting truth, or financial performance. It cannot accept the candidate, close the parent ticket, or authorize translation or implementation.

`NO CROSS-LANE IMPACT`

---

## 1. Reviewer protocol

Complete this review using **only this fixed instrument**.

- Do not open or search for other repository files, prior reviews, expected answers, case identifiers, model-author conclusions, package dispositions, or other reviewer submissions.
- Do not use web sources, live data, participant data, personal financial data, calculators, scoring tools, or external assistance.
- Do not discuss a case or reconcile an answer with another reviewer before every submission is locked by the supervisor.
- Do not infer thresholds, numeric weights, scores, portfolio actions, recommendations, accounting treatment, or execution semantics.
- Treat every case as fictional and bounded to the facts stated here.
- Record your own answer even when uncertain. Preserve disagreement and abstain where the fixed rules require it.
- After submission, do not revise your answers unless the supervisor explicitly marks the original submission invalid for a procedural reason. A changed interpretation belongs in the convergence discussion, not in the locked response.

The post-activation semantic direction recorded outside D-098 is intentionally excluded from this instrument and must not be sought or used.

## 2. Candidate model supplied to every reviewer

### 2.1 Function vector

Assess these four functions in this order:

1. **F1 — Usable liquidity and exit readiness:** whether the currently realisable amount can be accessed within the declared horizon. Settlement or transfer access, redemption or convertibility, and underlying economic liquidity are distinct links in the exit chain. Loss relative to stated nominal value is assessed separately under F2.
2. **F2 — Nominal capital integrity:** whether a financial claim can reasonably be realised near its stated nominal value, considered separately from inflation and timing of access.
3. **F3 — Essential purchasing-power resilience:** whether accessible capital retains participant-relevant real coverage of essential costs. Recurring inflow and outflow coverage is assessed separately under F4. Headline inflation or FX movement alone does not establish a participant effect.
4. **F4 — Income and essential-cashflow resilience:** whether reliable inflows cover essential outflows and replenish rather than continually consume accessible buffers.

Currency is an interaction driver only where a verified mismatch or participant-relevant price transmission exists. Systemic or geopolitical stress is a cross-cutting evidence and uncertainty overlay, not a fifth function. Yield or return is not a function. The vector is not a score.

### 2.2 Function-level symbols

For each function, record exactly one symbol:

| Symbol | Meaning |
| --- | --- |
| `+` | materially improved |
| `−` | materially worsened |
| `=` | materially unchanged |
| `?` | not established from the available evidence |

Write vectors in this fixed order: `F1 / F2 / F3 / F4`.

### 2.3 Overall outcome vocabulary

Only after recording the vector and causal explanation, choose exactly one:

- `more stable`
- `less stable`
- `materially unchanged`
- `insufficient evidence for a single overall direction`

These are directional research labels. `More stable` does not mean safe, suitable, sufficient, protected, or guaranteed. `Less stable` does not imply what anyone should do.

### 2.4 Fixed decision rules

1. A verified material F1 or F2 impairment is sufficient for `less stable`, even if a non-critical function improves.
2. Otherwise, one or more material improvements, no worsening, and no unresolved unknown, stale, or conflicting observation capable of concealing a material worsening produces `more stable`.
3. One or more material worsenings, no improvement, and adequate evidence produces `less stable`.
4. All four functions and material evidence uncertainty unchanged produces `materially unchanged`.
5. Opposing non-dominant material changes, or an unknown, stale, or conflicting observation that could conceal a material change, produce `insufficient evidence for a single overall direction` when the preceding rules cannot be satisfied. Rule 1 remains the ordered exception where a material F1 or F2 impairment is independently verified by current and coherent evidence.
6. No weights, netting, score, forecast, optimiser, recommendation, or portfolio logic is permitted.

### 2.5 Evidence conditions

An observation may be `current and coherent`, `stale`, `conflicting`, or `missing / unknown`.

- Missing evidence is not evidence of stability.
- Known function directions remain visible when the overall direction is indeterminate.
- A broader regime label cannot fill a missing participant-transmission path.
- Missing, stale, or conflicting critical F1 or F2 evidence prevents a single overall direction unless separate current and coherent evidence independently verifies a material F1 or F2 impairment.

## 3. Scenario-wide controls

- Compare the stated `T0 → T1` change over the declared qualitative horizon.
- All unmentioned observations remain materially unchanged, current, and coherent unless uncertainty is the variable under test.
- Where a case describes a change as material, accept that declaration; this instrument defines no numeric threshold.
- Function-level causes must precede the overall label.
- Do not use any assumed participant profile, asset, provider, market, runtime posture, or target allocation.

## 4. Blinded scenarios

The opaque case codes and order do not correspond to the source identifiers. No expected vector, expected direction, author rationale, or prior disposition is included.

### BR-01

**Horizon:** Current income and essential-cost cycle.<br>
**Controlled `T0 → T1` change:** Income reliability improves while currency-linked real coverage of accessible capital worsens. Usable runway, nominal claim integrity, and all exit-chain links remain materially unchanged. The available evidence cannot establish that either change materially dominates the other.

### BR-02

**Horizon:** Near-term claim-realisation horizon.<br>
**Controlled `T0 → T1` change:** A previously challenged claim becomes credibly realisable near stated nominal value. Usable runway, all exit-chain links, essential purchasing-power coverage, and essential cashflow remain materially unchanged.

### BR-03

**Horizon:** Current systemic-stress observation interval.<br>
**Controlled `T0 → T1` change:** A systemic or geopolitical stress flag rises, but the exposure pathways and effects on all four functions are unknown.

### BR-04

**Horizon:** Current essential-cost and obligation cycle.<br>
**Controlled `T0 → T1` change:** An FX move occurs, but stored capital, recurring flows, and obligations are verified currency-matched, and participant-relevant essential costs do not change. All retained observations remain in the same material states.

### BR-05

**Horizon:** Income-shock horizon spanning the next obligation cycle.<br>
**Controlled `T0 → T1` change:** Disinflation materially eases pressure on the real essential-cost coverage of accessible capital. At the same time, a material income disruption pushes usable essential-needs runway below sufficiency. Nominal claim integrity and exit-chain evidence remain current, coherent, and materially unchanged.

### BR-06

**Horizon:** Required exit horizon for the next obligation.<br>
**Controlled `T0 → T1` change:** A critical access observation is stale. Settlement evidence appears normal, while credible redemption evidence conflicts. Nominal claim integrity, essential purchasing-power coverage, and essential cashflow remain materially unchanged on current, coherent evidence.

### BR-07

**Horizon:** Near-term claim-realisation horizon.<br>
**Controlled `T0 → T1` change:** A claim remains transferable within the horizon, and usable runway is held constant by other resources, but credible evidence shows a material haircut relative to stated nominal value. Essential purchasing-power coverage and essential cashflow remain materially unchanged.

### BR-08

**Horizon:** Required exit horizon during a systemic-stress interval.<br>
**Controlled `T0 → T1` change:** A systemic or geopolitical stress flag rises and is accompanied by a verified redemption delay beyond the required horizon. No nominal haircut or material change in essential purchasing-power coverage or essential cashflow is established.

### BR-09

**Horizon:** Current essential-cost and obligation cycle.<br>
**Controlled `T0 → T1` change:** An FX move occurs. Recurring flows are verified currency-matched, but stored-capital currency composition and participant-relevant price pass-through are unknown. Usable liquidity and exit readiness, nominal claim integrity, and essential cashflow are established and materially unchanged.

### BR-10

**Horizon:** Current systemic-stress observation interval.<br>
**Controlled `T0 → T1` change:** A systemic or geopolitical stress flag rises, but reliable evidence shows no relevant transmission and all four functions remain materially unchanged. This does not establish that the broader environment is risk-free.

### BR-11

**Horizon:** Current essential-cost and obligation cycle.<br>
**Controlled `T0 → T1` change:** Accessible stored capital is exposed to an adverse currency mismatch that materially reduces its real essential-cost coverage. Usable runway remains in the same qualitative band; recurring flows are currency-matched and essential cashflow remains materially unchanged. Nominal claim integrity and all exit-chain links remain materially unchanged.

## 5. Required response for every case

Use this exact field order for each `BR-01` through `BR-11`:

1. **Function vector:** `F1 / F2 / F3 / F4` using `+`, `−`, `=`, or `?`.
2. **Overall outcome:** one fixed label from §2.3.
3. **Causal pathway:** identify the observation, transmission path, and affected function(s) without introducing an unstated fact.
4. **Materiality reasoning:** explain why the stated change is or is not capable of changing the function-level or overall interpretation within the stated horizon.
5. **Missing variables:** write `none required for this bounded judgement` or name only variables whose absence prevents the judgement; do not invent their values.
6. **Implicit weighting check:** write `none` or disclose any trade-off, dominance assumption, or compensating judgement you found yourself using. Do not convert it into a numeric weight.
7. **Confidence and unresolved uncertainty:** use `high`, `medium`, or `low` as a qualitative self-report, followed by the unresolved issue. This is not a score and will not be aggregated.

## 6. Cross-case questions

After all eleven cases, answer these questions independently:

1. Could you distinguish F1 from F2 without adding a new rule? Identify any case where the boundary remained unclear.
2. Did the qualitative materiality declarations support consistent application, or did you need an unstated threshold?
3. Could you apply critical-function dominance without netting or hidden weights?
4. Was abstention usable and bounded in mixed, unknown, stale, and conflicting cases? Identify any over- or under-abstention risk.
5. Could you treat systemic stress as an overlay that changes direction only through a verified function pathway?
6. Did stale or conflicting critical evidence remain visible without defaulting to stability or deterioration?
7. Which part of the candidate, if any, repeatedly failed to add an independently interpretable distinction?
8. What remains uncertain after this review? Do not recommend product, runtime, UX, Copilot, allocation, accounting, or execution changes.

## 7. Reviewer attestation and lock

End the submission with:

- **Reviewer code:** assigned by the supervisor.
- **Independent of candidate author:** `yes` or `no`.
- **No contact with other reviewers before lock:** `yes` or `no`.
- **Used only this fixed instrument:** `yes` or `no`.
- **Expected answers or prior dispositions seen:** `no`, or describe the exposure.
- **D-099 semantic direction seen or used:** `no`, or describe the exposure.
- **Submission complete and locked:** `yes` or `no`.

Any `no` answer that breaks independence or blinding must be surfaced to the Founder and may invalidate the retest under the D-098 stop conditions.

---

This instrument is a research control, not an answer key or an architecture gate. Completion does not accept the model, close `SE-REASON-001`, or authorize translation.
