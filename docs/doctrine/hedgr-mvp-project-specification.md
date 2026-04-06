# Hedgr MVP Project Specification (Canonical)

Version: 2.0  
Status: Canonical specification (doctrine-grade product baseline)  
Supersedes: Version 1.0 of this document  
Historical archive: `hedgr-mvp-project-specification-v0.md` (superseded; not an active alternative)

**Implementation truth and shipping boundary:** For what the repository is **authorized to implement today** (read-only Stability Engine posture, informational allocation bands, CI/hermetic constraints), treat `docs/ops/HEDGR_STATUS.md` and `AGENTS.md` as binding alongside ADRs referenced below. This spec defines **product intent and architectural intent**; it does not widen execution authority beyond merged governance.

---

## 0. Non-negotiables

The following apply to MVP and post-MVP framing unless explicitly superseded by higher-precedence doctrine or ADR:

1. **Capital preservation above all** — If safety conflicts with yield or growth, safety prevails.
2. **Liquidity integrity** — Withdrawal reliability and honest liquidity communication are mission-critical.
3. **Stability before speculation** — Hedgr is a stability system, not a speculation product.
4. **Risk visibility** — Risk posture must remain visible wherever yield or allocation is discussed.
5. **No gamification** — No dopamine-driven yield mechanics, celebratory earnings loops, leaderboards, or speculative urgency patterns.
6. **Engine authority** — No product surface may bypass the Hedgr Stability Engine for **canonical allocation posture** in the target system design. (In phased delivery, engine outputs may be **informational only** until governance approves execution coupling.)
7. **Policy and governance first** — Runtime policy, trust disclosures, and regulatory posture are control layers, not decorative copy.
8. **Copilot subordination** — The AI Copilot is **advisory only**: it does not execute movements of user funds, does not override policy or engine authority, and must not present itself as an execution or accounting authority.

For full doctrine order of precedence, see `.cursorrules` and `docs/doctrine/hedgr-constitutional-charter.md` through the stack listed there.

---

## 1. Executive overview

Hedgr is a **financial stability operating system** whose initial **delivery surface** is a consumer **stability wallet** (Hedgr Wallet). Longer-term surfaces include **Hedgr Pro** (SME and professional treasury) and **Hedgr APIs** (partner infrastructure); the MVP focuses on proving the **Stability Wallet thesis** in volatile economies.

Hedgr helps users in volatile economies preserve purchasing power, maintain visibility into liquidity and withdrawal readiness, and access governed stable-asset infrastructure through a simple wallet experience. Users preserve value by moving into stable digital assets and understanding stability posture, liquidity, and conservative allocation—with yield as a subordinate enhancement, not the product headline.

### 1.1 MVP validates (in order of doctrinal priority)

1. **Stability and liquidity posture** — Users understand how their position is framed for volatility and withdrawal readiness.
2. **Integrity of rails and trust** — On/off ramps, custody disclosures, fees, and compliance posture are credible and testable.
3. **Conservative yield routing (when execution is approved)** — Yield accrues only within engine and policy constraints; yield never outranks preservation or liquidity.
4. **Advisory Copilot** — Education, context, and calm guidance without execution authority or yield hype.

### 1.2 Language and UX hierarchy (product)

Default hierarchy for consumer surfaces:

**Portfolio value → Stability status → Allocation split**

Prefer **allocate** over **earn**; treat yield as **enhancement, not entitlement**. Institutional, calm tone per `docs/doctrine/hedgr-ux-constitution.md` and `.cursorrules`.

---

## 2. Product definition

### 2.1 Hedgr as a stability system

Hedgr is a **stability system** delivered initially through a wallet surface. It is a trust-first interface to volatility management whose logic is anchored in the **Hedgr Stability Engine** and policy stack.

It is **not** positioned as a generic DeFi wallet or yield-chasing interface. The wallet is the primary MVP experience surface, not the entirety of the system.

### 2.2 System center vs delivery surface

| Concept | Role |
|--------|------|
| **Hedgr Stability Engine** | System center: canonical allocator of capital in **target** design; governs allocation posture, risk framing, and (when approved) coordination with execution. |
| **Hedgr Wallet** | Primary MVP **experience surface**; proves the thesis. |
| **Yield routing** | **Subordinate** to engine safety and liquidity constraints. |
| **AI Copilot** | **Advisory layer**; explains and supports; never replaces engine or policy. |

