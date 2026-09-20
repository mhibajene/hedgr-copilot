# Synthetic Home compact FX insight — independent design QA

Date: 2026-09-20

Ticket: `CLASS-A-VAL-002-WEEKEND-PREP-001`, finite §7a/§297 compact Currency Context amendment

Role: distinct Verifier; this is local presentation/test evidence, not participant comprehension or release acceptance.

final result: passed

## Source, render and comparison method

- Controlling source: live `HEDGR_STATUS.md` §7a/§297. The earlier full-inline KES screenshot at `/var/folders/sk/xwxpjmbj4cn155yxj_2gcbcc0000gn/T/codex-clipboard-949315df-1094-4339-8ef8-2a663d77c34e.png` is a 1290 × 1881-pixel signal reference only, **not** an approved compact-layout mock. It shows `KES 1,950 higher from the rate change`, the same-USD explanation and the comparison link; §7a expressly supersedes its arrow, full inline details and Home disclaimer placement. Its CSS viewport/device density and exact crop are unknown, so no pixel alignment or typography-size equivalence is claimed.
- Final browser-rendered implementation: `apps/frontend/test-results/currency-insight-compact-K-22a3f-g-its-full-inline-component-chromium/currency-inline-KES300-390.png` (390 × 1235 pixels), a full-page optimized-production screenshot at a 390 × 900 CSS-px viewport and device scale factor 1. It uses the same dynamic `$300`/KES 1,950 comparison signal as the old reference. This test-generated image is ignored local evidence, reproducible from `currency-insight.spec.ts`.
- Additional rendered captures: `apps/frontend/test-results/currency-insight-currency--8800c-xt-with-keyboard-disclosure-chromium/currency-inline-320-200.png` (320 × 4248 pixels, 320 × 900 CSS viewport, 200% root text) and `apps/frontend/test-results/currency-insight-currency--da854-xt-with-keyboard-disclosure-chromium/currency-inline-1440-100.png` (1440 × 1224 pixels, 1440 × 900 CSS viewport, 100% root text). The same browser suite captures 320/390/700/1280/1440 at 100% and 200% root text. All captures use device scale factor 1.
- I opened the older source and final same-value KES render together in one image-review input. I also inspected the 320px/200% and 1440px captures. The source is an old full-inline production crop while the implementation is a full compact Home, so the comparison is of signal, hierarchy, legibility, tokens and retained continuation—not 1:1 frame geometry. In the full-page mobile screenshots the fixed bottom navigation overlays its original viewport position; document content remains scrollable and the browser assertions check access/overflow. The source and final renders make the relevant copy legible, so no additional focused crop was needed.

## Findings

No actionable P0/P1/P2 mismatch remains in this bounded compact insight. The same-value KES render keeps the high-signal `KES 1,950 higher` and `from the rate change` under `Currency context` and `30-day example · Simulated`, followed by the quiet `Understand the comparison →` affordance. It is one button, subordinate to the open balance and separate observation. It does **not** restore the old large inline panel, upward performance arrow, repeated Home disclaimer or held-USD explanation; the latter details remain in the existing dialog. Dynamic unit/browser tests cover lower, equal, rounded-zero, zero, pending and unavailable states as well as all five selected display currencies. No investment-return language or directional color was observed in the inline result.

### Required fidelity surfaces

- Fonts/typography: the final render uses the governed Plus Jakarta Sans/Inter/Geist fallback stack and restrained navy hierarchy. The compact result is more prominent than its subtitle/cause but materially smaller than the `$300.00` balance. At 320px/200% the result and cause wrap at word boundaries rather than clipping. No exact font-size match is asserted against the old density-unknown crop.
- Spacing/layout: the Home order remains balance → observation/actions → compact Currency Context → planning/disclosure/replay. Mobile is single column and desktop keeps the full-width, divider-led context row beneath the two-column balance/observation composition. The source's much taller component is deliberately superseded, not missing content.
- Colors/tokens: navy, ivory and peach follow existing Hedgr surfaces; no green/red gain cue, new palette or elevated card effect appears. The subtle context background and divider preserve a subordinate treatment.
- Image/asset fidelity: the implementation retains the governed Hedgr mark and existing UI primitives. The old screenshot's arrow is intentionally absent under §7a; no generated logo, decorative asset or replacement illustration was introduced.
- Copy/content: exact dynamic currency/amount/direction and `from the rate change` are visible, with the exact simulation subtitle and a clear continuation. The full dialog retains same USD amount, both day/rate/estimate figures, invented-example and non-market boundaries, calculation detail and unchanged FX limitation. Default Home has no new inline insight.

## Accessibility, interaction and comparison history

- The launcher has a stable `Currency context` accessible name, its dynamic result is the accessible description, and Enter opens the existing native dialog. Escape closes it and returns focus. The result remains one button and exceeds a 44px target; tests verify no document/launcher horizontal overflow at 320/390/700/1280/1440px and 100%/200% root text. The separate dialog test retains its keyboard disclosure, trust limit and no storage mutation; existing E2E retains route/default isolation, the `$0 → $5 → $3` journey and selected-currency state.
- Initial runtime review found a potential accessibility/textContent join between `higher` and `from` in the inline description [P2]. The Implementer added an explicit whitespace node inside the already-authorised TSX and amended the runtime commit to `cb7862c`; no verifier runtime edit was made. The final KES/ZMW captures and accessible-description assertions show the spaced phrase, and this final comparison found no remaining actionable P0/P1/P2 issue. This is the single material QA iteration.
- The first local browser run used an incomplete build environment and was invalid as product evidence; a subsequent interrupted run left a stale `next start` process serving the prior build. Both setup issues were corrected before the final result. The final optimized build used AGENTS §6 CI-safe flags and a local stub backend. Focused unit tests passed **18/18**; the final consolidated relevant browser suite passed **45/45**, including the same-value KES capture; frontend typecheck and lint passed. Full repository validation, full hermetic browser suite, hosted checks and exact-revision shipped inspection remain separate delivery gates.

**Open questions:** there is no approved compact image for literal pixel-fidelity judgment, and participant comprehension of FX versus investment performance has not been measured. Neither gap authorizes further UI changes or release.

**Implementation checklist:** retain the dynamic neutral inline result, one accessible launcher, complete unchanged dialog, default isolation and the current simulation/disclosure boundaries; complete governed hosted/shipped verification before technical closeout.

**Follow-up polish:** none authorised by this finite amendment.

---

# Synthetic Home balance-copy amendment — design QA

Date: 2026-09-20

Ticket: `CLASS-A-VAL-002-WEEKEND-PREP-001`, finite §7a balance-copy amendment

Role: distinct Verifier; this is visual/test evidence, not participant or release acceptance.

