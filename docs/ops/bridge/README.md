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

### Phase 1 ops / reliability (completed)

`BRIDGE-P1-OPS-001` is **completed** (`HEDGR_STATUS.md` §161 / Internal **D-050** / §6f.14; historical activation **D-045** / §155). Scope delivered: RAP first-serve / R1 clock evidence, regen/verification hygiene, Deprecated legacy retention through at least **2026-08-02**. No Phase 2. No legacy retirement under that ticket. Internal **D-082** / **§214** later completed `BRIDGE-LEGACY-RETIRE-001`: the live placeholder is retired; the byte-identical archive is retained; RAP-only authority routes are unchanged. Lane R is idle. Lanes V (`CLASS-A-VAL-002`) and E (`SE-REASON-001`) remain independent under Controlled Parallelism v21.

The canonical R1 compatibility record is `phase1-r1-compatibility-record.json`:

- canonical first-serve date: **2026-07-19**, anchored to RAP route-cutover PR **#307** (merge commit `d2a83ce3a7ddff71e3c60f0a8e93624c7f5c0965`);
- public post-cutover Worker observation: **2026-07-19T12:47:05.253Z**, `READ_ONLY`, with the compatibility route index present and protected authority access requiring an API key;
- compatibility floor: **14 calendar days**;
- earliest legacy retirement consideration: **2026-08-02**;
- historical R1 legacy posture: **Deprecated and retained**, SHA-256 `181dfa46feb0f25149b81cc17516cce0efc89eab95d3e30e9f2b82affcc1fc2a`;
- retirement under `BRIDGE-P1-OPS-001`: **not authorized**; later completed under Internal **D-082** / **§214** / `BRIDGE-LEGACY-RETIRE-001`.

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

`current-status.json` was **Deprecated** from the first deployed RAP serve and is now **retired** under Internal **D-082** / **§214** / `BRIDGE-LEGACY-RETIRE-001`. The live path is removed. The byte-identical archive is `archive/retired-legacy-current-status.json` (`generated_at: 2026-06-24T00:00:00.000Z`, SHA-256 `181dfa46feb0f25149b81cc17516cce0efc89eab95d3e30e9f2b82affcc1fc2a`). It is not regenerated, date-bumped, presented as a RAP, or mapped by authority routes. `/current-status` continues to serve the RAP.

### Authority legibility diagnostics

