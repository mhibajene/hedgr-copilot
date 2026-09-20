# Fork 1 — retained implementation verification

**Status:** Local verification retained; hosted review and explicit §292 effective recording required before operating activation. Evidence only, not a second live authority surface.

## Baseline and boundary

Founder authorisation is in HEDGR_STATUS.md §292. Authorisation PR [#592](https://github.com/mhibajene/hedgr-copilot/pull/592) merged at `831e85490480f8271529b0d331e18578fe9fa391`; separate RAP rebind [#593](https://github.com/mhibajene/hedgr-copilot/pull/593) merged at `8580c2639489c14c59e7010a0c4bcdf941b9e30f`. The latter is the immutable pre-refactor baseline. Its deterministic RAP was checked on permanent main before editing.

Implementation commit `451fc25` changes presentation and the §7 source locator only. Test/evidence changes are retained in a subsequent separate commit. No product/research ticket is named, activated, closed or reprioritised by this pass. No product/runtime, ADR, doctrine, CI, dependency, release, financial, RAP cadence/binding or finite-envelope implementation is included.

## Equivalence map

| Control / operator question | Before → after | Retained verification |
| --- | --- | --- |
| What is active? | V `CLASS-A-VAL-002`, sole nested WEEKEND-PREP-001; E `SE-REASON-001`, no nested ticket; G deferred; N/A/B/C/M/R idle → same, grouped in live §7 | Exact projected active-ID and sequencing equality; no new lane or parent disposition |
| What may Lane V change? | Weekend brief plus the finite shared Home/Activity/Settings amendment → same exact text in live §7a | Byte equality includes files, permitted behavior, tests, distinct verifier, source-first/rebind, Form, release, exclusions and rollback |
| What does the open parent require? | V objective/question/class/authority/DRI and detached participant outcomes/criteria/stop block → gathered under V parent | Byte equality; broad parent surfaces explicitly do not reopen completed work or widen the nested brief; retired Notion staging is not restored |
| What may Lane E do now? | §290 no further authoring, no active nested ticket; retained non-authoritative parent contract → same live parent | Exact §290 posture and all following research outputs, exclusions, acceptance, stop/rollback and completion boundary retained |
| Can G resume? | §285 deferred/not cancelled, no intake/analysis/restart by inference → same | Exact Lane G brief retained; working audience remains strategic and reversible |
| What stops or gates work? | Active-brief controls, paused distribution, human rehearsal/explicit release, frozen narrative, Class A/B/C, Kenya DEFER, retired Green → same | Verbatim active controls plus live §7 summary; no financial authority or research/model acceptance |
| What remains controlling? | Accepted ADRs, active doctrine, AGENTS, current STATUS and repo precedence → same | Live rule explicitly preserves higher-precedence sources and stop/escalation for genuine disagreement |
| What can historical text authorise? | Completed/superseded records cannot supply current scope → explicit historical archives and live-only §7 lookup | Historical marker before/after §7 ignored; missing/duplicate live heading or missing live marker fails; conflict cannot be repaired from history |
| What are the standing agent rules? | Last complete AGENTS execution standard, with earlier repeated versions/overrides → one standard plus live pointer | Text equality after removing only dated chronology/posture duplication; v1 local-only auth/FX qualifications retained explicitly |
| Does RAP gain authority or a new binding model? | Fixed four mandatory sources; immutable common source revision, fail-closed freshness/conflict, false action flags → same | Entire projected envelope equal after normalising only the deliberately rewritten §2 boundary narrative; existing source/binding/CLI tests unchanged |
| Do Fork 2/3 become active? | Inactive → inactive | §291/§292 and live pointers retain separate authority and activation conditions; no pilot or standing delegation |

The original §7 sequencing field is retained exactly, including its delivery/release qualifications. Obsolete “none nested” fragments in the old live chronology are removed from current presentation using the already controlling later weekend authorisation, not a new occupancy decision. No genuine current-source conflict was resolved by inference.

## History and legibility

[STATUS presentation archive](../HEDGR_AUTHORITY_HISTORY_PRE_FORK_1.md) retains the original prefix/§§1–2 and §§7–7a; [AGENTS archive](AGENTS_PRE_FORK_1.md) retains the complete original file. Both have explicit historical/non-operative headers and are outside RAP's mandatory source list. Their original payload bytes are tested with SHA-256:

| Payload | SHA-256 |
| --- | --- |
| STATUS prefix / §§1–2 | `89184b7aaa25716dfda568e38cc3e9114fc7442d2a3837f04fe57079e8d972c0` |
| STATUS §§7–7a | `26e96efa037c37ff9545d2681bdf9b6f99bfc51a410f923ac8e783d716b2138d` |
| Complete AGENTS | `16f7df58760234566575c6563af6386ed13ec971fdf1bf60b9ad9aad16f1ea6e` |

STATUS §§3–6 and §§8–290 are byte-identical to baseline, preserving numbered decision meanings and concurrency records. Enduring parent/evaluation principles remain in their accepted numbered records with live pointers; relocation does not revoke them. Archive whitespace is intentionally retained rather than normalised.

The live §§7–7a surface reduces from 3,741 to 274 lines at implementation commit; AGENTS reduces from 989 to 475. Live §7 answers occupancy, execution/release flags, parallelism and stopping conditions; §7a supplies exact active scopes. Historical detail remains reachable without being part of the current instruction path. This is a structural legibility result, not an empirical measurement of operator comprehension or delivery speed.

The known `SUPERSEDED_LANE_NARRATIVE` for §2 NARRATIVE-007 was explicitly relocated under §292's authorised exception. Its old bytes remain in the archive; the generator's warning classification is unchanged and fixed-fixture regression coverage remains. Absence of this warning after relocation does not establish universal narrative consistency.

## Checks and limits

- Eight added regressions cover archive integrity/source exclusion, exact active-brief preservation, standing execution-contract equivalence, projected permission/occupancy equivalence, current-source conflict and historical/missing/duplicate locator cases.
- The 22 targeted migration/generator tests and full `pnpm run validate` passed (900 frontend tests, 49 Bridge tests, 11 snapshot tests, trust checks, typecheck and lint). Deterministic RAP generation/check passed. Required hosted checks and convergence review still gate delivery.
- Existing RAP tests retain immutable-source binding, dirty-source rejection, branch/main ancestry diagnostics, stale/mismatch/conflict behavior, exact allow-list and non-authorising flags. No validator/schema/Worker behavior changed.
- Implementation and local verification were performed by the same bounded operator, with separate commits. This is not blinded or independent empirical assurance. The repository's hosted convergence review and required CI remain additional delivery gates.
- Existing source-first recording, separate permanent-main RAP rebind and amendment/release procedures remain in force. A pre-merge `MAIN_HISTORY_UNVERIFIED` diagnostic is expected for a source commit not yet on main; the post-merge rebind must clear it.

Rollback is the scoped presentation/locator revert and regenerated RAP described in §292. Archives and unrelated lane work remain preserved. Only explicit verified repo-effective recording can activate Fork 1; no automatic successor follows.
