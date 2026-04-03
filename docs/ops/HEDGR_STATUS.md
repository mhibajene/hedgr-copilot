Status: Canonical hand-off file
Purpose: Strategic continuity, merged implementation truth, and next-ticket authority for Cursor execution
Last updated: 2026-04-03

---

## Notion governance (manual copy source)

For Notion **Decision Log** and **Strategy & Insights** (or equivalent executive) surfaces, reconcile from `docs/ops/NOTION_GOVERNANCE_STAGING.md`. That staging file is derived from repo ADRs and this document; **do not** let Notion wording run ahead of or beyond repo truth.

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
- **Warmth Layer (ADR 0016, Proposed):** parallel, doctrine-constrained **presentation** refinement only; does not alter read-only Stability Engine posture and must not introduce execution semantics, accounting truth, hidden reallocation, ledger duplication, yield-first emphasis, or gamified stability language (see `docs/decisions/0016-warmth-layer-doctrine-constrained-retail-refinement-track.md`)

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

**Proposed companion ADR:** `docs/decisions/0016-warmth-layer-doctrine-constrained-retail-refinement-track.md` — Warmth Layer parallel refinement track (presentation only, read-only engine posture unchanged). Read when implementing or reviewing work on surfaces scoped in that ADR.

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

### MC-S2-008 - Withdraw lifecycle integrity

Implementation truth:

- the withdraw page surfaces a dedicated status region with presentation aligned to the existing tx-layer vocabulary (`getPresentationForPublicStatus` / public withdrawal statuses)
- pending versus completed withdrawal meaning is clearer in user-facing titles and descriptions
- processing-delay and in-flight copy is calm and avoids guaranteed timing or instant-settlement claims
- a brief disclosure states that protective posture does not by itself stop a withdrawal from processing (no implication of withdrawal lockup)
- RTL tests cover withdraw status presentation; critical E2E asserts the withdraw status region on the success path
- no backend settlement guarantees, treasury-routing semantics, or engine execution logic were introduced

Implementation posture preserved:

- frontend operational-trust refinement only; read-only engine doctrine intact elsewhere
- no new accounting authority, execution semantics, or policy logic in withdrawal surfaces

### MC-S2-009 - Stability Engine expandable explainability layer

Implementation truth:

- a compact, optional **`details` / `summary`** explainer is mounted **inside** the allocation bands section (`EngineAllocationBands`) after the target bands
- canonical copy lives in ticket-local `apps/frontend/lib/engine/stability-explainer-copy.ts`; presentation in `apps/frontend/app/(app)/dashboard/EngineStabilityExplainer.tsx`
- static copy only: principle-level posture (protection vs growth, caution level); **not** a duplicate of `ENGINE_POSTURE_CONTEXT` or a second notice system
- plain-language definitions for **Available**, **Core**, and **Growth capacity** align with the merged allocation band label baseline; short principles on why the split exists and targets vs ledger truth
- RTL tests cover explainer presence, governed copy, disclosure interaction, and a **limited** high-risk forbidden-phrase guard; dashboard page tests assert the explainer mount

Implementation posture preserved:

- read-only engine doctrine intact; no execution, accounting, backend, policy runtime, simulator, or Copilot changes

### MC-S2-010 - Stability Engine protective guidance layer

Implementation truth:

- a compact, **always-on** static guidance block is mounted in **`EngineAllocationBands`** after the band rows and **before** `EngineStabilityExplainer` (`EngineProtectiveGuidance`, `data-testid="engine-protective-guidance"`)
- canonical copy lives in ticket-local `apps/frontend/lib/engine/protective-guidance-copy.ts`; principle-level only (protection-before-growth, Available continuity, withdrawal continuity)—**not** a duplicate of `ENGINE_POSTURE_CONTEXT` or notice copy, **not** a second `<details>` or banner
- RTL tests assert semantic contract, canonical strings, and DOM order (protective guidance before explainer); dashboard tests assert mount on primary and balance-error paths

Implementation posture preserved:

- read-only engine doctrine intact; no execution, accounting, backend coupling, live signals, or policy threshold logic

### MC-S2-011 - Stability review snapshot

Implementation truth:

- a compact, read-only **`EngineStabilityReviewSnapshot`** synthesizes existing Stability Engine trust signals into one calm review state (`data-testid="engine-stability-review-snapshot"`)
- canonical copy lives in ticket-local `apps/frontend/lib/engine/stability-review-snapshot-copy.ts`; presentation in `apps/frontend/app/(app)/dashboard/EngineStabilityReviewSnapshot.tsx`
- mounted from **`EngineAllocationBands`** within the Stability Engine trust cluster; surfaces posture-based stance, Available continuity, withdrawal continuity, and `updatedAt` from existing `EngineState`
- RTL coverage in `apps/frontend/__tests__/engine-stability-review-snapshot.test.tsx`; integration asserted in `engine-allocation-bands.test.tsx`

Implementation posture preserved:

- read-only engine doctrine intact; no execution, accounting, backend coupling, historical trends, notifications, or policy threshold semantics

### MC-S2-012 - Stability review cadence cue

Implementation truth:

- one static, read-only cadence line (`ENGINE_STABILITY_REVIEW_CADENCE_CUE`) ships inside the existing review snapshot (`data-testid="engine-stability-review-snapshot-cadence"`), not as a separate trust surface
- copy extends the same ticket-local module as MC-S2-011: `apps/frontend/lib/engine/stability-review-snapshot-copy.ts`; presentation remains in `apps/frontend/app/(app)/dashboard/EngineStabilityReviewSnapshot.tsx`
- RTL coverage in `apps/frontend/__tests__/engine-stability-review-snapshot.test.tsx` (contract + small high-risk denylist); integration in `apps/frontend/__tests__/engine-allocation-bands.test.tsx`

Implementation posture preserved:

- read-only engine doctrine intact; no reminders, notifications, live-monitoring claims, posture-conditioned prompting, or execution semantics

### MC-S2-013 - Stability change signal

Implementation truth:

- a **review snapshot fingerprint** (`posture`, `liquidityTargetPct`, `coreTargetPct`, `yieldCapPct`) is defined in `apps/frontend/lib/engine/review-snapshot-fingerprint.ts`; a **single** `localStorage` key (`hedgr:engine-review-snapshot-fingerprint`) stores only the last-seen fingerprint—no feed, no backend
- the change signal renders **inside** the existing review snapshot (`EngineStabilityReviewSnapshot.tsx`) **after** the cadence line and **before** the timestamp; **no** change line on first visit (prior reference required)
- governed copy for unchanged / changed plus a one-line disclaimer (system targets vs ledger) lives in `apps/frontend/lib/engine/stability-review-snapshot-copy.ts`
- RTL coverage in `apps/frontend/__tests__/engine-stability-review-snapshot.test.tsx` and `apps/frontend/__tests__/review-snapshot-fingerprint.test.ts`

Implementation posture preserved:

- read-only engine doctrine intact; no alerts, notifications, execution semantics, balance or performance framing, or live-monitoring theater

### MC-S2-014 - Recent stability memory (v1)

Implementation truth:

- a **second** `localStorage` key (`hedgr:engine-review-snapshot-memory`) stores at most **two** recent comparison outcomes (newest-first)—append only when a prior fingerprint exists (same gate as MC-S2-013); not a feed, backend, or system-of-record surface
- copy and helpers: `apps/frontend/lib/engine/review-snapshot-memory.ts`, orientation-first strings in `stability-review-snapshot-copy.ts` (`ENGINE_STABILITY_REVIEW_MEMORY_*`); presentation remains in `EngineStabilityReviewSnapshot.tsx` (`data-testid` `engine-stability-review-memory`, `engine-stability-review-memory-entry`)
- **v1 scope:** minimal read-only **memory aid** for orientation (not a multi-entry history product); no user-facing “initial” row; timestamps visually secondary
- RTL coverage in `apps/frontend/__tests__/engine-stability-review-snapshot.test.tsx`, `apps/frontend/__tests__/review-snapshot-memory.test.ts`

Implementation posture preserved:

- read-only engine doctrine intact; no execution semantics, balance or performance framing, or authoritative chronology

### MC-S2-015 - Withdrawal exception state clarity

Implementation truth:

- canonical **non-final** exception-path clarification lines live in `apps/frontend/lib/tx/public-status-exception-clarification.ts` (`getExceptionPathClarificationLines`), keyed by existing `PublicTxStatus` only (`PENDING_INIT` and `IN_PROGRESS` share the same lines; terminal statuses return null)
- exported from `apps/frontend/lib/tx/index.ts` for reuse beyond withdraw; copy is plain-language (still processing, not final, no promised completion time) and avoids default “under review” framing unless future UI truth supports it
- the withdraw page mounts a **subordinate block inside** the existing status card (`data-testid="withdraw-status-exception-clarification"`) when the active public status is non-final — one cohesive trust surface with MC-S2-008’s status region
- withdraw **v1** continues to surface **`IN_PROGRESS`** as the primary in-flight state from `WITHDRAW_STATUS_CONTENT`; mock behavior unchanged; failed path still uses `ErrorState` only
- RTL: `apps/frontend/__tests__/public-status-exception-clarification.test.ts` (tx-layer trust contract); `apps/frontend/__tests__/withdraw.page.test.tsx` extended for the clarification block

Implementation posture preserved:

- read-only, informational, frontend-only; no new public status enum values, no backend or state-machine widening, no execution or accounting semantics

### MC-S2-016 - Reconciliation visibility baseline

Implementation truth:

- canonical completion-adjacent non-finality lines live in `apps/frontend/lib/tx/public-status-reconciliation-clarification.ts` (`getReconciliationClarificationLines`); **`PublicTxStatus.IN_PROGRESS` only** for v1 (`PENDING_INIT` returns null); terminal statuses return null
- separate module from MC-S2-015 exception-path clarification to keep trust contracts distinct; exported from `apps/frontend/lib/tx/index.ts`
- the withdraw page mounts a **second subordinate block** inside the existing status card (`data-testid="withdraw-status-reconciliation-clarification"`) **below** the exception clarification — same visual pattern (border-t, compact body); not a competing status headline
- v1 copy uses smallest safe user meaning: not final, still being confirmed, not automatically wrong; no promised timing; avoids default operations vocabulary in user-facing strings
- RTL: `apps/frontend/__tests__/public-status-reconciliation-clarification.test.ts`; `apps/frontend/__tests__/withdraw.page.test.tsx` extended for the reconciliation block

Implementation posture preserved:

- read-only, informational, frontend-only; no new public status enum values, no backend or state-machine widening, no execution or accounting semantics

### MC-S2-017 - Withdrawal unresolved-path guidance

Implementation truth:

- canonical minimal unresolved-path lines live in `apps/frontend/lib/tx/public-status-unresolved-path-clarification.ts` (`getUnresolvedPathClarificationLines`); **`PublicTxStatus.IN_PROGRESS` only** for v1; terminal statuses and `PENDING_INIT` return null; at most **two** short lines, calmer than MC-S2-015/016
- exported from `apps/frontend/lib/tx/index.ts`; separate module from MC-S2-015/016 to keep trust contracts distinct
- the withdraw page mounts a **third subordinate block** inside the existing status card (`data-testid="withdraw-status-unresolved-path-clarification"`) **below** reconciliation — **quieter** presentation (`text-xs` / muted) so it reads as a footnote, not a new primary status; **no** client timer or elapsed-time gate (status + copy composition only; same public truth as 015/016)
- RTL: `apps/frontend/__tests__/public-status-unresolved-path-clarification.test.ts`; `apps/frontend/__tests__/withdraw.page.test.tsx` extended for presence/absence and copy guardrails

Implementation posture preserved:

- read-only, informational, frontend-only; no new public status enum values, no pseudo-state machine, no backend or escalation semantics

### MC-S2-018 - Withdrawal next-step guidance baseline

Implementation truth:

