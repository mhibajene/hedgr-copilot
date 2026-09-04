# Hedgr native-readiness baseline

**Ticket:** `MOBILE-NATIVE-READINESS-001`  
**Authority:** Internal D-122 / §254  
**Evidence date:** 2026-09-04  
**Repository baseline:** `0a8cef43b7971110b680c5213f5bed5f8d0ae2b7`  
**Classification:** Internal, Class A, execution-neutral characterization

## Baseline statement

Hedgr currently ships a mobile-first Next.js web application. It is not, in the repository state characterized here, an installable Progressive Web App or a native mobile application.

Responsive behavior and a mobile-first product posture do not by themselves establish PWA capability. The tracked frontend has no web-app manifest, service-worker registration, offline cache policy, install prompt, push-notification implementation, native project, native build configuration, or Expo / React Native / Capacitor dependency.

This is a readiness finding, not a criticism of the current delivery choice. The web application has supported rapid, reversible product convergence. The institutional task now is to preserve validated product meaning while making later platform decisions explicit and evidence-gated.

## Repository evidence

| Capability | Current evidence | Readiness meaning |
| --- | --- | --- |
| Application surface | `apps/frontend/package.json` declares Next.js 15, React 19, and `react-dom`; `apps/frontend/app/**` and `apps/frontend/pages/**` contain the shipped routes | One web application using both App Router and retained Pages Router surfaces |
| Mobile posture | Product doctrine and the canonical MVP specification require mobile-first delivery; responsive behavior is covered by Playwright checks | Mobile-first is a product requirement, not proof of PWA or native packaging |
| Installability | No tracked manifest in `apps/frontend/app/**` or `apps/frontend/public/**`; the root layout declares no manifest | No repository-backed installable-PWA claim |
| Offline behavior | No tracked service worker, Workbox configuration, service-worker registration, or offline cache policy | Network loss behavior is browser/default behavior, not an intentional offline contract |
| Native runtime | No `apps/mobile`, Xcode or Android project, Expo configuration, React Native dependency, or Capacitor configuration | No native client or native build pipeline exists |
| Navigation | Next.js routes, redirects, rewrites, pathname checks, query parameters, and `URLSearchParams` are used in `apps/frontend/next.config.mjs` and `apps/frontend/lib/state/synthetic-journey.ts` | Navigation semantics are web-adapter concerns until extracted behind platform-neutral intent |
| Local state | `apps/frontend/lib/state/ledger.ts`, `wallet.ts`, and `user.ts` use Zustand persistence backed by `window.localStorage`, with memory fallbacks for non-browser execution | Persisted state contracts and browser storage mechanics are currently coupled |
| Network access | `apps/frontend/lib/fx/client.ts`, `deposits/client.ts`, auth modules, and API routes use browser / Next.js network boundaries | Future native clients require explicit transport, retry, identity, and trust adapters |
| Product contracts | `apps/frontend/lib/engine/types.ts`, `engine/mock.ts`, `tx/types.ts`, and the pure calculation inside `state/balance.ts` expose deterministic TypeScript islands | These are candidates for shared contracts, but no extraction is authorized by this ticket |
| Transaction presentation | `apps/frontend/lib/tx/status-mapper.ts` combines public status mapping with Tailwind presentation classes and imports the web ledger type | Semantic mapping can be shared later; visual tone remains platform-specific |
| Policy | `apps/frontend/lib/policy/schema.ts` is declarative; `policy/resolve.ts` reads environment state | Policy data shape is more portable than its current resolution adapter |
| Money formatting | `apps/frontend/lib/utils/money.ts` uses `Intl.NumberFormat` | Likely cross-runtime, but locale and device parity still require characterization before reuse |
| Shared UI | `packages/ui` declares React and `react-dom` peer dependencies and exports DOM-oriented components | It is shared web UI, not a cross-platform design system |
| Visual tokens | `apps/frontend/styles/globals.css` and Tailwind utility strings hold current visual decisions | Tokens are not yet represented as platform-neutral data |
| Analytics | `apps/frontend/lib/analytics.ts` is browser-only, dev-only, and dynamically loads PostHog / Sentry | Identity, consent, redaction, and lifecycle behavior need a native-specific adapter before native telemetry |
| Verification | Vitest unit tests and hermetic Playwright E2E are established; CI denies live external dependencies | Existing web verification is strong; cross-platform contract and native lifecycle suites do not yet exist |

## Readiness assets already present

- A pnpm workspace with an existing `packages/**` boundary.
- Strict TypeScript and a hermetic test posture.
- Deterministic synthetic journey and transaction fixtures.
- A canonical public transaction-status enum.
- A small, read-only `EngineState` contract with deterministic mock states.
- A pure ledger-to-balance calculation that can be characterized independently of UI.
- Explicit mock / fixed / stub modes and deny-by-default live-service behavior.
- Product doctrine that separates familiar interaction from Hedgr-owned meaning and infrastructure abstraction.

These reduce future migration risk. They do not authorize code movement or prove that current modules are portable without adaptation.

## Principal readiness gaps

1. **No platform-neutral application boundary.** Routes and browser globals currently carry navigation, environment, persistence, and lifecycle concerns.
2. **Contract and adapter code are colocated.** Pure semantics often import web-owned types or presentation data.
3. **No platform-neutral design-token source.** CSS and Tailwind classes are the current implementation truth.
4. **No cross-platform identity contract.** Magic, session persistence, deep links, and secure credential storage need an explicit future design.
5. **No native operational capability.** Signing, store accounts, entitlements, release channels, crash reporting, privacy declarations, accessibility QA, and device support are not established.
6. **No evidenced native-only user requirement.** The current repository does not establish that app-store distribution, push, biometrics, secure storage, background work, or deep OS integration is required.
7. **Product-validation gate remains open.** Parent `CLASS-A-VAL-002` remains active and participant distribution remains paused pending live-Form verification. Technical native readiness cannot substitute for comprehension evidence.

## Institutional readiness rule

Hedgr should preserve product truth as platform-neutral contracts and keep platform mechanics in adapters. A later native client should reproduce the same meaning and trust boundaries, not translate web components line by line.

The sequence is:

1. characterize current contracts;
2. gather evidence for a platform capability need;
3. separately authorize the smallest boundary-hardening work;
4. separately select and record an architecture;
5. run a reversible spike against fixed parity fixtures;
6. widen only after trust, operations, accessibility, and lifecycle gates pass.

This ticket completes only step 1 and documents the gates for later steps.

## Non-claims

This baseline does not:

- select PWA, Capacitor, Expo / React Native, Swift, or Kotlin;
- authorize an `apps/mobile` workspace;
- authorize package extraction or runtime change;
- establish participant comprehension, product-market fit, native demand, or store readiness;
- change any Form, research, engine, accounting, ledger, auth, provider, custody, rail, settlement, recommendation, or customer-money boundary.

`NO CROSS-LANE IMPACT`.
