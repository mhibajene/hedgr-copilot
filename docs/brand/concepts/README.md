# Hedgr Concept Registry

## Purpose

The Hedgr Concept Registry preserves candidate institutional concepts, recurring narrative patterns, worldview evolution, and philosophy-adjacent language for Founder and HedgrOps review.

This registry is a governed review surface.

It does not automatically establish doctrine, product positioning, public messaging, investor narrative, execution authority, ADR authority, or repo truth.

Concepts enter this registry as review artifacts only.

---

## Relationship to Hedgr Vault

The Hedgr Vault is the primary surface for founder thinking, institutional memory, exploratory notes, reflections, concept fragments, and cognitive development.

The Concept Registry is the repo-native review surface where selected concepts may be structured for evaluation.

Vault notes are evidence.

Registry entries are candidate review artifacts.

Repo-native governance determines whether any concept becomes accepted narrative, doctrine, product positioning, or public language.

---

## Relationship to Obsidian Canvas

Obsidian Canvas may be used to visualize concept relationships as Hedgr's institutional knowledge grows.

Canvas relationships are interpretive until reviewed.

The Narrative Steward may propose canvas connections but must not treat canvas structure as authority.

Canvas connections should be treated as institutional knowledge graph proposals, not doctrine.

Accepted concepts and accepted relationships may later be reflected in Obsidian Canvas after Founder / HedgrOps review.

---

## Registry Principles

The Concept Registry values:

- institutional memory over ad hoc inspiration
- repeated evidence over isolated language
- reviewability over polish
- traceability over persuasion
- contradiction preservation over narrative neatness
- concept maturity over content output

A concept should not appear mature simply because it is well-written.

A concept should appear mature only when evidence supports maturity.

---

## Concept Maturity Ladder

Concepts must use the maturity ladder defined in `docs/agents/skills/codex-narrative-steward.md`:

1. Signal
2. Emerging Pattern
3. Recurring Theme
4. Candidate Narrative
5. Accepted Narrative / Doctrine

Narrative Steward may classify concepts only up to Candidate Narrative.

Only explicit Founder decision and repo-native governance may establish Accepted Narrative, Doctrine, Product Positioning, Public Messaging, ADR authority, or Execution Authority.

---

## Source Classes

Every concept artifact must classify sources using the Narrative Steward source classes:

- Repo Authority State
- Hedgr Vault Context
- Support Context
- Review Evidence
- Candidate Narrative Outputs

These source classes must not be collapsed.

Recurring language across Vault and repo artifacts may indicate a pattern, but it does not establish authority.

---

## Standard File Naming

Candidate concept files should use lowercase kebab-case:

```text
docs/brand/concepts/<concept-slug>.md
```

Examples:

```text
docs/brand/concepts/governed-determinism.md
docs/brand/concepts/calibration-principle.md
docs/brand/concepts/institutional-memory.md
docs/brand/concepts/financial-fidelity.md
```

Template files should use a leading underscore:

```text
docs/brand/concepts/_candidate-concept-template.md
```

---

## Default Review Path

1. Narrative Steward observes explicitly scoped artifacts.
2. Sources are classified.
3. Patterns are extracted with evidence.
4. Contradictions and weak signals are preserved.
5. Maturity and sensitivity are assigned.
6. A candidate concept artifact is drafted.
7. Founder / HedgrOps reviews the artifact.
8. Accepted changes, if any, flow through repo-native governance.
9. Canvas connections may be manually reflected in the Hedgr Vault after review.

---

## Authority Boundary

Concept Registry entries are non-authoritative unless explicitly accepted through Founder decision and repo-native governance.

A registry entry does not:

- establish doctrine
- approve product positioning
- authorize implementation
- activate tickets
- create ADRs
- publish public messaging
- override repo authority
- mutate the Hedgr Vault
- establish investor narrative
- create institutional authority

---

## Governance Warning

Concept laundering is a specific risk.

Concept laundering occurs when exploratory founder language, Vault notes, Codex synthesis, or repeated phrasing is made to appear more mature, authoritative, or accepted than the evidence supports.

All registry entries must preserve uncertainty, contradiction, source class, and review status.
