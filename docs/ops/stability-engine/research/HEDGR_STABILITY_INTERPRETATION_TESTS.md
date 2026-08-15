# Hedgr Stability Interpretation Tests

**Status:** Lane E research output — proposed for Founder / HedgrOps disposition; non-authoritative<br>
**Ticket:** `SE-REASON-001` (Lane E)<br>
**Decision:** Internal **D-076** / Controlled Parallelism v21<br>
**Repo authority:** `docs/ops/HEDGR_STATUS.md` **§6f.21**, **§7**, **§7a**, **§204**<br>
**Governing frame:** [`HEDGR_STABILITY_ENGINE_REASONING_RESEARCH_BRIEF.md`](./HEDGR_STABILITY_ENGINE_REASONING_RESEARCH_BRIEF.md)<br>
**Companion models:** [`HEDGR_STABILITY_FUNCTION_MODEL.md`](./HEDGR_STABILITY_FUNCTION_MODEL.md) · [`HEDGR_STABILITY_STATE_MODEL.md`](./HEDGR_STABILITY_STATE_MODEL.md)<br>
**Date:** 14 August 2026<br>
**Visibility:** Internal<br>
**Execution class:** Class A informational research only; no implementation or financial-execution authority

These are fictional, bounded reasoning scenarios. They do not use participant data, live market data, provider evidence, or the current synthetic journey. They do not prescribe a portfolio, asset, allocation, recommendation, or action.

## 1. Research oracle

Compare an explicit baseline `T0` with `T1` over a declared scenario horizon. Record the function vector first:

| Symbol | Function direction |
| --- | --- |
| `+` | materially improved |
| `−` | materially worsened |
| `=` | materially unchanged |
| `?` | not established from available evidence |

Vector order is always:

`F1 usable liquidity / exit · F2 nominal integrity · F3 essential purchasing power · F4 income / cashflow`

Only after the vector and causal explanation are recorded may the research oracle emit one of:

- `more stable`
- `less stable`
- `materially unchanged`
- `insufficient evidence for a single overall direction`

### Provisional decision rules

1. Verified material F1 or F2 impairment is sufficient for `less stable`, even if a non-critical function improves.
2. Otherwise, one or more material improvements, no worsening, and no unresolved unknown, stale, or conflicting observation capable of concealing a material worsening produces `more stable`.
3. One or more material worsenings, no improvement, and adequate evidence produces `less stable`.
4. All functions and material evidence uncertainty unchanged produces `materially unchanged`.
5. Opposing non-dominant material changes, or an unknown, stale, or conflicting observation that could conceal a material change, produce `insufficient evidence for a single overall direction` when the preceding rules cannot be satisfied. Rule 1 remains the ordered exception where material F1 / F2 impairment is independently verified by current and coherent evidence.
6. No weights, netting, score, forecast, optimiser, recommendation, or portfolio logic is permitted.

`More stable` is directional, not a claim that a position is safe, suitable, sufficient, guaranteed, or absolutely stable. `Less stable` explains deterioration; it does not imply what anyone should do.

## 2. Test protocol

- All scenarios are synthetic.
- All unmentioned observations remain unchanged, current, and coherent unless uncertainty is the variable under test.
- Each case declares a qualitative H0. These horizons are research controls, not approved durations or production thresholds.
- Materiality is declared by the scenario; this pass sets no numeric threshold.
- Each case isolates one variable where possible and includes paired counterfactuals for headline macro signals.
- Function-level reasons precede any overall label.
- A regime or currency signal requires an observed participant-relevant transmission path.
- The oracle is independent of current runtime posture, target percentages, notices, or `EngineState`.
- A passed scenario supports research coherence only; it does not validate Hedgr efficacy or authorize product translation.

The evidence registry and source-transfer limitations are recorded in the companion Function Model **§7**.

## 3. Bounded scenarios

