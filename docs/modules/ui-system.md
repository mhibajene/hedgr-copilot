

# Module: UI System (Semantic Tone & State Architecture)

> Status: Active  
> Owner: Hedgr Core  
> Last Updated: 2026-03-01

---

## 1. Purpose

The UI System defines how Hedgr expresses system state visually.

It ensures that:
- Risk posture is legible.
- Allocation state is honest.
- Defensive transitions are explicit.
- No silent behavioural changes occur.

The UI is not decoration.
It is a state communication layer.

---

## 2. Core Doctrine

The Hedgr UI follows four principles:

1. **Semantic > Decorative**  
   Visual tone must map to real system state.

2. **State is Explicit**  
   Tightening, Defensive, Suspended states must be visible.

3. **No Silent Drift**  
   Allocation changes must surface notice banners.

4. **Capital Clarity First**  
   Liquidity visibility > yield highlighting.

---

## 3. Semantic Tone System

Tone is state-driven, not stylistic.

### Allowed Tone Tokens

Defined in CSS root:

- `--tone-safe`
- `--tone-stable`
- `--tone-caution`
- `--tone-capped`
- `--tone-muted`

Tone must be applied via:

- `data-tone="safe"`
- `data-tone="stable"`
- `data-tone="caution"`
- `data-tone="capped"`
- `data-tone="muted"`

Hardcoded hex values are not permitted in semantic components.

---

## 4. Dashboard State Model

The dashboard expresses system state across multiple coordinated surfaces:

### Surfaces

1. Header status badge
2. Stability headline dot
3. Stability bar segments
4. Allocation bands
5. Shield status
6. Withdrawal availability
7. Notice banners

All must reflect the same defensive state.

Invariant:
No surface may visually contradict Policy Core or Ledger state.

---

## 5. Allocation Bands

Bands represent:

- Liquidity
- Core Stable
- Yield Provision

Rules:

- Reduced / capped yield must use `--tone-capped`.
- Suspended yield must use `--tone-muted` with override lock.
- Band subtext and percentages inherit tone via CSS variables.

Suspended state must override accent via `!important` to prevent drift.

---

## 6. Withdrawal Presentation

Withdrawal availability must:

- Clearly prioritise liquidity.
- Never exaggerate yield withdrawal.
- Reflect defensive posture.

Styling rules:

- Title uses `--text-tertiary`.
- Available now → `data-tone="primary"`.
- Deferred withdrawals → `data-tone="tertiary"`.
- Suspended yield → muted + dimmed.

No inline styling allowed.

---

## 7. Bottom Navigation

Bottom navigation uses `data-active` state:

- `data-active="true"`
- `data-active="false"`

Label colour must derive from tokens.

No inline colour styles permitted.

---

## 8. Defensive State Transitions

Recognised states:

- Normal
- Tightening
- Defensive
- Yield Suspended

Transitions must:

- Trigger a notice banner.
- Update shield state.
- Update allocation band tone.
- Preserve withdrawal clarity.

UI must not perform hidden reallocation animations without explanation.

---

## 9. Accessibility & Legibility

The UI system must:

- Maintain contrast ratios.
- Avoid tone-only signalling (must include labels or icons).
- Avoid flashing transitions during defensive shifts.

Colour is supportive, not exclusive.

---

## 10. Prohibited Patterns

The following are not allowed:

- Inline `style="color:"` in semantic components.
- Hardcoded hex values in bands, shield, stability bar, or withdrawal rows.
- UI-based balance calculations.
- Yield emphasis larger than liquidity emphasis.
- Hidden defensive state transitions.

---

## 11. Test Guarantees

CI / QA must validate:

- Tone changes when defensive state changes.
- Suspended yield overrides accent correctly.
- No inline colour styles remain in semantic components.
- Notice banners appear during tightening.

---

## 12. Change Discipline

UI changes that affect:

- Tone mapping
- Defensive state visuals
- Allocation presentation
- Notice system

Require:

1. ADR entry (if behavioural impact exists)
2. Visual regression check
3. Documentation update

The UI is a contract with the user.
It must reflect system truth.