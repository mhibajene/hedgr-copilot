# HEDGR - Class B Trust UX Pack

## 1. Status / Authority / Scope

**Status:** Trust UX pack; documentation-only.

**Authority:** Non-authoritative; subordinate to `docs/ops/HEDGR_STATUS.md`, `AGENTS.md`, accepted ADRs, doctrine, qualified legal / compliance review, custody boundary review, rail classification review, liquidity / withdrawal control review, and future operational evidence.

**Scope:** Defines UX / trust constraints for future Class B consideration.

**Mode:** Trust, disclosure, and claim-boundary identification only; not UI implementation or product copy approval.

This pack does not approve, activate, or implement any UI surface, product copy, deposit flow, withdrawal flow, custody model, rail, stablecoin conversion, treasury operation, ledger mutation, Copilot execution, Class B execution, Class C automation, or customer fund movement.

## 2. Purpose

This pack exists to support the Class B governance spine by defining customer-facing trust constraints before future Class B surfaces may be considered.

It answers:

**What customer-facing trust, disclosure, copy, state-label, failure-state, support-message, prohibited-claim, and Copilot-proximity constraints must be respected before future Class B pilot implementation may be considered?**

It does not answer:

**Which customer-facing Class B UI is approved to build?**

It does not create:

- UI approval
- copy approval
- design approval
- product launch approval
- customer eligibility approval
- custody approval
- rail approval
- withdrawal approval
- deposit approval
- implementation authority
- Class B readiness

## 3. Source inputs

Source inputs:

- `docs/ops/governance/class-b/HEDGR_CLASS_B_PILOT_ELIGIBILITY_STANDARD.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_ELIGIBILITY_GAP_REGISTER.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_ARTIFACT_DEPENDENCY_MAP.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_LEGAL_COMPLIANCE_REQUIREMENTS_MEMO.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_CUSTODY_BOUNDARY_MEMO.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_RAIL_CLASSIFICATION_REGISTER.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_LIQUIDITY_WITHDRAWAL_CONTROL_MEMO.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_ADR_SCOPING_MEMO.md`
- `docs/ops/governance/mvp/HEDGR_MVP_PHASE_ALIGNMENT.md`
- `docs/ops/HEDGR_STATUS.md`
- `docs/doctrine/hedgr-mvp-project-specification.md`
- `docs/doctrine/hedgr-constitutional-charter.md`
- `docs/doctrine/hedgr-ux-constitution.md`
- `docs/decisions/SPRINT-2-ADR-INDEX.md`

Source inputs are used to identify trust UX requirements and unresolved claim boundaries only. They do not create UI approval, copy approval, implementation authority, or execution approval.

## 4. Trust UX principles for Class B

1. **Status before action**

   Users must understand the state of funds, rails, custody, and withdrawal paths before being asked to act.

2. **Claim only what evidence supports**

   No customer-facing wording may imply legal, custody, rail, settlement, liquidity, FX, fee, timing, safety, or recovery truth that has not been approved through governance.

3. **Pending is a first-class state**

   Pending, delayed, blocked, failed, disputed, and unresolved states must be visible and plain-language, not hidden behind optimistic progress language.

4. **Withdrawal clarity outranks conversion**

   Withdrawal access and liquidity integrity must be easier to understand than yield, growth, conversion, or optimization.

5. **No urgency pressure**

   Class B UX must avoid urgency, gamification, FOMO, dopamine loops, and deposit-maximizing pressure.

6. **Copilot remains advisory**

   Copilot may explain, contextualize, and slow users down. It must not instruct, approve, execute, confirm, route, or represent itself as a financial authority.

7. **Support language must not become guarantee language**

   Support pathways may explain what happens next, but must not imply guaranteed reversal, guaranteed recovery, guaranteed timing, or guaranteed resolution.

## 5. Trust UX domains