| ID | H0 research horizon | Controlled `T0 → T1` change | Expected vector | Expected interpretation | Why | Variable / rule disposition |
| --- | --- | --- | --- | --- | --- | --- |
| **IT-01** | Current observation interval, unchanged at T0 and T1 | Only the observation timestamp changes. Every substantive observation is identical. | `= / = / = / =` | **Materially unchanged** | Time passing is not itself a stability change. | **REMOVE** timestamp-only change as a directional input. |
| **IT-02** | Next essential-obligation horizon | Usable essential-needs runway moves from sufficient to insufficient; all else is unchanged. | `− / = / = / =` | **Less stable** | The ability to meet obligations within H0 materially weakened. | **RETAIN** S1; **RETEST** qualitative band definitions. |
| **IT-03** | Next essential-obligation horizon | Usable runway moves from thin to sufficient; all exit links function and no other function worsens. | `+ / = / = / =` | **More stable** | A real access buffer improved without a visible trade-off. | **RETAIN** as the symmetric F1 improvement control. |
| **IT-04A** | Current essential-cashflow cycle | Reliable income becomes disrupted long enough to make essential cashflow materially negative. S1, accessible-capital purchasing power, and S5 / S6 remain unchanged within H0. | `= / = / = / −` | **Less stable** | Stock can remain unchanged while the flow that replenishes it weakens. | **RETAIN** F4 / S2 as distinct from current runway. |
| **IT-04B** | Current essential-cashflow cycle | Essential cashflow recovers from materially negative to reliably positive. S1 and F1–F3 remain unchanged. | `= / = / = / +` | **More stable** | Flow resilience improved without claiming that current access or capital safety changed. | **RETAIN** as isolated F4 positive control. |
| **IT-05A** | Near-term claim-realisation horizon | A claim remains transferable within H0, and usable runway is held constant by other resources, but credible evidence shows a material haircut relative to stated nominal value. | `= / − / = / =` | **Less stable** | Access to an observed realisable amount does not establish nominal integrity. | **RETEST** F2 / S5 independence from F1. |
| **IT-05B** | Near-term claim-realisation horizon | A previously challenged claim becomes credibly realisable near stated nominal value. S1, S6, F3, and F4 remain unchanged. | `= / + / = / =` | **More stable** | Nominal integrity improved without asserting a change in access or real purchasing power. | **RETAIN** as isolated F2 positive control; **RETEST** F1 / F2 boundary. |
| **IT-06A** | Current essential-cost cycle | Participant-relevant essential costs materially reduce the real coverage of accessible capital. S1 remains in the same qualitative band, essential cashflow remains in the same material state, and S5 / S6 are unchanged. | `= / = / − / =` | **Less stable** | Real capital-stock coverage fell while flow resilience was controlled away. | **RETAIN** S4 when transmission is established. |
| **IT-06B** | Same essential-cost cycle as IT-06A | The same headline inflation occurs, but no participant-relevant essential-cost transmission is established; S1–S6 remain in the same material states. | `= / = / = / =` | **Materially unchanged** | A macro average alone does not establish participant deterioration. | **REMOVE** headline inflation as a sufficient input. |
| **IT-07A** | Current essential-cost / obligation cycle | Accessible stored capital is exposed to an adverse currency mismatch that reduces its real essential-cost coverage. S1 remains in the same qualitative band; recurring flows are currency-matched and S2 remains unchanged. | `= / = / − / =` | **Less stable** | A verified stock mismatch transmits FX pressure into F3 while F4 is controlled away. | **RETEST** `mismatch × observed FX pressure`. |
| **IT-07B** | Same cycle as IT-07A | The same FX move occurs, but stored capital, recurring flows, and obligations are verified currency-matched and relevant essential costs do not change. | `= / = / = / =` | **Materially unchanged** | FX direction without exposure does not change a stability function. | **REMOVE** raw FX movement as a direction setter. |
| **IT-07C** | Same cycle as IT-07A | The same FX move occurs; recurring flows are verified matched, but stored-capital currency composition and relevant price pass-through are unknown. F1, F2, and F4 remain established and unchanged. | `= / = / ? / =` | **Insufficient evidence for a single overall direction** | The model must abstain rather than infer mismatch. | **RETAIN** explicit unknown; **RETEST** minimum transmission evidence. |
| **IT-08A** | Required exit horizon for the next obligation | Digital settlement remains fast, but a redemption delay or insufficient underlying market depth prevents access to the currently realisable amount within H0. No nominal haircut is established. | `− / = / = / =` | **Less stable** | Timing / access can fail while nominal integrity remains intact. | **RETAIN** S6 dimensions provisionally; pair with IT-05A's value-loss case. |
| **IT-08B** | Same exit horizon as IT-08A | Transfer speed improves, but ability to redeem the currently realisable amount and meet obligations within H0 does not materially change. | `= / = / = / =` | **Materially unchanged** | Digital convenience is not economic stability by itself. | **REMOVE** transferability as a standalone proxy. |
| **IT-09** | Current essential-cost cycle | Nominal accessible capital rises, remains intact and usable, but participant-relevant essential costs rise by materially more. S1 remains in the same band and S2 remains in the same material state. | `= / = / − / =` | **Less stable** | A nominal gain does not establish improved real capital-stock coverage. | **RETAIN** nominal / real distinction; no yield inference. |
| **IT-10** | Income-shock horizon spanning the next obligation cycle | Disinflation eases F3 pressure, but a material income disruption also pushes S1 below sufficiency. | `− / = / + / −` | **Less stable** | Contradictory signals remain visible, but critical F1 impairment controls the bounded direction. | **RETEST** critical-function dominance with independent reviewers. |
| **IT-11** | Current income and essential-cost cycle | Essential-cost pressure worsens while income reliability and essential-cashflow coverage deteriorate. S1 remains in the same qualitative band and S5 / S6 remain unchanged within H0. | `= / = / − / −` | **Less stable** | Inflationary slowdown creates reinforcing F3 / F4 deterioration without a separate predictive regime class. | **RETAIN** R3 compound-stress explanation. |
| **IT-12** | Current income and essential-cost cycle | Income reliability improves while currency-linked real coverage of accessible capital worsens. S1, S5, and S6 remain unchanged; evidence cannot establish material dominance. | `= / = / − / +` | **Insufficient evidence for a single overall direction** | The vector is mixed; weights or netting would be invented. | **RETAIN** abstention; **RETEST** whether an overall label adds value here. |
| **IT-13A** | Current systemic-stress observation interval | A systemic / geopolitical stress flag rises, but exposure pathways and effects on F1–F4 are unknown. | `? / ? / ? / ?` | **Insufficient evidence for a single overall direction** | A regime headline is an uncertainty overlay, not a participant condition. | **REVISE** systemic protection into RX; **REMOVE** headline as a direction setter. |
| **IT-13B** | Same stress interval as IT-13A | The same stress flag rises, but reliable evidence shows no relevant transmission and F1–F4 remain unchanged. | `= / = / = / =` | **Materially unchanged** | Confirmed absence of transmission should not create false deterioration. This is not a claim that the environment is risk-free. | **RETAIN** as RX negative control. |
| **IT-13C** | Required exit horizon during the stress interval | The same stress flag is accompanied by verified redemption delay beyond H0. No nominal haircut or F3 / F4 change is established. | `− / = / = / =` | **Less stable** | The overlay changes direction only through a verified participant-relevant F1 pathway. | **RETAIN** transmission requirement; **RETEST** RX evidence sufficiency. |
| **IT-14** | Recovery comparison interval | After an adverse price / FX baseline, real coverage of accessible capital clearly improves. S1, S2, S5, and S6 remain in the same material states. | `= / = / + / =` | **More stable** | F3 improved from the baseline even if the absolute position remains vulnerable. | **RETAIN** direction-versus-level and isolated F3 positive control. |
| **IT-15** | Required exit horizon for the next obligation | A critical access observation is stale; settlement evidence appears normal, while credible redemption evidence conflicts. | `? / = / = / =` | **Insufficient evidence for a single overall direction** | Freshness and source reconciliation are prerequisites for a confident critical-function judgement. | **RETAIN** abstention; **RETEST** freshness and conflict criteria. |

