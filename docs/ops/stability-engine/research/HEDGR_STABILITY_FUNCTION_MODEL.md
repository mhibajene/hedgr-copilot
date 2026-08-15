# Hedgr Stability Function Model

**Status:** Lane E research output — proposed for Founder / HedgrOps disposition; non-authoritative<br>
**Ticket:** `SE-REASON-001` (Lane E)<br>
**Decision:** Internal **D-076** / Controlled Parallelism v21<br>
**Repo authority:** `docs/ops/HEDGR_STATUS.md` **§6f.21**, **§7**, **§7a**, **§204**<br>
**Governing frame:** [`HEDGR_STABILITY_ENGINE_REASONING_RESEARCH_BRIEF.md`](./HEDGR_STABILITY_ENGINE_REASONING_RESEARCH_BRIEF.md)<br>
**Date:** 14 August 2026<br>
**Visibility:** Internal<br>
**Execution class:** Class A informational research only; no implementation or financial-execution authority

| Boundary | Position |
| --- | --- |
| Product refinement | None |
| Engine implementation | None |
| Asset, provider, or allocation authority | None |
| Participant-data collection | None |
| Recommendation or execution | None |
| Lane V / Lane N impact | `NO CROSS-LANE IMPACT` |

This artifact tests a reasoning model. It does not change accepted doctrine, define a runtime contract, approve inputs or thresholds, accept evidence into the Evidence Register, or authorize any product, portfolio, provider, recommendation, or execution decision.

## 1. Research determination

**Proposed package disposition: `RETEST`.**

The smallest coherent candidate is a **four-function vector**, not a single stability score:

1. **F1 — Usable liquidity and exit readiness**
2. **F2 — Nominal capital integrity**
3. **F3 — Essential purchasing-power resilience**
4. **F4 — Income and essential-cashflow resilience**

Two candidates from the governing brief should be revised rather than added as independent functions:

- **Currency resilience** is provisionally an interaction driver. A currency move matters only where resources, income, or essential obligations are mismatched, or where relevant price pass-through is observed.
- **Systemic or regime protection** is provisionally a cross-cutting stress and uncertainty overlay. A regime headline alone is not a participant outcome.

Yield or return generation is not a stability function in this model. It matters only where it changes one of F1–F4, and it cannot compensate for material deterioration in access or capital integrity.

The model therefore asks:

> Compared with an explicit prior state and horizon, which stability functions materially improved, worsened, remained unchanged, or cannot be established—and why?

It does not ask for a maximising allocation or a prediction.

## 2. Why the model remains a vector

The functions can move in different directions:

- nominal value can remain intact while purchasing power falls;
- purchasing-power pressure can ease while income is disrupted;
- a claim can remain nominally intact while access or redemption deteriorates;
- current runway can remain adequate while persistent negative cashflow weakens the trajectory; and
- a currency move can protect one obligation set while worsening another.

A scalar score would require weights and compensating trade-offs that this lane is not authorized to set and current doctrine does not resolve. The research model therefore preserves function-level direction and uncertainty.

## 3. Function-level evidence and disposition

### F1 — Usable liquidity and exit readiness

| Required field | Research position |
| --- | --- |
| **What Hedgr believes** | Stability requires the participant to be able to meet essential obligations when due from resources that are actually accessible. Settlement or transfer access, redemption or convertibility, and underlying economic liquidity are distinct links in the exit chain. F1 concerns whether the currently realisable amount can be accessed within the declared horizon; F2 separately considers loss relative to stated nominal value. |
| **Why the distinction matters** | A valuable or nominally intact claim can still fail the participant if it cannot be used, redeemed, or realised within the relevant horizon. Digital transferability alone does not establish economic exit readiness, while an access path alone does not establish nominal integrity. |
| **Evidence supporting it** | The Constitutional Charter makes capital access and withdrawal reliability mission-critical (`hedgr-constitutional-charter.md`, Articles I–II). The Stability Engine doctrine separately names liquidity availability and withdrawal readiness. The governing brief expressly requires multidimensional liquidity. External conceptual support comes from the BIS distinction between market and funding liquidity and from World Bank / OECD measures that focus on resources available within a shock horizon. |
| **What interpretation changes** | A material contraction in usable essential-needs runway, or impairment in a necessary exit-chain link, worsens F1 even if nominal value, income, and headline macro conditions are unchanged. A verified improvement in usable runway improves F1 only when no other necessary access link deteriorates. |
| **What would falsify or weaken it** | If settlement, redemption, and underlying-liquidity distinctions never produce different interpretations, they should collapse into a single weakest-link observation. If F1 never changes independently of F2 and current runway, its boundary should be revised. |
| **Proposed disposition** | **RETAIN** the function; **RETEST** whether all three liquidity dimensions must remain explicit. |

