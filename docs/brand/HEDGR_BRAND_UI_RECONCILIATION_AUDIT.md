# Hedgr Brand UI Reconciliation Audit

Status: Canonical Brand System Governance audit artifact
Ticket: `BRAND-006`
Classification: Audit-first governance reconciliation only
Authority: `DESIGN.md`, `assets/brand/README.md`, `docs/brand/**`, and Brand Guidelines PDF when present in governed repo assets or attached review materials

## 1. Audit Posture

This audit reconciles the existing frontend implementation against the governed Brand System. It is an inventory and governance analysis artifact, not a redesign, runtime migration, or broad refactor approval.

`DESIGN.md` remains the machine-readable brand authority. `assets/brand/README.md` remains the governed asset inventory and usage reference. Missing governed assets must be logged as missing inputs and must not be regenerated, approximated, substituted, or synthesized.

## 2. Files Inspected

Primary theme and global styling surfaces:

- `tailwind.config.js`
- `apps/frontend/styles/globals.css`
- `apps/frontend/pages/_app.tsx`
- `apps/frontend/pages/index.tsx`
- `apps/frontend/pages/login.tsx`

Shipped application shell and product surfaces:

- `apps/frontend/app/(app)/layout.client.tsx`
- `apps/frontend/app/(app)/dashboard/page.tsx`
- `apps/frontend/app/(app)/dashboard/EnginePostureHeader.tsx`
- `apps/frontend/app/(app)/dashboard/EngineAllocationBands.tsx`
- `apps/frontend/app/(app)/dashboard/EngineProtectiveGuidance.tsx`
- `apps/frontend/app/(app)/dashboard/EngineStabilityExplainer.tsx`
- `apps/frontend/app/(app)/dashboard/EngineStabilityReviewSnapshot.tsx`
- `apps/frontend/app/(app)/activity/page.tsx`
- `apps/frontend/app/(app)/deposit/page.tsx`
- `apps/frontend/app/(app)/withdraw/page.tsx`
- `apps/frontend/app/(app)/settings/page.tsx`
- `apps/frontend/app/(app)/settings/trust/page.tsx`
- `apps/frontend/app/(app)/chat/page.tsx`

Shared UI, transaction, and disclosure surfaces:

- `packages/ui/src/Banner.tsx`
- `packages/ui/src/EmptyState.tsx`
- `packages/ui/src/ErrorState.tsx`
- `packages/ui/src/DarkModeToggle.tsx`
- `apps/frontend/components/BalanceWithLocalEstimate.tsx`
- `apps/frontend/components/DevSecretsToast.tsx`
- `apps/frontend/src/components/DevSecretsToast.tsx`
- `apps/frontend/components/FxRateBlock.tsx`
- `apps/frontend/components/MarketDataContinuityPanel.tsx`
- `apps/frontend/components/PolicyDisclosure.tsx`
- `apps/frontend/components/TrustDisclosureBanner.tsx`
- `apps/frontend/components/TxDetailModal.tsx`
- `apps/frontend/components/TxReviewSimulatorBanner.tsx`
- `apps/frontend/components/TxStatusPill.tsx`
- `apps/frontend/lib/tx/status-mapper.ts`

Prototype / non-primary shipped reference surface:

- `apps/frontend/app/prototype/retail-dashboard/RetailDashboardPrototype.tsx`

Generated outputs and build artifacts such as `.next/`, `playwright-report/`, and package build outputs were excluded from governance findings.

## 3. Severity Model

- **High:** visible brand or trust posture drift on shipped surfaces that should block further similar expansion until governed remediation is sequenced.
- **Medium:** shipped or shared implementation drift that is reviewable and should be corrected through future scoped tickets.
- **Low:** contained, prototype-only, legacy, or informational drift that should be tracked but does not require immediate remediation.

## 4. Findings

