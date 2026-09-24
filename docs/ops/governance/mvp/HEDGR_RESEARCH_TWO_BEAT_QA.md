# Research Two-Beat — implementation verification

**Ticket:** `CLASS-A-VAL-002-RESEARCH-TWO-BEAT-001` · Class A synthetic/informational

**Status:** Runtime verification for draft PR #668; research route unreleased for participant use

**Authority:** `HEDGR_STATUS.md` §7/§7a/§309, including the verification-only amendment merged in #670 and its separate permanent-main RAP rebind #672

**Source gates:** Initial activation #665 and separate RAP rebind #664; verification amendment #670 merged at `699500b1ee59b5a229130dbcf8c8a8cb877cbd74`; rebind #672 merged at `60115921b9824a5d7225c4fea11c8d8be260ceda`. `pnpm bridge:rap:check` on permanent main reports `CURRENT` and binds to `699500b1ee59b5a229130dbcf8c8a8cb877cbd74` without a history warning.

## Verified presentation

The explicit study orientation keeps its safety disclosure and existing five-choice selector, with the study CTA “Continue to Sarah’s example”. Ordinary orientation retains its destination and CTA. The unreleased research route presents A1 Sarah facts only; A2 changes the fee to 29,500 in the selected denomination and places the lived caution after that change. Beat B shows “How Hedgr would put this” with the authored-example attribution directly below the title and the limits below the explanation. A short Bridge says the research example has ended, frames the next experience as a simulation with no real money, and leads to `/dashboard-synthetic-journey`. There are no reflection questions, answer fields, or response capture in this path.

On eligible synthetic Home before a completed simulated event, the observation slot gives the first step “Start with a simulated deposit” and the exact practice-money sentence, without “What Hedgr notices” or the observation disclaimer. After the first completed event, the bounded observation and disclaimer appear. Non-normal cautions remain visible before an event. The default route and existing financial, balance, and transaction behavior remain outside this edit.

## Verification matrix

| Boundary | Evidence |
| --- | --- |
| Study sequence and claim fidelity | `stability-scenarios.spec.ts` traverses orientation, A1, A2, B, Bridge, and synthetic Home; checks exact attribution and limits, absent questions and inputs, and no premature A2 or B content. |
| Currency consistency | The same browser test checks ZMW, KES, NGN, GHS, and PHP through both beats and confirms a second tab cannot change an active traversal. These equal-number fictional cases do not imply equal purchasing power or currency availability. |
| Trust and event timing | `engine-posture-header.test.tsx`, `dashboard.page.test.tsx`, and the amended empty-Home assertions in `class-a-val-002.spec.ts` distinguish the pre-event first step from post-event observation while retaining non-normal caution and the surrounding financial/navigation/trust assertions. |
| Accessibility and route isolation | Browser coverage checks heading focus, keyboard Continue controls, 320/390/1280/1440px widths, and 200% text. Existing ordinary-orientation and default-route coverage remains in the complete suite. |
| Scope | Runtime commit edits only `ScenarioStimulus.tsx`, the explicit study branch in orientation, and the synthetic-Home notice presentation in `EnginePostureHeader.tsx`. This separate verification commit contains only the listed tests and this note. |

## Local results

| Check | Result |
| --- | --- |
| `pnpm validate` | Passed: 909 frontend tests, Bridge tests, RAP/snapshot/trust checks, typecheck, and lint. |
| Frontend production build | Passed with the repository's mock auth, stub FX/API, mock DeFi, and Copilot E2E build-time flags. |
| Affected browser journey | `class-a-val-002.spec.ts`: 7/7 passed. |
| Complete hermetic browser suite | 126/126 passed with the local backend stub and the same E2E flags. |
| Diff hygiene | `git diff --check` passed; exact verification-file scope reviewed. |

An initial full local browser run used a build without the runbook's build-time mock/stub flags. It failed across unrelated Deposit/Copilot/default-route cases, so it was not treated as product evidence. Rebuilding with the required flags and rerunning the entire suite produced the 126/126 result above.

## Remaining gate and evidence meaning

Hosted PR checks, independent convergence review, exact deployed-revision inspection, a source-first technical closeout, and a final separate permanent-main RAP rebind remain required before technical closeout. This verification establishes bounded deterministic rendering and route behavior only. It does not establish participant comprehension or demand, accept Stability Engine output, release the research route, authorise recruitment or answer collection, or change financial capability.
