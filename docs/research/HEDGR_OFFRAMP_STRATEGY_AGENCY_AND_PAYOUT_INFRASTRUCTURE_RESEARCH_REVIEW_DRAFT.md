# Hedgr Off-Ramp Strategy, Agency Networks & Payout Infrastructure Research Artifact

**Status:** Review draft / decision-support research artifact / non-authorizing
**Audience:** Hedgr Founder; HedgrOps — co-architect and governance custodian
**Prepared:** 2026-06-26
**Intended repo path:** `docs/research/HEDGR_OFFRAMP_STRATEGY_AGENCY_AND_PAYOUT_INFRASTRUCTURE_RESEARCH.md`
**Relationship to parent artifact:** Companion analysis to `docs/research/HEDGR_MVP_WALLET_RAILS_MARKET_STRATEGY_PAPER.md`
**Source class:** Internal analysis, founder operating experience, market scan, provider scan, public regulatory/payment-system sources, and repo-governance synthesis
**Authority boundary:** This paper does not select a market, approve a provider, authorize evidence intake, accept evidence, close blockers, authorize ADR drafting, authorize implementation-preflight, activate Class B, authorize custody, activate rails, authorize stablecoin conversion, authorize deposits, authorize withdrawals, authorize remittance activity, or authorize customer-money movement.

---

## 1. Executive decision frame

Off-ramping should be elevated from a sub-feature under “rails” to a **core product pillar and independent evidence domain** for Hedgr.

Hedgr’s central utility is not proven when a user can acquire or display a stable asset. It is proven when the user can convert that position into **usable local value** — safely, predictably, at an intelligible cost, through a legally and operationally supported endpoint.

For Hedgr’s target users — freelancers, SME operators, and mobile-first savers in volatile economies — the last mile may be:

- a bank account;
- a mobile-money wallet;
- an interoperable e-wallet;
- an instant-payment address;
- a debit-card payout;
- an agent or cash-pickup location.

The strategic question is therefore not simply:

> “Which provider can sell USDC for fiat?”

It is:

> “Which provider combination can reliably turn a user-controlled stable-value position into local spendable value, while owning the regulated payout, liquidity, KYC/AML, fraud, failed-payment, refund, support, and reconciliation obligations that Hedgr should not absorb prematurely?”

### Primary governance-conservative hypothesis

A primary governance-conservative hypothesis for future review is a **provider-led, same-name off-ramp model** in which:

1. the user cashes out only to an account, mobile wallet, card, or cash-pickup identity in the same verified name;
2. the user explicitly authorizes the stablecoin transfer or sale;
3. a qualified provider owns conversion and fiat disbursement;
4. the provider or its local payout partners own local liquidity and settlement;
5. Hedgr acts as the stability, disclosure, routing, status, and support-orchestration layer;
6. Hedgr does not maintain multiple MNO prefunded wallets, agent floats, customer fiat balances, or local payout liquidity for the initial MVP;
7. provider and local-rail records — not Hedgr’s application database — determine settlement truth.

This model is an inference from the role separation visible in the Kraken–MoneyGram structure and from the operational constraints of mobile-money and agent-led systems. It requires legal, provider, market, and operational evidence before any implementation decision.

### Working strategic hypotheses

1. **Off-ramp distribution may become a moat.** Wallet UX and stablecoin access are increasingly commoditized. Reliable local exit endpoints, commercial permissions, liquidity arrangements, and support processes may be harder to reproduce.
2. **Cash may remain a legitimate endpoint.** In emerging markets, cash pickup is not necessarily a regression. It can be an inclusion and resilience rail for users who are underbanked, digitally constrained, or operating where account interoperability is weak.
3. **Agency may be a liquidity network, not merely a location network.** An agent logo on a map is not proof that cash will be available, the identity will match, the location will be open, or a failed pickup can be resolved.
4. **Prefunding may be a product and balance-sheet decision.** Real-time payout often depends on money already sitting inside an MNO, bank, PSP, or aggregator account. Someone must fund, forecast, reconcile, and bear idle-liquidity risk.
5. **Direct MNO APIs may not automatically create an operable product.** API availability and sandbox access are weaker than commercial permission, production enablement, disbursement limits, local-entity requirements, prefunding terms, and support commitments.
6. **Country coverage is not endpoint evidence.** “Kenya supported” is not the same as “same-name KES payout to M-Pesa for a freelancer through this exact provider, under this entity, with these limits, fees, support rights, and settlement definitions.”
7. **The chain may be part of the rail decision.** MoneyGram Ramps currently centres USDC on Stellar. Choosing a wallet chain without accounting for the off-ramp endpoint can create bridge, gas, custody, and reconciliation complexity.
8. **Support may be part of the rail.** Failed payouts, uncollected cash, ID mismatches, compliance reviews, reversals, and refunds are not edge cases; they are operating-model questions.

---

## 2. Current Hedgr posture and why this remains research

Hedgr doctrine places capital preservation, liquidity integrity, stable-value clarity, and governance ahead of yield or execution. Deposits, conversion, withdrawals, custody, and payout execution fall into Class B or Class C depending on operating design and authority.

The current Class B posture remains evidence-gated:

- evidence scaffolding exists;
- evidence intake authority is not granted;
- evidence acceptance authority is not granted;
- jurisdiction selection is unresolved;
- custody model is unresolved;
- rail/vendor permission is unresolved;
- settlement/finality is unresolved;
- stablecoin/conversion evidence is unresolved;
- fee/FX/spread evidence is unresolved;
- liquidity/withdrawal controls are unresolved;
- reconciliation, support/dispute, incident, audit/retention, and Trust UX evidence remain unresolved;
- no implementation authority or customer-money authority exists.

This paper is therefore a **decision-support and question-framing artifact**. It identifies what may merit future evidence intake; it does not convert public provider claims into evidence acceptance or operating permission.

---

## 3. Why off-ramping is cardinal to Hedgr’s utility

### 3.1 Stable value is useful only when it remains locally usable

A user may rationally hold a USD-denominated stable asset to reduce exposure to local-currency volatility. But the asset’s practical value depends on the user’s ability to:

- pay a supplier;
- cover payroll;
- meet rent or household expenses;
- withdraw to a mobile-money wallet;
- receive local currency into a bank account;
- collect physical cash where digital rails are unavailable or unreliable.

A wallet that makes entry easy but exit uncertain can create a new form of liquidity risk. That conflicts directly with Hedgr’s stability-first proposition.

### 3.2 The actual product is the end-to-end outcome

For the user, “off-ramp” is not one transaction. It is a chain of dependent events:

```text
stable asset available
→ quote available
→ user eligibility confirmed
→ beneficiary endpoint validated
→ user authorizes sale / transfer
→ provider receives stable asset
→ compliance review clears
→ conversion executes
→ local payout is initiated
→ bank / wallet / card / agent network accepts instruction
→ recipient receives or collects value
→ final state is reconciled
```

A failure at any step undermines the promise of liquidity. Hedgr should therefore evaluate off-ramp providers on **end-to-end completion**, not merely API uptime or quoted coverage.

### 3.3 Hedgr’s trust proposition should lead with withdrawal honesty

The user-facing product should explain:

- available payout methods;
- estimated rather than guaranteed timing;
- total expected fees and FX effects;
- quote expiry;
- transaction and daily limits;
- possible compliance review;
- whether cash pickup requires identification;
- what “provider received,” “payout available,” and “paid” mean;
- what happens if a payout fails or goes uncollected;
- who the regulated payout provider is;
- who the user contacts for each class of issue.

The UX should avoid claiming “instant,” “final,” “guaranteed,” “available,” or “withdraw anytime” unless the underlying evidence and provider terms support the exact claim.

---

## 4. Kraken–MoneyGram: the relevant strategic lesson

