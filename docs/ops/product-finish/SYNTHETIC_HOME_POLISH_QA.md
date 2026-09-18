# Synthetic Home polish — independent QA

Date: 2026-09-18. Ticket: `CLASS-A-VAL-002-HOME-POLISH-001` under HEDGR_STATUS.md §7 / §7a. Review role: distinct Verifier/Tester; runtime implemented by the parent agent. This evidence does not supply execution or release authority.

## Candidate and separation

Runtime commit: `9185e7501e4cae90947e954e0233f263dee7afd1`. Activation PR #551 and separate projection-only rebind PR #552 precede implementation. QA additions and this evidence were subsequently committed separately as `642bb9c`; final permanent-main commit mapping and delivery evidence are recorded below.

## Independent review

Reviewed the four-file runtime diff against `SYNTHETIC_HOME_POLISH_BASELINE.md` and both selected reference images. The implementation is bounded to eligible Home presentation and its shell; transaction, ledger, persistence, engine calculation and FX logic are unchanged. The default branch retains its prior presentation, while the existing route predicate controls the new Home surface. Dynamic observation text, comparison, restart access, planning content and research disclosure copy are retained. The amount markup preserves complete readable observation sentences.

Inspected `/tmp/hedgr-home-polish-review/after-desktop.png`, a local rendered viewport capture supplied by the implementer. It shows the approved dark balance panel/actions, warm observation, dynamic available currency comparison, aligned icon-free accordion rows and retained restart control. Also inspected `/tmp/hedgr-home-polish-review/after-mobile.png`: the same candidate stacks the balance/actions and observation with readable wrapping and persistent navigation. This mobile viewport crop ends before the accordions. Subsequently inspected the browser-run `home-accordions-open-390.png`, `home-320.png` and `home-1280.png` under `apps/frontend/test-results/wallet-redesign-*`: expanded research content is retained, narrow text wraps, and native open-state chevrons/focus are visible. Fixed bottom navigation appears within full-page image composites; the passing keyboard/reflow checks, rather than that composite placement, support interaction accessibility. The generated mock's sample balance/currency/unavailable state is not treated as a fixture or acceptance value. No blocking runtime finding identified in this review.

Computed WCAG contrast from the actual opaque CSS token pairs: body/canvas 15.68:1; observation body/surface 14.45:1; observation emphasis/surface 6.02:1; secondary text/canvas 6.26:1; balance caption/navy 9.52:1; white/navy 14.59:1; focus ring/canvas 6.26:1. These checks cover the new text/focus pairs, not a blanket accessibility certification or all existing assets.

## Added and reused coverage

- Added browser verification of native Enter/Space accordion toggles and retained focus; Planning subtitle, all three purposes, nested percentages and monetary boundaries; all three research disclosures; no ledger/wallet mutation.
- Added browser verification of query-route compatibility and presentation isolation across Activity, Settings, default Home and unavailable-data Home.
- Extended existing 320/390/1280px, 100%/200% text reflow coverage to expanded Planning/disclosure content and mobile stacking/desktop side-by-side layout. Existing dialog and Activity reflow checks remain.
- Added two unit cases asserting complete deposit/withdraw observation sentences and simulation boundary after amount emphasis markup.
- Reuse unchanged tests for modal focus trap/Escape return, currency preference, empty/first-event/change observations, pending/unavailable comparison, all non-normal notice states, reset and default-route controls.
- Reuse unchanged `class-a-val-002.spec.ts` for USD 0→5→3, pending navigation/settlement, reset, fractional-cent rejection, repeated withdrawal and full withdrawal to zero. No duplicate transaction cases or runtime changes were added by the verifier.

## Executed checks

- `pnpm --filter @hedgr/frontend exec vitest run __tests__/dashboard.page.test.tsx __tests__/engine-posture-header.test.tsx`: 52/52 passed. Existing mock warnings about `displayEstimate` and intentional NaN fixture appeared; no test failure.
- `pnpm --filter @hedgr/frontend exec eslint tests-e2e/wallet-redesign.spec.ts __tests__/engine-posture-header.test.tsx --max-warnings=0`: passed.
- `git diff --check`: passed.
- Initial full hermetic browser run: 100/101 passed. All four wallet-redesign scenarios, including the two new cases and expanded responsive loop, passed. The sole failure is the pre-existing synthetic B2 assertion in `product-finish.spec.ts:106`, which requires identical deposit/Activity background and foreground colors. This conflicts with the explicitly accepted primary/secondary action distinction. No runtime defect is established by this failure; the assertion requires a bounded verification-only reconciliation. The file was outside the initial exact allowlist, so the verifier first reported the scope issue without editing it. Source-first verification clarification `ae32b861e8f71c5f808098f92432786801ccb7c1` and generated RAP commit `7a972eb` then authorized only this stale synthetic assertion reconciliation. The updated synthetic assertion checks the approved ivory primary/navy text and transparent secondary/white text, retaining shared radius/shadow, default equal-weight assertion and all factual journey checks. Log: `/tmp/hedgr-polish-final-e2e.log`.

## Implementer-observed manual checks

The implementer reported actual local browser checks of both accordion contents and Enter/Space closing, currency ZMW→NGN changing only the local estimate/comparison with USD still 3, and comparison-modal Back navigation. ZMW was restored afterward. These are attributed implementer checks, distinct from the independent source/image review and unit checks above. Physical phone hardware and human participant rehearsal have not been performed by this verifier.

