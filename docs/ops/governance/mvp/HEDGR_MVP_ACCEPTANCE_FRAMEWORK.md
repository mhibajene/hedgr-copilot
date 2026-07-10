# Hedgr MVP Acceptance Framework

**Status:** Governance framework; documentation-only  
**Authority class:** Institutional acceptance criteria (non-executing)  
**Visibility:** Internal governance  
**Date:** 2026-07-10  
**Refinement:** Institutional hardening pass (D10, continuity, drift protection, non-goals, acceptance-authority clarification)

---

## 1. Status / Authority / Scope

**Status:** Binding as the institutional definition of MVP acceptance criteria. Documentation-only.

**Authority:** Subordinate to, and must not be read as overriding:

1. `docs/ops/HEDGR_STATUS.md` — especially **§7** / **§7a** sequencing and activation authority
2. Accepted ADRs under `docs/decisions/`
3. `AGENTS.md` — repo workflow, CI posture, and ticket-sequencing controls
4. Higher-precedence doctrine in `.cursorrules`, beginning with:
   - `docs/doctrine/hedgr-constitutional-charter.md`
   - `docs/doctrine/hedgr-governance-philosophy.md`
   - `docs/doctrine/hedgr-ux-constitution.md`
5. Product intent in `docs/doctrine/hedgr-mvp-project-specification.md`

**Mode:** Governance definition only. This framework does **not**:

- authorize implementation
- activate tickets
- alter ADRs
- redefine doctrine precedence
- introduce execution sequencing or backlog order
- widen execution class (A / B / C)
- certify product readiness, pilot readiness, or customer-money authority
- replace Class B, off-ramp, brand, Copilot, or Stability Engine lane governance within their scopes

**Implementation authority remains:**

- `docs/ops/HEDGR_STATUS.md`
- accepted ADRs
- `AGENTS.md`
- active repo-native governance

**Primary repo path:** `docs/ops/governance/mvp/HEDGR_MVP_ACCEPTANCE_FRAMEWORK.md`

**Companion artifact:** `docs/ops/governance/mvp/HEDGR_MVP_EVIDENCE_REGISTER.md`

**Governing ADR (principle; Accepted; non-executing):** `docs/decisions/0024-mvp-acceptance-is-evidence-gated-not-feature-gated.md`

**Related orientation (non-substituting):** `docs/ops/governance/mvp/HEDGR_MVP_PHASE_ALIGNMENT.md`

---

## 2. Purpose

Hedgr has mature constitutional, UX, and execution-governance surfaces, but previously lacked a single institutional answer to:

> What constitutes an acceptable MVP?

This framework closes that gap. It defines the **Institutional Acceptance Standard** for the Hedgr MVP as an **evidence-led institutional judgment**, not a feature checklist or subjective readiness claim.

Future implementation and review should be evaluated against this framework and its companion Evidence Register, rather than expanding feature lists or relying on informal readiness assessments.

---

## 3. MVP Thesis

The Hedgr MVP exists to validate the **Stability Wallet thesis** in volatile economies.

In doctrinal order of priority, the MVP must demonstrate that Hedgr can help users:

1. **Preserve capital posture** — principal protection and stability framing outrank yield or growth narratives.
2. **Retain liquidity integrity** — withdrawal reliability and honest liquidity communication are mission-critical.
3. **See risk clearly** — risk posture remains visible wherever yield, allocation, or stability claims appear.
4. **Trust the system’s boundaries** — custody, rails, fees, compliance, and execution class are disclosed without overclaim.
5. **Receive advisory guidance without execution confusion** — Copilot remains advisory; engine and policy remain authoritative.

The MVP is **not** a speculation product, yield-maximization surface, or undifferentiated multi-product launch. Hedgr Pro and Hedgr APIs remain named future surfaces, not MVP completion requirements.

This thesis elaborates `docs/doctrine/hedgr-mvp-project-specification.md` **§1** and **§12**, and remains constrained by the Constitutional Charter and UX Constitution.

---

## 4. Institutional Acceptance Standard

The Hedgr MVP meets the Institutional Acceptance Standard only when **all** of the following are true:

1. **Thesis validation** — Evidence supports that the Stability Wallet thesis is credible for the authorized execution class and market posture then in force.
2. **Domain acceptance** — Every acceptance domain in **§5** has a recorded institutional disposition under the Evidence Register.
3. **Gate clearance** — Every institutional gate in **§6** is either **Cleared** or explicitly **Deferred with founder-recorded rationale** that does not silently waive a constitutional invariant.
4. **Completion rule satisfied** — The completion rule in **§7** is met without substituting feature volume for evidence.
5. **Out-of-scope and non-goals discipline preserved** — No out-of-scope item in **§8** has been treated as required for MVP acceptance; non-goals in **§9** have not been reframed as success metrics; and no in-scope constitutional constraint has been waived for convenience.
6. **Authority continuity** — Acceptance does not invent new execution authority; any subsequent work still requires normal repo activation through `HEDGR_STATUS.md` **§7** / **§7a** where implementation is involved.
7. **Institutional continuity** — MVP acceptance requires that the product can operate within documented institutional governance without relying upon undocumented founder knowledge. Institution outranks founder memory: founder judgment may accept or defer, but acceptance must remain reconstructible from repo-native artifacts, procedures, and recorded rationale.

Meeting the Institutional Acceptance Standard is an **institutional acceptance judgment**. It is not:

- merge of a large feature set
- calendar completion of a sprint
- investor narrative readiness alone
- UI completeness without evidence
- Class B or Class C authorization by implication
- proof that exceptional founder intervention remains permanently unnecessary for every edge case — only that acceptance does not depend on undocumented founder knowledge as the operating system

---

## 5. Acceptance Domains

Acceptance is evaluated across the following domains. Domains are **co-equal for institutional review**; none may be silently dropped because another domain looks strong.

| ID | Domain | Institutional question | Primary doctrine anchors |
|----|--------|------------------------|--------------------------|
| D1 | **Stability & capital preservation** | Does the product preserve and communicate a stability-first posture above yield or growth? | Charter Arts. I, VI, VII; MVP spec §0–§1 |
| D2 | **Liquidity & withdrawal integrity** | Can users and operators rely on honest liquidity posture and withdrawal reliability at the authorized execution class? | Charter Art. II; MVP spec §5.4, §12 |
| D3 | **Risk visibility & trust disclosure** | Is risk legible wherever allocation, yield, or stability claims appear? Are custody, fees, and limits disclosed without overclaim? | Charter Art. III; UX Constitution §§1–2; MVP spec §5.5, §10 |
| D4 | **Engine-aligned communication** | Do users understand stability and allocation without mistaking informational UI for accounting, ledger, or execution truth? | ADRs 0013–0015; MVP spec §3.2, §12 |
| D5 | **Rails & custody integrity** | Are on/off-ramp, custody, and conversion claims credible, bounded, and matched to authorized execution class? | MVP spec §4–§5; Class B / off-ramp governance where applicable |
| D6 | **Advisory Copilot posture** | Does advisory guidance remain non-executing, calm, and non-confusing relative to engine and policy authority? | MVP spec §7; UX Constitution §3 |
| D7 | **Governance & policy discipline** | Were material decisions risk-classified, reversible where required, and activated only through repo-native authority? | Charter Art. IV; Governance Philosophy; `HEDGR_STATUS` / ADRs / `AGENTS.md` |
| D8 | **UX & narrative integrity** | Does the experience remain calm, non-gamified, and consistent with Total balance → Stability status → Allocation split? | UX Constitution; `.cursorrules` UX guardrails; MVP spec §1.2 |
| D9 | **Demand & learning validity** | Is there credible evidence of demand for a stability-first wallet under the tested trust and policy posture? | MVP spec §12.1 |
| D10 | **Operational sustainability** | Can Hedgr operate repeatedly, safely, and consistently without depending upon exceptional founder intervention? | Charter Arts. IV, V, VIII; Governance Philosophy; Class B ops / support / incident artifacts where applicable |

**D7 and D10 are complementary, not interchangeable.**

- **D7** evaluates whether decisions and policy activations followed institutional authority.
- **D10** evaluates whether ongoing operation is repeatable through documented procedures, monitoring, support, incident response, reconciliation, and recoverability — rather than undocumented founder rescue.

Possible D10 evidence themes (illustrative only; not intake authorization): reconciliation, monitoring, incident response, support operations, operational repeatability, documented procedures, recoverability.

Domain evidence is recorded in `HEDGR_MVP_EVIDENCE_REGISTER.md`. Domain presence in this table does **not** authorize gathering, accepting, or acting on evidence.

---

## 6. Institutional Gates

Gates are institutional checkpoints. Clearing a gate requires Evidence Register support and founder / HedgrOps review. Gate clearance does **not** activate implementation.

