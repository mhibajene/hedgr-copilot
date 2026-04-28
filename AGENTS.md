# AGENTS.md — Hedgr Repo Execution Standard (v1)

Status: Binding (Repo conventions + Cursor execution rules)
Scope: apps/, packages/, scripts/, .github/, docs/

## 1) Purpose
AGENTS.md is the single source of truth for how work is done in this repo:
- repo layout and boundaries
- CI expectations and hermetic rules
- environment flags and defaults
- Cursor execution standards (incremental + reversible)

If an instruction conflicts with Hedgr doctrine docs, doctrine wins.

## 2) Repo Layout (canonical)
- apps/frontend/  — Next.js app (App Router + Pages Router), API routes, Vitest, ESLint v9
- apps/backend/   — Backend service boundary (Flask) — currently scaffold/placeholder
- packages/ui/    — Shared UI library (@hedgr/ui)
- packages/config/— Shared config (future)
- docs/           — Architecture docs, ADRs, scaffolding progress
- scripts/        — CI scripts (trust checks, version guards)
- .github/        — CI workflows, templates

## 3) Non-Negotiables (Hedgr posture)
- Security & trust before speed.
- CI/E2E must remain hermetic: no live external calls.
- Deny-by-default: mock/stub modes in CI.
- Rollback must be possible via flag or single revert.

## 4) Required CI Checks (branch protection)
- validate
- E2E smoke (@hedgr/frontend)

(Workflow names must remain stable once enforced.)

## 5) Environment Flags (defaults are CI-safe)
Frontend:
- NEXT_PUBLIC_AUTH_MODE=mock        # mock | magic (magic local-only)
- NEXT_PUBLIC_FX_MODE=stub          # stub | live (live local-only; never CI)
- NEXT_PUBLIC_MARKET_MODE=manual
- NEXT_PUBLIC_MARKET_SELECTED=UNKNOWN
- NEXT_PUBLIC_API_BASE_URL=http://localhost:5050  # set in e2e workflow

Backend:
- STUB_MODE=true                    # true in CI/E2E

AI:
- OPENAI_MODE=stub                  # unchanged: no live calls in CI

## 6) Testing Standards
- Unit: Vitest (frontend)
- E2E: Playwright smoke (frontend)
- Stable selectors: prefer role-based selectors and data-testid; avoid brittle DOM chains.
- No test depends on external services (CoinGecko, MTN, Aave, OpenAI, Magic).

## 7) Cursor Execution Rules (required)
When implementing:
- Reference exact file paths.
- Prefer small PRs: one boundary change per branch.
- Add/extend tests in the same PR when touching contract surfaces.
- Default to reversible designs (flags + stubs).
- Never merge a PR that introduces a live network dependency in CI.

### Engine-facing governance (Sprint 2 Stability Engine)

When changing **`apps/frontend/lib/engine/**`** or shipped Stability Engine trust surfaces (posture, notices, allocation bands, or simulator boundaries per `docs/ops/HEDGR_STATUS.md`), read **in order**:

1. `docs/ops/HEDGR_STATUS.md` — **§7** / **§7a** for the approved next ticket (when named); **§6b** is Transition Readiness taxonomy only, not sequencing authority
2. `docs/decisions/SPRINT-2-ADR-INDEX.md`
3. `docs/decisions/0015-stability-engine-is-the-system-center.md`
4. `docs/decisions/0014-stability-engine-read-only-in-sprint-2.md`
5. `docs/decisions/0013-allocation-bands-informational-not-accounting.md`

Sprint planning procedure (subordinate to §7 / §7a): `docs/ops/HEDGR_SPRINT_PLANNING_PROTOCOL.md`

If anything conflicts, stop and surface it explicitly (do not silently reconcile).

## 8) Decision Logging (ADR)
Material decisions must be logged as ADRs under docs/ using the HedgrOps ADR standard.
Examples: architecture boundary, custody/trust posture, compliance posture, sequencing decisions.

# AGENTS.md — Hedgr Repo Execution Standard (v2)

