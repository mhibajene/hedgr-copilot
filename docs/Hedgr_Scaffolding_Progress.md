
# Step 0.1 — Turbo Workspace Bootstrap (Summary)

## **Objective**

Bootstrap a monorepo with a working Next.js app, shared UI package, Tailwind v4, and reliable dark/light theme switching—ready for rapid feature work in Step 0.2.

## **Final Status**

- ✅ Monorepo bootstrapped and running locally
- ✅ Tailwind v4 correctly wired (single import + root config)
- ✅ Shared @hedgr/ui package builds and is consumed by the app
- ✅ Dark ↔ light toggle fixed (no regressions)
- ✅ Turbo pipeline configured for build order

## **Repo Layout**

```
apps/
  frontend/        # Next.js (Pages Router for now)
apps/backend/      # placeholder
packages/
  ui/              # shared React components
  config/          # shared config (future)
```

## **Key Tech & Decisions**

- **Package manager:** pnpm
- **Monorepo:** Turbo
- **Frontend:** Next.js (Pages Router)
- **Styling:** Tailwind **v4** with darkMode: 'class'
- **PostCSS:** @tailwindcss/postcss (v4 pipeline)
- **Theming:** <html> class toggle + localStorage.theme persistence
- **Baseline styling:** applied on the **<main>** element (min-h-screen) for reliable flip; body-based baseline also supported if preferred later
- **Pre-hydrate theme script:** optional (recommended) to prevent flash

## **Implemented Config (essentials)**

- **Root tailwind.config.js** (only one in repo)

```
export default {
  darkMode: 'class',
  content: ['./apps/**/*.{js,ts,jsx,tsx,mdx}', './packages/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: { extend: {} },
  plugins: [],
}
```

- **apps/frontend/styles/globals.css (v4 style)**

```
@import "tailwindcss";

@layer base {
  /* optional: color-scheme hints */
  :root { color-scheme: light; }
  .dark { color-scheme: dark; }
}
```

- **apps/frontend/postcss.config.js**

```
module.exports = {
  plugins: { '@tailwindcss/postcss': {}, autoprefixer: {} },
}
```

- **packages/ui/src/index.ts**

```
export { DarkModeToggle } from './DarkModeToggle'
export { Banner } from './Banner'
```

- **Turbo (turbo.json)**

```
{
  "pipeline": {
    "build": { "dependsOn": ["^build"], "outputs": ["dist/**", ".next/**"] },
    "dev": { "cache": false, "persistent": true },
    "lint": {}, "typecheck": {}
  }
}
```

## **Dark Mode Fix (final)**

- **Component:** @hedgr/ui/DarkModeToggle.tsx
    - Explicit document.documentElement.classList.add/remove('dark')
    - localStorage.setItem('theme', next)
    - Console log to verify html.classList
- **Page baseline:** <main className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">…</main>
- **Optional _document.tsx script:** sets <html class="dark"> pre-hydration using saved theme or OS preference (prevents flash)

## **Verification (passed)**

- <html> class toggles between "" and "dark"
- localStorage.theme alternates light/dark
- Visual flip confirmed (background + text)
- No duplicate Tailwind configs in apps/frontend/
- UI package builds before app; imports resolve

## **Run & Build Commands**

```
pnpm i
pnpm --filter @hedgr/ui build
pnpm dev         # runs frontend
pnpm build       # turbo build all
```

## **Commits (suggested messages used)**

- feat(ui): explicit dark-mode toggle with persistence
- chore(postcss): adopt @tailwindcss/postcss (tailwind v4)
- feat(frontend): main-level light/dark baselines + min-h-screen
- build: enforce ui build order via turbo

## **Known Gotchas (resolved)**

- v3 Tailwind imports (base/components/utilities) removed—now single v4 import
- No apps/frontend/tailwind.config.* duplicates
- Avoid @apply with dark: variants in the same rule; prefer .dark … selector or per-element classes

## **Artifacts**

- Working Next.js page (“Hello Hedgr”) using @hedgr/ui components
- Screenshot/logs confirming theme flip (stored in your chat/thread)

## **Ready-For-Step-0.2 Gates (all ✅)**

- Monorepo compiles and runs locally
- Shared UI package build & import verified
- Tailwind v4 compiled via root config
- Theme toggle persists and restores
- Turbo pipeline set; no circular deps


# Step 0.2 — Doppler Secrets & CI (Free-plan implementation)

## Outcomes

* **Local secrets** injected via **Doppler CLI**:

  * Default config: `dev_config_dev` (set in `doppler.yaml`).
  * Run: `doppler setup -p hedgr-copilot -c dev_config_dev && doppler run -- pnpm dev`.
* **CI secrets** injected in **GitHub Actions** using **Service Tokens** (read-only):

  * PRs → `dev_config_dev` with `DOPPLER_TOKEN_DEV`.
  * Pushes to `main` → `stg_config_stg` with `DOPPLER_TOKEN_STG`.
  * Action pinned: `dopplerhq/secrets-fetch-action@v1.3.0`.
* **Dev-only UX cue**: dismissible toast “✅ Secrets loaded from Doppler” rendered via Pages Router.
* **pnpm** version aligned to `package.json:"packageManager"` (no hardcoded version in CI).

## Code & Config Touchpoints

* Frontend (Pages Router)

  * `apps/frontend/components/DevSecretsToast.tsx` (new)
  * `apps/frontend/pages/_app.tsx` → dynamic import of toast (`ssr: false`) & dev gating
* Doppler

  * `doppler.yaml` → default `dev_config_dev`
  * Configs used: `dev_config_dev`, `stg_config_stg`
* CI

  * `.github/workflows/ci.yml`

    * Uses `secrets-fetch-action@v1.3.0` with `auth-method: token`
    * `env.DOPPLER_CONFIG` switches between child configs per event
    * Node 20 + `pnpm/action-setup@v4` (reads `packageManager`)
* Docs & Schema

  * `docs/secrets.md` (how to run; required keys)
  * `env/templates/frontend.env.schema` (placeholders: `NEXT_PUBLIC_APP_ENV`, `API_BASE_URL`, `POSTHOG_KEY`, `SENTRY_DSN`)

## Repo/Platform Settings

