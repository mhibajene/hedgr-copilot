# HEDGR-UI-003 Design QA and Change Log

## Comparison target

- Immediate baseline: HEDGR-UI-002 Dashboard presentation on the synthetic journey route.
- Governing constraints:
  - Founder-approved adversarial-review Option 2 (static token lane differentiation + Review Snapshot density cut)
  - `DESIGN.md` navy / lavender tokens only
  - `docs/brand/HEDGR_UI_APPLICATION_RULES.md`
  - ADR **0013** informational bands
  - Paper Row 08 Dominant + Supporting as hierarchy guidance only — no Option B dollars-in-lanes, no Balanced / Monitoring / Protected fills
- Rendered implementation: `http://localhost:3000/dashboard?journey=class-a-val-002`

## Viewport and state

- Route state: `CLASS-A-VAL-002` synthetic journey, mock authentication, stub / fixed financial surfaces, normal Stability Engine posture.
- Theme: governed Hedgr light surface using approved navy / lavender / white tokens.

## Focused region comparison evidence

### Supporting lanes

- Stable balance remains the sole dark dominant holding surface with the restrained Primary Stability Edge.
- Conservative yield uses static `bg-hedgr-100` with `border-hedgr-200` / top accent `hedgr-300`.
- Reserve uses static `bg-hedgr-200` with `border-hedgr-300` / top accent `hedgr-600`.
- Surfaces do not change by posture. No green / amber / orange / red status hues. No dollar amounts in lanes. Percentages remain `Target share · N%` only.
- Labels, role hierarchy, size, and copy remain primary; colour is a secondary distinguishability aid.

### Review Snapshot density cut

- Open surface retains: Review title, current simulation status / stance, fixture target date, last viewed locally, and closed Review details.
- Removed from the open surface: Orientation badge, cadence paragraph, and change-signal paragraph.
- Cadence, change signal, continuity copy, disclaimer, and recent readings remain available inside Review details without changing fingerprint / memory behavior.

## Change log

### Tonal differentiation

- Added static governed supporting-lane fills for Conservative yield and Reserve only.
- No new token, semantic alias, palette value, or posture-linked colour mapping.

### Progressive disclosure / density

- Review Snapshot open surface reduced to status + temporal fields.
- Secondary check-in and change-comparison copy moved behind the existing native disclosure.

### Content / semantics

- No fixture, posture, target, ledger, routing, or trust-claim rewrite.
- No Condition Interface, no Balanced / Monitoring / Protected product labels, no dollars-in-lanes.

## Accessibility and contrast notes

- Supporting-lane distinction remains available through labels and structure if colour is removed.
- Text pairs continue to use approved navy / lavender / dark / white combinations previously reviewed under HEDGR-UI-002.
- Review Snapshot temporal labels remain visible without requiring disclosure interaction.

## Validation evidence

- Targeted allocation / Review Snapshot unit contracts updated for static surfaces and density cut.
- Scoped lint / unit validation recorded during PR posture.
- No `apps/frontend/lib/engine/**` edit.

## No-live-authority confirmation

- No real-money, execution, protection guarantee, performance, financial approval, rebalancing, or allocation-management authority was introduced.
- Interface completion does not establish participant comprehension, Evidence Register acceptance, Class B feasibility, MVP completion, or production readiness.

final result: passed

---

# HEDGR-UI-002 Design QA and Change Log (prior nested pass)

## Comparison target

- Current repo baseline:
  - `/Users/musalwa/.codex/visualizations/2026/07/17/019f6f5e-91ec-7970-a198-65f7f16c5ed3/hedgr-dashboard-after-desktop-fold.png`
  - `/Users/musalwa/.codex/visualizations/2026/07/17/019f6f5e-91ec-7970-a198-65f7f16c5ed3/hedgr-dashboard-after-mobile-fold.png`
- Governing Paper references:
  - Row 08 Dominant + Supporting export: `/Users/musalwa/.codex/visualizations/2026/07/18/019f74a9-49d6-7281-9d50-fcd8d8442068/hedgr-ui-002/paper-row-08-dominant-supporting.png`
  - Row 11 Source-lock Summary: `/Users/musalwa/.codex/visualizations/2026/07/17/019f6f5e-91ec-7970-a198-65f7f16c5ed3/paper-row-11-source-lock.png`
  - Row 10 Primary Stability Edge was inspected in the Paper board as presentation guidance; its governing treatment is restated by the exported Row 11 source lock. Paper remained presentation-only and supplied no token, state, execution, or product authority.
- Approved tokens and brand sources:
  - `DESIGN.md`
  - `docs/brand/HEDGR_UI_APPLICATION_RULES.md`
  - Brand Guidelines primary colours, secondary shades, contrast, and typography sections reviewed from `/Users/musalwa/Desktop/BUSINESS/HEDGR/Branding/Brand Guidelines.pdf`
