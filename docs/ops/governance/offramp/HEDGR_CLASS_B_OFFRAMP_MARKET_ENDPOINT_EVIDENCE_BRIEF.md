# HEDGR - Class B Off-Ramp Market / Endpoint Source-Pointer Brief

**Document status:** Governed repo-native source-pointer brief / documentation-only intake-support artifact
**Prepared date:** 2026-06-27
**Ticket:** `EVID-INTAKE-B-002` - Bounded Class B Off-Ramp Market / Endpoint Source-Pointer Brief
**Authority level:** Documentation-only governance / intake-support
**Implementation authority:** None
**Evidence review authority:** None
**Evidence acceptance authority:** None
**Provider outreach authority:** None
**Market / endpoint / provider selection authority:** None
**Customer-money authority:** None

---

## 1. Status / Authority / Scope

This artifact is a governed repo-native Market / Endpoint Source-Pointer Brief produced under the bounded `EVID-INTAKE-B-002` ticket named in `docs/ops/HEDGR_STATUS.md` `§7` / `§7a`.

It preserves, classifies, and records source pointers for future off-ramp governance review. It does not review, accept, reject, score, evaluate, or certify evidence.

This ticket opened source-pointer preservation only. It did not open evidence review, evidence sufficiency assessment, provider-specific review, blocker-closure review, ADR drafting readiness, implementation-preflight, or implementation.

It is subordinate to:

1. `docs/ops/HEDGR_STATUS.md`
2. `AGENTS.md`
3. accepted ADRs
4. `.cursorrules`
5. `docs/doctrine/hedgr-constitutional-charter.md`
6. `docs/doctrine/hedgr-mvp-project-specification.md`
7. `docs/ops/governance/class-b/HEDGR_CLASS_B_EVIDENCE_INTAKE_AUTHORIZATION_BRIEF.md`
8. `docs/ops/governance/offramp/HEDGR_OFFRAMP_GOVERNANCE_FRAMEWORK.md`
9. `docs/ops/governance/offramp/HEDGR_OFFRAMP_EVIDENCE_MATRIX_PREP_DRAFT.md`
10. the completed Class B governance and evidence programs recorded in `docs/ops/HEDGR_STATUS.md`

Current boundaries preserved:

- no market is selected;
- no endpoint is selected;
- no provider is selected;
- no provider-specific evidence review is opened;
- no external evidence request or outreach is made;
- no Evidence Registry row is changed;
- no Class B blocker is closed;
- no ADR drafting readiness, implementation-preflight, implementation, staging, sandbox, live operation, or customer-money activity is authorized.

---

## 2. Bounded Governance Question

This brief is designed to help founder / HedgrOps later answer one bounded governance question:

> Should Hedgr later authorize a provider-specific evidence review for one bounded market / endpoint hypothesis?

The first hypothesis layer must remain narrow:

```text
one market or corridor
one user class
same-name withdrawal only
one primary endpoint
one fallback endpoint, if evidenced
provider-owned conversion and payout
provider-owned or provider-managed local liquidity
no Hedgr-managed MNO / bank / agent prefunding
no third-party beneficiaries
no customer-money movement
no implementation authority
```

This brief records several candidate market / endpoint hypotheses only so governance can compare what a later single-hypothesis review could look like. The list is unordered. It is not a ranked market list, provider shortlist, or launch plan.

---

## 3. Source-Pointer Method

### 3.1 Intake State Used In This Brief

All records in this brief use the same state:

```text
preserved_source_pointer_only
```

Meaning:

- the pointer exists;
- the pointer is relevant to a future evidence question;
- the pointer has not been reviewed as sufficient;
- the pointer has not been accepted;
- the pointer has not closed a blocker or gap;
- downstream reliance is not authorized.

### 3.2 Source Classes

| Source class | Meaning | Current authority |
|---|---|---|
| `repo_governance` | Repo-native doctrine, status, governance, or evidence scaffolding artifact. | Authority depends on the cited artifact; this brief does not widen it. |
| `repo_research` | Canonical Hedgr research artifact promoted as decision-support only. | Supporting reference only; not governance authority. |
| `public_provider_docs` | Public provider, developer, or commercial documentation cited by repo research. | Pointer only; not provider permission or confirmation. |
| `public_regulatory_docs` | Public regulator, central bank, or payment-system source cited by repo research. | Pointer only; not legal advice or Hedgr-specific approval. |
| `future_review_placeholder` | Placeholder for a later governed review record. | No review authority. |