| Gate | Meaning | Cleared only when |
|------|---------|-------------------|
| **G0 — Doctrine continuity** | MVP acceptance remains inside Charter, UX Constitution, and product intent | No unresolved doctrine conflict is being waived for “MVP done” rhetoric |
| **G1 — Authority continuity** | Acceptance does not invent execution power | Implementation authority still resolves to `HEDGR_STATUS`, ADRs, and `AGENTS.md` |
| **G2 — Execution-class honesty** | Claims match Class A / B / C reality | No acceptance claim implies unauthorized fund movement, ledger truth, or automation |
| **G3 — Liquidity honesty** | Withdrawal and liquidity claims are evidence-backed for the authorized class | Fragility-increasing designs are rejected or explicitly out of acceptance |
| **G4 — Trust non-overclaim** | Disclosures do not overstate protection, automation, regulatory certainty, or guarantees | Narrative integrity holds under Charter Art. VII |
| **G5 — Evidence sufficiency** | Each required domain has an institutional disposition | Missing evidence remains visible; confidence is not inferred |
| **G6 — Reversibility & stop conditions** | Material acceptance judgments remain auditable and reversible where doctrine requires | Kill / stop criteria are explicit for accepted provisional claims |
| **G7 — Out-of-scope containment** | Non-MVP surfaces and speculative expansion are not smuggled into “done” | Hedgr Pro / APIs / multi-jurisdiction expansion remain separately governed |

**Gate rule:** A deferred gate must name the deferral, the residual risk, and the revisit condition. Silence is not deferral.

### 6.1 Constitutional Drift Protection

This subsection strengthens Gate **G0**. It does not replace it.

Constitutional principles may **not** be suspended, diluted, or reinterpreted away for the purpose of declaring MVP acceptance under:

- schedule pressure
- commercial pressure
- implementation convenience
- investor expectations
- competitive narrative pressure
- feature-completion rhetoric

If a proposed acceptance judgment would require weakening capital preservation, liquidity integrity, risk visibility, governance-before-scale, crisis-first design, embedded discipline, narrative integrity, or institutional conduct, the correct institutional response is to **withhold acceptance**, not to redefine the Charter.

Drift protection applies equally to provisional acceptances: residual-risk language may bound uncertainty; it may not launder a constitutional breach.

---

## 7. Completion Rule

MVP acceptance requires **evidence-led institutional validation**, not feature completion.

### 7.1 Positive rule

The MVP may be recorded as institutionally accepted only when:

1. Domains **D1–D10** each have a recorded disposition of **Accepted**, **Accepted with bounded residual risk**, or **Not applicable (with rationale)** in the Evidence Register;
2. Gates **G0–G7** are **Cleared** or **Deferred with founder-recorded rationale** that preserves constitutional invariants;
3. No acceptance statement depends on unauthorized execution-class assumptions;
4. Residual risks, provisional assumptions, and revisit conditions remain explicit;
5. Institutional continuity (**§4** criterion 7) is satisfied: acceptance is reconstructible from documented institutional governance, not undocumented founder knowledge.

### 7.2 Negative rule

The MVP is **not** accepted if any of the following are true:

- acceptance is inferred from shipped UI volume, sprint closure, or roadmap exhaustion
- yield, growth, or engagement metrics are treated as superior to preservation, liquidity, or trust
- informational or prototype surfaces are treated as proof of live rails, custody, or withdrawal reliability
- Copilot engagement is treated as execution capability
- missing evidence is papered over by narrative confidence
- out-of-scope expansion is required to declare success
- non-goals in **§9** are reframed as acceptance success metrics
- constitutional constraints are weakened to meet a schedule, commercial, or investor narrative
- acceptance depends on undocumented founder knowledge as the operating system

### 7.3 Relationship to phase alignment

`HEDGR_MVP_PHASE_ALIGNMENT.md` explains phase-appropriate progress. This framework defines institutional acceptance. Phase progress may be real and valuable **without** constituting MVP acceptance.

---

## 8. Out-of-Scope Boundary

The following are **out of scope** for MVP acceptance unless separately elevated through doctrine, ADR, and `HEDGR_STATUS` activation:

- Hedgr Pro as a required MVP delivery surface
- Hedgr APIs as a required MVP delivery surface
- Multi-jurisdiction launch completeness
- Yield maximization, strategy proliferation, or speculative product loops
- Gamified savings, celebratory earnings UX, leaderboards, or urgency mechanics
- Autonomous / Class C execution as a default MVP requirement
- Treating research papers, prototypes, or founder confidence as substitute evidence acceptance
- Redefining repo sequencing, ticket activation, or ADR status through this document

