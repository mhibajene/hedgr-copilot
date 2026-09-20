# Synthetic Home deposit CTA hierarchy — independent verification

Last updated: 2026-09-20

## Status and authority boundary

**Local verification: PASS at `00193bf`**, with no unresolved finding in the scoped action hierarchy, route continuation or default-route control. Hosted PR checks, merge, production deployment inspection, technical completion recording and final permanent-main RAP rebind remain pending at this record's creation. This is technical evidence, not participant comprehension, release permission or financial capability.

The Founder directed **Add simulated deposit** first as the filled primary CTA and **View Activity** second as the secondary action on eligible synthetic Home. The attached older image illustrates the former action order and contains superseded balance-scope wording; it is not authority to restore that copy. Live STATUS §7/§7a/§295 confines this change to the existing `CLASS-A-VAL-002-WEEKEND-PREP-001` ticket.

- Activation [PR #607](https://github.com/mhibajene/hedgr-copilot/pull/607) merged to permanent main at `e8a16f8d0a2bb028d31255e4994cfef6d6f4797a`; required hosted checks, including validate, E2E, build and convergence review, passed.
- Separate projection-only activation rebind [PR #608](https://github.com/mhibajene/hedgr-copilot/pull/608) merged at `820b3dc`. The Verifier checked its one-file diff, all four mandatory source bytes against permanent main, read-only/false execution flags, clean ancestry and deterministic `pnpm bridge:rap:check` with no draft warning before runtime.
- Implementer runtime commit `6612eb2` changes only `apps/frontend/app/(app)/dashboard/page.tsx`, swapping the two existing synthetic Home links. Distinct Verifier commit `00193bf` changes only the three authorised unit/browser test files. Existing CSS assigns the filled navy treatment to the first link and secondary text treatment to the second; no CSS, token, route or financial-state code changed.

### Main movement during runtime review

Unrelated Fork 2 [PR #604](https://github.com/mhibajene/hedgr-copilot/pull/604) merged as `e2ce6b3` while the CTA runtime PR was under review. Its five changed files are the dormant provenance workflow, its script/test, Bridge README and Fork 2 verification record. It changed no mandatory RAP source or frontend file; Fork 2 operating behaviour remains inactive. The CTA branch was rebased onto that permanent-main revision without changing its tested runtime, test or QA file bytes. Git blob identities for all five scoped CTA files match before and after the rebase.

| Original reviewed commit | Rebased commit | Role |
| --- | --- | --- |
| `6612eb2` | `b818421` | Runtime link order |
| `00193bf` | `098f2db` | Independent tests |
| `cdbcb98` | `16b6607` | Independent local QA record |

Required hosted checks and convergence review must pass on the final rebased PR head before merge; the earlier local PASS does not substitute for them.

## Local checks and rendered review

| Check | Observed result |
| --- | --- |
| Independent frontend unit run | 902/902 tests across 73 files, including 17/17 dashboard tests, passed after the Verifier's test edit |
| Full `pnpm validate` | PASS: 902 frontend, 49 Bridge and 18 snapshot/provenance tests, trust guards, RAP/snapshot checks, typecheck and lint |
| Production build | PASS on the final local runtime and verifier test head |
| Complete hermetic browser suite | 110/110 PASS in Chromium; the changed synthetic and default `product-finish` cases and both `scope-first` viewport cases passed |

The Verifier inspected the retained build, validation and browser logs and independently viewed the 390 × 844 and 1440 × 1024 viewport captures. Both show **Add simulated deposit** first in navy and **View Activity** second as text, with the balance remaining the focal point. The current “This balance shows / This balance doesn’t tell you” explanation, $3.00 / GHS 45 display estimate, withdrawal observation, Currency context and Home navigation remain visible. No clipping or material hierarchy problem was observed in these captures. This visual review is limited to the captured local seeded state; the screenshots are not a production or participant observation.

The tests also assert reading and keyboard order, at least 44px target height, explicit `/deposit?journey=class-a-val-002` and `/activity?journey=class-a-val-002` continuations, Activity focus outline and Enter navigation, 320px/200% reflow, retained planning/disclosures, and unchanged default Home styling and route checks. The browser suite preserves existing transaction and factual Activity checks. It does not imply a new transaction, withdrawal-readiness statement or financial capability.

Local artifacts are retained outside the repository at `/Users/musalwa/.codex/visualizations/2026/09/20/01a0be24-62e3-73e3-b04f-c5272d6bfae0/cta-hierarchy/`:

| Artifact | SHA-256 |
| --- | --- |
| `hedgr-cta-validate-final.log` | `037bb5103af0839251c0037b59b16f5e6e0a90de2908a79aa6a3c7d8a555cf69` |
| `hedgr-cta-build.log` | `b3514b6a04f291ab85413ffacddd556626a1ff1a3ad1b8f41daddf4e96333a4b` |
| `hedgr-cta-e2e-final.log` | `95322d48b7509c29db42390b591568b9ff4d0d5d4b1e747e8ae3fe6ac37b1c90` |
| `scope-first-GHS3-390-viewport.png` | `2ad11160e64a5d6e3156726ae721075bd72b8c7e0ae207afdc8a8cef9e6d6d7e` |
| `scope-first-GHS3-1440-viewport.png` | `a8e4210dff907743a639676156c77777f84c35f5890307346085ae2e2ccee58f` |

The local E2E run used a production Next build and the existing stub backend at `127.0.0.1:5052`. Test-mock React and stale Browserslist diagnostics in the logs were non-failing; they are not a finding about this CTA correction or authority to alter dependencies.

## Delivery and learning limits

The runtime PR still needs required hosted checks, distinct convergence review, governed merge and inspection of the exact deployed revision at mobile, desktop and default control widths. Then source-first completion and a separate verified permanent-main RAP rebind consume this finite correction. The existing Form/#550, human rehearsal and release conditions, participant distribution pause, open parents, deferred Lane G and inactive Fork 2/3 operating posture remain unchanged.

## Hosted delivery and shipped follow-up — 2026-09-20

This follow-up supersedes the pending hosted, merge and deployment statements above while retaining the earlier local evidence boundary. **Runtime is merged and deployed; source-first technical completion and its separate permanent-main RAP rebind remain pending.**

The Verifier independently checked [PR #609](https://github.com/mhibajene/hedgr-copilot/pull/609): final checked head `4030d0ef783c4bdaa9050d85a4afc8e647fda00b` merged at `2026-09-20T11:53:24Z` into permanent main as `c440e176aeea96f81d88870879d9210b2f730beb`. The head and merge trees are identical. The five-file scope remains the one Home link swap, three independent test files and this QA record. Separate roles are preserved in permanent-main history: runtime `2f1e521`, independent tests `054387c`, independent QA `80c4e97`, and the rebase mapping record `c440e17`.

Every reported final-head hosted check passed, including [validate](https://github.com/mhibajene/hedgr-copilot/actions/runs/35508780443/job/106072952536), [E2E](https://github.com/mhibajene/hedgr-copilot/actions/runs/35508780414/job/106072952531), [build](https://github.com/mhibajene/hedgr-copilot/actions/runs/35508780411/job/106072952477), typecheck/lint, evidence-pack, Vercel and the distinct convergence review. The Implementer also reported a final local `pnpm validate` PASS after the unrelated Fork 2 main move, with 902 frontend, 49 Bridge and 20 snapshot/provenance tests plus trust, typecheck and lint; that later run is attributed, separate from the retained 18-test local log above.

GitHub deployment `6552449247` records **Production**, exact SHA `c440e176aeea96f81d88870879d9210b2f730beb`, and successful completion at `2026-09-20T11:54:34Z`, with [deployment environment URL](https://hedgr-copilot-frontend-70f0fb6mj-hedgr.vercel.app). The Verifier checked the SHA, environment and status association. This proves deployment provenance, not rendered or participant acceptance by itself.

### Attributed shipped inspection

The Implementer separately reports CUA inspection after production success on the canonical synthetic Home, with full-page screenshots viewed at effective 390 × 843 mobile and 1440 × 1023 desktop widths. On mobile, **Add simulated deposit** was first and filled `rgb(31, 39, 71)` with white text and a 44.8828px target; **View Activity** followed as transparent, muted `rgb(70, 88, 160)` text with the same target height. On desktop the corresponding heights were 63.984px and 50.488px. Document scroll width stayed within the viewport at both widths (371 ≤ 390; 1421 ≤ 1440). Accessibility inspection retained `/deposit?journey=class-a-val-002` and `/activity?journey=class-a-val-002`, and the current scope copy remained. The mobile view held an existing USD 253 state whose number wrapped; Currency context remained available lower on scroll. This is the Implementer's rendered observation, not an independent Verifier browser inspection.

The Implementer reports that default `/dashboard` retained its original heading, navy balance card and Deposit / Activity / Withdraw controls; browser warning/error logs were empty. No production transaction or reset was performed for this inspection. Shipped technical evidence does not establish participant comprehension, withdrawal readiness, release permission or parent closure. Remaining weekend instrument, human rehearsal/timing and explicit release duties continue under the participant distribution pause; source-first completion and a final separate verified RAP rebind remain required.
