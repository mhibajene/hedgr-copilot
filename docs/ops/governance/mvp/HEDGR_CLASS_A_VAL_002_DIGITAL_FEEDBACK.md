# CLASS-A-VAL-002 Digital Feedback v1 — approved self-guided preparation

**Status:** APPROVED CONTENT under `CLASS-A-VAL-002-WEEKEND-PREP-001`. The separate Form is published and accepting responses. On 2026-09-21 the Founder reported completed human phone rehearsal and explicitly released this digital pulse for Founder-owned circulation; see the release record below. No D-number is assigned. The moderated v2.1 and historical Forms/data remain preserved.

**Timing:** The Founder reports a rehearsal Form time under five minutes. No journey time or total has been supplied to the repository. The earlier approximately 3-minute Form / 5–8-minute total targets are design targets, not participant-facing promises.

## Participant flow

Participant-facing title: **Hedgr — quick experience feedback**.

Opening: “Please try the Hedgr experience, then tell us what you understood. This is a research simulation. No real money is used or moved. Do not enter personal or real financial information. You can stop at any point; feedback about getting stuck is useful too.”

Use separate start and resume links, on the exact verified deployment:

- **Start once:** `https://hedgr-copilot-frontend.vercel.app/orientation`. Its existing `Enter Hedgr` continuation is `/dashboard-synthetic-journey?reset=1`, verified in `apps/frontend/lib/narrative/orientation-surface.ts`. Use this for initial entry only.
- **Return to your visit:** `https://hedgr-copilot-frontend.vercel.app/dashboard-synthetic-journey`. It omits reset. Put this distinct link with the feedback Form for anyone switching tabs. Do not send them through orientation/Enter Hedgr again to resume.
- **Feedback:** [published responder Form](https://docs.google.com/forms/d/e/1FAIpQLSfkmopt1Trv3sY3ptO38i_vP8cjALsJxpREmlzahFD1o5ChzA/viewform?usp=header), separately reachable even when someone cannot load or finish the journey. Do not circulate its editor or owner preview link.

Verify both exact URLs and same-browser storage behaviour on the intended production build before circulation. A messaging in-app browser and the system browser may hold different state; resume in the same browser. A resume link cannot restore state that the participant cleared or opened in a different browser. Do not promise otherwise.

Do not prepend About, an intended category, a pitch or a product explanation. Preserve normal visible simulation disclosures.

**Approved task card:**

> 1. Open **Start once**, then select **Enter Hedgr**. Explore the Home screen.
> 2. Try a simulated deposit using the amount below for the display currency shown. Keep that currency for this visit.
> 3. Try a simulated withdrawal of **USD 2**.
> 4. Look at the **Activity** record, then return **Home**. Explore any other sections you want.
> 5. Open the feedback link. If something stops you, leave it there and tell us. If you switch back to the experience, use **Return to your visit** above.

| Display currency shown | Simulated deposit amount to enter |
| --- | ---: |
| ZMW | 100 |
| KES | 650 |
| NGN | 7500 |
| GHS | 75 |
| PHP | 280 |

The card supplies input amounts but no resulting or ending balance. Before distribution, QA must verify that initial entry resets to USD 0/empty Activity and that all listed amounts produce the intended common USD journey. The selected display preference survives reset; the amount must match the currency actually shown. If the task card proves too cumbersome in rehearsal, choose a single explicitly identified synthetic currency fixture for a narrower pass and revise this proposal accordingly; do not silently substitute another journey.

Opening Activity is task-directed; its successful location cannot be described as independent discovery. Do not require opening Planning targets to manufacture exposure. W05 explicitly records non-exposure. Currency-context exposure is also not guaranteed merely because a participant reached Home.

## Approved questions and implementable sections

Five physical sections. No quiz, correctness feedback or answer keys. Keep order fixed. A neutral stage/access question comes first; all exposed respondents then see two open questions before any recognition options. “Not sure” is an acceptable response to required text; no minimum length. Do not collect contact details or real financial information.

Google Forms branching is set on W01, the last and only single-choice question in Section 1. To route without asking the stage twice or relying on stored answers, duplicate the two open questions in mutually exclusive Sections 2 and 3. Stable semantic IDs remain W02/W03; physical builder IDs are W02-C/W03-C for the completed branch and W02-P/W03-P for the partial branch. Each participant sees each open question once. Merge those two physical columns by branch into their semantic IDs in analysis; never concatenate them as four answered questions.

**Counts:** 12 physical question items: 11 required flags plus one optional. Each complete respondent sees 10 questions, nine required plus one optional. Each partial/voluntary-stop respondent sees five questions, four required plus one optional. Each no-access respondent sees three questions, two required plus one optional. Duplicated hidden groups are not extra participant questions.

### Section 1 — Your visit (W01 only)

**W01 — Required; single choice; last question in section.**
“How far did you get in the experience?”

- I completed the deposit, withdrawal and Activity steps and returned Home → Section 2
- I tried, but could not complete the deposit → Section 3
- I completed the deposit, but could not complete the withdrawal → Section 3
- I completed both, but could not review Activity or return Home → Section 3
- I looked around or chose to stop before finishing those steps → Section 3
- I could not open or enter the experience → Section 5

These choices distinguish reported task failure from voluntary stopping/browsing and complete visits without asking participants to interpret product meaning. The three reported blocking stages and the voluntary-stop route remain separately identifiable from the W01 value. An access failure can go straight to priority/comment without guessing a purpose or usefulness.

### Section 2 — Your first impression (completed branch only)

**W02-C — Required; short answer. Semantic ID W02.**
“In your own words, what do you think Hedgr is for?”

Help text: “A short sentence is enough. ‘Not sure’ is fine.”

**W03-C — Required; short answer. Semantic ID W03.**
“In what situation, if any, could what you saw be useful to you?”

Help text: “A short sentence is enough. ‘None’ or ‘Not sure’ is fine.”

Section footer: **Go to Section 4**, skipping Section 3. Neither open question needs or supports answer-based branching.

### Section 3 — Your first impression (partial/browsing branch only)

**W02-P — Required; short answer. Semantic ID W02.**
“In your own words, what do you think Hedgr is for?”

Help text: “A short sentence is enough. ‘Not sure’ is fine.”

**W03-P — Required; short answer. Semantic ID W03.**
“In what situation, if any, could what you saw be useful to you?”

Help text: “A short sentence is enough. ‘None’ or ‘Not sure’ is fine.”

Section footer: **Go to Section 5**, skipping the recognition questions. Partial participants are not required to infer features they may never have reached.

### Section 4 — What you understood (completed branch only)

**W04 — Required on this path; single choice.**
“Which best describes the example you finished?”

- A simulated deposit worth USD 5 and a simulated withdrawal of USD 2 left USD 3, with both events in Activity
- A real payment was received and a real payout was made
- The simulated deposit was split into separate planning balances
- The simulated balance stayed at USD 5
- I saw a different result
- I am not sure

This is prompted reconciliation, not an unaided arithmetic or navigation test. “Different result” continues through the remaining recognition items without special branching, with optional detail at W10. If live QA shows the distributed route cannot reliably begin at zero, do not use this fixed-amount question until that mismatch is resolved; avoid marking inherited state as misunderstanding.

**W05 — Required on this path; single choice.**
“What did Now, Reserve and Growth mean to you?”

- Different purposes for planning ahead
- Separate balances that my money was divided into
- Investments that were already earning returns
- Instructions about what financial action I should take
- I saw the names but was not sure what they meant
- I did not open or see this part

“Purposes for planning ahead” is recognition evidence only. This combines former R10–R12 coverage and loses separate role-specific/percentage-transfer testing. Do not infer understanding of the unopened percentages from the first answer.

**W06 — Required on this path; single choice.**
“What did choosing a display currency do, as you understood it?”

- Changed how the simulated USD balance was shown as a local estimate
- Converted money into that currency
- Showed that Hedgr held money in that currency
- Confirmed Hedgr was available in the associated country
- I was not sure what it did
- I did not choose or notice a display currency

**W07 — Required on this path; single choice.**
“What did a higher local estimate in the currency comparison tell you?”

- The illustrative currency rate gave a different local estimate of the same USD amount
- The money had earned a return
- The money could buy more goods or services
- The money was protected against losing value
- That was an amount I could receive by converting money
- I saw the comparison but was not sure what it meant
- I did not see the comparison

This is a targeted recognition probe. Single choice captures the selected interpretation, not every belief a participant may hold. “I did not see” is excluded from comprehension denominators and reported separately.

**W08 — Required on this path; checkboxes.**
“Which of these, if any, did you believe Hedgr actually did during your visit? Select all that apply.”

- Recorded simulated deposits and withdrawals
- Moved real money
- Held money on my behalf
- Invested money or earned a return for me
- Told me which financial action I should take
- None of these
- I was not sure

Help text: “Choose ‘None of these’ or ‘I was not sure’ on its own.”

No automatic correction or explanatory message. If the Form platform cannot enforce exclusivity, retain inconsistent selections verbatim and classify them as ambiguous; do not silently repair them or count them as comprehension. This keeps financial-action/advice concerns visible, but no response alone establishes actual capability or an independent agency construct.

Section footer: **Go to Section 5**.

### Section 5 — What should improve next? (all branches)

**W09 — Required for everyone; single choice.**
“What is the most important thing to improve before you would try this again?”

- Make the purpose or explanations clearer
- Make the steps or navigation easier
- Fix something that did not load or work
- Something else
- Nothing stood out to improve
- I would not want to try it again
- I am not sure

This is a stated priority, not a commitment to return or demand. W06–W08 retain domain-specific currency/financial-boundary signals; W10 can identify the exact unclear explanation without another long option list. “Something else” does not force typing; W10 is available to everyone.

**W10 — Optional; short answer or paragraph with no minimum length.**
“What one thing should we change or understand better? If something blocked you, felt confusing or sounded too certain, tell us what happened.”

Section footer: **Submit form**.

Completion: “Thank you. Your feedback will help decide what to investigate or improve next. This was a research simulation; no real money was used or moved.”

## Coverage and deliberate losses

| Needed information | Candidate capture | Evidence limits / removed burden |
| --- | --- | --- |
| Product purpose | W02 | Post-product open language; no before/after identity comparison. |
| Relevance and possible next use | W03 | Stated hypothetical usefulness, not observed behaviour, demand or willingness to pay. |
| Completion and early exit | W01, W09, W10 | Self-report; non-responding abandoners remain invisible. |
| Balance / Activity reconciliation | W04 | Directed task and recognition; no prediction, independent route finding or transfer test. |
| Planning / balances / investment / advice | W05, W08 | Combines constructs; no separate role-by-role understanding or percentage transfer. |
| Display currency / conversion / holdings / availability | W06 | Recognition after open answers, with explicit no-exposure option. |
| FX versus earnings / purchasing power / protection / conversion | W07 | Single selected interpretation; not all misconceptions independently tested. |
| Simulation / custody / real execution / advice | W08 | Prompted boundaries; preserve contradictory selections, not a composite pass score. |
| Actionable next step | W09, W10 | Priorities and examples, not prioritisation authority or demonstrated user behaviour. |
| Confidence, reasoning, uncertainty, credibility, overcertainty | W02/W03 may surface spontaneously; W10 optional | Direct confidence scale, detailed reasoning probes, separate certainty question and credibility-timing observation removed. No claim those constructs remain comprehensively measured. |
| Delayed recall / transfer / secondary unavailable-data reasoning | Not measured | Separate five-minute delay, five recall probes and exception scenario omitted. Cannot substitute for moderated parent criteria. |

Former R01 general finance-app comfort is omitted. No demographics or infrastructure-familiarity question is added. Prior exposure cannot be recovered from anonymous answers: report known recruitment exposure separately where already available, and otherwise mark it unknown. If participant-level new-versus-repeat or About exposure is essential to the decision, replace a less essential question or explicitly increase the count; do not pretend metadata exists or add uncounted participant questions. Avoid pooling prior participants and first-time respondents as equivalent.

## Exposure and mobile controls

- Record immutable build/deployment and instrument version for the circulation batch. Preserve the old questionnaire, old protocol, original historical Form and its responses. Do not overwrite historical records or pool versions.
- Keep recognition options in Section 4, after Section 2 for the completed path, but recognise that ordinary Forms may allow Back and editing before submission. Instructions alone do not lock first answers. W02/W03 are intended pre-recognition capture, not provably locked unaided records; do not claim otherwise. A separate immutable first-answer collection would add steps and is not silently introduced here.
- Self-guided observation cannot assign U/D/N/M reliably. Mark support/exposure unknown unless directly observed; record any known help or prior exposure separately. “Open response” does not mean “unaided.”
- Try actual iPhone Safari and Android Chrome, enlarged text, in-app-message browser handoff, back navigation, tab switching and returning after interruption. This is especially relevant because the participant alternates between journey and Form on one phone.
- Verify anonymous signed-out access and no unintended sign-in, email capture, quiz scoring, public response summaries or request for personal/financial data. Preserve the intended privacy settings; do not infer them from the old verification.
- Provide a reachable feedback link even when the journey fails. Early-exit branching must permit submission. Recognise that Google Forms submitted responses cannot measure silent abandonment without separate authorised instrumentation; do not report completion rate without a defensible denominator.
- Test every W01 option and all three section paths (1→2→4→5; 1→3→5; 1→5), both physical pairs of W02/W03, each not-seen/unsure option, W08 contradictory selections, mobile keyboard behaviour, required-error recovery, last page and completion text. Technical QA submissions, if separately authorised, must be clearly segregated and removed from participant analysis rather than counted as research.
- Do a human non-participant rehearsal; measure journey and Form separately. A three-minute Form/five-to-eight-minute combined target is not a claim until measured. Include someone unfamiliar with the interface if possible; an experienced operator's time is insufficient evidence of first-time burden.

## Reporting and next-step use

Summarise recurring W02 interpretations, W03 situations or lack of relevance, W09 priorities and concrete W10 examples. Separately list non-exposure, uncertainty, partial completion and potential financial-boundary misconceptions. Quote first responses faithfully with redaction; do not replace them with later explanations. A reported safety/financial misconception warrants investigation of its source, not automatic user-error classification.

Report denominators per question and per exposure; no pooled score or pass percentage. Keep the parent moderated acceptance work open. This pulse is approved for technical preparation only; publication/distribution remains paused pending the §7a release conditions; it does not change financial capability, parent thresholds or other lanes.

## Sources checked

- docs/ops/governance/mvp/HEDGR_CLASS_A_VAL_002_QUESTIONNAIRE_V2_1.md
- docs/ops/governance/mvp/HEDGR_CLASS_A_VAL_002_PARTICIPANT_PROTOCOL.md, controlling 2026-09-11 amendment
- docs/ops/governance/mvp/HEDGR_CLASS_A_VAL_002_FORM_REFINEMENT.md
- docs/ops/governance/mvp/HEDGR_CLASS_A_VAL_002_FORM_PROTOCOL_RECONCILIATION.md
- docs/ops/HEDGR_STATUS.md §7/§7a
- Coordinator's current mobile-production observation of collapsed Planning targets (reported during this review; not independently re-observed by this reviewer).

## Revision note — independent technical reviewer corrections

The revision places stage/access classification first, gives no-access a direct priority/comment route, separates failed steps from voluntary stopping, and uses five Google Forms sections with mutually exclusive duplicated open groups. All participant paths and physical-item counts are explicit. W09 is reduced from ten to seven options. Start and resume links are distinct so returning from the Form does not intentionally reset the journey. Exact input tasks omit the ending balance. Approved for unpublished technical preparation. At preflight, no live edits or distribution had occurred; the earlier interrupted construction is retained below as history. Preflight clarifies the completed W01 option includes returning Home and renders the NGN input as 7500 for direct entry into the existing field; numerical fixture and evidence constructs are unchanged.

## Implementation evidence

### Saved draft and preview verification — 2026-09-18

The existing Form was completed in place; no duplicate was created. [Editor](https://docs.google.com/forms/d/1nIqYfCEnltude714mJgrCM_b5LKtWM2ybcaIFPhPGgc/edit); [owner preview](https://docs.google.com/forms/d/1nIqYfCEnltude714mJgrCM_b5LKtWM2ybcaIFPhPGgc/preview). Form ID: `1nIqYfCEnltude714mJgrCM_b5LKtWM2ybcaIFPhPGgc`. This preview is for internal rehearsal, not a verified public responder link.

- Saved DOM readback matches all 12 approved titles, option sets/order, types and help text: 11 required flags plus optional paragraph W10. The Form opening also includes the separate no-reset return URL and same-browser/do-not-re-enter guidance. The task card above accompanies the future invitation; it does not disclose the ending balance.
- W01 maps to sections 2/3/3/3/3/5. Section 2 goes to 4, section 3 to 5, and section 4 continues to 5. Preview traversed every stage choice; required totals are 9/4/2. An initially unsaved no-access destination was caught, corrected and retested to reach section 5 directly.
- Required-error recovery was checked at the stage, open-response and recognition pages. Both open-response branches accept “Not sure”/“None”; non-exposure and uncertainty choices remain selectable. Contradictory W08 selections remain possible and proceed to the final page, as the analysis protocol requires. W10 stays empty and optional on the final page.
- Quiz, email collection, limit-one/sign-in requirement, response editing/copies, public summary, submit-another link and all question/option shuffling are off. Progress is on; default autosave remains. All per-card response-validation menus are off, including text-length/numeric limits. No spreadsheet is linked. The exact approved confirmation message is saved.
- Drive reports all changes saved; the Responses tab reports **0 responses** and the preview reports **Not Published / not accepting responses**. No QA or participant response was submitted. Preview disables Submit, so final W09 error behaviour, actual submission and displayed completion text were not exercised. Signed-out responder access remains a release-stage check; no access claim is inferred from this owner preview.
- All four distinct page layouts were inspected at a requested 390 × 844 browser viewport and captured; labels/options wrap without horizontal clipping. This is browser emulation, not a human phone/keyboard or messaging-browser rehearsal. Timing remains unmeasured.
- Distinct verifier `/root/weekend_verifier` independently compared the saved card/routing readback against canon and reviewed settings, zero-response state and mobile screenshots: qualified technical QA PASS. The qualification preserves the preview/submission/access and human-rehearsal limits above.

Evidence is retained in `/Users/musalwa/Documents/Codex/2026-09-17/hedgr-weekend-qa/verified-2026-09-18/`: `form-editor-cards.json`, `form-editor-routing.txt`, `form-question-menus.json`, `form-settings.txt`, `form-final-response-state.txt`, `form-preview-*.txt`, `form-partial-branch-results.json`, `form-contradictory-checkboxes.txt`, `form-contradiction-final.txt` and `form-mobile-*.png`. Unsubmitted test answers were cleared after QA. The moderated v2.1 Form and historical Forms/data were not edited.

The dated evidence above describes the unpublished 2026-09-18 preflight. The later publication and Founder release disposition are recorded below; this older preflight does not describe current Form state. The earlier interrupted construction record remains history.

### Publication and Founder release disposition — 2026-09-21

Founder Musalwa Hibajene reports that the human phone rehearsal is complete and expressly states that “ready for circulation” is the release disposition for this separate Digital Feedback v1 pulse. The Founder retains participant selection, invitations, circulation and response custody; agents are not authorised to contact participants, submit QA responses or handle raw participant responses. This disposition does not release the separate moderated v2.1 study or close parent `CLASS-A-VAL-002`.

The Form editor was inspected on 2026-09-21 and visibly showed **Published**, **Accepting responses** enabled and **Anyone with the link** as the responder audience. Its Copy responder link control supplied the [live responder URL](https://docs.google.com/forms/d/e/1FAIpQLSfkmopt1Trv3sY3ptO38i_vP8cjALsJxpREmlzahFD1o5ChzA/viewform?usp=header); that page opened to W01 and the approved research-simulation opening in the owner session. The same responder URL then opened in a fresh Chrome Guest window with W01 available and only an optional sign-in prompt to save progress. The temporary Guest window was closed without entering or submitting an answer. A submitted confirmation was not independently exercised. The Founder reports a Form rehearsal time under five minutes and a passed same-browser resume. A journey time and messaging-browser handoff result have not been supplied to this record; do not substitute the earlier design targets for observed timings or participant promises. The 2026-09-18 zero-response observation is historical; no current response count is claimed. Preserve the approved 9/4/2 routing and content for the circulation version.

### Earlier interrupted construction — historical

**2026-09-18: partial external construction, NOT READY.** One separate draft was created at [the new Form editor](https://docs.google.com/forms/d/1nIqYfCEnltude714mJgrCM_b5LKtWM2ybcaIFPhPGgc/edit), ID `1nIqYfCEnltude714mJgrCM_b5LKtWM2ybcaIFPhPGgc`. Its title and approved opening were entered; W01's title was entered, but Forms automatically selected a linear scale. W01 must be changed to the approved single-choice type and supplied its six options. The remaining cards, five sections, required flags, branches, settings and preview traversal are not implemented or verified. Do not treat the partial draft as this instrument.

The editor reload retained the draft and displayed **Publish**, confirming it remains unpublished. No QA response was submitted. Existing v2.1 and historical Forms/data were not changed. The browser became unresponsive to click/keyboard actions after a local synthetic restart confirmation; text entry and read-only page inspection still worked. Documented browser recovery did not restore the controls. The Founder has been asked to dismiss/close the stalled local QA tabs. Native Codex app control was unavailable under the tool safety restriction. Do not create a replacement Form when resuming; continue the existing ID above.

Canonical question wording/routing and the matching digital protocol are ready. Local construction aids `/tmp/hedgr-self-guided-form-spec.json` and `/tmp/hedgr-digital-protocol-amendment.md` were independently checked against this approved content. They do not prove the external Form matches it.

Form completion, settings/branch readback, preview links, rendered shipped-build QA and technical closeout remain outstanding. Human phone timing and explicit distribution disposition remain separate release conditions. Publication/distribution stays paused.
