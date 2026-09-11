# PA-JOURNEY-002-A — zero-value simulated deposit remediation

Date: 2026-09-12. Authority: D-140 / HEDGR_STATUS.md §7 / §7a / §272, amending the existing CLASS-A-VAL-002-ACTIVITY-DETAIL-001 ticket. Technical implementation and QA evidence only.

## Defect and correction

Independent QA at `38c6d3a05ed9776e70fbe8127f5cc555943a90ed` reproduced a 1 NGN input previewing USD 0.00, confirming successfully, claiming the balance increased by $0.00, and adding a completed zero-value Activity entry. At the fixed 1500 NGN/USD rate, integer inputs 1–7 round to USD 0.00.

On research and default simulated Deposit, the page now rejects the available-rate zero-USD preview before pending state, transaction creation, ledger append or balance effects. Confirm is disabled and the handler independently returns. The existing input error association displays “Enter an amount that rounds to at least $0.01 in this simulation.” The numeric preview stays truthful; the promise that confirming adds this amount is withheld. Correction to 8 NGN clears the error and follows the existing USD 0.01 path.

This does not change the accepted positive-credit rounding policy. For example, 100 NGN still previews USD 0.07 and Home still derives NGN 105.00. The fixed invented FX comparison remains unchanged. Non-simulated routes, missing-rate review bypass, existing records, rates and ledger normalization are preserved. No migration or real-money minimum is introduced.

## Local validation

- Regression demonstrated before implementation: three new zero-credit cases failed because Confirm remained enabled.
- After implementation: all 31 Deposit tests passed, including research NGN 1/7 rejection, default simulated rejection, NGN 8 recovery, no client/ledger/wallet effects for rejected inputs, non-simulated preservation, and minimum whole-unit positive-credit controls for the other four currencies. Existing default-100 and unavailable-rate cases remain unchanged.
- Full `pnpm run validate` passed: 71 frontend test files / 868 tests, workspace typecheck/lint, trust checks, RAP and Bridge checks.
- Production build passed with Node 20.19.5 / pnpm 9.12.0, mock auth, stub FX and local stub backend.
- Full hermetic Playwright suite passed: 94 tests. New browser regression preserves financial storage and the two-entry Activity record through invalid inputs and refresh, then creates exactly one accepted USD 0.01 entry after correction and moves the position from USD 3.00 to USD 3.01. All five currency journeys and the existing Currency Insight suite ran unchanged.
- Manual desktop browser inspection of the local production build confirmed the error, disabled Confirm, numeric USD 0.00 preview, and correction to one USD-cent credit.
- Distinct independent Verifier found no material issues and independently reran all 31 Deposit tests. The handler's defensive return was inspected in source; disabled-button tests exercise the UI path rather than directly invoking that return.

## Delivery and limits

Authority was committed before implementation and projection generation. Work began stacked on D-139 PR #521 without altering its branch; #521 subsequently merged at `80e769046a85c50a013e04b1dc13edad6c8f77c3`, allowing this bounded amendment to target main separately.

Hosted gates, merge, shipped-route inspection and permanent-main projection provenance are recorded at closeout rather than inferred from local results. This evidence does not establish participant comprehension, demand, parent acceptance or distribution readiness. Form/protocol, About, Lane E, financial capability and other work remain unchanged. NO CROSS-LANE IMPACT.
