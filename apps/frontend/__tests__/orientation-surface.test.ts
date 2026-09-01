import { describe, expect, test } from 'vitest';
import {
  ORIENTATION_CONTINUE_HREF,
  ORIENTATION_LEGACY_FALLBACK_HREF,
  ORIENTATION_PATH,
  ORIENTATION_SURFACE,
  ORIENTATION_UNSUPPLIED_BRAND_ASSETS,
  collectOrientationText,
  orientationContainsForbiddenTerms,
} from '../lib/narrative/orientation-surface';

describe('CLASS-A-VAL-002-ORIENT-003 orientation surface', () => {
  test('contains only the approved pre-entry information budget', () => {
    expect(ORIENTATION_SURFACE).toEqual({
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
        href: '/dashboard-synthetic-journey?reset=1',
        label: 'Enter Hedgr',
      },
    });
  });

  test('continues into the existing synthetic journey without changing rollback seams', () => {
    expect(ORIENTATION_PATH).toBe('/orientation');
    expect(ORIENTATION_SURFACE.continue.href).toBe(ORIENTATION_CONTINUE_HREF);
    expect(ORIENTATION_CONTINUE_HREF).toBe(
      '/dashboard-synthetic-journey?reset=1',
    );
    expect(ORIENTATION_LEGACY_FALLBACK_HREF).toBe(
      '/dashboard?journey=class-a-val-002',
    );
  });

  test('states every material research and safety consequence before entry', () => {
    const text = collectOrientationText();

    expect(text).toMatch(/research prototype/i);
    expect(text).toMatch(/information and actions .* simulated/i);
    expect(text).toMatch(/no real money moves/i);
    expect(text).toMatch(/no financial account is opened/i);
    expect(text).toMatch(/nothing here is financial advice/i);
    expect(text).toMatch(/do not enter real personal or financial information/i);
  });

  test('does not pre-answer the unaided customer-value questions', () => {
    const text = collectOrientationText();

    expect(orientationContainsForbiddenTerms(text)).toEqual([]);
    expect(text).not.toMatch(/Hedgr helps/i);
    expect(text).not.toMatch(/why Hedgr exists/i);
    expect(text).not.toMatch(/what Hedgr helps you understand/i);
    expect(text).not.toMatch(/what remains material/i);
    expect(text).not.toMatch(/what Hedgr can and cannot do today/i);
    expect(text).not.toMatch(/deposit prompt|earnings prompt|waitlist/i);
  });

  test('removes the inherited narrative and frozen-source provenance architecture', () => {
    const serialized = JSON.stringify(ORIENTATION_SURFACE);

    expect(serialized).not.toMatch(/blocks|provenance|canonical-story/i);
    expect(serialized).not.toMatch(/customer-one-pager|vNext candidate/i);
    expect(serialized).not.toMatch(/lede|bounded research invitation/i);
  });

  test('records unused brand assets as missing inputs instead of substituting them', () => {
    expect(ORIENTATION_UNSUPPLIED_BRAND_ASSETS.length).toBeGreaterThan(0);
    expect(ORIENTATION_SURFACE.continue.href).not.toMatch(/social-cover/i);
  });
});
