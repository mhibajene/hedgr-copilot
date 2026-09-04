# Hedgr mobile-platform decision scorecard

**Ticket:** `MOBILE-NATIVE-READINESS-001`  
**Authority:** Internal D-122 / §254  
**Status:** Decision framework only; no platform route selected

## Purpose

This scorecard prevents delivery momentum from becoming architecture authority. It compares credible mobile routes through evidence gates and makes the cost of each choice visible. It must be completed from current evidence at the time of a separately authorized decision; this document does not approve a framework or implementation.

## Decision principles

- Preserve the validated product journey and trust meaning before preserving code.
- Choose the least complex platform route that satisfies evidenced user and institutional needs.
- Treat app-store presence, “native feel,” and stakeholder preference as hypotheses until tied to measurable outcomes.
- Keep live providers, custody, rails, settlement, financial execution, and customer money outside this decision unless separately authorized.
- Prefer reversible spikes and parity fixtures before package extraction or production commitment.
- Do not use native work to bypass the open participant-comprehension gate.

## Entry gates

A framework-selection decision should not begin until the decision owner can cite evidence for every required gate.

| Gate | Required evidence | Current D-122 state |
| --- | --- | --- |
| G0 — product meaning | The target journey and trust boundaries are stable enough to reproduce without redesign-by-platform | Not decided here; parent `CLASS-A-VAL-002` remains open |
| G1 — platform need | A measured problem identifies capabilities or distribution that responsive web cannot adequately provide | No qualifying native-only need recorded by this ticket |
| G2 — contract readiness | Candidate shared contracts are versioned, deterministic, and independent of browser / UI mechanics | Initial fixture created; extraction not authorized |
| G3 — security and identity | Threat model covers session storage, deep links, device loss, secrets, privacy, and account recovery | Not established |
| G4 — operating ownership | Named owners exist for Apple / Google accounts, signing, releases, incidents, SDK upgrades, privacy declarations, and support | Not established |
| G5 — quality parity | Accessibility, low-end device, unstable-network, navigation, lifecycle, and failure-state acceptance criteria exist | Web criteria exist; native parity criteria do not |
| G6 — distribution case | Store, install, retention, or device-capability benefit is material enough to justify two release surfaces | Not established |

If G1 is absent, the default is to continue improving and measuring the mobile-first web surface. That is a sequencing default, not a permanent web-only decision.

## Route comparison

| Route | Eligible when | Strength | Institutional cost / risk | Required decision output |
| --- | --- | --- | --- | --- |
| Remain mobile-first web | The journey is credible in supported browsers and no material native-only capability is evidenced | One delivery surface, fastest reversible learning, strongest reuse of current implementation | Browser constraints remain; no intentional install / offline or store channel | Supported-device policy, performance budget, network-failure contract, and explicit revisit trigger |
| Installable PWA | Installability, resilient shell behavior, or limited offline continuity is evidenced and browser capability is sufficient | Reuses the web surface and can add install / cache behavior incrementally | Service-worker cache invalidation, offline truth, browser variance, and update semantics become trust-critical | Manifest / install contract, cache policy, offline data classification, update / rollback plan, browser matrix |
| Capacitor shell | Store distribution or a narrow native API set is evidenced while the DOM UI remains acceptable | High web-code reuse and relatively small initial translation surface | WebView lifecycle, plugin quality, accessibility, performance, store policy, and dual release operations | Plugin allow-list, bridge threat model, native API contract, WebView performance evidence, release ownership |
| Expo / React Native client | Native interaction, navigation, lifecycle, performance, accessibility, or SDK integration is materially important | Native UI model, broad cross-platform ecosystem, clearer platform adapter boundary | UI must be rebuilt; parity drift and two application surfaces require active control | Architecture ADR, navigation / state / adapter design, design-token plan, parity harness, release and upgrade policy |
| Swift + Kotlin clients | A hard platform requirement cannot be met credibly by cross-platform approaches and the institution can own two native stacks | Maximum platform control and direct API access | Highest engineering, QA, release, accessibility, and parity burden | Exceptional-case rationale, two-team ownership model, shared-contract protocol, independent release and incident plans |

