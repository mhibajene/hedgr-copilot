# CLASS-A-VAL-002-CA-003 Evidence Index

Status: non-authoritative implementation and comparison evidence only

## Baseline

- Permanent-main baseline: `3851fbf0df826c0e8a6d7a5a868f0367abf80320`.
- Runtime UI baseline: permanent squash `8c9bdaecda382ef5472902e81deba395f51ce96b`.
- Route: `http://127.0.0.1:3000/dashboard?journey=class-a-val-002`.
- Environment: mock auth, stub / fixed financial modes, no real money, local first-session fixture.
- Target values: Core stability target 50%, Conservative yield 20%, Reserve 30%.
- Baseline targeted units: 17 / 17 passed.
- Baseline `CLASS-A-VAL-002` Playwright: 3 / 3 passed.

## Baseline captures

| Capture | Size | SHA-256 |
| --- | --- | --- |
| `baseline-dashboard-collapsed-desktop.png` | 1440 x 1180 | `94e0f24dacdd6693e9dfdc7c29be8ad30ec17ba92b4695a28192b45122b1ac76` |
| `baseline-dashboard-collapsed-mobile.png` | 390 x 1518 | `2fbf2156311c1f6c6e8c6d43b0b6c5014e6caa0523afa8cee19e12fb03e4a0ed` |
| `baseline-dashboard-targets-open-desktop.png` | 1440 x 1556 | `6a820d67d43062ab83320d97365bf57d690bffa59423dd6bf9801d7c6cfc77a6` |
| `baseline-dashboard-distinction-open-desktop.png` | 1440 x 1682 | `71dd521f6b4afa48277f42d870ea20aa837444154fd6fc119d202080e137b51c` |

All captures contain simulated fixtures only. They contain no participant, account, provider, custody, payment, conversion, payout, settlement, or real financial data.

## Baseline semantic order

1. `Stability guidance` heading.
2. Negative boundary proposition: `These targets are guidance only—not balances, holdings, or proof that money moved.`
3. `View stability targets` disclosure.
4. Target values and descriptions, including `Conservative yield` and `can support returns when conditions allow`.
5. `Guidance only` trust legend.
6. Optional target-versus-balance and no-money-movement distinction.

The baseline begins with the boundary and then exposes target composition. It does not first explain the guidance's purpose or establish preservation / liquidity-before-yield philosophy.

## Bounded hypotheses recorded before implementation

| Surface | Bounded change | Test-instrument hypothesis |
| --- | --- | --- |
| Introductory proposition | Explain that Stability Guidance helps interpret what Hedgr prioritizes | Participants may form purpose before classifying the percentages |
| Philosophy | State preservation and ready access before return opportunity | Investment-product coding may become less dominant without removing the yield-cap meaning |
| Boundary placement | Keep target-only / non-balance / no-movement language before disclosure | Participants may retain the correct trust boundary while receiving a positive purpose first |
| Target presentation | Keep all values and meanings unchanged; make percentage detail subordinate | Target composition may read as supporting detail rather than the primary proposition |
| Detailed distinction | Retain optional balance / target / no-movement explanation as confirmation | Financial truth remains inspectable without making defensive detail the introductory proposition |

These are hypotheses about test-instrument credibility, not evidence of comprehension, lower cognitive burden, category convergence, trust-boundary accuracy, or product readiness.

## After captures

| Capture | Size | SHA-256 |
| --- | --- | --- |
| `after-dashboard-collapsed-desktop.png` | 1440 x 1311 | `a77e543b73ac7ea01ea0ab6017cb9e6c3a42c9991d7f5b0cc4f7421749cd3ba7` |
| `after-dashboard-collapsed-mobile.png` | 390 x 1740 | `b9d9d854b7490bb5d157eef2c4cc17b9d73439b17246a93d611266c41359b1c3` |
| `after-dashboard-targets-open-desktop.png` | 1440 x 1710 | `e7628884ea769bf7c3c92e899789ccec942922a70058186152838f52fceb45c6` |
| `after-dashboard-distinction-open-desktop.png` | 1440 x 1855 | `21f26682784396321ce0952628f7368e1a13f738698a53b0fb25cc6797a54339` |

## Implemented semantic order

1. Purpose: `See what Hedgr prioritizes when interpreting stability.`
2. Philosophy: Hedgr makes preservation, visible access / risk, and understanding before action the grammatical subject.
3. Boundary: guidance is context rather than instruction and does not represent a balance, holding, account, division, or movement of money.
4. Targets: the unchanged percentages are introduced as simulated targets expressing those priorities.
5. Detailed distinction: target-versus-balance, limited return opportunity, non-instruction, and no-money-movement detail remain optional confirmation after the cards.

The existing native `details` / `summary` controls, approved Hedgr tokens, typography, target-card hierarchy, and target values remain unchanged. Focused Playwright verifies that both disclosure summaries receive keyboard focus and open with Enter. The development captures retain the same pre-existing local Next.js issue indicator observed on the baseline; production-build verification is recorded separately and is authoritative for release behavior.

## Production visual verification

| Capture | Size | SHA-256 |
| --- | --- | --- |
| `verified-production-dashboard-collapsed-desktop.png` | 1440 x 1311 | `6c99901164972f68460da4e4955abfcb82fe1f39cc5a47d50beda7e451acdfcd` |
| `verified-production-dashboard-collapsed-mobile.png` | 390 x 1740 | `646f145ec528428914d80f7fa1f9ce1e36889a5eedebdc8b83a9647a985def34` |

The production captures contain no development overlay and preserve the same semantic order and layout reviewed in the comparison captures.
