# Fork 2 mechanical provenance — dormant implementation evidence

**Status:** Implementation candidate / **INACTIVE**. This record is verification evidence, not operating authority. `HEDGR_STATUS.md` §7/§7a/§293 controls; current source-first, governed PR and separate permanent-main RAP rebind procedures remain in force.

## Source and boundary

- Founder implementation authority was recorded in [PR #597](https://github.com/mhibajene/hedgr-copilot/pull/597), merged at `904b4c42741d8ce8699bd34c01b3e4df4a80952e`. The current procedure's separate projection-only [PR #598](https://github.com/mhibajene/hedgr-copilot/pull/598) merged at `f918aec0d14a3fff7079e0ad30c4482c0e4547dd`; `bridge:rap:check` verified the four-source artifact bound to `904b4c4…` on permanent main before implementation edits.
- The implementation adds one dormant workflow, one bounded helper and its Git fixtures, and Bridge operator guidance. It does not alter the RAP generator, validator, schema, Bridge route, CI/E2E workflow, branch protection, accepted ADR, doctrine, product, or financial behavior. No automation identity, secret, or repository variable was created.
- Operating use needs three independent conditions: a separately controlled enable variable, a separately approved least-privilege automation token, and an explicit live §7 `**Fork 2 operating status: ACTIVE**` marker. None is supplied by this implementation. Missing credentials fail before checkout; an absent live marker fails before any operating PR mutation.
- The pre-activation test has its own dormant gate: manual dispatch, a separately controlled test-target variable equal to the exact permanent-main SHA, the same approved token, live §7 bounded implementation authority with Fork 2 still **INACTIVE**, and an exact metadata-only classification. This removes the circular requirement to activate Fork 2 before proving the protected path. It authorises no general-use binding or classifier expansion. No test variable or credential is configured here.
- Before creating or reusing a deterministic PR, the workflow generates the expected artifact and retains its digest. It compares the PR-head RAP bytes and the merged RAP bytes with that exact digest; matching path and `source_commit` alone are insufficient. Mismatch stops without reliance on the PR.

## Bounded classifier and retained checks

The helper verifies observed `origin/main` equals the checked-out HEAD, full history, prior source-commit ancestry, byte-deterministic generation of the existing artifact from its bound four-source revision, exact committed working sources, and the generator's structural/conflict validation. It compares committed mandatory-source content at the old bound revision with the current permanent-main revision:

| Result | Exact condition | Consequence |
| --- | --- | --- |
| `no_event` | All mandatory-source bytes unchanged | No RAP event solely because delivery or a projection-only merge occurred. |
| `mechanical` | Only the existing `Last updated: YYYY-MM-DD` line changed in `AGENTS.md` or `HEDGR_STATUS.md`; every other byte and both indexes are unchanged | Generate an artifact for current permanent main; the workflow is designed to open an artifact-only protected PR with attributable source SHA and artifact digest. |
| `review_required` | Any other source difference | Stop mechanical binding and return to current human authority review/procedure. This does not assert that every such change is material. |

The narrow allowlist is deliberate. It avoids silently making a materiality judgment about natural-language governance changes. It does not yet cover every possible non-material mandatory-source edit; broader coverage requires separate evidence and authority, not a heuristic expansion.

Disposable-Git tests cover no-source delivery, a committed metadata-only change, deterministic artifact writing and a no-event artifact merge, authority/index edits returning to review, conflicting current sources failing closed, corrupted or unbound RAP, dirty working sources, and inactive-state rejection. Local `pnpm run validate` passed, including RAP/snapshot checks, seven new provenance tests, the existing Bridge/frontend tests, typecheck and lint. Workflow YAML, shell syntax and workflow guard passed. The existing RAP action flags remain false.

## Open activation evidence and fallback

There is **no** configured least-privilege App/token or enable variable. No bot-created PR has exercised the repository's protected E2E/hosted/convergence path; squash/rebase behavior of the bot delivery, GitHub credential permissions and post-merge audit are therefore **not verified in production**. Code-level fixture success is not the §293 success condition, and this document does not claim Fork 2 is implemented/verified for operating use. If the token is missing, GitHub requires approval for bot-created checks, any required check fails, main moves during delivery, provenance mismatches, or current-source materiality is ambiguous, no mechanical merge may be relied upon. Use the existing governed rebind.

Before a later explicit repo-native activation, separately authorise and configure the identity and test-target repository setting, then retain one end-to-end protected-branch test using a truly non-material mandatory-source change. The one-time dispatch is test setup; verify the ensuing mechanical PR/bind needs no routine human governance initiation or approval, all required checks pass, the merged artifact is bound to the immutable source commit, and source content still matches. Remove the test-target setting after the run and record the identity, permission scope, PR/check/merge evidence, source/artifact SHAs, failure/fallback observations and setting removal. Any failure keeps Fork 2 inactive and returns to the existing governed procedure. Fork 3 remains inactive.
