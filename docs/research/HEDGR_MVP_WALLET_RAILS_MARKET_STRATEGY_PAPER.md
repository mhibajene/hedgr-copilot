# Hedgr MVP Wallet/Auth, Rails & Candidate Market Decision-Support Research Artifact

**Status:** Canonical decision-support research artifact / non-authorizing
**Audience:** Hedgr Founder; HedgrOps — co-architect and governance custodian
**Prepared:** 2026-06-24
**Repo path:** `docs/research/HEDGR_MVP_WALLET_RAILS_MARKET_STRATEGY_PAPER.md`
**Governance framework:** `docs/ops/governance/offramp/HEDGR_OFFRAMP_GOVERNANCE_FRAMEWORK.md`
**Off-ramp companion artifact:** `docs/research/HEDGR_OFFRAMP_STRATEGY_AGENCY_AND_PAYOUT_INFRASTRUCTURE_RESEARCH.md`
**Promotion boundary:** Promoted only after the Off-Ramp Governance Framework was merged; supporting reference only, not governance authority.
**Source class:** Internal analysis, market scan, provider scan, and repo-governance synthesis
**Authority boundary:** This paper does not select a launch market, approve a wallet provider, approve a rail provider, authorize evidence intake, accept evidence, close blockers, authorize ADR drafting readiness, authorize implementation-preflight, activate Class B, authorize custody, activate rails, authorize stablecoin conversion, authorize deposits, authorize withdrawals, or authorize customer-money movement.

---

## 1. Executive decision frame

This artifact treats wallet/auth, rails, and candidate-market selection as a **Class B evidence-intake problem**, not as an implementation decision.

The current repo posture is clean but blocked: Hedgr has doctrine, governance scaffolding, Class B evidence-package shells, and non-authorizing review artifacts. It does **not** yet have gathered, reviewed, accepted, or sufficient evidence for custody, rails, legal/compliance, jurisdiction selection, KYC/AML responsibility, settlement/finality, stablecoin conversion, fee/FX/spread, liquidity/withdrawals, reconciliation, support/dispute, incident response, audit/retention, or Trust UX approval.

That means the founder decision is not:

> “Which country do we launch in?”

The founder decision is:

> “Which markets and providers, if any, could governance authorize for structured evidence intake so that a later ADR and implementation-preflight decision is actually possible?”

### Candidate evidence-intake hypothesis

A future governance review could consider whether to authorize a bounded **Market + Provider Candidate Evidence Intake** track covering these research hypotheses:

1. **Wallet/Auth:** Privy as an embedded wallet/auth candidate, scoped to self-custodial user wallets and no-money UX until evidence review.
2. **Rail discovery:** Onramper as a rail-discovery and on/off-ramp aggregation candidate, but not as Hedgr’s settlement rail or provider-of-record.
3. **Direct off-ramp:** Transak as a direct off-ramp candidate for cash-out evidence intake where bank/card payout, embedded sell flow, compliance controls, and provider-owned KYC/risk workflows require review.
4. **Card payout benchmarks:** MoonPay and Ramp Network as consumer/card-payout benchmark candidates, not assumed local-rail providers unless country-specific payout evidence confirms fit.
5. **Africa rails:** Yellow Card as an Africa-focused fiat/stablecoin infrastructure candidate where local currency, mobile money, and stablecoin payment workflows require review.
6. **Future rails:** Stripe/Bridge as a future infrastructure candidate for card, merchant, stablecoin acceptance, treasury, or global payout infrastructure where entity structure and product availability fit.
7. **Candidate markets:** five markets that warrant evidence-framed review across Africa, LatAm, and Asia:
   - Philippines
   - Kenya
   - Brazil
   - South Africa
   - Argentina

Cash-out warrants treatment as a **first-class evidence domain**, not a sub-point under rails. Hedgr’s MVP utility depends on whether users can safely, clearly, and reliably exit into local value without Hedgr making false custody, liquidity, finality, or withdrawal promises.

Zambia appears suitable for a **home-market research, regulatory-learning, and future sandbox/watchlist track**, not customer-money rollout approval. Founder proximity is useful for insight and relationships; it does not resolve regulatory friction, uncertain stablecoin perimeter, rail readiness, or customer-money authority gaps.

---

## 2. Current Hedgr MVP posture

### 2.1 Product doctrine

Hedgr is a stability-first wallet and financial stability operating system for users in volatile economies. The canonical product thesis prioritizes capital preservation, liquidity integrity, stability before speculation, visible risk posture, no gamified yield loops, and governance-first policy/trust controls.

The MVP validates, in order:

1. stability and liquidity posture;
2. integrity of rails and trust;
3. conservative yield routing only when approved;
4. advisory Copilot, without execution authority.

The target users remain:

- freelancers receiving international payments;
- SME owners managing treasury balances;
- mobile-first savers in volatile economies.

### 2.2 Execution posture

Hedgr’s repo currently distinguishes execution classes:

| Class | Meaning | Current implication for this paper |
|---|---|---|
| Class A | Informational only: education, disclosure, simulation, trust copy, no fund movement | Current safe lane for prototype UX, market research, and evidence records |
| Class B | Manual / limited execution: human-in-the-loop, capped, explicit controls | Future lane only; evidence and ADR gates are unresolved |
| Class C | Automated execution: programmatic movement or commitment of funds | Out of scope for current MVP strategy |

Recent repo review posture remains Class A / informational for merged work. Class B evidence packages exist as scaffolding, but evidence is still question-framed and missing.

### 2.3 Class B blocker reality

The market and provider strategy must preserve the following current-state facts:

- The evidence registry is a tracking artifact, not evidence acceptance.
- Every evidence package remains `Question framed / Missing`.
- Evidence state is not approval.
- Even `Evidence received` or `Accepted for planning` would not authorize implementation or customer-money movement.
- Custody model remains unresolved.
- Rail/vendor permission remains unresolved.
- Provider responsibility remains unresolved.
- Settlement/finality remains unresolved.
- Stablecoin/conversion evidence remains unresolved.
- Fee/FX/spread evidence remains unresolved.
- Liquidity/withdrawal control evidence remains unresolved.
- Pilot operations, reconciliation, support/dispute, incident response, audit/retention, and Trust UX evidence remain unresolved.
- No Class B ADRs are accepted.
- No implementation-specific `§7a` brief exists.

This paper therefore frames **candidate evidence questions**, not market activation.

---

## 3. Strategic objective

The objective for the next Hedgr decision cycle is to reduce ambiguity across three linked domains:

1. **Wallet/Auth:** Can Hedgr offer a simple, mobile-first wallet experience without becoming custodian, key controller, or transaction executor?
2. **Rails:** Can Hedgr let users discover, initiate, and track stablecoin-enabled fiat workflows without claiming settlement truth, custody, KYC/AML responsibility, finality, or withdrawal certainty?
3. **Markets:** Which jurisdictions have enough demand, regulatory openness, provider availability, and competitive white space to justify evidence intake and later ADR review?

The goal is not to pick the sexiest market. The goal is to identify markets where Hedgr can credibly build the **evidence needed to make a governed decision**.

---

## 4. Candidate wallet/auth research posture

### 4.1 Candidate assessment: Privy

Privy appears suitable for evaluation as a wallet/auth candidate for Hedgr MVP evidence intake.

Observed strengths:

- authentication;
- embedded wallet onboarding;
- external wallet connection;
- wallet-linked identity;
- no-money wallet UX;
- later transaction initiation only if separately authorized.

Evidence gaps:

