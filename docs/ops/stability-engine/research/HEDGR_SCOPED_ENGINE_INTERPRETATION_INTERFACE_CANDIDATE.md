# Scoped Engine interpretation interface — documentary candidate

> **Founder disposition — RETAIN (§290, 2026-09-19):** Founder approved recording the disposition: retain this bounded candidate and adopt its semantic responsibility/claim-integrity boundary in the existing functional contract. Close only `SE-REASON-001-INTERFACE-001`; parent remains open with no active nested successor. This artifact remains non-canonical as a production/executable specification; current EngineState/posture and all financial authority remain unchanged. Coexistence requires a separate bounded decision before participant-facing introduction; no design ticket, runtime work or exposure is activated. Effective repository reconciliation on permanent-main merge with separate verified RAP rebind. [Full disposition](../../HEDGR_STATUS.md#290-founder-retain--scoped-semantic-interface-and-responsibility-boundary-2026-09-19). The original authored/review body and its delivery-era pending-disposition wording below are preserved as historical provenance and superseded only by this notice.


**Date:** 2026-09-19<br>
**Ticket:** SE-REASON-001-INTERFACE-001, nested within SE-REASON-001<br>
**Status:** Authored pass and distinct review completed; delivery subject to governed merge; Founder disposition outstanding; non-canonical<br>
**Classification:** Founder Only / Class A informational / Yellow<br>
**Authority effect:** No canonical contract, model, product, data or financial execution acceptance

## 1. Authority, sources and method

[HEDGR_STATUS.md §289 / §7a](../../HEDGR_STATUS.md#289-founder-activation--scoped-engine-interpretation-interface-candidate-2026-09-19) records Founder approval, “approved to activate and action ticket”. Activation [PR #581](https://github.com/mhibajene/hedgr-copilot/pull/581) merged at `72b25f9a14445d22dc2477b1eb7d44b8d7f4138f`; separate RAP rebind [PR #582](https://github.com/mhibajene/hedgr-copilot/pull/582) merged at `f5217f8eccbc003b80048ed46c51991187777279`. Before authoring, permanent-main ancestry, deterministic CURRENT RAP, no conflicts, V/E parent IDs and disabled projection permissions were verified. The approved pass permits this one document and one distinct review/correction round.

The [accepted target functional contract, including §288 implications](../HEDGR_STABILITY_ENGINE_FUNCTIONAL_CONTRACT.md#architectural-implications-retained-from-the-worked-cases), supplies design constraints. The [retained worked cases](HEDGR_PARTIAL_CAPITAL_WORKED_CASES.md), sections 1–8, supply the only examples and their existing conclusions. This document traces those conclusions; it does not create new scenarios, rerun a scored experiment or claim independent evidence. PC-01A and PC-04A repeat the same known facts and do not increase empirical coverage.

Current implementation is read from [EngineState](../../../../apps/frontend/lib/engine/types.ts), [mock provider](../../../../apps/frontend/lib/engine/mock.ts) and [hook](../../../../apps/frontend/lib/engine/useEngineState.ts) at the verified activation baseline. [ADR 0013](../../../decisions/0013-allocation-bands-informational-not-accounting.md), [0014](../../../decisions/0014-stability-engine-read-only-in-sprint-2.md), [0015](../../../decisions/0015-stability-engine-is-the-system-center.md) and [0024](../../../decisions/0024-mvp-acceptance-is-evidence-gated-not-feature-gated.md) remain controlling. [D-143's readout](HEDGR_STABILITY_EVIDENCE_INTERPRETATION_READOUT.md), the retained [function](HEDGR_STABILITY_FUNCTION_MODEL.md) and [state](HEDGR_STABILITY_STATE_MODEL.md) models inform limitations only; their semantics are not adopted, changed or mapped here. D-099 remains direction only.

**Candidate determination:** A bounded explanation needs an explicit relationship between the supplied facts, the claim that depends on them, and the qualifications that presentation must preserve. This can be described without adding a stability score, modifying EngineState or defining an executable API. The tables below specify conceptual responsibilities, not field names, types, enum values, serialization, storage or a schema to implement.

## 2. Responsibility boundary

| Stage | Candidate responsibility | Boundary |
| --- | --- | --- |
| Financial facts and context | Preserve the supplied resource, envelope, commitment, time and evidence facts with their identity and origin | “Financial State” here is the information basis of a fictional question, not a replacement ledger or authenticated financial profile. The ledger remains accounting authority |
| Scoped Engine interpretation | Relate those facts to one declared question; own the derived conclusion, any explanatory arithmetic and its limitations | No overall stability, allocation decision, safe-to-spend amount or action instruction follows from one obligation |
| Wallet presentation | Express the supplied facts and Engine-owned explanation faithfully, including material conditions and uncertainty | Formatting and progressive disclosure must not calculate a new financial judgment, broaden scope or turn information into permission to act |

This is a logical separation of responsibilities. It does not prescribe new services, runtime modules or data intake. An event may describe movement, while state describes the resulting facts and interpretation explains their relevance. A movement label alone supplies neither an envelope instruction nor a stability direction. PC-02 explicitly stipulates both completed movement and an intentional envelope adjustment.

## 3. Minimum conceptual information and its source

“Minimum” is relative to the retained single-commitment question. Each element can be supplied, assumed or missing; a blank is not zero. The source's fictional stipulations must remain identifiable as such, even where the case treats them as known.

| Information element | Purpose / relationship | Source and necessary limit |
| --- | --- | --- |
| Question, subject and scope | Identify the named obligation, person and intentional envelope being discussed; distinguish inside from outside | Contract: three scopes; PC-01/02. Envelope membership is reasoning scope, not custody, total wealth or actual account ownership |
| Resource identity, amount, compatible unit, owner and location | Identify what is counted once and to whom it belongs | Worked cases common frame / PC-02. Both stocks belong to the same fictional person, use invented U and do not overlap. Do not add amounts with unresolved comparability or ownership |
| Availability and payment conditions of each relevant resource | Explain whether the resource is usable for this payment by its deadline | PC-01/02/03. Preserve first usable time, endpoint compatibility, route dependence and stipulated costs; nominal amount or transfer completion is not access evidence |
| Named commitment and amount evidence | Identify the requirement and distinguish a supplied amount from an unknown amount | PC-01/04. Its existence/deadline may be known while amount is missing. No assumption that other commitments are absent |
| Reference time, deadline and comparison basis | Distinguish observation time, usable time and required-payment time; identify the changed fact when comparing | Common Day 0 / Day 2 frame and each pair's controlled change. Absolute calendar/timezone handling is not specified |
| Evidence origin, status and temporal basis | Separate source facts, conditional assumptions and missing information; identify which claim relies on which basis | Worked cases §1/§6 and contract. Day 0 currentness is a stipulation, not authentication or a live freshness policy |
| Completeness and exclusions | Bound the question to supplied resources and one obligation, with unassessed competing claims visible | Worked cases interpretation limit and PCV-01. “On its own” establishes neither priority, exclusive earmarking nor actual availability after other claims |
| Optional movement/comparator facts | Explain what changed without reading meaning from direction alone | PC-02/03/04. Only include an event/comparison when supplied; missing information is not itself a financial loss event |

A broader question needs its own evidence and authority. This candidate does not mandate collecting a complete budget, account history, forecast or financial profile. It provides no method for resolving contradictory sources, valuing claims, assigning priorities or authenticating a route.

## 4. The scoped interpretation that must survive presentation

Treat the following as linked parts of one explanation. A conclusion separated from a necessary condition is an incomplete representation of that explanation.

| Part | Candidate meaning / dependency | Wallet preservation duty |
| --- | --- | --- |
| Claim identity and question | State which obligation and horizon this conclusion concerns, with traceability to the relevant case/facts | Do not present it as a general account or whole-person judgment |
| Local conclusion | Distinguish coverage supported under supplied conditions, a mismatch within supplied resources, and inability to determine coverage | These are descriptive alternatives, not accepted enum values or posture mappings. Missing amount must not be rendered as a shortfall or as covered |
| Reason and supporting facts | Identify the amounts, timing and access relationship that supports the conclusion | Render the Engine-supplied reason; do not infer coverage from a balance, transfer label or percentage |
| Derived explanatory quantities, when supported | Identify operands and purpose of any stated gap or remainder | A local arithmetic result stays local; Wallet does not convert it into available capital, reserves or an allocation |
| Conditions and dependencies | Preserve route, deadline, payment compatibility and fictional access/cost assumptions needed for the claim | Material conditions must accompany the conclusion, including in a compact summary |
| Unknowns and affected claims | Identify the missing fact and exactly what depends on it | Preserve unaffected facts; withhold only unsupported conclusions. Do not replace missing facts with zero or blanket financial deterioration |
| Scope and withheld conclusions | State unassessed competing commitments and exclude broader capacity/resilience/advice | Do not detach “covered” from the named-obligation-alone limit or imply priority/earmarking |
| Evidence basis and time | Identify origin and relevant times; distinguish interpretation generation from input currentness | A render/update timestamp cannot authenticate facts or refresh their evidence basis |
| Comparison, only when supported | Describe supplied changes and unchanged facts | Envelope up/down, access time changes and information loss cannot become overall stability arrows by presentation inference |

If a presentation cannot carry a material qualification, it should not present that stronger conclusion. It may still communicate supported facts and the relevant limitation. This is an information-preservation requirement, not a new global confidence switch, error-handling implementation or policy for stale/conflicting live data.

No payment choice or action option is generated by this candidate. Its conclusion is not an instruction to transfer, deposit, withdraw or pay. Authority and availability of any future action require their own governed boundary.

## 5. Traceability across the existing eight states

Every row imports the retained common frame: invented U; same owner; non-overlapping stocks; Day 0 observation; Day 2 named-payment deadline; unassessed wider commitments; no real provider or route. Positive coverage always considers the named obligation on its own, under the stated access/payment assumptions, before other unassessed claims. Negative conclusions concern supplied resources only. No row supplies overall stability, free capacity, reserves, yield capacity, F1–F4 classification or advice. This matrix is an interface-fidelity check of existing facts/conclusions, not eight new evaluations.

| Existing state / source | Facts that must remain linked | Scoped interpretation retained | Information presentation must not lose |
| --- | --- | --- | --- |
| **PC-01A** — cases §2 | Envelope 600 U unavailable until Day 5; outside 400 U usable Day 0 in required medium without fee; obligation 300 U Day 2 | Named payment considered alone is covered by outside funds; 100 U is arithmetic after that payment only | “On its own”, Day 5 envelope restriction and unknown other claims. 100 U is not spendable capacity |
| **PC-01B** — cases §2 | Same resource/access facts; obligation 500 U Day 2 | Supplied usable resources are 100 U short at the deadline; envelope cannot resolve the timing gap | This is a local mismatch, not insolvency, loss of nominal wealth or a recommendation. No alternative source/extension is supplied |
| **PC-02A** — cases §3 | Common pre-transfer 600/400 U; completed inward 200 U; after: envelope 800/outside 200 U. Same owner, no duplicate pending funds, fee/loss/lock/value change; both immediately available; explicit timely envelope-to-payment route; obligation 300 U | Ownership total remains 1,000 U; outside alone is 100 U below payment; coverage of that payment alone depends on the stipulated usable envelope route | Route dependency and its fictional status, intentional envelope adjustment, one-obligation scope and no overall stability improvement. Completion alone does not establish access |
| **PC-02B** — cases §3 | Same baseline and completion/access assumptions; outward 200 U; envelope 400/outside 600 U; obligation 300 U | Same 1,000 U ownership total; outside alone covers the named payment considered on its own | Smaller envelope does not establish loss or lower stability; the arithmetic 300 U outside remainder is not free capacity. This branch's coverage does not require the envelope route |
| **PC-03A** — cases §4 | Envelope 600 U unavailable until Day 5; external 400 U first usable Day 1 at payment endpoint without fee; obligation 300 U Day 2; no alternative source/bridge supplied | Coverage of the named payment alone follows conditionally from stipulated timely external access | Day 1 access assumption and Day 2 deadline; no prediction/authentication of future availability or whole-position assessment |
| **PC-03B** — cases §4 | Same amounts/owner; external usable Day 3, envelope Day 5; obligation 300 U Day 2; no earlier partial access, extension or bridge | No supplied stock is usable by the deadline; named payment not covered by those resources then | Distinguish nominal 1,000 U from timely usability. No insolvency, nominal-loss claim or inferred bridge |
| **PC-04A** — cases §5 | Envelope 600 U Day 5; outside 400 U Day 0 with required payment usability/no fee; known obligation 300 U Day 2 | Named payment alone covered; 100 U remainder is arithmetic only | Unknown other commitments, restricted envelope and no capacity inference; repeated PC-01A facts are not additional evidence |
| **PC-04B** — cases §5 | Same resource/access facts; obligation exists and deadline is Day 2, but amount missing | Preserve balances and access facts; coverage cannot be determined; no gap or remainder calculated | Missing amount is neither zero nor deterioration. State the particular missing fact without requiring a full financial profile |

The case-level relationships fit the candidate's conceptual information set. This says nothing about a production schema, real-source sufficiency, user understanding or validation of broader architecture. The eight states exercise only the supplied contrasts; stale/conflicting records, competing obligations, partial fulfilment and multi-currency comparability remain untested and unresolved.

## 6. Compatibility with current EngineState

Verified read-only source: baseline `f5217f8eccbc003b80048ed46c51991187777279`, paths linked in §1. `useEngineState` returns `getMockEngineState` after resolving the local simulator posture. The mock has fixed target values and a static update timestamp. This is not a claim about a live reasoning service.

| Present surface | What it represents now | Compatibility finding / constraint |
| --- | --- | --- |
| `posture` | `normal`, `tightening`, `tightened`, `recovery` | No accepted mapping from the scoped alternatives in §4 to these postures. Do not map missing commitment amount to a posture or derive posture from coverage |
| `liquidityTargetPct`, `coreTargetPct`, `yieldCapPct` | Informational allocation targets | Not resource balances, amounts usable by a deadline, or outputs from these cases. No change or case-derived percentages |
| Optional `notice.title` / `notice.body` | Current explanatory notice text | Text can convey words, but the current type does not structurally bind claims to scope, evidence or conditions. Encoding a new hidden interface in notice text would not establish a governed contract |
| `updatedAt` | One timestamp on the posture output; fixed in the mock | Not per-input provenance, observation date, route validity or evidence freshness. Do not reinterpret it as any of these |
| Mock provider and hook | Select predefined read-only posture output | No named-commitment calculation, resource/route representation or live-input engine is implemented here |

**Compatibility disposition:** Preserve the current contract. A later design could define how a separately governed scoped interpretation coexists with it, but this document chooses no type extension, new API, adapter, provider, parser or storage strategy. Displaying local coverage beside an existing posture could create an apparent contradiction; meaning and presentation of that coexistence require explicit later resolution. This mismatch is recorded, not repaired through an implicit F1–F4 or posture mapping.

## 7. Unresolved decisions and bounded handoff

| Unresolved issue | What is preserved now | Later decision boundary |
| --- | --- | --- |
| Canonical interface shape and ownership in code | Conceptual facts/claim/presentation responsibilities only | Names, types, identifiers, versioning, serialization, transport, storage and module placement need separate acceptance/implementation scope |
| Evidence change, expiry or conflict | Claims retain their basis; unsupported conclusions cannot be strengthened | No TTL, confidence weight, source ranking, reconciliation rule or live ingestion/authentication/consent design |
| Multiple/competing obligations and partial fulfilment | Named-obligation-alone scope remains explicit | No priority, earmarking, resource reservation or general payment plan |
| Broader stability and capacity | Existing D-143 limitations and §288 deferrals remain | No buffers, sufficiency thresholds, yield capacity, F1–F4 mapping or scalar aggregation |
| Existing posture beside scoped explanation | Current EngineState remains unchanged | No inferred hierarchy, new badge, replacement notice or posture override |
| User value and legibility | Research-only candidate; no approved copy or UI | Separately governed implementation/exposure and evidence disposition; no comprehension or demand claim |

**Implementer recommendation:** RETAIN this document as a non-canonical candidate for Founder consideration. The practical output is a traceable explanation boundary, not a canonical interface ready for coding. Any later commitment-timing product proposal must explicitly settle the limited representation/coexistence choices it needs while preserving deferred policy and financial boundaries. That is not an instruction to solve every higher-order question or a new gate on Lane V. No additional worked cases, new research programme, canonical acceptance, model acceptance or product ticket is activated.

## 8. Distinct review and delivery record

**Authored source:** `a755413ffb20e80c2fdde4e48b06c10da3e38168`. Distinct Verifier `scoped_interface_verifier` reviewed this immutable authored commit against §7a/§289, AGENTS pointers, accepted functional contract, retained cases, ADRs 0013/0014/0015/0024 and actual EngineState/mock/hook sources. The Verifier made no edits; the implementer retains its findings in this separate review-record commit.

**Verdict:** PASS — no actionable findings; no substantive correction required. The one authorised review/correction round is complete; no additional substantive review round or case generation follows.

**Checks retained:** All eight existing state labels and conditional conclusions preserve amounts, ownership/non-overlap, access timing, payment-route conditions and named-obligation-alone limitations. PC-02A retains the indispensable envelope-to-payment route; PC-03 separates nominal stock from timely availability; PC-04B preserves known facts while withholding amount-dependent coverage. Facts, assumptions, interpretation and presentation remain distinct. Remainders cannot become capacity; missing information cannot become deterioration; Wallet cannot strengthen financial claims. No executable schema, hidden threshold/policy, posture mapping or new case is introduced. Current EngineState, mock values/timestamp and hook behaviour are accurately described. Scoped explanation/current-posture coexistence remains unresolved, and deferred semantics/financial/other-lane boundaries are preserved.

**Review limitations:** One bounded read-only visible-artifact review with inherited conversation/repository context. No second experiment, blinded/isolated evaluation or empirical validation. PASS establishes consistency and scope fidelity only, not implementation readiness, canonical acceptance, real-world route feasibility, user understanding, model necessity or authority for a successor. Founder disposition remains outstanding.

**Implementer verification:** Full local `pnpm validate` passed; exactly eight traceability rows, local file links and exact authored-file scope were checked. Nine read-only source checksums, including the accepted contract, retained cases/models/readout and current types/mock/hook, remain unchanged. No code, model or prior evidence changes. Required hosted/convergence checks and governed merge remain delivery gates, with results retained in the delivery PR; authority reconciliation receives a separate permanent-main rebind after squash. This is delivery evidence, not a second substantive research review.

Lane V scope, G deferral, N idle, D-143/D-146, D-099, frozen narrative and participant publication/distribution/rehearsal/release boundaries remain unchanged. **NO CROSS-LANE EXECUTION IMPACT**.
