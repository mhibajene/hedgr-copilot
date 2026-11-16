## PR Posture

Repo-wide standing merge invariant (binding source: `AGENTS.md`). Target sequence:

`DRAFT` → `IMPLEMENTED` → `READY / AUTO-MERGE ARMED` → `VERIFYING` → `VERIFIED` → `MERGED`

A change to the PR head after verification returns the PR to `VERIFYING`.

### Independent verifier and exact-head-SHA binding

No implementation PR may merge to `main` until an independent verifier, distinct from the authoring/implementing role, has reported PASS against the **current** PR head SHA. Verification applies only to the SHA reviewed. Any subsequent commit invalidates the previous PASS.

Before the PR B cutover, verifier attestations are legacy PR comments with exactly one matching line:

```text
Hedgr-Verifier: PASS sha=<40-hex head sha> run=<exact-head hosted GitHub Actions E2E run URL>
```

or

```text
Hedgr-Verifier: FAIL sha=<40-hex head sha> run=<exact-head hosted GitHub Actions E2E run URL>
```

Anchored at line start. Strict form: `Hedgr-Verifier: ` then `PASS` or `FAIL`, then ` sha=` plus forty hexadecimal characters, then ` run=` plus a non-whitespace exact-head hosted GitHub Actions E2E run URL. No other line is an attestation.

`run=` is always the exact-head hosted GitHub Actions E2E run URL (`https://github.com/<owner>/<repo>/actions/runs/<run-id>`). It must identify the E2E run for the reviewed current PR head SHA; confirm that run's head and applicable E2E result before PASS. For a PR whose exact head the CI-EFF-001 classifier marks docs-only, `run=` may cite that exact-head E2E run whose E2E status carries exactly `SKIPPED (docs-only, E2E not executed) CI-EFF-001`; the Verifier must independently confirm the diff is docs-only under the recorded rule. Every other PR, including any runtime, CI, test or script change and the CI-EFF-001 implementation PR itself, requires successful full exact-head hosted E2E. A SKIPPED result is never described as executed or passed E2E. The docs-only exception takes practical effect only once the classifier is on main. A verifier session URL, local log, validate-only run, or run for another head does not satisfy this rule. Founder direction: 14 Oct 2026 16:25 AWST, HEDGR_STATUS §386.

The independent Verifier remains READ_ONLY except for one permitted write: a single attestation comment in this exact format on the PR under review for the head SHA it reviewed. The Verifier brief must explicitly permit that post. Immediately before posting, the Verifier re-reads the current PR head SHA and aborts without posting if it differs from the reviewed SHA. Implementers and stewards never post `Hedgr-Verifier:` attestations, even though all agents share the Founder's GitHub account.

### Mechanical gate (MERGE-TIERS-ACT-001 staging and cutover)

PR B stages a trusted default-branch metadata-only workflow (§471). In literal `TRANSITION_MODE = 'legacy'`, the existing OWNER/MEMBER/COLLABORATOR comment path remains the effective raw `hedgr/verifier` binder. Only one unedited matching line on the current fetched head can pass. Revocation is retained in exact-head status history: PASS must be created strictly after every recorded non-success in either `hedgr/verifier` or `hedgr/verifier-legacy`, even if a later success exists. A marker-bearing edit/delete (current or previous body), or missing edit/delete provenance, writes failure; an edited PASS never counts. Comments and status history are re-read before output. Unrelated later events cannot revive the older PASS; recovery requires a fresh unedited PASS after revocation. Legacy evidence is separately labelled under `hedgr/verifier-legacy`; it never satisfies the Iris policy or Tier 1.

