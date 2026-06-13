/**
 * Ticket-local copy for the MC-S2-009 expandable explainer (dashboard allocation surface).
 * Principle-level posture only—does not duplicate ENGINE_POSTURE_CONTEXT or ENGINE_NOTICE_COPY.
 */

export const ENGINE_STABILITY_EXPLAINER_SUMMARY =
  'Why your balance is structured this way';

/** One short intro line (informational framing). */
export const ENGINE_STABILITY_EXPLAINER_INTRO =
  'Plain-language definitions for the labels above—informational posture, not ledger truth.';

export const ENGINE_STABILITY_EXPLAINER_TERMS: ReadonlyArray<{
  term: string;
  definition: string;
}> = [
  {
    term: 'Stable balance',
    definition: 'The primary holding lane—held steady to preserve value.',
  },
  {
    term: 'Conservative yield',
    definition:
      'A supporting lane—up to this target can support returns when conditions allow.',
  },
  {
    term: 'Reserve',
    definition: 'A quiet buffer—kept ready in principle if you need it.',
  },
];

export const ENGINE_STABILITY_EXPLAINER_PRINCIPLES: readonly string[] = [
  'Most of the structure is held steady, with conservative yield and a reserve shown as quieter supporting lanes—system intent, not a map of where funds sit.',
  'When the system is more cautious, protection and the reserve can outweigh conservative yield. Posture reflects that caution; it does not describe completed movement.',
];

export const ENGINE_STABILITY_EXPLAINER_FOOTER =
  'Targets are not accounting truth. Your ledger shows balances; these bands do not mean funds have moved.';
