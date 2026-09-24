# HedgrOps Read-Only Institutional Evidence Bridge

Status: Class A informational support implementation
Mode: READ_ONLY
Runtime: Cloudflare Worker

## Purpose

This Worker exposes the allowlisted Repo Authority Projection and Hedgr review evidence snapshots for existing HTTP clients. The local `BRIDGE-MCP-001` branch also contains a held, fail-closed MCP transport for the migrated plugin.

## Local MCP compatibility work (`BRIDGE-MCP-001`)

`POST /mcp` has a stateless Streamable HTTP handler with exactly four no-argument tools: `authority_projection`, `latest_weekly_review`, `latest_mvp_process_review`, and `review_index`. Each uses the corresponding canonical route in the existing `ALLOWED_FILES` mapping. The MCP result carries the entire Bridge envelope and original snapshot; error results carry `authorizing: false`, `freshness: UNKNOWN`, and `coverage: INSUFFICIENT`.

The RAP generator remains the source-integrity enforcement point. At MCP retrieval time, `validateResponseEnvelope` rechecks the retrieved RAP's source revisions, mandatory coverage, freshness, conflicts, provenance and read-only fields. Review snapshots have their existing evidence-only qualifiers checked. No MCP call regenerates evidence. The review snapshots do not declare a TTL, so their `generated_at` values remain visible and are not relabeled as current authority.

**Authentication hold:** The deployable `/mcp` path returns `MCP_AUTH_NOT_CONFIGURED` for a bearer token. It does not accept the legacy `x-hedgrops-api-key`. Local tests inject a mock token verifier to exercise transport and authorization behavior. The live Worker has no OAuth provider, protected-resource metadata, token validator, or OAuth state binding in this branch, so this route is not ready for connection or deployment. The existing GET routes and their API-key behavior are unchanged.

The selected later design is Cloudflare Access for SaaS OIDC upstream of a Worker-side OAuth 2.1 provider, limited to the explicitly approved Founder identity and the `evidence:read` scope. The observed Worker Access page says a Zero Trust organization and authentication domain must be set up first. At the separate connection gate, the owner must:

1. Authorize a Zero Trust organization/domain, the chosen sign-in identity provider, and a Founder-only Access policy; create the OIDC SaaS application with a Worker `/callback` redirect and record its client ID, client secret, authorization endpoint, token endpoint and key/JWKS endpoint securely.
2. Authorize OAuth state storage such as the documented `OAUTH_KV` binding, a cookie-encryption secret, and Worker-side OAuth provider integration. The owner must assess the service and cost implications before creating these resources. Provider secrets and GitHub credentials must be stored only as Worker secrets, never in this repository, plugin files, logs or test output.
3. Publish and verify `/.well-known/oauth-protected-resource`, authorization-server discovery, `/authorize`, `/token`, `/callback`, and the selected client identification/registration endpoint. Support authorization code with PKCE S256, exact `resource` binding, bearer challenge, issuer/audience/expiry/scope validation, and Founder subject enforcement. Define the plugin's OAuth client registration method and per-tool security schemes before registration.
4. Re-run mocked auth and evidence tests, Worker dry run, then obtain separate permission for governed merge/rebind, deploy, protected live verification and ChatGPT plugin connection. Keep the existing restricted, read-only GitHub token server-side.

