# Lane G — comparative market discovery evidence brief

**Ticket:** `GTM-MARKET-DISCOVERY-001`  
**Evidence cut-off:** 2026-09-18 (Australia/Perth); one public-source desk-research cycle  
**Owner:** Founder — Musalwa Hibajene  
**Status:** First comparative brief delivered for Founder review; further discovery paused under §7a. Terminal Founder disposition is pending.  
**Classification:** Yellow, documentation-only, decision support; no operational or Class B/C acceptance. Founder Only decision-governance classification, not a repository access-control claim.

## 1. Decision in view

**The evidence does not yet support selecting a market for Hedgr's recurring stability behaviour. Recommend REVISE MARKET SET / RETEST rather than a forced selection.** Here, retest means reconsidering the comparison around an accessible, already-earning cohort and a specific recurring decision; it does not assert that a different country is better. Ghana, Kenya and the Philippines remain unselected hypotheses. No replacement country or additional research cycle is activated.

Kenya is the clearest *next hypothesis to resolve*, based on the combination of an identifiable online-work ecosystem and an explicitly documented freelancer-to-mobile-wallet route. The Philippines is a strong counterexample: well-developed payment routes may already satisfy much of the proposed job. Ghana deserves retention as a hypothesis, but evidence of the exact cohort and its decision behaviour is thinner. These are qualitative judgments from the sources below, not country scores, demonstrated demand or an approved ranking.

The most concrete shared trigger hypothesis is: **“I check Hedgr before I decide how much of a newly available foreign-currency payment to move into local spending money.”** This sentence is an analyst hypothesis, not a participant quote or approved product copy. An alternative is checking whether an upcoming bill can be covered without exhausting a buffer. Neither behaviour has been observed in this exercise.

A meaningful country choice needs evidence that users repeatedly face this decision, can be reached under an approved protocol, and find Hedgr's interpretation useful beyond the payment tools they already use. Public infrastructure and programme pages cannot establish that combination. They do provide a bounded basis for deciding which uncertainty to resolve next.

## 2. Authority, method and limits