final result: passed

## Source, render and comparison method

- Source visual truth: `/Users/musalwa/.codex/generated_images/01a0be96-02b7-7612-8ffb-d449ea8f67e9/exec-4bf2404f-4d6b-4b68-be51-583677bd1482.png` (1030 × 1527 pixels). This generated mobile concept has no defined CSS viewport or device scale; it is a hierarchy/copy target, not a 1:1 pixel specification.
- Rendered implementation: local synthetic Home at `http://127.0.0.1:3000/dashboard-synthetic-journey`, seeded to a completed `$5` simulated deposit and `$2` simulated withdrawal, yielding dynamic `$3.00 USD` and `≈ GHS 45.00 display estimate`. The full-page screenshot is `apps/frontend/test-results/scope-first-approved-open-balance-copy-at-390px-chromium/scope-first-GHS3-390.png` (390 × 1136 pixels); its viewport capture is the adjacent `scope-first-GHS3-390-viewport.png` (390 × 844 pixels). CSS viewport was 390 × 844 at device scale factor 1. These are ignored, reproducible Playwright output files, not new governed assets.
- Desktop control: `apps/frontend/test-results/scope-first-approved-open-balance-copy-at-1440px-chromium/scope-first-GHS3-1440.png` (1440 × 1147 pixels), CSS viewport 1440 × 1024 at device scale factor 1.
- Long-amount correction reference: `apps/frontend/test-results/scope-first-mockup-amount--96575-gible-at-390px-and-100-text-chromium/balance-fit-GHS253-390-100.png` (390 × 1148 pixels, CSS viewport 390 × 844, device scale factor 1). The companion `balance-fit-GHS253-*` captures cover 320/390/1280/1440px at 100% and 200% root text. In particular, the 320px/200% full page is 320 × 3883 pixels and the 1280px/200% full page is 1280 × 2718 pixels. These test-generated files are ignored local evidence and are reproducible from `scope-first.spec.ts`.
- I opened the source and first seeded 390px render together in one image-review input, then compared the source with the later exact `$253.00`/`GHS 3,795.00` corrected render in the same comparison input. I also inspected the desktop and enlarged-text captures and an initial local in-app-browser 390px/320px view. I did not force pixel alignment: the source is a stylized, larger-density image with no CSS viewport. The source's View Activity-first CTA and approximate brand mark are superseded by permanent-main §7a/§295 and governed assets.
- Focused-region comparison: the original-resolution paired images make the balance label, USD/local figures, new sentence, mobile divider, observation title/caption and actions readable. No smaller crop was needed; the desktop screenshot separately confirms the two-column composition.

## Findings

No actionable P0/P1/P2 mismatch in the authorised balance-copy region. The open balance remains the focal point; the exact semibold “Includes your simulated activity.” follows the local estimate; a quiet existing-token mobile divider separates it from the peach “What changed” card. The removed illustrative caption and both old scope rows do not appear. The observation remains separate, and deposit remains the filled first CTA with Activity secondary.

The initial $3 fixture did not expose the mockup-sized balance defect found after PR #614 shipped. The corrected 390px render now shows `$253.00 USD` on one line, the exact `≈ GHS 3,795.00 display estimate` beneath it, and the activity context beneath that. At 320px the selector stacks below a full-width label; at 200% text the USD suffix may take its own line, but the numeric amount and each word of the balance label remain intact. At 1280px/200% the `USD` suffix may similarly reflow below the whole `$253.00` amount. These are readable enlarged-text adaptations without clipping or horizontal overflow, not split financial digits.

## Required fidelity surfaces

- Fonts and typography: rendered activity context uses the existing Plus Jakarta Sans / Inter / Geist fallback stack, 600 weight and muted navy `rgb(54, 68, 124)`. Its 16px live desktop size and responsive mobile size are restrained relative to the dynamic amount. Text wraps without truncation at 320px and 200% root text.
- Spacing and layout: source and render preserve label → amount → estimate → context → divider → observation → actions. Mobile is single-column; desktop places the open balance beside the separate observation/actions. The 1px mobile separator restores the mock's quiet break without another card.
- Colors and tokens: ivory canvas, navy focal balance/primary action, peach observation, muted navy context and divider remain governed Hedgr values. No new palette, glow, gradient or decorative elevation is introduced.
- Image quality and assets: the implementation retains the governed Hedgr mark rather than the mockup-generated approximation. No raster, logo, icon or image asset was added or replaced.
- Copy and content: the new sentence is exact. Existing simulation/no-real-money disclosure, observation non-guarantee, selected-currency estimate, planning/disclosures, replay and default-route copy remain. The mock's stale CTA order is intentionally not translated.

## Accessibility, interactions and comparison history

- The 390px and 1440px render assertions cover exact copy, dynamic amounts, reading order, absent superseded wording, semibold context, mobile divider, observation, deposit-first CTA styles/targets/routes, navigation and disclosure continuity.
- The exact `$253.00`/GHS 3,795 fixture now runs at 320/390/1280/1440px and 100%/200% root text, asserting no horizontal overflow, no split numeric digits, no mid-word balance-label breaks, exact activity observation and preserved primary action order. At 390px/100% it also requires the full amount to occupy one line. The separate 320px/200% disclosure/44px-target test and broader finish test remain. Default Home and unavailable-data controls remain separate.
- In-app-browser error logs for the local Home were empty. Local development screenshots can show the Next.js development indicator; it is not product UI.
- Before my initial independent comparison, the Implementer identified the mock's missing mobile separator and added a scoped 1px existing-token border in separate runtime commit `951e97d`. That first comparison used the post-fix $3 screenshot above; it did not exercise the later shipped $253 finding.

### Post-merge long-amount correction history

1. **Shipped finding [P2]:** Exact-revision inspection of PR #614 at a true 390 CSS-px viewport found `$253.00` split into `$253.0` and `0 USD` beside the GHS selector. The earlier local $3 comparison had not exercised the approved example; its passing result was insufficient for long-amount acceptance.
2. **First local correction — still blocked:** A superseded local runtime attempt (`a309239`) moved the selector to the label row and reduced mobile amount sizing, keeping `$253.00 USD` on one line at 390px. The paired 320px/200% capture then showed the label breaking within words (`Simula / ted`, `balanc / e`); the 1280px/200% capture also split the final cent digit under inherited desktop sizing. Both were treated as P2 legibility defects; no pass was recorded.
3. **Second local correction — passed:** Runtime commit `3e028ad` stacks the selector beneath the full-width label at widths up to 22rem and restrains desktop amount sizing. The revised 320px/200% and 1280px/200% captures show whole label words and intact `$253.00`, and the revised 390px/100% render matches the approved four-line balance sequence. Eight new responsive fixtures and four existing scope-first tests pass (12/12). The `USD` suffix can reflow at 200% but never separates a cent digit; no actionable P0/P1/P2 issue remains in this finite correction.

