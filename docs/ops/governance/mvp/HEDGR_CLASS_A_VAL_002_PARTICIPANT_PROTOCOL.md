# CLASS-A-VAL-002 Participant Protocol and Evidence Capture

**Status:** Active dual-layer retest instrument for the sole active `CLASS-A-VAL-002` ticket, refined by the completed nested `HEDGR-UI-006` pass before protocol-complete participant retesting

**Execution class:** Class A product validation; visibly synthetic; non-executing for customer money

**Authority:** `docs/ops/HEDGR_STATUS.md` §7 / §7a, §143, §179, §180, and §181; Internal D-037, D-060, and D-061

**Non-authorization:** This protocol does not authorize live money movement, custody, provider or banking integration, production FX, settlement, payout, Stability Engine execution, Class B implementation, Evidence Register acceptance, gate clearance, participant-data collection beyond the bounded fields below, or a successor ticket. Interface completion and completed session records do not by themselves close `CLASS-A-VAL-002`.

## 1. Research decision

Determine whether target cross-border freelancers can both:

1. understand the simulated Dashboard → Deposit → Withdraw → Activity journey and its non-live trust boundary; and
2. independently form an accurate explanation of the problem Hedgr addresses, what kind of product it appears to be, when it would matter, and what decision or behaviour it could inform.

Capture the dual-layer result through five linked evidence layers:

1. **Problem recognition** — the participant identifies the financial-stability problem in their own words.
2. **Journey comprehension** — the participant explains the simulated state, changes, arithmetic, and no-real-money boundary.
3. **Product identity** — the participant describes what kind of product Hedgr appears to be without copying a supplied category label.
4. **Decision relevance** — the participant identifies a situation or decision for which the product could be relevant.
5. **Behavioural value** — the participant explains what they would understand or do differently after using it.

Use the resulting evidence for the Founder to decide whether to:

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
- Use the default ZMW amounts only as simulated research data, not as launch-market evidence.
- Capture one desktop or mobile recording or a screenshot at each required checkpoint. App captures must contain synthetic data only.

### Required checkpoints

| Checkpoint | Expected synthetic state |
| --- | --- |
| Dashboard start | `$0.00` simulated balance; financial-position orientation and current-step shell visible; stability targets described as guidance that does not divide the balance; start-simulated-deposit action visible |
| Deposit preview | `100 ZMW` shows an example `+$5.00` simulated-balance change; example rate and no-real-money boundary visible; no advance Activity explanation |
| Deposit result | Simulated deposit recorded; simulated balance increased by `$5.00`; matching simulated Activity entry named; no account charge or real-money movement claim |
| Withdrawal result | Before / subtract / remaining example calculation shows `$5.00 − $2.00 = $3.00`; simulated withdrawal recorded; no bank transfer or real-payout claim |
| Activity | Reconciliation shows one simulated `+$5.00` deposit minus one simulated `-$2.00` withdrawal equals `$3.00` remaining; both entries remain visibly simulated |
| Dashboard return | `$3.00` simulated balance and both recent simulated entries; stability targets remain distinct from that balance |
| Secondary exception | `/deposit?journey=class-a-val-002&scenario=unavailable-data`; preview unavailable and Confirm disabled |

## 4. Moderator script

### Opening boundary

Read exactly:

> This is a research simulation. Every balance, rate, deposit, withdrawal, and Activity entry you see is simulated. Do not enter real financial or personal information. No real money can move in this session.

Ask the participant to think aloud. Do not explain Hedgr's proposition beyond visible product copy until the free-recall questions have been answered.

Do not say or show “Financial Stability Companion” or another proposed category label to the participant. Do not offer bank, wallet, budgeting, trading, investment, or payments classifications until the participant's unaided entry answer has been recorded. Functional understanding in the participant's own language is the evidence; repetition of interface wording is not enough.

### Step 1 — Dashboard

1. Ask: “Without opening anything else, what problem do you think Hedgr is trying to help with?”
2. Ask: “What kind of product do you think this is? What on this screen makes you say that?”
3. Ask: “When, if ever, might a view like this be useful to you?”
4. Ask: “What decision or next step, if any, could this view help you think about?”
5. Ask the participant to identify the primary action without opening any disclosure.
6. Ask: “What does Stable balance mean here?”
7. Ask: “How are Conservative yield and Reserve different from Stable balance and from each other?”
8. Ask: “What does the Stability Engine posture tell you?”
9. Ask: “Do the stability-target percentages divide the simulated balance or show money that has already moved, or do they mean something else?”
10. Ask: “What is Review Snapshot for?”
11. Ask the participant to distinguish the current simulation status, simulation date, and last viewed locally.
12. Ask: “Did any colour make a lane feel guaranteed safe, higher performing, urgent, active, or already approved?”
13. Only after the unaided answers are recorded, ask the participant to open the consolidated simulation and stability-target explanations. Record whether the disclosure changed their answer or confidence.

Do not ask the participant to explain the complete route relationship on Dashboard. The full-journey free-recall question belongs at Activity, after the participant has experienced each step.

