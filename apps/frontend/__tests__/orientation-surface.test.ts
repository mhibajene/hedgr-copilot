import { describe, expect, test } from 'vitest';
import {
  ORIENTATION_CANONICAL_STORY_PATH,
  ORIENTATION_CONTINUE_HREF,
  ORIENTATION_CUSTOMER_ONE_PAGER_PATH,
  ORIENTATION_CUSTOMER_ONE_PAGER_VNEXT_PATH,
  ORIENTATION_LEGACY_FALLBACK_HREF,
  ORIENTATION_PATH,
  ORIENTATION_SURFACE,
  ORIENTATION_UNSUPPLIED_BRAND_ASSETS,
  collectOrientationText,
  orientationContainsForbiddenTerms,
} from '../lib/narrative/orientation-surface';

const REQUIRED_BLOCK_IDS = [
  'why-hedgr-exists',
  'stability-purpose',
  'stability-approach',
  'risk-liquidity-exit',
  'what-is-real-today',
] as const;

describe('CLASS-A-VAL-002-ORIENT-002 orientation surface copy', () => {
  test('exposes the five required orientation claims with governed provenance', () => {
    const ids = ORIENTATION_SURFACE.blocks.map((block) => block.id);

    expect(ids).toEqual([...REQUIRED_BLOCK_IDS]);

    for (const block of ORIENTATION_SURFACE.blocks) {
      expect(block.heading.length).toBeGreaterThan(0);
      expect(block.body.length).toBeGreaterThan(0);
      expect(block.provenance.length).toBeGreaterThan(0);
      expect(block.provenance).toContainEqual(
        expect.objectContaining({
          source: 'customer-one-pager-vnext',
          version: 'vNext candidate',
          path: ORIENTATION_CUSTOMER_ONE_PAGER_VNEXT_PATH,
        }),
      );

      for (const entry of block.provenance) {
        if (entry.source === 'canonical-story') {
          expect(entry.version).toBe('1.0');
          expect(entry.path).toBe(ORIENTATION_CANONICAL_STORY_PATH);
        } else if (entry.source === 'customer-one-pager') {
          expect(entry.version).toBe('1.0');
          expect(entry.path).toBe(ORIENTATION_CUSTOMER_ONE_PAGER_PATH);
        } else {
          expect(entry.source).toBe('customer-one-pager-vnext');
          expect(entry.version).toBe('vNext candidate');
          expect(entry.path).toBe(ORIENTATION_CUSTOMER_ONE_PAGER_VNEXT_PATH);
        }
      }
    }
  });

  test('continues into the existing synthetic journey without inventing a live capability path', () => {
    expect(ORIENTATION_PATH).toBe('/orientation');
    expect(ORIENTATION_SURFACE.continue.href).toBe(ORIENTATION_CONTINUE_HREF);
    expect(ORIENTATION_CONTINUE_HREF).toBe(
      '/dashboard-synthetic-journey?reset=1',
    );
    expect(ORIENTATION_LEGACY_FALLBACK_HREF).toBe(
      '/dashboard?journey=class-a-val-002',
    );
  });

  test('keeps the participant-facing surface free of forbidden research and crypto-first language', () => {
    expect(orientationContainsForbiddenTerms()).toEqual([]);
  });

  test('states the research-stage boundary and does not imply live money movement', () => {
    const text = collectOrientationText();

    expect(text).toMatch(/research/i);
    expect(text).toMatch(/prototype/i);
    expect(text).toMatch(/informational or synthetic/i);
    expect(text).toMatch(/does not hold or move real customer money/i);
    expect(text).toMatch(/does not provide live custody/i);
    expect(text).toMatch(/real deposits or withdrawals/i);
    expect(text).not.toMatch(/your money is protected/i);
    expect(text).not.toMatch(/guaranteed return/i);
    expect(text).not.toMatch(/open an account now/i);
    expect(ORIENTATION_SURFACE.continue.note).toMatch(/not a deposit prompt/i);
  });

  test('uses the proposed vNext only as the bounded copy translation control', () => {
    const serialized = JSON.stringify(ORIENTATION_SURFACE);

    expect(serialized).toContain(ORIENTATION_CUSTOMER_ONE_PAGER_VNEXT_PATH);
    expect(serialized).toContain('vNext candidate');
    expect(collectOrientationText()).not.toMatch(
      /Financial Stability Operating System|\bFSOS\b/i,
    );
  });

  test('renders the approved human copy without displaced achieved-state language', () => {
    const text = collectOrientationText();

    expect(text).toContain(
      'In volatile economies, the hard part is not finding another app.',
    );
    expect(text).toContain('What Hedgr helps you understand');
    expect(text).toContain(
      'Hedgr is building a calm digital experience to help people understand where they stand financially before deciding what to do next.',
    );
    expect(text).toContain(
      'The first customer experience Hedgr is building is the Stability Wallet',
    );
    expect(text).toContain(
      'See stability and risk more clearly. Understand the factors that may strengthen or weaken your financial position.',
    );
    expect(text).toContain(
      'Liquidity, access, and exit readiness remain central to what the experience helps you understand.',
    );
    expect(text).toContain('The experience uses simulated information.');

    expect(text).not.toContain('Hedgr is building a financial stability system');
    expect(text).not.toContain('preserve purchasing power');
    expect(text).not.toContain('See how stable that position looks');
    expect(text).not.toContain('Act only after');
    expect(text).not.toContain('remain part of the product');
    expect(text).not.toContain('It does not mean live custody');
  });

  test('records unused brand assets as missing inputs instead of substituting them', () => {
    expect(ORIENTATION_UNSUPPLIED_BRAND_ASSETS.length).toBeGreaterThan(0);
    expect(ORIENTATION_SURFACE.continue.href).not.toMatch(/social-cover/i);
  });
});
