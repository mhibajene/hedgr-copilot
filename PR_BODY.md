Title: feat(auth): mock login + app shell + health/version

Scope In
- Mock email OTP auth stub (login action + session store)
- Guarded app shell with sign‑out
- /api/health and /api/version endpoints

Scope Out
- Real OTP delivery / backend auth

Files
- apps/frontend/lib/state/user.ts (Zustand session store)
- apps/frontend/lib/auth/magic.ts (mock auth)
- apps/frontend/pages/login.tsx (login page)
- apps/frontend/pages/dashboard.tsx (app shell with guard)
- apps/frontend/__tests__/auth.spec.ts (unit tests)
- apps/frontend/tests-e2e/critical.spec.ts (E2E tests)
- apps/frontend/config/env.ts (updated with auth mode)

Flags
- NEXT_PUBLIC_AUTH_MODE=mock (CI default)

Acceptance Criteria
- Given NEXT_PUBLIC_AUTH_MODE=mock when user submits /login then redirect /dashboard and session is set

Tests
- Unit: apps/frontend/__tests__/auth.spec.ts
- E2E: apps/frontend/tests-e2e/critical.spec.ts (login works)

Labels
- product:approved, qa:approved, area:frontend, risk:low

Rollback
- Single revert
- Feature flag toggle (auth mode)
