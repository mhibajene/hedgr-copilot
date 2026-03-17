# Hedgr MVP Project Specification (Canonical)

Version: 1.0  
Status: Canonical Specification  
Supersedes: hedgr-mvp-project-specification-v0.md

---

# 1. Executive Overview

Hedgr is a **Global Stability Wallet** designed for individuals and SMEs operating in volatile economies.

The platform enables users to preserve purchasing power by converting unstable local currencies into stable digital assets and managing them through the **Hedgr Stability Engine**.

The MVP validates three core capabilities:

1. **Currency Stability**
2. **Conservative Yield Generation**
3. **AI-Assisted Financial Guidance**

The goal of the MVP is to validate the **Stability Wallet thesis** with a working pilot in emerging markets.

---

# 2. Product Definition

## Hedgr Is Not A DeFi Wallet

Hedgr is **not positioned as a DeFi wallet**.

Hedgr is a **Stability Wallet**.

The wallet acts as a **financial interface for volatility management** powered by the Hedgr Stability Engine.

Users interact with simple savings actions while Hedgr manages:

- asset allocation
- yield routing
- FX exposure
- liquidity

---

# 3. Core System Architecture

## 3.1 Hedgr Stability Engine

The **Stability Engine** is the system center of Hedgr.

It manages:

- treasury allocation
- risk exposure
- yield strategies
- liquidity buffers

### Allocation Bands

User funds are distributed across three allocation bands.

**Stability Allocation**

- stable assets
- principal protection

**Yield Allocation**

- conservative yield strategies
- stable lending protocols

**Liquidity Allocation**

- funds reserved for withdrawals
- settlement operations

The engine dynamically manages allocation between these bands.

---

## 3.2 Custodial Infrastructure

The MVP uses **Privy** for custodial wallet infrastructure.

Privy provides:

- wallet creation
- authentication
- account abstraction
- key custody

This allows users to onboard without managing private keys.

---

## 3.3 Yield Routing Engine

The Yield Routing Engine allocates assets to external yield protocols.

Initial protocol support:

- Aave

Future support:

- Compound
- Lido
- institutional-grade strategies

Allocation rules include:

- protocol exposure caps
- APR monitoring
- liquidity checks

---

## 3.4 AI Copilot

The AI Copilot acts as the platform’s financial guidance layer.

Capabilities:

- financial education
- FX insights
- savings nudges
- yield explanations

The Copilot simplifies financial concepts for emerging-market users.

---

# 4. Target Users

Primary segments:

**Freelancers**

Users receiving international income in volatile currencies.

**SME Owners**

Small businesses needing stable treasury storage.

**Mobile-First Savers**

Users relying on mobile money infrastructure.

These users prioritise **stability over speculation**.

---

# 5. Core MVP Capabilities

## 5.1 Deposits

Users deposit local currency through:

- mobile money
- bank transfer

Initial integration target:

- MTN Mobile Money

Deposit flow:

1. User deposits local currency
2. Funds convert to stable assets
3. Stability Engine allocates funds

---

## 5.2 Asset Conversion

Local currency deposits convert into stable digital assets.

Initial stable asset:

- USDC

Future expansion:

- additional stable assets

---

## 5.3 Yield Generation

User capital is allocated to yield strategies.

Initial strategy:

- USDC lending via Aave

Future strategies:

- diversified stable yield pools

---

## 5.4 Withdrawals

Users can convert stable assets back to local currency.

Withdrawal flow:

1. User requests withdrawal
2. Stability Engine releases liquidity
3. Stable assets convert to local currency
4. Funds sent via mobile money

---

# 6. Platform Architecture

## Frontend

Next.js mobile-first application.

Responsibilities:

- wallet dashboard
- Copilot interface
- deposit / withdrawal flows

---

## Backend

Python Flask services.

Responsibilities:

- API orchestration
- yield routing
- treasury management

---

## Data Layer

Supabase Postgres.

Responsibilities:

- user records
- transaction logs
- audit data

---

## Infrastructure

Core services include:

- Supabase
- Redis
- OpenAI
- blockchain RPC providers

---

# 7. Security Model

Security principles:

- custodial wallet protection
- encrypted communications
- transaction audit logs

Future layers include:

- proof systems
- transparency dashboards

---

# 8. Monetisation Model

Revenue streams include:

### Yield Spread

Hedgr retains a portion of generated yield.

### Conversion Fees

Small spread applied to FX conversions.

### Infrastructure Licensing (Future)

Stability Engine APIs for fintech partners.

---

# 9. MVP Success Criteria

The MVP is considered successful if it validates:

1. demand for stability wallets
2. reliable mobile money on/off ramps
3. sustainable yield routing
4. Copilot-driven financial engagement

---

# 10. Post-MVP Expansion

Future capabilities include:

- multi-currency stability wallets
- programmable hedging strategies
- Hedgr Pro for SMEs
- institutional treasury tooling

---

End of Canonical Specification