Kraken announced its MoneyGram partnership on 5 May 2026. The initial product is designed to enable Kraken customers to withdraw crypto into cash through MoneyGram’s physical network, with rollout described across more than 100 countries for the Kraken partnership. MoneyGram separately markets its Ramps infrastructure as connecting wallets to cash in more than 170 countries. Kraken states that its first phase focuses on customers sending funds to their own accounts, with local bank deposits and broader remittance-style flows intended as later expansion. [S1][S3]

The partnership is strategically important for Hedgr for five reasons.

### 4.1 It treats physical distribution as core financial infrastructure

Kraken is not trying to build thousands of cash locations. It is pairing its crypto liquidity, account, compliance, and interface layer with an established payout network. The Tokenized discussion frames the problem clearly: getting value on-chain is increasingly easy; converting it back into the local systems people depend on remains hard. [S1][S2]

**Hedgr implication:** the distribution endpoint can be more strategically valuable than another wallet feature.

### 4.2 It creates explicit role separation

Kraken’s MoneyGram terms state that MoneyGram provides money transfer, foreign exchange, and cash pickup, while Kraken acts as the technology interface. Kraken does not guarantee delivery times or location availability. Kraken’s obligations for the payout end after it debits the relevant balance and submits the transaction to MoneyGram. MoneyGram owns regulated remittance error resolution, cancellation rights, and refunds. [S4]

**Hedgr implication:** any off-ramp design should make the responsibility handoff contractually and visibly explicit.

### 4.3 It begins with self-off-ramp rather than open remittance

Kraken describes the initial flow as customers sending funds to their own accounts. This is narrower than allowing users to pay arbitrary third parties or beneficiaries. [S1]

**Hedgr inference:** a same-name MVP could materially reduce beneficiary fraud, mule-account, sanctions, source-of-funds, remittance, and support complexity. This is a strategic hypothesis, not a legal conclusion.

### 4.4 It stages channel expansion

The current focus is cash pickup. Bank, mobile-wallet, and card off-ramp features are presented by MoneyGram Ramps as coming later, not as universally live today. [S3]

**Hedgr implication:** the product should not wait for a mythical “one provider, every endpoint” architecture. It should support a staged rail ladder and preserve endpoint-specific evidence.

### 4.5 It does not eliminate operational complexity

The terms still contemplate:

- additional ID or source-of-funds checks;
- AML and sanctions screening;
- agent opening hours and location availability;
- local charges and taxes;
- transaction, velocity, and geolocation limits;
- ordinary finality after submission;
- uncollected cash and provider-led refunds;
- independent data-controller responsibilities;
- provider-specific dispute handling. [S4]

**Hedgr implication:** partnership does not remove risk. It relocates responsibilities to parties better positioned to own them.

### 4.6 Technical implication: MoneyGram Ramps is currently chain-specific

MoneyGram’s current developer material describes USDC on Stellar and a SEP-24 flow. A wallet on another chain may require a bridging path or additional integration. Privy lists Stellar as a supported wallet-abstraction chain rather than Privy’s highest full-functionality support category. [S5][S6]

**Hedgr implication:** future chain-choice review should consider the candidate payout endpoint and provider architecture before treating wallet-chain selection as settled. A multi-chain wallet may look flexible but can quietly multiply bridge, quote, gas, transaction-state, and reconciliation risk.

---

## 5. Candidate Hedgr off-ramp operating hypotheses

### Candidate operating hypothesis 1 — Same-name cash-out first

An initial candidate scope could permit only:

- verified user → same-name bank account;
- verified user → same-name mobile-money wallet;
- verified user → same-name debit card where permitted;
- verified user → same-name cash pickup with government ID.

Out of initial scope:

- arbitrary third-party beneficiaries;
- family remittance;
- supplier payout;
- payroll;
- mass payout;
- cash delivery;
- anonymous cash pickup;
- P2P matching or informal OTC;
- agent-assisted stablecoin exchange performed on Hedgr’s behalf.

This narrower scope preserves a cleaner distinction between **user withdrawal** and **money transmission to another person**. Qualified legal review must still determine whether the exact model creates regulated obligations for Hedgr.

### Candidate operating hypothesis 2 — Provider-owned local liquidity

For a future MVP hypothesis, the candidate provider or payout network could own:

- prefunded local payout accounts;
- local MNO balances;
- agent settlement;
- bank settlement;
- FX execution;
- local payout permissions;
- failure and refund procedures.

This hypothesis would avoid Hedgr initially managing country-by-country MNO wallets or agent float.

### Candidate operating hypothesis 3 — Endpoint hierarchy rather than provider hierarchy

The user’s practical endpoint should determine routing:

1. **Instant bank or interoperable account transfer** where broadly available;
2. **mobile-money or e-wallet payout** where it is the daily money rail;
3. **cash pickup / agency** where digital accounts are weak, unavailable, or not trusted;
4. **card push** where supported and useful;
5. **manual exception path**, never informal P2P.

A provider may be excellent in one endpoint and weak in another. Hedgr should not force every market through the same global vendor.

### Candidate operating hypothesis 4 — Hedgr orchestrates; providers execute

Hedgr’s candidate role:

- eligibility gating;
- endpoint discovery;
- quote presentation;
- provider disclosure;
- user authorization capture;
- routing logic;
- status normalization;
- support handoff;
- audit pointer preservation;
- stability and liquidity communication.

Provider role:

- KYC/KYB where required for its regulated service;
- sanctions/PEP and transaction monitoring;
- stablecoin receipt or sale;
- fiat conversion;
- payout execution;
- local settlement;
- regulated disclosures;
- error resolution, cancellation, refund, and complaint processes;
- provider-side reconciliation and transaction records.

The exact allocation must be validated market by market. “The provider handles compliance” is not an acceptable blanket assumption.

### Candidate operating hypothesis 5 — No finality claim before endpoint confirmation

Hedgr should treat:

```text
provider submitted
```

as different from:

```text
payout available
```

and different again from:

```text
paid / collected / credited
```

For cash pickup, “available for pickup” is not “collected.” For bank transfer, “provider completed” may still differ from beneficiary-bank credit. For mobile money, provider acceptance may differ from MNO wallet credit.

---

## 6. The off-ramp rail ladder

| Level | Endpoint | Best use | Core advantage | Core weakness | Candidate Hedgr posture |
|---|---|---|---|---|---|
| 1 | Instant bank / interoperable account | Banked users, SMEs, formal freelancers | Clear account identity; scalable digital reconciliation | Bank exclusions, account-name mismatches, cut-offs or reversals | Candidate default where mature |
| 2 | Mobile money / e-wallet | Mobile-first consumers and micro-SMEs | Familiar, immediate local utility | MNO restrictions, prefunding, wallet limits, fragmentation | Candidate path in Kenya/Zambia-type markets through provider-of-record |
| 3 | Agent / cash pickup | Underbanked users, emergency liquidity, geographic reach | Converts digital value to universally understood cash | Agent liquidity, ID, opening hours, fraud, uncollected cash | Inclusion/fallback rail; not assumed default |
| 4 | Card push | Carded consumers and selected markets | Fast, familiar, easy UX | Issuer acceptance, card eligibility, charge/failure opacity | Secondary benchmark or fallback |
| 5 | Manual exception | Failed automated routes under controlled ops | Can rescue edge cases | High operational and fraud risk | Separate authorization only |

### Candidate product hypothesis

Future product review could favor the **best evidenced endpoint**, not the longest list of nominally available endpoints. One reliable route may be more trust-safe than five flaky logos.

---

## 7. Agency and cash-pickup operating model

### 7.1 Why the agency model matters

Agent and money-transfer networks extend access beyond users with bank accounts or interoperable wallets. For some users, a known physical location is more trusted than an unfamiliar digital provider. Agents may also provide:

- geographic reach;
- cash availability;
- human assistance;
- ID inspection;
- language/local-context support;
- a fallback when digital rails are down;
- a bridge for users who cannot or do not want to remain fully digital.

MoneyGram, Western Union, and Ria have built network value by combining technology, licensing, compliance, settlement, and physical distribution. MoneyGram now exposes a crypto-to-cash developer path; Western Union provides enterprise B2C payout APIs and is developing a Digital Asset Network; Ria offers hosted and API partnership models spanning bank, wallet, and cash distribution. [S3][S7][S8][S9]

### 7.2 Agency is not simply an API endpoint

The agent model introduces a second operational layer after the provider accepts the payout. Hedgr would need evidence for:

- actual eligible locations by country;
- cash denominations and maximum payout size;
- agent cash availability;
- agent opening hours;
- agent commission and local deductions;
- identity-document requirements;
- exact name-match tolerances;
- reference number / voucher handling;
- uncollected-payout expiry;
- cancellation and refund route;
- agent fraud and social-engineering controls;
- customer complaint ownership;
- physical safety and privacy;
- status confirmation after collection;
- reconciliation between provider, agent, and Hedgr records.

### 7.3 The agent float problem

An agent can have an active terminal and still lack enough physical cash. Conversely, the agent can hold cash but lack sufficient digital float to process other services. A coverage map therefore proves presence, not liquidity.

For Hedgr, this means an agent network should be evaluated through **successful payout availability**, not location count alone.

Suggested evidence metrics:

- percentage of locations able to fulfil the requested amount;
- median distance to a successful location;
- first-attempt collection rate;
- ID mismatch rate;
- uncollected rate;
- agent-level failure rate;
- average time from crypto confirmation to cash availability;
- average time from availability to collection;
- support contacts per 100 cash payouts;
- refund duration for uncollected cash.

### 7.4 Candidate role of cash pickup in Hedgr

Cash pickup could be treated as:

- a financial-inclusion route;
- a resilience route;
- an emergency-liquidity route;
- a fallback for markets where digital payout is not sufficiently open or reliable.

It should not automatically be assumed as the default where instant bank or mobile-wallet payout is cheaper, safer, and easier to reconcile.

---

## 8. MNO disbursement, prefunding and the liquidity problem

### 8.1 Founder operating observation

Founder operating experience from Zambia indicates that institutions seeking real-time bulk disbursements frequently encountered restrictive MNO commercial and risk policies. The workable mechanism often required a business to pre-fund a wallet or settlement account before payouts could occur.

This observation should enter future evidence records as:

```text
Source class: Founder operating experience / founder assumption
Use: Frames evidence questions
Limitation: Does not prove current MNO terms, current API access, or current Zambia market permission
```

It is strategically important because it identifies the real bottleneck: the API may exist, but payout capacity depends on commercial approval and pre-positioned liquidity.

### 8.2 API availability does not equal disbursement authority

MTN’s public MoMo developer portal exposes “Pay” capabilities for business-to-consumer and business-to-business disbursement use cases, including salaries, benefits, and supplier payments. Safaricom exposes M-Pesa B2C APIs. These public surfaces show technical capability, not Hedgr-specific production access, stablecoin permission, commercial approval, or liquidity terms. [S10][S11]

The questions that matter are:

- Is the API product enabled in the target country?
- Does the applicant need a local legal entity or licensed status?
- Does the use case permit crypto/stablecoin-originated funds?
- Is the product limited to approved remittance providers, employers, lenders, or merchants?
- What is the prefunding account structure?
- Who owns the wallet balance?
- Can funds be swept or refunded?
- What are per-wallet and aggregate limits?
- What transaction monitoring does the MNO require?
- What reserve or security deposit is required?
- What happens if the prefunded wallet is insufficient?
- Who reconciles partial, timed-out, duplicate, or reversed payouts?
- What support SLA exists?

### 8.3 Four common liquidity models

| Model | Description | Working-capital owner | Hedgr suitability |
|---|---|---|---|
| Direct prefunded MNO/PSP account | Business funds a local disbursement wallet before sending | Hedgr or local operating entity | Poor MVP fit; creates fragmented balances and operations |
| Aggregator-managed prefunding | Regional/global provider maintains local balances and charges Hedgr centrally | Provider, with pricing reflecting liquidity cost | Candidate MVP hypothesis |
| Net settlement / settlement window | Provider pays locally and nets obligations on agreed cycle | Shared/provider credit exposure | Potential utility, but requires robust counterparty and volume evidence |
| Post-funded / credit line | Provider advances payout and invoices later | Provider | High-utility UX, but unlikely without underwriting, collateral, or scale |

### 8.4 Why prefunding matters strategically

Prefunding creates:

- idle capital;
- country and currency exposure;
- forecasting requirements;
- weekend/holiday liquidity risk;
- fragmented treasury positions;
- counterparty risk;
- breakage and stale balances;
- rebalancing costs;
- operational dependence on manual top-ups;
- pressure to overstate withdrawal availability.

South Africa’s central-bank payment modernisation programme explicitly describes a future fast-payment system using a prefunded model for real-time settlement, reinforcing that prefunding is not a Zambia-specific quirk; it is a common mechanism for managing settlement risk. [S12]

### 8.5 Hedgr research hypothesis on MNOs

For MVP evidence review:

> Direct MNO connectivity should not be treated as a prerequisite or default architecture without separately authorized evidence review. A candidate hypothesis is to examine regulated or qualified aggregators/providers that already maintain MNO relationships, local settlement accounts, and liquidity.

Direct MNO integration may become rational when Hedgr has:

- sufficient market-specific volume;
- a local entity and legal posture;
- treasury capacity;
- direct commercial leverage;
- reconciliation operations;
- redundancy across MNOs;
- a clear reason why aggregator pricing or control is inadequate.

---

## 9. Off-ramp provider landscape for Hedgr

Provider claims below identify **candidate research utility**, not approval or verified market coverage for Hedgr.

### 9.1 Global cash and remittance networks

#### MoneyGram Ramps — crypto-native cash-pickup candidate

**Why it matters**

- Public crypto-to-cash product;
- wallet/exchange API positioning;
- USDC-to-cash through participating locations;
- broad physical distribution;
- provider-led security, compliance, settlement, and cash payout claims;
- clear precedent for exchange-to-MTO role separation. [S1][S3][S5]

**Main constraints**

- current developer flow is centred on USDC/Stellar;
- exact live country/location coverage must be confirmed;
- bank/mobile-wallet/card off-ramp is still described as coming soon;
- cash availability and agent performance remain operational risks;
- MoneyGram/Kraken-style responsibility boundaries would need to be available contractually to Hedgr;
- enterprise/compliance onboarding may be material.

**Evidence relevance:** High-evidence-value candidate for global cash access.

#### Western Union — enterprise payout and future digital-asset-network candidate

Western Union offers enterprise B2C payout infrastructure and describes APIs for global mass payments and cash payout. In May 2026 it announced USDPT on Solana and a Digital Asset Network intended to connect exchanges and custodians to payout and liquidity infrastructure; it also described using tokenized settlement to improve treasury and agent liquidity deployment. [S7][S8]

**Why it matters**

- major global distribution network;
- cash and bank payout experience;
- mature compliance and agent operations;
- emerging stablecoin strategy;
- potentially useful for enterprise-scale payout and agent liquidity.

**Main constraints**

- partnership-led rather than lightweight self-serve integration;
- current digital-asset-network availability and Hedgr eligibility need direct confirmation;
- commercial minimums and onboarding burden may be high;
- the stablecoin announcement is not proof of current Hedgr-ready crypto cash-out.

**Evidence relevance:** High-evidence-value strategic/provider-confirmation watchlist candidate.

