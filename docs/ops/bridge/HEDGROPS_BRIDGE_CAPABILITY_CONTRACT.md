# HedgrOps Bridge Capability Contract

**Status:** ADOPTED — governing documentation contract; non-authorising
**Mode:** READ_ONLY
**Execution authority:** false
**Mutation allowed:** false
**Ticket activation allowed:** false
**Sequencing allowed:** false
**Repo-native adopted artifact:** `docs/ops/bridge/HEDGROPS_BRIDGE_CAPABILITY_CONTRACT.md`
**Historical proposed artifact:** `docs/ops/bridge/PROPOSED_HEDGROPS_BRIDGE_CAPABILITY_CONTRACT.md` (preserved)
**Adoption ticket:** `GOV-BRIDGE-ADOPT-001`
**Adoption authority:** Founder Bridge Contract Adoption disposition + `docs/ops/HEDGR_STATUS.md` §138 / §139
**Runtime status:** Adoption does not implement a capability or activate Phase 0 or any later phase

---

## 1. Purpose and Governing Principle

This adopted governance contract defines the bounded terms for a proposed evolution of the HedgrOps Bridge from review-evidence transport into a **read-only institutional evidence layer**.

The proposed evolution may improve:

- evidence observability;
- source provenance;
- freshness visibility;
- coverage visibility;
- conflict visibility;
- retrieval precision;
- product-learning evidence access;
- recorded decision visibility;
- boundary visibility; and
- architecture-support evidence access.

It must not create implementation, sequencing, mutation, approval, evidence-acceptance, boundary-clearance, architecture-judgment, founder-disposition, readiness, or customer-money authority.

> The Bridge may make institutional evidence easier to retrieve, verify, compare, and inspect. It may not determine what that evidence authorizes.

This is an **evidence-observability expansion, not an operator-authority expansion**.

Adoption of this contract does not implement any capability. It does not modify runtime behavior, routes, action schemas, snapshot generators, generated snapshots, tests, CI, application code, doctrine, accepted ADRs, or product-convergence artifacts.

---

## 2. Institutional Role and Authority Boundary

The Bridge is a bounded transport layer between repo-native sources and governed review. It is not a second institutional operating system.

The Bridge must remain subordinate to:

- `docs/ops/HEDGR_STATUS.md` for current execution posture;
- `AGENTS.md` for operator constraints and execution rules;
- accepted ADRs under `docs/decisions/`;
- active doctrine under `docs/doctrine/`;
- active repo-native governance registers and operating surfaces; and
- any stronger authority recognized by repo doctrine.

Bridge output must never be interpreted as:

- repo authority itself;
- an implementation approval;
- ticket activation or closure;
- ticket sequencing;
- a product or architecture direction;
- evidence acceptance or rejection;
- boundary clearance;
- founder disposition;
- a readiness judgment; or
- authorization to mutate or execute.

Review evidence remains evidence, not direction. Product-learning evidence remains distinct from institutional evidence acceptance. A well-formed response remains non-authoritative.

---

## 3. Core Definitions

### 3.1 Repo Authority Projection

A **Repo Authority Projection** is:

- mechanically generated from named repo-native authority sources;
- bound to one immutable source commit or revision;
- subordinate to the canonical source files;
- incomplete when any mandatory source is missing or invalid;
- non-authoritative in itself; and
- incapable of resolving disagreement among authority sources.

> A Repo Authority Projection is a transport representation of repo-native authority evidence. It is not an independent source of authority.

The response classification for this object is `REPO_AUTHORITY_PROJECTION`.

The Bridge must not determine repo authority independently, modify source meaning, infer supersession, or present a projection as stronger than its sources.

### 3.2 Source classifications

Bridge responses may classify transported material as:

- `REPO_AUTHORITY` — a directly cited repo-native authority field;
- `REVIEW_EVIDENCE` — a repo-native review artifact or recorded review field; or
- `SUPPORTING_EVIDENCE` — a supporting artifact that does not control execution or acceptance.

At the response-envelope level, a Repo Authority Projection uses `REPO_AUTHORITY_PROJECTION`. Field-level provenance may identify direct source material as `REPO_AUTHORITY`.

Classification describes the source. It does not create authority, acceptance, sufficiency, or readiness.

### 3.3 Experiment observation

An **experiment observation** is the behavior, response, measurement, or result explicitly recorded by a repo-native source.

