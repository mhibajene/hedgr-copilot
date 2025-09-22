
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