- custody mode evidence;
- key-control evidence;
- transaction authority boundary evidence;
- provider permission for Hedgr’s intended use case;
- Trust UX implications.

### 4.2 Required boundary

The initial Privy posture would need to remain:

> Hedgr may evaluate Privy for self-custodial embedded user wallets and wallet-auth UX. Hedgr must not activate server-controlled wallets, delegated signing, app-managed wallet fleets, custodial wallets, treasury wallets, or customer-asset movement unless separately evidenced, reviewed, ADR-approved, and authorized by `HEDGR_STATUS.md §7 / §7a`.

### 4.3 Why this matters

Privy supports both user-controlled embedded wallets and server-controlled wallet patterns. That flexibility is good technically but dangerous governance-wise. If Hedgr configures or describes the wallet model badly, it can drift from “wallet UX provider” into “asset-control system.”

For MVP research, the lower-authority candidate posture is:

- user-controlled embedded wallet;
- explicit user ownership / export path where available;
- no Hedgr unilateral transaction authority;
- no server-side signing;
- no app-controlled customer wallet fleet;
- no “Hedgr holds funds” language;
- no “Hedgr balance” language unless separately approved through custody, accounting, ledger, and reconciliation evidence.

### 4.4 Privy evidence to collect

Potential future evidence artifact if separately authorized:

```text
docs/ops/governance/class-b/evidence/providers/PRIVY_WALLET_AUTH_CANDIDATE_RECORD.md
```

Required evidence fields:

- wallet custody mode;
- key creation and storage model;
- key export and recovery model;
- whether Privy, Hedgr, or user can access private keys;
- server-side signing availability and how Hedgr disables it;
- transaction policy controls;
- supported chains;
- supported assets;
- audit/security certifications;
- privacy/data-processing posture;
- incident support route;
- pricing/rate limits;
- terms of service;
- explicit provider confirmation that Hedgr’s intended use case is permitted;
- Trust UX implications.

---

## 5. Candidate rails research posture

### 5.1 Onramper: rail discovery, not settlement truth

Onramper can be assessed as a useful aggregation and discovery layer, not the core Hedgr rail.

Candidate assessment:

- country-level on/off-ramp discovery;
- fiat/stablecoin quote discovery;
- payment-method availability;
- widget/API experimentation;
- provider comparison;
- no-money quote/status simulation;
- webhook-status research;
- market-by-market off-ramp discovery before Hedgr commits to any direct rail.

Evidence gaps / prohibited assumptions:

- provider-of-record;
- custody provider;
- KYC/AML owner;
- sanctions/PEP owner;
- settlement authority;
- refund/dispute owner;
- customer-support owner;
- finality truth source.

Onramper’s own terms frame it as technical infrastructure connecting users to third-party fiat gateways. That is a useful MVP discovery surface, but it does not solve Hedgr’s responsibility boundary. The actual gateway/provider behind a transaction matters more than the aggregator.

**Candidate research utility:** useful for discovery; not evidence of operating authority. Onramper can help identify what may be available in a market; it cannot by itself tell Hedgr who owns KYC, custody, failure handling, settlement truth, or customer complaints.

### 5.2 Transak: direct off-ramp candidate

Transak appears suitable for evaluation as a direct off-ramp candidate for Hedgr evidence intake.

Observed strengths:

- embedded crypto-to-fiat sell flow;
- direct off-ramp evidence candidate;
- bank/card payout evidence;
- KYC/AML/risk-control evidence;
- quote, fee, limit, settlement, and support evidence;
- possible dedicated off-ramp address / stream-style flow research where applicable.

Evidence rationale:

- Transak appears closer to a direct off-ramp evidence candidate than Onramper because it can support embedded off-ramp flows rather than only aggregate other gateways.
- It is more relevant than a pure card payout benchmark because its off-ramp product is designed for partner applications.
- It still requires country, fiat, stablecoin, chain, payout-method, and use-case permission evidence before Hedgr can rely on it.

Risks / evidence burden:

- country support does not equal payout-method support;
- payout timing may vary by bank, card, region, KYC level, and risk review;
- dedicated off-ramp addresses introduce wrong-chain, wrong-address, expired-quote, delayed-receipt, and reconciliation risks;
- Hedgr must not send crypto on behalf of the user unless wallet, signing, custody, and authorization boundaries are separately approved;
- Transak documentation is not provider permission for Hedgr’s exact freelancer/SME stability-wallet use case.

**Candidate research utility:** relevant as a direct cash-out evidence candidate, especially for bank/card markets. Fit remains uncertain for mobile-money-native markets unless country-specific payout evidence confirms local methods.

### 5.3 MoonPay: consumer/card payout benchmark candidate, not assumed local rail

MoonPay could be evaluated as a consumer-friendly on/off-ramp and card/bank payout benchmark.

Candidate assessment:

- card payout benchmark;
- consumer on/off-ramp UX comparison;
- sell-currency coverage check;
- quote, fee, limit, and support comparison;
- useful evidence target for Brazil, Kenya, and South Africa where sell-currency support appears more relevant.

Evidence gaps / prohibited assumptions:

- Philippines cash-out unless PHP/local payout evidence is confirmed;
- Argentina cash-out unless ARS/local payout evidence is confirmed;
- Zambia cash-out unless ZMW/mobile-money evidence is confirmed;
- M-Pesa, GCash, Maya, MTN, Airtel, Zamtel, or other mobile-money style exits without direct confirmation.

**Candidate research utility:** relevant where card/bank payout may solve the user problem; weaker where the actual user need is local wallet/mobile-money cash-out.

### 5.4 Ramp Network: card payout and compliance benchmark

Ramp Network could be evaluated as a card-payout and self-custodial-wallet ramp benchmark.

Candidate assessment:

- sell-to-card payout benchmark;
- self-custodial wallet compatibility research;
- Europe/UK/Brazil-style payout comparison;
- quote, limit, fee, and settlement comparison;
- useful fallback where local mobile-money rails are not essential.

Limitations:

- Visa/Mastercard payout is not the same as Pix, M-Pesa, GCash, Maya, MTN, Airtel, Zamtel, or local bank payout;
- card payout may be less useful for freelancers/SMEs in mobile-money-first contexts;
- regional availability, KYC, limits, and supported assets must be evidenced per market.

**Candidate research utility:** useful benchmark; not sufficient as Hedgr’s Africa or mobile-money cash-out answer without additional evidence.

### 5.5 Yellow Card: Africa-focused provider-of-record candidate

Yellow Card warrants separate evaluation from Onramper, Transak, MoonPay, and Ramp because its product surface appears closer to Africa rail, stablecoin, and fiat-settlement evidence questions.

Candidate assessment:

- Africa stablecoin/fiat infrastructure candidate;
- local-currency settlement candidate;
- mobile-money and bank-transfer workflow evidence;
- cross-border payout evidence;
- provider-of-record evaluation;
- KYC/KYB/AML/sanctions responsibility evidence;
- local liquidity/fee/spread evidence;
- support and reconciliation evidence.

Yellow Card is not “approved” for Hedgr. It is a candidate that warrants evidence intake because its product surface appears to map to Hedgr’s emerging-market payment and treasury research questions.

**Candidate research utility:** relevant for Kenya, Zambia watchlist, South Africa benchmarking, and broader Africa stablecoin/local-fiat workflow questions.

### 5.6 Stripe/Bridge: future infrastructure watchlist

Stripe/Bridge remains a future infrastructure candidate in this artifact, not an immediate Hedgr execution dependency.

Candidate assessment:

