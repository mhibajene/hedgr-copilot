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

1. `docs/ops/HEDGR_STATUS.md` — **§7** / **§7a** for the approved next ticket (when named); **§6b** is Transition Readiness taxonomy only, not sequencing authority. Concurrent lanes are permitted only under the **Ticket sequencing / governed parallelism** exception below (currently **§6e** / **D-026** lane model; an active **§6f** pass only when Accepted, unambiguous, and currently naming tickets).
2. `docs/doctrine/hedgr-familiar-financial-grammar-and-infrastructure-abstraction.md` — customer-facing product meaning and disclosure-order doctrine; it does not widen the active ticket.
3. `docs/decisions/SPRINT-2-ADR-INDEX.md`
4. `docs/decisions/0015-stability-engine-is-the-system-center.md`
5. `docs/decisions/0014-stability-engine-read-only-in-sprint-2.md`
6. `docs/decisions/0013-allocation-bands-informational-not-accounting.md`

Sprint planning procedure (subordinate to §7 / §7a): `docs/ops/HEDGR_SPRINT_PLANNING_PROTOCOL.md`

If anything conflicts, stop and surface it explicitly (do not silently reconcile).

### Ticket sequencing / governed parallelism (deny-by-default)

The default posture is one active implementation ticket. Concurrent lanes are permitted only where `docs/ops/HEDGR_STATUS.md` records an accepted Founder-approved parallelism decision, explicitly names each active lane and ticket, defines the authority class and exclusions of each lane, and preserves independent stop conditions and rollback. Absence, ambiguity, pause, or deprecation of that decision restores the singular-ticket default.

Parallel authorization applies only to the explicitly named lanes. It does not authorize unrestricted multi-ticket execution.

No active lane may widen, inherit, approve, or modify another lane’s authority without a separate Founder decision and repo-native governance update.

Current parallelism posture: Internal Decisions **D-029**, **D-032** / **§6f.3**, **D-034** / **§6f.4**, **D-035** / **§6f.5**, **D-036** / **§6f.6**, **D-041** / **§6f.7**, **D-044** / **§6f.8**, **D-045** / **§6f.9**, **D-046** / **§6f.10**, **D-047** / **§6f.11**, **D-048** / **§6f.12**, **D-049** / **§6f.13**, **D-050** / **§6f.14**, **D-051** / **§6f.15**, **D-052** / **§6f.16**, **D-053** / **§6f.17**, **D-054** / **§6f.18**, Internal **D-055** / **§6f.19**, and Internal **D-074** / **§6f.20** are **completed historical pass authorities** and no longer supply concurrency. Active governed-parallel pass: Controlled Parallelism v21 / Internal **D-076** / **§6f.21** names remaining active `CLASS-A-VAL-002` and `SE-REASON-001` under **§7** / **§7a**; `NARRATIVE-007` is completed under Internal **D-080** / **§212**. Lane V remains active under parent `CLASS-A-VAL-002`; nested `CLASS-A-VAL-002-ORIENT-001` is completed historical authority under Internal **D-077** / **§§205–206**, with no active nested Lane V refinement and participant testing active on the verified orientation-inclusive build; Lane N `NARRATIVE-007` is completed historical authority under Internal **D-080** / **§212** and is idle; Lane E is Class A informational Stability Engine reasoning research only. Nested refinements through `CLASS-A-VAL-002-CA-003` are completed historical authority under Internal **D-059** / **§177**–**§178**, **D-061** / **§180**–**§181**, **D-062** / **§182**–**§183**, **D-063** / **§184**–**§185**, and **D-064** / **§186**–**§187**. Internal **D-065** / **§188** adopts Institutional Coherence as an internal product-evaluation principle only. Founder-approved nested refinement `CLASS-A-VAL-002-GF-001` is completed historical authority under Internal **D-066** / **§189**–**§190**; protocol-complete dual-layer participant testing is active under the still-open parent on the verified orientation-inclusive build, with no further refinement by inference. Internal **D-058** / `HEDGR-UI-004` is completed historical nested authority only. Internal **D-056** / **§171** remains the historical bounded Research R2 amendment; publication remains unauthorized. **§6e** / **D-026** remains the lane-model / exception-framework only. Lane M idle after `MONEY-STACK-001` closeout. Lane N is idle after `NARRATIVE-007` closeout; Customer One-Pager v2.0 is Accepted / Frozen and unpublished; Customer One-Pager v1.0 is superseded / frozen historical. Lane E is active under `SE-REASON-001` as research-only and cannot alter Lane V, Lane N, or the synthetic journey. Lane R idle after `BRIDGE-LEGACY-RETIRE-001` closeout under Internal **D-082** / **§214**. Canonical Story v1.0, Customer One-Pager v1.0, and Narrative Style Guide v1.0 remain Frozen. The accepted `NARRATIVE-005` Investor Orientation Brief remains the controlling investor-orientation source and is not reopened. Kenya counsel send remains **DEFER** (**§6f.1** / **D-028**). Green Lane classification does **not** activate work and does **not** override **§7** / **§7a** (ADR **0025** / **§6g**). Any additional lane or concurrent ticket requires a new Founder-approved pass decision plus explicit **§7** / **§7a** naming. A mutable status entry alone is not a general override of agent execution constraints.

