# Hedgr platform-boundary register

**Ticket:** `MOBILE-NATIVE-READINESS-001`  
**Authority:** Internal D-122 / §254  
**Status:** Characterization only; no extraction or architecture adoption  
**Evidence baseline:** `0a8cef43b7971110b680c5213f5bed5f8d0ae2b7`

## Classification model

| Class | Meaning |
| --- | --- |
| Portable product truth | Deterministic meaning or data shape with no required UI, browser, route, or device implementation |
| Mixed / extraction candidate | Useful semantics are present, but imports or outputs include platform mechanics or presentation |
| Web adapter | Browser, Next.js, network, storage, environment, or web-SDK implementation |
| Web presentation | React DOM, route, CSS, Tailwind, or web accessibility implementation |
| Future native adapter | A required native-side boundary that does not exist yet |

“Portable” means a candidate for separately governed reuse. It does not mean “move now,” “already stable,” or “safe to publish as a package.”

## Current boundary register

| Current path | Classification | Product truth to preserve | Platform coupling / action before reuse |
| --- | --- | --- | --- |
| `apps/frontend/lib/engine/types.ts` | Portable product truth | `EnginePosture`, `EngineNotice`, read-only `EngineState` shape | Characterize schema evolution and serialization before sharing |
| `apps/frontend/lib/engine/mock.ts` | Portable product truth | Deterministic posture targets and fixed timestamp | It imports notice copy; decide later whether fixtures or runtime mocks own human text |
| `apps/frontend/lib/engine/notices.ts` | Mixed / extraction candidate | Notice association by posture | Customer-facing text requires product governance and may render differently by platform |
| `apps/frontend/lib/tx/types.ts` | Portable product truth | Six-value public transaction enum and lifecycle data shape | Version the contract before any cross-client use |
| `apps/frontend/lib/state/balance.ts` | Mixed / extraction candidate | Deterministic ledger-to-balance rules and USD rounding | Pure calculation imports `Tx` from a client-persisted Zustand ledger module and calls `Date.now()` |
| `apps/frontend/lib/tx/status-mapper.ts` | Mixed / extraction candidate | Ledger / internal status to public status semantics | Also owns Tailwind tone classes and imports the web ledger type; split semantics from presentation later |
| `apps/frontend/lib/policy/schema.ts` | Portable product truth | Validated policy data shape | Confirm dependency and bundle strategy for any future shared runtime |
| `apps/frontend/lib/policy/defaults.ts` | Portable product truth | Deny-by-default baseline policy values | Preserve current informational and no-live-capability meaning |
| `apps/frontend/lib/policy/overlays.ts` | Portable product truth | Market overlay data | Keep jurisdiction and market authority separately governed |
| `apps/frontend/lib/policy/resolve.ts` | Mixed / extraction candidate | Deterministic resolution order | Reads process environment; future consumers need injected configuration |
| `apps/frontend/lib/utils/money.ts` | Mixed / extraction candidate | USD and explicit ISO-code formatting intent | Verify `Intl` locale output on supported devices; keep visual text outside arithmetic truth |
| `apps/frontend/lib/state/synthetic-journey.ts` | Web adapter | Explicitly synthetic route intent and deny-live guard | Uses `process.env`, pathname, query parameters, `URLSearchParams`, and Next route conventions |
| `apps/frontend/lib/state/ledger.ts` | Web adapter | Ledger transaction shape, schema version, immutable-field policy | Zustand and `window.localStorage` own persistence; split contract, repository, and storage later |
| `apps/frontend/lib/state/wallet.ts` | Web adapter | Bounded local simulation balance behavior | Zustand / localStorage implementation; wallet state is not accounting or customer-money truth |
| `apps/frontend/lib/state/user.ts` | Web adapter | Minimal session shape | Browser persistence is not a native credential or secure-session design |
| `apps/frontend/config/market.ts` | Web adapter | Market-to-currency configuration | Reads browser storage and emits browser events; market authority remains governed |
| `apps/frontend/config/env.ts` | Web adapter | Fail-closed environment modes | Next public environment contract is not a native configuration channel |
| `apps/frontend/lib/fx/client.ts` | Web adapter | Latest-rate response boundary | Browser fetch, same-origin route, abort / retry, and trust behavior need platform adapters |
| `apps/frontend/lib/deposits/client.ts` | Web adapter | Simulated deposit request / response boundary | Same-origin fetch and current no-real-money contract; no native rail is authorized |
| `apps/frontend/lib/auth/magic.client.ts` | Web adapter | Login intent | Web SDK and token handling do not define native deep-link, secure-storage, or lifecycle behavior |
| `apps/frontend/lib/analytics.ts` | Web adapter | Redaction and dev-only telemetry posture | Browser globals and web SDKs; native consent and identity rules need separate review |
| `apps/frontend/lib/engine/useEngineState.ts` | Web adapter | Access to read-only engine state | React hook lifecycle is presentation-platform specific |
| `apps/frontend/lib/hooks/**` | Web adapter | Loading, retry, and state exposure semantics | React web hooks and browser fetch lifecycle |
| `apps/frontend/app/**` | Web presentation | Current product hierarchy, routes, disclosures, and accessibility meaning | Next.js App Router, server/client component boundaries, DOM, and Tailwind |
| `apps/frontend/pages/**` | Web presentation | Retained login and API compatibility behavior | Next.js Pages Router and server API execution |
| `apps/frontend/components/**` | Web presentation | Current component semantics and trust disclosure order | React DOM, HTML roles, Tailwind, and web interaction primitives |
| `packages/ui/**` | Web presentation | Reusable web component patterns | `react-dom` peer dependency; not a native component library |
| `apps/frontend/styles/globals.css` | Web presentation | Current visual variables, typography, spacing, and responsive rules | CSS / DOM representation; no platform-neutral token artifact exists |
| `apps/frontend/tests-e2e/**` | Web verification adapter | User-visible web journey and disclosure expectations | Playwright / DOM selectors; future native automation requires its own harness |
| `apps/mobile/**` | Future native adapter | None currently implemented | Path does not exist; creation requires separate authority |

