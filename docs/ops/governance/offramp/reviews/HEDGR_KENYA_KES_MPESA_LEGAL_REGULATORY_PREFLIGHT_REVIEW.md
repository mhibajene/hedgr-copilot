# HEDGR - Kenya / KES M-Pesa Legal / Regulatory Preflight Review

**Document status:** Founder / HedgrOps legal-preflight review / decision-support only
**Source artifact:** `docs/ops/governance/offramp/reviews/HEDGR_KENYA_KES_MPESA_THESIS_STRESS_TEST_SYNTHESIS_REVIEW.md`
**Ticket:** `LEGAL-PREFLIGHT-B-001`
**Authority posture:** Bounded issue-spotting and perimeter mapping only
**Formal legal opinion authority:** None
**Legal reliance authority:** None
**Counsel engagement authority:** None unless separately authorized
**Provider outreach authority:** None
**Market selection authority:** None
**Endpoint approval authority:** None
**Provider selection authority:** None
**Implementation authority:** None
**Customer-money authority:** None

---

## 1. Status / authority / scope

This review is a bounded legal / regulatory preflight for the Kenya / KES / M-Pesa same-name withdrawal thesis stress-test path.

It answers one bounded question:

> What legal, regulatory, compliance, custody, payments, VASP, privacy, complaint, disclosure, and consumer-protection perimeter issues must Hedgr understand before deciding whether Kenya should proceed to provider-specific evidence review, comparison, no-go, or defer?

It does not answer whether Kenya is legally approved, whether M-Pesa is approved as an endpoint, whether Hedgr can operate this flow, which provider should be used, whether public source pointers may be relied on, whether Hedgr may move customer money, or whether any Class B blocker can close.

This review uses only existing repo-native artifacts and already-preserved source pointers from `EVID-INTAKE-B-004`. No external source was refreshed. No provider was contacted. No counsel was contacted. No legal opinion, legal reliance, legal sign-off, jurisdictional conclusion, evidence acceptance, evidence rejection, evidence scoring, blocker closure, gap closure, Evidence Registry state movement, provider outreach, market selection, endpoint approval, provider selection, ADR drafting readiness, implementation-preflight, implementation, Class B execution, or customer-money authority is created.

## 2. Bounded artifacts reviewed

This preflight reviewed the following bounded artifacts:

- `docs/ops/governance/offramp/reviews/HEDGR_KENYA_KES_MPESA_THESIS_STRESS_TEST_SYNTHESIS_REVIEW.md`
- `docs/ops/governance/offramp/HEDGR_CLASS_B_OFFRAMP_KENYA_KES_MPESA_SOURCE_POINTER_CLASSIFICATION.md`
- `docs/ops/governance/offramp/HEDGR_CLASS_B_OFFRAMP_KENYA_KES_MPESA_INTAKE_AUTHORITY_ENTRY.md`
- `docs/ops/governance/offramp/HEDGR_CLASS_B_OFFRAMP_MARKET_ENDPOINT_EVIDENCE_BRIEF.md`
- `docs/ops/governance/offramp/HEDGR_OFFRAMP_EVIDENCE_MATRIX_PREP_DRAFT.md`
- `docs/ops/governance/offramp/HEDGR_OFFRAMP_GOVERNANCE_FRAMEWORK.md`
- `docs/ops/HEDGR_STATUS.md`
- `AGENTS.md`

The primary source basis is:

- `HOPS-REVIEW-B-001` Section 5 - Friction severity map
- `HOPS-REVIEW-B-001` Section 7 - Governance implications
- `HOPS-REVIEW-B-001` Section 11 - Recommended next governed move
- `EVID-INTAKE-B-004` Section 4 - Source register
- `EVID-INTAKE-B-004` Section 5 - Domain classification
- `EVID-INTAKE-B-004` Section 7 - Legal-review-needed map
- `EVID-INTAKE-B-004` Section 9 - Trust UX risk notes
- `EVID-INTAKE-B-004` Section 11 - Friction profile
- `EVID-INTAKE-B-004` Section 12 - No-go / defer signals