- Implementer reported complete `pnpm run validate` passed, including 900 unit tests, typecheck and lint; log `/tmp/hedgr-polish-final-validate.log`.
- Implementer reported the production build of unchanged runtime commit `9185e7501e4cae90947e954e0233f263dee7afd1` passed before the full browser run. No subsequent runtime edits have been made by the verifier.

## Second browser run: transient readiness failure

The next unchanged-runtime full run again passed 100/101, with the stale synthetic B2 check now passing. The sole failure moved to the existing default-route `empty-error-states.spec.ts:97` assertion that either no-funds or the withdrawal form is immediately visible. Log: `/tmp/hedgr-polish-rerun-e2e.log`. Independent source inspection confirms its helper waits for DOMContentLoaded plus a fixed 500ms, then takes two non-retrying `isVisible()` snapshots. Unchanged Withdraw renders its heading and spinner while methods or balance load; method loading includes a 300ms timer after its effect begins. The implementer observed a heading-only error snapshot; that artifact was replaced by the next run before the verifier could reopen it.

This is consistent with a readiness timing race; resource contention is a hypothesis, not an established cause. There was no runtime change after `9185e75`. Three isolated repeats passed unchanged in 6.7s (log independently read: `/tmp/hedgr-polish-withdraw-timing-check.log`). The subsequent unchanged full suite passed 101/101 in 1.3 minutes using the usual four workers, without simultaneous validation (log independently read: `/tmp/hedgr-polish-accepted-e2e.log`). This supports a transient test readiness failure but does not prove the precise cause or fix the existing test race. The existing test, loading logic, timeout and assertion are unchanged. Subsequent results must be recorded without erasing this failed run.

## Local acceptance before delivery

Local acceptance is satisfied: unchanged runtime production build passed; full validate passed (900 frontend unit tests, 41 Bridge tests, typecheck and lint); final full hermetic browser suite passed 101/101 after the documented synthetic assertion reconciliation; independent source and rendered review found no blocking issue. At that local-acceptance checkpoint the QA commit, hosted checks, merge and shipped verification were pending; they are now recorded below. QA remains separate from runtime. Technical completion does not establish participant comprehension or release the Form/distribution pause; weekend preparation remains unfinished under its sequencing record.


## Hosted and shipped delivery — 2026-09-18

PR [#553](https://github.com/mhibajene/hedgr-copilot/pull/553) merged by rebase at `9e05078752d648a6bb1022a967ec7bc6948d4b2e` on 2026-09-18 11:38 UTC, preserving the Founder-requested separation:

- Runtime: branch `9185e7501e4cae90947e954e0233f263dee7afd1` → permanent main `81d853267aaa2d3114de64065a5c78f00bee8684`.
- Verification-only authority clarification: `ae32b861e8f71c5f808098f92432786801ccb7c1` → `55c6ad04223ac2c7f5ea542641c003ef4312a680`.
- Clarification RAP: `7a972eb` → `1064198ce27fb2561440b2e54747b28dd2cb55ad`.
- Independent QA/tests/evidence: `642bb9c` → permanent main `9e05078752d648a6bb1022a967ec7bc6948d4b2e`.

All hosted checks passed: validate, E2E smoke/e2e, build, typecheck/lint, evidence pack, Bridge snapshot freshness, Vercel and Cursor convergence review. [Hosted E2E run](https://github.com/mhibajene/hedgr-copilot/actions/runs/35340090715) reports 101/101 passed in 2.6 minutes, with 900 frontend tests also passing. Earlier local failures remain documented above.

The production Vercel status for merged head was successful at [deployment 3TQsQZFQaeiNrkEFqwaTZS6uBU8J](https://vercel.com/hedgr/hedgr-copilot-frontend/3TQsQZFQaeiNrkEFqwaTZS6uBU8J). The implementer inspected `https://hedgr-copilot-frontend.vercel.app/dashboard-synthetic-journey` after rollout at mobile and 1280px desktop widths: new balance/actions, warm observation, circled-chevron icon-free rows and replay access rendered correctly. Existing browser state remained USD 3, NGN 4,500 estimate, withdrawal USD 2. Both accordions opened with all planning purposes and three research disclosures visible; Enter/Space closed them with focus retained. Currency comparison opened and Back to Home returned; View Activity retained the completed USD 5 deposit and USD 2 withdrawal. Default `/dashboard` retained its previous presentation and USD 3/ZMW 60 after loading. No production simulation records were added, deleted or reset.

Shipped screenshot artifacts in the local review bundle: `/Users/musalwa/.codex/visualizations/2026/09/18/01a0b2aa-818e-7751-bf08-2a0a6cbb0da2/hedgr-home-polish/` (`mobile.png`, `accordions.png`, `desktop.png`). Browser viewport override was reset; stub backend stopped and port 5050 confirmed clear. These are responsive browser checks, not physical phone/Safari testing or human participant rehearsal.

Technical acceptance is satisfied. The closeout source transition restores only remaining previously approved weekend preparation after permanent-main merge and separate RAP rebind; PR #550 and its unfinished Form are preserved. No Form work or participant publication/distribution occurred in this ticket. Parent validation, comprehension/demand, release and financial capability remain unclaimed.
