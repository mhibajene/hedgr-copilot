# Stability evidence interpretation — coordinator protocol and methods preflight

**Audience:** Coordinator, instrument author, methods reviewer, and later adjudicator only. **Never distribute this file or its appendices to evaluation agents.**
**Ticket:** `SE-REASON-001-EVID-INTERP-001`
**Authority:** D-142 / HEDGR_STATUS.md §7 / §7a / §274
**Prepared:** 14 September 2026
**Preparation status:** LOCKED FOR HANDOFF — methods preflight complete; launch-isolation checks remain mandatory
**Evaluation status:** Not launched. Founder will conduct the external handoff.
**Source revision:** `32274125595b8ffc3a6f5a9be6743eb78ee6c8c5`

## 1. Purpose and separation

Test whether fixed retained semantics support evidence-grounded interpretations or justified abstention when the target observations are facts rather than supplied materiality/evidence-quality labels. Outcome agreement without adequate factual reasoning is not support for the hypothesis.

This protocol operationalises only the activated brief. It does not adopt D-099 semantics, revise historical models/evidence, create thresholds, change runtime/product/UX/Copilot behavior, collect participant data, admit live inputs, or authorise financial activity. NO CROSS-LANE IMPACT.

The three permitted research outputs remain this protocol, the reviewer instrument, and the later readout. There is no readout yet. Export copies are handoff conveniences, not additional authority. This preparation does not run the evaluation cohort or close the nested/parent ticket.

## 2. Source and instrument provenance

The reviewer-facing model section is copied byte-for-byte from §2 of the retained D-098 instrument, including the function definitions, symbols, outcomes, ordered rules, and evidence vocabulary. The new case protocol replaces the old target-materiality declaration convention only for this new eight-case instrument. Source hashes below bind the preparation inputs; the instrument hash is recorded after methods preflight and final lock.

| Source | SHA-256 |
| --- | --- |
| `docs/ops/HEDGR_STATUS.md` | `6dabbdddaa9707b32ad5002e04cfa4e23589695aa754a7bc96bbe269c6da6c5f` |
| `AGENTS.md` | `bab385999febcf6841f97a1d5f06a211ac60d4ad47ec57c3e2d2f51d6f9690df` |
| `docs/ops/stability-engine/research/HEDGR_STABILITY_REASONING_INDEPENDENT_RETEST_INSTRUMENT.md` | `0415084d50a3056e8d8faa0b9f532bc930271659391c3ff510ac9f1072c7bc43` |

**Instrument version:** 1.0. **Final instrument SHA-256:** `e88c9cdcd1d844e996c8b912fdf92756e036bf4c8070c0ec7dcdc4f1c4e4ad47`. **Protocol lock:** the final file bytes are fixed in the preparation commit and separately hashed in the external coordinator release receipt; this file does not contain its own recursive digest. No reviewer exposure occurred before this lock. Any subsequent substantive change requires return to the pre-exposure controls; no post-exposure instrument revision is authorised.

## 3. Preregistered design and fixed order

Eight fictional cases in four pairs. No source cases are replayed and no old results are incorporated. Each pair changes only its decisive evidence field; all other case facts, horizon, model, and controls are held constant. Local fact IDs and opaque case IDs differ mechanically. No randomized experimental comparison with D-098 or statistical sample independence is claimed.

| Family | Fully specified case | Evidence-variation case | Fixed variation |
| --- | --- | --- | --- |
| F1 access timing | SX-07 | SX-04 | Day 2 redemption timing record present versus not supplied; settlement entry unchanged. |
| F2 nominal integrity | SX-02 | SX-05 | Same 100-unit assessment dated after versus before the intervening events. |
| F3 essential-cost transmission | SX-06 | SX-01 | T1 stock denomination V supplied versus omitted; quantity/cost/FX facts unchanged. |
| F4 flow continuity | SX-03 | SX-08 | Finalized continuity record supplied versus omitted; isolated first receipt unchanged. |

Opaque presentation order is SX-01 through SX-08. Every evaluator receives identical bytes in that order. Pair identities and this table are withheld. Seeing both members may still cue missing-evidence patterns; preserve this limitation in the eventual readout.

