# PR: <concise title>

> **Agent PR**: This PR was produced (in full or part) by a Cursor Agent.  
> Merge standard = **verifiable artifacts + required checks + rollback clarity**.

---

## 1) What changed (high signal)
- **Intent:**  
- **User-facing outcome:**  
- **Non-goals / excluded scope:**  

---

## 2) Risk classification (required)
- **Area labels:** area:frontend | area:backend | area:infra | area:copilot | area:payments | area:defi | area:ledger
- **Risk label:** risk:low | risk:medium | risk:high
- **Money-path impact:** none | indirect | direct (deposit/withdraw/ledger/allocation)

If **direct money-path** or **allocation logic** touched: call it out explicitly.

---

## 3) Evidence pack (required for Agent PRs)
Attach or link:

### A) UI proof
- [ ] **Video**: happy-path walkthrough (or Playwright video)
- [ ] **Screenshots**: key states (success + failure + retry/empty)

### B) Logs / receipts
- [ ] Relevant logs showing state transitions (e.g., pending → confirmed)
- [ ] Ledger/DB receipts (redacted): before/after rows or IDs

### C) Test artifacts (when applicable)
- [ ] Playwright trace / report (especially on flaky areas)

> Hedgr UX requires "proof accessible, not hidden" (internal standard) — PRs must ship receipts, not claims.

---

## 4) Required checks (must pass)
**Branch protection requires:**
- [ ] `validate`
- [ ] `E2E smoke (@hedgr/frontend)`

**Local run (paste outputs or note CI links):**
- [ ] `pnpm run validate`
- [ ] `pnpm -w test`
- [ ] `pnpm -w typecheck`
- [ ] `pnpm -w lint`

E2E (if touched UI flows):
- [ ] `pnpm --filter @hedgr/frontend run e2e:ci`

---

## 5) Flags / environment gating (required)
List any flags/env vars added/changed and their defaults.

- **CI defaults must remain hermetic** (no live network/providers in CI/E2E).
- If Copilot touched:
  - [ ] CI hard-forced stub mode maintained (no live OpenAI)

**Changed flags:**
- `FLAG_NAME` = <default> (modes: …)

---

## 6) UX / Trust compliance checklist (required)
### A) Safety over speed
- [ ] No irreversible action without confirmation
- [ ] Failure states are calm + legible (no urgency framing)

### B) Advisory, never directive (Copilot + UX)
- [ ] Product recommends, never commands
- [ ] "Do nothing / wait" remains a first-class outcome

### C) Risk visibility
- [ ] Risk not abstracted away; context is accessible
- [ ] No "yield-only" framing without allocation/risk context

If dashboard/allocation touched: confirm non-negotiable hierarchy and weighting is preserved.

### Engine-facing PRs (conditional)

Only if this PR touches **`apps/frontend/lib/engine/**`** or Stability Engine trust surfaces described in **`docs/ops/HEDGR_STATUS.md`**.

**Review chain (read in order):** `docs/ops/HEDGR_STATUS.md` → `docs/decisions/SPRINT-2-ADR-INDEX.md` → ADR 0015 → ADR 0014 → ADR 0013 (paths under `docs/decisions/`).

**Attestation (author / reviewer):**
- [ ] Sprint 2 read-only engine boundary respected (ADR 0014)
- [ ] Allocation bands / engine targets informational, not accounting (ADR 0013)
- [ ] No execution semantics, accounting authority, or live backend engine coupling introduced

---

## 7) Copilot-specific checks (only if Copilot touched)
Copilot framework is binding:
- [ ] Provides recommendations, not commands
- [ ] May recommend waiting / not depositing
- [ ] Never optimizes solely for deposits or yield
- [ ] Copilot changes pass Trust Checklist; violations treated as defects

Include:
- [ ] Transcript(s) for key prompts
- [ ] Tests updated/added for refusal + "recommend waiting" behavior

---

## 8) Governance: is this a loggable decision?
A decision is loggable if it affects **architecture/custody/liquidity/yield/trust** or introduces trade-offs.

- [ ] **No (implementation-only)**
- [ ] **Yes → ADR required**

If **Yes**, include:

### ADR stub (required)
- **Decision Title:**  
- **Problem/Trigger:**  
- **Decision:**  
- **Rationale:**  
- **Assumptions:**  
- **Risks/Trade-offs:**  
- **Reversibility:** Reversible | Hard | Irreversible  
- **Kill / revisit criteria:**  
- **Pillar alignment:** (Security & Trust / UX / Local GTM / Regulatory / Sustainable Yield / Education / Scalability)

(If Visibility=Public and approved, export via ADR rules.)

---

## 9) Rollback plan (required)
- [ ] Flag-off path (if available)
- [ ] Single revert path (commit/PR reference)
- [ ] Data migration impact: none | reversible | irreversible (explain)

---

## 10) Reviewer guidance (make review easy)
- **Start here (files):**  
- **Focus areas (what could break):**  
- **What to ignore (noise):**  

# PR: <concise title>

> **Agent PR**: This PR was produced (in full or part) by a Cursor Agent.  
> Merge standard = **verifiable artifacts + required checks + rollback clarity**.  
> Governance hierarchy: **.cursorrules -> .cursor/rules.md -> AGENTS.md -> this template**.

---

## 1) What changed (high signal)
- **Intent:**  
- **User-facing outcome:**  
- **Non-goals / excluded scope:**  
- **Doctrine / ADRs consulted:**  
- **Sprint posture respected:** yes | no (explain)

---

## 2) Risk classification (required)
- **Area labels:** area:frontend | area:backend | area:infra | area:copilot | area:payments | area:defi | area:ledger | area:policy | area:ux
- **Risk label:** risk:low | risk:medium | risk:high
- **Money-path impact:** none | indirect | direct (deposit/withdraw/ledger/allocation)
- **Trust / policy impact:** none | indirect | direct

