## PR Posture

Repo-wide standing merge invariant (binding source: `AGENTS.md`). Target sequence:

`DRAFT` → `IMPLEMENTED` → `VERIFYING` → `VERIFIED` → `AUTO-MERGE ELIGIBLE` → `MERGED`

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

Auto-merge may be enabled only after an independent verifier has reported PASS against the current PR head SHA and all other applicable repository and ticket gates are satisfied.

Founder merge action is not required for normal bounded implementation PRs. Founder involvement stays upstream at judgement and authority boundaries.

### Ticket gates and merge vs launch

Ticket-specific gate sections may be stricter than this standing rule and may never be looser. Satisfying merge gates authorises **repository merge only**. It does not widen originating ticket authority and does not imply launch, participant release, customer exposure, financial capability, or production-configuration approval.

### What CI actually enforces

`.github/workflows/validate.yml` runs `trust:check`, `trust:phrases`, the route-conflict guard, typecheck, lint, and unit tests. It does **not** enforce labels. There is no `QA_GATE_BYPASS` implementation in `validate.yml`. Do not claim a Solo QA label gate in validate.

Hosted checks commonly seen on PRs include `validate` and `E2E smoke (@hedgr/frontend)`. At this recording, classic branch protection on `main` requires status check `E2E smoke (@hedgr/frontend)` only (`enforcement_level: everyone`). There are no rulesets. **`hedgr/verifier` is not yet a required status check** — making it required is a Founder-only repository settings change, not ordinary PR execution. Do not treat the workflow file as already binding merge on GitHub.

### Process

1. Open the PR as draft. Fill the template (acceptance, tests, rollback).
2. Implement on the PR. Head SHA is the only verification target.
3. Immediately before a verifier is launched, the steward brings the PR branch up to date with `main` using GitHub **Update branch** (UI or the pulls `update-branch` API) under a person's account (for example the owner's connected account), not via the `pr-auto-update` workflow or any `GITHUB_TOKEN` actor. Bot-authored updates leave required checks in `action_required` and need manual approval. The verifier reports PASS or FAIL against that exact current head SHA. `pr-auto-update` no longer runs on push to `main` or on a schedule. If `main` moves after a PASS and the branch must be updated again (required because `main` requires up-to-date branches), the new head invalidates the previous PASS and must be independently re-verified before merge.
4. Distinct verifier posts an attestation line for that exact head SHA.
5. `hedgr/verifier` becomes success only when that PASS matches the current head.
6. Enable auto-merge only after that status and every other applicable gate.
7. If the head changes, attestation is invalid until a new PASS on the new SHA.

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