The Founder alone coordinates native protection cutover and the governed literal change to `'iris'`. Then only Iris App 5653778 publishes raw `hedgr/verifier`; the workflow stops writing it. The single active ruleset `main` (26932204) must pin that context to 5653778 and require `hedgr/verifier-policy` from Actions 15368. Classic protection has no required checks (GET returns 404); old ruleset 25778284 was deleted. No classic PATCH is proposed. Preserve all other current ruleset controls, parameters and its empty bypass list. The creator **user** ID is 353659287, confirmed through the public users API; App 5653778 is Founder-confirmed. Unknown mappings fail closed. Actions policy and legacy statuses remain separately labelled. No output has a target_url. The workflow performs API metadata reads only, without checkout, PR code, PR-text script interpolation or custom secrets.

Raw schema: `v1 PASS|FAIL pr=<n> run=<id> author=<login> starter=<numeric id>`, at most 140 characters (§471 bounds); SHA comes from the exact-head status resource. Iris's opaque `run=` names her admitted verifier session; it is separate from the legacy comment's hosted E2E URL. Receipts stay private. Iris runs main's deterministic admission/publication guard with authenticated request provenance, complete signed-bot commit enumeration, one-use protected state, expiry and H/B rereads. OWNER/comment, wrong-App and stale-head statuses cannot satisfy Iris-only verification. Native pins, protected producer checks and the immediate pre-merge request/run/receipt/head reread are essential; the public workflow cannot authenticate private receipts or a local session.

Tier 1 stays OFF. Existing independent exact-head PASS, Wes same-head security sign-off and separate Founder go remain required. An interim verifier-runtime isolation risk is accepted by the Founder; details in a private receipt (MERGE-TIERS-ACT-001 SHA-256 28c61a5380abacf51065140a641b1cec4e11919ba19bdc1a46762499ecc660a2). Valid code-owner review/enforcement remains prerequisite under IDENTITY-001; no settings change, dry-run or cutover is performed by this text.

### Builder branch updates (documented; dry-run deferred)

At the governed updater transition, each owning builder App updates its own branch using an installation-authenticated API path with expected-head protection. Never use owner-authored web/update commits for Iris admission; verified allowlisted App-bot authors may use GitHub service committer web-flow/19864447. The App update-branch dry-run is separately authorised later: prove author/committer, valid signed-bot provenance and automatic checks before adopting it; no guarantee is inferred from the endpoint name. Until that evidence and Founder disposition exist, stop when an update would require unsupported provenance. Existing legacy owner-update procedures below apply only to separately dispositioned legacy completion before cutover. Final Founder merges remain distinct from PR-branch updates. Every H/B change voids review evidence and needs fresh checks, request, verification, Wes sign-off and applicable Founder go.

### Auto-merge

**Live protection precondition (§471, superseding the historical two-source assumption):** Immediately before any separately authorised merge or auto-merge action, GET the ruleset inventory, `main` ruleset **26932204** and effective main rules; retain the readback. Require active enforcement, main-only condition, no bypass actors, strict status checks, linear history, deletion/non-fast-forward prevention and review-thread resolution. Before cutover required checks are exactly validate/15368, E2E smoke (@hedgr/frontend)/15368 and hedgr/verifier/15368; after separately approved cutover, raw verifier is 5653778 and policy/15368 is added. Code-owner review stays OFF and Tier 1 stays OFF. Founder receipt MERGE-TIERS-ACT-001 SHA-256 `b994c05efb45aabf7318a247f1ab5af36d5280ea62b029f0fc28f5840e140a94` records consolidation, the bounded Workflows grant and accepted §445 deviation. Classic protection GET returning 404 is expected after consolidation; no classic PATCH is needed. Missing/drifted effective rules or bypasses stop; never silently repair settings or direct/admin merge. PR B remains READY/UNARMED; existing independent exact-head PASS, Wes sign-off and Founder go remain required.

Once implementation is complete, the implementing or steward agent may mark the PR ready and arm auto-merge with `gh pr merge --auto --squash` after the branch is updated and current-head checks have started. Check any stricter ticket gate before arming. Arming auto-merge is not merging: required `hedgr/verifier` remains pending until an independent Verifier attests PASS on that exact up-to-date head. GitHub then enforces required `validate`, `E2E smoke (@hedgr/frontend)`, `hedgr/verifier`, the standing invariant, and other applicable merge gates before completing the merge. Keep at most one PR in the merge step at a time.

