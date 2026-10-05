# Daniel reserve + legibility pass — QA record

Last updated: 2026-10-05 09:40 AWST

Supersession note added: 2026-10-05 18:34 AWST (`HEDGR_STATUS.md` §339, `OPS-COLD-READ-SUPERSESSION-001`).

Ticket: `CLASS-A-VAL-002-RESEARCH-RESERVE-001` (`HEDGR_STATUS.md` §7 / §7a / §334 / §335). Source #753 (`d04ab0e`) and the separate permanent-main RAP rebind #754 (`75e7f25`) preceded T1–T3 runtime #755 (`3c2efea`). Founder launch approval for T1–T3: 5 Oct 2026 08:22 AWST. Founder approval for this closeout and the later rebind: 5 Oct 2026 09:40 AWST.

## Status and evidence boundary

This record supplies evidence, not authority. It is written by the Implementer and is not an independent Verifier result; the Verifier attests on the PR. The research route stays unreleased. Technical checks here are not participant comprehension, cold-read, or release evidence.

The two §334 items that remain open with the Founder **gate any cold read**:
1. Name the cold readers.
2. Confirm that an internal cold read is not participant exposure under §7.

[Superseded 5 Oct 2026 by `HEDGR_STATUS.md` §339 (`OPS-COLD-READ-SUPERSESSION-001`): there is no separate internal cold read. The three-part release gate in §339 replaces the Founder-designated internal cold-reader condition, including the §7a legibility-bar requirement of at least 3 Founder-designated internal cold readers. Original text retained.]

§335 is this source-first closeout. A separate verified permanent-main RAP rebind follows merge.

## What changed

| Tranche | Change | Where |
| --- | --- | --- |
| T1 | Sarah name map moved byte-identical; locked `{localSingular}` / `{localPlural}` / `{localFull}`; locked Sarah and Daniel figure tables | `lib/research/scenario-fixtures.ts` |
| T1 | Sarah figures from the table; top label and attribution | `ScenarioStimulus.tsx` |
| T1 | Paired guard (a)–(h), token slots, ban-list + negations | `__tests__/research-scenario-fixtures.test.ts` |
| T2 | Daniel intro → facts → interpreted → existing bridge; `v=1` in-flow, `v=2` URL only; `notFound()` otherwise; `robots` noindex | `app/research/reserve-scenario/*` |
| T2 | Shared existing bridge copy; Sarah final control `Next: Daniel’s reserve` | `ResearchBridge.tsx`, `ScenarioStimulus.tsx` |
| T3 | Simulated Home step names, FX line, made-up example, planning percentages, observation | dashboard files, `layout.client.tsx` (step labels only), `HOME_EXPERIENCE_BASELINE.md` |

Participant-facing strings and figures are copied from live §7a. No copy or number was authored or paraphrased.

## Validation (local, Implementer)

| Check | Result |
| --- | --- |
| `pnpm run validate` (trust phrases, RAP/snapshot checks, 938 frontend unit tests, typecheck, lint) | pass at `f423b39` (2026-10-05 08:50–08:51 AWST) |
| Production `next build` | pass; `/research/reserve-scenario` present |
| Playwright against that production server (`--retries=0`) | 57/57 pass: reserve-scenario 4, stability-scenarios 8, orientation 1, currency-insight 14, smoke 2, class-a-val-002 12, wallet-redesign 4, scope-first 12 |
| Paired guard (a)–(h) | pass in `research-scenario-fixtures.test.ts` |
| Ban list including negations | pass in the same unit file; trust-phrase CI pass |
| Hosted checks / Verifier | on the PR; not this record |

Local trust-check warned that `NEXT_PUBLIC_FX_MODE=stub` is unrecognized outside CI. That is the documented local/CI-safe default in `AGENTS.md` and is not a product change.

## Acceptance (§7a T1–T3)

