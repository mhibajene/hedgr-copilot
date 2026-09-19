# Shared UI baseline — QA evidence, 2026-09-19

Scope: the finite Home / Activity / Settings presentation amendment inside `CLASS-A-VAL-002-WEEKEND-PREP-001`, approved in HEDGR_STATUS.md §7a. Authority PR #566 merged at `723364110bc5a76197f71f421b32a4e2abb9aa39`; projection-only permanent-main rebind #567 merged at `46bdc7bb33fc337bffed5e3276b49a22fe058bab`. Runtime and verification/evidence are separate commits in PR #568.

## Reviewed change

Both default and synthetic journeys use the approved ivory canvas, navy dominant balance, peach explanatory context and common Home / Activity / Settings navigation. Home's research-only currency difference remains subordinate to the balance and includes the direction arrow beside its cause. Activity keeps smaller transaction amounts and completed simulated balance-after evidence. Settings retains route-specific currency eligibility and default About access. Default Copilot access remains available when enabled.

No calculation, ledger, persistence, lifecycle, provider, engine, Form or participant-distribution change is included. Comparison values remain fixed illustrative fixtures. Empty, pending, failed, unavailable and non-normal states retain their existing meaning and disclosures. The default modal and synthetic native disclosure retain their existing interaction patterns.

## Independent review and remediation

A distinct Verifier reviewed authority, runtime diff, tests and rendered evidence. Static review found no financial, eligibility or route-isolation blocker. Initial enlarged-text renderings exposed narrow Activity description columns, fragmented action/filter/navigation labels and a short balance wrapping. Scoped CSS fixes stack Activity evidence and Home actions at narrow container widths, wrap whole filter controls and header items, preserve full navigation words and size the balance against its container. Final screenshot review also removed inherited left indentation from default Activity amounts. Latest runtime fix: `1a07f71`; verification reconciliation: `f84cb24`.

The reflow check measures actual per-word DOM Range fragments rather than an arbitrary minimum width for an inline label. Existing exact-value assertions still verify unchanged monetary amounts; only the approved balance-after separator and shared Settings header expectations were reconciled. Hover-state isolation prevents the login click position from contaminating resting-button style checks.

## Verification

- Full `pnpm run validate`: PASS, 900 frontend tests, 41 Bridge tests, typecheck, lint and trust checks. The retained subordinate NARRATIVE-007 warning is unchanged; no universal governance-consistency claim is made.
- Production build under mock/stub configuration: PASS.
- Full hermetic browser suite: PASS, 106/106 at `f84cb24`, including the final short-amount reflow assertion. Independent runtime, rendered and QA review at `f84cb24`: PASS, no remaining blocking findings. The Verifier inspected normal/mobile, enlarged Settings and desktop Home/Activity captures plus the final browser log; this does not establish participant comprehension or release approval.
- Coverage includes both journeys at 320 / 390 / 1280px, 200% root text, a long amount, keyboard details, filters, comparison-dialog focus return, route-preserving navigation, unchanged stored data, currency eligibility, zero → five → three USD, full withdrawal and reset, pending/failed/unavailable and non-normal notices.
- Text contrast from retained palette pairs: white/navy 14.59:1; pale navy text/navy 9.52:1; dark ink/ivory 15.68:1; muted ink/ivory 8.71:1; terracotta/peach 6.02:1; dark ink/peach 14.45:1.

Checks use hermetic stub services on isolated ports 3001 / 5051. Screenshots use seeded synthetic records (including fixed historical timestamps), not participant data. They are rendering evidence, not comprehension evidence.

## Delivery boundary

Required hosted checks and deployed visual/function inspection must pass before technical completion. Their final results and merged/deployment identifiers belong in PR #568's delivery record. Verified delivery consumes only this finite UI pass. The existing weekend instrument, human rehearsal/timing and explicit release duties remain open; draft #550 and its Form are untouched, participant publication/distribution remains paused, and no Lane G/E or parent closeout follows.

Rollback is a revert of the scoped runtime commits, with no migration. **NO CROSS-LANE IMPACT.**