## 4. Factual dependencies and adjudication reference — withheld

This is a preregistered research reference, not ground truth. The methods preflight must examine whether each conclusion is actually supported under unchanged definitions. A later reasoned disagreement can expose a reference or instrument defect and must not be overwritten to make the cohort agree.

| Case | Reference vector / overall outcome | Fact-to-interpretation basis | Alternative reading or missing basis to preserve | Prohibited inference |
| --- | --- | --- | --- | --- |
| SX-01 | `= / = / ? / =`; insufficient evidence for a single overall direction | Fact c omits the stock denomination. With b's 100 units and 10 V basket, 100 V covers ten baskets; 100 U corresponds to 50 V at T1 and covers five. The packet cannot identify which exposure is present. | Reviewer may identify denominator ambiguity without doing the arithmetic. Do not require a particular phrase or numerical materiality cutoff. | Carrying the T0 denomination forward by assumption; treating the FX move alone as deterioration; treating missing evidence as no change. |
| SX-02 | `= / + / = / =`; more stable | Day 2 amount realisable is zero; Day 4 assessment after the intervening event establishes 100, the full nominal amount. Other functions are expressly controlled. | Require an explanation for why complete restoration matters under F2, not a new generic haircut threshold or a claim of absolute safety. If retained semantics still appear insufficient, retain that reasoned challenge. | Mapping nominal restoration into exit, purchasing power, product safety or a portfolio action. |
| SX-03 | `= / = / = / =`; materially unchanged | The completed T0 and T1 windows each document three inflows of ten before three essential outflows of ten; no reversals or extra flows. Current-window coverage is unchanged. | The evidence supports the observed windows only. Preserve a reasoned challenge about whether the retained F4 concept needs stronger reliability evidence even for this horizon; distinguish that model-meaning question from an unsupported forecast. Do not automatically classify such a challenge as reviewer error. | Inferring future income security or treating completed-cycle evidence as a forward guarantee. |
| SX-04 | `? / = / = / =`; insufficient evidence for a single overall direction | The only designated resource was usable at T0; at T1 only its transfer is established. Fact c supplies no redemption/usable date relative to the obligation. | Evidence status may be described as missing/unknown, with current settlement evidence separately retained. | Equating transfer completion with usable access or importing SX-07's timing. |
| SX-05 | `= / ? / = / =`; insufficient evidence for a single overall direction | The 100-unit observation is Day 1, preceding T0's Day 2 zero assessment and the Day 3 reopening. No post-event amount is supplied. | “Stale for this current question” or “missing current amount” are both reasoned descriptions if tied to chronology, not age alone. The records describe different dates, not necessarily simultaneous conflicting evidence. | Using the pre-event 100 as T1 recovery; assuming Day 2 zero persists after reopening; resolving the missing assessment by a universal freshness cutoff. |
| SX-06 | `= / = / = / =`; materially unchanged | Both observation points hold 100 V against a 10 V essential basket. The U/V move has no stock mismatch in the supplied T1 denomination. Other functions remain controlled. | An unchanged result is bounded to these observations and says nothing about broader environmental risk. | Treating a headline FX movement as a fifth function or as universal improvement/deterioration. |
| SX-07 | `− / = / = / =`; less stable | The only resource could meet the obligation at T0 but is first usable on Day 5 at T1, after the end-of-Day-3 due point. Access fails within the declared horizon without nominal loss. | Materiality rests on inability to fund the obligation by its due point, not a claim of an observed default or an invented number-of-days threshold. Keep the nominal integrity/access distinction. | Treating full nominal value or completed transfer as timely access; recommending borrowing or another action. |
| SX-08 | `= / = / = / ?`; insufficient evidence for a single overall direction | One completed receipt covers only Cycle 4. No continuity/reversal/additional-flow record is supplied for the rest of T1; three-cycle coverage cannot be inferred. | Missing entries cannot be read as zero. A reviewer can preserve the one known receipt without declaring the full three-cycle direction. | Treating a single receipt as a completed recurring flow, assuming future payments, or filling the flow gap from the controlled stock state. |

