Status: Active hand-off file  
Purpose: Strategic and implementation continuity bridge between ChatGPT UI sessions and Cursor  
Last updated: 2026-03-17

---

## 1. Current strategic posture

Hedgr is being built as a **financial stability operating system** centered on the **Hedgr Stability Engine**.

The wallet is not the conceptual center of the system. The wallet is proof of the system thesis.

Current doctrinal framing:

- Hedgr is not a wallet; the wallet is proof
- The Stability Engine is the system center
- Governance is the moat
- Liquidity comes before yield
- Withdrawal integrity comes before optimization
- Risk must remain visible
- Allocation communication must not become shadow accounting
- Copilot remains advisory and subordinate

Core operating principle:

**Capital preservation above all.**

---

## 2. Current sprint posture

The repo is currently governed by the read-only Stability Engine foundation and governance-hardening posture established across Sprint 2 through Sprint 4.

Current posture is:

- read-only
- posture-first
- non-executing
- trust-first
- conservative and reversible
- frontend-centered for current engine work
- governance-constrained

Important active constraints:

- the Stability Engine remains **read-only and informational**
- allocation bands remain **informational**, not accounting truth
- no hidden execution, fund movement, or autonomous reallocation may be introduced
- no ledger duplication or balance truth should be implied by engine UI
- no live backend engine coupling should be introduced in the current phase
- runtime policy and trust constraints remain first-class control layers
- local simulation may exist only as a dev-safe validation aid, not as runtime authority

This phase is still about establishing and hardening the Stability Engine boundary, not extending into execution architecture.

---

## 3. Governing references that must be read first

Before implementing or reviewing continuation work, read in this order:

1. `AGENTS.md`
2. `docs/decisions/0015-stability-engine-is-the-system-center.md`
3. `docs/decisions/0014-stability-engine-read-only-in-sprint-2.md`
4. `docs/decisions/0013-allocation-bands-informational-not-accounting.md`
5. `docs/decisions/SPRINT-2-ADR-INDEX.md`

These are binding references for current implementation posture.

Do not silently reconcile conflicts. Surface them explicitly.

---

## 4. Governance stack in force

Current repo governance hierarchy:

1. `.cursorrules` — doctrine, architecture, UX/policy posture, anti-drift authority
2. `.cursor/rules.md` — patch execution discipline
3. `AGENTS.md` — repo workflow, CI posture, engineering conventions
4. `.github/PULL_REQUEST_TEMPLATE/agent.md` — review/evidence workflow
5. `README.md` — repo front door and current implementation posture

Cursor should behave as a **doctrine-constrained co-architect**, not a generic coding assistant.

---

## 5. Product and architecture framing

Hedgr has three product surfaces:

- **Hedgr Wallet** — consumer stability wallet
- **Hedgr Pro** — treasury platform for SMEs and professional users
- **Hedgr APIs** — infrastructure layer for fintechs and partners

All product surfaces are downstream interfaces into the shared core:

- Hedgr Stability Engine
- Yield Routing Engine
- wallet infrastructure
- payment rails
- AI Copilot

The **Hedgr Stability Engine** is the canonical allocator of capital in Hedgr’s target system design.

In the current implemented phase, it remains read-only and informational.

Yield routing is subordinate to engine safety constraints.

---

## 6. Implementation state already completed

The following work is already completed and should be treated as current implementation truth.

### MC-S2-001 — Canonical EngineState contract

Completed and merged:

- `apps/frontend/lib/engine/types.ts`

Canonical contract:

```ts
export type EnginePosture =
  | 'normal'
  | 'tightening'
  | 'tightened'
  | 'recovery';

export interface EngineNotice {
  title: string;
  body: string;
}

export interface EngineState {
  posture: EnginePosture;
  liquidityTargetPct: number;
  coreTargetPct: number;
  yieldCapPct: number;
  notice?: EngineNotice;
  updatedAt: string;
}

Implementation decisions already established:
	•	created under repo-native pattern: apps/frontend/lib/<domain>/types.ts
	•	named exports only
	•	no barrel export added
	•	no runtime code added
	•	no tests added
	•	no policy, accounting, ledger, or execution semantics introduced

This is the canonical posture representation boundary.

Do not reshape it casually.

MC-S2-002 — Mock engine state provider

Completed and merged:
	•	apps/frontend/lib/engine/mock.ts
	•	apps/frontend/lib/engine/useEngineState.ts

Implementation decisions already established:
	•	deterministic mock provider added
	•	hook remains thin and synchronous
	•	default posture resolves to normal
	•	posture state remains centrally sourced from engine modules
	•	no backend, policy, wallet, tx, or ledger coupling added
	•	no execution semantics introduced
	•	no accounting semantics introduced

Expected provider shape already established:
	•	getMockEngineState(posture?: EnginePosture): EngineState
	•	useEngineState(): EngineState

Mock states are deterministic and informational only.

They are used to support:
	•	posture-first UI rendering
	•	trust expression
	•	safe local validation

They are not:
	•	balances
	•	settled allocations
	•	ledger truth
	•	execution intent
	•	policy output

MC-S2-003 — Posture badge + notice banner

Completed and merged.

Implemented outcome:
	•	dashboard header now exposes Stability Engine posture
	•	posture badge renders from engine state
	•	notice banner appears for non-normal posture states
	•	trust communication remains calm, descriptive, and non-promissory
	•	UI remains read-only and posture-expressive only

Implementation decisions already established:
	•	engine posture is surfaced through existing engine state consumption
	•	no execution or accounting meaning was added
	•	no policy logic was moved into posture presentation
	•	no simulator coupling was introduced into the UI surface

MC-S4-001 — Canonical Stability notice copy contract

Completed and merged.

Implemented outcome:
	•	canonical notice copy source now exists for non-normal posture states
	•	provisional inline copy is no longer the governing source
	•	notice language is centralized and trust-safe
	•	normal posture remains notice-free by default

Implementation decisions already established:
	•	canonical notice ownership lives in engine-local copy definitions
	•	UI continues rendering from EngineState.notice
	•	mock/provider layers remain read-only and deterministic
	•	this did not become a generalized notification system

MC-S4-002 — Local posture simulator with hard dev-only boundaries

Completed and merged.

Implemented outcome:
	•	local posture simulation now exists for frontend validation
	•	simulation remains isolated from product/runtime semantics
	•	default behavior remains deterministic and resolves to normal when no approved override is present
	•	simulator is ignored in CI, test, production, and other non-local contexts recognized by repo-native mode detection

Implementation decisions already established:
	•	simulator logic is isolated in an adjacent engine-local utility
	•	useEngineState() remains thin and parameterless
	•	mock.ts remains the sole EngineState assembly point
	•	UI consumers remain simulator-unaware
	•	simulation is explicit, local-only, reversible, and non-canonical
	•	no persistence, backend coupling, policy logic, execution semantics, or accounting semantics were introduced

Simulation doctrine now in force:
	•	simulation is for local frontend validation only
	•	simulation must never become runtime authority
	•	query param presence alone must never activate simulation outside approved local/development-safe contexts
	•	simulator behavior is not product behavior

⸻

7. Current sequence and next ticket

Current progression:

Foundation and trust-expression work completed
	•	MC-S2-001 — Create canonical EngineState contract ✅
	•	MC-S2-002 — Create mock engine state provider ✅
	•	MC-S2-003 — Build posture badge + notice banner ✅
	•	MC-S4-001 — Canonical Stability notice copy contract ✅
	•	MC-S4-002 — Local posture simulator with hard dev-only boundaries ✅

Current next ticket
	•	MC-S4-003 — Stability Engine trust-surface test coverage ⏭ current next ticket

Do not skip sequencing unless there is a clear repo-level reason.

Current continuation instruction:

Proceed with MC-S4-003 only unless explicitly instructed otherwise.

⸻

8. MC-S4-003 implementation brief

Objective:

Add repo-native test coverage for the shipped Stability Engine trust surfaces so the read-only posture boundary is harder to regress.

Expected scope:
	•	posture badge rendering coverage
	•	notice banner visibility/behavior coverage
	•	canonical notice rendering coverage where relevant
	•	simulator resolver coverage for allowed values, fallback behavior, and local-only guardrails
	•	only the minimum test surface needed to validate current shipped behavior

Constraints:
	•	no new execution semantics
	•	no accounting semantics
	•	no backend engine coupling
	•	no new simulator authority
	•	no policy logic embedded into posture objects
	•	no route-level integration testing unless a repo-native pattern already exists
	•	no new testing framework
	•	no widening into product/runtime config work

Test intent:
	•	verify badge rendering across supported posture states
	•	verify non-normal notice banner visibility behavior
	•	verify normal posture remains banner-free
	•	verify simulator resolver handles:
	•	allowed posture values
	•	invalid values
	•	missing values
	•	non-local guardrails
	•	preserve behavioral assertions rather than tautological source-equality tests

Expected implementation return after completing the ticket:
	1.	what changed
	2.	why it changed
	3.	convention decisions taken
	4.	risks or follow-ups
	5.	whether the ticket is fully complete against acceptance criteria

Do not continue automatically to the next ticket.

⸻

9. Repo implementation posture and conventions

Current repo posture:
	•	trust-first
	•	policy-aware
	•	doctrine-constrained
	•	hermetic in CI / E2E
	•	reversible by default

Important repo constraints:
	•	Doppler is the canonical secrets source
	•	do not introduce new long-lived .env workflows as source of truth
	•	no live external provider dependencies in CI / E2E
	•	tests should move with behavior changes
	•	trust, disclosure, and policy consistency are part of the implementation contract

Relevant frontend repo context already established:
	•	apps/frontend/lib/engine/ is the correct engine domain location
	•	types.ts pattern already exists in repo-native domain folders
	•	barrels are selective, not mandatory
	•	named exports are acceptable and currently aligned
	•	no evidence currently requires a new engine/index.ts barrel
	•	engine-local utilities may be added where they preserve boundary clarity and keep UI consumers thin

Also inspect and follow:
	•	existing conventions across apps/frontend
	•	shared type/export/barrel conventions
	•	tsconfig alias rules
	•	lint, formatting, and test conventions

Do not proceed in a way that conflicts with AGENTS.md.

⸻

10. Architectural boundaries for remaining work

Current phase may include:
	•	canonical frontend engine state contract
	•	deterministic engine mock state provider
	•	posture communication UI
	•	allocation target visualization
	•	local posture simulation for frontend validation
	•	canonical explanatory notice copy
	•	repo-native trust-surface tests for shipped behavior
	•	narrow documentation reconciliation directly required by shipped changes

Current phase must not include:
	•	balances as engine truth
	•	ledger duplication
	•	transaction mutation
	•	rebalance execution
	•	DeFi routing
	•	live backend engine coupling
	•	live signals
	•	market-policy availability logic inside posture state
	•	directive Copilot behavior
	•	APY-led framing
	•	generalized runtime control planes

Core implementation rule:

Every current ticket must strengthen one of these only:
	1.	engine representation
	2.	trust expression of engine posture
	3.	safe local simulation for UI validation
	4.	regression resistance for already-shipped trust surfaces

Reject or challenge any implementation that introduces:
	•	execution semantics
	•	accounting semantics
	•	policy coupling inside posture objects
	•	hype semantics
	•	hidden risk
	•	simulation as runtime authority

⸻

11. Deferred architecture guidance

The next architecture layer is not yet in active implementation scope.

Do not treat completion of simulation and trust-surface hardening as permission to introduce:
	•	backend engine computation
	•	live posture signals
	•	execution-intent contracts
	•	policy-engine merging
	•	ledger mutation from engine outputs

Any future ADR or architecture track for backend coupling, live coupling, or execution intent must remain deferred governance work until the read-only frontend boundary is fully validated and explicitly expanded by doctrine.

Hand-off principle:

Finish the boundary. Prove the boundary. Document the boundary. Do not widen it casually.

If a future task creates doctrinal ambiguity, pause and surface the ambiguity before coding.

⸻

12. Immediate next-use guidance

Use this file as the quick continuity primer before asking Cursor to:
	•	continue Stability Engine trust-surface hardening
	•	review or implement tickets touching engine posture, simulation, allocation, policy, trust, or Copilot behavior
	•	assess whether a requested change needs an ADR
	•	understand current repo governance and architecture posture

For deeper context, open next:
	1.	docs/decisions/SPRINT-2-ADR-INDEX.md
	2.	docs/decisions/0015-stability-engine-is-the-system-center.md
	3.	docs/decisions/0014-stability-engine-read-only-in-sprint-2.md
	4.	docs/decisions/0013-allocation-bands-informational-not-accounting.md
	5.	.cursorrules

⸻

13. Naming note

The intended hand-off file name is HEDGR_STATUS.md.

Continue using:

docs/ops/HEDGR_STATUS.md

Recommended next ticket title for Cursor:
**MC-S4-003 — Stability Engine trust-surface test coverage**

Suggested branch:
`feat/mc-s4-003-engine-trust-surface-tests`

⸻

13. Naming note

The intended hand-off file name is HEDGR_STATUS.md.

## 14. Cursor execution ticket — MC-S4-003

**Ticket:** MC-S4-003 — Stability Engine trust-surface test coverage  
**Suggested branch:** `feat/mc-s4-003-engine-trust-surface-tests`

### Objective

Add repo-native test coverage for the shipped Stability Engine trust surfaces so the current read-only posture boundary is harder to regress.

This ticket exists to harden already-shipped behavior, not to widen runtime behavior, architecture, or product semantics.

### Mandatory pre-read before coding

Read in this order before implementing:

1. `AGENTS.md`
2. `docs/ops/HEDGR_STATUS.md`
3. `docs/decisions/SPRINT-2-ADR-INDEX.md`
4. `docs/decisions/0015-stability-engine-is-the-system-center.md`
5. `docs/decisions/0014-stability-engine-read-only-in-sprint-2.md`
6. `docs/decisions/0013-allocation-bands-informational-not-accounting.md`

If implementation pressure reveals a doctrinal conflict, stop and surface it explicitly.

### In scope

Add repo-native behavioral coverage for:

- posture badge rendering across supported posture states
- notice banner visibility and rendering behavior for non-`normal` posture states
- confirmation that `normal` posture remains banner-free
- simulator resolver behavior for:
  - allowed posture values
  - invalid values
  - missing values
  - local-only / non-local guardrails

### Preferred test seam order

Use the smallest valid seam first:

1. existing or adjacent unit tests around `EnginePostureHeader.tsx`
2. simulator-focused tests around `apps/frontend/lib/engine/simulator.ts`
3. page-level composition coverage only if a real gap remains that unit tests cannot prove through existing seams

### Likely files in scope

Inspect and use only what is necessary:

- `apps/frontend/__tests__/engine-posture-header.test.tsx`
- `apps/frontend/__tests__/engine-simulator.test.ts`
- `apps/frontend/app/(app)/dashboard/EnginePostureHeader.tsx`
- `apps/frontend/app/(app)/dashboard/page.tsx`
- `apps/frontend/lib/engine/notices.ts`
- `apps/frontend/lib/engine/mock.ts`
- `apps/frontend/lib/engine/simulator.ts`
- `apps/frontend/lib/engine/useEngineState.ts`

### Constraints

Do not introduce:

- backend calls
- live signals
- new execution semantics
- accounting reinterpretation
- policy logic inside posture objects
- simulator redesign
- runtime config expansion
- new testing framework
- snapshot tests unless an identical nearby repo-native pattern already exists

Do not edit engine runtime behavior in this ticket unless a reviewable, behavior-preserving seam is strictly required to test an already-shipped path and cannot be covered through existing interfaces.

### Test intent

Tests should verify behavior through the shipped engine state and UI path.

That means:

- verify posture badge rendering for supported postures
- verify notice rendering behavior through the shipped engine state/UI path
- verify `normal` posture remains notice-free
- avoid tautological tests that only prove a canonical source equals itself
- keep route/page composition tests as a fallback only when unit seams cannot prove the shipped mount path

A page-level test is justified only if unit tests cannot prove that the shipped dashboard composition still mounts the engine trust surface in the real page seam.

### Acceptance criteria

This ticket is complete when:

1. repo-native tests cover posture badge rendering across supported postures
2. repo-native tests cover non-`normal` notice banner visibility/behavior
3. repo-native tests confirm `normal` posture remains banner-free
4. repo-native tests cover simulator resolver behavior for allowed, invalid, and missing values
5. simulator guardrail behavior is verified for non-local contexts using existing repo-native seams
6. no new execution, accounting, backend, or policy semantics are introduced
7. no new testing framework is introduced
8. any testability change remains behavior-preserving and minimal
9. the implementation report follows the standard hand-off return shape

### Implementation report format

After implementation, return:

1. what changed
2. why it changed
3. convention decisions taken
4. risks or follow-ups
5. whether the ticket is fully complete against acceptance criteria

Do not continue automatically to the next ticket.

### Reversibility

High.

This ticket should only add or refine validation around already-shipped trust surfaces. It should not alter persisted state, ledger truth, backend behavior, or engine doctrine.

### Revisit / kill criteria

Revisit this test shape if:

- the shipped engine trust surface moves materially to a different UI seam
- simulator gating changes in a way that invalidates the current resolver boundary
- existing repo-native test patterns prove insufficient for stable coverage

Kill or replace this approach if:

- test coverage starts forcing architecture changes that widen runtime semantics
- route-level tests become the default without a real unit-gap justification
- test code starts asserting implementation internals instead of shipped behavior