### 3.4 Product-learning disposition

A **product-learning disposition** is one explicitly recorded state:

- `retain`;
- `revise`;
- `remove`;
- `retest`; or
- `escalate`.

### 3.5 Institutional evidence status

An **institutional evidence status** is a separately recorded governed state, for example:

- `unreviewed`;
- `under_governed_review`;
- `accepted`;
- `rejected`;
- `superseded`; or
- `insufficient`.

Experiment observations, product-learning dispositions, and institutional evidence statuses are independent layers. The Bridge may transport them only when each state is separately recorded in a repo-native source.

A product-learning disposition does not imply:

- institutional evidence acceptance;
- blocker or dependency closure;
- implementation readiness;
- Class B readiness;
- operational or market readiness;
- customer-money readiness; or
- institutional MVP acceptance.

---

## 4. Mandatory Source Set and Revision Binding

A Repo Authority Projection may be classified as `CURRENT` only when every mandatory source is available, readable, structurally valid, fresh under the approved policy, and bound to the same source commit or immutable revision.

The mandatory authority source set is:

1. `docs/ops/HEDGR_STATUS.md`;
2. `AGENTS.md`;
3. the accepted ADR index or the explicitly relevant accepted ADR set, including exact paths and revisions;
4. the active doctrine index or the explicitly relevant active doctrine set, including exact paths and revisions; and
5. the common source commit or immutable revision used to generate the projection.

Where the repo has no single complete ADR or doctrine index, the generator must use an explicitly declared relevant set. It must not infer completeness from partial discovery.

If any mandatory source is:

- missing;
- unreadable;
- unavailable;
- stale;
- revision-inconsistent;
- structurally invalid; or
- not attributable to the common source revision;

the response must fail closed with at least:

```json
{
  "freshness": "UNKNOWN",
  "coverage": "INSUFFICIENT"
}
```

A partial projection must not be presented as current repo authority. A source from another commit must not be silently combined into the projection.

---

## 5. Source Precedence and Conflict Classification

For Bridge conflict classification, use this order:

1. `docs/ops/HEDGR_STATUS.md` — current execution posture.
2. `AGENTS.md` — operator constraints and execution rules.
3. Accepted ADRs — accepted architecture and governance decisions.
4. Active doctrine — constitutional, product, trust, and UX constraints.
5. Active governance registers and operating surfaces.
6. Product, experiment, and user-evidence artifacts.
7. Weekly reviews and MVP process reviews.
8. Supporting artifacts.

This ordering is scoped to Bridge conflict classification. It does not rewrite `.cursorrules`, doctrine precedence, accepted ADR scope, or the repo authority hierarchy.

The Bridge may report:

> A lower-precedence source conflicts with a stronger source.

The Bridge must not:

- reconcile the conflict;
- synthesize a unified answer;
- alter either source;
- infer that one source supersedes another;
- determine which authority should change;
- clear the conflict through recency alone; or
- present conflicted material as current institutional truth.

Unresolved conflicts prevent current-authority interpretation. Resolution must occur through the governed repo-native process.

---

## 6. Field-Level Provenance

A response-level `sources` array is necessary but insufficient for material institutional fields.

Every material field must include equivalent semantics to:

```json
{
  "value": "<repo-recorded value>",
  "source_path": "<repo path>",
  "source_section": "<stable locator>",
  "source_commit": "<commit or immutable revision>",
  "recorded_at": "<timestamp when recorded, otherwise absent>",
  "source_classification": "REPO_AUTHORITY | REVIEW_EVIDENCE | SUPPORTING_EVIDENCE",
  "freshness": "CURRENT | STALE | UNKNOWN"
}
```

Equivalent repo-standard field names are acceptable only when all provenance semantics remain explicit.

Field-level provenance is required, where applicable, for:

- active founder-authorized outcome;
- active ticket;
- active execution class;
- standing delegation state;
- authorized scope and exclusions;
- experiment observation;
- product-learning disposition;
- institutional evidence status;
- explicit decision request;
- boundary classification and status;
- accepted architecture constraint;
- recorded stop condition; and
- review or expiry date.

If `recorded_at`, decision owner, priority, due date, or another optional value is not repo-recorded, the field must be absent or explicitly unavailable. The Bridge must not manufacture it for schema completeness.

---

## 7. Freshness, Coverage, and Fail-Closed Semantics