The documented Access example uses `ACCESS_CLIENT_ID`, `ACCESS_CLIENT_SECRET`, `ACCESS_AUTHORIZATION_URL`, `ACCESS_TOKEN_URL`, `ACCESS_JWKS_URL`, `COOKIE_ENCRYPTION_KEY` and `OAUTH_KV`; names and exact URLs must be verified against the chosen provider before wiring them. No values or binding IDs are committed here. Relevant guidance: [Cloudflare Access for SaaS MCP](https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/secure-mcp-servers/), [Cloudflare MCP authorization](https://developers.cloudflare.com/agents/model-context-protocol/protocol/authorization/), and [OpenAI plugin authentication](https://developers.openai.com/plugins/build/auth).

## Phase 0 contract foundation

`BRIDGE-P0-001` adds canonical, dependency-free contract artifacts under:

- `contracts/phase0/` — JSON Schemas, the Bridge-specific policy declaration, the initial allow-listed authority-source declaration, and deterministic validation utilities;
- `tests/fixtures/phase0-contract-fixtures.mjs` — representative valid and fail-closed fixtures; and
- `tests/phase0-contracts.test.mjs` — deterministic schema, provenance, revision, freshness, coverage, conflict, precedence, and failure tests.

Architecture principle: `docs/decisions/0026-hedgrops-bridge-read-only-institutional-evidence-infrastructure.md`. Detailed contract: `docs/ops/bridge/HEDGROPS_BRIDGE_CAPABILITY_CONTRACT.md`.

The Phase 0 schemas and validator now govern the build-time Repo Authority Projection produced by completed `BRIDGE-P1-001`. The Worker does not load repo authority sources or generate the RAP at request time.

The governing Phase 1 specification is `docs/ops/bridge/HEDGROPS_BRIDGE_PHASE1_AUTHORITY_INTEGRITY_PLAN.md`. Founder dispositions F1–F8 and locked residuals R1–R5 apply.

## Phase 1 Repo Authority Projection

`docs/ops/bridge/repo-authority-projection.json` is generated deterministically from one full git commit SHA by:

```bash
pnpm bridge:rap:generate
pnpm bridge:rap:check
```

The generator consumes only `docs/ops/HEDGR_STATUS.md`, `AGENTS.md`, `docs/decisions/SPRINT-2-ADR-INDEX.md`, and `docs/doctrine/HEDGR_ACTIVE_DOCTRINE_INDEX.md`. It performs no globbing, recursive scan, external retrieval, or runtime discovery. Missing explicit fields, source disagreement, or revision inconsistency fails closed.

The Worker maps `/authority`, `/authority-summary`, `/current-status`, and `/hedgr/status/authority-summary` to the generated RAP. Route names remain stable; no competing authority endpoint was added.

**Retired legacy placeholder:** `docs/ops/bridge/current-status.json` is retired under Internal **D-082** / **§214** / `BRIDGE-LEGACY-RETIRE-001`. The byte-identical archive is `docs/ops/bridge/archive/retired-legacy-current-status.json` dated **2026-06-24**. It is not a Repo Authority Projection and is not mapped by authority routes. Do not date-bump it or restore it as CURRENT.

## Phase 1 R1 compatibility record

`BRIDGE-P1-OPS-001` records the canonical RAP first-serve date as **2026-07-19**, anchored to route-cutover PR **#307**, and the earliest retirement-consideration date as **2026-08-02**. The machine-readable supporting-evidence record is:

```text
docs/ops/bridge/phase1-r1-compatibility-record.json
```

The record retains the legacy artifact as Deprecated, pins its SHA-256, and explicitly denies retirement, Phase 2, mutation, activation, sequencing, evidence acceptance, and cross-lane impact. The public Worker route index was observed after cutover; authenticated RAP payload observation was unavailable locally, so the committed hard allow-list and hermetic tests remain the evidence that all compatibility authority routes serve only the RAP.

RAP generation is commit-bound. Commit mandatory authority-source changes before running `pnpm bridge:rap:generate`, then run `pnpm bridge:rap:check`. Root `pnpm run validate` includes the RAP check.

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
pnpm bridge:rap:check
pnpm --filter @hedgr/bridge-worker exec wrangler deploy --dry-run
```

The pinned Wrangler version requires Node.js 22 or later for the dry run. A dry run bundles locally and does not deploy. At the later connection gate, roll back by reverting the MCP handler, route branch, dependencies and operator notes together; if a live deployment has then been separately approved, restore the last verified Worker version and remove only the MCP-specific OAuth configuration under owner control. Keep the legacy routes and their existing credentials intact.

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
