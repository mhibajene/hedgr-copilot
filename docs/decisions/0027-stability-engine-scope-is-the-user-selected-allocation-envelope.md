# ADR 0027 — Stability Engine Scope Is the User-Selected Allocation Envelope

**Status:** Accepted

**Date:** 2026-10-05

**Accepted:** 2026-10-05

**Decision ID:** Internal **D-152** ↔ ADR **0027** (`docs/ops/HEDGR_STATUS.md` **§336**)

**Decision Type:** Architecture / Governance

**Strategic Horizon:** Short-term (MVP doctrine alignment) with long-term institutional relevance

**Visibility:** Public. Export is confirmed by the Founder and covers the engine-boundary decision only. The underlying partial-capital strategy in §286 stays Founder Only.

**Owners:** Hedgr Core

**Reversibility:** Reversible: supersede this ADR and revert the paired doctrine and `.cursorrules` passages, keeping this ADR as historical record. No runtime, funds, provider or customer commitment is created or unwound.

**Ticket of record:** None. This is Founder-directed doctrine alignment, recorded in `docs/ops/HEDGR_STATUS.md` **§336**.

**Paired amendments (same PR):**
- `docs/doctrine/hedgr-stability-engine.md`: header, §1, new §1.1, §4 preamble, §10 Invariant 5
- `docs/doctrine/hedgr-default-allocation-policy.md`: Article I
- `docs/doctrine/hedgr-stability-model™ (Internal).md`: §II.A
- `.cursorrules`: §IV "canonical allocator" line

---

## Acceptance note

The Founder, Musalwa Hibajene, approved the minimum doctrine amendment on 2026-10-02. The finding was that partial-capital allocation had been "absorbed but under-specified".

On **2026-10-05 at about 09:47 AWST**, in conversation with HedgrOps, the Founder:
- **accepted** this ADR and its paired amendments;
- **confirmed public export** of this ADR, limited to the engine-boundary decision;
- directed that the doctrine edits land in the same PR that records acceptance.

Acceptance takes effect on permanent-main merge of that PR. A separate, verified, projection-only RAP rebind follows.

Acceptance does **not** authorise:
- implementation, `EngineState` or runtime change;
- execution, custody, conversion, settlement, routing or rebalancing;
- Class B or Class C work, customer-money activity, tickets or sequencing.

`HEDGR_STATUS.md` §7 / §7a remain controlling.

---

## Context / Problem

The partial-capital direction has been adopted at the strategic level, but active doctrine was deliberately not amended to match it.

**Adopted direction (strategic, non-doctrine):**
- **§286** of `docs/ops/HEDGR_STATUS.md` (2026-09-19):
  - adopts "the partial-capital Stability Engine as strategic functional frame";
  - clarifies "that meaningful intelligence does not require financial centralisation";
  - names the "Hedgr allocation envelope" as a distinct architectural role: "Distinguish wider context from intentionally considered capital, and external operating liquidity from liquidity inside the envelope."
- **§288** adopts "envelope as reasoning scope" as a target design constraint.
- **§290** adopts semantic responsibilities under which financial facts "supply the information basis without establishing authentication, custody, total wealth or a complete profile".
- Live **§7** carries the §286 frame and the §290 responsibilities as "bounded adopted direction".
- `docs/ops/governance/product/HEDGR_PARTIAL_CAPITAL_DECISION.md` §3 defines the **Hedgr allocation envelope** as "The portion of capital the user intentionally places under Hedgr's stability reasoning."
- `docs/ops/stability-engine/HEDGR_STABILITY_ENGINE_FUNCTIONAL_CONTRACT.md` adds: "Reasoning scope is not proof of assets held, custody, verified wealth, settled balances or permission to move funds".

**Doctrine left unamended:** §286 recorded "No public ADR export or doctrine amendment". Decision §18 deferred a doctrine layer "unless later evidence demonstrates a true doctrine-level change."

**Active doctrine still supports a whole-deposit, automatic-allocation reading:**
- `docs/doctrine/hedgr-stability-engine.md` (Active Doctrine Index order 7; `.cursorrules` §II precedence 6):
  - §1: "The Hedgr Stability Engine is the core capital management system of the Hedgr platform." It "governs how user capital is: allocated / protected / routed / rebalanced / made available for withdrawal".
  - §4: unscoped responsibilities over "user capital".
  - §10 Invariant 5: "The engine is the canonical allocator of user capital within the Hedgr system."
- `docs/doctrine/hedgr-default-allocation-policy.md` (index order 12; precedence 9), Article I: "All retail deposits are automatically allocated into two components … This split is mandatory and not optional at the base layer."
- `docs/doctrine/hedgr-stability-model™ (Internal).md` (index order 8), §II.A: "All retail capital is automatically allocated into: … This split is system-managed."
- `.cursorrules` §IV: "The **Hedgr Stability Engine** is the system center and canonical allocator of user capital."

