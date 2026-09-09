# Synthetic display currency — prospective evidence note

Authority: D-132 / HEDGR_STATUS.md §264, `CLASS-A-VAL-002-DISPLAY-CURRENCY-001`, nested within parent Lane V. Class A informational only. `NO CROSS-LANE IMPACT`.

Status: preparation and technical verification only. This note does not amend the canonical Form or participant protocol, authorise collection or distribution, or establish comprehension. Participant distribution remains paused pending separately authorised live-Form and protocol reconciliation. Parent validation remains open; About stays frozen and published.

## Candidate and hypothesis

Implementation baseline: permanent main `ba8c13349b890ed0793dac7d3e6b88252d67c112` (D-132 activation and permanent-main RAP rebind). The implementation PR containing this note identifies the candidate patch; its immutable merge commit identifies the delivered build. Before any separately authorised research, record the exact deployed commit, route, instrument version, exposure order and selected currency. Do not treat a mutable deployment URL as a build identity.

Hypothesis: a familiar display currency helps participants interpret position, stability and what changed while retaining USD as the reference and understanding the simulation boundary. The selector changes illustrative estimates only. It does not change balances, financial arithmetic, transaction denomination, Activity or planning percentages.

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