| ID | Severity | Area | Finding | Governance impact | Recommended disposition |
| --- | --- | --- | --- | --- | --- |
| F-001 | Medium | Token governance | Governed `hedgr-*` tokens are wired in `tailwind.config.js` and `apps/frontend/styles/globals.css`, but many shipped surfaces still use raw Tailwind palettes such as `blue`, `gray`, `slate`, `amber`, `emerald`, `red`, and `purple`. | Brand-facing UI can continue to drift because implementation uses generic color utilities instead of governed token references. | Create a scoped token-normalization ticket for shipped app shell, action, status, and trust surfaces. |
| F-002 | Medium | Semantic status color | Transaction, market-data, warning, and review surfaces use dispersed semantic palettes in `apps/frontend/lib/tx/status-mapper.ts`, `apps/frontend/components/TxDetailModal.tsx`, `apps/frontend/components/MarketDataContinuityPanel.tsx`, `apps/frontend/components/TrustDisclosureBanner.tsx`, and related pages. | Status colors may be functionally useful, but they are not yet normalized under a governed semantic token layer subordinate to `DESIGN.md`. | Define approved semantic status tokens before broad migration. |
| F-003 | Medium | Gradients, shadows, blur, and motion | Shipped or shared surfaces include `bg-gradient-*`, `shadow-*`, `backdrop-blur-sm`, `animate-ping`, and `animate-bounce` patterns. Examples include `TrustDisclosureBanner`, `TxDetailModal`, `DevSecretsToast`, chat typing dots, and shared UI state components. | Some treatments may be operational or legacy, but they require governance review because brand rules prohibit speculative visual systems, glow-like emphasis, and dopamine-oriented presentation. | Audit each treatment by purpose, retain only calm functional affordances, and replace decorative emphasis through scoped remediation. |
| F-004 | Medium | Shared UI token drift | `packages/ui/src/Banner.tsx` references `from-hedgr-start`, `via-hedgr-middle`, and `to-hedgr-end`, which do not match the governed `hedgr-*` token map introduced by `BRAND-003`. | Shared UI contains stale token names and a gradient pattern inconsistent with governed brand constraints. | Retire or normalize the shared banner styling in a scoped shared-UI cleanup ticket. |
| F-005 | Medium | Typography | The approved sans stack is represented globally, but `apps/frontend/pages/_app.tsx` still imports `Inter` and defines `--font-inter` while no equivalent governed Plus Jakarta Sans loading path is present. | Typography authority is partly represented but not fully reconciled. The current setup can confuse future implementation about the approved primary stack. | Create a typography normalization ticket to clarify loading, fallback, and unused font paths. |
| F-006 | Low | Spacing, radius, and type scale | Components use varied radii, spacing, `tracking-*`, `uppercase`, `text-[...]`, and `tabular-nums` patterns across shipped and prototype surfaces. | These patterns are not automatically brand violations, but they are not yet governed by a documented UI scale beyond the current theme token integration. | Defer until token and semantic color cleanup are complete; then inventory repeated scale decisions. |
| F-007 | Low | Asset governance | No governed brand logo or icon usage was identified in the inspected frontend source. No misuse of governed logo files was observed, but positive compliance cannot be validated while approved assets remain absent from the governed inventory. | Missing assets remain governance inputs, not implementation permission to generate substitutes. | Keep missing assets logged through `assets/brand/README.md`; require future UI asset usage to source from `assets/brand/`. |
| F-008 | Medium | Accessibility | Several semantic color combinations and translucent treatments appear in status, warning, and prototype surfaces without a dedicated WCAG AA contrast record. | Calm trust posture depends on readability and sufficient contrast, especially for warnings, transaction states, and disclosure banners. | Pair semantic token work with contrast review before visual migration. |
| F-009 | Low | Prototype containment | `apps/frontend/app/prototype/retail-dashboard/RetailDashboardPrototype.tsx` contains strong dark, violet, indigo, gradient, ring, and shadow treatments. | The surface is prototype-route scoped, but its styling must not be treated as approved brand direction for shipped UI. | Keep prototype styling contained unless future governance explicitly approves a brand-aligned extraction. |
| F-010 | Low | Legacy duplicate styling | `apps/frontend/components/DevSecretsToast.tsx` and `apps/frontend/src/components/DevSecretsToast.tsx` contain similar `bg-black/80`, rounded, and shadow styling. | Duplicate implementation can preserve legacy styling in multiple places and complicate future governance cleanup. | Reconcile duplicate toast surfaces during a future scoped cleanup, with no change to behavior unless separately approved. |

## 5. Token Governance Observations

The governed token set is present in the active theme architecture:

- `hedgr-primary`
- `hedgr-dark`
- `hedgr-white`
- `hedgr-800`
- `hedgr-700`
- `hedgr-600`
- `hedgr-500`
- `hedgr-400`
- `hedgr-300`
- `hedgr-200`
- `hedgr-100`

Direct hex usage was not found broadly in frontend source outside the governed theme definitions. The dominant drift pattern is direct Tailwind palette usage rather than direct hex literals.

The largest remediation risk is not token availability. It is migration discipline: shipped surfaces should not be mass-converted until semantic status colors, trust-warning colors, focus rings, disabled states, and accessibility contrast rules are explicitly mapped.

## 6. Typography Observations

The global CSS now represents the approved sans stack:

- Plus Jakarta Sans
- Inter
- Geist
- Helvetica-style sans fallback

Remaining typography drift is primarily structural:

- `apps/frontend/pages/_app.tsx` still defines an Inter font variable path that appears stale or unused.
- Headings, labels, uppercase treatments, tracking, and arbitrary text sizes vary by surface.
- Prototype-route typography is visually distinct and should remain non-authoritative.

No decorative or speculative font family was identified in the inspected source.

## 7. Asset Governance Observations

No shipped frontend source was found using governed logo assets from `assets/brand/`. That means:

- no active governed-logo transformation misuse was identified;
- no dark / light logo variant selection could be validated in runtime UI;
- future brand-facing asset usage must source only from the governed inventory;
- missing governed assets remain missing inputs and must not be regenerated.

## 8. UX Doctrine Observations

The shipped Stability Engine dashboard surfaces generally preserve Hedgr's calm, institutional, trust-first posture through restrained copy, read-only framing, and disclosure-oriented layout. However, the visual implementation still carries pre-governance styling choices:

- generic Tailwind blues for actions and focus;
- amber / orange gradients for disclosure emphasis;
- modal shadows and blur treatments;
- animated attention indicators;
- prototype-only dark / violet visual treatments.

These should be treated as reconciliation targets, not as approval to redesign. The remediation path should preserve current information architecture and runtime behavior.

## 9. Accessibility Observations

The audit did not perform automated contrast measurement. Review should focus on:

- translucent amber / orange disclosure banners;
- status pills and transaction-step colors;
- disabled and secondary text in gray / slate palettes;
- dark prototype surfaces if any design language is later promoted from prototype to shipped UI;
- hover and focus states after token normalization.

WCAG AA consideration should be recorded on future brand-facing implementation PRs through the Brand Governance QA checklist.

## 10. Recommended Remediation Sequencing

Recommended follow-up tickets, if governance chooses to sequence remediation:

1. `BRAND-006-FU-001` — Define governed semantic status tokens for info, success, warning, error, neutral, focus, disabled, and trust-disclosure states, subordinate to `DESIGN.md`.
2. `BRAND-006-FU-002` — Normalize shared UI package styling, especially `packages/ui/src/Banner.tsx`, `EmptyState.tsx`, `ErrorState.tsx`, and `DarkModeToggle.tsx`.
3. `BRAND-006-FU-003` — Reconcile shipped app shell, navigation, primary actions, and form focus states to governed tokens without layout changes.
4. `BRAND-006-FU-004` — Review shadows, blur, gradients, and motion treatments; retain only functional, calm, governance-approved affordances.
5. `BRAND-006-FU-005` — Normalize typography loading and usage so the approved stack is unambiguous and stale font paths are removed.
6. `BRAND-006-FU-006` — Preserve prototype-route containment and prevent prototype visual treatments from becoming shipped brand precedent without governance approval.

These follow-ups are recommendations only. They do not authorize implementation unless named by `docs/ops/HEDGR_STATUS.md` §7 with a bounded §7a brief.

## 11. Non-Authorization

This audit does not authorize:

- broad UI redesign;
- layout restructuring;
- runtime behavior changes;
- backend coupling;
- theme-system expansion;
- generated assets;
- logo or icon reinterpretation;
- non-token palette expansion;
- gradients, glows, or speculative visual systems;
- changes to `DESIGN.md` token values;
- ADR status changes;
- successor implementation work.

Any remediation must be separately governed, incremental, reversible, and subordinate to `DESIGN.md`, `assets/brand/README.md`, `docs/brand/**`, AGENTS.md, and `docs/ops/HEDGR_STATUS.md` §7 / §7a.
