## PR Posture

Repo-wide standing merge invariant (binding source: `AGENTS.md`). Target sequence:

`DRAFT` → `IMPLEMENTED` → `READY / AUTO-MERGE ARMED` → `VERIFYING` → `VERIFIED` → `MERGED`

A change to the PR head after verification returns the PR to `VERIFYING`.

### Independent verifier and exact-head-SHA binding

No implementation PR may merge to `main` until an independent verifier, distinct from the authoring/implementing role, has reported PASS against the **current** PR head SHA. Verification applies only to the SHA reviewed. Any subsequent commit invalidates the previous PASS.

Verifier attestations are PR comments whose first matching line is exactly:

```text
Hedgr-Verifier: PASS sha=<40-hex head sha> run=<verifier agent URL>
```

or

```text
Hedgr-Verifier: FAIL sha=<40-hex head sha> run=<verifier agent URL>
```

Anchored at line start. Strict form: `Hedgr-Verifier: ` then `PASS` or `FAIL`, then ` sha=` plus forty hexadecimal characters, then ` run=` plus a non-whitespace verifier URL. No other line is an attestation.

The independent Verifier remains READ_ONLY except for one permitted write: a single attestation comment in this exact format on the PR under review for the head SHA it reviewed. The Verifier brief must explicitly permit that post. Immediately before posting, the Verifier re-reads the current PR head SHA and aborts without posting if it differs from the reviewed SHA. Implementers and stewards never post `Hedgr-Verifier:` attestations, even though all agents share the Founder's GitHub account.

### Mechanical gate (what actually exists)

`.github/workflows/verifier-gate.yml` reads PR comments and sets commit status context **`hedgr/verifier`** on the current head SHA fetched from the GitHub API (never from an `issue_comment` payload SHA).

Latest eligible attestation (by comment `updated_at`, then comment id; all pages):

- **success** — latest is `PASS` and `sha` equals the current head.
- **failure** — latest is `FAIL` and `sha` equals the current head.
- **pending** — no eligible attestation; latest `PASS`/`FAIL` is for a different SHA (including `FAIL` on an older SHA); or the comment is ineligible.

Labels are not consulted. `product:approved`, `qa:approved`, `area:*` and `risk:*` are descriptive metadata only. They are never merge authority, ticket authority, or release/launch authority.

Trust model: only comments whose `author_association` is `OWNER`, `MEMBER`, or `COLLABORATOR` are eligible. Cloud agents typically post as the connected write-capable account. `CONTRIBUTOR` / `NONE` / first-timer comments and unverified bots are ignored.

`issue_comment` workflows run from the default branch, so the comment path only evaluates this workflow after `verifier-gate.yml` is on `main`. Fork PRs receive a read-only `GITHUB_TOKEN` on `pull_request`; `statuses: write` may fail there. In-repo branches are the supported path.

### Auto-merge

Once implementation is complete, the implementing or steward agent may mark the PR ready and arm auto-merge with `gh pr merge --auto --squash` after the branch is updated and current-head checks have started. Check any stricter ticket gate before arming. Arming auto-merge is not merging: required `hedgr/verifier` remains pending until an independent Verifier attests PASS on that exact up-to-date head. GitHub then enforces required `validate`, `E2E smoke (@hedgr/frontend)`, `hedgr/verifier`, the standing invariant, and other applicable merge gates before completing the merge. Keep at most one PR in the merge step at a time.

Founder merge action is not required for normal bounded implementation PRs. Founder involvement stays upstream at judgement and authority boundaries.

### Ticket gates and merge vs launch

Ticket-specific gate sections may be stricter than this standing rule and may never be looser. Satisfying merge gates authorises **repository merge only**. It does not widen originating ticket authority and does not imply launch, participant release, customer exposure, financial capability, or production-configuration approval.

### What CI actually enforces

`.github/workflows/validate.yml` runs `trust:check`, `trust:phrases`, the route-conflict guard, typecheck, lint, and unit tests. It does **not** enforce labels. There is no `QA_GATE_BYPASS` implementation in `validate.yml`. Do not claim a Solo QA label gate in validate.

Hosted checks on PRs include `validate` and `E2E smoke (@hedgr/frontend)`. The Founder added `validate` to main's required checks on 2026-09-29 as part of §331. Classic branch protection on `main` now requires `validate`, `E2E smoke (@hedgr/frontend)`, and `hedgr/verifier`, requires branches up to date with `main` (`strict=true`), and enforces for admins. The repository allows auto-merge and has no rulesets.

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
