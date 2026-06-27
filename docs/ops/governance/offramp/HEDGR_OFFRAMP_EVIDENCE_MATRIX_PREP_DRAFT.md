# Hedgr Class B Off-Ramp Evidence Matrix — Preparation Draft

**Status:** Founder / HedgrOps review draft
**Authority posture:** Non-authorizing / preparation artifact only
**Prepared:** 2026-06-26
**Related research artifact:** `docs/research/HEDGR_OFFRAMP_STRATEGY_AGENCY_AND_PAYOUT_INFRASTRUCTURE_RESEARCH.md`
**Related governance framework:** `docs/ops/governance/offramp/HEDGR_OFFRAMP_GOVERNANCE_FRAMEWORK.md`
**Class posture:** Pre-Class B decision-support preparation artifact
**Promotion boundary:** This matrix does not activate evidence intake, provider outreach, implementation, sandbox testing, ADR drafting, customer-money movement, custody, deposits, withdrawals, stablecoin conversion, fiat payout, remittance, treasury operations, reconciliation operations, or Class B execution.

---

## 1. Purpose

This matrix defines the evidence domains Hedgr would need to review before any future, separately authorized Class B off-ramp readiness determination.

It is intended to help the founder and HedgrOps assess:

1. what evidence is missing;
2. which gaps are blockers versus later optimisations;
3. what provider, market, legal, operational, and technical records would be required;
4. what cannot be inferred from public marketing claims;
5. what must remain unresolved until direct provider, legal, regulatory, operational, and governance evidence exists.

This matrix is not an approval checklist. A row marked as reviewed does not mean the off-ramp, provider, market, endpoint, evidence intake, or Class B activity is approved. It only means the relevant evidence domain has been reviewed for decision-support purposes, subject to separate repo-governed authority.

---

## 2. Use rules

Each evidence row should be marked as one of:

| Status | Meaning |
|---|---|
| `unopened` | No formal evidence review has started. |
| `in_review` | Evidence is being gathered under separate authority. |
| `evidence_received` | Source evidence exists but has not been reviewed as sufficient for decision support. |
| `sufficient_for_decision_support` | Source evidence has been reviewed and appears sufficient to support a later governance decision, without approving the provider, market, endpoint, implementation, evidence intake, or Class B activity. |
| `blocked` | Evidence is missing, contradictory, stale, insufficient, or authority is absent. |
| `deferred` | Not required for the first bounded hypothesis but preserved for future review. |
| `not_applicable` | Explicitly out of scope for the candidate model. |

No row may be marked `sufficient_for_decision_support` without:

- source pointer;
- evidence date;
- source class;
- owner / reviewer;
- contradiction check;
- freshness check;
- dependency check;
- explicit note on whether it affects authority.

---

## 3. Candidate Class B off-ramp scope under review

The conservative candidate hypothesis for future review is:

> Same-name user withdrawal hypothesis only, using a provider subject to separate qualification that would need to own conversion, fiat payout, local liquidity, regulated payout obligations, failed-payout handling, refunds, and the external settlement source of truth.

This scope describes a future hypothesis to be evidenced; it does not confirm that any provider, market, endpoint, chain, user class, or legal posture is currently viable.

Initial out of scope:

- third-party remittance;
- supplier payout;
- payroll;
- bulk disbursement;
- P2P matching;
- informal OTC;
- Hedgr-operated agent network;
- Hedgr-managed MNO prefunding;
- Hedgr custody of fiat balances;
- Hedgr claims of guaranteed or instant withdrawal;
- customer-money movement without separate authority.

These exclusions remain governance boundaries unless separately challenged and resolved through repo-native authority.

---

## 4. Off-ramp evidence matrix

