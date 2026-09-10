# Synthetic display currency — prospective evidence note

Authority: D-132 / HEDGR_STATUS.md §264, `CLASS-A-VAL-002-DISPLAY-CURRENCY-001`, nested within parent Lane V. Class A informational only. `NO CROSS-LANE IMPACT`.

Status: preparation and technical verification only. This note does not amend the canonical Form or participant protocol, authorise collection or distribution, or establish comprehension. Participant distribution remains paused pending separately authorised live-Form and protocol reconciliation. Parent validation remains open; About stays frozen and published.

## Candidate and hypothesis

Implementation baseline: permanent main `ba8c13349b890ed0793dac7d3e6b88252d67c112` (D-132 activation and permanent-main RAP rebind). The implementation PR containing this note identifies the candidate patch; its immutable merge commit identifies the delivered build. Before any separately authorised research, record the exact deployed commit, route, instrument version, exposure order and selected currency. Do not treat a mutable deployment URL as a build identity.

Hypothesis: a familiar display currency helps participants interpret position, stability and what changed while retaining USD as the reference and understanding the simulation boundary. The original candidate changed Position estimates only. Under the Founder-approved 2026-09-10 amendment, the selected currency also denominates eligible synthetic Deposit input at its fixed illustrative rate and supplies Withdraw estimates. Selection alone does not change existing balances, Activity or planning percentages; confirmation records the resulting USD simulated event. Withdraw input remains USD.

| Display currency | Fixed illustrative units per USD | Estimate for USD 3.00 |
| --- | ---: | ---: |
| ZMW — Zambian kwacha | 20 | ZMW 60.00 |
| KES — Kenyan shilling | 130 | KES 390.00 |
| NGN — Nigerian naira | 1500 | NGN 4,500.00 |
| GHS — Ghanaian cedi | 15 | GHS 45.00 |
| PHP — Philippine peso | 56 | PHP 168.00 |

These are synthetic numerical fixtures, not current rates, guaranteed FX or evidence of market support. The preference is browser-local, defaults to ZMW and survives a simulated-journey restart. It does not create an account currency or local balance.

## Proposed neutral prompts, subject to protocol reconciliation

Begin with unaided explanation before revealing targeted checks:

1. “In your own words, what did you see and do in this walkthrough?”
2. “What does the position tell you? What changed during the walkthrough?”
3. “What do the two amounts mean to you?”
4. “What, if anything, changed when you selected a different display currency?”
5. “What do you think you could and could not do with Hedgr at this stage?”

Then check unresolved concepts without treating prompted correction as spontaneous understanding:

- “How was the local estimate determined? How certain or current do you think it is?”
- “What currency, if any, do you think Hedgr holds for you here?”
- “What happened to real money during this walkthrough?”
- “What would you expect if you tried to deposit, withdraw, convert currency or open a local account?”
- “What, if anything, does the appearance of a currency tell you about where Hedgr is available?”
- “What do Now, Reserve and Growth represent? What happens when their percentages change?”

Classify spontaneous explanations, responses after prompting, corrections after disclosure and unresolved/contradictory answers separately. Preserve the participant's meaning; do not coach to a pass or infer unaided comprehension from recall after correction. No participant responses are collected by this note or implementation.

## Comparison and interpretation

Prospectively compare the retained fixed-ZMW baseline against the selectable-display candidate using the same USD sequence ($0 → +$5 → −$2 → $3), disclosures and task. Predefine the point from which time is measured and the comprehension criterion before claiming faster interpretation. Record currency familiarity, prior Hedgr exposure, baseline/candidate exposure order and whether each explanation was unaided. Account for order and cohort differences; do not attribute them to the selector. Currency choice is not a proxy for country, citizenship or jurisdiction.

Success signals require correct distinction between USD reference and illustrative display estimate; no inferred local balances, real-money movement, live deposits/withdrawals/conversion/local accounts or market availability; and Now / Reserve / Growth understood as planning purposes. Faster understanding requires comparative evidence, not subjective impression or technical checks.

