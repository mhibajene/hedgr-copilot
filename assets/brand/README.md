# Hedgr Brand Assets

Status: Governed brand asset inventory

Authority:

- `DESIGN.md` at the repo root is the machine-readable brand authority.
- The Brand Guidelines PDF is the human-readable brand authority when present in governed repo assets or attached review materials.
- No implementation may reinterpret, regenerate, recolor, or modify approved brand behavior without governance approval.

## Directory Structure

- `logos/` - master logo assets
- `icons/` - icon-only brand marks
- `social/` - social avatars and social-cover assets
- `favicon/` - favicon assets
- `archive/` - retired or superseded brand assets, if governance explicitly preserves them

## Approved Asset Inventory

The current machine-readable authority references the following approved asset filenames.

| Asset | Intended governed location | Status |
| ----- | -------------------------- | ------ |
| `hedgr_logo.svg` | `assets/brand/logos/hedgr_logo.svg` | Missing from repo at BRAND-001 validation time |
| `hedgr_logo.png` | `assets/brand/logos/hedgr_logo.png` | Missing from repo at BRAND-001 validation time |
| `hedgr_logo_white.png` | `assets/brand/logos/hedgr_logo_white.png` | Missing from repo at BRAND-001 validation time |
| `hedgr_icon_color.png` | `assets/brand/icons/hedgr_icon_color.png` | Missing from repo at BRAND-001 validation time |
| `hedgr_icon_white.png` | `assets/brand/icons/hedgr_icon_white.png` | Missing from repo at BRAND-001 validation time |
| `hedgr_favicon.ico` | `assets/brand/favicon/hedgr_favicon.ico` | Missing from repo at BRAND-001 validation time |
| `hedgr_social_icon.png` | `assets/brand/social/hedgr_social_icon.png` | Missing from repo at BRAND-001 validation time |
| `hedgr_inverse_avatar.png` | `assets/brand/social/hedgr_inverse_avatar.png` | Missing from repo at BRAND-001 validation time |
| `social-covers/social-cover1.jpg` | `assets/brand/social/social-covers/social-cover1.jpg` | Missing from repo at BRAND-001 validation time |
| `social-covers/social-cover2.jpg` | `assets/brand/social/social-covers/social-cover2.jpg` | Missing from repo at BRAND-001 validation time |
| `social-covers/dark/social-cover-dark1.jpg` | `assets/brand/social/social-covers/dark/social-cover-dark1.jpg` | Missing from repo at BRAND-001 validation time |
| `social-covers/dark/social-cover-dark2.jpg` | `assets/brand/social/social-covers/dark/social-cover-dark2.jpg` | Missing from repo at BRAND-001 validation time |
| `social-covers/dark/social-cover-dark3.jpg` | `assets/brand/social/social-covers/dark/social-cover-dark3.jpg` | Missing from repo at BRAND-001 validation time |
| `social-covers/dark/social-cover-dark4.jpg` | `assets/brand/social/social-covers/dark/social-cover-dark4.jpg` | Missing from repo at BRAND-001 validation time |

Do not treat a missing asset as permission to recreate it. Missing approved assets must be supplied from the governed brand package or escalated through governance.

## Usage Guidance

- Use `hedgr_logo.svg` as the default master logo when SVG is supported.
- Use `hedgr_logo.png` only for raster contexts on light or white backgrounds.
- Use `hedgr_logo_white.png` on dark, photo, or otherwise low-light backgrounds where the primary logo would not pass contrast review.
- Use icon-only assets only for square slots, app tiles, avatars, favicons, or compact brand-mark contexts.
- Use favicon assets only for browser and platform favicon slots.
- Use social assets only for profile, avatar, or social-cover placements.
- Use approved filenames and approved variants only. Do not infer or create alternates.

## Light and Dark Backgrounds

- Light / white backgrounds should use the primary logo or color icon.
- Dark backgrounds should use white logo or white icon assets.
- Do not place any asset on visually cluttered, low-contrast, or unreviewed backgrounds.
- Contrast must be reviewed against WCAG AA expectations before shipped use.
- If variant choice is unclear, record the ambiguity for governance review instead of modifying or substituting the asset.

## Prohibited Modifications

Do not:

- rotate brand assets
- stretch, squash, crop, or distort proportions
- recolor outside approved `DESIGN.md` tokens
- add gradients, shadows, glows, strokes, outlines, texture, or decorative effects
- add animation, motion trails, masks, blur, or aggressive visual emphasis
- regenerate logos, icons, avatars, favicons, or social covers
- use AI-generated reinterpretations as substitutes for approved assets
- switch logo layout or remove logo components unless an approved asset already encodes that variant
- create unofficial variants, monochrome substitutes, alternate lockups, or approximations from screenshots / prompt outputs
- combine brand assets with speculative crypto styling, glow treatments, decorative motion, reward-style presentation, or hype-oriented rendering

## Machine-Readable Authority Rules

- UI systems and implementation agents must reference root `DESIGN.md` for approved brand tokens and asset names.
- Token values must not be modified in this asset README.
- Asset paths must remain deterministic and map back to approved `DESIGN.md` filenames.
- Any change to approved asset names, token values, usage constraints, or variant availability requires governance approval.

## AI Implementation Constraints

AI-assisted UI work must:

- reference `DESIGN.md`
- use approved tokens only
- use approved typography only when typography authority is established by governed brand docs
- use approved assets only
- preserve Hedgr's calm, institutional UX posture
- avoid speculative fintech styling, decorative crypto aesthetics, gradients, glows, and non-token palettes

AI-assisted UI work must not regenerate or reinterpret missing brand assets.

## Logo and Icon Validation

Before a brand-facing PR uses a logo, icon, favicon, avatar, or social asset, verify:

- the asset filename is named by `DESIGN.md`
- the file is sourced from the intended governed `assets/brand/` directory
- the selected variant matches the background and contrast context
- proportions, layout, color, clear space, and orientation are preserved
- no prohibited transformation or AI reinterpretation is present
- missing governed assets are logged as missing inputs, not regenerated or substituted