Internal **D-067** / **§191** accepts Progressive Institutional Reasoning as an internal product-architecture and evaluation principle only. It creates no implementation authority, lane, concurrency, or further-refinement authority; protocol-complete dual-layer participant retesting remains immediately next.

Internal **D-068** / **§192** accepts Orientation Before Explanation as an internal product-architecture and evaluation principle only. “Financial Stability Companion” remains an internal behavioural frame and test-only category hypothesis, not settled or public naming. D-068 creates no implementation authority, lane, concurrency, or further-refinement authority; protocol-complete dual-layer participant retesting remains immediately next.

Internal **D-069** / **§193** accepts Cognitive Stewardship as an enduring internal institutional product learning only: the institution progressively carries interpretation while the participant retains judgement. It creates no doctrine, implementation authority, lane, concurrency, public-naming authority, or further-refinement authority; protocol-complete dual-layer participant retesting remains immediately next.

Internal **D-070** / **§194**–**§195**, Internal **D-071** / **§196**–**§197**, and Internal **D-072** / **§198**–**§199** supplied and closed `CLASS-A-VAL-002-WARMTH-001`, `CLASS-A-VAL-002-AFF-001`, and `CLASS-A-VAL-002-ROUTE-001` as historical bounded nested authority only. The completed D-072 pass makes `/dashboard-synthetic-journey` the human-readable participant entry while retaining the legacy query route as a compatibility / rollback seam and preserving the journey, state, arithmetic, engine, targets, and financial / execution boundaries. Every other HedgrOps review concern remains test-first and outside implementation scope. Internal **D-073** / **§200**–**§201** completed the bounded Form instrument pass as historical nested authority. Controlled Parallelism v20 / Internal **D-074** / **§6f.20** added Lane N `NARRATIVE-007` without altering Lane V and is now completed historical concurrency; Internal **D-075** / **§203** later accepts the audit outputs and authorizes one bounded candidate vNext while frozen narrative sources remain unchanged. Controlled Parallelism v21 / Internal **D-076** / **§6f.21** adds Lane E `SE-REASON-001` without altering Lane V or Lane N. Internal **D-077** / **§§205–206** supplied and closed nested `CLASS-A-VAL-002-ORIENT-001` inside Lane V as one bounded Class A informational governed-narrative orientation-surface experiment; it did not create a fourth lane or alter Lane N or Lane E. Internal **D-078** / **§207** retires Notion as an operating, governance, and institutional-memory surface; it does not create a fourth lane or alter D-076 concurrency. Participant testing is active on the verified orientation-inclusive build under the governed cohort protocol.

Internal **D-079** / **§§209–210** supplied and closed `CLASS-A-VAL-002-ORIENT-002`; it remains completed historical authority only, while its verified build and retained responses remain baseline evidence rather than authority.

**Current Lane V override:** Internal **D-086** / **§218**, amended in place by Internal **D-088** / **§220**, keeps `CLASS-A-VAL-002-GRAMMAR-001` as the sole active nested Lane V ticket. Within the exact Dashboard / Activity presentation files and tests named in `HEDGR_STATUS.md` **§7a**, implementation must apply D-087's value-clarity → familiarity → semantic-integrity order and keep infrastructure subordinate without concealing material truth. D-088 creates no second ticket, new file, lane, or independent concurrency. Participant distribution on ORIENT-002 is paused pending verified closeout; existing responses remain directional baseline evidence. No orientation, route, Form, engine, target-value, ledger, wallet, state, arithmetic, frozen-narrative, public-naming, Lane E, Lane N, or financial-capability change is authorized. This current Lane V override supersedes the preceding no-active-nested / participant-testing-active wording in this block.

**Current product-doctrine adoption and bounded delegation:** Internal **D-087** / **§219** adopts `docs/doctrine/hedgr-familiar-financial-grammar-and-infrastructure-abstraction.md` as active Founder-level product doctrine: **Borrow the interaction. Own the meaning. Abstract the infrastructure.** D-087 itself supplied no execution authority. Internal **D-088** / **§220** now delegates it only into the already-active D-086 ticket, within D-086's unchanged named files, tests, exclusions, rollback, and retest gate. No other interface, survey, ORIENT-002, frozen-narrative, public-naming, or financial-capability authority follows.

**Current verification-only amendment:** Internal **D-089** / **§221** adds only the existing `apps/frontend/tests-e2e/smoke-pack.spec.ts` to the active D-086 verification list for assertion reconciliation with D-087 / D-088. It changes no runtime scope, creates no new file or ticket, and preserves every exclusion, rollback, retest gate, and participant-distribution pause.

Customer One-Pager v2.0 is Accepted / Frozen at `docs/strategy/customer/HEDGR_CUSTOMER_ONE_PAGER_VNEXT.md` and remains unpublished; v1.0 is superseded / frozen historical. Internal **D-080** / **§212** completed `NARRATIVE-007` and idled Lane N.

