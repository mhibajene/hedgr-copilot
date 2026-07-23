# Hedgr Money Stack Deliberation Report

## Executive Summary

- **The money stack must be designed from usable local exit backwards.** A credible Hedgr path needs one authoritative user entitlement, an evaluated preservation asset, explicit custody and recovery, executable conversion liquidity, reconciled settlement evidence, and a same-market exit whose fees, limits, delays, failure states, and redress boundaries can be truthfully stated. Network speed and global asset liquidity cannot substitute for those properties.

- **No examined complete path is eligible for the final shortlist.** Every non-bridge path retains at least one critical evidence gap in custody or control, user entitlement, redemption, executable local liquidity, reconciliation, recovery, migration, regulatory permissibility, or truthful user representation. Under the approved gate method, those gaps must be recorded as **Not sufficiently evidenced**, not softened into a favourable score.

- **The option space can still be reduced to two retest configurations.** Retain, for separately authorised deeper diligence: (1) a regulated account-ledger control path that tests whether user-facing public-chain settlement is necessary; and (2) one deliberately single-network, native-USDC path on Stellar as the public-chain comparator. These are a bounded research set, **not a shortlist and not an implementation recommendation**. Defer Polygon as a starting environment unless it later solves a material requirement those two configurations cannot; treat Polygon's Open Money Stack as a specific provider-led product, not as Hedgr's modular architecture.

- **Multi-network remains admissible by design, not committed by destination.** Hedgr should retain network-neutral domain, policy, evidence, risk, and provider boundaries while keeping asset identity, finality, custody powers, liquidity, fees, failure behaviour, and user disclosures explicitly network-specific. Bridges, automatic cross-chain routing, unified bridge-dependent balances, and yield remain outside the starting path.

### Recommended overall disposition

**Retain with revision.** Retain the principle **design for controlled replaceability; implement one governed value path at a time**. Revise “multi-network by destination” to mean **a second governed path may later be admitted if it passes explicit need, evidence, containment, migration, and user-comprehension gates**. Do not treat multiple networks as an inevitable product milestone.

### Recorded Founder–HedgrOps disposition

Founder and HedgrOps approved the research package and closed `MONEY-STACK-001` as converged on 23 July 2026. The recorded disposition:

- **retain** the research direction and architectural framing;
- **retain** financial truth as an emerging organising principle;
- **revise over time** the architectural vocabulary into reusable doctrine through separately authorised doctrine work;
- **defer** implementation decisions pending separately authorised evidence dossiers; and
- **close** the current research cycle as converged.

No additional network comparison, provider comparison, infrastructure survey, retest, evidence dossier, doctrine translation, or implementation is authorised by this disposition. Full record: `docs/ops/strategy/HEDGR_MONEY_STACK_FOUNDER_HEDGROPS_DISPOSITION_2026-07-23.md`.

---

## Authority and research status

| Field | Position |
| --- | --- |
| Status | Research package approved; research cycle closed as converged on 23 July 2026 |
| Research authority | `MONEY-STACK-001` — completed; historical only |
| Authority basis | Controlled Parallelism v17 / Internal D-053 / §167 activation; §168 closeout; singular Lane V restored |
| Execution class | Class A — informational only |
| Research owner | Founder / HedgrOps |
| Research support | Hedgr Consultant role ended at ticket closeout; no standing authority |
| Evidence cut-off | 21 July 2026 |
| Implementation authority | None |
| Provider, asset, network, market, or protocol commitment authority | None |
| Customer-money authority | None |
| Closure condition | Satisfied under §168 |

> **Authority boundary.** This report is retained research evidence and Hedgr Consultant interpretation. Approval of the package does not approve a market, provider, asset, custody model, settlement network, integration, live test, doctrine change, evidence dossier, or movement of customer money. Review evidence is evidence, not implementation direction.

### Hedgr Consultant role boundary

Within `MONEY-STACK-001`, the consultant may collect and organise sources, perform bounded comparative research, record assumptions and evidence gaps, analyse only the approved candidates and cases, and draft findings for Founder–HedgrOps review.

The consultant may not contact providers, regulators, partners, or market participants; negotiate, solicit services, or imply commercial interest; make legal or regulatory conclusions; collect personal or customer data; represent implementation as authorised; add markets, networks, providers, or paths without an approved material hypothesis; or represent Hedgr externally.

---

## 1. The decision is about a complete value path, not a chain

The primary research question was:

> What characteristics should the Hedgr money stack have to support a stability-first financial operating system—and which complete value paths can credibly satisfy them?

The answer is that the stack must preserve seven distinguishable forms of truth across one bounded path:

| Truth domain | Authoritative question | What it does **not** prove |
| --- | --- | --- |
| Asset truth | What was issued, by whom, against what reserve or obligation, with what redemption and restriction terms? | User entitlement, local liquidity, or successful withdrawal |
| Custody truth | Who legally and technically controls the asset; who may sign, freeze, recover, pause, or move it? | That the user can redeem or exit locally |
| Account and balance truth | What authoritative record establishes the user's entitlement? | That all supporting assets and rails are currently available |
| Settlement truth | Was an instruction submitted, confirmed, final, reversed, halted, or reorganised? | Conversion, redemption, local credit, or cash availability |
| Liquidity truth | Is a conversion executable now, at what price, size, limit, counterparty, and settlement time? | That the rail will complete or cash will be available |
| Rail truth | Was local entry or exit accepted, credited, delayed, rejected, reversed, or disputed? | Asset soundness or network availability |
| Stability Engine interpretation | What can Hedgr safely infer and communicate from current evidence? | Accounting, custody, settlement, liquidity, or redemption truth |

The minimum credible research configuration remains:

> **One local fiat entry rail → one regulated conversion pathway → one evaluated stable-value asset → one custody and control model → one settlement environment → one authoritative user-entitlement record → observable reconciliation → one evidenced liquidity route → one same-market usable-money exit.**

No current candidate instantiates every element with decision-grade evidence. That is why the report narrows the next questions without naming a winner.

### Money-stack layer model

The unit of architecture is the complete value path. The six layers remain distinguishable so evidence from one layer cannot be used as proof of another:

| Layer | Hedgr requirement | Evidence boundary |
| --- | --- | --- |
| 1. Local entry and exit rails | Users can enter and exit through locally understood bank, wallet, mobile-money, remittance, or cash paths, with exceptions and redress | Rail acceptance or credit does not prove conversion, asset soundness, or withdrawal capacity |
| 2. Stable-value asset or claim | The issuer, reserve or obligation, legal claim, redemption, restrictions, impairment behaviour, and concentration can be evaluated | Reserve or issuer evidence does not prove user entitlement or local executable exit |
| 3. Custody and account control | Legal and technical control, authoritative entitlement, signing, segregation, recovery, freeze, and migration are explicit | A wallet capability or account balance does not establish beneficial ownership, redemption, or settlement |
| 4. Settlement environment | Asset identity, finality, fees, governance, failure behaviour, evidence services, and operational dependencies are explicit | Network confirmation does not prove conversion, local credit, cash availability, or user withdrawal |
| 5. Conversion, liquidity, and any later yield infrastructure | Entry and exit quotes are executable at stated size, price, limits, and timing; liquidity remains subordinate to withdrawal readiness | Global volume, indicative pricing, issuer redemption, or protocol liquidity does not prove a Hedgr-user exit; yield is excluded from the starting path |
| 6. Stability Engine and governance | Hedgr interprets evidence, applies limits, exposes uncertainty, reconciles domains, and governs admission, pause, migration, and retirement | The Stability Engine may interpret authoritative records but must never become a substitute ledger or conceal material risk |

### What must remain consistent for users

Regardless of infrastructure, Hedgr should preserve:

- a clear distinction between **total entitlement**, **settled**, **available to withdraw**, **pending**, **restricted**, and **uncertain** amounts;
- one calm status vocabulary tied to authoritative evidence and freshness;
- visible fees, limits, estimated timing, and the party responsible for the next step;
- an explicit statement when exit, conversion, recovery, or verification is unavailable;
- a recoverable transaction history that survives provider migration; and
- the Stability Engine as an interpretive and policy layer, never as a substitute ledger.

### What must remain visible

Hedgr must not hide material differences in:

- the asset issuer and the user's redemption position;
- custodial versus user-controlled ownership and recovery;
- freezing, clawback, signing, pause, and operator powers;
- network finality, halts, congestion, fees, and infrastructure dependencies;
- local withdrawal route, limits, liquidity, timing, and redress;
- provider concentration and migration constraints; or
- whether the displayed amount is ledger truth, network evidence, an executable quote, or Hedgr interpretation.

Technical mechanics such as addresses, fee sponsorship, node selection, and transaction construction may be simplified. Material risk may not be simplified into a guarantee.

---

## 2. The five invariants are admission gates, not weighted criteria

The approved invariants remain non-compensatory:

1. **Preservation integrity** — asset, issuer, reserve, custody, network, concentration, recovery, freeze, and migration risk can be evaluated and constrained.
2. **Exit and liquidity integrity** — issuer redemption, market conversion, and Hedgr-user same-market exit are separately evidenced, including stressed behaviour.
3. **Controlled portability and replaceability** — providers and networks can be replaced without concealing differences or losing value, entitlement, or authoritative history.
4. **Local-rail compatibility** — the path works with the market's actual entry, exit, identity, reconciliation, connectivity, support, and dispute conditions.
5. **Verifiability and containment** — every material state is evidenced, reconcilable, bounded, pausable, explainable, recoverable, and migratable.

The status method is intentionally strict:

- **Pass** — sufficient credible evidence supports the complete-path property.
- **Conditional** — the property is supportable and only a specific bounded, non-critical dependency remains.
- **Not sufficiently evidenced** — a material or critical conclusion cannot be defended.
- **Fail** — the configuration structurally conflicts with the stability-first requirements.

A missing conclusion about custody/control, user entitlement, asset issuance or redemption, same-market exit, executable liquidity, reconciliation, recovery, migration, regulatory permissibility, or truthful user representation is critical. A critical gap blocks shortlisting.

---

## 3. Candidate reduction: two paths to retest, zero paths to shortlist