### 3.3 Confidentiality Tier

All records preserved in this brief are `PUBLIC` or `INTERNAL` only.

No raw KYC, PII, sanctions, PEP, legal advice, commercial terms, provider confirmation, or restricted operational record is stored in this artifact.

### 3.4 Required Non-Authorization Note

Each source-pointer record in this brief carries this note:

```text
This record preserves a source pointer only. It does not accept, reject, score,
evaluate, approve, or certify evidence; close any blocker or gap; establish
readiness; authorize provider outreach; authorize ADR drafting; authorize
implementation-preflight; authorize implementation; or authorize customer-money
activity.
```

---

## 4. Repo-Native Source-Pointer Register

| ID | Source pointer | Source class | Source date | Confidentiality | Claim potentially supported | Claim not supported |
|---|---|---|---|---|---|---|
| `RP-001` | `docs/ops/HEDGR_STATUS.md` `§7` / `§7a` | `repo_governance` | 2026-06-27 | `INTERNAL` | `EVID-INTAKE-B-002` was bounded to documentation-only preservation / classification / recording. | Evidence sufficiency, provider selection, market selection, implementation readiness. |
| `RP-002` | `docs/ops/governance/class-b/HEDGR_CLASS_B_EVIDENCE_INTAKE_AUTHORIZATION_BRIEF.md` | `repo_governance` | 2026-06-27 | `INTERNAL` | Future intake mechanics and source-pointer format. | Evidence review, acceptance, registry state change, readiness. |
| `RP-003` | `docs/ops/governance/offramp/HEDGR_OFFRAMP_EVIDENCE_MATRIX_PREP_DRAFT.md` | `repo_governance` | 2026-06-26 | `INTERNAL` | Off-ramp evidence domains, same-name withdrawal posture, approved response posture, blocker categories. | Evidence intake authority, evidence sufficiency, provider or market approval. |
| `RP-004` | `docs/ops/governance/offramp/HEDGR_OFFRAMP_GOVERNANCE_FRAMEWORK.md` | `repo_governance` | 2026-06-27 | `INTERNAL` | Off-ramp is a Class B cross-cutting governance framework subordinate to repo authority. | Independent off-ramp institution, operational approval, customer-money activity. |
| `RP-005` | `docs/research/HEDGR_OFFRAMP_STRATEGY_AGENCY_AND_PAYOUT_INFRASTRUCTURE_RESEARCH.md` | `repo_research` | 2026-06-27 | `INTERNAL` | Candidate off-ramp operating hypotheses, provider universe, endpoint taxonomy, source register. | Provider confirmation, evidence acceptance, market or endpoint selection. |
| `RP-006` | `docs/research/HEDGR_MVP_WALLET_RAILS_MARKET_STRATEGY_PAPER.md` | `repo_research` | 2026-06-27 | `INTERNAL` | Candidate market set, wallet / rails / cash-out research posture, source pointers. | Launch market selection, rail provider approval, Class B readiness. |
| `RP-007` | `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_EVIDENCE_REGISTRY.md` | `repo_governance` | 2026-06-27 | `INTERNAL` | Current evidence registry posture remains evidence-missing unless separately changed. | Any registry-row movement by this ticket. |
| `RP-008` | `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_EVIDENCE_INTAKE_READINESS_PLANNING_MEMO.md` | `repo_governance` | 2026-06-27 | `INTERNAL` | Intake readiness questions, traceability questions, and source-pointer governance concerns. | Intake authority, evidence collection, evidence acceptance. |

---

## 5. Public Source-Pointer Register

The public pointers below are preserved from the canonical repo research source registers. They were not independently refreshed by this ticket and are not accepted evidence.

Because these public pointers were not independently refreshed by this ticket, URL availability, content, jurisdictional coverage, terms, product availability, and provider positioning may have changed and require future freshness review before reliance.