### 7.1 Freshness

- `CURRENT` — all mandatory sources are available, revision-consistent, structurally valid, and within the adopted freshness policy.
- `STALE` — a source is outside its adopted freshness policy or has been superseded at the bound revision.
- `UNKNOWN` — freshness cannot be established from the approved source metadata.

`STALE` authority context is not current institutional truth. `UNKNOWN` fails closed.

### 7.2 Coverage

- `COMPLETE` — every mandatory source and required material field for the response class is present and valid.
- `PARTIAL` — optional or non-mandatory material is missing, with omissions explicitly listed.
- `INSUFFICIENT` — a mandatory source, revision binding, or required material field is missing or invalid.

`PARTIAL` must not be represented as complete. `INSUFFICIENT` fails closed. A response structure cannot convert incomplete coverage into authority.

### 7.3 Conflict behavior

Conflicts must be returned as attributed records with the relevant source paths, locators, revisions, classifications, and the unresolved state. The Bridge cannot reconcile source disagreement.

### 7.4 Invalid-response behavior

When the contract cannot be satisfied, the Bridge must return an explicit fail-closed error or an envelope with non-authorizing `UNKNOWN` / `INSUFFICIENT` posture. It must not omit guardrails and return a plausible-looking partial answer.

---

## 8. Missing-Field and No-Inference Rule

> Missing structured source means missing field.

If a canonical source does not contain a requested field, return `absent`, `unavailable`, `unknown`, or `insufficient` as appropriate. Do not generate a best-effort interpretation.

The Bridge must not infer authority or product-convergence fields from:

- weekly reviews;
- MVP process reviews;
- ticket descriptions;
- commit messages;
- research notes;
- product copy;
- conversation history;
- prior Bridge responses;
- HedgrOps memory;
- Codex narrative; or
- Cursor summaries.

This rule applies especially to:

- active product outcome;
- current core hypothesis;
- canonical journey segment;
- highest-value uncertainty;
- next unresolved product question;
- product-learning disposition;
- boundary status; and
- institutional evidence status.

Narrative proximity, repeated wording, recent timestamps, or implementation completion are not substitutes for a canonical structured source.

---

## 9. Schema-Authority Safeguards

Every structured Bridge field must map to an already repo-native institutional concept.

The Bridge schema must not silently define new governance concepts. In particular:

- schema convenience creates no authority;
- field names create no authority;
- response shape creates no authority;
- new institutional concepts require repo-native adoption before schema inclusion;
- absence of a canonical concept means absence of the field; and
- field meaning must not exceed source meaning.

These safeguards apply to fields such as:

- highest-value uncertainty;
- canonical journey segment;
- product-convergence state;
- boundary clearance;
- decision priority; and
- architecture impact.

If a requested concept lacks a canonical source and governed definition, the Bridge must omit it or return it as unavailable. It must not create the concept through a convenient schema label.

---

## 10. Deterministic Generation Requirements

For identical source revisions and identical approved configuration, generated institutional content must be deterministic.

Variation is permitted only for clearly non-semantic metadata, such as a generation timestamp where unavoidable. Non-semantic variation must not affect field values, classifications, coverage, conflicts, source binding, ordering, or institutional meaning.

Future contract tests must cover:

- identical-source deterministic output;
- source-commit binding;
- missing mandatory source;
- unreadable source;
- unavailable source;
- source revision mismatch;
- stale source;
- conflicting source;
- incomplete coverage;
- invalid source classification;
- prohibited authority fields;
- unsupported inference fields;
- mutation-related fields;
- activation-related fields; and
- sequencing-related fields.

Fixture and schema validation must fail closed. A deterministic error posture is preferable to a plausible but ungrounded response.

---

## 11. Proposed Capability Model

All capabilities in this section are proposed only. They require Phase 0 approval and separately authorized implementation before any runtime endpoint or snapshot exists.

### 11.1 Repo Authority Projection

May transport directly sourced fields for:

- active execution posture;
- active founder-authorized outcome;
- active tickets and execution classes;
- recorded delegations;
- authorized scope and exclusions;
- applicable accepted ADRs and doctrine;
- source revision;
- freshness;
- coverage; and
- conflicts.

It may not determine, reconcile, recommend, sequence, approve, or activate.

### 11.2 Product-learning observability

May transport explicitly recorded:

- active product outcome;
- current core hypothesis;
- canonical journey segment;
- highest-value uncertainty;
- scope exclusions;
- experiment observations;
- product-learning dispositions;
- institutional evidence statuses; and
- next unresolved product question.

If a canonical repo-native convergence source does not contain one of these fields, that field is absent. The Bridge must not infer convergence from narrative evidence.

### 11.3 Experiment evidence

May transport explicitly recorded:

- experiment ID;
- assumption;
- risk lane;
- cohort;
- status;
- observation;
- evidence links;
- synthetic or live-data posture;
- stop condition;
- review or expiry date;
- product-learning disposition;
- institutional evidence status; and
- source record.

Experiment completion and product disposition do not create implementation or evidence-acceptance authority.

### 11.4 Explicit decision index

May transport only decision requests already recorded repo-natively, including:

- exact recorded question;
- recorded decision owner;
- options already documented;
- consequence boundary;
- requested-by;
- source;
- due or review date; and
- current disposition state.

It must not:

- create a decision request;
- convert ambiguity into a decision item;
- add or rank options;
- assign priority;
- infer urgency;
- create deadlines;
- recommend an answer; or
- record the founder's decision.

If owner, priority, due date, or review date is not repo-recorded, return no value for that field.

### 11.5 Boundary register

May transport explicitly recorded:

- boundary type;
- Green, Yellow, or Red classification;
- status;
- trigger;
- owner;
- affected outcome or experiment;
- source;
- expiry or review date; and
- effect on authorized work.

A Yellow or Red boundary may be marked cleared only when a repo-native authority source explicitly records that disposition.

The following do not clear a boundary by implication:

- weekly or MVP process review;
- experiment completion;
- product-learning disposition;
- source collection;
- implementation completion;
- Bridge synthesis;
- Codex summary; or
- Cursor closeout language without authority basis.

### 11.6 Architecture and recorded impact evidence

May transport:

- accepted architecture constraints;
- affected product surfaces explicitly named by a source;
- related tests and verification artifacts;
- known dependencies; and
- governed impact-review outputs.

The Bridge must not create architecture direction, impact judgments, doctrine-compliance judgments, compatibility judgments, safety judgments, readiness judgments, or approval.

---

## 12. Proposed Bounded Retrieval Actions

The names below are contract proposals, not implemented routes or action-schema changes.

### 12.1 `get_repo_authority_projection`

Returns only a source-bound Repo Authority Projection that satisfies the mandatory-source, provenance, freshness, coverage, and conflict rules in this contract.

### 12.2 `get_product_learning_context`

Returns only canonical repo-recorded product-learning fields. It must not infer convergence or recommend product direction.

### 12.3 `get_experiment_evidence`

Returns only recorded experiment observations, product-learning dispositions, institutional evidence statuses, and provenance.

### 12.4 `get_explicit_decision_context`

Returns only repo-recorded decision requests and fields. It cannot create, rank, prioritize, recommend, or record a decision.

### 12.5 `get_boundary_context`

Returns only repo-recorded boundary state and provenance. It cannot clear or downgrade a boundary by implication.

### 12.6 `get_work_context`

`get_work_context` may accept only an identifier already recorded repo-natively as:

- an active authorized ticket;
- a founder-authorized outcome;
- a recorded experiment;
- an accepted decision; or
- a repo-native review object.

It may return only source-backed:

- authority references;
- recorded scope and exclusions;
- applicable accepted ADRs and doctrine;
- known dependencies;
- recorded verification requirements;
- recorded stop conditions;
- evidence links;
- freshness;
- coverage; and
- conflicts.

It must not generate:

- implementation plans;
- task sequencing;
- new acceptance criteria;
- suggested files not already recorded;
- successor tickets;
- next-ticket recommendations;
- inferred execution instructions;
- architecture direction;
- product recommendations; or
- readiness judgments.

> Work-context retrieval packages existing evidence. It does not create work authority or execution instructions.

### 12.7 `get_recorded_change_impact_evidence`

This retrieval action may return only governed impact evidence already produced by:

- Codex;
- Cursor;
- tests;
- architecture reviews;
- security reviews; or
- repo-native review processes.

It must not autonomously declare:

- low risk;
- safe to proceed;
- no architecture impact;
- doctrine compliance;
- compatibility;
- readiness;
- implementation approval; or
- acceptable residual risk.