Public legal / regulatory pointers referenced here are already-preserved pointers from `EVID-INTAKE-B-004` only, including `KSP-017` and `KSP-018`. They remain source pointers, not legal advice, evidence acceptance, or reliance material.

Public legal / regulatory pointers may have changed since preservation. Any future counsel review must independently verify current law, regulatory guidance, source availability, and applicability before reliance.

## 3. Executive preflight synthesis

The Kenya / KES / M-Pesa thesis stress-test raises legal and regulatory perimeter issues before any provider-specific evidence review, market comparison, endpoint approval, or implementation-preflight could be responsibly considered.

The central issue spotted is role boundary. Hedgr may want to frame itself as non-custodial while presenting a same-name M-Pesa withdrawal path that depends on a provider-of-record. That claim cannot be relied on until the actual user flow, custody model, conversion path, payout responsibility, support responsibility, complaint ownership, data/control posture, refund path, settlement truth, and local-liquidity posture are reviewed by qualified counsel under separate authority.

The second issue spotted is provider-of-record reliance. Public source pointers do not establish that a provider owns conversion, fiat payout, compliance, local liquidity, failed-payout handling, refunds, complaint routing, and settlement truth for Hedgr's exact Kenya / KES / M-Pesa hypothesis. Each of those points requires provider confirmation and legal review before reliance.

The third issue spotted is MVP posture. If the only feasible Kenya / M-Pesa path requires Hedgr-managed MNO, bank, PSP, agent, or local liquidity prefunding, the hypothesis remains a likely no-go / defer signal under current governance.

The most conservative governed next move after this preflight is to either no-go / defer the Kenya hypothesis, or authorize counsel engagement under a separate `§7` / `§7a` ticket before any provider-specific evidence review, with any formal legal opinion separately scoped. Counsel engagement would require a separate `§7` / `§7a` ticket. Any formal legal opinion, legal reliance, or jurisdictional conclusion-making must be separately scoped and would not itself authorize provider outreach, implementation, or customer-money activity.

## 4. Legal / regulatory perimeter map

