/**
 * Derived orientation copy for CLASS-A-VAL-002-ORIENT-001.
 *
 * This module is a consumer of frozen governed narrative. It is not a source
 * of Hedgr positioning. Do not import the unaccepted Customer One-Pager vNext.
 */

export const ORIENTATION_PATH = '/orientation';
export const ORIENTATION_CONTINUE_HREF = '/dashboard-synthetic-journey';
export const ORIENTATION_LEGACY_FALLBACK_HREF =
  '/dashboard?journey=class-a-val-002';
export const ORIENTATION_LOGO_SRC = '/brand/hedgr_logo.svg';

/** Remaining DESIGN.md assets not required by this nested ticket and still absent from `assets/brand/`. */
export const ORIENTATION_UNSUPPLIED_BRAND_ASSETS = [
  'hedgr_logo.png',
  'hedgr_logo_white.png',
  'hedgr_icon_color.png',
  'hedgr_icon_white.png',
  'hedgr_favicon.ico',
  'hedgr_social_icon.png',
  'hedgr_inverse_avatar.png',
] as const;

export const ORIENTATION_CANONICAL_STORY_PATH =
  'docs/strategy/narrative/HEDGR_CANONICAL_STORY.md';
export const ORIENTATION_CUSTOMER_ONE_PAGER_PATH =
  'docs/strategy/customer/HEDGR_CUSTOMER_ONE_PAGER.md';

export type OrientationSource = 'canonical-story' | 'customer-one-pager';

export type OrientationProvenance = {
  source: OrientationSource;
  version: '1.0';
  section: string;
  path: string;
};

export type OrientationBlock = {
  id:
    | 'why-hedgr-exists'
    | 'stability-purpose'
    | 'stability-approach'
    | 'risk-liquidity-exit'
    | 'what-is-real-today';
  heading: string;
  body: string[];
  provenance: OrientationProvenance[];
};

const canonical = (
  section: string,
): OrientationProvenance => ({
  source: 'canonical-story',
  version: '1.0',
  section,
  path: ORIENTATION_CANONICAL_STORY_PATH,
});

const onePager = (
  section: string,
): OrientationProvenance => ({
  source: 'customer-one-pager',
  version: '1.0',
  section,
  path: ORIENTATION_CUSTOMER_ONE_PAGER_PATH,
});

export const ORIENTATION_FORBIDDEN_PARTICIPANT_TERMS = [
  'Financial Stability Companion',
  'Cognitive Stewardship',
  'Institutional Warmth',
  'DeFi',
  'crypto',
  'cryptocurrency',
  'stablecoin',
  'farm',
  'moon',
] as const;

export const ORIENTATION_SURFACE = {
  documentTitle: 'Hedgr',
  logoAlt: 'Hedgr',
  eyebrow: 'Research prototype',
  title: 'Build financial stability when your currency is unpredictable.',
  lede: 'Hedgr helps you understand your situation before deciding what to do next.',
  disclosure: {
    heading: 'This is an informational research experience.',
    body: 'What follows is a prototype. It does not move real money, open an account, or offer financial advice.',
  },
  continue: {
    href: ORIENTATION_CONTINUE_HREF,
    label: 'Explore the prototype',
    note: 'This is a bounded research invitation. It is not a deposit prompt, earnings prompt, or waitlist for a named market.',
  },
  blocks: [
    {
      id: 'why-hedgr-exists',
      heading: 'Why Hedgr exists',
      body: [
        'People can work hard, save consistently, and plan carefully, yet still move backwards when the money they depend on no longer behaves as expected.',
        'When money becomes less predictable, paying bills, planning ahead, and making confident decisions all become harder.',
        'Hedgr exists to close that stability gap: the distance between what money should do (preserve value, remain accessible, stay understandable) and what ordinary financial tools deliver under stress.',
      ],
      provenance: [
        onePager('The problem'),
        canonical('1. The Stability Gap'),
      ],
    },
    {
      id: 'stability-purpose',
      heading: 'What Hedgr is concerned with',
      body: [
        'Hedgr is building a financial stability system.',
        'It is a calm digital experience designed to help people understand their financial position, preserve purchasing power, and stay aware of risk and liquidity when conditions are uncertain.',
        'Stability comes first. Growth, if present at all, stays secondary.',
      ],
      provenance: [
        onePager('What Hedgr is'),
        canonical('2. Our Belief'),
        canonical('4. Introducing Hedgr'),
      ],
    },
    {
      id: 'stability-approach',
      heading: 'How Hedgr approaches stability',
      body: [
        'Understand your position in plain language.',
        'See how stable that position looks, without hype.',
        'Treat exit readiness as central, not optional.',
        'Act only after the picture is clear.',
      ],
      provenance: [
        onePager('How the experience helps'),
        canonical('3. What We Mean by Financial Stability'),
        canonical('5. The Stability Experience'),
      ],
    },
    {
      id: 'risk-liquidity-exit',
      heading: 'What remains material',
      body: [
        'Risk stays visible. Liquidity and the ability to exit remain part of the product, not optional extras.',
        'Hedgr does not encourage speculation, hide risk behind growth wording, or guarantee purchasing-power preservation, liquidity, access, or outcomes.',
        'It also does not claim regulatory approval, live banking integrations, or a confirmed launch market.',
      ],
      provenance: [
        onePager('Trust and risk boundary'),
        canonical('7. Trust by Design'),
      ],
    },
    {
      id: 'what-is-real-today',
      heading: 'What Hedgr can and cannot do today',
      body: [
        'Today, Hedgr is in a research and prototype stage.',
        'What you may explore now is an informational or synthetic experience. It is intended to explain the stability proposition and gather feedback.',
        'It does not mean live custody, real deposits or withdrawals, live local-currency conversion, automated allocation, live yield routing, investment management, or financial advice.',
      ],
      provenance: [
        onePager('What is real today'),
        canonical('Explicit Exclusions'),
        canonical('10. Institutional Roadmap'),
      ],
    },
  ] satisfies OrientationBlock[],
} as const;

export function collectOrientationText(): string {
  const { title, lede, eyebrow, disclosure, continue: continuation, blocks } =
    ORIENTATION_SURFACE;

  return [
    eyebrow,
    title,
    lede,
    disclosure.heading,
    disclosure.body,
    continuation.label,
    continuation.note,
    ...blocks.flatMap((block) => [block.heading, ...block.body]),
  ].join('\n');
}

export function orientationContainsForbiddenTerms(
  text: string = collectOrientationText(),
): string[] {
  return ORIENTATION_FORBIDDEN_PARTICIPANT_TERMS.filter((term) =>
    text.toLowerCase().includes(term.toLowerCase()),
  );
}