| ID | Public source pointer | Source class | Source date | Confidentiality | Potential future evidence question | Claim not supported |
|---|---|---|---|---|---|---|
| `PP-001` | Kraken - MoneyGram partnership announcement, 2026-05-05, `https://blog.kraken.com/news/moneygram-partnership` | `public_provider_docs` | 2026-06-26 repo research access | `PUBLIC` | How a large exchange frames cash-out distribution and role separation. | Hedgr provider approval or market fit. |
| `PP-002` | MoneyGram Ramps, `https://www.moneygram.com/us/en/ramps` | `public_provider_docs` | 2026-06-26 repo research access | `PUBLIC` | Cash-pickup endpoint and developer positioning. | Live bank / wallet / card availability for Hedgr. |
| `PP-003` | Kraken Global Terms, Annex P - MoneyGram Payout Terms, last updated 2026-06-09, `https://www.kraken.com/en-au/legal/global-terms` | `public_provider_docs` | 2026-06-26 repo research access | `PUBLIC` | Example responsibility boundary among exchange, payout provider, refund, and error-resolution roles. | Hedgr legal or contractual boundary. |
| `PP-004` | MoneyGram Developer bridging-chain / USDC-Stellar guidance, `https://developer.moneygram.com/moneygram-developer/docs/bridging-chain-best-practice` | `public_provider_docs` | 2026-06-26 repo research access | `PUBLIC` | Chain and provider-flow dependency questions. | Hedgr chain selection. |
| `PP-005` | MTN MoMo Developer Portal, `https://momodeveloper.mtn.com/` | `public_provider_docs` | 2026-06-26 repo research access | `PUBLIC` | MNO disbursement technical-surface questions. | Hedgr production access, commercial permission, or liquidity terms. |
| `PP-006` | Safaricom Daraja Developer Portal, `https://developer.safaricom.co.ke/apis` | `public_provider_docs` | 2026-06-26 repo research access | `PUBLIC` | M-Pesa API surface and B2C evidence questions. | Hedgr production access or M-Pesa payout authority. |
| `PP-007` | South African Reserve Bank Payments Ecosystem Modernisation Programme, `https://www.resbank.co.za/en/home/what-we-do/payments-and-settlements/pem` | `public_regulatory_docs` | 2026-06-26 repo research access | `PUBLIC` | Prefunding and payment-modernisation evidence questions. | Hedgr regulatory approval. |
| `PP-008` | Thunes Money Transfer API v2, `https://docs.thunes.com/money-transfer/v2/` | `public_provider_docs` | 2026-06-26 repo research access | `PUBLIC` | Multi-rail payout flow, beneficiary, quote, and status questions. | Provider-of-record approval or country/endpoint sufficiency. |
| `PP-009` | TerraPay API Suite, `https://developers.terrapay.com/docs/` | `public_provider_docs` | 2026-06-26 repo research access | `PUBLIC` | Bank / mobile / card payout lifecycle questions. | Provider selection or Hedgr-specific permission. |
| `PP-010` | dLocal emerging-market payment / payout / stablecoin infrastructure, `https://www.dlocal.com/` | `public_provider_docs` | 2026-06-26 repo research access | `PUBLIC` | Emerging-market local rail and stablecoin provider questions. | Market or provider readiness. |
| `PP-011` | dLocal and National Exchange remittance payout partnership, 2026-04-14, `https://www.dlocal.com/press-releases/dlocal-and-national-exchange-partner-to-power-remittance-payouts-across-africa-apac-and-latin-america/` | `public_provider_docs` | 2026-06-26 repo research access | `PUBLIC` | Africa / APAC / LatAm payout-partner evidence questions. | Hedgr remittance or payout authority. |
| `PP-012` | Yellow Card API Suite, `https://yellowcard.io/api-suite` | `public_provider_docs` | 2026-06-26 repo research access | `PUBLIC` | Africa stablecoin / local-fiat rail questions. | Provider approval, country availability, or same-name payout viability. |
| `PP-013` | Onafriq disbursements, `https://onafriq.com/services/disbursements` | `public_provider_docs` | 2026-06-26 repo research access | `PUBLIC` | Africa bank, mobile-money, and offline-agent endpoint questions. | Provider selection or Hedgr-specific authorization. |
| `PP-014` | Cellulant payouts, `https://www.cellulant.io/payouts/` | `public_provider_docs` | 2026-06-26 repo research access | `PUBLIC` | African payout platform evidence questions. | Stablecoin conversion or endpoint sufficiency. |
| `PP-015` | BSP National Retail Payment System, PESONet and InstaPay, `https://www.bsp.gov.ph/Pages/PAYMENTS%20AND%20SETTLEMENTS/National%20Retail%20Payment%20System/Empowering-Every-Juan-and-Maria.aspx` | `public_regulatory_docs` | 2026-06-26 repo research access | `PUBLIC` | Philippines bank / e-money payment infrastructure questions. | Hedgr VASP, payment, or provider approval. |
| `PP-016` | Banco Central do Brasil Pix FAQ and participants, `https://www.bcb.gov.br/en/financialstability/pixfaqen` / `https://www.bcb.gov.br/en/financialstability/pixparticipants` | `public_regulatory_docs` | 2026-06-26 repo research access | `PUBLIC` | Brazil Pix endpoint / participant evidence questions. | Hedgr FX, VASP, or local provider approval. |
| `PP-017` | Banco Central de la Republica Argentina payment infrastructure, `https://www.bcra.gob.ar/billetes-monedas-y-otros-medios-de-pago/` | `public_regulatory_docs` | 2026-06-26 repo research access | `PUBLIC` | Argentina payment-method evidence questions. | Hedgr PSAV, FX, or local payout approval. |
| `PP-018` | Banco Central de la Republica Argentina interoperable digital wallets, `https://www.bcra.gob.ar/billeteras-digitales-interoperables/` | `public_regulatory_docs` | 2026-06-26 repo research access | `PUBLIC` | Argentina wallet / CBU / CVU endpoint questions. | Market selection or provider approval. |