| Domain | Preflight concern | Source basis | Perimeter risk | Counsel / legal reliance needed? | Notes |
|---|---|---|---|---|---|
| authority basis | This review can map issues only; it cannot create legal authority or reliance. | `HEDGR_STATUS.md` §7 / §7a; HOPS §7; EVID §14 | Hidden authority drift if the preflight is read as approval. | Yes before reliance. | Issue spotted; decision-support only. |
| Kenya jurisdictional perimeter | Kenya-specific VASP, payment, mobile-money, remittance, consumer, privacy, and complaint obligations are not resolved by repo pointers. | EVID §§4-5, §7; `KSP-017`; `KSP-018` | Jurisdictional conclusion could be inferred without counsel. | Yes. | Perimeter unclear; no jurisdictional conclusion made. |
| VASP / digital asset perimeter | Stablecoin-originated or stablecoin-adjacent conversion may raise VASP / digital-asset questions. | EVID §§5, §7; `KSP-017`; `KSP-018` | Hedgr role may be misclassified if custody, conversion, or provider role is misunderstood. | Yes. | Requires counsel review before legal reliance. |
| stablecoin usage perimeter | Supported asset, chain, redemption, reserve, disclosure, and conversion responsibilities are not established. | EVID §§5, §7, §11 | Stablecoin flow may create obligations beyond product copy. | Yes. | No chain or stablecoin is selected. |
| custody perimeter | Who controls assets before, during, and after provider handoff is unresolved. | Matrix §4 rows 5-7, 13; EVID §§5, §7 | A non-custodial claim may be inaccurate if Hedgr controls funds, routing, refunds, or payout truth. | Yes. | Custody model is not approved. |
| non-custodial role claim | Hedgr cannot rely on a non-custodial claim without testing actual flow, control, and support responsibilities. | HOPS §§5, 7, 11; EVID §§5, §7 | User-facing posture may overstate Hedgr's limited role. | Yes. | Claim must be tested against the real operating model. |
| provider-of-record responsibility | Provider-of-record model is not confirmed for conversion, payout, compliance, failed payout, refunds, complaints, and settlement truth. | HOPS §5; EVID §§5-7 | Hedgr may inherit duties if provider responsibilities are not complete or enforceable. | Yes, with provider confirmation. | Provider-specific review would require a separate `§7` / `§7a` ticket and still would not authorize outreach unless explicitly named. |
| conversion responsibility | Stablecoin-to-KES conversion owner, entity, jurisdiction, supported assets, quote type, and FX source are not established. | EVID §§5-7, §11 | Conversion could create licensing, disclosure, custody, FX, or consumer-protection exposure. | Yes, with provider confirmation. | Requires operational evidence before reliance. |
| fiat payout responsibility | Local payout owner, local partner role, MNO relationship, and finality language are unclear. | EVID §§5-7, §11 | Hedgr could appear to operate or guarantee local payout. | Yes, with provider confirmation. | M-Pesa remains endpoint hypothesis only. |
| payment service / remittance perimeter | Same-name payout may still raise payment, remittance, local-payout, or money-transfer perimeter questions. | Matrix §4 rows 7, 17, 29; HOPS §5; EVID §7 | Flow may be misframed as only a crypto off-ramp. | Yes. | Perimeter unclear. |
| mobile-money endpoint permission | M-Pesa API or routing pointers do not establish Hedgr use-case permission. | EVID §§4-6, §11; `KSP-009` | Commercial API visibility may be mistaken for permitted production use. | Yes, with provider / MNO confirmation. | No provider outreach authorized. |
| M-Pesa payout permission | Same-name KES M-Pesa payout support for Hedgr's exact user class is not evidenced. | HOPS §5; EVID §§5-6 | Endpoint availability could be overstated. | Yes, with provider confirmation. | Endpoint remains hypothesis. |
| same-name beneficiary validation | Name, phone, wallet ownership, and mismatch handling are unresolved. | HOPS §5; EVID §§5-6, §8 | Third-party transfer or wrong-recipient risk may not be controlled. | Legal and operational review needed. | Requires provider evidence before reliance. |
| third-party beneficiary exclusion | The same-name boundary must exclude third-party remittance, payroll, supplier payout, and bulk disbursement unless separately authorized. | Intake Authority §3, §6; Matrix §3, §6A | Out-of-scope use cases could create remittance or payment exposure. | Yes if challenged. | Exclusion remains preserved. |
| freelancer user-class implications | Freelancer eligibility, identity verification, source-of-funds, business/personal wallet use, and disclosure duties are unresolved. | Intake Authority §3; EVID §§5-7 | User-class assumptions may not match provider or legal requirements. | Yes. | Requires counsel and provider confirmation. |
| SME owner user-class implications | SME owner / business-wallet eligibility, KYB, beneficial ownership, and payout-limit treatment are unresolved. | Intake Authority §3; EVID §§5-7 | SME use may trigger KYB or different compliance treatment. | Yes. | Requires counsel and provider confirmation. |
| KYC / KYB allocation | Hedgr, provider, local partner, and user duties are not allocated. | EVID §§5, §7; Matrix §4 rows 8-10 | "Provider handles compliance" may be unsafe without matrix evidence. | Yes, with provider confirmation. | Requires operational evidence before reliance. |
| AML / sanctions allocation | Screening, escalation, holds, source-of-funds, and monitoring responsibility are unclear. | EVID §§5, §7; Matrix §4 rows 8-10 | Sanctions or AML duties may be under-owned. | Yes. | Stop conditions remain unresolved. |
| source-of-funds / transaction monitoring boundary | Step-up checks, thresholds, monitoring owner, and user notices are not defined. | Matrix §4 row 10; EVID §§5, §7 | Transaction monitoring gaps may undermine legal posture. | Yes. | Requires provider and operational evidence. |
| local liquidity ownership | KES float, settlement accounts, MNO balances, reserves, and liquidity shortfall owner are unknown. | HOPS §5; EVID §§5-6, §11-12 | Hedgr-managed prefunding may create balance-sheet, custody, or payment exposure. | Yes, with provider confirmation. | Primary Kenya friction domain. |
| Hedgr-managed prefunding prohibition | Hedgr-managed MNO, bank, PSP, or agent prefunding remains likely no-go / defer under current MVP posture. | Matrix §6A; EVID §12; HOPS §5 | Prefunding could create custody, treasury, liquidity, and operational authority not granted. | Yes if ever revisited. | Likely no-go / defer under current MVP posture. |
| fees / FX / spread / local charge disclosure | Total landed cost, endpoint charges, taxes / levies, FX spread, quote expiry, and changed amounts are not established. | HOPS §§5-6; EVID §§5, §8-9, §11 | Unsafe consumer disclosure if copy implies fee certainty. | Yes, with operational evidence. | Requires provider evidence before user-facing claims. |
| settlement finality language | Provider status, payout initiation, wallet credit, finality, reversal, and refund states may differ. | HOPS §§5-6; EVID §§8-9, §11 | "Completed" may imply legal or settlement finality. | Legal and operational review needed. | Trust UX must preserve uncertainty. |
| failed payout / refund responsibility | Failure codes, retry, cancellation, refund route, refund timing, currency, fees, and failed-refund owner are unresolved. | HOPS §5; EVID §§7-8, §11-12 | User harm and complaint exposure if responsibility is unclear. | Yes, with provider confirmation. | Support and complaint ownership are part of the rail. |
| support / complaint / dispute ownership | User-visible support, escalation, regulated complaints, disputes, and error-resolution owners are unknown. | HOPS §§5-7; EVID §§7, §11 | Hedgr could appear to own or disclaim obligations without legal basis. | Yes. | Requires legal review and provider matrix. |
| consumer-protection disclosure | Timing, finality, fees, refunds, support, provider role, and endpoint uncertainty need safe disclosure boundaries. | HOPS §§6-7; EVID §9 | Consumer disclosures may overpromise or omit material uncertainty. | Yes. | Product copy remains out of scope. |
| privacy / data-sharing basis | Identity, phone, wallet, transaction, compliance, support, and audit data sharing is not mapped. | EVID §§5, §7; Matrix §4 rows 36-37 | Personal data or compliance data may be shared without a settled legal basis. | Yes. | Requires data map and retention review. |
| audit / retention basis | Required records, retention class, transaction IDs, local rail references, support evidence, and access controls are not defined. | EVID §§8, §11; Matrix §4 row 37 | Audit gaps could impair disputes, compliance, and governance review. | Yes. | No audit-operation authority created. |
| incident stop conditions | Outage, stuck funds, sanctions hold, liquidity shortfall, ambiguous wallet owner, and webhook failure stop rules are undefined. | EVID §§8, §12; Matrix §4 row 34 | Undefined stops could create customer-money and compliance risk. | Yes. | Requires future playbook evidence under separate authority. |
| provider outreach boundary | Provider contact, material requests, commercial engagement, and sandbox access are outside this ticket. | HOPS §§7, 12-13; EVID §§6, §14 | This review could be misread as outreach authorization. | Not authorized here. | Provider outreach requires separate explicit authority. |
| legal reliance boundary | Public legal pointers are not legal advice, sufficient evidence, or reliance material. | EVID §§4, §7, §14 | Reliance could be created by summary language. | Yes. | Formal legal opinion requires separate authority. |
| implementation boundary | No product, code, test, CI, sandbox, API key, staging, or runtime path is authorized. | AGENTS.md; HOPS §12; EVID §14 | Analysis could drift into implementation-preflight. | Not authorized here. | No app/package/workflow/test changes in scope. |
| Class B execution boundary | No Class B execution, customer-money activity, deposits, withdrawals, conversion, payout, custody, treasury, reconciliation, support, or audit operations are authorized. | HOPS §§12-13; EVID §14 | Readiness advancement could be implied. | Not authorized here. | Registry and evidence states remain unchanged. |

