# HedgrOps Read-Only Institutional Evidence Bridge

Status: Class A informational support implementation
Mode: READ_ONLY
Runtime: Cloudflare Worker

## Purpose

This Worker exposes the allowlisted Repo Authority Projection and Hedgr review evidence snapshots for HedgrOps Custom GPT Actions.

## Phase 0 contract foundation

`BRIDGE-P0-001` adds canonical, dependency-free contract artifacts under:

- `contracts/phase0/` — JSON Schemas, the Bridge-specific policy declaration, the initial allow-listed authority-source declaration, and deterministic validation utilities;
- `tests/fixtures/phase0-contract-fixtures.mjs` — representative valid and fail-closed fixtures; and
- `tests/phase0-contracts.test.mjs` — deterministic schema, provenance, revision, freshness, coverage, conflict, precedence, and failure tests.

Architecture principle: `docs/decisions/0026-hedgrops-bridge-read-only-institutional-evidence-infrastructure.md`. Detailed contract: `docs/ops/bridge/HEDGROPS_BRIDGE_CAPABILITY_CONTRACT.md`.

The Phase 0 schemas and validator now govern the build-time Repo Authority Projection produced by active `BRIDGE-P1-001`. The Worker does not load repo authority sources or generate the RAP at request time.

The governing Phase 1 specification is `docs/ops/bridge/HEDGROPS_BRIDGE_PHASE1_AUTHORITY_INTEGRITY_PLAN.md`. Founder dispositions F1–F8 and locked residuals R1–R5 apply.

## Phase 1 Repo Authority Projection

`docs/ops/bridge/repo-authority-projection.json` is generated deterministically from one full git commit SHA by:

```bash
pnpm --filter @hedgr/bridge-worker rap:generate
pnpm --filter @hedgr/bridge-worker rap:check
```

The generator consumes only `docs/ops/HEDGR_STATUS.md`, `AGENTS.md`, `docs/decisions/SPRINT-2-ADR-INDEX.md`, and `docs/doctrine/HEDGR_ACTIVE_DOCTRINE_INDEX.md`. It performs no globbing, recursive scan, external retrieval, or runtime discovery. Missing explicit fields, source disagreement, or revision inconsistency fails closed.

The Worker maps `/authority`, `/authority-summary`, `/current-status`, and `/hedgr/status/authority-summary` to the generated RAP. Route names remain stable; no competing authority endpoint was added.

**Deprecated legacy placeholder:** `docs/ops/bridge/current-status.json` remains the legacy placeholder dated **2026-06-24**. It is not a Repo Authority Projection and is no longer mapped by authority routes after the Phase 1 cutover. It remains in-repo for at least 14 calendar days after the RAP is first deployed and served on all three compatibility routes. Retirement requires a separately named Founder-authorized ticket. Do not date-bump or silently remove it.

At runtime the Worker only retrieves hard-allowlisted generated or static JSON artifacts from `docs/ops/bridge/`. It does not generate snapshots, parse markdown, summarize reviews, browse arbitrary paths, infer governance state, activate tickets, sequence work, or mutate repository state.

## Endpoints

- `GET /`
- `GET /health`
- `GET /authority`
- `GET /authority-summary`
- `GET /current-status`
- `GET /weekly-review`
- `GET /hedgr/status/authority-summary`
- `GET /hedgr/reviews/latest-weekly`
- `GET /hedgr/reviews/latest-mvp-process`
- `GET /hedgr/reviews/index`

`/` and `/health` are public diagnostic routes. All snapshot routes require:

```text
x-hedgrops-api-key: <HEDGROPS_BRIDGE_API_KEY>
```

The short snapshot aliases map to the same allowlisted static files as the canonical `/hedgr/...` routes. They do not enable dynamic path lookup or arbitrary repository browsing.

## Required Environment Variables

- `HEDGROPS_BRIDGE_API_KEY` - bridge request key
- `GITHUB_OWNER` - repository owner
- `GITHUB_REPO` - repository name
- `GITHUB_BRANCH` - branch to read
- `GITHUB_TOKEN` - read-only token with contents access only

The token must be read-only and scoped to exact repository contents access. The Worker uses a hardcoded route-to-file allowlist and can only retrieve the snapshot files named in `src/index.js`.

## Local Verification

```bash
pnpm --filter @hedgr/bridge-worker test
```

## Deployment Notes

Set Worker secrets through Cloudflare, not repo files:

```bash
wrangler secret put HEDGROPS_BRIDGE_API_KEY
wrangler secret put GITHUB_TOKEN
```

Set non-secret environment values in the Cloudflare dashboard or equivalent deployment configuration:

```text
GITHUB_OWNER
GITHUB_REPO
GITHUB_BRANCH
```

Do not add `.env` files or hardcoded secrets.

## Governance Boundary

Every successful snapshot response includes:

```json
{
  "mode": "READ_ONLY",
  "execution_authority": false,
  "mutation_allowed": false,
  "ticket_activation_allowed": false,
  "sequencing_allowed": false
}
```

This bridge is evidence retrieval only. It does not create implementation, sequencing, ticket activation, repo mutation, custody, rails, deposits, withdrawals, ledger, treasury, Copilot execution, Class C automation, or customer fund movement authority.