---

## 3. Layered architecture (canonical model)

The specification **must** be read through these layers. Lower layers constrain higher layers. No higher-layer surface may imply, simulate, or operationalize authority that has not been granted by the constraining layers beneath it.

### 3.1 Policy and governance

- Regulatory strategy, sandbox posture, KYC/AML expectations, data residency, and trust disclosures.
- ADR-gated changes to custody, execution boundaries, or engine authority.
- **Deny-by-default** where market or policy state is unknown.

### 3.2 Stability Engine

- Serves as the **canonical interpretive center** for stability posture and allocation framing in the target system design, producing doctrine-aligned **stability posture**, **notices**, and **allocation band** outputs.
- In current phased delivery, engine outputs are **read-only and informational** unless an explicit ADR and `HEDGR_STATUS` authorize more.
- Allocation bands are **informational**, not shadow accounting or ledger truth (see `docs/decisions/0013-allocation-bands-informational-not-accounting.md`).

**Allocation bands (conceptual)**

- **Stability** — Principal protection, stable assets.
- **Liquidity** — Withdrawal and settlement readiness (integrity over optimization).
- **Yield** — Conservative strategies only within caps and liquidity rules.

### 3.3 Execution layer

- Treasury operations, chain settlement, mobile-money rails, workers, and any automation that **moves or commits** funds.
- **Must not** run ahead of governance: phases distinguish **no execution**, **manual/limited execution**, and **automated execution** (see Section 5).

### 3.4 Advisory layer (AI Copilot)

- Financial education, FX and stability **context**, explanations of where yield **may** come from (when applicable).
- **Non-executing:** no signing, no transfers, no hidden reallocation, no “do this trade now” authority.
- Sensitive advisory interactions should follow retention minimization and redaction principles appropriate to a financial product, consistent with policy and implementation constraints.
- Subject to safety, rate limits, retention policy, and stub/mock posture in CI as per `AGENTS.md`.

### 3.5 Experience surfaces

- **Hedgr Wallet** (MVP): Next.js mobile-first application—dashboard, allocation/stability views, deposit/withdraw **when authorized**, Copilot, trust and fees.
- **Hedgr Pro / APIs**: Out of MVP scope except as **named future surfaces** so roadmap and partnerships do not collapse into a single “app” narrative.

---

## 4. Custodial and platform stack (mainline)

**Mainline doctrine (current intent)**

- **Custodial wallet infrastructure:** **Privy** (or successor explicitly adopted by ADR)—wallet creation, authentication, key custody consistent with trust disclosures.
- **Frontend:** Next.js (monorepo: `apps/frontend`).
- **Backend:** Python/Flask service boundary (`apps/backend`) for orchestration **when** execution and integration scope are approved.
- **Data:** Postgres (e.g. Supabase) for user records, transaction logs, audit trails—as implemented under governance.
- **Secrets:** **Doppler** as canonical secrets source; not ad-hoc env files for production truth (`AGENTS.md`).

**Deprecated or historical choices** (e.g. Magic.link as sole authority, Replit Secrets, specific testnets named as production) do **not** belong in mainline doctrine; see **Appendix B** and the archived v0 file for archaeology only.

---

## 5. MVP capabilities and execution posture

Every MVP capability **must** be classified under one of the following. Roadmap items **advance by governance gates**, not by calendar week alone.

| Class | Meaning | Example (illustrative) |
|-------|---------|-------------------------|
| **A — Informational only** | Educates, discloses, simulates, or displays engine-aligned posture; **no** fund movement. | Stability status, informational allocation views, trust disclosures, Copilot education. |
| **B — Manual / limited execution** | Human-in-the-loop, pilot, or capped flows; explicit operational controls. | Human-reviewed deposit/withdraw flows, manual treasury operations, capped pilot rails. |
| **C — Automated execution** | Programmatic movement/commitment of funds subject to policy and engine rules. | Governed programmatic settlement, approved protocol routing, execution workers—**only when ADRs and ops status explicitly allow**. |