Status: Binding (Repo workflow, engineering conventions, CI posture)
Scope: apps/, packages/, scripts/, .github/, docs/

## 1) Purpose
AGENTS.md defines how work is executed in this repo:
- repo layout and boundaries
- CI expectations and hermetic rules
- environment flags and defaults
- implementation workflow conventions

For doctrine, architecture, product/system invariants, and anti-drift rules, `.cursorrules` is the governing authority.

For patch execution discipline, `.cursor/rules.md` applies.

## 2) Repo Layout (canonical)
- apps/frontend/  — Next.js app (App Router + Pages Router), API routes, Vitest, ESLint
- apps/backend/   — Flask backend service boundary; currently limited in scope but part of the canonical system structure
- packages/ui/    — Shared UI library (`@hedgr/ui`)
- packages/config/— Shared config surface (future)
- docs/           — Doctrine, ADRs, architecture, contracts, copilot, ops, and scaffolding records
- scripts/        — CI and repo guard scripts (trust checks, workflow guards, validation)
- .github/        — CI workflows, templates, automation

## 3) Non-Negotiables
- Security and trust before speed.
- CI/E2E must remain hermetic: no live external calls.
- Deny-by-default: mock/stub modes in CI.
- Rollback must be possible via flag or single revert.
- Respect current sprint posture and implementation boundaries.

## 4) Required CI Checks (branch protection)
- validate
- E2E smoke (@hedgr/frontend)

(Workflow names must remain stable once enforced.)

## 5) Environment Flags (defaults are CI-safe)

Frontend:
- NEXT_PUBLIC_AUTH_MODE=mock
- NEXT_PUBLIC_FX_MODE=stub
- NEXT_PUBLIC_MARKET_MODE=manual
- NEXT_PUBLIC_MARKET_SELECTED=UNKNOWN
- NEXT_PUBLIC_API_BASE_URL=http://localhost:5050

Backend:
- STUB_MODE=true

AI:
- OPENAI_MODE=stub

## 6) Testing Standards
- Unit: Vitest (frontend)
- E2E: Playwright smoke (frontend)
- Stable selectors: prefer role-based selectors and `data-testid`; avoid brittle DOM chains.
- No test depends on external services (CoinGecko, MTN, Aave, OpenAI, Magic).
- Behavior changes should ship with corresponding test updates unless explicitly waived.

## 7) Execution Rules
When implementing:
- Reference exact file paths.
- Prefer small PRs: one boundary change per branch.
- Add or extend tests in the same PR when touching contract surfaces.
- Default to reversible designs (flags + stubs).
- Never merge a PR that introduces a live network dependency in CI.
- Do not violate `.cursorrules` or current ADR constraints for implementation convenience.

### Engine-facing governance (Sprint 2 Stability Engine)

When changing **`apps/frontend/lib/engine/**`** or shipped Stability Engine trust surfaces (posture, notices, allocation bands, or simulator boundaries per `docs/ops/HEDGR_STATUS.md`), read **in order**:

1. `docs/ops/HEDGR_STATUS.md` — **§7** / **§7a** for the approved next ticket (when named); **§6b** is Transition Readiness taxonomy only, not sequencing authority
2. `docs/decisions/SPRINT-2-ADR-INDEX.md`
3. `docs/decisions/0015-stability-engine-is-the-system-center.md`
4. `docs/decisions/0014-stability-engine-read-only-in-sprint-2.md`
5. `docs/decisions/0013-allocation-bands-informational-not-accounting.md`

Sprint planning procedure (subordinate to §7 / §7a): `docs/ops/HEDGR_SPRINT_PLANNING_PROTOCOL.md`

If anything conflicts, stop and surface it explicitly (do not silently reconcile).

## 8) Decision Logging (ADR)
Material decisions must be logged as ADRs under `docs/decisions/` using:
`docs/doctrine/hedgrops-decision-governance-and-adr-export-standard.md`

Examples:
- architecture boundaries
- custody and trust posture
- compliance posture
- sequencing decisions
- policy or engine control changes