- canonical **continuity-orientation** lines live in `apps/frontend/lib/tx/public-status-next-step-guidance.ts` (`getNextStepGuidanceLines`); **`PublicTxStatus.IN_PROGRESS` only** for v1; terminal statuses and `PENDING_INIT` return null; at most **two** short lines; copy-only helper (no workflow or transition semantics)
- exported from `apps/frontend/lib/tx/index.ts`
- the withdraw page mounts a **fourth subordinate block** inside the existing status card (`data-testid="withdraw-status-next-step-guidance"`) **below** the unresolved-path strip — same quiet presentation tier (`text-xs` / muted) as MC-S2-017; visibility tied to public status only
- RTL: `apps/frontend/__tests__/public-status-next-step-guidance.test.ts`; `apps/frontend/__tests__/withdraw.page.test.tsx` extended for presence/absence and copy guardrails

Implementation posture preserved:

- read-only, informational, frontend-only; no new public status enum values, no procedural-sequence promises beyond existing UI truth, no backend or escalation semantics

### MC-S2-019 - Withdrawal fallback-path clarity (constrained-path)

Implementation truth:

- canonical **constrained-path** clarification lines live in `apps/frontend/lib/tx/public-status-fallback-path-clarification.ts` (`getFallbackPathClarificationLines`); **`PublicTxStatus.IN_PROGRESS` only** for v1; terminal statuses and `PENDING_INIT` return null; at most **two** short lines; plain retail wording (not “fallback path” jargon in user strings)
- trust meaning is distinct from MC-S2-017 (unresolved persistence) and MC-S2-018 (continuity / not gone quiet): **more time or checks than the simplest withdrawal** can still be **normal forward motion** — not abandonment, guarantees, or ops theater
- exported from `apps/frontend/lib/tx/index.ts`
- the withdraw page mounts a **fifth subordinate block** inside the existing status card (`data-testid="withdraw-status-fallback-path-clarity"`) **below** next-step guidance — **quieter** than MC-S2-017/018 (`text-gray-400`, tighter `pt` / lighter border) so it stays the lightest strip in the stack
- RTL: `apps/frontend/__tests__/public-status-fallback-path-clarification.test.ts`; `apps/frontend/__tests__/withdraw.page.test.tsx` extended for semantic-distinctness and high-risk denylist guardrails

Implementation posture preserved:

- read-only, informational, frontend-only; no new public status enum values, no backend fallback logic, no execution or accounting semantics

### MC-S2-020 - Market-data failure continuity baseline

Implementation truth:

- canonical four-part trust copy (unavailable → affects → still knowable → action limited) lives in `apps/frontend/lib/fx/market-data-continuity-copy.ts` (`getMarketDataContinuityCopy`, `CONVERSION_PREVIEW_UNAVAILABLE_PLACEHOLDER`); deposit and withdraw route variants
- presentational continuity panel only: `apps/frontend/components/MarketDataContinuityPanel.tsx` (copy + FX retry; no route, pricing, or confirm gating); exported from `apps/frontend/components/index.ts`
- **deposit:** `apps/frontend/app/(app)/deposit/page.tsx` — no full-page FX error wall; `data-testid="deposit-market-data-continuity"` immediately under the page title when `useLatestFx` is in error; main route body (amount, preview row, confirm) remains visible; preview row `data-testid="deposit-conversion-preview"` shows explicit placeholder text when rate is missing (never `$0.00` as a real conversion); confirm remains gated on successful rate
- **withdraw:** `apps/frontend/app/(app)/withdraw/page.tsx` — same degraded pattern (`data-testid="withdraw-market-data-continuity"`); **market-data panel is separate in meaning and visual tier** from `withdraw-status-region` and MC-S2-015–019 strips (dependency/orientation vs public transaction status); confirm gated on successful FX/rate in page code; `FxRateBlock` unchanged for success/loading paths
- RTL: `apps/frontend/__tests__/market-data-continuity-copy.test.ts`, `apps/frontend/__tests__/deposit.page.test.tsx`, `apps/frontend/__tests__/withdraw.page.test.tsx` (degraded composure + lean denylist)
- E2E: `apps/frontend/tests-e2e/helpers/fx-ready.ts` — `waitForDepositFxReady` / `waitForWithdrawFxReady` so Playwright waits for FX-backed Confirm enablement after MC-S2-020 gating

Implementation posture preserved:

- read-only, informational, frontend-only; no fallback or synthetic pricing, no new public transaction states, no backend recovery guarantees, no Copilot changes

### MC-S2-021 - Transaction mock-state observability seam

Implementation truth:

- **shared dev guard:** `apps/frontend/lib/dev/local-simulation-guard.ts` (`isLocalDevSimulationSeamEnabled`) — same enablement rules as the engine posture simulator; `apps/frontend/lib/engine/simulator.ts` delegates to it
- **ticket-scoped resolver:** `apps/frontend/lib/tx/tx-review-simulator.ts` — query params `txReviewBypassFx=1` (review-only confirm guard bypass when rate missing) and `txReviewHoldPending=1` (withdraw mock skips auto-confirm timer); ignored outside approved local dev; no generic option bag
- **required disclosure:** `apps/frontend/components/TxReviewSimulatorBanner.tsx` — `deposit-tx-review-simulator-banner` / `withdraw-tx-review-simulator-banner` when seam active
- **deposit:** `apps/frontend/app/(app)/deposit/page.tsx` — `useSearchParams` + `Suspense`; with bypass + FX error, confirm can proceed; conversion preview stays **unavailable** (never fake FX Preview $); ledger stub uses `amount_usd: 0` / `fx_rate: 0` only as technical placeholders, not UI economic truth
- **withdraw:** `apps/frontend/app/(app)/withdraw/page.tsx` — same routing pattern; bypass allows confirm without rate without fabricating rate UI; `withdraw.mock` `createWithdraw(..., { skipAutoConfirm })` when hold param set
- **RTL:** `apps/frontend/__tests__/tx-review-simulator.test.ts`; `deposit.page.test.tsx` / `withdraw.page.test.tsx` extended for seam activation, blocked envs, no fake preview
- **ADR:** `docs/decisions/0017-transaction-review-simulator-dev-seam-mc-s2-021.md` (boundary documentation only)