### F2 — Nominal capital integrity

| Required field | Research position |
| --- | --- |
| **What Hedgr believes** | Stability requires a reasonable expectation that a financial claim can be realised near its stated nominal value, considered separately from inflation and timing of access. |
| **Why the distinction matters** | Liquidity, nominal integrity, and purchasing power are not equivalent. F2 records a material value haircut relative to the stated claim; F1 records whether the resulting realisable amount can be accessed within the horizon. A claim may therefore be accessible at material loss, nominally intact but inaccessible, or nominally stable while losing real value. |
| **Evidence supporting it** | Capital preservation is the Charter's first priority and the Stability Engine doctrine ranks capital safety above yield. IMF balance-sheet analysis distinguishes liquidity problems from solvency or balance-sheet impairment and shows that the two can interact without being identical. |
| **What interpretation changes** | Credible evidence of material claim impairment worsens F2 even when access is currently available or essential-cost pressure is easing. Restoration of claim integrity improves F2 only relative to an explicit impaired baseline. |
| **What would falsify or weaken it** | If every F2 change is fully and consistently captured by redemption impairment in F1, a separate function adds no information and should be merged. |
| **Proposed disposition** | **RETEST** as a separate function; provisionally retain. |

### F3 — Essential purchasing-power resilience

| Required field | Research position |
| --- | --- |
| **What Hedgr believes** | A nominally unchanged accessible capital stock can become less stable when participant-relevant essential costs rise faster than that stock's real coverage. Recurring inflow / outflow coverage remains separately assessed under F4. |
| **Why the distinction matters** | Hedgr's product purpose includes preserving purchasing power in volatile economies. Nominal preservation alone cannot establish what the current capital stock can buy, while F3 alone cannot establish whether recurring cashflow remains positive. Headline inflation alone also cannot establish the participant effect. |
| **Evidence supporting it** | The Stability Engine doctrine names preservation of purchasing power as a primary objective. IMF research finds that exchange-rate pass-through varies by economic state, supporting an interaction rather than a universal FX rule. The CFPB's financial-well-being research also treats shock absorption and day-to-day control as broader than income or net worth alone. |
| **What interpretation changes** | A verified widening between essential-cost pressure and the real coverage of the participant's accessible capital stock worsens F3. The same headline inflation or FX movement produces no directional change when no participant-relevant transmission is established. F4 remains independently assessed. |
| **What would falsify or weaken it** | If no minimally legible proxy can be formed without prohibited personal-data collection, F3 must remain unknown and that research path must stop. If F3 never changes independently of F4 and currency mismatch, the boundary should be revised. |
| **Proposed disposition** | **RETAIN** the function; **RETEST** the smallest non-sensitive proxy and transmission evidence. |

### F4 — Income and essential-cashflow resilience

| Required field | Research position |
| --- | --- |
| **What Hedgr believes** | Stability depends partly on whether reliable inflows cover essential outflows and replenish rather than continually consume accessible buffers. |
| **Why the distinction matters** | A participant can have adequate current runway while a persistent cashflow deficit weakens the trajectory. Conversely, positive income does not remove immediate fragility where no usable reserve exists. |
| **Evidence supporting it** | The MVP baseline identifies volatile-income users and income disruption is an authorized scenario in the governing brief. OECD survey design uses the duration for which living expenses could be covered after loss of main income as a resilience measure. The Federal Reserve reports that timing mismatches between income and expenses can create financial difficulty and that variable income is associated with bill-payment hardship. |
| **What interpretation changes** | A material income disruption or deterioration in essential-cashflow coverage worsens F4 before it necessarily changes current nominal value or access runway. A reliable improvement in coverage improves F4, but does not by itself establish F1 or F2. |
| **What would falsify or weaken it** | If F4 never adds a different interpretation once F1 runway is known, it should be merged. Evidence that a disruption is temporary, fully buffered, and immaterial over the declared horizon can weaken an overall directional conclusion. |
| **Proposed disposition** | **RETAIN** for synthetic testing; **RETEST** horizon and materiality boundaries. |

