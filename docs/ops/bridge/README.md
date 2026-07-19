# HedgrOps Read-Only Institutional Evidence Bridge Artifacts

Status: Class A informational support layer
Mode: READ_ONLY
Authority: Non-authoritative evidence retrieval only

## Purpose

This directory holds the generated Repo Authority Projection and static review-evidence snapshots served by the HedgrOps read-only institutional evidence bridge.

The snapshots are retrieval artifacts only. They do not create authority, activate tickets, set sequencing, close blockers, authorize implementation, or permit repo mutation.

## Adopted Capability Contract

The governing documentation contract for the Bridge's proposed evolution into a read-only institutional evidence layer is:

- `docs/ops/bridge/HEDGROPS_BRIDGE_CAPABILITY_CONTRACT.md`

The refined historical proposal is preserved at:

- `docs/ops/bridge/PROPOSED_HEDGROPS_BRIDGE_CAPABILITY_CONTRACT.md`

Contract adoption establishes evidence-observability boundaries only. It does not change the current snapshot runtime, activate Phase 0 or any later phase, add endpoints or routes, implement schemas or generators, widen retrieval, authorize mutation, accept evidence, sequence tickets, or create product, architecture, founder-disposition, financial-execution, or customer-money authority.

## Phase 0 contract and schema foundation

`BRIDGE-P0-001` completed under `HEDGR_STATUS.md` §6f.6 / §7 / §7a / §140 / closeout §141 and implements only the unused-at-runtime foundation authorized for Phase 0.

Canonical locations:

- Architecture ADR: `docs/decisions/0026-hedgrops-bridge-read-only-institutional-evidence-infrastructure.md`
- Detailed adopted contract: `docs/ops/bridge/HEDGROPS_BRIDGE_CAPABILITY_CONTRACT.md`
- Machine-readable contracts and policy: `apps/bridge-worker/contracts/phase0/`
- Initial allow-listed authority-source declaration: `apps/bridge-worker/contracts/phase0/initial-authority-source-manifest.json`
- Deterministic fixtures: `apps/bridge-worker/tests/fixtures/phase0-contract-fixtures.mjs`
- Validation tests: `apps/bridge-worker/tests/phase0-contracts.test.mjs`

The source manifest is a declaration only. Phase 0 does not load `HEDGR_STATUS.md`, `AGENTS.md`, ADRs, doctrine, or any other source at runtime. A null common revision and `NOT_EVALUATED` source states fail closed if evaluated; they do not imply completeness.

Freshness and coverage remain closed enums. No time-to-live is invented: the policy records TTL as unresolved configuration. Precedence is limited to Bridge conflict classification and never resolves a conflict or redefines global doctrine precedence.

The Phase 0 validator returns deterministic non-authorizing errors for missing, unreadable, stale, structurally invalid, revision-mismatched, conflicting, unsupported, or improperly inferred inputs. Optional omissions may produce `PARTIAL` only when the omission is explicit and no fallback inference is used.

### Phase 1 implementation (completed)