| # | Criterion | Result |
| --- | --- | --- |
| 1 | Sarah then Daniel then the existing bridge | pass |
| 2 | Five-currency picker; one stored currency for both cases | pass (unit + e2e) |
| 3 | Locked Sarah figures | pass |
| 4 | Locked Daniel figures; no rate, %, difference or total rendered | pass |
| 5 | Tokens: `{localFull}` in Held now and After heading; bare `{localPlural}` elsewhere; `{localSingular}` in After What to watch | pass (unit + e2e + screenshots) |
| 6 | `v=1` in-flow; `v=2` URL only; other `v` `notFound()`; `robots` noindex | pass |
| 7 | Sarah top label, attribution, `Next: Daniel’s reserve` | pass |
| 8 | Home strings on simulated routes; live-mode copy outside step labels unchanged | pass (observation gated on `syntheticJourneyActive`; planning line is the collapsed simulated panel; FX line is the existing simulated Currency context) |
| 9 | Layout 320/200% and 390–1440; controls ≥44px; heading focus; clean-start bridge from Daniel | pass (`reserve-scenario.spec.ts`) |
| 10 | Exact strings; no inputs/storage/telemetry on research routes | pass |

## Stop rules approached (not fired)

ZMW After heading renders the locked `{localFull}` as `kwacha`, producing **“After kwacha weakened against the US dollar”**. That is the Founder-locked slot (`{localFull}` aliases Sarah’s name map; ZMW remains `kwacha`). `{localSingular}` (`the kwacha`) is reserved for After What to watch. This is reported, not reshaped. NGN/KES/GHS/PHP After headings read as full currency names (`After Nigerian naira weakened…`).

No other §7a stop rule fired. Main remained `75e7f25`.

## Local screenshots (not committed)

Captured 2026-10-05 08:52 AWST from the production build of this branch. Stored under `/opt/cursor/artifacts/` (flat copies) and `/opt/cursor/artifacts/research-reserve-001/`. Not in the repository.