### 5.1 Deposits

- **Intent:** Allow users to move local currency into the Hedgr system through approved rails (e.g. mobile money, starting with **MTN** where licensed and integrated).
- **Execution class:** Class **B** or **C** depending on phase.
- **Governance / trust condition:** The engine may explain target allocation posture, but conversion and custody only execute when rails, controls, and disclosures are explicitly authorized.

### 5.2 Asset conversion

- **Intent:** Convert local currency exposure into stable digital assets (initial: **USDC** unless doctrine changes).
- **Execution class:** Inherits the active execution posture of the rail and custody path.
- **Governance / trust condition:** Fees, slippage, and conversion logic must remain visible; no conversion path should imply automation or guarantees beyond authorized system truth.

### 5.3 Yield generation (subordinate)

- **Intent:** Offer conservative stable yield only as a secondary enhancement to preserved capital.
- **Execution class:** Informational in early phases; execution-connected only when approved protocol routing is live under governance.
- **Governance / trust condition:** Yield remains behind engine caps, liquidity checks, and policy; preservation and withdrawal integrity remain primary in all product framing.

### 5.4 Withdrawals

- **Intent:** Return stable assets to local currency through approved rails with emphasis on reliable withdrawal completion.
- **Execution class:** Typically **B** in early pilot phases and **C** only once automation is approved and monitored.
- **Governance / trust condition:** Withdrawal reliability outranks optimization; product surfaces must communicate liquidity and timing honestly.

### 5.5 Trust, fees, compliance

- **Intent:** Provide custody transparency, fee visibility, compliance posture, and auditability.
- **Execution class:** Predominantly **A** with operational hooks for **B** where support or manual review is required.
- **Governance / trust condition:** Trust surfaces must not overstate automation, protections, approvals, or regulatory certainty.

---

## 6. Yield Routing Engine (subordinate component)

The **Yield Routing Engine** routes eligible balances to approved external strategies **within** Stability Engine constraints.

- Initial protocol direction (subject to execution phase): stable lending (e.g. USDC supply on approved venues).
- Rules include: exposure caps, APR monitoring, **liquidity checks**, halts when policy or engine posture requires.

In early phases, this component may exist conceptually or as policy-defined future architecture before any live automated routing is authorized.

Yield routing **never** overrides capital preservation, liquidity integrity, or policy deny-default.

---

## 7. AI Copilot (advisory, non-executing)

**Role:** Simplify stability, FX, and (when relevant) conservative yield concepts for emerging-market users.

**Must:**

- Stay **subordinate** to engine and policy; cite uncertainty; avoid promissory language.
- Support education and calm guidance aligned with UX constitution.

**Must not:**

- Execute transactions, move funds, or imply ledger or engine truth beyond what the system actually provides.
- Drive gamified or urgency-based savings behavior.

---

## 8. Target users

Primary segments (unchanged in intent):

- **Freelancers** — Volatile local or cross-border income.
- **SME owners** — Stable treasury storage need (Wallet MVP; Pro later).
- **Mobile-first savers** — Mobile money as primary rail.

Core jobs-to-be-done:
- Preserve value against local currency instability.
- Maintain visibility into liquidity and withdrawal readiness.
- Hold stable treasury outside speculation-first environments.
- Operate from mobile-first rails and trust-constrained contexts.

These users prioritize **stability over speculation**.

---

## 9. Governance-gated roadmap (authority expansion)

Sequencing is **not** committed to week numbers in this document. Phases advance when **doctrine, ADRs, and `HEDGR_STATUS`** record approval to widen authority.

Suggested **authority phases** (names illustrative; exact tickets live in ops):

1. **Foundation — Informational engine and trust surfaces**  
   Read-only Stability Engine UX, disclosures, simulation only where dev-safe and non-authoritative.

2. **Transition readiness**  
   Operational, policy, and technical criteria before expanding execution automation.

3. **Pilot execution — manual / limited (Class B)**  
   Deposits/withdrawals and treasury steps with human controls and volume limits as required by regulators.

4. **Automated execution (Class C)**  
   Workers, programmatic settlement, and protocol interaction **only** under explicit governance and monitoring.