## 5. Kenya-specific issue map

The Kenya-specific issue map is an issue-spotting map only:

1. `issue spotted` - Kenya is a useful thesis stress-test frame because mobile-money depth exposes endpoint, MNO permission, liquidity, same-name identity, fee, finality, refund, support, complaint, reconciliation, privacy, and legal-boundary questions together.
2. `perimeter unclear` - Public source pointers do not establish whether the exact Hedgr same-name Kenya / KES / M-Pesa withdrawal path is within a provider's licensed, permitted, and operationally supported activity.
3. `requires counsel review` - Kenya VASP / digital-asset, payment, remittance, mobile-money, privacy, complaint, disclosure, consumer-protection, and custody perimeter questions must be reviewed before legal reliance.
4. `requires provider confirmation before legal reliance` - Provider-of-record claims, endpoint support, M-Pesa payout permission, conversion owner, payout owner, compliance allocation, local liquidity, failed payout, refunds, settlement truth, and support ownership require direct provider evidence under separate authority.
5. `requires operational evidence before legal reliance` - Same-name validation, wallet limits, fee and FX behavior, finality states, webhooks, local rail references, refund timing, complaint routing, audit fields, and incident stop conditions require operational evidence.
6. `likely no-go / defer under current MVP posture` - Any Kenya path that requires Hedgr-managed MNO, bank, PSP, agent, or local liquidity prefunding remains a no-go / defer signal unless future repo authority explicitly revisits that posture.
7. `out of scope for this preflight` - Formal legal opinion, jurisdictional conclusion-making, provider outreach, provider-specific review, evidence sufficiency, evidence acceptance, market selection, endpoint approval, implementation-preflight, sandbox testing, and Class B execution.