Research began only after activation [PR #556](https://github.com/mhibajene/hedgr-copilot/pull/556), merge `76e5f46eb3c0ab737d264c937dc29d460af17a7d`, and the separate permanent-main RAP rebind [PR #557](https://github.com/mhibajene/hedgr-copilot/pull/557), merge `14b58f9d4d0ebac4a9fe9b6c2d6e24cb8f6aa59f`. Main ancestry, deterministic projection, empty conflicts and unchanged non-executing permission flags were verified before source collection.

Controlling authority: [HEDGR_STATUS.md §7 / §7a / §283](../../HEDGR_STATUS.md), with the explicit local-only restriction lifted by the Founder. Scope is Ghana, Kenya and the Philippines; digitally paid professionals/freelancers making their own recurring cross-currency or store-of-value decisions. SME treasury, general remittance recipients and prospective trainees are not silently substituted for that cohort. Zambia is outside this comparison.

Method: targeted searches of regulators, payment-system operators, programme owners and providers, followed by direct page/PDF inspection where accessible. Apply the same five questions to each market. Prioritize publication/content dates over crawl dates. Separate:

- **Documented fact:** a regulator's published instrument, a programme's existence or a repo capability verified in its source. Publication is not proof of practical implementation.
- **Provider/programme claim:** what an operator says its service or programme does; eligibility, performance and access were not tested.
- **Inference/hypothesis:** the analyst's interpretation or proposed user behaviour.
- **Unknown:** information not established by this cycle, including Hedgr-specific permission and cohort access.

No interviews, messages, provider inquiries, negotiations, registrations, account creation, recruitment, synthetic participant tests or sensitive personal-data collection occurred. Public beneficiary stories are used only as aggregate programme evidence; names and contact details are not copied. No participant responses were reanalysed. This is not a legal opinion or a licence audit. Search coverage is bounded and cannot establish the absence of later instruments, suspensions or providers.

## 3. Like-for-like comparison

| Question | Ghana | Kenya | Philippines |
| --- | --- | --- | --- |
| **User: identifiable and reachable?** | Kukun explicitly describes a freelancer community; Impact Hub Accra describes an innovation community. These are potential access points, not a verified roster of foreign-paid earners. [S01–S02] | Ajira-linked government programmes identify an online-work ecosystem. It remains necessary to distinguish established earners from people training or seeking work. No gatekeeper has agreed access. [S07] | DICT's SPARK programme has reported graduates obtaining freelance clients. This supports cohort existence in a particular programme, not its present size, income currency or consent to research. [S11] |
| **Behaviour: recurring trigger?** | Newly available platform income followed by a GHS withdrawal is plausible because a local-bank payout route is documented. Recurrence, buffer size and willingness to delay conversion are unknown. [S03] | Releasing platform earnings to M-PESA before local expenses is a concrete candidate decision. Existing convenience could also remove the need for another app. [S08–S09] | Allocating incoming foreign income between a retained balance and PHP cash-in is plausible. Existing GCash/Payoneer features make both the behaviour and the competitive alternative concrete; use frequency is unverified. [S12–S13, S18] |
| **Product fit: current stability proposition?** | Hypothesis: understand available spending money and retained buffer, including two-way FX movement. No evidence that the present synthetic display changes a real decision. | Hypothesis: interpret position before a familiar withdrawal decision. A payment instruction or cheaper transfer is not something the current Hedgr journey provides. | Hypothesis: distinguish income, local spending capacity and buffer changes across familiar accounts. Incremental usefulness over existing account displays is especially unresolved. |
| **Market operability: later-pilot path?** | Domestic interoperability exists; the VASP framework is being operationalized. Current application detail and the exact service perimeter need verification. Domestic payment access does not establish international funding or virtual-asset exit permission. [S04–S05] | July 2026 gazetted VASP regulations provide a more concrete diligence starting point than the older draft. They do not establish any provider's current licence or Hedgr's eligibility. [S10] | Documented local payout options and regulatory categories exist, but the retrieved new-VASP-licence moratorium and offshore-access restrictions are material constraints. A local partner category is not permission to operate through it. [S14–S17] |
| **Distribution: realistic initial route?** | A small, consent-based introduction through a relevant coworking/community operator is plausible, subject to separately approved outreach and actual cohort screening. Reachability is unproved. | An approved approach to a digital-work community operator could identify already-earning freelancers. Government programme scale is not a recruitment commitment or acquisition channel. | A regional SPARK alumni/community route could be investigated later. Reported programme success cannot be converted into participant access or expected conversion rates. |

No market has demonstrated Hedgr demand, an agreed recruitment route or verified end-to-end operability. None is labelled launch-ready. The distinction between **a publicly identifiable access point** and **a cohort demonstrably reachable by Hedgr** remains unresolved in all three.

## 4. Market-specific evidence and contrary cases

### Ghana

**Documented setting.** GhIPSS describes wallet-to-wallet and bank/wallet interoperability [S04]. Upwork lists GHS local-bank withdrawals [S03]. Together these support an existing-income/local-spending context; they do not prove that any bank account connects through every proposed path, or that a Hedgr provider could use it.

**Contrary evidence.** A permanent local-currency-decline story would be misleading. The Bank of Ghana's January 2026 release reports cedi appreciation in 2025 after depreciation in 2024 [S06]. That historical reversal supports testing decisions under changing conditions, not predicting FX or claiming USD protection. The current synthetic FX fixture must not be used as evidence of Ghanaian purchasing power or returns.

**Trust and operability.** The BoG virtual-assets page identifies Act 1154 and includes custodial and non-custodial wallet providers among activities requiring registration/licensing. At retrieval, its application section still indicated availability by the end of Q3 2026 [S05]. This is an information gap, not proof that applications are impossible. Identity, fraud, recourse, safeguarding and service responsibility remain diligence questions. No Ghana-specific user trust preference was established.

**Conditional later architecture.** Existing foreign client/platform → authorized payment/remittance or banking provider → user's Ghana bank account → domestic wallet/bank interoperability. A virtual-asset route would add separately evidenced custody/conversion and settlement responsibilities. This is a dependency sketch; no common API, commercial acceptance, end-to-end service level or Hedgr admission was verified.

**Decision blocker.** Neither coworking/community evidence nor currency history establishes a sufficiently reachable set of recurring foreign-income decision-makers. Ghana is a credible hypothesis with weak direct behavioural evidence, not a rejected market.

### Kenya

**Documented setting.** The ICT ministry describes Ajira/Jitume as existing digital-work initiatives [S07]. Upwork explicitly documents M-PESA as a withdrawal method for Kenyan freelancers, subject to matching verified names and setup requirements [S08]. Its timing guidance also allows delayed withdrawals and additional provider charges [S09]. This supports a specific pre-withdrawal decision context while challenging any assumption that payout is invariably immediate.

**Regulatory correction.** CMA publishes the final VASP Regulations as Legal Notice 134 in the Gazette Supplement dated 22 July 2026 [S10]. The March draft and November 2025 “licensing will commence upon regulations” notice are historical, not the current endpoint. The final instrument covers licensing, consumer assets, marketing and other controls. Hedgr's perimeter, admissible counterparties and present licensing status are unresolved; historical Kenya counsel remains **DEFER**.

**Contrary evidence and trust.** A familiar direct payout route may already be sufficient. Another interpretation surface could add work without improving the decision. Delayed access, identity mismatches and the distinction between provider status and spendable money are concrete operational questions; their salience to this cohort is unmeasured. No FX forecast or assertion of inevitable shilling depreciation is used.

**Conditional later architecture.** Existing platform/client income → a verified payout/FX provider → user M-PESA or local bank endpoint. An optional virtual-asset path would separately require appropriate wallet/custody/conversion permissions and liquidity evidence. Neither Upwork's retail route nor an M-PESA endpoint is evidence of an integration Hedgr can obtain.

**Decision blocker.** Kenya offers the most specific next hypothesis in this review, but not confirmed access to suitable earners or evidence that they need Hedgr before withdrawal. This does not justify selecting Kenya simply because the route is legible.

### Philippines

**Documented setting.** The PIA describes a 2025 SPARK cohort with graduates obtaining freelance clients [S11]. GCash documents cash-in from linked Payoneer accounts and a Virtual US Account receiving route [S12–S13]. BSP's 2025 e-payments report records 64.7% of retail payment volume as digital [S14]; that broad aggregate says nothing about this cohort's demand for Hedgr.

**Contrary evidence.** Existing tools already address receipt, holding and conversion. Payoneer's general freelancer offering explicitly markets these functions [S18]. Hedgr would need evidence that its interpretation of stability adds value, rather than assume that foreign income creates unmet demand. Account limits, identity requirements, spreads and timing still matter, but they do not by themselves prove product fit.

**Trust and operability.** BSP M-2025-031 continues the moratorium on new VASP licences from September 2025 [S15]. The retrieved January 2026 supervisory reminder distinguishes permitted regulated counterparties and restricts retail access to offshore VASPs without BSP/SEC registration [S16]. These are diligence constraints, not a determination that a particular Hedgr model is permissible or forbidden. The available VASP directory is dated October 2025 [S17]; named entries cannot be represented as freshly reverified in September 2026. Consumer-protection/cybercrime concerns and redress responsibility require attention; no cohort trust study was performed.

**Conditional later architecture.** Existing platform/client → a supported foreign-income provider → PHP bank/e-money endpoint, using applicable domestic payment arrangements. If virtual assets were involved, a separately verified local regulated service and precise responsibility split would be required. GCash/Payoneer documentation is a user-route benchmark, not a partnership offer or assurance of availability to every freelancer.

**Decision blocker.** There is a plausible cohort and documented infrastructure, but differentiation and exact legal/provider scope remain unresolved. Strong payment adoption is both an enabling condition and evidence of credible substitutes.

## 5. Fit with the canonical journey and existing evidence

The binding [financial-grammar doctrine](../../../doctrine/hedgr-familiar-financial-grammar-and-infrastructure-abstraction.md) centers understanding financial position, change and options. The [frozen canonical story](../../../strategy/narrative/HEDGR_CANONICAL_STORY.md) remains non-authorizing. The older [wallet/rails market paper](../../../research/HEDGR_MVP_WALLET_RAILS_MARKET_STRATEGY_PAPER.md) is background only: its wider country set, SME scope and provider examples are not adopted here.

| Journey stage | Candidate relevance to the recurring decision | Evidence limit |
| --- | --- | --- |
| Entry | A person arrives around an actual income-release or bill event. | No source establishes that this event causes a Hedgr visit. |
| Orientation | Understand the informational/simulated exercise before acting. | Local wallet familiarity cannot substitute for comprehension. |
| Stability | Read the position and buffer in familiar money terms. | Current state is synthetic, not a live view across real accounts. |
| Insight | Interpret a change and its relationship to planned spending. | Fixed illustrative FX comparisons are neither predictions nor proof of value preservation. |
| Safe action | Consider the implications of a choice. | Current simulated actions do not transfer funds or provide an executable provider quote. |

The current [display-currency source](../../../../apps/frontend/lib/state/simulation-display-currency.ts) includes GHS, KES and PHP as fixed illustrative fixtures. That removes no market/legal barrier and does not authorize localization work. [Home QA](../../product-finish/SYNTHETIC_HOME_POLISH_QA.md) establishes bounded technical verification, expressly not comprehension or demand. No production QA result is repurposed as market evidence. Lane V's phone rehearsal, instrument and publication/distribution conditions remain unchanged.

## 6. What would change the decision

These are unresolved questions for Founder consideration, **not an activated protocol or outreach plan**.

| Gap | Evidence that could resolve it under separate authority | Consequence if unresolved |
| --- | --- | --- |
| Actual access | A willing, appropriately authorized gatekeeper and consent-based route to already-earning professionals matching the cohort. | A community's existence remains only a source pointer. |
| Recurring trigger | Recent concrete decisions about received income, local spending and retained buffers, including cases where no decision was needed. | Do not infer a habit from digital-payment adoption. |
| Incremental fit | Evidence that existing tools leave a consequential interpretation problem and that the canonical journey helps explain it. | Stop or revise if the need is only faster/cheaper transfer or FX timing. |
| Trust | What users believe Hedgr holds, promises and can do; who resolves a failed payout; willingness to use an informational service. | No trust claim based on familiar wallet vocabulary. |
| Later-pilot perimeter | Scoped legal assessment of exact activities, entity, promotion, data, custody, conversion and outsourcing roles. | No regulatory-readiness or licensed-provider-coverage claim. |
| Funding and exit | Counterparty-specific eligibility, terms, settlement/finality, liquidity, all-in costs, reversals and support ownership. | No partner or end-to-end operability claim. |

Uncommitted categories for later diligence are domestic banks, regulated payment/remittance firms, e-money issuers, appropriately licensed VASPs if needed, and community/programme gatekeepers. No named institution is selected or contacted. The [off-ramp framework](../offramp/HEDGR_OFFRAMP_GOVERNANCE_FRAMEWORK.md) remains controlling for distinguishing route presence from executable exit. This research does not move any Class B Evidence Registry item or close a blocker.

If the Founder chooses to prioritize one hypothesis for separate follow-up, Kenya's platform-income → M-PESA/local-spending decision is the narrowest starting point supported here. The Philippines should remain a deliberate substitute challenge; Ghana should not be selected on a one-direction currency narrative. If later evidence shows no recurring interpretation problem, **stop** is preferable to manufacturing one.

## 7. Source register and freshness

All links were inspected through public web retrieval/search on **2026-09-18**. “Undated” means the page exposed no reliable publication date. Provider documents describe their own products only. Search-index excerpts are explicitly marked where direct retrieval failed; none establishes current legal approval or tested service availability.

| ID | Primary source and date | Supports / limitations |
| --- | --- | --- |
| S01 | [Kukun, Accra](https://www.kukun.co/), undated | Operator-described freelancer/coworking community; no verified user count, income profile or research access. |
| S02 | [Impact Hub Accra](https://accra.impacthub.net/), undated | Innovation-community access point; global network figures are not Ghana cohort estimates and are not used. |
| S03 | [Upwork — Direct to Local Bank](https://support.upwork.com/hc/en-us/articles/211063888-How-to-withdraw-earnings-with-Direct-to-Local-Bank), undated | Lists GHS/KES/PHP; provider-reported local-bank route and eligibility caveats, not universal availability or Hedgr access. |
| S04 | [GhIPSS — Mobile Money Interoperability](https://ghipss.net/our-services/real-time-payments/mobile-money-interoperability/), undated | Domestic network/bank-wallet functions; no inference of cross-border/virtual-asset authorization. |
| S05 | [Bank of Ghana — Virtual Assets](https://www.bog.gov.gh/virtual-assets/), undated live page | Act 1154, regulated categories and incomplete application section; not a verified operational licence register. |
| S06 | [BoG — January 2026 MPC release](https://www.bog.gov.gh/wp-content/uploads/2026/01/MPC-Press-Release-January-2026-.pdf), January 2026 | Indexed primary-source excerpt reports 40.7% cedi appreciation in 2025 versus 19.2% depreciation in 2024. Direct PDF open timed out. Used only as a historical contrary case, not current rates or forecast. |
| S07 | [Kenya ICT Ministry — Digital Outsourcing Initiative](https://ict.go.ke/kenya-launches-digital-outsourcing-initiative-create-jobs-youth), 22 May 2026 | Indexed government article identifies Ajira/Jitume and online-work objectives; direct reopen returned 502. Programme claims do not verify sustained earnings. Ajira's indexed community counters were excluded as unsuitable cohort estimates. |
| S08 | [Upwork — M-PESA withdrawals](https://support.upwork.com/hc/en-us/articles/115001615647-How-to-use-M-Pesa-to-withdrawal-your-earnings), undated | Kenya freelancer route, identity/setup conditions; not a universal transaction entitlement or Hedgr integration. |
| S09 | [Upwork — M-PESA timing and fees](https://support.upwork.com/hc/en-us/articles/115001615787-What-are-the-M-Pesa-fees-and-timing-for-withdrawals), undated | Possible delays up to five business days and additional provider costs; no all-in quote assumed. |
| S10 | [CMA — final VASP Regulations 2026](https://www.cma.or.ke/download/34/regulations/6377/the-virtual-asset-service-providers-regulations-2026.pdf), Gazette 22 July 2026; posted 27 July | Final legal instrument, especially cover, Part II and consumer/marketing provisions. Supersedes use of the March draft as the latest available instrument. No provider licence or Hedgr legal conclusion follows. |
| S11 | [PIA — DICT SPARK graduate report](https://pia.gov.ph/news/graduates-thank-dict-program-for-digital-work-opportunity/), 13 August 2025 | Government-reported local examples of earning freelancers; selective programme report, not representative labour-market or demand research. |
| S12 | [GCash — Payoneer cash-in](https://help.gcash.com/hc/en-us/articles/900002482806-How-to-cash-in-through-Payoneer), undated | Linked-account cash-in and wallet limits; stated timing is not independently measured. |
| S13 | [GCash — Virtual US Account receipts](https://help.gcash.com/hc/en-us/articles/51503049335833-How-to-receive-USD-funds-in-GCash-Virtual-US-Account), undated | Advertised foreign-income receipt/conversion alternative. User eligibility, custody terms and present feature access were not tested. |
| S14 | [BSP — 2025 E-payments Measurement](https://www.bsp.gov.ph/PaymentAndSettlement/2025_Report_on_E-payments_Measurement.pdf), 2025 observation period; publication date not established | PDF pp. 5–6: broad retail payment volume; not freelancer prevalence, savings behaviour or Hedgr demand. |
| S15 | [BSP M-2025-031](https://www.bsp.gov.ph/Regulations/Issuances/2025/M-2025-031.pdf), August 2025; effective 1 September | Continues new-VASP-licence moratorium, subject to reassessment. No rescission was identified in this bounded search; absence is not exhaustive legal verification. |
| S16 | [BSP M-2026-003](https://www.bsp.gov.ph/Regulations/Issuances/2026/M-2026-003.pdf), January 2026 | Supervisory counterparty/retail offshore-access constraints, especially p. 1. Exact application to a future Hedgr structure requires scoped diligence. |
| S17 | [BSP VASP directory](https://www.bsp.gov.ph/Lists/Directories/Attachments/19/VASP.pdf), as of 15 October 2025 | Historical regulated-entity pointer; current standing, activity scope and willingness to serve Hedgr not verified. |
| S18 | [Payoneer — Freelancer offering](https://www.payoneer.com/freelancer/), undated | Advertised hold/convert/withdraw substitute; broad availability marketing is not country-specific approval or demand evidence. |

**Source challenges resolved or retained.** Kenya's March draft was replaced by the July gazetted instrument in the analysis. A BoG BrijX page showed recent adjacent-news dates but linked to a 2025 notice; it was excluded from claims about September 2026 approvals. A Safaricom PayPal terms PDF returned 403 on direct retrieval; no fee claim from it is used. Ajira's live page did not reliably render on reopening; no membership/centre count is used. Older Upwork search results conflicted with newer fee text, so no fee comparison was built. The dated BSP directory is not silently treated as current. The Ghana MPC and Kenya ministry retrieval limitations remain visible above.

## 8. Review, delivery and required Founder disposition

Author review checked the same five questions for all markets, source-to-claim support, dates, contrary evidence, fixed-fixture limitations and the distinction between recommendation and authority. No independent human or legal validation is claimed. Local delivery checks passed: all relative repo links resolve, source IDs cover S01–S18, git diff --check is clean, and full pnpm run validate passes (900 frontend tests, 41 Bridge tests, typecheck/lint and repository checks; unchanged test results reused from cache). The change is this research document only; authority sources, RAP and runtime are unchanged. Hosted checks and convergence review are tracked in the delivery PR. No additional research is implied by review or delivery.

**Founder decision pending:** choose **select**, **revise market set**, or **stop** in HEDGR_STATUS.md §283. The recommendation here is **revise market set / retest**, with no automatic second cycle. A Founder selection would identify only a strategic candidate for separately governed consideration; it would not authorize launch, pilot, outreach, recruitment, product changes, counsel engagement or financial activity.

At delivery of this first brief, further discovery is paused by the ticket's existing milestone condition. Lane G remains awaiting Founder disposition; it is not declared successfully closed. Lane V/E authority, paused participant publication/distribution, frozen About, retired Green delegation and all financial boundaries remain unchanged. **NO CROSS-LANE IMPACT.**
