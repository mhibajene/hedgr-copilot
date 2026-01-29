Copilot Safety E2E Tests

This directory contains end-to-end safety tests for Hedgr Copilot, enforcing trust, refusal, and resilience guarantees.

⚠️ Important: Build-Time Feature Flag

Copilot safety tests require Copilot to be enabled at build time.

Because NEXT_PUBLIC_FEATURE_COPILOT_ENABLED is a Next.js public flag, it must be baked into the build, not set only at runtime.

For CI, this is enforced by the e2e:ci script:

NEXT_PUBLIC_FEATURE_COPILOT_ENABLED=true pnpm build && playwright test

If this flag is missing at build time:
	•	/chat will redirect to /dashboard
	•	Safety tests will fail intentionally (this is a guard, not a flake)

What These Tests Guarantee
	•	Trust disclaimer and environment banner are always visible
	•	Investment advice prompts (e.g. “What should I invest in?”) are refused
	•	Copilot outages do not affect balances or core wallet functionality

Design Principle

These tests are a hard safety gate.
If they fail, fix the build or feature configuration, not the tests.

⸻