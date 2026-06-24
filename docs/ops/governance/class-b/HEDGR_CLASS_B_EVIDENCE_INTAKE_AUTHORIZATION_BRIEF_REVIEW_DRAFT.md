# HEDGR - Class B Evidence Intake Authorization Brief Review Draft

**Document status:** Review draft only
**Prepared date:** 2026-06-24
**Ticket:** `GOV-A-REV-001` - Tighten Class B Evidence Intake Authorization Brief for Final Governance Review
**Working future ticket label:** `EVID-INTAKE-B-002` - placeholder only unless and until `docs/ops/HEDGR_STATUS.md` `§7` names an approved ticket with bounded `§7a` scope
**Authority level:** Non-authorizing review artifact
**Implementation authority:** None
**Evidence intake authority:** None
**Evidence review authority:** None
**Evidence acceptance authority:** None
**Customer-money authority:** None

---

## 1. Status / Authority / Scope

This artifact is a governance review candidate. It refines the proposed evidence-intake authorization concept for final founder / governance review before any repo translation or `§7` activation is considered.

It is subordinate to:

1. `docs/ops/HEDGR_STATUS.md`
2. `AGENTS.md`
3. accepted ADRs
4. `.cursorrules`
5. `docs/doctrine/hedgr-constitutional-charter.md`
6. `docs/doctrine/hedgr-mvp-project-specification.md`
7. the completed Class B Governance Spine (`GOV-B-001` through `GOV-B-017`)
8. the completed Class B Evidence Gathering program (`EVID-B-001` through `EVID-B-022`)
9. `GOV-REVIEW-B-001`
10. `EVID-INTAKE-B-001`
11. `GOV-CHECKPOINT-B-001`
12. `GOV-INTAKE-B-002`

Current repo truth remains:

- `HEDGR_STATUS.md` `§7` names no approved next ticket.
- `HEDGR_STATUS.md` `§7a` holds no active execution brief.
- `GOV-INTAKE-B-002` is complete as a documentation-only governance model and did not authorize evidence intake.
- Class B evidence packages remain `Question framed / Missing`.
- No Class B blocker is closed.

This draft does not create a new authority surface. It does not add, activate, sequence, or approve any ticket.

---

## 2. Purpose

The purpose of this review draft is to separate three governance layers that were previously blended:

| Layer | Purpose | Boundary |
|---|---|---|
| Layer A - Authorization Brief | Define what a future evidence-intake ticket may authorize. | Does not itself authorize intake. |
| Layer B - Evidence Governance Standard | Define intake mechanics that a future ticket may adopt. | Does not collect, review, or accept evidence. |
| Layer C - Evidence Question Map | Preserve future evidence questions by domain. | Does not establish operational, legal, ADR, or implementation readiness. |

The current Class B issue is not lack of scaffolding. The current issue is that evidence intake authority has not been granted, no evidence has been gathered, no evidence has been reviewed, no evidence has been accepted, no blockers are closed, and no downstream readiness or implementation authority exists.

---

## 3. Out Of Scope

This review draft does not authorize or perform:

- evidence intake activation
- evidence collection
- evidence requests
- evidence review
- evidence acceptance
- evidence rejection
- evidence scoring or sufficiency determination
- registry-state changes
- evidence-state changes
- blocker closure
- gap closure
- ADR creation
- ADR approval
- ADR drafting readiness
- implementation-preflight
- product implementation
- provider engagement
- vendor onboarding
- commercial negotiation
- sandbox-access request
- legal-retainer authority
- provider selection
- pilot activity
- customer-facing copy approval
- custody activation
- rail activation
- stablecoin conversion
- deposits
- withdrawals
- treasury operations
- liquidity buffers
- reconciliation operations
- support operations
- audit operations
- ledger mutation
- Copilot execution
- Class C automation
- customer-money activity
- customer fund movement

---

## 4. Layer A - Authorization Brief

### 4.1 Decision Statement For Future Review

If repo governance later decides to advance Class B, the next bounded move should be an evidence-intake authorization ticket only.