The invariant lives in the existing `AGENTS.md` Authority Model, implemented under `HEDGR_STATUS.md` §7 / §7a `AUTHORITY-LEGIBILITY-001` (dated authorisation, PR #542; permanent-main rebind, PR #543). Authority correctness and authority legibility are separate properties. **Permanent-main repo authority governs.** This README and command output are operator guidance and evidence only.

The existing RAP commands emit attributable `Authority legibility WARN:` JSON records to **stderr**, after the existing validation and artifact checks succeed. The normal stdout and generated RAP format remain unchanged. Warnings do not change exit success, create or repair authority, rewrite sources, allocate decisions, or activate tickets. A genuine current-authority conflict still fails closed with `UNRESOLVED_AUTHORITY_CONFLICT`, before hygiene reporting. Missing/invalid mandatory sources and deterministic-artifact mismatches retain their existing failure behaviour.

Each warning identifies its code, bound source revision, source path/section, reason, limitation, canonical authority to consult, `effect_on_authority: "none"`, and the action: surface to steward; consult permanent main; do not auto-repair.

| Case | Diagnostic / result | Authority effect |
| --- | --- | --- |
| Clean within the checks' coverage; source revision verifiable in locally observed main history | No warning; successful command | None; existing authorised work proceeds |
| Explicitly subordinate §2 narrative still names a Lane ticket active, while §7 lists that ticket completed and omits it from active Lane records | `SUPERSEDED_LANE_NARRATIVE`; successful command | None; steward-visible lag, no repair |
| §7 and the current AGENTS active-ticket records disagree, even if lag also exists | Existing `UNRESOLVED_AUTHORITY_CONFLICT`; command fails, no hygiene downgrade | No inferred winner; existing stop/escalation applies |
| Source revision not verifiable in locally observed `origin/main` history | `MAIN_HISTORY_UNVERIFIED`; successful command if otherwise valid | Draft/unmerged references cannot establish accepted history |

The former §2 `NARRATIVE-007` example was relocated to the [pre-Fork 1 history archive](../HEDGR_AUTHORITY_HISTORY_PRE_FORK_1.md) under §292. It is no longer live §2 source text or current `payload.fields.authority_boundaries` content, so current generation does not emit that example's `SUPERSEDED_LANE_NARRATIVE` warning. Fixed fixtures still test the diagnostic if the same narrowly recognisable lag recurs. The projected field retains its canonical `source_path`, `source_section`, immutable `source_commit`, source classification and freshness. `freshness: CURRENT` is **not** a claim that every narrative statement is current sequencing instruction, and `conflicts: []` is not a universal consistency certificate.

**Deterministic coverage:** The narrative check recognises only the §2 `Sequencing authority` field when it starts with the explicit §7 / §7a delegation sentence, its `is active and names` wording, and explicit `Completed Lane` / `Completed historical Lane` entries within §7's `Current active ticket status` block. The existing active-ticket conflict check runs first. Missing markers, unfamiliar wording, and other kinds of disagreement are not semantically interpreted as lag. An absent warning means only that no covered condition was detected; it is not a consistency certificate and never overrides an operator's duty to surface a genuine conflict.

The main-history check performs read-only local Git ancestry checks against `refs/remotes/origin/main`. It makes no live remote request and reads no additional authority documents. A missing ref, shallow history, inaccessible ancestry or outdated tracking ref can produce `MAIN_HISTORY_UNVERIFIED`; the diagnostic does not claim the commit is definitely unmerged. Successful local ancestry is also not proof that the tracking ref is current, every decision in the revision is accepted, or a ticket is active. Operators still verify permanent main through the existing governance process. Proposed decision text is not parsed into accepted history, and no next D-number is computed or reserved.

**Steward-review limits:** Arbitrary stale AGENTS prose, contradictory nested-ticket or participant-distribution wording, unmerged PR bodies, draft decision semantics and other support/review artefacts are not scanned or adjudicated. They remain explicit human/steward review concerns. The four-source allow-list, schema, validator, policy, Worker routes and financial execution classes are unchanged. Diagnostics are not stored in the RAP or served by Bridge endpoints; there is no new API, authority file, warning artefact or approval gate.

**Verification:** `apps/bridge-worker/tests/rap-generator.test.mjs` contains fixed source fixtures and disposable Git repositories covering clean output, stale narrative without source rewriting, unchanged fresh projected evidence, conflict priority, draft decision isolation, missing main history and command exit behaviour. Run `pnpm --filter @hedgr/bridge-worker test` and the existing `pnpm run validate` gates. Revert the diagnostic/operator enhancement and regenerate RAP from the applicable committed authority to restore prior deterministic behaviour; retain historical records and explicitly record any ticket revocation or closeout through the existing governance process.

**Verified delivery (2026-09-16):** PR #544 merged at `b3f08f753da671ecc7deafcd15d3fa0491b5eb3c`. All 41 Bridge tests (seven added), full repo validation, production build and 96 browser tests passed, as did required hosted checks and the automatic convergence review. The command and 41 Bridge tests were rechecked on merged main. Comparing old/new generators at the same source revision produced byte-identical RAP JSON. At that historical delivery, the §2 `NARRATIVE-007` warning was intentionally visible; §292 later archived its source text. This is bounded technical evidence, not a claim that governance is fully consistent. Ticket closeout and the separate permanent-main rebind follow the dated record in `HEDGR_STATUS.md` §6f.21 / §7a.

### Fork 2 preparation — inactive mechanical provenance

`HEDGR_STATUS.md` §293 authorises a bounded implementation exercise, **not** an active RAP procedure. The current source-first, governed PR and separate permanent-main rebind path still controls. Operating use of `.github/workflows/rap-provenance-rebind.yml` requires a separately controlled `HEDGR_RAP_FORK2_ENABLED=true` repository variable, an approved least-privilege `HEDGR_RAP_AUTOMATION_TOKEN` secret and an explicit `**Fork 2 operating status: ACTIVE**` marker in live §7. This repository does not configure the identity or either variable through the implementation. Missing credentials, missing effective authority or failed checks stop the workflow; operators use the existing governed procedure.

The pre-activation protected-branch verification gate is distinct from operating use. With Fork 2 still explicitly inactive under §7, a separately approved identity and a separately controlled `HEDGR_RAP_FORK2_TEST_TARGET` repository variable set to **one exact permanent-main commit SHA** permit only a manual `workflow_dispatch` test for that SHA. The target commit must contain only the allowed `Last updated` metadata change since the prior RAP source revision; any other classification fails the test. The workflow checks the exact SHA, inactive §7 implementation boundary and required checks before an artifact-only protected PR may merge. A rerun after main moves cannot reuse that SHA. Remove the test variable after retaining the result. A test pass is evidence for a later explicit activation decision, not activation or a standing mechanical procedure. Neither the test variable nor the token is configured by this record.

The bounded helper `node scripts/bridge/rap-provenance-rebind.mjs --plan` verifies observed permanent-main ancestry, the exact existing artifact, all four source documents, and the current generator's structural/conflict rules. It returns `no_event` when mandatory-source content is unchanged. The only automatically recognised non-material change is an otherwise byte-identical edit to the existing `Last updated: YYYY-MM-DD` line in `AGENTS.md` or `HEDGR_STATUS.md`. Any other mandatory-source difference returns `review_required` for current human governance, even if it may ultimately prove non-material. Invalid, conflicting or unbound inputs fail closed. The `--write --require-active` path can generate an artifact only for that proven metadata case and only from permanent main.

For the bounded test or later operating use, the workflow is designed to make one deterministic artifact-only PR, retain the source revision and artifact digest in the PR, wait for hosted checks and convergence, and merge through branch protection. Repeated triggers reuse an open deterministic PR or stop for inspection. The real protected-branch bot path, credential behavior and post-merge evidence remain **unverified** until the separate identity is supplied and tested; code and fixtures alone do not satisfy §293's activation conditions. A bot PR whose checks require human approval fails this test. Do not enable, rely on, or infer general non-material coverage from the dormant mechanism.

### Runtime boundary and rollback

The Worker serves the generated RAP but does not import repo markdown, load source files dynamically, or run the generator at request time. Review-evidence routes remain unchanged.

Phase 2 and later phases require separate Founder approval and repo-native §7 / §7a activation. Phase 1 authority transport does not imply product-learning capability, readiness, evidence acceptance, or sequencing authority.

Phase 1 cutover rollback is a single revert of the generated artifact, Worker mapping, cutover tests, and cutover documentation. The deterministic generator foundation remains intact and dormant. The prior static serve may be restored only as the explicitly Deprecated placeholder, never as CURRENT RAP. Phase 0 contracts and ADR 0026 remain intact.

The adopted runtime terminology is **HedgrOps Read-Only Institutional Evidence Bridge**. The runtime remains bounded to hard-allowlisted generated authority and static review-evidence artifacts.

## Snapshot Files

- `repo-authority-projection.json` - deterministic source-bound Repo Authority Projection served by existing authority routes
- `archive/retired-legacy-current-status.json` - retired byte-identical legacy bounded status placeholder (`generated_at` **2026-06-24**); not served as RAP and not refreshed by `pnpm bridge:snapshots:refresh`
- `phase1-r1-compatibility-record.json` - non-authorizing first-serve / compatibility-floor evidence from completed `BRIDGE-P1-OPS-001`; does not authorize retirement
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
