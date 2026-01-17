# Hedgr Copilot — Flags, Rollout & Rollback

**Status:** Authoritative  
**Applies to:** Sprint 0.9+  
**Audience:** Engineering, Product, On-call, QA

---

## 1. Overview

Hedgr Copilot is a trust-first, advisory-only AI assistant designed to help users understand Hedgr, their balances, and system state.

Copilot is intentionally gated behind multiple environment flags to ensure:

- Safe rollout
- Controlled experimentation
- Immediate rollback in incidents
- Zero ambiguity about trust posture

This document is the single source of truth for how Copilot is enabled, disabled, and operated.

---

## 2. Trust & Safety Posture (Invariant)

The following principles are non-negotiable and enforced by code + tests:

- Copilot is not a financial advisor
- No investment, trading, or regulatory advice
- No guarantees, APY claims, or urgency language
- "Waiting" is a valid and encouraged recommendation
- User control is always reinforced
- Safety > engagement > growth

**If any of these principles are violated, Copilot must be disabled immediately using the rollback steps below.**

---

## 3. Environment Variables (Authoritative)

### 3.1 OPENAI_MODE

**Purpose**  
Controls whether Copilot uses a real OpenAI model or a stubbed deterministic model.

**Allowed Values**

- `stub` (default)
- `live`

**Defaults**

| Environment | Value          |
| ----------- | -------------- |
| CI          | `stub` (forced) |
| dev         | `stub`         |
| stg         | `stub`         |
| prod        | `stub`         |

**Behavior**

- `stub`: No external network calls. Deterministic responses.
- `live`: Uses OpenAI API (requires `OPENAI_API_KEY`).

**Failure Mode**

- If `OPENAI_MODE=live` and `OPENAI_API_KEY` is missing → Copilot API returns 503.

**Rollback**

```bash
OPENAI_MODE=stub
```

No rebuild required (server-side).

---

### 3.2 FEATURE_COPILOT_ENABLED / NEXT_PUBLIC_FEATURE_COPILOT_ENABLED

**Purpose**  
Controls UI and route exposure for Copilot (`/chat`).

> **Critical Detail**  
> This is a **build-time flag**.  
> It must be set before `next build`.

**Allowed Values**

- `true`
- `false` (default)

**Defaults**

| Environment | Value                              |
| ----------- | ---------------------------------- |
| CI          | `false` (unless explicitly enabled for E2E) |
| dev         | `false`                            |
| stg         | `false`                            |
| prod        | `false`                            |

**Behavior**

- `false`:
  - `/chat` redirects to `/dashboard`
  - Copilot nav item hidden
- `true`:
  - `/chat` available
  - Copilot UI visible

**Rollback (Immediate UI Kill)**

```bash
NEXT_PUBLIC_FEATURE_COPILOT_ENABLED=false pnpm build
```

Deploy rebuilt artifact.

---

### 3.3 COPILOT_CACHE_ENABLED

**Purpose**  
Controls semantic response caching for Copilot.

**Allowed Values**

- `true` (default)
- `false`

**Behavior**

- `true`: Cached responses reused (cost + latency reduction)
- `false`: All requests hit model/stub

**Safety**

- Safe to disable at any time
- No user-visible breakage

**Rollback**

```bash
COPILOT_CACHE_ENABLED=false
```

No rebuild required.

---

## 4. Rollout Procedure (Canonical)

### Step 1 — Enable in Dev

```bash
NEXT_PUBLIC_FEATURE_COPILOT_ENABLED=true OPENAI_MODE=stub pnpm build
```

Validate:

- `/chat` accessible
- Stub responses
- Disclaimers visible

---

### Step 2 — Enable in Staging

Same as dev. Validate:

- E2E safety tests
- Refusal behavior
- Outage resilience

---

### Step 3 — (Optional) Enable Live OpenAI

```bash
OPENAI_MODE=live
```

Requirements:

- API key present
- Logs monitored
- Rollback ready

---

### Step 4 — Limited Production Exposure

- Feature flag remains primary kill switch
- Do not enable live OpenAI by default

---

## 5. Rollback Playbooks (Explicit)

### 5.1 Emergency: Disable Copilot UI

```bash
NEXT_PUBLIC_FEATURE_COPILOT_ENABLED=false pnpm build
```

**Effect:**

- `/chat` disabled
- No user access
- Safest rollback

---

### 5.2 Disable OpenAI Only (Keep UI)

```bash
OPENAI_MODE=stub
```

**Effect:**

- Copilot remains available
- No external calls

---

### 5.3 Disable Semantic Cache

```bash
COPILOT_CACHE_ENABLED=false
```

**Effect:**

- Higher cost / latency
- Maximum determinism

---

### 5.4 Full Dark Launch

```bash
NEXT_PUBLIC_FEATURE_COPILOT_ENABLED=false
OPENAI_MODE=stub
COPILOT_CACHE_ENABLED=false
pnpm build
```

---

## 6. CI & E2E Safety Notes

- Safety E2E tests require:

```bash
NEXT_PUBLIC_FEATURE_COPILOT_ENABLED=true pnpm build
```

- Tests will fail intentionally if Copilot is unavailable.
- This is a safety gate, not a flake.

---

## 7. Ownership & Accountability

- Feature flags are the first response, not code changes
- Tests are allowed to fail loudly
- Trust violations override growth concerns

---

## 8. Change Log

- **Sprint 0.9:** Initial Copilot rollout controls documented
