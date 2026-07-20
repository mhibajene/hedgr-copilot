# Hedgr MVP Narrative Consistency Review — 2026-07-20

| Field | Value |
| ----- | ----- |
| **Status** | Founder Accepted in principle |
| **Authority** | Non-authoritative governance assessment |
| **Classification** | Class A narrative / comprehension review |
| **Surfaces reviewed** | Shipped Stability Wallet product copy (dashboard, engine notices/explainers, trust, deposit/withdraw, Copilot, settings, empty states) |
| **Primary lens** | `docs/strategy/website/HEDGR_NARRATIVE_STYLE_GUIDE.md` v1.0 (Frozen) |
| **Doctrine anchors** | Constitutional Charter; UX Constitution + Addendum; MVP Project Specification; `.cursorrules` language guardrails |
| **Date** | 2026-07-20 |
| **Founder disposition** | Accepted in principle; no implementation authority created |

This record strengthens an earlier Style Guide–based MVP copy review with Founder feedback. It does **not** name or activate a ticket, alter `HEDGR_STATUS.md` **§7** / **§7a**, redefine doctrine, authorize publication, or change product behaviour.

---

## 1. Primary uncertainty

**Does the shipped copy consistently teach that Hedgr is a stability product rather than a yield product?**

That is the governing question for this review.

It is a product-comprehension question. It does not change execution authority, custody, rails, accounting truth, or financial behaviour. Recommended refinements, if later authorised, would remain copy-level, reversible, and subordinate to existing doctrine.

Green Lane classification may describe the *class* of such work later. Classification alone does **not** activate work and does **not** override **§7** / **§7a**.

---

## 2. What this review affirms

1. **Identity protection.** Copilot framing that teaches “grow money through DeFi yield” is a narrative integrity failure, not a wording preference.
2. **Language drift, not feature drift.** The findings ask for calmer language, clearer explanation, terminology alignment, and less institutional phrasing. They do not ask for new capabilities.
3. **First-time comprehension.** “Explain before name” protects the user’s first question: *Is my money okay?* Internal names such as “Stability Engine” should follow that answer, not precede it.

---

## 3. Constitutional anchors

Major findings are anchored to doctrine, not only to the Narrative Style Guide.

| Finding class | Governing authority | Binding posture |
| ------------- | ------------------- | --------------- |
| Preservation before growth | Constitutional Charter; MVP Project Specification; Customer One-Pager v1.0 | Capital preservation above yield; stability before speculation |
| Allocate over Earn | UX Constitution Addendum; MVP Project Specification; `.cursorrules` | Prefer **Allocate** over **Earn**; yield is enhancement, not entitlement |
| DeFi as infrastructure, not narrative | UX Constitution (“Banned from primary UI”: DeFi jargon, competitive yield language); MVP Specification (not a generic DeFi / yield-chasing product) | DeFi may exist as plumbing; it must not teach the product story |
| Explain before technical language | UX Constitution (plain language; every term earns its place; explanation before interaction) | Users should understand the idea before meeting institutional names |
| Advisory Copilot | UX Constitution (advisory, never directive); MVP Specification; Copilot advisory-lane governance | Copilot educates and explains; it must not rebrand Hedgr as a yield product |
| Calm / no urgency | UX Constitution; Narrative Style Guide; `.cursorrules` | Writing reduces pressure; silence is acceptable |
| Informational engine / non-accounting | ADRs 0013–0015; Sprint 2 posture | Trust language must remain informational and non-promissory |

The Narrative Style Guide preserves **voice**. Doctrine preserves **identity and product truth**. Where voice and doctrine meet, doctrine wins.

---

## 4. Narrative integrity findings (structural)

### 4.1 Copilot product identity — P0

**Finding:** Stub Copilot copy describes Hedgr as helping users “grow your money safely through DeFi yield opportunities.”

**Why this matters:** If Copilot teaches growth-through-DeFi at first contact, the product teaches the wrong mental model. That conflicts with preservation-before-growth, stability-before-speculation, and DeFi-as-infrastructure-not-narrative.

**Disposition:** Treat as **narrative integrity**, not cosmetic rewrite.

**Direction if later authorised:** Rewrite Copilot identity language to stability, clarity, access, and calm decision support. Keep the advisory / not-financial-advice boundary. Do not use DeFi yield as the product headline.

### 4.2 “Earn” terminology — P0 narrative debt

**Finding:** Gated nav and related vocabulary still teach **Earn**. User-facing **Allocate** is absent. APY appears as contextual chrome when the earn surface is enabled.

**Why this matters:** Repeated “Earn” language trains users to classify Hedgr with generic yield products. That is product-identity drift, not synonym preference.

**Disposition:** Treat **Earn** as **narrative debt** against the UX Constitution Addendum and MVP language rules.

**Direction if later authorised:** Retire or replace Earn-facing labels with allocate / structure / stability language consistent with doctrine. Keep any yield reference subordinate and non-promissory. Do not widen earn capability by renaming alone.

---

## 5. User understanding findings

### 5.1 Explain before name

Institutional labels often arrive before customer understanding:

- Stability Engine
- Conservative yield
- Informational targets
- Posture badges (`NORMAL` / `TIGHTENING` / etc.)

Users need: *Is my money okay?* Then: *What does this structure mean?* Only then: optional system naming.

### 5.2 Four-question screen test (single narrative pass)

Rather than isolated edits across Dashboard, Copilot, empty states, Settings, and notices, any later authorised work should be framed as **one bounded customer-language consistency pass**.

Every reviewed screen should answer, consistently:

1. What am I looking at?
2. Why does it matter?
3. What can I safely do?
4. What happens if I do nothing?

If those answers remain stable across surfaces, narrative drift becomes harder to reintroduce.

---

## 6. Trust language findings

Shipped engine and trust copy is largely caution-first and anti-accounting. That is a strength.

Remaining trust-language risk is density and institutional phrasing: long disclaimer stacks, repeated “informational / not ledger” clauses inside single sentences, and technical settings labels (e.g. DeFi Provider) appearing as primary customer language.

Refine for comprehension and spoken rhythm. Do not weaken risk visibility or informational boundaries.

---

## 7. Editorial findings (subordinate)

Em dashes appear widely in shipped user-facing copy. The Narrative Style Guide asks public-facing writing to prefer commas, full stops, and sentence restructuring.

**Founder priority adjustment:** Em dashes are worth cleaning, but they are editorial. They rank below identity, understanding, and trust language.

---

## 8. Priority order if constrained

Optimise in this order:

1. **Product identity** — Copilot framing; Earn-as-yield-product teaching
2. **User understanding** — explain before name; four-question consistency
3. **Trust language** — clearer, calmer, still non-promissory
4. **Editorial consistency** — em dashes and spoken rhythm polish

---

## 9. Recommended future shape (non-activating)

If a future Founder-approved ticket is named under **§7** / **§7a**, prefer:

**One customer-language consistency pass** across shipped Stability Wallet surfaces, judged against the four product questions, with Copilot identity and Earn terminology treated as integrity gates.

Do **not** sequence that work from this file. Do **not** treat this review as Green Lane activation. Do **not** edit frozen Canonical Story, Customer One-Pager, or Narrative Style Guide under this assessment.

Out of scope for any such pass unless separately authorised:

- marketing website / landing narrative
- doctrine or ADR changes
- live capability, custody, rails, or execution semantics
- changing informational allocation bands into accounting truth

---

## 10. Surfaces in evidence scope

| Surface | Narrative role | Integrity note |
| ------- | -------------- | -------------- |
| Dashboard hierarchy | Primary comprehension surface | Strong order; institutional naming still early |
| Engine notices / explainers / guidance | Trust + understanding | Caution-first; often written, not spoken |
| Trust disclosures / settings | Trust boundary | Simulation honesty strong; some DeFi jargon |
| Deposit / withdraw | Safe action language | Mostly plain and calm |
| Copilot | Product identity teacher | Stub growth/DeFi framing is the top integrity failure |
| Earn nav / APY chrome | Product classification teacher | Narrative debt if left as Earn |
| Landing (`pages/index.tsx`) | Not a narrative surface today | Defer until website work is separately named |

---

## 11. Founder decision

| Question | Answer |
| -------- | ------ |
| Accept review in principle? | **Yes** |
| Implementation authority created? | **No** |
| Founder decision required now? | **No** |
| When would Founder decision become necessary? | Only if a future implementation proposal seeks to change product terminology, narrative sources, or other doctrine-governed behaviour beyond current canonical authority |

---

## 12. Disposition

**Founder / HedgrOps disposition:** `Accepted in principle` as a read-only governance assessment (2026-07-20).

**Execution disposition:** Founder-authorized activation and execution as `UI-NARR-001` under Controlled Parallelism v16 / Internal **D-052** (**§165** / **§166**). Copy-only customer-language consistency pass completed; singular-ticket `CLASS-A-VAL-002` restored. This review artifact remains non-authorising for further work.

Retain the original Style Guide review largely as written, strengthened by:

- anchoring major findings to constitutional doctrine;
- elevating Copilot identity and Earn terminology to narrative integrity issues;
- grouping remaining refinements under a single customer-language consistency pass against the four product questions;
- ranking editorial punctuation below identity, understanding, and trust language.

---

## Review stack used

1. Founder feedback on MVP Narrative Style Guide review (2026-07-20)
2. `docs/strategy/website/HEDGR_NARRATIVE_STYLE_GUIDE.md` v1.0 (Frozen)
3. `docs/strategy/customer/HEDGR_CUSTOMER_ONE_PAGER.md` v1.0 (Frozen)
4. `docs/doctrine/hedgr-ux-constitution.md`
5. `docs/doctrine/hedgr-ux-constitution-addendum.md`
6. `docs/doctrine/hedgr-mvp-project-specification.md`
7. `.cursorrules` language and product invariants
8. Shipped MVP product copy under `apps/frontend/` (read-only inspection)
9. `docs/ops/HEDGR_STATUS.md` sequencing / non-authorization posture
