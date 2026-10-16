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
    term: 'Main target',
    definition: 'One of the three planning targets. It is a percentage, not money set aside.',
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
  'The three planning targets show a plan. None of them shows where money sits.',
  'When Hedgr is more cautious, the Reserve target goes up and the target for earning goes down. Nothing is moved.',
];

export const ENGINE_STABILITY_EXPLAINER_FOOTER =
  'Targets are not accounting truth. Your ledger shows balances. These bands do not mean funds have moved.';
