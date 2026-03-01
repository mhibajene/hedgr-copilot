

# Hedgr Runtime Flags

> Status: Active
> Owner: Hedgr Core
> Last Updated: 2026-03-01

---

## 1. Purpose

This document defines the runtime control plane of Hedgr.

Runtime flags:
- Explicitly define environment behaviour.
- Gate integrations.
- Enforce CI safety.
- Prevent accidental live execution.

If a flag changes system behaviour, it must be documented here.

---

## 2. Global Principles

1. No implicit modes.
2. CI must never use live integrations.
3. Unknown flag values must fail fast.
4. Flags are configuration, not business logic.
5. Defaults must be safe.

---

## 3. Auth Flags

### NEXT_PUBLIC_AUTH_MODE

**Values:**
- `mock`
- `magic`

**Default (local):** `mock`
**CI:** `mock`
**Production:** `magic`

**Purpose:**
Controls authentication mechanism.

**Risk if misconfigured:**
- `magic` in CI could cause external dependency failures.

**Guardrail:**
Validated in trust check script.

---

## 4. FX Flags

### NEXT_PUBLIC_FX_MODE

**Values:**
- `fixed`
- `coingecko`

**Default (local):** `fixed`
**CI:** `fixed`
**Production:** `coingecko`

**Purpose:**
Determines FX rate source.

**Risk if misconfigured:**
- `coingecko` in CI introduces network calls.

**Guardrail:**
CI trust check enforces `fixed`.

---

## 5. DeFi Flags

### NEXT_PUBLIC_DEFI_MODE

**Values:**
- `mock`
- `aave`

**Default (local):** `mock`
**CI:** `mock`
**Production:** `aave` (when enabled)

**Purpose:**
Controls DeFi integration adapter.

**Risk if misconfigured:**
- Live protocol access in CI or staging.

**Guardrail:**
Trust check validation.

---

## 6. Market Policy Flags

### NEXT_PUBLIC_MARKET_MODE

**Values:**
- `manual`
- `auto`

**Purpose:**
Determines whether market selection is user-selected or system-derived.

---

### NEXT_PUBLIC_MARKET_SELECTED

**Values:**
- `ZW`
- `ZA`
- `KE`
- `UNKNOWN`

**Purpose:**
Specifies active market policy.

**Invariant:**
If `UNKNOWN`, policy must deny by default.

---

### MARKET_POLICY_VERSION

**Example:** `v1`

**Purpose:**
Version-locks market policy schema.

---

## 7. Copilot Flags

### NEXT_PUBLIC_FEATURE_COPILOT_ENABLED

**Values:**
- `true`
- `false`

**Default:** `false`

**Purpose:**
Build-time and runtime gating of Copilot UI.

---

### OPENAI_MODE

**Values:**
- `stub`
- `live`

**Default (local):** `stub`
**CI:** `stub`

**Purpose:**
Determines model execution mode.

**Invariant:**
Copilot must not execute live model calls in CI.

---

## 8. CI Safety Requirements

CI must enforce:
- AUTH_MODE=mock
- FX_MODE=fixed
- DEFI_MODE=mock
- OPENAI_MODE=stub

Any deviation must fail the build.

---

## 9. Change Discipline

When introducing a new flag:

1. Define allowed values explicitly.
2. Define safe default.
3. Define CI value.
4. Add trust-check validation.
5. Update this document.

Flags are part of the system contract.
Undocumented flags are not allowed.