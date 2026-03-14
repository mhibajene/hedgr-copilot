# Hedgr MVP Project Specification

## Elevator Pitch

Hedgr is a DeFi-powered savings wallet built for users in volatile economies, enabling them to preserve and grow their wealth using stablecoins and DeFi yields. Seamlessly integrated with mobile money (starting with MTN) and underpinned by an AI Copilot, Hedgr brings financial stability and empowerment to mobile-first users in Africa.

## Problem Statement

Emerging markets suffer from local currency instability that erodes purchasing power and deters savings. Traditional banks and mobile wallets lack yield-generating or currency-hedging options, leaving users with limited means to preserve or grow their wealth.

## Target Audience

- Urban freelancers and young professionals
- Small business owners transacting in local currency
- Mobile-first savers who use MTN, Airtel, or Zamtel
- Financially-aware users seeking better savings alternatives

## Unique Selling Proposition (USP)

- Stablecoin savings in USDC, protecting against currency depreciation
- Passive DeFi yield via Aave, abstracted into a single "Save" button
- Custodial wallet via Magic.link for seamless onboarding
- Mobile-first UI with familiar metaphors and low cognitive load
- Optional AI Copilot providing financial education and FX-aware nudges

## Target Platforms

- Android App (v1): Prioritized due to dominant market share in SSA
- iOS App (v1): Launched concurrently or shortly after Android

## Features List

### Core Savings

- [ ]  As a user, I want to deposit ZMW via MTN and convert to USDC in one step.
- [ ]  As a user, I want to see real-time USD and ZMW equivalents.
- [ ]  As a user, I want to passively earn DeFi yield from Aave.

### AI Copilot

- [ ]  As a user, I want simple, chat-style guidance on DeFi savings.
- [ ]  As a user, I want nudges when FX rates change or I’m not saving.
- [ ]  As a user, I want to learn where my yield is coming from.

### On/Off Ramps

- [ ]  As a user, I want to withdraw USDC back to ZMW via MTN.
- [ ]  As an admin, I want to support manual cash-in/out flows during pilot.

### Trust Layer

- [ ]  As a user, I want to know who holds my funds (custodial model).
- [ ]  As a user, I want transparency on fees and security.
- [ ]  As a user, I want to see regulatory compliance efforts (e.g. sandbox badge).

## UX/UI Considerations

- **Screens**: Dashboard, Deposit, Withdraw, Learn, Profile
- **States**: Depositing, Earning, Withdrawing, Manual Review Required
- **Visual Feedback**: Animated progress bars, push notifications, success banners
- **Information Architecture**: Default to simplified views; deeper insights under "Learn More"
- **Language & Tone**: Friendly microcopy; ready for translation/localization

## Non-Functional Requirements

- **Performance**: Transactions complete in under 5 seconds (excluding on-ramp latency)
- **Scalability**: Architecture supports multi-country expansion and multi-token support
- **Security**: Custodial model with secure key management (Magic.link); DeFi protocol audits
- **Accessibility**: Android compatibility for 3G networks and sub-$100 smartphones

## Monetization

- Yield spread: e.g., user gets 6% APY, Hedgr takes 2%
- Small fixed fee on ZMW off-ramps, aligned with mobile money habits
- SME tier with higher caps and tailored AI support
- Longer term: Premium AI Copilot features or partner integrations

## Critical Questions or Clarifications (Resolved)

1. **MTN MoMo** will be prioritized for fiat on-ramp, with manual fallback flows enabled for pilot testing.
2. **Aave** will be used as the first DeFi yield protocol.
3. **Custodial wallet** approach will be used via **Magic.link**.
4. **WhatsApp UI** is deferred to Phase 2.
5. **USDC** is the stablecoin of choice for MVP.
6. **Regulatory strategy**:
    - Plan A: Apply to **Bank of Zambia Regulatory Sandbox**
    - Plan B: Pivot to **non-custodial** if required
    - Plan C: Geographic pivot to a **crypto-friendly jurisdiction**

## Features (MVP)

### Core Savings

Enable ZMW deposits via MTN, automatic USDC conversion on Polygon Mumbai, real-time USD/ZMW balances, and passive yield farming on Aave.

### Tech Involved

- Next.js UI (mobile/web)
- Python/Flask API
- Supabase (Postgres, hosted in South Africa; sensitive PII in Zambia)
- CoinGecko streaming via WebSocket + Redis pub/sub
- Aave contracts on Polygon Mumbai
- Magic.link (OTP login, DID Token/JWT)
- Custodial wallet vault
- Replit Secrets & python-dotenv

### Main Requirements

- MTN MFS integration with 12-hour SLA; daily reconciliation batch
- Real-time FX streaming (WebSocket feed; 1–2 s fallback polling)
- Audit-log schema (financial logs retained 7 years; chat logs 90 days)
- Idempotent deposit/convert/deposit flows
- Extensible multi-chain & yield-strategy selector

---

### AI Copilot

Chatbot delivering DeFi guidance, yield breakdowns, FX nudges, and behavior prompts.

### Tech Involved

- Next.js chat UI (WebSockets)
- Flask session orchestrator
- OpenAI GPT-4o mini API (max 5 concurrent, 1,800-token context)
- Supabase for session/context storage
- Firebase/Expo push notifications

### Main Requirements

- Concurrency cap: 5 sessions
- Smart context management: window rolling + auto-summarization
- Rate-limit & back-off for API calls
- Chat history retention: 90 days, then purge
- Nudge triggers via cron/webhook on FX swings & inactivity

---

### On/Off Ramps

USDC withdrawal to ZMW via MTN, with manual/admin fallback during pilot.

### Tech Involved

- Next.js request/dashboard UI
- Flask endpoints + Supabase queue
- Background worker (RQ/Celery)
- Admin Portal for manual payouts

### Main Requirements

- MTN payout API (or CSV upload) with 12-hour turnaround; daily reconciliation
- Lifecycle tracking (pending→completed→failed)
- Secure KYC data: sensitive fields stored in Zambia, others in South Africa with consent

---

### Trust Layer

Transparent custodial security, fee breakdowns, and compliance disclosures.

### Tech Involved

- Next.js compliance dashboard
- Flask fee-calc & audit endpoints
- Supabase metadata tables
- Static badges/documents for sandbox compliance

