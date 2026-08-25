# Hedgr Familiar Financial Grammar and Infrastructure Abstraction

**Status:** Binding product doctrine

**Owner:** Founder

**Adoption decision:** Internal **D-087** / `docs/ops/HEDGR_STATUS.md` **§219**

**Date adopted:** 2026-08-25

**Visibility:** Internal operating doctrine

---

## 1. Authority boundary

This doctrine governs Hedgr's primary customer-facing product meaning, interaction grammar, and infrastructure-abstraction posture.

It clarifies how existing system architecture should be presented to ordinary financial users. It does not replace the Constitutional Charter, weaken the UX Constitution, alter the Stability Engine, or change the three canonical product surfaces.

This doctrine does **not** by itself:

- activate or amend a ticket;
- authorize interface or survey changes;
- reopen `CLASS-A-VAL-002-ORIENT-002`;
- modify `CLASS-A-VAL-002-GRAMMAR-001` or any other active brief;
- unfreeze or publish a narrative source;
- adopt a public category name;
- change custody, settlement, rail, asset, provider, accounting, engine, or execution authority; or
- make future infrastructure current product capability.

Implementation remains controlled by `docs/ops/HEDGR_STATUS.md` **§7** / **§7a** and `AGENTS.md`.

## 2. Core doctrine

> **Users should understand what Hedgr does without needing to understand how Hedgr does it.**

> **Borrow the interaction. Own the meaning. Abstract the infrastructure.**

Hedgr should be designed for ordinary financial users first.

Blockchain, stablecoins, DeFi protocols, tokenised real-world assets, chains, bridging, yield routing, open-banking connections, payment rails, and related mechanisms are internal-facing implementation concerns by default. They should appear in the customer experience only when transparency, consent, regulation, trust, auditability, or an advanced-user need makes them relevant.

Infrastructure abstraction must contain complexity, not conceal material truth.

## 3. Durable customer role

Hedgr is not primarily a crypto wallet, blockchain product, stablecoin application, trading platform, investment app, or yield product. Those labels may describe mechanisms or individual capabilities. They do not define the customer relationship.

Hedgr's durable role is:

> **Help people understand and maintain their financial stability as their money, income, and environment change.**

The product should help a person answer:

- Where do I stand?
- What changed?
- What does that change mean?
- Is anything important requiring my attention?
- What position am I trying to build toward?
- What options can I safely consider next?

Hedgr owns the intelligence and interpretation between the customer and the underlying financial rails.

Financial stability is the durable customer outcome. Preserving value is a major and recognisable entry-point benefit, especially under currency weakness, FX volatility, or infrastructure limitations, but it is not the complete customer-facing category.

This distinction does not weaken Hedgr's higher-order **Capital Preservation Above All**, safety-over-yield, liquidity-first, or stability-before-speculation invariants. It separates an institutional risk constraint from the breadth of the customer problem Hedgr may ultimately help address.

## 4. Product hierarchy

Customer-facing experiences should resolve in this order:

1. **Financial outcome** — lead with the user's problem and the stability benefit.
2. **Familiar financial grammar** — use learned interaction patterns when their meaning is compatible with Hedgr.
3. **Hedgr-owned meaning** — introduce distinctive concepts only where Hedgr creates genuinely new user value.
4. **Infrastructure** — reveal implementation detail when it becomes useful or necessary.

The intended narrative progression is:

> **What Hedgr helps with → what you have → what changed → what it means → what you are aiming toward → what you can consider next**

Users should not need to understand:

> stablecoin → blockchain → protocol → yield source → settlement architecture

before understanding why Hedgr is useful.

## 5. Familiar financial grammar

Novel capability does not require novel interaction.

Where an established financial pattern communicates Hedgr's intended meaning honestly, prefer familiarity over invention. Candidate patterns include:

- balance;
- activity and history;
- account state;
- planning summaries;
- explanatory insights;
- next-step cards; and
- familiar navigation.

For every candidate interaction, ask:

> **What does an ordinary user already believe this pattern means?**

If that learned meaning is compatible with Hedgr's intended meaning, reuse the pattern. If it materially conflicts, select another interaction rather than attempting to retrain the user with explanatory copy.

> **Do not create cognitive novelty where familiar and honest interaction grammar already exists.**

Reference research such as Mobbin is a positive translation system and evidence input, not implementation authority or a design standard.

## 6. Hedgr-owned meaning

Hedgr should reserve proprietary language for concepts that create genuinely different and useful meaning. Current candidate areas include:

- Now / Reserve / Growth;
- stability interpretation;
- liquidity and exit readiness;
- what deserves attention;
- stability-oriented guidance; and
- future intelligent orchestration across financial rails.

These concepts must remain explainable in ordinary language. Participants do not need to repeat Hedgr terminology to demonstrate comprehension.

## 7. Customer, reasoning, and infrastructure layers

### Customer sees

- what they have;
- what changed;
- what Hedgr notices;
- what position they are trying to build;
- what deserves attention; and
- what they may safely consider next.

### Hedgr reasons about

- financial state;
- purchasing-power exposure;
- FX risk;
- liquidity and runway;
- reserve requirements;
- allocation logic;
- exit readiness; and
- appropriate action or abstention.

### Infrastructure handles

- settlement;
- custody architecture where applicable;
- stablecoin rails;
- blockchain networks;
- DeFi protocols;
- tokenised assets;
- yield routing;
- bridging;
- payment connectivity; and
- banking and open-finance integrations.

This layered model describes responsibility and disclosure order. It does not assert that any future mechanism is implemented, approved, or available.

## 8. Trust and transparency boundary

Infrastructure abstraction must never become infrastructure concealment.

Where a user needs to understand where value is held, who controls it, what risks exist, how returns are generated, what execution occurred, or what Hedgr can and cannot guarantee, the relevant information must remain accessible, timely, and truthful.

The preferred disclosure model is:

> **Outcome first → explanation second → infrastructure on demand**

Mandatory disclosure, consent, risk, custody, execution, and compliance information must not be hidden behind progressive disclosure when it is material to the immediate decision.

## 9. Product-validation interpretation

When participants categorise Hedgr as crypto, trading, investing, a digital wallet, or return maximisation, do not infer that familiar financial patterns are unsuitable without further evidence.

First test whether participants encountered system concepts before they understood Hedgr's role in their financial life. The priority order for a bounded comprehension revision is:

1. **Value clarity**
2. **Familiarity**
3. **Semantic integrity**

The strongest unaided checks remain:

1. What is Hedgr?
2. What happened to the simulated money?
3. What is the difference between the balance and the targets?

A future comprehension test may evaluate the following hypothesis only after separate repo-native activation of the relevant implementation and instrument scope:

> **If Hedgr leads with a clear financial-stability benefit and uses familiar financial patterns to communicate current state, change, interpretation, and planning, low-familiarity users will understand what Hedgr is for without primarily categorising it as a crypto, trading, or return-maximisation product.**

Additional evidence may test whether users understand Hedgr as helping them interpret position, recognise meaningful change, maintain or improve stability, plan rather than assume automatic allocation, understand information without guarantees, and consider options without pressure.

Participant evidence remains decision support. It does not modify this doctrine, activate implementation, or prove comprehension without a separately governed disposition.

## 10. Continuing product rules

- The rails are internal; the financial experience is external; Hedgr owns the intelligence between them.
- Blockchain and stablecoins must not define primary product language.
- Crypto terminology should not enter the primary journey unless it is necessary to the immediate user decision, disclosure, consent, trust, or compliance requirement.
- Familiar financial patterns should be reused deliberately where their learned meaning is compatible with Hedgr.
- Hedgr-specific language should be reserved for differentiated concepts that create genuine user value.
- Financial stability remains the durable customer outcome.
- Preservation of value remains a major entry-point benefit, not the complete product category.
- Infrastructure must remain progressively transparent without becoming the cognitive burden of the primary experience.
- A future infrastructure change should not require Hedgr to reinvent its customer-facing identity.

## 11. Revisit and supersession

Revisit this doctrine if governed evidence shows that its hierarchy consistently produces material category confusion, hides information required for trust or consent, weakens risk comprehension, or conflicts with higher-precedence doctrine or accepted legal and regulatory requirements.

Do not silently weaken disclosure or rewrite this doctrine through product copy. Any change to its meaning or active-doctrine status requires a new Founder decision and repo-governed update to the Active Doctrine Index and precedence chain.

## 12. Related authority

- `.cursorrules`
- `docs/doctrine/HEDGR_ACTIVE_DOCTRINE_INDEX.md`
- `docs/doctrine/hedgr-constitutional-charter.md`
- `docs/doctrine/hedgr-ux-constitution.md`
- `docs/doctrine/hedgr-product-surfaces.md`
- `docs/doctrine/hedgr-mvp-project-specification.md`
- `docs/doctrine/hedgr-whitepaper.md`
- `docs/ops/HEDGR_STATUS.md`
- `AGENTS.md`
