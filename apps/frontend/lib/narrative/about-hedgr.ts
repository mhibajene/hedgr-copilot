/**
 * Optional company context for CLASS-A-VAL-002-ABOUT-001.
 *
 * This surface is deliberately separate from the research-entry stimulus. It
 * provides the bounded D-111 / §243 copy without changing product positioning,
 * the participant protocol, or the unaided customer-value evidence boundary.
 */

export const ABOUT_HEDGR_PATH = '/settings/about';

export const ABOUT_HEDGR_SURFACE = {
  title: 'About Hedgr',
  sections: [
    {
      heading: 'Why Hedgr exists',
      paragraphs: [
        'When the currency you rely on is unpredictable, managing money gets harder.',
        'What you earn today may not hold the same value tomorrow, and the alternatives available to you can be difficult, expensive or confusing.',
        'Hedgr exists to make that situation easier to understand.',
      ],
    },
    {
      heading: "What we're building",
      paragraphs: [
        "We're building tools to help people understand where they stand financially and make clearer decisions about what to do next.",
        "We're starting with the Stability Wallet — a simple place to understand your financial position and the things that may affect it.",
      ],
    },
    {
      heading: 'Where we are today',
      paragraphs: [
        'Hedgr is currently in research and product testing.',
        'The experience available today uses simulated information. It does not move real money, open financial accounts or provide financial advice.',
      ],
    },
  ],
} as const;
