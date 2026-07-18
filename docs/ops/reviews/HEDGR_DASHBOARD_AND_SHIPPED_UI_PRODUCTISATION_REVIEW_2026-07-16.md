# HEDGR DASHBOARD AND SHIPPED UI PRODUCTISATION REVIEW — 2026-07-16

## 1. Status / Authority / Scope / Last updated

Status: Synthesizer review artifact only; descriptive evidence, not direction
Authority: Subordinate to `docs/ops/HEDGR_STATUS.md`, `AGENTS.md`, accepted ADRs, `DESIGN.md`, and repo-native doctrine
Scope: Current shipped synthetic UI at `/dashboard`, `/deposit`, `/withdraw`, `/activity`, `/settings`, and `/chat`, plus the shared desktop/mobile navigation and trust-disclosure shell
Last updated: 2026-07-16

This report does not name or activate a ticket, sequence work, approve implementation, consume the `CLASS-A-VAL-001` one-iteration budget, alter `HEDGR_STATUS.md` section 7 / 7a authority, accept evidence, clear a gate, or widen product or financial execution authority.

Repo-native posture at review time:

- `CLASS-A-VAL-001` is the sole active ticket under restored singular-ticket posture.
- Internal D-029, D-032, D-034, D-035, and D-036 are completed historical pass authorities and supply no standing concurrency.
- `BRIDGE-P0-001` is closed with `NO CROSS-LANE IMPACT`; Phase 1 remains inactive.
- The Class B convergence gate remains unsatisfied.
- Kenya counsel send remains `DEFER`.
- Green Lane classification does not independently activate product work.

---

## 2. Purpose

This report records a bounded review of the current Hedgr dashboard and adjacent shipped UI surfaces for Founder / HedgrOps consideration.

The review asks whether the present synthetic experience is sufficiently coherent, legible, and traversable to support the active Class A validation objective: determining whether target cross-border freelancers understand Hedgr's stability proposition and synthetic withdrawal journey well enough to justify a later one-market Class B feasibility cycle.

The report is evidence about the current interface. It is not user-research evidence, a product decision, an implementation brief, a brand redesign mandate, or readiness proof.

---

## 3. Governing inputs used

Repo authority and doctrine:

- `docs/ops/HEDGR_STATUS.md` — current sequencing authority, singular-ticket posture, `CLASS-A-VAL-001` scope, D-036 closeout, and non-authorization boundaries.
- `AGENTS.md` — role boundary, action control, execution discipline, engine-facing read order, brand-facing read order, and non-authoritative handoff rules.
- `.cursorrules` — doctrine and product/system anti-drift rules.
- `docs/decisions/0013-allocation-bands-informational-not-accounting.md` — allocation percentages are informational targets, not ledger truth or accounting state.
- `docs/decisions/0014-stability-engine-read-only-in-sprint-2.md` — Stability Engine output remains read-only and non-executing.
- `docs/decisions/0015-stability-engine-is-the-system-center.md` — Stability Engine remains the system center.

Brand and UI governance:

- `DESIGN.md` — machine-readable brand authority.
- `docs/brand/HEDGR_UI_APPLICATION_RULES.md` — calm, institutional, trust-first, functional, legible, governed-token, and WCAG expectations.
- `docs/brand/HEDGR_BRAND_UI_RECONCILIATION_AUDIT.md` — existing token, status-color, gradient, typography, shared-UI, and accessibility observations.

Shipped implementation surfaces:

- `apps/frontend/app/(app)/dashboard/**`
- `apps/frontend/app/(app)/deposit/page.tsx`
- `apps/frontend/app/(app)/withdraw/page.tsx`
- `apps/frontend/app/(app)/activity/page.tsx`
- `apps/frontend/app/(app)/settings/page.tsx`
- `apps/frontend/app/(app)/chat/page.tsx`
- `apps/frontend/app/(app)/layout.client.tsx`
- `apps/frontend/components/TrustDisclosureBanner.tsx`
- `packages/ui/src/EmptyState.tsx`

---

