import { describe, expect, test } from 'vitest';
import {
  ORIENTATION_CANONICAL_STORY_PATH,
  ORIENTATION_CONTINUE_HREF,
  ORIENTATION_CUSTOMER_ONE_PAGER_PATH,
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

describe('CLASS-A-VAL-002-ORIENT-001 orientation surface copy', () => {
  test('exposes the five required orientation claims with frozen-source provenance', () => {
    const ids = ORIENTATION_SURFACE.blocks.map((block) => block.id);

    expect(ids).toEqual([...REQUIRED_BLOCK_IDS]);

    for (const block of ORIENTATION_SURFACE.blocks) {
      expect(block.heading.length).toBeGreaterThan(0);
      expect(block.body.length).toBeGreaterThan(0);
      expect(block.provenance.length).toBeGreaterThan(0);
      expect(
        block.provenance.every(
          (entry) =>
            entry.version === '1.0' &&
            (entry.path === ORIENTATION_CANONICAL_STORY_PATH ||
              entry.path === ORIENTATION_CUSTOMER_ONE_PAGER_PATH),
        ),
      ).toBe(true);
    }
  });

  test('continues into the existing synthetic journey without inventing a live capability path', () => {
    expect(ORIENTATION_PATH).toBe('/orientation');
    expect(ORIENTATION_SURFACE.continue.href).toBe(ORIENTATION_CONTINUE_HREF);
    expect(ORIENTATION_CONTINUE_HREF).toBe('/dashboard-synthetic-journey');
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
    expect(text).toMatch(/does not mean live custody/i);
    expect(text).toMatch(/real deposits or withdrawals/i);
    expect(text).not.toMatch(/your money is protected/i);
    expect(text).not.toMatch(/guaranteed return/i);
    expect(text).not.toMatch(/open an account now/i);
    expect(ORIENTATION_SURFACE.continue.note).toMatch(/not a deposit prompt/i);
  });

  test('does not consume the unaccepted customer one-pager vNext', () => {
    const serialized = JSON.stringify(ORIENTATION_SURFACE);

    expect(serialized).not.toMatch(/HEDGR_CUSTOMER_ONE_PAGER_VNEXT/);
    expect(serialized).not.toMatch(/vNext/i);
  });

  test('records unused brand assets as missing inputs instead of substituting them', () => {
    expect(ORIENTATION_UNSUPPLIED_BRAND_ASSETS.length).toBeGreaterThan(0);
    expect(ORIENTATION_SURFACE.continue.href).not.toMatch(/social-cover/i);
  });
});