## Cursor Cloud specific instructions

### Services overview

| Service | Command | Port | Notes |
|---|---|---|---|
| Frontend (Next.js) | `pnpm --filter @hedgr/frontend dev` | 3000 | Requires env vars below |
| Backend (Flask) | `source apps/backend/.venv/bin/activate && STUB_MODE=true PORT=5050 python -m src.app` | 5050 | Always use `STUB_MODE=true` in dev/CI |

### Required environment variables for frontend dev server

```
NEXT_PUBLIC_AUTH_MODE=mock
NEXT_PUBLIC_FX_MODE=stub
NEXT_PUBLIC_MARKET_MODE=manual
NEXT_PUBLIC_MARKET_SELECTED=UNKNOWN
NEXT_PUBLIC_API_BASE_URL=http://localhost:5050
NEXT_PUBLIC_APP_ENV=dev
NEXT_PUBLIC_FEATURE_COPILOT_ENABLED=true
```

Set these as env vars when launching the frontend dev server.

### Node version

The repo requires Node 20 (pinned in `.nvmrc`). Use `nvm use 20` before running any Node/pnpm commands. The VM default may be Node 22; always switch first.

### pnpm setup

Activated via Corepack: `corepack enable && corepack install`. The pinned version is pnpm 9.12.0 (see `package.json` `packageManager` field).

### Build order

`@hedgr/ui` must be built before the frontend can start: `pnpm run build:ui`.

### Validation commands

See `README.md` — quick reference:
- `pnpm -w lint` — ESLint
- `pnpm -w test` — Vitest (632 unit tests)
- `pnpm -w typecheck` — TypeScript check
- `pnpm run validate` — all of the above plus trust checks

### E2E tests (Playwright)

- `pnpm --filter @hedgr/frontend run e2e` — run against a running dev server (reuses existing server)
- `pnpm --filter @hedgr/frontend run e2e:ci` — production build + Playwright (used in CI)
- Copilot-related E2E tests (`chat-safety.spec.ts`) require `NEXT_PUBLIC_FEATURE_COPILOT_ENABLED=true` at **build time** — they will fail against the dev server because Next.js inlines `NEXT_PUBLIC_*` vars at build, not runtime. This is expected; CI uses `e2e:ci` which builds first. Run `e2e:ci` for full E2E parity with CI.

### Backend (Flask)

Python venv lives at `apps/backend/.venv`. Activate it before running backend commands. Backend tests: `cd apps/backend && source .venv/bin/activate && pytest`.
# AGENTS.md — Hedgr Repo Execution Standard

Status: Binding (repo workflow, engineering conventions, CI posture, agent operating rules)  
Scope: apps/, packages/, scripts/, .github/, docs/  
Last updated: 2026-04-23

## 1) Purpose
AGENTS.md defines how work is executed in this repo and how autonomous or semi-autonomous agents must behave when operating inside Hedgr.

It is the repo-level execution contract for:
- repo layout and boundaries
- CI expectations and hermetic rules
- environment flags and defaults
- implementation workflow conventions
- agent role boundaries
- execution and escalation rules
- output and validation discipline

For doctrine, architecture, product/system invariants, and anti-drift rules, `.cursorrules` remains governing authority.

For patch execution discipline, `.cursor/rules.md` applies.

If a higher-authority repo document conflicts with local task convenience, higher authority wins.

## 2) Authority model
Agents operate under strict authority hierarchy:

1. Founder — direction, prioritization, approval  
2. Repo authority — `docs/ops/HEDGR_STATUS.md`, accepted ADRs, `AGENTS.md`, repo-native doctrine, governance standards  
3. Project Ops / `docs/ops` — governance framing, review traceability, bounded critique and refinement artifacts  
4. Cursor — primary repo execution surface  
5. Codex — bounded secondary operator for exploration, reconstruction, verification, testing, and explicitly approved implementation support only

Agents must not override higher authority for convenience.

If conflict is detected:
- stop
- surface the conflict explicitly
- do not silently reconcile