---

## 6. Market / Endpoint Hypothesis Classification

The rows below are unordered candidate hypotheses. Each row is one possible future review frame. No row is selected, ranked, accepted, or approved.

The table below is not a market shortlist, priority order, launch queue, provider-review queue, implementation queue, or recommendation list.

| ID | Market / corridor | User class | Primary endpoint hypothesis | Fallback endpoint if evidenced | Source pointers | Source class | Source date | Confidentiality | Intake state |
|---|---|---|---|---|---|---|---|---|---|
| `MEH-001` | Philippines / PHP | freelancer / SME or mobile-wallet user | same-name PHP to e-wallet or bank account | cash pickup through qualified provider path | `RP-005`, `RP-006`, `PP-015` | repo research + public regulatory docs | 2026-06-26 / 2026-06-27 | `PUBLIC` / `INTERNAL` | `preserved_source_pointer_only` |
| `MEH-002` | Kenya / KES | mobile-money user, freelancer, or SME | same-name KES to M-Pesa or bank account | cash pickup / agent endpoint if separately evidenced | `RP-005`, `RP-006`, `PP-006`, `PP-012`, `PP-013`, `PP-008`, `PP-009` | repo research + public provider docs | 2026-06-26 / 2026-06-27 | `PUBLIC` / `INTERNAL` | `preserved_source_pointer_only` |
| `MEH-003` | Brazil / BRL | freelancer / SME or digital-bank user | same-name BRL to Pix or bank account | card payout or cash pickup if separately evidenced | `RP-005`, `RP-006`, `PP-016`, `PP-010`, `PP-008` | repo research + public regulatory / provider docs | 2026-06-26 / 2026-06-27 | `PUBLIC` / `INTERNAL` | `preserved_source_pointer_only` |
| `MEH-004` | South Africa / ZAR | freelancer / SME or compliance-benchmark user | same-name ZAR to bank or PayShap-capable partner | cash pickup if separately evidenced | `RP-005`, `RP-006`, `PP-007`, `PP-012`, `PP-010`, `PP-008`, `PP-009` | repo research + public regulatory / provider docs | 2026-06-26 / 2026-06-27 | `PUBLIC` / `INTERNAL` | `preserved_source_pointer_only` |
| `MEH-005` | Argentina / ARS | freelancer / SME or local-wallet user | same-name ARS to CBU / CVU / interoperable wallet | cash pickup if separately evidenced | `RP-005`, `RP-006`, `PP-017`, `PP-018`, `PP-010`, `PP-008` | repo research + public regulatory / provider docs | 2026-06-26 / 2026-06-27 | `PUBLIC` / `INTERNAL` | `preserved_source_pointer_only` |
| `MEH-006` | Zambia / ZMW watchlist | mobile-money user, freelancer, or SME | same-name ZMW to MTN / Airtel / Zamtel-style mobile-money endpoint or bank account | cash pickup / agent endpoint if separately evidenced | `RP-005`, `RP-006`, `PP-005`, `PP-012`, `PP-013`, `PP-008`, `PP-009` | repo research + public provider docs | 2026-06-26 / 2026-06-27 | `PUBLIC` / `INTERNAL` | `preserved_source_pointer_only` |

### Classification Notes