## 4. Scenario coverage against the governing brief

| Governing-brief scenario | Covered by | What the tests isolate |
| --- | --- | --- |
| Income disruption | IT-04A–B, IT-10 | Flow deterioration, recovery, and eventual runway impairment |
| FX deterioration | IT-07A–C | Mismatch, no-transmission control, and unknown transmission |
| Inflation shock | IT-06A–B, IT-09 | Participant-relative real pressure versus headline / nominal measures |
| Liquidity stress | IT-02, IT-08A–B, IT-15 | Runway, exit-chain dimensions, and evidence uncertainty |
| Disinflationary slowdown | IT-10 | F3 improvement cannot hide F1 / F4 deterioration |
| Inflationary slowdown | IT-11 | Reinforcing F3 / F4 deterioration |
| Systemic or geopolitical stress | IT-13A–C | Unknown, absent, and verified participant-relevant transmission |
| Recovery / directional improvement | IT-03, IT-04B, IT-05B, IT-14 | Isolated improvement in each retained function without an absolute safety claim |
| Mixed evidence | IT-12, IT-15 | Abstention rather than invented weights or certainty |

## 5. Cross-case invariants

The research candidate passes only if all cases preserve these invariants:

1. Every judgement has an explicit comparator and horizon.
2. Function-level causes precede any overall direction.
3. Materiality means a change capable of altering a stability function, not ordinary data noise.
4. Critical access or claim-integrity deterioration cannot be offset by an unrelated gain or favourable headline.
5. Currency and regime signals require a participant-relevant transmission pathway.
6. Systemic stress remains an overlay, not a fifth score.
7. Known uncertainty remains visible; absence of evidence is not evidence of stability.
8. `Materially unchanged` means the evidence-supported direction did not change, not that risk is absent.
9. No test uses allocation percentages, assets, providers, target weights, current mock targets, or a runtime posture as participant-stability evidence.
10. No output implies ledger truth, funds moved, suitability, recommendation, asset eligibility, portfolio construction, or execution authority.