Out-of-scope does **not** mean unimportant. It means **not required to declare MVP institutional acceptance**.

---

## 9. Non-Goals

Out-of-scope (**§8**) names what is **not required** for MVP acceptance.

Non-goals name what the MVP is **actively not optimizing for**. These must not be reframed as success metrics, acceptance shortcuts, or competitive necessities during MVP acceptance review.

The MVP does **not** attempt to:

- maximise yield
- maximise engagement
- maximise deposits
- maximise protocol integrations
- become a general crypto wallet
- compete on speculative trading
- optimise growth ahead of trust
- substitute dopamine-driven retention for institutional trust
- treat speed-to-feature as superior to capital preservation or liquidity integrity

Non-goals protect future interpretation. They do not authorize alternative product directions, and they do not widen or narrow execution authority.

---

## 10. Acceptance Authority Clarification

Evidence informs institutional acceptance.  
Evidence does not automatically create institutional acceptance.

The required chain is:

```text
Evidence
    ↓
Governance review (HedgrOps / domain reviewers)
    ↓
Founder institutional acceptance (recorded)
```

not:

```text
Evidence
    ↓
Automatic acceptance
```

Implications:

1. An Evidence Register disposition of source sufficiency supports review; it does not self-execute acceptance.
2. Governance review may recommend accept, accept with bounded residual risk, defer, or reject.
3. Founder acceptance is the institutional acceptance act for MVP “done,” and must remain recorded, reconstructible, and subordinate to constitutional constraints.
4. Founder acceptance still does **not** activate implementation, alter ADRs, or replace `HEDGR_STATUS.md` **§7** / **§7a** where implementation is involved.

---

## 11. Institutional Acceptance Standard (Operator Checklist)

Use this checklist only as a review aid. It does not authorize work.

- [ ] MVP thesis in **§3** is the evaluation frame (Stability Wallet, not feature sprawl)
- [ ] Domains **D1–D10** have Evidence Register dispositions
- [ ] Gates **G0–G7** are Cleared or explicitly Deferred with rationale
- [ ] Constitutional Drift Protection (**§6.1**) has not been bypassed
- [ ] Completion rule **§7** is satisfied under the authorized execution class
- [ ] Institutional continuity (**§4** criterion 7) holds — Institution > undocumented founder knowledge
- [ ] Out-of-scope boundary **§8** is preserved
- [ ] Non-goals **§9** have not been reframed as success metrics
- [ ] Acceptance authority chain **§10** was followed (evidence → review → founder acceptance)
- [ ] No statement implies §7 activation, ADR change, Class B/C readiness, or customer-money authority
- [ ] Residual risks and revisit conditions are recorded
- [ ] Companion Evidence Register confidence model is applied without inferring missing proof

---

## 12. Relationship to Existing Governance

| Artifact | Relationship |
|----------|--------------|
| Constitutional Charter | Highest-order constraints; this framework may not weaken them |
| Governance Philosophy | Explains progress under uncertainty; does not replace this acceptance definition |
| UX Constitution | Binds interaction and trust posture for domains D3, D6, D8 |
| MVP Project Specification | Supplies product intent and §12 success criteria; this framework institutionalizes acceptance judgment |
| `HEDGR_STATUS.md` | Sole implementation activation / sequencing authority |
| Accepted ADRs | Bind architecture and execution boundaries within scope |
| ADR 0024 | Records the governance principle that MVP acceptance is evidence-gated, not feature-gated; does not duplicate this framework |
| Class B / off-ramp evidence programs | Domain-specific evidence machinery; not replaced by this framework |
| This framework + Evidence Register | Institutional Acceptance Standard and evidence recording model |

---

## 13. Non-Authorization Statement

This document is governance-only.

It does **not** approve, activate, sequence, or implement:

- Class A / B / C execution beyond currently authorized posture
- deposits, withdrawals, custody, rails, or stablecoin conversion
- ledger truth, accounting truth, or fund movement
- Copilot execution authority
- ADR drafting, ADR acceptance, or ADR amendment
- evidence intake, evidence acceptance, or readiness certification by itself
- customer-money activity
- ticket activation under `HEDGR_STATUS.md` **§7** / **§7a**

Any future evidence gathering, acceptance recording, or implementation work requires separate repo-governed authorization through the normal authority chain.

---

## 14. Rollback

Documentation removal only. No runtime impact. No migration required.