Founder merge action is not required for normal bounded implementation PRs. Founder involvement stays upstream at judgement and authority boundaries.

### Stalled auto-merge recovery

Evidence recorded in HEDGR_STATUS §7a / §386 (14 Oct 2026): #868 (`424d5ac`) and #875 (`4aa0360`) merged after an owner-account squash auto-merge re-toggle; #880 (`d18c952`) and #885 (`d260738`) merged unaided. The historical CLEAN/green stall observations cannot be reconstructed from merged-PR metadata. The platform root cause remains unproven. The verifier workflow uses `GITHUB_TOKEN` to publish status from default-branch `issue_comment` evaluation; GitHub's documented workflow-event suppression does not prove an auto-merge evaluation fault or justify a PAT/App replacement.

If an armed PR continues to stall for about five minutes after all required gates become green, retain timestamped snapshots and proceed only on an unchanged head with a current independent PASS, all required checks green (`validate`, `E2E smoke (@hedgr/frontend)`, `hedgr/verifier`), and an up-to-date branch with `mergeStateStatus=CLEAN`. Re-read these gates immediately before recovery. Under the owner-account, disable/re-enable squash auto-merge once, then observe GitHub complete the merge:

```bash
gh pr merge "$PR" --disable-auto
gh pr merge "$PR" --auto --squash
gh pr view "$PR" --json headRefOid,mergeStateStatus,autoMergeRequest,state,mergedAt,mergeCommit
```

Never direct/admin merge, bypass protection, weaken a check or repeat the re-toggle. A changed head requires fresh independent verification under §331. If the gates are absent or the one recovery does not lead to merge, retain the evidence and stop for the coordinator; this procedure does not claim to repair GitHub's underlying fault. The recorded protection requires the three checks above, strict up-to-date branches and admin enforcement; no rulesets were present at that historical observation; the current consolidated main ruleset 26932204 now controls. Confirm current protection/rulesets read-only when diagnosing a new stall. An external-setting fix requires an exact old/new proposal, evidence and trade-off, then separate Dex/Founder confirmation before any change or merge.

### Vercel Git-info diagnosis

The non-required Vercel preview failures recorded in HEDGR_STATUS §7a / §386 remain unresolved:

| Preview | Reviewed Git head | Observed phase |
| --- | --- | --- |
| #852 — `dpl_2NDERTw7vbtmznaSaw5CAcFCQ6EB` | `932233c839f5c7dfdacdcf6ec28c650060113749` | `source=git`, ERROR / `git_info_fail` about four seconds after creation; no build events |
| #856 — `dpl_2aKnkWeZRTmRdVjufGNbJNyzZXTf` | `d6b02cd3548dc8785395543da9881c05efe7c9cb` | `source=git`, ERROR / `git_info_fail` about five seconds after creation; no build events |

Later #868/#875/#880/#885 previews succeeded. The early Git-info failure and empty build-event logs support a Git metadata acquisition diagnosis, not a TypeScript/build error or proved permissions/configuration defect. No repo-file cause or exact faulty external setting was found by the read-only Git/project metadata comparison; no tracked Vercel config existed at the discovery baseline. Do not invent a `vercel.json` fix or claim remediation succeeded. Keep this diagnostic separate from required GitHub checks and exact-revision Production readiness. OPS-GOV-CLEANUP-001 fault remediation remains a closeout hold unless the Founder dispositions it.

Further diagnosis is read-only. If evidence establishes a needed GitHub or Vercel setting change, record exact old/new settings, evidence and trade-off and stop for a separately confirmed external proposal without merging. No redeploy, Git reconnect, token/App introduction, project/dashboard or protection change is authorised by this procedure.

