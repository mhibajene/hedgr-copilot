# CLASS-A-VAL-002 Participant Protocol and Evidence Capture

**Status:** Active research instrument for the sole active `CLASS-A-VAL-002` ticket

**Execution class:** Class A product validation; visibly synthetic; non-executing for customer money

**Authority:** `docs/ops/HEDGR_STATUS.md` §7 / §7a and §143; Internal D-037

**Non-authorization:** This protocol does not authorize live money movement, custody, provider or banking integration, production FX, settlement, payout, Stability Engine execution, Class B implementation, Evidence Register acceptance, gate clearance, participant-data collection beyond the bounded fields below, or a successor ticket. Interface completion and completed session records do not by themselves close `CLASS-A-VAL-002`.

## 1. Research decision

Determine whether target cross-border freelancers can understand Hedgr's stability proposition through the complete synthetic Dashboard → Deposit → Withdraw → Activity journey well enough for the Founder to decide whether to:

1. consider a one-market Class B feasibility proposal;
2. use one evidenced Class A presentation iteration;
3. reframe the proposition or target cohort; or
4. pause the lane.

No disposition is selected by this protocol.

## 2. Participant and data boundary

Recruit people who currently earn or invoice across borders and who match the target freelancer context. Geography is participant context only; it is not a launch-market, provider, rail, custody, stablecoin, or legal selection.

Do not collect or enter:

- legal names, account numbers, wallet addresses, government identifiers, or contact details in the application;
- real balances, transaction amounts, income, customer records, financial credentials, or regulated data;
- real bank, mobile-money, provider, rail, custody, or payout details.

Use a random participant code such as `P-001`. Keep any recruitment contact data outside the session record and outside the repository. Do not commit raw participant recordings or identifying quotes to the repo. A later redacted synthesis requires separate governed review.

## 3. Session setup

- Use the frontend in `NEXT_PUBLIC_AUTH_MODE=mock`, fixed/stub FX, and the local development environment.
- Clear `hedgr:ledger` and `hedgr:wallet` before each session.
- Start at `/dashboard?journey=class-a-val-002` with a zero balance.
- Keep the persistent `Simulation Mode — No Real Money` disclosure visible.
- Do not open Settings or Copilot during the primary journey.
- Use the default ZMW fixture amounts only as synthetic research data, not as launch-market evidence.
- Capture one desktop or mobile recording or a screenshot at each required checkpoint. App captures must contain synthetic data only.

### Required checkpoints

| Checkpoint | Expected synthetic state |
| --- | --- |
| Dashboard start | `$0.00`; Stability Engine posture visible; start-synthetic-deposit action visible |
| Deposit preview | `100 ZMW` shows `$5.00`; fixed preview is labeled synthetic and non-live |
| Deposit result | Local settled deposit fixture; `$5.00` available; no external account charge or movement claim |
| Withdrawal result | `$2.00` synthetic withdrawal recorded; no payout or settlement claim |
| Activity | One synthetic `+$5.00` deposit and one synthetic `-$2.00` withdrawal; both local fixture records |
| Dashboard return | `$3.00` total and both recent synthetic records |
| Secondary exception | `/deposit?journey=class-a-val-002&scenario=unavailable-data`; preview unavailable and Confirm disabled |

## 4. Moderator script

### Opening boundary

Read exactly:

> This is a research simulation. The balances, rates, deposits, withdrawals, and activity you see are local fixtures. Do not enter real financial or personal information. No real money can move in this session.

Ask the participant to think aloud. Do not explain Hedgr's proposition beyond visible product copy until the free-recall questions have been answered.

### Step 1 — Dashboard

1. Ask: “In your own words, what do you think Hedgr is intended to help with?”
2. Ask the participant to identify the primary action without opening any disclosure.
3. Ask: “What does Stable balance mean here?”
4. Ask: “How are Conservative yield and Reserve different from Stable balance and from each other?”
5. Ask: “What does the Stability Engine posture tell you?”
6. Ask: “Do the target percentages show money that has already moved, or something else?”
7. Ask: “What is Review Snapshot for?”
8. Ask the participant to distinguish the current simulation status, fixture target date, and last viewed locally.
9. Ask: “Did any colour make a lane feel guaranteed safe, higher performing, urgent, active, or already approved?”
10. Ask the participant to open the consolidated simulation and target explanations, then ask whether the disclosure placement increased, reduced, or did not change confidence.