- future stablecoin payments;
- merchant stablecoin acceptance;
- global card/payment workflows;
- treasury/stablecoin storage where supported;
- possible later B2B/SME infrastructure path.

Risk:

- product availability, entity eligibility, jurisdiction support, connected-account constraints, and transaction limits may not fit Hedgr’s emerging-market MVP wedge.
- Stripe/Bridge may warrant later review but can distort evidence posture if treated as an assumed stack before entity, jurisdiction, and product-availability questions are reviewed.

**Candidate research utility:** potentially relevant later; not evidence of a near-term cash-out unlock.

### 5.7 Provider comparison matrix for Hedgr utility

| Provider | Candidate research use | Observed contexts | Evidence gaps | Candidate posture |
|---|---|---|---|---|
| Onramper | Discovery, routing, quote/status comparison | Broad market scan across Philippines, Kenya, Brazil, South Africa, Argentina, Zambia watchlist | Not provider-of-record; gateway owns actual transaction | Evidence discovery only; not settlement authority |
| Transak | Direct embedded off-ramp review | Bank/card cash-out markets; possible Brazil/South Africa/Philippines/Kenya evidence target depending payout support | Country support is not local payout-method support; dedicated address/finality risks | Candidate record only if separately authorized |
| MoonPay | Consumer card/bank payout benchmark | Brazil, Kenya, South Africa where sell-currency support is visible | Weak for PHP/ARS/ZMW unless confirmed; not mobile-money proof | Benchmark candidate |
| Ramp Network | Sell-to-card and self-custodial ramp benchmark | Card-payout markets; Brazil-style benchmark; later developed-market corridors | Not enough for M-Pesa/GCash/MTN-style cash-out | Benchmark candidate |
| Yellow Card | Africa local fiat/stablecoin rails review | Kenya, Zambia watchlist, South Africa, broader Africa | Requires provider permission, licensing, support, finality evidence | Africa rail/cash-out candidate |
| Stripe/Bridge | Future treasury/global payout infrastructure review | Later B2B, merchant, treasury, global stablecoin acceptance | Availability/entity constraints; may be overbuilt first | Future watchlist candidate |

### 5.8 Local licensed providers remain mandatory

No single global rail will carry Hedgr safely across Africa, LatAm, and Asia.

For each candidate market, Hedgr must identify:

- provider-of-record;
- KYC/KYB owner;
- sanctions/PEP owner;
- custody owner;
- stablecoin conversion owner;
- fiat payout owner;
- support escalation route;
- reconciliation source of truth;
- fee/FX/spread source;
- customer complaint/dispute route;
- environment boundary: sandbox, internal test, pilot, live, production.

---

## 6. Cash-out flow analysis

Cash-out is treated in this artifact as a first-class research hypothesis and evidence domain. Detailed off-ramp treatment is maintained in `docs/research/HEDGR_OFFRAMP_STRATEGY_AGENCY_AND_PAYOUT_INFRASTRUCTURE_RESEARCH.md` under the framework boundary established by `docs/ops/governance/offramp/HEDGR_OFFRAMP_GOVERNANCE_FRAMEWORK.md`.

For Hedgr, cash-out is where the Stability Wallet promise becomes real. Depositing into stable assets proves interest; exiting into local value proves utility. A beautiful dashboard with weak withdrawal truth is not a stability wallet. It is theatre with charts.

### 6.1 Candidate cash-out flow hypothesis

The lower-authority candidate flow for future review is:

```text
User stablecoin position
→ provider quote
→ user confirms sell / withdrawal
→ provider performs KYC / risk / sanctions checks
→ user authorizes crypto transfer to provider-controlled address
→ provider confirms crypto receipt
→ provider initiates fiat payout
→ local bank / card / mobile-money / wallet rail settles
→ Hedgr displays non-final status based on provider + chain + rail records
```

This artifact does not describe this as:

```text
Withdraw instantly
Withdraw anytime
Hedgr balance
Hedgr settlement
Guaranteed payout
Funds available
Final cash-out
```

Candidate low-authority language:

```text
Request withdrawal
Estimated payout
Provider reviewing
Payout initiated
Payout pending
Completed by provider
Failed / action required
Exception under review
```

### 6.2 Cash-out source-of-truth rule

Hedgr’s app record is not settlement truth.

Cash-out truth requires evidence in this order:

1. provider transaction record;
2. onchain transaction record;
3. local fiat rail / bank / mobile-money confirmation;
4. Hedgr application event log;
5. support note.

This source-of-truth hierarchy could inform future settlement/finality, reconciliation, support/dispute, audit/retention, Trust UX, and ADR evidence records if separately authorized.

### 6.3 Candidate-country cash-out matrix

| Market | Candidate cash-out hypothesis | Candidate evidence sources | Open evidence questions | Evidence posture |
|---|---|---|---|---|
| Philippines | Stablecoin to PHP to GCash / Maya / bank / QR PH | Onramper discovery; Transak/TransFi/Banxa/local VASP evidence; local BSP VASP partner | Provider-of-record, payout method, KYC/KYB, fees, failed payout, and permitted wording | Question framed / Missing |
| Kenya | Stablecoin to KES to M-Pesa / bank / tKash / MoMo | Yellow Card; Onramper discovery; Transak if KES/local payout confirmed; Kotani/Fonbnk/TransFi watch | Mobile-money payout, business wallet support, provider responsibility, VASP obligations, status wording | Question framed / Missing |
| Brazil | Stablecoin to BRL to Pix / bank / card / PicPay | Onramper discovery; Transak; MoonPay; Ramp; local VASP/payment partner | Pix/bank payout, FX classification, local provider responsibility, quote/spread/finality rules | Question framed / Missing |
| South Africa | Stablecoin to ZAR to bank transfer / card | Yellow Card; local CASP; Onramper; MoonPay; Transak/Ramp if confirmed | CASP permissions, bank/card finality, provider support, complaint handling | Question framed / Missing |
| Argentina | Stablecoin to ARS or local value to bank / local payment method / approved provider | Onramper discovery; Koywe/TransFi/Banxa/local PSAV provider; Transak if confirmed | Registered provider coverage, FX/spread disclosure, failed transaction handling, prohibited claims | Question framed / Missing |
| Zambia watchlist | Stablecoin to ZMW to MTN / Airtel / Zamtel / bank / mobile money | Yellow Card; Onramper discovery; Flutterwave/mobile-money evidence; TransFi/Fonbnk/Guardarian/Banxa watch | Stablecoin perimeter, provider coverage, mobile-money payout, sandbox path, safe user claims | Question framed / Missing |

### 6.4 Philippines cash-out interpretation

The Philippines cash-out target is:

```text
Stablecoin → PHP → GCash / Maya / bank account / QR PH / local bank transfer
```

The strategic attraction is not just crypto adoption. It is that users already understand mobile-wallet and remittance-adjacent behaviour. That gives Hedgr a realistic way to test stability-wallet comprehension, provider-led conversion language, and withdrawal-readiness UX.

Candidate evidence posture:

- Onramper for discovery and provider comparison;
- Transak / TransFi / Banxa / local BSP VASP providers as direct evidence targets;
- MoonPay and Ramp only as secondary benchmarks unless PHP/local payout is confirmed;
- no claim that Hedgr itself provides cash-out, settlement, or withdrawal certainty.

Key evidence questions:

- Which provider supports PHP cash-out?
- Which payout methods are live: GCash, Maya, bank, QR PH?
- Who owns KYC/KYB and sanctions screening?
- Are freelancers/SMEs eligible?
- What fees, spreads, quote-expiry rules, and failed-payout rules apply?
- What customer-facing wording is allowed?