Internal **D-081** / **§213** records Founder review-process and Lane E package dispositions: weekly-review structure **REVISE**; North Star reporting **REVISE** to two dimensions; current MVP process-review slice **RETAIN**; additional standing review frameworks **REMOVE / STOP**; `SE-REASON-001` artifact-level `RETEST` **not accepted** and **ESCALATE**d to underlying-artifact evidence review. D-081 creates no ticket, concurrency, narrative acceptance, or financial-execution authority.

Internal **D-082** / **§214** completed `BRIDGE-LEGACY-RETIRE-001` as bounded Lane R Bridge hygiene without standing fourth-lane concurrency, Phase 2, or RAP-route change. Internal **D-083** / **§215** activated nested `SE-REASON-001-EVID-001` inside Lane E as one bounded Class A evidence-review ticket. Internal **D-084** / **§216** records the Founder `RETAIN / RETEST` disposition, closes only `SE-REASON-001-EVID-001`, and leaves parent `SE-REASON-001` open; the models remain non-authoritative and no retest, successor, translation, product, engine, UX, Copilot, data, or financial-execution work follows from D-084. Controlled Parallelism v21 remains unchanged; D-086 creates no fourth lane, independent concurrency, live financial capability, or cross-lane authority; D-087 alone created no execution authority; D-088 supplies only the bounded in-place D-086 amendment and creates no new ticket or ticket-state change; D-089 adds one existing verification file only and changes no runtime or ticket state.

### Green Lane operator rules (ADR 0025 / §6g)

**Current posture (Internal D-085 / §217):** No active Green Lane delegation envelope exists. The time-bounded pilot was retired after its ~2026-08-04 review / expiry date. Any future Green Lane delegation requires a new Founder-authorized, time-bounded §6g envelope plus explicit §7 / §7a ticket naming; until then, work labeled Green Lane must stop at classification.

When performing or reviewing work labeled Green Lane, Cursor and Codex must verify before acting:

- an active founder-authorized outcome exists and is recorded repo-natively;
- an active Green Lane delegation envelope exists in **`HEDGR_STATUS.md` §6g** and is not paused or revoked;
- the ticket is named under **§7** / **§7a** with explicit file scope;
- the work remains Class A and satisfies all Green Lane conditions in ADR **0025**;
- no sensitive-data, legal, provider, custody, rail, or financial boundary has entered scope;
- singular-ticket or separately authorized parallelism rules are preserved;
- rollback and verification criteria are present.

Stop immediately when: repo authority cannot be verified; scope becomes ambiguous; the task becomes Yellow or Red; a material architecture or trust fork emerges; the task requires a new market, provider, asset, rail, or external commitment; the requested disposition would modify doctrine, accepted ADR meaning, or a canonical trust contract; user research introduces unapproved personal, financial, or regulated data; or implementation would imply live financial capability.

**Binding:** Green Lane classification does not activate work and does not override `HEDGR_STATUS.md` **§7** / **§7a**. HedgrOps briefs are not executable tickets. Class A is not automatically Green.

## 8) Decision Logging (ADR)
Material decisions must be logged as ADRs under docs/ using the HedgrOps ADR standard.
Examples: architecture boundary, custody/trust posture, compliance posture, sequencing decisions.

# AGENTS.md — Hedgr Repo Execution Standard (v2)

**Current Lane V override:** Internal **D-086** / **§218**, amended in place by Internal **D-088** / **§220**, keeps `CLASS-A-VAL-002-GRAMMAR-001` as the sole active nested Lane V ticket. Within the exact Dashboard / Activity presentation files and tests named in `HEDGR_STATUS.md` **§7a**, implementation must apply D-087's value-clarity → familiarity → semantic-integrity order and keep infrastructure subordinate without concealing material truth. D-088 creates no second ticket, new file, lane, or independent concurrency. Participant distribution on ORIENT-002 is paused pending verified closeout; existing responses remain directional baseline evidence, and D-079 / ORIENT-002 remains closed historical authority. No orientation, route, Form, engine, target-value, ledger, wallet, state, arithmetic, frozen-narrative, public-naming, Lane E, Lane N, or financial-capability change is authorized.

**Current product-doctrine adoption and bounded delegation:** Internal **D-087** / **§219** adopts `docs/doctrine/hedgr-familiar-financial-grammar-and-infrastructure-abstraction.md` as active Founder-level product doctrine. D-087 itself supplied no execution authority. Internal **D-088** / **§220** now delegates it only into the already-active D-086 ticket, within D-086's unchanged named files, tests, exclusions, rollback, and retest gate. No other interface, Form, ORIENT-002, frozen-narrative, public-naming, or financial-capability authority follows.

**Current verification-only amendment:** Internal **D-089** / **§221** adds only the existing `apps/frontend/tests-e2e/smoke-pack.spec.ts` to the active D-086 verification list for assertion reconciliation with D-087 / D-088. It changes no runtime scope, creates no new file or ticket, and preserves every exclusion, rollback, retest gate, and participant-distribution pause.