## 6. Hedgr role-boundary implications

If Hedgr claims to be non-custodial while presenting a same-name M-Pesa withdrawal path through a provider-of-record, the legal perimeter questions include:

- whether Hedgr ever controls, directs, routes, holds, reverses, refunds, or can delay value in a way that affects custody or payment classification;
- whether Hedgr's UX, status labels, support scripts, refund promises, or incident decisions imply responsibility for local payout outcome;
- whether the provider-of-record is actually the legal and operational owner of conversion, fiat payout, compliance, local liquidity, failed payout, refunds, and settlement truth;
- whether Hedgr's data, monitoring, disclosure, escalation, and support role creates obligations even if a provider owns the local rail;
- whether the same-name boundary is enforceable through the provider and local endpoint;
- whether Hedgr would need to disclose uncertainty, provider role, limits, delays, failure paths, and complaint ownership before any user-facing description of the path.

This preflight does not resolve those questions. It flags them as counsel-needed and provider-confirmation-needed before legal reliance.

## 7. Provider-of-record implications

Before Hedgr can rely on a provider-of-record model, the following must be confirmed under separate authority:

- legal entity, jurisdiction, licensing / registration perimeter, and service role for the provider-of-record;
- which party owns stablecoin receipt, conversion, FX quote, KES settlement, local payout submission, and local payout finality;
- whether the provider has permission to support the exact Kenya / KES / same-name M-Pesa path for Hedgr's user classes;
- KYC / KYB / AML / sanctions / source-of-funds allocation across Hedgr, provider, local partner, MNO, and user;
- failed-payout handling, refund route, refund timing, fee treatment, cancellation, timeout, and wrong-endpoint treatment;
- customer support, regulated complaint ownership, dispute routing, escalation SLA, and evidence handoff;
- transaction status taxonomy, local rail reference, M-Pesa reference, provider transaction ID, webhook semantics, finality, and audit records;
- data-sharing basis, privacy obligations, data minimization, retention, and user disclosures.

Provider-specific review would require a separate `§7` / `§7a` ticket and still would not authorize outreach unless explicitly named.

## 8. Custody / stablecoin / conversion implications

The custody, stablecoin, and conversion perimeter remains unresolved:

- no chain is selected;
- no stablecoin is selected;
- no custody model is approved;
- no provider conversion responsibility is confirmed;
- no fiat payout responsibility is confirmed;
- no reserve, redemption, settlement, or disclosure posture is legally reviewed;
- no Hedgr non-custodial claim is legally tested against the actual user flow.