- `MEH-002` and `MEH-006` are mobile-money-heavy hypotheses. They cannot progress without provider-specific evidence for MNO permission, local liquidity ownership, wallet limits, beneficiary validation, failed payout handling, refunds, and reconciliation source of truth.
- `MEH-006` is preserved as a watchlist hypothesis only. Founder familiarity, local relevance, or strategic interest must not be treated as market readiness, provider readiness, regulatory readiness, off-ramp feasibility, or launch priority.
- `MEH-003` is a digital-account / Pix-style hypothesis. It cannot progress without local provider, FX / virtual-asset, quote, finality, reversal, and support evidence.
- `MEH-001` and `MEH-005` depend heavily on local e-wallet / bank-account eligibility and regulated provider boundaries.
- `MEH-004` is useful as a compliance and provider-boundary benchmark, not an automatic launch-market candidate.
- Cash pickup is preserved only as fallback / inclusion infrastructure unless a future governed review explicitly names it as the bounded primary endpoint.

---

## 7. Provider / Endpoint Class Classification

No provider is selected. These classes identify which source-pointer clusters could matter if a future ticket names one bounded market / endpoint hypothesis.

| Class ID | Provider / endpoint class | Potential relevance | Source pointers | Required future evidence before reliance | Current state |
|---|---|---|---|---|---|
| `PEC-001` | Global MTO / cash-pickup network | Cash pickup fallback / inclusion path; role-separation benchmark. | `PP-001`, `PP-002`, `PP-003`, `PP-004` | Hedgr-specific provider permission, legal role, payout finality, refund, complaint, support, cash-availability, and reconciliation evidence. | Source pointer only. |
| `PEC-002` | Africa stablecoin / local-fiat provider | Africa off-ramp / local-currency evidence questions. | `PP-012`, `RP-005`, `RP-006` | Provider-of-record, exact markets, endpoints, KYC/KYB, local liquidity, same-name validation, support, and settlement truth. | Source pointer only. |
| `PEC-003` | Africa last-mile MNO / bank / agent disbursement provider | Mobile-money, bank, and offline endpoint evidence questions. | `PP-013`, `PP-014`, `PP-005`, `PP-006` | Commercial permission, endpoint-level support, prefunding / liquidity ownership, limits, failure and refund handling, reconciliation evidence. | Source pointer only. |
| `PEC-004` | Global multi-rail payout orchestration | Beneficiary validation, quote, multi-endpoint routing, and status lifecycle questions. | `PP-008`, `PP-009` | Provider-of-record, compliance allocation, endpoint-level coverage, local partner role, same-name validation, status semantics, support, and refund evidence. | Source pointer only. |
| `PEC-005` | Emerging-market local rail / stablecoin infrastructure | LatAm / Africa / APAC local rail and stablecoin-adjacent evidence questions. | `PP-010`, `PP-011` | Market-specific provider permission, local legal classification, endpoint support, fees, finality, refunds, reconciliation, and support evidence. | Source pointer only. |
| `PEC-006` | Direct MNO API / local wallet surface | Local utility and recognized user endpoint, especially mobile-money markets. | `PP-005`, `PP-006` | Production access, commercial approval, stablecoin-originated payout permission, prefunding model, wallet limits, beneficiary validation, and reconciliation evidence. | Source pointer only; poor MVP fit if Hedgr must prefund. |
| `PEC-007` | Direct off-ramp / card-bank benchmark providers from parent research | Benchmark for bank/card sell flows, quote, identity, and embedded cash-out review. | `RP-006` source register | Provider-specific terms, local payout methods, exact country support, finality, quote, support, and Hedgr use-case permission. | Source pointer only. |

---

## 8. Future Review Visibility Placeholders

These placeholders are governance visibility records only. They are not a queue, priority order, backlog, reviewer assignment, evidence-review state, provider-review state, successor-ticket list, or implementation sequence.