### 6.5 Kenya cash-out interpretation

The Kenya cash-out target is:

```text
Stablecoin → KES → M-Pesa / bank / MoMo / tKash
```

Kenya presents a concrete **utility proof** hypothesis because the user need is concrete: preserve value, then exit into local liquidity without confusing the user about custody or finality.

Candidate evidence posture:

- Yellow Card as an Africa cash-out candidate;
- Onramper for discovery and provider comparison;
- Transak as a direct candidate only if KES/mobile-money payout evidence confirms fit;
- MoonPay as sell-currency/card benchmark, not M-Pesa proof;
- Ramp as card payout benchmark, not mobile-money proof.

Key evidence questions:

- Can cash-out go directly to M-Pesa?
- Can cash-out go to business mobile-money wallets?
- Which provider owns KYC/KYB, AML, sanctions, and transaction monitoring?
- What are mobile-money limits and failed-payout rules?
- Can Hedgr operate as UX/orchestration only?
- What local VASP obligations may attach to Hedgr’s exact role?

### 6.6 Brazil cash-out interpretation

The Brazil cash-out target is:

```text
Stablecoin → BRL → Pix / bank / card / PicPay
```

Brazil appears useful as an infrastructure benchmark because Pix makes local fiat exit legible. The trade-off is competition and regulatory complexity.

Candidate evidence posture:

- Onramper for discovery and quote comparison;
- Transak as a direct off-ramp candidate if BRL/Pix or bank payout evidence checks out;
- MoonPay and Ramp as card/bank payout benchmarks;
- local VASP/payment partner evidence before any implementation planning.

Key evidence questions:

- Which provider supports BRL cash-out to Pix?
- Does the flow trigger FX, payment, or VASP obligations?
- Who owns Brazilian regulatory responsibility?
- Are freelancers/SMEs eligible?
- What is the final amount logic: quote, spread, expiry, slippage, refund?
- What status labels are safe?

### 6.7 South Africa cash-out interpretation

The South Africa cash-out target is:

```text
Stablecoin → ZAR → bank transfer / card payout
```

South Africa is useful as a compliance benchmark and provider-boundary test. It may not be the highest-pain wedge, but it can help Hedgr learn what governance-grade CASP markets expect.

Candidate evidence posture:

- local CASP or licensed partner as serious route;
- Yellow Card as Africa infrastructure candidate;
- Onramper for discovery;
- MoonPay / Transak / Ramp only where ZAR payout evidence confirms fit.

Key evidence questions:

- Does the partner have relevant CASP permissions?
- Would Hedgr’s UX/orchestration role require licensing?
- Can cash-out go to South African bank accounts?
- Who owns complaint handling?
- What does finality mean for ZAR bank transfer or card payout?

### 6.8 Argentina cash-out interpretation

The Argentina cash-out target is:

```text
Stablecoin → ARS / USD-equivalent local value → bank / local payment method / approved provider payout
```

Argentina has strong user pain but a heavier evidence burden. The problem is obvious; the safe operating model is not.

Candidate evidence posture:

- Onramper as a discovery layer;
- Koywe / TransFi / Banxa / local PSAV provider as direct evidence targets;
- MoonPay and Ramp only where ARS/local payout is confirmed;
- local legal/compliance review before any implementation-preflight.

Key evidence questions:

- Can users cash out to ARS through a registered provider?
- Which provider is registered locally?
- How are FX spreads and quote expiry disclosed?
- How are failed transactions handled?
- Can Hedgr avoid deposit, savings, dollar-account, investment, and guaranteed-redemption language?

### 6.9 Zambia cash-out watchlist

The Zambia cash-out target is:

```text
Stablecoin → ZMW → MTN / Airtel / Zamtel / bank / mobile money
```

Zambia is strategically important but remains a watchlist/research hypothesis in this artifact. The cash-out rails may be more promising than the legal perimeter, which is exactly why Hedgr must not confuse rail possibility with launch readiness.

Candidate evidence posture:

- Yellow Card as an Africa candidate if Zambia coverage and permissions are confirmed;
- Onramper for discovery only;
- Flutterwave/mobile-money evidence for local ZMW/mobile-money rail mapping;
- TransFi / Fonbnk / Guardarian / Banxa as possible evidence targets;
- no customer-money activity without legal/compliance review and provider-of-record evidence.

Key evidence questions:

- Can cash-out go to MTN, Airtel, or Zamtel mobile money?
- Who owns KYC/KYB?
- What is the Zambia stablecoin/legal perimeter?
- Can Hedgr operate under provider coverage?
- Is a sandbox or controlled research path feasible?
- What user claims are safe?

### 6.10 Cash-out evidence checklist

Each provider/market cash-out record would need to answer:

1. supported fiat currency;
2. supported payout methods;
3. supported stablecoins;
4. supported chains;
5. provider-of-record entity;
6. KYC/KYB owner;
7. sanctions/PEP owner;
8. quote source;
9. quote-expiry rule;
10. fee/FX/spread disclosure;
11. minimum/maximum withdrawal limits;
12. average payout time;
13. settlement/finality definition;
14. failed-payout handling;
15. refund handling;
16. wrong-chain/wrong-address handling;
17. support escalation route;
18. user complaint route;
19. reconciliation source of truth;
20. webhook/status taxonomy;
21. data retention boundary;
22. customer-facing copy limits;
23. confirmation that Hedgr’s use case is allowed;
24. confirmation that freelancers/SMEs are eligible;
25. jurisdiction-specific legal/compliance review requirement.

---

## 7. Market selection lens

Future governance review can evaluate markets through a practical operating lens, not just adoption heat. This lens is qualitative and does not score, rank, select, or approve markets.

### Selection criteria

| Criterion | Why it matters |
|---|---|
| Regulatory clarity / innovation openness | Hedgr needs permissioned evidence paths, not grey-zone heroics |
| Rail fit | Mobile money, bank transfer, instant payments, stablecoin liquidity, and provider availability matter |
| User pain and adoption demand | Currency instability, remittance cost, freelancer/SME need, and crypto/stablecoin familiarity drive pull |
| Governance fit | Provider-led, non-custodial/delegated-custody operation must be feasible without premature licensing burden |

### Operating principle

A market is attractive only if Hedgr can answer:

> “Who is the regulated provider, what service are they providing, what exactly does Hedgr do, what exactly does Hedgr not do, what are users told, and what evidence proves those boundaries?”

---

## 8. Candidate market research set

## 8.1 Summary table

| Market | Reason for inclusion | Candidate strengths | Candidate risks | Evidence priority |
|---|---|---|---|---|
| Philippines | Mobile-wallet behavior, remittance relevance, and licensed VASP ecosystem | Mobile-first cash-out hypothesis; freelancer/remittance-adjacent user behavior; local provider discovery potential | VASP perimeter, provider-of-record, KYC/KYB, and support/reconciliation boundaries unresolved | Question framed / Missing |
| Kenya | Mobile-money depth, fintech infrastructure, and emerging VASP law | Mobile-money cash-out hypothesis; cross-border and SME relevance; Africa rail-provider mapping potential | Licensing, stablecoin treatment, mobile-money limits, provider responsibility, and business eligibility unresolved | Question framed / Missing |
| Brazil | Large fintech market, Pix infrastructure, and active virtual-asset regulation | Local fiat-exit benchmark; LatAm regulatory and provider-boundary learning potential | Competition, FX classification, local partner/counsel needs, and disclosure obligations unresolved | Question framed / Missing |
| South Africa | CASP regulatory benchmark and visible licensed provider ecosystem | Compliance-grade provider-boundary and Trust UX evidence potential | User-pain wedge, competition, CASP permissions, and orchestration-role licensing unresolved | Question framed / Missing |
| Argentina | Severe currency volatility and stablecoin familiarity | Stable-value comprehension and local cash-out research potential | Operational volatility, registration/licensing, FX/spread disclosure, and prohibited claims unresolved | Question framed / Missing |
| Zambia | Home-market research, regulatory-learning, and future sandbox/watchlist relevance | Local context, relationship insight, and mobile-money mapping potential | Stablecoin perimeter, rail readiness, counsel needs, and customer-money authority gaps unresolved | Question framed / Missing |