Verification: original dashboard unit test **17/17 passed** and targeted hermetic browser suite **29/29 passed**; corrected long-amount scope-first suite **12/12 passed** locally. Full repository validation, production build, hosted checks and exact-revision shipped reinspection remain separate delivery gates, not claims of this local design QA. The in-app Browser was unavailable for the second correction pass, so that pass used same-origin rendered Playwright screenshots; no new browser-console claim is made. Participant comprehension of whether the activity has *already changed* the balance remains untested; publication/distribution stays paused.

## Attributed delivery and shipped inspection (Implementer, 2026-09-20)

The local delivery gates subsequently passed: full `pnpm validate` (902 frontend tests plus Bridge/snapshot/provenance, typecheck, lint and trust checks), optimized production build and all **118/118** hermetic browser tests with the stub backend. PR #615 merged by protected rebase at `abd44ca49230643d95e7e40004c4099e990c06ca` after hosted validate, build, full E2E, E2E smoke, evidence-pack, fork-safe checks, Vercel preview and independent convergence review passed. GitHub Production deployment `6553677522` reports success for that exact SHA at 2026-09-20 14:11:19 UTC.

The Implementer inspected the canonical shipped synthetic dashboard after that deployment at an effective **390 CSS-px** viewport (`innerWidth=390`, document `scrollWidth=371`): the current browser-local `$266.67 USD` remains on one line, its `≈ ZMW 5,333.40 display estimate` and “Includes your simulated activity.” remain below, the separate observation and deposit-first actions remain visible, and there is no horizontal overflow. At **1440 CSS px**, the balance remains left of the observation (`scrollWidth=1421`), with the same dynamic values. The default `/dashboard` retains “Illustrative position only.” and does not show the new activity sentence. The exact `$253.00`/GHS 3,795.00 example was verified in the independent local fixture rather than by changing production browser-local data. The protected exact-deployment URL required Vercel sign-in, so the production alias was inspected after the exact-SHA deployment status succeeded. No production transaction, reset or browser-storage change was made; this inspection makes no new console-log or participant-comprehension claim.

**Open questions:** none for this finite UI/copy amendment. A later Founder-owned comprehension test may evaluate the new sentence without altering it by inference.

**Implementation checklist:** retain the exact new line, removed scope/caption, existing-token mobile divider, dynamic estimates, separate observation and deposit-first actions; run the governed delivery gates before closeout.

**Follow-up polish:** none authorised under this amendment.

---

# Research wallet redesign — historical design QA

Date: 2026-09-15
Ticket: CLASS-A-VAL-002-WALLET-REDESIGN-001 / D-147 / §279

final result: passed

## Source and comparison method

Source: [accepted final hybrid](docs/ops/product-finish/wallet-redesign-baseline.png).
Compared the source and production screenshots together in the same image-review input. The three 458 × 956 screenshots match the reference's panel dimensions and completed $500 deposit / $200 withdrawal / $300 remaining state. Currency is ZMW with the unchanged invented day-0/day-30 fixture. Home planning and calculation detail are collapsed; Activity withdrawal detail is expanded.

Local review artifacts (untracked, reproducible through `wallet-redesign.spec.ts`):

- `output/wallet-redesign-20260915/home-reference.png`
- `output/wallet-redesign-20260915/currency-reference.png`
- `output/wallet-redesign-20260915/activity-reference.png`
- 390px full-page captures plus 320px/390px/1280px Home captures in the same directory.

The test emits these captures under its Playwright output directory. Final captures use a production build, with no development overlay. Full-panel comparison was sufficient; no isolated region required a separate crop.

## Outcome

- Home keeps the subtly tinted bordered balance as the strongest element, equal white rectangular utility CTAs, then observation, currency context and collapsed planning.
- Currency Context uses the existing comparison values and explicit limits. The same/rounded-zero cases have accurate headings. Native dialog plus bounded Tab cycling, Escape and focus return passed.
- Activity preserves the completed-event reconciliation before filtering. Expanded withdrawal shows Before $500, Withdrawal −$200, After $300. Pending/failed events have no completed balance effect and keep their existing failure reason/note.
- Main controls remain usable at 320px, 390px and desktop, with 100%/200% text. Existing currency/finish tests additionally cover 700px. Keyboard controls and default/unavailable-data negative controls passed.

## Comparison history

1. P2: inherited CTA typography/nowrap overflowed at 320px with 200% text. Scoped utility typography and responsive column sizing fixed it; new Home/Activity/dialog reflow checks and production captures passed.
2. P2: USD suffix lacked visual separation. Added explicit spacing and reviewed the production card.
3. P2: Currency Context heading was lighter than the reference. Applied the retained bold heading weight and recaptured/recompared the final dialog.
4. P2: native dialog keyboard navigation could leave the control cycle. Explicit first/last Tab wrapping now passes both directions, Escape and focus return.
5. P2: the initial dialog heading implied different estimates for equal or rounded-zero cases. Conditional headings and direct tests now preserve the comparison meaning.

No open P0/P1/P2 findings. Independent reviewer reviewed source scope, trust boundaries and all three clean reference captures; final disposition is recorded in the implementation evidence.

## Intentional adaptation and minor polish

The governed logo, existing utility assets, font and color tokens replace image-generated approximations. Text-labeled navigation and native disclosure markers preserve available approved assets. The existing balance-estimate wording, observation caption, replay and trust disclosures remain, so Home is longer than the illustrative image. Activity detail opens inside its selected record. These are deliberate translation constraints, not omitted functionality. An approved icon-set pass could further match the mockup, but is outside this ticket.

## Verification

- Full `pnpm run validate`: 72 test files / 876 tests, TypeScript, ESLint and repository checks passed.
- Production build and complete hermetic Playwright suite: 96 passed.
- `$0 → +$5 → −$2 → $3` passed for all five currencies; selector, comparison and filters preserve stored financial state.
- Research non-normal posture notices, empty/first-event states and failed/pending Activity details have direct unit coverage.

Technical and visual QA do not establish participant comprehension, demand or parent acceptance. Participant distribution remains paused. NO CROSS-LANE IMPACT.

<details>
<summary>Historical design QA retained from earlier tickets</summary>

# Design QA — CLASS-A-VAL-002-VISUAL-001 (D-103 + D-104)

## Comparison target

- Source visual truth: Paper file `01KJJ92DP1PB7A5SDSDWQKZ33S`, retained 1B.11 artboards:
  - Home `8OV-1`
  - Activity overview `8KH-1`
  - Activity detail `8LW-1`
  - Settings `8N9-1`
