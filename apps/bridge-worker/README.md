# HedgrOps Read-Only Institutional Evidence Bridge

Status: Class A informational support implementation
Mode: READ_ONLY
Runtime: Cloudflare Worker

## Purpose

This Worker exposes the allowlisted Repo Authority Projection and Hedgr review evidence snapshots for existing HTTP clients. The local `BRIDGE-MCP-001` branch adds an authenticated MCP interface for the migrated plugin. It has not been deployed or connected.

## Local MCP compatibility work (`BRIDGE-MCP-001`)

`POST /mcp` has a stateless Streamable HTTP handler with exactly four no-argument tools: `authority_projection`, `latest_weekly_review`, `latest_mvp_process_review`, and `review_index`. Each uses the corresponding canonical route in the existing `ALLOWED_FILES` mapping. The MCP result carries the entire Bridge envelope and original snapshot; error results carry `authorizing: false`, `freshness: UNKNOWN`, and `coverage: INSUFFICIENT`.

The RAP generator remains the source-integrity enforcement point. At MCP retrieval time, `validateResponseEnvelope` rechecks the retrieved RAP's source revisions, mandatory coverage, freshness, conflicts, provenance and read-only fields. Review snapshots have their existing evidence-only qualifiers checked. No MCP call regenerates evidence. The review snapshots do not declare a TTL, so their `generated_at` values remain visible and are not relabeled as current authority.

The Worker uses `@cloudflare/workers-oauth-provider` to validate its own opaque, 15-minute bearer tokens against KV, bind them to the exact MCP resource, and reject missing or expired tokens. A protected handler additionally checks the `evidence:read` scope and the Founder subject. `/authorize` stores short-lived browser/state/PKCE/nonce records in KV; `/callback` exchanges the Access code and verifies the upstream signed ID token against the configured JWKS, issuer, audience, expiry and nonce before issuing an MCP authorization code. Only ChatGPT redirect URI forms are accepted in dynamic client registration. There is no mock verifier, bypass, refresh grant or legacy API-key fallback on `/mcp`. The existing GET routes retain their API-key and HTTP-method behavior.

**Repository-review hold:** Distinct Verifier review of local checkpoint `3f9e2eb` found that KV read-then-delete does not establish strict single use for consent, callback state or authorization codes under concurrent requests and eventually consistent reads. The provider permits an omitted token-request `redirect_uri` with PKCE, and the current consent page does not identify the registered client. These are unresolved review findings, not passed security checks. Do not mark this work QA approved, merge, configure or deploy it pending a separate design disposition.

### Owner setup sheet — subsequent connection gate

The observed existing Worker is `hedgrops-bridge` at `https://hedgrops-bridge.hedgr.workers.dev`. This branch reconciles the local `wrangler.toml` name to that service; it does not deploy it. The owner must confirm that host before applying any configuration. The Worker callback for the **Cloudflare-side** OIDC SaaS application is exactly `https://hedgrops-bridge.hedgr.workers.dev/callback`. The MCP resource is exactly `https://hedgrops-bridge.hedgr.workers.dev/mcp`; the Worker-side OAuth issuer is the origin `https://hedgrops-bridge.hedgr.workers.dev`.

1. In the Cloudflare account that owns this Worker, set up or confirm a Zero Trust organization and authentication domain and a supported sign-in identity provider. Create a **Cloudflare Access for SaaS OIDC** application, with its redirect URI set to the Worker callback above. Add a policy allowing only the explicitly approved Founder login identity; deny everyone else. Do not broaden unrelated account policies. Confirm that the Access OIDC ID token's stable `sub` is the Founder value to be configured below.
2. Copy the SaaS application's **Access-issued** OIDC issuer, authorization endpoint, token endpoint, JWKS endpoint, client ID and client secret from Cloudflare's configuration. Verify the issuer and endpoints against that application's OIDC configuration document, `https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/sso/oidc/<client-id>/.well-known/openid-configuration`; do not use the upstream sign-in provider's endpoints. The non-secret Worker variables are `MCP_RESOURCE`, `MCP_ALLOWED_SUBJECT`, `ACCESS_ISSUER`, `ACCESS_AUTHORIZATION_URL`, `ACCESS_TOKEN_URL`, `ACCESS_JWKS_URL`, and `ACCESS_CLIENT_ID`. The two secret names are `ACCESS_CLIENT_SECRET` and the existing `GITHUB_TOKEN`; the existing `HEDGROPS_BRIDGE_API_KEY` remains separate for legacy clients. The Owner enters secret values directly in the Cloudflare Worker secret UI or `wrangler secret put` only when that later gate is approved. Never put values in chat, repository files, plugin files, logs, or test output.
3. Establish `MCP_ALLOWED_SUBJECT` before enabling the Worker: the owner authenticates as the approved Founder through the selected Access identity provider and identifies that exact account's Access user ID through owner-controlled Cloudflare identity records. Cloudflare documents this user ID as the Access JWT `sub`; do not infer it from email or a decoded but unverified token. When an Access for SaaS ID token is available to the owner through an approved test flow, verify its signature with the application's JWKS and check its exact issuer, client-ID audience, nonce and expiry in an owner-controlled environment before confirming the same `sub`. If the value cannot be established or differs, leave `MCP_ALLOWED_SUBJECT` unset and stop; the Worker remains closed. Do not add a bootstrap bypass, log the token or subject, or send either in chat.
4. The current code expects an `OAUTH_KV` binding for OAuth client, grant, token and short-lived state records, but the distinct review found KV alone insufficient to prove strict single use. Do not create or bind storage until the material design is decided. This branch contains no namespace ID, production binding or live credential value. Check the account plan, storage needs and any cost before creating a resource; no paid commitment is approved.
5. The Worker publishes `/.well-known/oauth-protected-resource/mcp`, `/.well-known/oauth-authorization-server`, `/authorize`, `/oauth/token`, and `/oauth/register`. The later **ChatGPT-side** OAuth redirect is distinct from the Cloudflare application callback: use the exact URI supplied by ChatGPT's connection UI at registration. This implementation accepts the documented `https://chatgpt.com/connector_platform_oauth_redirect` and `https://chatgpt.com/connector/oauth/{callback_id}` forms; it never sends Access credentials to ChatGPT. ChatGPT's OAuth client uses dynamic registration, authorization code with PKCE S256, the exact `resource` URI and `evidence:read` scope. Each of the four tool descriptors declares that scope.

If any required binding, value, origin match, signature or identity check is absent or invalid, the new path fails closed. The owner must not activate a connection until the review blockers are resolved and a separate governed merge/rebind, deployed-version verification, and protected live check are approved. Keep the existing restricted GitHub contents credential server-side. Relevant guidance: [Cloudflare Access for SaaS MCP](https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/secure-mcp-servers/), [Access OIDC application and issuer](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/generic-oidc-saas/), [Access user identity](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/application-token/), [Workers OAuth provider](https://github.com/cloudflare/workers-oauth-provider), [Workers KV consistency](https://developers.cloudflare.com/kv/concepts/how-kv-works/), [Workers KV pricing](https://developers.cloudflare.com/workers/platform/pricing/), and [OpenAI plugin authentication](https://developers.openai.com/plugins/build/auth).

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

The pinned Wrangler version requires Node.js 22 or later for the dry run. A dry run bundles locally and does not deploy. For local rollback, revert only this ticket's OAuth source, dependencies, tests, name correction and operator notes, then regenerate the RAP from the reverted source commit. If a live deployment is later separately approved, restore the last verified Worker version and remove only the MCP-specific Access/OAuth configuration under owner control. Keep the legacy routes and credentials intact.

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
