## Solo QA Gate — Merge Ritual

The Solo QA Gate enforces deliberate QA sign-off through label requirements in the validate workflow. This prevents accidental merges while maintaining solo workflow control.

### Process
1) **Open PR** (template appears). Fill AC & tests sections.
2) **Run local checks**: `pnpm -w typecheck | pnpm -w lint | pnpm -w test -- -- --run`, then `e2e:ci`.
3) **Apply labels** (all required to keep Solo QA Gate green):
   - `product:approved` (content matches CONTRACT)
   - `qa:approved` (pre-merge QA checklist done)
   - `area:*` (choose exactly one) — e.g. `area:frontend`, `area:backend`, `area:ci`, `area:docs`, `area:infra`, `area:tests`
   - `risk:*` (choose exactly one) — `risk:low` | `risk:medium` | `risk:high`
4) **Ensure required checks are green**:
   - validate ✅ (includes QA label gate)
   - E2E smoke (@hedgr/frontend) ✅
5) **Auto-merge (squash) is enabled**.

### Bypass Policy
- **Draft PRs** and **Renovate/Dependabot** are exempt
- **Emergency**: set `QA_GATE_BYPASS=1` on the workflow run (use sparingly)

### Label Management
- **Bootstrap labels**: Run `.github/scripts/bootstrap-labels.sh` to create required labels
- **Label colors**:
  - product:approved (green), qa:approved (green), qa:blocked (red), qa:warning (purple)
  - area:* (blue): frontend, backend, ci, docs, infra, tests
  - risk:low (green), risk:medium (yellow), risk:high (red)

**CLI shortcut**
```bash
gh pr edit $PR --add-label "product:approved,qa:approved,area:ci,risk:low"
```

### Local E2E Parity
- Local `e2e:ci` runs should mirror `.github/workflows/e2e-smoke.yml`, especially for deposit/withdraw and FX-backed flows.
- **Backend stub required:** With `NEXT_PUBLIC_API_BASE_URL` pointing at the Flask app (typically `http://localhost:5050`), start the backend **before** `e2e:ci`. If the API is unreachable, the deposit **Confirm** control stays disabled and multiple specs will time out in `waitForDepositFxReady`.
- If `/deposit` renders `Unable to load exchange rate` or Playwright cannot find `data-testid="deposit-amount"`, verify the local backend stub is running and `NEXT_PUBLIC_API_BASE_URL` is pointed at it.
- Recommended local parity sequence:
```bash
python3.11 -m pip install -e "apps/backend[test]"
STUB_MODE=true PORT=5050 PYTHONUNBUFFERED=1 python3.11 -m src.app --port 5050
NEXT_PUBLIC_AUTH_MODE=mock NEXT_PUBLIC_DEFI_MODE=mock NEXT_PUBLIC_FX_MODE=stub NEXT_PUBLIC_APP_ENV=dev NEXT_PUBLIC_API_BASE_URL=http://localhost:5050 NEXT_PUBLIC_FEATURE_COPILOT_ENABLED=true pnpm --filter @hedgr/frontend e2e:ci
```