**Current Lane N override:** Internal **D-080** / **§212** accepted and froze Customer One-Pager v2.0, superseded v1.0, closed `NARRATIVE-007`, and idled Lane N without publication or product-copy authority.

**Current review-process / Lane E override:** Internal **D-081** / **§213** revises weekly-review structure and two-dimension North Star reporting, retains the current MVP process-review slice, stops additional standing review frameworks, and escalates `SE-REASON-001` away from weekly-summary `RETEST` to underlying-artifact evidence review without accepting the models. **Current nested Lane E override:** Internal **D-084** / **§216** records the Founder `RETAIN / RETEST` disposition, closes only `SE-REASON-001-EVID-001`, and leaves `SE-REASON-001` open; the models remain non-authoritative and no retest, successor, translation, product, engine, UX, Copilot, data, or financial-execution work follows from D-084.

These current statements supersede any later stale wording in this repeated execution-standard block. Controlled Parallelism v21 remains unchanged; D-086 creates no fourth lane or independent concurrency; D-087 alone creates no ticket or execution authority; D-088 supplies only the bounded in-place D-086 amendment and creates no second ticket; D-089 adds one existing verification file only and changes no runtime or ticket state. D-081 creates no ticket or concurrency change. Internal **D-082** / **§214** completed `BRIDGE-LEGACY-RETIRE-001` as bounded Lane R hygiene and left Lane R idle.

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

1. `docs/ops/HEDGR_STATUS.md` — **§7** / **§7a** for the approved next ticket (when named); **§6b** is Transition Readiness taxonomy only, not sequencing authority. Concurrent lanes are permitted only under the **Ticket sequencing / governed parallelism** exception below (currently **§6e** / **D-026** lane model; an active **§6f** pass only when Accepted, unambiguous, and currently naming tickets).
2. `docs/doctrine/hedgr-familiar-financial-grammar-and-infrastructure-abstraction.md` — customer-facing product meaning and disclosure-order doctrine; it does not widen the active ticket.
3. `docs/decisions/SPRINT-2-ADR-INDEX.md`
4. `docs/decisions/0015-stability-engine-is-the-system-center.md`
5. `docs/decisions/0014-stability-engine-read-only-in-sprint-2.md`
6. `docs/decisions/0013-allocation-bands-informational-not-accounting.md`

Sprint planning procedure (subordinate to §7 / §7a): `docs/ops/HEDGR_SPRINT_PLANNING_PROTOCOL.md`

If anything conflicts, stop and surface it explicitly (do not silently reconcile).

### Ticket sequencing / governed parallelism (deny-by-default)

The default posture is one active implementation ticket. Concurrent lanes are permitted only where `docs/ops/HEDGR_STATUS.md` records an accepted Founder-approved parallelism decision, explicitly names each active lane and ticket, defines the authority class and exclusions of each lane, and preserves independent stop conditions and rollback. Absence, ambiguity, pause, or deprecation of that decision restores the singular-ticket default.

Parallel authorization applies only to the explicitly named lanes. It does not authorize unrestricted multi-ticket execution.

No active lane may widen, inherit, approve, or modify another lane’s authority without a separate Founder decision and repo-native governance update.

Current parallelism posture: Internal Decisions **D-029**, **D-032** / **§6f.3**, **D-034** / **§6f.4**, **D-035** / **§6f.5**, **D-036** / **§6f.6**, **D-041** / **§6f.7**, **D-044** / **§6f.8**, **D-045** / **§6f.9**, **D-046** / **§6f.10**, **D-047** / **§6f.11**, **D-048** / **§6f.12**, **D-049** / **§6f.13**, **D-050** / **§6f.14**, **D-051** / **§6f.15**, **D-052** / **§6f.16**, **D-053** / **§6f.17**, **D-054** / **§6f.18**, Internal **D-055** / **§6f.19**, and Internal **D-074** / **§6f.20** are **completed historical pass authorities** and no longer supply concurrency. Active governed-parallel pass: Controlled Parallelism v21 / Internal **D-076** / **§6f.21** names remaining active `CLASS-A-VAL-002` and `SE-REASON-001` under **§7** / **§7a**; `NARRATIVE-007` is completed under Internal **D-080** / **§212**. Lane V remains active under parent `CLASS-A-VAL-002`; nested `CLASS-A-VAL-002-ORIENT-001` is completed historical authority under Internal **D-077** / **§§205–206**, with no active nested Lane V refinement and participant testing active on the verified orientation-inclusive build; Lane N `NARRATIVE-007` is completed historical authority under Internal **D-080** / **§212** and is idle; Lane E is Class A informational Stability Engine reasoning research only. Nested refinements through `CLASS-A-VAL-002-CA-003` are completed historical authority under Internal **D-059** / **§177**–**§178**, **D-061** / **§180**–**§181**, **D-062** / **§182**–**§183**, **D-063** / **§184**–**§185**, and **D-064** / **§186**–**§187**. Internal **D-065** / **§188** adopts Institutional Coherence as an internal product-evaluation principle only. Founder-approved nested refinement `CLASS-A-VAL-002-GF-001` is completed historical authority under Internal **D-066** / **§189**–**§190**; protocol-complete dual-layer participant testing is active under the still-open parent on the verified orientation-inclusive build, with no further refinement by inference. Internal **D-058** / `HEDGR-UI-004` is completed historical nested authority only. Internal **D-056** / **§171** remains the historical bounded Research R2 amendment; publication remains unauthorized. **§6e** / **D-026** remains the lane-model / exception-framework only. Lane M idle after `MONEY-STACK-001` closeout. Lane N is idle after `NARRATIVE-007` closeout; Customer One-Pager v2.0 is Accepted / Frozen and unpublished; Customer One-Pager v1.0 is superseded / frozen historical. Lane E is active under `SE-REASON-001` as research-only and cannot alter Lane V, Lane N, or the synthetic journey. Lane R idle after `BRIDGE-LEGACY-RETIRE-001` closeout under Internal **D-082** / **§214**. Canonical Story v1.0, Customer One-Pager v1.0, and Narrative Style Guide v1.0 remain Frozen. The accepted `NARRATIVE-005` Investor Orientation Brief remains the controlling investor-orientation source and is not reopened. Kenya counsel send remains **DEFER** (**§6f.1** / **D-028**). Green Lane classification does **not** activate work and does **not** override **§7** / **§7a** (ADR **0025** / **§6g**). Any additional lane or concurrent ticket requires a new Founder-approved pass decision plus explicit **§7** / **§7a** naming. A mutable status entry alone is not a general override of agent execution constraints.