## 4. Method and evidence boundary

The review used the locally running frontend at `http://localhost:3000` under visibly synthetic mock/stub conditions.

Current-run evidence included:

- desktop screenshots and DOM snapshots for Dashboard, Deposit, Withdraw, Activity, Settings, and Copilot;
- a 390 x 844 responsive capture of Dashboard and the expanded mobile navigation;
- visible loading, market-data continuity, disabled-action, empty-state, and first-use states;
- semantic heading, landmark, label, and expanded-state observations from the rendered DOM;
- browser console inspection filtered to the local application origin;
- source inspection for the rendered route and shared-component behavior.

Screenshots were inspected during the review and retained only as transient local audit evidence under `/tmp/codex-hedgr-ui-report-2026-07-16/`; they are not committed assets and do not become repo authority.

Not assessed:

- funded-account or completed transaction states;
- the full `FE-TRUST-002` exception/support matrix;
- real participant comprehension;
- live providers, rails, custody, or customer-money behavior;
- screen-reader output;
- complete keyboard traversal;
- automated contrast measurement;
- 200% zoom and full responsive breakpoint coverage;
- production deployment behavior.

---

## 5. Route and component health summary

| Step | Surface           | Observed state                                                                 | General health            | Primary review meaning                                                                                   |
| ---- | ----------------- | ------------------------------------------------------------------------------ | ------------------------- | -------------------------------------------------------------------------------------------------------- |
| 1    | Dashboard         | Zero balance, `NORMAL` posture, first-deposit CTA, full allocation/trust stack | Mixed                     | Strong trust framing; product-home hierarchy remains dense and engine-explanatory                        |
| 2    | Deposit           | FX unavailable, amount `100`, retry available, Confirm disabled                | Trust-safe but blocked    | Fail-closed continuity is clear; first-use journey cannot currently progress                             |
| 3    | Withdraw          | No available funds, deposit CTA                                                | Weak                      | Correct dependency, but shared empty-state rendering and semantics are degraded                          |
| 4    | Activity          | No transactions, deposit CTA                                                   | Weak                      | Repeats the same blocked first-use dependency and shared empty-state defect                              |
| 5    | Settings          | Environment, mock modes, account/KYC placeholder, no preferences               | Internal/tooling-like     | Environment inspection dominates customer preference value                                               |
| 6    | Copilot           | Educational disclaimer, generic welcome, blank conversation                    | Underdefined              | Safety boundary is visible; capability framing is broad and product integration is sparse                |
| 7    | Mobile Dashboard  | Trust banner, hamburger, balance, posture, first-deposit CTA                   | At risk                   | Core content remains readable, but market/mode context disappears and the page becomes explanation-heavy |
| 8    | Mobile navigation | Expanded route list and active Dashboard state                                 | Adequate with polish debt | Accessible expanded state is present; visual treatment and page displacement remain unfinished           |

---

## 6. Findings

### F-UI-001 — The synthetic first-use loop is not continuously traversable

Severity: High
Area: Product-flow continuity

Observed evidence:

- Dashboard directs a zero-balance user to make a first deposit.
- Deposit displays `FX: fixed` in the shared shell while the route reports exchange-rate data unavailable.
- Deposit therefore disables Confirm and provides no conversion preview.
- Withdraw has no funds and redirects back to Deposit.
- Activity has no transactions and redirects back to Deposit.

Review meaning:

The individual states are conservative and fail closed, but together they prevent the current local experience from demonstrating the full synthetic path through balance, transaction, withdrawal, and activity states. This is a product-validation continuity gap, not evidence that live execution should be introduced.

Authority treatment:

This observation does not authorize a fixture, data-state change, backend change, runtime change, live rate, deposit behavior, or iteration. Any product response remains controlled by the active `CLASS-A-VAL-001` evidence and one-iteration rules.

### F-UI-002 — Dashboard hierarchy is stable but over-weighted toward explanation

Severity: Medium
Area: Information hierarchy and comprehension

Observed evidence:

- Balance and posture appear first and are visually calm.
- The first-use CTA is visible above the allocation panel.
- `Target posture`, trust legend, stable/conservative-yield/reserve lanes, protective guidance, review snapshot, recent readings, explainability, and disclosures form a long default stack.
- On mobile, the same explanatory material becomes a prolonged vertical reading task.

Review meaning:

The dashboard strongly protects engine meaning but currently behaves partly as an engine review surface rather than a concise customer home. The tension is between necessary trust disclosure and immediate product legibility; this report does not resolve that tension.

Doctrine alignment:

The content preserves capital-preservation, informational-allocation, read-only, no-gamification, and calm-over-urgency posture. Productisation pressure should not weaken those boundaries.

### F-UI-003 — Synthetic and live-sounding cues coexist

Severity: High
Area: Status language and trust

Observed evidence:

- The shell says `Simulation Mode — No Real Money`.
- Dashboard says `Make your first deposit`.
- Settings shows a mock email, `KYC Status: Not verified`, `pending`, and `Complete your profile to unlock all features`.
- Settings separately says mock authentication bypasses real identity verification.
- Copilot says `Ask me anything about savings and financial planning` while its disclaimer limits it to educational support and not financial advice.

Review meaning:

The simulation boundary is visible, but several actions and account states use language that resembles live product capability. The risk is interpretive ambiguity, especially during participant testing, rather than a claim that any live capability exists.

### F-UI-004 — Shared EmptyState presentation is visibly inconsistent with its implementation intent

Severity: Medium
Area: Shared UI and accessibility

Observed evidence:

- Withdraw and Activity render a wide pale capsule where `EmptyState` source defines a centered `h-16 w-16 rounded-full` icon container.
- The icon is extremely low contrast in both captures.
- Route pages contain an `h1`, while shared `EmptyState` hard-codes an `h3`, producing an `h1` to `h3` heading jump.
- The same shared component is also used in Settings and other frontend states.

Review meaning:

The runtime presentation does not match the component's apparent source-level intent, and the semantic heading level cannot adapt to page context. Because this is shared code, the visible issue is broader than one route.

Authority treatment:

The finding does not approve a package change. Existing brand review recommendations remain non-authorizing unless separately named under section 7 / 7a or evidenced inside the active bounded product slice.

### F-UI-005 — Settings is primarily an operator/debug surface

Severity: Medium
Area: Information architecture

Observed evidence:

- The global simulation banner is repeated by a second compact simulation disclosure.
- `App Environment`, `Authentication`, `DeFi Provider`, and `FX Rates` dominate the first visible section.
- The Account section uses placeholder identity and KYC states.
- Preferences contains no configurable preference.

Review meaning:

The route is useful for internal state inspection but has limited customer settings value in the captured state. It is ambiguous whether Settings is intended to remain a research/operator surface or become part of the customer product slice.

### F-UI-006 — Copilot safety is visible but capability framing is broad

Severity: Medium
Area: Copilot product boundary

Observed evidence:

- The educational / not-financial-advice disclaimer is prominent.
- The empty state says `Ask me anything about savings and financial planning`.
- No visible examples, supported-topic boundaries, product-context explanation, or starter tasks are present.
- The captured DOM exposes generic paragraphs and the message textbox but no page `main` landmark or visible `h1`.

Review meaning:

The route communicates a legal/safety limitation more clearly than its supported product role. The open-ended invitation may be interpreted more broadly than the current product evidence supports.

Authority treatment:

This review does not place Copilot inside the active validation slice, authorize Copilot behavior changes, or connect Copilot to financial action.

### F-UI-007 — Mobile removes useful context while retaining the longest explanations

Severity: Medium
Area: Responsive hierarchy

Observed evidence:

- The mobile shell retains the simulation title and description.
- Auth, DeFi, FX, and selected-market controls are hidden.
- ZMW remains visible in the balance.
- The allocation and review content remains fully expanded below the fold.
- The expanded menu pushes the page down and shows a strong close-button focus treatment.

Review meaning:

Mobile preserves safety language but removes the environment/market context that explains the local-currency display. The interface therefore keeps explanatory volume while dropping some explanatory context.

