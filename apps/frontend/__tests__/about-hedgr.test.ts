import { describe, expect, test } from 'vitest';
import {
  ABOUT_HEDGR_PATH,
  ABOUT_HEDGR_SURFACE,
} from '../lib/narrative/about-hedgr';

describe('CLASS-A-VAL-002-ABOUT-001 company context', () => {
  test('contains exactly the approved three-section information budget', () => {
    expect(ABOUT_HEDGR_PATH).toBe('/settings/about');
    expect(ABOUT_HEDGR_SURFACE).toEqual({
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
    });
  });

  test('preserves every material prototype consequence', () => {
    const text = ABOUT_HEDGR_SURFACE.sections
      .flatMap(({ heading, paragraphs }) => [heading, ...paragraphs])
      .join('\n');

    expect(text).toMatch(/research and product testing/i);
    expect(text).toMatch(/simulated information/i);
    expect(text).toMatch(/does not move real money/i);
    expect(text).toMatch(/open financial accounts/i);
    expect(text).toMatch(/provide financial advice/i);
  });

  test('does not introduce the excluded manual, technical, or product-promise language', () => {
    const serialized = JSON.stringify(ABOUT_HEDGR_SURFACE);

    expect(serialized).not.toMatch(
      /currency exposure|hedging|diversification|stablecoin|DeFi|dollari[sz]ation|purchasing-power preservation|liquidity architecture|exit readiness|\bcontrol\b|\bprotection\b/i,
    );
    expect(serialized).not.toMatch(
      /Stability Engine|technical architecture|investor|product manual|call to action|\bcta\b/i,
    );
    expect(ABOUT_HEDGR_SURFACE).not.toHaveProperty('cta');
  });
});