Failure signals include inferred live country support, deposit/withdrawal availability, guaranteed/live FX, separate currency balances, regulatory approval or market-entry availability. A mixed explanation, prompted-only correction, uncertainty about either amount, or unexplained cohort difference remains unresolved rather than success.

## Stop and rollback

Pause the experiment if any specified support, FX, balance or regulatory inference occurs. Restore fixed ZMW or disable the selector through a scoped revert, preserving local simulation records and without a migration. A Settings-only selector does not itself resolve a comprehension failure. Record the observed interpretation and obtain a separately authorised disposition before further research or refinement.

## Technical verification boundary

Named unit and browser tests cover the five fixtures, rounding, browser-local persistence and blocked storage, entry disclosure order, Settings keyboard interaction, default-route preservation and unchanged financial state. Browser verification includes 320/390/1280 px and 200% root text. Technical evidence and screenshots establish rendered behaviour only; they cannot establish participant understanding, demand or readiness.

### Local candidate verification — 2026-09-09

The Founder approved the two detailed scope amendments: the single stale dashboard caption assertion and synthetic-only Account-row wrapping. Both are recorded in D-132's §7a brief and implemented without changing Account copy or default Settings layout.

`pnpm run validate` passes, including all 788 frontend unit tests, typecheck, lint, trust checks and Bridge projections/snapshots. The hermetic frontend production build and all 76 browser tests pass. Screenshots were inspected at 320/390/1280 px and 200% root text; the picker supports readable wrapping, scrolling, keyboard selection and focus return.

The all-five-currency test preserves USD, market, Activity, planning and transaction previews, and emits no network request during preference changes. The original $0 → +$5 → −$2 → $3 journey passes. Blocked/invalid storage, navigation/reload/restart persistence, default routes and the unavailable-data scenario remain covered. The implementation PR containing this note records hosted check outcomes and the immutable merge commit; local verification alone is not a claim of merged or deployed delivery. No participant evidence, research resumption or comprehension acceptance is claimed.


### Approved transaction-currency remediation — 2026-09-10

The Founder observed a KES Position estimate followed by legacy ZMW Deposit input and Withdraw estimate, approved the specific correction, and requested aligned currency tests. The candidate uses the same fixed fixture table for eligible synthetic Deposit input and Withdraw estimates. USD stays the balance reference and Withdraw input. Example equivalent USD 5.00 deposits are ZMW 100, KES 650, NGN 7,500, GHS 75 and PHP 280; withdrawing USD 2.00 leaves USD 3.00 in every case. The original 2026-09-09 fixed-Deposit verification above is historical and is superseded only for these newly authorized behaviours.

New deposits preserve the existing ledger schema: rounded USD is normalized at 20 ZMW/USD for `amount_zmw` / `fx_rate`. Selected-currency input is never mislabeled as ZMW. Existing events are untouched; preference selection alone produces no event. GHS/PHP remain simulation fixtures and are not added to provider/market/transaction configuration. Default routes and the unavailable-data scenario retain their existing behavior.

Local verification passes for this amended candidate: full `pnpm run validate` (812 frontend unit tests plus workspace/Bridge checks, typecheck, lint and trust), hermetic production build, and all 81 browser tests. All five selected-currency journeys preserve `$0 → +$5 → −$2 → $3`, settled USD records and valid ZMW reference fields, default routes and unavailable-data behavior. Unit cases cover rounded KES/NGN/PHP inputs and invalid-currency fallback; screenshots of Deposit and Withdraw were captured at 320/390/1280 px and 100%/200% root text and inspected at mobile sizes. The new browser tests were corrected to use the retained accessible input name and Activity return path. The existing no-request-on-selection test now waits for initial route prefetching to settle before measuring, preserving the strict zero-request assertion. Hosted checks and immutable merge identity are recorded by the containing PR; local evidence alone does not establish deployed delivery. No participant distribution, Form/protocol change, comprehension acceptance or parent closeout follows. Rollback reverts the three runtime files and their test changes while preserving existing local records. `NO CROSS-LANE IMPACT`.
