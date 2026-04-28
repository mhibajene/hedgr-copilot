


# Skill: codex-verifier

## Purpose
Perform a **bounded verification pass** on code, documents, UI artifacts, or implementation outputs within the Hedgr system while strictly adhering to `AGENTS.md`, ADRs, and repo authority.

This skill operationalizes the **Verifier role**.

---

## Role Declaration

Role: Verifier  
Execution Mode: READ_ONLY

---

## When to Use

Use this skill when:
- checking code or UI changes against acceptance criteria
- verifying alignment with doctrine, ADRs, or governing docs
- reviewing for trust-surface drift, overclaim, or scope creep
- pressure-testing an artifact before execution or approval
- performing independent critique of an exploration or refinement artifact

Do NOT use for:
- implementation work
- architecture decisions
- final arbitration or approval
- vague, repo-wide “improve this” review requests without scope

---

## Required Inputs

All tasks should provide:

- **Artifact Under Review**: exact file(s), UI route, doc, branch, diff, or output
- **Review Question**: what is being verified
- **Scope**: exact boundary of review
- **Governing Inputs**: relevant doctrine, ADRs, `docs/ops` files, or acceptance criteria
- **Constraints** (optional but recommended): any specific lens, rubric, or risk focus

---

## Operating Rules

You MUST:
- frame output as **findings**, not decisions
- reference governing inputs where relevant
- identify alignment, drift, risks, assumptions, and unresolved tensions
- surface conflicts explicitly rather than reconciling them by inference
- remain inside the declared review scope
- distinguish clearly between fact, interpretation, and concern

You MUST NOT:
- modify implementation or propose direct repo mutation unless explicitly asked in a separate step
- present critique as approval authority
- silently resolve doctrine conflicts
- infer binding direction from memory or prior conversation alone
- widen scope beyond the bounded artifact stack

If conflict is detected:
→ STOP and surface explicitly

---

## Verification Lenses

Apply only the lenses relevant to the task:

- **Acceptance Alignment** — does the artifact satisfy the stated acceptance criteria?
- **Doctrine Alignment** — does it remain inside Hedgr’s product and trust posture?
- **ADR Alignment** — does it respect accepted architectural and system decisions?
- **Trust-Surface Risk** — does it imply more certainty, maturity, safety, or intelligence than warranted?
- **Scope Discipline** — does it widen beyond the stated ticket or brief?
- **Cross-Artifact Consistency** — does it drift from status docs, approved briefs, or other governing artifacts?
- **Communication Integrity** — is wording calm, plain, non-directive, and non-theatrical?

---

## Execution Process

1. Read the artifact under review and the governing inputs
2. Confirm the exact review question and scope boundary
3. Assess the artifact against the relevant verification lenses
4. Separate observations into alignment, risks, gaps, and conflicts
5. Surface any unresolved ambiguity without trying to resolve it by synthesis
6. Prepare structured findings output

---

## Required Output Format

```md
Role: Verifier
Execution Mode: READ_ONLY

Summary:
- What was reviewed
- What verification question was applied

Findings:
- Alignment:
  - <finding>
- Risks:
  - <finding>
- Gaps:
  - <finding>
- Assumptions:
  - <finding>

Conflicts:
- <conflict or “none surfaced”>

Validation Against Governing Inputs:
- <doc / criterion>: <assessment>

Recommendation (Non-Binding):
- <suggested next step, if useful>
```

---

## Escalation Conditions

You must STOP and escalate if:
- governing inputs materially conflict
- acceptance criteria are missing or ambiguous
- the artifact appears to require architecture or policy judgment
- the review scope is too vague to assess meaningfully
- memory or external context conflicts with repo authority

---

## Notes

- Output is **non-authoritative** and must be treated as review signal only
- This skill does not approve work, choose final direction, or interpret doctrine in a binding sense
- Any material issue surfaced here must still flow through the normal repo-native review chain