That future ticket may authorize collection, preservation, classification, and registry recording of evidence. It must not authorize evidence quality judgment, sufficiency determination, readiness, ADR drafting readiness, implementation-preflight, implementation, or customer-money activity.

The working label `EVID-INTAKE-B-002` is a placeholder for review. It is not repo authority, is not sequenced work, and is not an active ticket unless `HEDGR_STATUS.md` `§7` explicitly names it.

### 4.2 Permitted Future Intake Actions

A future `§7` / `§7a` ticket may authorize only the following, if explicitly named:

- preserve evidence already available under an approved bounded scope;
- request evidence only where the `§7a` brief separately authorizes the request channel and source class;
- receive evidence under documented source-pointer and confidentiality controls;
- classify evidence by registry package, source class, source date, jurisdiction / market if applicable, provider / rail if applicable, environment if applicable, and confidentiality tier;
- create source-pointer records;
- identify proposed evidence source owners, custodians, and registry maintainers as bounded role assignments for intake only;
- update registry rows from `Question framed / Missing` to `Evidence requested` only where an authorized request has been made and recorded;
- update registry rows from `Question framed / Missing` or `Evidence requested` to `Evidence received` only where evidence has been preserved with a source pointer and non-authorization note;
- record unresolved conflict flags without resolving conflicts;
- record freshness expectations, supersession references, retirement candidates, access limits, and retention references;
- create future review queue placeholders for governance visibility only.

### 4.3 Prohibited Authorities

A future intake ticket must not authorize:

- evidence review conclusions;
- evidence acceptance;
- evidence rejection;
- evidence scoring;
- blocker closure;
- gap closure;
- sufficiency determination;
- jurisdiction selection;
- legal conclusions;
- regulatory approval;
- customer eligibility approval;
- KYC / AML approval;
- sanctions / PEP responsibility approval;
- custody model approval;
- provider-of-record approval;
- rail approval or activation;
- stablecoin conversion;
- fiat conversion;
- deposits;
- withdrawals;
- treasury operations;
- liquidity buffers;
- reconciliation operations;
- support operations;
- audit operations;
- Trust UX final copy approval;
- ADR drafting readiness;
- implementation-proposal preflight;
- staging, sandbox, internal-test, limited-live, live, or production activation;
- external commercial engagement;
- vendor onboarding;
- commercial negotiation;
- sandbox-access request;
- legal-retainer authority;
- provider selection;
- Copilot execution;
- Class C automation;
- customer-money activity;
- customer fund movement.

### 4.4 External-Engagement Boundary

Evidence intake and external engagement are separate authorities.

Any future ticket must distinguish:

| Activity | Intake posture | Required boundary |
|---|---|---|
| Preserving already available public or repo-native evidence | May be in intake scope if `§7a` names it. | Source pointer and non-authorization note required. |
| Requesting evidence from a vendor, provider, regulator, legal reviewer, support owner, or operational owner | Not implied by intake authority. | Must be explicitly authorized by `§7a`, including channel, source class, and owner. |
| Vendor onboarding | Out of scope. | Requires separate authority. |
| Commercial negotiation | Out of scope. | Requires separate authority. |
| Sandbox access | Out of scope unless separately named. | Requires separate authority and environment boundary. |
| Legal retainer or legal instruction | Out of scope. | Requires separate founder / legal authority. |
| Provider selection | Out of scope. | Requires separate governed decision. |

### 4.5 Role Separation

Future role assignments must be explicit and bounded to intake. One person may hold multiple administrative roles in a small-team context, but no role assignment may imply review, acceptance, sufficiency, readiness, or implementation authority.

| Function | Intake-stage permission if authorized | Boundary |
|---|---|---|
| Governance approver | May approve the bounded intake ticket. | Does not approve evidence sufficiency or readiness. |
| Evidence intake lead | May coordinate authorized preservation and intake records. | Cannot accept, reject, score, or evaluate evidence. |
| Evidence custodian | May preserve records and access boundaries. | Does not validate evidence quality. |
| Registry maintainer | May record `Evidence requested` or `Evidence received` only when the future ticket permits it. | Cannot move rows to review, accepted, rejected, stale, or conflicting states unless separately authorized. |
| Evidence reviewer | Placeholder only at intake stage. | No evidence review begins. |
| Legal / compliance reviewer | Source class or future reviewer only. | No legal conclusion or regulatory approval is created by intake. |
| Product / engineering lead | Not granted. | No product, runtime, route, backend, workflow, or implementation authority. |
| Pilot ops owner | Not granted. | No support, reconciliation, manual execution, or customer-money operations. |