**Required control coverage:** SX-07 provides supported worsening; SX-02 supported improvement; SX-03 and SX-06 supported unchanged outcomes. The preflight must challenge these supports rather than accept the table on author assertion. If the controls cannot be constructed under unchanged semantics, stop preparation and return the gap before exposure.

No dedicated F1/F4 causal-attribution experiment is added. Explicit stock/flow controls prevent scope expansion. The retained BR-05 caveat remains unresolved; nothing here disposes it. Missing evidence, temporal relevance and transmission are the limited tested dimensions; general materiality/freshness/conflict-resolution competence remains unproven.

## 5. Distinct methods preflight

**Status:** PASS FOR INSTRUMENT PREPARATION. No evaluation reviewer has seen the instrument.

**Reviewer:** distinct unblinded methods agent `methods_preflight`, separate from the author; excluded from the future evaluation cohort. Review performed 14 September 2026 on the eight-case instrument and coordinator protocol, with a correction check before lock.

**Recorded findings and resolution:**

- Low: literal model-copy claim contained an extra trailing blank line. Removed; the methods reviewer independently verified exact §2 bytes on recheck.
- Low: the access reference overstated a resource designated for an obligation as the only available resource. Both access cases now explicitly state that no other resource is available within the horizon; the methods reviewer independently verified the identical correction and preserved pair isolation. The reference is also narrowed to inability to fund by the due point, rather than an observed default; that final wording was verified by the author before lock.
- Retained limitation: the F4 control supports observed coverage in completed windows only. A reasoned objection about the retained meaning of reliability must remain visible and is not automatically a reviewer error. No future reliability is established.

**Final independent verdict:** PASS for instrument preparation, with the stated F4 and pairing limitations. The reviewer verified eight cases/four pairs, one-field evidence variations, date/arithmetic coherence, required control opportunities, model fidelity, response/attestation requirements, and proposed handling controls. This does not verify actual launch isolation, external collection, or research results. No qualifying evaluation submission was produced.

The preflight reviewer is independent of the instrument author and excluded from the three-person evaluation cohort. This is an unblinded methods inspection of the full instrument, this reference, the fixed source model, and the approved brief. It produces no qualifying evaluation submission.

Review factual sufficiency, one-field pair isolation, model/definition fidelity, date/quantity consistency, answer leakage, justified improvement/worsening/unchanged controls, over-abstention detection, and exact response/attestation requirements. Report concrete defects and limits. Resolve defects before final lock; no evaluation may begin on an unresolved preflight failure.

The reviewer, inspected version, findings, resolutions and final verdict are recorded above. Governance activation QA from the earlier ticket is not this methods preflight.

## 6. External operator handoff — coordinator only

### Before any evaluator receives the packet

1. Confirm the active authority remains unchanged and this protocol's preflight is complete. Use the finalized instrument only; never send the old D-098 instrument as the new test.
2. Fix and hash the hypothesis, case order, pair map, response schema, reference and rubric before exposure. Preserve the exact locked files. Record commit/version and hashes; do not rely on a mutable link or a conversation summary.
3. Prepare exactly three fresh ephemeral evaluator environments, separate from author, preflight reviewer and one another. The single substantive input is the finalized reviewer instrument. Do not give evaluators this protocol, the proposal, authority files, old research, D-099, prior outcomes, or expected answers.
4. Verify isolation from actual launch configuration and process evidence as well as reviewer declarations: no inherited conversation, user/project rules or task memory; no repository/working-directory access; no browsing, connectors, external retrieval, other files or submissions. Record the unavoidable base runtime/model and its identity; task-specific instructions, workspace context and memory must not be inherited. A new chat or outside-repo directory alone is insufficient evidence.
5. Do not use an existing Hedgr conversation, shared-project chat, or a fork that inherits context. If the selected service cannot establish the required isolation, stop before launching evaluations and return for Founder disposition. This protocol does not silently substitute weaker platform controls.
6. Assign coordinator-side labels A, B and C to environments and output files without changing the instrument bytes. Record the instrument digest for each launch and confirm all three match. Do not add conversational hints, restate intended results, identify pairs, or answer follow-up scenario questions.