| Domain | UX requirement to define | Why it matters for Class B | Current repo evidence posture | Required future evidence |
|---|---|---|---|---|
| Deposit initiation | What must users see before starting a deposit? What is not yet final? What fees, FX, rail, custody, and timing uncertainty must be visible? | Deposit language can easily imply rail approval, custody activation, or instant conversion. | Deposits remain future Class B / C capabilities only when authorized. | Legal / compliance review; custody transition map; rail classification row; fee / FX disclosure checklist; reconciliation dependency. |
| Deposit pending / failed / unresolved states | What language distinguishes initiated, pending, delayed, failed, reversed, disputed, and unresolved deposit states? | Ambiguous deposit states create trust, support, and reconciliation risk. | No Class B deposit state taxonomy is approved. | Deposit state taxonomy; reconciliation SOP; support escalation matrix; trust copy review. |
| Withdrawal initiation | What must users understand before requesting a withdrawal? What custody, rail, liquidity, timing, and finality constraints must be shown? | Withdrawal integrity is mission-critical and must not be overpromised. | Existing withdrawal surfaces are read-only / informational and do not prove operational reliability. | Liquidity / withdrawal control memo; rail classification row; custody transition map; kill criteria; support / dispute process. |
| Withdrawal pending / delayed / failed / unresolved states | What labels and explanations may be used for withdrawal states? What is shown when a withdrawal is pending review, pending rail action, delayed, blocked, failed, reversed, disputed, unresolved, paused, or halted? | Withdrawal failure states are high-trust moments. | No Class B withdrawal state machine or operational process is approved. | Withdrawal control matrix; reconciliation SOP; support escalation matrix; audit evidence checklist; trust UX review. |
| Custody and asset-control claims | What can Hedgr say about where funds are, who controls them, recovery, access, safety, insurance, protection, and loss? | Custody claims shape user trust and legal exposure. | Custody boundary questions are framed, but no custody model is approved. | Custody responsibility matrix; provider role evidence; counsel / compliance review; approved / prohibited custody claim register. |
| Rail and settlement claims | What can Hedgr say about rail availability, integration, settlement, finality, reversibility, fees, limits, and timing? | Rail wording can imply live integration or guaranteed movement. | Rails are classified for future consideration only; no rail is approved. | Rail classification register row; vendor / partner evidence; settlement / finality map; reconciliation SOP. |
| Stablecoin / conversion claims | What can Hedgr say about stablecoin acquisition, holding, conversion, redemption, FX, spread, slippage, finality, and risk? | Stablecoin and FX language can imply execution approval, rate certainty, or risk-free value preservation. | Stablecoin references remain product intent unless separately authorized. | Stablecoin / conversion boundary memo or ADR if required; fee / FX disclosure checklist; custody boundary review; legal / compliance review. |
| Fees, FX, spread, and limit disclosures | What must be shown before user action? What can be estimated? What must be final? What can change? What cannot be guaranteed? | Hidden or vague fees violate trust doctrine and may create compliance risk. | No Class B fee / FX / spread disclosure model is approved. | Fee disclosure requirements; FX / spread display requirements; stale quote handling; legal / compliance review. |
| Liquidity and withdrawal availability claims | What can Hedgr say about liquidity, withdrawal availability, withdrawal timing, fallback paths, pause conditions, kill criteria, and stress response? | Liquidity is sacred; withdrawal fragility must not be hidden. | Liquidity / withdrawal control questions are framed, but no active controls are approved. | Liquidity buffer policy; stress / pause procedure; kill criteria; trust UX review; counsel / compliance review. |
| Support, dispute, and incident messaging | What may support messages promise? What must they avoid? How should users be informed of delays, disputes, blocked transactions, failed rails, custody issues, or unresolved states? | Support language can accidentally become operational guarantee language. | No Class B support escalation matrix or dispute process is approved. | Support escalation matrix; dispute handling process; incident communication policy; audit evidence checklist. |
| Copilot proximity to Class B flows | What can Copilot explain near deposit, withdrawal, custody, rail, liquidity, fee, FX, or stablecoin surfaces? What must Copilot avoid saying or doing? | Copilot must not become directive, execution-like, accounting-like, or policy-authoritative. | Copilot advisory lane is defined, but no Class B proximity UX pack exists. | Copilot Class B boundary review; trust claims / disclosure review; support script constraints; ADR if required. |
| Marketing and public claims | What may Hedgr say publicly about Class B capability before legal, custody, rail, liquidity, operational, and ADR gates are satisfied? | Public narrative can create implied approval or overpromise safety, yield, access, or regulatory posture. | Doctrine prohibits overpromising, but no Class B public-claim register exists. | Claims review checklist; approved / prohibited wording register; legal / compliance review. |

