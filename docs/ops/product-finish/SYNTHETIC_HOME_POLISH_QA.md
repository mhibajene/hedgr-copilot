# Synthetic Home polish — independent QA

Date: 2026-09-18. Ticket: `CLASS-A-VAL-002-HOME-POLISH-001` under HEDGR_STATUS.md §7 / §7a. Review role: distinct Verifier/Tester; runtime implemented by the parent agent. This evidence does not supply execution or release authority.

## Candidate and separation

Runtime commit: `9185e7501e4cae90947e954e0233f263dee7afd1`. Activation PR #551 and separate projection-only rebind PR #552 precede implementation. QA additions and this evidence are subsequent working-tree changes for a separate QA commit; the implementer will record that commit and final delivery evidence below.

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

## Remaining delivery evidence

Local acceptance is satisfied: unchanged runtime production build passed; full validate passed (900 frontend unit tests, 41 Bridge tests, typecheck and lint); final full hermetic browser suite passed 101/101 after the documented synthetic assertion reconciliation; independent source and rendered review found no blocking issue. All QA additions remain separate from the runtime commit. The QA commit, hosted checks, merge and shipped verification are still pending and must be recorded after execution. Technical completion does not establish participant comprehension or release the Form/distribution pause; weekend preparation remains unfinished under its sequencing record.
