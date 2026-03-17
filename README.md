# Hedgr Copilot

Hedgr Copilot is a monorepo for Hedgr's developer tooling and web app surfaces. It's optimized for **Doppler-first config**, **fork-safe CI**, and **lean validation** (test/typecheck/lint).

## Repo layout
```
.
├─ apps/
│  └─ frontend/         # Next.js (Pages Router), API routes, Vitest, ESLint v9 flat config
└─ packages/
   └─ ui/               # Shared UI package (workspace dependency)
```

## Requirements
- Node 20 with **Corepack** (pnpm managed via Corepack)
- **Doppler** CLI (source of truth for env/secrets)
- Docker (optional, for `dev:docker`)

### Doppler setup (once)
```bash
doppler login
doppler setup -p hedgr-copilot -c dev_config_dev
```

## Development

### Quick scripts
```bash
pnpm run dev:cli       # run frontend (Doppler-provided env)
pnpm run dev:docker    # run via docker compose (frontend)
pnpm run validate      # test + typecheck + lint for the whole workspace
```

See `docs/local-dev.md` for Doppler setup and observability toggles.

## Observability (dev-safe)
- Default: off in all envs.
- Dev-only enable: NEXT_PUBLIC_APP_ENV=dev and provider keys present.
- Providers: PostHog (events, session recording disabled), Sentry (errors).
Details: docs/observability.md and docs/secrets.md.

## Health checks (for QA/automation)
- GET /api/health → 200 { status: "ok", ts: "<ISO>" }
- GET /api/version → 200 { version: "<apps/frontend package version>" }

## QA / CI quick checks
```bash
pnpm -w test       # Vitest (unit)
pnpm -w typecheck  # TS (app + tests)
pnpm -w lint       # ESLint v9 flat config
pnpm run validate  # test + typecheck + lint (aggregator)
```

