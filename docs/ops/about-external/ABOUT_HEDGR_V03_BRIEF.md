# About Hedgr
## Final pre-implementation brief

**Version:** 0.3  
**Status:** Content development complete for implementation scoping  
**Owner:** Founder, with Codex coordinating the handoff  
**Review inputs:** Repo Steward and Human Narrative Lead advisory reviews  
**Authority:** This brief does not activate implementation or authorise publication.

### 1. Intended outcome

Create a considered external thesis surface that explains why Hedgr exists, what financial stability means within its product philosophy, how the proposed system approaches that problem, and what exists today.

The surface should provide greater depth than the in-product introduction while remaining understandable to a first-time reader.

The primary audience is people navigating currency uncertainty, especially savers, freelancers and people with variable or cross-border income. No specialist financial or infrastructure knowledge is assumed.

### 2. Content decisions

The following decisions control the implementation handoff:

- Lead with the human financial need and Hedgr’s role.
- Retain the established headline: “Build financial stability when your currency is unpredictable.”
- Preserve financial stability as the enduring aim. Do not reduce it to explanation alone or imply that the current experience delivers protection.
- Introduce the Stability Wallet and Stability Engine only after their purpose is understandable.
- Remove crypto-category framing and unnecessary infrastructure examples from the thesis.
- Preserve timely, truthful disclosure of material risks, limitations and current capability.
- Use no em dashes. Follow the institution’s adopted standards for plain language, natural rhythm and explanation before terminology.
- Avoid “safe action,” “safer decisions,” guarantees and advice implications.
- State the simulated experience boundary near the beginning and explain it fully in the current-stage section.
- Remove the former “What we are still learning” section. Research questions belong in the separately governed feedback process.
- Retain the statement that technical progress does not establish comprehension.
- Add no recruitment, deposit, earnings, waitlist or other promotional call to action.

Removing the research section does not establish that the current form covers every omitted question. This brief does not change the form, participant protocol or distribution posture.

### 3. Final page copy

The numbered headings below establish the content order. Internal brief metadata must not appear on the eventual page.

## 01. Hedgr, simply

### Build financial stability when your currency is unpredictable.

When the money you rely on becomes less predictable, paying bills, saving and planning ahead become harder.

Hedgr is being built to help people understand where they stand financially, what could affect that position, and what may limit their access to money.

The aim is to make the financial picture clearer before someone decides what to do next.

Today, Hedgr is in research and product testing. The experience uses simulated information and does not hold or move real customer money.

## 02. The problem

### The same balance may not buy the same things tomorrow.

People can work hard, save consistently and plan carefully, yet still face uncertainty about what their money will mean for them later.

A balance tells only part of that story. What it can buy may change. Access may be limited. Alternatives may introduce costs, risks or unfamiliar decisions.

Understanding those choices can become another burden.

Hedgr starts with the person trying to make sense of that situation. What do they have? What has changed? What matters for the position they are trying to build?

Those questions should be understandable without specialist financial knowledge.

## 03. What we mean by stability

### Stability means more than a balance.

For Hedgr, financial stability concerns what money can buy over time, whether it remains accessible, and whether its risks and limitations are understood.

These are qualities we are designing around. Hedgr does not guarantee purchasing-power preservation, access or outcomes.

The experience is designed to help people work through four questions:

**Where do I stand?**  
Understand the financial position represented in the experience.

**What could affect that position?**  
Understand relevant changes, risks and uncertainty.

**What may limit access?**  
Understand the conditions that could affect when and how value becomes available.

**What can I consider next?**  
Understand the available options after the financial picture is clear.

Making these questions easier to understand is a contribution toward stability. Understanding a risk does not remove it.

## 04. The Hedgr approach

### Start with the financial picture.

Hedgr is designed to bring position, change and explanation into a clear sequence.

Someone should be able to see what they have, understand what changed, and consider what that means for them. Any next step should follow that understanding.

The first experience we are building is the **Stability Wallet**. It provides a place to explore a financial position and the factors that may affect it.

The wider system includes a **Stability Engine**, the framework at the centre of Hedgr’s approach to interpreting stability and risk.

In the current experience, its information is explanatory. It does not move money or automatically allocate funds. Allocation illustrations do not represent money moved into separate accounts.

The broader aim is to carry more of the complexity within the system while keeping the person’s choices and understanding central.

## 05. What guides Hedgr

### Preservation before growth

Protecting existing value comes before seeking growth. Potential returns must remain subordinate to risk and access.

### Access matters