## 3) Repo Layout (canonical)
- `apps/frontend/`  — Next.js app (App Router + Pages Router), API routes, Vitest, ESLint
- `apps/backend/`   — Flask backend service boundary; currently limited in scope but part of the canonical system structure
- `packages/ui/`    — Shared UI library (`@hedgr/ui`)
- `packages/config/`— Shared config surface (future)
- `docs/`           — Doctrine, ADRs, architecture, contracts, copilot, ops, and scaffolding records
- `scripts/`        — CI and repo guard scripts (trust checks, workflow guards, validation)
- `.github/`        — CI workflows, templates, automation

## 4) Non-Negotiables
- Security and trust before speed.
- CI/E2E must remain hermetic: no live external calls.
- Deny-by-default: mock/stub modes in CI.
- Rollback must be possible via flag or single revert.
- Respect current sprint posture and implementation boundaries.
- Do not create hidden authority surfaces through agent output.
- Do not treat memory, inferred continuity, or connected tools as approval authority.

## 5) Required CI Checks (branch protection)
- `validate`
- `E2E smoke (@hedgr/frontend)`

Workflow names must remain stable once enforced.

## 6) Environment Flags (defaults are CI-safe)

Frontend:
- `NEXT_PUBLIC_AUTH_MODE=mock`
- `NEXT_PUBLIC_FX_MODE=stub`
- `NEXT_PUBLIC_MARKET_MODE=manual`
- `NEXT_PUBLIC_MARKET_SELECTED=UNKNOWN`
- `NEXT_PUBLIC_API_BASE_URL=http://localhost:5050`

Backend:
- `STUB_MODE=true`

AI:
- `OPENAI_MODE=stub`

## 7) Testing Standards
- Unit: Vitest (frontend)
- E2E: Playwright smoke (frontend)
- Stable selectors: prefer role-based selectors and `data-testid`; avoid brittle DOM chains.
- No test depends on external services (CoinGecko, MTN, Aave, OpenAI, Magic).
- Behavior changes should ship with corresponding test updates unless explicitly waived.

## 8) Execution Rules
When implementing:
- Reference exact file paths.
- Prefer small PRs: one boundary change per branch.
- Add or extend tests in the same PR when touching contract surfaces.
- Default to reversible designs (flags + stubs).
- Never merge a PR that introduces a live network dependency in CI.
- Do not violate `.cursorrules` or current ADR constraints for implementation convenience.
- Do not widen scope beyond the stated task.
- Do not silently modify unrelated files.

### Engine-facing governance (Sprint 2 Stability Engine)

When changing `apps/frontend/lib/engine/**` or shipped Stability Engine trust surfaces (posture, notices, allocation bands, or simulator boundaries per `docs/ops/HEDGR_STATUS.md`), read in order:

1. `docs/ops/HEDGR_STATUS.md` — `§7` / `§7a` for the approved next ticket (when named); `§6b` is Transition Readiness taxonomy only, not sequencing authority
2. `docs/decisions/SPRINT-2-ADR-INDEX.md`
3. `docs/decisions/0015-stability-engine-is-the-system-center.md`
4. `docs/decisions/0014-stability-engine-read-only-in-sprint-2.md`
5. `docs/decisions/0013-allocation-bands-informational-not-accounting.md`

Sprint planning procedure (subordinate to `§7` / `§7a`): `docs/ops/HEDGR_SPRINT_PLANNING_PROTOCOL.md`

If anything conflicts, stop and surface it explicitly. Do not silently reconcile.

## 9) Approved agent roles
Agents must declare the role they are operating under for meaningful tasks.

### 9.1 Implementer
Use for:
- bounded feature work
- bounded fixes
- explicitly approved implementation support

Must:
- follow existing patterns
- preserve repo authority and current ADR constraints
- include tests when contract surfaces change
- keep changes minimal and reviewable

Must not:
- introduce new dependencies without instruction
- make architecture changes unless explicitly authorized
- modify unrelated files for convenience
- infer approval from memory or prior conversations