- Proposed treatment: dominant Stable balance surface; supporting Conservative yield and Reserve lanes; restrained Stable-balance-only left edge; value-led labels with percentages explicitly subordinate as informational target shares; concise Review Snapshot orientation; secondary fixture and trust detail behind native disclosure controls.
- Rendered implementation: `http://localhost:3000/dashboard?journey=class-a-val-002`
- Final implementation screenshots:
  - `/Users/musalwa/.codex/visualizations/2026/07/18/019f74a9-49d6-7281-9d50-fcd8d8442068/hedgr-ui-002/final-dashboard-desktop-1280x900.png`
  - `/Users/musalwa/.codex/visualizations/2026/07/18/019f74a9-49d6-7281-9d50-fcd8d8442068/hedgr-ui-002/final-dashboard-mobile-390x844.png`
  - `/Users/musalwa/.codex/visualizations/2026/07/18/019f74a9-49d6-7281-9d50-fcd8d8442068/hedgr-ui-002/final-dashboard-mobile-390x844-grayscale.png`
- Combined source and implementation comparison:
  - `/Users/musalwa/.codex/visualizations/2026/07/18/019f74a9-49d6-7281-9d50-fcd8d8442068/hedgr-ui-002/paper-sources-vs-final-dashboard-desktop.png`

## Viewport and state

- Mobile viewport: 390 × 844; document width: 390; no page-level horizontal overflow.
- Desktop viewport: 1280 × 900; document width: 1280; no page-level horizontal overflow.
- Route state: `CLASS-A-VAL-002` synthetic journey, mock authentication, stub / fixed financial surfaces, zero-balance first-time state, normal Stability Engine posture.
- Theme: governed Hedgr light surface using the existing Plus Jakarta Sans-led stack and approved navy / lavender / white tokens.

## Full-view comparison evidence

The combined comparison places the exported Paper source lock and Dominant + Supporting reference beside the final rendered Dashboard. The implementation preserves the governed relationships while retaining repo semantics that the exploratory Paper money amounts could not authorize:

- Stable balance is the immediate dominant holding surface.
- Conservative yield and Reserve remain smaller, quieter supporting lanes.
- Percentages remain present only as explicitly labelled informational target shares; no derived lane balance, allocation, or proof-of-movement amount was introduced.
- Only Stable balance owns the restrained left edge. The edge remains lower emphasis than the lane label, target-share label, and explanatory copy.
- No chart, axis, progress rail, allocation bar, performance chart, gradient, alert treatment, safety badge, or rebalancing control appears.
- Current simulation status and total balance form the first product surface, followed by one dominant participant action, Stability structure, Review Snapshot, education, and important disclosures.

## Focused region comparison evidence

- The Stability structure was inspected at desktop and mobile scale and in grayscale. Stable balance remains distinguishable by heading, role label, size, position, dark surface, and its restrained edge; supporting-lane meaning does not depend on colour.
- Review Snapshot was inspected separately at desktop and mobile scale. Current simulation status, fixture target date, and last viewed locally are explicit labels; the original fixture timestamp, fingerprint, and browser-local memory behavior remain intact.
- The simulation boundary remains continuously visible. `Auth: mock`, `DeFi: mock`, `FX: fixed`, market selection, and the existing trust link remain accessible under the native `How this simulation works` disclosure.
- No image, logo, illustration, icon asset, generated artwork, decorative CSS art, or replacement brand asset was introduced.

## Change log

### Hierarchy changes

- Grouped current status and total balance into one top overview surface without changing either value or posture meaning.
- Kept the first-time synthetic deposit control as the single dominant journey action.
- Preserved the order Stability structure → Review Snapshot → education → important disclosures.
- Preserved Dashboard → Deposit → Withdraw → Activity and the shared synthetic journey shell.

### Spacing changes

- Reduced top-level mobile padding and used a 24 px primary section rhythm with the existing wider desktop rhythm.
- Tightened the shared journey shell and improved status / balance separation, card padding, and supporting-lane stacking.
- Preserved readable paragraph widths and eliminated page-level overflow at 390 px and 1280 px.

### Tonal or semantic differentiation

- Replaced generic navigation blue / grey presentation in the shared shell with approved Hedgr token classes.
- Used `hedgr-primary`, `hedgr-800`, `hedgr-600`, `hedgr-500`, `hedgr-300`, `hedgr-200`, `hedgr-100`, white, and dark only.
- Kept colour secondary to labels, copy, size, position, border, and spacing. No new `semanticStatus` alias, hue, palette value, or state meaning was added.

### Progressive disclosure

- Consolidated technical fixture labels and the market selector under `How this simulation works` while keeping `Simulation Mode — No Real Money` and the existing local-fixture / no-settlement statement continuously visible.
- Kept the longer target / ledger / movement explanation under `Why targets are not balances` while preserving the full pre-existing meaning in the DOM and disclosure surface.
- Preserved native closed controls for Review details, protection, structure explanation, and important disclosures.

### Content ordering

- Review Snapshot remains directly after Stability structure and before educational content.
- The concise informational-target boundary remains directly adjacent to the Stability structure.

### Disclosure placement

- Technical fixture details moved within the persistent simulation banner, not away from it.
- Detailed target meaning remains inside the Stability structure; institutional and risk disclosure remains in the existing important-disclosures surface.

### Visual-only copy wrapping or compression

