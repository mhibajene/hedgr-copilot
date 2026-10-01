# Sarah research refresh — QA record

Last updated: 2026-10-01

Ticket: `CLASS-A-VAL-002-RESEARCH-REFRESH-001` (HEDGR_STATUS.md §7 / §7a / §332). Source #748 (`4d97c74`) and the separate permanent-main RAP rebind #749 (`bad4b94`) preceded the runtime edit.

## Status and evidence boundary

This record supplies evidence, not authority. It is written by the Implementer and is not an independent Verifier result; the Verifier attests on the PR. The research route stays unreleased. Technical checks here are not participant comprehension or release evidence.

## What changed

| # | Change | Where |
| --- | --- | --- |
| 1 | Bridge link opens the simulation at a clean start: `/dashboard-synthetic-journey?reset=1` (was `/dashboard-synthetic-journey`). Uses the existing reset path; no new reset logic | `ScenarioStimulus.tsx` |
| 2 | One bridge sentence replaced, aligned with the finished Home: “Next, try Hedgr with pretend money. Add a simulated deposit, then see what changes and what remains. No real money moves, no account is opened, and nothing here is financial advice.” (was “…made-up money. Make a practice deposit…”). Heading and button unchanged | `ScenarioStimulus.tsx` |
| 3 | Newer look on all four research stages and on `/orientation` (ordinary and study entry): ivory research canvas, white rounded panels with the divider border, full-width pill primary actions (auto width from 40rem), visible focus rings | `research.module.css`, `ScenarioStimulus.tsx`, `orientation/page.tsx` |
| 4 | New shared `ResearchChrome` (fictional-example label, title, boundary line, optional footer link, main test id passed in) used by Sarah's page; the later Mulenga page may reuse it | `app/research/ResearchChrome.tsx` |

Every other participant string is unchanged, including the orientation surface copy (its file is untouched), the study helper and note, and all of Sarah's facts, rows, attribution, limits, labels and buttons. `SimulationDisplayCurrencySelector.tsx` was not changed: its entry placement was already rounded on white. `styles/globals.css` paints every `<main>` white; rather than edit that global file, the research stylesheet makes `main` transparent inside the research canvas.

## Validation (local, Implementer)

| Check | Result |
| --- | --- |
| Lint, typecheck | pass |
| Frontend unit tests | 930/930 |
| Production build + complete browser suite (`--retries=0`) | 133/133 |
| New test: a returning participant (earlier $3.00 simulation and a last visit) follows the bridge and lands on first use at $0.00 | pass; on the unmodified page it fails (`$3.00` shown), confirming it guards the change |
| Guards: research `main` and orientation surface are transparent over the canvas; bridge and orientation continue are pills | pass |

## Acceptance (§7a)

| # | Criterion | Result |
| --- | --- | --- |
| 1 | Bridge `href` is exactly `/dashboard-synthetic-journey?reset=1` | pass (asserted) |
| 2 | Returning and first-time participants land on first use after the bridge | pass (new test; walk at 390, 1440, 320 at 200%) |
| 3 | Bridge sentence exact; all other strings unchanged | pass (asserted; diff shows only the one string) |
| 4 | NEW-MARKER-001 1–9 hold | pass: exactly two `New` markers in After `Due` and `What to watch` headings; every row stacked at 390, 1440 and 320 at 200%; Before/After row tops identical at 1440 (355/427/499/571) |
| 5 | No horizontal overflow; controls at least 44px | pass at 320 (200% text), 390 and 1440 on every stage and both orientation entries; the existing suite covers 640/1024/1280 layouts |
| 6 | Keyboard order, visible focus and stage-heading focus | pass (existing focus assertions unchanged and passing; focus ring on pills) |
| 7 | Ordinary orientation copy and continue target unchanged | pass (`orientation.spec.ts` strict copy and `?reset=1` target) |
| 8 | Full validation, build, browser suite, hosted checks, independent Verifier PASS | local pass; hosted checks and Verifier on the PR |
| 9 | Screenshots at 390 and 1440 | below (stored locally in `output/research-refresh-001/`, not in the repo, per the brief) |