## Proposed future ownership seams

The following are decision inputs, not authorized package names or work:

| Proposed seam | Owns | Must not own |
| --- | --- | --- |
| Product contracts | Versioned engine, transaction, policy, and money data shapes | Browser globals, navigation, React components, native SDKs |
| Product core | Pure calculations, status semantics, invariant validation, deterministic fixtures | Storage, network, analytics, UI tone, framework lifecycle |
| Platform adapters | Storage, transport, auth, analytics, deep links, lifecycle, secure secrets | Product meaning or financial-policy decisions |
| Design tokens | Platform-neutral color, typography, spacing, motion, and accessibility tokens | DOM classes or native view code |
| Web application | Next.js routes, DOM presentation, browser adapters | Native lifecycle and device integrations |
| Future native application | Native navigation, presentation, accessibility, and native adapters | Independent forks of product contracts or trust meaning |

## Boundary rules for any later ticket

1. Shared modules must not import React DOM, Next.js, `window`, `document`, browser `Storage`, route objects, Tailwind classes, or native SDKs.
2. Time, environment, locale, storage, transport, analytics, and identity must enter through explicit inputs or adapters.
3. Public transaction states, balance rules, and `EngineState` remain versioned and fixture-backed.
4. Product copy and disclosure order remain governed product surfaces; sharing code cannot bypass narrative authority.
5. Native secure storage is not a drop-in replacement for current `localStorage`; its threat model and lifecycle require separate review.
6. No platform client may create a second ledger, balance source of truth, engine ontology, or policy interpretation.
7. Hermetic defaults remain mandatory. Shared tests must not require live providers or external services.
8. A platform adapter may fail closed, but it may not invent data, capability, or certainty when a contract is unavailable.

## Dependency direction target

If later authorized, dependency direction should be one-way:

```text
product contracts <- product core <- platform application
                                   <- web adapters
                                   <- future native adapters
```

Web and native applications may depend on the same product core. They must not depend on one another, and product core must not depend on either platform.

## Stop conditions

Stop and seek separate authority if a boundary change requires a new dependency, runtime file movement, contract revision, customer-facing copy change, framework selection, native project creation, auth or secure-storage decision, live network integration, financial capability, or a Lane V / Lane E change.

`NO CROSS-LANE IMPACT`.