---

## 8.2 Philippines

### Why it fits Hedgr

The Philippines warrants evidence review because it combines:

- high crypto adoption;
- large mobile-wallet behavior;
- active BSP VASP framework;
- known crypto wallet/exchange incumbents;
- remittance-heavy user behavior;
- strong freelancer and overseas-worker payment relevance.

The BSP maintains an active VASP list, including non-bank and bank VASPs. BSP Circular No. 1108 defines VASP activities broadly to include exchange between virtual assets, exchange between virtual assets and fiat, transfer of virtual assets, and safekeeping/admin/control over virtual assets. That matters because Hedgr must avoid accidentally performing VASP activities without licensed provider coverage.

### Candidate Hedgr fit

Philippines appears relevant for a **consumer discovery + partner-led route** hypothesis, but not as a “launch directly” conclusion.

Candidate evidence posture:

- evidence intake only;
- no direct custody;
- no direct fiat/crypto exchange;
- no mass-market retail launch;
- use licensed provider evidence;
- explore freelancer/remittance/stability wallet positioning;
- test Trust UX comprehension with no-money prototype.

### Potential competitors / substitutes

Representative competitor set:

- **GCash / Mynt** — dominant e-wallet and financial super-app context.
- **GCrypto** — crypto access inside e-wallet context, where available.
- **Coins.ph** — all-in-one crypto wallet/exchange with PHP cash-ins, bills, transfers, and KYC.
- **PDAX** — BSP-regulated digital asset exchange with crypto and tokenized asset positioning.
- **Maya** — financial app and wallet ecosystem, with crypto-adjacent user behavior.
- **GoTyme Bank / UnionBank** — bank VASP context on BSP list.
- **Binance / global exchanges** — user acquisition competitor, not necessarily compliant local partner.

### Strategic wedge

The candidate wedge hypothesis is:

> Stable-value workflow for freelancers and SMEs: balance visibility, stability posture, fee clarity, withdrawal readiness, and provider-led conversion.

### Evidence questions

- Which licensed provider can support wallet, cash-in, conversion, cash-out, KYC, support, and reconciliation?
- Can Hedgr operate only as an interface/referral/orchestration layer?
- Are freelancers/SMEs eligible?
- What wording can be used without implying custody or withdrawal certainty?
- Can users receive international value, preserve in stable digital assets, and cash out through local rails without Hedgr becoming provider-of-record?

---

## 8.3 Kenya

### Why it fits Hedgr

Kenya warrants evidence review because it has:

- a globally significant mobile-money culture;
- strong fintech infrastructure;
- a newly formalized VASP legal framework;
- emerging stablecoin regulatory treatment;
- local and pan-African rail candidates;
- strong fit for cross-border payments, freelancers, and SME workflows.

Kenya’s Virtual Asset Service Providers Act was published in October 2025, commenced in November 2025, and creates a legal framework to license and regulate VASPs. Kenya’s 2026 draft VASP regulations also contain detailed stablecoin reserve, custody, redemption, and disclosure requirements. This is friction, but it is useful friction: it gives Hedgr evidence questions rather than a blank map.

### Candidate Hedgr fit

Kenya appears relevant as an **Africa evidence-market candidate** for Hedgr’s MVP.

Candidate evidence posture:

- no direct VASP activity;
- provider-led rail model;
- evaluate Yellow Card, Kotani Pay, and other locally relevant providers;
- evidence mobile-money-to-stablecoin and stablecoin-to-mobile-money workflows;
- avoid stablecoin issuance;
- avoid custody;
- avoid yield;
- focus on freelancer/SME preservation and cross-border settlement clarity.

### Potential competitors / substitutes

Representative competitor set:

- **M-Pesa / Safaricom** — dominant mobile-money platform and user behavior baseline.
- **Yellow Card** — Africa stablecoin and fiat payments infrastructure.
- **Kotani Pay** — stablecoin/mobile-money on/off-ramp and USSD-oriented infrastructure.
- **Binance / global exchanges** — user acquisition and liquidity competitor.
- **Luno / VALR / regional CASP players** — potential expansion competitors.
- **AZA Finance / BitPesa-type B2B rails** — cross-border and treasury competition.
- **Chipper / Flutterwave / Onafriq-type fintech rails** — payments and payout alternatives.

### Strategic wedge

The Kenya wedge hypothesis is:

> Stablecoin-enabled freelancer/SME treasury workflow with mobile-money exit, transparent fees, and conservative stability UX.

### Evidence questions

- Which provider owns KYC/KYB?
- Which provider owns stablecoin conversion?
- Which provider owns fiat payout and settlement truth?
- What exact status labels are allowed?
- Can stablecoin-related services be offered without Hedgr being licensed locally?
- Does the provider support business/freelancer use cases, or only retail?
- Can a no-money pilot collect user comprehension evidence without triggering regulated activity?

---

## 8.4 Brazil

### Why it fits Hedgr

Brazil warrants LatAm evidence review because it combines:

- high crypto adoption;
- significant stablecoin usage;
- large fintech market;
- instant-payment infrastructure;
- active central-bank regulatory movement;
- major incumbents already integrating crypto/stablecoin products.

Brazil’s central bank released virtual-asset rules in November 2025 that extend AML/CTF rules and other obligations to VASPs, with regulations taking effect in February 2026. The rules also classify purchase, sale, exchange, international payment, or transfer of fiat-pegged virtual assets as foreign-exchange operations. This makes Brazil attractive but not casual.

### Candidate Hedgr fit

Brazil appears relevant as a **LatAm anchor evidence market**, but this artifact does not classify it as an MVP operating market because competition and compliance complexity are high.

Candidate evidence posture:

- evidence intake only;
- do not launch without local partner/counsel;
- evaluate whether Hedgr can operate as UX/orchestration rather than exchange/payment/FX provider;
- focus on B2B/freelancer treasury rather than retail crypto trading;
- consider Brazil as LatAm regulatory benchmark.

### Potential competitors / substitutes

Representative competitor set:

- **Mercado Pago / MercadoLibre** — launched Meli Dolar stablecoin access in Brazil, with Ripio operating exchange/market-making.
- **Mercado Bitcoin** — major Brazilian/LatAm exchange.
- **Nubank / Nucripto** — consumer fintech with crypto exposure.
- **Bitso** — regional crypto exchange.
- **Ripio** — crypto/stablecoin exchange and infrastructure.
- **Binance** — global exchange competitor.
- **PicPay and other fintech wallets** — local fintech competition.

### Strategic wedge

Brazil’s wedge is not “better crypto access.” Incumbents are too strong.

Hedgr’s wedge would be:

> Stability-operating layer for freelancers/SMEs who want transparent USD-stable exposure, liquidity posture, and payment/withdrawal readiness without trading complexity.

### Evidence questions

