# HEDGR - Class B Off-Ramp Kenya / KES M-Pesa Thesis Stress-Test Source-Pointer Classification

**Document status:** Governed repo-native source-pointer classification artifact / documentation-only
**Ticket:** `EVID-INTAKE-B-004`
**Hypothesis:** `FRQ-OFFRAMP-001` - Kenya / KES same-name M-Pesa-primary withdrawal hypothesis
**Authority posture:** Source-pointer preservation and classification only
**Evidence review authority:** None
**Evidence acceptance authority:** None
**Provider outreach authority:** None
**Market selection authority:** None
**Endpoint approval authority:** None
**Provider selection authority:** None
**Implementation authority:** None
**Customer-money authority:** None

---

## 1. Status / Authority / Scope

This artifact is a governed repo-native source-pointer classification artifact produced under the bounded `EVID-INTAKE-B-004` ticket.

It preserves and classifies already-available source pointers for one thesis stress-test frame:

> `FRQ-OFFRAMP-001` - Kenya / KES same-name M-Pesa-primary withdrawal hypothesis.

This artifact is documentation-only and non-executing. It may identify friction, gaps, blockers, confirmation requirements, legal-review requirements, operational-evidence requirements, trust UX risks, and founder / HedgrOps next-decision options. It does not review, accept, reject, score, evaluate, certify, or treat any pointer as evidence sufficient for reliance.

This artifact is subordinate to:

1. `docs/ops/HEDGR_STATUS.md`
2. `AGENTS.md`
3. accepted ADRs
4. `.cursorrules`
5. `docs/doctrine/hedgr-constitutional-charter.md`
6. `docs/doctrine/hedgr-mvp-project-specification.md`
7. `docs/ops/governance/class-b/HEDGR_CLASS_B_EVIDENCE_INTAKE_AUTHORIZATION_BRIEF.md`
8. `docs/ops/governance/offramp/HEDGR_OFFRAMP_GOVERNANCE_FRAMEWORK.md`
9. `docs/ops/governance/offramp/HEDGR_OFFRAMP_EVIDENCE_MATRIX_PREP_DRAFT.md`
10. `docs/ops/governance/offramp/HEDGR_CLASS_B_OFFRAMP_MARKET_ENDPOINT_EVIDENCE_BRIEF.md`
11. `docs/ops/governance/offramp/HEDGR_CLASS_B_OFFRAMP_KENYA_KES_MPESA_INTAKE_AUTHORITY_ENTRY.md`
12. the completed Class B governance and evidence programs recorded in `docs/ops/HEDGR_STATUS.md`

Current boundaries preserved:

- Kenya is not selected as a launch market.
- M-Pesa is not selected as an approved endpoint.
- no provider is selected;
- no provider ranking or provider preference is formed;
- no provider outreach is authorized or performed;
- no evidence review, acceptance, rejection, scoring, evaluation, or sufficiency determination is authorized;
- no Evidence Registry row is changed;
- no Class B blocker or gap is closed;
- no legal reliance, ADR drafting readiness, implementation-preflight, implementation, staging, sandbox, live operation, or customer-money activity is authorized.

## 2. Thesis stress-test rationale

Founder / HedgrOps selected the Kenya / KES / M-Pesa path as a thesis stress-test frame because the immediate learning objective is controlled uncertainty reduction around Africa / mobile-money off-ramp friction.

The controlling question for this ticket is:

> What friction, blockers, gaps, and confirmation requirements does the Kenya / KES / M-Pesa same-name withdrawal hypothesis expose?

The controlling question is not whether Kenya can launch, whether M-Pesa should be used, which provider should be selected, or whether Hedgr can move customer money.

The diagnostic value of this classification is that mobile-money depth, MNO permissioning, local liquidity, same-name wallet control, fees, limits, failed-payout handling, refunds, status truth, support ownership, and legal boundaries may expose the real operating friction Hedgr must understand before making product, trust, or governance claims.

## 3. Permitted source classes

This artifact uses only these source classes:

| Source class | Meaning | Boundary |
|---|---|---|
| `repo_governance` | Repo-native doctrine, status, governance, evidence, or off-ramp artifacts. | Authority depends on the cited artifact; this artifact does not widen it. |
| `repo_research` | Canonical Hedgr research artifact promoted as decision-support only. | Supporting reference only; not governance authority. |
| `public_source_pointer` | Already-available public provider, developer, payment-system, or regulator pointer preserved in repo-native research or governance artifacts. | Pointer only; not provider permission, legal reliance, commercial terms, or operational evidence. |
| `founder_provided_non_confidential` | Founder / HedgrOps non-confidential ticket brief or source-pointer instruction. | Ticket framing only; not evidence review or approval. |

No provider was contacted. No provider material was requested. No external source was newly refreshed by this ticket.

Public source pointers preserved here may have changed since the repo research access date. URL availability, API coverage, jurisdictional availability, commercial terms, regulatory status, endpoint support, and provider positioning require future freshness review before reliance.

## 4. Source register

| Source ID | Source pointer | Source class | Domain(s) | Date accessed / preserved | Classification | Notes |
|---|---|---|---|---|---|---|
| `KSP-001` | `docs/ops/HEDGR_STATUS.md` §7 / §7a and completed records §112 / §113 | `repo_governance` | authority basis; active-ticket boundary; closeout chain | 2026-06-28 | `source_preserved` | Records `EVID-INTAKE-B-003` completion and no-active-ticket posture before this ticket. |
| `KSP-002` | `docs/ops/governance/offramp/HEDGR_CLASS_B_OFFRAMP_KENYA_KES_MPESA_INTAKE_AUTHORITY_ENTRY.md` | `repo_governance` | FRQ-OFFRAMP-001 authority envelope; same-name scope; red lines | 2026-06-28 | `source_preserved` | Defines what this later intake classification may preserve and classify. |
| `KSP-003` | `docs/ops/governance/offramp/HEDGR_CLASS_B_OFFRAMP_MARKET_ENDPOINT_EVIDENCE_BRIEF.md` | `repo_governance` | source-pointer method; Kenya hypothesis pointers; public pointer inheritance | 2026-06-28 | `source_preserved` | Preserves source pointers only and does not create review or reliance authority. |
| `KSP-004` | `docs/ops/governance/offramp/HEDGR_OFFRAMP_EVIDENCE_MATRIX_PREP_DRAFT.md` | `repo_governance` | evidence domains; same-name withdrawal; blocker categories; trust UX | 2026-06-28 | `public_framing_only` | Preparation draft only; useful for domain structure, not blocker closure. |
| `KSP-005` | `docs/ops/governance/offramp/HEDGR_OFFRAMP_GOVERNANCE_FRAMEWORK.md` | `repo_governance` | off-ramp governance boundary; non-execution posture | 2026-06-28 | `source_preserved` | Keeps this classification subordinate to Class B governance. |
| `KSP-006` | `docs/research/HEDGR_OFFRAMP_STRATEGY_AGENCY_AND_PAYOUT_INFRASTRUCTURE_RESEARCH.md` | `repo_research` | M-Pesa, MNO, mobile money, cash pickup, provider-of-record, settlement, support | 2026-06-26 repo research access / 2026-06-28 preserved here | `public_framing_only` | Decision-support reference only; not evidence review or provider confirmation. |
| `KSP-007` | `docs/research/HEDGR_MVP_WALLET_RAILS_MARKET_STRATEGY_PAPER.md` | `repo_research` | Kenya market thesis; VASP law pointers; Yellow Card / M-Pesa context | 2026-06-26 repo research access / 2026-06-28 preserved here | `public_framing_only` | Decision-support reference only. |
| `KSP-008` | Founder / HedgrOps ticket brief for `EVID-INTAKE-B-004` | `founder_provided_non_confidential` | ticket scope; classification model; required domains; next-decision options | 2026-06-28 | `source_preserved` | Defines this ticket's allowed output and prohibited actions. |
| `KSP-009` | Safaricom Daraja Developer Portal - M-Pesa APIs including B2C, `https://developer.safaricom.co.ke/apis` | `public_source_pointer` | M-Pesa payout endpoint; direct MNO API surface | 2026-06-26 repo research access | `provider_confirmation_required` | Public API surface only; does not establish Hedgr production access, use-case permission, or liquidity terms. |
| `KSP-010` | Yellow Card API Suite - stablecoin and fiat rails, `https://yellowcard.io/api-suite` | `public_source_pointer` | Africa stablecoin / local-fiat provider candidate; mobile money and bank payout questions | 2026-06-26 repo research access | `provider_confirmation_required` | Pointer only; exact Kenya commercial availability and responsibilities require direct provider evidence under later authority. |
| `KSP-011` | Onafriq disbursements, `https://onafriq.com/services/disbursements` | `public_source_pointer` | MNO, bank, offline agent, reconciliation, identity-verification framing | 2026-06-26 repo research access | `provider_confirmation_required` | Pointer only; crypto-originated flow permission and commercial settlement terms are not established here. |
| `KSP-012` | Thunes Money Transfer API v2, `https://docs.thunes.com/money-transfer/v2/` | `public_source_pointer` | beneficiary verification; quote; status; mobile-wallet, bank, card, cash-pickup flows | 2026-06-26 repo research access | `operational_evidence_required` | Pointer only; provider-of-record, compliance allocation, endpoint-level Kenya support, and settlement terms require future evidence. |
| `KSP-013` | TerraPay API Suite, `https://developers.terrapay.com/docs/` | `public_source_pointer` | beneficiary validation; quote; FX; submission; status; cancellation | 2026-06-26 repo research access | `operational_evidence_required` | Pointer only; stablecoin-originated use-case permission and exact endpoint support are not established here. |
| `KSP-014` | MoneyGram Ramps, `https://www.moneygram.com/us/en/ramps` | `public_source_pointer` | cash-pickup fallback / inclusion infrastructure | 2026-06-26 repo research access | `public_framing_only` | Useful fallback / inclusion pointer only; not M-Pesa endpoint evidence. |
| `KSP-015` | Kraken Global Terms, Annex P - MoneyGram Payout Terms, `https://www.kraken.com/en-au/legal/global-terms` | `public_source_pointer` | role separation; refund / error-resolution framing; cash pickup | 2026-06-26 repo research access | `public_framing_only` | Role-boundary example only; not Hedgr legal or contractual evidence. |
| `KSP-016` | Cellulant payouts, `https://www.cellulant.io/payouts/` | `public_source_pointer` | African payouts; mobile wallet / bank / card comparator | 2026-06-26 repo research access | `provider_confirmation_required` | Pointer only; useful comparator to Onafriq but not exact Kenya / M-Pesa evidence. |
| `KSP-017` | Kenya Law - Virtual Asset Service Providers Act, 2025 | `public_source_pointer` | Kenya legal / VASP perimeter | 2026-06-26 repo research access | `legal_review_required` | Legal-review pointer only; not legal reliance. |
| `KSP-018` | Central Bank of Kenya / Kenya Treasury - Draft Virtual Asset Service Providers Regulations, 2026 | `public_source_pointer` | Kenya stablecoin, custody, reserve, disclosure, licensing questions | 2026-06-26 repo research access | `legal_review_required` | Draft-regulation pointer only; requires future legal review before reliance. |

