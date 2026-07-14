# ADR 0025 — Repo-Native Green Lane Delegation Pilot

**Status:** Accepted  
**Date:** 2026-07-14  
**Accepted:** 2026-07-14  
**Decision Type:** Ops / Governance  
**Strategic Horizon:** Short-term (time-bounded pilot) with institutional relevance  
**Visibility:** Public (governance rationale; eligible for repo ADR export)  
**Owners:** Hedgr Core  
**Reversibility:** Reversible (deprecate / supersede this ADR; pause or revoke the pilot envelope in `HEDGR_STATUS.md`; restore prior `AGENTS.md` operator rules; retain this ADR as historical record)  
**Ticket of record:** `GOV-GREEN-001`  
**Notion mirror (non-authoritative):** D-033 (when staged)

---

## Acceptance note

This ADR establishes a **time-bounded Green Lane delegation pilot**: HedgrOps may prepare and govern routine, reversible Class A product-learning translation work inside a founder-authorized outcome envelope, without requiring founder approval for every low-consequence translation decision.

**Acceptance does not:**

- activate product experiments or implementation tickets;
- authorize HedgrOps to mutate the repository directly;
- make a HedgrOps brief automatically executable;
- create standing multi-ticket execution;
- make Green Lane synonymous with Class A;
- widen Class B / Class C, custody, rails, customer-money, legal, provider, or market authority;
- override `docs/ops/HEDGR_STATUS.md` **§7** / **§7a**.

Sequencing and implementation activation remain exclusively controlled by:

- `docs/ops/HEDGR_STATUS.md` **§7** / **§7a**
- accepted ADRs under `docs/decisions/`
- `AGENTS.md`
- active repo-native governance

The active pilot envelope, when open, is recorded in `docs/ops/HEDGR_STATUS.md` **§6g**. Concurrent tickets still require a separate Founder-approved governed-parallelism pass plus explicit **§7** / **§7a** naming.

---

## Context / Problem

Hedgr’s institutional model correctly preserves founder authority over outcomes and material decisions, and repo-native activation through **§7** / **§7a**.

For routine, reversible Class A product-learning work, requiring founder-by-founder approval of every low-consequence translation decision creates unnecessary decision-to-test latency without improving capital-preservation posture.

Without a repo-native Green Lane model:

- HedgrOps cannot reliably frame bounded Class A experiments or issue experiment-local dispositions inside an authorized outcome;
- operators may confuse classification, recommendation, and activation;
- Green Lane language from adjacent proposals (for example Bridge capability notes) can drift into implied standing execution authority.

The institutional problem is latency and translation friction for containable Class A learning — not a shortage of founder control over outcomes, activation, or material risk.

---

## Decision

### 1. Green Lane delegation principle

Within a founder-authorized outcome and a recorded, time-bounded delegation envelope, HedgrOps may:

- frame assumptions;
- define bounded Class A experiments;
- prepare Cursor or Codex briefs;
- order work **inside an already active** **§7** / **§7a** ticket;
- issue experiment-local dispositions: retain, bounded revise, retest, remove experiment-local material, or escalate.

HedgrOps receives **bounded translation and product-learning disposition authority**, not independent ticket activation or unrestricted sequencing authority.

### 2. Authority separation (binding)

| Authority | Holder | May | Must not |
| --------- | ------ | --- | -------- |
| **Founder outcome authority** | Founder | Authorize outcome, delegation envelope, consequence level, timebox, concurrency, and escalation thresholds | Be inferred from HedgrOps briefs or Green Lane labels |
| **HedgrOps translation authority** | HedgrOps | Translate inside the active envelope; prepare briefs; issue permitted dispositions | Activate tickets; mutate the repo as independent authority; treat briefs as executable |
| **Repo activation authority** | `HEDGR_STATUS.md` **§7** / **§7a** | Name active tickets and exact file scope | Be bypassed by Green Lane classification or HedgrOps recommendation |
| **Cursor / Codex execution responsibility** | Operators | Implement only active, bounded repo scope | Infer expanded authority from Green Lane status or HedgrOps recommendations |

### 3. Green Lane definition (all conditions required)

Green Lane work must satisfy every condition below:

1. Synthetic or otherwise explicitly authorized Class A work.
2. Non-financial and non-executing.
3. Reversible and readily containable.
4. Within a founder-authorized outcome.
5. Within an active repo-native scope (**§7** / **§7a**).
6. No widening of product, market, data, security, trust, legal, provider, custody, rail, or financial authority.
7. No change to execution class.
8. No implication of live financial capability.
9. No material change to the product thesis.
10. No material architectural fork.
11. Explicit assumptions and learning objective.
12. Defined verification and rollback.
13. Evidence capture and final disposition.
14. Immediate escalation when any condition ceases to hold.