### Main Requirements

- Encryption in transit & at rest; key rotation every 90 days via Replit Secrets
- Dynamic fee microservice
- UI components for regulatory disclosures & sandbox badge

---

## Post-MVP Extensibility

### Additional Chains & Stablecoins

**High Priority:** Arbitrum, Optimism, Ethereum, Avalanche

**Other Considerations:** BNB Smart Chain, Solana

**Stablecoins:** USDT, DAI

### Aave Pools & Yield Strategies

- **Initial:** USDC (stablecoin) lending supply
- **Future:** multi-asset pools, variable borrow strategies

---

## System Diagram

```mermaid
graph LR
  subgraph Client
    A[Next.js Frontend]
  end

  subgraph API
    B[Flask Backend]
    J[Background Worker]
  end

  subgraph Services
    C[Supabase (ZA & ZA-Consented)]
    D[OpenAI GPT-4o Mini]
    E[CoinGecko WS]
    F[MTN API / Manual]
    G[Magic.link Auth]
    H[Polygon Mumbai / Aave]
    I[Admin Portal]
    K[Firebase/Expo Push]
    L[Sentry / Zabbix / Marble]
  end

  A -->|REST/WS| B
  B --> C
  B --> D
  B --> E
  B --> F
  B --> G
  B --> H
  B --> I
  B --> K
  B --> L
  J --> B
  J --> C
  J --> H

```

---

## Configuration & Constraints

- **Data Residency & Consent:** sensitive PII stored in Zambia; others in South Africa with explicit user consent logged in `user_consents`.
- **FX Streaming:** WebSocket via CoinGecko feed; fallback REST poll every 1–2 s; deltas only.
- **Mobile Testing:** Android 10+ (API 29+), iOS 13+; Firebase App Distribution & TestFlight for APK/IPA.
- **AML (Marble):** flag > USD 10 000 TX; > 3 TX/24 h or > 2×30-day avg; geo-anomalies; PEP/sanction screening.
- **Monitoring (Sentry/Zabbix):**
    - **Sentry:** > 5 new errors/hr → Alert
    - **Zabbix:** CPU > 80%/5 m warn, > 90%/2 m crit; Memory > 75%/warn, > 85%/crit; p95 latency > 500 ms warn, > 1 s crit
- **Secrets Rotation:** every 90 days; automated reminders + immediate on breach.
- **AI SLA:** p95 response < 1 s; < 0.1% monthly error rate; fallback to cached summary.
- **Offline Caching:** last FX rates & chat context in IndexedDB; queue outbound messages; disable new financial TX offline.

---

## **Features List**

### **Core Savings**

### **Deposit ZMW via MTN and convert to USDC in one step**

- **User Stories**
    - **Persona: Urban Freelancer**
        - *As a freelancer in Lusaka, I want to convert my MTN mobile money balance to USD instantly, so that I protect my income from kwacha depreciation.*
    - **Persona: Mobile-First SME Owner**
        - *As a small shop owner receiving local currency payments, I want to move surplus ZMW to USDC with one click, so I can safely store value.*
    - **Persona: Savvy Young Professional**
        - *As a professional paid in ZMW, I want to automate monthly savings in USDC, so that I don’t lose value over time.*

### **UX/UI Considerations**

- **Core Experience**
    - One-tap deposit with a ZMW input field.
    - Automatic FX preview before confirmation.
    - Confirmation screen showing USD received and next earnings date.
- **States**
    - Idle
    - FX rate loading
    - Processing transaction
    - Deposit success/failure
- **Visual Transitions**
    - Slide-in modal for deposit
    - Real-time FX rate animation pulse
    - Success tick animation with yield projection
- **Advanced Users & Edge Cases**
    - Option to view or input expected slippage
    - Manual override if FX rate moves before confirmation
    - Graceful failover if MTN service is temporarily unavailable

---

### **AI Copilot**

### **Simple, chat-style guidance on DeFi savings**

- **User Stories**
    - **Persona: Curious Beginner**
        - *As a first-time crypto user, I want to ask the AI simple questions about USDC and DeFi, so I feel confident.*
    - **Persona: Budget-Conscious User**
        - *As someone on a tight budget, I want the AI to suggest how much I can save each week, so I stay disciplined.*
    - **Persona: Learning-Oriented Saver**
        - *As a motivated learner, I want to understand how Aave works and where my yield comes from, so I trust the system.*

### **UX/UI Considerations**

- **Core Experience**
    - Chatbot-style UI within a fixed widget on Dashboard and Learn screen.
    - Predefined quick questions: “What is DeFi?”, “How is my savings performing?”
    - Dynamic alerts: “Kwacha lost 4% this week. Consider saving more.”
- **States**
    - Default idle
    - Listening for prompt
    - Typing response
    - Suggesting action
- **Visual Transitions**
    - Typewriter animation for bot responses
    - Slide-up cards for savings recommendations
    - Subtle pulse on FX alert nudges
- **Advanced Users & Edge Cases**
    - Can ask for breakdowns of earnings (e.g. by protocol or APY trend)
    - Option to export chat logs for financial tracking
    - Handles fallback when AI is unavailable with predefined educational flows

---

### **On/Off Ramps**

### **Withdraw USDC back to ZMW via MTN**

- **User Stories**
    - **Persona: Hustler Freelancer**
        - *As a freelancer who saved in USDC, I want to cash out to my MTN wallet when I need to pay rent or bills in ZMW, so I can access funds easily.*
    - **Persona: SME Paying Suppliers**
        - *As a shop owner, I want to convert some USDC savings back to ZMW when paying suppliers, so I maintain liquidity.*
    - **Persona: Emergency Saver**
        - *As a user facing urgent expenses, I want to quickly withdraw part of my USDC into ZMW, so I can handle emergencies.*

### **UX/UI Considerations**

- **Core Experience**
    - “Withdraw” button on dashboard leads to input screen.
    - Real-time conversion rate and fee preview.
    - MTN number confirmation and 2FA before release.
- **States**
    - Idle
    - Validating balance
    - Processing withdrawal
    - Confirmation (success/fail)
- **Visual Transitions**
    - Number pad entry animation
    - FX rate ticks with fee estimate
    - Success banner with “Funds Sent” checkmark