| Configuration | Role in the analysis | Gate result | Recommended disposition |
| --- | --- | --- | --- |
| Regulated account-ledger control | Tests whether a regulated fiat or stable-value claim and authoritative provider ledger can deliver the minimum experience without user-facing public-chain settlement | Critical gaps across asset claim, custody/legal control, exit, reconciliation, migration, and permissibility | **Retain for retest; not shortlist-eligible** |
| Single-network Stellar with native USDC | Tests one bounded public network, one issuer-native asset, one custody model, and Hedgr-owned reconciliation | Native asset and settlement evidence exist; critical custody, validator concentration, local exit, reconciliation, and migration gaps remain | **Retain for retest; not shortlist-eligible** |
| Single-network Polygon PoS with native USDC | Tests an EVM-compatible public settlement path without bridging | Native asset and network capabilities exist; the same critical end-to-end gaps remain, and no starting-path requirement was found that only Polygon resolves | **Defer; re-admit only against a material unmet requirement** |
| Polygon Open Money Stack | Tests a specific vertically integrated commercial stack spanning custody, ramps, compliance, orchestration, and Polygon settlement | Public documentation is early-access/forward-looking in material areas; approved-market rails, legal custody entity, exit, migration, and production evidence are missing | **Defer; do not equate with Hedgr's modular architecture** |
| Bridge-dependent multi-network path | Tests the adverse case of unified or routed balances across networks | Core balance, exit, portability, and evidence would depend on cross-domain orchestration that conceals or compounds material risk | **Remove from the starting path** |

This is an option-space reduction, not a favourable shortlist. The two retained configurations test different hypotheses with the least duplicated research:

- the account-ledger control tests whether public-chain settlement is necessary at all; and
- Stellar/native USDC tests one deliberately bounded public-chain form without opening a duplicative second-network workstream.

Polygon is not rejected as infrastructure. It is deferred because researching a second public-chain path before resolving the common custody, exit, and reconciliation gaps would add evidence volume without reducing the highest-value uncertainty.

---

## 4. The market cases expose three different breakpoints

The cases support pattern analysis but do not select a launch market.

| Reference case | What the evidence establishes | Degraded-state test | What remains unproven |
| --- | --- | --- | --- |
| Kenya — mobile-money resilience | A nationally significant, agent-led mobile-money entry and exit surface; operator interoperability; payment rules for records, delay notices, complaints, restoration, and e-money redemption | Primary operator, interoperability service, settlement bank, connectivity, or agent cash/float becomes unavailable | Stable-asset conversion, licensed counterparty path, regional agent liquidity, cross-system reconciliation, custody, and stressed same-market exit |
| Philippines — remittance and fragmented access | Material inbound remittances; a bounded United States-to-Philippines recorded corridor; sender-side disclosure/error rules; domestic instant and batch rails; mixed bank, e-money, agent, and cash access | Sending provider reports success while the correspondent, domestic EFT, wallet credit, or cash-out leg remains pending or disputed | Named corridor providers, executable FX and any VASP path, stable-asset redemption, authoritative entitlement, cash availability, and end-to-end recovery |
| Brazil — high-capability domestic control | Pix provides continuous, fast, final domestic settlement in central-bank money; Open Finance supports regulated account connectivity | Conversion or virtual-asset provider fails while Pix and domestic accounts remain operational | The preservation asset or account claim, custody, FX liquidity, redemption, insolvency treatment, and whether public-chain ownership adds necessary value |

### 4.1 Kenya: national rail scale does not prove withdrawal readiness

