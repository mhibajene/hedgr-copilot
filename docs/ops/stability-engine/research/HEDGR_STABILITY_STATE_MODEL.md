# Hedgr Stability State Model

**Status:** Lane E research output — proposed for Founder / HedgrOps disposition; non-authoritative<br>
**Ticket:** `SE-REASON-001` (Lane E)<br>
**Decision:** Internal **D-076** / Controlled Parallelism v21<br>
**Repo authority:** `docs/ops/HEDGR_STATUS.md` **§6f.21**, **§7**, **§7a**, **§204**<br>
**Governing frame:** [`HEDGR_STABILITY_ENGINE_REASONING_RESEARCH_BRIEF.md`](./HEDGR_STABILITY_ENGINE_REASONING_RESEARCH_BRIEF.md)<br>
**Companion function model:** [`HEDGR_STABILITY_FUNCTION_MODEL.md`](./HEDGR_STABILITY_FUNCTION_MODEL.md)<br>
**Date:** 14 August 2026<br>
**Visibility:** Internal<br>
**Execution class:** Class A informational research only; no implementation or financial-execution authority

This document proposes a minimum conceptual observation set for synthetic reasoning tests. It is not a data schema, collection instrument, participant profile, macro model, runtime contract, or permission to collect personal or sensitive financial data.

## 1. Research determination

**Proposed package disposition: `RETEST`.**

The smallest currently coherent state model contains:

- one explicit comparator and horizon;
- six observation groups;
- `unknown`, stale, and conflicting evidence states inside each observation;
- four participant-relevant explanatory regimes built from observed pressures; and
- one access / integrity / systemic-stress overlay.

The state model does not forecast a regime. It tests whether an observed change transmits into one or more functions in the companion Function Model.

## 2. Minimum conceptual state

| ID | Observation | Minimal qualitative form | Function(s) informed |
| --- | --- | --- | --- |
| **H0** | Comparator and horizon | Explicit `T0 → T1`; scenario-defined obligation / comparison horizon | All |
| **S1** | Usable essential-needs runway | `sufficient / thin / insufficient / unknown` for H0 | F1 |
| **S2** | Essential-cashflow direction | `improving / stable / deteriorating / disrupted / unknown` | F4; trajectory into F1 |
| **S3** | Currency-mismatch transmission | `none / adverse / protective / mixed / unknown` | F3; sometimes F4 |
| **S4** | Participant-relevant essential-cost pressure | `easing / stable / rising / shock / unknown` | F3; any cashflow effect must separately change S2 before F4 moves |
| **S5** | Nominal claim-integrity state | `intact / challenged / impaired / unknown` | F2 |
| **S6** | Exit-chain state | settlement/access; redemption/convertibility; underlying economic liquidity, each `functioning / degraded / unavailable / unknown` | F1 only; nominal haircut remains S5 / F2 |

The labels are research categories, not approved thresholds. Every scenario must declare materiality qualitatively. No production duration, percentage, monetary amount, score, or confidence weight is set here.

## 3. Observation evidence and disposition

### H0 — Comparator and horizon

| Required field | Research position |
| --- | --- |
| **What Hedgr believes** | Stability is directional and time-dependent. The same position may be resilient for an immediate obligation and fragile over a longer income disruption. |
| **Why the distinction matters** | Without a declared `T0`, `T1`, and horizon, ordinary data refreshes can be mistaken for change and short-term access can be conflated with longer-term resilience. |
| **Evidence supporting it** | IMF balance-sheet analysis distinguishes shorter-horizon liquidity from structural impairment. OECD and World Bank resilience measures use explicit time windows for expense coverage or emergency funds. |
| **What interpretation changes** | H0 changes which obligations and resources are relevant; it does not create direction by itself. |
| **What would falsify or weaken it** | If all plausible horizons repeatedly produce the same function vector, the model could collapse to one governed horizon. Selecting that horizon would be later work. |
| **Proposed disposition** | **RETAIN** as a methodological control. |

### S1 — Usable essential-needs runway

| Required field | Research position |
| --- | --- |
| **What Hedgr believes** | A participant is more resilient when essential obligations can be met from resources actually usable within H0, without assuming new borrowing or forced realisation of inaccessible wealth. |
| **Why the distinction matters** | Total balance or net worth can overstate immediate resilience. Accessibility and timing determine whether a buffer can absorb a shock. |
| **Evidence supporting it** | Charter Article II prioritises access. OECD asks how long living expenses could be covered after loss of main income; World Bank Global Findex tests ability to obtain emergency funds within a defined short horizon. |
| **What interpretation changes** | A material move from sufficient to insufficient worsens F1; the reverse can improve F1 when the exit chain remains functioning. |
| **What would falsify or weaken it** | If S1 requires exact sensitive amounts rather than bounded synthetic states, stop this path. If S1 adds nothing beyond S2 and S6, revise or merge it. |
| **Proposed disposition** | **RETAIN** conceptually; **RETEST** band legibility and non-sensitive measurement. |