Internal **D-067** / **§191** accepts Progressive Institutional Reasoning as an internal product-architecture and evaluation principle only. It creates no implementation authority, lane, concurrency, or further-refinement authority; protocol-complete dual-layer participant retesting remains immediately next.

Internal **D-068** / **§192** accepts Orientation Before Explanation as an internal product-architecture and evaluation principle only. “Financial Stability Companion” remains an internal behavioural frame and test-only category hypothesis, not settled or public naming. D-068 creates no implementation authority, lane, concurrency, or further-refinement authority; protocol-complete dual-layer participant retesting remains immediately next.

Internal **D-069** / **§193** accepts Cognitive Stewardship as an enduring internal institutional product learning only: the institution progressively carries interpretation while the participant retains judgement. It creates no doctrine, implementation authority, lane, concurrency, public-naming authority, or further-refinement authority; protocol-complete dual-layer participant retesting remains immediately next.

Internal **D-070** / **§194**–**§195**, Internal **D-071** / **§196**–**§197**, and Internal **D-072** / **§198**–**§199** supplied and closed `CLASS-A-VAL-002-WARMTH-001`, `CLASS-A-VAL-002-AFF-001`, and `CLASS-A-VAL-002-ROUTE-001` as historical bounded nested authority only. The completed D-072 pass makes `/dashboard-synthetic-journey` the human-readable participant entry while retaining the legacy query route as a compatibility / rollback seam and preserving the journey, state, arithmetic, engine, targets, and financial / execution boundaries. Every other HedgrOps review concern remains test-first and outside implementation scope. Internal **D-073** / **§200**–**§201** completed the bounded Form instrument pass as historical nested authority. Controlled Parallelism v20 / Internal **D-074** / **§6f.20** added Lane N `NARRATIVE-007` without altering Lane V and is now completed historical concurrency; Internal **D-075** / **§203** later accepts the audit outputs and authorizes one bounded candidate vNext while frozen narrative sources remain unchanged. Controlled Parallelism v21 / Internal **D-076** / **§6f.21** adds Lane E `SE-REASON-001` without altering Lane V or Lane N. Internal **D-077** / **§§205–206** supplied and closed nested `CLASS-A-VAL-002-ORIENT-001` inside Lane V as one bounded Class A informational governed-narrative orientation-surface experiment; it did not create a fourth lane or alter Lane N or Lane E. Internal **D-078** / **§207** retires Notion as an operating, governance, and institutional-memory surface; it does not create a fourth lane or alter D-076 concurrency. Participant testing is active on the verified orientation-inclusive build under the governed cohort protocol.

### Green Lane operator rules (ADR 0025 / §6g)

**Current posture (Internal D-085 / §217):** No active Green Lane delegation envelope exists. The time-bounded pilot was retired after its ~2026-08-04 review / expiry date. Any future Green Lane delegation requires a new Founder-authorized, time-bounded §6g envelope plus explicit §7 / §7a ticket naming; until then, work labeled Green Lane must stop at classification.

When performing or reviewing work labeled Green Lane, Cursor and Codex must verify before acting:

- an active founder-authorized outcome exists and is recorded repo-natively;
- an active Green Lane delegation envelope exists in **`HEDGR_STATUS.md` §6g** and is not paused or revoked;
- the ticket is named under **§7** / **§7a** with explicit file scope;
- the work remains Class A and satisfies all Green Lane conditions in ADR **0025**;
- no sensitive-data, legal, provider, custody, rail, or financial boundary has entered scope;
- singular-ticket or separately authorized parallelism rules are preserved;
- rollback and verification criteria are present.