The issue spotted is that stablecoin-to-KES conversion may not be only an operational matter. It may affect VASP / digital asset, custody, payment, disclosure, data, complaint, consumer-protection, and provider-of-record responsibilities. Counsel review and provider confirmation are required before any legal reliance.

## 9. Payment / remittance / mobile-money implications

The payment, remittance, and mobile-money perimeter remains unclear:

- M-Pesa remains an endpoint hypothesis only, not an approved endpoint;
- public API or routing references do not establish production access, permitted use case, MNO permission, local partner authority, or same-name payout support;
- a same-name withdrawal path may still raise payment, remittance, mobile-money, local-payout, disclosure, complaint, refund, and support questions;
- third-party remittance, payroll, supplier payout, and bulk disbursement remain excluded;
- Hedgr-managed MNO, bank, PSP, or agent prefunding remains a likely no-go / defer signal.

No payment, remittance, mobile-money, M-Pesa, or local-payout approval is created by this review.

## 10. KYC / AML / sanctions / user-class implications

The KYC / AML / sanctions perimeter questions that must be clarified include:

- whether freelancer and SME-owner user classes are eligible for the exact provider and endpoint path;
- whether personal wallet, business wallet, and same-name beneficiary validation rules differ;
- who performs identity verification, business verification, beneficial-owner checks, sanctions screening, PEP screening, source-of-funds review, transaction monitoring, and escalation;
- what user data must be shared with provider, local partner, MNO, compliance processor, support, or audit functions;
- what happens when screening, name match, wallet ownership, source-of-funds, or transaction-monitoring concerns arise;
- which party owns stop conditions, holds, declines, refunds, notices, and complaint routing.

This preflight does not allocate those duties. It flags them as counsel-needed and provider-confirmation-needed before reliance.

## 11. Privacy / data-sharing / audit-retention implications

The privacy, data-sharing, and audit-retention perimeter questions include:

- what identity, phone, wallet, transaction, quote, compliance, status, support, and complaint data must be processed;
- what data must be shared with the provider, local partner, MNO, support path, compliance process, or audit process;
- what legal basis, consent, notice, minimization, retention period, access boundary, deletion / preservation rule, and cross-party responsibility would apply;
- which records are needed for dispute, refund, complaint, reconciliation, compliance review, audit review, and governance review;
- whether user-facing disclosures can describe the path without overpromising privacy, finality, refund certainty, support ownership, or provider compliance coverage.

No privacy basis, retention policy, data-sharing agreement, audit operation, or complaint process is approved here.

## 12. Complaint / dispute / consumer-protection implications

Complaint, dispute, and consumer-protection issue spotting must cover:

- who receives and owns user complaints for failed payout, delayed payout, wrong endpoint, changed amount, blocked payout, refund, cancellation, timeout, local wallet non-credit, suspected fraud, or compliance hold;
- whether Hedgr, provider, local partner, or MNO is the regulated complaint owner;
- what user rights, response timelines, evidence handoff, escalation path, refund route, and dispute closeout rules apply;
- what copy can safely say about timing, fees, finality, refund, local wallet credit, support, and complaint ownership;
- what incident stop conditions must prevent unsupported user-facing claims during outage, liquidity shortfall, sanctions hold, ambiguous wallet ownership, webhook failure, or provider status ambiguity.

These remain counsel-needed and provider-confirmation-needed areas before legal reliance.

## 13. Trust UX / disclosure implications

Trust UX must avoid language implying:

- Kenya support;
- M-Pesa availability;
- guaranteed withdrawal;
- instant withdrawal;
- final settlement;
- fee certainty;
- refund certainty;
- provider compliance coverage;
- cash-pickup availability;
- local wallet credit on provider acceptance;
- provider completion as legal or settlement finality;
- "provider handles compliance" without role, data, support, and escalation boundaries.

Any future user-facing statement would need legal review, provider confirmation, and operational evidence before reliance. This review does not approve product copy, status labels, support scripts, disclosure text, or shipped UI behavior.