## 6. Claim classification system

| Claim status | Meaning | Allowed use | Prohibited use |
|---|---|---|---|
| Allowed only as doctrine | The claim exists as a principle, not an operational fact. Example: "Liquidity is a priority." | Internal or governed explanatory framing where the claim is clearly a principle. | Do not imply active liquidity buffers or proven withdrawal reliability. |
| Allowed only as future intent | The claim describes target direction only. Example: "Hedgr intends to support local deposit and withdrawal rails when approved." | Future-facing governance or roadmap context that clearly states approval is not current. | Do not imply current availability, integration, or pilot readiness. |
| Allowed only with evidence | The claim may be used only after supporting legal, custody, rail, operational, vendor, ADR, or reconciliation evidence exists. Example: "Withdrawal processing usually completes within [timeframe]." | Later reviewed surfaces after evidence and governance approval. | Do not use before evidence and governance approval. |
| Allowed only in internal docs | The term may help internal reasoning but is not safe for user-facing copy. Example: "Manual pilot candidate." | Internal governance, classification, or review artifacts. | Do not expose internal classification language to users. |
| Prohibited unless explicitly approved | The claim is unsafe unless future governance explicitly approves it. Example: "Withdraw anytime." | None by default; only if a future governed review approves the exact claim. | Do not use in product, support, marketing, or Copilot copy by default. |

## 7. Prohibited claim register

