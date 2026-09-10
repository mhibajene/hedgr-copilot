# Currency insight — implementation and review evidence

Date: 2026-09-10  
Ticket: `CLASS-A-VAL-002-CURRENCY-INSIGHT-001`  
Authority: Internal D-133 / `HEDGR_STATUS.md` §7 / §7a / §265  
Status: Implemented locally; reviewer QA performed; delivery held by the trust-copy gate pending a separately approved one-file amendment. No merge or participant-comprehension success is asserted.

## Candidate and retained contract

Base: `3d7e71df119b42bb5ac93e83558792dfbeacd7cb`. Authority was committed at `16f314268a2a6b519cc415910a678fd4c5ba08b9` before generated RAP. Runtime and tests are committed at `941ce0cb6f93b38c636f01d50c9a89aef2311d39`; reviewer scope is this immutable implementation diff against the base, plus the approved D-133 authority record. The containing PR records later hosted checks and merge identity if delivery proceeds.

Compressed B is inside the current-position card, above the retained equal-weight utilities. One primary USD amount and one existing current display estimate remain. The new surface adds a local difference, same-colour straight directional glyph, held-constant explanation, visible material limits and native calculation disclosure. Earlier/latest amounts and rates appear in the disclosure. There is no chart, movement percentage, profit/loss colouring, new selector, live quote, state writer, timer, event emitter or comparison subscription.

The comparison receives the existing fixed display rate; it does not duplicate the latest-rate table or change Deposit, Withdraw, Activity, wallet, ledger, engine or planning. It applies the same current USD amount to both invented samples, rounds each estimate to local cents using decimal integer arithmetic, then subtracts displayed cents. Direction comes from that displayed difference. A rounded zero with unequal rates is distinct from equal rates.

| Currency | Latest units/USD | Invented earlier units/USD | Latest estimate at USD 300 | Earlier estimate | Difference |
| --- | ---: | ---: | ---: | ---: | ---: |
| ZMW | 20 | 19 | 6,000.00 | 5,700.00 | 300.00 |
| KES | 130 | 123.5 | 39,000.00 | 37,050.00 | 1,950.00 |
| NGN | 1,500 | 1,425 | 450,000.00 | 427,500.00 | 22,500.00 |
| GHS | 15 | 14.25 | 4,500.00 | 4,275.00 | 225.00 |
| PHP | 56 | 53.2 | 16,800.00 | 15,960.00 | 840.00 |

The shipped fixture is the higher-estimate example only. Lower, equal, rounded-zero, missing, stale and invalid samples are injected in tests; there is no runtime scenario control. Scenario day 0/day 30 does not represent account history or real calendar dates. The fixed samples do not age against the wall clock.

Only explicit eligible research Home and its retained compatibility route render the component. Existing mock-auth/non-live-FX eligibility and unavailable-data exclusion remain. The normal `change` attention sentence is scoped to simulated activity only when currency context is rendered; the opt-in defaults false. Empty/first-event observations, transaction evidence, non-normal notices and default Home copy remain.

## Technical verification

- Four targeted unit files initially passed 75 tests. Full workspace tests then passed, including 857 frontend tests. A final additional legacy-wallet/invalid-input integration test passed with the full 17-test Dashboard file; the latest frontend suite therefore contains 858 tests, but that final addition has only targeted verification at this record.
- Frontend production build passed with mock auth, stub FX, mock DeFi and local stub API on port 5050. Workspace typecheck, lint, trust environment check, RAP and Bridge snapshot checks passed. No dependency, CI or environment file changed.
- The full protected-parity hermetic Playwright suite passed all 92 then-present tests. One subsequently added blocked-preference-storage test passed separately, making 93 covered browser tests. Existing tests outside the five named files ran unchanged.
- Every currency completed the equivalent `$0 → +$5 → −$2 → $3` journey. Assertions retain selected-currency Deposit preview, USD withdrawal arithmetic, latest Home estimate, two factual ledger records, Activity continuity, market/storage invariance and unchanged default/unavailable routes. Opening/closing the new disclosure generated no network request or storage change.
- Unit and browser checks cover positive, zero, pending (including numerically cancelling pending entries), unavailable sample metadata, invalid values, stale samples, mismatch with the independent display rate, large numbers, half-cent rounding, hydration, reset, preference fallback, blocked storage, route opt-in and all non-normal cautions. No missing data is silently treated as an unchanged rate.
- Browser MutationObserver evidence checks that persisted KES hydration does not expose a ZMW comparison or a mismatch with the current display estimate. Clean start and restart end with “No position to compare yet.” and no direction.
- Sixteen full-page captures cover 320/390/700/1280 px, 100%/200% root text, and collapsed/expanded states. Geometry checks found no horizontal overflow within the new component or page, and utilities remain below the position card. Native disclosure supports Enter/Space, visible keyboard focus, and decorative arrows hidden from assistive technology. No new live region or animation is present. Captures are local QA artifacts, not participant records or live 200% browser-zoom evidence.
- Visual inspection of mobile collapsed and desktop expanded captures confirms the retained hierarchy and legible wrapping. Approved indigo-on-white contrast: body/arrow `#36447C` 9.23:1, headline `#171D35` 16.62:1, focus `#4658A0` 6.64:1. No token or brand asset was changed.

