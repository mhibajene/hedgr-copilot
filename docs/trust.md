# Trust & Environment Documentation

This document explains Hedgr's environment modes, trust disclosures, and CI safety mechanisms.

## Overview

Hedgr operates in different modes depending on the environment. In development and testing, we use **simulated/mock** integrations to ensure safety. In production, live integrations are used.

The **Trust Disclosure Banner** and **CI trust:check script** work together to ensure:
1. Users always know when they're in a simulated environment
2. CI pipelines never accidentally run with live integrations

---

## Environment Modes

### AUTH_MODE

Controls user authentication.

| Value | Description | When to Use |
|-------|-------------|-------------|
| `mock` | Bypasses real identity verification. Any email address is accepted. | Dev, CI, E2E tests |
| `magic` | Uses Magic.link for passwordless authentication. | Production |

**Environment Variable:** `NEXT_PUBLIC_AUTH_MODE`

### FX_MODE

Controls foreign exchange rate fetching.

| Value | Description | When to Use |
|-------|-------------|-------------|
| `fixed` | Uses a hardcoded ZMW/USD rate (20:1). Rates never change. | Dev, CI, E2E tests |
| `coingecko` | Fetches live rates from CoinGecko API. | Production |

**Environment Variable:** `NEXT_PUBLIC_FX_MODE`

### DEFI_MODE

Controls DeFi yield calculations.

| Value | Description | When to Use |
|-------|-------------|-------------|
| `mock` | Returns simulated APY values. No blockchain interaction. | Dev, CI, E2E tests |
| `aave` | Connects to Aave protocol for real yield data. | Production |

**Environment Variable:** `NEXT_PUBLIC_DEFI_MODE`

---

## Environments

### Development (`dev`)

- All modes default to mock/fixed
- Trust disclosure banner is always visible
- Safe for experimentation

### Staging (`stg`)

- Can run with either mock or live modes
- Used for integration testing
- Trust disclosure reflects actual mode

### Production (`prod`)

- Runs with live integrations
- Trust disclosure banner is hidden (or shows different messaging)
- Real money, real yields, real transactions

---

## Trust Disclosure Banner

The `<TrustDisclosureBanner>` component provides clear, persistent disclosures to users about the current environment.

### Location

The banner appears in:

1. **App Layout** — Top of all authenticated pages (Dashboard, Deposit, Withdraw, Activity)
2. **Login Page** — Visible during onboarding/first-run
3. **Settings → Trust & Risk** — Detailed environment configuration display

### Variants

| Variant | Usage |
|---------|-------|
| `banner` (default) | Full-width alert banner at top of page |
| `compact` | Smaller card-style for settings/inline use |

### Props

```tsx
type TrustDisclosureBannerProps = {
  variant?: 'banner' | 'compact';
  learnMoreUrl?: string;
  dismissible?: boolean;
  'data-testid'?: string;
};
```

### Behavior

- **In mock environments:** Always displays warning about simulated data
- **In production with live integrations:** Hidden or shows appropriate messaging
- **Dismissible:** Optional dismiss button (banner variant only)

---

## CI Trust Check

The `trust:check` script validates that CI environments use safe defaults.

### Running the Check

```bash
# Via pnpm script
pnpm -w trust:check

# Directly
node scripts/ci/trust-check.mjs
```

### What It Checks

The script validates these environment variables:

| Variable | Required Value in CI |
|----------|---------------------|
| `NEXT_PUBLIC_AUTH_MODE` | `mock` |
| `NEXT_PUBLIC_FX_MODE` | `fixed` |
| `NEXT_PUBLIC_DEFI_MODE` | `mock` |

### Behavior

- **In CI (`CI=true`):** Fails the build if any mode is set to a live value
- **In local dev:** Warns but does not fail

### CI Workflow Integration

The trust:check runs as part of:

- `pnpm -w validate` (first step)
- `.github/workflows/validate.yml`
- `.github/workflows/e2e-smoke.yml`

### Example Output (Success)

```
🔐 Trust Check — Validating CI Environment Safety

Environment variables:
  ✅ AUTH_MODE: mock (NEXT_PUBLIC_AUTH_MODE)
  ✅ FX_MODE: fixed (NEXT_PUBLIC_FX_MODE)
  ✅ DEFI_MODE: mock (NEXT_PUBLIC_DEFI_MODE)

✅ Trust check passed. All modes are set to safe CI defaults.

Summary:
  CI Environment: Yes
  AUTH_MODE: mock
  FX_MODE: fixed
  DEFI_MODE: mock
```

### Example Output (Failure)

```
🔐 Trust Check — Validating CI Environment Safety

Environment variables:
  ⚠️ AUTH_MODE: magic (NEXT_PUBLIC_AUTH_MODE)
  ✅ FX_MODE: fixed (NEXT_PUBLIC_FX_MODE)
  ✅ DEFI_MODE: mock (NEXT_PUBLIC_DEFI_MODE)

────────────────────────────────────────────────────────────
⚠️  NEXT_PUBLIC_AUTH_MODE="magic" is a LIVE integration. CI should use safe defaults: mock

❌ Trust check FAILED in CI environment.

CI must run with safe/mock defaults to prevent accidental
use of live integrations during automated testing.

Fix: Ensure your CI workflow sets these environment variables:
  NEXT_PUBLIC_AUTH_MODE=mock
  NEXT_PUBLIC_FX_MODE=fixed
  NEXT_PUBLIC_DEFI_MODE=mock
```

---

## Adding New Modes

When adding a new integration mode:

1. **Add the mode function** in `lib/<feature>/mode.ts`
2. **Update `trust-check.mjs`** to validate the new mode
3. **Update the Trust Disclosure Banner** to display the new mode's status
4. **Update this documentation**

---

## FAQ

### Why do we need trust disclosures?

Users should never be confused about whether their money is real. Clear disclosures prevent:
- Users thinking mock balances are real
- Engineers accidentally testing with live integrations
- Support issues from misunderstanding the environment

### Why does CI fail on live modes?

Automated tests should never:
- Make real API calls that could incur costs
- Interact with real blockchain protocols
- Affect real user data

The trust:check ensures CI always runs in a safe, isolated configuration.

### Can I disable the trust banner in development?

The banner is dismissible, but it will reappear on page refresh. This is intentional — the reminder should be persistent to prevent confusion.