Implementation posture preserved:

- dev-only, review-only, simulation-only; not a production control plane; no new `PublicTxStatus`; no backend or policy runtime changes; ADR 0017 records non-precedent framing for bypass and placeholders

### MC-S2-022 - Local stub transaction-path continuity

Implementation truth:

- **static review hints:** `apps/frontend/lib/deposits/local-stub-deposit-review-hints.ts` — bounded bullets (3) for local stub deposit API failure; no dynamic payloads or endpoint dumps
- **deposit:** `apps/frontend/app/(app)/deposit/page.tsx` — on `FAILED` after `postDeposit` rejection, existing user-facing `ErrorState` unchanged; when `isLocalDevSimulationSeamEnabled()` from `apps/frontend/lib/dev/local-simulation-guard.ts`, renders dev-only aside `data-testid="deposit-local-stub-failure-hints"` (no stack traces, raw HTTP, or response bodies)
- **RTL:** `apps/frontend/__tests__/deposit.page.test.tsx` — hints visible only under approved local dev guard; absent when `NODE_ENV=test` or `CI=true`; sanitized failure copy preserved; no thrown error text in DOM

Implementation posture preserved:

- local review-harness hardening only; not frontend-only fake deposit completion; no new transaction semantics, fallback pricing, production behavior changes, or backend contract changes; no new ADR

### Allocation band label UX legibility (merged baseline)

The following allocation trust-surface UX refinement is merged and part of the current dashboard baseline:

- labels renamed for legibility:
  - Liquidity → Available
  - Core allocation → Core
  - Yield provision → Growth capacity
- supporting microcopy reinforces:
  - available = ready to use
  - core = kept stable to preserve value
  - growth capacity = up to the displayed percentage can support returns when conditions allow

This refinement is merged UX-legibility work only. It does not change posture logic, backend logic, accounting meaning, or the read-only boundary. Future ticket work must preserve this plainer-language vocabulary unless doctrine explicitly changes.

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
- `MC-S2-007` - Allocation trust legend and disclosure microcopy
- `MC-S2-008` - Withdraw lifecycle integrity
- `MC-S2-009` - Stability Engine expandable explainability layer
- `MC-S2-010` - Stability Engine protective guidance layer
- `MC-S2-011` - Stability review snapshot
- `MC-S2-012` - Stability review cadence cue
- `MC-S2-013` - Stability change signal
- `MC-S2-014` - Recent stability memory (v1)
- `MC-S2-015` - Withdrawal exception state clarity
- `MC-S2-016` - Reconciliation visibility baseline
- `MC-S2-017` - Withdrawal unresolved-path guidance
- `MC-S2-018` - Withdrawal next-step guidance baseline
- `MC-S2-019` - Withdrawal fallback-path clarity (constrained-path)
- `MC-S2-020` - Market-data failure continuity baseline
- `MC-S2-021` - Transaction mock-state observability seam
- `MC-S2-022` - Local stub transaction-path continuity

Current active ticket status:

- **Approved next ticket:** none recorded in this file. When governance approves the next sequenced ticket, add it here explicitly. Do not treat any other item as sequenced continuation work until it appears here.
- Cursor must not assume continuation beyond **§6** merged truth, **§7a** active brief (when populated), and current governance.
- Cursor must not continue automatically into work beyond what is explicitly defined in this file for an active ticket.
- Cursor must not drift beyond explicitly defined scope.

**Last completed ticket (summary):** `MC-S2-022` — Local stub transaction-path continuity — merged implementation truth in **§6** (`MC-S2-022`); shipped summary in **§28**.

---

## 7a. Active execution ticket

**No active execution ticket** is recorded here. When the next ticket is approved, replace this section with the full execution brief (historical example: **§28** `MC-S2-022`).

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

### Phase 3 planning lens - operational trust plus stickiness

Phase 3 continuation planning may include **read-only stickiness surfaces** only where they strengthen operational trust without widening the engine boundary.

Allowed planning direction inside Phase 3:

- make the dashboard a clearer recurring stability review surface
- strengthen habit loops through calm, informational status and review cues
- add lightweight progress or review framing that helps users understand whether stability is improving, drifting, or holding
- reinforce Hedgr as a financial control system through visibility, not automation authority
- improve daily or weekly user return incentives without implying execution, rebalancing, or ledger mutation

Examples that may fit Phase 3 if scoped narrowly and kept read-only:

- a compact stability snapshot summary on the dashboard
- informational progress framing such as stable / improving / drifting
- a read-only review prompt or status cadence surface
- explanatory activity or review history that describes what the system is signaling, not what funds have executed

Phase 3 stickiness work must not introduce:

- autonomous rebalancing semantics
- executed movement language
- balance partitioning as engine truth
- growth-first or APY-led engagement mechanics
- streaks, gamification, or reward framing that weakens trust posture
- live backend coupling, runtime policy expansion, or hidden execution authority

Planning principle:

**Stickiness in the current phase must come from clarity, review habit, and trust reinforcement — not from automation theater or engagement gimmicks.**

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

## 13. Completed execution ticket - MC-S2-007 (allocation trust legend and disclosure microcopy)

**Ticket:** `MC-S2-007` - Allocation trust legend and disclosure microcopy  
**Branch:** `feat/mc-s2-007-allocation-trust-legend`

### Objective (as scoped)

Add a compact explanatory trust layer near the Stability Engine allocation surface so users can clearly distinguish **targets**, **balances (ledger truth)**, and the fact that **targets do not mean funds have already moved**—without widening runtime semantics.

### Shipped summary

1. **`apps/frontend/app/(app)/dashboard/EngineAllocationBands.tsx`** — Short framing caption; compact 3-line trust legend (`data-testid="engine-allocation-trust-legend"`) beneath it with Targets / Balances / Movement; caption shortened so total copy stays scannable vs the prior single paragraph. `EnginePostureHeader.tsx` unchanged.
2. **`apps/frontend/__tests__/engine-allocation-bands.test.tsx`** — Asserts legend container and phrase-level coverage for the three distinctions; caption assertions updated.

**Follow-ups:** None required for this ticket. Record the next ticket explicitly in §7 when approved.

