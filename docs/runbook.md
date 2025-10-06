## Solo QA Gate — Merge Ritual

The Solo QA Gate enforces deliberate QA sign-off through label requirements in the validate workflow. This prevents accidental merges while maintaining solo workflow control.

### Process
1) **Open PR** (template appears). Fill AC & tests sections.
2) **Run local checks**: `pnpm -w typecheck | pnpm -w lint | pnpm -w test -- --run`, then `e2e:ci`.
3) **Apply labels**:
   - `product:approved` (content matches CONTRACT)
   - `qa:approved` (pre-merge QA checklist done)
4) **Ensure required checks are green**:
   - validate ✅ (includes QA label gate)
   - E2E smoke (@hedgr/frontend) ✅
5) **Auto-merge (squash) is enabled**.

### Bypass Policy
- **Draft PRs** and **Renovate/Dependabot** are exempt
- **Emergency**: set `QA_GATE_BYPASS=1` on the workflow run (use sparingly)

### Label Management
- **Bootstrap labels**: Run `.github/scripts/bootstrap-labels.sh` to create required labels
- **Label colors**: product:approved (green), qa:approved (green), qa:blocked (red), qa:warning (purple)