- D-104 evidence-hierarchy reference captures supplied from the verified D-103 build:
  - Home `/tmp/codex-remote-attachments/01a04306-bb36-71a0-bbdc-0112bf517b50/2294FA03-FD06-4171-81AF-CDEB310AD748/1-Photo-1.jpg`
  - Activity `/tmp/codex-remote-attachments/01a04306-bb36-71a0-bbdc-0112bf517b50/2294FA03-FD06-4171-81AF-CDEB310AD748/2-Photo-2.jpg`
- Implementation: optimized local production build at `http://localhost:3001`.
- Source viewport: 390 × 844 CSS px, 390 × 844 source pixels, 1× density.
- Implementation viewport override: 390 × 844 CSS px, device pixel ratio 1.
- Browser-rendered captures:
  - `/tmp/hedgr-visual-qa/home-final-production.jpg`
  - `/tmp/hedgr-visual-qa/activity-final-production.jpg`
  - `/tmp/hedgr-visual-qa/activity-detail-final-production.jpg`
  - `/tmp/hedgr-visual-qa/settings-final-production.jpg`
- The in-app browser's scrollable page capture excludes its 15 px scrollbar and 32 px browser-safe-area overlay. Normal page captures are 375 × 812 pixels; the dialog capture is 390 × 844 pixels. The page captures were normalized to 390 × 844 for visual comparison. This was a capture normalization only; browser measurements and responsive checks used the 390 × 844 CSS viewport.
- State: governed synthetic fixture complete at `$0 → +$5 → −$2 → $3`; Activity shows two completed entries; Activity detail shows the simulated withdrawal; Settings uses the existing direct-route state.

The retained Paper screens remain the visual reference for typography, spacing, surfaces, borders, radii, restrained color, and mobile polish. D-103 froze the existing runtime's copy, semantic order, heading hierarchy, routes, state, behavior, and Settings meaning. D-104 subsequently authorized only the named Home/Activity evidence-hierarchy micro-revision: Home synthesizes with a compact evidence bridge; Activity substantiates with the chronological record first. All other D-103 boundaries remain preserved.

## Full-view comparison evidence

- Home: the supplied D-103 Home reference and updated optimized-production Home were reviewed together at the same 390 × 844 mobile viewport. The large three-row reconciliation treatment is replaced by a compact `before − change = now` line, completed-change count, and `View Activity` continuation. The current position remains dominant while `What Hedgr notices` now enters the first viewport without losing inspectable evidence.
- Activity: the supplied D-103 Activity reference and updated optimized-production Activity were reviewed together at 390 × 844. The duplicate `What happened` explainer and large evidence card are removed. A restrained current-position summary now leads directly into subordinate filters and the chronological record. Synthetic rows omit the ambiguous local-currency amount while retaining event, timestamp, delta, and resulting position.
- Settings: Paper and the production Settings capture were reviewed together at 390 × 844. The implementation now uses lightweight divider-led rows and pale trust surfaces rather than nested heavy cards. Existing environment/profile semantics remain unchanged.
- Desktop Home was reviewed at 1280 × 900. The evidence sequence becomes a single horizontal track, the interpretation surface remains legible, and no horizontal overflow or content-order drift was found.

## Focused-region comparison evidence

- Activity detail was compared as a focused interaction state against Paper artboard `8LW-1`. The modal preserves the source's centered simulated amount, quiet evidence card, restrained boundary surface, generous dismissal control, and mobile-sheet radius while retaining the existing dialog behavior and content contract.
- The compact simulation disclosure was reviewed separately after the first pass. At 390 px it remains one line, keeps its 44 px explanation control, and no longer creates the tall wrapped banner seen in the first implementation pass.
- The Home interpretation surface and Settings environment rows were inspected at original capture scale because their small-label weight, divider rhythm, border color, and pale fills materially carry the retained premium treatment.

## Required fidelity surfaces

- Fonts and typography: existing Plus Jakarta Sans stack retained; display hierarchy uses strong but restrained weights; small labels use uppercase cobalt/indigo with controlled tracking; body copy remains readable without truncation.
- Spacing and layout rhythm: mobile sides are 24 px; section gaps, row density, radii, shadows, and bottom navigation were tightened to match the retained calm rhythm. No horizontal overflow was found at 390, 768, or 1280 px.
- Colors and tokens: only existing Hedgr tokens are used. White, dark indigo, cobalt labels, pale indigo surfaces, and cool dividers materially match the source. No gradients, glows, red/green financial verdict signaling, or crypto decoration were introduced.
- Image quality and assets: the retained screens do not depend on photographic or illustrative assets. No new image, inline SVG, handcrafted SVG, CSS drawing, emoji, dependency, or approximate asset was added.
- Copy and content: only the D-104-authorized Home/Activity evidence labels and presentation order changed. Routes, state, fixture arithmetic, event semantics, event-detail copy, disclosures, planning selection, Settings semantics, and financial meaning remain unchanged.
- Icons: existing icons were retained; no icon family or asset substitution was introduced.

## Accessibility and interaction checks

- The 390 × 844 mobile menu toggle remains visible at 44 × 44 px, opens the existing Home / Activity menu, and keeps excluded routes unavailable.
- The retained bottom Home / Activity links remain at least 44 px high and display visible active treatment.
- Simulation technical details open and close from the compact disclosure control.
- Activity All / Deposits / Withdrawals filtering works; the withdrawal filter returns only the expected completed withdrawal in the verified synthetic fixture.
- Activity detail opens from a record, closes from the explicit Close button, and closes with Escape.
- Focus rings remain present on interactive controls; named modal and disclosure unit coverage passed.
- Fresh optimized-production Home and Activity tabs produced no browser console warnings or errors in the D-104 pass.

## Responsive evidence

- 390 × 844: Home, Activity, and Settings rendered without horizontal overflow; mobile shell, menu, and bottom navigation remained reachable.
- 768 × 900: Home, Activity, and Settings rendered without horizontal overflow or content-order change.
- 1280 × 900: Home rendered without horizontal overflow; evidence rows aligned horizontally and desktop navigation remained unchanged in behavior.

## Comparison history

### Pass 1 — blocked

- [P2] Compact simulation disclosure wrapped into two rows and consumed disproportionate vertical space.
  - Fix: tightened mobile typography/gaps and kept both disclosure labels on one line while preserving the 44 px control.
  - Post-fix evidence: `/tmp/hedgr-visual-qa/home-final-production.jpg`.
