# Hedgr Governance Philosophy — Governed Progress Under Uncertainty

**Status:** Binding (governance operating philosophy)  
**Visibility:** Public governance rationale (subject to founder confidentiality review of any external excerpt)  
**Ticket of record:** `GOV-PHILOSOPHY-001`  
**Adoption ADR:** `docs/decisions/0023-governed-progress-under-uncertainty.md`  
**Date:** 2026-07-10

---

## 1. Authority posture

This document is the canonical Hedgr Governance Philosophy for making disciplined progress when complete information is unavailable.

It is subordinate to, and must not be read as overriding:

1. `docs/ops/HEDGR_STATUS.md` — especially **§7** / **§7a** sequencing authority
2. `AGENTS.md` — repo workflow, CI posture, and ticket-sequencing controls
3. Accepted ADRs under `docs/decisions/`
4. Higher-precedence doctrine in `.cursorrules` (Constitutional Charter and UX Constitution remain above this philosophy)
5. Active Class B, off-ramp, brand, and other lane-specific governance artefacts within their scopes

This philosophy does **not**:

- activate Class B work
- change the current execution class
- authorize implementation by itself
- approve custody, rail, legal, regulatory, or financial claims
- create authority from founder conversation alone
- convert exploratory evidence into implementation direction
- widen ticket-activation or sequencing authority beyond `HEDGR_STATUS.md` **§7** / **§7a**

Execution truth continues to resolve to `HEDGR_STATUS.md`, `AGENTS.md`, accepted ADRs, and active repo-native doctrine and governance files.

---

## 2. Core principle — Governed Progress Under Uncertainty

> Hedgr may progress under uncertainty only where assumptions are explicit, risks are bounded, decisions are governed, and reversal remains credible.

Hedgr will not treat incomplete information as a reason for indefinite inactivity.

Hedgr will also not treat momentum, founder confidence, research findings, AI output, investor expectations, or implementation capability as permission to bypass governance.

Where full legal, regulatory, operational, market, or technical certainty is unavailable, Hedgr may proceed through governed assumptions only when the relevant decision is:

1. Explicitly documented
2. Consistent with current repo-native authority
3. Risk-classified
4. Bounded in scope and exposure
5. Reversible wherever reasonably possible
6. Supported by a defined validation path
7. Assigned objective revisit or expiry conditions
8. Protected by clear stop or rollback criteria
9. Honest about unresolved dependencies
10. Prevented from silently hardening into permanent policy

Uncertainty must remain visible.

A provisional assumption must never be presented as established legal, operational, accounting, or execution truth.

This principle elaborates Constitutional Charter **Article IV — Governance Before Scale**. It does not replace the Charter.

---

## 3. Distinctions operators must preserve

| Class | Meaning | May authorize execution? |
| ----- | ------- | ------------------------ |
| **Responsible provisional progress** | Bounded work under an explicit governed assumption, inside current authority | Only if **§7** / **§7a** already name the work |
| **Exploration and evidence generation** | Research, prototypes, critique, source-pointer intake, synthesis | No — evidence only |
| **Accepted governance decisions** | Accepted ADRs, Accepted Founder decisions recorded in repo-native form, binding doctrine | Within their stated scope only; still subject to **§7** for implementation |
| **Current execution authority** | Named active ticket(s) in `HEDGR_STATUS.md` **§7** / **§7a** | Yes — only inside the named brief |
| **Externally gated decisions** | Legal, regulatory, vendor, or specialist confirmation still required | No — remain gated until confirmation and repo-native acceptance |

---

## 4. Core governance rules

### 4.1 Assumptions must be governed

Every material assumption used to support progress must record:

- The assumption
- Why it is currently necessary
- Available evidence
- Missing evidence
- Risk classification
- Decision owner
- Affected surfaces
- Reversibility
- Validation path
- Review trigger or expiry date
- Stop or rollback condition

### 4.2 Reversibility must be designed, not merely claimed

A decision is not reversible solely because documentation says it is.

The implementation or operating model must show how reversal would occur, including as applicable:

- Configuration or feature-flag controls
- Data migration implications
- User communication requirements
- Contract or vendor dependencies
- Operational unwind requirements
- Financial exposure
- Documentation updates
- Responsible owner

Reject, or escalate, decisions whose unwind cost or dependency structure cannot be described.

### 4.3 Parallel lanes are permitted; ungoverned convergence is not

Hedgr may operate multiple governed lanes concurrently when repo authority permits (see `HEDGR_STATUS.md` **§6e** / `AGENTS.md` deny-by-default parallelism exception), including:

- Product and UX
- Class B operational readiness
- Legal and regulatory research
- Architecture
- Local rail exploration
- User research
- Investor demonstration preparation

However:

> Parallel lanes are permitted. Ungoverned convergence is not.

One lane must not silently widen the authority, user claims, or operational posture of another.

Absence, ambiguity, pause, or deprecation of a parallelism decision restores the singular-ticket default.

### 4.4 Exploration creates evidence, not authority

