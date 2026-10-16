/**
 * Ticket-local copy for MC-S2-010 protective guidance (dashboard allocation surface).
 * Principle-level only. Does not duplicate ENGINE_POSTURE_CONTEXT or ENGINE_NOTICE_COPY.
 */

export const ENGINE_PROTECTIVE_GUIDANCE_TITLE = 'When targets change';

/** One framing paragraph: deliberate intent, not operational status. */
export const ENGINE_PROTECTIVE_GUIDANCE_FRAMING =
  'In harder conditions, Hedgr may raise the Reserve target and lower the target for earning. You can see this here. It is not a prompt to do anything.';

export const ENGINE_PROTECTIVE_GUIDANCE_POINTS: readonly string[] = [
  'The Reserve above still means readiness in principle. Targets are informational, not your ledger balance.',
  'A higher Reserve target does not stop or delay a withdrawal.',
];