- Added interface labels `Primary journey action`, `Target share`, `Orientation`, `Current simulation status`, `Fixture target date`, and `Last viewed locally` to clarify existing meaning.
- No fixture value, fixture date, posture label, target percentage, state copy constant, withdrawal meaning, settlement meaning, protection claim, or trust disclaimer was removed or materially rewritten.

### Substantive copy proposals

- None implemented. The participant protocol was extended with research questions for the approved presentation, but it creates no product claim or comprehension result.

## Complete journey evidence

- Deposit preview: `/Users/musalwa/.codex/visualizations/2026/07/18/019f74a9-49d6-7281-9d50-fcd8d8442068/hedgr-ui-002/journey-01-deposit-preview-desktop.png`
- Deposit result: `/Users/musalwa/.codex/visualizations/2026/07/18/019f74a9-49d6-7281-9d50-fcd8d8442068/hedgr-ui-002/journey-02-deposit-result-desktop.png`
- Withdrawal result: `/Users/musalwa/.codex/visualizations/2026/07/18/019f74a9-49d6-7281-9d50-fcd8d8442068/hedgr-ui-002/journey-03-withdraw-result-desktop.png`
- Activity reconciliation: `/Users/musalwa/.codex/visualizations/2026/07/18/019f74a9-49d6-7281-9d50-fcd8d8442068/hedgr-ui-002/journey-04-activity-desktop.png`
- Dashboard return at `$3.00`: `/Users/musalwa/.codex/visualizations/2026/07/18/019f74a9-49d6-7281-9d50-fcd8d8442068/hedgr-ui-002/journey-05-dashboard-return-desktop.png`

All captures use synthetic fixtures only. Deposit and withdrawal results retain the existing no-charge / no-payout / no-settlement language; Activity retains local-fixture-only framing.

## Accessibility and contrast review

- Native `details` / `summary`, `dl` / `dt` / `dd`, landmarks, headings, route links, role-based controls, and existing focus rings remain in use.
- Mobile and desktop retain readable labels and structure with no colour dependency; the grayscale capture preserves the full reading path, primary CTA, dominant / supporting hierarchy, and disclosure affordances.
- Calculated contrast ratios for the refined content pairs:
  - white on `#1F2747`: 14.59:1
  - white on `#171D35`: 16.62:1
  - `#1F2937` on white: 14.68:1
  - `#1F2747` on `#CAD0E8`: 9.52:1
  - `#4658A0` on white: 6.64:1
  - `#36447C` on white: 9.23:1
  - `#CAD0E8` on `#171D35`: 10.84:1
  - `#A6B0D8` on `#171D35`: 7.77:1
- These text pairs meet WCAG AA for their rendered sizes. Borders and the Primary Stability Edge are supplementary cues, not the sole carrier of information.

## Validation evidence

- Targeted Dashboard / allocation / Review Snapshot / posture unit tests: **31/31 passed**.
- Full repository unit command: **passed**; Bridge snapshot tests **10/10**, Bridge Worker tests **20/20**, frontend tests **736/736**.
- Workspace lint: **passed**.
- Trust mode and banned-phrase checks: **passed**.
- Bridge snapshot freshness check: **blocked by unrelated pre-existing review-index staleness**; the latest weekly review is `2026-07-17-weekly-review.md`, while the generated snapshots still point to `2026-07-10-weekly-review.md`. The snapshots were not refreshed because that governance artifact mutation is outside `HEDGR-UI-002` scope.
- Relevant Playwright journey tests: **3/3 passed**, including complete traversal, unavailable-data trust scenario, and mobile boundary / navigation.
- Workspace typecheck: **blocked by the unchanged React `Suspense` TS2786 errors in `apps/frontend/app/(app)/deposit/page.tsx:406` and `apps/frontend/app/(app)/withdraw/page.tsx:500`**. No error was reported in a `HEDGR-UI-002` file.
- Screenshot runner recorded two generic resource failures caused by the deliberate deny-by-default `/v1/fx/latest` abort / absent local stub backend and normal cancelled navigation RSC requests. No application JavaScript exception was observed; the fixed FX fixture rendered and the hermetic Playwright journey passed.
- `git diff --check` and final scoped validation are required again after status closeout reconciliation.

## Comparison history

- Pass 1 found an invalid `hedgr-base` class alias in the first implementation draft. It caused the active journey step and primary CTA background to disappear. The draft was corrected to the approved existing `hedgr-primary` token before acceptance.
- Pass 2 confirmed the CTA, active step, Stable-balance edge, target-share labels, Review Snapshot orientation, desktop layout, mobile layout, and grayscale reading path. No remaining P0, P1, or P2 visual mismatch was found.

## No-live-authority confirmation

- No file under `apps/frontend/lib/engine/**`, backend, ledger, fixture, provider, banking, custody, rail, FX, settlement, payout, routing, or runtime-state logic was changed.
- No real-money, execution, protection guarantee, performance, financial approval, rebalancing, or allocation-management authority was introduced.
- Interface completion does not establish participant comprehension, Evidence Register acceptance, Class B feasibility, MVP completion, or production readiness.

final result: passed
