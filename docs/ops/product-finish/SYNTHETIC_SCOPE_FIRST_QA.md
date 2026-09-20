# Synthetic Home scope-first — independent verification

Last updated: 2026-09-20

## Status and evidence boundary

**Local verification: PASS at `d4b1e17d5a31fba722205e49626bd6231895b73e`.** No unresolved blocking finding in the reviewed presentation, route isolation or financial-state preservation. Hosted checks, runtime merge, shipped inspection, technical completion recording and permanent-main RAP rebind remain separate pending delivery gates at this record's creation. This report supplies evidence, not authority or participant comprehension acceptance.

The distinct Verifier reviewed governance and runtime, authored the scoped verification changes, independently inspected final screenshots and final local logs, and did not author runtime changes. The Implementer performed the separately attributed manual browser traversal below.

## Authority and immutable provenance

- Activation [PR #600](https://github.com/mhibajene/hedgr-copilot/pull/600): permanent-main `c188d08e12e971a76f53c8db0964bd5515783ab3`.
- Separate activation rebind [PR #601](https://github.com/mhibajene/hedgr-copilot/pull/601): `dbac13ad5617aa3148be675b656a047ebbe1f2ef`, completed before runtime. The Verifier independently checked the projection-only rebind, all four mandatory source bytes, permanent-main identity and deterministic RAP check.
- Initial runtime: `63580c54cda9fae22cb06696fcb5ad18d13b40e2`; final responsive runtime refinement: `b1386171fa70a44e8e6a668dc64fccd749cd45ea`.
- Separate initial verification: `5b58a3ecb7be079fd81193135a85db7e0b97de4f`; final screenshot capture correction: checked head `d4b1e17d5a31fba722205e49626bd6231895b73e`.
- Narrow route-caption verification scope was recorded first in source `0822670c982ee34d5645c75d9e2eff38f0b70d15`, then corrected in `bc4d50a`; committed-source RAP followed in `29d94cb597c9198f49aa10c1d89f9eb031c25e4c`.
- Accepted mobile/desktop references and their hashes remain in [SYNTHETIC_SCOPE_FIRST_BASELINE.md](SYNTHETIC_SCOPE_FIRST_BASELINE.md).

Live STATUS §7/§7a/§294 confines delivery to the finite amendment inside `CLASS-A-VAL-002-WEEKEND-PREP-001`. Source review confirmed no Green delegation, new participant test, Engine interface adoption, financial capability, other-lane expansion or Fork 2/3 activation.

## Verification results

| Check | Observed result |
| --- | --- |
| Focused independent frontend units | 31/31, dashboard and currency context |
| Full `pnpm validate` | PASS: 902 frontend tests across 73 files, 49 Bridge tests, 18 snapshot/provenance tests, trust guards, deterministic RAP/snapshot checks, typecheck and lint |
| Production build | Implementer reports successful rebuild of final runtime; complete browser suite ran the resulting production Next server |
| Complete hermetic browser suite | 110/110 PASS, two Chromium workers, no skipped tests reported |
| Reference viewports | 390 × 844 and 1440 × 1024, GHS preference, completed $5 deposit/$2 withdrawal, remaining $3 / GHS 45 |
| Responsive and accessibility coverage | 320/390/700/1280/1440 widths across retained/new tests, 200% root text, long amounts, keyboard disclosures, dialog focus cycle, Escape and return focus |

The isolated local harness uses frontend `127.0.0.1:3012` and stub backend `127.0.0.1:5052`; the temporary config preserves repository suites and substitutes server/output locations. No CI configuration or dependency changed.

The draft RAP check emits `MAIN_HISTORY_UNVERIFIED` because its immutable source `2dab4ce75ef29d3b43573e0e72c398ba6ed0bbd8` is not yet in observed permanent main `dbac13a`. This warning is surfaced, not repaired or treated as activation. Existing source-first/merge/separate rebind procedure remains controlling. Test-mock React warnings and stale Browserslist data were non-failing diagnostics; they are not runtime findings or permission to alter dependencies.

## Reviewed behavior and preservation

- Explicit eligible synthetic Home alone receives the open balance, exact two-row scope explanation, new label, primary View Activity, secondary deposit, compact currency entry and responsive navigation. Both clean alias and legacy query paths are tested; default Home, unavailable scenario, Activity and Settings retain their prior surfaces. Existing mock-auth/non-live-FX eligibility guards are unchanged by code inspection.
- Balance, selected-currency estimate and observation remain derived from existing state. All five currency journeys retain USD `0 → 5 → 3`; retained tests cover full withdrawal, pending completion, fractional-cent rejection and reset while pending.
- Pending comparison retains visible uncertainty and amounts, now labelled “Available in simulation” on eligible Home. Empty, missing/invalid, hydration/loading and reset states do not fabricate a comparison or direction.
- The compact launcher retains the complete comparison in its dialog: both rates/estimates, constant USD basis, invented example/history boundary, precision/rounding, excluded fees/spreads, trust limits and no money moved. Opening/closing does not mutate financial state; request/state assertions remain.
- Persistent simulation disclosure, non-normal Engine notices, planning targets, Important disclosures and replay/reset remain accessible. No balance calculation, ledger, transaction, rate, storage, provider or Engine semantic code changed.

## Visual comparison and resolved findings

The Verifier compared both accepted references with captured runtime at matched logical viewport sizes. Source image metadata was independently verified: mobile 853 × 1844, normalized to 390 × 844; desktop 1487 × 1058, normalized to 1440 × 1024. Comparison composites place the normalized source at left and runtime at right. Five fidelity surfaces were checked: shell/navigation and disclosure, balance/estimate/selector, scope rows, observation/actions, and currency-context entry. Final mobile shows the balance, both scope rows, observation, both actions and Currency context above bottom navigation. Desktop preserves balance/scope beside observation/actions, with header navigation and the full-width currency entry. No clipping or unresolved material hierarchy deviation was found in the inspected final images.

Initial mobile spacing pushed the secondary action and currency entry below the reference's initial view. Scoped responsive refinements corrected that density issue without hiding content, reducing the caption below 12px or controls below 44px. The final screenshot test moves the pointer off controls so the primary action is captured in its resting navy state.

Intentional translation differences are the governed logo, approved fonts/tokens, text navigation instead of generated icon approximations, existing observation amount emphasis, and the complete “How this simulation works” trust label. Planning/disclosure/replay content absent from the cropped mockups is retained below the main view. The result is a governed responsive translation, not a pixel-identical reproduction of generated assets.

The first complete browser run was **107 passed / 3 failed**. Failures were investigated and corrected without relaxing functional checks:

1. A verification edit had incorrectly changed the unchanged Activity caption to Home's new label; its original strict expectation was restored (`234daed`).
2. An enlarged-text test still expected Deposit before Activity; it now asserts the approved synthetic order while preserving the default order (`d966272`).
3. Two route-entry tests retained the superseded Home caption; source-first clarification and exact replacement preserved their route/visibility assertions (`0822670`, `bc4d50a`).

The subsequent complete 110-test run passed. Governance preflight also caught an accidental historical file-list edit; historical bytes were restored (`911f111`) and its independent five-test suite passed before activation delivery.

## Local evidence references

Local artifacts are retained at `/Users/musalwa/.codex/visualizations/2026/09/20/01a0be24-62e3-73e3-b04f-c5272d6bfae0/scope-first-qa/`: final and initial comparison composites, both full/viewport captures, and build/validation/browser logs. The Verifier confirmed the retained viewport image hashes match the inspected originals. This local retention is not hosted publication. Repository test source reproduces screenshots through `testInfo.outputPath`. The original run paths and hashes are recorded below.

- `/tmp/hedgr-scope-e2e-final.log` — SHA-256 `7d4cb19423b84166ea062c37e35b4b234b4705278a47e9ce8e348cb987c31a20`.
- `/tmp/hedgr-scope-validate-final.log` — SHA-256 `036e2af615f7ec074f985ecde05ad7c313bfd28605e4edd0aba5cab31fe7873c`.
- `/tmp/hedgr-scope-test-results/scope-first-approved-scope-first-reference-at-390px-chromium/scope-first-GHS3-390-viewport.png` — SHA-256 `71583ccf85ecfe44397b5e42a72629ef67e344115f3b83d5cd4e673945e60de3`.
- `/tmp/hedgr-scope-test-results/scope-first-approved-scope-first-reference-at-1440px-chromium/scope-first-GHS3-1440-viewport.png` — SHA-256 `5d00f74c1b0db1ead93c9378653c5e6a6519e1b8f61b547f2d8c5d0304994463`.

The Implementer's additional CUA traversal on the final local build reported GHS 75 simulated deposit → USD 5, then USD 2 withdrawal → USD 3 / GHS 45; comparison rates 14.25/15, estimates 42.75/45 and difference 2.25; expanded full explanation, Escape return focus and no browser warning/error logs. This is attributed technical traversal evidence, not an independent participant session.

## Remaining delivery and learning limits

Required hosted checks, governed runtime delivery, shipped mobile/desktop/control inspection, completion source recording and the separate permanent-main RAP rebind still apply. A supported rebase merge may retain separate runtime and independent-QA commits on permanent main; no checks or branch protection may be bypassed.

This evidence does not establish participant comprehension, demand, withdrawal readiness, live accounting, release permission or parent closure. Existing Form/#550, human rehearsal/timing duties, paused publication/distribution, open V/E parents and deferred Lane G remain unchanged. Verified delivery consumes only this finite presentation amendment.

## Hosted delivery and shipped follow-up — 2026-09-20

This follow-up supersedes the earlier pending hosted/runtime/deployment statements while retaining the original local verification record. **Runtime is merged and deployed; completion-source delivery and its separate permanent-main RAP rebind remain pending.**

The Verifier independently queried GitHub PR and deployment records. [PR #602](https://github.com/mhibajene/hedgr-copilot/pull/602) merged by rebase at `2026-09-20T10:58:35Z`, final permanent-main revision `e548dd02c80e7d9eb97c646514685343d2155c05`. The checked PR head was `4bc4490596883d8b560686cee175147cdc92e25b`. Git tree comparison between that head and merged revision is empty; runtime and independent verification commits remain separate in permanent-main history.

All reported hosted checks completed successfully, including [validate](https://github.com/mhibajene/hedgr-copilot/actions/runs/35506252561/job/106066459506), [E2E](https://github.com/mhibajene/hedgr-copilot/actions/runs/35506252546/job/106066459529), [build](https://github.com/mhibajene/hedgr-copilot/actions/runs/35506252552/job/106066459484), [typecheck/lint](https://github.com/mhibajene/hedgr-copilot/actions/runs/35506252552/job/106066459391), snapshots, evidence-pack and PR Convergence Review. No check or protection bypass is evidenced or claimed.

GitHub deployment `6551983976` records environment **Production**, exact SHA `e548dd02c80e7d9eb97c646514685343d2155c05`, and successful status at `2026-09-20T10:59:35Z`, with [deployment environment URL](https://hedgr-copilot-frontend-egkb0xyxo-hedgr.vercel.app). The Verifier checked the SHA/environment/status association; this does not itself prove visual or participant acceptance.

### Rebase provenance mapping

| Original reviewed commit | Permanent-main commit | Role |
| --- | --- | --- |
| `63580c5` | `0d6cf838aa370430dd2c2b1826e56978b3128fd0` | Initial runtime |
| `5b58a3e` | `ebf3b57a6eda99e2c87bf2c5ad2b3d4d5d61f42c` | Independent tests |
| `e45f95a` | `adf46fc68a6d61ca8a0e85f6b16d27498b6b1c78` | Responsive runtime |
| `15efaf7` | `8960bc66f1103a85bb0c9faf41493acf699c3e1e` | Runtime selector cleanup |
| `234daed` | `84b364265dfcf20482533436dd31887d8064a83e` | Activity assertion correction |
| `d569fbd` | `2f4eb1fb01b43e064caf0891b4f26057f154e53a` | Mobile density runtime |
| `d966272` | `47a36d154118e943f21fb4bfee40b1ec97b550b8` | Independent action-order check |
| `0822670` | `b730aaefa8dd9d75aab3a7b14c967cfc50784a94` | Verification scope source |
| `bc4d50a` | `ec90d10111489b208212d5bd0c3f283921472e62` | Exact route-caption checks |
| `2dab4ce` | `b1937a87f5333b64d44b3d0c78b9c4cb1c519f69` | Balance label scale |
| `29d94cb` | `741995b590ac5b6344e9e470eb47caf812ca5d00` | Committed-source projection |
| `b138617` | `0f7cbff6d3ade4af69bef2fa2a204ede38787d96` | Final responsive runtime |
| `d4b1e17` | `d8a6823071ce032cde910a7459dfd57c4b9e0d36` | Final independent screenshot check |
| `21b3b00` | `b006aface0def68ac35385bb17554404af603b1d` | Independent QA record |
| `4bc4490` | `e548dd02c80e7d9eb97c646514685343d2155c05` | Matched-reference artifact record |

### Attributed shipped inspection

The Implementer reports direct CUA inspection of the shipped synthetic Home and default control, separately from the Verifier's local rendered-image review and GitHub verification. Effective browser dimensions were DOM-confirmed at approximately 390 × 843 mobile and 1440 × 1023 desktop. The browser's 80% scale required viewport overrides of 312 × 675 and 1152 × 819. Initial viewport captures were clipped by the tool; full-page captures corrected the inspection evidence. These one-pixel-height differences are recorded rather than claimed as exact local-reference viewport equality.

Observed shipped checks: exact scope copy and USD 3 / GHS 45 estimate; mobile bottom navigation and desktop header navigation; complete currency dialog with GHS 42.75 / 45, rates 14.25 / 15, difference 2.25 and expanded fixture/calculation limits; Escape returning focus to its launcher; retained planning and disclosures; unchanged Activity with completed USD 5 deposit, USD 2 withdrawal and USD 3 remainder; default dashboard's existing navy card and previous copy; empty browser warning/error logs. No new production transaction or reset was performed; existing synthetic state was retained. The viewport override was reset afterward.

This completes recorded technical deployment inspection only. Remaining weekend duties, explicit release conditions, participant distribution pause, open parents and all financial boundaries are unchanged. Completion-source approval/checks/merge and separate permanent-main projection rebind still control final governance closeout.