**Class A is not automatically Green.** A Class A task may still require founder review when it changes the product thesis, introduces sensitive data, creates a material trust claim, selects a market or provider, changes a canonical architecture boundary, or creates an external commitment.

### 4. Relationship to Class A / B / C

- Green Lane is a **delegation / consequence classification** for routine reversible Class A product-learning translation.
- It does **not** redefine Class A, Class B, or Class C.
- Green Lane never authorizes Class B or Class C work.
- Yellow / Red treatment applies when scope, risk, or authority exceeds Green conditions; affected work pauses and escalates.

### 5. Relationship to §7 / §7a and singular-ticket / parallelism

- **§7** / **§7a** remain the sole implementation activation surfaces.
- Green Lane classification does **not** activate work and does **not** override **§7** / **§7a**.
- The singular-ticket default remains intact.
- Multiple active implementation tickets still require the existing Founder-approved governed-parallelism mechanism (`HEDGR_STATUS.md` **§6e** lane model + separate active-pass naming). Green Lane delegation does **not** create parallel authority.

### 6. Pilot posture

This ADR authorizes a **time-bounded pilot**, not an evergreen backlog.

Default pilot envelope (recorded operationally in **§6g**):

- Class A only
- one active implementation ticket unless a separate parallel pass is named
- no external spend
- no contractual commitment
- no production integrations
- no unapproved personal or regulated data
- no customer-money behavior
- no Class B or Class C work
- founder-revocable at any time

Do not record a Green Lane product experiment in status unless the founder has separately named the authorized outcome and **§7** / **§7a** activate that work.

### 7. Explicit non-delegations

Founder and repo-native authority remain over:

- ticket activation;
- cross-ticket implementation sequencing;
- governed parallel-pass authorization;
- custody;
- customer-money activity;
- deposits, withdrawals, conversion, settlement, or treasury operations;
- live or production integrations;
- new markets, jurisdictions, providers, rails, assets, chains, or custodians;
- personal or regulated data beyond existing authority;
- regulatory or legal representations;
- market, provider, or product-readiness claims;
- Class B or Class C implementation;
- acceptance of external legal, vendor, operational, or sandbox evidence;
- institutional MVP acceptance;
- doctrine changes;
- ADR acceptance or supersession;
- material architecture, budget, or timeline changes.

HedgrOps must not mutate the repository as an independent authority. Operators implement only through active **§7** / **§7a** scope.

### 8. Permitted dispositions and escalation

Within an active envelope, HedgrOps may issue: **retain**, **bounded revise**, **retest**, **remove experiment-local material**, or **escalate**.

Escalate when a disposition would:

- alter the core product thesis;
- alter trust posture materially;
- alter data or security posture;
- alter accepted architecture;
- affect canonical engine contracts;
- alter accepted ADR meaning;
- modify execution class;
- create legal or provider exposure;
- change the authorized outcome;
- introduce material budget or timeline impact;
- remove a canonical or ADR-backed product surface.

**Removal** is permitted only for experiment-local or explicitly delegated material. Removal of canonical, accepted, ADR-backed, or shipped trust surfaces requires escalation.

### 9. Evidence and convergence

Every delegated work item must state:

- product uncertainty or assumption;
- target user or evidence source;
- testable deliverable;
- success signal;
- failure signal;
- ambiguity signal;
- rollback or stop condition;
- evidence captured;
- final disposition;
- escalation decision, where applicable.

Repeated testing without a disposition is **convergence drift** and must be identified and stopped.

User research is not automatically Green. Research involving recordings, contact information, compensation, financial circumstances, cross-border handling, or sensitive participant data requires separate data-posture authorization.

### 10. Review, narrowing, revocation, and kill criteria

Review after one product-learning cycle or approximately three weeks. Assess:

- decision-to-test latency;
- founder routing burden;
- authority-boundary preservation;
- number of experiments reaching a clear disposition;
- missing or late escalations;
- conflicting product narratives;
- operator misinterpretation;
- governance overhead;
- whether the delegation should be retained, narrowed, revised, expanded, or revoked.

**Expansion is not automatic.**

Kill / revoke / narrow when:

- Green Lane is treated as standing or evergreen execution;
- HedgrOps briefs are treated as active tickets;
- Class A is treated as automatically Green;
- “reversible” is used to justify material trust or architectural change;
- product testing continues without dispositions;
- Green work silently becomes provider or market research;
- user evidence is treated as institutional evidence acceptance;
- Green Lane is used to bypass **§7** / **§7a**;
- historical parallel-pass authority is treated as standing;
- authority surfaces duplicate or contradict each other.

Rollback: deprecate or supersede this ADR through repo convention; remove or restore related `AGENTS.md` operator rules; mark the delegation paused or revoked in `HEDGR_STATUS.md` **§6g**; reconcile Notion staging; confirm no active ticket relies solely on the revoked delegation. Do not silently rewrite historical decision records.

---

## Rationale

- Reduces decision-to-test latency for containable Class A learning while preserving founder outcome authority and repo activation discipline.
- Makes the institutional distinction between classification, translation, activation, and implementation unmistakable.
- Complements ADR **0023** (Governed Progress Under Uncertainty) without creating a second concurrency or ticket-activation surface.
- Prevents Bridge or conversational Green Lane language from becoming shadow authority.

### Alternatives considered

| Alternative | Why rejected |
| ----------- | ------------ |
| Leave Green Lane in conversation / Bridge proposals only | Not durable; creates memory-led authority drift |
| Treat Green Lane as automatic Class A execution | Collapses classification into activation; bypasses **§7** / **§7a** |
| Grant HedgrOps independent ticket activation | Violates repo authority model and singular-ticket / parallelism controls |
| Create standing multi-ticket Green backlog | Creates evergreen bypass of founder sequencing |
| Duplicate full operating manual outside ADR / STATUS / AGENTS | Risks competing authority surfaces |

---

## Assumptions

- Operators will continue to treat **§7** / **§7a** as the only ticket-activation surface.
- Founder outcome envelopes will be recorded repo-natively before Green Lane dispositions are used.
- Class A / B / C meanings remain unchanged.
- Governed parallelism remains a separate Founder-approved exception, not a Green Lane entitlement.

---

## Risks / Trade-offs

| Risk | Mitigation |
| ---- | ---------- |
| Green Lane becomes evergreen backlog | Timebox; review; kill criteria; founder revocation |
| HedgrOps briefs treated as active tickets | Explicit non-authorization; operator stop rules in `AGENTS.md` |
| Class A treated as automatically Green | Preserve Class A ≠ Green distinction |
| “Reversible” used for material trust/architecture change | Escalation rules; non-delegations |
| Bypass of **§7** / **§7a** | Binding statement that classification does not activate |
| Documentation drift across ADR / AGENTS / STATUS | Principle in ADR; operator checks in AGENTS; envelope in **§6g**; no optional duplicate unless necessary |

---

## Consequences

### Positive

- Durable authority model for bounded Class A product-learning translation
- Lower founder routing burden for low-consequence dispositions
- Clearer operator stop conditions and escalation paths

### Negative

- Additional governance vocabulary and review discipline
- Risk of over-application if operators ignore Class A ≠ Green

---

## Related Decisions

- ADR 0023 — Governed Progress Under Uncertainty (evidence ≠ authority; progress under incomplete information)
- ADR 0024 — MVP acceptance is evidence-gated, not feature-gated (unchanged)
- ADR 0013 / 0014 / 0015 — allocation informational; read-only engine; engine as system center (unchanged)
- Internal **D-026** / **§6e** — governed parallelism lane model (unchanged; Green Lane does not create parallel authority)
- Internal **D-032** / **§6f.3** — time-bounded parallel pass naming `CLASS-A-VAL-001` + `GOV-GREEN-001` (pass authority only; not standing)

---

## Related Artifacts

- `docs/ops/HEDGR_STATUS.md` — **§6g** pilot envelope; **§7** / **§7a** activation
- `AGENTS.md` — Green Lane operator verification and stop rules
- `docs/ops/NOTION_GOVERNANCE_STAGING.md` — non-authoritative mirror when reconciled
- `docs/ops/governance/HEDGR_GOVERNED_PARALLEL_PASS_CHECKLIST.md` — subordinate parallel-pass procedure only

---

## References

- `docs/doctrine/hedgrops-decision-governance-and-adr-export-standard.md`
- `docs/doctrine/hedgr-governance-philosophy.md`
- `.cursorrules` doctrine precedence
- `GOV-GREEN-001` activation / closeout in `docs/ops/HEDGR_STATUS.md` **§135** / **§136**