### 9.2 Verifier
Use for:
- doctrine alignment checks
- acceptance review
- regression/risk review
- trust-surface drift checks

Must:
- frame output as findings
- reference governing inputs
- identify risks, gaps, and assumptions

Must not:
- rewrite implementation unless explicitly instructed
- present critique as approval
- silently resolve doctrine conflicts

### 9.3 Repo Steward
Use for:
- repo hygiene
- doc/state reconciliation
- status updates after approved work
- consistency and drift checks

Must:
- maintain documentation integrity
- reconcile discrepancies explicitly
- preserve authority order

Must not:
- alter product or system behavior unless explicitly tasked
- create new policy by summary

### 9.4 Synthesizer
Use for:
- summaries
- planning support
- bounded reconstruction
- structured brief generation

Must:
- stay descriptive
- highlight ambiguity
- identify source classes used when relevant

Must not:
- invent facts
- infer missing approvals
- widen scope beyond the specified lane

### 9.5 Explorer
Use for:
- bounded options
- alternative UI/copy/pattern directions
- challenger variants

Must:
- present options as non-authoritative
- stay within declared scope and doctrine

Must not:
- treat proposals as approved direction
- create execution authority by rhetoric

### 9.6 Tester
Use for:
- fixed-rubric evaluation
- bounded comparison
- adversarial review
- same-frame critique

Must:
- use explicit criteria
- keep output critique-only

Must not:
- convert test findings into final product judgment

### 9.7 Reconstructor
Use for:
- recovering current lane state from explicit artifacts
- identifying unresolved tensions
- summarizing the governing chain for a bounded lane
- surfacing stale, missing, or conflicting artifacts

Must:
- remain descriptive and non-authoritative
- work from explicit artifacts

Must not:
- infer approval
- invent requirements
- reconcile conflicts by synthesis

## 10) Execution modes and action controls
All meaningful agent work must operate under a declared action control:

- `READ_ONLY` — analysis, critique, retrieval, reconstruction
- `PROPOSE_ONLY` — structured output intended for review
- `ACT_WITH_CONFIRMATION` — explicit approval required before any external or persistent action

Default: `READ_ONLY`

No side-effecting or persistent action should occur without explicit declaration and approval.

## 11) Input discipline
Agents should work from explicit artifacts, not loose conversational continuity.

Meaningful tasks should specify:
- exact input docs or files
- exact scope boundaries
- exact deliverable type
- declared role
- declared execution mode

Good inputs:
- specific `docs/ops` files
- exact prototype or board context
- fixed rubric or comparison criteria
- explicit guardrail or language docs

Bad inputs:
- open-ended product mandates
- repo-wide “make this better” requests
- undocumented doctrine assumptions
- “continue from before” without a bounded artifact stack

## 12) Context provenance rule
Outputs should make clear which classes of inputs were used when that distinction matters.

Relevant source classes include:
- repo authority
- bounded lane artifacts
- connected tools or external systems
- memory / inferred continuity

Memory and inferred continuity are assistive, not authoritative.

If memory conflicts with repo authority or current artifacts, memory loses automatically.

## 13) Conflict handling rule
Agents must not reconcile conflicting sources by inference.

If inconsistency exists between:
- repo authority
- active lane artifacts
- connected tools or external systems
- memory / inferred continuity

Agents must:
1. surface the conflict explicitly
2. present the relevant sides
3. defer resolution to the governed review chain

## 14) Required output contract
For meaningful tasks, agents must return:

1. `Summary`
   - what was done
   - why

2. `Changes`
   - file paths modified
   - high-level description of changes

3. `Validation`
   - lint / test / typecheck status, where applicable

4. `Risks / Notes`
   - assumptions made
   - unresolved issues
   - edge cases or follow-ups

5. `Next Actions`
   - only if applicable

Verifier, Tester, Explorer, and Reconstructor outputs remain non-authoritative unless absorbed into the governed repo chain.