`BRIDGE-P1-001` is **completed** (**§154**; PRs **#306** / **#307**). Governing specification remains:

- `docs/ops/bridge/HEDGROPS_BRIDGE_PHASE1_AUTHORITY_INTEGRITY_PLAN.md`

### Phase 1 ops / reliability (active)

`BRIDGE-P1-OPS-001` is **active** under Controlled Parallelism v11 (`HEDGR_STATUS.md` §6f.11 / §7 / §7a / §158; Internal **D-047**), continuing unchanged from its historical activation under **D-045** / §155. Scope: record RAP first-serve / R1 clock evidence, harden regen/verification hygiene, retain Deprecated legacy through at least **2026-08-02**. No Phase 2. No legacy retirement under this ticket. Lanes V (`CLASS-A-VAL-002`) and N (`NARRATIVE-002`) remain independent.

The canonical R1 compatibility record is `phase1-r1-compatibility-record.json`:

- canonical first-serve date: **2026-07-19**, anchored to RAP route-cutover PR **#307** (merge commit `d2a83ce3a7ddff71e3c60f0a8e93624c7f5c0965`);
- public post-cutover Worker observation: **2026-07-19T12:47:05.253Z**, `READ_ONLY`, with the compatibility route index present and protected authority access requiring an API key;
- compatibility floor: **14 calendar days**;
- earliest legacy retirement consideration: **2026-08-02**;
- legacy posture: **Deprecated and retained**, SHA-256 `181dfa46feb0f25149b81cc17516cce0efc89eab95d3e30e9f2b82affcc1fc2a`;
- retirement: **not authorized** under this ticket and requires a separately named Founder-authorized ticket.

The public observation establishes deployment of the post-cutover Worker surface. No valid local Bridge API key was available for an authenticated live RAP payload check; RAP-only authority mapping is therefore confirmed by the committed Worker allow-list and hermetic tests. The date-only R1 floor does not itself authorize retirement on **2026-08-02**.

### Phase 1 Repo Authority Projection cutover

`repo-authority-projection.json` is the deterministic, source-bound Phase 1 RAP. It is generated from one full git commit SHA and validated against the Phase 0 contracts. The four mandatory sources are `HEDGR_STATUS.md`, `AGENTS.md`, the accepted ADR index, and `HEDGR_ACTIVE_DOCTRINE_INDEX.md`; source loading is an exact build-time allow-list with no globbing, recursive scan, request-time generation, or external retrieval.

After the Phase 1 cutover, `/authority`, `/authority-summary`, `/current-status`, and `/hedgr/status/authority-summary` serve the RAP. Existing route names are preserved. Every material field carries source path, stable section locator, immutable revision, source classification, and freshness. The envelope remains read-only and non-authorizing, including `sequencing_allowed: false`.

Generate and verify with:

```bash
pnpm bridge:rap:generate
pnpm bridge:rap:check
```

`pnpm bridge:rap:generate` binds the RAP to the current committed mandatory-source revision; mandatory authority sources must be committed first. `pnpm bridge:rap:check` verifies byte-deterministic generation for the recorded immutable revision and fails when the working mandatory-source set no longer matches that revision. The root `pnpm run validate` gate runs `bridge:rap:check` before snapshot and test gates.

`current-status.json` is **Deprecated** from the first deployed RAP serve. It remains the legacy bounded placeholder with `generated_at: 2026-06-24T00:00:00.000Z`; it is not regenerated, date-bumped, presented as a RAP, or mapped by authority routes after cutover. R1 requires retention for at least 14 calendar days after the RAP is first deployed and served on `/authority`, `/authority-summary`, and `/current-status`. Retirement requires a separately named Founder-authorized ticket and a recorded first-serve date.

### Runtime boundary and rollback

The Worker serves the generated RAP but does not import repo markdown, load source files dynamically, or run the generator at request time. Review-evidence routes remain unchanged.

Phase 2 and later phases require separate Founder approval and repo-native §7 / §7a activation. Phase 1 authority transport does not imply product-learning capability, readiness, evidence acceptance, or sequencing authority.

Phase 1 cutover rollback is a single revert of the generated artifact, Worker mapping, cutover tests, and cutover documentation. The deterministic generator foundation remains intact and dormant. The prior static serve may be restored only as the explicitly Deprecated placeholder, never as CURRENT RAP. Phase 0 contracts and ADR 0026 remain intact.

The adopted runtime terminology is **HedgrOps Read-Only Institutional Evidence Bridge**. The runtime remains bounded to hard-allowlisted generated authority and static review-evidence artifacts.

## Snapshot Files

- `repo-authority-projection.json` - deterministic source-bound Repo Authority Projection served by existing authority routes
- `current-status.json` - Deprecated legacy bounded status placeholder (`generated_at` **2026-06-24**); retained for the R1 compatibility period; not served as RAP and not refreshed by `pnpm bridge:snapshots:refresh`
- `phase1-r1-compatibility-record.json` - non-authorizing first-serve / compatibility-floor evidence for `BRIDGE-P1-OPS-001`; does not authorize retirement
- `latest-weekly-review.json` - latest weekly review evidence pointer
- `latest-mvp-process-review.json` - latest MVP process review evidence pointer
- `review-index.json` - evidence-discovery index
- `HEDGROPS_BRIDGE_PHASE1_AUTHORITY_INTEGRITY_PLAN.md` - governing Phase 1 implementation specification; non-authorizing without §7 / §7a activation

## Repo-native review command handoff

Review-generation operator commands live under:

- `.cursor/commands/weekly-review.md`
- `.cursor/commands/mvp-process-review.md`
- `.cursor/commands/bridge-snapshot-refresh-handoff.md`

After generating weekly or MVP process reviews, operators should refresh and check static bridge snapshots using:

```bash
pnpm bridge:snapshots:refresh
pnpm bridge:snapshots:check
```

These commands and snapshots remain operator-support evidence only. They do not create authority, activate tickets, sequence implementation, or alter bridge runtime behavior.

## Governance Boundary

The bridge and these files remain subordinate to:

- `docs/ops/HEDGR_STATUS.md`
- `AGENTS.md`
- accepted ADRs
- `docs/doctrine/*`
- `docs/ops/bridge/HEDGROPS_BRIDGE_CAPABILITY_CONTRACT.md` for the adopted Bridge evidence-observability contract
- `docs/ops/reviews/README.md`

Reviews remain evidence, not direction. These snapshots must not be used as implementation authority.

## Review Use Boundary

When weekly reviews cite bridge snapshots, bridge runtime work, command files, or other support infrastructure, reviewers must preserve the authority distinction required by `docs/ops/reviews/README.md`.

Classify the material as one of:

- recorded as a completed ticket in `docs/ops/HEDGR_STATUS.md`
- mirrored or reconciled in `docs/ops/HEDGR_STATUS.md`
- closed through local verification or closeout evidence
- included as merged support evidence only
- excluded as draft, review-draft, in-progress, or non-authorizing material

A snapshot refresh, bridge response, command prompt, or local verification file is evidence only. It does not activate tickets, sequence implementation, or widen authority unless repo-native authority explicitly says so.