## 14. Counsel-needed questions

The questions below are founder / HedgrOps issue-spotting prompts only. They are not a counsel instruction set, legal memo request, scope of engagement, or substitute for a separately authorized counsel brief.

If separately authorized, counsel review may address the following issue-spotting prompts:

1. What Kenya VASP / digital-asset, payment, remittance, mobile-money, stablecoin, custody, privacy, complaint, disclosure, and consumer-protection perimeter questions are raised by the same-name Kenya / KES / M-Pesa hypothesis?
2. Can Hedgr maintain a non-custodial role claim if it presents a provider-of-record withdrawal path, shows status, collects user data, handles support, receives provider status, or participates in failed-payout / refund workflows?
3. What facts are required before relying on a provider-of-record model for conversion, fiat payout, compliance, local liquidity, failed payout, refunds, complaints, and settlement truth?
4. What legal effect does same-name beneficiary validation have, and what validation evidence is needed to exclude third-party transfers?
5. What user-class differences matter for freelancers, SME owners, personal wallets, business wallets, KYC, KYB, source-of-funds, and transaction monitoring?
6. What privacy, data-sharing, retention, audit, complaint, support, consumer-disclosure, and incident-response obligations would attach to the proposed posture?
7. What statements would be unsafe in user-facing copy without provider confirmation and operational evidence?
8. Would Hedgr-managed MNO, bank, PSP, agent, or local liquidity prefunding alter custody, payment, treasury, liquidity, or customer-money exposure under current MVP posture?

Counsel engagement would require a separate `§7` / `§7a` ticket. Any formal legal opinion, legal reliance, or jurisdictional conclusion-making must be separately scoped and would not itself authorize provider outreach, implementation, or customer-money activity.

## 15. No-go / defer legal signals

The Kenya hypothesis should remain no-go / defer under current governance if any of the following legal-preflight signals dominate:

- counsel cannot scope the legal perimeter without facts that require provider outreach not separately authorized;
- the provider-of-record model cannot be legally relied on without direct provider confirmation;
- Hedgr would need to own conversion, fiat payout, local liquidity, refund, complaint, or settlement truth;
- Hedgr-managed MNO, bank, PSP, agent, or local liquidity prefunding is required;
- non-custodial posture cannot be reconciled with the actual user flow, data/control posture, support role, refund path, or settlement truth;
- same-name beneficiary validation cannot be legally or operationally supported;
- KYC / KYB / AML / sanctions / source-of-funds ownership is unclear;
- privacy, data-sharing, retention, audit, complaint, dispute, consumer disclosure, or incident stop conditions cannot be bounded;
- Trust UX would need to imply Kenya support, M-Pesa availability, instant / guaranteed withdrawal, final settlement, fee certainty, refund certainty, provider compliance coverage, or cash-pickup availability before evidence exists.

These are issue-spotting signals only. They do not close blockers or determine evidence sufficiency.

## 16. Founder / HedgrOps next-decision options

This preflight supports only these next-decision options:

| Option | Decision-support meaning | Boundary |
|---|---|---|
| A. No-go / defer Kenya hypothesis. | Preserve the learning and stop advancing Kenya for now. | Does not select an alternative market. |
| B. Authorize counsel engagement under a separate ticket, which may include formal legal opinion only if separately scoped. | Ask qualified counsel to review the mapped perimeter questions. | Requires separate `§7` / `§7a` authority and does not authorize provider outreach, implementation, or customer-money activity. |
| C. Authorize later provider-specific evidence review under a separate ticket. | Open a bounded provider-specific review only after legal perimeter and authority are clear. | Requires separate `§7` / `§7a` authority and still does not authorize outreach unless explicitly named. |
| D. Authorize comparison against another market hypothesis, such as Philippines. | Compare issue profiles without selecting or ranking a market. | Requires separate authority and must remain non-ranking. |
| E. Preserve additional public, repo-native, or founder-provided non-confidential source pointers under a new bounded ticket. | Add source pointers without review, acceptance, or reliance. | No external research or provider contact unless separately authorized. |
| F. Hold / no new Class B off-ramp ticket. | Preserve no-active-ticket posture. | No successor implied. |

