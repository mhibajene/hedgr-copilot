## Repo authority

The current Repo Authority Projection is **CURRENT / COMPLETE** at commit `4fb1547`. Active parent tickets remain `CLASS-A-VAL-002` in Lane V and `SE-REASON-001` in Lane E. The previous in-product About and product-convergence tickets are completed historical authority, and **there is currently no active nested Lane V refinement**.

That gives us a clean governance position: the new external About Hedgr surface can be proposed as a **new bounded nested Lane V outcome under `CLASS-A-VAL-002`**, but the conversation and Bridge cannot activate it. The Repo Steward must record the successor ticket and exact file/surface scope in `HEDGR_STATUS.md` or the applicable repo-native authority surface before code begins.

Participant distribution remains paused and the canonical Form/protocol remain unchanged. This implementation must not change either.

**Review evidence is evidence, not direction.**

---

# HedgrOps disposition: APPROVE FOR REPO-NATIVE ACTIVATION

**Disposition:** **RETAIN AND ACTIVATE AS A BOUNDED IMPLEMENTATION OUTCOME**

**Authority label:** **Founder-approved direction; repo-native activation required before implementation**

**Execution class:** **Class A, informational / simulated only**

**Decision lane:** **Green**, provided the implementation remains entirely within the supplied brief and introduces no new external capability, sensitive-data posture, financial execution, or material public claim.

**ADR requirement:** **No new ADR recommended at this stage.** This is a reversible presentation/content implementation and does not alter architecture, execution authority, custody, liquidity, allocation semantics, or doctrine. If scoping reveals one of those changes, stop and reclassify rather than stretching this disposition.

---

# Proposed repo-native outcome

### Working ticket

**`CLASS-A-VAL-002-ABOUT-EXTERNAL-001`**

The identifier is **proposed, not authoritative**. The Repo Steward should adopt or replace it according to current repo sequencing conventions.

### Outcome

Implement the approved **About Hedgr v0.3** content baseline as a calm, accessible, mobile-first external thesis surface that:

- provides materially greater explanatory depth than the production orientation;
- preserves the existing MVP journey and in-product About surface unchanged;
- communicates current simulated capability truthfully;
- distinguishes enduring product intent from current capability and future system design;
- enables subsequent reader-comprehension research without embedding or altering the governed feedback process.

### Highest-value uncertainty

**Can the approved thesis narrative survive implementation without visual presentation, metadata, navigation or surrounding UI changing its meaning, overstating Hedgr's current capability, or recreating the complexity deliberately removed from the production experience?**

This implementation pass tests **rendered narrative fidelity**, not whether the thesis itself should be reopened.

---

# Scope

## In scope

The implementation may include:

- one external long-form About Hedgr surface;
- all eight approved sections, in their approved order;
- governed Hedgr typography, colour, spacing and existing approved assets;
- responsive mobile and desktop presentation;
- semantic HTML and accessible heading structure;
- keyboard-accessible navigation if navigation is used;
- page metadata, description and social preview content consistent with the body copy;
- restrained explanatory visuals only where they materially improve comprehension and preserve the stated capability boundary;
- local or repo-native automated checks appropriate to the existing frontend;
- implementation documentation/status updates required by repo governance.

## Explicitly out of scope

Do **not** alter:

- `/orientation`;
- the production in-product About surface;
- the existing MVP product journey;
- the frozen narrative sources;
- participant distribution posture;
- canonical feedback Form;
- participant protocol;
- research exposure rules;
- balance arithmetic;
- allocation semantics;
- Stability Engine behaviour;
- backend services;
- money movement;
- account capability;
- custody;
- deposits or withdrawals;
- conversion;
- provider integrations;
- automated allocation;
- yield routing;
- financial execution of any kind.

Also excluded:

- recruitment CTA;
- deposit CTA;
- earnings/yield CTA;
- waitlist CTA;
- promotional conversion funnel;
- new category claims;
- crypto-category positioning;
- implied guarantees;
- financial-advice language.

The pre-existing em dash issue in the in-product About copy remains a **separate outcome** and must not be smuggled into this implementation.

---

# Content authority

The supplied **About Hedgr Final pre-implementation brief v0.3** is the controlling content baseline for this ticket.

During implementation, copy is **frozen by default**.

Permitted without renewed founder content disposition:

- technically necessary punctuation/encoding corrections that do not change meaning;
- accessible markup;
- line wrapping;
- typographic presentation;
- metadata derived faithfully from the approved text.

Not permitted without escalation:

- rewriting headlines;
- tightening copy;
- adding explanatory sentences;
- removing limitations;
- introducing claims;
- changing “research and product testing” posture;
- changing descriptions of current capability;
- inserting promotional language;
- changing the relationship between Stability Wallet and Stability Engine.

If the rendered experience exposes a narrative problem, record it as evidence and return it for disposition. **Do not silently solve a content issue in code.**

---

# Required implementation scoping before code

The Repo Steward should record these items explicitly as part of activation:

| Field | Required disposition |
|---|---|
| **Ticket** | New bounded nested Lane V ticket under the active `CLASS-A-VAL-002` parent, subject to repo confirmation |
| **Owner** | Named implementation owner/operator |
| **Destination repo** | Must be explicitly recorded |
| **Route** | Must be explicitly recorded, not inferred from this brief |
| **Hosting/publication surface** | Must be explicitly recorded |
| **File scope** | Exact content, presentation, metadata and test files |
| **Entry path** | How a reviewer reaches the page |
| **Exposure posture** | Review-only or externally reachable before publication decision |
| **External links** | Explicit allowlist only |
| **Tests** | Existing relevant local/CI checks plus page-specific validation |
| **Rollback** | Bounded revert of the named implementation files |
| **Publication authority** | Separate founder disposition after rendered review |