The first browser run exposed suppression after clean start because the existing route hook can retain the consumed reset query. The correction waits for the cleared position and permits the empty comparison once settled. The reset and hydration regressions passed in the full browser run. The implementation also preserves the existing legacy-wallet source mode while suppressing a transient stale positive ledger projection after reset.

**Blocking check:** `pnpm run validate` currently stops at `trust:phrases`: the checker flags “guaranteed” in the exact Founder-approved denial, “FX comparison only—not earnings, purchasing power, guaranteed protection or a conversion quote.” The supported remediation is an exact-sentence substring exception in `scripts/trust-phrases.allowlist.txt`. That file is outside the approved §7a list; approval was requested. The allowlist has not been changed, the scanner has not been bypassed, and full validate is not reported as passing. Hosted checks, delivery and permanent-main provenance remain outstanding.

# Adversarial Review Result

## Decision Posture

Hold — release gate only. The implementation is complete within its named runtime/test scope, but the approved negative disclosure fails the existing trust-copy scanner.

## Highest-Risk Finding

Do not equate a correct negative disclosure with permission to bypass the trust check or widen the allowlist file scope. Keep release held until the exact amendment is accepted and the normal validation/hosted gates pass.

## Findings

- Finding: Trust-copy scanner rejects the approved denial of guaranteed protection.
- Severity: Delivery blocker; no misleading positive financial claim was found in the scoped implementation.
- Evidence: `CurrencyInsight.tsx` visible limit and `pnpm run validate` trust-phrase failure. The documented checker supports intentional negative-disclaimer exceptions.
- Why it matters: Hiding the phrase from the scanner or skipping the gate would weaken the trust workflow; modifying an unnamed file without approval would exceed D-133.
- Required action: Accept the exact-sentence allowlist amendment, record it in §7a/AGENTS/D-133, rerun full validate and hosted checks, then complete normal merge and provenance closeout. If wording is revised instead, separately record the accepted copy.

No additional blocking runtime defect was found in the post-implementation review. The clean-start defect found during browser QA was corrected and retested. This is a separate Codex verifier pass over the immutable implementation, not an independent human review or participant study.

## Module Results

- Authority Stress Test: D-133 is committed before runtime and sequentially disposes D-132. Proposed allowlist expansion remains unexecuted and blocks delivery.
- Semantic Drift Test: Higher/lower refers to a local estimate under two invented rates; the unchanged current USD input, scenario dates and excluded earnings/purchasing-power/protection/conversion meaning are explicit. The observation amendment is opt-in and activity-scoped.
- Financial Boundary Test: No accounting, provider, conversion, deposit/withdrawal, financial-state or event-writing surface changed. Expanded totals reconcile to the visible difference.
- Implementation Risk Test: Decimal-safe calculations, explicit unavailable states, route isolation, hydration/reset gating, zero/pending behaviour, caution preservation and browser reflow are tested. The initial reset defect is resolved.
- Governance Consistency Test: Only one nested Lane V ticket is active. Controlled Parallelism v21, Lane E, paused distribution and frozen About are preserved. Technical closeout of D-132 does not accept comprehension or parent validation.
- Doctrine & Founder Intent Test: The retained compressed B placement and calm neutral arrows express interpretation without advice, urgency, allocation authority or a financial guarantee. The exact approved disclaimer is preserved pending the supported scanner exception.
- False Consensus Test: Founder visual approval and passing technical tests do not demonstrate reduced cognitive load, relevance, demand or superiority to a currency calculator.
- Shadow Authority Test: Mockups, this review and proposed research prompts do not activate a successor, participant distribution, Form/protocol changes, live FX or additional financial capability.

## False Alignment Check

An upward local estimate can look like earnings or safety even with technically correct arithmetic. The visible limits and falling-estimate review case reduce ambiguity but do not establish understanding. Hypothetical current-amount comparisons must not be interpreted as historical holdings. Retain spontaneous and prompted explanations separately in any later authorised study.

## Recommended Next Step

Founder review required — exact one-file trust-disclaimer amendment only. Then full gates and normal delivery; no new product scope is proposed.

## Proposed research checks — preparation only

Hypothesis: linking currency movement to the current position makes Hedgr's interpretation role more understandable and personally relevant. Capture an unaided settled-journey baseline before exposing the concept. Ask what changed and stayed the same; only afterward ask what the arrow means and whether the display implies earnings, safety, spendability or available conversion. Ask the participant to explain Hedgr and connect the information to a recent personal currency situation and existing tools. Present a falling-estimate case after recording the initial answer; classify it as additional exposure.

Separate spontaneous understanding, prompted correction, ambiguity and unsupported inference. Use behaviour and recent context rather than nationality as the relevance proxy. Do not teach “preserving value” and score repetition as success. A small sequential qualitative study cannot establish causal cognitive improvement, market size, willingness to pay or repeat use. Confusion about earnings, actual holdings, safety or supported conversion is a failure signal; neutral restatement after prompting is not unaided success.

No participant was contacted or exposed through this implementation. No Form, protocol, response, distribution or collection mechanism changed. Participant distribution remains paused pending the existing reconciliation gate. `NO CROSS-LANE IMPACT`.

## Rollback

Revert the D-133 runtime/test composition and observation opt-in to restore the retained D-132 experience. No schema change, migration, financial record repair, preference reset or live action is needed. Preserve unrelated local `output/` and `tmp/` content. Any experiment withdrawal or later successor still requires the normal authority record.