- **Advanced Users & Edge Cases**
    - Partial withdrawals or full balance
    - Warning if network issues prevent cash-out
    - Notifications for when FX rate improves (“Better to wait” nudge)

---

### **Support manual cash-in/out flows during pilot**

- **User Stories**
    - **Persona: Undigitized Cash User**
        - *As a user with only physical cash, I want to deposit through a Hedgr agent manually, so I can still use the app.*
    - **Persona: Rural Trader**
        - *As a rural seller, I want to call a number and request a cash withdrawal via agent, so I don’t need to rely on MTN.*

### **UX/UI Considerations**

- **Core Experience**
    - Chat prompt or “Manual Cash In/Out” CTA in the Withdraw screen.
    - Agent coordination via WhatsApp integration or call.
    - Ticket-based tracking system visible in app.
- **States**
    - Request initiated
    - Agent assigned
    - Waiting on confirmation
    - Completed
- **Visual Transitions**
    - WhatsApp handoff screen
    - Status progress bar with estimated time
    - SMS fallback if app is offline
- **Advanced Users & Edge Cases**
    - Support for group savings pools depositing via a single agent
    - Reversible transaction in case of agent no-show
    - Alerts on agent trust rating and nearest availability

---

### **Trust Layer**

### **Know who holds my funds (custodial model)**

- **User Stories**
    - **Persona: Trust-Sensitive Newbie**
        - *As a cautious user, I want to see who controls my money technically, so I understand the risk.*
    - **Persona: Crypto Skeptic**
        - *As someone skeptical of crypto, I want to see a human face or company behind custody, so I can feel safe.*
    - **Persona: Risk-Aware User**
        - *As a risk-conscious saver, I want to know if my funds are insured or audited, so I can decide how much to store.*

### **UX/UI Considerations**

- **Core Experience**
    - “Who Holds My Funds?” modal from Profile & Learn.
    - Visual breakdown of wallet architecture (e.g. Fireblocks + Magic.link).
    - Link to third-party audits and compliance docs.
- **States**
    - Idle
    - Loading disclosure content
    - Verified disclosures shown
- **Visual Transitions**
    - Expandable accordion for custody layers
    - Badge animations for “Audited”, “KYC’d”
    - Contact support CTA if further clarity needed
- **Advanced Users & Edge Cases**
    - Tech-savvy users see custody provider’s API integration status
    - View historical custody status (e.g. date of last audit)
    - Request a custody report export via email

---

### **Transparency on fees and security**

- **User Stories**
    - **Persona: Detail-Oriented User**
        - *As someone sensitive to fees, I want a clear breakdown of every deduction, so I don’t feel scammed.*
    - **Persona: Financial Nerd**
        - *As an advanced user, I want to understand smart contract risks and who audits them, so I can assess platform trust.*

### **UX/UI Considerations**

- **Core Experience**
    - Line-by-line breakdown shown before every transaction.
    - Learn screen hosts “Security & Risk” explainer and audits page.
- **States**
    - Default: basic overview
    - Expanded: full protocol/APY risk breakdown
    - Failure: fallback explanation with contact CTA
- **Visual Transitions**
    - Microcopy toggles between “Simple View” and “Deep Dive”
    - Animations for fee changes based on network congestion
    - Badges for “Gas subsidized by Hedgr” or “Third-party audit verified”
- **Advanced Users & Edge Cases**
    - Toggle for viewing gas fees, protocol cut, custody fee
    - Tooltip for each fee with reason (“Zambia mobile levy”, “Liquidity pool spread”)
    - Track historical effective fee % across savings/withdrawals

---

## **Hedgr Mobile App Design System**

## **Color Palette**

### **Primary Colors**

- **Stable Green** – #147A4D (Brand anchor: buttons, icons, confirmations)
- **Green Gradient Mid** – #47D98F (Brand extension for motion, backgrounds)
- **Pure White** – #FFFFFF (Primary surface and content backgrounds)

### **Secondary Colors**

- **Pale Mint** – #E8F7F0 (Backgrounds, info banners, field fills)
- **Warm Charcoal** – #1E1E1E (Dark mode primary)
- **Soft Gray** – #F2F4F6 (Forms, input backgrounds)

### **Accent Colors**

- **Sunbeam Yellow** – #FFD600 (Yield highlight, education nudges, banners)
- **Digital Indigo** – #4B51C3 (Interactive Copilot prompts, links, tabs)

### **Functional Colors**

- **Success Green** – #2E7D32 (Confirmations, positive alerts)
- **Warning Yellow** – #FBC02D (Mild risk/FX alerts)
- **Error Red** – #D32F2F (Errors, failed actions)
- **Neutral Gray** – #9E9E9E (Placeholder text, disabled buttons)

### **Background Colors**

- **Default Background** – #FAFAFA
- **Card Background** – #FFFFFF
- **Dark Mode Surface** – #121212

---

## **Typography**

### **Font Family**

- **Primary Font**: Inter (All platforms)
- **Fallback Font**: System Default (San Francisco / Roboto)

### **Font Weights**

- 400 – Regular
- 500 – Medium
- 600 – Semibold
- 700 – Bold

### **Text Styles**

### **Headings**

- **H1** – 28px / 36px, Bold, for major screens
- **H2** – 24px / 32px, Bold, for sections/cards
- **H3** – 20px / 28px, Semibold, minor headers

### **Body Text**

- **Body Large** – 16px / 24px, Regular
- **Body Regular** – 15px / 22px, Regular
- **Body Small** – 13px / 20px, Medium

### **Special Text**

- **Caption** – 12px / 16px, Medium, metadata
- **CTA Text** – 16px / 24px, Medium, Button Text
- **Link Text** – 15px / 22px, Medium, in Stable Green or Indigo

---

## **Component Styling**

### **Buttons**

### **Primary**

- BG: Stable Green #147A4D
- Text: #FFFFFF
- Height: 48dp
- Radius: 12dp
- Shadow: Soft elevation

### **Secondary**

- Border: 1.5dp Stable Green
- Text: Stable Green
- BG: Transparent
- Radius: 12dp

### **Ghost/Text**

- Text Only: Stable Green or Indigo
- No border/background
- For “Skip,” “Back,” etc.

### **Cards**

- BG: #FFFFFF
- Radius: 16dp
- Shadow: 1dp Y-offset, 6dp blur, 5% opacity
- Padding: 16dp

