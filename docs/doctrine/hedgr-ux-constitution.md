# Hedgr UX Constitution

# Hedgr UX Constitution

**Status:** Canonical Doctrine (UX / Trust / Interaction Posture)
**Authority:** Subordinate to repo-native governance and active brand-system authority surfaces
**Related Governance Surfaces:** docs/brand/, DESIGN.md, HEDGR_UI_APPLICATION_RULES.md, HEDGR_BRAND_QA_CHECKLIST.md

**“Designing for Trust in Volatile Economies”**

---

## Doctrine Boundary

This document defines Hedgr’s UX and interaction doctrine.

It establishes trust, behavioral, and interaction principles for the Hedgr product system.

It does not function as a standalone visual-design authority.

Governed visual systems, design tokens, brand application constraints, and UI implementation standards remain subordinate to repo-native brand governance surfaces including:

- docs/brand/
- DESIGN.md
- governed UI application rules
- approved design-system artefacts
- repo-native QA and reconciliation governance

Where visual or implementation ambiguity exists, governed repo-native brand artefacts override interpretive UX extrapolation.

---

## **0. The Hedgr UX Mission**

Hedgr is not designed to move money faster.

Hedgr is designed to help people **keep and grow what they already have — safely**.

Our UX exists to:

- Reduce financial anxiety
- Make risk legible
- Empower restraint as much as action
- Earn trust before asking for belief

If a design increases urgency, confusion, or pressure, it is wrong — even if it converts.

---

## **1. Trust Is the Primary Interface**

**(Pillar: Security & Trust)**

Trust is not a feature.

It is the *default state* of the product.

### **We design so that:**

- Users always know **where their money is**
- Users always understand **what their money is doing**
- Users always know **how to exit**

### **Therefore:**

- Status is shown before action
- Risk is named explicitly, never implied
- “Nothing happening” is an acceptable and visible state

**Anti-patterns we ban**

- Hidden mechanics
- Silent background changes
- Optimistic framing without downside

> If a user must “trust us” instead of “verify for themselves,” the UX has failed.
> 

---

## **2. Safety Over Speed**

**(Pillars: Security & Trust, Regulatory Awareness)**

In volatile economies, speed without clarity is dangerous.

### **We design so that:**

- The safest action is always clear
- Waiting is a valid and supported outcome
- Slower flows are acceptable if they reduce mistakes

### **Therefore:**

- No irreversible actions without clear confirmation
- No auto-defaults that commit funds
- No dark patterns that exploit urgency

**Design test**

> Would this still feel responsible if the user lost their phone, signal, or income tomorrow?
> 

If not, redesign it.

---

## **3. Advisory, Never Directive**

**(Pillars: Education & Empowerment, User-Centricity)**

Hedgr does not command.

Hedgr advises.

### **We design so that:**

- The product explains *why*, not just *what*
- Recommendations are contextual, optional, and reversible
- Silence is allowed when action is unsafe

### **Therefore:**

- The Copilot recommends, never instructs
- Every recommendation includes reasoning
- “Do nothing” is a first-class UX outcome

**Hard rule**

> Hedgr may recommend
> 
> 
> *not*
> 

> This must be visible in the UI, not buried in policy.
> 

---

## **4. Simplicity Is a Moral Obligation**

**(Pillar: Simplicity & UX)**

Complexity transfers risk to the user.

That is unacceptable.

### **We design so that:**

- A first-time user can explain Hedgr to a friend
- No screen requires prior crypto knowledge
- Every term earns its place

### **Therefore:**

- Plain language over technical accuracy
- Fewer screens over clever abstractions
- Explanation before interaction

**Banned from primary UI**

- DeFi jargon
- Trading metaphors
- Competitive yield language

> If a feature needs a glossary, the UX is incomplete.
> 

---

## **5. Calm Is a Feature**

**(Pillars: Simplicity & UX, Trust)**

Financial products should lower stress, not amplify it.

### **We design so that:**

- The interface feels stable even when markets are not
- Visuals signal safety, not excitement
- The user never feels rushed