#### Ria — embedded remittance and multi-endpoint payout candidate

Ria markets hosted and API partnership models and a network spanning bank accounts, wallet accounts, and cash pickup. [S9]

**Why it matters**

- broad payout distribution;
- cash, bank, and wallet possibilities;
- API or hosted integration choice;
- relevant to fintech, gig, payroll, and marketplace use cases.

**Main constraints**

- crypto/stablecoin conversion may need a separate upstream provider;
- exact same-name withdrawal model and licensing boundary require confirmation;
- country and endpoint support must be validated at transaction level.

**Evidence relevance:** High-evidence-value payout distribution candidate.

### 9.2 Global multi-rail payout networks

#### Thunes — multi-rail routing and payout-orchestration candidate

Thunes’ API supports payouts to mobile wallets, bank accounts, cards, and cash pickup. Its transaction flow includes payer discovery, beneficiary verification, quote, transaction creation, confirmation, and status retrieval. [S13]

**Why it matters**

- one integration across multiple payout ecosystems;
- beneficiary-validation capability;
- explicit quote and transaction-state flow;
- relevant fit for cross-market routing;
- useful across Kenya, Philippines, Brazil, Argentina, and other candidate markets.

**Main constraints**

- stablecoin conversion and wallet receipt boundary must be confirmed;
- provider-of-record and compliance allocation vary by product/corridor;
- commercial pricing, prefunding, reserves, and settlement terms are not established by public API docs.

**Evidence relevance:** High-evidence-value multi-rail candidate.

#### TerraPay — bank/mobile/card orchestration candidate

TerraPay exposes a payout API flow involving beneficiary validation, quote creation, FX, transaction submission, status, and cancellation capabilities across bank, mobile, and card endpoints. [S14]

**Why it matters**

- structured API lifecycle;
- mobile-wallet and bank connectivity;
- global payout orientation;
- potential relevance for provider-led local settlement.

**Main constraints**

- crypto-originated use-case permission must be confirmed;
- exact country and endpoint support requires provider evidence;
- stablecoin conversion may sit upstream;
- prefunding, settlement, and support terms require commercial confirmation.

**Evidence relevance:** High-evidence-value payout-orchestration candidate.

#### dLocal — emerging-market local rails and stablecoin candidate

As of June 2026, dLocal markets a single integration linking stablecoins and local rails across emerging markets, along with payouts to staff, customers, and partners and coverage across Africa, Asia, and Latin America. It also announced a 2026 remittance payout partnership intended to connect recipients to bank accounts and e-wallets in those regions. [S15][S16]

**Why it matters**

- material emerging-market concentration;
- local methods and FX infrastructure;
- stablecoin positioning;
- relevance across Brazil, Argentina, South Africa, Philippines, and other target markets;
- single-contract potential.

**Main constraints**

- product scope and stablecoin permissions must be confirmed;
- cash/agent support may be less central than bank/e-wallet payout;
- enterprise commercial requirements may be substantial;
- country support still requires endpoint-level proof.

**Evidence relevance:** High-evidence-value emerging-market digital payout candidate.

### 9.3 Africa-focused payout networks

#### Yellow Card — stablecoin-to-local-fiat provider candidate

Yellow Card remains strategically relevant because its product framing combines stablecoins, local currencies, bank transfers, mobile money, and business/API use cases in African markets. [S17]

**Best potential role**

- stablecoin receipt/conversion;
- provider-of-record assessment;
- local-currency settlement;
- Africa-specific KYC/KYB and support;
- bank and mobile-money payout.

**Evidence burden**

- exact regulated entity by market;
- customer/business eligibility;
- custody model;
- stablecoin and chain support;
- local payout methods;
- fees/FX/spread;
- settlement truth;
- failed-payout and refund process;
- Zambia/Kenya/South Africa commercial availability.

**Evidence relevance:** High-evidence-value Africa stablecoin/off-ramp candidate.

#### Onafriq — direct-MNO and African disbursement candidate

Onafriq describes disbursements to bank accounts, mobile-money wallets, and offline agents/cash pickup, with direct MNO connections, identity verification, real-time reconciliation, and a single settlement relationship. [S18]

**Why it matters**

- addresses the exact MNO fragmentation problem;
- can reduce direct bilateral MNO integrations;
- covers digital and offline endpoints;
- potentially shifts local liquidity and reconciliation to an established network.

**Main constraints**

- crypto/stablecoin-originated flows need explicit permission;
- local regulatory and customer-eligibility boundaries require confirmation;
- commercial settlement, prefunding, reserves, and support terms are unknown publicly.

**Evidence relevance:** High-evidence-value Africa last-mile candidate.

#### Cellulant — African digital payout candidate

Cellulant markets payouts to mobile wallets, bank accounts, and cards across African markets through a scalable platform. [S19]

**Why it matters**

- local rail reach;
- Africa enterprise experience;
- mobile-money and bank payout potential;
- useful comparator to Onafriq.

**Main constraints**

- crypto/stablecoin conversion likely requires an upstream provider or explicit product approval;
- country endpoint coverage and commercial requirements require direct confirmation;
- cash pickup appears less central than for MTO networks.

**Evidence relevance:** Exploratory evidence candidate for Africa digital payouts.

### 9.4 Direct MNO connections

#### MTN MoMo / Airtel Money / M-Pesa

Direct MNO APIs can provide payout control and recognized local familiarity. MTN publicly describes disbursement APIs for salaries, benefits, suppliers, and other payouts; Safaricom exposes M-Pesa B2C capabilities. [S10][S11]

**Advantages**

- direct endpoint control;
- local brand familiarity;
- potentially lower marginal cost at scale;
- direct status and balance APIs;
- fewer technical intermediaries.

**Disadvantages**

- country-by-country contracting;
- local entity and risk requirements;
- restricted use cases;
- prefunding and treasury fragmentation;
- limited cross-border portability;
- separate support and reconciliation per MNO;
- no automatic permission for crypto-originated flows;
- concentration and outage risk.

**Evidence relevance:** Later-stage optimization candidate, not initial cross-market architecture.

### 9.5 Existing ramp providers in the parent paper

| Provider | Best Hedgr utility | Off-ramp limitation |
|---|---|---|
| Onramper | Provider discovery, quote routing, market mapping | Not the underlying payout owner or settlement truth |
| Transak | Direct embedded sell/off-ramp candidate | Local payout method and country coverage must be confirmed; dedicated-address and reconciliation risks |
| MoonPay | Consumer/card/bank payout benchmark | Weaker fit for mobile-money and agent-first markets |
| Ramp Network | Card payout and self-custodial ramp benchmark | Not equivalent to local bank, mobile money, Pix, GCash, M-Pesa, or agent payout |

These providers remain relevant, but the expanded off-ramp analysis shows that Hedgr should also evaluate **distribution networks and payout infrastructure providers**, not only crypto ramp brands.

---

## 10. Candidate-market off-ramp map

### 10.1 Comparative summary

