

# HEDGR_STATUS

Status: Active hand-off file  
Purpose: Strategic context bridge between ChatGPT UI sessions and Cursor  
Last updated: 2026-03-15

---

## 1. Current strategic posture

Hedgr is now formally positioned as a **Global Stability Wallet** built around the **Hedgr Stability Engine**.

The repo is no longer being treated as a simple frontend implementation surface. It is now governed as a doctrine-aware monorepo containing:

- product surfaces
- system controls
- policy and trust layers
- architecture doctrine
- ADR-backed implementation posture

The architectural center of the system is the **Hedgr Stability Engine**.

Core operating principle:

**Capital preservation above all.**

---

## 2. Active sprint alignment

The current sprint posture is governed by Sprint 2 doctrine.

Important constraints:

- the Stability Engine is **read-only and informational** in the active sprint
- allocation bands remain **informational**, not accounting truth, unless superseding doctrine explicitly changes that posture
- no hidden execution, fund movement, or autonomous reallocation should be introduced
- runtime policy and trust constraints remain first-class control layers
- implementation should remain conservative, reversible, and testable

Relevant governing ADRs:

- `docs/decisions/0011-stability-engine-is-read-only-sprint-2.md`
- `docs/decisions/0014-stability-engine-read-only-in-sprint-2.md`
- `docs/decisions/0015-stability-engine-is-the-system-center.md`
- `docs/decisions/SPRINT-2-ADR-INDEX.md`

---

## 3. Doctrine layer established

The repo doctrine has now been materially upgraded.

Canonical doctrine files now include:

- `docs/doctrine/hedgr-whitepaper.md`
- `docs/doctrine/hedgr-mvp-project-specification.md`
- `docs/doctrine/hedgr-system-overview.md`
- `docs/doctrine/hedgr-product-surfaces.md`
- `docs/doctrine/hedgr-stability-engine.md`

Historical artifacts preserved:

- `docs/doctrine/hedgr-whitepaper-v0.md`
- `docs/doctrine/hedgr-mvp-project-specification-v0.md`

Additional doctrine and governance files in force:

- `docs/doctrine/hedgr-constitutional-charter.md`
- `docs/doctrine/hedgr-ux-constitution.md`
- `docs/doctrine/hedgr-default-allocation-policy.md`
- `docs/doctrine/hedgrops-decision-governance-and-adr-export-standard.md`

---

## 4. Governance stack now in place

Repo governance has been tightened and aligned.

Current hierarchy:

1. `.cursorrules` — doctrine, architecture, UX/policy posture, anti-drift authority
2. `.cursor/rules.md` — patch execution discipline
3. `AGENTS.md` — repo workflow, CI posture, engineering conventions
4. `.github/PULL_REQUEST_TEMPLATE/agent.md` — review/evidence workflow
5. `README.md` — repo front door and current implementation posture

This means Cursor should now behave as a **doctrine-constrained co-architect**, not a generic coding assistant.

---

## 5. Product and architecture framing

Hedgr is now clearly framed as a financial stability operating system with three product surfaces:

- **Hedgr Wallet** — consumer stability wallet
- **Hedgr Pro** — treasury platform for SMEs and professional users
- **Hedgr APIs** — infrastructure layer for fintechs and partners

All product surfaces are downstream interfaces into the shared system core:

- Hedgr Stability Engine
- Yield Routing Engine
- wallet infrastructure
- payment rails
- AI Copilot

The Stability Engine remains the canonical allocator of capital within the Hedgr system.

---

## 6. Repo implementation posture

Current implementation posture:

- trust-first
- policy-aware
- doctrine-constrained
- hermetic in CI / E2E
- reversible by default

Important repo constraints:

- Doppler is the canonical secrets source
- do not introduce new long-lived `.env` workflows as source of truth
- no live external provider dependencies in CI / E2E
- tests should move with behavior changes
- trust, disclosure, and policy consistency are part of the implementation contract

---

## 7. What Cursor should assume right now

When working from this hand-off file, Cursor should assume:

- doctrine takes precedence over implementation convenience
- the engine is the system center
- Sprint 2 is read-only for the Stability Engine
- allocation outputs are informational unless doctrine explicitly changes that
- policy-core and trust disclosures must remain consistent with engine and UI behavior
- small, reversible, well-tested patches are preferred
- if a requested change creates doctrinal ambiguity, doctrine should be consulted or extended before architecture drift is introduced

---

## 8. Immediate next-use guidance

Use this file as the quick strategic primer before asking Cursor to:

- review or implement sprint tickets
- scaffold system work touching allocation, policy, trust, or Copilot behavior
- assess whether a requested change needs an ADR
- understand current repo governance and architecture posture

For deeper context, open next:

1. `docs/decisions/SPRINT-2-ADR-INDEX.md`
2. `docs/doctrine/hedgr-stability-engine.md`
3. `docs/doctrine/hedgr-system-overview.md`
4. `.cursorrules`

---

## 9. Naming note

The intended hand-off file name is **`HEDGR_STATUS.md`**.

If any notes or instructions reference `HEGDR_STATUS.md`, treat that as a typo and continue using:

`docs/ops/HEDGR_STATUS.md`