## Evidence-weighted scoring template

Score only after a separately authorized investigation. Use `0` for unmet, `1` for weak, `2` for adequate, and `3` for strong evidence. A high score is not approval; any failed mandatory gate stops selection.

| Criterion | Weight | Evidence reference | Web | PWA | Capacitor | Expo / RN | Swift + Kotlin |
| --- | ---: | --- | ---: | ---: | ---: | ---: | ---: |
| Journey comprehension and trust parity | 5 | Required | — | — | — | — | — |
| Low-end device performance | 5 | Required | — | — | — | — | — |
| Unstable-network behavior | 5 | Required | — | — | — | — | — |
| Accessibility parity | 5 | Required | — | — | — | — | — |
| Security and identity fit | 5 | Required | — | — | — | — | — |
| Required device capabilities | 4 | Required when claimed | — | — | — | — | — |
| Distribution / acquisition value | 3 | Required when claimed | — | — | — | — | — |
| Delivery speed and reversibility | 3 | Repository / spike evidence | — | — | — | — | — |
| Code and contract reuse | 3 | Dependency analysis | — | — | — | — | — |
| Release and incident operability | 4 | Named operating model | — | — | — | — | — |
| Upgrade and dependency burden | 3 | Spike / maintenance evidence | — | — | — | — | — |
| Total cost of ownership | 4 | Resourced estimate | — | — | — | — | — |

Rules:

1. Attach an evidence reference to every non-zero score.
2. Do not compensate for a failed required gate with strength elsewhere.
3. Record unknowns as unknowns; do not convert assumptions into neutral scores.
4. Record both a recommended route and a “continue current route” counterfactual.
5. Require Founder disposition and ADR evaluation before architecture adoption.

## Future stage gates

| Stage | Output | Exit condition | Authority required |
| --- | --- | --- | --- |
| R0 — readiness characterization | Baseline, boundary register, scorecard, contract fixture | D-122 package verified | Current ticket only |
| R1 — boundary hardening | Minimal pure contract seams with no behavior change | Web parity and full hermetic validation | Separate exact-file ticket |
| R2 — platform spike | Disposable vertical slice against fixed fixtures | Measured device, accessibility, lifecycle, network, and delivery evidence | Separate framework-specific spike authority and ADR evaluation |
| R3 — internal alpha | Signed internal builds and dual-surface parity controls | Security, privacy, release, support, and incident gates pass | Separate operational and implementation authority |
| R4 — external distribution | Store-ready customer release | Product, legal, security, support, comprehension, and financial boundaries explicitly cleared | Separate Founder decisions; Class B / C where applicable |

Completion of one stage does not activate the next.

## Minimum spike shape, if later authorized

A useful spike should reproduce one bounded, read-only vertical slice:

- current-position balance from the versioned fixture;
- the public transaction-status mapping;
- one read-only `EngineState` presentation;
- navigation into a factual Activity record;
- offline / unavailable behavior that shows no invented data or capability;
- accessibility and low-end-device measurements.

It should exclude real auth, providers, deposits, withdrawals, custody, rails, push, background execution, and store publication unless the future ticket explicitly names them. The spike should be deletable without changing the web application.

## Decision record template

When the institution is ready to choose, record:

- the user or operating problem;
- evidence for G0–G6;
- scored comparison with source references;
- selected route and rejected alternatives;
- trust, security, accessibility, performance, and lifecycle risks;
- ownership and total-cost commitment;
- rollback path;
- ADR treatment;
- exact next ticket, files, tests, exclusions, and stop conditions.

No route is selected by `MOBILE-NATIVE-READINESS-001`. `NO CROSS-LANE IMPACT`.