---

## 14. Completed execution ticket - MC-S2-008 (withdraw lifecycle integrity)

**Ticket:** `MC-S2-008` - Withdraw lifecycle integrity  
**Branch:** `feat/mc-s2-008-withdraw-lifecycle-integrity`

### Objective (as scoped)

Hardened the withdrawal lifecycle trust surface on the withdraw page so users can more clearly understand **what stage** a withdrawal is in, **what is pending versus completed**, and **what in-flight or delayed processing means**—with calm copy that does not promise guaranteed timing or instant settlement. Shipped wording clarifies that **protective posture does not imply withdrawal lockup** (and does not by itself stop processing). Scoped to **Phase 3 - Operational Trust** as a **frontend operational-trust** refinement only—no backend execution expansion, treasury-routing semantics, or guaranteed settlement claims.

### Shipped summary

1. **`apps/frontend/app/(app)/withdraw/page.tsx`** — Withdraw status region aligned to tx-layer vocabulary; clearer pending vs completed presentation; calm processing-delay copy; brief protection-vs-lockup line; stable test hooks (`withdraw-status-region`, status attributes) for regression coverage.
2. **`apps/frontend/__tests__/withdraw.page.test.tsx`** — RTL tests for withdraw status presentation and trust-safe copy.
3. **`apps/frontend/tests-e2e/critical.spec.ts`** — Critical E2E asserts withdraw status region on the success path.

**Follow-ups:** None required for this ticket. Record the next approved ticket explicitly in §7 when chosen.

---

## 15. Completed execution ticket - MC-S2-009 (Stability Engine expandable explainability layer)

**Ticket:** `MC-S2-009` — Stability Engine expandable explainability layer  
**Suggested branch:** `feat/mc-s2-009-engine-explainability-layer`

### Objective (as scoped)

Add a compact, optional, read-only explainer on the dashboard that helps users understand Hedgr's allocation language in plain terms, without implying execution, ledger truth, or live policy logic.

### Shipped summary

1. **`apps/frontend/lib/engine/stability-explainer-copy.ts`** — Ticket-local canonical strings for summary, intro, three term definitions (Available / Core / Growth capacity), two principle lines, footer guardrail.
2. **`apps/frontend/app/(app)/dashboard/EngineStabilityExplainer.tsx`** — Collapsed-by-default `details`/`summary` explainer (`data-testid="engine-stability-explainer"`).
3. **`apps/frontend/app/(app)/dashboard/EngineAllocationBands.tsx`** — Mounts the explainer after the band rows.
4. **`apps/frontend/__tests__/engine-allocation-bands.test.tsx`**, **`dashboard.page.test.tsx`** — Explainer coverage and dashboard mount.

**Follow-ups:** None required. Successor: `MC-S2-010` (§16).

---

## 16. Completed execution ticket - MC-S2-010 (Stability Engine protective guidance layer)

**Ticket:** `MC-S2-010` — Stability Engine protective guidance layer  
**Suggested branch:** `feat/mc-s2-010-protective-guidance-layer`

### Objective (as scoped)

Add a compact, always-on, read-only trust layer on the dashboard allocation card that explains protective stance in plain language (protection-before-growth, Available continuity, withdrawal continuity), without duplicating posture context or notices or implying execution or ledger truth.

### Shipped summary

1. **`apps/frontend/lib/engine/protective-guidance-copy.ts`** — Principle-level canonical strings (title, framing, three bullets); does not duplicate `ENGINE_POSTURE_CONTEXT` or notice copy.
2. **`apps/frontend/app/(app)/dashboard/EngineProtectiveGuidance.tsx`** — Static guidance block (`data-testid="engine-protective-guidance"`), not a second `<details>` or banner.
3. **`apps/frontend/app/(app)/dashboard/EngineAllocationBands.tsx`** — Mounts protective guidance after band rows, before `EngineStabilityExplainer`.
4. **`apps/frontend/__tests__/engine-allocation-bands.test.tsx`**, **`dashboard.page.test.tsx`** — Semantic contract, canonical copy, DOM order before explainer.

**Follow-ups:** None required for this ticket. Record the next approved ticket explicitly in §7 when chosen.

---

## 17. Completed execution ticket - MC-S2-011 (Stability review snapshot)

**Ticket:** `MC-S2-011` — Stability review snapshot  
**Suggested branch:** `feat/mc-s2-011-stability-review-snapshot`

### Objective (as scoped)

Add a compact, read-only dashboard summary that turns the current Stability Engine trust signals into a single calm review state for the user—without implying execution, ledger truth, policy thresholds, or historical performance authority.

### Shipped summary

1. **`apps/frontend/lib/engine/stability-review-snapshot-copy.ts`** — Ticket-local title, stance-by-posture lines, Available continuity, withdrawal continuity, timestamp line helper.
2. **`apps/frontend/app/(app)/dashboard/EngineStabilityReviewSnapshot.tsx`** — Review snapshot block (`data-testid="engine-stability-review-snapshot"`).
3. **`apps/frontend/app/(app)/dashboard/EngineAllocationBands.tsx`** — Mounts the snapshot within the Stability Engine trust cluster.
4. **`apps/frontend/__tests__/engine-stability-review-snapshot.test.tsx`**, **`engine-allocation-bands.test.tsx`** — Rendering, stance copy, anti-drift coverage.

**Follow-ups:** None required for this ticket. Successor: `MC-S2-012` (§18); shipped — see §6.

---

## 18. Completed execution ticket - MC-S2-012 (Stability review cadence cue)

**Ticket:** `MC-S2-012` — Stability review cadence cue  
**Suggested branch:** `feat/mc-s2-012-review-cadence-cue`

### Objective (as scoped)

Add a single static, read-only cadence line inside the existing Stability Engine review snapshot so users get a calm recurring-review rhythm cue—without alerts, reminders, live-monitoring semantics, or posture-conditioned prompting.

### Shipped summary