### Ticket gates and merge vs launch

Ticket-specific gate sections may be stricter than this standing rule and may never be looser. Satisfying merge gates authorises **repository merge only**. It does not widen originating ticket authority and does not imply launch, participant release, customer exposure, financial capability, or production-configuration approval.

### Permanent-main RAP rebind (§364)

**Current procedure:** Current §364 remains operative until OPS-RAP-BATCH-001's implementation is merged AND its governed closeout is effective. Authority-effect PRs keep a separate verified permanent-main RAP rebind after source merge. A PR whose only RAP-mandatory-source change is a docs-only `HEDGR_STATUS.md` or `AGENTS.md` record with no authority effect does not need its own separate rebind PR: regenerate the branch RAP in the same PR so `bridge:rap:check` passes; the next PR that activates or closes a ticket, or otherwise has an authority effect, carries the permanent-main rebind covering all earlier deferred records. “No authority effect” means the record activates or closes no ticket and changes no occupancy, §7 or §7a text, execution boundary, role or verifier requirement. A record that changes a RAP materiality rule still gets its own separate rebind. Exact-head independent Verifier PASS and required checks are unchanged. Binding source: `HEDGR_STATUS.md` §364.

**§464 transition:** Only after both conditions above does the following locked §364(A) amendment apply. This ticket's separate activation rebind is complete; its closeout's rebind is the first carried under the new rule. Activation alone does not switch the procedure.

> "A permanent-main RAP rebind need not be its own PR. The next governed record PR for the same ticket (activation, amendment or closeout source) carries the rebind for every earlier merged record of that ticket, binding source-revision fields to the current permanent-main SHA in the same diff. A ticket's activation rebind is carried no later than the ticket's first implementation PR becomes mergeable, under the stale-activation guard. A ticket's closeout rebind may be carried by the next ticket's activation source; if no such PR is merged within 24 hours, a separate sole-JSON rebind follows. A record that changes a RAP materiality rule still gets its own separate rebind. Fetched-main `bridge:rap:check` PASS, exact-head independent Verifier PASS and required checks are unchanged."

The stale-activation guard is “projection on main binds this ticket's activation source SHA”: an implementation PR cannot merge without that permanent-main binding. This remains a governed manual procedure; Fork 2 stays inactive. Q2's hosted validate.yml RAP-check step remains a separate unactivated follow-up after CI-EFF-001, requiring explicit Founder workflow approval and Wes's exact-head sign-off. This amendment adds no automation or hosted freshness enforcement.


### What CI actually enforces

`.github/workflows/validate.yml` runs `trust:check`, `trust:phrases`, the route-conflict guard, typecheck, lint, and unit tests. It does **not** enforce labels. There is no `QA_GATE_BYPASS` implementation in `validate.yml`. Do not claim a Solo QA label gate in validate.

Hosted checks on PRs include `validate` and `E2E smoke (@hedgr/frontend)`. The Founder added `validate` to main's required checks on 2026-09-29 as part of §331. The active no-bypass `main` ruleset (26932204) requires `validate`, `E2E smoke (@hedgr/frontend)` and `hedgr/verifier`, all from Actions 15368 before cutover, with strict up-to-date branches. The Founder consolidated protection on 10 Nov 2026; classic protection is absent and old ruleset 25778284 is deleted. The repository allows auto-merge, but PR B is explicitly READY/UNARMED. Read the ruleset inventory, details and effective main rules; do not use obsolete classic or deleted-ruleset payloads.

### Process

