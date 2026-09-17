# CLASS-A-VAL-002 weekend QA and remediation

**Date:** 2026-09-18 (Australia/Perth). **Ticket:** `CLASS-A-VAL-002-WEEKEND-PREP-001`.

**Status:** Runtime implementation and local/distinct verification complete; hosted delivery and instrument preparation pending. No participant publication/distribution or parent acceptance follows from this record.

## Authority and baseline

The Founder approved the self-guided format and four-fix remediation on 2026-09-18. PR [#547](https://github.com/mhibajene/hedgr-copilot/pull/547) merged the exact §7 / §7a activation and approved instrument at `cbd53031d879298bd08881cfcd6433671baaabb0`; PR [#548](https://github.com/mhibajene/hedgr-copilot/pull/548) separately rebound RAP to that permanent-main authority at `54aba0e3d904affa5f575e2fd6deac9c3e1b8539`. Required hosted checks and convergence review passed for both. Local full validation and RAP checks passed, and recursive comparison found no non-provenance change in the rebind. The known subordinate `NARRATIVE-007` warning remains visible and unrepaired.

The read-only QA baseline was `358df511a3426d8b3fc000af5458bf942d20e582` (PR #546). Existing targeted tests passed **120/120**, but four additional actual-component/reactive-ledger reproductions demonstrated the defects below. The coordinator independently reproduced T1/T2 at the production alias and verified the normal NGN 7500 → USD 5 → USD 2 withdrawal → USD 3 journey. Baseline deployment evidence: GitHub deployment `6473413632`, successful immutable URL `https://hedgr-copilot-frontend-7sbjag30b-hedgr.vercel.app`.

Original local evidence is preserved at `/Users/musalwa/Documents/Codex/2026-09-17/hedgr-weekend-qa/`: `readiness-review.md`, `technical-qa.md`, `defect-reproductions.test.tsx`, `audit-gallery.html`, and numbered screenshots. Those reproduction assertions deliberately demonstrate the old failures; they are not fix-verification results.

## Findings and acceptance

All four findings are Medium synthetic/research defects. No real-money effect is claimed.

| Finding | Reproduced failure | Required corrected behaviour |
| --- | --- | --- |
| WQA-T1 | Full withdrawal reserves the entire available balance and replaces pending/completed feedback with the no-funds empty state. | Retain current simulated transaction status, zero remaining balance and onward Activity navigation; retain the ordinary idle no-funds state. |
| WQA-T2 | Leaving Deposit during its confirmation delay cancels the page-owned timer and strands the pending record. | Page-independent completion at the existing delay; one settlement/credit; identity/status recheck; missing, reset, failed or settled records cannot be resurrected. |
| WQA-T3 | After a USD 1 withdrawal from USD 5, entering USD 2 still previews the former starting balance. | Editing the completed interaction starts a new draft using USD 4, previews USD 4 − 2 = 2 and preserves the completed record. |
| WQA-T4 | USD 0.001 can create and settle a transaction rendered as USD 0.00. | Reject below-cent/fractional-cent simulated input before records, holds or timers; accessible error, button/handler guard, valid correction including USD 0.29. |

Scope preserves accepted positive Deposit rounding, all five invented FX rates, financial/disclosure boundaries, non-simulated behaviour, ledger/wallet schemas, engine/targets, frozen About and other lanes.

## Verification ledger

The runtime patch changes only Deposit, Withdraw and the new `lib/deposits/synthetic-deposit-lifecycle.ts`. The helper captures the immutable deposit identity and balance mode, owns one timer per reference, and rereads pending/settled state before settlement and wallet fallback credit. The page derives its result from its own ledger record. Withdrawal editing clears the prior snapshot; active results remain visible at zero. Precision is checked on the decimal string: at least USD 0.01, at most two fraction digits; exponent notation and extra trailing decimal digits are rejected instead of silently rounded.

| Check | Result |
| --- | --- |
| Focused checked-in page/lifecycle tests | **69/69 passed**; real ledger, wallet and `useBalance` integration plus retained mocked controls. |
| Separate verifier harness | **10/10 passed**; original four interactions, wallet exactly-once, reset/failed/settled/replaced-record guards, and synchronous reset during settlement. |
| Full `pnpm run validate` | **PASS**, including **898 tests / 73 files**, typecheck, lint, trust and authority checks. |
| Production build with mock/stub environment | **PASS**; runtime unchanged after this build. |
| Complete hermetic Playwright suite | **99/99 passed** (96 existing plus three new regression scenarios). |
| Distinct scope/code/test review | **PASS**, no remaining blocker. |
| Local rendered check, 390px | Fractional-cent error/disabled button; new draft USD 4 − 2 = 2; full USD 4 withdrawal retains pending/completed feedback, USD 0 remaining and Activity link. |

The initial full browser run passed all 96 existing tests and failed the three new tests because of harness mistakes (unhandled restart confirmation, an old Activity navigation selector and an ambiguous alert selector). These were corrected without runtime changes. Pending-state tests now pause the clock, assert pending before navigation/reset, explicitly accept reset and advance the existing timer. The targeted three and final complete 99-test runs passed. A local manual restart tab stalled on its confirmation; no successful manual restart claim is made from that tab. The automated restart regression supplies that check.

Local logs: `/tmp/hedgr-weekend-runtime-validate-final.log`, `/tmp/hedgr-weekend-runtime-build.log`, `/tmp/hedgr-weekend-runtime-e2e-final.log`; separate verifier harness `/private/tmp/hedgr-weekend-qa-20260917/verification.test.tsx`. Local rendered evidence: `verified-2026-09-18/` beneath the original QA directory, including `05-full-withdrawal-completion-viewport.png`. Browser-width emulation is not an actual iPhone/Android human rehearsal.

Hosted checks, runtime delivery PR/commit and immutable deployment remain pending. Inspect the shipped mobile standard USD 0→5→3 journey, affected edges and default-route controls before technical closeout.

## Instrument and release boundary

The separate [Digital Feedback v1](HEDGR_CLASS_A_VAL_002_DIGITAL_FEEDBACK.md) is approved for an unpublished, response-free Form. Runtime and instrument delivery are sequential. Preserve the v2.1 draft and historical Forms/data. The completed, partial and no-access paths require 9, 4 and 2 answers respectively, with one optional comment on every path.

The T2 fix is bounded to navigation within the running app. A full browser reload or tab termination destroys the in-memory timer; this work does not promise durable background completion or repair historical pending records. During rehearsal, confirm the simulated result before reloading or closing the journey. Return from the Form using the separate no-reset resume link in the same browser; do not use orientation/Enter Hedgr as a resume action. Different browser contexts may have different synthetic state.

Human phone rehearsal must measure journey and Form times separately and check actual iPhone Safari / Android Chrome, enlarged text, messaging-browser handoff, back navigation and tab switching. The 3-minute Form / 5–8-minute total targets remain unmeasured. Explicit Founder release disposition is still required after technical verification and rehearsal; agents are not authorised to send participant messages. Technical closeout is not comprehension, demand, parent acceptance or release. **NO CROSS-LANE IMPACT**.