1. **`apps/frontend/lib/engine/stability-review-snapshot-copy.ts`** — `ENGINE_STABILITY_REVIEW_CADENCE_CUE` (extends the MC-S2-011 snapshot copy module; no separate cadence-only file).
2. **`apps/frontend/app/(app)/dashboard/EngineStabilityReviewSnapshot.tsx`** — Cadence line inside the review snapshot block (`data-testid="engine-stability-review-snapshot-cadence"`), before the timestamp line.
3. **`apps/frontend/__tests__/engine-stability-review-snapshot.test.tsx`**, **`engine-allocation-bands.test.tsx`** — Contract presence for cadence copy; small high-risk denylist (e.g. urgency / alerting / monitoring phrasing).

**Follow-ups:** None required for this ticket. Successor: **`MC-S2-013`** (§19); shipped — see §6.

---

## 19. Completed execution ticket - MC-S2-013 (Stability change signal)

**Ticket:** `MC-S2-013` — Stability change signal  
**Suggested branch:** `feat/mc-s2-013-stability-change-signal`

### Objective (as scoped)

Add a compact, read-only signal so users can tell whether the **informational system targets** in the review snapshot match or differ from their **last view in this browser**, without urgency, execution semantics, performance framing, or live-monitoring theater.

### Shipped summary

1. **`apps/frontend/lib/engine/review-snapshot-fingerprint.ts`** — `buildReviewSnapshotFingerprint`, `REVIEW_SNAPSHOT_FINGERPRINT_STORAGE_KEY` (`hedgr:engine-review-snapshot-fingerprint`).
2. **`apps/frontend/lib/engine/stability-review-snapshot-copy.ts`** — `ENGINE_STABILITY_REVIEW_CHANGE_UNCHANGED`, `ENGINE_STABILITY_REVIEW_CHANGE_CHANGED`, `ENGINE_STABILITY_REVIEW_CHANGE_DISCLAIMER`.
3. **`apps/frontend/app/(app)/dashboard/EngineStabilityReviewSnapshot.tsx`** — client `localStorage` compare; change lines after cadence, before timestamp (`data-testid` `engine-stability-review-snapshot-change-signal`, `engine-stability-review-snapshot-change-disclaimer`); no line until a prior fingerprint exists.
4. **`apps/frontend/__tests__/engine-stability-review-snapshot.test.tsx`**, **`apps/frontend/__tests__/review-snapshot-fingerprint.test.ts`** — unchanged/changed/first-visit behavior, semantic and small high-risk denylist coverage.

**Follow-ups:** None required for this ticket. Successor: **`MC-S2-014`** (§20); shipped — see §6.

---

## 20. Completed execution ticket - MC-S2-014 (Stability review history trail / recent stability memory v1)

**Ticket:** `MC-S2-014` — Stability review history trail (program id); **shipped v1** is a minimal **recent stability memory** surface—not a multi-entry history product.  
**Suggested branch:** `feat/mc-s2-014-stability-review-history-trail`

### Objective (as scoped)

Add read-only, local-only memory for Stability Engine **review comparison outcomes** so users can retain a small amount of orientation over time, without implying execution, performance, policy actions, backend authority, or a system-of-record trail.

### Shipped summary

1. **`apps/frontend/lib/engine/review-snapshot-memory.ts`** — `REVIEW_SNAPSHOT_MEMORY_STORAGE_KEY`, `readReviewSnapshotMemory`, `appendReviewSnapshotMemoryAfterVisit`, cap **2** entries, append only when a prior fingerprint exists.
2. **`apps/frontend/lib/engine/stability-review-snapshot-copy.ts`** — `ENGINE_STABILITY_REVIEW_MEMORY_TITLE`, `ENGINE_STABILITY_REVIEW_MEMORY_DISCLAIMER`, short `ENGINE_STABILITY_REVIEW_MEMORY_TARGETS_*` lines.
3. **`apps/frontend/app/(app)/dashboard/EngineStabilityReviewSnapshot.tsx`** — memory block after change signal / disclaimer, before snapshot timestamp (`data-testid` `engine-stability-review-memory`, `engine-stability-review-memory-entry`); subdued entry timestamps.
4. **`apps/frontend/__tests__/engine-stability-review-snapshot.test.tsx`**, **`apps/frontend/__tests__/review-snapshot-memory.test.ts`** — semantic contract, anti-drift vs feed/log phrasing, cap/ordering helpers.

**Follow-ups:** Shipped successor **`MC-S2-015`** (§21); see **§6** merged truth.

---

## 21. Completed execution ticket - MC-S2-015 (Withdrawal exception state clarity)

**Ticket:** `MC-S2-015` — Withdrawal exception state clarity  
**Suggested branch:** `feat/mc-s2-015-withdrawal-exception-state-clarity`

### Objective (as scoped)

Add a compact, read-only trust layer on the withdraw surface so **non-final** withdrawal states (still processing, taking more time, not yet final) are easier to understand in plain language—without implying guaranteed timing, hidden movement, default lockup, or backend operational authority beyond surfaced status.

### Shipped summary

1. **`apps/frontend/lib/tx/public-status-exception-clarification.ts`** — `getExceptionPathClarificationLines` for in-flight `PublicTxStatus` values only; terminal statuses return null.
2. **`apps/frontend/lib/tx/index.ts`** — re-exports the helper for shared tx-layer use.
3. **`apps/frontend/app/(app)/withdraw/page.tsx`** — subordinate clarification block inside the existing status region (`withdraw-status-exception-clarification`).
4. **`apps/frontend/__tests__/public-status-exception-clarification.test.ts`**, **`apps/frontend/__tests__/withdraw.page.test.tsx`** — trust-contract and withdraw integration coverage.

**Follow-ups:** Shipped successor **`MC-S2-016`** (§22); see **§6** merged truth.

---

## 22. Completed execution ticket - MC-S2-016 (Reconciliation visibility baseline)

**Ticket:** `MC-S2-016` — Reconciliation visibility baseline  
**Suggested branch:** `feat/mc-s2-016-reconciliation-visibility-baseline`

### Objective (as scoped)

Add a second, strictly subordinate read-only trust layer on the withdraw status card so the **completion-adjacent non-final** period is legible in plain language — not final, still being confirmed, not automatically wrong — without operations vocabulary, a second status source, timing guarantees, or settlement overclaim.