- Does the product trigger FX-provider obligations?
- Can Hedgr operate via licensed local VASP/payment partner?
- Are foreign stablecoins treated as FX for the intended flow?
- How are fees, spreads, settlement, and customer disclosures regulated?
- Is the effort worth it before Hedgr has proof from a less competitive market?

---

## 8.5 South Africa

### Why it fits Hedgr

South Africa is a mature African regulatory benchmark among the candidate market set.

The FSCA has confirmed that it approved 75 institutions to be licensed as crypto asset service providers. Reuters also reported South African bank/crypto integration activity, including Discovery Bank’s partnership with Luno, and South Africa has visible licensed exchange players such as VALR and Luno.

This is not necessarily the highest pain market, but it is useful for compliance benchmarking and provider validation.

### Hedgr fit

South Africa could be evaluated as:

- compliance benchmark;
- provider due diligence market;
- potential B2B/SME treasury research market;
- evidence source for CASP licensing and custody/rail expectations.

It may carry a different evidence profile than Kenya because South Africa has stronger existing financial infrastructure and heavier competition.

### Potential competitors / substitutes

Representative competitor set:

- **Luno** — major crypto exchange and banking-app partner.
- **VALR** — large South African exchange with retail and institutional users.
- **AltCoinTrader** — local crypto exchange.
- **OVEX** — crypto/OTC and institutional-facing player.
- **Yellow Card** — Africa stablecoin infrastructure with South Africa relevance.
- **Discovery Bank / Luno integration** — bank-app crypto access competitor.
- **Binance** — global exchange competitor.
- **Stitch / Ozow / PayShap ecosystem** — fiat payment and open-banking infrastructure substitutes.

### Strategic wedge

South Africa’s candidate wedge hypothesis is less consumer pain and more institutional credibility:

> South Africa may help future governance review validate compliance-grade custody, provider-boundary, support, reconciliation, and Trust UX expectations before any broader market conclusion is drawn.

### Evidence questions

- What CASP permissions would a partner need for Hedgr’s exact flow?
- Would Hedgr’s UX/orchestration role itself require licensing?
- Which providers can support SMEs/freelancers rather than retail trading?
- Can Hedgr use South Africa as a compliance reference while piloting user research elsewhere?

---

## 8.6 Argentina

### Why it fits Hedgr

Argentina is highly relevant because the user pain is severe and stablecoin behavior is culturally legible. Users have a strong reason to preserve value outside local currency volatility.

Argentina’s CNV now operates a PSAV registration path, with registration/cancellation requests submitted through the TAD platform from May 2025 under Resolution General No. 1058. Reuters also reported Buenbit’s acquisition by Nexo, noting that Buenbit is registered with Argentina’s securities regulator and that Argentines have turned to digital currencies as a hedge against high inflation.

### Hedgr fit

Argentina appears relevant as a **pain-rich LatAm research hypothesis**, but operational volatility and competition are high.

Candidate evidence posture:

- evidence intake only;
- local legal/compliance review required;
- no yield or savings-account language;
- avoid implying dollar account, deposit, bank, or guaranteed redemption;
- test stability-wallet messaging against local crypto/stablecoin behavior;
- use partner-led rails only.

### Potential competitors / substitutes

Representative competitor set:

- **Buenbit / Nexo** — local exchange acquired by global crypto firm.
- **Lemon** — popular crypto card/wallet product.
- **Belo** — crypto/stablecoin wallet/payments app.
- **Ripio** — regional crypto exchange/wallet.
- **Binance** — global exchange and P2P competitor.
- **Mercado Pago** — broader wallet/fintech substitute.
- **Bitso** — regional crypto exchange.

### Strategic wedge

Argentina’s candidate wedge hypothesis is clearest at the customer-problem level:

> Preserve value, understand stable exposure, and manage withdrawal readiness without turning the product into a trading app.

### Evidence questions

- What PSAV registration/licensing responsibilities apply to Hedgr vs provider?
- Are freelancers/SMEs eligible under provider terms?
- Which stablecoins and chains are supported in a compliant way?
- How do local users interpret “stability,” “dollar,” “wallet,” and “withdrawal” language?
- Can Hedgr avoid deposit-taking, investment, savings, and guaranteed redemption claims?

---

## 9. Zambia: candidate future market requiring additional evidence

Zambia requires disciplined treatment as a candidate future market requiring additional evidence.

Founder proximity creates a real advantage:

- local context;
- trust networks;
- cultural understanding;
- user pain awareness;
- potential regulator and ecosystem access;
- long-term mission fit.

Home advantage does not resolve the evidence gaps required before any customer-money rollout question.

### Positive signals

Zambia’s open-finance posture is moving in a constructive direction. The Bank of Zambia’s open-finance position paper describes policy readiness, the National Payment Systems Vision and Strategy 2023–2027, a planned open-finance regulatory framework by 2027, and the “Go Cashless” campaign supporting digital financial services.

The SEC has also had a regulatory sandbox framework for capital markets innovation.

### Friction points

For Hedgr specifically, open finance is not the same as permission for stablecoin custody, conversion, payments, or customer-money movement.

Key issues:

- stablecoin perimeter remains unclear;
- crypto/payment posture needs counsel;
- mobile-money rail partnerships require provider-level confirmation;
- data localisation and consent rules matter;
- customer-money language must be extremely conservative;
- sandbox availability does not equal product approval;
- the founder’s home-market bias could pull Hedgr into a slow approval lane before MVP evidence is mature.

### Candidate Zambia posture

Potential future evidence artifact if separately authorized:

```text
MARKET-WATCH-B-001 — Zambia Home-Market Research & Regulatory Evidence Track
```

Allowed:

- user discovery;
- regulatory landscape memo;
- provider mapping;
- mobile-money rail mapping;
- open-finance/source-pointer collection;
- counsel question pack;
- sandbox feasibility research;
- Trust UX comprehension research.

Not allowed:

- market selection;
- launch decision;
- customer onboarding;
- custody;
- deposits;
- withdrawals;
- stablecoin conversion;
- live rail testing;
- customer-money activity.

### Strategic view

Zambia appears to be a **longer-road, high-mission-fit market hypothesis**, not evidence of rollout readiness.

Future governance review may keep Zambia close as a research track without treating home-market proximity as market approval.

---

## 10. Near-miss and watchlist markets

### Nigeria

Nigeria is too important to ignore but too sensitive to treat casually.

It has enormous stablecoin demand, cross-border transfer use, and currency-pressure pain. Reuters reported, citing the IMF, that Nigerians increasingly use dollar-pegged stablecoins for cross-border transfers and that Nigeria accounted for a large share of stablecoin inflows in sub-Saharan Africa.

Why this remains watchlist-only:

- high regulatory and political sensitivity around currency substitution;
- central-bank and securities-regulator perimeter risk;
- high fraud/AML concern;
- large incumbents and global exchange activity;
- customer-money posture would require very strong local partner evidence.

Candidate evidence posture:

```text
MARKET-WATCH-B-002 — Nigeria High-Demand / High-Risk Stablecoin Market Watch
```

### Mexico

Mexico is attractive because of remittances and proximity to U.S. dollar flows, but the stablecoin perimeter is less clean.

Cryptoassets are not generally prohibited, but Mexico’s regulatory framework is fragmented, and fiat-backed stablecoins can sit in a complex position depending on whether a product is treated as virtual asset activity, payment funds, banking funding, or money transmission.

Candidate evidence posture:

```text
MARKET-WATCH-B-003 — Mexico Remittance Corridor Regulatory Watch
```

### India, Pakistan, Vietnam, Indonesia

These markets appear frequently in global crypto adoption analysis, but market-fit evidence requires more than adoption signals.

