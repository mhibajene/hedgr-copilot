/**
 * Ticket-local copy for the MC-S2-009 expandable explainer (dashboard allocation surface).
 * Principle-level posture only—does not duplicate ENGINE_POSTURE_CONTEXT or ENGINE_NOTICE_COPY.
 */

export const ENGINE_STABILITY_EXPLAINER_SUMMARY = 'How to read these targets';

/** One short intro line (informational framing). */
export const ENGINE_STABILITY_EXPLAINER_INTRO =
  'Plain-language definitions for the labels above—informational posture, not ledger truth.';

export const ENGINE_STABILITY_EXPLAINER_TERMS: ReadonlyArray<{
  term: string;
  definition: string;
}> = [
  {
    term: 'Available',
    definition: 'Ready to use.',
  },
  {
    term: 'Core',
    definition: 'Kept stable to preserve value.',
  },
  {
    term: 'Growth capacity',
    definition:
      'Up to this target can support returns when conditions allow.',
  },
];

export const ENGINE_STABILITY_EXPLAINER_PRINCIPLES: readonly string[] = [
  'The split keeps availability, stability, and growth capacity visible together as system intent—not as a map of where funds sit.',
  'When the system is more cautious, protection and liquidity can outweigh growth capacity. Posture reflects that caution; it does not describe completed movement.',
];

export const ENGINE_STABILITY_EXPLAINER_FOOTER =
  'Targets are not accounting truth. Your ledger shows balances; these bands do not mean funds have moved.';