CI includes a version guard to block latest/* ranges. See .github/workflows/ and scripts/ci/guard-no-latest.mjs.
QA process: docs/qa-checklist.md. New PRs auto-use .github/pull_request_template.md.

## Security
- No .env* in git. Doppler is the source of truth.
- No PII in telemetry; PostHog properties sanitized; Sentry beforeSend scrubs PII.

## Contributing
- Open a branch, push, and create a PR.
- Pass validate and check the QA checklist.
- Follow repo coding standards (TypeScript, tests with Vitest, ESLint v9).

### How PRs get merged
- **Auto-merge enabled**: PRs automatically merge once all conditions are met
- **Required checks**: Fork-safe CI, E2E tests, and at least 1 approving review
- **Branch protection**: Must be up-to-date with main branch
- **Pre-merge validation**: Run `pnpm run validate` and `pnpm --filter @hedgr/frontend run e2e:ci` locally before creating PRs

## License
TBD.

# Hedgr Copilot

Hedgr Copilot is the monorepo for **Hedgr’s stability wallet surfaces, trust layer, policy layer, and supporting developer infrastructure**.

Hedgr is positioned as a **Global Stability Wallet** built around the **Hedgr Stability Engine**.
This repository contains the implementation surfaces, shared packages, CI guardrails, and doctrine needed to build the system in a disciplined, trust-first way.

---

## What this repo is for

This repo supports the current Hedgr build across four layers:

- **Product surfaces** — wallet and supporting application flows
- **System controls** — policy, trust, and stability-engine-facing logic
- **Developer infrastructure** — CI, validation, workflow guardrails, and local tooling
- **Doctrine** — architecture, ADRs, system specifications, and operating rules

This is not just a frontend repo. It is the working monorepo for Hedgr’s product and system implementation.

---

## Product framing

Hedgr is a **stability system**, not a speculation product.

The platform is designed to help users in volatile currency environments:

- preserve purchasing power
- understand allocation and stability posture
- interact with a trust-first financial interface
- access future stability infrastructure through multiple product surfaces

The long-term platform architecture includes:

- **Hedgr Wallet** — consumer stability wallet
- **Hedgr Pro** — treasury platform for SMEs and professional users
- **Hedgr APIs** — infrastructure layer for partners and fintech platforms

The current repository primarily reflects the MVP and active sprint implementation scope.

---

## Repo layout

```text
.
├─ apps/
│  ├─ frontend/        # Next.js app surfaces, API routes, Vitest, Playwright, ESLint
│  └─ backend/         # Flask backend service boundary
├─ packages/
│  ├─ ui/              # Shared UI package
│  └─ config/          # Shared config surface
├─ docs/
│  ├─ doctrine/        # Canonical doctrine, whitepapers, product/system specifications
│  ├─ decisions/       # ADRs and decision records
│  ├─ architecture/    # Architecture overviews and runtime constraints
│  ├─ contracts/       # API / UI contract references
│  ├─ copilot/         # Copilot-specific documentation and trust model
│  ├─ ops/             # CI, local dev, observability, runbooks
│  └─ modules/         # Module-level documentation
├─ scripts/            # CI guard scripts and validation helpers
├─ .cursor/            # Cursor workflow rules, prompts, and settings
├─ .github/            # CI workflows, PR templates, automation
├─ .cursorrules        # Doctrine / architecture / anti-drift authority
└─ AGENTS.md           # Repo execution standard
```

---

## Governance hierarchy

The repo is governed through a layered control model:

1. **`.cursorrules`** — doctrine, architecture, UX / policy posture, anti-drift rules
2. **`.cursor/rules.md`** — patch execution guardrails
3. **`AGENTS.md`** — repo workflow, CI posture, engineering conventions
4. **PR templates / local workflow docs** — review and operating support

Canonical doctrine lives primarily in:

- `docs/doctrine/`
- `docs/decisions/`

If implementation and doctrine conflict, doctrine wins.

---

## Current architecture posture

The repo follows a **trust-first, policy-aware, doctrine-constrained** implementation model.

Important current posture:

- the **Hedgr Stability Engine** is the system center
- the active sprint keeps the engine **read-only and informational** unless superseding doctrine changes that posture
- allocation bands are **informational**, not accounting truth, unless doctrine explicitly states otherwise
- runtime policy and trust constraints are first-class control layers
- CI and E2E must remain **hermetic**

For exact doctrine, see:

- `docs/doctrine/hedgr-stability-engine.md`
- `docs/doctrine/hedgr-system-overview.md`
- `docs/doctrine/hedgr-product-surfaces.md`
- `docs/doctrine/hedgr-mvp-project-specification.md`
- `docs/doctrine/hedgr-constitutional-charter.md`
- `docs/decisions/SPRINT-2-ADR-INDEX.md`

---

## Requirements

- Node 20 with **Corepack**
- **pnpm** via Corepack
- **Doppler CLI** as the canonical env / secrets source
- Docker (optional, for local container workflows)

### Doppler setup (once)

```bash
doppler login
doppler setup -p hedgr-copilot -c dev_config_dev
```

---

## Development

### Quick scripts

```bash
pnpm run dev:cli       # run app surfaces with Doppler-provided env
pnpm run dev:docker    # run via docker compose
pnpm run validate      # test + typecheck + lint for the whole workspace
```

Additional references:

- `docs/ops/local-dev.md`
- `docs/ops/observability.md`
- `docs/ops/runbook.md`

---

## Testing and validation

Core validation commands:

```bash
pnpm -w test
pnpm -w typecheck
pnpm -w lint
pnpm run validate
```

Frontend E2E:

```bash
pnpm --filter @hedgr/frontend run e2e:ci
```

Implementation rules:

- no live external dependencies in CI / E2E
- prefer mock / stub / deny-by-default posture in automated environments
- trust, policy, and disclosure behavior should be tested when touched
- behavior changes should ship with corresponding tests unless explicitly waived

CI workflows and guards live in:

- `.github/workflows/`
- `scripts/ci/`

---

## Health and diagnostic endpoints

Current frontend health endpoints include:

- `GET /api/health` → `{ status: "ok", ts: "<ISO>" }`
- `GET /api/version` → `{ version: "<apps/frontend package version>" }`

See implementation under `apps/frontend/app/api/` and `apps/frontend/pages/api/` where applicable.

---

## Observability

Observability is dev-safe and should remain trust-aware.

- default posture: off unless explicitly enabled
- dev-only enablement depends on environment and provider keys
- providers include PostHog and Sentry in constrained form
- no PII should enter telemetry

References:

- `docs/ops/observability.md`
- `docs/ops/secrets.md`

---

## Security and secrets

- Doppler is the canonical source of truth for env and secrets
- do not introduce new long-lived `.env` workflows as repo truth
- no secrets in git
- no PII in telemetry
- trust and policy checks must not be bypassed for convenience

---

## Contributing

Before opening a PR:

- run `pnpm run validate`
- run relevant tests for touched surfaces
- run frontend E2E when UI flows materially change
- confirm changes do not violate doctrine or current ADR constraints
- update docs when behavior, policy, trust posture, or architecture meaningfully changes

Review support files:

- `AGENTS.md`
- `.cursorrules`
- `.cursor/rules.md`
- `.github/PULL_REQUEST_TEMPLATE/agent.md`

---

## Merge expectations

PRs should be:

- small
- reversible
- evidenced
- aligned with doctrine

Expected merge standard:

- required checks pass
- rollback path is clear
- trust / policy impact is visible
- evidence pack is attached where applicable

---

## License

TBD.