* **GitHub → Actions → Secrets**

  * `DOPPLER_TOKEN_DEV` (service token → project `hedgr-copilot`, config `dev_config_dev`, read-only)
  * `DOPPLER_TOKEN_STG` (service token → project `hedgr-copilot`, config `stg_config_stg`, read-only)
* **Branch protection** on `main` recommended (require CI).

## Guardrails

* No `.env*` in repo; Doppler is source of truth.
* Tokens are **read-only**, **per-config**; rotate regularly.
* Forked PRs don’t get secrets → Doppler step is guarded (skips on forks).

---

# Gaps/Backlog carried to 0.3 (enablement items)

* ✅ Add **fork-safe job** (lint/typecheck only, no secrets) so external PRs still get signal.
* ✅ **Env validation** at startup (zod schema or similar) → fail fast on missing keys.
* ✅ **Staging smoke tests** that assert critical envs present and an HTTP 200 on `/`.
* ⬜ Optional: **Docker Compose** for doppler-powered local containers.
* ⬜ Optional: **Observability** wiring (PostHog/Sentry) using Doppler keys (dev/stg).
* ⬜ Future: swap CI tokens → **OIDC** when upgrading Doppler plan (single-line change).

---

# Definition of Done for 0.2 (for context)

* Local `doppler run -- pnpm dev` works; toast visible in dev.
* CI injects secrets from Doppler for PRs (dev) and `main` (stg).
* `.env*` not tracked; docs/schema present.

Hedgr Scaffolding Progress — 0.3

Branch: chore/0.3-forksafe-env-validation
PR: feat(0.3): fork-safe CI + frontend env validation (fail-fast)
Owner: Hedgr Senior Systems Engineer
Date: 2025-09-22

⸻

1) Objective
	•	Ensure forked PRs run CI safely (no secrets).
	•	Introduce fail-fast environment validation for the frontend in local dev and CI.
	•	Provide reproducible local dev via Docker + Doppler.
	•	Document the new behaviors for onboarding and QA.

⸻

2) Summary of Changes

CI/CD
	•	New fork-safe job check in .github/workflows/ci.yml:
	•	Triggers: pull_request, push.
	•	permissions: contents: read; no secrets; runs:
	1.	Checkout → Corepack enable
	2.	pnpm install --frozen-lockfile
	3.	pnpm -w typecheck
	4.	pnpm -w lint
	•	Secret-based build job unchanged except a new step before build:
	•	pnpm run validate:env:frontend (fails fast if required envs missing).
	•	Doppler fetch step retained and guarded to not run on forks.

Frontend Env Validation
	•	Runtime schema: apps/frontend/config/env.ts
	•	Required: NEXT_PUBLIC_APP_ENV ∈ {dev, stg, prod}, API_BASE_URL (valid http(s) URL).
	•	Optional (warn-only): POSTHOG_KEY, SENTRY_DSN.
	•	Exports typed env; throws actionable errors with remediation steps.
	•	Prebuild validator: scripts/validate-env.ts
	•	CLI validation used in CI and can be run locally.

Tests
	•	apps/frontend/__tests__/env.test.ts:
	•	✅ Valid dev env passes.
	•	❌ Missing API_BASE_URL fails.
	•	❌ Invalid NEXT_PUBLIC_APP_ENV fails.

Workspace Scripts
	•	Root package.json:
	•	"typecheck": "pnpm -r --if-present run typecheck"
	•	"lint": "pnpm -r --if-present run lint"
	•	Frontend package (apps/frontend/package.json):
	•	"typecheck": "tsc -p tsconfig.json --noEmit"
	•	"lint": "next lint --max-warnings=0"
	•	Minimal ESLint config added: apps/frontend/.eslintrc.json → { "extends": ["next/core-web-vitals"] }.

Docker Local Dev (Optional Step 5)
	•	docker-compose.yml: host wraps with doppler run (no secrets in images).
	•	Image: node:20-bullseye.
	•	Uses array-form command:
	•	corepack enable + corepack install (honors repo-pinned PNPM).
	•	pnpm install --frozen-lockfile.
	•	pnpm --filter ./apps/frontend dev.
	•	Volumes: repo bind mount, PNPM store cache, isolated node_modules.
	•	Docs: docs/local-dev.md explains full flow.

PNPM Native Builds Approval
	•	Removed legacy pnpm-builds.yaml.
	•	Allow-list (PNPM 10): package.json → pnpm.onlyBuiltDependencies = ["esbuild","sharp","@tailwindcss/oxide"] to avoid ignored postinstall scripts.

Documentation
	•	docs/secrets.md updated:
	•	Required vs optional keys, local Doppler commands, validator failures & fixes.
	•	docs/local-dev.md added:
	•	Docker + Doppler instructions, stop/clean, rationale.

⸻

3) Files Touched / Added
	•	.github/workflows/ci.yml (added fork-safe job; env validation step in build)
	•	apps/frontend/config/env.ts (new)
	•	scripts/validate-env.ts (new)
	•	apps/frontend/__tests__/env.test.ts (new)
	•	apps/frontend/.eslintrc.json (new)
	•	apps/frontend/package.json (scripts + devDeps)
	•	package.json (root scripts; pnpm.onlyBuiltDependencies; may include packageManager bump)
	•	pnpm-lock.yaml (updated)
	•	docker-compose.yml (new)
	•	docs/secrets.md (updated)
	•	docs/local-dev.md (new)
	•	Removed: pnpm-builds.yaml

⸻

4) QA / Dev Hand-off

A. Fork-safe CI
	•	Create a PR from a fork.
	•	Verify job Fork-safe checks (typecheck/lint) runs & passes.
	•	Expected steps in logs: corepack enable → pnpm install --frozen-lockfile → pnpm -w typecheck → pnpm -w lint.

B. Secret-based Build
	•	On internal PR or main, Doppler fetch step runs (not on forks).
	•	Step Validate frontend env runs before build.
	•	Removing required vars causes the job to fail with clear remediation text; restoring them makes it pass.

C. Unit Tests
	•	pnpm -w test is green.

D. Local Dev (CLI)

doppler setup -p hedgr-copilot -c dev_config_dev
doppler run -- pnpm dev

	•	App starts; invalid envs fail-fast with actionable errors.

E. Local Dev (Docker)