### **Input Fields**

- Height: 56dp
- Radius: 12dp
- Border: 1dp Gray (Neutral)
- Focus Border: 2dp Stable Green
- BG: Pale Mint or White
- Placeholder: Neutral Gray

### **Icons**

- Primary Icons: 24x24dp
- Navigation/Tab Icons: 28x28dp
- Color: Active – Stable Green, Inactive – Neutral Gray

---

## **Spacing System**

- **4dp** – Micro spacing
- **8dp** – Tight padding
- **16dp** – Default between elements
- **24dp** – Between sections
- **32dp** – Block spacing
- **48dp** – Page paddings / hero content

---

## **Motion & Animation**

- **Microinteractions** – 150ms ease-in-out
- **Screen Transitions** – 300ms custom spring (tension 240, friction 30)
- **CTA Feedback** – 100ms ripple effect or subtle scale
- **Copilot Nudges** – Slide-in with fade (300ms)

---

## **Dark Mode Variants**

- **Dark BG** – #121212
- **Dark Card** – #1E1E1E
- **Text Primary** – #FFFFFF
- **Text Secondary** – #B0BEC5
- **Stable Green Alt** – #2FE099 (adjusted for contrast)

---

## **Voice & Tone (UX Writing)**

- Simple, empowering, and respectful.
- Avoid jargon: use “Save securely” vs. “Deposit into smart contract.”
- Use active voice: “Start saving” > “Savings can be started.”
- Copilot: Supportive, conversational, and clear.

---

## Hedgr UI State Briefs

## Core Savings

### Screen: Deposit via MTN

### State 1: Idle

