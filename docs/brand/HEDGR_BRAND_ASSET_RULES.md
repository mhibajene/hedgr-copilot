# Hedgr Brand Asset Rules

Status: Brand asset governance rules

## Authority

- `DESIGN.md` names the approved brand assets.
- Brand Guidelines PDF is the human-readable usage authority when present in governed repo assets or attached review materials.
- `assets/brand/README.md` is the governed asset inventory and usage reference.

This document explains how asset usage should be governed. It does not create new assets or approve substitutions.

## Governed Asset Locations

Approved assets belong under `assets/brand/`:

- `assets/brand/logos/` for master logo assets
- `assets/brand/icons/` for icon-only brand marks
- `assets/brand/favicon/` for favicon assets
- `assets/brand/social/` for social avatars and covers
- `assets/brand/archive/` for retired or superseded assets only when governance explicitly preserves them

Asset paths must remain deterministic and traceable to approved `DESIGN.md` filenames.

## Approved Logo and Icon Sources

Brand-facing implementation may use only approved governed assets that are named in `DESIGN.md` and present in the governed asset directories.

Allowed source classes:

- `DESIGN.md` named assets
- files under `assets/brand/logos/`
- files under `assets/brand/icons/`
- files under `assets/brand/favicon/`
- files under `assets/brand/social/`
- Brand Guidelines PDF when present in governed repo assets or attached review materials

Do not treat screenshots, mockups, prompt outputs, AI-generated images, copied webpage images, or local placeholders as approved logo or icon sources.

## Missing Assets

If an approved asset named in `DESIGN.md` is missing from `assets/brand/`, record it as a missing governance input.

Do not:

- regenerate it
- substitute a similar asset
- recolor an existing asset
- crop or remix another asset
- use AI-generated reinterpretations
- treat a placeholder as approved brand material

Missing approved assets must be supplied from the governed brand package or escalated through governance.

## Logo Usage Rules

- Use `hedgr_logo.svg` as the default master logo when SVG is supported.
- Use `hedgr_logo.png` only for raster contexts on light or white backgrounds.
- Use `hedgr_logo_white.png` on dark, photo, or low-light backgrounds where the primary logo would not pass contrast review.
- Preserve the approved logo layout, proportions, clear space, and orientation.
- Do not switch logo layout, remove logo components, or create new lockups unless an approved asset already encodes that variant.

## Icon Usage Rules

- Use `hedgr_icon_color.png` only in square slots, inline marks, app tiles, avatars, favicons, or compact brand-mark contexts where the color mark has sufficient contrast.
- Use `hedgr_icon_white.png` only on dark, photo, or low-light backgrounds where the white mark has sufficient contrast.
- Use icon-only assets only in square, compact, app-tile, avatar, favicon, or inline mark contexts.
- Use favicon assets only for browser or platform favicon slots.
- Use social assets only for profile, avatar, or social-cover placements.
- Do not use icon assets as decorative bullets, reward markers, gamified state badges, or speculative crypto-style marks.

## Variant Selection Rules

- Select the light / dark variant based on background contrast and legibility, not visual novelty.
- Use primary logo or color icon assets on light / white backgrounds.
- Use white logo or white icon assets on dark, photo, or low-light backgrounds.
- Avoid visually cluttered backgrounds unless the Brand Guidelines PDF explicitly approves the placement.
- Preserve calm institutional presentation; brand assets should identify Hedgr, not add urgency or hype.
- If contrast or legibility is uncertain, record the uncertainty for review instead of altering the asset.

## Prohibited Modifications

Do not rotate, stretch, squash, crop, distort, recolor, outline, stroke, shadow, glow, gradient-fill, texture, animate, mask, blur, add motion trails, or otherwise modify approved brand assets.

Do not create unofficial variants, regenerated replacements, AI-generated logo reinterpretations, monochrome substitutes, alternative lockups, or approximations from screenshots or prompt outputs.

Do not combine approved brand assets with speculative fintech aesthetics, decorative crypto styling, glow systems, aggressive visual emphasis, reward-style presentation, or hype-oriented rendering.

## Validation Expectations

For any brand-facing PR that touches logo, icon, favicon, avatar, or social asset usage, reviewers should verify:

- the asset filename appears in `DESIGN.md`
- the asset is sourced from the governed `assets/brand/` location
- the selected variant matches the light / dark surface
- proportions, layout, clear space, color, and orientation are preserved
- no prohibited transformation is present
- missing assets are logged as missing governance inputs
- AI-generated or regenerated replacements are absent
- placement preserves restrained, institutional, trust-first presentation
