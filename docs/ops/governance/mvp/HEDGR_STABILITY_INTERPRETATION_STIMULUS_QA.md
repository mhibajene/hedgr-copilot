# Stability Interpretation stimulus — implementation and QA record

**Ticket:** `CLASS-A-VAL-002-STABILITY-INTERPRETATION-001` · Class A synthetic, informational, read-only
**Status:** Technical stimulus preparation; research route unreleased for participant use
**Authority:** `HEDGR_STATUS.md` §7/§7a/§302 and the additive §17 Founder currency amendment in the A–E convergence package
**Source sequence:** Activation PR #646 → separate permanent-main RAP rebind #647 → currency-amendment source PR #648 → separate permanent-main RAP rebind #649 → study-helper source correction PR #651 → separate permanent-main RAP rebind #652 → this runtime and QA delivery

## Rendered contract

The eligible study branch keeps the existing orientation disclosure and five-choice local-currency selector. Its study-only selector helper says the chosen denomination labels Sarah's fictional savings and that the amounts are not converted estimates; the separate note introduces her fictional situation without revealing the USD relationship. Ordinary orientation retains its original selector helper and destination. The research route remains synthetic-only and separate from the Wallet and mock Engine posture.

At the 1 October 2026 observation, Sarah has 6,000 already set aside in the selected denomination and plans twelve future contributions of 2,000 on the 15th from 15 October 2026 through 15 September 2027. None has occurred. The course remains fixed at USD 1,000 payable in US dollars on 1 October 2027. The page shows the neutral narrative-landing prompt, then the two matched-information baseline questions. Only deliberate continuation reveals the four-part authored relationship, consequence and uncertainty boundary, followed by the neutral post-reveal question. A further continuation changes only the obligation to 29,500 payable in the selected local denomination on the same due date and asks the exact transfer question.

ZMW renders as K/kwacha, preserving the original Output D wording. KES, NGN, GHS and PHP render with their ISO amount prefix and ordinary currency name in the denomination-dependent interpretation. One selection stays constant through baseline, reveal and transfer, including when another browser tab changes the stored preference. The USD obligation is never translated into an illustrative local estimate. Equal numeric fixtures across denominations do not imply conversion, equal purchasing power or supported market availability. The authored, non-live boundary appears in common chrome before baseline and remains identical after reveal; only the four-part Output D interpretation is revealed.

## Verification matrix

| Boundary | Verification |
| --- | --- |
| Common baseline and treatment | Browser test compares the complete facts block before and after reveal for each of the five selections, and confirms another tab changing the preference cannot alter an active traversal. |
| Neutral pre-reveal | Browser test checks Step 0 and baseline prompts, absent interpretation, no answer-bearing headings and no relationship cue in the study-only selector helper or orientation note. |
| Authored interpretation | Browser test checks all four sentences, ZMW exact text and parameterised wording in each other selected currency; the authored/non-live boundary is common before and after reveal. |
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
| Focused browser run | `stability-scenarios.spec.ts`: 5/5 passed, including all five selected denominations and a second-tab preference change. |
| Complete hermetic browser run | Final corrected branch: `pnpm --filter @hedgr/frontend e2e:ci` passed 126/126 with the local backend stub, which was then stopped. |
| Full workspace validation | `pnpm run validate` passed: 906 frontend unit tests, 49 Bridge tests, projection/snapshot checks, typecheck and lint. |
| Hosted and shipped revision | Required PR checks, independent convergence and exact deployed-revision inspection remain release-blocking verification for technical closeout. |

No participant session or response was used in this QA. A failed hosted check or material semantic conflict holds merge and closeout for correction.

## Distinct Verifier review — 2026-09-23

**Reviewed revision:** `fcaa7cb` and the scoped `origin/main..HEAD` diff after source PRs #651/#652. This is a visible-artifact code, method and scope review, not an independent participant test or a claim that the current Engine computes the interpretation.

**Findings and correction:** Initial review found two method conflicts: the shared orientation selector described the study denominations as “local estimates” while the study note denied conversion, and an authored/non-live disclosure appeared only after reveal despite the common-chrome control. The source-first study-helper amendment and runtime correction resolve both. The ordinary selector wording remains unchanged; the study helper describes fictional savings without an FX or supported-account claim. The authored/non-live disclosure is now present before baseline and unchanged after reveal, while the reveal adds only the approved four-sentence interpretation and its required neutral response prompt. No further material finding remains in the reviewed diff.

**Independent checks:** Traced the displayed observation, current capital, twelve intended contributions, fixed USD obligation, transfer amount and payment dates to A–E Outputs C–E and additive §17. Checked all five denomination renderings, the per-traversal currency pin, common fact block, exact neutral prompts, withheld forecast/adequacy claims, synthetic route gate, ordinary-orientation isolation, absence of answer inputs/API/telemetry, keyboard focus transitions and browser coverage for mobile/enlarged text. The study component does not call Engine or Wallet state. The selected variant still requires governed manual evidence attribution later. The Implementer-reported final local 126/126 browser rerun passed after correction; hosted checks and exact deployed revision must be confirmed separately before technical closeout.

**Disposition:** PASS for the corrected authored stimulus and bounded scope, conditional on required hosted and pinned-revision checks. Participant release and empirical interpretive utility remain unassessed.
