/**
 * Ticket-local copy for the MC-S2-009 expandable explainer (dashboard allocation surface).
 * Principle-level posture only. Does not duplicate ENGINE_POSTURE_CONTEXT or ENGINE_NOTICE_COPY.
 */

export const ENGINE_STABILITY_EXPLAINER_SUMMARY =
  'Why your balance is structured this way';

/** One short intro line (informational framing). */
export const ENGINE_STABILITY_EXPLAINER_INTRO =
  'Plain-language definitions for the labels above. This is informational posture, not ledger truth.';

export const ENGINE_STABILITY_EXPLAINER_TERMS: ReadonlyArray<{
  term: string;
  definition: string;
}> = [
  {
    term: 'Stable balance',
    definition: 'The primary holding lane. It is held steady to preserve value.',
  },
  {
    term: 'Conservative yield',
    definition:
      'A supporting lane. Up to this target can support returns when conditions allow.',
  },
  {
    term: 'Reserve',
    definition: 'A quiet buffer. It is kept ready in principle if you need it.',
  },
];

export const ENGINE_STABILITY_EXPLAINER_PRINCIPLES: readonly string[] = [
  'Most of the structure is held steady. Conservative yield and a reserve are quieter supporting lanes. This shows system intent, not a map of where funds sit.',
  'When the system is more cautious, protection and the reserve can outweigh conservative yield. Posture reflects that caution. It does not describe completed movement.',
];

export const ENGINE_STABILITY_EXPLAINER_FOOTER =
  'Targets are not accounting truth. Your ledger shows balances. These bands do not mean funds have moved.';
