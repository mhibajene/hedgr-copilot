/**
 * Research-entry copy for CLASS-A-VAL-002-ORIENT-003.
 *
 * This module implements the bounded D-110 / §242 orientation restructure.
 * It is a research stimulus and safety boundary, not a source of product
 * positioning, customer-value language, or frozen narrative.
 */

export const ORIENTATION_PATH = '/orientation';
export const ORIENTATION_CONTINUE_HREF =
  '/dashboard-synthetic-journey?reset=1';
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

export const ORIENTATION_FORBIDDEN_PARTICIPANT_TERMS = [
  'Financial Stability Companion',
  'Cognitive Stewardship',
  'Institutional Warmth',
  'Financial Stability Operating System',
  'financial stability',
  'FSOS',
  'Stability Wallet',
  'currency',
  'purchasing power',
  'preserved purchasing power',
  'protection',
  'control',
  'diversification',
  'dollarisation',
  'FX management',
  'allocation',
  'liquidity',
  'exit readiness',
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
  title: 'Explore Hedgr',
  disclosure: {
    heading: 'This is a research prototype.',
    body: 'The financial information and actions in this experience are simulated. No real money moves, no financial account is opened, and nothing here is financial advice.',
  },
  dataBoundary: 'Do not enter real personal or financial information.',
  continue: {
    href: ORIENTATION_CONTINUE_HREF,
    label: 'Enter Hedgr',
  },
} as const;

export function collectOrientationText(): string {
  const { title, eyebrow, disclosure, dataBoundary, continue: continuation } =
    ORIENTATION_SURFACE;

  return [
    eyebrow,
    title,
    disclosure.heading,
    disclosure.body,
    dataBoundary,
    continuation.label,
  ].join('\n');
}

export function orientationContainsForbiddenTerms(
  text: string = collectOrientationText(),
): string[] {
  return ORIENTATION_FORBIDDEN_PARTICIPANT_TERMS.filter((term) =>
    text.toLowerCase().includes(term.toLowerCase()),
  );
}