Where a source contains a judgment, the response must attribute the judgment to that source with field-level provenance. The Bridge must not adopt it as Bridge judgment.

### 12.8 Search boundary

General-purpose repo search remains prohibited unless separately governed. All future retrieval must remain allow-listed, source-bound, authenticated where required, and read-only.

---

## 13. Required Response Envelope

Every future institutional-evidence response must preserve an envelope equivalent to:

```json
{
  "mode": "READ_ONLY",
  "execution_authority": false,
  "mutation_allowed": false,
  "ticket_activation_allowed": false,
  "sequencing_allowed": false,
  "authority_class": "REPO_AUTHORITY_PROJECTION | REVIEW_EVIDENCE | SUPPORTING_EVIDENCE",
  "source_commit": "<commit-or-immutable-revision>",
  "generated_at": "<timestamp>",
  "freshness": "CURRENT | STALE | UNKNOWN",
  "coverage": "COMPLETE | PARTIAL | INSUFFICIENT",
  "sources": [],
  "conflicts": []
}
```

Binding interpretation:

- `STALE` is not current institutional truth.
- `UNKNOWN` fails closed.
- `INSUFFICIENT` fails closed.
- `PARTIAL` must not be represented as complete.
- Unresolved conflicts prevent current-authority interpretation.
- The Bridge cannot reconcile source disagreement.
- Response structure does not create authority.
- Successful transport does not imply approval, acceptance, readiness, or execution permission.

---

## 14. Staged Rollout

### Phase 0 — Contract and schema foundation

Required before any capability implementation:

1. Adopt or approve the capability contract through repo-native governance.
2. Determine and record the dedicated ADR requirement.
3. Define source precedence.
4. Define freshness semantics.
5. Define coverage semantics.
6. Define conflict behavior.
7. Define field-level provenance.
8. Define allow-listed source paths.
9. Define deterministic generation.
10. Define schemas and fixtures.
11. Define failure and invalid-response behavior.
12. Define revision-consistency requirements.

No new capability endpoint or snapshot may be implemented before Phase 0 is complete and separately authorized.

### Phase 1 — Authority integrity

Only after Phase 0:

- provenance metadata;
- freshness status;
- coverage status;
- conflict reporting;
- source-revision binding;
- replacement of stale or placeholder authority context with a source-backed Repo Authority Projection;
- read-only contract tests; and
- fail-closed contract tests.

### Phase 2 — Product-learning observability

Only after Phase 1 proves reliable:

- active product outcome;
- experiment index; and
- bounded experiment-evidence retrieval.

Do not add convergence interpretation unless a canonical repo-native convergence source exists.

### Phase 3 — Convergence and decision support

Only after the first structured testing cycle and separately authorized source contracts:

- product-convergence state;
- explicit decision index; and
- boundary register.

### Phase 4 — Architecture and recorded impact evidence

Only after prior phases prove reliable:

- accepted architecture context;
- recorded change-impact evidence;
- authorized work-context packets; and
- review-period comparisons.

General-purpose repo search remains prohibited unless separately governed.

Each phase must have independent verification, rollback, expansion gates, and kill criteria. Completion of one phase does not activate the next.

---

## 15. Dedicated ADR Recommendation

Adoption of this capability contract should be accompanied by a dedicated ADR.

This contract adoption does not create, accept, number, or export that ADR. A separate Founder-authorized ticket is required after adoption.

The recommended ADR should cover:

- the institutional need;
- the Bridge's expanded evidence role;
- continued non-authoritative posture;
- allow-listed retrieval;
- source precedence;
- field-level provenance;
- freshness, coverage, and fail-closed behavior;
- explicit prohibitions;
- staged rollout;
- reversibility;
- expansion gates; and
- kill criteria.

Detailed endpoint names, response fields, fixtures, and schema requirements should remain in the capability contract rather than being duplicated in the principle-level ADR.

---

## 16. Explicit Prohibitions

The Bridge must not gain functionality that:

- creates, edits, deletes, merges, commits, or deploys repo content;
- modifies status records;
- activates, closes, or sequences tickets;
- approves implementation;
- records founder decisions;
- accepts, rejects, supersedes, or deprecates ADRs;
- widens product or financial authority;
- generates autonomous product direction;
- generates architecture direction;
- infers authority from reviews;
- resolves authority conflicts;
- performs unrestricted repo search;
- invokes providers, wallets, custody systems, rails, or production systems;
- transforms HedgrOps interpretation into execution;
- treats product disposition as evidence acceptance;
- treats implementation completion as readiness;
- clears boundaries by implication; or
- treats Bridge structure as authority.

