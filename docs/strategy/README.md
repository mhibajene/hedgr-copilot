# Hedgr Strategy Narrative Index

| Field | Value |
| ----- | ----- |
| **Status** | Operational index |
| **Authority** | Non-authorising |
| **Purpose** | Explain narrative hierarchy and locate audience-specific artifacts |
| **Ticket** | Narrative stack through `NARRATIVE-007` closeout (Customer One-Pager v2.0 Accepted / Frozen under D-080 / §212; `NARRATIVE-005` source retained) |
| **Date** | 2026-08-23 |

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
│   ├── HEDGR_CUSTOMER_ONE_PAGER.md    ← historical customer source (v1.0 superseded)
│   ├── HEDGR_CUSTOMER_ONE_PAGER_VNEXT.md ← canonical customer source (v2.0 Frozen)
│   ├── HEDGR_CUSTOMER_ONE_PAGER_REVIEW.md
│   ├── HEDGR_CUSTOMER_ONE_PAGER_FIDELITY_AUDIT.md
│   ├── HEDGR_CUSTOMER_NARRATIVE_TRANSLATION_MAP.md
│   └── HEDGR_CUSTOMER_ONE_PAGER_VNEXT_HEDGROPS_DISPOSITION.md
├── website/
│   └── HEDGR_NARRATIVE_STYLE_GUIDE.md ← narrative voice (v1.0 Frozen)
├── investor/
│   ├── HEDGR_INVESTOR_ORIENTATION_BRIEF.md   ← accepted source; NARRATIVE-005 completed
│   ├── HEDGR_INVESTOR_ORIENTATION_BRIEF_REVIEW.md ← Founder acceptance recorded
│   ├── HEDGR_INSTITUTIONAL_INVESTOR_ORIENTATION_DOCUMENT_BRIEF.md ← Research R1 predecessor brief
│   ├── HEDGR_INSTITUTIONAL_INVESTOR_ORIENTATION_DOCUMENT_REVIEW.md ← Research R1 proof + bounded-revision disposition
│   ├── HEDGR_INSTITUTIONAL_INVESTOR_ORIENTATION_DOCUMENT_R2_REVISION_BRIEF.md ← active NARRATIVE-006 R2 brief
│   └── HEDGR_INSTITUTIONAL_INVESTOR_ORIENTATION_DOCUMENT_R2_REVIEW.md ← Research R2 review record
├── product/                           ← planned paths only
└── technical/                         ← planned paths only
```

Directories for product and technical audience packs remain **planned architecture** unless a separately activated ticket requires them. The accepted Investor Orientation Brief remains the source for `NARRATIVE-006`; only its internal Paper / PDF design expression is authorised under **§7a**. Publication is not authorised.

---

## Artifact register

| Artifact | Path | State | Notes |
| -------- | ---- | ----- | ----- |
| Canonical Hedgr Story | `docs/strategy/narrative/HEDGR_CANONICAL_STORY.md` | **Active / Frozen v1.0** | Parent narrative. Do not edit without institutional trigger + §7 naming. |
| Stability System Thesis | `docs/strategy/hedgr-stability-system-thesis.md` | Existing strategic context | Non-binding; subordinate to Canonical Story and doctrine. |
| Customer One-Pager v2.0 | `docs/strategy/customer/HEDGR_CUSTOMER_ONE_PAGER_VNEXT.md` | **Active / Frozen v2.0** | Canonical customer narrative source. Frozen at the historical `VNEXT` path. Publication not authorised by freeze alone. |
| Customer One-Pager v1.0 | `docs/strategy/customer/HEDGR_CUSTOMER_ONE_PAGER.md` | **Superseded / Frozen historical** | Retained v1.0 artifact. No longer controlling. |
| Customer One-Pager Review | `docs/strategy/customer/HEDGR_CUSTOMER_ONE_PAGER_REVIEW.md` | **Review complete** | Non-authoritative v1.0 review evidence. |
| Customer One-Pager vNext HedgrOps Disposition | `docs/strategy/customer/HEDGR_CUSTOMER_ONE_PAGER_VNEXT_HEDGROPS_DISPOSITION.md` | **Founder confirmation recorded** | HedgrOps `RETAIN / ACCEPT` recommendation; Founder accept + freeze in §212. |
| Narrative Style Guide | `docs/strategy/website/HEDGR_NARRATIVE_STYLE_GUIDE.md` | **Active / Frozen v1.0** | Canonical narrative governance for voice, rhythm, and translation. Non-authorising. |
| Investor Orientation Brief | `docs/strategy/investor/HEDGR_INVESTOR_ORIENTATION_BRIEF.md` | **Accepted source** | `NARRATIVE-005` completed under §170; publication not authorised. |
| Investor Orientation Brief Review | `docs/strategy/investor/HEDGR_INVESTOR_ORIENTATION_BRIEF_REVIEW.md` | **Founder acceptance recorded** | Review record for the accepted `NARRATIVE-005` source; no publication or frozen-source change. |
| Institutional Investor Orientation Document — Research R1 Design Brief | `docs/strategy/investor/HEDGR_INSTITUTIONAL_INVESTOR_ORIENTATION_DOCUMENT_BRIEF.md` | **Historical predecessor brief** | `NARRATIVE-006` / D-055 / §170; Research R1 delivered and preserved. |
| Institutional Investor Orientation Document — Research R1 Review | `docs/strategy/investor/HEDGR_INSTITUTIONAL_INVESTOR_ORIENTATION_DOCUMENT_REVIEW.md` | **Founder disposition recorded** | Research R1 accepted with bounded revisions; Research R2 authorised under §171 / Internal D-056. |
| Institutional Investor Orientation Document — Research R2 Revision Brief | `docs/strategy/investor/HEDGR_INSTITUTIONAL_INVESTOR_ORIENTATION_DOCUMENT_R2_REVISION_BRIEF.md` | **Active** | `NARRATIVE-006` / D-055 + D-056 / §171; eight-page internal Paper/PDF revision; no publication. |
| Institutional Investor Orientation Document — Research R2 Review | `docs/strategy/investor/HEDGR_INSTITUTIONAL_INVESTOR_ORIENTATION_DOCUMENT_R2_REVIEW.md` | **Proof delivered / Founder review pending** | Paper source, eight-page PDF, same-frame comparison, hashes, and completed QA recorded; publication remains not authorised. |
| Investor One-Pager (legacy planned label) | `docs/strategy/investor/HEDGR_INVESTOR_ONE_PAGER.md` | **Superseded as planned label** | Replaced by Investor Orientation Brief path under `NARRATIVE-005`; do not create under the old filename unless Founder renames. |
| Investor Deck | `docs/strategy/investor/HEDGR_INVESTOR_DECK.md` | **Not approved** | Not created. `NARRATIVE-006` is an internal orientation document, not a deck. |
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