### S2 — Essential-cashflow direction

| Required field | Research position |
| --- | --- |
| **What Hedgr believes** | Reliable inflows relative to essential outflows determine whether a buffer is replenished, preserved, or consumed. |
| **Why the distinction matters** | Current stock and trajectory differ. Identical runway can support different interpretations when one participant has a persistent deficit and another has stable coverage. |
| **Evidence supporting it** | The governing brief authorizes income-disruption scenarios. Federal Reserve evidence links income / expense timing mismatch and variable income to financial difficulty. Hedgr's MVP user context includes volatile income. |
| **What interpretation changes** | Material deterioration or disruption worsens F4 even before S1 changes. Improvement changes F4 but cannot establish F1 or F2. |
| **What would falsify or weaken it** | If S1 always changes at the same time and yields the same interpretation, S2 should merge into runway. A temporary, fully buffered change may be immaterial over H0. |
| **Proposed disposition** | **RETAIN**; **RETEST** horizon and materiality. |

### S3 — Currency-mismatch transmission

| Required field | Research position |
| --- | --- |
| **What Hedgr believes** | Currency movement changes participant stability only through mismatch among accessible resources, reliable inflows, and essential obligations, or through observed participant-relevant price pass-through. |
| **Why the distinction matters** | Raw FX direction can otherwise be falsely treated as universally good or bad. Currency alignment may protect one need while worsening another. |
| **Evidence supporting it** | IMF balance-sheet work distinguishes currency mismatch from maturity and liquidity mismatch. IMF pass-through research finds transmission varies by state and uncertainty. |
| **What interpretation changes** | A verified adverse mismatch can worsen F3 and sometimes F4. A raw FX move with no mismatch or price effect leaves the function vector unchanged. Unknown composition or pass-through requires abstention. |
| **What would falsify or weaken it** | If every effect is already captured reliably in S2 and S4, S3 should be removed to avoid double counting. If useful classification requires detailed prohibited profiling, it must remain unknown. |
| **Proposed disposition** | **RETEST** incremental value; retain as an interaction input for scenarios. |

### S4 — Participant-relevant essential-cost pressure

| Required field | Research position |
| --- | --- |
| **What Hedgr believes** | Essential-cost pressure matters to F3 when it changes the real coverage provided by the accessible capital stock. Its effect on recurring inflow / outflow coverage is assessed separately through S2 / F4. Headline CPI is at most a proxy. |
| **Why the distinction matters** | Participants have different essential-cost exposures; a macro average can move while a specific participant's real coverage does not. |
| **Evidence supporting it** | Hedgr doctrine prioritises purchasing power. CFPB research cautions against reducing financial well-being to a single conventional number. IMF pass-through evidence supports conditional transmission rather than a universal FX / inflation rule. |
| **What interpretation changes** | A verified rise in relevant essential costs relative to the real coverage of accessible capital worsens F3. Easing pressure improves F3 relative to an adverse baseline. Other function directions remain independently assessed. |
| **What would falsify or weaken it** | If only detailed consumption profiling makes the variable useful, mark it unknown rather than collect data. If headline inflation repeatedly gives the wrong function direction, remove that proxy. |
| **Proposed disposition** | **RETAIN** for synthetic testing; **RETEST** the smallest defensible proxy. |

### S5 — Nominal claim-integrity state

| Required field | Research position |
| --- | --- |
| **What Hedgr believes** | Realisability near stated nominal value is analytically distinct from access timing and real purchasing power. |
| **Why the distinction matters** | A claim may transfer quickly yet realise below stated value, or remain nominally intact while access is impaired. |
| **Evidence supporting it** | Capital preservation is binding doctrine. IMF balance-sheet analysis distinguishes liquidity from solvency / balance-sheet impairment. |
| **What interpretation changes** | A credible material impairment worsens F2. An intact state prevents that conclusion but does not establish F1 or F3. |
| **What would falsify or weaken it** | If S5 never changes F2 independently of S6 redemption / convertibility, merge the observations. |
| **Proposed disposition** | **RETEST** as an independent observation. |

