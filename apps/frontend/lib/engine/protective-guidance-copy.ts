/**
 * Ticket-local copy for MC-S2-010 protective guidance (dashboard allocation surface).
 * Principle-level only—does not duplicate ENGINE_POSTURE_CONTEXT or ENGINE_NOTICE_COPY.
 */

export const ENGINE_PROTECTIVE_GUIDANCE_TITLE = 'Protection in plain terms';

/** One framing paragraph: deliberate intent, not operational status. */
export const ENGINE_PROTECTIVE_GUIDANCE_FRAMING =
  'Hedgr treats stability and protection as deliberate design choices. When conditions are less favorable, the system may emphasize protection and liquidity ahead of growth capacity in these informational targets—not as a directive to move funds, but as visible intent.';

export const ENGINE_PROTECTIVE_GUIDANCE_POINTS: readonly string[] = [
  'Caution can limit growth capacity before protection is compromised; the split reflects that priority, not completed movement.',
  'The Available label above still expresses readiness in principle—targets are informational, not your ledger balance.',
  'A protective posture does not by itself stop a withdrawal from processing or imply lockup.',
];
