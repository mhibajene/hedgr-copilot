# HedgrOps Read-Only Review Evidence Bridge

Status: Class A informational support implementation
Mode: READ_ONLY
Runtime: Cloudflare Worker

## Purpose

This Worker exposes allowlisted Hedgr review evidence snapshots for HedgrOps Custom GPT Actions.

It only retrieves static JSON snapshots from `docs/ops/bridge/*.json`. It does not generate snapshots, parse markdown, summarize reviews, browse the repo, infer governance state, activate tickets, sequence work, or mutate repository state.

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
  "ticket_activation_allowed": false
}
```

This bridge is evidence retrieval only. It does not create implementation, sequencing, ticket activation, repo mutation, custody, rails, deposits, withdrawals, ledger, treasury, Copilot execution, Class C automation, or customer fund movement authority.