### F-UI-008 — Existing brand and accessibility debt remains visible

Severity: Medium
Area: Brand governance and accessibility

Observed evidence:

- The simulation shell uses an amber/orange gradient.
- The dashboard first-use card uses a blue-to-indigo gradient.
- Raw `blue`, `gray`, `slate`, `amber`, `emerald`, `orange`, and `red` utilities remain across shipped surfaces.
- Small muted text and translucent surfaces appear in trust, disclosure, status, and supporting-copy roles.
- No governed logo asset is visible in the captured shell.

Review meaning:

These observations confirm, rather than supersede, `docs/brand/HEDGR_BRAND_UI_RECONCILIATION_AUDIT.md`. They are reconciliation evidence, not approval for a broad visual redesign or token migration.

---

## 7. Strengths observed

- The simulation / no-real-money boundary is persistent and prominent across all captured routes.
- Allocation language repeatedly distinguishes targets from balances and movement.
- Deposit fails closed when conversion certainty is unavailable.
- Deposit explains what is unavailable, what it affects, what remains knowable, and why action is limited.
- Withdraw and Activity provide a clear path back to the first required action.
- Navigation is consistent across desktop routes.
- The mobile menu control exposes an accessible name and `aria-expanded` state.
- Copilot prominently states its educational and not-financial-advice boundary.
- No warnings or errors from the `localhost:3000` application origin were observed during the capture pass.

These strengths support Hedgr's calm, trust-first doctrine. They should not be read as evidence that the product loop, user demand, institutional MVP, or Class B feasibility gate is complete.

---

## 8. Accessibility observations

Confirmed from the rendered DOM:

- Main product routes expose page-level `h1` headings.
- The simulation disclosure uses an alert role.
- Deposit's market-data state exposes a named region and retry button.
- Inputs and mobile navigation controls have accessible names.
- The mobile navigation control reports expanded state.

Likely risks requiring dedicated verification:

- shared `EmptyState` heading-level jumps;
- low-contrast empty-state icons;
- small muted disclosure and supporting text;
- unmeasured contrast on translucent amber/orange, gray/slate, disabled, and status surfaces;
- absence of a captured `main` landmark and page heading in Copilot;
- long mobile reading order and cognitive load;
- keyboard focus order and focus visibility across the entire navigation and form flow;
- behavior at 200% zoom and additional responsive widths;
- screen-reader interpretation of posture, target percentages, and transaction states.

No WCAG compliance claim is made.

---

## 9. Status-language watchlist

| Term / phrase              | Location                                           | Why it may be risky                                          | Repo-authorized meaning                                                       | Review disposition                                             |
| -------------------------- | -------------------------------------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `Make your first deposit`  | Dashboard / Activity                               | Sounds like a live-money action beside `No Real Money`       | Synthetic first-use action only in the captured environment                   | Interpretation evidence needed; no copy change authorized here |
| `FX: fixed`                | Global trust banner                                | Appears inconsistent with Deposit reporting rate unavailable | Environment mode label, not proof that a usable route rate loaded             | Preserve inconsistency for Founder / HedgrOps review           |
| `NORMAL`                   | Dashboard                                          | May be read as a financial safety guarantee without context  | Informational Stability Engine posture only                                   | Existing supporting copy limits meaning; no guarantee inferred |
| `Available`                | Dashboard / Withdraw                               | Could imply spendability or payout readiness                 | Ledger/display state only where implemented; not provider or payout proof     | Keep authority boundary explicit                               |
| `Not verified` / `pending` | Settings                                           | Resembles a live KYC workflow                                | Placeholder synthetic account state in current source                         | Do not infer active identity-verification capability           |
| `unlock all features`      | Settings                                           | Implies implemented gated capability                         | Demo/profile-incomplete copy only; no feature-unlock proof                    | Preserve ambiguity; no capability claim accepted               |
| `Ask me anything`          | Copilot                                            | Broadens perceived advisory scope                            | Educational support only; not financial advice or execution                   | Capability boundary remains unresolved by this review          |
| `completed` / `confirmed`  | Transaction surfaces outside captured empty states | Could imply settlement or external finality                  | Bounded synthetic/local lifecycle status only unless stronger evidence exists | No live settlement meaning inferred                            |

