# Stability Engine Functional Contract — Partial-Capital Productisation

**Date:** 2026-09-19  
**Status:** Accepted strategic target contract on permanent-main reconciliation under HEDGR_STATUS.md §286; not an implemented or empirically validated model  
**Classification:** Founder Only / Internal Product Strategy; no public ADR export  
**Source:** [Partial-Capital Stability Engine decision](../governance/product/HEDGR_PARTIAL_CAPITAL_DECISION.md)  
**Authority impact:** None for implementation, financial execution, doctrine, research activation or release

## Purpose and boundary

Hedgr should help answer: **What is my financial position, how resilient is it, what changed, and what can I responsibly consider doing next?** It should provide meaningful stability intelligence before becoming the centre of the user's financial life.

This contract describes the target reasoning responsibilities and limits for future separately authorised increments. It does not define an algorithm, schema, eleven features, mandatory data intake, numerical allocation rule or autonomous plan. The working audience remains financially active earners, initially freelancers, independent professionals and salaried professionals, with recurring income, agency and consequential money decisions. Employment structure is not the product boundary; common decision grammar and product value remain hypotheses.

## Three distinct scopes

| Scope | Meaning | Boundary |
| --- | --- | --- |
| Wider financial context | Relevant income, commitments, operating requirements, timing and other circumstances surrounding the position | Context may remain outside Hedgr. No complete aggregation, account connectivity or custody requirement follows; incomplete information must remain visible |
| Hedgr allocation envelope | The portion of capital the user intentionally places under Hedgr's stability reasoning | Reasoning scope is not proof of assets held, custody, verified wealth, settled balances or permission to move funds; it is not necessarily the user's total income or available capital |
| Stability composition | Liquidity, preservation/resilience and subordinate potential yield roles within that envelope | Conceptual roles are not three literal pots, executed partitions or a new allocation policy. Preservation and liquidity come before yield |

External operating liquidity is capital deliberately kept outside Hedgr for ordinary spending through existing infrastructure. Hedgr liquidity is capital inside the envelope that must remain accessible or withdrawal-ready. Neither label proves actual access; availability, timing, commitments and unknowns constrain interpretation. Outside operating funds must not be described as inside-envelope balances or capacity.

A salaried earner may keep operating money at a bank or mobile-money provider and consider only another portion through Hedgr. A freelancer may spend some income, retain accessible liquidity and consider another portion for stability. No fixed fraction, deposit target or 60/40 rule follows. Do not optimise for deposit capture or require unnecessary centralisation.

## Target functional flow

**Financial event → Operating requirement → Hedgr allocation envelope → Liquidity requirement → Stability reserve → Yield capacity → Exposure / change interpretation → Safe options**

This is a conceptual reasoning sequence, not a deterministic waterfall, ordered implementation backlog or instruction to create modules. Exposure, time and uncertainty inform the whole interpretation; their position in the sequence does not postpone consideration of material risk. Yield capacity is a subordinate question, not a promised positive amount or permission to execute. “Safe options” means qualified possibilities with consequences and limits, never a guarantee, directive or action entitlement.

## Functional primitives

| Primitive | Question the target product should make understandable | Required qualification |
| --- | --- | --- |
| Financial context | What relevant circumstances surround this position? | Distinguish supplied facts, assumptions and missing information; do not imply whole-life knowledge |
| Allocation envelope | Which capital is intentionally being considered through Hedgr? | Keep reasoning scope distinct from total wealth, custody and ledger state |
| Commitments | What capital is already spoken for? | Unknown or incomplete commitments cannot be silently treated as zero |
| Liquidity | What must remain readily accessible? | Distinguish external operating liquidity from in-envelope liquidity and qualified access from assumed access |
| Stability | What capital's primary role is preservation and resilience? | Describe purpose without promising protected value, purchasing power or outcomes |
| Exposure | Which material risks affect this position? | Make risk visible; do not reduce the position to a headline currency move or asset label |
| Time | What matters now, soon or before the next expected event? | Make relevant horizons and uncertain timing explicit without predictive income modelling |
| Capacity | What could remain available without unnecessarily weakening resilience? | Bound the interpretation by known commitments, liquidity, exposure and uncertainty; no unsupported precise disposable amount |
| Change | What materially changed? | Explain the relevant comparison and its information limits; do not manufacture a change from missing evidence |
| Options and consequences | What might the user consider, and what would it imply? | Preserve user judgment, advisory language and current availability/authority limits; no automatic reallocation |
| Reason and uncertainty | Why this interpretation, and what does the Engine not know? | Explain material assumptions and limit or withhold unsupported conclusions rather than manufacture confidence |

These are architectural primitives, not eleven product features or a replacement for the retained non-canonical F1–F4 research model. No scalar score, threshold, capacity formula or model acceptance is specified here.

