# Stability Interpretation stimulus — implementation and QA record

**Ticket:** `CLASS-A-VAL-002-STABILITY-INTERPRETATION-001` · Class A synthetic, informational, read-only  
**Status:** Technical stimulus preparation; research route unreleased for participant use  
**Authority:** `HEDGR_STATUS.md` §7/§7a/§302 and the additive §17 Founder currency amendment in the A–E convergence package  
**Source sequence:** Activation PR #646 → separate permanent-main RAP rebind #647 → currency-amendment source PR #648 → separate permanent-main RAP rebind #649 → this runtime and QA delivery

## Rendered contract

The eligible study branch keeps the existing orientation disclosure and five-choice local-currency selector. Its neutral note says the selected denomination is used for Sarah's fictional savings and that the amounts are not converted estimates. Ordinary orientation continues to its prior destination. The research route remains synthetic-only and separate from the Wallet and mock Engine posture.

At the 1 October 2026 observation, Sarah has 6,000 already set aside in the selected denomination and plans twelve future contributions of 2,000 on the 15th from 15 October 2026 through 15 September 2027. None has occurred. The course remains fixed at USD 1,000 payable in US dollars on 1 October 2027. The page shows the neutral narrative-landing prompt, then the two matched-information baseline questions. Only deliberate continuation reveals the four-part authored relationship, consequence and uncertainty boundary, followed by the neutral post-reveal question. A further continuation changes only the obligation to 29,500 payable in the selected local denomination on the same due date and asks the exact transfer question.

ZMW renders as K/kwacha, preserving the original Output D wording. KES, NGN, GHS and PHP render with their ISO amount prefix and ordinary currency name in the denomination-dependent interpretation. One selection stays constant through baseline, reveal and transfer. The USD obligation is never translated into an illustrative local estimate. Equal numeric fixtures across denominations do not imply conversion, equal purchasing power or supported market availability.

## Verification matrix

| Boundary | Verification |
| --- | --- |
| Common baseline and treatment | Browser test compares the complete facts block before and after reveal for each of the five selections. |
| Neutral pre-reveal | Browser test checks Step 0 and baseline prompts, absent interpretation, no answer-bearing headings and no relationship cue in the study orientation note. |
| Authored interpretation | Browser test checks all four sentences, ZMW exact text and parameterised wording in each other selected currency; page states the example is written, not a live financial assessment. |
| Controlled transfer | Browser test checks the 29,500 selected-denomination obligation and retained 6,000/2,000 facts and USD prior obligation. |
| Trust and data | Study page has the fictional/no-real-money frame, no answer form, input, textarea or answer storage; selector uses only the unchanged existing local preference. No new telemetry, API, Engine or Wallet dependency is introduced. |
| Accessibility and isolation | Browser test checks heading focus, keyboard operation, 320/390px and desktop widths and 200% text overflow; ordinary orientation and default route remain outside this branch. |

## Evidence meaning and remaining gate

These checks establish deterministic rendering and route separation, not participant comprehension or incremental interpretive value. A later separately authorised research protocol must retain baseline recognisers, code the selected currency variant and its familiarity, and interpret within-participant baseline/reveal/transfer evidence without treating nominally equal cross-currency variants as equal purchasing-power cases. No participant recruitment, exposure, response collection, Form, release, Engine adoption, advice or execution is authorised by this technical delivery.

## Delivery checks

| Check | Result |
| --- | --- |
| Scoped implementation diff | Only the study route component and metadata plus the explicit study orientation branch changed in the runtime commit. |
| Typecheck and lint | Passed for the frontend. |
| Production build | `pnpm -w build` passed with synthetic mock/stub environment. |
| Focused browser run | `stability-scenarios.spec.ts`: 4/4 passed, including all five selected denominations. |
| Complete hermetic browser run | `pnpm --filter @hedgr/frontend e2e:ci`: 125/125 passed with local backend stub, then backend stopped. |
| Full workspace validation | `pnpm run validate` passed: 906 frontend unit tests, 49 Bridge tests, projection/snapshot checks, typecheck and lint. |
| Hosted and shipped revision | Required PR checks, independent convergence and exact deployed-revision inspection remain release-blocking verification for technical closeout. |

No participant session or response was used in this QA. A failed hosted check or material semantic conflict holds merge and closeout for correction.