### Step 2 — Deposit

1. Ask the participant to start the simulated deposit.
2. Enter `100` in the visible local-currency amount field.
3. Before confirming, ask: “What balance do you expect after this step, and why?”
4. Ask the participant to confirm and continue only when they are comfortable.
5. Ask: “What actually happened here? What did not happen?”
6. After the confirmation appears, ask: “Where can you now find the simulated deposit that explains this change?”

Expected interpretation: a simulated deposit worth `$5.00` was recorded; no account was charged and no real conversion or money movement occurred.

### Step 3 — Withdraw

1. Ask the participant to continue to Withdraw.
2. Enter `$2.00`.
3. Before confirming, ask: “What balance do you expect afterward?”
4. Ask: “Where would the remaining `$3.00` stay in this simulation?”
5. Ask the participant to confirm and describe the result.
6. Ask: “Does this screen prove that a bank transfer or real payout happened?”

Expected interpretation: the simulated balance becomes `$3.00`; no bank transfer, provider action, or real payout occurred.

### Step 4 — Activity and reconciliation

1. Ask the participant to continue to Activity.
2. Without restating the route model, ask them to explain both records and reconcile the current balance. Record the answer before any disclosure, probe, or moderator explanation.
3. Ask: “What does ‘Completed’ mean in this screen?”
4. Ask the participant to return to Dashboard and verify the `$3.00` balance.
5. With the returned Dashboard visible, ask: “Now that you have completed the example, what do you think Hedgr is intended to help someone achieve?”
6. Ask: “What kind of product do you now think this is? What changed or stayed the same from your first answer?”
7. Ask: “When would it matter, and what decision or behaviour could it affect?”
8. Ask: “Which parts of the experience led you to that answer?”

Expected interpretation: “Completed” means a simulated step finished, not external financial finality.

### Secondary exception scenario

1. Open the unavailable-data scenario from the Deposit page.
2. Ask: “What can you still understand, what action is unavailable, and why?”
3. Ask: “What would you do next?”

Do not use the exception scenario as the primary proposition condition.

## 5. Comprehension and interpretation questions

Ask free recall first, then use the probe only if needed.

| Outcome | Free-recall question | Allowed probe |
| --- | --- | --- |
| Problem recognition | What problem is Hedgr trying to help with? | Is the main problem preserving and understanding a financial position, moving money faster, tracking a budget, trading, or something else? Why? |
| Product identity | What kind of product does Hedgr appear to be? | Does it seem primarily like a bank, crypto wallet, budgeting app, investment or trading product, live payments tool, or something else? What evidence supports your answer? |
| Decision relevance | When would Hedgr matter, and what decision could it inform? | Would it help before acting, after a transaction, during trading, or in another situation? Why? |
| Behavioural value | What, if anything, would Hedgr help you understand or do differently? | Did the experience change how you would assess the situation before a next step? |
| Primary action | What did the page ask you to do next? | Which control appeared to begin the participant journey? |
| Stable balance | What does Stable balance mean here? | Is it the main holding lane, a performance result, or an action control? |
| Supporting lanes | How do Conservative yield and Reserve support Stable balance? | Did either feel like a separate product or something you could manage? |
| Balance vs targets | What is the difference between the simulated balance and the stability-target percentages? | Did the percentages divide that balance or prove that money had moved? |
| Engine posture | What did the Stability Engine section help you understand? | Was it information, an instruction, or an executed action? |
| Review Snapshot | What is Review Snapshot for? | Does it orient you, ask you to act, or report execution? |
| Temporal clarity | What is the difference between current simulation status, simulation date, and last viewed locally? | Which describes the simulated example and which is only stored in this browser? |
| Journey continuity | Walk me through the one simulated balance across Dashboard, Deposit, Withdraw, and Activity. | How did `$0.00` become `$5.00`, then `$3.00`, and which records explain it? |
| Simulation boundary | Did real money move anywhere in this session? | What on screen supports your answer? |
| Available action | What could you do in the primary condition, and what was blocked in the exception condition? | Why was Confirm disabled? |
| Colour interpretation | What, if anything, did colour imply? | Did colour imply guaranteed safety, performance, urgency, activation, or approval? |
| Disclosure consolidation | How did the consolidated explanations affect confidence? | Was important meaning easy to find without making the page feel repetitive? |
| Utility and trust | Would this proposition be useful enough to explore further? What increased or reduced trust? | What is the one thing you would need clarified before continuing? |

### Scaffolding and delayed-recall controls

For every comprehension outcome, record the first support level at which the participant gives a materially correct explanation:

- `U` — unaided, using only the currently visible interface;
- `D` — after the participant independently opens an available disclosure;
- `N` — after the neutral probe in the table above;
- `M` — only after moderator explanation; this is moderator rescue, not demonstrated comprehension.

After the secondary exception or a five-minute unrelated discussion, hide the journey screens and ask these questions in order:

1. “Without looking at the interface, what problem do you think Hedgr is intended to help with, and what kind of product is it?”
2. “When might it matter, and what decision or behaviour could it affect?”
3. “How did the simulated balance change from start to finish, and which entries explained the result?”
4. “If a simulated deposit added `$8` and a simulated withdrawal subtracted `$3`, what would remain, and where would you check why?”

Record these delayed-recall answers separately. These fields expose category-label parroting, mental-model decay, and teaching dependence; they do not change the governed participant success thresholds or create an automatic disposition.

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

| Outcome | Score | First correct at U / D / N / M | Free-recall response / observed behavior | Misconception or hesitation | Short redacted quote |
| --- | ---: | --- | --- | --- | --- |
| Recognize the problem Hedgr addresses | | | | | |
| Explain Hedgr's product identity in their own words | | | | | |
| Identify a relevant situation or decision | | | | | |
| Explain potential behavioural value | | | | | |
| Identify the primary journey action | | | | | |
| Interpret Stable balance as the dominant holding lane | | | | | |
| Distinguish Conservative yield and Reserve as supporting lanes | | | | | |
| Distinguish simulated balance from stability targets | | | | | |
| Explain the Stability Engine posture | | | | | |
| Explain the role of Review Snapshot | | | | | |
| Distinguish current status, simulation date, and local viewing history | | | | | |
| Reconcile Dashboard → Deposit → Withdraw → Activity | | | | | |
| State that no real money moved | | | | | |
| Identify available and unavailable actions | | | | | |
| Deny unintended safety, performance, urgency, activation, or approval meaning from colour | | | | | |
| Confirm disclosure consolidation preserved confidence and findability | | | | | |
| Express usefulness and trust | | | | | |

### Dual-layer category-convergence record

Record the participant's words before applying any interpretation. `Entry` is the first Dashboard answer, `Exit` is the answer after the complete journey and Dashboard return, and `Delayed` is the answer after the screens are hidden. Do not backfill an earlier column from a later answer.

| Evidence layer | Entry | Exit | Delayed | First correct at U / D / N / M | Misclassification, copied phrase, or trajectory note |
| --- | --- | --- | --- | --- | --- |
| Layer 1 — Problem recognition | | | | | |
| Layer 2 — Journey comprehension | | | | | |
| Layer 3 — Product identity | | | | | |
| Layer 4 — Decision relevance | | | | | |
| Layer 5 — Behavioural value | | | | | |

### Open category interpretation

Complete only after the unaided product-identity response is recorded. Multiple observations may apply; do not force the participant into one label.

| Interpretation | Entry evidence | Exit evidence | Delayed evidence |
| --- | --- | --- | --- |
| Financial-position / stability interpretation | | | |
| Crypto wallet | | | |
| Bank or account | | | |
| Budgeting app | | | |
| Investment or trading product | | | |
| Live money-moving or payments tool | | | |
| Other participant-defined interpretation | | | |

### Independence checks

| Check | Response / evidence note |
| --- | --- |
| Entry-to-exit mental-model change | |
| Exit-to-delayed mental-model change | |
| Delayed recall after screens are hidden | |
| Transfer answer for `$8 − $3` and where to verify it | |
| Any disclosure opened before the initial answer | |
| Neutral probe required | |
| Moderator explanation required | |
| Terms the participant repeated without explaining in their own words | |

### Journey record

| Check | Result | Evidence note |
| --- | --- | --- |
| Reached all four primary routes without an unavoidable block | Pass / Fail | |
| Predicted `$5.00` after the synthetic deposit | Pass / Fail | |
| Predicted `$3.00` after the synthetic withdrawal | Pass / Fail | |
| Reconciled both Activity records to `$3.00` | Pass / Fail | |
| Denied real deposit / bank-transfer / payout meaning | Pass / Fail | |
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
| Problem recognized without prompting | Tests whether the stability need is legible before category language is supplied | Does not establish demand, market selection, or Class B feasibility |
| Product identity converges in the participant's own words | Tests whether the intended category is formable rather than merely repeated | Does not adopt public naming or validate a settled category |
| Decision relevance and behavioural value are concrete | Tests whether the proposition connects to a real mental model and potential use | Does not establish customer intent, demand, advice authority, or readiness |
| Simulated-balance / stability-target distinction understood | Tests shadow-accounting and fund-movement interpretation risk | Does not validate accounting, custody, or engine execution |
| Engine posture understood as informational | Tests the read-only Stability Engine trust expression | Does not authorize engine action or allocation execution |
| Dominant and supporting lanes understood | Tests whether Stable balance, Conservative yield, and Reserve form a comprehensible stability structure | Does not redefine the lanes or validate an allocation product |
| Review Snapshot and temporal labels understood | Tests orientation, simulation-date, and browser-local memory comprehension | Does not validate monitoring, recordkeeping, or runtime state |
| End-to-end simulated journey reconciled | Tests product continuity and internal narrative consistency | Does not prove operational rails or real transaction reliability |
| No-real-money boundary correctly stated | Tests the simulation and no-real-payout disclosure | Does not establish compliance or customer-money readiness |
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