## 5. Domain classification

A single primary classification is assigned per domain for readability. Some domains may require multiple later controls, including provider confirmation, legal review, and operational evidence, before any future reliance.

| Domain | Classification | Preserved source IDs | Gap / blocker | Confirmation needed | Notes |
|---|---|---|---|---|---|
| authority basis | `source_preserved` | `KSP-001`, `KSP-008` | Classification authority exists only inside this bounded ticket. | None for this artifact; future work still needs §7 / §7a. | Does not open evidence review or registry movement. |
| same-name withdrawal boundary | `provider_confirmation_required` | `KSP-002`, `KSP-004`, `KSP-006`, `KSP-012`, `KSP-013` | Public pointers do not establish enforceable same-name wallet or beneficiary control. | Provider evidence for name match, wallet ownership, exception handling, and blocked third-party transfers. | Same-name is the controlling hypothesis, not an operating permission. |
| endpoint availability | `provider_confirmation_required` | `KSP-003`, `KSP-006`, `KSP-009`, `KSP-010`, `KSP-011`, `KSP-012`, `KSP-013`, `KSP-016` | Country or API availability is not endpoint-level Kenya / KES / M-Pesa evidence. | Exact Kenya, KES, user-class, and endpoint support by provider. | Endpoint coverage cannot be inferred from provider marketing. |
| M-Pesa payout endpoint | `provider_confirmation_required` | `KSP-006`, `KSP-009`, `KSP-011`, `KSP-012`, `KSP-013` | M-Pesa API or provider routing references do not establish Hedgr use-case permission. | Production access, B2C applicability, commercial permission, local entity needs, and crypto-originated payout permission. | Direct MNO access may create prefunding and support fragmentation. |
| cash-pickup fallback | `public_framing_only` | `KSP-006`, `KSP-014`, `KSP-015` | Cash pickup is fallback / inclusion context only and not M-Pesa evidence. | Future provider evidence for locations, ID rules, uncollected cash, refunds, and agent liquidity if ever in scope. | Must remain fallback / inclusion infrastructure, not default endpoint. |
| provider-of-record responsibility | `provider_confirmation_required` | `KSP-004`, `KSP-006`, `KSP-010`, `KSP-011`, `KSP-012`, `KSP-013` | No public pointer assigns Hedgr-safe provider-of-record roles for conversion, payout, compliance, and settlement. | Provider responsibility matrix and legal entity details. | Core blocker for any later provider-specific review. |
| conversion responsibility | `provider_confirmation_required` | `KSP-006`, `KSP-010`, `KSP-012`, `KSP-013` | Stablecoin-to-KES conversion owner is not established. | Provider conversion role, supported assets, supported chain, quote type, FX source, fees, and settlement asset. | Chain and stablecoin remain unselected. |
| fiat payout responsibility | `provider_confirmation_required` | `KSP-006`, `KSP-009`, `KSP-011`, `KSP-012`, `KSP-013` | Local payout owner and local partner role are unclear. | Provider / local partner responsibility, MNO relationship, local rail reference, and payout finality language. | Hedgr must not become the payout operator by implication. |
| same-name beneficiary validation | `operational_evidence_required` | `KSP-004`, `KSP-006`, `KSP-012`, `KSP-013` | Name, phone, wallet ownership, and user-class validation evidence is missing. | Beneficiary validation response semantics, mismatch handling, and error codes. | Wrong endpoint risk remains visible. |
| KYC / KYB / AML / sanctions responsibility | `legal_review_required` | `KSP-004`, `KSP-006`, `KSP-010`, `KSP-017`, `KSP-018` | Onboarding and screening duties cannot be inferred from public pointers. | Legal review and provider compliance matrix for user, provider, local partner, and Hedgr roles. | Freelancer / SME suitability remains unresolved. |
| provider licensing / regulatory posture | `legal_review_required` | `KSP-006`, `KSP-007`, `KSP-017`, `KSP-018` | Kenya VASP and stablecoin perimeter require legal review. | Licensed entity, permitted activity, regulator perimeter, and customer disclosure obligations. | No legal reliance is created here. |
| local liquidity ownership | `provider_confirmation_required` | `KSP-004`, `KSP-006`, `KSP-010`, `KSP-011`, `KSP-012`, `KSP-013` | Public pointers do not establish who owns KES / MNO / settlement liquidity. | Prefunding, settlement account, reserves, float owner, and liquidity shortfall treatment. | This is a primary Kenya friction domain. |
| Hedgr-managed prefunding risk | `blocked` | `KSP-004`, `KSP-006` | A model requiring Hedgr-managed MNO, bank, or agent prefunding is outside this hypothesis and poor MVP fit. | Future governance would need explicit authority to revisit. | Treat as no-go / defer signal for this thesis if provider-managed liquidity is unavailable. |
| wallet / transaction / payout limits | `operational_evidence_required` | `KSP-004`, `KSP-006`, `KSP-009`, `KSP-012`, `KSP-013` | Wallet, velocity, transaction, and payout limits are not established. | Provider and local-rail limit tables by user class and endpoint. | Limits must be displayable and enforceable before any future operating path. |
| fee / FX / spread / endpoint charge disclosure | `operational_evidence_required` | `KSP-004`, `KSP-006`, `KSP-012`, `KSP-013` | Total landed cost is unknown. | Quote type, expiry, provider fee, FX spread, M-Pesa charges, taxes / levies, and refund fee treatment. | Trust copy must not imply fixed or final amounts without evidence. |
| settlement state definitions | `operational_evidence_required` | `KSP-004`, `KSP-006`, `KSP-012`, `KSP-013` | Public status terms do not establish finality or user-facing truth. | Status taxonomy for received, processing, available, credited, failed, cancelled, refunded, and reversed. | Avoid collapsing provider status into local wallet credit. |
| settlement finality | `operational_evidence_required` | `KSP-004`, `KSP-006`, `KSP-012`, `KSP-013` | Finality semantics across provider, MNO, and user wallet are unclear. | Local rail finality, reversal rules, failed-credit treatment, and timeout state. | "Completed" must not be used as a promise. |
| reconciliation source of truth | `operational_evidence_required` | `KSP-004`, `KSP-006`, `KSP-011`, `KSP-012`, `KSP-013` | External transaction truth hierarchy is not established. | Provider transaction ID, M-Pesa reference, local rail reference, webhook/status evidence, and audit-log mapping. | Hedgr database must not become final settlement truth by implication. |
| failed payout handling | `operational_evidence_required` | `KSP-004`, `KSP-006`, `KSP-012`, `KSP-013` | Failure codes, retry rules, and user messaging are missing. | Provider failure taxonomy, retry / stop rules, support path, and customer notice text. | Required before any later operational reliance. |
| refund path | `operational_evidence_required` | `KSP-004`, `KSP-006`, `KSP-013`, `KSP-015` | Refund route, timing, currency, fees, and failed refund cases are unknown. | Refund terms for failed, cancelled, timed-out, wrong endpoint, and uncollected payout cases. | Cash fallback adds separate uncollected-cash questions. |
| cancellation / timeout handling | `operational_evidence_required` | `KSP-004`, `KSP-006`, `KSP-013` | Cancellation rights and timeout states are not established. | Provider cancellation API / terms, timeout windows, reversal treatment, and user notice boundary. | Cannot be inferred from generic status APIs. |
| support ownership | `provider_confirmation_required` | `KSP-004`, `KSP-006`, `KSP-010`, `KSP-011`, `KSP-012`, `KSP-013`, `KSP-015` | User support handoff between Hedgr, provider, MNO, and cash agent is unclear. | Support matrix, escalation SLA, user-visible owner, and evidence required at each state. | Support is part of the rail. |
| complaint / dispute ownership | `legal_review_required` | `KSP-004`, `KSP-006`, `KSP-015`, `KSP-017`, `KSP-018` | Regulated complaint owner and dispute rights are unknown. | Legal review and provider complaint / error-resolution responsibilities. | No complaint-handling authority is created here. |
| data-sharing / privacy basis | `legal_review_required` | `KSP-004`, `KSP-006`, `KSP-012`, `KSP-013`, `KSP-017`, `KSP-018` | User identity, phone, wallet, transaction, and compliance-data sharing basis is unknown. | Data map, legal basis, provider DPA / terms, retention period, and minimization duties. | Privacy and audit risks must remain visible. |
| audit / retention basis | `operational_evidence_required` | `KSP-004`, `KSP-006`, `KSP-011`, `KSP-012`, `KSP-013` | Event receipts, retention class, and audit fields are not established. | Required transaction IDs, local rail references, status history, user consent, and support evidence fields. | No audit-operation authority is created here. |
| trust UX language | `trust_ux_risk` | `KSP-004`, `KSP-006`, `KSP-008` | User-facing language could overstate speed, certainty, finality, or availability. | Copy constraints for quote, fee, delay, failed payout, refund, support, and endpoint uncertainty. | Use non-promissory wording and visible uncertainty. |
| incident stop conditions | `operational_evidence_required` | `KSP-004`, `KSP-006` | Stop conditions for outage, stuck funds, sanctions hold, liquidity shortfall, and ambiguous wallet owner are not defined. | Future playbook evidence and provider escalation path. | Without these, later operational reliance should defer. |
| provider outreach boundary | `blocked` | `KSP-001`, `KSP-008` | This ticket does not authorize outreach or material requests. | Future §7 / §7a authority only. | No provider was contacted. |
| legal reliance boundary | `blocked` | `KSP-001`, `KSP-008`, `KSP-017`, `KSP-018` | This ticket cannot rely on legal conclusions. | Future legal-review preflight only if separately authorized. | Public legal/regulatory pointers remain pointers. |
| implementation boundary | `blocked` | `KSP-001`, `KSP-008` | This ticket does not authorize implementation-preflight, staging, sandbox, API keys, code, or tests. | Future repo-native authority only. | No product/code/test/CI/runtime files are touched. |
| Class B execution boundary | `blocked` | `KSP-001`, `KSP-004`, `KSP-008` | Customer-money activity and Class B execution remain outside scope. | Future authority and evidence program movement would be required. | No deposits, withdrawals, conversion, custody, payout, treasury, support, reconciliation, or audit operations. |