### 4.6 Review Queue Boundary

Review queues may be created only as placeholders for future governance use.

Review queues must not:

- imply evidence review has begun;
- imply a sufficiency determination;
- imply reviewer assignment authority;
- imply acceptance workflow activation;
- imply ADR drafting readiness;
- imply implementation-preflight readiness;
- close any blocker or gap;
- move evidence to `Under review`.

---

## 5. Layer B - Evidence Governance Standard

This layer defines candidate mechanics for a future intake ticket. It does not authorize evidence intake and does not change registry state.

### 5.1 Permitted Intake-Stage State Movements

Only a future `§7` / `§7a` ticket may allow these movements:

```text
Question framed / Missing -> Evidence requested
Question framed / Missing -> Evidence received
Evidence requested -> Evidence received
```

No other state movement belongs in an intake-only ticket.

### 5.2 States Reserved For Later Governance

The following states require separate governed review authority and must not be granted by an intake-only ticket:

```text
Under review
Accepted for planning
Accepted for ADR drafting readiness
Accepted for implementation-preflight consideration
Rejected / insufficient
Stale / requires refresh
Conflicting / requires escalation
```

An intake record may preserve a conflict flag, stale-source note, supersession note, or retirement candidate. That record must not resolve the issue or infer readiness.

### 5.3 Source-Pointer Record

Every future evidence item would need a stable source-pointer record before any downstream review could occur.

```text
Evidence ID:
Evidence title:
Evidence package:
Source class:
Source pointer:
Source date:
Date received:
Captured by:
Evidence source owner:
Evidence custodian:
Registry maintainer:
Reviewer placeholder:
Confidentiality tier:
Jurisdiction / market:
Provider / rail / chain:
Environment:
Claim potentially supported:
Claim not supported:
Related blocker:
Freshness / review date:
Conflicts identified:
Supersedes:
Superseded by:
Retention reference:
Access boundary:
Non-authorization note:
```

Required non-authorization note:

```text
This intake record preserves a source pointer only. It does not accept, reject,
score, evaluate, approve, or certify evidence; close any blocker or gap; establish
readiness; authorize ADR drafting; authorize implementation-preflight; authorize
implementation; or authorize customer-money activity.
```

### 5.4 Candidate Pointer Classes

Pointer classes are traceability formats only. They are not evidence approval and are not source sufficiency.

```text
repo://docs/path/file.md@commit:<hash>#section
legal://firm-or-counsel/matter/memo-title/date#scope
vendor-doc://provider/document/version/date/url-or-preserved-copy
vendor-confirmation://provider/contact/date/channel/ref
regulator://authority/page/date/url-or-preserved-copy
sandbox://provider/environment/test-run/date/log-ref
ops-dryrun://runbook/test/date/log-ref
support://case-or-exercise/date/ref
recon://statement-or-exception-log/date/ref
audit://record/date/ref
```

### 5.5 Confidentiality Tiers

```text
PUBLIC
INTERNAL
CONFIDENTIAL
RESTRICTED-LEGAL
RESTRICTED-PII-KYC
```

Handling rules:

- raw KYC, PII, sanctions, PEP, or legal advice must not be stored openly in repo;
- restricted evidence should be represented in repo only through redacted source pointers unless a future governed storage pattern says otherwise;
- repo-facing records should identify what claim the source may support and what claim it does not support;
- confidentiality classification does not make evidence sufficient, accepted, or current.

### 5.6 Freshness Rules

Freshness expectations are candidate defaults for future review. They do not establish source reliability or downstream reliance.