I recommend **review-only exposure as the default activation posture**. Publication is a separate decision already preserved by the approved brief.

---

# Deliverable

A rendered external About Hedgr experience implementing the v0.3 baseline with:

1. all eight sections in approved order;
2. no former research-question section;
3. simulation and capability boundaries present in the narrative;
4. current-state limitations materially visible rather than relegated to a footer or disclosure mechanism;
5. governed Hedgr brand application;
6. responsive mobile/desktop behaviour;
7. accessible semantic structure;
8. metadata and social-preview copy that make no broader claim than the page;
9. no live external dependency introduced into CI;
10. a technical verification report distinct from future reader-comprehension evidence.

---

# Acceptance gates

### Gate A: content fidelity

Pass only if the supplied v0.3 copy is represented faithfully and no uncontrolled narrative changes have entered through headings, captions, metadata, navigation labels, visuals or supporting UI.

### Gate B: capability truth

Pass only if a first-time reader is not given reason to infer that Hedgr currently holds or moves customer money, opens accounts, provides live deposits or withdrawals, performs conversion, automatically allocates funds, manages investments or routes live yield.

### Gate C: presentation

Pass if the experience is readable, calm and usable on representative mobile and desktop sizes, with comfortable line length, semantic headings, accessible contrast and keyboard accessibility where interactive elements exist.

### Gate D: technical

Relevant existing repo checks and new bounded checks pass. No unapproved live external dependency is introduced into CI.

### Gate E: scope integrity

Diff remains within the activated file scope. No product journey, engine, backend, research protocol, Form or participant exposure change is bundled into the implementation.

### Gate F: current-state reconciliation

Immediately before publication review, every current-state statement must be compared against then-current `HEDGR_STATUS.md`, `AGENTS.md` and accepted ADRs.

A mismatch is **not** a copy tweak. It returns to content/governance disposition.

---

# Success and failure signals

**Implementation success** means the rendered experience makes the approved argument easier to consume without altering what it claims, maintains the simulated/current-state boundary, and remains visibly distinct from the operational MVP journey.

**Implementation failure** includes any of the following: visual treatment makes the page feel like a live financial product offer; metadata overstates capability; a diagram implies real allocations or infrastructure; implementation adds new thesis claims; current limitations become less salient; the surface starts functioning as a conversion funnel; or implementation requires modifying production orientation to make the external page work.

Technical completion alone does **not** demonstrate reader comprehension. The brief correctly preserves that distinction.

---

# Risks and stop conditions

Stop the affected implementation and return for disposition if:

- exact repo authority cannot be recorded;
- route/hosting requires material architecture outside existing patterns;
- publication requires a new provider or external service;
- implementation implies live financial capability;
- content requires a material rewrite to fit the chosen design;
- metadata creates stronger claims than the approved body;
- a visual creates false balance, allocation, custody or execution semantics;
- work touches the frozen product journey or research protocol;
- scope expands into data collection;
- the ticket begins changing doctrine or narrative authority;
- current repo truth contradicts a current-state sentence.

Green ambiguity about ordinary spacing, responsive behaviour, semantic markup or established component use may be resolved reversibly within the activated file scope.

---

# Rollback

Rollback should be a **single bounded revert of the named implementation files** restoring the pre-ticket state.

The outcome must not create migrations, persisted user data, backend coupling, engine state, provider dependencies or other residue that prevents clean removal.

This is one reason the proposed outcome remains Green/Class A.

---

# Responsibility

**Founder:** controls material content change and publication.

**Repo Steward:** reconciles and records the exact ticket, nesting, destination, file scope, exposure posture and repo-native authority.

**Implementation operator / Codex:** implements and verifies strictly within recorded authority.

**Human Narrative Lead:** reviews the rendered surface for fidelity, natural rhythm, readability and inadvertent claim drift.

**HedgrOps:** governance assurance, boundary checking and post-implementation disposition.

---

# Activation disposition

### Founder disposition

**APPROVED TO PROCEED TO REPO-NATIVE ACTIVATION AND BOUNDED IMPLEMENTATION.**

The content baseline is accepted for implementation handoff. No further thesis-development cycle is required before scoping.

### Repo activation condition

Implementation may begin **only after** the Repo Steward records a new bounded implementation ticket and the items required by §5 of the approved brief, including exact repository, route, file scope, exposure posture, tests and rollback.

At the current authority snapshot, that activation **has not yet occurred**.

### Publication disposition

**NOT YET AUTHORISED.**

Successful implementation should return as a rendered review artefact with:

**technical verification → narrative-fidelity review → current-state reconciliation → founder publication disposition.**

No additional research or product testing is required merely to complete the implementation review. Reader-comprehension testing resumes only through the separately governed research process.

---

## Next action

Hand the following instruction to the Repo Steward:

> **Record a bounded Class A / Green nested Lane V implementation proposal for the approved About Hedgr v0.3 external thesis surface. Preserve the existing `CLASS-A-VAL-002` journey, frozen narrative, research protocol, Form and all financial execution boundaries. Name the destination repository, route, hosting/exposure posture, exact file scope, tests and rollback before activation. Default the completed implementation to review-only. Publication remains founder-controlled.**

Once that repo-native activation is recorded, the implementation brief can be translated directly into Cursor/Codex execution without another round of thesis design.