## 6. Consistency and falsification plan

The next research-only retest should give the same written scenarios, without expected outcomes, to independent reviewers and compare:

- function-vector agreement;
- overall-direction agreement;
- whether explanations identify the same causal observation;
- where reviewers request a variable not in the minimum set;
- where a variable is present but does not change interpretation; and
- where the overall label is less useful than the unresolved vector.

This artifact sets no pass percentage. A future retest plan may propose an inter-rater threshold only under separate Founder disposition if it would become an acceptance criterion or architecture gate.

The candidate is weakened if reviewers repeatedly:

- cannot distinguish F1 from F2;
- cannot apply S3 without detailed participant profiling;
- disagree on critical-function dominance;
- need weights to resolve common cases;
- infer direction from raw macro headlines despite the controls; or
- find that fewer observations explain all cases equally well.

## 7. Founder-reviewable disposition

**Overall recommendation: `RETEST`.**

| Disposition | Research recommendation |
| --- | --- |
| **Retain** | Four-function vector; temporal comparison; multidimensional exit reasoning; participant-relative inflation / FX transmission; explicit unknowns; function-first explanation. |
| **Revise** | Any rule that forces a mixed non-dominant case into one direction; systemic stress into RX overlay; currency into mismatch / pass-through interaction. |
| **Remove** | Timestamp-only change, raw inflation / FX / systemic headlines, transferability, target percentages, and runtime posture labels as standalone evidence. |
| **Retest** | F1 / F2 distinction; critical-function dominance; S1 bands; qualitative materiality; evidence freshness / conflict handling; minimum transmission evidence; independent-reviewer consistency. |
| **Escalate** | **Not recommended yet.** Runtime fields, thresholds, live inputs, participant-data collection, product copy, recommendation logic, portfolio construction, or engine implementation require separate Founder authority. |

Artifact delivery does not accept the oracle, close `SE-REASON-001`, change the product thesis, or authorize architecture work.

`NO CROSS-LANE IMPACT` — Lane V, Lane N, the synthetic journey, participant instrument, frozen narrative sources, shipped engine state, accepted ADR meaning, and financial-execution posture remain unchanged.
