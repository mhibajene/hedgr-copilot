Status: Canonical hand-off file
Purpose: Strategic continuity, merged implementation truth, and next-ticket authority for Cursor execution
Last updated: 2026-03-24

---

## 1. Current strategic posture

Hedgr is being built as a **financial stability operating system** centered on the **Hedgr Stability Engine**.

The wallet is not the conceptual center of the system. The wallet is proof of the system thesis.

Current doctrinal framing:

- Hedgr is not a wallet; the wallet is proof.
- The Stability Engine is the system center.
- Governance is the moat.
- Liquidity comes before yield.
- Withdrawal integrity comes before optimization.
- Risk must remain visible.
- Allocation communication must not become shadow accounting.
- Copilot remains advisory and subordinate.

Core operating principle:

**Capital preservation above all.**

---

## 2. Current phase posture

The repo is currently governed by the read-only Stability Engine foundation and governance-hardening posture established across Sprint 2 through Sprint 4.

Current posture:

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
2. `docs/ops/HEDGR_STATUS.md`
3. `docs/decisions/SPRINT-2-ADR-INDEX.md`
4. `docs/decisions/0015-stability-engine-is-the-system-center.md`
5. `docs/decisions/0014-stability-engine-read-only-in-sprint-2.md`
6. `docs/decisions/0013-allocation-bands-informational-not-accounting.md`

These are binding references for current implementation posture.

Do not silently reconcile conflicts. Surface them explicitly.

---

## 4. Governance stack in force

Current repo governance hierarchy:

1. `.cursorrules` - doctrine, architecture, UX/policy posture, anti-drift authority
2. `.cursor/rules.md` - patch execution discipline
3. `AGENTS.md` - repo workflow, CI posture, engineering conventions
4. `.github/PULL_REQUEST_TEMPLATE/agent.md` - review and evidence workflow
5. `README.md` - repo front door and current implementation posture

Cursor should behave as a **doctrine-constrained co-architect**, not a generic coding assistant.

---

## 5. Product and architecture framing

Hedgr has three product surfaces:

- **Hedgr Wallet** - consumer stability wallet
- **Hedgr Pro** - treasury platform for SMEs and professional users
- **Hedgr APIs** - infrastructure layer for fintechs and partners

All product surfaces are downstream interfaces into the shared core:

- Hedgr Stability Engine
- Yield Routing Engine
- wallet infrastructure
- payment rails
- AI Copilot

The **Hedgr Stability Engine** is the canonical allocator of capital in Hedgr's target system design.

In the current implemented phase, it remains read-only and informational.

Yield routing is subordinate to engine safety constraints.

---

## 6. Merged implementation state

The following work is completed and merged. This section is the canonical implementation truth for the current boundary. Do not preserve or reintroduce separate in-progress ticket briefs for these items elsewhere in this file.

### MC-S2-001 - Canonical `EngineState` contract