## Wallet, Engine and journey responsibilities

The Stability Engine remains the product and interpretive centre. The Wallet is the experience and eventual action surface for the portion of the position entrusted to Hedgr's stability system. It consumes and expresses Engine reasoning; it must not independently create allocation or financial logic. “Entrusted” describes the target product relationship and supplies no present custody authority.

The existing journey remains **Entry → Orientation → Stability → Insight → Safe action**:

| Stage | Functional interpretation |
| --- | --- |
| Entry | What financial event or decision brought the user here? |
| Orientation | Which part of the position is Hedgr evaluating? |
| Stability | How resilient is that relevant position, within known limits? |
| Insight | What changed or materially matters? |
| Safe action | What might the user responsibly consider next, within current capability and authority? |

This mapping deepens the journey; it does not authorise UI, copy, route, Copilot, data, engine or transaction changes. Informational allocation bands remain targets rather than balances or accounting truth. The ledger remains the financial-state authority under ADR 0013; Sprint 2 Engine surfaces remain read-only under ADR 0014.

## Productisation and evidence use

For each separately authorised increment, ask: **Which part of this functional model are we making real, understandable and testable next?** Prefer improvements to position understanding, commitments, liquidity/resilience, material change, stability capacity or qualified options. Transactional breadth or feature completeness alone is insufficient justification. This is an evaluation lens, not sequencing authority.

Formal behavioural-market proof is deferred, not abandoned, and does not gate current authorised productisation. Through separately governed meaningful MVP exposure, later evidence should examine triggers, comprehension/misunderstanding, incremental interpretive value, decision effects, return around subsequent financial events and common versus divergent cohort grammar. Founder may retain, narrow, broaden or split the audience in response. No observed behaviour, demonstrated fit, comprehension success, real-money experiment or new research programme is claimed by this contract. Existing evidence-gated acceptance and release conditions remain controlling.

## Capability progression and explicit exclusions

MVP value may coexist with existing financial infrastructure. Later direct income receipt, richer liquidity management, cards/payments, account connectivity, conversion, stability allocation and conservative yield execution require separate governance and evidence. They are not dependencies of this thesis, committed roadmap items or available features. Future payment capabilities could allow more operating liquidity inside Hedgr without requiring a different conceptual model.

This contract adopts no budgeting product, full aggregation, transaction categorisation, autonomous financial planning, credit scoring, predictive income modelling, automatic reallocation, investment management, live portfolio optimisation, separate freelancer/professional products, literal user-controlled allocation pots or mandatory income percentage.

It grants no custody, customer-money operations, live conversion, settlement, yield execution, card issuance, provider commitment, new rails, integration, launch, acquisition spend, data collection or wider Class A / B / C authority. It does not amend default allocation policy, doctrine, accepted ADR meaning or any existing research model.

## Drift, ownership and change control

Revise or stop affected work if feature breadth outruns Engine clarity, usefulness requires the user's entire financial life, budgeting replaces stability reasoning, yield displaces preservation/liquidity, precision outruns evidence, informational outputs resemble accounting truth, advice becomes directive, or Wallet logic defines the Engine. Surface a conflict with governing doctrine rather than resolve it through this contract.

Founder owns the strategic direction and material changes. HedgrOps maintains convergence and evidence dispositions. The repository preserves the decision, this contract, current execution authority and subsequent explicit changes. Operators implement only verified §7 / §7a scope. Corrections/revisions must preserve source provenance; changing or reverting this contract must not revive deferred research or activate a successor.

Current Lane V weekend scope, Lane E parent and D-143 retained evidence, deferred Lane G / D-151 under §285, idle Lane N, paused participant publication/distribution and frozen About/public narrative are unchanged. **NO CROSS-LANE EXECUTION IMPACT**.

## Governing references

- [HEDGR_STATUS.md §7 / §7a and §286](../HEDGR_STATUS.md#7-current-sequence-and-active-status)
- [AGENTS.md](../../../AGENTS.md)
- [Constitutional Charter](../../doctrine/hedgr-constitutional-charter.md)
- [ADR 0013 — Informational allocation bands](../../decisions/0013-allocation-bands-informational-not-accounting.md)
- [ADR 0014 — Read-only Engine](../../decisions/0014-stability-engine-read-only-in-sprint-2.md)
- [ADR 0015 — Engine as system centre](../../decisions/0015-stability-engine-is-the-system-center.md)
- [ADR 0024 — Evidence-gated MVP acceptance](../../decisions/0024-mvp-acceptance-is-evidence-gated-not-feature-gated.md)
- [Working MVP audience hypothesis](../governance/gtm/HEDGR_WORKING_MVP_AUDIENCE_HYPOTHESIS.md)
