# Hedgr Strategy Narrative Index

| Field | Value |
| ----- | ----- |
| **Status** | Operational index |
| **Authority** | Non-authorising |
| **Purpose** | Explain narrative hierarchy and locate audience-specific artifacts |
| **Ticket** | `NARRATIVE-003` (customer one-pager freeze; index retained) |
| **Date** | 2026-07-20 |

---

## Authority statement

This index is **narrative architecture**, not sequencing authority.

It does **not**:

- activate tickets;
- approve publication;
- define execution truth;
- override doctrine, ADRs, `docs/ops/HEDGR_STATUS.md`, or `AGENTS.md`;
- imply that planned artifacts are approved work.

Active implementation remains controlled only by `HEDGR_STATUS.md` **§7** / **§7a**.

---

## Derivation hierarchy

```text
Doctrine and repo authority
        ↓
Frozen Canonical Story
        ↓
Narrative style (spoken, not written)
        ↓
Audience-specific narrative sources
        ↓
Designed and distributed communication assets / product copy
```

Rules:

1. The Canonical Story is the **parent narrative**.
2. Derived materials may adapt emphasis, tone, and detail for an audience.
3. Derived materials may **not** independently redefine Hedgr.
4. Narrative artifacts do **not** define execution truth.
5. `HEDGR_STATUS.md`, `AGENTS.md`, accepted ADRs, and active doctrine remain controlling.
6. Publication or distribution requires separate review where claims are externally material.
7. Public-facing content should **feel spoken, not written**. Prefer short sentences, one main idea per sentence, plain language, active voice, and commas or full stops instead of em dashes. Translate institutional language into everyday language before using it.

---

## Translation principle

The Canonical Story protects meaning. Audience artifacts prove meaning can be understood.

| Canonical / institutional | Customer language (preferred) |
| ------------------------- | ----------------------------- |
| Financial Fidelity | Know what your money is worth, where it is, and how accessible it is. |
| State Before Action | Understand your situation before deciding what to do next. |
| Stability posture | See how stable your financial position looks today. |
| Liquidity integrity | Know when and how your money can be accessed. |

Product copy should ask: would a trusted person explain it this way? If not, simplify.

---

## Directory map

```text
docs/strategy/
├── README.md                          ← this index
├── hedgr-stability-system-thesis.md   ← existing strategic context (non-canonical)
├── narrative/
│   └── HEDGR_CANONICAL_STORY.md       ← parent narrative (v1.0 Frozen)
├── customer/
│   ├── HEDGR_CUSTOMER_ONE_PAGER.md    ← customer narrative source (v1.0 Frozen)
│   └── HEDGR_CUSTOMER_ONE_PAGER_REVIEW.md
├── investor/                          ← planned paths only
├── product/                           ← planned paths only
├── website/                           ← planned paths only
└── technical/                         ← planned paths only
```

Directories for investor, product, website, and technical audience packs are **planned architecture**. They are not created by this index unless a separately activated ticket requires them.

---

## Artifact register

| Artifact | Path | State | Notes |
| -------- | ---- | ----- | ----- |
| Canonical Hedgr Story | `docs/strategy/narrative/HEDGR_CANONICAL_STORY.md` | **Active / Frozen v1.0** | Parent narrative. Do not edit without institutional trigger + §7 naming. |
| Stability System Thesis | `docs/strategy/hedgr-stability-system-thesis.md` | Existing strategic context | Non-binding; subordinate to Canonical Story and doctrine. |
| Customer One-Pager | `docs/strategy/customer/HEDGR_CUSTOMER_ONE_PAGER.md` | **Active / Frozen v1.0** | Canonical customer narrative source. Publication not authorised by freeze alone. |
| Customer One-Pager Review | `docs/strategy/customer/HEDGR_CUSTOMER_ONE_PAGER_REVIEW.md` | **Review complete** | Non-authoritative evidence; Founder accept + freeze disposition recorded. |
| Narrative Style Guide | `docs/strategy/website/HEDGR_NARRATIVE_STYLE_GUIDE.md` | **Planned** | Recommended future voice/rhythm guide. Not created. Not approved. |
| Investor One-Pager | `docs/strategy/investor/HEDGR_INVESTOR_ONE_PAGER.md` | **Planned** | Not created. Not approved. |
| Investor Deck | `docs/strategy/investor/HEDGR_INVESTOR_DECK.md` | **Planned** | Not created. Not approved. |
| Product Overview | `docs/strategy/product/HEDGR_PRODUCT_OVERVIEW.md` | **Planned** | Not created. Not approved. |
| Website Narrative | `docs/strategy/website/HEDGR_WEBSITE_NARRATIVE.md` | **Planned** | Not created. Not approved. |
| Product Copy Guide | `docs/strategy/website/HEDGR_PRODUCT_COPY_GUIDE.md` | **Planned** | Not created. Not approved. |
| Technical Brief | `docs/strategy/technical/HEDGR_TECHNICAL_BRIEF.md` | **Planned** | Not created. Not approved. |
| Whitepaper | `docs/strategy/technical/HEDGR_WHITEPAPER.md` | **Planned** | Not created. Not approved. Path spelling follows ticket architecture; creation requires a future ticket. |

**Planned** means narrative architecture only. It does **not** mean queued, sequenced, approved, or ready to implement.

---

## Brand note for designed variants

When a derived source is turned into a designed PDF, page, or visual asset, follow repo-native brand authority:

- `DESIGN.md`
- `docs/brand/**`
- approved logo files only — do not regenerate or reinterpret logos
- restrained, high-contrast, institutional presentation
- Plus Jakarta Sans where the medium supports it

Narrative sources may remain structured Markdown until a separately scoped design pass is authorised.

---

## Related controlling surfaces

- `docs/ops/HEDGR_STATUS.md`
- `AGENTS.md`
- `docs/doctrine/hedgr-constitutional-charter.md`
- `docs/doctrine/hedgr-ux-constitution.md`
- accepted ADRs under `docs/decisions/`