Stop immediately when: repo authority cannot be verified; scope becomes ambiguous; the task becomes Yellow or Red; a material architecture or trust fork emerges; the task requires a new market, provider, asset, rail, or external commitment; the requested disposition would modify doctrine, accepted ADR meaning, or a canonical trust contract; user research introduces unapproved personal, financial, or regulated data; or implementation would imply live financial capability.

**Binding:** Green Lane classification does not activate work and does not override `HEDGR_STATUS.md` **§7** / **§7a**. HedgrOps briefs are not executable tickets. Class A is not automatically Green.

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

**Current Lane V override:** Internal **D-086** / **§218**, amended in place by Internal **D-088** / **§220**, keeps `CLASS-A-VAL-002-GRAMMAR-001` as the sole active nested Lane V ticket. Within the exact Dashboard / Activity presentation files and tests named in `HEDGR_STATUS.md` **§7a**, implementation must apply D-087's value-clarity → familiarity → semantic-integrity order and keep infrastructure subordinate without concealing material truth. D-088 creates no second ticket, new file, lane, or independent concurrency. Participant distribution on ORIENT-002 is paused pending verified closeout; existing responses remain directional baseline evidence, and D-079 / ORIENT-002 remains closed historical authority. No orientation, route, Form, engine, target-value, ledger, wallet, state, arithmetic, frozen-narrative, public-naming, Lane E, Lane N, or financial-capability change is authorized.

**Current product-doctrine adoption and bounded delegation:** Internal **D-087** / **§219** adopts `docs/doctrine/hedgr-familiar-financial-grammar-and-infrastructure-abstraction.md` as active Founder-level product doctrine. D-087 itself supplied no execution authority. Internal **D-088** / **§220** now delegates it only into the already-active D-086 ticket, within D-086's unchanged named files, tests, exclusions, rollback, and retest gate. No other interface, Form, ORIENT-002, frozen-narrative, public-naming, or financial-capability authority follows.

**Current verification-only amendment:** Internal **D-089** / **§221** adds only the existing `apps/frontend/tests-e2e/smoke-pack.spec.ts` to the active D-086 verification list for assertion reconciliation with D-087 / D-088. It changes no runtime scope, creates no new file or ticket, and preserves every exclusion, rollback, retest gate, and participant-distribution pause.

**Current Lane N override:** Internal **D-080** / **§212** accepted and froze Customer One-Pager v2.0, superseded v1.0, closed `NARRATIVE-007`, and idled Lane N without publication or product-copy authority.

**Current review-process / Lane E override:** Internal **D-081** / **§213** revises weekly-review structure and two-dimension North Star reporting, retains the current MVP process-review slice, stops additional standing review frameworks, and escalates `SE-REASON-001` away from weekly-summary `RETEST` to underlying-artifact evidence review without accepting the models. **Current nested Lane E override:** Internal **D-084** / **§216** records the Founder `RETAIN / RETEST` disposition, closes only `SE-REASON-001-EVID-001`, and leaves `SE-REASON-001` open; the models remain non-authoritative and no retest, successor, translation, product, engine, UX, Copilot, data, or financial-execution work follows from D-084.

These current statements supersede any later stale wording in this repeated execution-standard block. Controlled Parallelism v21 remains unchanged; D-086 creates no fourth lane or independent concurrency; D-087 alone creates no ticket or execution authority; D-088 supplies only the bounded in-place D-086 amendment and creates no second ticket; D-089 adds one existing verification file only and changes no runtime or ticket state. D-081 creates no ticket or concurrency change. Internal **D-082** / **§214** completed `BRIDGE-LEGACY-RETIRE-001` as bounded Lane R hygiene and left Lane R idle.

Status: Binding (repo workflow, engineering conventions, CI posture, agent operating rules)  
Scope: apps/, packages/, scripts/, .github/, docs/  
Last updated: 2026-08-25

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
2. Repo authority — `docs/ops/HEDGR_STATUS.md`, accepted ADRs, `AGENTS.md`, repo-native doctrine, governance standards. The repository is the sole canonical institutional authority and durable institutional-memory surface. Notion is retired and is not an operating, governance, or institutional-memory surface. Obsidian may continue as founder cognition and is not a successor knowledge base.  
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

1. `docs/ops/HEDGR_STATUS.md` — `§7` / `§7a` for the approved next ticket (when named); `§6b` is Transition Readiness taxonomy only, not sequencing authority. Concurrent lanes are permitted only under the **Ticket sequencing / governed parallelism** exception below (currently `§6e` / **D-026** lane model; an active `§6f` pass only when Accepted, unambiguous, and currently naming tickets).
2. `docs/doctrine/hedgr-familiar-financial-grammar-and-infrastructure-abstraction.md` — customer-facing product meaning and disclosure-order doctrine; it does not widen the active ticket.
3. `docs/decisions/SPRINT-2-ADR-INDEX.md`
4. `docs/decisions/0015-stability-engine-is-the-system-center.md`
5. `docs/decisions/0014-stability-engine-read-only-in-sprint-2.md`
6. `docs/decisions/0013-allocation-bands-informational-not-accounting.md`