## Local screenshots (not committed)

Captured from the production build of this branch. `00` is the ordinary orientation, `0` the study entry, `1`–`4` the four research stages, `5` Home after the bridge.

| File | Pixels | SHA-256 |
| --- | --- | --- |
| `d1440-0-orientation.png` | 1440 × 1024 | `72474bf88169dbb8c12b738d745dc1b1373623191f50a19c8d943db6e8cb31db` |
| `d1440-00-orientation-ordinary.png` | 1440 × 1024 | `8cdbf474bb71055635df4aeed56e8fc8c1929d71d7d81e3c121b7ec24cd8c0e0` |
| `d1440-1-a1.png` | 1440 × 1024 | `74c9ad1aedcbb2cb792c7b6cbb94bf5d556f692bc4f149c139ad575ba2c27673` |
| `d1440-2-a2.png` | 1440 × 1024 | `6ca8ab89bb10effe659847bf20bb6f2cb0a23677c54d8bc5e531ffdddb4299e8` |
| `d1440-3-panel.png` | 1440 × 1112 | `a46804aff61f13a5f098483b28207da15afa055b0dd586c19ea3f3a485329ff5` |
| `d1440-4-bridge.png` | 1440 × 1024 | `44203055ae0b09cae5c20f9d769c7d9df7edd201455444c83ebc99dc67e1ad12` |
| `d1440-5-home-after-bridge.png` | 1440 × 1235 | `29d6629b6a68f640548806fa96cf4c15c13aa4d2f5d02ab93ad059d9868d0fb0` |
| `m390-0-orientation.png` | 390 × 962 | `698ab2886819f73b80e28940422da03389ca5b3587b3f02c666a6e7c1471a91c` |
| `m390-00-orientation-ordinary.png` | 390 × 844 | `504915ae5c2760caae99445edac6a915959a7828747e37b3bcd68f0ca9aa519c` |
| `m390-1-a1.png` | 390 × 844 | `221c4be5ea46a37e6c91031778bfaa67f7d4d31728f373474f143a0746fe8395` |
| `m390-2-a2.png` | 390 × 844 | `526662392e7ad0a15b3be758f42d4cbd2958552243ccdd97135bbec8689ff2f6` |
| `m390-3-panel.png` | 390 × 1607 | `08d47c42dfea15c8bf27baf78c4507b338b199026255dfb40efb44f7e5b65660` |
| `m390-4-bridge.png` | 390 × 844 | `056a4063dccbbcf82119aeca4b1116abb436fec72dc1687271ee217f075fed1a` |
| `m390-5-home-after-bridge.png` | 390 × 1249 | `85298fc74013e3a13dc9f23dacb4fad803f2fa5a9ce4924f95afb2f731ba8b4a` |


## Merge and Production inspection

- **#750 merge:** at `1dad23e0b291e21f5fb2f46567463d004df17efd` (2026-10-01T03:51:23Z), after an independent Verifier PASS on exact head `ddcc109` ([attestation](https://github.com/mhibajene/hedgr-copilot/pull/750#issuecomment-5924331659)). GitHub Production deployment `6775738407` succeeded.
- **Production inspection:** of `https://hedgr-copilot-frontend.vercel.app` at `1dad23e`, on 2026-10-01, in fresh isolated browsers. Coverage:
  - both orientation entries, all four research stages and Home after the bridge;
  - 390 × 844, 1440 × 1024, and 320 × 800 at 200% root text.

  Results:
  - no horizontal overflow, no control under 44px and no page errors;
  - exactly two `New` markers (After `Due` and `What to watch`), every row stacked, and Before/After row tops identical at 1440 (355/427/499/571);
  - Home after the bridge is first use.
- **Live bridge:** `href` is `/dashboard-synthetic-journey?reset=1`, and the sentence is exactly the new string. Research `main` and the orientation surface are transparent over the `rgb(250, 248, 245)` canvas, and the bridge action has `border-radius: 9999px`.
- **Returning participant:** an earlier $3.00 simulation and a last visit, followed through the bridge, land on first use at $0.00 with no “Since you were last here”.

**NO CROSS-LANE IMPACT.**