### S6 — Exit-chain state

| Required field | Research position |
| --- | --- |
| **What Hedgr believes** | Usable exit readiness can fail at settlement/access, redemption/convertibility, or underlying economic liquidity. One functioning link cannot prove the whole chain. S6 records time and access to the currently realisable amount; S5 records a material haircut relative to nominal value. |
| **Why the distinction matters** | Fast digital transfer can coexist with delayed redemption or insufficient market depth to realise the observed amount within H0. A single liquidity flag can hide the actual constraint, while a value haircut belongs to nominal-integrity analysis. |
| **Evidence supporting it** | Charter and Stability Engine doctrine prioritise access and withdrawal reliability. The governing brief explicitly distinguishes settlement, redemption, and underlying economic liquidity. A BIS-hosted central-bank overview distinguishes related liquidity channels and their interaction under stress. |
| **What interpretation changes** | Material degradation in any necessary link can worsen F1. A settlement-speed improvement alone leaves F1 unchanged if the ability to meet obligations does not improve. |
| **What would falsify or weaken it** | If the three links never produce distinct F1 interpretations, reduce them to a single weakest-link observation while keeping the causal explanation. |
| **Proposed disposition** | **RETAIN** provisionally; **RETEST** dimensional necessity. |

## 4. Minimum regime distinctions

Regimes are constructed from observed participant-relevant pressures. They are not predictions, market calls, asset-selection categories, or production states.

| ID | Regime distinction | What Hedgr believes / why it matters | Evidence supporting it | Interpretation changed | Falsifier / weakener | Proposed disposition |
| --- | --- | --- | --- | --- | --- | --- |
| **R0** | No dominant squeeze / control | If costs, cashflow, claim integrity, and exit conditions are materially unchanged, a headline or timestamp alone should not move the model. | Brief success criteria reject variables that do not change interpretation; current governance requires evidence rather than inference. | `materially unchanged`, unless evidence quality materially deteriorates. | A repeatable omitted observation changes a retained function despite all current observations remaining unchanged. | **RETAIN** as control. |
| **R1** | Essential-price or adverse-FX squeeze | Relevant cost pressure or mismatch-exposed FX deterioration can reduce real resilience while income and nominal claims remain stable. | Hedgr purchasing-power doctrine; IMF currency-mismatch and conditional pass-through evidence. | F3 worsens; F4 may worsen if essential-cashflow coverage compresses. | Resources / income keep pace, no mismatch exists, or no participant-relevant transmission is established. | **RETAIN**. |
| **R2** | Income squeeze / disinflationary slowdown | Easing inflation does not establish improved stability when income deteriorates. | Brief-authorized scenarios; OECD lost-income runway measure; Federal Reserve income-variability evidence. | F4 worsens; F1 may later worsen. Direction remains function-led rather than inferred from disinflation. | No material income, cashflow, or runway effect over H0. | **RETAIN**. |
| **R3** | Compound inflationary slowdown | Rising essential costs plus deteriorating income create reinforcing pressure without needing a new predictive macro taxonomy. | Brief-authorized inflationary-slowdown scenario; F3 / F4 evidence above. | F3 and F4 worsen; F1 may follow if runway contracts. | One axis is immaterial or verified to be offset such that its function does not change. | **RETAIN**. |
| **RX** | Access, claim, or systemic-stress overlay | Observed claim impairment, exit-chain failure, or correlated stress can make normal-state assumptions unreliable. A geopolitical / systemic headline alone is insufficient. | Charter crisis-first posture; IMF balance-sheet interactions; BIS-hosted institutional analysis of interacting liquidity channels; brief uncertainty principle. | Verified F1 / F2 impairment worsens direction. Otherwise the overlay may produce uncertainty until a transmission path is established. | Reliable evidence shows no relevant exposure path and F1–F4 remain unchanged. | **REVISE** systemic protection into this overlay; **RETEST**. |

This grid accommodates the brief's income disruption, FX deterioration, inflation shock, liquidity stress, disinflationary slowdown, inflationary slowdown, and systemic / geopolitical stress scenarios without creating seven forecast regimes.

## 5. Minimum-information rule

An observation survives only if two otherwise identical scenarios can produce a different function vector when that observation changes.

The rows below are **screened-out inputs, not proposed variables**. They failed the minimum-information or authority screen before entry into the fully evidenced H0 / S1–S6 model above.