## 6. Provider-confirmation-needed map

Provider confirmation would be required before any later provider-specific evidence review could progress on:

- exact Kenya / KES / M-Pesa endpoint support for same-name user withdrawals;
- permitted user classes, including freelancer and SME-owner suitability;
- whether business wallets can receive payouts or only personal wallets;
- provider-of-record entity, jurisdiction, and role boundaries;
- stablecoin receipt, conversion, supported asset, supported chain, and settlement model;
- fiat payout owner, local partner role, and MNO relationship;
- M-Pesa / wallet beneficiary validation, phone ownership signals, and name mismatch handling;
- KYC, KYB, AML, sanctions, source-of-funds, and escalation responsibility;
- provider-owned or partner-owned local liquidity, prefunding, reserves, settlement accounts, and liquidity shortfall handling;
- limits, fees, FX, spread, local endpoint charges, taxes / levies, and quote expiry;
- status lifecycle, finality, transaction IDs, local rail references, and reconciliation fields;
- failed payout, cancellation, timeout, refund, reversal, and ambiguous endpoint handling;
- support, complaint, dispute, escalation, incident, and audit responsibilities.

This map is not a request for provider outreach and does not authorize provider engagement.

## 7. Legal-review-needed map

Legal review would be required before any future reliance on:

- Kenya VASP perimeter and whether the hypothesis creates licensing, payment, remittance, e-money, VASP, stablecoin, or custody obligations for Hedgr;
- the allocation of compliance duties among Hedgr, provider-of-record, payout partner, MNO, cash agent, and user;
- user eligibility, freelancer / SME treatment, business wallet use, and same-name withdrawal enforcement;
- data-sharing, privacy, retention, audit, consent, and provider-data transfer basis;
- complaint ownership, dispute rights, error-resolution duties, and consumer protection obligations;
- stablecoin reserve, custody, redemption, disclosure, and payment-system implications if touched by future authority.

