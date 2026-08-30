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
