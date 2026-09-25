# Research Value Panel — implementation verification

**Ticket:** `CLASS-A-VAL-002-RESEARCH-VALUE-PANEL-001` · Class A synthetic/informational

**Status:** Runtime verification for draft PR #680; research route unreleased for participant use

**Authority:** `HEDGR_STATUS.md` §7 / §7a / §311. Source activation #678 merged at `51d96eeb37cbc2d30b17548ef8b330c725aa501f`. Separate permanent-main RAP rebind #679 merged at `ccaa0902a964a66c3b80e089ddeab79ed10e3e86`. `pnpm bridge:rap:check` on that main head reports CURRENT / COMPLETE for source `51d96ee` with no `MAIN_HISTORY_UNVERIFIED`.

**Role:** Implementer verification record (S3). S4 independent READ_ONLY Verifier is a different agent and is still required before merge.

## Verified presentation

The unreleased `/research/stability-scenarios` path keeps inherited Orientation, A1, chrome and Bridge CTA. A2 now shows only the heading, situation label, facts paragraph, 29,500 fee-change line and `All other facts remain the same.`, with continue `Continue to what Hedgr helps Sarah see`. Lived-caution paragraphs and the `sarah-lived-caution` container are absent.

Beat B title is `What Hedgr helps Sarah see`. The continuity line is dropped. The top label `Authored research example · not a live assessment of anyone’s money` sits above the title. One before/after panel shows both states without interaction (stacked Before-first at 390px; side by side at 1280px). Sub-label `What Hedgr would add` is identical in both states. After-state markers are text `Same as before` / `New`. Panel close is the last line inside the panel. Attribution and limits sit immediately under the panel, in that order.

Bridge sentence 1 is `Next, try Hedgr with made-up money. Make a practice deposit, then see what changes and what remains.` Completion heading O8 is unchanged.

Holds are absent from the stimulus: no 30,000 / total, no D2 anchoring wording, no benefit line, no present-tense Hedgr capability.

## 390px viewport (Addendum A W-A)

Viewport 390 × 844. After focus on the Beat title with preventScroll, `main` is scrolled to start.

| Element | Bounding box |
| --- | --- |
| Top label | y = 206.5, height = 40 (fully inside the first viewport) |
| Panel top | y = 314.5 (panel start inside the first viewport) |
| Horizontal overflow | 0 |

Wrapping is present on long lines; no ellipsis. Attribution and limits remain on the same stage, directly under the panel, reachable by plain scroll.

Operator screenshots (not in-repo): `a2-fee-change-390.png`, `beat-b-value-panel-390-viewport.png`, `beat-b-value-panel-390-full.png`, `bridge-390.png`.

## Exact rendered strings (ZMW)

**A2**
- h2 `Sarah’s changed course fee`
- `Situation on 1 October 2026`
- `Sarah already has K6,000 set aside. She plans to add K2,000 on the 15th of each month for the next 12 months, starting on 15 October 2026. Those contributions have not happened yet.`
- `The provider now fixes the course fee at K29,500 payable in Zambian kwacha on 1 October 2027, instead of USD 1,000 payable in US dollars.`
- `All other facts remain the same.`
- Continue `Continue to what Hedgr helps Sarah see`

**Beat B**
- Top label `Authored research example · not a live assessment of anyone’s money`
- h2 `What Hedgr helps Sarah see`
- Before: `Available now:` `K6,000`; `Planned:` `K24,000 over 12 months. Not available yet.`; `What she needs:` `USD 1,000 on 1 October 2027.`; sub-label `What Hedgr would add`; `What Hedgr would point out:` `Her savings are in kwacha, but the fee is in US dollars. A growing kwacha balance does not by itself show how much of the fee it will cover.`
- After: same Available/Planned rows plus `Same as before`; `What she needs:` `K29,500 on 1 October 2027.` plus `New`; sub-label `What Hedgr would add`; `What changed:` `Her savings and the fee are now in the same currency, so the exchange rate no longer changes what the fee costs her.`; `What is still open:` `whether the planned K24,000 arrives on time.`
- Close `Same savings, same due date. A different fee currency changes what Sarah needs to watch.`
- Attribution and limits unchanged verbatim

**Bridge**
- h2 `You’ve reached the end of this research example.`
- `Next, try Hedgr with made-up money. Make a practice deposit, then see what changes and what remains.`
- `No real money moves, no account is opened, and nothing here is financial advice.`
- CTA `Continue to the Hedgr simulation`

## Verification matrix

| Boundary | Evidence |
| --- | --- |
| Copy fidelity and holds | `stability-scenarios.spec.ts` asserts A2 trim, exact B panel strings/markers, Bridge sentence 1, absent lived caution / retired title / continuity line, and negative hold patterns over `stability-stimulus`. |
| Currency consistency | Same spec loops ZMW/KES/NGN/GHS/PHP for `6,000`, `24,000`, `29,500` prefixes and `{localName}` in the Before Hedgr row; second-tab pin still holds. |
| 390px / layout | Spec checks label + panel start in the first 844px viewport, Before stacked above After at 390px, side-by-side at 1280px, no tablist, no horizontal overflow at 320/390/1280/1440 and 200% text. |
| Scope | Implementer commit edits only `ScenarioStimulus.tsx`. This verification commit contains only this note and `stability-scenarios.spec.ts`. |

## Local results

| Check | Result |
| --- | --- |
| `pnpm run validate` | Passed: trust checks, RAP check, snapshots, 909 frontend tests, typecheck, lint. |
| Frontend production build | Passed with mock auth, stub FX/API, Copilot E2E build-time flags. |
| `stability-scenarios.spec.ts` | 6/6 passed. |
| Complete hermetic browser suite | 126 passed; 1 failed in `shared-baseline.spec.ts` default Activity 200% wrap of `2.00`. That file and the default `/activity` route are outside this ticket. Synthetic family of the same spec passed. Not treated as value-panel evidence. |
| Diff hygiene | `git diff --check` passed on the verification files. |

## Remaining gate and evidence meaning

Hosted PR checks, independent S4 Verifier review, source-first closeout and a final separate permanent-main RAP rebind remain required. This record establishes bounded deterministic rendering on the unreleased research route only. It does not establish participant comprehension or demand, accept Stability Engine output, release the route, authorise recruitment or answer collection, or change financial capability.