| Market | Primary endpoint hypothesis | Fallback endpoint | Agency relevance | Candidate infrastructure | Main evidence risk | Off-ramp research utility |
|---|---|---|---|---|---|---|
| Philippines | PHP to bank/e-wallet via InstaPay/PESONet-compatible partner | Cash pickup | Medium | Local BSP-supervised provider; Thunes; dLocal; Ria/MoneyGram; Transak/TransFi where confirmed | Provider-of-record, e-wallet access, customer eligibility, payout status | High |
| Kenya | KES to M-Pesa / bank | Agent/cash pickup | High | Yellow Card; Onafriq; Thunes; TerraPay; M-Pesa partner; MoneyGram/Ria fallback | MNO permission, prefunding, VASP boundary, business wallet limits | Very high |
| Brazil | BRL to Pix / bank | Card or cash pickup | Low–medium | Local VASP/payment partner; dLocal; Thunes; Transak/Ramp/MoonPay where confirmed | FX/VASP classification, Pix access, competition, quote/finality | High |
| South Africa | ZAR to bank / PayShap-capable partner / card | Cash pickup | Medium | Local CASP/PSP; dLocal; Yellow Card; Thunes; TerraPay; MoneyGram/Ria | CASP/payment role, bank finality, prefunding, complaint ownership | Medium |
| Argentina | ARS to CBU/CVU / interoperable wallet | Cash pickup | Medium | Local PSAV/PSP; dLocal; Thunes; Ria/MoneyGram; Koywe/TransFi where confirmed | FX volatility, PSAV role, quote expiry, claims | Medium |
| Zambia | ZMW to mobile money / bank | Agent/cash pickup | Very high | Yellow Card; Onafriq; Thunes/TerraPay; direct MNO only if justified; MoneyGram/Ria | Stablecoin perimeter, MNO permission, prefunding, local liquidity, customer-money authority | Research/watchlist |

### 10.2 Philippines

The Philippines has interoperable bank/e-money payment infrastructure under the BSP’s National Retail Payment System. InstaPay supports real-time low-value credit transfers, while PESONet supports batch transfers and business-to-person use cases. [S20]

**Strategic interpretation**

- Digital payout should be the primary hypothesis.
- E-wallet and bank-account interoperability may be more useful than cash for many target users.
- Cash pickup remains valuable for users without eligible accounts and as a resilience fallback.
- A local supervised provider may offer stronger support and regulatory fit than a global ramp alone.

**Candidate evidence questions**

- Can a provider cash out stablecoin value to the user’s own GCash/Maya/bank account?
- Does the provider access InstaPay/PESONet directly or through a bank/e-money partner?
- Are freelancers and SMEs eligible?
- What beneficiary-name verification is available?
- Are cash-pickup vouchers/APIs available through local bank/MTO partnerships?
- Who owns failed payout and duplicate-payment handling?

**Research utility:** High. The Philippines is a high-relevance hybrid digital-plus-cash evidence market.

### 10.3 Kenya

Kenya offers the clearest product-utility hypothesis because mobile money is a dominant daily rail and the need for stable-value-to-local-liquidity conversion is concrete.

**Strategic interpretation**

- M-Pesa/mobile-money payout is more relevant than card payout.
- Direct MNO integration may create avoidable prefunding and commercial friction.
- Regional providers with existing MNO settlement and compliance relationships may be more suitable.
- Agency/cash remains important because mobile money itself ultimately depends on agent cash availability for physical withdrawal.

**Candidate evidence questions**

- Can stablecoin-originated value be paid to the user’s own M-Pesa wallet?
- Can business wallets receive payouts, or only personal wallets?
- Who bears the MNO prefunding requirement?
- What are wallet, velocity, and cash-out limits?
- Does the provider return definitive mobile-wallet credit confirmation?
- What happens when the mobile number/name does not match?
- What is the end user’s additional cost to withdraw mobile money as physical cash?

**Research utility:** Very high. Kenya is a high-utility proof market, though not necessarily the lowest-friction launch market.

### 10.4 Brazil

Pix provides a highly legible digital off-ramp endpoint: instant local account transfer is likely more useful than an agent-first model. Brazil’s payment regulator describes Pix as available through regulated participating institutions, with instant transfer capabilities. [S21]

**Strategic interpretation**

- Digital bank/Pix payout should be primary.
- Cash pickup is a fallback rather than the central wedge.
- The value proposition is transparent stable-value management and withdrawal readiness, not crypto access.
- Local VASP, FX, and payment roles require careful separation.

**Candidate evidence questions**

- Can the provider send BRL to a same-name Pix key or bank account?
- What regulated entity performs the stablecoin sale and FX operation?
- Who owns Pix participation and settlement?
- Does the quote remain fixed through crypto confirmation?
- What happens if a Pix key is invalid or belongs to another person?
- Are corporate/freelancer accounts supported?

**Research utility:** High. Brazil is a clear digital off-ramp benchmark, though competition and regulation are demanding.

### 10.5 South Africa

South Africa remains cash-reliant while the Reserve Bank is modernising payment infrastructure and seeking broader non-bank participation. Its future fast-payment architecture is described as prefunded. [S12]

**Strategic interpretation**

- Bank and fast-payment payout should be primary.
- Cash pickup remains relevant because cash usage is persistent.
- South Africa is useful for testing compliance-grade provider and CASP boundaries.
- Prefunding and settlement design should be examined explicitly.

**Candidate evidence questions**

- Which CASP/PSP combination can legally support the stablecoin-to-ZAR flow?
- Can the payout provider credit a same-name bank account in real time?
- Does PayShap or another fast-payment endpoint apply?
- Who owns prefunded settlement and liquidity?
- What complaint and ombudsman obligations attach?

**Research utility:** Medium. South Africa is a compliance benchmark; not necessarily the first utility wedge.

### 10.6 Argentina

Argentina’s payment system supports bank accounts, non-bank CVU accounts, Transferencias 3.0, and interoperable digital wallets. [S22][S23]

**Strategic interpretation**

- Local account/wallet payout is more strategically relevant than card payout.
- The user problem is acute, but currency and regulatory volatility create quote and disclosure risk.
- Hedgr should avoid “dollar account,” deposit, savings, or guaranteed-redemption language.
- Cash pickup can provide a fallback but may carry higher FX and operational complexity.

**Candidate evidence questions**

- Can a registered provider pay ARS to a same-name CBU/CVU?
- How long can an ARS quote remain valid?
- Who bears FX movement between stablecoin receipt and payout?
- Can users choose ARS versus another legally supported endpoint?
- What taxes, reporting, or source-of-funds evidence applies?

**Research utility:** Medium. High need, high evidence burden.

### 10.7 Zambia

Zambia remains a high-mission-fit but longer-road market. Founder operating experience provides valuable insight into MNO restrictions, prefunding, institutional payout demand, and local workflow realities.

**Strategic interpretation**

- Mobile money and agents are likely central to real user utility.
- Direct MNO integration may be commercially restrictive and treasury-heavy.
- A provider that aggregates MNOs and owns local prefunding would be an evidence-positive candidate.
- Cash pickup through an MTO may provide an alternative or fallback path.
- Regulatory and stablecoin-perimeter evidence remains decisive.

**Candidate evidence questions**

- Which providers can pay ZMW to MTN, Airtel, Zamtel, or bank accounts?
- Which of those providers permits crypto/stablecoin-originated value?
- Who owns prefunding and local settlement?
- What local entity, licence, or sponsorship is required?
- Which cash-pickup networks have sufficient active liquidity and geographic reach?
- Can a same-name, low-limit research/pilot structure be considered under an approved regulatory pathway?

**Research utility:** Watchlist/field research. Zambia can remain close to founder discovery without becoming the first customer-money rollout assumption.

---

## 11. Candidate technical architecture questions for a future off-ramp lane

This section is architecture research only, not an implementation proposal.

### 11.1 Off-ramp orchestration, not custody or ledger truth

A future Hedgr off-ramp service would ideally normalize provider differences without pretending to own settlement.

Candidate components:

```text
Endpoint discovery
→ quote service
→ beneficiary validation
→ provider routing
→ user authorization
→ provider adapter
→ webhook/status ingestion
→ exception routing
→ reconciliation pointers
→ support handoff
```

### 11.2 Minimum normalized state machine

```text
quote_requested
quote_available
quote_expired
beneficiary_validation_pending
beneficiary_validated
user_confirmed
crypto_transfer_pending
crypto_received_by_provider
compliance_review
conversion_completed
payout_initiated
payout_available
paid_or_credited
failed
cancelled
uncollected
refund_pending
refunded
exception_under_review
```