Sprint planning procedure (subordinate to `§7` / `§7a`): `docs/ops/HEDGR_SPRINT_PLANNING_PROTOCOL.md`

If anything conflicts, stop and surface it explicitly. Do not silently reconcile.

### Ticket sequencing / governed parallelism (deny-by-default)

The default posture is one active implementation ticket. Concurrent lanes are permitted only where `docs/ops/HEDGR_STATUS.md` records an accepted Founder-approved parallelism decision, explicitly names each active lane and ticket, defines the authority class and exclusions of each lane, and preserves independent stop conditions and rollback. Absence, ambiguity, pause, or deprecation of that decision restores the singular-ticket default.

Parallel authorization applies only to the explicitly named lanes. It does not authorize unrestricted multi-ticket execution.

No active lane may widen, inherit, approve, or modify another lane’s authority without a separate Founder decision and repo-native governance update.

Current parallelism posture: Internal Decisions **D-029**, **D-032** / `§6f.3`, **D-034** / `§6f.4`, **D-035** / `§6f.5`, **D-036** / `§6f.6`, **D-041** / `§6f.7`, **D-044** / `§6f.8`, **D-045** / `§6f.9`, **D-046** / `§6f.10`, **D-047** / `§6f.11`, **D-048** / `§6f.12`, **D-049** / `§6f.13`, **D-050** / `§6f.14`, **D-051** / `§6f.15`, **D-052** / `§6f.16`, **D-053** / `§6f.17`, **D-054** / `§6f.18`, **D-055** / `§6f.19`, and Internal **D-074** / `§6f.20` are completed historical pass authorities and no longer supply concurrency. Active governed-parallel pass: Controlled Parallelism v21 / Internal **D-076** / **§6f.21** names remaining active `CLASS-A-VAL-002` and `SE-REASON-001` under **§7** / **§7a**; `NARRATIVE-007` is completed under Internal **D-080** / **§212**. Lane V remains active under parent `CLASS-A-VAL-002`; nested `CLASS-A-VAL-002-ORIENT-001` is completed historical authority under Internal **D-077** / **§§205–206**, with no active nested Lane V refinement and participant testing active on the verified orientation-inclusive build; Lane N `NARRATIVE-007` is completed historical authority under Internal **D-080** / **§212** and is idle; Lane E is Class A informational Stability Engine reasoning research only. Nested refinements through `CLASS-A-VAL-002-CA-003` are completed historical authority under Internal **D-059** / `§177`–`§178`, **D-061** / `§180`–`§181`, **D-062** / `§182`–`§183`, **D-063** / `§184`–`§185`, and **D-064** / `§186`–`§187`. Internal **D-065** / **§188** adopts Institutional Coherence as an internal product-evaluation principle only. Founder-approved nested refinement `CLASS-A-VAL-002-GF-001` is completed historical authority under Internal **D-066** / **§189**–**§190**; protocol-complete dual-layer participant testing is active under the still-open parent on the verified orientation-inclusive build, with no further refinement by inference. Internal **D-058** / `HEDGR-UI-004` is completed historical nested authority only. Internal **D-056** / `§171` remains the historical bounded Research R2 amendment; publication remains unauthorized. `§6e` / **D-026** remains the lane-model / exception-framework only. Lane M idle after `MONEY-STACK-001` closeout. Lane N is idle after `NARRATIVE-007` closeout; Customer One-Pager v2.0 is Accepted / Frozen and unpublished; Customer One-Pager v1.0 is superseded / frozen historical. Lane E is active under `SE-REASON-001` as research-only and cannot alter Lane V, Lane N, or the synthetic journey. Lane R idle after `BRIDGE-LEGACY-RETIRE-001` closeout under Internal **D-082** / **§214**. Canonical Story v1.0, Customer One-Pager v1.0, and Narrative Style Guide v1.0 remain Frozen. The accepted `NARRATIVE-005` Investor Orientation Brief remains the controlling investor-orientation source and is not reopened. Kenya counsel send remains **DEFER** (`§6f.1` / **D-028**). Green Lane classification does **not** activate work and does **not** override `§7` / `§7a` (ADR **0025** / `§6g`). Any additional lane or concurrent ticket requires a new Founder-approved pass decision plus explicit `§7` / `§7a` naming. A mutable status entry alone is not a general override of agent execution constraints.

Internal **D-067** / **§191** accepts Progressive Institutional Reasoning as an internal product-architecture and evaluation principle only. It creates no implementation authority, lane, concurrency, or further-refinement authority; protocol-complete dual-layer participant retesting remains immediately next.

Internal **D-068** / **§192** accepts Orientation Before Explanation as an internal product-architecture and evaluation principle only. “Financial Stability Companion” remains an internal behavioural frame and test-only category hypothesis, not settled or public naming. D-068 creates no implementation authority, lane, concurrency, or further-refinement authority; protocol-complete dual-layer participant retesting remains immediately next.

Internal **D-069** / **§193** accepts Cognitive Stewardship as an enduring internal institutional product learning only: the institution progressively carries interpretation while the participant retains judgement. It creates no doctrine, implementation authority, lane, concurrency, public-naming authority, or further-refinement authority; protocol-complete dual-layer participant retesting remains immediately next.

