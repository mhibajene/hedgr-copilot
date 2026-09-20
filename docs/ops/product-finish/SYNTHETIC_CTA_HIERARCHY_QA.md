# Synthetic Home deposit CTA hierarchy — independent verification

Last updated: 2026-09-20

## Status and authority boundary

**Local verification: PASS at `00193bf`**, with no unresolved finding in the scoped action hierarchy, route continuation or default-route control. Hosted PR checks, merge, production deployment inspection, technical completion recording and final permanent-main RAP rebind remain pending at this record's creation. This is technical evidence, not participant comprehension, release permission or financial capability.

The Founder directed **Add simulated deposit** first as the filled primary CTA and **View Activity** second as the secondary action on eligible synthetic Home. The attached older image illustrates the former action order and contains superseded balance-scope wording; it is not authority to restore that copy. Live STATUS §7/§7a/§295 confines this change to the existing `CLASS-A-VAL-002-WEEKEND-PREP-001` ticket.

- Activation [PR #607](https://github.com/mhibajene/hedgr-copilot/pull/607) merged to permanent main at `e8a16f8d0a2bb028d31255e4994cfef6d6f4797a`; required hosted checks, including validate, E2E, build and convergence review, passed.
- Separate projection-only activation rebind [PR #608](https://github.com/mhibajene/hedgr-copilot/pull/608) merged at `820b3dc`. The Verifier checked its one-file diff, all four mandatory source bytes against permanent main, read-only/false execution flags, clean ancestry and deterministic `pnpm bridge:rap:check` with no draft warning before runtime.
- Implementer runtime commit `6612eb2` changes only `apps/frontend/app/(app)/dashboard/page.tsx`, swapping the two existing synthetic Home links. Distinct Verifier commit `00193bf` changes only the three authorised unit/browser test files. Existing CSS assigns the filled navy treatment to the first link and secondary text treatment to the second; no CSS, token, route or financial-state code changed.

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