Do not collapse these states into `completed`.

### 11.3 Required transaction evidence fields

- Hedgr request ID;
- provider name and regulated entity;
- provider transaction ID;
- quote ID and expiry;
- source asset and chain;
- source amount;
- onchain transaction hash;
- provider receiving address/account;
- stablecoin receipt timestamp;
- payout currency;
- payout endpoint type;
- beneficiary/name-match result;
- expected recipient amount;
- provider fee;
- network/bridge fee;
- FX rate and spread;
- local taxes/charges where known;
- payout reference/voucher;
- provider status;
- local rail confirmation;
- pickup expiry where applicable;
- finality/credit timestamp;
- exception and support references;
- refund amount and route;
- source pointers and retention class.

### 11.4 Chain minimisation

The MVP hypothesis should avoid supporting many stablecoin-chain combinations before off-ramp evidence exists.

A candidate evidence-dependency review would consider:

- the candidate market endpoint;
- providers that can legally and operationally serve it;
- supported stablecoin/chain pairs;
- whether Privy and Hedgr can support the chain without server-side control;
- whether bridging is necessary;
- whether a path introduces unnecessary bridge, custody, or reconciliation risk.

**Candidate strategic constraint:** one stablecoin, one primary chain, one fallback provider path per initial market, if separately authorized through future governance.

---

## 12. Compliance, fraud and customer-protection implications

### 12.1 Same-name control

A same-name rule should be treated as a hard initial control:

- beneficiary account name matches verified Hedgr identity;
- mobile number ownership/name is verified where provider supports it;
- cash-pickup recipient matches verified identity and ID document;
- business withdrawals go only to verified business accounts;
- no user-supplied third-party beneficiary in MVP.

Name matching may be imperfect across transliteration, middle names, abbreviations, and MNO/bank records. The provider needs a documented mismatch process.

### 12.2 Dual compliance perimeter

Even where the provider performs regulated KYC/AML, Hedgr may still have obligations relating to:

- user eligibility;
- marketing and disclosures;
- transaction intent;
- fraud indicators;
- data sharing;
- sanctions and prohibited-use controls;
- support and complaint routing;
- record preservation;
- reporting unusual activity to the relevant provider;
- avoiding structuring or circumvention.

Qualified legal review must allocate responsibilities by entity, service, and jurisdiction.

### 12.3 Cash-specific risk

Cash pickup increases exposure to:

- forged or borrowed identification;
- reference-number theft;
- coercion;
- agent collusion;
- social engineering;
- uncollected funds;
- transaction splitting;
- high-risk geographic locations;
- ambiguity over when the user actually receives cash.

Cash should therefore carry lower initial limits, stronger step-up verification, and more conservative status language than same-name bank payout.

### 12.4 Bulk payout should remain out of MVP

Bulk payout materially changes the risk profile:

- multiple beneficiaries;
- payroll/remittance/business-payment classifications;
- prefunding concentration;
- sanctions screening at scale;
- duplicate and partial batches;
- file/API security;
- batch reconciliation;
- complaints from recipients who may not be Hedgr users.

The founder’s MNO experience is highly relevant to a future Hedgr Pro or API product, but real-time bulk disbursement should not be conflated with the consumer Stability Wallet’s first off-ramp.

---

## 13. Economics and treasury analysis

### 13.1 Total landed cash-out cost

Hedgr should compare providers using the cost the user actually experiences:

```text
total landed cash-out cost
=
provider conversion fee
+ FX spread
+ blockchain fee
+ bridge fee, if any
+ payout fee
+ agent commission or endpoint charge
+ mobile-money cash-withdrawal fee, where relevant
+ local tax/duty
+ liquidity/prefunding cost
+ failure/refund/support cost
```

Headline “zero fee” claims can hide spread, recipient charges, card/agent deductions, or poor FX.

### 13.2 Prefunding economics

Metrics for provider comparison:

- required deposit/security amount;
- settlement currency;
- settlement frequency;
- usable balance versus reserve balance;
- average days of prefunding;
- ability to rebalance between countries/MNOs;
- weekend/holiday requirements;
- interest or yield treatment on prefunds;
- refund/termination process;
- counterparty protection;
- credit-line availability;
- margin calls or automatic suspension thresholds.

### 13.3 Revenue posture

Hedgr should avoid making off-ramp revenue dependent on opaque FX spread. Candidate revenue models:

- disclosed fixed orchestration fee;
- disclosed percentage fee;
- provider revenue share shown within total fee;
- premium subscription with reduced transaction fees;
- SME plan for higher limits and operational reporting.

The governing principle should be:

> Liquidity integrity and transparent landed cost outrank short-term spread extraction.

---

## 14. Off-ramp performance scorecard

A provider/market should not progress because it has the broadest logo slide. Suggested scorecard:

| Domain | Metric |
|---|---|
| Availability | Percentage of eligible users who receive at least one valid quote |
| Completion | End-to-end payout success rate |
| Speed | p50 and p95 time from user confirmation to usable local value |
| Cost | Total landed cost as percentage and absolute value |
| Quote integrity | Difference between quoted and received amount |
| Liquidity | Prefund utilisation, stockout rate, agent cash-availability rate |
| Reliability | Failure, timeout, duplicate, reversal, and retry rates |
| Reconciliation | Unmatched or unresolved transactions per 1,000 payouts |
| Support | Support contacts per 100 payouts and time to resolution |
| Refunds | Refund rate and p50/p95 refund time |
| Compliance | Review, rejection, and false-positive rates |
| Trust | User comprehension of provider role, timing, and finality |
| Coverage quality | Active endpoint success, not nominal country coverage |

### Proposed MVP readiness thresholds for later governance consideration

These are research hypotheses, not approved thresholds:

- one primary and one fallback payout route;
- same-name beneficiary validation available;
- total landed cost disclosed before confirmation;
- provider status and local-credit/pickup status separable;
- documented failed-payout and refund route;
- provider support escalation with transaction reference;
- daily reconciliation dry run;
- no customer-money prefunding by Hedgr;
- no unsupported “instant” or “guaranteed” claim;
- no P2P/manual OTC fallback.

---

## 15. Illustrative evidence-intake structure if separately authorized

### 15.1 Illustrative future ticket if separately authorized

```text
OFFRAMP-INTAKE-B-001 — Off-Ramp, Agency & Payout Infrastructure Evidence Intake
```

This ticket must not exist unless separately named and bounded through repo authority.

### 15.2 Illustrative workstreams

#### Workstream A — Global cash access

Candidate records:

```text
MONEYGRAM_RAMPS_CASH_PICKUP_CANDIDATE_RECORD.md
WESTERN_UNION_DIGITAL_ASSET_PAYOUT_WATCHLIST_RECORD.md
RIA_EMBEDDED_REMITTANCE_CANDIDATE_RECORD.md
```

Key questions:

- Can Hedgr support same-name self-withdrawal rather than remittance?
- Which countries and active cash locations are available?
- What chain/stablecoin is required?
- Who owns KYC, FX, settlement, agent operations, refunds, and disputes?
- What commercial minimums and integration requirements apply?

#### Workstream B — Africa mobile money and local payout

Candidate records:

```text
YELLOW_CARD_AFRICA_OFFRAMP_CANDIDATE_RECORD.md
ONAFRIQ_AFRICA_DISBURSEMENT_CANDIDATE_RECORD.md
TERRAPAY_PAYOUT_ORCHESTRATION_CANDIDATE_RECORD.md
THUNES_MULTI_RAIL_PAYOUT_CANDIDATE_RECORD.md
CELLULANT_AFRICA_DIGITAL_PAYOUT_CANDIDATE_RECORD.md
MNO_DIRECT_DISBURSEMENT_AND_PREFUND_MODEL_RECORD.md
```