### Collection and lock

Each reviewer returns one complete raw response. Capture it directly to an isolated output location inaccessible to other reviewers. Avoid a collection workflow that requires the supervisor to read completed answers while other submissions remain unlocked. Use opaque file receipt, completion state and hashes instead of inspecting content.

After **all three** outputs are complete, hash and lock each original before opening any for comparison. Record completeness and digest using the capture process; validate substantive response completeness only after the joint lock. A missing or interrupted output is a procedural issue, not permission for a replacement reviewer or restart.

Record the full original text and hashes later in the single approved readout. No answer polishing, correction rounds, cross-reviewer discussion, consensus negotiation, automatic rerun, replacement cohort, extra case, instrument change or model revision. Preserve contamination/procedural failure separately from qualifying evidence and return for Founder disposition. Do not destroy or replace an unfavorable or inconvenient record.

### Minimum coordinator manifest

Complete these fields from observable process evidence, not assumption:

| Field | Recorded value |
| --- | --- |
| Final protocol version and digest; instrument version and digest | Version 1.0; instrument digest in §2; final protocol digest in coordinator release receipt |
| Methods reviewer / inspected version / disposition | Distinct methods preflight; version 1.0 before lock; PASS with recorded corrections and limits |
| Evaluator A / B / C runtime and model identities | Not launched |
| Fresh-root/session creation and isolation settings/evidence | Not launched |
| Permitted input manifest for each evaluator | Final reviewer instrument only; verify before launch |
| Proof all three instrument digests match | Pending launch |
| Receipt/completion times and raw output locations | Pending external run |
| Each raw submission digest and lock time | Pending external run |
| Time first submission content was opened for comparison | Must follow all three locks |
| Deviations / contamination / missing response | None observed; no run yet |

Keep the manifest in this protocol and submission/evidence material in the approved readout. Export-side administrative checklists can accompany coordinator handling, but do not add a fourth tracked research artifact.

## 7. Fixed comparison rubric and disposition limits

Compare each response using actual cited facts, temporal/transmission reasoning, evidence-status reasoning, justified materiality or abstention, retained-rule application, invented facts/thresholds, and treatment of the paired evidence variation. The response schema is in the instrument. Agreement alone is not a pass; unsupported agreement and blanket abstention both require findings.

Distinguish reviewer error, instrument ambiguity, a missing model criterion, and a defective preregistered reference. Preserve reasonable dissent. If the reference is later defective, retain it unchanged with a post-lock critique; do not repair it and recast the original run as preregistered agreement.

Delivery acceptance means inspectable source fidelity, lock/provenance, eight cases, complete original submissions, item-level comparison and one Founder-reviewable disposition. There is no aggregate score, pass percentage, hidden weighting, statistical generalisability, or human reliability claim. Same-runtime-family reviewers establish procedural separation only. Pair exposure may cue missing-evidence patterns and cases are not independent statistical samples.

Possible proposed dispositions remain RETAIN as bounded non-canonical research, REVISE/RETEST for a precisely identified missing criterion, REMOVE as a proposal only, or ESCALATE/inconclusive for ambiguity or procedural defects. Any decision to revise, rerun, accept the model, close the parent or translate into a product requires separate authority. No participant-comprehension, safety, adequacy, financial truth or execution claim follows.

## 8. Release and stop boundary

Preparation ends with a methods-checked, locked reviewer instrument and a coordinator protocol. The Founder conducts the external evaluation handoff; no evaluation sessions are launched by this preparation task. Release readiness covers document content and methods preflight only; operator isolation still has to be demonstrated at launch.

Stop the affected work on a needed new definition/threshold, new case or cohort, personal data, live input, runtime/architecture mapping, cross-lane change or inability to prove isolation. Preserve records. Required governed-delivery QA, local validation, hosted checks and permanent-main provenance apply; they do not validate the research model. The nested ticket remains open pending the eventual readout and separate Founder disposition.
