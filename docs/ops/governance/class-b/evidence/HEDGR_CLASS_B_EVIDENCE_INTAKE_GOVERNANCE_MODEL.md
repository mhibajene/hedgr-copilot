# HEDGR - Class B Evidence Intake Governance Model

## 1. Status / Authority / Scope

**Status:** Governance model; documentation-only.

**Authority:** Non-authoritative governance model subordinate to `AGENTS.md`, `docs/ops/HEDGR_STATUS.md`, `docs/ops/NOTION_GOVERNANCE_STAGING.md`, accepted ADRs, doctrine, the completed Class B Governance Spine (`GOV-B-001` through `GOV-B-017`), the completed Class B Evidence Gathering program (`EVID-B-001` through `EVID-B-022`), `GOV-REVIEW-B-001`, `EVID-INTAKE-B-001`, and `GOV-CHECKPOINT-B-001`.

**Scope:** Defines the governance model that would be required before any future Class B evidence-intake activity could be authorized. It documents intake authority boundaries, evidence ownership and custodianship boundaries, source-pointer and provenance requirements, registry state-change controls, conflict / supersession / freshness / retirement handling rules, governance review boundaries, open questions, and non-authorization limits.

**Mode:** Governance framing only. This model does not gather evidence, collect evidence, request evidence, accept evidence, reject evidence, score evidence, evaluate evidence, change registry state, change evidence state, close blockers, close gaps, establish readiness, authorize implementation, or authorize customer-money activity.

**Ticket:** `GOV-INTAKE-B-002` - Class B Evidence Intake Governance Model (documentation-only).

**Ticket ID:** `GOV-INTAKE-B-002`
**Track:** Class B Evidence Intake Governance
**Type:** Documentation-only governance model
**Authority level:** Non-authorizing
**Implementation authority:** None

This model is subordinate to, in order:

1. `AGENTS.md`
2. `docs/ops/HEDGR_STATUS.md`
3. `docs/ops/NOTION_GOVERNANCE_STAGING.md`
4. Accepted ADRs
5. `GOV-CHECKPOINT-B-001`
6. `EVID-INTAKE-B-001`
7. `GOV-REVIEW-B-001`
8. `EVID-B-001` through `EVID-B-022`
9. `GOV-B-001` through `GOV-B-017`

Current repository posture remains read-only, non-executing, governance-constrained, and documentation-only. No authority widening is permitted by this artifact.

---

## 2. Purpose

This model exists to define the governance boundary that would need to exist before any future evidence-intake phase could be separately authorized.

It answers:

**What governance controls, ownership boundaries, source-pointer requirements, registry state-change rules, and review boundaries would need to be defined before Class B evidence intake could be contemplated?**

It does not answer:

**Has evidence intake been authorized, has evidence been gathered, has evidence been accepted, is any evidence sufficient, is Class B ready, or may implementation or customer-money activity begin?**

This model explicitly does **not**:

- authorize evidence intake,
- identify actual evidence,
- request evidence from any owner, vendor, provider, reviewer, or external party,
- accept, reject, score, or evaluate evidence,
- move any registry row from `Question framed / Missing`,
- close blockers or gaps,
- establish readiness,
- authorize implementation.

It additionally does not authorize customer-money activity.

---

## 3. Intake Authority Boundaries

Evidence intake, if ever authorized later, would require explicit repo-governed authority through `docs/ops/HEDGR_STATUS.md` `§7` naming and a bounded `§7a` brief where applicable. This model does not grant that authority.

Future intake authority would need to preserve the following boundaries:

| Boundary | Governance model | Non-authorization boundary |
|---|---|---|
| Initiation authority | A future governed ticket would need to name who may initiate intake for a defined evidence scope. | This model names no active intake owner and initiates no intake. |
| Intake scope | A future ticket would need to bind intake to specific evidence packages, source classes, and source-pointer requirements. | This model does not add evidence, request evidence, or widen package scope. |
| Source acceptance | A future governed review would need to determine whether a preserved source can be relied on for a limited downstream purpose. | This model does not accept, reject, approve, or validate any source. |
| Registry movement | A future ticket would need source pointers and review evidence before any registry row changes state. | This model does not modify the Evidence Registry or any registry row. |
| Review handoff | A future process would need to distinguish intake from evidence review, acceptance, sufficiency, readiness, and implementation. | This model creates no review authority or downstream readiness authority. |

No person, role, agent, tool, repo artifact, Notion mirror, or external system is assigned live authority to gather, preserve, request, accept, reject, score, evaluate, or rely on evidence by this model.

---

## 4. Evidence Ownership And Custodianship Model

Future evidence intake would need a documented ownership and custodianship model before evidence records could be preserved or maintained. The model below is governance framing only.

