# Research Compression — implementation verification

**Ticket:** `CLASS-A-VAL-002-RESEARCH-COMPRESSION-001` · Class A synthetic/informational · nested Lane V under open parent `CLASS-A-VAL-002`

**Status:** Runtime verification for the S3 draft PR; research route unreleased for participant use

**Authority:** `HEDGR_STATUS.md` §7 / §7a / §313. Source activation #683 merged at `0808d78cd99cfe9a86a35d09648a0d827f48a26d`. Separate permanent-main RAP rebind #684 merged at `db9a220c9b04e71e1e0d56732438d3ea2a209915`. `pnpm bridge:rap:check` on that main head reports CURRENT for source `0808d78` with no `MAIN_HISTORY_UNVERIFIED`.

**Role:** Implementer verification record (S3). S4 independent READ_ONLY Verifier is a different agent and is still required before merge. Auto-merge stays OFF.

## Verified presentation

The unreleased `/research/stability-scenarios` path keeps inherited Orientation, A1 (except the shared header boundary), chrome and Bridge. The common header boundary on every stage is `This example uses only the facts on this page. Nothing you do here is saved.` (`data-testid="study-common-boundary"`).

A2 shows only the unchanged h2, the two-sentence fee-change fact (ZMW remains `Zambian kwacha`), `Nothing else has changed.`, and Continue `Continue`. `Situation on 1 October 2026` and the facts paragraph remain on A1 only.

Beat B keeps the top label, h2 (focus), attribution and limits. The panel is one four-row `dl` per labelled `section` (`Before the fee changed` / `After the fee changed`) with labels `Available now`, `Planned`, `Due`, `What to watch` and no trailing colons. `New` is text inside the After `Due` and After `What to watch` `dd` only (count 2). Sub-label, shaded Hedgr rows, `Same as before`, and `study-panel-close` are absent. A rule sits above `What to watch` only.

Desktop alignment uses a shared-row CSS subgrid. Side-by-side versus stacked switching uses Tailwind v4 `@container` / `@lg` container queries (`32rem`, rem-relative to root font-size) so 200% text at 320px stacks. Bridge is unchanged.

Holds are absent from the stimulus: no 30,000 / total / meter / progress bar, no D2 anchoring wording, no benefit line, no present-tense Hedgr capability, no `companion`.

## 390px viewport

Viewport 390 × 844. After focus on the Beat title with preventScroll, `main` is scrolled to start.

| Element | Bounding box |
| --- | --- |
| Top label | y = 206.5, height = 40 (fully inside the first viewport) |
| Panel top | y = 314.5 (panel start inside the first viewport) |
| Horizontal overflow | 0 |

Wrapping is present on long lines; no ellipsis. Attribution and limits remain on the same stage, directly under the panel, reachable by plain scroll. States stack Before then After.

## Desktop glance (1280 × 800)

After Beat B h2 focus and `main` scroll-to-start, both `What to watch` rows measured:

| State | y | height | top overflow | bottom overflow |
| --- | --- | --- | --- | --- |
| Before | 520.75 | 157 | 0 | 0 |
| After | 520.75 | 157 | 0 | 0 |

Both rows are fully inside the initial 800px viewport. No WATCH overflow. Shared-row tops match (Δy = 0 for all four rows within the spec’s few-px bound).

## 200% text at 320px

Root `font-size: 200%` at 320 × 720. Before heading y = 1275, After heading y = 3276 (stacked, not side-by-side). Horizontal overflow 0. Continue controls remain operable (spec test 5).

## Exact rendered strings (ZMW)

**A2**
- h2 `Sarah’s changed course fee`
- `The course provider has changed the fee to K29,500, payable in Zambian kwacha on 1 October 2027. It was USD 1,000, payable in US dollars.`
- `Nothing else has changed.`
- Continue `Continue`

**Beat B**
- Top label `Authored research example · not a live assessment of anyone’s money`
- h2 `What Hedgr helps Sarah see`
- Before: `Available now` `K6,000`; `Planned` `K24,000 over 12 months, not available yet`; `Due` `USD 1,000 on 1 October 2027`; `What to watch` `Sarah is saving in kwacha, but the fee is in US dollars. If the exchange rate moves, the amount of kwacha she needs can change.`
- After: same Available/Planned values; `Due` `K29,500 on 1 October 2027` plus `New`; `What to watch` `Sarah’s savings and the fee are now both in kwacha, so the exchange rate no longer changes the amount she needs. What is still open is whether the planned K24,000 arrives on time.` plus `New`
- Attribution and limits unchanged verbatim

**Bridge**
- h2 `You’ve reached the end of this research example.`
- `Next, try Hedgr with made-up money. Make a practice deposit, then see what changes and what remains.`
- `No real money moves, no account is opened, and nothing here is financial advice.`
- CTA `Continue to the Hedgr simulation`

## Verification matrix

| Boundary | Evidence |
| --- | --- |
| Copy fidelity and holds | `stability-scenarios.spec.ts` asserts the new boundary, A2 trim, v3 panel strings/markers, Bridge unchanged, retired-string absences scoped to `stability-stimulus`, and the tighter hold regex (`30000`, `enough money`, `will be there`, `companion`, `moves with it`). |
| Currency consistency | Same spec loops ZMW/KES/NGN/GHS/PHP for `6,000`, `24,000`, `29,500` prefixes and `{localName}` in both watch lines; ZMW A2 keeps `Zambian kwacha`; second-tab pin still holds (tests 4 and 5). |
| 390px / 200% / desktop | Spec checks label + panel start in the first 844px viewport, stacked Before then After at 390px, aligned row tops at ≥ desktop, 1280×800 glance measurement, stacked at 200%/320px, D1 structural (no right-align/tabular amounts, no rule under `Due`), no tablist, no horizontal overflow at 320/390/1280/1440 and 200% text. |
| Scope | Implementer commit edits only `ScenarioStimulus.tsx`. This verification commit contains only this note and `stability-scenarios.spec.ts`. |

## Local results

| Check | Result |
| --- | --- |
| `pnpm run validate` | Passed: trust checks, RAP check, snapshots, 909 frontend tests, typecheck, lint. |
| Frontend production build | Passed with mock auth, stub/fixed FX, Copilot E2E build-time flags. |
| `stability-scenarios.spec.ts` | 6/6 passed. |
| Complete hermetic browser suite | 126 passed; 1 failed in `shared-baseline.spec.ts` default `/activity` 200% wrap of `2.00`. That file and the default `/activity` route are outside this ticket. Synthetic family of the same spec passed. Not treated as compression evidence. Orientation and `class-a-val-002` synthetic-journey suites passed unchanged. |
| Diff hygiene | `git diff --check` passed on the verification files. |

## Remaining gate and evidence meaning

Hosted PR checks, independent S4 Verifier review, source-first closeout and a final separate permanent-main RAP rebind remain required. Auto-merge must stay OFF until the S4 report is back. This record establishes bounded deterministic rendering on the unreleased research route only. It does not establish participant comprehension or demand, accept Stability Engine output, release the route, authorise recruitment or answer collection, or change financial capability.
