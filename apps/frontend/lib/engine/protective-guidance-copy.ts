/**
 * Ticket-local copy for MC-S2-010 protective guidance (dashboard allocation surface).
 * Principle-level only—does not duplicate ENGINE_POSTURE_CONTEXT or ENGINE_NOTICE_COPY.
 */

export const ENGINE_PROTECTIVE_GUIDANCE_TITLE = 'Protection in plain terms';

/** One framing paragraph: deliberate intent, not operational status. */
export const ENGINE_PROTECTIVE_GUIDANCE_FRAMING =
  'Hedgr treats stability and protection as deliberate design choices. In tougher conditions, these informational targets may emphasize protection and liquidity ahead of conservative yield—not as a nudge to move funds, but as visible intent you can review.';

export const ENGINE_PROTECTIVE_GUIDANCE_POINTS: readonly string[] = [
  'Caution can limit conservative yield before protection is stressed; the split reflects that priority, not completed movement.',
  'The Reserve above still means readiness in principle—targets are informational, not your ledger balance.',
  'A protective posture does not by itself stop a withdrawal from processing or imply lockup.',
];