Merged files:

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
```

Implementation truth:

- created under the repo-native pattern `apps/frontend/lib/<domain>/types.ts`
- named exports only
- no barrel export added
- no runtime code added
- no tests added
- no policy, accounting, ledger, or execution semantics introduced

This is the canonical posture representation boundary. Do not reshape it casually.

### MC-S2-002 - Mock engine state provider

Merged files:

- `apps/frontend/lib/engine/mock.ts`
- `apps/frontend/lib/engine/useEngineState.ts`

Implementation truth:

- deterministic mock provider added
- `useEngineState()` remains thin and synchronous
- default posture resolves to `normal`
- posture state remains centrally sourced from engine modules
- no backend, policy, wallet, transaction, or ledger coupling added
- no execution or accounting semantics introduced

Established provider shape:

- `getMockEngineState(posture?: EnginePosture): EngineState`
- `useEngineState(): EngineState`

Mock states are deterministic and informational only. They support posture-first UI rendering, trust expression, and safe local validation. They are not balances, settled allocations, ledger truth, execution intent, or policy output.

### MC-S2-003 - Posture badge and notice banner

Implementation truth:

- the dashboard header exposes Stability Engine posture
- the posture badge renders from engine state
- the notice banner appears for non-`normal` posture states
- trust communication remains calm, descriptive, and non-promissory
- the UI remains read-only and posture-expressive only

Implementation posture preserved:

- engine posture is surfaced through existing engine state consumption
- no execution or accounting meaning was added
- no policy logic was moved into posture presentation
- no simulator coupling was introduced into the UI surface

### MC-S4-001 - Canonical Stability notice copy contract

Implementation truth:

- a canonical notice copy source exists for non-`normal` posture states
- provisional inline copy is no longer the governing source
- notice language is centralized and trust-safe
- `normal` posture remains notice-free by default

Implementation posture preserved:

- canonical notice ownership lives in engine-local copy definitions
- UI continues rendering from `EngineState.notice`
- mock and provider layers remain read-only and deterministic
- this did not become a generalized notification system

### MC-S4-002 - Local posture simulator with hard dev-only boundaries

Implementation truth:

- local posture simulation exists for frontend validation
- simulation remains isolated from product and runtime semantics
- default behavior remains deterministic and resolves to `normal` when no approved override is present
- the simulator is ignored in CI, test, production, and other non-local contexts recognized by repo-native mode detection

Implementation posture preserved:

- simulator logic is isolated in an adjacent engine-local utility
- `useEngineState()` remains thin and parameterless
- `mock.ts` remains the sole `EngineState` assembly point
- UI consumers remain simulator-unaware
- simulation is explicit, local-only, reversible, and non-canonical
- no persistence, backend coupling, policy logic, execution semantics, or accounting semantics were introduced

Simulation doctrine now in force:

- simulation is for local frontend validation only
- simulation must never become runtime authority
- query param presence alone must never activate simulation outside approved local or development-safe contexts
- simulator behavior is not product behavior

### MC-S4-003 - Stability Engine trust-surface test coverage

Implementation truth:

- repo-native trust-surface hardening is in place for the shipped Stability Engine frontend boundary
- coverage exists for posture badge rendering across supported postures
- coverage exists for notice banner visibility and behavior for non-`normal` postures
- coverage confirms that `normal` remains banner-free
- coverage exists for simulator resolver behavior across allowed values, invalid values, missing values, and local-only guardrails
- the `useEngineState()` trust seam is covered without widening runtime semantics

Implementation posture preserved:

- no execution semantics introduced
- no accounting semantics introduced
- no backend engine coupling introduced
- no policy logic inside posture objects introduced
- no simulator redesign introduced
- no runtime config expansion introduced
- no new testing framework introduced

### MC-S2-004 - Allocation bands UI

Implementation truth:

- a dedicated dashboard allocation bands component is shipped on the dashboard trust surface
- the UI renders `liquidityTargetPct`, `coreTargetPct`, and `yieldCapPct` from existing `EngineState`
- supporting copy frames the panel as current system targets only
- the panel is composed below the posture header and above balance-ledger surfaces
- repo-native behavioral coverage exists for the panel and its shipped dashboard mount path

Implementation posture preserved:

- no execution semantics introduced
- no accounting reinterpretation introduced
- no backend engine coupling introduced
- no policy logic inside allocation display introduced
- no simulator coupling in the component contract introduced
- no `EngineState` reshaping introduced
- no portfolio-like or wallet-partition semantics introduced as UI truth

Doctrine impact:

- allocation bands remain informational, not accounting
- the trust surface explains target posture without impersonating balances, settled allocations, or fund movement

### MC-S2-006 - Stability communication copy

Implementation truth:

- canonical one-line posture context for every `EnginePosture` lives in `apps/frontend/lib/engine/posture-context.ts` (`ENGINE_POSTURE_CONTEXT`)
- dashboard posture header renders that line (`data-testid="engine-posture-context"`) for all postures; notice banner copy remains in `apps/frontend/lib/engine/notices.ts` and is assembled via `apps/frontend/lib/engine/mock.ts` as before
- notice bodies were refined for parallel structure, informational framing, protection vs yield opportunity (where relevant), and removal of wording that implied executed allocation, settled movement, or completed treasury action
- allocation bands panel caption was refined (caption-first; band labels unchanged) to reinforce informational targets, ledger truth boundary, and yield-cap vs opportunity in calm language
- trust-surface tests updated for posture context and phrase-level caption assertions; no `EngineState` reshaping

Implementation posture preserved:

- read-only engine doctrine intact
- no execution, accounting, backend, or policy semantics introduced
- no Copilot or simulator behavior changes

---

## 7. Current sequence and active status

Completed and merged:

- `MC-S2-001` - Canonical `EngineState` contract
- `MC-S2-002` - Mock engine state provider
- `MC-S2-003` - Posture badge and notice banner
- `MC-S4-001` - Canonical Stability notice copy contract
- `MC-S4-002` - Local posture simulator with hard dev-only boundaries
- `MC-S4-003` - Stability Engine trust-surface test coverage
- `MC-S2-004` - Allocation bands UI
- `MC-S2-005` - Governance linkage for engine-facing changes
- `MC-S2-006` - Stability communication copy

Current active ticket status:

- No Sprint 2 engine handoff ticket is recorded here as active. Record the next ticket explicitly in this section when approved.

---

## 8. Repo implementation posture and conventions

Current repo posture:

- trust-first
- policy-aware
- doctrine-constrained
- hermetic in CI and E2E
- reversible by default

Important repo constraints:

- Doppler is the canonical secrets source
- do not introduce new long-lived `.env` workflows as source of truth
- no live external provider dependencies in CI or E2E
- tests should move with behavior changes
- trust, disclosure, and policy consistency are part of the implementation contract

Relevant frontend repo context already established:

- `apps/frontend/lib/engine/` is the correct engine domain location
- the `types.ts` pattern already exists in repo-native domain folders
- barrels are selective, not mandatory
- named exports are acceptable and currently aligned
- no evidence currently requires a new `engine/index.ts` barrel
- engine-local utilities may be added where they preserve boundary clarity and keep UI consumers thin

Also inspect and follow:

- existing conventions across `apps/frontend`
- shared type, export, and barrel conventions
- tsconfig alias rules
- lint, formatting, and test conventions

Do not proceed in a way that conflicts with `AGENTS.md`.

---

## 9. Architectural boundaries for current work

Current phase may include:

- canonical frontend engine state contract
- deterministic engine mock state provider
- posture communication UI
- allocation target visualization
- local posture simulation for frontend validation
- canonical explanatory notice copy
- repo-native trust-surface tests for shipped behavior
- narrow documentation reconciliation directly required by shipped changes

Current phase must not include:

- balances as engine truth
- ledger duplication
- transaction mutation
- rebalance execution
- DeFi routing
- live backend engine coupling
- live posture signals
- execution-intent contracts
- market-policy availability logic inside posture state
- policy-engine merging
- directive Copilot behavior
- APY-led framing
- generalized runtime control planes
- ledger mutation from engine outputs

Core implementation rule:

Every current ticket must strengthen one of these only:

1. engine representation
2. trust expression of engine posture
3. safe local simulation for UI validation
4. regression resistance for already-shipped trust surfaces

Reject or challenge any implementation that introduces:

- execution semantics
- accounting semantics
- policy coupling inside posture objects
- hype semantics
- hidden risk
- simulation as runtime authority

---

## 10. Deferred architecture guidance

The next architecture layer is not yet in active implementation scope.

Do not treat completion of simulation, trust-surface hardening, or allocation-band rendering as permission to introduce:

- backend engine computation
- live posture signals
- execution-intent contracts
- policy-engine merging
- ledger mutation from engine outputs

Any future ADR or architecture track for backend coupling, live coupling, execution intent, or policy-engine convergence must remain deferred governance work until the read-only frontend boundary is fully validated and explicitly expanded by doctrine.

Hand-off principle:

Finish the boundary. Prove the boundary. Document the boundary. Do not widen it casually.

If a future task creates doctrinal ambiguity, pause and surface the ambiguity before coding.

---

## 11. Completed execution ticket - MC-S2-005 (governance linkage)

**Ticket:** `MC-S2-005` - Governance linkage for engine-facing changes  
**Branch:** `feat/mc-s2-005-engine-governance-linkage`

**Ticket id note:** `MC-S2-005` is the Sprint 2 program id for this governance work. Prior engine hardening merged under **`MC-S4-001`** through **`MC-S4-003`** (and related `MC-S2-*` items in §6); those merged ids remain canonical for what shipped.

### Objective

Make Stability Engine-facing changes easier to review against doctrine by standardizing governance references in the execution path.

This is a governance-hardening ticket.

It exists to reduce future drift by making engine-facing work explicitly reviewable against:

- `docs/ops/HEDGR_STATUS.md`
- `docs/decisions/SPRINT-2-ADR-INDEX.md`
- `docs/decisions/0015-stability-engine-is-the-system-center.md`
- `docs/decisions/0014-stability-engine-read-only-in-sprint-2.md`
- `docs/decisions/0013-allocation-bands-informational-not-accounting.md`

### In scope

A narrow governance refinement that may include:

- explicit engine-change review anchors in repo workflow
- lightweight guidance for future engine-facing tickets
- clearer linkage between:
  - `HEDGR_STATUS.md`
  - the Sprint 2 ADR index
  - relevant ADRs
  - PR and review expectations

### Must not do

- create heavy bureaucracy
- rewrite the repo governance stack
- alter runtime or product behavior
- introduce speculative architecture
- widen into backend execution work
- block normal delivery with unnecessary process friction

### Likely implementation surface

Inspect first:

- `AGENTS.md` (including **Engine-facing governance (Sprint 2)**)
- `.github/PULL_REQUEST_TEMPLATE/agent.md`
- `docs/ops/HEDGR_STATUS.md`
- `.cursorrules`
- `docs/decisions/SPRINT-2-ADR-INDEX.md`

Recommend and implement only the smallest change set necessary.

### Acceptance shape

A good version of this ticket will ensure that future engine-facing work has:

1. explicit governance references
2. a visible doctrinal review path
3. a lightweight but real anti-drift check
4. no unnecessary process overhead

### Implementation posture

This ticket must preserve the current boundary:

- read-only engine doctrine remains intact
- no execution semantics are introduced
- no accounting semantics are introduced
- no backend coupling is introduced
- no policy logic is moved into posture or trust surfaces

### Shipped summary

1. **`AGENTS.md`** — Added **Engine-facing governance (Sprint 2 Stability Engine)** (v1 and v2): ordered read list for `apps/frontend/lib/engine/**` and related trust surfaces.
2. **`.github/PULL_REQUEST_TEMPLATE/agent.md`** — Conditional **Engine-facing PRs** blocks (compact in the first template half; full **§7a** chain + attestation checkboxes in the second).
3. **`docs/decisions/SPRINT-2-ADR-INDEX.md`** — **`MC-S2-005`** governance row; **merged `MC-S4-*`** rows for notice, simulator, tests; planning note reconciling legacy `MC-S2-005`/`006` draft labels vs merged ids.
4. **`docs/ops/HEDGR_STATUS.md`** — Normalized ticket id to **`MC-S2-005`**; cross-links to `AGENTS.md` engine subsection.

**Follow-ups:** None required for this ticket. Do not continue automatically to a new ticket; record the next ticket explicitly in §7 when approved.

---

## 12. Completed execution ticket - MC-S2-006 (stability communication copy)

**Ticket:** `MC-S2-006` - Stability Communication Copy  
**Branch:** `feat/mc-s2-006-stability-communication-copy`

### Objective (as scoped)

Define and ship canonical product-facing copy for the Stability Engine trust surfaces so posture, protection, and allocation-target messaging read consistently across the dashboard—without widening runtime semantics or overstating guarantees.

### Shipped summary

1. **`apps/frontend/lib/engine/posture-context.ts`** — `ENGINE_POSTURE_CONTEXT`: one short sentence per posture (definition only; no duplicated banner disclaimers).
2. **`apps/frontend/app/(app)/dashboard/EnginePostureHeader.tsx`** — Renders posture context line (`engine-posture-context`).
3. **`apps/frontend/lib/engine/notices.ts`** — Notice bodies refined: informational guidance about system intent; protection vs yield opportunity where relevant; removed wording that implied executed allocation, settled movement, or completed treasury action.
4. **`apps/frontend/app/(app)/dashboard/EngineAllocationBands.tsx`** — Caption-only refinement for targets vs ledger truth and yield-cap vs opportunity (band labels unchanged).
5. **`apps/frontend/__tests__/engine-posture-header.test.tsx`**, **`engine-allocation-bands.test.tsx`** — Posture context coverage; phrase-level caption assertions; removed duplicate `test.each` block.

**Follow-ups:** None required for this ticket. Record the next ticket explicitly in §7 when approved.

---

## 13. Immediate next-use guidance

Use this file as the continuity primer before asking Cursor to review or implement any future ticket touching engine posture, simulation, allocation, policy, trust, or Copilot behavior.

- assess whether a requested change needs an ADR
- understand current repo governance and architecture posture
- confirm whether a proposed task fits the current read-only boundary

For deeper context, open next:

1. `docs/decisions/SPRINT-2-ADR-INDEX.md`
2. `docs/decisions/0015-stability-engine-is-the-system-center.md`
3. `docs/decisions/0014-stability-engine-read-only-in-sprint-2.md`
4. `docs/decisions/0013-allocation-bands-informational-not-accounting.md`
5. `.cursorrules`

---

## 14. Naming note

The intended hand-off file name is `HEDGR_STATUS.md`.

Continue using:

`docs/ops/HEDGR_STATUS.md`