Read without scope, these passages conflict with two other commitments:
- the partial-capital non-adoption of "automatic reallocation" (decision §13);
- UX Constitution §2, "No auto-defaults that commit funds".

**Terminology collision:** `docs/doctrine/d05-hedgr-consitutional-calibration.md` uses "envelope" for **constitutional risk limits**, not for user-selected capital:
- §3 lists "Allocation envelopes" among the constitutional risk parameters the Engine defines;
- §4 grants institutions "tiered envelopes within constitutional limits".

**Trigger:** On 2026-10-02 the Founder assessed the direction as correct but under-specified in canonical doctrine, and approved a minimum amendment.

**Why an ADR:** `.cursorrules` §V requires an ADR for "changes to engine authority or architectural boundaries", and constraining Invariant 5 is one.

**Boundaries relied on and not altered:**
- ADR **0011** / **0014**: the engine is an "advisory posture layer, not an execution system" and may not "execute rebalancing … initiate routing … encode transaction authority".
- ADR **0013**: bands are "informational projections only", not "user-owned asset partitions".
- ADR **0015**: the engine is the system center.
- MVP specification §5: Class C "only when ADRs and ops status explicitly allow".

---

## Decision

The following is binding engine doctrine, implemented by the paired amendments.

1. **Scope.** The Stability Engine's scope is the user's **Hedgr allocation envelope**: the portion of capital the user intentionally places under Hedgr's stability reasoning.
   - The user selects it.
   - It is not inferred from, and need not equal, total income, deposits, balances or wider financial position.
   - Wider context may inform interpretation, but allocation, liquidity, exposure and yield reasoning apply only to capital inside the envelope.
2. **Invariant 5 is constrained to the envelope.** The engine is the canonical allocator of capital *within the user's Hedgr allocation envelope*.
   - No other component determines allocation for that capital.
   - The engine asserts no allocation over capital outside the envelope.
   - Invariant 4 is unchanged.
3. **The envelope grants no authority to act.**
   - The envelope defines the capital Hedgr may *reason about*.
   - It grants **no** authority to move, convert, route, rebalance, commit or otherwise act on that capital.
   - It is not evidence of custody, settled balances, verified wealth or accounting truth.
   - Any action requires separate authority under accepted ADRs, `HEDGR_STATUS.md` §7 / §7a and the MVP specification execution classes. ADRs 0011, 0013 and 0014 continue to govern.
   - Where doctrine describes the engine allocating, routing or rebalancing, it describes target-design reasoning and constraints, not a present execution entitlement.
4. **The default split applies within the envelope.** The mandatory Stability Buffer / Conservative Yield structure (Default Allocation Policy Art. I; Internal Stability Model §II.A) is the required structure of Hedgr's stability reasoning and target posture *for capital within the envelope*.
   - It does not extend to capital outside the envelope.
   - It does not by itself authorise any automatic conversion, movement or rebalancing of funds.
   - Buffer minimums, exposure caps and yield-deployment rules are unchanged. Default Allocation Policy Art. II is deliberately left as written.
5. **Terminology is separated.** In the Stability Engine specification and this ADR, "allocation envelope" means the user-selected reasoning scope. It is distinct from the constitutional risk limits that D05 calls "allocation envelopes" or "tiered envelopes".
   - D05 limits continue to bound all engine reasoning.
   - The user's envelope can neither set nor widen them.
   - D05 is not edited.

---

## Rationale

- **Smallest change that closes the gap:** the amendment scopes six existing passages and adds one definitional subsection. It does not rewrite the engine model, allocation bands, risk controls or D05.
- **Preserves Engine primacy (ADR 0015) without implying centralisation:** the engine stays canonical for allocation reasoning over the capital the user chooses to place under it.
- **Separates scope from authority:** defining what Hedgr may reason about must not create authority to act. The no-authority clause makes explicit what ADRs 0011/0013/0014, `.cursorrules` §VII and STATUS §2 already require.
- **Prevents category confusion:** it stops the user's envelope from being read as a D05 constitutional limit, and the reverse.

**Alternatives rejected:**
- *Leave doctrine unamended.* The Founder rejected this on 2026-10-02 as under-specified.
- *Broad rewrite* covering the mandate, delegation ladder and wider wording cleanup. Out of scope; those concepts are unadopted or deferred under §288.
- *Amend ADRs 0011/0013/0014.* Unnecessary: their boundaries hold and are reinforced.
- *Rename or footnote the D05 term.* Not needed; the disambiguation in the engine specification is sufficient (Founder, 2026-10-05).
- *Change the Art. II denominator* ("60–70% of deposited capital"). Rejected because it sits next to an Art. VI-controlled parameter. Art. I's envelope scoping already governs the base to which Art. II applies.

