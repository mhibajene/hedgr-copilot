# Hedgr Strategy Narrative Index

| Field | Value |
| ----- | ----- |
| **Status** | Operational index |
| **Authority** | Non-authorising |
| **Purpose** | Explain narrative hierarchy and locate audience-specific artifacts |
| **Ticket** | Narrative stack through `NARRATIVE-004` (style guide freeze; index retained) |
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
Narrative Style Guide
        ↓
Audience-specific narrative sources
        ↓
Designed and distributed communication assets / product copy
```

Rules:

1. The Canonical Story is the **parent narrative** (meaning).
2. The Narrative Style Guide preserves **voice** (how Hedgr sounds).
3. Derived materials may adapt emphasis, tone, and detail for an audience.
4. Derived materials may **not** independently redefine Hedgr.
5. Narrative artifacts do **not** define execution truth.
6. `HEDGR_STATUS.md`, `AGENTS.md`, accepted ADRs, and active doctrine remain controlling.
7. Publication or distribution requires separate review where claims are externally material.
8. Public-facing content should follow `docs/strategy/website/HEDGR_NARRATIVE_STYLE_GUIDE.md` v1.0.

---

## Translation principle

The Canonical Story protects meaning. The Narrative Style Guide protects voice. Audience artifacts prove meaning can be understood.

Illustrative customer translations live in the Style Guide. Product copy should ask: would a trusted person explain it this way? If not, simplify.

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
├── website/
│   └── HEDGR_NARRATIVE_STYLE_GUIDE.md ← narrative voice (v1.0 Frozen)
├── investor/                          ← planned paths only
├── product/                           ← planned paths only
└── technical/                         ← planned paths only
```

Directories for investor, product, and technical audience packs remain **planned architecture** unless a separately activated ticket requires them.

---

## Artifact register

| Artifact | Path | State | Notes |
| -------- | ---- | ----- | ----- |
| Canonical Hedgr Story | `docs/strategy/narrative/HEDGR_CANONICAL_STORY.md` | **Active / Frozen v1.0** | Parent narrative. Do not edit without institutional trigger + §7 naming. |
| Stability System Thesis | `docs/strategy/hedgr-stability-system-thesis.md` | Existing strategic context | Non-binding; subordinate to Canonical Story and doctrine. |
| Customer One-Pager | `docs/strategy/customer/HEDGR_CUSTOMER_ONE_PAGER.md` | **Active / Frozen v1.0** | Canonical customer narrative source. Publication not authorised by freeze alone. |
| Customer One-Pager Review | `docs/strategy/customer/HEDGR_CUSTOMER_ONE_PAGER_REVIEW.md` | **Review complete** | Non-authoritative evidence; Founder accept + freeze disposition recorded. |
| Narrative Style Guide | `docs/strategy/website/HEDGR_NARRATIVE_STYLE_GUIDE.md` | **Active / Frozen v1.0** | Canonical narrative governance for voice, rhythm, and translation. Non-authorising. |
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

Narrative sources may remain structured Markdown until a separately scoped design pass is authorised. Narrative voice follows the Style Guide; visual brand follows `DESIGN.md` and `docs/brand/**`.

---

## Related controlling surfaces

- `docs/ops/HEDGR_STATUS.md`
- `AGENTS.md`
- `docs/doctrine/hedgr-constitutional-charter.md`
- `docs/doctrine/hedgr-ux-constitution.md`
- accepted ADRs under `docs/decisions/`