This artifact does not create legal reliance.

## 8. Operational-evidence-needed map

Operational evidence would be required before any later operational reliance on:

- local endpoint availability by provider, endpoint, country, currency, user class, and transaction type;
- wallet, transaction, payout, velocity, cash-out, and business-account limits;
- quote type, fee, FX spread, local charges, tax / levy signals, expiry, and changed-amount handling;
- settlement states, finality, webhooks, provider transaction IDs, M-Pesa references, and local rail references;
- failed payout codes, retry policy, cancellation windows, timeout states, refund route, refund timing, refund currency, and fee treatment;
- support ownership, complaint routing, dispute handoff, SLA, evidence handoff, and escalation path;
- incident stop conditions for outages, stuck funds, sanctions holds, liquidity shortfalls, wallet/name mismatch, webhook failure, and ambiguous local endpoint state;
- audit evidence fields, retention class, access controls, reconciliation reports, and exception logs.

## 9. Trust UX risk notes

Any later user-facing language must avoid implying guaranteed, instant, final, or always-available withdrawal.

Trust UX risks exposed by this classification:

- "Kenya supported" could be misread as M-Pesa same-name payout availability.
- "M-Pesa payout" could be misread as user wallet credit rather than provider acceptance or payout initiation.
- "Completed" could be misread as local wallet credit, cash availability, or final settlement.
- "Low fee" or "known fee" could omit FX spread, local endpoint charge, tax / levy, wallet withdrawal charge, or changed final amount.
- "Refund" could be misread as instant, same-currency, no-fee, or same-route reversal.
- "Provider handles compliance" could obscure Hedgr's data, disclosure, support, and escalation duties.
- "Cash pickup fallback" could be misread as universal availability or agent liquidity.