| Role class | Future responsibility to define | Boundary |
|---|---|---|
| Evidence source owner | Who owns the originating source, source class, date, scope, and source limitations. | No source owner is assigned here. |
| Evidence custodian | Who preserves the evidence record, source pointer, access boundary, freshness marker, and audit trail. | No custodian is assigned here. |
| Registry maintainer | Who may propose registry updates after governed review and source-pointer preservation. | No registry-maintenance authority is created here. |
| Evidence reviewer | Who may review source quality, relevance, freshness, conflicts, supersession, and dependencies. | No reviewer is assigned and no review begins here. |
| Governance approver | Who may approve a future state change or downstream reliance where repo governance allows it. | No approval authority is created here. |
| Legal / compliance reviewer | Who may provide qualified legal or compliance review where required. | No legal conclusion, advice, or regulatory approval is provided here. |

Minimum custodianship questions that remain open:

- [ ] Who would hold evidence custodianship if future intake were authorized?
- [ ] Who would maintain source pointers and provenance records?
- [ ] Who would own freshness review expectations by source class?
- [ ] Who would preserve conflict, supersession, and retirement records?
- [ ] Who would maintain traceability between evidence, registry rows, review records, ADR readiness review, and implementation-proposal preflight review?
- [ ] Who would confirm access boundaries, confidentiality boundaries, and retention expectations?

These questions have no answers in this model. They assign no owners, duties, approvals, or authority.

---

## 5. Source-Pointer And Provenance Requirements

Every future evidence item would need a source pointer before any downstream review could occur. A source pointer is not evidence acceptance; it is a traceability requirement.

Minimum future source-pointer fields:

| Field | Required detail | Non-authorization boundary |
|---|---|---|
| Evidence title | Stable title for the preserved evidence item. | Does not mean the evidence is current, complete, or accepted. |
| Evidence package | Registry package the evidence would relate to. | Does not move the package from `Question framed / Missing`. |
| Source class | One source class from the Evidence Registry source-class legend. | Does not approve the source class as sufficient. |
| Source pointer | Repo path, document reference, preserved record, vendor reference, review record, or other specific pointer. | Does not validate or certify the source. |
| Source date | Date of source creation, receipt, or preservation where knowable. | Does not establish freshness. |
| Freshness / review date | Required review date or "review date required before use" if unknown. | Does not approve reliance. |
| Evidence owner | Future governed owner or placeholder. | Does not assign ownership here. |
| Custodian | Future governed custodian or placeholder. | Does not assign custody here. |
| Related blocker | Registry blocker or governance dependency the evidence may relate to. | Does not close the blocker. |
| Claims supported | Claim the evidence may support after review. | Does not establish that the claim is true. |
| Claims not supported | Limits, exclusions, or unresolved claims. | Does not waive unresolved gaps. |
| Conflicts identified | Known contradiction or authority conflict. | Does not resolve conflicts. |
| Supersession status | Current, replaced, superseded, retired, or unknown after review. | Does not supersede or retire anything here. |
| Non-authorization note | Explicit statement that intake does not approve evidence, readiness, implementation, or customer-money movement. | Required on any future intake record. |

Provenance must remain specific enough for future review. Summary-only references, undocumented memory, loose conversation, Notion-only text, inferred continuity, or unpreserved external claims would not satisfy this model.

---

## 6. Registry State-Change Controls

The Evidence Registry remains the controlling evidence-state surface. This model does not modify it.

Before any future row could move from `Question framed / Missing`, a separate governed ticket would need to provide at minimum:

1. explicit `HEDGR_STATUS.md` `§7` naming or another repo-governed authority surface accepted for that exact state-change action,
2. bounded `§7a` scope where applicable,
3. source pointer,
4. source class,
5. preservation record,
6. freshness / review expectation,
7. conflict check,
8. supersession check,
9. dependency check,
10. owner / custodian boundary,
11. non-authorization statement,
12. evidence-review record where the target state requires review,
13. legal / compliance review where applicable,
14. accepted ADR where required,
15. explicit statement of what the state change does **not** authorize.

Registry state changes must not be inferred from:

- existence of this governance model,
- existence of planning memos,
- existence of package skeletons,
- Notion staging copy,
- memory,
- external conversation,
- implied founder intent,
- future-work observations,
- review artifacts that explicitly preserve non-authorization boundaries.

No registry row is moved, no evidence state is changed, and no blocker is closed by this model.

---

## 7. Conflict, Supersession, Freshness, And Retirement Rules

Future evidence intake would need rules for preserving uncertainty and preventing stale or conflicting evidence from becoming silent authority.

### Freshness

- Every future evidence record would need a dated source and a freshness / review expectation.
- Unknown freshness should be marked as review required before use.
- Stale evidence should remain visible and should not be reused as current by inference.
- Freshness review does not mean evidence acceptance, sufficiency, readiness, or implementation authority.

### Conflict