| Evidence type | Candidate freshness expectation |
|---|---|
| Legal / compliance memo | Review required before downstream reliance; tighter cadence during active regulatory change |
| Vendor permission / provider confirmation | Review required before reliance and on provider terms change |
| Fee / FX / spread evidence | Review required before reliance and after rate / fee schedule change |
| KYC / AML / sanctions policy | Review required before reliance and after policy or jurisdiction change |
| Custody terms | Review required before reliance and after terms / provider change |
| Settlement / finality evidence | Review required before reliance and after rail / chain / provider change |
| Incident / support / reconciliation dry-run | Review required before operational reliance |
| Trust UX copy | Review required before any customer-facing use |

Unknown freshness must be marked as review required before use.

### 5.7 Conflict Handling

If evidence conflicts, intake may only preserve the conflict.

Future intake records should:

1. mark the item as conflict-flagged;
2. freeze downstream reliance;
3. preserve both source pointers;
4. identify the possible conflict class;
5. route the conflict to a future governance review placeholder;
6. avoid resolving by inference.

Any source hierarchy must be treated as a review input, not an automatic resolution rule.

### 5.8 Supersession And Retirement

New evidence does not silently supersede old evidence.

Supersession would require:

- prior source pointer;
- replacement source pointer;
- supersession rationale;
- date;
- owner / custodian record;
- future governed review where reliance changes.

Retirement would require:

- source pointer;
- retirement reason;
- archival / retention expectation;
- replacement dependency if any;
- future governed review where downstream reliance changes.

Supersession or retirement does not close the underlying evidence need unless a future governed ticket explicitly records the state change and non-authorization boundary.

---

## 6. Layer C - Evidence Question Map

This layer preserves evidence questions for future investigation. It is explicitly non-authoritative.

The questions below are not conclusions, recommendations, requirements, approvals, or sequencing instructions. They do not establish a preferred custody model, preferred provider structure, preferred regulatory structure, operational posture, implementation path, pilot readiness, launch readiness, or Class B readiness.

### 6.1 Legal / Compliance And Jurisdiction Questions

- What jurisdictions, if any, would be in scope for a future Class B evidence review?
- What jurisdictions, if any, should be explicitly out of scope?
- What legal / compliance review would be required before any source could inform ADR drafting readiness?
- What customer eligibility constraints would apply in each jurisdiction?
- What KYC / AML / sanctions / PEP responsibilities would need evidence?
- What disclosure obligations would apply?
- Could Hedgr be treated as a regulated actor in any reviewed market?
- What evidence would be required before any provider-of-record hypothesis could be evaluated?

### 6.2 Custody And Provider Questions

- What custody model hypotheses require evidence?
- Which party, if any, would custody customer assets under each hypothesis?
- Who would own wallet control, asset-control lifecycle, conversion, payout execution, and failure responsibility?
- What provider legal entity, licensing, terms, permissions, limits, and support responsibilities would need evidence?
- What claims must Hedgr avoid until custody evidence is reviewed and accepted through future governance?

### 6.3 Rail / Vendor / Stablecoin Questions

- What vendor or provider permissions would be required before any rail could be considered?
- What distinction must remain visible between vendor documentation and vendor permission?
- What countries, user types, assets, chains, fiat currencies, environments, and embedded-use permissions would need evidence?
- What settlement, finality, reversal, refund, failed-payout, wrong-chain, quote-expiry, fee, FX, spread, and final settlement amount evidence would be required?
- What stablecoin issuer, reserve, redemption, chain, and conversion evidence would be needed before any future review?

### 6.4 Liquidity / Withdrawal / Manual-Control Questions

- What withdrawal eligibility, provider limits, compliance holds, liquidity holds, failed-payout behavior, and manual-review conditions would require evidence?
- What pause / halt / kill-control evidence would be required before operational review?
- What manual execution controls would need evidence before any future manual-execution discussion?
- What language must remain prohibited until liquidity and withdrawal evidence exists?

### 6.5 Reconciliation / Ledger / Accounting Questions

- What source-of-truth hierarchy would need evidence before reconciliation review?
- What application records must be prevented from becoming money truth, accounting truth, custody truth, or settlement truth?
- What reconciliation template, exception taxonomy, unresolved-state owner, mismatch handling, user-visible status mapping, accounting export boundary, and audit retention evidence would be required?