## 4. Revised and removed function candidates

| Candidate | What Hedgr provisionally believes | Why it matters | Evidence and interpretation effect | Falsifier / weakener | Proposed disposition |
| --- | --- | --- | --- | --- | --- |
| **Standalone currency resilience** | Currency matters through mismatch and observed pass-through, not as inherently stabilising or destabilising. | The same FX movement can harm, help, or not affect different participants. | IMF balance-sheet and pass-through research supports examining currency denomination, maturity, and state-dependent transmission. An adverse mismatch worsens F3 and may worsen F4; raw FX movement does not set direction. | Reinstate a standalone function only if controlled scenarios show an independent participant outcome not captured by F3 or F4. | **REVISE** into an interaction driver. |
| **Standalone systemic / regime protection** | Systemic stress matters when it transmits into access, claim integrity, essential costs, or income, or makes critical evidence unreliable. | A headline regime label can otherwise create forecasting drift and false precision. | Charter crisis-first doctrine supports stress awareness; the brief requires uncertainty visibility. A stress flag with no known pathway changes confidence, not automatically direction. | Reinstate a standalone function only if observed stress repeatedly changes participant stability before any retained channel changes. | **REVISE** into a cross-cutting overlay. |
| **Yield / return generation** | Return is subordinate and is not a participant-stability outcome by itself. | Treating yield as stability would conflict with safety-first doctrine and could hide access or principal deterioration. | Charter, Stability Engine doctrine, and `.cursorrules` all subordinate yield to safety and liquidity. Return changes direction only through F1–F4. | Evidence would need to show an independent stability outcome without compensating unsafe trade-offs; this lane does not establish one. | **REMOVE** from the function set. |
| **Single composite stability score** | No evidence currently supports universal weights or compensability across the functions. | A score would hide conflicts and uncertainty and invite false precision. | The governing brief requires conflicts to be identified rather than assumed jointly maximisable. | Reconsider only after governed evidence establishes stable, explainable, non-misleading aggregation rules. | **REMOVE** from this research model. |

## 5. Non-weighted interpretation hypothesis

For each function, record one temporal direction:

- `improved`
- `worsened`
- `materially unchanged`
- `unknown`

Then apply these research rules:

1. A verified material F1 or F2 impairment is sufficient for **less stable**. Improvements elsewhere remain visible but do not compensate for the critical deterioration.
2. Otherwise, **more stable** requires at least one material improvement, no material worsening, and no unresolved unknown, stale, or conflicting observation capable of concealing a material worsening.
3. **Less stable** applies when at least one function materially worsens, none improves, and evidence is sufficient.
4. **Materially unchanged** requires all four functions to remain materially unchanged and no material increase in uncertainty.
5. Opposing non-dominant material changes, or an unknown, stale, or conflicting observation that could conceal a material change, produce **insufficient evidence for a single overall direction** when the preceding rules cannot be satisfied. The function vector remains visible. Rule 1 remains the ordered exception where material F1 / F2 impairment is independently verified by current and coherent evidence.
6. `More stable` does not mean safe, suitable, protected, or guaranteed. `Less stable` does not imply what anyone should do.

These rules are a test oracle only. They are not thresholds, policy, runtime semantics, a recommendation, or an implementation contract.

## 6. Conflicts the model must preserve

| Conflict | Required interpretation posture |
| --- | --- |
| F1 improves while F3 worsens | Preserve the mixed vector. Do not net the changes without separately authorized evidence. |
| F3 improves while F1 materially worsens | Overall **less stable** under the provisional critical-access rule; retain both causes. |
| F2 remains intact while F1 worsens | A nominally intact claim can still be less usable; do not collapse value into access. |
| F1 remains adequate while F4 worsens | Current stock resilience and future trajectory differ; retain the warning without predicting exhaustion. |
| F4 improves while F3 worsens | Preserve as mixed unless the evidence establishes no material transmission to one function. |
| Currency movement has no verified mismatch | Do not change direction from the headline alone. |
| Systemic stress has no verified participant pathway | Increase uncertainty if warranted; do not assert directional deterioration. |

## 7. Evidence base and limits

### Repo-native anchors