Future copy should preserve visible uncertainty around endpoint eligibility, provider role, fee / FX, delay, failure, refund, support, and incident stop conditions.

## 10. Cash-pickup fallback / inclusion note

Cash pickup remains a fallback / inclusion source-pointer class only.

The MoneyGram-class pointers are useful because they show that physical cash access can be a legitimate inclusion and resilience rail for users without reliable digital-account access. They do not establish a Kenya / KES / M-Pesa endpoint, a Hedgr provider path, cash availability, same-name wallet validation, local compliance fit, or refund / dispute responsibility for Hedgr.

Cash pickup would require separate evidence for:

- ID and name-match requirements;
- voucher or pickup-code risk;
- collection windows and expiry;
- agent hours and cash liquidity;
- uncollected cash and refund treatment;
- fraud, coercion, lost code, and wrong-recipient controls;
- support, dispute, and complaint owner;
- reconciliation source of truth.

## 11. Friction profile

This classification exposes the following Kenya / KES / M-Pesa friction profile:

1. **Endpoint friction:** M-Pesa API or provider routing references are not the same as exact same-name KES payout support for this hypothesis.
2. **Commercial-permission friction:** MNO, aggregator, and provider access may depend on local entity status, use-case permission, reserves, security deposits, or restricted business categories.
3. **Liquidity friction:** Direct MNO or PSP payout paths may require prefunding; Hedgr-managed prefunding remains outside the hypothesis.
4. **Compliance friction:** KYC / KYB, AML, sanctions, source-of-funds, VASP, stablecoin, and payment-perimeter duties cannot be inferred.
5. **Identity friction:** Same-name beneficiary validation, wallet ownership, phone control, and mismatch treatment remain unresolved.
6. **Cost and limits friction:** Wallet, transaction, payout, endpoint, FX, spread, tax / levy, and cash-out costs are not preserved in an operationally reliable form.
7. **Status-truth friction:** Provider status, MNO credit, finality, refund, and reconciliation truth may diverge.
8. **Support friction:** Customer support, complaints, disputes, failed payout handling, and incident escalation are part of the rail, not afterthoughts.
9. **Trust-language friction:** User copy must resist promising speed, certainty, finality, fee certainty, refund certainty, or universal M-Pesa availability.

