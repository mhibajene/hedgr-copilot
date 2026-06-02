# HEDGR - Class B Fee / FX / Spread Evidence Package

## 1. Status / Authority / Scope

**Status:** Evidence package skeleton; documentation-only.

**Authority:** Non-authoritative evidence-planning artifact subordinate to `docs/ops/HEDGR_STATUS.md`, `AGENTS.md`, accepted ADRs, doctrine, `EVID-B-001` through `EVID-B-010`, future qualified legal / compliance review, and future vendor / provider evidence where applicable.

**Scope:** Defines required fee / FX / spread evidence items, source expectations, review questions, blockers, freshness expectations, and downstream dependencies for future Class B consideration.

**Mode:** Evidence package scaffolding only; not evidence gathering, evidence acceptance, fee approval, FX approval, spread approval, quote approval, pricing approval, treasury approval, legal advice, regulatory approval, or Class B readiness.

This package does not approve FX execution, exchange-rate sourcing, fee model, spread model, quote model, stale-quote handling, slippage model, pricing engine, treasury operation, liquidity operation, settlement value, customer-facing pricing claim, user-facing amount claim, ledger truth, accounting truth, external engagement, Class B execution, implementation, staging, live operations, deposits, withdrawals, custody, rails, stablecoin conversion, treasury operations, Copilot execution, or customer fund movement.

This package does not provide legal advice or claim regulatory approval.

## 2. Purpose

This package exists to instantiate the fee / FX / spread evidence package from the evidence gathering plan and registry.

It answers:

**What fee / FX / spread evidence must be gathered and reviewed before future Class B ADR drafting readiness or implementation-proposal preflight can be considered?**

It does not answer:

**Which FX source, fee model, spread model, quote model, pricing engine, treasury process, or customer-facing pricing claim is approved for Hedgr?**

It does not create:

- FX execution approval
- exchange-rate approval
- fee approval
- spread approval
- quote approval
- pricing-engine approval
- slippage approval
- treasury approval
- liquidity approval
- settlement-value approval
- user-facing amount approval
- disclosure approval
- legal approval
- regulatory approval
- implementation authority
- customer-money authority

## 3. Source inputs

Source inputs:

- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_EVIDENCE_GATHERING_PLAN.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_EVIDENCE_REGISTRY.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_STABLECOIN_CONVERSION_EVIDENCE_PACKAGE.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_RAIL_SETTLEMENT_FINALITY_EVIDENCE_PACKAGE.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_RAIL_VENDOR_PERMISSION_EVIDENCE_PACKAGE.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_CUSTODY_PROVIDER_MODEL_EVIDENCE_PACKAGE.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_KYC_AML_RESPONSIBILITY_EVIDENCE_PACKAGE.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_CUSTOMER_ELIGIBILITY_EVIDENCE_PACKAGE.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_JURISDICTION_SELECTION_EVIDENCE_PACKAGE.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_LEGAL_COMPLIANCE_EVIDENCE_PACKAGE.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_TRUST_UX_PACK.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_RECONCILIATION_SOP.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_AUDIT_EVIDENCE_CHECKLIST.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_SUPPORT_ESCALATION_MATRIX.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_LIQUIDITY_WITHDRAWAL_CONTROL_MEMO.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_ADR_SCOPING_MEMO.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_GOVERNANCE_SPINE_CLOSEOUT_ASSESSMENT.md`
- `docs/ops/HEDGR_STATUS.md`
- `docs/ops/NOTION_GOVERNANCE_STAGING.md`
- `docs/doctrine/hedgr-mvp-project-specification.md`
- `docs/doctrine/hedgr-constitutional-charter.md`
- `docs/doctrine/hedgr-ux-constitution.md`
- `docs/decisions/SPRINT-2-ADR-INDEX.md`

Source inputs are used to define fee / FX / spread evidence requirements only. They do not create fee approval, FX approval, spread approval, quote approval, pricing approval, evidence acceptance, implementation authority, or execution approval.

## 4. Evidence package summary

| Field | Value |
|---|---|
| Evidence package | Fee / FX / spread evidence package |
| Evidence state | Question framed / Missing |
| Source class expected | External legal / compliance review; vendor / provider documentation or confirmation where applicable; stablecoin / conversion evidence, rail evidence, settlement / finality evidence, reconciliation evidence, and audit evidence where applicable; internal analysis may frame questions only |
| Owner placeholder | TBD by future governed review |
| Freshness expectation | Review date required before downstream use |
| Related blockers | No jurisdiction selected; no legal / compliance review; no customer eligibility policy; no KYC / AML owner; no custody model selected; no rail selected or approved; no rail permission evidence; no settlement / finality evidence; no stablecoin / digital asset handling review; no FX / fee / spread disclosure review; no fee / spread evidence; no quote expiry / stale quote handling evidence; no final settlement value evidence; no reconciliation process; no audit / retention policy; no accepted Class B ADRs; no implementation-specific §7a brief |
| Downstream use | Future fee / FX / spread assessment; stablecoin / conversion evidence review; liquidity / withdrawal control evidence package; Trust UX / disclosure evidence package; Pilot Ops evidence package; Reconciliation evidence package; Support / dispute evidence package; Audit / retention evidence package; ADR drafting readiness review; implementation-proposal preflight review; future §7 / §7a consideration only |

This summary is a registry entry scaffold only. It does not mark evidence as gathered, accepted, approved, sufficient, FX-ready, fee-ready, spread-ready, quote-ready, pricing-ready, treasury-ready, or Class B ready.

## 5. Required evidence items

| Evidence item | Required question | Expected source class | Evidence state | Freshness / review expectation | Related blocker | Notes |
|---|---|---|---|---|---|---|
| FX source / rate-source boundary | What source provides the exchange-rate input and who owns it? | External legal / compliance review; vendor / provider documentation; vendor / provider confirmation; internal analysis may frame only | Question framed / Missing | Review date required before downstream use | No FX source evidence | No rate source is selected or approved. |
| Exchange-rate provider evidence | Who provides the rate and what evidence proves provider responsibility? | Vendor / provider documentation; vendor / provider confirmation; external legal / compliance review | Question framed / Missing | Dated provider evidence required before downstream use | No rate-provider evidence | Marketing pages are not responsibility evidence. |
| Estimated quote evidence | What proves the estimate shown and its limits? | Vendor / provider documentation; quote evidence; audit evidence; internal analysis may frame only | Question framed / Missing | Review date required before downstream use | No quote evidence | An estimate is not final value truth. |
| Final quote evidence | What proves the final quote applied? | Vendor / provider confirmation; audit evidence; reconciliation evidence | Question framed / Missing | Review date required before downstream use | No final quote evidence | No final quote model is approved. |
| Quote generation boundary | Who generates quotes and when? | Vendor / provider documentation; vendor / provider confirmation; audit evidence | Question framed / Missing | Review date required before downstream use | No quote generation evidence | No pricing engine is approved. |
| Quote expiry / stale quote handling | When does a quote expire and what happens when it is stale? | Vendor / provider documentation; external legal / compliance review; support / dispute evidence | Question framed / Missing | Review date required before downstream use | No quote expiry / stale quote handling evidence | No stale-quote handling is approved. |
| Quote refresh behavior | When and how may a quote refresh? | Vendor / provider documentation; audit evidence; Trust UX evidence | Question framed / Missing | Review date required before downstream use | No quote refresh evidence | No refresh behavior is approved. |
| Rate lock / no-rate-lock boundary | Is a rate locked, indicative, or explicitly not locked? | Vendor / provider documentation; external legal / compliance review | Question framed / Missing | Dated review required before downstream use | No rate-lock evidence | No guarantee claim is approved. |
| Spread model boundary | What spread may apply and who receives it? | Vendor / provider documentation; external legal / compliance review; internal analysis may frame only | Question framed / Missing | Review date required before downstream use | No spread model evidence | No spread model is approved. |
| Fee model boundary | What fees may apply and who charges them? | Vendor / provider documentation; external legal / compliance review | Question framed / Missing | Review date required before downstream use | No fee model evidence | No fee model is approved. |
| Slippage model boundary | What slippage may occur and what evidence proves it? | Vendor / provider documentation; external legal / compliance review; reconciliation evidence | Question framed / Missing | Review date required before downstream use | No slippage evidence | No slippage model is approved. |
| Displayed estimate boundary | What user-facing amount is only estimated? | Trust UX evidence; external legal / compliance review; audit evidence | Question framed / Missing | Review date required before downstream use | No disclosure review | No amount claim is approved. |
| Final amount received evidence | What proves the final amount received? | Settlement / finality evidence; reconciliation evidence; audit evidence; vendor / provider confirmation | Question framed / Missing | Review date required before downstream use | No final settlement value evidence | No received amount truth is approved. |
| Final amount sent evidence | What proves the final amount sent? | Settlement / finality evidence; reconciliation evidence; audit evidence; vendor / provider confirmation | Question framed / Missing | Review date required before downstream use | No final settlement value evidence | No sent amount truth is approved. |
| Conversion pricing evidence | What pricing evidence attaches to conversion? | Stablecoin / conversion evidence; vendor / provider documentation; reconciliation evidence | Question framed / Missing | Review date required before downstream use | No stablecoin / conversion evidence | No conversion pricing is approved. |
| Redemption pricing evidence | What pricing evidence attaches to redemption? | Stablecoin / conversion evidence; vendor / provider documentation; settlement / finality evidence | Question framed / Missing | Review date required before downstream use | No stablecoin / conversion evidence | No redemption pricing is approved. |
| Deposit fee evidence | What deposit fees may apply? | Vendor / provider documentation; rail evidence; external legal / compliance review | Question framed / Missing | Review date required before downstream use | No fee model evidence | No deposit fee is approved. |
| Withdrawal fee evidence | What withdrawal fees may apply? | Vendor / provider documentation; rail evidence; external legal / compliance review | Question framed / Missing | Review date required before downstream use | No fee model evidence | No withdrawal fee is approved. |
| Rail fee evidence | What rail fees may apply and who charges them? | Rail evidence; vendor / provider documentation; vendor / provider confirmation | Question framed / Missing | Review date required before downstream use | No rail fee evidence | No rail fee is approved. |
| Provider fee evidence | What provider fees may apply and who owns disclosure? | Vendor / provider documentation; vendor / provider confirmation; external legal / compliance review | Question framed / Missing | Dated provider evidence required before downstream use | No provider fee evidence | No provider fee is approved. |
| Network fee evidence, if applicable | What network fees may apply and how are they evidenced? | Vendor / provider documentation; settlement / finality evidence; audit evidence | Question framed / Missing | Review date required before downstream use | No network fee evidence | No network fee claim is approved. |
| Treasury fee / margin boundary, if applicable | Could Hedgr retain a fee, margin, or spread, and what review is required? | External legal / compliance review; accepted ADR where future review creates one; audit evidence | Question framed / Missing | Dated qualified review required before downstream use | No treasury fee / margin evidence | No treasury margin or retention is approved. |
| Currency pair dependency | Which fiat or FX pairs are implicated? | Vendor / provider documentation; external legal / compliance review | Question framed / Missing | Review date required before downstream use | No currency pair evidence | No currency pair is approved. |
| Stablecoin / fiat pair dependency | Which stablecoin / fiat pairs are implicated? | Stablecoin / conversion evidence; vendor / provider documentation; external legal / compliance review | Question framed / Missing | Review date required before downstream use | No stablecoin / conversion evidence | No pair is approved. |
| FX jurisdiction dependency | Which jurisdictional rules constrain FX, fees, spreads, quotes, and disclosures? | External legal / compliance review | Question framed / Missing | Dated qualified review required before downstream use | No jurisdiction selected; no legal / compliance review | This package is not legal advice. |
| User disclosure requirements | What must users be told before any pricing claim? | External legal / compliance review; Trust UX evidence | Question framed / Missing | Dated review required before downstream use | No disclosure review | No disclosure is approved. |
| Fee / spread disclosure requirements | What must be disclosed about fees and spreads? | External legal / compliance review; vendor / provider documentation; Trust UX evidence | Question framed / Missing | Review date required before downstream use | No fee / FX / spread disclosure review | No customer-facing cost claim is approved. |
| No-hidden-fee evidence | What evidence supports or prohibits no-hidden-fee claims? | External legal / compliance review; vendor / provider documentation; audit evidence | Question framed / Missing | Dated review required before downstream use | No disclosure review | No no-hidden-fee claim is approved. |
| Best-rate claim constraints | What evidence and review would constrain best-rate claims? | External legal / compliance review; vendor / provider documentation; internal analysis may frame only | Question framed / Missing | Dated qualified review required before downstream use | No legal / compliance review | No best-rate claim is approved. |
| Guaranteed-rate claim constraints | What claims around guaranteed rates are prohibited? | External legal / compliance review; vendor / provider documentation | Question framed / Missing | Dated qualified review required before downstream use | No rate-lock evidence | No guaranteed-rate claim is approved. |
| No-fee claim constraints | What evidence and review would constrain no-fee claims? | External legal / compliance review; vendor / provider documentation; audit evidence | Question framed / Missing | Dated qualified review required before downstream use | No fee model evidence | No no-fee claim is approved. |
| Stale-quote dispute handling | What happens when a stale quote is disputed? | Support / dispute evidence; external legal / compliance review; reconciliation evidence | Question framed / Missing | Review date required before downstream use | No stale-quote dispute evidence | No dispute handling is approved. |
| Fee / FX dispute handling | What happens when a fee, FX rate, or spread is disputed? | Support / dispute evidence; external legal / compliance review; reconciliation evidence | Question framed / Missing | Review date required before downstream use | No pricing dispute handling evidence | No support closure is approved. |
| Reversal / correction evidence | What proves correction or reversal when pricing evidence conflicts? | Reconciliation evidence; audit evidence; vendor / provider confirmation | Question framed / Missing | Review date required before downstream use | No correction / reversal evidence | No reversal or correction handling is approved. |
| Reconciliation matching dependency | How are fee / FX / spread facts matched to events and records? | Reconciliation evidence; audit evidence; vendor / provider documentation | Question framed / Missing | Review date required before downstream use | No reconciliation matching evidence | No reconciliation operation is approved. |
| Audit receipt dependency | What rate, quote, fee, spread, and final value receipts must be retained? | Audit evidence; vendor / provider documentation; external legal / compliance review where applicable | Question framed / Missing | Review date required before downstream use | No audit / retention evidence | No audit operation is approved. |
| Support / dispute dependency | What evidence must support support responses and closure? | Support / dispute evidence; reconciliation evidence; external legal / compliance review | Question framed / Missing | Review date required before downstream use | No support / dispute handling evidence | No support operation is approved. |
| Ledger / accounting truth dependency | What future evidence or ADR is required before ledger or accounting truth can be assigned? | Accepted ADR where future review creates one; reconciliation evidence; external legal / compliance review | Question framed / Missing | Review date required before downstream use | No accepted Class B ADRs | No ledger or accounting truth is approved. |
| Legal / compliance review requirements | Which fee / FX / spread issues require qualified review? | External legal / compliance review | Question framed / Missing | Dated qualified review required before downstream use | No legal / compliance review | No legal conclusion is accepted. |
| ADR dependency for fee / FX / spread boundary | Which fee / FX / spread decisions require accepted ADRs before implementation consideration? | Repo governance artifact; accepted ADR where future review creates one; external legal / compliance review | Question framed / Missing | Review date required before downstream use | No accepted Class B ADRs; no implementation-specific §7a brief | No ADR is drafted, accepted, or made ready. |

Do not mark any evidence item as received, accepted, approved, selected, sufficient, FX-ready, fee-ready, spread-ready, quote-ready, pricing-ready, or Class B ready.

## 6. Open fee / FX / spread questions

Answers must come from qualified legal / compliance review, vendor / provider evidence, stablecoin / conversion evidence, rail evidence, settlement / finality evidence, reconciliation evidence, and audit evidence where applicable, not this package.

### Rate source and quote boundary

- [ ] What is the exchange-rate source?
- [ ] Who provides the rate?
- [ ] Is the rate indicative, estimated, locked, refreshed, expired, stale, or final?
- [ ] What evidence proves the rate shown?
- [ ] What evidence proves the rate applied?
- [ ] What claims around guaranteed rates are prohibited?

### Fees and spread boundary

- [ ] What fees may apply?
- [ ] What spread may apply?
- [ ] Who earns or charges the fee or spread?
- [ ] What is disclosed to the user?
- [ ] What is retained internally?
- [ ] What claims around no fees, best rate, or zero spread are prohibited?

### Estimate versus final value

- [ ] What amount is shown as an estimate?
- [ ] What amount is final?
- [ ] What evidence proves final amount received or sent?
- [ ] What happens when an estimate differs from the final value?
- [ ] What tolerance, if any, requires user re-confirmation or cancellation?

### Slippage, stale quotes, and expiry

- [ ] What causes slippage?
- [ ] When does a quote expire?
- [ ] How is stale quote handling evidenced?
- [ ] What happens if a quote expires after user action but before settlement?
- [ ] What user-facing wording is allowed before final settlement evidence exists?

### Conversion and redemption dependency

- [ ] How do fees, FX, spread, and quotes attach to conversion?
- [ ] How do they attach to redemption?
- [ ] What evidence is required before stating conversion value?
- [ ] What evidence is required before stating redemption value?
- [ ] What happens if conversion, custody, rail, and fee evidence disagree?

### Rail, custody, and settlement dependency

- [ ] Which rail or custody events affect fees, FX, spread, or final amount?
- [ ] What settlement / finality evidence is required before final amount claims?
- [ ] What evidence is insufficient by itself?
- [ ] What happens if rail fees or provider fees differ from displayed estimates?

### Disputes, support, and corrections

- [ ] What happens if a user disputes a fee, FX rate, spread, quote expiry, stale quote, slippage, or final amount?
- [ ] What evidence must support support responses?
- [ ] What evidence must exist before support closure?
- [ ] What correction or reversal evidence is required?

### Trust UX and Copilot constraints

- [ ] What may Hedgr say about rates, fees, spreads, estimates, final amounts, slippage, quote expiry, and no-hidden-fee claims?
- [ ] What may Copilot explain?
- [ ] What must Copilot avoid saying?
- [ ] What claims are prohibited around "best rate," "guaranteed," "no fees," "instant," "final," "exact," and "you will receive"?

## 7. Fee / FX / spread lifecycle template

| Lifecycle state | Requirement to define | Evidence required | Owner placeholder | User-facing constraint | Status |
|---|---|---|---|---|---|
| No quote requested | TBD | TBD | TBD | Must not imply a quote exists. | Question framed / Missing |
| Quote requested | TBD | TBD | TBD | Must not imply rate, fee, spread, or amount acceptance. | Question framed / Missing |
| Indicative rate shown | TBD | TBD | TBD | Must identify non-final value. | Question framed / Missing |
| Estimated amount shown | TBD | TBD | TBD | Must identify estimate and uncertainty. | Question framed / Missing |
| Fee estimate shown | TBD | TBD | TBD | Must not imply final fee. | Question framed / Missing |
| Spread estimate shown | TBD | TBD | TBD | Must not imply final spread. | Question framed / Missing |
| Quote refreshed | TBD | TBD | TBD | Must not hide changed pricing. | Question framed / Missing |
| Quote expired | TBD | TBD | TBD | Must not imply old quote remains valid. | Question framed / Missing |
| Quote stale | TBD | TBD | TBD | Must surface stale or unresolved state. | Question framed / Missing |
| User confirmation pending | TBD | TBD | TBD | Must not imply execution or settlement. | Question framed / Missing |
| User confirmation received | TBD | TBD | TBD | Must not imply final amount or completed transaction. | Question framed / Missing |
| Conversion / redemption initiated | TBD | TBD | TBD | Must not imply conversion, redemption, rail, or custody completion. | Question framed / Missing |
| Final rate pending | TBD | TBD | TBD | Must not imply final exchange-rate truth. | Question framed / Missing |
| Final fee pending | TBD | TBD | TBD | Must not imply final fee truth. | Question framed / Missing |
| Final spread pending | TBD | TBD | TBD | Must not imply final spread truth. | Question framed / Missing |
| Final amount pending | TBD | TBD | TBD | Must not imply received or sent amount. | Question framed / Missing |
| Final amount evidenced | TBD | TBD | TBD | Must not be used until evidence and approval exist. | Question framed / Missing |
| Slippage occurred | TBD | TBD | TBD | Must not imply dispute closure or user remedy. | Question framed / Missing |
| Fee / FX discrepancy found | TBD | TBD | TBD | Must not imply correction or blame. | Question framed / Missing |
| User dispute opened | TBD | TBD | TBD | Must not imply support, legal, or reconciliation closure. | Question framed / Missing |
| Correction / reversal pending | TBD | TBD | TBD | Must not imply resolved customer-money state. | Question framed / Missing |
| Correction / reversal evidenced | TBD | TBD | TBD | Must not imply support closure without separate evidence. | Question framed / Missing |
| Record retained | TBD | TBD | TBD | Must not imply audit policy approval. | Question framed / Missing |

This lifecycle template does not create pricing logic, quote logic, user-facing pricing copy, transaction semantics, ledger truth, support closure, or customer-money authority.

## 8. Estimate versus final value template

| Value type | Meaning to define | Evidence required | What it may support | What it must not prove by itself | Status |
|---|---|---|---|---|---|
| Indicative exchange rate | TBD | TBD | Future question framing | Locked rate, final rate, or execution approval | Question framed / Missing |
| Estimated exchange rate | TBD | TBD | Estimate disclosure review | Final rate, guarantee, or pricing approval | Question framed / Missing |
| Locked exchange rate | TBD | TBD | Future rate-lock review if evidence exists | Legal approval, execution approval, or customer-money authority | Question framed / Missing |
| Final exchange rate | TBD | TBD | Future final-value review | Ledger truth or accounting truth | Question framed / Missing |
| Estimated fee | TBD | TBD | Fee disclosure review | Final fee or no-hidden-fee claim | Question framed / Missing |
| Final fee | TBD | TBD | Future final fee review | Fee model approval | Question framed / Missing |
| Estimated spread | TBD | TBD | Spread disclosure review | Final spread or spread approval | Question framed / Missing |
| Final spread | TBD | TBD | Future final spread review | Spread model approval | Question framed / Missing |
| Estimated amount sent | TBD | TBD | Estimate UX review | Final sent amount | Question framed / Missing |
| Final amount sent | TBD | TBD | Future final amount review | Ledger truth or settlement truth by itself | Question framed / Missing |
| Estimated amount received | TBD | TBD | Estimate UX review | Final received amount | Question framed / Missing |
| Final amount received | TBD | TBD | Future final amount review | Ledger truth or accounting truth by itself | Question framed / Missing |
| Settlement value | TBD | TBD | Settlement / finality review | Accounting truth without separate authority | Question framed / Missing |
| Reconciliation value | TBD | TBD | Reconciliation review | Ledger truth without accepted boundary | Question framed / Missing |
| Ledger / accounting value | TBD | TBD | Future ADR scoping only | Current ledger truth or accounting truth | Question framed / Missing |

This template does not approve any rate, fee, spread, final amount, settlement value, ledger value, or accounting truth.

## 9. Stale quote / slippage / dispute template

| Exception type | Evidence conflict | Required review owner | User-facing constraint | Escalation / pause relevance | Status |
|---|---|---|---|---|---|
| Quote expired before action | TBD | TBD | Must not imply old quote can be accepted. | May require refresh or cancellation review. | Question framed / Missing |
| Quote expired after action | TBD | TBD | Must not imply original quote remains final. | May require pause, review, or user communication. | Question framed / Missing |
| Rate changed before settlement | TBD | TBD | Must not imply guaranteed rate. | May require settlement and disclosure review. | Question framed / Missing |
| Fee changed before settlement | TBD | TBD | Must not imply final fee until evidenced. | May require support / dispute escalation. | Question framed / Missing |
| Spread changed before settlement | TBD | TBD | Must not imply final spread until evidenced. | May require pricing review. | Question framed / Missing |
| Slippage exceeded expected range | TBD | TBD | Must not hide discrepancy. | May require pause, dispute, or correction review. | Question framed / Missing |
| Displayed estimate differs from final amount | TBD | TBD | Must not collapse estimate into final truth. | May require support / reconciliation review. | Question framed / Missing |
| Provider fee differs from estimate | TBD | TBD | Must not imply Hedgr-controlled finality. | May require provider evidence review. | Question framed / Missing |
| Rail fee differs from estimate | TBD | TBD | Must not imply rail fee approval. | May require rail evidence review. | Question framed / Missing |
| Final amount missing | TBD | TBD | Must surface unresolved state. | May require pause and escalation. | Question framed / Missing |
| User disputes rate | TBD | TBD | Must not assert correctness without evidence. | Requires support / dispute evidence. | Question framed / Missing |
| User disputes fee | TBD | TBD | Must not assert closure without evidence. | Requires support / dispute evidence. | Question framed / Missing |
| User disputes spread | TBD | TBD | Must not assert closure without evidence. | Requires support / dispute evidence. | Question framed / Missing |
| User disputes final amount | TBD | TBD | Must not assert finality without evidence. | Requires reconciliation and support evidence. | Question framed / Missing |
| Correction required | TBD | TBD | Must not imply correction completed. | May require governance or operational review. | Question framed / Missing |
| Reversal / refund required | TBD | TBD | Must not imply remedy availability or completion. | May require legal, support, and reconciliation review. | Question framed / Missing |
| Unresolved pricing state | TBD | TBD | Must surface uncertainty. | May require pause, escalation, or kill criteria review. | Question framed / Missing |

This template does not approve exception handling, dispute handling, correction handling, reversal handling, support closure, reconciliation closure, or operational authority.

## 10. Pricing evidence dependency template

| Dependency area | What must be proven | Evidence required | What it must not prove by itself | Status |
|---|---|---|---|---|
| Rate source | Who sources the rate and under what limits. | Vendor / provider documentation; vendor / provider confirmation; legal / compliance review | Rate approval or execution authority | Question framed / Missing |
| Quote generation | Who generates the quote and what input controls it. | Vendor / provider documentation; audit evidence | Pricing engine approval | Question framed / Missing |
| Quote expiry | When a quote expires and what happens after expiry. | Vendor / provider documentation; Trust UX evidence; support evidence | Stale-quote handling approval | Question framed / Missing |
| Fee calculation | Which fees may apply and how they are evidenced. | Vendor / provider documentation; legal / compliance review; audit evidence | Fee model approval | Question framed / Missing |
| Spread calculation | Which spread may apply and how it is evidenced. | Vendor / provider documentation; legal / compliance review; audit evidence | Spread model approval | Question framed / Missing |
| Slippage | What slippage can occur and what proves it. | Vendor / provider documentation; settlement / finality evidence; reconciliation evidence | Slippage model approval | Question framed / Missing |
| Provider fee | Which provider fee applies and who discloses it. | Vendor / provider documentation; vendor / provider confirmation | Provider approval or fee approval | Question framed / Missing |
| Rail fee | Which rail fee applies and when. | Rail evidence; vendor / provider documentation | Rail approval or final amount truth | Question framed / Missing |
| Network fee | Which network fee may apply, if any. | Vendor / provider documentation; audit evidence | Network route approval | Question framed / Missing |
| Conversion final value | What proves final conversion value. | Stablecoin / conversion evidence; settlement / finality evidence; reconciliation evidence | Conversion approval | Question framed / Missing |
| Redemption final value | What proves final redemption value. | Stablecoin / conversion evidence; settlement / finality evidence; reconciliation evidence | Redemption approval | Question framed / Missing |
| Settlement / finality | What proves pricing-related settlement. | Settlement / finality evidence; audit evidence | Ledger truth or customer-money safety | Question framed / Missing |
| Reconciliation match | What maps pricing facts to event records. | Reconciliation evidence; audit evidence | Ledger truth by itself | Question framed / Missing |
| Audit receipt | What rate, quote, fee, spread, and final value records are preserved. | Audit evidence; vendor / provider documentation | Audit-operation approval | Question framed / Missing |
| Support closure | What evidence allows support to answer or close a dispute. | Support / dispute evidence; reconciliation evidence; legal / compliance review | Legal resolution or settlement truth | Question framed / Missing |
| Ledger / accounting boundary | What future evidence or ADR could assign ledger or accounting truth. | Accepted ADR where future review creates one; reconciliation evidence; legal / compliance review | Current ledger or accounting truth | Question framed / Missing |

This template does not approve FX execution, fee calculation, spread calculation, pricing engines, settlement finality, reconciliation operations, support closure, ledger truth, or customer-money movement.

## 11. Evidence source expectations

| Evidence type | Acceptable source class | Not sufficient as source | Notes |
|---|---|---|---|
| FX source evidence | Vendor / provider documentation; vendor / provider confirmation; external legal / compliance review | Founder assumption; product intent; internal analysis alone | Must identify source owner and scope. |
| Rate-provider evidence | Vendor / provider documentation; vendor / provider confirmation | Vendor marketing pages alone | Must distinguish public docs from explicit confirmation. |
| Quote-generation evidence | Vendor / provider documentation; audit evidence; reconciliation evidence | UI state; estimate display | A displayed estimate is not final amount truth. |
| Quote-expiry evidence | Vendor / provider documentation; external legal / compliance review; support evidence | Internal analysis alone | Stale quote handling requires source-backed review. |
| Fee evidence | Vendor / provider documentation; vendor / provider confirmation; external legal / compliance review | Founder assumption; repo doctrine | Repo doctrine is not pricing approval. |
| Spread evidence | Vendor / provider documentation; external legal / compliance review; audit evidence | Product intent; internal analysis alone | Internal analysis may frame, not approve. |
| Slippage evidence | Vendor / provider documentation; settlement / finality evidence; reconciliation evidence | UI state; sandbox pricing alone | Sandbox pricing evidence is not live pricing evidence. |
| Provider-fee evidence | Vendor / provider documentation; vendor / provider confirmation | Vendor marketing pages alone | Responsibility evidence must be dated and specific. |
| Rail-fee evidence | Rail evidence; vendor / provider documentation; vendor / provider confirmation | Rail availability alone | Rail capability is not fee approval. |
| Final-value evidence | Settlement / finality evidence; reconciliation evidence; audit evidence; vendor / provider confirmation | Displayed estimate; support state | Support state is not settlement truth. |
| Settlement-value evidence | Settlement / finality evidence; reconciliation evidence; audit evidence | UI state; internal assumption | Settlement value is not ledger truth by itself. |
| Reconciliation-value evidence | Reconciliation evidence; audit evidence; accepted ADR where future review creates one | Audit receipt alone | Audit receipt is not ledger truth. |
| Dispute evidence | Support / incident evidence; reconciliation evidence; external legal / compliance review | Support note without underlying evidence | Support closure requires evidence boundaries. |
| Support-closure evidence | Support / incident evidence; legal / compliance review where applicable; reconciliation evidence | Support state alone | Support state is not final settlement truth. |
| Audit receipt evidence | Audit evidence; preserved source records; access-control evidence | Receipt existence alone | Audit receipt is not retention policy approval. |
| Legal / disclosure review | Dated qualified external legal / compliance review | Internal analysis; founder assumption; product intent | Required before downstream use where pricing, disclosure, consumer-claim, or financial-promotion risk is implicated. |

Founder assumption is not fee / FX / spread evidence. Repo doctrine is not pricing approval. Internal analysis is not legal, provider, rate-source, settlement, or final-value evidence. Product intent is not fee / FX / spread approval. A displayed estimate is not final amount truth. UI state is not pricing truth. Support state is not settlement truth. Audit receipt is not ledger truth. Vendor marketing pages are not provider responsibility evidence. Sandbox pricing evidence is not live pricing evidence. Legal / compliance review must be dated and attributable to qualified review before downstream use where pricing, disclosure, consumer-claim, or financial-promotion risk is implicated. Vendor / provider responsibility evidence must distinguish public documentation from explicit confirmation.

## 12. Blocker mapping

| Blocker | Evidence needed | Current posture | Downstream blocked area |
|---|---|---|---|
| No jurisdiction selected | Jurisdiction assumption and qualified legal / compliance review. | Unresolved / Evidence missing | FX jurisdiction; disclosure; customer eligibility; ADR readiness |
| No legal / compliance review | Qualified review of fee, FX, spread, quote, disclosure, and claims perimeter. | Unresolved / Evidence missing | Legal conclusions; pricing claims; disclosures; implementation preflight |
| No customer eligibility policy | Eligibility policy and related pricing / claims constraints. | Unresolved / Evidence missing | Customer-facing pricing review; support; Trust UX |
| No KYC / AML owner | Responsibility evidence for customer and transaction checks. | Unresolved / Evidence missing | Rail, custody, conversion, and support review |
| No custody model selected | Custody model, provider responsibility, and asset-control evidence. | Unresolved / Evidence missing | Conversion pricing; settlement value; reconciliation |
| No rail selected or approved | Candidate rail and rail permission evidence. | Unresolved / Evidence missing | Rail fees; settlement timing; final amount claims |
| No rail permission evidence | Vendor / provider confirmation of permission and environment boundary. | Unresolved / Evidence missing | Rail-dependent pricing and finality review |
| No settlement / finality evidence | Settlement, reversibility, timestamp, and finality evidence. | Unresolved / Evidence missing | Final amount, reconciliation, support, audit |
| No stablecoin / digital asset handling review | Stablecoin handling and digital asset risk evidence. | Unresolved / Evidence missing | Conversion / redemption pricing and disclosure |
| No stablecoin / conversion evidence | Conversion path, redemption path, final value, and provider evidence. | Unresolved / Evidence missing | Fee / FX / spread review; liquidity; Trust UX |
| No FX source evidence | Rate source and source-owner evidence. | Unresolved / Evidence missing | Rate display; quote generation; disclosure |
| No rate-provider evidence | Provider responsibility and method evidence. | Unresolved / Evidence missing | Exchange-rate claims; audit receipts |
| No fee model evidence | Fee owner, amount, timing, and disclosure evidence. | Unresolved / Evidence missing | Fee claims; support; reconciliation |
| No spread model evidence | Spread owner, amount, timing, and disclosure evidence. | Unresolved / Evidence missing | Spread claims; Trust UX; support |
| No quote expiry / stale quote handling evidence | Quote expiry, refresh, stale-state, and dispute evidence. | Unresolved / Evidence missing | Quote UX; support; disputes |
| No slippage evidence | Slippage causes, thresholds, evidence, and disclosure review. | Unresolved / Evidence missing | Estimate-versus-final handling; disputes |
| No final settlement value evidence | Final amount and settlement value evidence. | Unresolved / Evidence missing | Final amount claims; ledger / accounting boundary |
| No fee / FX / spread disclosure review | Qualified disclosure review and Trust UX constraints. | Unresolved / Evidence missing | Customer-facing pricing claims; Copilot explanations |
| No pricing dispute handling evidence | Support, dispute, correction, and reversal evidence. | Unresolved / Evidence missing | Support closure; reconciliation; Trust UX |
| No reconciliation matching evidence | Source-of-truth and matching evidence. | Unresolved / Evidence missing | Ledger / accounting boundary; support closure |
| No support / dispute handling evidence | Support owner, escalation, prohibited promises, and closure evidence. | Unresolved / Evidence missing | User communication; dispute handling |
| No audit / retention evidence | Receipt, record, retention, and access-control evidence. | Unresolved / Evidence missing | Evidence preservation; future review |
| No accepted fee / FX / spread ADR | Accepted decision record where future review requires one. | Unresolved / Evidence missing | ADR drafting readiness; implementation preflight |
| No implementation-specific §7a brief | Bounded execution brief if future implementation is named. | Unresolved / Evidence missing | Implementation proposal and §7 activation |

No blocker in this package is closed.

## 13. Freshness / review expectations

| Evidence area | Freshness concern | Review expectation | Staleness trigger |
|---|---|---|---|
| FX source / rate provider | Rate sources and provider responsibilities may change. | Preserve dated source and provider evidence before downstream use. | Provider, rate source, corridor, method, or term changes. |
| Exchange-rate methodology | Methodology may change across corridors, liquidity, and market conditions. | Dated provider documentation and qualified review where claims are implicated. | Methodology, pair, provider, or quote behavior changes. |
| Fee model | Fees may change by provider, rail, market, or user class. | Dated fee evidence and disclosure review. | Fee schedule, provider, rail, jurisdiction, or product claim changes. |
| Spread model | Spread may change by provider, pair, liquidity, or margin policy. | Dated spread evidence and qualified review before downstream use. | Spread policy, pair, provider, or liquidity condition changes. |
| Quote expiry rules | Quote duration and expiry behavior may change. | Dated quote-expiry evidence and Trust UX review. | Provider docs, API behavior, expiry duration, or refresh behavior changes. |
| Slippage assumptions | Slippage changes with market, provider, and settlement timing. | Dated slippage evidence and reconciliation review. | Market volatility, provider, corridor, or settlement timing changes. |
| Provider fees | Provider fees may change without repo change. | Preserve dated provider documentation or confirmation. | Provider terms, fee table, product, or contract changes. |
| Rail fees | Rail fees may change by path, amount, or region. | Dated rail evidence and provider confirmation where relevant. | Rail terms, corridor, limits, or provider changes. |
| Network fees | Network fees may vary by chain, load, or provider routing. | Dated source evidence and final-value review where applicable. | Network, provider, routing, congestion, or fee-model changes. |
| Final settlement value evidence | Final value evidence can become stale if source boundaries change. | Review date required before final amount claims. | Settlement source, reconciliation rule, provider, or audit format changes. |
| Conversion / redemption pricing evidence | Conversion and redemption pricing may change by route and provider. | Vendor / provider evidence, legal / compliance review, custody review. | Provider, asset, jurisdiction, rail, liquidity, or fee model changes. |
| Dispute handling evidence | Dispute rules, owners, and support paths may change. | Support review and legal / compliance review where applicable. | Support owner, vendor support path, dispute rule, user segment, or incident type changes. |
| Legal / disclosure review | Law, regulation, and claim risk may change. | Dated qualified review before downstream use. | Jurisdiction, customer class, pricing claim, provider, or regulatory guidance changes. |
| Trust UX / disclosure constraints | Allowed and prohibited wording may change with evidence. | Trust UX review tied to current legal and provider evidence. | New pricing claim, UI surface, Copilot proximity, or evidence state change. |
| Reconciliation evidence | Matching and source-of-truth rules may change. | Dated reconciliation review before relying on final values. | Event taxonomy, provider record, rail state, or audit receipt changes. |
| Audit / retention evidence | Retention, access, and receipt requirements may change. | Legal / compliance and audit review before downstream use. | Data type, jurisdiction, access model, retention policy, or audit scope changes. |

Freshness expectations are planning constraints only. They are not approved SLAs, FX policy, fee policy, spread policy, pricing policy, legal conclusions, provider approval, treasury policy, or customer-money permission.

## 14. Downstream dependency effect

- **Liquidity / withdrawal control evidence package:** cannot mature without final amount, fee, FX, spread, redemption, and withdrawal-value evidence.
- **Trust UX / disclosure evidence package:** must not claim guaranteed rate, best rate, no fees, exact amount, final amount, received amount, or no slippage without accepted evidence.
- **Pilot Ops evidence package:** must reflect quote expiry, user confirmation, stale quote handling, manual review, pricing disputes, correction, reversal, and escalation responsibilities.
- **Reconciliation evidence package:** must map fee / FX / spread evidence to conversion state, rail state, custody state, final settlement value, audit receipts, and source-of-truth boundaries.
- **Support / dispute evidence package:** must define support constraints around fee disputes, FX disputes, spread disputes, quote expiry, stale quotes, slippage, and final amount mismatches.
- **Audit / retention evidence package:** must capture rate evidence, quote evidence, fee evidence, spread evidence, final value evidence, support evidence, reconciliation evidence, and retention requirements.
- **ADR drafting readiness:** cannot proceed for fee / FX / spread-sensitive ADRs until required evidence exists or blockers are explicitly recorded.
- **Implementation-proposal preflight:** cannot treat fee / FX / spread questions as closed without accepted evidence.

## 15. Evidence intake placeholders

| Intake field | Placeholder |
|---|---|
| Evidence title | TBD |
| Evidence package | Fee / FX / spread evidence package |
| Source class | TBD |
| Source pointer | TBD |
| Date received | TBD |
| Freshness / review date | TBD |
| Evidence owner | TBD by future governed review |
| Reviewer | TBD |
| Related blocker | TBD |
| Claim supported | TBD |
| Claim not supported | TBD |
| Conflicts identified | TBD |
| Recommended evidence state | TBD |
| Non-authorization note | Evidence intake does not approve FX execution, fee model, spread model, quote model, pricing engine, treasury operation, Class B execution, implementation, or customer-money movement. |

## 16. Registry update instruction

After this package skeleton is merged:

- `HEDGR_CLASS_B_EVIDENCE_REGISTRY.md` should reflect the fee / FX / spread package shell as created.
- Current evidence state must remain Question framed / Missing unless actual evidence is introduced by a future governed ticket.
- The registry must not mark the package as accepted, approved, sufficient, FX-ready, fee-ready, spread-ready, quote-ready, pricing-ready, treasury-ready, ADR-ready, implementation-ready, or Class B ready.
- Future evidence-state changes require source pointers and separate governed review.

## 17. Non-authorization statement

This package is non-authoritative and documentation-only. It does not gather, approve, validate, accept, or certify fee / FX / spread evidence and does not approve FX execution, exchange-rate sourcing, fee model, spread model, quote model, stale-quote handling, slippage model, pricing engine, treasury operation, liquidity operation, settlement value, customer-facing pricing claim, user-facing amount claim, ledger truth, accounting truth, external engagement, Class B execution, staging, sandbox use, internal testing, live operations, deposits, withdrawals, custody, rails, stablecoin conversion, treasury operations, liquidity buffers, reconciliation operations, support operations, audit operations, ledger mutation, Copilot execution, Class C automation, or customer fund movement. Any future fee / FX / spread evidence acceptance, legal / compliance evidence acceptance, ADR drafting readiness, implementation-proposal preflight, or implementation work still requires separate HEDGR_STATUS.md §7 naming where applicable, a bounded §7a brief where applicable, qualified legal / compliance review, jurisdiction evidence review, customer eligibility evidence review, KYC / AML evidence review, custody evidence review, rail / vendor permission evidence review, settlement / finality evidence review, stablecoin / conversion evidence review, relevant spine-artifact review, accepted ADRs where required, vendor / provider evidence where applicable, and operational evidence where applicable.