### Shipped summary

1. **`apps/frontend/lib/tx/public-status-reconciliation-clarification.ts`** — `getReconciliationClarificationLines`; **`IN_PROGRESS` only** for v1; terminals and `PENDING_INIT` return null.
2. **`apps/frontend/lib/tx/index.ts`** — re-exports the helper.
3. **`apps/frontend/app/(app)/withdraw/page.tsx`** — second subordinate block (`withdraw-status-reconciliation-clarification`) below MC-S2-015 exception clarification.
4. **`apps/frontend/__tests__/public-status-reconciliation-clarification.test.ts`**, **`apps/frontend/__tests__/withdraw.page.test.tsx`** — trust-contract and withdraw integration coverage.

**Follow-ups:** Shipped successor **`MC-S2-017`** (§23); see **§6** merged truth.

---

## 23. Completed execution ticket - MC-S2-017 (Withdrawal unresolved-path guidance)

**Ticket:** `MC-S2-017` — Withdrawal unresolved-path guidance  
**Suggested branch:** `feat/mc-s2-017-withdrawal-unresolved-path-guidance`

### Objective (as scoped)

Add a minimal third, read-only trust layer on the withdraw status card so **persistent non-final** `PublicTxStatus.IN_PROGRESS` is legible as still unresolved and not silently forgotten — without loss/lockup/hidden-movement implications, new public statuses, client timers as pseudo-state, or escalation/support promises.

### Shipped summary

1. **`apps/frontend/lib/tx/public-status-unresolved-path-clarification.ts`** — `getUnresolvedPathClarificationLines`; **`IN_PROGRESS` only** for v1; at most two short lines.
2. **`apps/frontend/lib/tx/index.ts`** — re-exports the helper.
3. **`apps/frontend/app/(app)/withdraw/page.tsx`** — third subordinate block (`withdraw-status-unresolved-path-clarification`) below reconciliation; quieter typography than prior clarification strips; visibility tied to public status only (composition with MC-S2-015/016).
4. **`apps/frontend/__tests__/public-status-unresolved-path-clarification.test.ts`**, **`apps/frontend/__tests__/withdraw.page.test.tsx`** — trust-contract and withdraw integration coverage.

**Follow-ups:** Shipped successor **`MC-S2-018`** (§24); see **§6** merged truth.

---

## 24. Completed execution ticket - MC-S2-018 (Withdrawal next-step guidance baseline)

**Ticket:** `MC-S2-018` — Withdrawal next-step guidance baseline  
**Suggested branch:** `feat/mc-s2-018-withdrawal-next-step-guidance-baseline`

### Objective (as scoped)

Add a compact, read-only trust layer on the withdraw surface that gives calm **continuity orientation** when a withdrawal remains non-final (`IN_PROGRESS` in v1) — still in process, not silent or abandoned, non-finality not automatic failure — without support escalation, manual intervention, guaranteed timing, procedural step promises, or backend operational authority.

### Shipped summary

1. **`apps/frontend/lib/tx/public-status-next-step-guidance.ts`** — `getNextStepGuidanceLines`; **`IN_PROGRESS` only** for v1; terminals and `PENDING_INIT` return null; at most two short lines; copy-only seam.
2. **`apps/frontend/lib/tx/index.ts`** — re-exports the helper.
3. **`apps/frontend/app/(app)/withdraw/page.tsx`** — fourth subordinate block (`withdraw-status-next-step-guidance`) below MC-S2-017 unresolved-path strip; quiet `text-xs` / muted presentation.
4. **`apps/frontend/__tests__/public-status-next-step-guidance.test.ts`**, **`apps/frontend/__tests__/withdraw.page.test.tsx`** — trust-contract and withdraw integration coverage.

**Follow-ups:** Shipped successor **`MC-S2-019`** (§25); see **§6** merged truth.

---

## 25. Completed execution ticket - MC-S2-019 (Withdrawal fallback-path clarity)

**Ticket:** `MC-S2-019` — Withdrawal fallback-path clarity  
**Suggested branch:** `feat/mc-s2-019-withdrawal-fallback-path-clarity`

### Objective (as scoped)

Add a compact, read-only trust layer on the withdraw surface so users understand when the **smooth path** may need **more time or checks** than the simplest case, while processing can still move forward legitimately — **without** restating MC-S2-017 (unresolved persistence) or MC-S2-018 (continuity / not gone quiet), and without guarantees, execution semantics, or new public transaction states. v1: **`PublicTxStatus.IN_PROGRESS` only**.

### Shipped summary

1. **`apps/frontend/lib/tx/public-status-fallback-path-clarification.ts`** — `getFallbackPathClarificationLines`; **`IN_PROGRESS` only** for v1; at most two short lines; plain retail copy.
2. **`apps/frontend/lib/tx/index.ts`** — re-exports the helper.
3. **`apps/frontend/app/(app)/withdraw/page.tsx`** — fifth subordinate block (`withdraw-status-fallback-path-clarity`) below MC-S2-018; lightest visual tier in the stack (`text-gray-400`, tighter spacing).
4. **`apps/frontend/__tests__/public-status-fallback-path-clarification.test.ts`**, **`apps/frontend/__tests__/withdraw.page.test.tsx`** — semantic-distinctness themes, adjacent-strip non-echo checks, and high-risk denylist guardrails.

**Follow-ups:** Shipped successor **`MC-S2-020`** (§26); see **§6** merged truth.

---

## 26. Completed execution ticket - MC-S2-020 (Market-data failure continuity baseline)

**Ticket:** `MC-S2-020` — Market-data failure continuity baseline  
**Suggested branch:** `feat/mc-s2-020-market-data-failure-continuity`

### Objective (as scoped)

Add a read-only degraded-state trust layer on deposit and withdraw so routes stay understandable when exchange-rate fetching fails—without implying live pricing, safe proceed, or backend authority; preserve route context without a full-page infrastructure wall or casually actionable happy-path chrome.

### Shipped summary