### **Therefore:**

- Muted, disciplined color usage
- One primary action per screen
- Typography over decoration
- Brand-token usage follows governed design-system constraints
- UI emphasis is restrained, sparse, and intentional
- Visual hierarchy must reinforce institutional trust posture

**Explicit bans**

- Flashing indicators
- Confetti, celebration for yield
- Red/green emotional manipulation
- Speculative or casino-style visual metaphors
- Aggressive conversion-oriented CTA styling
- Decorative gradients or hype-oriented motion systems
- Visual treatments inconsistent with governed brand posture

> Hedgr should feel closer to a vault than a trading floor.
> 

---

## **6. Local Reality Shapes the Experience**

**(Pillar: Localized Go-to-Market)**

We do not design for “global crypto users.”

We design for **real people in volatile economies**.

### **We design so that:**

- Examples reflect real expenses (rent, school fees, fuel)
- Copy respects economic pressure
- UX works on low-end devices and unstable networks

### **Therefore:**

- Mobile-first is not optional
- Offline failure states are graceful
- Copy avoids assumptions of privilege

**Design test**

> Would this make sense to a freelancer checking their savings during a power cut?
> 

If not, it’s not Hedgr UX.

---

## **7. Verifiability Beats Promises**

**(Pillars: Security & Trust, Scalability)**

We don’t ask users to believe us.

We show them.

### **We design so that:**

- History is visible and readable
- Actions leave clear receipts
- Proof is accessible, not hidden

### **Therefore:**

- Timelines over charts
- Records over animations
- Verifiable states over marketing claims

> “Trustless” is not a crypto term here — it is a UX outcome.
> 

---

## **8. Growth Must Never Compete With Protection**

**(Pillars: Sustainable Yield Generation, Trust)**

Yield is secondary to preservation.

### **We design so that:**

- Growth is contextual, not foregrounded
- Risk-adjusted language is always present
- Loss is acknowledged as a possibility

### **Therefore:**

- No leaderboards
- No social comparison
- No “up to X%” framing without explanation

**Foundational belief**

> A user who doesn’t lose money will stay longer than one who earns fast and loses trust.
> 

---

## **9. Consistency Builds Confidence**

**(Pillar: Scalability)**

Consistency reduces cognitive load and error.

### **We design so that:**

- Similar actions behave the same everywhere
- Risk signals are consistent across flows
- Visual language does not shift unpredictably

### **Therefore:**

- Shared components over bespoke screens
- Reused patterns over novelty
- Change only with clear reason
- Governed design tokens are preferred over ad hoc styling
- Shared UI primitives must align with approved brand-system artifacts
- Brand consistency is treated as a trust and governance concern

## **9A. Brand Governance Alignment**

UX doctrine and visual governance are related but distinct.

This document governs interaction philosophy and trust posture.

Repo-native brand governance governs:

- design tokens
- visual implementation
- component styling
- logo usage
- typography systems
- color governance
- UI application constraints

This separation exists to prevent:

- aesthetic drift
- duplicate visual authority
- conflicting UI interpretation
- hype-oriented implementation behavior
- shadow design-system governance

If conflict emerges between UX interpretation and governed brand systems, repo-native brand governance wins.

---

## **10. UX Is a Safety System, Not Decoration**

**(All Pillars)**

UX is part of Hedgr’s risk management.

### **This means:**

- UX decisions are reviewed like security decisions
- Violations of this manifesto are bugs
- “Looks better” is not a valid justification

**Final rule**

> If a design improves conversion but weakens trust, it is rejected.
> 

---

## **Closing Standard (Non-Negotiable)**

Hedgr is not built to feel exciting.

It is built to feel **responsible, calm, and dependable** — especially when everything else is not.

This manifesto applies to:

- UI
- UX
- Governed visual systems
- Copy
- Copilot behavior
- Feature prioritization

Anything that violates it does not ship.

Visual calm, restraint, and institutional consistency are not aesthetic preferences inside Hedgr.

They are governance and trust requirements.

---