Internal **D-070** / **§194**–**§195**, Internal **D-071** / **§196**–**§197**, and Internal **D-072** / **§198**–**§199** supplied and closed `CLASS-A-VAL-002-WARMTH-001`, `CLASS-A-VAL-002-AFF-001`, and `CLASS-A-VAL-002-ROUTE-001` as historical bounded nested authority only. The completed D-072 pass makes `/dashboard-synthetic-journey` the human-readable participant entry while retaining the legacy query route as a compatibility / rollback seam and preserving the journey, state, arithmetic, engine, targets, and financial / execution boundaries. Every other HedgrOps review concern remains test-first and outside implementation scope. Internal **D-073** / **§200**–**§201** completed the bounded Form instrument pass as historical nested authority. Controlled Parallelism v20 / Internal **D-074** / **§6f.20** added Lane N `NARRATIVE-007` without altering Lane V and is now completed historical concurrency; Internal **D-075** / **§203** later accepts the audit outputs and authorizes one bounded candidate vNext while frozen narrative sources remain unchanged. Controlled Parallelism v21 / Internal **D-076** / **§6f.21** adds Lane E `SE-REASON-001` without altering Lane V or Lane N. Internal **D-077** / **§§205–206** supplied and closed nested `CLASS-A-VAL-002-ORIENT-001` inside Lane V as one bounded Class A informational governed-narrative orientation-surface experiment; it did not create a fourth lane or alter Lane N or Lane E. Internal **D-078** / **§207** retires Notion as an operating, governance, and institutional-memory surface; it does not create a fourth lane or alter D-076 concurrency. Participant testing is active on the verified orientation-inclusive build under the governed cohort protocol.

### Green Lane operator rules (ADR 0025 / §6g)

**Current posture (Internal D-085 / §217):** No active Green Lane delegation envelope exists. The time-bounded pilot was retired after its ~2026-08-04 review / expiry date. Any future Green Lane delegation requires a new Founder-authorized, time-bounded §6g envelope plus explicit §7 / §7a ticket naming; until then, work labeled Green Lane must stop at classification.

When performing or reviewing work labeled Green Lane, Cursor and Codex must verify before acting:

- an active founder-authorized outcome exists and is recorded repo-natively;
- an active Green Lane delegation envelope exists in `HEDGR_STATUS.md` `§6g` and is not paused or revoked;
- the ticket is named under `§7` / `§7a` with explicit file scope;
- the work remains Class A and satisfies all Green Lane conditions in ADR **0025**;
- no sensitive-data, legal, provider, custody, rail, or financial boundary has entered scope;
- singular-ticket or separately authorized parallelism rules are preserved;
- rollback and verification criteria are present.

Stop immediately when: repo authority cannot be verified; scope becomes ambiguous; the task becomes Yellow or Red; a material architecture or trust fork emerges; the task requires a new market, provider, asset, rail, or external commitment; the requested disposition would modify doctrine, accepted ADR meaning, or a canonical trust contract; user research introduces unapproved personal, financial, or regulated data; or implementation would imply live financial capability.

**Binding:** Green Lane classification does not activate work and does not override `HEDGR_STATUS.md` `§7` / `§7a`. HedgrOps briefs are not executable tickets. Class A is not automatically Green.

### Brand-facing implementation governance

When changing brand-facing UI, assets, visual tokens, typography, AI-generated UI, or brand-governed documentation, read in order:

1. `docs/ops/HEDGR_STATUS.md` — `§7` / `§7a` for the approved ticket when named; brand work remains singular unless separately named; concurrent non-brand lanes follow the **Ticket sequencing / governed parallelism** exception above; `§6d` records the Brand System Governance spine
2. `DESIGN.md` — machine-readable brand authority
3. `assets/brand/README.md` — governed asset inventory and usage reference
4. `docs/brand/HEDGR_BRAND_SYSTEM.md`
5. `docs/brand/HEDGR_BRAND_ASSET_RULES.md`
6. `docs/brand/HEDGR_DESIGN_TOKENS.md`
7. `docs/brand/HEDGR_UI_APPLICATION_RULES.md`
8. `docs/brand/HEDGR_BRAND_QA_CHECKLIST.md`
9. Brand Guidelines PDF when present in governed repo assets or attached review materials

AI-assisted implementation must use approved `DESIGN.md` tokens only; preserve token meaning; use only the approved typography stack (Plus Jakarta Sans, Inter, Geist, and Helvetica-style sans fallback); use approved governed assets only; and preserve Hedgr's calm, institutional, trust-first UX posture.

AI-assisted implementation must not reinterpret governed brand behavior, regenerate logos, invent missing assets, create unofficial variants, recolor assets, add shadows / strokes / gradients to brand assets, hallucinate token systems, generate alternate palette variants, introduce speculative fintech aesthetics, crypto-hype visuals, glow systems, animated gradients, dopamine-oriented styling, or gamified reward presentation.

Missing governed assets must be logged and surfaced as missing inputs. They must not be regenerated, substituted, or AI-reinterpreted.

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