| Claim / wording | Risk | Prohibited unless | Safer framing direction |
|---|---|---|---|
| Your funds are safe | Implies custody, protection, and loss guarantees. | Custody, legal / compliance, operational, and claim review approve the exact wording. | State only the current reviewed status or limitation. |
| Guaranteed access | Implies unconditional withdrawal and custody availability. | Liquidity, custody, rail, legal, and operational evidence support the guarantee. | Describe access conditions and unresolved dependencies. |
| Withdraw anytime | Implies always-on liquidity and rail availability. | Withdrawal reliability, liquidity buffer, rail, and support evidence support it. | Say withdrawal availability depends on approved controls and current state. |
| Instant withdrawal | Implies timing certainty and finality. | Rail, custody, settlement, and liquidity evidence prove the timing claim. | Use evidence-bound timing windows only when approved. |
| Instant deposit | Implies rail and custody finality. | Deposit rail, custody transition, and reconciliation evidence support it. | Distinguish initiation from completion. |
| Fully protected | Implies insurance or guarantee. | Legal / compliance and custody review approve the protection claim. | Name only specific reviewed protections, if any. |
| Insured | Implies formal insurance coverage. | Insurance evidence and legal review approve the claim. | Avoid unless exact coverage is approved. |
| Risk-free | Erases stablecoin, custody, rail, FX, and operational risk. | This should remain prohibited unless governance explicitly changes doctrine. | State specific risks and limitations. |
| Funds are held securely by Hedgr | Implies Hedgr custody and security truth. | Custody model, provider role, and legal review approve the wording. | Identify the reviewed custody role only if approved. |
| MTN is live | Implies active mobile-money rail. | Rail classification, partner evidence, and legal / compliance review approve live use. | Refer to future rail assessment only. |
| Airtel is integrated | Implies selected / active partner integration. | Rail classification, partner evidence, and implementation approval exist. | Refer to candidate or future rails only if accurate. |
| Bank transfers are supported | Implies active bank rails. | Bank rail approval and operational evidence exist. | State bank rails are not approved unless separately authorized. |
| Live rails | Implies customer-money rail readiness. | Rail approval, operational evidence, and §7 / §7a implementation authority exist. | Use internal classification only. |
| Production rail | Implies production customer-money use. | Production rail approval and governance authority exist. | Avoid until exact rail status is approved. |
| Guaranteed settlement | Implies finality certainty. | Settlement / finality evidence and legal review support the exact claim. | Say settlement evidence is pending or state reviewed limits. |
| Funds will arrive | Implies guaranteed completion. | Rail, custody, reconciliation, and support evidence support the claim. | State what is pending and what evidence confirms completion. |
| No failed withdrawals | Implies impossible failure. | This should remain prohibited unless future governance explicitly approves. | Explain failure handling and support path once approved. |
| Conversion complete | Implies stablecoin / FX finality. | Conversion finality evidence exists. | Distinguish pending, failed, and completed conversion states. |
| USDC purchase complete | Implies approved stablecoin acquisition. | Stablecoin / conversion boundary and evidence support the claim. | Use only after approved conversion evidence exists. |
| Customer funds moved | Implies actual fund movement. | Class B / C execution authority and ledger / reconciliation evidence exist. | Avoid in governance docs before implementation authority. |
| Your balance has been moved | Implies ledger and fund movement truth. | Ledger truth and movement evidence exist. | Distinguish informational posture from accounting truth. |
| Your funds are earning | Implies yield execution. | Yield execution, custody, liquidity, and disclosure approvals exist. | Frame yield as future or informational where appropriate. |
| Automatically allocated | Implies automation or hidden movement. | Class C authority and policy / engine coupling are approved. | State allocation posture is informational unless execution is approved. |
| Fully integrated | Implies operational integration completion. | Integration, legal, support, and rail evidence exist. | State integration status precisely and internally unless approved. |
| Ready for pilot | Implies Class B readiness. | §7 / §7a, prerequisite evidence, and required ADRs approve the exact readiness claim. | Say a prerequisite artifact is complete, not that pilot readiness exists. |
| Class B ready | Implies execution readiness. | Future governance explicitly approves a readiness verdict. | Say Class B prerequisite framing exists. |
| Regulated / licensed / approved | Implies regulatory approval. | Qualified legal / compliance review approves the exact claim. | State no legal approval unless reviewed. |
| No fees | Implies cost certainty. | Fee model and legal / compliance review approve it. | State fees are not defined or identify reviewed fees. |
| Best rate | Implies comparative FX superiority. | Evidence and legal review approve comparative claim. | Avoid comparative rate promises. |
| Guaranteed rate | Implies FX certainty. | Quote validity, settlement, and legal review support it. | State rate may change unless locked and approved. |
| No slippage | Implies execution certainty. | Conversion mechanism and evidence support it. | Disclose possible changes where not verified. |
| Stablecoin is risk-free | Erases stablecoin and custody risk. | This should remain prohibited unless governance explicitly changes doctrine. | State stablecoin-specific risks and limits. |
| Copilot will guide your transaction | Implies directive transaction assistance. | Copilot authority is explicitly widened by governance and required ADRs. | Copilot may explain approved disclosures only. |
| Copilot approved this action | Implies Copilot authority. | This should remain prohibited under current advisory posture. | State Copilot cannot approve actions. |

Safer framing directions remain generic and non-implementing. They are not final product copy.

## 8. State-label constraints

