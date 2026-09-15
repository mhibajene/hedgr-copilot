# Wallet redesign — accepted research baseline

Date: 2026-09-15
Ticket: CLASS-A-VAL-002-WALLET-REDESIGN-001
Authority: D-147 / HEDGR_STATUS.md §7 / §7a / §279.
Status: Founder reviewed and approved; merged in PR #536 at `799fb95b5991c26bfa2588cf6c1a060033c1e1ef`; production verified. Technical closeout D-148 / §280.

![Accepted final hybrid](wallet-redesign-baseline.png)

## Accepted design

- Home balance: current 20px bordered card, 12% color-100 tint, restrained shadow.
- Deposit / Activity: equal-weight soft white rectangular controls, pale border and current utility shadow; no dark outlines or tinted fill.
- Reading order: position, change observation, currency context, planning targets.
- Currency Context: a focused read-only explanation, keeping constant USD, invented rates and all financial limits explicit.
- Activity: chronological event evidence with a completed event's before/change/after values, filtered without changing reconciliation.
- Research navigation: Home, Activity, Settings. Use the governed logo and existing utility assets rather than generated approximations.

## Translation boundaries

Only the eligible explicit synthetic research journey is redesigned. The image uses invented $300/$500/$200 and ZMW examples; runtime reads existing state and fixtures. Currency Context is a dialog, not a new financial or account-history source. Preserve all exceptional states, non-normal notices, simulation captions, trust disclosures and existing planning meaning even where absent from the image. Default routes, financial state, simulation arithmetic and research distribution remain unchanged.

## Source

Founder accepted the final hybrid in Codex thread 01a0a3d4-b958-7472-afb3-e1e99ba55763 and then explicitly authorized repo translation, research journey first. Imagegen output exec-27470ecb-0e0f-4070-b35d-3c70e5274e8d.png. The ChatGPT conversation Compare Dashboard Variants (6aa904be-c9bc-83ec-90ff-5ab59895c87c) supplied advisory comparison only.

## Verification

- Authority and baseline committed first at `e64f5b58b2cded327eefddfdb4213e1df9f1b568`; deterministic RAP generated from that committed authority.
- Full validate passed: 72 test files / 876 tests, TypeScript, ESLint and repository checks.
- Production build and complete hermetic browser suite passed: 96 tests.
- All five currencies preserve `$0 → +$5 → −$2 → $3`, existing financial storage, transaction rounding and fixed illustrative rates.
- Dialog keyboard containment/Escape/focus return, Activity filters and completed before/after values, 320px/390px/desktop and enlarged text passed.
- Default and unavailable-data routes retain their previous presentation; non-normal posture notices and pending/failed Activity details have direct coverage.
- Matched production captures and comparison history: [design QA](../../../design-qa.md). Local screenshot artifacts are reproducible through `wallet-redesign.spec.ts`.
- Distinct verifier disposition: PASS for the final implementation diff and all three clean production reference captures, with no open P0/P1/P2 findings; final 96-test log and diff check also verified. Required hosted checks passed, the Founder approved the rendered Vercel preview, and production was inspected after merge.

No dependencies, financial state, engine computations, rate fixtures, Form/protocol or About changes. Technical and visual QA are not participant comprehension, demand or parent acceptance. NO CROSS-LANE IMPACT.

## Delivery

Founder rendered disposition: “Reviewed and approved.” PR [#536](https://github.com/mhibajene/hedgr-copilot/pull/536) is merged. The [production research journey](https://hedgr-copilot-frontend.vercel.app/dashboard-synthetic-journey) was verified, including Currency Context dismissal/focus return, completed Activity reconciliation and the unchanged default-dashboard control. Production inspection preserved existing stored simulation records and did not create new transactions. D-148 / §280 closes only this nested ticket; both parents remain open without active nested tickets. Permanent-main projection rebind follows the closeout squash through the normal repo posture.

## Approved Activity CTA refinement — D-149 / §281

On 2026-09-15 the Founder approved the inline imagegen variant removing only “See the activity” from “What changed”. Both that link and View Activity led to the same research Activity list. Retain View Activity beside Add simulated deposit and the primary Activity navigation. The observation card contracts naturally; current CSS, tint, polish, observation/non-guarantee copy and all state/financial/default-route boundaries remain unchanged. Exact bounded implementation and verification scope: `CLASS-A-VAL-002-ACTIVITY-CTA-001`, §7a. Delivery verification is recorded at closeout; this approval is not participant evidence.

**D-150 / §282 verified closeout:** PR [#539](https://github.com/mhibajene/hedgr-copilot/pull/539) merged at `e4bf50c2f1669b4baac81568b3cd8e4941163fc0`. Full validate, production build, 96/96 hermetic browser tests, distinct scope/rendered QA, required hosted checks and preview/production verification passed. Temporary isolated local ports resolved an unrelated Cursor listener conflict without changing repo configuration. Production preserves existing records and retains both Activity entry points while removing the observation-card duplicate. Only this nested refinement closes; parents remain open, distribution paused, About frozen/published. NO CROSS-LANE IMPACT.