### Step 2 — Deposit

1. Ask the participant to start the synthetic deposit.
2. Enter `100` in the visible local-currency amount field.
3. Before confirming, ask: “What balance do you expect after this step, and why?”
4. Ask the participant to confirm and continue only when they are comfortable.
5. Ask: “What actually happened here? What did not happen?”

Expected interpretation: a local fixture record worth `$5.00` was created; no account was charged and no conversion or money movement occurred.

### Step 3 — Withdraw

1. Ask the participant to continue to Withdraw.
2. Enter `$2.00`.
3. Before confirming, ask: “What balance do you expect afterward?”
4. Ask the participant to confirm and describe the result.
5. Ask: “Does this screen prove that a bank transfer, payout, or settlement happened?”

Expected interpretation: the local fixture balance becomes `$3.00`; no payout, provider action, or settlement occurred.

### Step 4 — Activity and reconciliation

1. Ask the participant to continue to Activity.
2. Ask them to explain both records and reconcile the current balance without moderator help.
3. Ask: “What does ‘Completed’ mean in this screen?”
4. Ask the participant to return to Dashboard and verify the `$3.00` balance.

Expected interpretation: “Completed” means a local scenario step finished, not external financial finality.

### Secondary exception scenario

1. Open the unavailable-data scenario from the Deposit page.
2. Ask: “What can you still understand, what action is unavailable, and why?”
3. Ask: “What would you do next?”

Do not use the exception scenario as the primary proposition condition.

## 5. Comprehension and interpretation questions

Ask free recall first, then use the probe only if needed.

| Outcome | Free-recall question | Allowed probe |
| --- | --- | --- |
| Proposition | What is Hedgr intended to do for someone like you? | Is the main idea stability, payments speed, trading, or something else? Why? |
| Primary action | What did the page ask you to do next? | Which control appeared to begin the participant journey? |
| Stable balance | What does Stable balance mean here? | Is it the main holding lane, a performance result, or an action control? |
| Supporting lanes | How do Conservative yield and Reserve support Stable balance? | Did either feel like a separate product or something you could manage? |
| Ledger vs targets | What is the difference between the balance and the target posture percentages? | Did the percentages prove that funds had moved? |
| Engine posture | What did the Stability Engine section help you understand? | Was it information, an instruction, or an executed action? |
| Review Snapshot | What is Review Snapshot for? | Does it orient you, ask you to act, or report execution? |
| Temporal clarity | What is the difference between current simulation status, fixture target date, and last viewed locally? | Which describes the fixture and which is only stored in this browser? |
| Journey continuity | Walk me through what happened from the first balance to Activity. | How did `$5.00` become `$3.00`? |
| Simulation boundary | Did real money move anywhere in this session? | What on screen supports your answer? |
| Available action | What could you do in the primary condition, and what was blocked in the exception condition? | Why was Confirm disabled? |
| Colour interpretation | What, if anything, did colour imply? | Did colour imply guaranteed safety, performance, urgency, activation, or approval? |
| Disclosure consolidation | How did the consolidated explanations affect confidence? | Was important meaning easy to find without making the page feel repetitive? |
| Utility and trust | Would this proposition be useful enough to explore further? What increased or reduced trust? | What is the one thing you would need clarified before continuing? |

## 6. Evidence-capture template

Use one copy per participant. Record direct observations before interpretation. Quotes must be short, redacted, and non-identifying.

### Session metadata

| Field | Value |
| --- | --- |
| Participant code | |
| Date / timezone | |
| Device / viewport | Desktop or mobile |
| Moderator | |
| Build / commit | |
| Journey start URL | |
| Capture locator | Governed external locator or `not recorded`; never commit raw identifying media |
| Consent recorded outside repo | Yes / No — stop if No |
| Synthetic-only data confirmed | Yes / No — stop and quarantine notes if No |

### Outcome record

Score only as a compact retrieval aid; the participant's words and observed behavior are the evidence.

- `0` — incorrect, materially misleading, or unable to answer
- `1` — partial understanding or correct only after a probe
- `2` — clear, unprompted, and materially correct