The Central Bank of Kenya reported **572,104 active mobile-money agents** and **212.45 million monthly agent cash-in/cash-out transactions** in June 2026. This is strong evidence of a locally relevant rail, but registered accounts and agent counts do not establish unique users, geographic coverage, or cash and e-money float at the moment a user needs to exit. [CBK Mobile Payments](https://www.centralbank.go.ke/national-payments-system/mobile-payments/)

Direct operator interoperability covers person-to-person, merchant-till, and paybill payments, yet CBK's later sector-wide work describes the wider arrangements as bilateral, costly, fragmented, and lacking a central switch across the full financial sector. Mobile-wallet interoperability therefore cannot be represented as complete bank–wallet or system-wide interoperability. [CBK mobile-money interoperability release](https://www.centralbank.go.ke/uploads/press_releases/1178640578_Press%20Release%20-%20Full%20Interoperability%20of%20Mobile%20Money%20Operators%20Becomes%20Effective.pdf), [CBK sector-wide interoperability release](https://www.centralbank.go.ke/uploads/press_releases/990708781_Press%20Release%20-%20Progression%20toward%20Financial%20Sector-Wide%20Interoperability%20Solution%20and%20Formation%20of%20an%20Industry%20Technical%20Working%20Group.pdf)

Kenya's payment regulations require audit trails, operational reliability, contingency arrangements, notice of delayed nominally real-time transactions, records, complaint handling, and restoration for certain failed transfers. KEPSS provides final settlement for qualifying obligations in central-bank money, while its PFMI disclosure identifies tiering and external-switch dependencies. These controls improve rail evidence; they do not prove agent cash availability or a KES/stable-asset exit under stress. [National Payment System Regulations 2014](https://www.centralbank.go.ke/images/docs/legislation/NPSRegulations2014.pdf), [KEPSS PFMI disclosure](https://www.centralbank.go.ke/wp-content/uploads/2025/01/The-Kenya-Electronic-Payment-and-Settlement-System-Report-December-2024.pdf)

Kenya's Virtual Asset Service Providers Act commenced on 4 November 2025. Draft VASP Regulations published in March 2026 include proposed stablecoin, reserve, custody, redemption, disclosure, and audit provisions, but draft provisions are not final rules. This report makes no legal conclusion about a Hedgr path. [Virtual Asset Service Providers Act 2025](https://new.kenyalaw.org/akn/ke/act/2025/20/eng%402025-11-04), [Draft VASP Regulations 2026](https://www.centralbank.go.ke/wp-content/uploads/2026/03/Draft-Virtual-Asset-Service-Providers-Regulations-2026.pdf)

**Path under test**

`KES cash/bank → mobile-money wallet → authorised conversion → stable asset → custody/settlement → Hedgr reconciliation → authorised conversion → KES wallet/bank → agent cash-out`

**Stress conclusion.** A healthy blockchain transaction could coexist with unavailable KES conversion or empty agent cash. The product must show **settled on network** and **available to withdraw locally** as different states. Kenya remains the designated operational-resilience stress case and must not be reduced to a mobile-money API integration question.

### 4.2 Philippines: one transfer crosses several accountability domains

BSP records **US$35.634 billion** in overseas Filipino cash remittances for 2025 on a provisional basis. It also cautions that correspondent-bank routing can obscure the true originating country. National remittance volume demonstrates the importance of the use case; it does not prove any particular corridor, FX rate, cancellation process, or last-mile payout. [BSP Overseas Filipino Cash Remittances](https://www.bsp.gov.ph/statistics/external/ofw2.aspx)

**Representative corridor — United States–recorded to the Philippines.** BSP recorded **US$14.146 billion** of 2025 cash remittances under the United States, the largest immediate source in its table. BSP explicitly warns that overseas remittance centres often route through US correspondent banks and that money-courier flows may be recorded where a courier's main office is located. The figure therefore supports a high-value **recorded route**, not a claim that every dollar originated with a US sender. The corridor is selected for pattern analysis because it combines that recorded scale with an official sender-side remittance framework; it is not a provider, corridor-launch, or market decision. [BSP remittances by country and source](https://www.bsp.gov.ph/statistics/external/ofw2.aspx)

For a covered US consumer transfer, Regulation E requires disclosures including the funded amount, provider fees and taxes, applicable exchange rate, covered third-party fees, amount to the recipient, and date available. Certain receiving-institution fees may remain outside the disclosed “total to recipient.” The rule also provides sender-side error-resolution procedures—which may allow up to 90 days for investigation—and, subject to conditions, a 30-minute cancellation right. Those protections attach to the regulated remittance relationship and sender; they do not establish that a Philippine bank or e-money account has credited, that cash is available, or that a later stable-asset leg is redeemable. [CFPB §1005.31 disclosures](https://www.consumerfinance.gov/rules-policy/regulations/1005/31/), [§1005.33 error resolution](https://www.consumerfinance.gov/rules-policy/regulations/1005/33/), [§1005.34 cancellation and refund](https://www.consumerfinance.gov/rules-policy/regulations/1005/34/)

The 2025 Consumer Finance and Inclusion Survey found roughly 50% formal account ownership, 36% e-money account ownership, 23% bank-account ownership, and continued importance of ATMs and e-money agents, with material urban, income, and education differences. These categories overlap and must not be summed into a unique-user figure. Shared household access also makes identity, device recovery, and authoritative entitlement first-order product questions. [BSP 2025 Consumer Finance and Inclusion Survey](https://www.bsp.gov.ph/Inclusive%20Finance/Financial%20Inclusion%20Reports%20and%20Publications/2025/2025CFISreport.pdf)

PhilPaSSplus settles results from retail arrangements including InstaPay and PESONet. InstaPay supports near-real-time transfers up to PHP50,000 per transaction, subject to institution-level fees and limits; PESONet remains batch-based with cut-offs. BSP Circular 1195 establishes status notifications and return handling for unsuccessful domestic electronic transfers, including an ordinary one-hour return expectation for rejected, returned, or timed-out instant transfers. Those rules do not combine the foreign remittance, VASP, stable-asset, custody, domestic EFT, and cash-out legs into one guarantee. [PhilPaSSplus](https://www.bsp.gov.ph/Pages/PAYMENTS%20AND%20SETTLEMENTS/PhilPaSS/PhilPaSS-Overview.aspx), [InstaPay FAQ](https://www.bsp.gov.ph/PaymentAndSettlement/FAQ_Instapay.pdf), [PESONet FAQ](https://www.bsp.gov.ph/PaymentAndSettlement/FAQ_PESONet.pdf), [BSP Circular 1195](https://www.bsp.gov.ph/Regulations/Issuances/2024/1195.pdf)

BSP Circular 1206 makes the remittance-platform, remittance-company, e-money, FX, and VASP roles distinguishable and requires a foreign remittance-platform provider to operate through a Philippine subsidiary or, during the specified transition, a resident agent. A consumer-facing brand can therefore conceal principal, agent, prefunding, settlement-account, FX, and payout dependencies. E-money rules require face-value issue and redemption and liquid assets at least equal to outstanding e-money, but e-money is not a deposit and those system-level rules do not prove cash availability at a particular agent. [BSP Circular 1206](https://www.bsp.gov.ph/Regulations/Issuances/2024/1206.pdf), [BSP Circular 1166](https://www.bsp.gov.ph/Regulations/Issuances/2023/1166.pdf)

BSP Circular 1108 places exchange, transfer, and custody services within the VASP/MSB framework and requires, among other things, records, disclosures, and asset segregation for custodial services. A moratorium on new VASP licences continued from 1 September 2025, subject to reassessment, and BSP published a VASP list dated 15 July 2026. Listing is not evidence that any particular stable asset, custody model, corridor, or Hedgr withdrawal path is approved. [BSP Circular 1108](https://www.bsp.gov.ph/Regulations/Issuances/2021/1108.pdf), [BSP Memorandum M-2025-031](https://www.bsp.gov.ph/Regulations/Issuances/2025/M-2025-031.pdf), [BSP VASP list](https://www.bsp.gov.ph/Lists/Directories/Attachments/19/VASP.pdf)

**Corridor path under test**

`US sender funding in USD → US remittance/FX provider → correspondent or cross-border settlement → Philippine bank, remittance company, EMI, or VASP as applicable → InstaPay, PESONet, or internal-ledger credit → PHP account → ATM, agent, cash, or domestic spending`

Any Hedgr stable-asset variant would insert an authorised conversion, stable asset, custody/settlement, Hedgr entitlement and reconciliation, and a second authorised PHP conversion before domestic credit. That creates more—not fewer—handoffs requiring exact identifiers, amounts, timestamps, status ownership, exception rules, and support boundaries.

**Stress conclusion.** “Sender completed” is not a safe user-facing state when the correspondent, FX, conversion, domestic credit, or cash-out leg remains unresolved. No named US funding institution, remittance provider, correspondent path, Philippine receiving endpoint, FX spread, payout method, or cash-liquidity source was approved or evidenced in this research. The corridor is therefore complete as an analytical pattern and remains **Not sufficiently evidenced** as an executable money path.

### 4.3 Brazil: domestic payment quality weakens the chain-necessity assumption

Pix moves value between accounts within seconds and operates continuously. At Pix's fifth anniversary, Banco Central do Brasil reported nearly **170 million users** and **R$11 trillion** in 2024 transaction value. The SPI PFMI disclosure states that settlement occurs exclusively in central-bank money and is final, irrevocable, and unconditional. Scale and central-bank settlement establish a strong domestic control; they do not validate a preservation asset or every provider endpoint. [BCB Pix](https://www.bcb.gov.br/estabilidadefinanceira/pix), [BCB “Pix at 5”](https://www.bcb.gov.br/en/pressdetail/2640/nota), [SPI PFMI disclosure](https://www.bcb.gov.br/content/estabilidadefinanceira/sistemapagamentosinstantaneos_docs/principios_infraestruturas_mercado_financeiro.pdf)

Pix's Special Return Mechanism covers particular fraud and operational-failure scenarios; it is not guaranteed reimbursement or a general commercial-dispute process. Pix Saque and Pix Troco can add cash access, but participation, user/provider limits, and local cash availability still apply. Open Finance adds a regulated route for consented account data and initiation without requiring user-facing public-chain settlement. [BCB MED FAQ](https://www.bcb.gov.br/meubc/faqs/p/o-que-e-e-como-funciona-o-mecanismo-especial-de-devolucao-med), [Pix Saque/Troco guide](https://www.bcb.gov.br/content/estabilidadefinanceira/pix/Guia_Implementacao_Pix_Saque_Troco.pdf), [BCB Open Finance](https://www.bcb.gov.br/en/financialstability/open_finance)

BCB Resolutions 520 and 521 took effect on 2 February 2026 and address authorisation and operation of virtual-asset service providers and specified foreign-exchange activities involving virtual assets and foreign-currency-referenced stablecoins. This locates a regulatory perimeter; it does not establish the permissibility or readiness of a Hedgr configuration. [BCB Resolution 520](https://www.bcb.gov.br/estabilidadefinanceira/exibenormativo?numero=520&tipo=Resolu%C3%A7%C3%A3o+BCB), [BCB Resolution 521](https://www.bcb.gov.br/estabilidadefinanceira/exibenormativo?numero=521&tipo=Resolu%C3%A7%C3%A3o+BCB)

**Control under test**

`BRL account → Pix → regulated stable-value account or custody ledger → Hedgr interpretation and reconciliation → BRL redemption → Pix/account → optional cash access`

**Bounded conclusion.** Current evidence does not establish that user-facing public-chain settlement is necessary for Hedgr's minimum Brazilian stability experience. Pix and regulated account records can provide fast domestic movement and authoritative payment evidence. They do not answer what the preservation claim should be, who owes it, how it is segregated, or how it redeems. Brazil should remain a control architecture comparison, not become a market-entry or product-design investigation.

### 4.4 Patterns that transfer—and those that do not

The common patterns are:

1. **Local rail quality does not resolve preservation.** Every case has credible local payment infrastructure; none validates the stable-value claim.
2. **Same-market exit is composite.** It requires an executable conversion, successful local credit, and—where relevant—agent cash.
3. **Interoperability is bounded.** Operator, domestic-EFT, and account-data interoperability do not merge the full value path.
4. **Redress is domain-specific.** Rail refund or complaint rules do not guarantee issuer, custodian, conversion, or cross-border recovery.
5. **Physical and shared access still matter.** Device reach is not account ownership; wallet credit is not agent cash; household access is not individual entitlement.
6. **Public-chain necessity varies.** Brazil supplies a strong non-chain control; Kenya and the Philippines expose portability and cross-border questions but do not prove a blockchain is the answer.
7. **Reconciliation is the shared blocker.** No case evidences a complete authoritative history across rail, conversion, issuer, custodian, settlement environment, Hedgr entitlement, and exit.

The market-specific elements that must be re-evidenced include provider permissions, identity rules, corridor availability, limits, cash access, liquidity, disputes, regulation, support, and stressed behaviour. None of the three cases transfers automatically to Zambia or any eventual operating jurisdiction.

---

## 5. The representative asset is credible enough to study, not safe enough to assume

USDC is used in this report as a **representative asset** because Circle issues it natively on both Stellar and Polygon PoS. Holding the representative asset and issuer family constant narrows the settlement comparison; it does not neutralise jurisdictional terms, deployment-specific controls, redemption access, intermediary exposure, or issuer risk. It is not a stable-asset selection.

### Confirmed issuer and assurance evidence

Circle states that USDC is fully backed by highly liquid cash and cash-equivalent reserves, discloses reserve holdings weekly, and publishes monthly third-party assurance. Its transparency page makes 2026 assurance reports available. Circle also lists both Stellar and Polygon PoS among native USDC networks. [Circle transparency](https://www.circle.com/transparency), [Circle USDC](https://www.circle.com/usdc)

That evidence is material, but the asset must still be assessed as an arrangement spanning issuance, reserve, custody, transfer, user access, and redemption. The Financial Stability Board's final recommendations call for clear governance, risk management, data, recovery, disclosures, robust legal claims, timely redemption, and conservative, liquid reserves. The FSB also warns that the label “stablecoin” does not itself affirm stability. [FSB High-level Recommendations](https://www.fsb.org/2023/07/high-level-recommendations-for-the-regulation-supervision-and-oversight-of-global-stablecoin-arrangements-final-report/)

### Terms that remain material to Hedgr users

Circle's public materials and USDC Terms establish that:

- Circle Mint direct redemption is aimed at eligible exchanges, institutional traders, banks, and large financial institutions; it is not available to ordinary individuals or small businesses;
- a holder without an eligible Circle Mint account cannot directly redeem with Circle under the non-EEA terms;
- USDC is not deposit-insured;
- Circle may block addresses, freeze assets in specified circumstances, and comply with legal orders;
- on-chain transfers are irreversible and may permanently lose access if misdirected or if keys are lost;
- operational or compliance issues can delay or suspend issuance and redemption;
- Circle does not guarantee a one-dollar secondary-market price on third-party platforms; and
- Circle reserves rights concerning supported protocols and potential migrations.

[Circle USDC](https://www.circle.com/usdc), [USDC Terms, updated 12 December 2025](https://www.circle.com/legal/usdc-terms)

Circle's supported-country page lists bank-wire support for accounts domiciled in Kenya, the Philippines, and Brazil. That is useful institutional corridor evidence. It is **not** evidence that an ordinary Hedgr user is eligible for Circle Mint, that a local VASP will execute the conversion, or that mobile-money, e-wallet, Pix, or cash exit is available at a known price and time. [Circle supported countries](https://developers.circle.com/circle-mint/references/supported-countries)

### Hedgr interpretation

USDC remains a plausible reserve-backed asset to test because its issuer identity, reserve disclosures, terms, and native network deployments are inspectable. It does **not** pass preservation or exit integrity for any candidate path until the following are resolved:

- the user's legal claim and redemption position through the selected intermediary;
- reserve, banking, concentration, freeze, operational, and jurisdictional exposure;
- the exact native token identity and issuer/contract on the selected network;
- custody segregation and insolvency treatment;
- executable local conversion and same-market exit under normal and stressed conditions; and
- an asset-impairment and migration plan that does not rely on a second network or bridge as the sole escape route.

The relevant user statement is therefore not “USDC is always one dollar.” A truthful statement would distinguish issuer reserve evidence, direct-redemption eligibility, current market price, local executable quote, and available local withdrawal.

---

## 6. Custody is an entitlement decision, not a wallet feature

Provider documentation demonstrates that several technical custody patterns are available. For example, Circle documents developer-controlled wallets, user-controlled wallets, and modular passkey wallets, and provides managed broadcasting, indexing, and event data. Those are provider capabilities, not a Hedgr custody decision or proof of legal control, segregation, recovery, portability, or service continuity. [Circle Wallets](https://developers.circle.com/wallets)

| Custody pattern | Potential product benefit | Material truth that must remain visible | Critical diligence still required |
| --- | --- | --- | --- |
| Regulated custodian / operator-controlled wallet | Familiar recovery; policy controls; support; server-side operations | Provider or Hedgr can initiate or restrict movement; user owns a contractual entitlement rather than unilateral signing power | Legal owner, safeguarding/segregation, insolvency, signers, freezes, limits, recovery SLA, sub-custody, migration, audit evidence |
| User-controlled wallet | Stronger transaction approval and portability; reduced operator signing power | Lost credentials or compromised device may affect access; issuer and network controls still apply | Recovery design, guardians or passkeys, device change, sanctions controls, support, transaction-error redress, inheritance, local suitability |
| Hybrid or account-abstraction model | Policy limits, sponsored fees, recoverable user experience | Control is divided among contracts, keys, provider policies, and administrators | Upgrade/admin keys, pause and recovery powers, contract audit, bundler/paymaster dependencies, fallback signing, provider exit |
| Regulated account ledger without user-facing chain | Clear provider record and familiar account recovery; compatible with domestic rails | User relies on the provider's legal obligation and ledger; asset location may be off-chain or omnibus | Nature of the claim, safeguarding, reconciliation to backing assets, redemption, portability, provider resolution, history migration |

### Minimum custody admission evidence

Before any path can move from **Not sufficiently evidenced**, Hedgr needs a defensible answer to:

1. Who is the legal debtor, custodian, account provider, and technical signer?
2. What record is authoritative for each user's entitlement?
3. Are user assets or claims segregated from provider and Hedgr assets?
4. Who can freeze, claw back, pause, recover, upgrade, or transfer value?
5. What happens after device loss, key loss, provider outage, compromise, insolvency, or a disputed instruction?
6. Can Hedgr export evidence and migrate value and history without creating a reconstructed or inferred balance?
7. What user disclosure accurately describes control, restrictions, recovery, and redress?

Until these questions are answered for a named configuration, “embedded wallet,” “non-custodial,” and “account abstraction” are interface labels rather than preservation evidence.

---

## 7. Stellar and Polygon confirm settlement capability—not a money path

Both reviewed networks support Circle-native USDC and fast finality evidence. Choosing between them does not diversify Circle issuer, reserve, redemption, freeze, or concentration risk. More importantly, neither network establishes custody, user entitlement, executable local conversion, rail completion, or same-market withdrawal.

| Dimension | Stellar | Polygon PoS | Hedgr consequence |
| --- | --- | --- | --- |
| Native USDC identity | `USDC` plus Circle issuer account; code alone is insufficient | Circle-native ERC-20 contract; legacy `USDC.e` is bridged and is not issued by Circle | Store and verify network plus issuer/contract identity; remove `USDC.e` and wrapped assets from a starting path |
| Settlement | Stellar Consensus Protocol uses federated Byzantine agreement and prioritises safety over liveness; ledgers generally close in 3–5 seconds | Heimdall v2 milestones use more-than-two-thirds agreement and Polygon documents deterministic finality in roughly 2–5 seconds | Finality is network truth only; never convert seconds-to-finality into a withdrawal promise |
| Failure model | Quorum loss can halt progress; the 2019 official postmortem records a 67-minute halt without a fork or inconsistent balances | Polygon documents that a hard-fork disagreement involving at least one-third plus one of staked POL can temporarily form two chains and then halt Bor | Model explicit pending and degraded states; validate current quorum/stake topology before preservation claims |
| Fees and account requirements | XLM fees, surge pricing, base account reserve, and trustline reserve | POL/EIP-1559 fees; relayers and paymasters can sponsor fees but add dependencies | Hedgr or its provider must fund, cap, monitor, reconcile, and communicate gas or reserve failure |
| Custody primitives | Native signers, thresholds, multisig, and a SEP-30 recovery pattern | Broad EVM wallet, smart-account, relayer, and paymaster compatibility | Technical primitives do not select a custody model or establish legal entitlement and recovery |
| Governance and concentration | Validators choose quorum sets; current Tier-1 membership, overlap, hosting, and practical fault tolerance were not fully evidenced | Validator stake, two-client operation, contract governance, Ethereum checkpointing, and documented multisig authorities create distinct control surfaces | Governance and operational dependencies must remain network-specific and be refreshed before a decision |
| Observability | Core metrics; self-hostable RPC and Horizon, with limited/truncated public history | EVM JSON-RPC including `finalized`; Bor/Heimdall RPC and monitoring surfaces | Hedgr must own durable, redundant evidence ingestion; public endpoints and explorers cannot be account truth |
| Migration | Circle CCTP can burn/mint native USDC across supported networks | Same | Asset movement does not migrate custody rights, user history, local rails, legal claims, or reconciliation state; defer cross-network movement |

Primary network and issuer sources: [Circle USDC addresses](https://developers.circle.com/stablecoins/usdc-contract-addresses), [Stellar asset identity](https://developers.stellar.org/docs/learn/fundamentals/stellar-data-structures/assets), [Stellar consensus](https://developers.stellar.org/docs/learn/fundamentals/stellar-consensus-protocol), [Stellar validators](https://developers.stellar.org/docs/validators), [Stellar 2019 halt report](https://stellar.org/blog/developers/may-15th-network-halt), [Stellar fees](https://developers.stellar.org/docs/learn/fundamentals/fees-resource-limits-metering), [Stellar RPC](https://developers.stellar.org/docs/data/apis/rpc), [Polygon architecture](https://docs.polygon.technology/pos/architecture/overview), [Polygon finality](https://docs.polygon.technology/pos/concepts/finality/finality), [Polygon governance](https://docs.polygon.technology/pos/governance/governance-fundamentals), [Polygon multisig authorities](https://docs.polygon.technology/pos/reference/commit-chain-multisigs).

### 7.1 Stellar: retain the bounded payment-rail hypothesis

Stellar's role in the reduced set is architectural and comparative, not a finding of relative suitability. Native asset primitives, fast settlement, safety-over-liveness consensus, native signer controls, and self-hostable evidence services allow the report to test a deliberately bounded public-chain path. Its material uncertainties are equally explicit:

- current quorum topology and organisation/infrastructure concentration;
- Circle asset-control flags and issuer restrictions;
- XLM fee and reserve sponsorship;
- durable history beyond public API retention;
- custody, recovery, and authoritative entitlement; and
- local converter, liquidity, and exit evidence.

Stellar should therefore remain the **single public-chain retest configuration**, not because it has passed the gates, but because it tests a narrow payment-oriented path with fewer starting assumptions than simultaneous EVM composability or cross-network operation.

### 7.2 Polygon PoS: defer unless an unmet requirement justifies it

Polygon supports native USDC, EVM custody and smart-account tooling, deterministic milestone finality, and mature RPC conventions. Those benefits come with additional explicit surfaces: Bor and Heimdall client operation, validator stake concentration, POL fees, Ethereum RPC and checkpoint dependencies, protocol upgrades, multisig-controlled contracts, and a large composability surface.

A point-in-time review of Polygon's official validator API at **13:48:23 UTC on 21 July 2026** returned 102 rows whose status was `active`. The accompanying calculation summed each row's reported `totalStake` with arbitrary-precision integer arithmetic to a denominator of **3,582,824,368.431963 POL**, sorted the rows descending, and found that the largest four represented **35.8929%** and the largest ten **68.3073%**. The API is mutable and the raw response was not retained; `POLYGON_VALIDATOR_CONCENTRATION_SNAPSHOT_2026-07-21.md` records the method and boundaries. These figures do not establish common ownership, collusion, or effective control; they establish a concentration question that requires current, independent diligence. [Polygon validator API](https://staking-api.polygon.technology/api/v3/validators?limit=105), [validator admission documentation](https://docs.polygon.technology/pos/get-started/becoming-a-validator)

Polygon remains a credible settlement environment to reconsider if a selected custody model, provider ecosystem, smart-account requirement, or market path cannot be satisfied by the control or Stellar configuration. No such differentiating starting-path requirement is currently evidenced. Deferral prevents a second public-network study from duplicating the same unresolved exit and custody questions.

### 7.3 No third network is warranted at this stage

Stage 1 did not reveal a material starting-path hypothesis that Stellar, Polygon, the regulated account-ledger control, and the Polygon Open Money topology fail to expose. Adding another public network would broaden the survey without addressing the common critical gaps. The additional-network option is therefore **removed from this report and may be re-opened only against a specific unmet requirement**.

---

## 8. “Open Money” refers to two different things and they must stay separate

### 8.1 Polygon Open Money Stack is a specific provider-led platform

Polygon describes its Open Money Stack (OMS) as a vertically integrated stablecoin-payments platform spanning fiat ramps, wallets, compliance, orchestration, and on-chain settlement. Its documentation says the stack is composable and has “no lock-in,” while also stating that Polygon owns and operates the underlying Polygon settlement layer. Both statements are provider claims that require contractual and operational validation. [Polygon OMS overview](https://docs.polygon.technology/oms/overview)

Public OMS materials show useful design concepts:

- custodial, non-custodial, and agentic account models;
- for the documented custodial model, OMS holds keys and end users do not sign;
- transaction states for processing, action required, completed, and failed;
- webhook events, idempotency keys, hold reasons, and payout sub-states; and
- current tables for assets, networks, fiat rails, settlement timing, and fees.

[OMS account model](https://docs.polygon.technology/payments/core-concepts/account-model), [transaction lifecycle](https://docs.polygon.technology/payments/core-concepts/transaction-lifecycle), [currencies and rails](https://docs.polygon.technology/payments/core-concepts/currencies-and-rails)

The same public record limits the starting-path claim:

- the public product page offers early access and marks stablecoin orchestration and the KYC hub as coming soon;
- it says some components are live while a single integration API is forthcoming;
- the documented fiat rails are centred on US ACH, wire, RTP, SWIFT/IBAN, Canadian rails, cards, and US cash, not local Kenya, Philippines, or Brazil rails;
- live authoritative catalogue endpoints are described as planned;
- the integrated design recommends Polygon and includes automatic bridging/cross-chain routing and yield primitives that are outside Hedgr's starting scope; and
- claims about production readiness, volume, wallet addresses, transaction cost, liquidity, and live integrations originate from Polygon and remain provider/ecosystem claims.

[Polygon Open Money Stack product page](https://polygon.technology/open-money-stack), [OMS currencies and rails](https://docs.polygon.technology/payments/core-concepts/currencies-and-rails)

**Disposition: defer.** OMS may later be a useful provider configuration to diligence. It is not currently evidence of a Kenya, Philippines, or Brazil complete path; it does not establish the legal custody entity, exact licences, local counterparties, executable stressed liquidity, end-to-end reconciliation, or migration rights. Its documented 1:1 issuer conversion statement must not be used as proof of Hedgr-user exit.

### 8.2 Hedgr's modular money-stack pattern is an internal architecture principle

Hedgr's modular pattern means that rails, conversion, assets, custody, settlement, liquidity, and evidence services have explicit interfaces and may be replaced through governed migration. It does **not** mean these components are interchangeable, that one vendor should own them all, or that cross-network routing should be automatic.

**Disposition: retain.** The internal modular pattern remains the correct way to make concentration, evidence, and replacement costs visible. It should not be branded or modelled as Polygon OMS.

---

## 9. Cross-network movement does not create network independence

Circle's Cross-Chain Transfer Protocol burns native USDC on the source network and mints native USDC on the destination, avoiding a wrapped asset and a conventional bridge liquidity pool. That is a meaningful technical distinction. CCTP still introduces issuer attestation, contract, encoding, finality, destination-network, gas, and operational dependencies. It also does not transfer local fiat access, the user's custody contract, authoritative history, legal rights, reconciliation exceptions, or withdrawal support. [Circle CCTP](https://developers.circle.com/cctp), [supported chains and domains](https://developers.circle.com/cctp/concepts/supported-chains-and-domains), [finality and confirmations](https://developers.circle.com/cctp/concepts/finality-and-block-confirmations)

Under Hedgr's governance language, “not a wrapped-token bridge” does not mean “risk-neutral migration.” CCTP, canonical bridges, third-party bridges, and automatic routing should all be deferred until a first path is separately proven and a specific second-network need is approved.

Bridge-dependent core balances remain disqualifying because they make preservation, exit, and account truth depend on two settlement domains and an inter-domain control plane. FATF's 2026 offshore-VASP analysis also notes that multiple blockchains and bridges can complicate oversight and traceability; this is an AML/CFT observation, not a complete operational-risk assessment. [FATF offshore VASP report](https://www.fatf-gafi.org/en/publications/Virtualassets/Understanding-Mitigating-Risks-Offshore-VASPs.html)

---

## 10. Invariant-gate result: critical evidence gaps dominate

The matrix applies the gates to **complete configurations**, not to isolated components. A network may have strong finality evidence while the complete path remains **Not sufficiently evidenced** because custody, local exit, or reconciliation is unresolved.

**Legend:** P = Pass; C = Conditional; NSE = Not sufficiently evidenced; F = Fail.

| Configuration | Preservation | Exit and liquidity | Controlled portability | Local rails | Verifiability and containment | Shortlist eligibility |
| --- | --- | --- | --- | --- | --- | --- |
| Regulated account-ledger control | **NSE** — asset claim, safeguarding, control | **NSE** — redemption and executable exit | **NSE** — provider and history migration | **NSE** — no named end-to-end market path | **NSE** — reconciliation and recovery | **Blocked** |
| Stellar/native USDC single path | **NSE** — custody, issuer controls, current quorum | **NSE** — no same-market executable route | **NSE** — custody and history migration | **NSE** — standards are not local rails | **NSE** — end-to-end reconciliation absent | **Blocked** |
| Polygon/native USDC single path | **NSE** — custody, governance, concentration | **NSE** — no same-market executable route | **NSE** — custody, contracts, and history migration | **NSE** — no approved-market path | **NSE** — end-to-end reconciliation absent | **Blocked** |
| Polygon Open Money Stack | **NSE** — legal custody/control and production scope | **NSE** — local exit and stress liquidity | **NSE** — claimed composability not migration evidence | **NSE** — documented local rails absent | **NSE** — lifecycle concepts, but no complete evidence | **Blocked** |
| Bridge-dependent multi-network | **F** — core value depends on inter-domain mechanism | **F** — exit path fragments across domains | **F** — routing hides rather than governs differences | **NSE** — local path still absent | **F** — unified balance risks shadow accounting | **Disqualified from starting path** |

**Visual interpretation.** The report's gate chart should be read as evidence coverage, not as a safety or quality score. It shows that no configuration has a Pass or Conditional complete-path gate. The only structural failures identified at this stage belong to the bridge-dependent starting architecture; the other paths remain blocked because critical evidence is missing rather than because every component is known to be unsuitable.

### Why no Conditional status is used

The frame permits Conditional only where the remaining dependency is bounded and non-critical. Here, the gaps concern the legal or technical custody model, authoritative entitlement, local executable liquidity, reconciliation, recovery, migration, or regulatory permissibility. The approved method explicitly classifies those as critical. Calling them Conditional would weaken the frame after seeing the evidence.

### Secondary characteristics do not decide the result

Stellar and Polygon differ in fees, finality mechanics, tooling, account model, validator design, custody compatibility, composability, and operational surface. Polygon OMS may reduce integration seams. Brazil's domestic rails may reduce the need for a public network. These observations are useful for forming the retest set, but no path is eligible for weighted comparison while a primary gate remains NSE or Fail.

---

## 11. A truthful account model must prevent shadow accounting

Hedgr should not maintain one ambiguous `balance` field. The domain model should distinguish at least:

| Record | Purpose | Required provenance |
| --- | --- | --- |
| User entitlement | The authoritative amount and legal/account basis owed to or controlled for a user | Authoritative ledger/custodian, account identifier, effective time, restriction state |
| Asset position | The backing or segregated asset position supporting entitlements | Asset identifier, issuer/contract, custodian/address, observed time, evidence reference |
| Rail instruction | Local entry or exit state | Rail/provider, instruction ID, accepted/credited/rejected/reversed state, timestamps |
| Conversion instruction | Fiat/asset conversion state | Counterparty, quote, size, price, fees, expiry, execution and settlement evidence |
| Settlement instruction | Network or account-ledger settlement state | Environment, transaction or ledger ID, submitted/confirmed/final/failed state, finality basis |
| Reconciliation assertion | Whether two or more authoritative domains agree | Domains compared, amounts, exceptions, freshness, reviewer/system, evidence links |
| Liquidity observation | Whether exit is executable now | Counterparty, size, price, limits, quote time, expiry, settlement conditions |
| Stability assessment | Hedgr's interpretation of risk and safe action | Evidence inputs, policy version, assessment time, uncertainty, recommended limit/pause |

Every material state should carry `truth_domain`, `source`, `observed_at`, `effective_at`, `freshness`, `status`, `restriction`, and `evidence_reference` semantics. A derived Stability Engine assessment may point to these records but must not overwrite them.

### User-facing state model

The experience should distinguish:

- **Received by entry rail** — local provider reports receipt; conversion may not have occurred.
- **Conversion pending** — an instruction exists; no asset position is yet asserted.
- **Asset held and reconciled** — custody/asset evidence agrees with the user-entitlement record as of a stated time.
- **Settlement confirmed** — the network or ledger event reached the configured finality condition.
- **Available to withdraw** — a current executable quote exists at the intended size, with known price, fees, limits, capacity, settlement conditions, and an evidenced local route; policy permits the instruction. This is not a guarantee of instant completion.
- **Withdrawal pending** — conversion or rail completion remains outstanding.
- **Restricted or unavailable** — asset, custody, liquidity, compliance, provider, or rail conditions prevent action.
- **Evidence uncertain** — authoritative sources conflict, are stale, or are unavailable; no completion inference is safe.

This model supports Entry → Orientation → Stability → Insight → Safe action while preventing the interface from feeling like a block explorer or presenting network confirmation as money-in-hand.

---

## 12. Failure containment must follow the failing truth domain

> **Future-state control requirements only.** This table describes controls a later authorised operating path would need. It does not activate a control, instruct fund movement, or widen the current Class A posture.

| Failure state | Authoritative evidence to inspect | Truthful user communication | Control requirement under later authority | Escalation or kill condition |
| --- | --- | --- | --- | --- |
| Local entry delayed or reversed | Rail/provider instruction and account statement | “Entry pending” or “reversed”; no stable balance claim | Conversion would remain blocked; reconciliation and duplicate prevention would be required | Unknown rail state beyond policy window or unreconciled duplicate |
| Conversion quote expires or liquidity disappears | Executable quote and counterparty execution record | “Conversion unavailable”; state that price, fees, size, limits, or timing are unknown or expired | Indicative prices would not substitute for an executable quote; the affected path would pause | No executable same-market exit or fallback counterparty |
| Stable asset impaired, frozen, or depegged | Issuer notices, reserve/redemption evidence, on-chain restrictions, market executable prices | Name the affected asset and restriction; do not say “stable” or “available” | New exposure would be capped or halted; evidence would be preserved; unwind analysis would require separate approval | Redemption unavailable, backing uncertain, freeze affects balances, or exit cannot be priced |
| Custody signer, recovery, or provider failure | Custodian ledger, signer/audit logs, provider status, entitlement record | Distinguish inaccessible from lost; state what is known | Movement would pause while account truth is preserved; only an approved recovery or migration plan could proceed | No authoritative entitlement, signer ambiguity, or migration could lose value/history |
| Network halt, fork, congestion, or RPC disagreement | Multiple nodes/providers, finality status, validator/network notices | “Settlement delayed” rather than failed or complete | Resubmission would remain blocked until sequence/nonce and canonical state were reconciled | Finality cannot be established or provider endpoints disagree materially |
| Provider API outage with network healthy | Provider events plus independent network evidence | Explain service outage separately from asset/network state | The product would enter a read-only evidence state and avoid unsupported balance inference | Provider is sole evidence source or safe recovery cannot be initiated |
| Reconciliation mismatch | User ledger, custody, network, conversion, and rail records | “Balance under review”; suppress unsafe available-to-withdraw claim | The affected account or path would be restricted while logs are preserved and the mismatch is bounded | Material mismatch cannot be bounded or authoritative source cannot be identified |
| Withdrawal disputed or cash unavailable | Conversion execution, rail credit, agent/cash evidence, support case | Identify completed and incomplete legs; provide responsible support boundary | Completion would not be shown until usable local money was evidenced | Repeated failures, unresolved funds, or no viable local fallback |

The system should prefer a visible pause over an inferred success. A pause is not evidence of loss; it is a control against turning missing evidence into a financial claim.

---

## 13. Multi-network should mean governed admission, not automatic reach

The research supports a more precise long-term position:

> **Hedgr should be capable of admitting and retiring separately governed money paths. It should not assume that several networks will be live, pooled, routed, or user-interchangeable.**

### 13.1 Interfaces that should remain network-neutral

- user and account identity references;
- authoritative entitlement records and balance classifications;
- money and currency types with explicit precision;
- instruction lifecycle states;
- evidence, provenance, freshness, and reconciliation records;
- component registry and approved-version metadata;
- risk exposures, limits, policy decisions, and pause states;
- incident, exception, support, and dispute records;
- liquidity quote and execution interfaces;
- rail and conversion adapters;
- component admission, migration, retirement, and history-export interfaces; and
- user-language rules for pending, restricted, uncertain, and unavailable states.

### 13.2 Properties that must remain network- or provider-specific

- chain/ledger identifier and native asset issuer or contract;
- finality semantics, fork/halt behaviour, and confirmation policy;
- sequence, nonce, reserve, trustline, fee-token, and gas requirements;
- validator, quorum, sequencer, checkpoint, and governance dependencies;
- signer, threshold, administrator, upgrade, pause, freeze, and clawback powers;
- node, RPC, indexer, event, and history-retention behaviour;
- contract, oracle, relayer, bundler, paymaster, and bridge dependencies;
- custody provider, legal account, segregation, and recovery model;
- local liquidity source, quote basis, limits, settlement time, and fallbacks; and
- market-specific identity, licensing, rail, complaint, and cash-access conditions.

The adapter boundary should hide implementation detail while exporting these material properties into risk, evidence, policy, operations, and user-language layers.

### 13.3 Second-network admission criteria

A second settlement environment should not be considered unless all of the following are evidenced and separately authorised:

1. The first complete path has passed its applicable gates under a later operating authority; research or prototype comprehension is insufficient.
2. A specific user, market, resilience, custody, asset, or provider requirement cannot be met by the first path.
3. The proposed network materially improves that requirement after accounting for added liquidity, custody, reconciliation, operational, governance, and comprehension burden.
4. The asset is native or issuer-canonical; no bridge-dependent core balance is required.
5. Same-market entry and exit are independently evidenced for the new path.
6. Authoritative entitlement remains unambiguous when assets or providers are partitioned.
7. Exposure caps, monitoring, reconciliation, degraded-state language, pause/kill controls, and incident ownership are defined.
8. Value and authoritative history can be migrated or the path can be retired without stranding users.
9. User-facing differences in asset, control, withdrawal, and failure behaviour remain visible.
10. Founder disposition, an ADR where required, and repo-native implementation authority exist.

The second network must solve a known problem. “Ecosystem optionality,” volume, or lower fees alone is not a sufficient admission reason.

---

## 14. The retained retest set is deliberately asymmetric

### 14.1 Configuration A — regulated account-ledger control

**Research path**

`Local account/rail → regulated conversion or stable-value claim → regulated custodian/account ledger → Hedgr evidence and reconciliation → same-market redemption and rail exit`

**Hypothesis tested**

Can Hedgr deliver preservation orientation, authoritative entitlement, recovery, and usable exit without exposing public-chain settlement to the user?

**Why it remains**

Brazil demonstrates that fast, final domestic money movement and regulated account connectivity do not require a public blockchain. The control may reduce key, gas, finality, and network-comprehension burden. It could also concentrate legal, custody, and provider dependency. Only named asset and provider evidence can determine the balance.

**Required diligence dossier before shortlisting**

- exact stable-value claim and legal debtor;
- safeguarding, segregation, insolvency, freeze, and recovery treatment;
- authoritative user ledger and reconciliation to backing assets;
- direct and intermediary redemption terms;
- executable FX/local conversion, limits, fees, timing, and stress behaviour;
- provider failure, data export, history migration, and orderly wind-down;
- market-specific permissions and support/redress; and
- truthful language distinguishing entitlement, backing, and withdrawability.

**Kill condition**

Remove the control path if it cannot provide a defensible preservation claim, timely same-market exit, auditable segregation, or migration without loss of value and history—or if the only viable form recreates the same unbounded provider concentration the modular design is meant to govern.

### 14.2 Configuration B — Stellar with Circle-native USDC

**Research path**

`One local rail → one authorised conversion path → Circle-native USDC on Stellar → one explicit custody/control model → Hedgr-owned evidence and reconciliation → one authorised conversion path → same-market usable exit`

**Hypothesis tested**

Can one payment-oriented public network add necessary asset portability or ownership evidence while remaining comprehensible, locally liquid, and operationally contained?

**Why it remains**

Stellar exposes native asset identity, fast safety-oriented settlement, explicit signer controls, and observable ledger state without requiring cross-network orchestration. It is retained as the sole public-chain comparator to avoid duplicating the common custody, exit, and reconciliation work. That is a research-efficiency choice, not a finding of superiority. These properties do not resolve the critical gaps.

**Required diligence dossier before shortlisting**

- current Circle issuer account and asset-control configuration;
- holder and intermediary redemption position;
- named custody model, entitlement, signers, segregation, recovery, and migration;
- current validator/quorum topology, common dependencies, and halt tolerance;
- XLM fee/reserve sponsorship, limits, monitoring, and fallback;
- named market entry/exit counterparties and executable stressed liquidity;
- durable indexing and reconciliation across every truth domain;
- incident, pause, unwind, asset-impairment, and provider-replacement plans; and
- market-specific regulatory and user-language review.

**Kill condition**

Remove the path if local exit depends on informal liquidity or CCTP, custody or entitlement cannot be made authoritative, current quorum/provider concentration cannot be acceptably bounded, or migration would strand value or history.

### 14.3 What this does not decide

Retaining these configurations does not select Brazil, Kenya, the Philippines, Stellar, USDC, a custodian, or an account provider. It selects two distinct questions for any later authorised diligence and prevents the candidate set from expanding before those questions are answered.

---

## 15. Replaceability must be designed and evidenced by layer

| Component | Replaceability requirement | Difference that must not be abstracted away |
| --- | --- | --- |
| Local rail | Adapter, instruction IDs, reconciliation, retry/reversal rules, alternative endpoint, history export | Limits, timing, cash access, identity, complaints, operator concentration |
| Conversion/liquidity provider | Quote and execution interface, exposure cap, fallback, settlement evidence, counterparty retirement | Price, spread, size, KYC, settlement risk, stress depth, legal role |
| Stable-value asset | Canonical identifier, issuer evidence, exposure cap, impairment trigger, approved unwind/migration | Reserve, redemption claim, freeze, jurisdiction, price, issuer concentration |
| Custody/account provider | Portable entitlement/history, signer map, recovery, export, segregation evidence, transition plan | Legal owner/debtor, insolvency, freeze, recovery, administrator powers |
| Settlement environment | Network adapter, finality policy, redundant evidence, fee controls, retirement and replay-safe migration | Finality, governance, validators, fees, halt/fork behaviour, asset form |
| Node/RPC/indexer | Multiple endpoints, self-host option where proportionate, durable event store, gap detection | Data retention, trust, latency, indexing rules, outage and inconsistency |
| Stability Engine policy | Versioned rules and evidence inputs independent of provider status codes | Risk interpretation, confidence, limits, pause and user-language consequence |
| Support and incident tooling | Cross-domain case IDs, immutable evidence, ownership and escalation mapping | Provider-specific redress, deadlines, jurisdiction, and responsibility |

Replaceability is incomplete if value can move but history, legal claim, restrictions, or user explanations cannot.

---

## 16. Disqualifying and deferral conditions

### Disqualify or remove from a starting path

- bridge or cross-chain attestation is required to establish, preserve, or recover the core user balance;
- practical local exit depends on informal, unlicensed, or unverified liquidity;
- issuer redemption or global volume is presented as evidence of Hedgr-user withdrawal;
- no authoritative record of user entitlement can be identified;
- custody, signing, freeze, recovery, or administrator powers cannot be disclosed;
- the interface infers one balance across unreconciled ledgers, wallets, networks, or providers;
- failed states cannot be shown without claiming unsupported completion or safety;
- migration can strand value or lose authoritative history;
- one integrated provider controls custody, settlement, conversion, liquidity, and evidence without bounded exposure and a credible exit plan;
- yield is required to fund, preserve, or make the starting proposition economically credible; or
- a second network duplicates capability without a specific, evidenced requirement.

### Defer pending evidence

- the path may be structurally supportable but custody, legal claim, local exit, executable liquidity, reconciliation, recovery, migration, or permissibility remains unresolved;
- provider documentation is early access, forward-looking, commercially interested, or lacks market-specific scope;
- current validator, governance, multisig, reserve, or asset-control configuration has not been refreshed;
- the proposed market pattern has not been replayed against Zambia or the eventual operating jurisdiction; or
- the only benefit is secondary—fees, speed, tooling, ecosystem size, throughput, or yield—while a primary gate remains open.

---

## 17. Recommended next steps and decision timing

### Founder–HedgrOps decision required now

1. **Accept or revise the zero-shortlist conclusion.** No path currently satisfies the critical-gap rule.
2. **Accept or revise the two-configuration retest set.** The proposed set is the regulated account-ledger control plus Stellar/native USDC.
3. **Retain or revise the multi-network thesis.** The proposed revision makes multiple networks conditional admissions rather than an inevitable destination.
4. **Confirm the starting-path exclusions.** Bridges, CCTP, automated routing, yield, protocol allocation, and a second network remain out of scope.
5. **Record the closure disposition for `MONEY-STACK-001`.** Supported dispositions are **retain with revision**, **retest**, and **defer** as specified in the Executive Summary.

### Follow-on work requiring separate repo authority

If Founder–HedgrOps chooses to continue, the next authorised activity should be one or more tightly scoped evidence dossiers rather than implementation:

- **legal and regulatory dossier** for one market and one exact asset/custody/control structure;
- **custody and entitlement dossier** covering ownership, safeguarding, signers, recovery, insolvency, freeze, audit, export, and migration;
- **local liquidity and exit dossier** using named counterparties, executable quotes or verifiable market evidence, limits, timing, exceptions, agent/cash constraints, and stressed scenarios;
- **reconciliation and evidence dossier** specifying authoritative records, event ingestion, mismatch handling, recovery, data retention, and migration;
- **network governance and security refresh** for current Stellar quorum topology and, if re-admitted, Polygon validator, multisig, checkpoint, and client dependencies; and
- **synthetic product-language retest** for pending, reconciled, withdrawable, restricted, and evidence-uncertain states, without implying live capability.

Each dossier requires its own scope, owners, source/data rules, stop conditions, closure condition, and confirmation that no provider engagement, implementation, or customer-money activity is authorised unless explicitly changed.

### Decisions correctly deferred

No decision is required now on:

- launch market or corridor;
- stable-value asset;
- custody or account provider;
- conversion, liquidity, or off-ramp provider;
- Stellar or Polygon implementation;
- production architecture;
- a second network;
- CCTP or any bridge;
- yield venue or protocol; or
- customer-money execution.

### Founder–HedgrOps alignment points

**What the evidence now supports**

- Stability depends on the complete value path and the legal/operational claim, not the chain alone.
- Local exit, custody, entitlement, and reconciliation are the highest-value uncertainties.
- Native asset support is preferable to bridged representations but does not establish preservation or withdrawal readiness.
- Brazil weakens the assumption that a user-facing public chain is necessary for the minimum experience.
- Multi-network is useful as an architectural admission capability, not as an early product feature.

**What should be excluded or deferred**

- any “winner” claim for Stellar, Polygon, USDC, OMS, or a reference market;
- any claim that network confirmation, issuer redemption, or global liquidity equals user withdrawal;
- provider-led abstraction that conceals custody, settlement, asset, or exit differences;
- a second public network before the first path's common gaps are resolved; and
- all early yield, protocol, bridge, and automated-routing work.

**What a starting point must eventually prove**

- a valid and understandable preservation claim;
- authoritative user entitlement and recoverability;
- one executable local entry and exit path;
- end-to-end reconciliation across every truth domain;
- bounded normal, pending, degraded, disputed, and failure behaviour;
- component migration without value or history loss; and
- user language that never overstates safety, completion, or withdrawability.

---

## 18. Further questions that could change the disposition

### Account-ledger control

- Which regulated claim can supply the preservation objective without adding an opaque investment or credit exposure?
- Can the user have a robust legal claim, timely redemption, segregation, and portable history without a public-chain asset?
- Does a viable provider permit Hedgr-owned reconciliation and migration, or does the control merely shift concentration?

### Stellar/native USDC

- What is the current effective quorum topology, shared infrastructure, and organisation-level halt tolerance?
- Which custody model can satisfy authoritative entitlement, recovery, segregation, and migration in the selected market?
- Who will execute local conversion and withdrawal at known size, price, time, and limits during stress?

### Polygon re-admission

- What specific requirement cannot be met by the account-ledger control or Stellar path?
- Do EVM custody or smart-account benefits outweigh the added contract, governance, fee, client, and checkpoint surface?
- Can canonical contract allowlisting and reconciliation keep the path confined to native USDC, excluding `USDC.e` and wrapped assets?

### Product and governance

- Which user-facing evidence is sufficient to move an amount from “held” to “available to withdraw”?
- What freshness thresholds force the Stability Engine to mark evidence uncertain or pause actions?
- Which limits apply by asset, custodian, converter, rail, network, market, and correlated provider group?
- Which component changes require an ADR, Founder decision, or immediate kill action?

---

## 19. Assumptions and caveats

| Assumption or limitation | Why it is used | Decision affected | How to test | What would invalidate it |
| --- | --- | --- | --- | --- |
| USDC is a representative asset for network comparison, not a selection | It is issuer-native on both Stellar and Polygon PoS, controlling for asset issuer in the settlement comparison | Relative settlement analysis | Re-evaluate a second asset only if it tests a materially different reserve, redemption, or local-rail hypothesis | No lawful/credible intermediary access, unacceptable issuer/control risk, or a materially better asset form |
| The account-ledger path is an architecture control, not a named product | It tests public-chain necessity without expanding into provider selection | Whether user-facing chain settlement is required | Diligence one exact regulated claim and provider structure | No structure can meet preservation, segregation, exit, and migration requirements |
| Public documentation reflects described design, not an SLA | Provider/network documents are the best primary technical source available without engagement | Network and provider capability claims | Contract, audit, incident, security, and operational diligence under new authority | Material implementation differs from public description or controls cannot be verified |
| No local executable liquidity is assumed | No provider was contacted and no decision-grade local quote, order book, capacity, or stressed execution evidence was obtained | All exit gates and shortlist eligibility | Separately authorised counterparty and market diligence | A claim relies only on global volume, indicative pricing, or issuer redemption |
| No legal conclusion is made | The consultant role excludes legal advice; current rules are market- and structure-specific | Regulatory permissibility gate | Qualified jurisdiction-specific legal analysis of an exact configuration | Any report reader treats descriptive regulation as approval or permission |
| The market cases are archetypes, not market choices | The brief approved them for pattern analysis | Market selection | Replay the resulting requirements against Zambia or an approved operating jurisdiction | Cross-market similarity is used as evidence of local feasibility |
| The Polygon validator snapshot is point-in-time provider evidence | It exposes concentration for diligence without inferring common control | Polygon governance assessment | Refresh the official data; analyse identities, ownership, hosting, delegation, and effective control | Stake distribution changes materially or the API field does not reflect consensus stake |
| Yield is unnecessary to the starting thesis | Preservation and exit must stand without return enhancement | Scope and economics | Reconsider only after a path passes preservation and exit gates under separate authority | The product or path depends economically on yield to remain viable |

Additional limitations:

- No provider, regulator, customer, or market participant was contacted.
- No personal, customer, confidential, or regulated data was collected.
- No wallet, API, custody, conversion, settlement, bridge, protocol, or live-money test was performed.
- No provider contract, audit report, insurance policy, SOC report, penetration test, legal opinion, or executable local liquidity agreement was reviewed.
- Network status pages and current API data are provider-reported and can change after the evidence cut-off.
- Market-level statistics describe reach and use; they do not establish individual access, provider availability, corridor feasibility, or stressed cash/liquidity.
- This draft may contain interpretations that Founder–HedgrOps should revise before repo translation. It creates no automatic follow-on work.

---

## 20. Evidence and source-quality register

Unless a row states otherwise, sources were retrieved or revalidated on **21 July 2026**. “Confirmed” means the source directly supports the described external fact; it does not mean Hedgr feasibility or readiness is confirmed.

| Evidence group | Primary sources and source date | Evidence class | What it supports | Material limitation |
| --- | --- | --- | --- | --- |
| International stablecoin controls | [FSB High-level Recommendations](https://www.fsb.org/2023/07/high-level-recommendations-for-the-regulation-supervision-and-oversight-of-global-stablecoin-arrangements-final-report/) (17 July 2023); [CPMI cross-border stablecoin considerations](https://www.bis.org/cpmi/publ/d220.pdf) (October 2023) | Confirmed international policy/standards evidence | Governance, legal claim, redemption, reserves, data, recovery, on/off-ramp and cross-border risk framing | Not a jurisdiction-specific legal opinion or provider assessment |
| AML/CFT and cross-border VASP risk | [FATF stablecoins and unhosted wallets](https://www.fatf-gafi.org/content/dam/fatf-gafi/publications/targeted-report-on-stablecoins-and-unhosted-wallets.pdf.coredownload.inline.pdf) (March 2026); [FATF offshore VASPs](https://www.fatf-gafi.org/en/publications/Virtualassets/Understanding-Mitigating-Risks-Offshore-VASPs.html) (11 March 2026) | Confirmed policy evidence | P2P, informal redemption, cross-border oversight, and bridge/traceability risk | Focused on AML/CFT/CPF, not a complete preservation or operational assessment |
| USDC reserves and redemption | [Circle transparency](https://www.circle.com/transparency) (current); [USDC](https://www.circle.com/usdc) (current); [USDC Terms](https://www.circle.com/legal/usdc-terms) (12 December 2025) | Issuer evidence plus third-party assurance links; commercially interested | Reserve disclosures, assurance cadence, direct redemption eligibility, freeze, price, migration, insurance, and operational terms | Does not prove Hedgr-user legal claim or local exit; issuer representations must be independently diligenced |
| USDC network identity | [Circle USDC contract addresses](https://developers.circle.com/stablecoins/usdc-contract-addresses) (current) | Confirmed issuer technical evidence | Native Stellar issuer identity and native Polygon contract identity | Must be revalidated at integration/decision time; symbol alone is unsafe |
| Circle country and custody capabilities | [Supported countries](https://developers.circle.com/circle-mint/references/supported-countries) (current); [Circle Wallets](https://developers.circle.com/wallets) (current) | Provider documentation | Institutional bank-wire geography and technical wallet categories | Not proof of retail eligibility, local rails, legal custody, provider approval, or SLA |
| Stellar asset and settlement | [Assets](https://developers.stellar.org/docs/learn/fundamentals/stellar-data-structures/assets), [SCP](https://developers.stellar.org/docs/learn/fundamentals/stellar-consensus-protocol), [validators](https://developers.stellar.org/docs/validators), [2019 halt report](https://stellar.org/blog/developers/may-15th-network-halt) | Primary network/foundation documentation | Asset identity, consensus, ledger timing, safety/liveness, and documented halt behaviour | Foundation-operated evidence; current effective quorum topology remains unverified |
| Stellar operation and custody primitives | [Fees](https://developers.stellar.org/docs/learn/fundamentals/fees-resource-limits-metering), [accounts](https://developers.stellar.org/docs/learn/fundamentals/stellar-data-structures/accounts), [signers](https://developers.stellar.org/docs/learn/fundamentals/transactions/signatures-multisig), [SEP-30](https://developers.stellar.org/docs/build/apps/wallet/sep30), [RPC](https://developers.stellar.org/docs/data/apis/rpc), [Horizon](https://developers.stellar.org/docs/data/apis/horizon) | Primary network documentation | Fee/reserve, signing/recovery, API, history, and monitoring properties | Technical compatibility, not a selected custody/recovery model or complete evidence architecture |
| Polygon asset and settlement | [Architecture](https://docs.polygon.technology/pos/architecture/overview), [finality](https://docs.polygon.technology/pos/concepts/finality/finality), [governance](https://docs.polygon.technology/pos/governance/governance-fundamentals) | Primary provider/network documentation | Bor/Heimdall design, milestone finality, fork/halt and consensus thresholds | Provider-operated documentation; operational performance and common control not independently assured |
| Polygon governance and concentration | [Validator admission](https://docs.polygon.technology/pos/get-started/becoming-a-validator), [multisig authorities](https://docs.polygon.technology/pos/reference/commit-chain-multisigs), [official validator API](https://staking-api.polygon.technology/api/v3/validators?limit=105), and `POLYGON_VALIDATOR_CONCENTRATION_SNAPSHOT_2026-07-21.md` at 21 July 2026 13:48:23 UTC | Provider evidence plus reproducible Hedgr calculation | 102 active rows; `totalStake` denominator; point-in-time top-four and top-ten reported stake concentration | Mutable API; raw response not retained; no beneficial-ownership, collusion, hosting, signer-independence, or timelock conclusion |
| Polygon Open Money Stack | [Product page](https://polygon.technology/open-money-stack), [OMS overview](https://docs.polygon.technology/oms/overview), [account model](https://docs.polygon.technology/payments/core-concepts/account-model), [transaction lifecycle](https://docs.polygon.technology/payments/core-concepts/transaction-lifecycle), [currencies and rails](https://docs.polygon.technology/payments/core-concepts/currencies-and-rails) | Provider/ecosystem claims and product documentation | Public product scope, custody descriptions, lifecycle model, current rail tables, and forward-looking status | Commercially interested; no approved-market complete path, contract, audit, legal entity, or production validation |
| Cross-network USDC | [Circle CCTP](https://developers.circle.com/cctp), [supported domains](https://developers.circle.com/cctp/concepts/supported-chains-and-domains), [finality](https://developers.circle.com/cctp/concepts/finality-and-block-confirmations) | Issuer/provider technical evidence | Burn/mint design and cross-network dependencies | Does not migrate custody, history, local rails, legal rights, or Hedgr reconciliation |
| Kenya payment rails | [CBK Mobile Payments](https://www.centralbank.go.ke/national-payments-system/mobile-payments/) (through June 2026); [NPS Regulations](https://www.centralbank.go.ke/images/docs/legislation/NPSRegulations2014.pdf) (2014); [KEPSS PFMI disclosure](https://www.centralbank.go.ke/wp-content/uploads/2025/01/The-Kenya-Electronic-Payment-and-Settlement-System-Report-December-2024.pdf) (December 2024) | Confirmed regulator/payment-system evidence | Rail scale, operational/record/redress rules, settlement and tiering dependencies | Does not establish agent float, conversion, stable asset, custody, or end-to-end exit |
| Kenya virtual assets | [VASP Act 2025](https://new.kenyalaw.org/akn/ke/act/2025/20/eng%402025-11-04) (commenced 4 November 2025); [Draft VASP Regulations 2026](https://www.centralbank.go.ke/wp-content/uploads/2026/03/Draft-Virtual-Asset-Service-Providers-Regulations-2026.pdf) (March 2026) | Statutory and draft-policy evidence | Current framework and proposed stablecoin/custody provisions | Draft regulations are not final; no legal conclusion on Hedgr or any provider |
| Philippines access and remittances | [BSP remittances](https://www.bsp.gov.ph/statistics/external/ofw2.aspx) (through May 2026); [2025 CFIS](https://www.bsp.gov.ph/Inclusive%20Finance/Financial%20Inclusion%20Reports%20and%20Publications/2025/2025CFISreport.pdf) | Confirmed central-bank data | Remittance scale, account/e-money/device/agent access patterns | National/household data does not identify a corridor, provider, entitlement, or cash availability |
| United States-to-Philippines corridor | [BSP remittances by country and source](https://www.bsp.gov.ph/statistics/external/ofw2.aspx) (2025 provisional); CFPB [§1005.31](https://www.consumerfinance.gov/rules-policy/regulations/1005/31/), [§1005.33](https://www.consumerfinance.gov/rules-policy/regulations/1005/33/), and [§1005.34](https://www.consumerfinance.gov/rules-policy/regulations/1005/34/) (current) | Confirmed regulator and central-bank evidence | High-value recorded US route; sender-side disclosure, error, and cancellation domains | BSP warns that correspondent/courier routing can misattribute ultimate origin; no named provider, FX execution, receiving endpoint, payout, or stressed liquidity is evidenced |
| Philippines payment, remittance, e-money, and VASP rules | [Circular 1195](https://www.bsp.gov.ph/Regulations/Issuances/2024/1195.pdf) (30 May 2024); [Circular 1206](https://www.bsp.gov.ph/Regulations/Issuances/2024/1206.pdf) (19 September 2024); [Circular 1166](https://www.bsp.gov.ph/Regulations/Issuances/2023/1166.pdf) (7 February 2023); [Circular 1108](https://www.bsp.gov.ph/Regulations/Issuances/2021/1108.pdf) (26 January 2021); [VASP moratorium](https://www.bsp.gov.ph/Regulations/Issuances/2025/M-2025-031.pdf) (August 2025); [VASP list](https://www.bsp.gov.ph/Lists/Directories/Attachments/19/VASP.pdf) (15 July 2026) | Confirmed regulator evidence | Domestic EFT exceptions; remittance-platform roles; e-money redemption/liquidity rules; current VASP perimeter/list | Does not approve a stablecoin, provider, corridor, custodian, or Hedgr path; face-value e-money redemption does not prove agent cash availability |
| Brazil Pix and account control | [Pix](https://www.bcb.gov.br/estabilidadefinanceira/pix), [Pix at 5](https://www.bcb.gov.br/en/pressdetail/2640/nota) (23 November 2025), [SPI PFMI disclosure](https://www.bcb.gov.br/content/estabilidadefinanceira/sistemapagamentosinstantaneos_docs/principios_infraestruturas_mercado_financeiro.pdf) (23 February 2026), [Open Finance](https://www.bcb.gov.br/en/financialstability/open_finance) | Confirmed central-bank/payment-system evidence | Continuous domestic payment, central-bank settlement finality, scale, and account interoperability | Does not establish a preservation asset, custody, FX conversion, or redemption |
| Brazil virtual assets | [BCB Resolution 520](https://www.bcb.gov.br/estabilidadefinanceira/exibenormativo?numero=520&tipo=Resolu%C3%A7%C3%A3o+BCB), [BCB Resolution 521](https://www.bcb.gov.br/estabilidadefinanceira/exibenormativo?numero=521&tipo=Resolu%C3%A7%C3%A3o+BCB) (10 November 2025; effective 2 February 2026) | Confirmed regulator evidence | Current authorisation and foreign-exchange perimeter | Not a legal opinion or approval of Hedgr, an asset, provider, or account claim |
| Gate matrix and recommendations | This report, applying the approved v0.3 frame to the evidence above | Founder/HedgrOps-oriented consultant interpretation | Option reduction, dispositions, architecture boundaries, and next questions | Non-authoritative; must be reviewed and recorded through the applicable governance surface |

### Evidence that remains missing

The following were not available within this authorised research and are decision-critical:

- named provider contracts, licences, audited controls, safeguarding structures, recovery plans, insolvency analysis, and service commitments;
- qualified legal analysis for one exact market, asset, custody, conversion, and user-entitlement structure;
- executable local conversion quotes, counterparty limits, order depth, settlement performance, stressed liquidity, and fallback capacity;
- field-level agent cash/float evidence for relevant locations and times;
- end-to-end transaction and reconciliation samples across every truth domain;
- tested incident, rollback, dispute, migration, and orderly-wind-down evidence; and
- user research showing that the proposed status language is understood without being interpreted as a guarantee.

These gaps explain the zero-shortlist result. They do not authorise provider outreach or operational testing.

---

## 21. Final disposition register

| Subject | Disposition | Reason |
| --- | --- | --- |
| Stability-first invariants and truth boundaries | **Retain** | They correctly prevent network or provider evidence from becoming a safety or withdrawal claim |
| “Design for controlled replaceability; implement one governed value path at a time” | **Retain** | Supported across all three market cases and both network comparisons |
| “Multi-network by destination” | **Revise** | Make it conditional admission capability, not an assumed future deployment state |
| Regulated account-ledger control | **Retest** | Distinctly tests whether public-chain settlement is needed; complete path is not evidenced |
| Stellar/native USDC single path | **Retest** | Narrowest in-scope public-chain comparator; complete path is not evidenced |
| Polygon/native USDC single path | **Defer** | No unique starting requirement yet offsets duplicated diligence and additional operational surface |
| Polygon Open Money Stack | **Defer** | Specific provider-led product; public scope is early/forward-looking and local paths are unproven |
| Bridge-dependent balances and automatic routing | **Remove** from starting path | Structural conflict with preservation, exit, explicit risk, and authoritative account truth |
| CCTP and other cross-network migration | **Defer** | Asset portability does not equal complete-path replaceability |
| Yield and protocol allocation | **Remove** from starting path; **defer** generally | Preservation and exit must stand independently |
| Additional public-network survey | **Remove** from this report | No new material hypothesis; would expand rather than narrow the option space |
| Network, asset, provider, custody, market, or production selection | **Defer** | Critical evidence and authority are absent |

### Closure statement

Delivery of this draft satisfies the consultant's report-production task. `MONEY-STACK-001` closes only after Founder and HedgrOps review the report and record a disposition of retain, revise, remove, retest, defer, or escalate. No conclusion, retained configuration, or favourable component evidence creates an automatic follow-on activity.

Review evidence is evidence, not direction.