- [P2] Home's first viewport was materially denser than the retained source, leaving the interpretation surface entirely below the fold.
  - Fix: reduced presentation-only heading scale, section gaps, evidence-row padding, and bottom-navigation height without changing content or hierarchy.
  - Post-fix evidence: `/tmp/hedgr-visual-qa/home-final-production.jpg` and `/tmp/hedgr-visual-qa/home-production-1280x900.png`.
- [P2] Settings used stacked nested cards that felt heavier than the retained lightweight reference.
  - Fix: converted existing environment and profile presentation into thin divider-led rows; kept every existing field and explanatory block.
  - Post-fix evidence: `/tmp/hedgr-visual-qa/settings-final-production.jpg`.

### Pass 2 — blocked

- [P2] The initial bottom-navigation treatment hid the existing mobile menu toggle and failed the preserved accessibility/navigation contract.
  - Fix: restored the 44 × 44 mobile toggle and collapsible menu, visually integrated the toggle into the synthetic journey shell, and retained the bottom Home / Activity navigation as the Paper-derived mobile presentation.
  - Post-fix evidence: focused E2E `10 passed`; `/tmp/hedgr-visual-qa/home-final-production.jpg`.
- [P2] Bottom-navigation labels sat too low for the in-app browser's captured safe area.
  - Fix: moved labels upward within the unchanged 64 px touch targets.
  - Post-fix evidence: `/tmp/hedgr-visual-qa/home-final-production.jpg`.

### Pass 3 — passed

- No actionable P0, P1, or P2 visual, responsive, interaction, or accessibility findings remain.
- Remaining source/implementation structural differences are the intended consequence of preserving existing runtime semantics, hierarchy, shell, and Settings behavior; they are outside this visual-only ticket and do not compromise the retained visual grammar.

### Pass 4 — D-104 passed

- Home's former reconciliation headline and large Before / Expense / Now rows competed with the current position and delayed interpretation.
  - Fix: replaced them with `How your position changed`, a completed-change count, `View Activity`, and one compact `before − change = now` evidence line.
- Activity explained evidence twice before exposing the record.
  - Fix: removed the duplicated introduction and reduced reconciliation to two quiet lines immediately above filters and events.
- The synthetic deposit row's unlabelled ZMW equivalent visually merged with resulting-position metadata.
  - Fix: omitted local-currency equivalents only from synthetic Activity rows; ordinary non-synthetic rows retain their existing local-currency treatment.
- The source captures and updated optimized-production renders were inspected together at 390 × 844. No actionable P0, P1, or P2 mismatch remains within D-104 scope.
- Activity filter and event-detail interactions passed in the in-app browser. Horizontal-overflow checks passed at 390 × 844, 768 × 900, and 1280 × 900; browser diagnostics were empty.

## Verification

- `pnpm validate` — passed on the final implementation.
- `pnpm --filter @hedgr/frontend build` — passed on the final implementation.
- `pnpm --filter @hedgr/frontend exec playwright test tests-e2e/class-a-val-002.spec.ts tests-e2e/smoke-pack.spec.ts --reporter=dot` — 10 passed on the final implementation.
- `pnpm --filter @hedgr/frontend exec vitest run __tests__/dashboard.page.test.tsx __tests__/activity.page.test.tsx --reporter=dot` — 10 passed on the final implementation.
- Same-input Paper / production visual comparisons completed for Home, Activity, Activity detail, and Settings.
- D-104 same-input reference / production comparisons completed for Home and Activity.

final result: passed

---

# Design QA — D-114 frontend route hygiene

## Comparison target

- Optimized local production build at `http://localhost:3001`.
- Desktop Trust information capture at 1440 × 1000: `/tmp/hedgr-route-hygiene-desktop.png`.
- Final mobile synthetic Trust information capture at 390 × 844: `/tmp/hedgr-route-hygiene-mobile-fixed.png`.
- Current governed Settings hierarchy, Hedgr tokens, and compact simulation disclosure remain the controlling visual grammar; no new design direction is introduced.

## Findings and correction

- The customer-facing **About this simulation** page uses one H1, three short information sections, the existing pale trust surface, divider-led supporting sections, and a 44 px **Back to Settings** link. No obsolete environment badge or internal Trust & Risk diagnostics remain.
- Desktop inspection found no overflow, obscured content, console error, or navigation ambiguity.
- [P2] The first 390 × 844 synthetic Trust render collapsed the mobile navigation row because `/settings/trust` was not recognized as Settings context. The 44 px hamburger occupied the same vertical region as **Back to Settings**.
  - Fix: treat Settings subpaths as Settings navigation context, reserve the full mobile navigation row, and retain the active Settings treatment in the bottom navigation.
  - Post-fix measurement: hamburger bounds `y=63..107`; **Back to Settings** bounds `y=142..186`; no overlap and no horizontal overflow.
- Final mobile inspection found no actionable P0, P1, or P2 visual, responsive, interaction, or accessibility issue.

## Verification

- Root and legacy Trust redirects resolve to `/login` and `/settings/trust` respectively.
- Synthetic Trust and return navigation preserve `journey=class-a-val-002`; **About Hedgr** remains withheld.
- Retired `/prototype/**` and `/api/defi` paths return 404; both governed synthetic journey entries return 200.
- Desktop and 390 × 844 overflow checks passed; browser diagnostics contained no console errors.
- `pnpm --filter @hedgr/frontend build` — passed after the mobile navigation correction.
- Focused Trust Vitest — 3 / 3 passed.

final result: passed

---

# Design QA — D-107 Home / Settings productisation refinement

## Comparison target

- Browser-rendered implementation: optimized local production build at `http://localhost:3001/dashboard-synthetic-journey`.
- Mobile evidence: `/var/folders/sk/xwxpjmbj4cn155yxj_2gcbcc0000gn/T/hedgr-d107-qa-9Bsxdl/home-mobile.png`, `/var/folders/sk/xwxpjmbj4cn155yxj_2gcbcc0000gn/T/hedgr-d107-qa-9Bsxdl/settings-mobile-fixed.png`, and `/var/folders/sk/xwxpjmbj4cn155yxj_2gcbcc0000gn/T/hedgr-d107-qa-9Bsxdl/activity-mobile.png` at 390 × 844 CSS px.
- Desktop evidence: `/var/folders/sk/xwxpjmbj4cn155yxj_2gcbcc0000gn/T/hedgr-d107-qa-9Bsxdl/home-desktop.png` and `/var/folders/sk/xwxpjmbj4cn155yxj_2gcbcc0000gn/T/hedgr-d107-qa-9Bsxdl/settings-desktop.png` at 1280 × 900 CSS px.
- Comparative Mobbin references: N26 balance-adjacent actions (`https://mobbin.com/screens/52ecfd8a-5c0a-4a0d-bf1f-518ee3b88767`), Ubank lightweight Settings groups (`https://mobbin.com/screens/3eedfefa-9011-4fc4-872b-469e6856ea66`), and Airwallex Activity as a separate factual record (`https://mobbin.com/screens/c9f168e7-3387-457f-8720-db01db225722`). These informed hierarchy only; Hedgr's existing tokens and approved synthetic semantics remain controlling.