| File | Pixels | SHA-256 |
| --- | --- | --- |
| `d1440-sarah-a1.png` | 1440 × 1024 | `d592b0240532fef30858954947fb3cf33a3b5af87471aac31ece9fd96ab99657` |
| `d1440-sarah-a2.png` | 1440 × 1024 | `614eed675c16be5c7921125080bfe1dd242c854946ad6fcc4b81a3af8dfc28ac` |
| `d1440-sarah-panel.png` | 1440 × 1112 | `7580ed867f6b1442fe6c6463d77ea0a3bbd141cf45857e093eb5806d5707aa00` |
| `d1440-daniel-intro.png` | 1440 × 1024 | `586dab205d4fa2a5283d8cc12007280a68a4ab2dd377b77a44bdd52bd633242d` |
| `d1440-daniel-facts.png` | 1440 × 1485 | `51a940df9aeefe1ed34dc928b90696eefa62ae179a3425035a0036fb6df2cb24` |
| `d1440-daniel-notes.png` | 1440 × 1679 | `b4931034334403a4b9ee64a53067b8a7b18276822585f0d69ba8e2c09e0d7ae1` |
| `d1440-daniel-bridge.png` | 1440 × 1024 | `bac40b2c24617fb5ffda28094a170bf20b910b2b932882525628a2bd3c181880` |
| `d1440-home-after-bridge.png` | 1440 × 1235 | `4e445a652d405d3cceee81cbdc905fa292f30942fb5bf82ae517d5ae0ca8c136` |
| `m390-sarah-a1.png` | 390 × 844 | `3b8c189c28ae10d14e7f10672ccf037baae9cf77e55068d24beb92c521e7588b` |
| `m390-sarah-a2.png` | 390 × 844 | `716805c0d0ee55bb710983458ca0b10e6d134a8079a39bb2648dbf072072b48d` |
| `m390-sarah-panel.png` | 390 × 1587 | `20e0eb0fe57fee0b9e1b8733cc7462343036be42ca2b5692312d7b0db0f96108` |
| `m390-daniel-intro.png` | 390 × 844 | `b0dc26c9b2d5e3b053ed15b6e159216c4f83dfdf947337f7a4b59d0e2667268f` |
| `m390-daniel-facts.png` | 390 × 2277 | `82243cc50285699756fc9f98619f14e83d5668be0465861f74c7ea751ca99898` |
| `m390-daniel-notes.png` | 390 × 2562 | `8cf35743601e70ff76a1c690cc98965181bbde22b42581e25a222396523ef1ff` |
| `m390-daniel-bridge.png` | 390 × 844 | `0002593c7618e4f9ec6e9561a9f428311d3803294963a7fb334b26b8d52db299` |
| `m390-home-after-bridge.png` | 390 × 1249 | `5c61a805407139805fa7faddb316f73e619abe1fa31c5eac5df7ec4c11b59141` |
| `d1440-daniel-facts-zmw.png` | 1440 × 1485 | `51a940df9aeefe1ed34dc928b90696eefa62ae179a3425035a0036fb6df2cb24` |
| `d1440-daniel-facts-ngn.png` | 1440 × 1509 | `d903acfcacae18c4d1796a9159cb50eb828df3a37a72a7a60c1d15715904e25b` |
| `d1440-daniel-facts-kes.png` | 1440 × 1509 | `317c16edc9d091dd8d5e326f91e482803978abbad920efa20ed825d4eb80eb98` |
| `d1440-daniel-facts-ghs.png` | 1440 × 1509 | `84dff7f2329cd631dbdf4217480d0b3441997e981b97023bb830cb5253684f3b` |
| `d1440-daniel-facts-php.png` | 1440 × 1509 | `de4627c8e9344099900b63a717af5bdb63158b5a8dd9647581ee4e62efad8685` |
| `d1440-daniel-notes-zmw.png` | 1440 × 1679 | `b4931034334403a4b9ee64a53067b8a7b18276822585f0d69ba8e2c09e0d7ae1` |
| `d1440-daniel-notes-ngn.png` | 1440 × 1703 | `39d876f66615bf7028ffe78997f5a0a5fbb90011768a674cd48688ccc5d87051` |
| `d1440-daniel-notes-kes.png` | 1440 × 1703 | `9ef890778ca16f43b4e054ff1f181cc1158e8edf0e5ed22cca8ffe0b543dee2e` |
| `d1440-daniel-notes-ghs.png` | 1440 × 1703 | `49d46b018dac865074823df9bf98ac1db5177d6f9fda912eefa8f28f00a3b093` |
| `d1440-daniel-notes-php.png` | 1440 × 1703 | `5b045adaca019210169f4a6123716a8bb6bc0e3abecd4037e2ff6da3935b5ed4` |

## Merge and Production inspection

- **#755 merge:** at `3c2efea82621c6949d296570f75f6cea331404af` (2026-10-05 09:15:34 AWST), after an independent Verifier PASS WITH NOTES on exact head `5d7271c5afdaa90f37d0c1252879dc9c46d1d63c` ([attestation](https://github.com/mhibajene/hedgr-copilot/pull/755#issuecomment-5986438540)). Vercel Production deployment `dpl_6LZo9n13LZTwUj718JX1qWuEcfKw` of that SHA is READY.
- **Production browser inspection:** not recorded in this closeout. Layout evidence remains the T1–T3 Implementer screenshots and the #755 Verifier’s local Playwright 57/57 plus layout walk on `5d7271c`.
- **Release-bar cold read:** not executed. The two §334 items remain open with the Founder and continue to gate it. The research route remains unreleased.
- [Superseded 5 Oct 2026 by §339: the release-bar cold read is not a remaining gate; those two Founder items are closed; participant exposure starts at release under a later release ticket. Original sentence retained. The research route remains unreleased.]