- Contradictory sources should be preserved as unresolved unless a future governed review explicitly resolves the conflict.
- Conflicts between repo authority, evidence sources, Notion mirrors, external systems, or memory must be surfaced rather than reconciled by inference.
- Conflict handling does not authorize evidence rejection, evidence acceptance, blocker closure, or readiness.

### Supersession

- Replacing one source with another would require a retained prior-source pointer, replacement source pointer, supersession rationale, date, owner / custodian record, and future governed review.
- Supersession must not become silent deletion.
- Superseded evidence must not be reused as current without future review.

### Retirement

- Evidence retirement would require a retained source pointer, retirement reason, archival / retention expectation, replacement dependency if any, and future governed review.
- Retirement does not close the underlying evidence need unless a future governed ticket explicitly records the downstream state and its non-authorization limits.

These rules are governance framing only. They perform no freshness review, conflict resolution, supersession, or retirement.

---

## 8. Governance Review Boundaries

Future governance work must preserve the distinction between intake, review, acceptance, sufficiency, blocker closure, readiness, and implementation authority.

| Stage | Meaning | Boundary |
|---|---|---|
| Evidence intake | Preserving a source pointer and provenance record under a governed scope. | Does not accept, reject, score, or evaluate evidence. |
| Evidence review | Reviewing source quality, relevance, freshness, conflicts, and dependencies. | Does not automatically accept evidence or establish readiness. |
| Evidence acceptance | Future governed determination that evidence may support a limited downstream planning or review purpose. | Does not authorize implementation, staging, live operations, or customer-money movement. |
| Sufficiency assessment | Future governed assessment of whether evidence is sufficient for a bounded decision or preflight. | Does not close blockers unless separately recorded. |
| Blocker / gap closure | Future governed determination that a specific blocker or gap is closed. | Does not create Class B readiness by itself. |
| ADR drafting readiness | Future governed determination that ADR drafting may be considered. | Does not draft, accept, or sequence any ADR. |
| Implementation-proposal preflight | Future governed review of whether an implementation proposal may be considered. | Does not activate implementation or customer-money activity. |
| Implementation authority | Future explicit repo authority for implementation through `§7` / `§7a`, accepted ADRs where required, and scoped implementation controls. | Not created by this model. |

No stage above is initiated by this model.

---

## 9. Open Questions

The following remain open and unresolved:

- [ ] What future ticket, if any, would authorize evidence intake?
- [ ] Who would be allowed to initiate evidence intake under a future bounded scope?
- [ ] Who would own evidence custodianship and evidence record maintenance?
- [ ] What source-pointer storage pattern would be used for external legal / compliance review, vendor documentation, vendor confirmation, audit records, support records, operational records, and governance records?
- [ ] What access boundaries and confidentiality controls would apply to preserved evidence?
- [ ] What freshness expectations would apply by source class?
- [ ] What conflict-escalation path would be required when sources disagree?
- [ ] What supersession record would be required when evidence changes or is replaced?
- [ ] What retirement and archival rules would be required before older evidence could stop being treated as current?
- [ ] What review record would be required before any Evidence Registry row could move from `Question framed / Missing`?
- [ ] What legal / compliance review would be required before any source could support Class B ADR drafting readiness or implementation-proposal preflight?
- [ ] What accepted ADRs would be required before any future Class B implementation-proposal preflight could be considered?

These questions have no answers in this model. No recommendations, conclusions, approvals, readiness findings, evidence-state changes, registry-state changes, or implementation guidance are provided here.

---

## 10. Non-Authorization Statement

This governance model is non-authoritative and documentation-only. It defines future evidence-intake governance boundaries only. It does not gather evidence, collect evidence, request evidence, identify actual evidence, accept evidence, reject evidence, score evidence, evaluate evidence, approve evidence, change registry state, change evidence state, close blockers, close gaps, define readiness thresholds, establish Class B readiness, establish ADR drafting readiness, establish implementation readiness, establish operational readiness, authorize implementation, authorize customer-money activity, provide legal advice, provide regulatory approval, approve external engagement, approve custody, approve rails, approve vendors, approve deposits, approve withdrawals, approve treasury operations, approve reconciliation operations, approve support operations, approve audit operations, approve ledger mutation, approve Copilot execution, approve Class C automation, or approve customer fund movement.

Any future evidence intake, evidence collection, evidence acceptance, evidence review, gap closure, blocker closure, ADR drafting readiness, implementation-proposal preflight, implementation work, staging, sandbox use, internal testing, live operations, or customer-money activity still requires separate repo-governed authorization through `docs/ops/HEDGR_STATUS.md` where applicable, a bounded `§7a` brief where applicable, accepted ADRs where required, qualified legal / compliance review where applicable, relevant spine-artifact review, relevant evidence package review, source pointers, freshness review, conflict review where applicable, dependency review where applicable, and audit / retention evidence where applicable.
