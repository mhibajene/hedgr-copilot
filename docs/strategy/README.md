# Hedgr Strategy Narrative Index

| Field | Value |
| ----- | ----- |
| **Status** | Operational index |
| **Authority** | Non-authorising |
| **Purpose** | Explain narrative hierarchy and locate audience-specific artifacts |
| **Ticket** | `NARRATIVE-003` |
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
Audience-specific narrative sources
        ↓
Designed and distributed communication assets
```

Rules:

1. The Canonical Story is the **parent narrative**.
2. Derived materials may adapt emphasis, tone, and detail for an audience.
3. Derived materials may **not** independently redefine Hedgr.
4. Narrative artifacts do **not** define execution truth.
5. `HEDGR_STATUS.md`, `AGENTS.md`, accepted ADRs, and active doctrine remain controlling.
6. Publication or distribution requires separate review where claims are externally material.

---

## Directory map

```text
docs/strategy/
├── README.md                          ← this index
├── hedgr-stability-system-thesis.md   ← existing strategic context (non-canonical)
├── narrative/
│   └── HEDGR_CANONICAL_STORY.md       ← parent narrative (v1.0 Frozen)
├── customer/
│   ├── HEDGR_CUSTOMER_ONE_PAGER.md
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
| Customer One-Pager | `docs/strategy/customer/HEDGR_CUSTOMER_ONE_PAGER.md` | **Active draft** (`NARRATIVE-003`) | Derived customer source. Publication not authorised. |
| Customer One-Pager Review | `docs/strategy/customer/HEDGR_CUSTOMER_ONE_PAGER_REVIEW.md` | **Active review record** | Non-authoritative evidence for derivation and claims review. |
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
