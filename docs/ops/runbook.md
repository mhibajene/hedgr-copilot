## Solo QA Gate — Merge Ritual

The Solo QA Gate enforces deliberate QA sign-off through label requirements in the validate workflow. This prevents accidental merges while maintaining solo workflow control.

### Process
1) **Open PR** (template appears). Fill AC & tests sections.
2) **Run local checks**: `pnpm -w typecheck | pnpm -w lint | pnpm -w test -- --run`, then `e2e:ci`.
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