1. Open the PR as draft. Fill the template (acceptance, tests, rollback).
2. Implement on the PR. Head SHA is the only verification target.
3. Before launching a Verifier, the steward brings the PR branch up to date with `main` using GitHub **Update branch** under the owner's account (the GitHub UI **Update branch** control, or the pulls `update-branch` API authenticated as that person — not as a bot), then lets checks start on the updated head. Do not use `pr-auto-update`, `github-actions`, or any `GITHUB_TOKEN` actor for this step: bot-authored updates leave required checks in `action_required` and need manual approval of workflow runs. Since #726 (`eacaa440cf7076b0fe230d676cbd5048cdfaf501`), `pr-auto-update` is **manual (`workflow_dispatch`) only**; it does not run on push to `main` or on a schedule and must not be used for pre-verification updates.
4. Once current-head checks have started and stricter ticket gates permit, the implementing or steward agent marks the PR ready and arms auto-merge with `gh pr merge --auto --squash`. GitHub requires current-head `validate` success before merge. Keep at most one PR in the merge step at a time.
5. Launch a distinct independent Verifier with a brief explicitly permitting its one `Hedgr-Verifier:` attestation comment. The Verifier reports PASS or FAIL against the reviewed head, re-reads the current PR head immediately before posting, and aborts without posting on any mismatch.
6. The Verifier posts the single exact-head attestation. `hedgr/verifier` becomes success only when an eligible PASS matches the current head. GitHub completes auto-merge only after its required checks and applicable merge gates pass.
7. If `main` moves after PASS and strict protection leaves the PR behind, the steward updates the branch under the owner's account, lets new-head checks start, and re-launches an independent Verifier on the new head without asking the Founder. Any new head invalidates the earlier PASS; re-arm auto-merge if the update cleared it. GitHub reruns required checks on the new head. Repeat the exact-head gate before merge while keeping only this PR in the merge step.

Descriptive labels may still be applied as metadata (`product:approved`, `qa:approved`, one `area:*`, one `risk:*`) via `.github/scripts/bootstrap-labels.sh` if missing. They do not substitute for ticket authority, independent verifier PASS, exact-SHA verification, or release/launch authority.

**CLI shortcut (metadata only — not a merge gate)**
```bash
gh pr edit $PR --add-label "product:approved,qa:approved,area:ci,risk:low"
```

### Deviation handling and after-the-fact verification

If merge precedes independent verification of the merged revision (including #680, #685, #721, #722):

- Record the event in `docs/ops/HEDGR_STATUS.md` as a process deviation. Keep process compliance distinct from technical correctness.
- Never reclassify the sequence as compliant because a later verification passes.
- Run a retrospective independent verifier against the **merged** SHA.
- Verifier PASS: process deviation remains; merged tree independently verified after merge.
- Verifier FAIL: process deviation remains **and** a bounded corrective ticket/PR is required. Do not silently remediate defects discovered through the retrospective review.

Administrative bypass is not part of ordinary workflow.

### Local E2E parity

- Local `e2e:ci` runs should mirror `.github/workflows/e2e-smoke.yml`, especially for deposit/withdraw and FX-backed flows.
- **Backend stub required:** With `NEXT_PUBLIC_API_BASE_URL` pointing at the Flask app (typically `http://localhost:5050`), start the backend **before** `e2e:ci`. If the API is unreachable, the deposit **Confirm** control stays disabled and multiple specs will time out in `waitForDepositFxReady`.
- If `/deposit` renders `Unable to load exchange rate` or Playwright cannot find `data-testid="deposit-amount"`, verify the local backend stub is running and `NEXT_PUBLIC_API_BASE_URL` is pointed at it.
- Recommended local parity sequence:
```bash
python3.11 -m pip install -e "apps/backend[test]"
STUB_MODE=true PORT=5050 PYTHONUNBUFFERED=1 python3.11 -m src.app --port 5050
NEXT_PUBLIC_AUTH_MODE=mock NEXT_PUBLIC_DEFI_MODE=mock NEXT_PUBLIC_FX_MODE=stub NEXT_PUBLIC_APP_ENV=dev NEXT_PUBLIC_API_BASE_URL=http://localhost:5050 NEXT_PUBLIC_FEATURE_COPILOT_ENABLED=true pnpm --filter @hedgr/frontend e2e:ci
```
