# Hedgr — Governed Parallel Pass Checklist and Closeout Template

**Status:** Operational procedural control (documentation-only)  
**Artifact type:** Governance documentation / operational control  
**Visibility:** Internal  
**Ticket of record:** `GOV-PARALLEL-002` (completed record in `docs/ops/HEDGR_STATUS.md` **§124**)  
**Operational precedent:** Controlled Parallelism v1 (`PH-COMP-B-002`, `BE-FOUND-001`, `FE-TRUST-001` under Internal **D-026** / **§6e**)

## Authority posture

This checklist supports the execution of a separately authorized governed-parallelism pass. It does not authorize a pass, activate a lane, widen authority, or replace repo-native governance.

It does **not**:

- authorize another parallel pass;
- activate any implementation ticket;
- preserve D-026 (or any prior pass decision) as standing concurrency authority;
- alter the singular-ticket default;
- widen Class A, Class B, or Class C authority;
- satisfy any convergence gate;
- create cross-lane authority inheritance;
- select a market, provider, endpoint, rail, chain, stablecoin, custody model, or legal posture;
- authorize customer-money activity.

**Controlling repo-native authority (in order):**

1. `.cursorrules` and active doctrine under `docs/doctrine/*`
2. Accepted ADRs under `docs/decisions/*`
3. `docs/ops/HEDGR_STATUS.md` — especially **§6e** (when a Founder-approved parallelism decision is recorded), **§7**, and **§7a**
4. `AGENTS.md` — deny-by-default ticket sequencing / governed parallelism exception
5. Accepted Founder decisions recorded in repo-native form (e.g. Internal Decision Log rows mirrored in **§6e**)
6. This checklist — subordinate procedural guidance only

**Precedent boundary (required):**

> Controlled Parallelism v1 demonstrates a safe process capability. It does not establish standing parallel execution authority.

Future parallel passes still require: a separate Founder decision; explicit repo-native authorization; named lanes; named tickets; bounded authority classes; lane-specific exclusions; independent stop conditions; and explicit return-to-idle closeout.

**Exception posture (required):**

Governed parallelism is an explicit exception; deny-by-default; limited to named lanes; limited to one bounded ticket per authorized lane unless separately decided; and inactive when the governing decision is absent, ambiguous, paused, completed, deprecated, or superseded. The default remains one active implementation ticket.

**Notion posture (required):**

> Notion mirrors repo truth. It does not activate, sequence, approve, or lead repo execution state.

**PR topology posture (required):**

> PR shape is selected per pass. It is not itself an authority model.

> PR topology organizes review and merge risk. It does not create or widen execution authority.

---

## Phase A — Opening authority check

Complete before any lane work starts.

| Check | Confirmed? | Evidence / notes |
| ----- | ---------- | ---------------- |
| Founder-approved governed-parallelism decision exists | | |
| Decision is recorded in canonical repo-native format | | |
| Decision status is Accepted | | |
| Visibility and reversibility are recorded | | |
| Every lane is explicitly named | | |
| Every active ticket is explicitly named | | |
| Each lane has an execution class | | |
| Each lane has allowed and prohibited scope | | |
| One bounded ticket per lane is preserved unless separately authorized | | |
| Singular-ticket default and restoration condition remain recorded | | |
| Convergence gate is defined before execution begins | | |
| PR topology and final reconciliation ownership are identified | | |
| Notion has not been used to activate the work | | |
| `HEDGR_STATUS.md` **§7** / **§7a** name the lane tickets | | |

**Opening authority result (choose one):**

- `PASS — parallel pass may proceed under named authority`
- `BLOCKED — authority incomplete or ambiguous`
- `NOT APPLICABLE — singular-ticket execution only`

If result is `BLOCKED` or `NOT APPLICABLE`, do not open parallel lanes.

---

## Phase B — Lane definition

Repeat for every lane named in the Founder decision. The number of lanes must match that decision; three lanes are not a permanent entitlement.

### Lane worksheet

| Field | Value |
| ----- | ----- |
| Lane name | |
| Ticket ID | |
| Execution class | |
| Authority basis | |
| Objective | |
| Permitted files or modules | |
| Prohibited files or modules | |
| Explicit exclusions | |
| Dependencies | |
| Assumptions | |
| Risks | |
| Expected behaviour | |
| Test path | |
| Rollback | |
| Stop conditions | |
| Closeout owner | |