- `docs/doctrine/hedgr-constitutional-charter.md` — capital preservation, liquidity, visible trade-offs, and crisis-first design.
- `docs/doctrine/hedgr-governance-philosophy.md` — explicit uncertainty, falsifiability, and research-as-evidence rather than authority.
- `docs/doctrine/hedgr-ux-constitution.md` — status before action, risk legibility, explanation, and lost-income safety test.
- `docs/doctrine/hedgr-stability-engine.md` — purchasing power, capital safety, liquidity reliability, and yield subordination.
- `docs/doctrine/hedgr-mvp-project-specification.md` — current interpretive, read-only engine posture and volatile-income user context.
- ADRs **0013–0015** — informational, non-accounting, read-only Stability Engine boundaries and system centrality.

### Primary external conceptual evidence

Accessed 14 August 2026.

- [OECD/INFE Toolkit for Measuring Financial Literacy, Inclusion and Well-Being 2026](https://www.oecd.org/content/dam/oecd/en/publications/reports/2026/01/oecd-infe-toolkit-for-measuring-financial-literacy-inclusion-and-well-being-2026_6e8d9566/92f2d439-en.pdf) — uses duration of living-expense coverage after loss of main income as a resilience observation.
- [World Bank Global Findex 2021 — Financial resilience](https://www.worldbank.org/en/publication/globalfindex/brief/the-global-findex-database-2021-chapter-3-financial-resilience) — tests access to emergency funds within a defined horizon.
- [Federal Reserve — Economic Well-Being of U.S. Households in 2024](https://www.federalreserve.gov/publications/files/2024-report-economic-well-being-us-households-202505.pdf) — documents income variability, income / expense timing mismatch, and related hardship.
- [CFPB — Measuring financial well-being](https://www.consumerfinance.gov/data-research/research-reports/financial-well-being-scale/) — treats security and shock absorption as constructs not reducible to a single balance-sheet number.
- [IMF — Using the Balance Sheet Approach in Surveillance](https://www.imf.org/external/pubs/ft/wp/2006/wp06100.pdf) — distinguishes maturity, currency, liquidity, and solvency vulnerabilities.
- [IMF — Assessing Systemic Financial Stability Risks Due to FX Mismatches](https://www.imf.org/-/media/files/publications/pp/2022/english/ppea2022008.pdf) — distinguishes FX balance-sheet mismatch from shorter-horizon FX liquidity mismatch.
- [IMF — State-Dependent Exchange Rate Pass-Through](https://www.imf.org/-/media/files/publications/wp/2023/english/wpiea2023086-print-pdf.pdf) — supports treating FX-to-price transmission as conditional rather than universal.
- [BIS — Market and funding liquidity: an overview](https://www.bis.org/review/r160502a.htm) — distinguishes related but non-identical liquidity channels.

These external sources support conceptual distinctions only. They do not validate Hedgr efficacy, product thresholds, participant suitability, asset eligibility, provider liquidity, architecture, or implementation. The Federal Reserve and CFPB evidence is U.S.-specific; IMF balance-sheet work often operates at sector or system level; transfer to an individual participant model therefore remains a hypothesis to retest.

No participant data, live market data, provider evidence, or external commitment was collected or created in this pass.

## 8. Founder-reviewable disposition

| Disposition | Research recommendation |
| --- | --- |
| **Retain** | Four-function vector; function-first explanations; explicit comparator and horizon; visible uncertainty; safety-critical access and nominal-integrity attention. |
| **Revise** | Currency into a mismatch / pass-through driver; systemic stress into a cross-cutting overlay; liquidity into explicit links only while they change interpretation. |
| **Remove** | Yield as a stability function; raw macro headlines as direction setters; scalar scoring; assumed compensability. |
| **Retest** | F1 / F2 boundary; F4 independence from runway; qualitative materiality; minimum non-sensitive proxies; critical-function dominance; inter-rater consistency. |
| **Escalate** | **Not recommended yet.** Any canonical architecture, runtime field, threshold, participant-data collection, or product translation requires separate Founder disposition and repo-native authority. |

**Package recommendation:** `RETEST` the four-function model through the companion State Model and Interpretation Tests. Artifact delivery does not accept the model or close `SE-REASON-001`.

`NO CROSS-LANE IMPACT` — Lane V, Lane N, the synthetic journey, shipped engine surfaces, accepted ADR meaning, and financial-execution posture remain unchanged.
