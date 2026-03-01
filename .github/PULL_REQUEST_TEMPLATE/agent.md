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