**Required lane declaration (copy into each lane brief / worksheet):**

> This lane cannot widen, inherit, approve, or modify another lane’s authority.

---

## Phase C — Cross-lane boundary check

| Check | Outcome | Notes |
| ----- | ------- | ----- |
| Shared contracts do not smuggle provider or market assumptions | | |
| Shared schemas do not encode unresolved custody, conversion, settlement, or legal ownership | | |
| Mocks remain synthetic | | |
| Frontend states do not imply live availability | | |
| Backend interfaces remain deny-by-default | | |
| Class B findings are inputs or dependencies, not automatic scope changes | | |
| One lane’s completion cannot activate another lane | | |
| Cross-lane discoveries are recorded explicitly | | |
| Material assumption changes trigger review | | |

**Cross-lane impact classification (required values):**

- `NO CROSS-LANE IMPACT`
- `INFORMATIONAL IMPACT ONLY`
- `ASSUMPTION CHANGE — REVIEW REQUIRED`
- `AUTHORITY CHANGE REQUIRED — STOP`

Findings may inform another lane but may not automatically change its ticket. Any cross-lane scope change requires separate Founder and repo-native authorization. A technical dependency must not become an authority dependency.

---

## Phase D — During-execution control

Periodic checks while lanes are open:

| Check | Status | Notes |
| ----- | ------ | ----- |
| Lane scope remains bounded | | |
| Only authorized files are changing | | |
| No provider-specific architecture is entering the generic core | | |
| No market, endpoint, rail, chain, stablecoin, custody model, or legal position is being selected | | |
| No customer-money capability is introduced | | |
| Synthetic states remain visibly non-live | | |
| No trust claim exceeds system truth | | |
| Tests preserve denial properties | | |
| Each lane retains independent rollback | | |
| Merge timing does not create partial or misleading authority state | | |
| `HEDGR_STATUS.md` remains the execution source of truth | | |

**Required escalation:**

> If a lane requires provider-, rail-, custody-, conversion-, settlement-, legal-, or customer-money-dependent work to continue, stop that lane and return for Founder and repo-native authorization.

---

## Phase E — PR topology check

PR topology is non-binding guidance selected per pass.

### Single governed-batch PR

Appropriate where:

- changes form one tightly coupled governance batch;
- atomic reconciliation is important;
- reviewers and rollback are substantially shared;
- the diff remains reviewable.

Controlled Parallelism v1 appropriately used one PR because it represented one governed batch and required atomic status reconciliation.

### Separate PRs per lane

Preferred where:

- code changes are materially independent;
- specialist reviewers differ;
- test and rollback paths differ;
- lanes may complete at different times;
- combining the changes would obscure risk.

### Final reconciliation

Where separate lane PRs are used, require:

- a designated final reconciliation PR or explicitly designated final lane PR;
- no premature completion status;
- all referenced lane work merged or explicitly resolved;
- final trust and governance checks;
- repo status updated before Notion;
- return to idle or singular-ticket posture.

Confirm:

> PR topology organizes review and merge risk. It does not create or widen execution authority.

| Field | Value |
| ----- | ----- |
| Selected topology | Single batch / Separate lane PRs / Hybrid |
| Final reconciliation owner | |
| Merge-order notes | |

---

## Phase F — Lane closeout

Complete for every named lane.

| Field | Value |
| ----- | ----- |
| Ticket ID | |
| Implementation truth | |
| Files changed | |
| Tests run | |
| Validation results | |
| Permitted scope completed | |
| Prohibited scope preserved | |
| Durable outputs | |
| Provisional outputs | |
| Unresolved assumptions | |
| Rework exposure (Class B / provider / legal / architecture) | |
| Cross-lane impacts (use Phase C values) | |
| Whether another lane’s findings changed assumptions | |
| Whether those changes required authority widening | Yes / No / N/A |
| Rollback status | |
| Stop-condition outcome | |
| Completion did **not** satisfy the convergence gate | Confirmed |
| No successor ticket was activated | Confirmed |

**Convergence-gate protection (required reminders):**

> Lane completion does not satisfy the convergence gate.

> Architecture readiness is not execution readiness.