| Placeholder | Future bounded question | Required future scope if ever activated | Current state |
|---|---|---|---|
| `FRQ-OFFRAMP-001` | Should one Kenya / KES same-name M-Pesa or bank endpoint hypothesis receive provider-specific evidence review? | One user class, one primary endpoint, one fallback endpoint if evidenced, one provider-source class, no customer-money activity. | Placeholder only. |
| `FRQ-OFFRAMP-002` | Should one Philippines / PHP same-name e-wallet or bank endpoint hypothesis receive provider-specific evidence review? | One user class, one primary endpoint, one fallback endpoint if evidenced, one provider-source class, no customer-money activity. | Placeholder only. |
| `FRQ-OFFRAMP-003` | Should one Brazil / BRL same-name Pix or bank endpoint hypothesis receive provider-specific evidence review? | One user class, one primary endpoint, one fallback endpoint if evidenced, one provider-source class, no customer-money activity. | Placeholder only. |
| `FRQ-OFFRAMP-004` | Should one South Africa / ZAR same-name bank or PayShap-capable endpoint hypothesis receive provider-specific evidence review? | One user class, one primary endpoint, one fallback endpoint if evidenced, one provider-source class, no customer-money activity. | Placeholder only. |
| `FRQ-OFFRAMP-005` | Should one Argentina / ARS same-name CBU / CVU / wallet endpoint hypothesis receive provider-specific evidence review? | One user class, one primary endpoint, one fallback endpoint if evidenced, one provider-source class, no customer-money activity. | Placeholder only. |
| `FRQ-OFFRAMP-006` | Should one Zambia / ZMW same-name mobile-money or bank endpoint hypothesis receive provider-specific evidence review? | One user class, one primary endpoint, one fallback endpoint if evidenced, one provider-source class, no customer-money activity. | Placeholder only. |

---

## 9. Gaps Preserved

The following gaps remain open for every market / endpoint hypothesis:

- no qualified legal / compliance memo;
- no provider-specific contract, terms review, or Hedgr use-case permission;
- no provider-of-record confirmation;
- no same-name beneficiary validation evidence;
- no KYC / KYB / AML / sanctions allocation evidence;
- no stablecoin / chain / conversion confirmation for Hedgr's exact use case;
- no quote, fee, FX, spread, tax, or local endpoint charge evidence;
- no endpoint-level transaction limit evidence;
- no local liquidity / prefunding ownership evidence;
- no settlement-state or finality evidence;
- no provider/local rail reconciliation source-of-truth evidence;
- no failed-payout, cancellation, uncollected payout, or refund evidence;
- no support, complaint, dispute, or incident ownership evidence;
- no privacy, data-sharing, audit, retention, or access-boundary evidence;
- no Trust UX copy approval;
- no evidence freshness, contradiction, supersession, or retirement review.

No blocker is closed by this brief.

---

## 10. Closeout Controls

`EVID-INTAKE-B-002` is complete only as a documentation-only source-pointer preservation and classification brief.

Closeout should be verified against `docs/ops/HEDGR_STATUS.md` after merge to confirm `§7` / `§7a` no longer names `EVID-INTAKE-B-002` as active.

Closeout must preserve:

- `HEDGR_STATUS.md` `§7` / `§7a` restored to no-active-ticket posture;
- this brief as the canonical artifact for the ticket;
- `docs/ops/NOTION_GOVERNANCE_STAGING.md` mirrored downstream only;
- all Class B evidence packages and registry rows unchanged;
- no app, package, backend, engine, CI, workflow, test, Copilot runtime, ADR, or product-copy changes;
- no provider outreach;
- no external evidence request;
- no customer-money activity.

---

## 11. Non-Authorization Statement

This brief is non-authorizing and documentation-only. It preserves source pointers, market / endpoint hypothesis classifications, provider / endpoint class classifications, and future review placeholders for governance visibility only.

It does not authorize evidence review, evidence acceptance, evidence rejection, evidence scoring, evidence evaluation, evidence sufficiency determination, blocker closure, gap closure, registry-state changes, evidence-state changes, market selection, endpoint selection, provider selection, jurisdiction selection, chain selection, provider outreach, commercial engagement, vendor onboarding, sandbox access, legal retainer, legal reliance, ADR drafting readiness, implementation-preflight, implementation, staging, internal testing, live operations, production use, custody, rails, stablecoin conversion, deposits, withdrawals, treasury operations, liquidity buffers, reconciliation operations, support operations, complaint handling, incident handling, audit operations, ledger truth, accounting truth, Copilot execution, Class C automation, customer-money activity, or customer fund movement.

Any future evidence review, provider outreach, market selection, provider-specific review, ADR drafting readiness, implementation-preflight, implementation, or customer-money activity requires separate repo-governed authorization through `docs/ops/HEDGR_STATUS.md` `§7` naming where applicable, a bounded `§7a` brief where applicable, accepted ADRs where required, qualified legal / compliance review where applicable, direct provider and market evidence where applicable, source pointers, freshness review, conflict review, dependency review, and audit / retention controls.