| # | Evidence domain | Core question | Required evidence | Minimum review-sufficiency standard | Blocker if unresolved? | Candidate source class | Owner / reviewer |
|---|---|---|---|---|---|---|---|
| 1 | Authority basis | Has evidence intake itself been authorized? | `HEDGR_STATUS.md §7 / §7a` entry or equivalent repo-governed authority. | Clear bounded authority naming off-ramp evidence intake, scope, exclusions, owner, and non-implementation posture. | Yes | Repo-native governance | Founder + HedgrOps |
| 2 | Market selection boundary | Which market is being reviewed, and why? | Market candidate record; user problem statement; endpoint hypothesis; exclusion rationale. | One clearly bounded market or corridor. No “global launch” assumptions. | Yes | Internal strategy + market evidence | Founder + HedgrOps |
| 3 | User type | Which user class is in scope? | Consumer/freelancer/SME scope note; identity and business account assumptions. | User class is named and matched to provider eligibility. | Yes | Product doctrine + provider terms | Product + Ops |
| 4 | Withdrawal type | Is this same-name withdrawal or third-party transfer? | Flow diagram; beneficiary policy; provider confirmation. | Same-name rule documented, with third-party transfers explicitly excluded unless separately authorized. | Yes | Provider + legal | Legal + Ops |
| 5 | Provider-of-record evidence | Which entity performs conversion and payout? | Provider contract/terms; regulated entity details; responsibility statement. | Provider-of-record evidence identifies legal entity, jurisdiction, and service role without approving the provider. | Yes | Provider direct evidence | Legal + HedgrOps |
| 6 | Hedgr role boundary | What does Hedgr do versus not do? | Responsibility matrix; user disclosures; technical flow. | Hedgr role limited to orchestration, UX, routing/status/support handoff unless separately authorized. | Yes | Governance + legal | HedgrOps |
| 7 | Regulatory classification | Does the model create licensing, remittance, payment, CASP/VASP, e-money, or MSB obligations for Hedgr? | Qualified legal memo per market and flow. | Legal review distinguishes Hedgr, provider, payout partner, and user responsibilities. | Yes | Qualified legal review | Legal |
| 8 | KYC / KYB responsibility | Who verifies user identity and business status? | Provider KYC/KYB policy; Hedgr user verification policy; data-sharing basis. | No assumption that “provider handles compliance” unless documented. | Yes | Provider + legal | Compliance + Product |
| 9 | AML / sanctions / PEP screening | Who screens what, when, and against which obligations? | Compliance responsibility matrix; escalation path; prohibited-use policy. | Screening ownership and stop conditions documented. | Yes | Provider + legal | Compliance |
| 10 | Source-of-funds / source-of-wealth | When are additional checks required? | Provider rules; threshold policy; hold/review process. | Step-up triggers, user messaging, and failure states documented. | Yes | Provider + legal | Compliance + Support |
| 11 | Stablecoin support | Which asset is supported? | Provider supported asset list; chain support; settlement asset confirmation. | One primary stablecoin named. No multi-asset assumption. | Yes | Provider technical docs | Product + Engineering |
| 12 | Chain support | Which chain is used and why? | Provider chain support; wallet provider support; gas/bridge analysis. | One primary chain named, with bridge avoided unless specifically justified. | Yes | Provider + technical review | Engineering |
| 13 | Custody model | Who controls assets before, during, and after user authorization? | Custody flow diagram; wallet signing model; provider receipt process. | Hedgr does not take custody unless separately authorized and legally reviewed. | Yes | Legal + technical architecture | Legal + Engineering |
| 14 | User authorization | How does the user approve sale or transfer? | UX flow; transaction signing evidence; quote confirmation record. | User gives explicit informed approval before transfer/sale. | Yes | Product + technical evidence | Product |
| 15 | Quote integrity | Is the quote fixed, indicative, or variable? | Provider quote API/terms; quote expiry; slippage/spread policy. | User sees expiry, fees, FX rate, and whether final amount can change. | Yes | Provider API + terms | Product + Ops |
| 16 | Fee / FX / spread disclosure | What is the total landed cost? | Fee schedule; FX spread details; local charges; taxes; mobile-money withdrawal fees where relevant. | Total expected cost shown before confirmation, including known endpoint charges. | Yes | Provider + local rail data | Product + Finance |
| 17 | Local payout endpoint | What endpoint receives value? | Bank/mobile-money/e-wallet/card/cash-pickup evidence by market. | Endpoint is not inferred from country coverage; it is confirmed for the exact user type and flow. | Yes | Provider direct evidence | Ops |
| 18 | Beneficiary validation | Can same-name endpoint ownership be validated? | Name-match API/response; mobile number validation; bank/e-wallet ownership evidence. | Same-name withdrawal rule can be operationally enforced or exceptions are blocked. | Yes | Provider + local rail evidence | Compliance + Product |
| 19 | Payout limits | What transaction, daily, monthly, wallet, card, bank, and cash limits apply? | Provider limits; local rail limits; user-tier limits. | Limits are known, displayable, and enforceable before confirmation. | Yes | Provider + local rail evidence | Product + Ops |
| 20 | Local liquidity responsibility | Who funds local payout liquidity? | Prefunding terms; settlement account structure; reserve/security deposit terms. | Hedgr does not prefund local MNO/agent balances in MVP unless separately authorized. | Yes | Provider commercial terms | Finance + Legal |
| 21 | Hedgr prefunding / balance-sheet exposure | Is there idle capital, reserve, or credit exposure? | Treasury model; prefund utilisation assumptions; suspension thresholds. | Exposure is quantified and assigned to provider or explicitly blocked. | Yes | Provider + finance review | Finance |
| 22 | Settlement-state definitions | What would each provider-defined state, including `completed`, mean? | Provider status definitions; local rail finality; reconciliation confirmation. | Distinguish provider receipt, payout initiated, available, credited/paid, failed, refunded. | Yes | Provider technical + legal | Ops + Engineering |
| 23 | Product status state machine | Can Hedgr represent transaction status truthfully? | Normalized off-ramp state model; provider webhook/status mapping. | No collapse of intermediate states into provider-defined `completed`. | Yes | Technical architecture | Engineering + Product |
| 24 | External reconciliation source of truth | What external record determines settlement state? | Provider transaction IDs; onchain hash; local rail reference; reconciliation process. | Provider/local rail record is the external settlement source of truth; Hedgr database is not final truth. | Yes | Provider + ops design | Ops + Finance |
| 25 | Failed payout handling | What happens if payout fails? | Failure codes; retry rules; cancellation path; user messaging. | Failure handling is documented before launch. | Yes | Provider API + support terms | Support + Ops |
| 26 | Refund path | What happens after failed, cancelled, or uncollected payout? | Refund terms; timing; route; asset/currency returned; fee handling. | Refund expectations are user-visible and operationally trackable. | Yes | Provider terms | Support + Finance |
| 27 | Cash pickup controls | If cash pickup exists, how are ID, voucher, collection, expiry, and agent liquidity handled? | Agent requirements; cash availability; ID rules; expiry/refund terms. | Cash pickup carries separate limits, status states, and risk controls. | Yes if cash in scope | Provider + MTO evidence | Ops + Compliance |
| 28 | Agent liquidity | Can active agents actually pay out? | Agent success-rate evidence; location availability; cash stockout handling. | Location count is not sufficient as liquidity evidence. | Yes if cash in scope | Provider operational evidence | Ops |
| 29 | Mobile-money controls | If mobile money exists, who owns MNO relationship and wallet settlement? | MNO/payout partner confirmation; prefunding rules; wallet limits. | Direct MNO assumptions are rejected unless commercially confirmed. | Yes if mobile money in scope | Provider + MNO evidence | Ops + Finance |
| 30 | Bank / instant-payment controls | If bank or instant payout exists, what is the finality and reversal model? | Bank/instant-payment rail rules; provider settlement process. | Credit/reversal and name mismatch rules are known. | Yes if bank in scope | Provider + local rail evidence | Ops |
| 31 | Card push controls | If card payout exists, what acceptance, failure, and reversal rules apply? | Card payout eligibility; issuer acceptance rules; failure codes. | Card is not treated as universal fallback. | Yes if card in scope | Provider + card rail evidence | Ops |
| 32 | Support ownership | Who does the user contact for each problem? | Support responsibility matrix; escalation SLA; provider escalation references. | Hedgr can explain what it owns and what provider owns. | Yes | Provider + internal support policy | Support |
| 33 | Complaints / disputes | Who owns regulated complaint handling? | Provider complaint process; legal memo; user disclosure. | Complaint ownership is clear and jurisdiction-specific. | Yes | Provider + legal | Legal + Support |
| 34 | Incident response | What happens during provider outage, stuck funds, webhook failure, sanctions hold, or liquidity suspension? | Incident playbook; severity model; user messaging; kill switch. | Incident stop conditions documented before execution. | Yes | Ops + provider evidence | HedgrOps |
| 35 | Fraud controls | What fraud patterns are expected and blocked? | Fraud threat model; mule-account controls; coercion/ref-number theft controls for cash. | Fraud controls match endpoint risk. | Yes | Compliance + product risk | Compliance |
| 36 | Data sharing / privacy | What user data is shared with providers and why? | Data map; privacy basis; retention periods; provider DPA/terms. | Data sharing is lawful, minimized, and disclosed. | Yes | Legal + provider terms | Legal |
| 37 | Audit / retention | What records must be retained? | Audit log spec; transaction evidence fields; retention class. | Evidence is sufficient for dispute, compliance, reconciliation, and governance review. | Yes | Ops + legal | HedgrOps |
| 38 | Trust UX language | What may the UI claim? | Trust-copy matrix; prohibited terms; status wording; quote wording. | No unsupported claims of “instant,” “guaranteed,” “withdraw anytime,” or “completed.” | Yes | Product + legal + ops | Product |
| 39 | Future implementation regression controls | Can risky status language regress into the product if future implementation is separately authorized? | Test assertions; copy snapshot; semantic token rules. | Product surfaces cannot imply accounting truth or settlement finality without evidence. | Yes before any separately authorized implementation | Engineering + Product | Engineering |
| 40 | Commercial terms | Are pricing, minimums, reserves, settlement, support, and termination terms viable? | Commercial offer; contract summary; economics model. | No provider is advanced on marketing coverage alone. | Yes | Provider commercial evidence | Founder + Finance |
| 41 | Counterparty risk | What happens if the provider fails, freezes, exits market, or changes terms? | Counterparty risk assessment; exit plan; fallback provider review. | At least one fallback or stop condition exists. | Yes | Finance + legal + ops | Founder + HedgrOps |
| 42 | Market-specific legal changes | Is the evidence fresh enough? | Freshness review; legal/regulatory monitoring note. | Evidence date and expiry/review trigger are recorded. | Yes | Legal + regulatory sources | Legal |
| 43 | User education | Does the user understand what is happening? | UX copy; explainer; risk disclosure; fee/quote explanation. | User can distinguish wallet balance, provider transfer, payout availability, and final receipt. | Yes | Product research | Product |
| 44 | Future pilot boundary | If future testing is separately approved, what would be the maximum safe scope? | Pilot plan; limits; test users; no-live-funds or controlled-funds boundary. | Pilot cannot proceed without separate implementation authority. | Yes | Governance + ops | Founder + HedgrOps |
| 45 | Preparation / blocker synthesis | Which blockers remain for the bounded hypothesis? | Preparation synthesis; evidence-domain index; unresolved blocker list. | The synthesis remains descriptive and non-authorizing unless formal Class B authority is separately granted. | Yes | HedgrOps synthesis | Founder + HedgrOps |