> UI completeness is not product availability.

Backend, frontend, governance, evidence, legal, provider, and operations work must not be collapsed into a single readiness conclusion.

---

## Phase G — Batch reconciliation and return to idle

| Check | Confirmed? | Notes |
| ----- | ---------- | ----- |
| Every named lane status reconciled | | |
| No active lane omitted | | |
| No implied running program remains | | |
| Applicable Founder decision is no longer being used as active pass authorization | | |
| Active-ticket posture returns to idle or approved singular-ticket state | | |
| Convergence gate remains explicitly satisfied or unsatisfied | | |
| Notion mirrors final repo truth (repo first, Notion second) | | |
| No future lane or successor ticket activated automatically | | |
| A new parallel pass requires a new Founder decision | | |

**Required closeout statement (verbatim):**

> This pass demonstrates bounded process capability only. It does not establish standing parallel execution authority, satisfy the Class B convergence gate, or activate any successor ticket.

---

## Reusable opening and closeout template

Copy for each future pass. Do not hard-code three lanes as a permanent entitlement. The number of lanes must match the separately accepted Founder decision for that pass.

```text
Governed parallel pass ID:
Founder decision:
Decision status:
Visibility:
Reversibility:

Named lane 1:
Ticket:
Execution class:
Permitted scope:
Prohibited scope:
Stop condition:

Named lane 2:
Ticket:
Execution class:
Permitted scope:
Prohibited scope:
Stop condition:

Named lane 3:
Ticket:
Execution class:
Permitted scope:
Prohibited scope:
Stop condition:

(Add or remove lane blocks to match the Founder decision. Three lanes are not an entitlement.)

Cross-lane inheritance:
None unless separately authorized.

Convergence gate:
[State exact unsatisfied or satisfied conditions.]

PR topology:
[Single batch / separate lane PRs / reconciliation PR.]

Final reconciliation owner:

Opening authority check:
[PASS / BLOCKED / NOT APPLICABLE.]

During-execution drift findings:

Lane closeout status:

Convergence-gate outcome:

Repo return-to-idle outcome:

Notion mirror outcome:

Successor ticket activation:
None.

Founder attention required:
[None or explicit decision request.]
```

---

## Non-authorization statement

This artifact does **not** authorize:

- concurrent execution;
- a second parallel pass;
- implementation;
- provider review;
- provider selection;
- provider outreach;
- market selection;
- endpoint approval;
- rail approval;
- chain selection;
- stablecoin selection;
- custody;
- conversion;
- settlement;
- legal reliance;
- evidence acceptance;
- sandbox activity;
- production activity;
- deposits;
- withdrawals;
- customer-money movement;
- Class B execution;
- Class C execution.

---

## Risks and mitigations

| Risk | Mitigation |
| ---- | ---------- |
| Checklist becomes shadow authority | Subordinate explicitly to `AGENTS.md`, accepted decisions, and `HEDGR_STATUS.md`; prohibit activation language; require Phase A before use |
| Parallelism becomes normalized | Repeat singular-ticket default; require a new Founder decision for each pass; require return to idle |
| Administrative completion hides technical drift | Require lane-specific implementation truth, tests, provisional outputs, and rework exposure |
| Separate PRs create inconsistent status | Require final reconciliation ownership and merge ordering |
| Notion leads repo state | Require repo update first and Notion mirror second |
| Cross-lane information becomes authority | Classify cross-lane impacts; stop when authority changes are required |

---

## Operational-hygiene note — label spacing (resolved)

Controlled Parallelism v1 identified that the repository GitHub label was `area: infra` (with a space).

**Status:** Resolved (Founder-recorded 2026-07-10). The spacing issue is closed for record. This note does not authorize a broader label-taxonomy refactor.

---

## Rollback of this checklist

Rollback is documentation-only.

If this checklist creates confusion, duplication, or shadow authority:

1. Remove or archive this artifact according to repo convention.
2. Remove thin index / status pointers that reference it.
3. Preserve D-026 and Controlled Parallelism v1 historical records.
4. Leave `AGENTS.md` and `HEDGR_STATUS.md` authority unchanged except for pointer removal.
5. Record why the checklist was withdrawn.

Do not silently rewrite or delete historical pass closeouts.