Reasons to defer:

- larger regulatory complexity;
- language/localization;
- market-entry difficulty;
- domestic incumbent density;
- uncertain suitability for near-term provider-led Hedgr MVP.

Candidate evidence posture:

```text
MARKET-WATCH-B-004 — High-Adoption Asia Market Watch
```

### Singapore and UAE

These are useful regulatory, partnership, and entity-structuring hubs, but they are not Hedgr’s core user-problem markets in this artifact.

Candidate evidence posture:

```text
MARKET-INFRA-B-001 — Singapore / UAE Regulatory and Provider Hub Watch
```

---

## 11. Competitive landscape by category

Future market review does not need to consider only “crypto competitors.” In each market, the real competitor set has four layers.

### 11.1 Crypto exchanges and wallets

Examples:

- Coins.ph
- PDAX
- Luno
- VALR
- Mercado Bitcoin
- Ripio
- Buenbit
- Lemon
- Belo
- Binance
- Bitso

Threat:

- already own crypto liquidity and mindshare;
- can price aggressively;
- may already hold local licenses.

Hedgr response:

- do not compete as exchange;
- compete on stability posture, Trust UX, withdrawal readiness, and freelancer/SME workflow.

### 11.2 E-wallets and mobile-money incumbents

Examples:

- GCash
- Maya
- M-Pesa
- Mercado Pago
- Nubank
- local banks and digital wallets.

Threat:

- already own user trust, KYC, local fiat rails, and daily payments.

Hedgr response:

- treat them as potential rail/provider/context, not only rivals;
- integrate or route through provider-led rails where possible;
- avoid building a generic wallet.

### 11.3 Stablecoin and cross-border infrastructure

Examples:

- Yellow Card
- Kotani Pay
- Bridge/Stripe
- Rain
- Circle Payment Network participants
- AZA Finance / BitPesa-type rails
- regional payout APIs.

Threat:

- can become the operating layer under other consumer brands;
- may commoditize Hedgr’s rail advantage.

Hedgr response:

- use infrastructure rather than rebuild it;
- make Hedgr the stability and trust orchestration layer;
- keep provider evidence and responsibility boundaries sharp.

### 11.4 Banks and regulated fintechs

Examples:

- UnionBank / GoTyme Bank in the Philippines VASP context;
- Discovery Bank / Luno in South Africa;
- Mercado Pago in Brazil;
- regulated local payment institutions.

Threat:

- trust, licenses, capital, distribution.

Hedgr response:

- avoid regulatory theater;
- use partner-led posture;
- build a wedge where incumbents do not communicate stable-value preservation calmly and clearly for freelancers/SMEs.

---

## 12. Hedgr’s defensible wedge

Hedgr positioning avoids:

- another DeFi wallet;
- another exchange;
- another yield app;
- another crypto card;
- another remittance app;
- another bank-like wallet.

The defensible wedge is:

> Hedgr is a stability wallet that helps freelancers and SMEs preserve value, understand liquidity posture, initiate provider-led stablecoin/fiat workflows, and make calmer financial decisions in volatile economies.

The wedge has four practical components:

1. **Stability posture:** the user sees a simple stability state, not a casino of tokens.
2. **Liquidity readiness:** withdrawal timing and limits are visible and non-promissory.
3. **Provider-led execution:** regulated or qualified third parties own custody, KYC/AML, conversion, and payout where applicable.
4. **Trust UX discipline:** no implied custody, finality, guarantees, ledger truth, yield entitlement, or customer-money authority.

This is slower than a hackathon wallet. It is also more investable, defensible, and regulator-friendly.

---

## 13. Potential future artifact language

### 13.1 Research artifact

Potential future evidence artifact if separately authorized:

```text
docs/research/HEDGR_MVP_WALLET_RAILS_MARKET_STRATEGY_PAPER.md
```

Status header:

```text
Status: Decision-support research artifact / non-authorizing
Authority: Internal analysis only; subordinate to HEDGR_STATUS.md, AGENTS.md, accepted ADRs, doctrine, and Class B evidence governance.
Mode: Decision-support only. Does not authorize evidence intake, evidence acceptance, ADR drafting readiness, implementation-preflight, implementation, custody, rails, stablecoin conversion, deposits, withdrawals, or customer-money movement.
```

### 13.2 Potential future ticket

Potential future evidence artifact if separately authorized:

```text
MARKET-PROVIDER-CASHOUT-INTAKE-B-001 — Candidate Market, Provider & Cash-Out Evidence Intake
```

This would remain subordinate to the broader evidence-intake authorization track and would not exist unless separately authorized.

### 13.3 Allowed scope

Allowed:

- preserve market/regulatory source pointers;
- create market candidate records;
- create provider candidate records;
- create cash-out market records;
- build competitor maps;
- build provider responsibility maps;
- collect public provider documentation;
- request vendor confirmations only if separately authorized;
- prepare counsel question packs;
- prepare no-money prototype research briefs;
- update evidence state only where permitted by future §7 / §7a.

Not allowed:

- launch-market selection;
- provider approval;
- legal conclusions;
- evidence acceptance;
- blocker closure;
- ADR acceptance;
- implementation-preflight;
- production API keys;
- live rail integration;
- customer onboarding;
- custody;
- deposits;
- withdrawals;
- stablecoin conversion;
- customer-money movement.

### 13.4 Potential future records if separately authorized

```text
docs/ops/governance/class-b/evidence/providers/PRIVY_WALLET_AUTH_CANDIDATE_RECORD.md
docs/ops/governance/class-b/evidence/providers/ONRAMPER_RAIL_DISCOVERY_CANDIDATE_RECORD.md
docs/ops/governance/class-b/evidence/providers/ONRAMPER_OFFRAMP_DISCOVERY_CANDIDATE_RECORD.md
docs/ops/governance/class-b/evidence/providers/TRANSAK_DIRECT_OFFRAMP_CANDIDATE_RECORD.md
docs/ops/governance/class-b/evidence/providers/MOONPAY_CARD_PAYOUT_CANDIDATE_RECORD.md
docs/ops/governance/class-b/evidence/providers/RAMP_NETWORK_CARD_PAYOUT_CANDIDATE_RECORD.md
docs/ops/governance/class-b/evidence/providers/YELLOW_CARD_AFRICA_RAIL_CANDIDATE_RECORD.md
docs/ops/governance/class-b/evidence/providers/YELLOW_CARD_AFRICA_CASHOUT_CANDIDATE_RECORD.md
docs/ops/governance/class-b/evidence/providers/STRIPE_BRIDGE_INFRASTRUCTURE_WATCHLIST_RECORD.md

docs/ops/governance/class-b/evidence/markets/MARKET_CANDIDATE_PHILIPPINES.md
docs/ops/governance/class-b/evidence/markets/MARKET_CANDIDATE_KENYA.md
docs/ops/governance/class-b/evidence/markets/MARKET_CANDIDATE_BRAZIL.md
docs/ops/governance/class-b/evidence/markets/MARKET_CANDIDATE_SOUTH_AFRICA.md
docs/ops/governance/class-b/evidence/markets/MARKET_CANDIDATE_ARGENTINA.md
docs/ops/governance/class-b/evidence/markets/MARKET_WATCH_ZAMBIA.md

docs/ops/governance/class-b/evidence/markets/cashout/MARKET_CASHOUT_PHILIPPINES.md
docs/ops/governance/class-b/evidence/markets/cashout/MARKET_CASHOUT_KENYA.md
docs/ops/governance/class-b/evidence/markets/cashout/MARKET_CASHOUT_BRAZIL.md
docs/ops/governance/class-b/evidence/markets/cashout/MARKET_CASHOUT_SOUTH_AFRICA.md
docs/ops/governance/class-b/evidence/markets/cashout/MARKET_CASHOUT_ARGENTINA.md
docs/ops/governance/class-b/evidence/markets/cashout/MARKET_CASHOUT_ZAMBIA_WATCHLIST.md
```