| State area | Internal state examples | User-facing constraint | Prohibited implication | Evidence required before final wording |
|---|---|---|---|---|
| Deposit initiated | deposit initiated | Must distinguish request or initiation from receipt, custody, conversion, or finality. | Do not imply funds have arrived or moved. | Deposit state taxonomy; rail evidence; custody transition map. |
| Deposit pending | deposit pending | Must show that completion is not final and evidence is still pending. | Do not imply guaranteed completion. | Reconciliation SOP; support escalation matrix. |
| Deposit delayed | deposit delayed | Must explain known delay class without promising timing. | Do not imply delay is harmless or already resolved. | Rail / vendor evidence; support process. |
| Deposit failed | deposit failed | Must identify failure as non-final until reconciliation confirms remedy. | Do not imply automatic reversal or recovery. | Failure handling process; audit evidence checklist. |
| Deposit unresolved | deposit unresolved | Must make ambiguity visible and identify the next support / evidence path. | Do not hide unresolved status behind optimistic progress language. | Reconciliation SOP; support escalation matrix. |
| Withdrawal initiated | withdrawal initiated | Must distinguish request from approval, rail action, settlement, or completion. | Do not imply withdrawal is guaranteed. | Withdrawal path map; control matrix. |
| Withdrawal pending review | pending review | Must show manual or operational review as pending, not approval. | Do not imply approval has occurred. | Manual review workflow; responsibility matrix. |
| Withdrawal pending rail action | pending rail action | Must identify rail dependency without naming live rail readiness. | Do not imply rail availability or settlement. | Rail classification row; settlement evidence. |
| Withdrawal pending custody action | pending custody action | Must identify custody dependency without claiming custody truth. | Do not imply custody release is approved or guaranteed. | Custody transition map; provider role evidence. |
| Withdrawal delayed | withdrawal delayed | Must explain delay and uncertainty in plain language. | Do not imply guaranteed timing or harmless delay. | Support / dispute process; rail or custody evidence. |
| Withdrawal blocked | withdrawal blocked | Must explain that processing cannot proceed under current constraints. | Do not imply user fault or guaranteed resolution. | Compliance / control evidence; support path. |
| Withdrawal failed | withdrawal failed | Must distinguish failure from reversal, dispute, or unresolved state. | Do not imply funds are restored without evidence. | Reconciliation SOP; audit checklist. |
| Withdrawal reversed | withdrawal reversed | Must use only when reversal evidence exists. | Do not imply all failures can reverse. | Reversal evidence; ledger / reconciliation truth. |
| Withdrawal disputed | withdrawal disputed | Must identify dispute process and current uncertainty. | Do not imply resolution outcome. | Dispute handling process; support matrix. |
| Withdrawal unresolved | withdrawal unresolved | Must keep unresolved state visible until evidence resolves it. | Do not collapse unresolved into pending or failed. | Reconciliation SOP; support escalation matrix. |
| Withdrawal completed | withdrawal completed | Must be used only after finality evidence exists. | Do not imply finality before evidence. | Settlement / finality evidence; reconciliation record. |
| Rail unavailable | rail unavailable | Must explain unavailable rail as a constraint, not a user failure. | Do not imply another live fallback exists unless approved. | Rail status evidence; support path. |
| Custody provider unavailable | custody provider unavailable | Must avoid claims about custody control or recovery. | Do not imply Hedgr can override provider constraints. | Provider evidence; custody responsibility matrix. |
| FX quote unavailable | FX quote unavailable | Must state quote absence and avoid action pressure. | Do not imply fixed or guaranteed rate. | FX quote handling; fee / spread requirements. |
| Conversion pending | conversion pending | Must distinguish pending conversion from stablecoin acquisition. | Do not imply purchase completion. | Conversion evidence; custody / stablecoin review. |
| Conversion failed | conversion failed | Must explain failure without guaranteeing recovery or retry success. | Do not imply stablecoin exposure or restored balance without evidence. | Conversion failure process; reconciliation SOP. |
| Support case opened | support case opened | Must show support path and what is being checked. | Do not imply issue is resolved. | Support escalation matrix; incident process. |
| Pilot paused | pilot paused | Must explain pause as a safety or control state. | Do not imply pilot remains fully available. | Pause procedure; kill criteria. |
| Pilot halted by kill criteria | halted by kill criteria | Must state halt condition without hiding severity. | Do not imply normal operation continues. | Kill-criteria evidence; governance decision record. |

This table defines constraints only. It does not approve a state machine, UI labels, frontend implementation, transaction semantics, or customer-money movement.

## 9. Disclosure requirements template