## Findings

- Home retains the two balance-adjacent utilities, **Add simulated deposit** and **View Activity**, and removes the duplicated **Optional next step** block without introducing a replacement CTA.
- Persistent synthetic navigation now reads **Home / Settings**. Activity remains reachable from **View Activity** and its information architecture, filters, records, arithmetic, and detail behavior remain unchanged.
- Settings now presents only **Account**, intentionally sparse **Preferences**, and **Trust & information**. Environment diagnostics, mock-mode explanations, and unsupported profile-gating language are absent.
- The simulation boundary remains materially visible in the persistent disclosure and the Settings trust card. Settings does not inherit the journey-step shell or imply a live capability.

## Responsive and interaction evidence

- 390 × 844: Home utilities are equal 96 px touch targets; Home and Settings bottom-navigation links are equal 64 px touch targets; no horizontal overflow was found.
- 1280 × 900: Home utilities are equal 112 px targets; Home / Settings remains the only primary navigation pair; no horizontal overflow was found.
- Home → Settings preserves `?journey=class-a-val-002`; Settings → Home returns to the human-readable synthetic route; Home → View Activity opens the existing synthetic Activity record.
- The initial mobile Settings render exposed a [P2] overlap between the collapsed synthetic menu control and the Settings heading. The route-specific navigation spacing was corrected and the post-fix mobile render passed.
- No actionable P0, P1, or P2 visual, responsive, interaction, or accessibility findings remain within D-107 scope.

## Verification

- `pnpm run validate` — passed, including trust, RAP, Bridge snapshot, test, typecheck, and lint gates.
- Frontend Vitest suite — 67 files / 771 tests passed.
- `pnpm --filter @hedgr/frontend typecheck` — passed.
- `pnpm --filter @hedgr/frontend lint` — passed.
- `pnpm --filter @hedgr/frontend build` — passed after the mobile spacing correction.
- Focused Playwright assertions were updated in `class-a-val-002.spec.ts` and `smoke-pack.spec.ts`; the protected hosted E2E workflow remains the merge gate.
- D-108 / §240 reconciles the single stale **Trust & Risk** assertion exposed by the first protected run (56 / 57 passed); the unchanged protected workflow must pass on the amended commit before merge.

final result: passed

---

# Design QA — Lane V no-icon grouped planning shelf

## Comparison target

- Source visual truth: `/Users/musalwa/.codex/generated_images/01a04306-bb36-71a0-bbdc-0112bf517b50/exec-72536737-f9aa-4978-a320-8c12af617c78.png` (Founder-retained no-icon grouped shelf).
- Browser-rendered implementation: optimized local production build at `http://localhost:3000/dashboard-synthetic-journey`.
- Implementation screenshot: `/Users/musalwa/.codex/generated_images/01a04306-bb36-71a0-bbdc-0112bf517b50/lane-v-planning-shelf-section.png`.
- Same-input comparison: `/Users/musalwa/.codex/generated_images/01a04306-bb36-71a0-bbdc-0112bf517b50/lane-v-planning-shelf-comparison.png`.
- Source pixels: 979 × 1607, normalized to 375 × 616 for comparison.
- Browser viewport: 390 × 844 CSS px at device pixel ratio 1. The in-app browser capture excludes its 15 px scrollbar, producing a 375 px-wide content capture; the focused section is 375 × 510 pixels.
- State: collapsed **View planning percentages** disclosure in the completed governed synthetic journey. No planning-focus selection, arithmetic, or category meaning changed.

## Full-view comparison evidence

- The retained source and production section were combined into one side-by-side comparison at the same 375 px content width.
- Both show one rounded, cool-bordered shelf containing three equal, text-only rows in the approved order: **Now**, **Reserve**, **Growth**.
- The separate planning-purpose boundary and understated **View planning percentages** continuation remain immediately beneath the shelf.
- The implementation is intentionally denser than the isolated generated study because the active ticket freezes the existing Home typography hierarchy and full-page rhythm. This does not change the selected surface treatment or any semantic relationship.

## Focused-region comparison evidence

- The changed area is itself a focused component region, and all titles, descriptions, separators, border radii, and boundary copy are readable at original capture scale. No smaller asset or icon region required a separate crop.
- Browser measurements at 390 × 844 confirm a 327 px-wide shelf with three equal rows of approximately 84 px each, a 16 px radius, a 1 px governed border, hidden overflow, and zero `img` or `svg` descendants.

## Required fidelity surfaces

- Fonts and typography: the existing Plus Jakarta Sans stack, heading levels, weights, sizes, line heights, and approved copy are unchanged. Typography remains the sole carrier of category meaning.
- Spacing and layout rhythm: three equal rows now read as one coherent shelf. Mobile padding is 20 px per row; the outer section order and the gap to the boundary/disclosure remain unchanged.
- Colors and visual tokens: only existing `hedgr-*` classes are used. The shelf uses white, `hedgr-100` dividers/border, `hedgr-800` titles, and `hedgr-500` descriptions. No gradients, glows, raw semantic colors, or token changes were introduced.
- Image quality and asset fidelity: the selected direction contains no imagery or icons. The implementation adds no asset, dependency, inline SVG, handcrafted SVG, CSS drawing, emoji, or text-glyph substitute.
- Copy and content: every user-facing string, test identifier, category order, percentage value, boundary statement, and disclosure sentence remains unchanged.

## Accessibility and interaction checks

- The shelf remains a labelled description list with `dt` / `dd` semantics and equal, legible rows.
- **View planning percentages** opened and closed successfully in the in-app browser; the existing `50% / 30% / 20%` structure remained secondary and contained no progress bar.
- Optimized-production browser diagnostics contained no warnings or errors.
- No horizontal overflow was found at the 390 × 844 mobile viewport or at 1024 × 768.

## Responsive evidence

- 390 × 844: the shelf renders as three vertically stacked, equal-width rows with no icons and no clipping.
- 1024 × 768: the existing responsive contract renders the same three purposes as equal columns inside one rounded shelf; each column is approximately 314 px wide and 79 px high, with no document overflow.

## Comparison history

### No-icon shelf pass 1 — passed

- No actionable P0, P1, or P2 mismatch was found.
- [P3] The production rows are more compact than the isolated generated reference. This is accepted because it preserves the governed Home type scale and page density while reproducing the selected grouped-shelf treatment.
- No visual fix was made after comparison; the first implementation already met the retained presentation direction within the active semantic/copy/hierarchy freeze.