---

## 14. Questions for Future Governance Review

### Question 1 — Should governance authorize any evidence-intake direction?

Open review question:

> Should Hedgr authorize bounded market/provider evidence intake at all, and if so, under which evidence, scope, freshness, and no-customer-money constraints?

### Question 2 — Which candidate markets, if any, should enter evidence review?

Open review question:

> Do Philippines, Kenya, Brazil, South Africa, Argentina, or Zambia warrant separately authorized evidence records, and what evidence gap must each record answer first?

### Question 3 — How should Zambia be classified for future review?

Open review question:

> Should Zambia remain a home-market research and regulatory-learning track, and what evidence would be required before any stronger conclusion could be considered?

### Question 4 — Which provider candidates, if any, should enter evidence review?

Open review question:

> Should Privy, Onramper, Transak, MoonPay, Ramp Network, Yellow Card, or Stripe/Bridge receive separately authorized candidate records, and what provider-specific gaps must each record preserve?

### Question 5 — Should governance authorize any evidence record sequence?

Open review question:

If governance later authorizes a sequence, which of the following records, if any, would be in scope, and under what constraints?

1. Privy wallet/auth candidate record;
2. Onramper rail-discovery and off-ramp discovery candidate records;
3. Transak direct off-ramp candidate record;
4. Yellow Card Africa rail/cash-out candidate record;
5. Kenya market candidate and cash-out records;
6. Philippines market candidate and cash-out records;
7. Brazil market cash-out benchmark record if governance wants LatAm represented.

No sequence is approved by this paper. South Africa, Argentina, and Zambia remain candidate record questions only unless separately authorized.

### Question 6 — Should cash-out become a first-class evidence domain?

Open review question:

> Should cash-out be treated as a distinct evidence-intake domain covering payout methods, provider-of-record, KYC/KYB, quote expiry, fee/FX/spread, settlement/finality, failed payout handling, reconciliation truth, support escalation, and Trust UX copy?

---

## 15. Bottom-line governance readout

Market selection must not become a governance cul-de-sac or a disguised approval path.

The governance-safe research hypothesis is:

> If separately authorized, bounded evidence intake for a small set of provider and market candidates could help future governance review decide whether any ADR drafting readiness or implementation-preflight question is worth opening.

The candidate research posture is:

- **Wallet/Auth:** Privy, self-custodial user-wallet path only.
- **Rail Discovery:** Onramper, discovery/quote/status only.
- **Direct Off-Ramp:** Transak as a direct cash-out candidate for evidence intake.
- **Card Payout Benchmarks:** MoonPay and Ramp Network as benchmark candidates, not assumed local mobile-money rails.
- **Africa Rails:** Yellow Card as a provider-of-record and cash-out candidate requiring evidence.
- **Future Infrastructure:** Stripe/Bridge watchlist.
- **Cash-out domain:** Kenya, Philippines, Brazil, South Africa, Argentina, and Zambia each remain evidence-dependent cash-out hypotheses.
- **Candidate market set:** Philippines, Kenya, Brazil, South Africa, Argentina, and Zambia.
- **Zambia:** research/watchlist candidate, not rollout approval.
- **MVP positioning:** stability wallet for freelancers/SMEs, not exchange, not yield app, not bank, not custodian.

Handled this way, the MVP research path can remain useful without pretending that governance scaffolding is operational readiness.

---

## 16. Source pointers for HedgrOps evidence intake

### Repo-native source pointers

- `docs/doctrine/hedgr-mvp-project-specification.md`
- `docs/doctrine/hedgr-whitepaper.md`
- `docs/ops/reviews/weekly/2026-06-20-weekly-review.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_EVIDENCE_REGISTRY.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_GOVERNANCE_EVIDENCE_PROGRAM_CLOSURE_ASSESSMENT.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_RECONCILIATION_EVIDENCE_PACKAGE.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_SUPPORT_DISPUTE_EVIDENCE_PACKAGE.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_INCIDENT_RESPONSE_EVIDENCE_PACKAGE.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_AUDIT_RETENTION_EVIDENCE_PACKAGE.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_STAGING_LIVE_STATE_SEPARATION_EVIDENCE_PACKAGE.md`

### External source pointers

- Chainalysis — 2025 Global Crypto Adoption Index
- TRM Labs — 2025 Crypto Adoption and Stablecoin Usage Report
- Privy Docs — Wallet Infrastructure Overview
- Onramper — Terms and Conditions
- Onramper — Global coverage, off-ramp coverage, and country coverage pages for Philippines, Kenya, Brazil, South Africa, Argentina, and Zambia watchlist
- Transak Docs — Off-Ramp product documentation
- Transak Support — Offramp Stream process
- MoonPay Help Center — Supported currencies and supported payment methods
- MoonPay Developer Docs — Off-ramp / sell widget parameters
- Ramp Network Docs — Getting started and sell-to-card payout coverage
- Yellow Card — API Suite / Stablecoin and Fiat Rails
- Yellow Card Docs — Coverage map and payment channels
- Stripe Docs — Stablecoin Payments
- Bangko Sentral ng Pilipinas — List of Virtual Asset Service Providers, as of 31 May 2026
- Bangko Sentral ng Pilipinas — Circular No. 1108, Guidelines for Virtual Asset Service Providers
- Kenya Law — Virtual Asset Service Providers Act, 2025
- Central Bank of Kenya — Draft Virtual Asset Service Providers Regulations, 2026 public notice
- Kenya Treasury — Draft Virtual Asset Service Providers Regulations, 2026
- FSCA South Africa — Approved Crypto Asset Service Provider notice
- Reuters — Brazil central bank virtual asset regulation, November 2025
- Reuters — MercadoLibre/Mercado Pago Meli Dolar stablecoin in Brazil
- Argentina CNV — Registro de Proveedores de Servicios de Activos Virtuales
- Reuters — Nexo acquisition of Buenbit
- Bank of Zambia — Position Paper on Open Finance in Zambia
- Zambia SEC — Regulatory Sandbox Framework for Capital Markets reference
- Zambia FIC — Virtual Assets explainer
- Reuters — Stablecoins in Nigeria for cross-border transfers, IMF reference

---

## 17. Non-authorization statement

This paper is a non-authorizing decision-support research artifact. It does not approve, validate, accept, or certify evidence and does not approve, activate, sequence, or implement Class B execution, staging, sandbox use, internal testing, live operations, deposits, withdrawals, custody, rails, stablecoin conversion, treasury operations, liquidity buffers, reconciliation operations, support operations, audit operations, ledger mutation, Copilot execution, Class C automation, external engagement, ADR acceptance, or customer fund movement. Any future Class B evidence intake, evidence acceptance, evidence review, gap closure, blocker closure, ADR drafting readiness, implementation-proposal preflight, implementation work, or customer-money activity still requires separate repo-governed authorization through `docs/ops/HEDGR_STATUS.md §7` naming where applicable, a bounded `§7a` brief where applicable, accepted ADRs where required, qualified legal/compliance review where applicable, relevant spine-artifact review, relevant evidence-package review, source pointers, freshness review, conflict review, dependency review, and audit/retention evidence where applicable.