| Surface / moment | Required disclosure area | User must understand | Evidence required | Approval dependency |
|---|---|---|---|---|
| Before deposit initiation | Rail, custody, fees, FX, timing, finality, and eligibility. | Starting a deposit is not the same as completion. | Legal / compliance review; custody boundary review; rail classification review; fee / FX checklist. | Legal / compliance review; custody boundary review; rail classification review; operational evidence. |
| After deposit initiation | Pending status, evidence still required, and support path. | The deposit is not final until approved evidence exists. | Deposit state taxonomy; reconciliation SOP. | Support escalation process; reconciliation SOP. |
| During deposit pending state | Delay, uncertainty, and current owner if known. | Pending is an active unresolved state, not success. | Rail / custody evidence; support matrix. | Operational evidence. |
| After failed deposit | Failure meaning, reversal / dispute limits, and next evidence path. | Failure does not guarantee reversal or recovery. | Failure handling process; audit evidence checklist. | Support escalation process; reconciliation SOP. |
| Before withdrawal initiation | Custody, rail, liquidity, timing, finality, limits, and pause conditions. | Withdrawal access depends on approved controls and evidence. | Liquidity / withdrawal control review; custody boundary review; rail classification review. | Legal / compliance review; liquidity / withdrawal control review. |
| During withdrawal pending state | Manual review, custody, rail, settlement, or reconciliation dependency. | Pending withdrawal is not completion. | Withdrawal control matrix; support matrix. | Operational evidence; reconciliation SOP. |
| During delayed withdrawal | Delay class, uncertainty, and support channel. | Timing may be uncertain where not verified. | Rail / custody / liquidity evidence. | Support escalation process; operational evidence. |
| After failed withdrawal | Failure meaning, unresolved paths, and dispute limits. | Failed does not mean reversed or resolved unless evidence confirms it. | Reconciliation SOP; audit evidence checklist. | Support escalation process. |
| When rail is unavailable | Rail limitation and available approved alternatives, if any. | Rail unavailability can block or delay movement. | Rail classification row; vendor evidence. | Rail classification review; operational evidence. |
| When custody state is unclear | Custody uncertainty and evidence being checked. | Hedgr cannot claim control or finality without custody evidence. | Custody responsibility matrix. | Custody boundary review; legal / compliance review. |
| When FX quote is unavailable | Quote absence, stale quote risk, and no guaranteed rate. | Action should not rely on unavailable rate truth. | FX quote handling rules. | Fee / FX disclosure requirements. |
| Before stablecoin conversion | Stablecoin, FX, spread, slippage, custody, and finality risks. | Conversion is not risk-free or approved by default. | Stablecoin / conversion boundary memo or ADR if required; fee / FX checklist. | Legal / compliance review; custody boundary review; ADR acceptance where required. |
| After conversion failure | Failure meaning, unresolved evidence, and support path. | Conversion failure does not prove restored state. | Conversion failure process; reconciliation SOP. | Operational evidence; support escalation process. |
| When support escalation is opened | What is known, pending, and being checked. | Support case opening is not resolution. | Support escalation matrix. | Support escalation process; audit evidence checklist. |
| When pilot is paused | Pause reason, affected actions, and uncertainty. | Paused means action availability is constrained. | Stress / pause procedure. | Liquidity / withdrawal control review; operational evidence. |
| When pilot is halted | Halt reason, affected actions, and next governance / support path. | Halted means the pilot cannot be treated as normally available. | Kill criteria; incident communication policy. | Governance approval; operational evidence; ADR acceptance where required. |

Approval dependencies may include legal / compliance review, custody boundary review, rail classification review, liquidity / withdrawal control review, ADR acceptance where required, operational evidence, support escalation process, and reconciliation SOP.

## 10. Support-message constraints

Support messages may say:

- what is known
- what is pending
- what evidence is being checked
- what the user should avoid doing
- what channel will update them
- that timing is uncertain where not verified

Support messages must not say:

- funds are guaranteed safe
- reversal is guaranteed
- completion is guaranteed
- timing is guaranteed
- Hedgr can override a vendor, rail, bank, custody provider, chain, compliance hold, or settlement process unless approved
- support has resolved an issue before evidence confirms resolution

Support wording must reflect operational truth. It must not compensate for missing custody, rail, liquidity, or reconciliation evidence.

## 11. Copilot Class B proximity guardrails

Copilot may:

- explain what a state means
- explain uncertainty
- explain risks
- suggest waiting when action is unsafe
- direct users to official support channels
- summarize approved disclosures
- remind users that a process is pending or not final

Copilot must not:

- instruct users to deposit or withdraw
- approve a transaction
- confirm fund movement
- claim settlement finality
- claim custody truth
- claim rail availability
- claim liquidity sufficiency
- claim best rate or guaranteed rate
- override support, policy, legal, or operations
- suggest urgency
- imply autonomous action
- imply execution authority
- imply account or ledger truth

## 12. Marketing and public-claim guardrails

Public-facing wording must not imply:

- Hedgr is Class B ready
- a pilot is approved
- users can currently deposit or withdraw
- rails are live
- custody is active
- stablecoin conversion is available
- funds are insured or guaranteed
- withdrawals are instant or guaranteed
- yield is guaranteed
- Hedgr is licensed or regulated unless reviewed and approved
- Copilot can execute or guide transactions

Marketing claims must be reviewed against:

- legal / compliance memo
- custody boundary memo
- rail classification register
- liquidity / withdrawal control memo
- ADR scoping memo
- UX constitution
- constitutional charter

## 13. Downstream dependency effect

- **Pilot ops runbook:** must reflect only support and user-state language that operations can actually support.
- **Reconciliation SOP:** must provide evidence for completed, failed, delayed, duplicate, disputed, and unresolved states before UX can claim finality.
- **Support escalation matrix:** must align with state labels and support-message constraints.
- **Audit evidence checklist:** must capture evidence required for user-facing claims.
- **Future ADRs:** must consider trust claims, disclosure boundaries, and prohibited wording where material.
- **Implementation-specific §7a brief:** must cite this pack when any Class B customer-facing surface is proposed.
- **Future frontend implementation:** must not use this pack as implementation approval; it must be separately authorized.

## 14. Open Trust UX questions for future review

- [ ] Which Class B user action is being considered?
- [ ] Is the surface deposit, withdrawal, custody, rail, conversion, support, Copilot, or marketing related?
- [ ] Does the surface touch customer-money movement?
- [ ] What legal / compliance review exists?
- [ ] What custody boundary applies?
- [ ] What rail classification applies?
- [ ] What liquidity / withdrawal control applies?
- [ ] What state labels are needed?
- [ ] What pending, delayed, failed, disputed, blocked, and unresolved states exist?
- [ ] What fees, FX, spreads, limits, and settlement timing must be disclosed?
- [ ] What support path exists?
- [ ] What claims are allowed?
- [ ] What claims are prohibited?
- [ ] What evidence proves completion or finality?
- [ ] What should Copilot be allowed to explain?
- [ ] What must Copilot avoid?
- [ ] What marketing claims are prohibited?
- [ ] What must be true before UI implementation can be proposed?

Answers must come from future governed review, legal / compliance input, custody boundary review, rail classification review, liquidity / withdrawal control review, operational design, support design, reconciliation evidence, vendor / partner evidence, and accepted ADRs where required.

## 15. Non-authorization statement

This pack is non-authoritative and documentation-only. It does not approve, activate, or implement any UI surface, product copy, deposit flow, withdrawal flow, custody model, rail, stablecoin conversion, treasury operation, ledger mutation, Copilot execution, Class B execution, Class C automation, or customer fund movement. Any future Class B customer-facing implementation work still requires separate HEDGR_STATUS.md §7 naming, a bounded §7a execution brief, any required accepted ADRs, qualified legal / compliance review, custody boundary review, rail classification review, liquidity / withdrawal control review, trust UX review, and operational evidence where applicable.