## 17. Recommended next governed move

Recommended next governed move if founder / HedgrOps wants to continue the Kenya hypothesis:

> B. Authorize counsel engagement under a separate `§7` / `§7a` ticket, which may include formal legal opinion only if separately scoped.

Rationale: the preflight identifies legal / regulatory perimeter questions that are upstream of provider-specific evidence review. A provider-specific review would be premature if Hedgr cannot first determine what counsel must evaluate, what facts are required, and which claims are unsafe without legal reliance.

Counsel engagement would require a separate `§7` / `§7a` ticket. Any formal legal opinion, legal reliance, or jurisdictional conclusion-making must be separately scoped and would not itself authorize provider outreach, implementation, or customer-money activity.

Conservative alternative:

> A. No-go / defer Kenya hypothesis.

Rationale: if founder / HedgrOps does not want to open a counsel-engagement path, the mapped perimeter issues are enough to keep Kenya as a preserved thesis stress-test only.

Optional later move:

> D. Authorize comparison against another market hypothesis, such as Philippines.

Rationale: a comparison frame could help distinguish Kenya-specific mobile-money friction from broader off-ramp readiness questions, but it must not rank, select, or prefer a market.

## 18. Blocked moves

This review blocks treating the preflight as authority for:

- formal legal opinion;
- legal reliance;
- counsel engagement without separate authority;
- jurisdictional conclusion-making;
- legal sign-off;
- evidence acceptance;
- evidence rejection;
- evidence scoring;
- evidence sufficiency determination;
- blocker closure;
- gap closure;
- Evidence Registry state movement;
- provider outreach;
- provider-specific review;
- commercial engagement;
- market selection;
- endpoint approval;
- endpoint selection;
- provider selection;
- provider ranking;
- provider preference formation;
- chain selection;
- stablecoin selection;
- ADR drafting readiness;
- implementation-preflight;
- implementation;
- sandbox access;
- API keys;
- staging;
- testing;
- live operations;
- production use;
- customer-money movement;
- custody;
- deposits;
- withdrawals;
- stablecoin conversion;
- fiat payout;
- treasury operations;
- liquidity buffer operations;
- reconciliation operations;
- support operations;
- complaint handling;
- incident handling;
- audit operations;
- Class B execution.

## 19. Non-authorization statement

This review is non-authorizing and documentation-only. It is bounded legal / regulatory issue-spotting and perimeter mapping for founder / HedgrOps decision support only.

It does not create a formal legal opinion, legal reliance, legal sign-off, counsel engagement, jurisdictional conclusion, evidence acceptance, evidence rejection, evidence scoring, evidence sufficiency determination, blocker closure, gap closure, Evidence Registry state movement, provider outreach, provider-specific review, commercial engagement, market selection, endpoint approval, endpoint selection, provider selection, provider ranking, provider preference formation, chain selection, stablecoin selection, ADR drafting readiness, implementation-preflight, implementation, sandbox access, API keys, staging, testing, live operations, production use, customer-money movement, custody, deposits, withdrawals, stablecoin conversion, fiat payout, treasury operations, liquidity buffer operations, reconciliation operations, support operations, complaint handling, incident handling, audit operations, Class B execution, or customer fund movement authority.

Kenya remains a thesis stress-test frame only. M-Pesa remains an endpoint hypothesis only. No provider, endpoint, market, jurisdiction, chain, stablecoin, or customer-money activity is selected, approved, ranked, or authorized.

Any future counsel engagement, formal legal opinion, legal reliance, provider-specific review, provider outreach, market comparison, additional source-pointer preservation, ADR drafting readiness, implementation-preflight, implementation, staging, sandbox use, testing, live operations, custody, rails, stablecoin conversion, deposits, withdrawals, fiat payout, treasury operations, reconciliation operations, support operations, audit operations, Class B execution, or customer-money activity requires separate repo-native authorization through `docs/ops/HEDGR_STATUS.md` `§7` and `§7a`.