## 15) Escalation rules
Agents must stop and escalate if:
- ADR conflict is detected
- required context is missing
- multiple valid implementation paths materially differ
- the requested change impacts system architecture, trust posture, or governance posture
- the task would create a new authority surface
- the task would require persistent or external action without declared approval

## 16) Decision logging (ADR)
Material decisions must be logged under `docs/decisions/` using:
`docs/doctrine/hedgrops-decision-governance-and-adr-export-standard.md`

Examples:
- architecture boundaries
- custody and trust posture
- compliance posture
- sequencing decisions
- policy or engine control changes

Agent influence does not bypass ADR discipline. If agent output materially affects a decision, that influence must still pass through normal repo-native review and documentation channels.

## 17) Output handling and handoff rule
Agent outputs are non-authoritative by default.

They become operationally relevant only if:
1. captured in a governed `docs/ops` artifact, or
2. reviewed and accepted into a Cursor execution brief, or
3. approved explicitly by founder direction, or
4. exported through ADR/governance flow and normal repo process

Required handoff chain:

`Agent output -> review artifact -> repo-native doc or Cursor brief -> founder / governance review`

No silent codification. No undocumented authority drift. No memory-led policy absorption.

## 18) Product and UX constraints agents must respect
Any agent-enabled exploration or implementation support must remain inside Hedgr doctrine and product baseline, including:
- capital preservation above yield or growth
- liquidity integrity
- visible risk
- no gamification
- calm over urgency
- advisory, never directive
- plain language over technical theater
- trust over optimization

Agents may challenge artifacts and surface doctrine tension. They must not quietly violate doctrine.

## 19) Cursor Cloud specific instructions

### Services overview

| Service | Command | Port | Notes |
|---|---|---|---|
| Frontend (Next.js) | `pnpm --filter @hedgr/frontend dev` | 3000 | Requires env vars below |
| Backend (Flask) | `source apps/backend/.venv/bin/activate && STUB_MODE=true PORT=5050 python -m src.app` | 5050 | Always use `STUB_MODE=true` in dev/CI |

### Required environment variables for frontend dev server

```bash
NEXT_PUBLIC_AUTH_MODE=mock
NEXT_PUBLIC_FX_MODE=stub
NEXT_PUBLIC_MARKET_MODE=manual
NEXT_PUBLIC_MARKET_SELECTED=UNKNOWN
NEXT_PUBLIC_API_BASE_URL=http://localhost:5050
NEXT_PUBLIC_APP_ENV=dev
NEXT_PUBLIC_FEATURE_COPILOT_ENABLED=true
```

Set these as env vars when launching the frontend dev server.

### Node version

The repo requires Node 20 (pinned in `.nvmrc`). Use `nvm use 20` before running any Node/pnpm commands. The VM default may be Node 22; always switch first.

### pnpm setup

Activated via Corepack: `corepack enable && corepack install`. The pinned version is pnpm 9.12.0 (see `package.json` `packageManager` field).

### Build order

`@hedgr/ui` must be built before the frontend can start: `pnpm run build:ui`.

### Validation commands

See `README.md` — quick reference:
- `pnpm -w lint` — ESLint
- `pnpm -w test` — Vitest
- `pnpm -w typecheck` — TypeScript check
- `pnpm run validate` — all of the above plus trust checks

### E2E tests (Playwright)

- `pnpm --filter @hedgr/frontend run e2e` — run against a running dev server (reuses existing server)
- `pnpm --filter @hedgr/frontend run e2e:ci` — production build + Playwright (used in CI)
- Copilot-related E2E tests (`chat-safety.spec.ts`) require `NEXT_PUBLIC_FEATURE_COPILOT_ENABLED=true` at build time — they will fail against the dev server because Next.js inlines `NEXT_PUBLIC_*` vars at build, not runtime. This is expected; CI uses `e2e:ci` which builds first. Run `e2e:ci` for full E2E parity with CI.

### Backend (Flask)

Python venv lives at `apps/backend/.venv`. Activate it before running backend commands. Backend tests:

```bash
cd apps/backend && source .venv/bin/activate && pytest
```