### 6.6 Support / Dispute / Incident Questions

- What support owner, channel, hours, identity-verification, provider-escalation, cannot-help boundary, refund / failed-transaction, complaint, and dispute evidence would be required?
- What incident taxonomy, severity, detection, escalation, containment, recovery, customer communication, and post-incident review evidence would be required?
- What support wording must remain prohibited until evidence is reviewed?

### 6.7 Audit / Retention / Access-Control Questions

- What retention schedule, access tiers, access review cadence, legal hold process, deletion / archive process, audit trail, and governance decision log evidence would be required?
- What evidence access boundaries are needed for legal advice, vendor records, KYC / PII, support records, operational records, and audit records?

### 6.8 Trust UX Questions

- What customer-facing claims would require legal / compliance, custody, rail, fee, support, reconciliation, and audit evidence before review?
- What labels could overstate settlement, finality, withdrawal certainty, balance truth, custody truth, or protection?
- What wording should remain draft-only until Trust UX review is separately authorized?

### 6.9 ADR And Implementation-Preflight Questions

- Which Class B ADR domains would require accepted evidence before ADR drafting readiness could be considered?
- What evidence acceptance path would be required before any implementation-proposal preflight could be considered?
- What future `§7` / `§7a` scope would be required before implementation could be discussed?

---

## 7. Reviewer Questions

Reviewers should answer:

1. Does this draft keep evidence intake separate from evidence review, evidence acceptance, ADR readiness, implementation-preflight, and implementation?
2. Can any section be reasonably misread as operational readiness?
3. Can any section be reasonably misread as legal or regulatory approval?
4. Are external-engagement boundaries explicit enough?
5. Are review queue boundaries explicit enough?
6. Does Layer C preserve evidence questions without asserting a preferred operating posture?
7. Does the artifact remain subordinate to `HEDGR_STATUS.md`, accepted ADRs, and repo governance?
8. Does the artifact preserve all Class B blocker posture and `Question framed / Missing` evidence state?

---

## 8. Translation Guardrails

If this draft is later translated into a repo-governed artifact, translation must:

- preserve the three-layer structure;
- keep the future ticket ID provisional until `HEDGR_STATUS.md` `§7` names it;
- avoid adding proposed or future work to `§7` unless governance intends to name an approved next ticket;
- preserve `§7a` as the active brief only when `§7` names an approved ticket;
- avoid modifying the Evidence Registry unless a future ticket explicitly authorizes registry state changes;
- avoid modifying `HEDGR_STATUS.md`, `NOTION_GOVERNANCE_STAGING.md`, or any Class B package as a side effect of this review draft unless separately scoped;
- keep all external engagement out of scope unless separately authorized;
- keep all evidence review, evidence acceptance, ADR readiness, implementation-preflight, implementation, and customer-money activity out of scope.

---

## 9. Non-Authorization Statement

This brief is non-authoritative and documentation-only. It is a review draft for governance containment of a possible future evidence-intake authorization concept. It does not authorize evidence intake, evidence collection, evidence requests, evidence review, evidence acceptance, evidence rejection, evidence scoring, blocker closure, gap closure, sufficiency determination, registry-state changes, evidence-state changes, ADR drafting readiness, implementation-proposal preflight, implementation, legal conclusions, jurisdiction selection, customer eligibility approval, KYC / AML approval, sanctions / PEP responsibility approval, custody approval, rail approval, vendor onboarding, provider selection, sandbox access, legal-retainer authority, commercial negotiation, stablecoin conversion, deposits, withdrawals, treasury operations, liquidity buffers, reconciliation operations, support operations, audit operations, ledger mutation, staging, sandbox use, internal testing, live operations, production activation, Copilot execution, Class C automation, external commercial engagement, customer-money activity, or customer fund movement.

Any future Class B evidence intake or downstream work still requires separate repo-governed authorization through `docs/ops/HEDGR_STATUS.md` `§7` naming where applicable, bounded `§7a` where applicable, accepted ADRs where required, qualified legal / compliance review where applicable, relevant spine-artifact review, relevant evidence package review, source pointers, freshness review, conflict review, dependency review, and audit / retention evidence where applicable.