5. **Surface expansion**  
   Hedgr Pro, APIs, additional jurisdictions and assets—each **ADR-scoped**.

---

## 10. Security and trust

- Custodial protection consistent with chosen provider and disclosures.
- Encryption in transit and at rest; key rotation and secrets discipline (Doppler).
- Transaction and financial audit logs; retention subject to jurisdiction and policy.
- **No** implication that UI allocation bands are accounting truth unless doctrine explicitly allows.
- No simulated or advisory system state may be presented as live execution truth.
- Trust surfaces must avoid misleading precision and must not overstate automation, coverage, or protections.

---

## 11. Monetisation (subordinate to trust)

Potential streams (subject to regulation and phase):

- **Yield spread** — Only insofar as consistent with disclosures and user transparency; never framed as hidden extraction.
- **Conversion and rail fees** — Aligned with mobile-money and FX market norms.
- **Future:** Infrastructure licensing (e.g. engine-adjacent APIs for partners)—out of MVP unless separately approved.

---

## 12. MVP success criteria (reordered)

The MVP succeeds if it validates:

1. **Demand for stability-first wallets** with credible trust and policy posture.
2. **Reliable rails** (on/off ramps) at the **authorized execution class** for the pilot.
3. **Liquidity and withdrawal experience** that users and operators can rely on.
4. **Engine-aligned communication** — Users understand stability and allocation without mistaking UI for bank-grade accounting unless that is explicitly in scope.
5. **Advisory Copilot engagement** without safety regressions or execution confusion.

---

## 13. Post-MVP expansion (directional)

- Multi-currency and multi-jurisdiction stability offerings.
- Hedgr Pro and Hedgr APIs as separate surfaces with shared core.
- Additional conservative strategies **only** under engine and policy caps.
- Programmatic hedging and advanced treasury **only** with explicit ADRs.

---

## Appendix A — Operational specificity (salvaged from v0)

*Condensed from historical v0 for planning and operational continuity; numbers are **illustrative** until confirmed under current compliance and vendor contracts. This appendix is non-authoritative wherever it conflicts with current doctrine, ADRs, vendor constraints, or legal/compliance advice. It does not authorize execution.*

- **Reconciliation:** Mobile-money integrations often require SLA targets (e.g. 12-hour handling) and **daily reconciliation** batches; idempotent deposit/convert/settle flows.
- **FX:** Low-latency display may use streaming or short-interval polling; exclude third-party ramp latency from “instant” UX claims.
- **Audit retention:** Financial logs often require multi-year retention; chat/support logs typically shorter (e.g. 90-day purge policies)—confirm with counsel.
- **AML triggers (examples):** Large single transactions, burst activity vs baseline, geo anomalies, PEP/sanctions screening—implement per vendor and legal review.
- **Monitoring:** Error rates, latency percentiles, and infra saturation thresholds should feed alerting (tools vary by deployment).
- **Offline / degraded:** Financial actions disabled when unsafe; cached rates and read-only content may remain available.

---

## Appendix B — Historical and superseded material

- **`hedgr-mvp-project-specification-v0.md`** — Archived **DeFi-forward** draft with detailed phased checklists, deprecated stack (e.g. Magic.link, Replit Secrets, Polygon Mumbai as named environment), and UI patterns that may conflict with current UX doctrine. **Use only for archaeology**, not authority.
- **Version 1.0** of this canonical file — Wallet-centric framing without layered governance and execution classification; fully superseded by Version 2.0.

---

## Appendix C — Governing references (non-exhaustive)

- `.cursorrules` — Doctrine precedence and invariants.
- `docs/ops/HEDGR_STATUS.md` — Merged implementation truth and next-ticket authority.
- `docs/decisions/SPRINT-2-ADR-INDEX.md`
- `docs/decisions/0015-stability-engine-is-the-system-center.md`
- `docs/decisions/0014-stability-engine-read-only-in-sprint-2.md`
- `docs/decisions/0013-allocation-bands-informational-not-accounting.md`
- `docs/decisions/0016-warmth-layer-doctrine-constrained-retail-refinement-track.md` (presentation-only track; does not widen execution)

---

End of canonical specification (Version 2.0).