## 12. No-go / defer signals

The Kenya / KES / M-Pesa hypothesis should no-go or defer in later governance if the only available path requires:

- Hedgr-managed MNO, bank, agent, or PSP prefunding;
- Hedgr custody of fiat or local payout liquidity;
- unresolved provider-of-record, conversion, payout, settlement, or compliance ownership;
- no provider evidence for same-name beneficiary validation and wallet ownership;
- no clear failed-payout, refund, cancellation, timeout, support, complaint, or dispute responsibility;
- no external reconciliation source of truth;
- trust copy that would need to promise instant, guaranteed, final, or always-available withdrawal;
- legal uncertainty that cannot be scoped without separate legal-review authority;
- provider outreach, sandbox access, API keys, implementation-preflight, or customer-money movement before repo-native authorization.

## 13. Founder / HedgrOps next-decision options

This artifact supports only these next-decision options:

A. No-go / defer the Kenya hypothesis.
B. Authorize later provider-specific evidence review.
C. Authorize legal-review preflight.
D. Authorize comparison against another market hypothesis, such as Philippines.
E. Preserve additional public, repo-native, or founder-provided source pointers under a new bounded ticket.

This artifact does not recommend provider outreach, provider selection, market selection, endpoint approval, ADR drafting readiness, implementation-preflight, sandbox testing, customer-money activity, or Class B execution.

## 14. Non-authorization statement

This artifact is non-authorizing and documentation-only.

It does not authorize evidence review, evidence acceptance, evidence rejection, evidence scoring, evidence evaluation, evidence sufficiency determination, blocker closure, gap closure, Evidence Registry state movement, provider outreach, commercial engagement, provider-specific review, provider ranking, provider preference formation, legal reliance, market selection, endpoint approval, endpoint selection, provider selection, jurisdiction selection, chain selection, stablecoin selection, ADR drafting readiness, implementation-preflight, implementation, sandbox access, API keys, staging, internal testing, live operations, production use, customer-money movement, custody, deposits, withdrawals, stablecoin conversion, fiat payout, treasury operations, liquidity buffer operations, reconciliation operations, support operations, complaint handling, incident handling, audit operations, Class B execution, or customer fund movement.

Any future evidence review, provider-specific review, legal-review preflight, provider outreach, market comparison, ADR drafting readiness, implementation-preflight, implementation, or customer-money activity requires separate repo-governed authorization through `docs/ops/HEDGR_STATUS.md` §7 and §7a.