Research, prototypes, frontier-model analysis, user feedback, architectural exploration, and off-ramp investigations may:

- Identify blockers
- Challenge assumptions
- Surface alternatives
- Improve decision quality
- Open potential workstreams

They may not independently:

- Activate tickets
- Change implementation sequencing
- Authorize execution
- Approve legal posture
- Override governance
- Become production truth

### 4.5 External-feedback lag must be mitigated explicitly

Where legal, regulatory, vendor, or specialist review is pending:

- The dependency must be documented
- Relevant wording or behavior must be marked internally as provisional
- Claims must remain conservative and deny-by-default
- Work may continue only inside a reversible boundary
- A clear point must be defined beyond which external confirmation is required

### 4.6 Tangibility is a legitimate objective

Hedgr may deliberately work toward tangible artefacts suitable for:

- Closed-user feedback
- Investor demonstration
- Legal review
- Partner discussion
- Operational learning

Tangibility must not be confused with:

- Production readiness
- Regulatory approval
- Legal certainty
- General availability
- Automated execution
- Proven market demand

Closed-testing and investor-demo surfaces must remain labelled as simulation, provisional, non-production, or otherwise non-authoritative where that is the system truth.

### 4.7 Provisional decisions must not become permanent by inertia

Every provisional governance decision must include at least one of:

- Review date
- Expiry date
- Evidence threshold
- External-review trigger
- Phase-transition gate
- Superseding ADR requirement

Expired or unsupported assumptions must be revisited, renewed with rationale, replaced, or removed.

---

## 5. Decision classification — Provisional — Governed Assumption

### Status label

**Provisional — Governed Assumption**

### Use when

- A material decision is required to maintain progress
- Complete external confirmation is unavailable
- The decision remains within current authority
- Risk can be bounded
- Reversal is credible
- The unresolved dependency is explicitly tracked

### Must not be treated as equivalent to

- Accepted doctrine
- Accepted ADR
- Legal approval
- Execution authorization
- Production readiness

Governed assumptions cannot widen execution authority. They may only support progress already permitted by current repo-native authority, or prepare decision quality for a future separately authorized ticket.

---

## 6. Canonical provisional-decision record

Each governed assumption should include:

```text
Decision / Assumption:

Status:
Provisional — Governed Assumption

Problem / Trigger:

Current Evidence:

Missing Evidence:

Authority Basis:

Scope:

Affected Systems / Surfaces:

Risk Classification:

User-Trust Impact:

Legal / Regulatory Dependency:

Operational Dependency:

Reversibility Mechanism:

Validation Path:

Review Trigger / Expiry:

Stop Condition:

Rollback Procedure:

Decision Owner:

Related ADRs / Tickets:
```

Records may live in the Internal Decision Log, a ticket brief, an ops governance artefact, or an ADR assumptions section, provided the fields above are recoverable and the status remains visibly provisional until superseded.

This record structure complements — and does not replace — the canonical decision structure in `docs/doctrine/hedgrops-decision-governance-and-adr-export-standard.md`.

---

## 7. Relationship to existing governance surfaces

| Surface | Role relative to this philosophy |
| ------- | -------------------------------- |
| Constitutional Charter | Highest product/system constraints; Article IV is elaborated here |
| `hedgrops-decision-governance-and-adr-export-standard.md` | How decisions are logged and exported; adopts Provisional status vocabulary |
| `HEDGR_STATUS.md` **§7** / **§7a** | Sole implementation / ticket activation authority |
| `AGENTS.md` | Agent execution and sequencing controls |
| Accepted ADRs | Binding scoped architecture and product decisions |
| Exploration / evidence artefacts | Evidence inputs only |
| Governed parallel-pass checklist | Procedural support for separately authorized parallelism |

---

## 8. Anti-misread rules

Do not interpret this philosophy as:

- Class B authorization
- Legal approval
- Ticket activation authority
- Permission to bypass ADRs
- Permission to implement from AI, review, or research evidence alone
- Permission to present provisional assumptions as production, regulatory, custody, performance, or execution truth
- Standing concurrency authority (parallelism remains deny-by-default per `HEDGR_STATUS.md` **§6e**)

---

## 9. Rollback of this philosophy

If this philosophy creates ambiguity, duplicates stronger governance, or is interpreted as widening implementation authority:

1. Revert this doctrine document and related pointers
2. Retain ADR **0023** as Proposed, Deprecated, or Rejected historical evidence per repo conventions
3. Reframe any surviving content as an amendment to an existing canonical governance artefact
4. Do not preserve multiple competing philosophy versions

---

## 10. References

- `docs/doctrine/hedgr-constitutional-charter.md` — Article IV
- `docs/doctrine/hedgrops-decision-governance-and-adr-export-standard.md`
- `docs/decisions/0023-governed-progress-under-uncertainty.md`
- `docs/ops/HEDGR_STATUS.md`
- `AGENTS.md`
- `docs/ops/governance/HEDGR_GOVERNED_PARALLEL_PASS_CHECKLIST.md`