docker compose down -v
doppler run -- docker compose up --build frontend

	•	PNPM version matches repo pin (via corepack install).
	•	No “ignored build scripts” warnings (sharp/oxide/esbuild built).
	•	Next.js running at http://localhost:3000.

⸻

5) Acceptance Criteria (0.3)
	•	Fork-safe check job runs on all PRs with no secrets.
	•	Secret-based build runs validate:env:frontend before pnpm -w build.
	•	Local dev works with Doppler; validation errors are actionable.
	•	Env validation tests added and passing.

⸻

6) Security Notes
	•	Fork job uses read-only token; no secrets exposure to forks.
	•	Doppler is the single source of truth; no .env* in git.
	•	Fail-fast validation lowers risk of misconfigured builds reaching users.

⸻

7) Risk & Rollback
	•	Risk: Packages without typecheck/lint scripts won’t be checked by root runner.
	•	Mitigation: Adopt the same script pattern when adding new packages.
	•	Rollback: Remove the check job and validator files; revert docs. No runtime/data impact.

⸻

8) Decision Filters (Hedgr)
	•	Security First: fork-safe CI; guarded secrets; strict env validation.
	•	User-Centricity: catches misconfigurations early; smoother dev velocity → fewer user-facing issues.
	•	Scalability: workspace scripts + Docker path scale across contributors & machines.
	•	Low-Cost to Test: forks validated without secrets; deterministic installs via lockfile.
	•	Local Relevance: Docker + Doppler reduces setup friction on varied hardware/OS.

⸻

9) Commands Quick Sheet
	•	Checks:
	•	pnpm -w test
	•	pnpm -w typecheck
	•	pnpm -w lint
	•	Local (CLI):
	•	doppler setup -p hedgr-copilot -c dev_config_dev
	•	doppler run -- pnpm dev
	•	Local (Docker):
	•	doppler run -- docker compose up --build frontend
	•	Validator direct:
	•	pnpm run validate:env:frontend

⸻

10) Follow-ups (suggested 0.3.x / 0.4)
	•	Observability toggles (Optional Step 6): add apps/frontend/lib/analytics.ts guarded by NEXT_PUBLIC_APP_ENV==='dev' + optional keys; extend docs.
	•	Extend env tests with malformed URL and snapshot error messages.
	•	Apply similar env validation to backend services when introduced.
	•	Add a PR template referencing checks and env expectations.

Hedgr Scaffolding Progress — 0.4

Branch: chore/0.4-scripts-qol (+ follow-ups: ci/e2e-smoke, chore/ui-typecheck-react-dom-types)
PR: #15 (plus small supporting PRs)
Owner: @musalwa
Date: 2025-09-29

⸻

1) Objective

Establish a hardened CI/CD baseline and local dev loop:
	•	Deterministic installs and repo-pinned tooling.
	•	Fork-safe validation (no secrets on external PRs).
	•	Minimal E2E “smoke” that proves the app boots.
	•	Dev-safe observability (PostHog/Sentry) behind strict env gates.
	•	Branch protection requiring green checks.

⸻

2) Summary of Changes
	•	CI
	•	.github/workflows/validate.yml: unit, typecheck, lint with frozen lockfile and repo-pinned pnpm/corepack.
	•	.github/workflows/e2e-smoke.yml: Playwright webServer boot + 2 smoke specs; artifact retention and headless mode.
	•	Branch protection: require “E2E smoke (@hedgr/frontend)”, linear history, reviews, no force-push.
	•	Frontend & Tests
	•	Analytics refactor: call-time env reads, dynamic optional deps, PII scrub (PostHog sanitize_properties, Sentry beforeSend), idempotent init.
	•	Vitest env tests + stable virtual mocks, resetAnalytics() for isolation.
	•	Health/version API tests hardened (shape, ISO timestamp, freshness).
	•	Tooling & Types
	•	ESLint v9 migration (eslint.config.mjs) + Next.js plugin.
	•	TS configs split for app/tests; paths aligned for Next transpile.
	•	@hedgr/ui peer alignment & typecheck fix (react-dom types), removed problematic TS path alias to ensure proper transpilation in CI.
	•	Docs & DX
	•	README.md (root) and docs/local-dev.md, docs/secrets.md updated for Doppler + Docker flows.
	•	Docker dev: deterministic corepack/pnpm, no “ignored scripts” warnings.

⸻