1. **`apps/frontend/lib/fx/market-data-continuity-copy.ts`** — four-part trust copy (`getMarketDataContinuityCopy`); deposit/withdraw variants; `CONVERSION_PREVIEW_UNAVAILABLE_PLACEHOLDER` for non-assertive deposit preview when rate is missing.
2. **`apps/frontend/components/MarketDataContinuityPanel.tsx`** — presentational panel (copy + FX retry only); `data-testid` `deposit-market-data-continuity` / `withdraw-market-data-continuity`; exported from `apps/frontend/components/index.ts`.
3. **`apps/frontend/app/(app)/deposit/page.tsx`** — removes FX-only full-page return; continuity panel under title on FX error; preview row `deposit-conversion-preview` never shows `$0.00` as real conversion; confirm gated on rate.
4. **`apps/frontend/app/(app)/withdraw/page.tsx`** — same degraded pattern; market-data panel visually and semantically separate from `withdraw-status-region` / MC-S2-015–019 strips; confirm gated on successful FX/rate; `FxRateBlock` unchanged for non-error paths.
5. **`apps/frontend/__tests__/market-data-continuity-copy.test.ts`**, **`apps/frontend/__tests__/deposit.page.test.tsx`**, **`apps/frontend/__tests__/withdraw.page.test.tsx`** — copy contract, degraded composure, lean denylist.
6. **`apps/frontend/tests-e2e/helpers/fx-ready.ts`** and updated deposit/withdraw flows in **`balance-ssot`**, **`critical`**, **`empty-error-states`**, **`tx-lifecycle`** specs — wait for Confirm enabled once `/v1/fx/latest` succeeds.

**Follow-ups:** Shipped successor **`MC-S2-021`** (§27); see **§6** merged truth.

---

## 27. Completed execution ticket - MC-S2-021 (Transaction mock-state observability seam)

**Ticket:** `MC-S2-021` — Transaction mock-state observability seam  
**Suggested branch:** `feat/mc-s2-021-transaction-mock-state-observability`

### Shipped summary

1. **`apps/frontend/lib/dev/local-simulation-guard.ts`** — shared `isLocalDevSimulationSeamEnabled()` (aligned with former engine-only guard).
2. **`apps/frontend/lib/engine/simulator.ts`** — `isLocalEngineSimulatorEnabled()` delegates to the shared guard.
3. **`apps/frontend/lib/tx/tx-review-simulator.ts`** — `resolveTxReviewSimulatorFlags`, `isTxReviewSeamActive`; params `txReviewBypassFx=1`, `txReviewHoldPending=1` (value `1` only); ticket-scoped, no option bag.
4. **`apps/frontend/components/TxReviewSimulatorBanner.tsx`** — required banner when seam active; test ids `deposit-tx-review-simulator-banner`, `withdraw-tx-review-simulator-banner`.
5. **`apps/frontend/app/(app)/deposit/page.tsx`**, **`withdraw/page.tsx`** — `Suspense` + `useSearchParams`; review bypass for confirm without rate; no fake conversion preview; deposit ledger placeholders `0` when rate missing (non-UI truth).
6. **`apps/frontend/lib/payments/withdraw.mock.ts`** — optional `skipAutoConfirm` on `createWithdraw`.
7. **`apps/frontend/__tests__/tx-review-simulator.test.ts`** — env matrix, param parsing, non-activation defaults.
8. **`apps/frontend/__tests__/deposit.page.test.tsx`**, **`withdraw.page.test.tsx`** — MC-S2-021 seam coverage.
9. **`docs/decisions/0017-transaction-review-simulator-dev-seam-mc-s2-021.md`** — boundary ADR (not doctrine expansion).

**Follow-ups:** Shipped successor **`MC-S2-022`** (§28); see **§6** merged truth.

---

## 28. Completed execution ticket - MC-S2-022 (Local stub transaction-path continuity)

**Ticket:** `MC-S2-022` — Local stub transaction-path continuity  
**Suggested branch:** `feat/mc-s2-022-local-stub-transaction-path-continuity`

### Shipped summary

1. **`apps/frontend/lib/deposits/local-stub-deposit-review-hints.ts`** — three static bullets for local stub deposit API failure orientation (no dynamic dumps).
2. **`apps/frontend/app/(app)/deposit/page.tsx`** — after `postDeposit` failure, existing `ErrorState` unchanged; when `isLocalDevSimulationSeamEnabled()`, dev-only aside `deposit-local-stub-failure-hints` below it (MC-S2-022).
3. **`apps/frontend/__tests__/deposit.page.test.tsx`** — hints under local dev guard only; hidden for `NODE_ENV=test` and `CI=true`; no raw error leakage.

**Follow-ups:** Record the next approved ticket in **§7** and **§7a** when governance adds it.

---

## 29. Immediate next-use guidance

Use this file as the continuity primer before asking Cursor to review or implement the next explicitly approved ticket touching engine posture, simulation, allocation, policy, trust, Copilot behavior, or operational withdrawal clarity.

- for the **active** next ticket, see **§7** and **§7a** (when populated)
- for transaction mock-state review seam (dev-only), see **§6** (`MC-S2-021`) and **§27**; ADR **0017**
- for shipped review snapshot, cadence, change signal, and recent stability memory, see §17 (`MC-S2-011`), §18 (`MC-S2-012`), §19 (`MC-S2-013`), and §20 (`MC-S2-014`); for withdraw exception-path clarification, see **§6** (`MC-S2-015`) and **§21**; for withdraw reconciliation / completion-adjacent clarification, see **§6** (`MC-S2-016`) and **§22**; for withdraw unresolved-path guidance, see **§6** (`MC-S2-017`) and **§23**; for withdraw next-step continuity guidance, see **§6** (`MC-S2-018`) and **§24**; for withdraw constrained-path / fallback-path clarity, see **§6** (`MC-S2-019`) and **§25**; for market-data failure continuity (deposit/withdraw degraded state), see **§6** (`MC-S2-020`) and **§26**
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

## 30. Naming note
The intended hand-off file name is `HEDGR_STATUS.md`.

Continue using:

`docs/ops/HEDGR_STATUS.md`