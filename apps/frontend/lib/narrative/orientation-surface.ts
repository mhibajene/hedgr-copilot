/**
 * Derived orientation copy for CLASS-A-VAL-002-ORIENT-002.
 *
 * This module is a consumer of frozen governed narrative. It is not a source
 * of Hedgr positioning. Under D-079 / §209, the proposed Customer One-Pager
 * vNext may be used only as the bounded translation control recorded below;
 * it remains non-canonical, unpublished, and non-authoritative.
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
export const ORIENTATION_CUSTOMER_ONE_PAGER_VNEXT_PATH =
  'docs/strategy/customer/HEDGR_CUSTOMER_ONE_PAGER_VNEXT.md';

export type OrientationSource =
  | 'canonical-story'
  | 'customer-one-pager'
  | 'customer-one-pager-vnext';

export type OrientationProvenance = {
  source: OrientationSource;
  version: '1.0' | 'vNext candidate';
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

const vNext = (
  section: string,
): OrientationProvenance => ({
  source: 'customer-one-pager-vnext',
  version: 'vNext candidate',
  section,
  path: ORIENTATION_CUSTOMER_ONE_PAGER_VNEXT_PATH,
});

export const ORIENTATION_FORBIDDEN_PARTICIPANT_TERMS = [
  'Financial Stability Companion',
  'Cognitive Stewardship',
  'Institutional Warmth',
  'Financial Stability Operating System',
  'FSOS',
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
        'In volatile economies, the hard part is not finding another app. It is understanding where you stand and what may be available to use when conditions become less predictable.',
      ],
      provenance: [
        onePager('The problem'),
        canonical('1. The Stability Gap'),
        vNext('The problem'),
      ],
    },
    {
      id: 'stability-purpose',
      heading: 'What Hedgr helps you understand',
      body: [
        'Hedgr is building a calm digital experience to help people understand where they stand financially before deciding what to do next.',
        'It is designed to make three things easier to understand: what you have, what could affect it, and what may limit your access to it.',
        'The first customer experience Hedgr is building is the Stability Wallet, a clear place to see a financial position and its stability context.',
        'Stability comes first. Growth, if present at all, stays secondary.',
      ],
      provenance: [
        onePager('What Hedgr is'),
        canonical('2. Our Belief'),
        canonical('4. Introducing Hedgr'),
        vNext('What Hedgr is'),
      ],
    },
    {
      id: 'stability-approach',
      heading: 'How Hedgr approaches stability',
      body: [
        'Understand your financial position. See the value represented in the experience in plain language.',
        'See stability and risk more clearly. Understand the factors that may strengthen or weaken your financial position.',
        'Stay aware of liquidity and access. Treat exit readiness as central, not optional.',
        'See what is available next. Consider a next step only after the picture is clear.',
      ],
      provenance: [
        onePager('How the experience helps'),
        canonical('3. What We Mean by Financial Stability'),
        canonical('5. The Stability Experience'),
        vNext('How the experience helps'),
      ],
    },
    {
      id: 'risk-liquidity-exit',
      heading: 'What remains material',
      body: [
        'Risk stays visible. Liquidity, access, and exit readiness remain central to what the experience helps you understand.',
        'Hedgr does not encourage speculation, hide risk behind growth wording, or guarantee purchasing-power preservation, liquidity, access, or outcomes.',
        'It also does not claim regulatory approval, live banking integrations, or a confirmed launch market.',
      ],
      provenance: [
        onePager('Trust and risk boundary'),
        canonical('7. Trust by Design'),
        vNext('Trust and risk boundary'),
      ],
    },
    {
      id: 'what-is-real-today',
      heading: 'What Hedgr can and cannot do today',
      body: [
        'Today, Hedgr is in a research and prototype stage.',
        'What you may explore now is an informational or synthetic experience. It is designed to explain the stability proposition and gather feedback.',
        'The experience uses simulated information. It does not hold or move real customer money. It does not provide live custody, real deposits or withdrawals, live local-currency conversion, automated allocation, live yield routing, investment management, or financial advice.',
      ],
      provenance: [
        onePager('What is real today'),
        canonical('Explicit Exclusions'),
        canonical('10. Institutional Roadmap'),
        vNext('What is real today'),
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