| Outcome | Score | Free-recall response / observed behavior | Probe used? | Misconception or hesitation | Short redacted quote |
| --- | ---: | --- | --- | --- | --- |
| Explain the Hedgr proposition | | | | | |
| Identify the primary journey action | | | | | |
| Interpret Stable balance as the dominant holding lane | | | | | |
| Distinguish Conservative yield and Reserve as supporting lanes | | | | | |
| Distinguish ledger balance from informational targets | | | | | |
| Explain the Stability Engine posture | | | | | |
| Explain the role of Review Snapshot | | | | | |
| Distinguish current status, fixture date, and local viewing history | | | | | |
| Reconcile Dashboard → Deposit → Withdraw → Activity | | | | | |
| State that no real money moved | | | | | |
| Identify available and unavailable actions | | | | | |
| Deny unintended safety, performance, urgency, activation, or approval meaning from colour | | | | | |
| Confirm disclosure consolidation preserved confidence and findability | | | | | |
| Express usefulness and trust | | | | | |

### Journey record

| Check | Result | Evidence note |
| --- | --- | --- |
| Reached all four primary routes without an unavoidable block | Pass / Fail | |
| Predicted `$5.00` after the synthetic deposit | Pass / Fail | |
| Predicted `$3.00` after the synthetic withdrawal | Pass / Fail | |
| Reconciled both Activity records to `$3.00` | Pass / Fail | |
| Denied real deposit / payout / settlement meaning | Pass / Fail | |
| Understood the unavailable-data scenario | Pass / Fail | |
| Required moderator rescue | None / Minor / Material | |

### Participant judgment

| Question | Response |
| --- | --- |
| What felt most useful? | |
| What felt least clear? | |
| What increased trust? | |
| What reduced trust? | |
| Would you continue exploring this proposition? Why or why not? | |
| Single most important comprehension failure, if any | |

## 7. Decision mapping

Do not convert scores into automatic approval. Synthesize repeated observations and preserve disagreement.

| Evidence pattern | Future decision relevance | Non-authority boundary |
| --- | --- | --- |
| Proposition understood without prompting | Supports or weakens the case for continued Class A exploration | Does not establish demand or Class B feasibility |
| Ledger / target distinction understood | Tests shadow-accounting and fund-movement interpretation risk | Does not validate accounting, custody, or engine execution |
| Engine posture understood as informational | Tests the read-only Stability Engine trust expression | Does not authorize engine action or allocation execution |
| Dominant and supporting lanes understood | Tests whether Stable balance, Conservative yield, and Reserve form a comprehensible stability structure | Does not redefine the lanes or validate an allocation product |
| Review Snapshot and temporal labels understood | Tests orientation, fixture-date, and browser-local memory comprehension | Does not validate monitoring, recordkeeping, or runtime state |
| End-to-end fixture reconciled | Tests product continuity and internal narrative consistency | Does not prove operational rails or real transaction reliability |
| No-real-money boundary correctly stated | Tests the simulation and non-settlement disclosure | Does not establish compliance or customer-money readiness |
| Colour carries no unintended financial meaning | Tests whether restrained differentiation remains secondary to labels and structure | Does not establish safety, performance, approval, or protection |
| Consolidated disclosures preserve confidence | Tests findability and trust after progressive disclosure | Does not authorize removal or reinterpretation of trust claims |
| Exception behavior understood | Tests trust under unavailable data | Does not select a live rate source or degraded execution policy |
| Utility / trust judgment | Informs Founder disposition among continue, one iteration, reframe, or pause | Does not select a market, provider, rail, custody model, or successor ticket |

## 8. Session closeout

After each session:

1. verify that no personal, real financial, provider, rail, or regulated data entered the app or session record;
2. save the completed redacted template in the governed research location when one is approved, or mark the capture locator `not recorded`;
3. record the tested build or commit;
4. label missing or ambiguous evidence explicitly;
5. do not update the Evidence Register, `HEDGR_STATUS.md`, or ticket state from a single session;
6. escalate any repeated comprehension failure for governed review before changing the presentation.

Ticket closeout requires the Founder / governance decision chain in `HEDGR_STATUS.md`; this protocol cannot close the lane.