3) Files Touched / Added
	•	Workflows:
		.github/workflows/validate.yml, .github/workflows/e2e-smoke.yml

	•	Frontend (apps/frontend):
		•	Tests: __tests__/env.test.ts, __tests__/api.health.test.ts, tests-e2e/*.spec.ts, playwright.config.ts
		•	App: lib/analytics.ts, pages/_app.tsx, pages/index.tsx, pages/api/{health.ts,version.ts}
		•	Config: eslint.config.mjs, tsconfig.json, tsconfig.vitest.json, package.json
	•	UI pkg (packages/ui):
			tsconfig.json, src/Banner.tsx (types/imports)
	•	Root:
		package.json, pnpm-lock.yaml, README.md, docs/{local-dev.md,secrets.md}

	•	Dev (where applicable):
		Dockerfile, docker-compose.yml (frontend target)

⸻

4) QA / Dev Hand-off

Local (CLI)

doppler setup -p hedgr-copilot -c dev_config_dev
doppler run -- pnpm dev

	•	App starts; invalid envs fail-fast with actionable errors.

Local (Docker)

docker compose down -v
doppler run -- docker compose up --build frontend

	•	PNPM version matches repo pin (via corepack).
	•	No “ignored build scripts” warnings (sharp/oxide/esbuild built).
	•	Next.js running at http://localhost:3000.

Validation

pnpm run validate            # runs tests, typecheck, lint (workspace-wide)
pnpm --filter @hedgr/frontend exec playwright install
pnpm --filter @hedgr/frontend run e2e      # local
pnpm --filter @hedgr/frontend run e2e:ci   # CI parity

Branch Protection
	•	Required check: E2E smoke (@hedgr/frontend) gates merges.
	•	Auto-merge enabled; still requires 1 review (self-approval blocked by GitHub).

⸻

5) Acceptance Criteria (0.4)
	•	CI validate job (unit/typecheck/lint) passes with frozen lockfile.
	•	E2E smoke passes in CI and is required for merging to main.
	•	Frontend analytics honors dev-only gates; optional deps do not break CI.
	•	Local dev (CLI & Docker) works with Doppler-provided env; failures are clear.
	•	@hedgr/ui compiles in CI (types and React peer alignment).

⸻

6) Security Notes
	•	Fork PRs run no secrets; internal PRs/main use Doppler.
	•	PII scrubbing active in analytics; observability disabled outside dev or without keys.
	•	Branch protection: linear history, review required, admins enforced.
	•	Versions pinned; no latest / loose ranges; frozen lockfile in CI.

⸻

7) Risk & Rollback
	•	Risk: E2E flakes (timing/port) could block merges.
		Mitigation: small timeouts, single page smoke, CI retry once.
	•	Risk: Workspace peer drift (React) can break builds.
		Mitigation: enforce Renovate + peer alignment, CI “smoke build” step.
	•	Rollback: Temporarily remove required E2E status and/or disable e2e workflow; revert analytics gating if needed. No data migration impact.

⸻

8) Decision Filters (Hedgr)
	•	Security First: fork-safe CI; strict env gates; PII scrub.
	•	User-Centricity: fast feedback; misconfigurations caught before release.
	•	Scalability: monorepo scripts + Docker/Doppler workflows scale across contributors.
	•	Low-Cost to Test: deterministic installs, minimal smoke E2E.
	•	Local Relevance: reduced setup friction across macOS/Linux via Docker/corepack.

⸻

9) Commands Quick Sheet
•	Checks

	pnpm -w test
	pnpm -w typecheck
	pnpm -w lint
	pnpm run validate


•	E2E

	pnpm --filter @hedgr/frontend exec playwright install
	pnpm --filter @hedgr/frontend run e2e
	pnpm --filter @hedgr/frontend run e2e:ci


•	Local Dev

	doppler setup -p hedgr-copilot -c dev_config_dev
	doppler run -- pnpm dev


•	Docker Dev

	doppler run -- docker compose up --build frontend



⸻

10) Follow-ups
	•	Make unit/typecheck/lint required checks alongside E2E in branch protection.
	•	Add Renovate (/renovate.json) for controlled updates; group by workspace.
	•	Add CODEOWNERS and PR template nudging validation commands and env expectations.
	•	Broaden E2E: basic nav + API assertions; attach HTML report artifact on failure.
	•	Cache tuning: Turbo remote cache + Playwright browsers cache in CI.
	•	Optional: preview deployments per PR (e.g., Vercel) once secrets posture is finalized.

	HedgrOps Feature Close-Out Template

HedgrOps Close-Out — Sprint 0.5: CI/CD Hardening, E2E Reliability & Dependency Hygiene

1) Metadata
	•	Feature ID: SPRINT-0.5
	•	Owner: @mhibajene
	•	Type: chore / infra
	•	Risk Level: medium
	•	Branch:
	•	primary: chore/0.5-ci-e2e-renovate
	•	follow-ups: chore/0.5-enforce-ci-lock-guard, chore/0.5-ui-peers-react19, chore/0.5-ci-pr-auto-update, chore/0.5-ci-never-again-guards
	•	PR: #17, #18, #19, #20, (auto-update PR)
	•	Date Shipped: 2025-09-30

⸻

2) CONTRACT (Source of Truth)
	•	Summary: Keep main green by default via deterministic installs, fork-safe CI, reliable Playwright E2E smoke, Renovate hygiene, and codified guardrails (branch protection + CODEOWNERS + docs).
	•	Acceptance Criteria (Gherkin):
	•	Given a PR to main when CI runs then required checks validate and E2E smoke (@hedgr/frontend) both pass.
	•	Given a fork PR when CI runs then no secrets are used and typecheck/lint/unit still pass.
	•	Given Renovate opens PRs when checks pass then patch/minor devDependencies auto-merge; majors require manual review; groups = React/Next, TS/@types, ESLint, Playwright, Tailwind, Turbo.
	•	Given E2E when executed in CI then browsers are installed, analytics calls are blocked, app builds/starts, and smoke spec passes reliably (2×).
	•	Rollout Plan: land #17 (core), then enforcement (#18), UI peer alignment (#19), YAML/PNPM fixes (#20), add PR auto-update workflow; restore/confirm required checks; enable auto-merge (squash).
	•	Rollback Plan: revert individual PR(s); temporarily remove E2E smoke (@hedgr/frontend) from required checks if hotfix needed; guard scripts are no-op on revert.
	•	Telemetry Plan:
	•	CI metrics: job duration & success rate for validate, E2E smoke.
	•	Playwright artifacts: traces/videos on failure.
	•	Actionlint/guard logs in validate.
	•	Security Notes: fork-safe posture (no secrets on PR from forks), analytics (PostHog/Sentry) blocked in tests, CODEOWNERS on policy files, strict branch protection.
	•	Coverage Targets: FE unit (baseline unchanged); E2E smoke enforced. (No BE in this sprint.)

⸻

3) Implementation (Cursor)
	•	DIFF Summary:
	•	Files Touched:
	•	renovate.json :: grouping, schedule, required checks, safe auto-merge.
	•	.github/CODEOWNERS :: explicit ownership for policy files.
	•	.github/workflows/validate.yml :: Node→Corepack order, frozen installs, actionlint + guard steps.
	•	.github/workflows/e2e-smoke.yml :: prod build, guard, pnpm store cache (post-Corepack), workflow_dispatch, canonical name.
	•	.github/workflows/ci.yml :: fork-safe checks job; Node fallback + Corepack; fixed indentation.
	•	.github/workflows/pr-auto-update.yml :: auto-update PR branches when main moves.
	•	scripts/ci/guard-lock-drift.mjs :: fail on lock/manifest drift.
	•	scripts/ci/guard-workflows.mjs :: invariants (YAML colon, pnpm cache misuse, E2E naming, .nvmrc).
	•	apps/frontend/playwright.config.ts :: prod server bring-up, timeouts.
	•	apps/frontend/tests-e2e/smoke.spec.ts :: health/version poll + analytics blocking.
	•	packages/ui/package.json :: peers → react/react-dom ^19.0.0.
	•	package.json, pnpm-lock.yaml, .nvmrc :: turbo/pnpm alignment, determinism, Node 20 pin.
	•	docs/ci.md, docs/renovate.md :: run-books and policy.
	•	Tests Added/Updated:
	•	apps/frontend/tests-e2e/smoke.spec.ts :: @smoke basic app up + health; analytics stubs.
	•	Validations Added: actionlint workflow lint; custom guards for lockfile and workflow invariants.
	•	PR Body: captured the scope above; emphasized required checks, fork-safety, Renovate policy, and E2E hermeticity.
	•	Runbook Entry: CI/E2E runbook with recovery steps (reset required checks, trigger workflow_dispatch, lockfile remediation, pnpm/Corepack order); added weekly audit commands.

⸻

4) QA (Codex)

Pre-Merge Audit
	•	BLOCKERS: Resolved — lockfile drift, duplicate E2E context, YAML colon error, pnpm-not-found due to setup-node cache: pnpm.
	•	WARNINGS: Watch PR noise from Renovate after first window; split groups if needed.
	•	TEST_MAP:
	•	Given E2E runs in CI ... Then smoke passes 2× → smoke.spec.ts
	•	TELEMETRY_MAP:
	•	CI job duration/success → GitHub Actions logs (validate/e2e).
	•	Guard results → scripts/ci/guard-*.mjs console output in validate.
	•	APPROVAL: YES

Post-CI Audit
	•	CI Summary:
	•	Playwright: 100% pass (smoke only; no failing specs post-fixes).
	•	Lighthouse: N/A (not in scope this sprint).
	•	Semgrep: N/A (not enabled this sprint).
	•	Size-limit: N/A (no bundle policy this sprint).
	•	Coverage: FE unit unchanged; E2E smoke enforced.
	•	GAPS:
	•	TEST_GAP: no critical-flow E2E yet (onboarding/deposit/withdraw).
	•	IMPLEMENTATION_GAP: DS tokens/primitives not finalized.
	•	APPROVAL: YES

⸻

5) CI & Deployment
	•	Preview URL: N/A (infrastructure change).
	•	Staging Checks: validate ✅, E2E smoke ✅ on PR and on main.
	•	Canary Status: N/A
	•	Final Deployment: merge commits of PRs #17 #18 #19 #20 + auto-update workflow PR into main.

⸻

6) Build Health Notes
	•	Incidents During Cycle: Yes — lockfile drift (turbo), YAML syntax error, pnpm not found due to premature caching, missing .nvmrc. All remediated and guarded.
	•	Most Missed Acceptance Criteria: N/A (all contract items satisfied after remediation).
	•	Most Common CI Failures: Early-step install failures; now prevented by guards and Corepack-first ordering.
	•	Prompt Adjustments: Added “Never-Again” guards + actionlint; clarified E2E workflow naming and dispatch.
	•	Coverage Deltas: FE unit — no change; E2E smoke now enforced.

⸻

7) Sign-Off
	•	HedgrOps (Product Lead): ✅ mhibajene / 2025-09-30
	•	Cursor (Engineer): ✅ cursor-bot / 2025-09-30
	•	Codex (QA): ✅ hedgrops-qa / 2025-09-30

⸻

8) Archive Links
	•	CONTRACT JSON / plan: Sprint 0.5 contract (this thread + repo /docs/ci.md, /docs/renovate.md)
	•	PRs: #17 (core), #18 (CI enforcement), #19 (UI peers React 19), #20 (E2E YAML/PNPM fixes), auto-update PR
	•	CI Run: latest successful runs for validate and E2E smoke (@hedgr/frontend) on main
	•	Runbook Update: /docs/ci.md
	•	Observability Dashboards: GitHub Actions (validate, e2e), Playwright artifacts (traces/videos on failure)

⸻

Next Sprint (seed)
	•	Contracts for Phase 2–4: Auth & App Shell (Magic.link), Deposit (MTN MoMo → USDC), Aave balances/yield, Withdraw + FX module, with critical-flow E2E.

⸻

Hedgr Scaffolding Progress — 0.6

Feature: Sprint 0.6 — Auth Shell, DeFi Mock, Deposit, Withdraw
Owner: (@mhibajene)
Date Shipped: 2025-12-01
Risk: low

⸻

1) Metadata
	•	Branches (micro-contracts)
	•	feat/0.6-auth-app-shell
	•	feat/0.6-defi-mock
	•	feat/0.6-deposit-stub
	•	feat/0.6-withdraw-stub
	•	Required Checks (branch protection)
	•	validate
	•	E2E smoke (@hedgr/frontend) (commit status context)
	•	Flags (CI defaults)
	•	NEXT_PUBLIC_AUTH_MODE=mock
	•	NEXT_PUBLIC_DEFI_MODE=mock
	•	NEXT_PUBLIC_MOMO_CONFIRM_DELAY_MS=1500
	•	NEXT_PUBLIC_WITHDRAW_CONFIRM_DELAY_MS=1500

⸻

2) Contract (Source of Truth)
	•	Goal: Ship mock-first critical flows with deterministic E2E: login → dashboard APY → deposit ↑ → withdraw ↓.
	•	Acceptance (Gherkin)
	•	Auth:
Given NEXT_PUBLIC_AUTH_MODE=mock when user submits /login then redirect /dashboard and session is set.
	•	DeFi:
Given mock mode when /dashboard loads then APY > 0 and USD balance renders.
	•	Deposit:
Given a deposit of 100 ZMW when status becomes CONFIRMED ≤5s then USD balance increases by 100/20 = $5.00.
	•	Withdraw:
Given a USD withdraw of $1.00 when status becomes CONFIRMED ≤5s then USD balance decreases accordingly ($4.00 after seeded deposit).
	•	Non-negotiables: Security first • No secrets in CI/E2E • Types clean • Unit + E2E present • Deterministic installs (corepack, pnpm --frozen-lockfile) • Fork-safe • Rollback via single revert or flag.

⸻

3) Implementation
	•	Frontend (App Router)
	•	Auth Shell: mock email login; Zustand session store; guarded app layout with sign-out.
	•	apps/frontend/lib/state/user.ts
	•	apps/frontend/lib/auth/magic.ts (mock only)
	•	apps/frontend/app/(auth)/login/page.tsx
	•	apps/frontend/app/(app)/layout.tsx
	•	Health/Version APIs:
	•	apps/frontend/app/api/health/route.ts → { status: "ok" }
	•	apps/frontend/app/api/version/route.ts → { version }
	•	DeFi (Mock 5% APY) + Wallet Store:
	•	apps/frontend/lib/state/wallet.ts (credit/debit USD, persisted)
	•	apps/frontend/lib/defi/types.ts, apps/frontend/lib/defi/mock.ts (returns 0.05)
	•	apps/frontend/app/(app)/dashboard/page.tsx (shows USD balance + APY)
	•	Stable selector: data-testid="usd-balance"; hydration guard to always render the element.
	•	Deposit (ZMW→USD) Stub + FX:
	•	apps/frontend/lib/fx.ts (FX_RATE_ZMW_PER_USD=20, zmwToUsd())
	•	apps/frontend/lib/payments/provider.ts (interfaces)
	•	apps/frontend/lib/payments/momo.mock.ts (deterministic confirm; default 1500ms)
	•	apps/frontend/app/(app)/deposit/page.tsx (amount → FX preview → confirm → credit on CONFIRMED)
	•	Withdraw (USD→ZMW) Stub:
	•	apps/frontend/lib/payments/withdraw.mock.ts (deterministic confirm; default 1500ms)
	•	apps/frontend/app/(app)/withdraw/page.tsx (amount → confirm → debit on CONFIRMED)
	•	E2E/Unit Tests
	•	Unit:
	•	__tests__/auth.spec.ts (login sets session)
	•	__tests__/defi.spec.ts (APY positive; wallet mirrors updates)
	•	__tests__/fx.spec.ts (100 ZMW → $5.00)
	•	E2E (Playwright):
	•	tests-e2e/critical.spec.ts
	•	login works (mock)
	•	dashboard shows APY
	•	deposit 100 ZMW → $5.00
	•	withdraw $1.00 → $4.00
	•	Determinism: confirmation delays fixed; tests assert via getByTestId('usd-balance').
	•	Next.js Router Cleanup
	•	Removed conflicting Pages Router routes (e.g., pages/dashboard.tsx) to use App Router only.

⸻

4) QA (Codex)
	•	Pre-merge diff gate: enforced Solo QA Gate: PRs required labels product:approved, qa:approved, plus area:* and risk:*.
	•	Checks Codex verified:
	•	Workflow names unchanged (validate, E2E smoke (@hedgr/frontend))
	•	.nvmrc = 20
	•	pnpm -r install --frozen-lockfile
	•	pnpm -w typecheck && pnpm -w lint && pnpm -w test
	•	pnpm --filter @hedgr/frontend exec playwright install --with-deps
	•	pnpm --filter @hedgr/frontend run e2e:ci
	•	No any/@ts-ignore w/o justification; no console.log in app code; E2E hermetic (analytics/network blocked).
	•	AC → Tests mapping:
	•	Auth redirect/session → auth.spec.ts + E2E login ✅
	•	APY pill + balance → defi.spec.ts + E2E dashboard ✅
	•	Deposit 100 ZMW → $5.00 → fx.spec.ts + E2E deposit ✅
	•	Withdraw decreases balance → E2E withdraw ✅

⸻

5) Post-CI Audit
	•	Outcomes: All four PRs green on validate and E2E smoke (@hedgr/frontend); auto-merge (squash) used.
	•	Stability fixes applied during PRs:
	•	pnpm bootstrap before setup-node@v4 cache: pnpm
	•	Commit-status bridge to satisfy required context E2E smoke (@hedgr/frontend)
	•	Deterministic mock confirmations (deposit/withdraw)
	•	Removed over-aggressive addInitScript(localStorage.clear) that wiped state on navigation
	•	Added data-testid="usd-balance" and hydration guard to eliminate element-not-found races.
	•	Residual risk: low; mocks are deterministic; selectors stable.

⸻

6) CI & Deployment
	•	Workflows:
	•	.github/workflows/validate.yml — frozen lockfile, typecheck, lint, unit
	•	.github/workflows/e2e-smoke.yml — build, Playwright install, e2e:ci, and commit-status reporter (context: E2E smoke (@hedgr/frontend))
	•	Permissions: statuses: write for commit-status bridge.
	•	Node/PNPM: .nvmrc=20, corepack enable, repo-pinned pnpm; pnpm store cache enabled.
	•	Branch Protection: requires both contexts above; linear history; conversation resolution.
	•	Labels policy: PRs must include product:approved, qa:approved, one area:*, one risk:*.

⸻

7) Build Health Notes
	•	Incidents & Remediations
	•	pnpm not found due to premature setup-node cache: pnpm → fixed by pnpm/action-setup before setup-node.
	•	Duplicate required check (context vs job name) → fixed with commit-status bridge via actions/github-script (github.rest.repos.createCommitStatus).
	•	Next.js route conflict (pages/* vs app/*) → removed conflicting Pages Router files.
	•	E2E flakes from random confirmation delays → mocks made deterministic; optional *_CONFIRM_DELAY_MS flags added.
	•	State wipe across navigations → removed global addInitScript(localStorage.clear); tests assert via stable testid.
	•	Guardrails added: Runbook labels requirement; optional route-conflict guard script (planned).

⸻

8) Archive Links
	•	PRs (titles)
	•	feat(auth): mock login + app shell + health/version (S06-AUTH)
	•	feat(defi): dashboard balance + APY pill (mock) (S06-DEFIMOCK)
	•	feat(payments): deposit stub (MoMo mock) + FX util (S06-DEPOSIT)
	•	feat(payments): withdraw stub (MoMo mock) (S06-WITHDRAW)
	•	chore(ci): pnpm bootstrap + test flag cleanup (CI fix)
	•	chore(ci): align E2E required check via commit status (E2E context bridge)
	•	Runbook updates: label policy (area:*, risk:*) and CI context notes.
	•	Artifacts: Playwright traces/videos attached on prior failing runs; final green runs on main.

⸻

DoD: All 4 micro-contracts merged to main; E2E smoke asserts login, dashboard APY, deposit↑, withdraw↓; branch protection and runbook updated.

Below is a paste-ready Scaffolding Progress Summary for Sprint 0.7, matching the structure + tone of the prior sprint reports (esp. 0.6) in docs/Hedgr_Scaffolding_Progress.md.

⸻

Hedgr Scaffolding Progress — 0.7

Feature: Sprint 0.7 — SSoT Flags, Magic Auth (flagged), Server FX, Aave APY Adapter (flagged), Ledger Activity
Owner: (@musalwa)
Date Shipped: 2025-12-26
Risk: low

⸻
	1.	Metadata
•	Branches (micro-contracts)
•	feat/0.7-auth-magic
•	feat/0.7-fx-service
•	feat/0.7-defi-aave-adapter
•	feat/0.7-ledger-activity
•	Required Checks (branch protection)
•	validate
•	E2E smoke (@hedgr/frontend) (strict up-to-date ON)
•	Flags (CI defaults)
•	NEXT_PUBLIC_AUTH_MODE=mock (mock|magic)
•	NEXT_PUBLIC_DEFI_MODE=mock (mock|aave)
•	NEXT_PUBLIC_FX_MODE=fixed (fixed|coingecko)
•	NEXT_PUBLIC_MOMO_CONFIRM_DELAY_MS=1500
•	NEXT_PUBLIC_WITHDRAW_CONFIRM_DELAY_MS=1500

⸻
	2.	Contract (Source of Truth)
•	Goal: Land flag-driven “real provider” scaffolds while keeping CI/E2E hermetic (mock/fixed). Add persisted Activity ledger + E2E coverage.
•	Acceptance (Gherkin)
•	Auth (Magic, flagged):
Given NEXT_PUBLIC_AUTH_MODE=magic and valid keys, when OTP verifies then session is established and user redirects to /dashboard (CI remains mock).
•	FX Service:
Given NEXT_PUBLIC_FX_MODE=fixed, when user deposits 100 ZMW then the credited amount is $5.00 and an FX pill is visible; CoinGecko mode is local-only.
•	DeFi (Aave APY, flagged):
Given NEXT_PUBLIC_DEFI_MODE=aave (local), when dashboard loads then APY renders from adapter and is labeled as Aave; CI remains mock APY 5%.
•	Ledger / Activity:
Given user completes deposit 100 ZMW and withdraw $1.00, when visiting /activity then two CONFIRMED entries appear within ≤5s.
•	Non-negotiables: Security first • No live network in CI/E2E • Types clean • Unit + E2E present • Deterministic installs (corepack, pnpm –frozen-lockfile) • Fork-safe • Rollback via single revert or flag.

⸻
	3.	Implementation
•	Frontend Routing Guardrails
•	Resolved Next.js route conflicts (Pages vs App Router duplication) to ensure production build stability.
•	Auth (Magic OTP behind flag; default mock)
•	apps/frontend/lib/auth/mode.ts → getAuthMode(): mock|magic (default mock)
•	apps/frontend/lib/auth/magic.client.ts → Magic client init + loginWithEmail() returns DID token
•	/apps/frontend/api/auth/verify route → verifies DID token using secret; establishes session (server-only)
•	Login UI branches by auth mode; CI remains mock.
•	FX Service (Server FX endpoint + optional provider)
•	apps/frontend/lib/fx.ts → FX_RATE_ZMW_PER_USD_DEFAULT=20, getFxMode(), zmwToUsd()
•	/apps/frontend/api/fx route → returns { base:‘USD’, quote:‘ZMW’, rate, ts }
•	apps/frontend/lib/fx/providers/coingecko.ts → server-only provider; guarded to never execute in CI
•	Deposit page consumes /api/fx and credits using returned rate; fixed mode supports 100 ZMW → $5.00.
•	DeFi (Aave adapter behind flag)
•	apps/frontend/lib/defi/aave.ts → getNetApyAave()
•	apps/frontend/lib/defi/index.ts → mode switch (mock vs aave)
•	Dashboard labels APY source when mode=aave; CI remains mock APY 5%.
•	Ledger / Activity (persisted tx history)
•	apps/frontend/lib/state/ledger.ts → persisted Zustand ledger store
•	Tx model: { id, type, amountUSD, amountZMW?, status, createdAt, confirmedAt? }
•	Momo/Withdraw mocks append PENDING → confirm after deterministic delay
•	apps/frontend/app/(app)/activity/page.tsx → activity list with status badges, grouped by day
•	apps/frontend/app/(app)/layout.tsx → nav includes “Activity”
•	Dashboard keeps data-testid=“usd-balance” for stable E2E assertions.

⸻
	4.	QA (Codex)
•	Pre-merge diff gate: enforced Solo QA Gate: PRs required labels product:approved, qa:approved, plus area:* and risk:*.
•	Checks Codex verified:
•	CI defaults remain mock/fixed; live providers never exercised in CI/E2E.
•	Deterministic installs preserved: corepack enable + pnpm –frozen-lockfile
•	No workflows renamed; required contexts unchanged.
•	Unit tests added/updated:
•	auth.magic.test.ts (verify endpoint success/failure; SDK mocked)
•	fx.test.ts (fixed=20; zmwToUsd; provider mocked)
•	defi.aave.test.ts (adapter mocked; mode switch)
•	ledger.test.ts (lifecycle + persistence in jsdom)
•	E2E:
•	critical.spec.ts updated to include Activity flow assertions and stable selectors/roles.

⸻
	5.	Post-CI Audit
•	Outcomes: All micro-contract PRs green on validate and E2E smoke (@hedgr/frontend); auto-merge (squash) used.
•	Stability fixes applied during PRs:
•	Next.js build blockers:
•	Route conflict fix (duplicate /login in pages/* vs app/*), aligned routing to avoid build-time collisions.
•	FX provider build fix: corrected bad relative import in coingecko provider; ensured provider isolation.
•	Vitest environment fix: ledger persistence tests moved to jsdom to access window/localStorage deterministically.
•	E2E strict locator fix: replaced ambiguous getByText(‘Activity’) with role-based locator for deterministic strict mode behavior.
•	Residual risk: low; live integrations remain flagged and are local-only.

⸻
	6.	CI & Deployment
•	Workflows (unchanged)
•	.github/workflows/validate.yml — frozen lockfile, typecheck, lint, unit
•	.github/workflows/e2e-smoke.yml — build, Playwright install, e2e:ci, artifacts on failure
•	Node/PNPM: .nvmrc=20, corepack enable, repo-pinned pnpm; pnpm store cache enabled.
•	Branch Protection: validate + E2E smoke required; strict up-to-date ON; linear history.
•	Rollback posture: single revert or flip flags (AUTH_MODE=mock, FX_MODE=fixed, DEFI_MODE=mock).

⸻
	7.	Build Health Notes
•	Incidents & Remediations
•	Next.js “conflicting app and page file”:
•	Cause: duplicate route definitions (pages/login.tsx vs app/(auth)/login/page.tsx).
•	Fix: remove conflicting route; align router usage for canonical paths.
•	Webpack module not found (CoinGecko provider):
•	Cause: incorrect relative import path in coingecko.ts.
•	Fix: correct import path/remove unnecessary coupling; keep provider server-only and guarded.
•	Lint failure (unused var in ledger store):
•	Cause: unused persist initializer arg.
•	Fix: remove unused arg; keep lint strict.
•	Unit test window/localStorage failures:
•	Cause: Node test env + premature store import.
•	Fix: jsdom env + use built-in localStorage; clear between tests.
•	E2E strict mode violations:
•	Cause: ambiguous locators matching nav + heading.
•	Fix: role-based selectors (heading/link) for deterministic strict mode.
•	Guardrails reinforced:
•	Prefer role-based locators in Playwright.
•	Avoid Pages/App router duplication (route-conflict rule-of-thumb documented in sprint notes).

⸻
	8.	Archive Links
•	PRs (titles)
•	feat(auth): enable Magic OTP behind flag (default mock)
•	feat(fx): server fx endpoint + provider hook (fixed by default)
•	feat(defi): aave adapter (read APY behind flag)
•	feat(ledger): persisted transaction history + activity page
•	Artifacts: Playwright traces/videos attached on prior failing runs; final green runs on main.
•	Runbook updates: flags/secrets notes; live-provider guidance (local only); E2E selector guidance (role-based).

⸻

DoD: All 4 micro-contracts merged to main; E2E smoke asserts login (mock), dashboard APY (mock), deposit↑, withdraw↓, Activity shows two CONFIRMED entries; branch protection and runbook remain green.

⸻

# S08 — Balance SSoT: Ledger as Single Source of Truth

## **Objective**

Establish the ledger as the single source of truth (SSoT) for all user-facing balance displays. All balance values must be derived exclusively from ledger transactions, with a clear rollback path via feature flag.

## **Implementation Summary**

### Backend / API

- **Ledger Projection Function**: `computeBalanceFromLedger(transactions)` in `lib/state/balance.ts`
  - Reads from ledger transactions
  - Handles deposits, withdrawals, reversals, and failed transactions predictably
  - Returns: `{ total, available, pending, currency, asOf }`

- **Canonical Balance Endpoint**: `GET /api/balance`
  - Response shape: `{ total, available, pending, currency, asOf }`
  - Uses ledger projection only when `BALANCE_FROM_LEDGER=true` (default)
  - Also supports `POST /api/balance` with transactions in request body

### Frontend

- **useBalance() Hook**: `lib/hooks/useBalance.ts`
  - Single source of truth for balance display in React components
  - Returns: `{ total, available, pending, currency, asOf, isLoading, error, refresh }`
  - Automatically computes from ledger store when SSoT is enabled

- **Refactored Components**:
  - Dashboard: Uses `useBalance()` exclusively
  - Withdraw page: Uses `useBalance()` for available balance display
  - Deposit/Withdraw flows: Record transactions in ledger store

### Feature Flag / Rollback

- **Flag**: `NEXT_PUBLIC_BALANCE_FROM_LEDGER`
- **Default**: `true` (SSoT enabled)
- **Rollback**:
  1. Set `NEXT_PUBLIC_BALANCE_FROM_LEDGER=false` in environment
  2. Or revert the `feature/S08-balance-ssot` branch (single revert)

### Tests

- **Unit Tests** (`__tests__/balance.projection.test.ts`):
  - Deposit → increases correct fields
  - Withdrawal → decreases correct fields
  - Failed/reversed transactions → no net effect
  - Floating point precision handling
  - Complex multi-transaction scenarios

- **API Tests** (`__tests__/api.balance.test.ts`):
  - Correct response shape
  - Balance computation from ledger
  - Graceful handling of invalid input
  - Feature flag behavior

- **E2E Tests** (`tests-e2e/balance-ssot.spec.ts`):
  - Initial zero balance display
  - Deposit flow updates balance card
  - Activity entry appears after deposit
  - Withdraw page shows current balance

## **Files Changed**

```
apps/frontend/
├── lib/
│   ├── state/
│   │   ├── balance.ts          # Ledger projection function
│   │   └── balance.mode.ts     # Feature flag configuration
│   └── hooks/
│       └── useBalance.ts       # Canonical balance hook
├── app/
│   ├── api/balance/route.ts    # Balance API endpoint
│   └── (app)/
│       ├── dashboard/page.tsx  # Refactored to use useBalance()
│       ├── deposit/page.tsx    # Records transactions in ledger
│       └── withdraw/page.tsx   # Uses useBalance(), records in ledger
├── config/env.ts               # Added BALANCE_FROM_LEDGER type
├── __tests__/
│   ├── balance.projection.test.ts
│   └── api.balance.test.ts
└── tests-e2e/
    └── balance-ssot.spec.ts

env/templates/frontend.env.schema  # Added BALANCE_FROM_LEDGER
```

## **Balance Projection Rules**

| Transaction Type | Status    | Effect on Balance                      |
|-----------------|-----------|----------------------------------------|
| DEPOSIT         | CONFIRMED | +amount to `available` and `total`     |
| DEPOSIT         | PENDING   | +amount to `pending` and `total`       |
| DEPOSIT         | FAILED    | No effect (reversal)                   |
| WITHDRAW        | CONFIRMED | -amount from `available` and `total`   |
| WITHDRAW        | PENDING   | -amount from `available`, shown in `pending` |
| WITHDRAW        | FAILED    | No effect (reversal)                   |

## **Acceptance Criteria** ✅

- [x] All balance displays sourced via canonical balance endpoint/hook using ledger-derived data only
- [x] Single authoritative backend code path for balance computation
- [x] Feature flag (`NEXT_PUBLIC_BALANCE_FROM_LEDGER`) with documented rollback
- [x] Unit tests for deposits, withdrawals, reversals/failed tx
- [x] API tests for /api/balance shape and values
- [x] E2E: Deposit flow changes balance card and shows activity entry
- [x] CI envs use mock/fixed modes (no live networks)

⸻


