# HedgrOps Bridge Phase 0 contracts

These artifacts are the canonical, machine-readable foundation for `BRIDGE-P0-001`. They are intentionally unused by the live Worker.

## Contract map

- `response-envelope.schema.json` — common read-only envelope and closed authority, freshness, and coverage enums
- `repo-authority-projection.schema.json` — closed material-field map for a future source-bound Repo Authority Projection
- `provenance.schema.json` — reusable field-level provenance contract
- `source-manifest.schema.json` — allow-listed mandatory/optional source declaration and revision/freshness state
- `conflict-record.schema.json` — attributable unresolved conflict record with no resolution fields
- `fail-closed-error.schema.json` — deterministic non-authorizing failure result
- `phase0-policy.json` — closed enums, Bridge-only conflict precedence, unresolved TTL configuration, and canonical concepts
- `initial-authority-source-manifest.json` — declaration of the initial mandatory authority set; it does not load or validate those sources
- `validate.mjs` — dependency-free deterministic validation used only by Phase 0 tests

Fixtures live at `apps/bridge-worker/tests/fixtures/phase0-contract-fixtures.mjs`; tests live at `apps/bridge-worker/tests/phase0-contracts.test.mjs`.

## Phase 1 source-bound generator

`BRIDGE-P1-001` adds the dependency-free build-time generator at `apps/bridge-worker/scripts/generate-repo-authority-projection.mjs`. It consumes only the four mandatory paths locked by Phase 1: `HEDGR_STATUS.md`, `AGENTS.md`, the accepted ADR index, and the canonical active doctrine index. Sources are loaded from one full git commit SHA with no globbing, recursive scan, runtime discovery, or external retrieval.

The generator reuses this directory's validator and closed schemas. Missing explicit records, incomplete sources, mixed or non-immutable revisions, and authority disagreements fail closed. Conflict precedence classifies the sources but never resolves the disagreement.

The generator foundation does not by itself change the Worker route allow-list. Runtime cutover requires a generated artifact bound to a durable merged revision and the separately reviewed mapping change authorized by `BRIDGE-P1-001` R5.

## Failure semantics

A future Repo Authority Projection may be `CURRENT` only when every mandatory source is included, readable, structurally valid, current under the governed policy, and bound to the common immutable revision. Missing, unreadable, stale, structurally invalid, revision-mismatched, or conflicting mandatory context fails closed with `UNKNOWN` freshness and `INSUFFICIENT` coverage.

Optional omissions may produce `PARTIAL` coverage only when the omission and reason are explicit. No fallback inference is permitted.

Bridge-specific source precedence classifies the stronger and lower-precedence sides of a conflict. It does not select a winner, synthesize a value, recommend a correction, or redefine global doctrine precedence. Recency alone cannot clear a conflict.

No arbitrary time-to-live is defined. `phase0-policy.json` records TTL as unresolved configuration until a later repo-native decision supplies one.

## Runtime and phase boundary

`apps/bridge-worker/src/index.js` and `apps/bridge-worker/openapi.yaml` do not import or reference this directory. Phase 0 adds no endpoint, route, action schema, source loading, snapshot generation, runtime allow-list entry, general-purpose search, mutation, activation, sequencing, evidence acceptance, product judgment, architecture judgment, or customer-money capability.

Phase 1 and every later phase require separate Founder approval and explicit `HEDGR_STATUS.md` §7 / §7a activation.

## Rollback

Remove this directory, its fixtures/tests, and its README references; then rerun existing Worker and snapshot tests and confirm runtime files remain unchanged. ADR 0026 remains historical. Reversing the architectural principle requires a superseding ADR.