- Clean input form with "Amount in ZMW" field.
- FX preview module with animated pulse to indicate live rate.
- Primary CTA: "Convert to USDC" (Stable Green #147A4D, 48dp button).
- Input field: Pale Mint background, Stable Green focus border.
- Label: H3 header "Secure your savings" + Body Regular explainer.
- Navigation: back arrow (Neutral Gray), status bar in Stable Green.

### State 2: FX Rate Loading

- Animated FX module with shimmer effect.
- CTA temporarily disabled, shows "Loading rate..."
- Subtle loading spinner below FX module (Green Gradient Mid).

### State 3: Processing Transaction

- Full-screen overlay, Success Green spinner (physics-based spring animation).
- Subtext: "Processing your conversion securely..."

### State 4: Deposit Success

- Hero card: USDC icon, "K500 converted to $22.10 USDC" headline.
- Yield estimate banner: Sunbeam Yellow with "Next yield in 7 days".
- CTA: "Back to Dashboard" or "Set Auto-Save" (Secondary button).
- Success tick animation (scale + fade-in).

### State 5: Deposit Failed

- Error Red alert card with retry option.
- Copy: "Transaction failed due to MTN network issue. Try again."
- CTA: "Retry" (Primary button), "Cancel" (Ghost style).

---

## AI Copilot

### Screen: Dashboard Widget

### State 1: Idle

- Copilot icon (Digital Indigo) with speech bubble preview: "Ask me anything about saving."
- Tap to expand into chat panel.

### State 2: Listening for Prompt

- Expanded card overlay (Dark Mode Surface w/ white text).
- Placeholder: "Type your question..."
- Suggested chips: "What is DeFi?", "How much should I save?"

### State 3: Typing Response

- Typewriter animation on AI text.
- Animated dots for pending response.
- Background: Card White with Indigo border.

### State 4: Suggesting Action

- Slide-up recommendation card with Stable Green CTA: "Start a K50 weekly save?"
- Info icon with tooltip: "Based on your FX history and earnings."

### Edge Case: AI Unavailable

- Card in Soft Gray: "I’m offline right now. Learn more in the Education section."
- Link text: Digital Indigo, redirect to Learn tab.

---

## On/Off Ramps

### Screen: Withdraw to MTN

### State 1: Idle

- Number pad input screen, ZMW value field.
- FX preview + fees (animated tick).
- 2FA prompt for mobile number confirmation.

### State 2: Validating Balance

- Modal overlay: "Checking your balance..."
- Shimmer on balance field.

### State 3: Processing Withdrawal

- Progress bar with green-to-yellow gradient.
- Subtext: "Withdrawing securely to your MTN wallet."

### State 4: Withdrawal Success

- Banner: Success Green checkmark + "Funds Sent to +260970XXXXXX"
- CTA: "View Receipt" or "Return Home"

### State 5: Withdrawal Failed

- Red error card: "Network issue. Try later or contact support."
- CTA: "Retry" (Stable Green), "Contact" (Ghost/Text)

---

## Manual Cash Flows

### Screen: Manual Cash In/Out

### State 1: Request Initiated

- Simple chat interface: "Requesting Agent..."
- Modal with WhatsApp connect or call option.

### State 2: Agent Assigned

- Card: Agent name, Trust rating (stars), ETA estimate.
- Progress bar showing request status.

### State 3: Awaiting Confirmation

- Status card with countdown: "Agent will confirm in 2 mins."
- CTA: "Cancel Request" (Ghost/Text)

### State 4: Completed

- Green check card with details: amount, agent, time.
- CTA: "Rate Agent" or "Start New Request"

---

## Trust Layer

### Screen: Who Holds My Funds

### State 1: Idle

- Entry point: Profile > "Custody"
- Accordion UI: Fireblocks, Magic.link, Audit firms.
- Icons + short descriptions.

### State 2: Loading Disclosure

- Animated loading cards (fade shimmer).
- Message: "Fetching custody breakdown..."

### State 3: Disclosure Shown

- Verified badge (pulse-in animation).
- Disclosure content in H3/Bold + Body Regular text.
- CTA: "Request Report" (Secondary button).

---

## Transparency on Fees & Security

### Screen: Transaction Preview

### State 1: Default View

- Basic summary: "K500 > $22.10 USDC" + "Total Fee: K8.50"
- Tooltip: "Includes network and conversion fees."
- Toggle: "Deep Dive"

### State 2: Expanded View

- Line-item breakdown:
    - FX Spread
    - Custody fee
    - Gas subsidy
- Tooltip per line: Soft Gray popovers with Body Small text
- Banner: "Audited Smart Contract" with Digital Indigo link

### State 3: Failure to Load Fees

- Fallback card: Neutral Gray with "Fee info unavailable"
- CTA: "Retry" or "Continue Anyway"

---

# **Hedgr MVP Technical Specification**

*Version 0.4 (June 28, 2025)*

---

## **1. Executive Summary**

- **Project overview**
    
    Hedgr delivers inflation-proof savings to Zambian (and later emerging-market) users by converting ZMW → USDC on Polygon, earning yield on Aave, and coaching them with an AI Copilot. MVP ships as a mobile-first PWA and Capacitor-wrapped native app.
    
- **Objectives**
    1. **T-90 days** to ship audited pilot with ≤ 12 h ZMW settlement and ≤ 2 s FX latency.
    2. AI Copilot p95 ≤ 1 s, infra cost ≤ $300 / month at 5 000 MAU.
    3. Pass internal compliance review (AML, POPIA, GDPR) and prep SOC-2 evidence.
- **Key technical decisions**

| **Decision** | **Rationale** |
| --- | --- |
| **Next.js + React PWA (+ Capacitor wrapper)** | One codebase for web & stores; offline caching. |
| **Flask-SocketIO (Python 3.12)** | Fast to prototype; same language for RQ workers. |
| **Supabase Postgres (ZA + ZM shards)** | Managed, realtime, row-level security. |
| **Magic.link DID JWT auth** | OTP UX, wallet seed on day-1. |
| **Fireblocks MPC post-pilot** | Best-in-class key security once volumes justify cost. |
| **ERC-4337 Account Abstraction (future)** | Gasless UX, social recovery. |
| **Doppler vault** | Single source-of-truth + automated rotations via GitHub OIDC. |
- **High-level architecture**

```
graph TD
  A[Next.js PWA<br/>+ Capacitor] -- ws/rest --> B(Flask API)
  B -- SQL/Realtime --> C{Supabase<br/>ZA / ZM shards}
  B -- ws --> D(CoinGecko)
  B -- json-rpc --> E(Polygon & Aave)
  B -- rest --> F(MTN MoMo)
  B -- ws --> G(OpenAI GPT-4o mini)
  B -- rest --> H(Marble AML)
  B -- logs --> I(Sentry)
  B -- metrics --> J(Zabbix → Grafana)
  C --> K[Background Worker (RQ)]
  subgraph Secrets
    L[Doppler Vault]
  end
  style L fill:#4B51C3,color:#fff
```

---

## **2. System Architecture**

### **2.1 Overview**

| **Component** | **Responsibility** | **Scaling** |
| --- | --- | --- |
| Next.js PWA (+ Capacitor) | UI, offline queue, push | Vercel CDN + App/Play stores |
| Flask API (Gevent) | REST, WebSocket gateway | Fly.io autoscale |
| RQ Worker | MTN reconciliation, Aave calls | Dedicated Fly worker |
| Supabase ZA | Core data | 2 vCPU/4 GB, PITR |
| Supabase ZM | PI-sensitive tables | Same spec, peered VPN |
| Redis (Upstash) | FX cache, chat embeddings | 1 GB, upgrade to cluster |
| Doppler | Vault + rotations | SaaS |
| Monitoring | Sentry + Zabbix + Grafana | Slack alerts |

### **2.2 Technology Stack**

| **Layer** | **Tech** |
| --- | --- |
| **Frontend** | Next.js 14 (App Router), React 18, Tailwind 3, Headless UI, Capacitor 6 |
| **Backend** | Python 3.12, Flask-SocketIO, web3.py, Aave v3 SDK, RQ |
| **Data** | Supabase Postgres 15, Supabase Storage, Redis 6 |
| **Auth/Wallet** | Magic.link DID JWT → Fireblocks MPC (post-pilot) |
| **Blockchain** | Polygon Mumbai → mainnet → Arbitrum/Optimism/Eth/AvaX |
| **AI** | OpenAI GPT-4o mini (1 800 tokens), tiktoken, embeddings cache |
| **DevOps** | GitHub Actions, Fly.io, Doppler, Docker, pnpm + Turborepo |
| **Observability** | Sentry, Zabbix, Grafana, Slack channel #hedgr-infra |

---

## **3. Feature Specifications**

> Each feature block below contains user stories, acceptance criteria, tech details, and edge-case handling.
> 

### **3.1 Core Savings**

- **User stories**
    - *As a student, I deposit K100 via MTN and see USDC balance within a day.*
    - *As an SME owner, I want my funds auto-earning yield without crypto jargon.*
- **Acceptance criteria**
    - ZMW → USDC complete in ≤ 12 h.
    - FX preview updated ≤ 2 s.
    - Aave supply tx logged; audit row created.
- **Implementation**
    1. POST /deposits stores *pending* row (idempotent by txn_ref).
    2. RQ job invokes MTN API → waits webhook.
    3. On confirmation, swap via 0x (Mumbai) → supply to Aave.
    4. Broadcast Supabase Realtime channel user:<id>.
    5. Redis FX cache TTL 1 s.
- **Edge cases**
    - MTN duplicate callback → ignore (status idempotency).
    - Gas > 50 gwei → queue until cheaper (max 3 h).
    - Swap slippage > 0.5 % → abort & refund.

### **3.2 AI Copilot**

- **User stories**
    - Ask “What is DeFi?” and get answer in < 1 s.
    - Receive push nudge when USD/ZMW swings > 3 %.
- **Acceptance criteria**
    - Concurrent session cap 5 → 429 if exceeded.
    - 90-day chat retention then purge.
- **Implementation**
    - WebSocket /chat.
    - Message queue with context windowing & auto-summary at 1 500 tokens.
    - Redis semantic cache (SHA-256 prompt key).
- **Edge cases**
    - OpenAI 5xx → retry (3, expo back-off) → cached answer fallback.
    - Token overflow → force summarization mid-conversation.

### **3.3 On/Off Ramps**

- **Flow**
    1. User POST /withdrawals.
    2. Status pending → processing (MTN API or CSV bulk).
    3. Admin Portal (Next.js) lists queue; bulk-mark complete/fail.
    4. Supabase function triggers push notification.
- **Edge cases**
    - Insufficient USDC → 409 Conflict.
    - AML flag (> USD 10 k) → status on_hold, Marble webhook.

### **3.4 Trust Layer**

- **Fee microservice** /fees/calc
    - Inputs: amount, pair, route.
    - Returns JSON line items (FX spread, custody, gas subsidy).
    - Signed with HMAC key in Doppler (FEE_SIG_KEY).
- **Custody disclosure**
    - API GET /custody/report returns IPFS PDF link of latest audit.
    - eth_getProof verifies smart-contract balance at block N.

---

## **4. Data Architecture**

### **4.1 Core Tables**

| **Table** | **Key Columns** | **Notes** |
| --- | --- | --- |
| users | id PK, region enum ZA/ZM, magic_id | RLS by id, region |
| wallets | id, user_id, chain, address, balance_usd | Unique (user_id,chain) |
| transactions | id, user_id, type, status, amount_zmw, amount_usdc, fx_rate, tx_hash | Index (status,created_at) |
| fx_rates | pair PK, rate, ts | TTL 24 h |
| chat_messages | id, session_id, role, content, tokens, created_at | Monthly partitions |
| audit_logs | id, event, payload, actor_id, created_at | 7-year retention |
| aml_flags | id, txn_id, rule, severity, status |  |

### **4.2 Storage & Resilience**

- Supabase PITR to S3; RPO ≤ 5 min, RTO ≤ 30 min.
- Weekly schema dumps in Git (Liquibase).
- Redis snapshot-to-S3 every 6 h.

---

## **5. API Specifications**

### **5.1 Internal (/v1/*)**

| **Endpoint** | **Method** | **Auth** | **Body / Params** | **2xx Response** | **Notes** |
| --- | --- | --- | --- | --- | --- |
| /deposits | POST | JWT | {amountZMW} | 202 {depositId} | Rate 3/min |
| /fx/latest | GET | Public | pair | {rate, ts} | Cache 1 s |
| /chat/send | POST | JWT | {sessionId, message} | {reply, tokens} | 10/min |
| /withdrawals | POST | JWT | {amountZMW, mtmNumber} | {withdrawalId} | 5/min |

### **5.2 External**

| **Service** | **Auth** | **Endpoint(s)** | **Retry / Fallback** |
| --- | --- | --- | --- |
| **MTN MoMo** | OAuth2 + HMAC | /v2/collection, webhook /callbacks | 3× then fail |
| **CoinGecko** | None | wss://ws.coingecko.com/fx | Switch to /simple/price poll |
| **OpenAI** | Bearer | /chat/completions | 5xx → cached answer |
| **Marble** | API key | /screen | hit → hold txn |

---

## **6. Security & Privacy**

| **Domain** | **Measure** |
| --- | --- |
| Auth | Magic DID JWT, 7-day rolling, refresh token renew |
| Authorization | Roles: user / admin / compliance, Flask decorators |
| Encryption | TLS 1.3; AES-256 at rest; field-level for PII |
| Secrets | **Doppler** vault, 90-day cron rotation via GitHub Actions   ↳ Overlap window 30 min; smoke tests; Slack alert |
| Compliance | POPIA, GDPR, SOC-2 evidence folder: secrets logs, audit trails |
| AppSec | Pydantic validation, helmet headers, Snyk weekly scan, OWASP zap in CI |

---

## **7. User Interface Specifications**

### **7.1 Design System (tokens in /packages/ui/tokens.json)**

- **Colors**: Stable Green #147A4D, Gradient Mid #47D98F, Sunbeam #FFD600, etc.
- **Typography**: Inter, H1 28 / 36, Body 15 / 22, WCAG-AA verified.
- **Spacing**: 4-8-16-24-32-48 dp scale.
- **Components**: Buttons (Primary/Secondary/Ghost), Cards, Inputs, Shimmer loaders.
- **Motion**: 150 ms ease-in-out micro-interactions; 300 ms spring screen transitions.
- **Dark mode**: Surface #121212, Green Alt #2FE099.

### **7.2 Key Flows**

| **Flow** | **Screens → States** |
| --- | --- |
| **Deposit** | Idle → FX Loading → Processing → Success / Fail |
| **Withdraw** | Idle → Balance Check → Processing → Success / Fail |
| **AI Chat** | Idle → Typing → Suggestion → Offline fallback |
| **Trust Layer** | Custody list → Loading → Disclosure |

---

## **8. Infrastructure & Deployment**

### **8.1 Environments**

| **Env** | **Fly App** | **Size** | **Domains** |
| --- | --- | --- | --- |
| **Prod** | hedgr-api | 2× shared-cpu-1x | api.hedgr.app |
| **Staging** | hedgr-api-stg | 1× shared-cpu-1x | stg-api.hedgr.app |
| **Web** | Vercel | Hobby | hedgr.app |
| **Capacitor** | iOS / Android | Expo EAS | Stores test track |

### **8.2 CI/CD Pipeline**

```
name: Deploy
on:
  push:
    branches: [main]
jobs:
  test-build-deploy:
    steps:
      - checkout
      - uses: dopplerhq/cli-action@v2       # inject secrets
      - run: pnpm i && pnpm test
      - run: docker build -t hedgr-api .
      - run: fly deploy --remote-only
      - run: pnpm smoke:test                # pytest + playwright
```

- **Secret rotation job** rotate.yml (cron 03:00 UTC) runs:
    1. doppler secrets rotate → new keys.
    2. Sync to Fly/Replit/Supabase.
    3. Smoke tests; deploy; Slack alert success/fail.
- **Rollback**: fly releases list → fly releases deploy -i <prev> (≈ 30 s).

---

## **9. Roadmap Flags**

| **Milestone** | **Owner** | **Due** | **Status** |
| --- | --- | --- | --- |
| Doppler org + OIDC hookup | DevOps | Jul 4 | 🔄 in-progress |
| Capacitor wrappers live in TestFlight / Firebase App Dist | Mobile | Jul 18 | ⏳ |
| Pilot go-live (100 users) | PM | Aug 15 | ⏳ |
| Fireblocks MPC PoC | DevOps | Oct 1 | ⏳ |

---

## **Appendix A — Design Tokens (abridged)**

```
<details><summary>Click to expand</summary>

```

```
{
  "color": {
    "brand": { "stable-green": "#147A4D", "gradient-mid": "#47D98F" },
    "accent": { "sunbeam": "#FFD600", "indigo": "#4B51C3" },
    "gray": { "100": "#FAFAFA", "900": "#121212" },
    "semantic": { "success": "#2E7D32", "warning": "#FBC02D", "error": "#D32F2F" }
  },
  "spacing": { "xs": 4, "sm": 8, "md": 16, "lg": 24, "xl": 32, "xxl": 48 },
  "font": { "family": "Inter", "size": { "body": 15, "h1": 28 } }
}
```

```
</details>

```

---

**End of Specification**

---

# Hedgr Platform Development Plan — v4

*Tech + UX/UI complete* 

---

## Phase 0 — Foundation & CI (Week 1)

### [0.1] Turbo Workspace Bootstrap

- **Task:** Initialise Turborepo with `apps/frontend`, `apps/backend`, `packages/ui`, `packages/config`.
- **Files (14):**
    - `package.json` – workspaces + scripts
    - `pnpm-workspace.yaml`
    - `turbo.json` – build / lint / test pipeline
    - `apps/frontend/next.config.mjs`
    - `apps/frontend/tsconfig.json`
    - `apps/backend/pyproject.toml` — Poetry 3.12
    - `packages/ui/package.json`
    - `packages/config/eslint.cjs`, `.prettierrc`, `.editorconfig`
    - `Dockerfile`, `.dockerignore`
    - `.gitignore`
    - `.github/workflows/ci.yml`
- **Step Dependencies:** *none*
- **User Instructions:**`pnpm i && pnpm dev` → *“Hello Hedgr”* page at **:3000**
- **UX/UI:**
Temporary landing banner (brand gradient) with dark‑mode toggle; global Inter font.

---

### [0.2] Doppler Secrets & GitHub‑OIDC

- **Task:** Connect Doppler (`dev`, `stg`, `prod`), inject secrets in local runs & CI.
- **Files (6):** `.doppler.yaml`, env templates, `docker-compose.yml`, CI update, `docs/secrets.md`
- **Dependencies:** 0.1
- **User Instructions:**`doppler setup` then `doppler run -- pnpm dev`
- **UX/UI:**
Dev‑only toast “Secrets loaded from Doppler” (dismissible).

---

### [0.3] CI/CD Pipeline & [Fly.io](http://fly.io/)

- **Task:** Add GitHub Action `deploy.yml` to build Docker & deploy to Fly (stg) on **main**.
- **Files (5):** `.github/workflows/deploy.yml`, `fly.toml`, two service `Dockerfile`s, `docs/ci.md`
- **Dependencies:** 0.2
- **User Instructions:** push commit → green build → Fly URL responds.
- **UX/UI:**
README shows CI badge & Fly deployment badge.

---

## Phase 1 — Design System & Data Layer (Week 1‑2)

### [1.1] Tailwind + Design Tokens

- **Task:** Import Appendix A tokens → generate Tailwind theme; publish `Button`, `Card`.
- **Files (9):** `tailwind.config.ts`, `postcss.config.cjs`, `packages/ui/tokens.json`, `scripts/gen-tailwind-theme.ts`, `globals.css`, primitives, `docs/design-system.md`
- **Dependencies:** 0.x
- **User Instructions:** `pnpm run gen-theme` then `pnpm dev`
- **UX/UI:**
Document colour & spacing scales, WCAG contrast table; buttons include focus ring & `aria-label`s.

---

### [1.2] Dual‑Region Supabase Schema

- **Task:** Create `hedgr-za` (core) & `hedgr-zm` (PII) projects; run migrations `001_za_core.sql`, `002_zm_sensitive.sql`; add SQLAlchemy router.
- **Files (12):** migrations, `db/factory.py`, models, `.env.example`, `docs/db-sharding.md`
- **Dependencies:** 0.x
- **User Instructions:** run migrations in each project, verify VPN link.
- **UX/UI:**
If DB latency > 1 s show toast “Syncing secure data…”.

---

### [1.3] Upstash Redis Cluster

- **Task:** Provision multi‑zone cluster, connection util, snapshot‑to‑S3 cron.
- **Files (5):** `services/redis_client.py`, `snapshot.sh`, `.github/workflows/redis-snapshot.yml`, `docs/redis.md`, env update
- **Dependencies:** 1.2
- **User Instructions:** `doppler run -- bash snapshot.sh`
- **UX/UI:**
Grafana panel (Phase 7) will visualise cache hits.

---

## Phase 2 — Auth, PWA Shell & Global State (Week 2‑3)

### [2.1] Magic.link Login

- **Task:** Login page, Magic SDK, backend JWT verify, user auto‑provision.
- **Files (12):** `login/page.tsx`, `MagicLoginForm.tsx`, `auth-provider.tsx`, `auth.py`, `magic.py`, tests, policies, docs
- **Dependencies:** 1.1–1.3
- **User Instructions:** add keys, test login.
- **UX/UI:**
Email placeholder “you@example.com”; primary button with inline spinner; success confetti then dashboard; red error banner.

---

### [2.2] next‑pwa & Offline Queue

- **Task:** Add service‑worker, offline banner, POST queue util.
- **Files (8):** `next.config.mjs`, `public/sw.js`, `offlineQueue.ts`, `OfflineBanner.tsx`, docs
- **Dependencies:** 2.1
- **User Instructions:** kill Wi‑Fi → red banner, actions queue.
- **UX/UI:**
Lucide `wifi-off` icon; reconnect shows sync progress %.

---

### [2.3] Universal Screen State Hook

- **Task:** Implement `useScreenState` + enums (Deposit/Withdraw/Chat/Trust) with URL sync (`nuqs`).
- **Files (6):** `state.ts`, `useScreenState.ts`, tests, docs
- **Dependencies:** 2.2
- **User Instructions:** refresh keeps state.
- **UX/UI:**
Skeleton loaders for every `LOADING`; ARIA `status` regions.

---

## Phase 3 — Core Savings Flow (Week 3)

### [3.1] Deposit Endpoint & UI

- **Task:** `/v1/deposits` route (rate‑limit 3/min); DepositState *IDLE → FX_LOADING → PROCESSING → SUCCESS/FAIL*; live FX.
- **Files (11):** route, schema, limiter, tests, `DepositForm.tsx`, `useFx.ts`, progress bar, migration, docs
- **Dependencies:** 2.3, 1.3
- **User Instructions:** submit K100, row pending.
- **UX/UI:**
FX preview refresh 2 s (shimmer); disabled submit until valid; semantic progress colours; warning copy if gas high.

---

### [3.2] MTN Reconciliation Worker

- **Task:** RQ worker listens MTN webhook → 0x swap → Aave supply → Supabase broadcast.
- **Files (15):** worker, `mtn.py`, `defi.py`, realtime util, config, tests, UI listener, fly worker, docs
- **Dependencies:** 3.1
- **User Instructions:** run worker, send webhook, dashboard updates.
- **UX/UI:**
Dashboard pill “Earning • 6 % APY”; toast on success.

---

## Phase 4 — Withdrawals & FX Module (Week 3‑4)

### [4.1] Withdrawal Flow & AML Hold

- **Task:** `/withdrawals` endpoint + WithdrawState *BALANCE_CHECK → PROCESSING → SUCCESS/FAIL/ON_HOLD*; admin bulk actions.
- **Files (13):** route, AML service, admin pages, components, tests, migration, push util
- **Dependencies:** 3.1
- **User Instructions:** user withdraws; admin completes.
- **UX/UI:**
Insufficient balance warning; confirmation modal; ON_HOLD yellow badge.

---

### [4.2] Real‑time FX Service & UI

- **Task:** Fetch USD/ZMW every sec → Redis; `/fx/latest` endpoint; FX component.
- **Files (5):** `fx_service.py`, fetch task, route, `fx-rate-display.tsx`, docs
- **Dependencies:** 1.3, 3.1
- **User Instructions:** rate shows on deposit page.
- **UX/UI:**
Large rate text, subtle “updated 1 s ago”; loader shimmer; error copy.

---

### [4.3] Aave Hedge Worker

- **Task:** `aave_service.py` + `hedge_worker.py` to manage hedge positions.
- **Files (2):** service, worker
- **Dependencies:** 3.2, 4.2
- **User Instructions:** run worker manually, check logs.
- **UX/UI:** *Back‑office only*.

---

## Phase 5 — AI Copilot & Semantic Cache (Week 4‑5)

### [5.1] Chat UI

- **Task:** Chat screen with bubbles, TypingIndicator.
- **Files (3):** `chat/page.tsx`, `chat-interface.tsx`, `message-bubble.tsx`
- **Dependencies:** 2.3
- **User Instructions:** open `/chat`, ask question.
- **UX/UI:**
Distinct bubble colours; token counter; “AI is typing…” indicator; offline fallback banner.

---

### [5.2] OpenAI Socket Endpoint

- **Task:** Flask‑SocketIO `/chat`; call GPT‑4o mini.
- **Files (2):** `ai_chat.py`, `openai_client.py`
- **Dependencies:** 1.3, 5.1
- **User Instructions:** set `OPENAI_API_KEY`; chat works.
- **UX/UI:**
5xx → inline red message “Service busy, try again”.

---

### [5.3] Semantic Cache

- **Task:** `semantic_cache.py` with Redis + tiktoken.
- **Files (1):** service
- **Dependencies:** 1.3, 5.2
- **User Instructions:** repeat prompt → cached response.
- **UX/UI:** n/a (perf).

---

## Phase 6 — Trust Layer & Fees (Week 5)

### [6.1] Fee Calculator Microservice

- **Task:** `/fees/calc` (HMAC); front‑end breakdown accordion.
- **Files (8):** route, signer util, hook, `FeeBreakdown.tsx`, tests, docs, migration, Doppler key
- **Dependencies:** 3.x, 4.x
- **User Instructions:** open deposit modal, see fees.
- **UX/UI:**
Accordion closed by default; right‑aligned nums; error fallback copy.

---

### [6.2] Custody PDF Endpoint & Trust Page

- **Task:** Generate audit PDF (reportlab) → IPFS; TrustState *LIST → LOADING → DISCLOSURE*.
- **Files (7):** `audit_report.py`, route, requirements, tests, trust page, migration, docs
- **Dependencies:** 6.1
- **User Instructions:** `/trust` shows “Download audit (PDF, 2 MB)”.
- **UX/UI:**
Card list with PDF icon; loading skeleton; date labels.

---

## Phase 7 — Observability & Alerts (Week 5)

### [7.1] Sentry & Grafana

- **Task:** Sentry SDKs, expose metrics to Zabbix → Grafana, Slack alerts.
- **Files (9):** sentry configs, zabbix template, grafana dash, alert test, docs
- **Dependencies:** runtime endpoints live
- **User Instructions:** `/debug/error` → Slack alert.
- **UX/UI:**
Friendly 500 page with sloth illustration + “Retry”.

---

## Phase 8 — Mobile & Push (Week 5‑6)

### [8.1] Capacitor Wrap & EAS Build

- **Task:** `capacitor.config.ts`, add iOS & Android, safe‑area & font checks.
- **Files (15):** config, ios/, android/, `App.tsx`, push util, `PushOptIn.tsx`, EAS files, docs, fastlane, metadata, migration
- **Dependencies:** 2.2, 5.x
- **User Instructions:** `pnpm cap add` then `eas build`.
- **UX/UI:**
Pre‑permission explainer; respect safe areas; spring transitions.

---

### [8.2] Supabase Realtime Notifications

- **Task:** Notifications table + listener.
- **Files (3):** `notification-center.tsx`, `supabase-realtime.ts`, migration
- **Dependencies:** 3.2, 4.1
- **User Instructions:** complete deposit → toast shows.
- **UX/UI:**
Toast top-centre; bell icon badge; copy “Deposit K100 confirmed ✅”.

---

## Phase 9 — Compliance & Rotation (Week 6)

### [9.1] Doppler Secret Rotation Job

- **Task:** nightly `rotate.yml`, smoke tests, Slack report.
- **Files (5):** workflow, `smoke_test.sh`, runbook, badge, compose
- **Dependencies:** 0.2
- **User Instructions:** manual dispatch → Slack success.
- **UX/UI:** n/a

---

### [9.2] SOC‑2 Evidence Collector

- **Task:** Worker zips logs & evidence → GitHub Artifacts daily.
- **Files (6):** `evidence_collector.py`, workflow, README, POPIA doc, SOC‑2 doc, migration
- **Dependencies:** 9.1
- **User Instructions:** check *Actions → Artifacts*.
- **UX/UI:** internal portal TBD.

---