## Verification

- `pnpm --filter @hedgr/frontend exec vitest run __tests__/engine-allocation-bands.test.tsx` — 11 tests passed.
- `pnpm --filter @hedgr/frontend typecheck` — passed.
- `pnpm --filter @hedgr/frontend lint` — passed.
- `pnpm --filter @hedgr/frontend build` — passed.
- `pnpm run validate` — passed; 67 frontend test files / 771 tests passed, with repository typecheck and lint clean.
- Optimized-production in-app browser checks — passed for mobile rendering, desktop responsive rendering, disclosure interaction, overflow, and console/page diagnostics.

final result: passed

---

# Design QA — D-105 Home utility-row hierarchy amendment

## Comparison target

- Source visual truth: `/Users/musalwa/.codex/generated_images/01a04306-bb36-71a0-bbdc-0112bf517b50/exec-4a98b01e-fe43-491e-acdd-54c1a303e552.png` (selected Option 2; utility icons present, icon-free **What Hedgr notices** tile).
- Browser-rendered implementation: `http://localhost:3001/dashboard-synthetic-journey`.
- Final implementation screenshot: `/Users/musalwa/.codex/generated_images/01a04306-bb36-71a0-bbdc-0112bf517b50/d105-home-final.png`.
- Full-view same-input comparison: `/Users/musalwa/.codex/generated_images/01a04306-bb36-71a0-bbdc-0112bf517b50/d105-reference-comparison-final.png`.
- Focused utility/interpretation comparison: `/Users/musalwa/.codex/generated_images/01a04306-bb36-71a0-bbdc-0112bf517b50/d105-utility-notice-comparison-final.png`.
- Source pixels: 853 × 1844. The source was normalized to 390 px width for comparison.
- Browser viewport: 390 × 844 CSS px at 1× density. The in-app browser's page capture is 375 × 1997 px after its 15 px scrollbar exclusion; it was normalized to 390 px width for the same-input comparison.
- State: completed governed synthetic fixture `$0 → +$5 → −$2 → $3`. The source mock's `$450` / `ZMW 9,000` content is a visual-hierarchy example, not authorized fixture or arithmetic. The comparison therefore judges hierarchy, spacing, surfaces, type, and assets rather than dynamic values.

## Findings

- No actionable P0, P1, or P2 visual, responsive, interaction, or accessibility mismatch remains within D-105 scope.
- [P3] The implementation's interpretation tile is slightly denser than the generated source study.
  - Location: synthetic Home **What Hedgr notices** tile.
  - Evidence: the focused comparison shows the source study using more vertical breathing room, while the implementation preserves the retained D-103/D-104 component density and exact approved copy.
  - Impact: minor polish difference only; the interpretation remains clearly separated, legible, and immediately follows the utility row.
  - Disposition: acceptable under the semantic/copy/hierarchy freeze; no component-level copy or spacing contract was reopened by D-105.

## Required fidelity surfaces

- Fonts and typography: Plus Jakarta Sans remains the only app stack. The position, utility labels, uppercase interpretation label, question, answer, and disclaimer preserve the retained weight hierarchy. At 390 px, **Add simulated deposit** wraps intentionally and **View Activity** remains on one line as in the source.
- Spacing and layout rhythm: current position remains dominant; two equal 96 px utilities form the immediate second layer; the interpretation tile follows without an arithmetic bridge. The 24 px mobile margins, 12 px tile gap, rounded surfaces, and subdued elevation reproduce the source's calm rhythm. No horizontal overflow exists at 320, 390, or 1280 px.
- Colors and visual tokens: only existing Hedgr token classes are used. The utility tiles use white surfaces, the approved cool border, dark-indigo labels, and blue line icons. No gradient, glow, red/green financial signal, or crypto decoration was introduced.
- Image quality and asset fidelity: the two generated transparent PNG line icons are saved at 128 × 128 px and rendered at 36 × 36 CSS px. Both retain clean alpha edges and remain sharp at the target size. No inline SVG, handcrafted SVG, CSS drawing, emoji, or text-glyph stand-in was used.
- Copy and content: **Add simulated deposit**, **View Activity**, and all retained interpretation/planning copy match the authorized D-105 state. No latest-change line, equation, event-count bridge, or replacement copy appears. The governed `$5 / $2 / $3` fixture and existing planning semantics remain unchanged.
- Icons: only the two utility tiles include icons. The **What Hedgr notices** tile contains zero images/icons in the DOM, matching the selected Option 2 variant.

## Accessibility and interaction checks

- Both utility tiles are semantic links inside a labelled **Simulation utilities** navigation region.
- Each utility is 96 px high at 320/390 mobile widths and 112 px high at 1280 px, exceeding the 44 px touch-target floor.
- **Add simulated deposit** navigates to the existing `/deposit?journey=class-a-val-002` flow; the default ZMW 100 example was completed and recorded the existing +$5 simulated event.
- The existing continuation to `/withdraw?journey=class-a-val-002` was completed with the governed $2 simulated withdrawal; returning Home showed $3 and the retained interpretation.
- **View Activity** navigates to `/activity?journey=class-a-val-002`; the completed withdrawal row showed −$2 and `$3.00 resulting`; returning Home preserved `$3.00`.
- Browser diagnostics contained no console errors after the completed flow.

## Responsive evidence

- 320 × 844: 0 px horizontal overflow; both tiles remain 96 px high; interpretation tile remains icon-free.
- 390 × 844: 0 px horizontal overflow; utilities render in the intended two-up row; the completed screenshot and both comparison artifacts were captured from this viewport.
- 1280 × 900: 0 px horizontal overflow; the utility grid expands within the existing max-width container; both tiles remain equal at 112 px high; interpretation remains icon-free.

## Comparison history

### D-105 pass 1 — blocked

- [P2] The first implementation used a heavier `border-hedgr-200` treatment and allowed **View Activity** to wrap, making the utility row feel denser and less confident than the source.
  - Fix: reduced the utility border to `border-hedgr-100`, tightened horizontal padding/gap, increased icon display to 36 px, and kept **View Activity** on one line without changing the label or destination.
  - Earlier evidence: `/Users/musalwa/.codex/generated_images/01a04306-bb36-71a0-bbdc-0112bf517b50/d105-reference-comparison.png`.
  - Post-fix evidence: `/Users/musalwa/.codex/generated_images/01a04306-bb36-71a0-bbdc-0112bf517b50/d105-reference-comparison-final.png` and `/Users/musalwa/.codex/generated_images/01a04306-bb36-71a0-bbdc-0112bf517b50/d105-utility-notice-comparison-final.png`.

### D-105 pass 2 — passed