If **direct money-path**, **allocation logic**, **trust disclosure**, or **policy behavior** was touched: call it out explicitly.

---

## 3) Evidence pack (required for Agent PRs)
Attach or link:

### A) UI proof
- [ ] **Video**: happy-path walkthrough (or Playwright video)
- [ ] **Screenshots**: key states (success + failure + retry/empty)

### B) Logs / receipts
- [ ] Relevant logs showing state transitions (e.g., pending → confirmed)
- [ ] Ledger / DB receipts (redacted): before/after rows or IDs
- [ ] Policy / trust outputs captured where applicable

### C) Test artifacts (when applicable)
- [ ] Playwright trace / report (especially on flaky areas)
- [ ] Relevant unit / integration test output

> Hedgr trust posture requires proof to be accessible, not hidden — PRs must ship receipts, not claims.

---

## 4) Required checks (must pass)
**Branch protection requires:**
- [ ] `validate`
- [ ] `E2E smoke (@hedgr/frontend)`

**Local run (paste outputs or note CI links):**
- [ ] `pnpm run validate`
- [ ] `pnpm -w test`
- [ ] `pnpm -w typecheck`
- [ ] `pnpm -w lint`

E2E (if touched UI flows):
- [ ] `pnpm --filter @hedgr/frontend run e2e:ci`

If checks were intentionally not run, explain why.

---

## 5) Flags / environment gating (required)
List any flags / env vars added or changed and their defaults.

- **CI defaults must remain hermetic** (no live network / providers in CI / E2E).
- **Doppler remains canonical** for secrets.
- If Copilot touched:
  - [ ] CI hard-forced stub mode maintained (no live OpenAI)

**Changed flags:**
- `FLAG_NAME` = <default> (modes: …)

**New secrets / env workflow introduced?**
- [ ] No
- [ ] Yes (must explain why and how it remains compliant with repo guardrails)

---

## 6) UX / Trust / Policy compliance checklist (required)
### A) Safety over speed
- [ ] No irreversible action without confirmation
- [ ] Failure states are calm + legible (no urgency framing)

### B) Advisory, never directive (Copilot + UX)
- [ ] Product recommends, never commands
- [ ] "Do nothing / wait" remains a first-class outcome

### C) Risk visibility
- [ ] Risk not abstracted away; context is accessible
- [ ] No yield-only framing without allocation / risk context

### D) Trust disclosures
- [ ] Trust disclosures preserved or improved
- [ ] Disclosure behavior remains consistent with policy and UX doctrine

### E) Policy consistency
- [ ] Policy-core behavior preserved
- [ ] Unknown / unsupported / unsafe states remain deny-by-default where required

If dashboard / allocation touched: confirm non-negotiable hierarchy and weighting is preserved.

---

## 7) Sprint / Engine constraints (required)
- [ ] Active sprint posture respected
- [ ] No hidden execution introduced
- [ ] No accounting authority introduced where doctrine keeps the engine informational
- [ ] Allocation bands remain informational unless superseding doctrine explicitly authorizes otherwise

If any of the above changed, cite the governing ADR or doctrine file.

---

## 7a) Engine-facing PRs (conditional)

Only if this PR touches **`apps/frontend/lib/engine/**`** or engine trust surfaces called out in **`docs/ops/HEDGR_STATUS.md`**.

**Review chain (read in order):**

1. `docs/ops/HEDGR_STATUS.md`
2. `docs/decisions/SPRINT-2-ADR-INDEX.md`
3. `docs/decisions/0015-stability-engine-is-the-system-center.md`
4. `docs/decisions/0014-stability-engine-read-only-in-sprint-2.md`
5. `docs/decisions/0013-allocation-bands-informational-not-accounting.md`

**Attestation (author / reviewer):**

- [ ] Sprint 2 read-only engine boundary respected (ADR 0014)
- [ ] Allocation bands / engine targets treated as informational, not accounting (ADR 0013)
- [ ] No execution semantics, accounting authority, or live backend engine coupling introduced

---

## 8) Copilot-specific checks (only if Copilot touched)
Copilot framework is binding:
- [ ] Provides recommendations, not commands
- [ ] May recommend waiting / not depositing
- [ ] Never optimizes solely for deposits or yield
- [ ] Copilot changes pass Trust Checklist; violations treated as defects

Include:
- [ ] Transcript(s) for key prompts
- [ ] Tests updated / added for refusal + “recommend waiting” behavior

---

## 9) Governance: is this a loggable decision?
A decision is loggable if it affects **architecture / custody / liquidity / yield / trust / policy** or introduces trade-offs.

- [ ] **No (implementation-only)**
- [ ] **Yes -> ADR required**

If **Yes**, include:

### ADR stub (required)
- **Decision Title:**  
- **Problem / Trigger:**  
- **Decision:**  
- **Rationale:**  
- **Assumptions:**  
- **Risks / Trade-offs:**  
- **Reversibility:** Reversible | Hard | Irreversible  
- **Kill / revisit criteria:**  
- **Pillar alignment:** (Security & Trust / UX / Local GTM / Regulatory / Sustainable Yield / Education / Scalability)

(If Visibility=Public and approved, export via ADR rules.)

---

## 10) Rollback plan (required)
- [ ] Flag-off path (if available)
- [ ] Single revert path (commit / PR reference)
- [ ] Data migration impact: none | reversible | irreversible (explain)
- [ ] Trust / policy rollback impact considered

---

## 11) Reviewer guidance (make review easy)
- **Start here (files):**  
- **Focus areas (what could break):**  
- **What to ignore (noise):**  
- **Doctrine files worth opening first:**  