Key questions:

- Which provider owns MNO commercial relationships and prefunding?
- Is stablecoin-originated payout permitted?
- Which mobile wallets and bank rails are active by country?
- What beneficiary validation and status confirmation exist?
- Can the provider support both consumer and SME users?

#### Workstream C — Emerging-market digital payout

Candidate records:

```text
DLOCAL_EMERGING_MARKET_STABLECOIN_PAYOUT_CANDIDATE_RECORD.md
PHILIPPINES_DIGITAL_OFFRAMP_ENDPOINT_RECORD.md
BRAZIL_PIX_OFFRAMP_ENDPOINT_RECORD.md
SOUTH_AFRICA_BANK_FAST_PAYMENT_ENDPOINT_RECORD.md
ARGENTINA_CBU_CVU_OFFRAMP_ENDPOINT_RECORD.md
```

Key questions:

- Can local accounts/wallets receive same-name cash-out?
- Which licensed entity performs conversion and payout?
- What FX, quote-expiry, and finality rules apply?
- What local consumer-protection and complaint routes attach?

#### Workstream D — Zambia field research

Candidate record:

```text
ZAMBIA_MNO_AGENT_LIQUIDITY_AND_OFFRAMP_FIELD_RESEARCH_RECORD.md
```

Research inputs:

- founder operating experience;
- current MNO commercial interviews;
- current prefunding and reserve terms;
- active provider and MTO coverage;
- mobile-money agent liquidity observations;
- user interviews on candidate cash-out endpoints;
- legal/compliance question pack;
- sandbox or regulator-engagement feasibility.

### 15.3 Illustrative provider evidence candidates

If separately authorized through future evidence-intake governance, provider evidence candidates could include:

- **dLocal** — LatAm/Asia/Africa digital payout and stablecoin infrastructure;
- **direct MNOs** — country-specific validation input, not an assumed base architecture;
- **MoneyGram Ramps** — current crypto-native cash pickup;
- **Onafriq** — Africa MNO and agent reach;
- **Ria** — global agent and digital payout network;
- **TerraPay** — global mobile/bank/card orchestration;
- **Thunes** — multi-market mobile/bank/cash routing;
- **Western Union** — enterprise/digital-asset-network pathway;
- **Yellow Card** — Africa stablecoin/local-fiat role.

This list is illustrative research scoping, not outreach sequencing, vendor approval, or evidence acceptance.

---

## 16. Future governance review questions

### Question 1 — Product scope

Should future governance consider a first off-ramp hypothesis limited to **same-name withdrawal**, with third-party remittance, supplier payment, payroll, and bulk disbursement excluded?

### Question 2 — Endpoint scope

Should future governance evaluate digital bank/account, mobile money/e-wallet, cash pickup, card payout, and controlled manual exception as candidate endpoint classes, with market-specific evidence determining any future primary endpoint?

### Question 3 — Liquidity ownership

Should future governance consider excluding any MVP architecture that requires Hedgr to prefund multiple local MNO or agent balances?

### Question 4 — Agency strategy

Should future governance consider cash pickup as an inclusion/fallback rail rather than a universal default?

### Question 5 — Provider research universe

Should any separately authorized provider research universe include MTOs and multi-rail payout networks alongside crypto ramp brands?

### Question 6 — Market-selection evidence weight

Should off-ramp quality carry more weight than general crypto-adoption ranking in any future market-selection review?

This question does not assign launch order, research order, or market-selection authority.

### Question 7 — Chain strategy

Should stablecoin/chain selection remain open until candidate payout-provider paths are evidenced?

### Question 8 — Bulk disbursement

Should founder insight on real-time bulk disbursement be preserved as future review context for a possible later Hedgr Pro/API lane rather than included in the first Stability Wallet MVP hypothesis?

---

## 17. Additional strategic takeaways

### 17.1 The endpoint is part of the product, not an implementation detail

A Kenya user receiving KES in M-Pesa, a Brazil user receiving BRL through Pix, and a Zambia user collecting ZMW from an agent are using materially different products, even if all three begin with USDC.

### 17.2 “Instant” usually means somebody has already funded the destination

Real-time UX is often powered by pre-positioned capital, not instantaneous cross-border settlement. Future evidence review should identify who funded the endpoint and what happens when that balance is depleted.

### 17.3 A viable provider route may be a stack, not a company

A viable route may look like:

```text
Privy wallet
→ stablecoin conversion/provider-of-record
→ global or regional payout network
→ local bank/MNO/MTO
→ user endpoint
```

The goal is not to minimize vendor count at any cost. It is to minimize **unowned responsibility gaps**.

### 17.4 Global MTOs and mobile-money networks solve different problems

- MTOs excel at regulated cross-border payout, cash distribution, and agent operations.
- MNOs excel at domestic wallet utility and last-mile digital access.
- Aggregators excel at reducing bilateral integrations and prefunding fragmentation.
- Stablecoin infrastructure providers excel at conversion and crypto settlement.

Any future Hedgr model would need a deliberate handoff between these layers.

### 17.5 Agency data can become a risk and routing signal

Over time, provider evidence could support routing based on:

- agent cash availability;
- recent success rate;
- distance;
- opening hours;
- payout limit;
- fraud history;
- refund rate.

Future Hedgr review could consider consuming such signals where providers expose them, while preserving the constraint that this artifact does not authorize Hedgr to operate an agent network in MVP.

### 17.6 Withdrawal reliability may inform future Stability Engine communication

Even while the Stability Engine remains informational, future user-facing “liquidity posture” review may consider whether a credible local exit route exists. A stablecoin balance with no reliable local payout path is not fully liquid from the user’s perspective.

This does not authorize the engine to execute or account for funds. It identifies a future informational relationship between market liquidity evidence and user-facing stability communication.

### 17.7 Failure design is a competitive advantage

Most products market the happy path. Hedgr can differentiate through:

- honest pending states;
- clear provider ownership;
- visible quote expiry;
- intelligible failed-payout explanations;
- reliable reference numbers;
- transparent refund expectations;
- calm support handoffs.

For a stability product, trustworthy failure handling may matter more than the fastest best-case payout.

### 17.8 Off-ramp evidence may need to be considered before broad wallet build-out

A governance-conservative framing:

> Building a polished multi-chain wallet before proving one reliable local exit route may create avoidable architecture, liquidity, and reconciliation risk for Hedgr.

The minimum useful proof is not “wallet created.” It is “a target user can understand and complete a compliant, same-name exit into usable local value through a provider-owned rail.”

---

## 18. Candidate relationship to the main market strategy paper

The parent wallet/rails/market strategy paper could retain its broad market and provider analysis while cross-referencing this artifact in its cash-out section.

Suggested insertion:

> **Off-ramp companion analysis:** Detailed treatment of agency networks, MNO disbursement restrictions, prefunding, cash-pickup infrastructure, global MTO APIs, multi-rail payout providers, market-specific endpoints, operating economics, and future evidence records is maintained in `docs/research/HEDGR_OFFRAMP_STRATEGY_AGENCY_AND_PAYOUT_INFRASTRUCTURE_RESEARCH.md`. That artifact remains non-authorizing and does not change any Class B evidence or readiness state.

---

## 19. Illustrative possible future repo records

Illustrative examples of possible future repo records if separately authorized through future evidence-intake governance:

```text
docs/ops/governance/class-b/evidence/offramp/
  HEDGR_CLASS_B_OFFRAMP_EVIDENCE_INDEX.md
  HEDGR_CLASS_B_OFFRAMP_RESPONSIBILITY_MATRIX.md
  HEDGR_CLASS_B_OFFRAMP_LIQUIDITY_PREFUND_EVIDENCE_RECORD.md
  HEDGR_CLASS_B_OFFRAMP_SETTLEMENT_FINALITY_EVIDENCE_RECORD.md
  HEDGR_CLASS_B_OFFRAMP_SUPPORT_REFUND_EVIDENCE_RECORD.md
  HEDGR_CLASS_B_OFFRAMP_TRUST_UX_EVIDENCE_RECORD.md

  providers/
    MONEYGRAM_RAMPS_CASH_PICKUP_CANDIDATE_RECORD.md
    WESTERN_UNION_DIGITAL_ASSET_PAYOUT_WATCHLIST_RECORD.md
    RIA_EMBEDDED_REMITTANCE_CANDIDATE_RECORD.md
    THUNES_MULTI_RAIL_PAYOUT_CANDIDATE_RECORD.md
    DLOCAL_EMERGING_MARKET_STABLECOIN_PAYOUT_CANDIDATE_RECORD.md
    TERRAPAY_PAYOUT_ORCHESTRATION_CANDIDATE_RECORD.md
    YELLOW_CARD_AFRICA_OFFRAMP_CANDIDATE_RECORD.md
    ONAFRIQ_AFRICA_DISBURSEMENT_CANDIDATE_RECORD.md
    CELLULANT_AFRICA_DIGITAL_PAYOUT_CANDIDATE_RECORD.md
    MNO_DIRECT_DISBURSEMENT_AND_PREFUND_MODEL_RECORD.md

  markets/
    PHILIPPINES_OFFRAMP_ENDPOINT_RECORD.md
    KENYA_OFFRAMP_ENDPOINT_RECORD.md
    BRAZIL_PIX_OFFRAMP_ENDPOINT_RECORD.md
    SOUTH_AFRICA_OFFRAMP_ENDPOINT_RECORD.md
    ARGENTINA_OFFRAMP_ENDPOINT_RECORD.md
    ZAMBIA_MNO_AGENT_OFFRAMP_FIELD_RESEARCH_RECORD.md
```

These records should remain separate from this research artifact. Internal analysis can frame intake questions; it cannot substitute for direct provider confirmation, qualified legal/compliance review, contractual permission, sandbox/operational evidence, or governance acceptance.

---

## 20. Source register

All external sources accessed 2026-06-26 unless otherwise noted.

- **[S1]** Kraken — “Kraken and MoneyGram partner to turn crypto into cash at global scale,” 5 May 2026. `https://blog.kraken.com/news/moneygram-partnership`
- **[S2]** Tokenized Podcast — interview with Kraken Co-CEO Arjun Sethi, 2026. `https://tokenized.simplecast.com/episodes/kraken-co-ceo-giving-everyone-billionaire-like-access-to-finance-2wVM3zD8`
- **[S3]** MoneyGram Ramps — crypto-to-cash product and developer positioning. `https://www.moneygram.com/us/en/ramps`
- **[S4]** Kraken Global Terms of Service, Annex P — MoneyGram Payout Terms; last updated 9 June 2026. `https://www.kraken.com/en-au/legal/global-terms`
- **[S5]** MoneyGram Developer — bridging-chain / USDC-Stellar integration guidance. `https://developer.moneygram.com/moneygram-developer/docs/bridging-chain-best-practice`
- **[S6]** Privy Docs — chain support and Stellar wallet support tiers. `https://docs.privy.io/wallets/overview/chains`
- **[S7]** Western Union — USDPT and Digital Asset Network announcement, 4 May 2026. `https://ir.westernunion.com/news/archived-press-releases/press-release-details/2026/Western-Union-Launches-USDPT-on-Solana-Advancing-Regulated-Digital-Infrastructure-for-Global-Payments/default.aspx`
- **[S8]** Western Union Bank — enterprise B2C/global mass-payment API information. `https://www.westernunion.com/global/en/wuib.html`
- **[S9]** Ria Money Transfer — digital partnership and API/hosted integration. `https://www.riamoneytransfer.com/en-us/become-a-digital-partner/`
- **[S10]** MTN MoMo Developer Portal — collections and business disbursement products. `https://momodeveloper.mtn.com/`
- **[S11]** Safaricom Daraja Developer Portal — M-Pesa APIs including B2C. `https://developer.safaricom.co.ke/apis`
- **[S12]** South African Reserve Bank — Payments Ecosystem Modernisation Programme. `https://www.resbank.co.za/en/home/what-we-do/payments-and-settlements/pem`
- **[S13]** Thunes Money Transfer API v2 — mobile-wallet, bank, card, and cash-pickup payout flows. `https://docs.thunes.com/money-transfer/v2/`
- **[S14]** TerraPay API Suite — payout, beneficiary, quote, FX, and status lifecycle. `https://developers.terrapay.com/docs/`
- **[S15]** dLocal — emerging-market payment, payout, and stablecoin/local-rail infrastructure. `https://www.dlocal.com/`
- **[S16]** dLocal and National Exchange — remittance payout partnership across Africa, APAC, and Latin America, 14 April 2026. `https://www.dlocal.com/press-releases/dlocal-and-national-exchange-partner-to-power-remittance-payouts-across-africa-apac-and-latin-america/`
- **[S17]** Yellow Card API Suite — stablecoin and fiat rails. `https://yellowcard.io/api-suite`
- **[S18]** Onafriq — disbursements to bank, mobile money, and offline agents. `https://onafriq.com/services/disbursements`
- **[S19]** Cellulant — African payouts. `https://www.cellulant.io/payouts/`
- **[S20]** Bangko Sentral ng Pilipinas — National Retail Payment System, PESONet and InstaPay. `https://www.bsp.gov.ph/Pages/PAYMENTS%20AND%20SETTLEMENTS/National%20Retail%20Payment%20System/Empowering-Every-Juan-and-Maria.aspx`
- **[S21]** Banco Central do Brasil — Pix information and participant framework. `https://www.bcb.gov.br/en/financialstability/pixfaqen` and `https://www.bcb.gov.br/en/financialstability/pixparticipants`
- **[S22]** Banco Central de la República Argentina — national payment methods and infrastructure. `https://www.bcra.gob.ar/billetes-monedas-y-otros-medios-de-pago/`
- **[S23]** Banco Central de la República Argentina — interoperable digital wallets. `https://www.bcra.gob.ar/billeteras-digitales-interoperables/`

### Repo-native source pointers

- `docs/doctrine/hedgr-mvp-project-specification.md`
- `docs/doctrine/hedgr-whitepaper.md`
- `docs/ops/HEDGR_STATUS.md`
- `AGENTS.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_EVIDENCE_REGISTRY.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_GOVERNANCE_EVIDENCE_PROGRAM_CLOSURE_ASSESSMENT.md`
- `docs/research/HEDGR_MVP_WALLET_RAILS_MARKET_STRATEGY_PAPER.md`

---

## 21. Non-authorization statement

This paper is a non-authorizing decision-support research artifact. It does not approve, validate, accept, or certify evidence and does not approve, activate, sequence, or implement Class B execution, evidence intake, staging, sandbox use, internal testing, live operations, deposits, withdrawals, custody, rails, stablecoin conversion, remittance, bulk disbursement, treasury operations, liquidity buffers, prefunded MNO wallets, agent operations, reconciliation operations, support operations, audit operations, ledger mutation, Copilot execution, Class C automation, external engagement, ADR acceptance, or customer-fund movement.

Any future evidence intake, provider outreach, evidence acceptance, gap closure, blocker closure, ADR drafting readiness, implementation-proposal preflight, implementation work, pilot, or customer-money activity requires separate repo-governed authorization through `docs/ops/HEDGR_STATUS.md §7` naming where applicable, a bounded `§7a` brief where applicable, qualified legal/compliance review, relevant provider and market evidence, source pointers, freshness review, conflict review, dependency review, and audit/retention controls.