---

## 5. Recommended non-authorizing evidence-domain classification

Each domain should be classified as:

| Classification | Meaning |
|---|---|
| `hard_blocker` | Must be resolved before any future, separately authorized Class B readiness recommendation. |
| `launch_constraint` | Does not block evidence review but constrains any future operating model. |
| `pilot_constraint` | Must be resolved before any separately authorized sandbox, internal test, or pilot. |
| `monitoring_requirement` | Must be monitored after separate approval, if any future operating authority is granted. |
| `future_scale_item` | Not required for the first same-name off-ramp hypothesis review. |

Initial proposed hard blockers:

1. authority basis;
2. market scope;
3. user type;
4. same-name withdrawal boundary;
5. provider-of-record evidence;
6. legal/regulatory classification;
7. KYC/AML/sanctions allocation;
8. custody model;
9. quote/fee disclosure;
10. local payout endpoint proof;
11. beneficiary validation;
12. local liquidity responsibility;
13. settlement-state definitions;
14. external reconciliation source of truth;
15. failed payout/refund path;
16. support/dispute ownership;
17. incident stop conditions;
18. trust UX language.

---

## 6. Founder / HedgrOps review questions

1. Should the first off-ramp evidence hypothesis be limited to same-name withdrawal only?
2. Should third-party remittance, payroll, supplier payout, and bulk disbursement remain explicitly out of scope?
3. Should Hedgr reject any MVP path requiring Hedgr-managed MNO prefunding?
4. Should market evidence be reviewed before provider preference is formed?
5. Should off-ramp evidence quality carry more weight than general crypto adoption in market selection?
6. Should chain selection remain open until the off-ramp endpoint and provider path are evidenced?
7. Should cash pickup be treated as fallback/inclusion infrastructure rather than the default endpoint?
8. Should a provider be disqualified if it cannot provide failure, refund, and reconciliation evidence?
9. Should `HEDGR_STATUS.md` mirror all support-infrastructure closeouts that affect governance tooling?
10. Should this matrix remain in review-draft status until a bounded evidence-intake authority entry exists?

---

## 7. Non-authorization statement

This evidence matrix is a non-authorizing preparation artifact.

It does not approve evidence intake, provider outreach, legal reliance, market selection, provider selection, implementation, sandbox testing, ADR drafting, Class B readiness, customer-money movement, custody, deposits, withdrawals, stablecoin conversion, remittance, fiat payout, agent operations, prefunding, treasury operations, reconciliation operations, support operations, or production use.

Any movement from preparation into evidence intake requires separate repo-governed authority through the controlling Hedgr governance sources.