| Candidate observation | Research test | Initial disposition |
| --- | --- | --- |
| Nominal balance alone | Can remain unchanged while access, integrity, or real coverage changes. | **REMOVE** as sufficient evidence. |
| Total net worth / illiquid wealth | May not be usable within H0. | **REMOVE** from minimum set. |
| Headline CPI alone | Does not establish participant-relevant cost transmission. | **REMOVE** as a direction setter; bounded proxy only. |
| Raw exchange-rate movement | Does not establish mismatch or pass-through. | **REMOVE** as a direction setter. |
| GDP, unemployment, interest-rate, or market forecasts | Invite macro prediction and do not establish participant transmission. | **REMOVE**. |
| Systemic / geopolitical headline | Changes direction only after a retained channel or critical uncertainty is affected. | **REVISE** into RX overlay. |
| Yield / APY / return | Subordinate; does not compensate for access or integrity deterioration. | **REMOVE**. |
| Asset, token, network, or provider label | Accessibility or tokenisation does not prove economic substance. Admission is explicitly unauthorized. | **REMOVE**. |
| Transfer speed alone | Does not establish redemption or underlying liquidity. | **REMOVE** as sufficient evidence. |
| Participant demographics | Do not directly change a retained function without a causal observation. | **REMOVE**. |
| Detailed holdings, target weights, or comprehensive debt profile | Exceeds minimum information, increases sensitivity, and enters excluded portfolio territory. | **REMOVE**. |
| Updated timestamp | Evidence recency matters, but time passing alone does not change financial stability. | **REMOVE** as a directional variable. |

Scheduled obligations remain inside S2 for this pass. A separate obligation or leverage variable should reopen only if controlled scenarios with identical S1 / S2 states produce materially different interpretations. Reopening it would remain research-only and could trigger the sensitive-data stop condition.

## 6. Evidence quality and abstention

Every observation must carry its own evidence condition:

- `current and coherent`
- `stale`
- `conflicting`
- `missing / unknown`

There is no numeric confidence score.

Rules:

1. Missing evidence is not evidence of stability.
2. Missing, stale, or conflicting critical F1 / F2 evidence prevents a single overall direction unless separate current and coherent evidence independently verifies a material F1 / F2 impairment; in that ordered exception, `less stable` remains available.
3. Known function directions remain visible even when an overall direction is indeterminate.
4. A broader regime label cannot fill a missing participant-transmission path.
5. Evidence recency and source reconciliation thresholds remain undefined and must be retested before any escalation.

## 7. Data and authority boundary

All state entries in this pass are fictional, categorical research inputs.

This artifact does not authorize:

- asking participants for income, expenses, obligations, balances, holdings, currency composition, or other financial data;
- changing the Lane V questionnaire, synthetic journey, thresholds, or evidence domains;
- storing, deriving, or inferring a participant financial profile;
- sourcing live macro, FX, asset, provider, or liquidity data;
- mapping the research state to current `EngineState`, allocation bands, runtime posture, notices, or Copilot;
- setting production thresholds, scores, weights, recommendations, or actions.

If useful interpretation cannot be produced without new personal or sensitive participant data, the affected research path must stop for Founder review under the governing brief.

The primary external source registry and transfer limitations are recorded in the companion Function Model **§7**. Those sources support conceptual distinctions only and do not validate participant thresholds, product efficacy, architecture, or implementation.

## 8. Founder-reviewable disposition

| Disposition | Research recommendation |
| --- | --- |
| **Retain** | H0; S1; S2; S4 for synthetic tests; explicit unknowns; smallest-information rule; observed-pressure regimes. |
| **Revise** | Currency as S3 transmission interaction; systemic stress as RX overlay; headline macro variables into bounded evidence rather than direction setters. |
| **Remove** | Forecast variables, demographics, raw headlines, asset labels, transferability, total wealth, target weights, yield, and timestamp-only change from the minimum set. |
| **Retest** | S1 bands; S2 horizon; S3 incremental value; S4 proxy; S5 independence; S6 dimensionality; evidence freshness and conflict handling. |
| **Escalate** | **Not recommended yet.** Data collection, canonical state architecture, runtime mapping, thresholds, live inputs, or participant-facing translation require separate authority. |

**Package recommendation:** `RETEST` the six-observation candidate with the companion [`HEDGR_STABILITY_INTERPRETATION_TESTS.md`](./HEDGR_STABILITY_INTERPRETATION_TESTS.md). Delivery does not accept the state model or close `SE-REASON-001`.

`NO CROSS-LANE IMPACT` — Lane V, Lane N, the synthetic journey, shipped engine state, accepted ADR meaning, and financial-execution posture remain unchanged.