The Bridge remains incapable of moving or committing customer money.

---

## 17. README Terminology and Adoption Reference

This contract is adopted as governance documentation. If implementation is separately authorized, the target README heading for that future capability is:

> HedgrOps Read-Only Institutional Evidence Bridge

Adopted terminology classifications are:

- Repo Authority Projection;
- review evidence;
- supporting evidence;
- product-learning evidence; and
- architecture-support evidence.

README language must not imply resolved authority, active direction, sequencing, approval, evidence acceptance, readiness, or institutional judgment by the Bridge.

This adoption reconciles the README to reference this contract but does not rename or change the current runtime implementation.

---

## 18. Adoption Record and Continuing Acceptance Gates

This contract was adopted under `GOV-BRIDGE-ADOPT-001` after the refined proposal merged through PR **#287**, `GOV-BRIDGE-001` closed in `docs/ops/HEDGR_STATUS.md` §138, the historical proposal was preserved, the canonical adopted path was created, and direct documentation references were reconciled without runtime change.

The following acceptance gates remain binding after adoption:

- adopted status is explicit and the historical proposed version remains preserved;
- read-only posture is preserved;
- mutation, activation, and sequencing remain prohibited;
- Repo Authority Projection terminology is consistent;
- the mandatory authority source set is explicit;
- source precedence and conflict behavior are explicit;
- material fields require field-level provenance;
- missing fields are not inferred;
- observation, product disposition, and evidence status remain separate;
- work-context retrieval is evidence packaging only;
- recorded-impact retrieval cannot create judgments;
- decision indexing cannot create, rank, prioritize, or record decisions;
- Yellow and Red boundaries cannot be cleared by implication;
- Phase 0 precedes new capability implementation;
- deterministic generation and schema-authority safeguards are explicit;
- the response envelope includes `sequencing_allowed: false`;
- fail-closed behavior is explicit;
- a dedicated ADR is recommended but not created;
- no runtime behavior, endpoint, route, schema, snapshot, action, or test is implemented by this adoption; and
- rollback remains a documentation-only revert.

Adoption of the contract does not authorize Phase 0 or any later implementation phase. Each rollout phase requires separate repo-native authorization.

### 18.1 Adoption validation record

The adoption record preserves the following validation truth:

- targeted documentation and path assertions passed;
- Bridge snapshot freshness passed;
- Bridge snapshot tests passed;
- Bridge Worker tests passed;
- frontend unit tests passed;
- trust and trust-phrase checks passed;
- adopted-contract and README formatting passed;
- workspace lint passed;
- local full `pnpm run validate` remained blocked by pre-existing React `Suspense` typecheck failures in `apps/frontend/app/(app)/deposit/page.tsx` and `apps/frontend/app/(app)/withdraw/page.tsx`;
- those application files were outside the authorized documentation patch; and
- no claim is made that the local full repository validation passed.

CI results for the adoption PR remain separate merge-gate evidence. CI evidence does not erase or restate the local full-validation limitation.

---

## 19. Rollback and Historical Preservation

This adoption is reversible.

Rollback consists of:

- reverting the adoption change;
- removing the canonical adopted-path copy and adoption-only README references;
- preserving the historical proposed artifact and its repo history;
- reconciling `docs/ops/HEDGR_STATUS.md` and `docs/ops/NOTION_GOVERNANCE_STAGING.md` to the rollback state;
- confirming no runtime implementation depends on the adopted documentation path; and
- avoiding silent rewrites of any adopted governance record.

If a future adopted contract is superseded, supersession must be recorded through repo convention. Historical proposals must not be silently erased.

---

## 20. Final Non-Authorization Statement

This artifact is the adopted governance contract for the Bridge's proposed read-only institutional evidence evolution.

Its adoption does not:

- activate Phase 0 or any later implementation phase;
- create or accept an ADR;
- implement a capability;
- change a route or endpoint;
- change a schema or snapshot;
- activate or sequence work;
- approve product or architecture direction;
- accept evidence;
- clear a boundary;
- authorize mutation or deployment; or
- authorize customer-money activity.

The Bridge remains read-only and non-authoritative. Repo-native authority remains controlling.