Understanding a financial position includes understanding what may limit access to it. A number on a screen cannot answer that question alone.

### Risk stays visible

Simple language should help people understand uncertainty, costs and limitations. It should never make those things disappear.

### Calm supports judgement

Hedgr should give people room to understand their situation without pressure to act. Waiting or doing nothing can be a valid choice.

### Understanding comes before action

The experience should clarify the position and available options while leaving judgement with the person.

## 06. What simplicity must preserve

### A simple experience still needs to explain what matters.

People should be able to understand what Hedgr can do, what it cannot do, and what remains uncertain.

Where a financial capability is introduced, the explanation must address the questions that matter: where value is held, who controls it, what costs and risks apply, and what could affect access.

Information needed for a decision must be available when that decision is made.

Deeper technical explanations have a place when they help someone understand a mechanism or assess a limitation. The everyday experience should make the financial meaning clear first.

Simplicity is a responsibility to explain clearly.

## 07. Where Hedgr is today

### A working experience, still in research and product testing.

Hedgr has progressed from an initial thesis into a working MVP that makes the proposed experience tangible.

It uses simulated information. It does not hold or move real customer money, open financial accounts, or provide financial advice.

It does not provide live custody, real deposits or withdrawals, live currency conversion, automated allocation, investment management or live yield routing.

The work makes it possible to examine how the experience presents financial position, change, risk and available next steps.

Technical progress does not establish that people understand Hedgr as intended. That remains a question for research.

Future capabilities remain separate from what the current experience provides.

## 08. The purpose

Hedgr is being built to help people navigate financial uncertainty with a clearer understanding of their position, the risks they face and the factors that may affect access to their money.

Financial stability remains the aim.

Understanding comes before the next decision.

---

### 4. Presentation requirements

The implementation should support a calm, readable, mobile-friendly long-form page.

Use the governed Hedgr brand system, typography, colours and existing approved assets. Establish hierarchy through spacing, type and restrained emphasis.

Keep the reading sequence intact. The simulation statement and material limitations must remain visible within the narrative, rather than being relegated to a footer, tooltip or collapsed disclaimer.

Use semantic headings, accessible contrast, comfortable line lengths and keyboard-accessible navigation wherever navigation is included.

Visuals are optional. Any proposed visual must explain an idea without suggesting live balances, executed allocations, guaranteed outcomes or deployed infrastructure.

Page title, description, social previews and any navigation labels must preserve the same claims and capability boundaries as the body.

### 5. Implementation scope to record before code

The Repo Steward should translate this brief into a bounded repo-native proposal that names:

- The ticket, authority class, owner and lane arrangement.
- The destination repository, route and intended hosting surface.
- The exact content, presentation and test files.
- How the page is reached and whether it remains review-only before publication.
- Required checks, review evidence and rollback.
- Any authorised links to the product or feedback form.

These are implementation-scoping decisions. This brief does not select a route, domain, framework or new lane.

The scope must preserve the existing product journey, `/orientation`, in-product About surface, research exposure rules, form, participant protocol and frozen narrative sources. The previously identified em dash in the existing in-product About copy is a separate issue.

No engine behaviour, money movement, account capability, allocation semantics, backend service, provider integration or financial capability is part of this outcome.

### 6. Acceptance criteria

The eventual implementation is ready for review when:

1. All eight sections appear in the approved order with the supplied copy.
2. The former research-question section is absent.
3. No customer-facing em dashes, crypto-category framing, invented category claims or safety guarantees have been introduced.
4. Current simulated capability is clearly distinguished from enduring intent and future capability.
5. Presentation, metadata and visuals preserve the meaning and limitations of the copy.
6. Mobile, desktop and accessibility checks confirm a readable and usable page.
7. Relevant existing checks and required hosted checks pass with no live external dependency introduced into CI.
8. The change remains within the named file scope and can be rolled back through a bounded revert.
9. Technical verification is reported separately from reader-comprehension evidence.

Current-state sentences must be checked against repo truth immediately before publication. Any material mismatch should return for content disposition.

### 7. Handoff and authority

Codex owns consolidation and coordination. The Repo Steward owns the proposed repo-native scope and authority reconciliation. The Human Narrative Lead reviews the rendered result for narrative fidelity and readability. Founder disposition remains controlling for material content changes and publication.

The next step is to prepare the explicit repo-native implementation outcome from this brief. Implementation begins only once its scope and authority are recorded.

**Content baseline complete for handoff. Implementation and publication remain separate decisions.**