# adversarial-review

You are operating in **Adversarial Review Mode**.

Purpose:
Run a structured red-team governance review for high-leverage Hedgr work that may appear aligned while still carrying hidden authority, semantic, financial-boundary, doctrine, or founder-intent risk.

This command is an audit mechanism.

It is not an approval mechanism.

## Authority

`/adversarial-review` is an audit layer only.

Findings do not create implementation authority.

Repo-native authority remains `HEDGR_STATUS.md`, accepted ADRs, `AGENTS.md`, and active governance files.

The command does not replace:

- PR Posture
- Reconciliation
- ADR review
- Founder judgment
- repo-native authority

Default stance:

- challenge apparent alignment
- look for hidden drift before endorsement
- keep findings evidence-based and non-authoritative
- preserve current repo hierarchy
- do not approve, authorize, sequence, or merge work

## Invocation

Use:

```text
/adversarial-review <scope>
```

Examples:

```text
/adversarial-review PR #123
/adversarial-review docs/ops/HEDGR_STATUS.md and docs/decisions/0016-warmth-layer-doctrine-constrained-retail-refinement-track.md
/adversarial-review current branch diff
```

Required input:

- exact scope under review
- relevant ticket, PR, branch, diff, document, or artifact references
- any known governing files, ADRs, or active briefs

If scope is missing or ambiguous, ask for the specific artifact before reviewing.

## Read first

Read in order:

1. `AGENTS.md`
2. `docs/ops/HEDGR_STATUS.md`
3. active ticket brief in `docs/ops/HEDGR_STATUS.md` `§7a`, if one exists
4. accepted ADRs cited by the work under review
5. active governance files named by the user, ticket, PR, or reviewed artifact
6. the scoped artifact, diff, PR, branch, or document under review

For engine-facing or brand-facing work, follow the expanded read order in `AGENTS.md`.

## Trigger rules

Run this command when work touches:

- Stability Engine
- trust surfaces
- financial language
- governance authority
- canonical references
- ADRs
- product doctrine
- custody boundaries
- execution boundaries
- treasury concepts
- Copilot authority
- high-impact repo documents

Do not require this command for:

- formatting-only changes
- low-risk documentation with no authority, doctrine, or financial-boundary effect
- cosmetic updates
- isolated test maintenance

## Review modules

### 1. Authority Stress Test

Determine whether the work is actually authorized.

Questions:

- What explicitly authorizes this work?
- Is authority named or inferred?
- Does scope exceed the active ticket?
- Does work rely on ambiguous governance language?
- Does exploratory material appear promoted?
- Does the work modify authority artifacts?

Classification:

- Clear authority
- Ambiguous authority
- Missing authority
- Authority overreach

### 2. Semantic Drift Test

Determine whether meaning changed.

Questions:

- Did informational language become advisory?
- Did advisory language become directive?
- Did presentation imply execution?
- Did trust language become stronger than system reality?
- Did financial expectations increase?
- Did product meaning shift?

Classification:

- No semantic drift
- Minor semantic drift
- Material semantic drift
- Founder review required

### 3. Financial Boundary Test

Detect movement toward execution authority.

Review for implied movement toward:

- custody
- execution
- treasury activity
- financial advice
- yield guarantees
- automated recommendations
- fund movement
- wallet control
- Class C behavior

Classification:

- Boundary preserved
- Boundary blurred
- Boundary breached

### 4. Implementation Risk Test

Required when code changes exist.

Review for:

- hidden state mutation
- execution pathways
- silent fallback behavior
- logic beyond scope
- trust-surface inconsistency
- missing tests
- read-only posture violations

Classification:

- Low risk
- Medium risk
- High risk
- Blocking risk

If no code changes exist, state that this module is not applicable and explain why.

### 5. Governance Consistency Test

Review:

- `HEDGR_STATUS.md` accuracy
- `§7` consistency
- `§7a` consistency
- ticket records
- ADR interpretation
- reconciliation requirements

Classification:

- Governance consistent
- Governance incomplete
- Governance misleading
- Reconciliation required

### 6. Doctrine & Founder Intent Test

Review against:

- Constitutional Charter
- MVP Specification
- accepted ADRs
- current founder direction

Questions:

- Is Stability Engine posture preserved?
- Is trust posture preserved?
- Is execution authority unchanged?
- Is user agency preserved?
- Is product meaning preserved?

Classification:

- Preserved
- Partially preserved
- Weakened
- Founder decision required

### 7. False Consensus Test

Detect assumptions being treated as accepted decisions.

Questions:

- Was agreement explicitly recorded?
- Is planning treated as approval?
- Is exploratory work treated as canonical?
- Are assumptions presented as settled?

Classification:

- No false consensus
- Minor assumption drift
- Material assumption drift
- Blocking ambiguity

### 8. Shadow Authority Test

Prevent governance duplication.

Questions:

- Does this create a new authority source?
- Does it duplicate an existing governance function?
- Does it weaken repo-native authority?
- Does it create competing truth surfaces?

Classification:

- No authority risk
- Authority duplication risk
- Shadow authority risk
- Blocking authority conflict

## Required output

Use this exact output shape:

```markdown
# Adversarial Review Result

## Decision Posture

One of:

- Proceed
- Proceed with caveats
- Hold
- Escalate to founder
- Reject as out of scope

## Highest-Risk Finding

Single highest-risk concern.

## Findings

For each finding:

- Finding:
- Severity:
- Evidence:
- Why it matters:
- Required action:

## Module Results

- Authority Stress Test:
- Semantic Drift Test:
- Financial Boundary Test:
- Implementation Risk Test:
- Governance Consistency Test:
- Doctrine & Founder Intent Test:
- False Consensus Test:
- Shadow Authority Test:

## False Alignment Check

Where the work could appear aligned while remaining risky.

## Recommended Next Step

One of:

- Merge acceptable
- Merge after correction
- Run reconciliation
- Narrow ticket scope
- Founder review required
- Reject / reopen ticket
```

## Workflow placement

Default PR flow remains unchanged.

For high-leverage work, use:

```text
Implementation
-> Tests
-> PR Posture
-> Adversarial Review
-> Reconciliation
-> Merge
```

## Hard rules

- Do not approve work.
- Do not authorize work.
- Do not sequence work.
- Do not create governance truth.
- Do not replace reconciliation.
- Do not replace founder review.
- Do not promote exploratory material into repo authority.
- Do not treat a clean test result as semantic or governance alignment.
- Do not silently resolve conflicts between repo authority, active lane artifacts, connected tools, or memory.
- If the review finds missing authority, authority overreach, boundary breach, blocking ambiguity, or blocking authority conflict, choose `Hold`, `Escalate to founder`, or `Reject as out of scope`.