---

## 10. What changed vs what did not change

| Area / workstream             | What changed in this review                                     | What did not change                                                                              | Authority widened? | Trust surface affected? | Evidence basis                             |
| ----------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ------------------ | ----------------------- | ------------------------------------------ |
| Dashboard / Stability Engine  | Current UI evidence and productisation tensions were documented | Engine state, posture meaning, allocation semantics, runtime behavior, and copy remain unchanged | No                 | Reviewed only           | Live local capture + source inspection     |
| Deposit / Withdraw / Activity | Current continuity and empty-state gaps were documented         | No transaction behavior, data state, rate source, balance, or lifecycle changed                  | No                 | Reviewed only           | Live local capture + source inspection     |
| Settings / Copilot            | Product-boundary ambiguity was documented                       | No profile, KYC, preference, Copilot, prompt, or runtime behavior changed                        | No                 | Reviewed only           | Live local capture + source inspection     |
| Shared UI / navigation        | Visible rendering and responsive issues were documented         | No package, shell, token, or navigation code changed                                             | No                 | Reviewed only           | Desktop/mobile capture + source inspection |
| Brand / UI semantics          | Existing audit findings were confirmed against current runtime  | No token, typography, asset, gradient, contrast, or theme migration occurred                     | No                 | Reviewed only           | Brand audit + runtime evidence             |
| Bridge / review support       | D-036 completion and Lane R closure were recorded as context    | No Bridge contract, ADR, runtime, Phase 1, or authority changed                                  | No                 | No cross-lane impact    | `HEDGR_STATUS.md` §§6f.6, 7, 7a, 141       |
| Customer-money movement       | None                                                            | No live money, provider, rail, custody, settlement, or payout capability was added or evidenced  | No                 | No                      | Repo authority + synthetic environment     |

---

## 11. Decision pressure

Label: **Founder decision required**

Bounded questions for governed review:

1. Should the active diagnostic cohort evaluate the current shipped zero-balance / blocked-deposit experience as the baseline, or is a separately approved visibly synthetic research state required before sessions can meaningfully traverse the authorized product slice?
2. Is the product-validation focus limited to proposition, dashboard, allocation, synthetic withdrawal, and exception/support, or are Settings and Copilot intended to be evaluated as part of the same customer product narrative?
3. If diagnostic evidence supports a presentation iteration, which single comprehension failure is important enough to use the one-iteration budget?

These questions do not select a solution, name a ticket, authorize a fixture, approve a redesign, or sequence work.

---

## 12. Risks / notes

- Visual review can identify hierarchy and consistency problems but cannot establish user comprehension or demand.
- The local Deposit failure may depend on the current local service state; the captured user experience remains valid evidence of the fail-closed route state, not proof of a production defect.
- The `EmptyState` runtime/source mismatch is visible, but this review does not determine its technical cause.
- Existing brand audit findings are reused as repo authority; this report does not create a competing brand system.
- Screenshots are supporting review evidence only and were intentionally not committed as governed assets.
- No app, package, test, CI, status, ADR, doctrine, Bridge, or runtime file was modified by this review.
- Existing unrelated working-tree changes remain outside scope and untouched.

---

## 13. Review verdict

The current Hedgr UI is **trust-forward and product-incomplete**.

The strongest part of the experience is its refusal to imply certainty or execution when data or authority is absent. The weakest part is continuity: the visible first action cannot currently carry a user through a complete synthetic product loop, while Dashboard, Settings, and Copilot expose more explanatory or operator-facing content than immediate customer utility.

This is a bounded product-learning finding. It does not establish what should be built, does not consume the authorized iteration, and does not support Class B progression by itself.

Founder / HedgrOps disposition remains required through the existing `CLASS-A-VAL-001` evidence and decision chain.
