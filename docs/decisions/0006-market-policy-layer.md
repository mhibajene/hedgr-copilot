# ADR 0006 – Market Policy Layer: Configurable Compliance Controls Before Multi-Market Expansion (Post Sprint 0.9)


## Status
Accepted

## Date
2026-01-29

## Decision Type
UX/Trust

## Strategic Horizon
Mid-Term (Scale)

## Reversibility
Reversible

---

## Context / Problem
- We’re entering multi-market expansion (ZW/KE/ZA) right after Sprint 0.9, and currency/settlement rules can invalidate core flows if behavior is hardcoded.
- Without a configurable policy layer, we risk shipping non-compliant “domestic settlement in foreign value” flows and eroding trust via reversals/frozen funds.


---

## Decision
- Build a Market Policy Layer next (GM-RP + per-market overlays) that controls:

    ◦ feature availability (flags + geofencing)
    ◦ settlement currency rules (local-currency-first for pay/settle UX)
    ◦ FX rate provenance + rate-lock
    ◦ required disclosures / banned claims

- Keep high-risk features OFF by default until market-ready:

    ◦ ZW: local stablecoin send, pay links, earn = OFF
    ◦ ZA: stablecoin send = OFF until Travel Rule-ready
    ◦ KE: earn = PILOT behind disclosures + limits

- Keep Copilot OFF/limited until it consumes the market policy and cannot recommend disallowed actions.


---

## Rationale

- Prevents compliance-driven trust failures (blocked payments, forced reversals).
- Avoids country-specific code forks; expansion becomes config + tests, not rewrites.
- Alternatives rejected:

    ◦ ad hoc per-market patches → inconsistent + high tech debt + high incident risk
    ◦ global strict mode → safe but over-restrictive and slows growth in permissive markets



---

## Assumptions

- Market constraints can be expressed as policy/config (flags, limits, disclosure rules).
- We can reliably determine market (or default conservative when uncertain).
- FX rate source + timestamp can be captured and stored for auditability.


---

## Risks / Trade-offs

- Slower near-term feature shipping to build the policy layer.
- Adds config/testing surface area.
- Potential over-restriction until partner/regulator clarity improves.
- Incorrect market detection could misapply restrictions (mitigate with conservative defaults + overrides).


## Revisit / Kill Criteria

- If market detection is unreliable and conservative defaults materially harm usability → require explicit market selection / stronger gating.
- If FX rate-lock + provenance creates high failure/dispute rates → revise rate policy.
- If key market rules can’t be represented via overlays without major bespoke logic → delay entry or isolate into a separate product mode.

---