---

## Assumptions

- Users can meaningfully select and understand the portion of capital they place under Hedgr's stability reasoning. This is a hypothesis per decision §3 and §12.
- Useful, qualified reasoning is possible over a partial envelope with incomplete wider context (§286).
- This ADR does **not** decide how the envelope is selected, captured, consented to or verified. §288 defers ingestion, authentication, freshness, consent and privacy design.

---

## Risks / Trade-offs

- **Partial view.** Envelope-scoped reasoning can overstate resilience when external commitments are unknown. The §290 claim-integrity responsibilities mitigate this; the residual risk is accepted.
- **Mandate creep.** Treating the envelope as permission to act is barred by the no-authority clause. Any execution scope needs its own ADR.
- **Residual unscoped wording** remains in:
  - the system overview, whitepaper, product surfaces and retail allocation UX spec;
  - leftover passages in the engine specification (§2, §6, §11);
  - STATUS §5.

  Readers apply this ADR as the narrower, later decision: relevant ADRs sit at precedence 5, above those documents at 6–11.
- **Liquidity impact: none.** No buffer minimum, exposure cap, yield-deployment rule, withdrawal path or treasury behaviour changes. This is recorded for Default Allocation Policy Art. VI completeness.

---

## Consequences

### Positive
- Canonical doctrine, the internal model, `.cursorrules` and the adopted partial-capital direction agree on engine scope.
- Invariant 5 has an explicit jurisdiction.
- The scope/authority distinction is now doctrine, so future execution proposals must justify their authority separately.
- The two meanings of "envelope" can be told apart.

### Negative
- A defined term that later artifacts must use consistently.
- Scope narrowing is uneven across lower-precedence doctrine until those documents are conformed; that conforming work is deferred.
- §286's "No public ADR export or doctrine amendment" clause is superseded for this narrow point only and becomes historical for it.

---

## Explicit non-goals

This ADR does **not**:
- introduce a **mandate** primitive, user-set permission constraints or delegation of customer capital;
- define a **delegation / automation ladder**;
- adopt a **moat** hypothesis;
- edit or clean up **D05** in any way;
- change Default Allocation Policy **Art. II** or any Art. VI parameter;
- make any **runtime, code, `EngineState`, test, copy or schema** change, or define envelope capture, storage or verification;
- change ADRs **0011–0015**, the allocation-band model, buffer minimums, exposure caps, yield rules or D05 limits;
- authorise custody, conversion, settlement, routing, rebalancing, Class B or Class C execution, customer-money activity, tickets or sequencing;
- accept F1–F4, the scoped-interface candidate as an executable contract, or any §288/§290 deferral;
- change Active Doctrine Index membership or `.cursorrules` §II precedence.

---

## Revisit / Kill Criteria

- Governed evidence shows users cannot form or understand an intentional envelope, or that envelope-scoped reasoning materially misleads.
- Any proposal treats the envelope as authority to act. Stop that proposal and require a separate execution ADR.
- A future accepted ADR defines mandate, permission or execution semantics that need a different scope model. It must supersede or extend this ADR explicitly.
- The Founder revises or stops the §286 direction.

---

## Strategic Pillar Alignment

- **Capital Preservation Above All, Liquidity First, Stability Before Speculation:** unchanged and reinforced.
- **Security and Trust; Risk Visibility:** reinforced. Scope carries no authority, and constitutional limits are kept distinct.
- No tension identified.

---

## Related Decisions

- ADR 0011 — Stability Engine is Read-Only in Sprint 2 (unchanged)
- ADR 0012 — Policy Core Precedence Over Stability Engine Output (unchanged)
- ADR 0013 — Allocation Bands Are Informational, Not Accounting (unchanged)
- ADR 0014 — Stability Engine Is Read-Only in Sprint 2 (unchanged)
- ADR 0015 — Stability Engine Is the System Center (unchanged; scope clarified)
- `docs/ops/HEDGR_STATUS.md` §286, §288, §290, §7 (operative controls), §336 (this decision)
- `docs/ops/governance/product/HEDGR_PARTIAL_CAPITAL_DECISION.md` §3, §13, §18
- `docs/ops/stability-engine/HEDGR_STABILITY_ENGINE_FUNCTIONAL_CONTRACT.md` ("Three distinct scopes")
- `docs/doctrine/d05-hedgr-consitutional-calibration.md` §3–§4 (terminology only; unchanged)
