# HedgrOps Bridge Verification

## Local Test Coverage

Run:

```bash
pnpm --filter @hedgr/bridge-worker test
```

The test suite verifies:

- `GET /health` returns runtime-only status and does not call GitHub
- snapshot routes require a valid `x-hedgrops-api-key`
- missing API key returns `401`
- invalid API key returns `401`
- unknown route returns `404`
- non-GET method returns `405`
- snapshot retrieval uses the hard route-to-file allowlist
- successful snapshot responses include the required read-only envelope
- missing GitHub configuration fails closed

## Governance Verification

Successful snapshot responses must include:

```json
{
  "mode": "READ_ONLY",
  "execution_authority": false,
  "mutation_allowed": false,
  "ticket_activation_allowed": false
}
```

The Worker must not:

- implement POST, PUT, PATCH, or DELETE behavior
- accept dynamic file paths
- use query strings for file selection
- browse arbitrary repository paths
- parse markdown
- summarize review content
- infer active ticket state
- name next work
- mutate repo state
- create ADRs or governance authority