- The source and final implementation were reviewed together at normalized mobile width, with a separate focused utility/interpretation comparison.
- No actionable P0/P1/P2 findings remain. Dynamic amount differences and the existing shell/planning continuation are authorized product constraints rather than visual drift.

## Verification

- `pnpm validate` — passed; 67 frontend test files / 771 tests passed, plus Bridge tests, typecheck, lint, trust checks, snapshot checks, and RAP freshness.
- `pnpm build` — passed; optimized Next.js production build completed.
- In-app browser flow — passed for both utilities, governed deposit/withdraw journey, return-to-Home state, Activity record, console errors, and responsive measurements.
- `apps/frontend/tests-e2e/class-a-val-002.spec.ts` assertions were reconciled to the D-105 state; protected hosted E2E remains the merge gate.

final result: passed

---

# Design QA — Lane V planning-purpose shelf continuity

## Comparison target

- Source shell truth: `/tmp/codex-remote-attachments/01a04306-bb36-71a0-bbdc-0112bf517b50/813D5225-A7C2-4A05-B4D6-BD07F06664AF/1-Photo-1.jpg` (**What Hedgr notices** surface treatment).
- Source placement truth: `/tmp/codex-remote-attachments/01a04306-bb36-71a0-bbdc-0112bf517b50/813D5225-A7C2-4A05-B4D6-BD07F06664AF/2-Photo-2.jpg` (heading, supporting sentence, grouped purposes, boundary, and continuation remain separate).
- Browser-rendered implementation: optimized local production build at `http://localhost:3000/dashboard-synthetic-journey`.
- Mobile implementation screenshot: `/Users/musalwa/.codex/generated_images/01a04306-bb36-71a0-bbdc-0112bf517b50/lane-v-planning-purpose-shelf-continuity-390x844.png`.
- Desktop implementation screenshot: `/Users/musalwa/.codex/generated_images/01a04306-bb36-71a0-bbdc-0112bf517b50/lane-v-planning-purpose-shelf-continuity-1024x768.png`.
- Same-input comparison: `/Users/musalwa/.codex/generated_images/01a04306-bb36-71a0-bbdc-0112bf517b50/lane-v-planning-purpose-shelf-continuity-comparison.png`.
- Source pixels: 1280 × 679 for the shell reference and 1206 × 1280 for the placement reference. Implementation pixels: 375 × 812 from a 390 × 844 CSS viewport at device pixel ratio 1; the in-app browser excludes its 15 px scrollbar. The 1485 × 891 comparison preserves each artifact's aspect ratio and judges the focused surface treatment rather than false 1:1 screen geometry.
- State: collapsed **View planning percentages** disclosure in the completed governed synthetic journey. No copy, category order, percentage, planning meaning, or interaction changed.

## Full-view comparison evidence

- The approved shell reference and final mobile implementation were combined into one side-by-side comparison input.
- The pale `hedgr-100/20` surface, `hedgr-100` border, 16 px radius, and restrained `shadow-sm` now apply only to the grouped **Now / Reserve / Growth** shelf.
- **What you are building toward**, its explanatory sentence, the post-Growth planning boundary, and **View planning percentages** remain on the existing white page treatment outside the shelf.
- The desktop render preserves the existing three-column contract; mobile preserves the existing stacked three-row contract. Neither viewport shows horizontal overflow.

## Focused-region comparison evidence

- The changed shelf is the focused region. Titles, definitions, dividers, pale fill, border, radius, and shadow remain readable in the combined comparison without a smaller crop.
- Browser-computed mobile styles confirm `bg-hedgr-100/20`, a `rgb(202, 208, 232)` border, 16 px radius, and the existing `shadow-sm`. The parent section remains white, square, shadow-free, and separated by its original top border.

## Required fidelity surfaces

- Fonts and typography: the existing Plus Jakarta Sans stack, weights, sizes, line heights, wrapping, and category hierarchy remain unchanged. No icon or additional semantic cue was introduced.
- Spacing and layout rhythm: all heading, caption, row padding, post-shelf boundary spacing, and disclosure spacing remain unchanged. The only visual move is the selected card surface from the whole section to the grouped purpose shelf.
- Colors and visual tokens: only existing Hedgr classes are used. The shelf now shares the interpretation card's pale indigo surface, cool border, radius, and restrained elevation; the surrounding page remains white.
- Image quality and asset fidelity: no product image, icon, inline SVG, handcrafted SVG, CSS drawing, emoji, dependency, or generated asset was added.
- Copy and content: **What you are building toward**, its explanatory sentence, all Now / Reserve / Growth definitions, the planning-purpose boundary, percentages, and disclosure copy are unchanged.

## Accessibility and interaction checks

- The shelf remains a labelled `dl` with `dt` / `dd` relationships and no icon-only meaning.
- **View planning percentages** retains its native disclosure behavior and the existing 50% / 30% / 20% content.
- Optimized-production browser diagnostics contained no warnings or errors.

## Responsive evidence

- 390 × 844: three stacked pale rows inside one bordered 16 px shelf; parent heading and boundary remain outside; no horizontal overflow.
- 1024 × 768: three equal pale columns inside one shelf; parent heading and boundary remain outside; no horizontal overflow.

## Comparison history

### Shelf-continuity pass 1 — blocked

- [P2] The first interpretation applied the pale card shell to the entire **What you are building toward** section, incorrectly pulling the heading, caption, boundary, and percentage control into the tile.
  - Fix: restored the parent section's existing white divider-led treatment and moved the pale surface, border, radius, and shadow exclusively to the grouped Now / Reserve / Growth shelf.
  - Earlier evidence: `/Users/musalwa/.codex/generated_images/01a04306-bb36-71a0-bbdc-0112bf517b50/lane-v-planning-card-continuity-comparison.png`.
  - Post-fix evidence: `/Users/musalwa/.codex/generated_images/01a04306-bb36-71a0-bbdc-0112bf517b50/lane-v-planning-purpose-shelf-continuity-comparison.png`.

### Shelf-continuity pass 2 — passed

- No actionable P0, P1, or P2 visual, responsive, interaction, or accessibility findings remain.
- No P3 follow-up is required for this bounded surface change.

## Verification

- `pnpm --filter @hedgr/frontend exec vitest run __tests__/engine-allocation-bands.test.tsx __tests__/dashboard.page.test.tsx --reporter=dot` — 19 tests passed.
- `pnpm --filter @hedgr/frontend build` — passed.
- `pnpm run validate` — passed; 67 frontend test files / 771 tests passed, with repository typecheck, lint, trust, snapshot, and RAP freshness checks clean.
- Optimized-production in-app browser checks — passed for mobile rendering, desktop responsive rendering, overflow, and console/page diagnostics.

final result: passed

</details>
