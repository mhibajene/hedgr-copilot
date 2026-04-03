import { describe, expect, test } from 'vitest';
import { getFallbackPathClarificationLines } from '../lib/tx/public-status-fallback-path-clarification';
import { PublicTxStatus } from '../lib/tx';

/** MC-S2-019: high-risk substrings — loss of funds, guarantees, ops theater. */
const HIGH_RISK_SUBSTRINGS = [
  'guaranteed',
  'escalated',
  'support will',
  'manually handled',
  'completed now',
  'moved',
  'reallocated',
] as const;

/** Near-duplicates of MC-S2-017 / MC-S2-018 primary framing — strip must not restate these. */
const ADJACENT_STRIP_MARKERS = [
  'unresolved',
  'gone quiet',
  'forgotten',
  'not gone quiet',
] as const;

function assertNoHighRiskSubstrings(text: string) {
  const lower = text.toLowerCase();
  for (const s of HIGH_RISK_SUBSTRINGS) {
    expect(lower.includes(s), `unexpected substring "${s}" in: ${text}`).toBe(false);
  }
}

function assertDistinctFromAdjacentStrips(text: string) {
  const lower = text.toLowerCase();
  for (const s of ADJACENT_STRIP_MARKERS) {
    expect(lower.includes(s), `should not echo adjacent strip marker "${s}": ${text}`).toBe(false);
  }
}

describe('getFallbackPathClarificationLines (MC-S2-019)', () => {
  test('returns null for terminal public statuses', () => {
    expect(getFallbackPathClarificationLines(PublicTxStatus.SUCCESS)).toBeNull();
    expect(getFallbackPathClarificationLines(PublicTxStatus.FAILED)).toBeNull();
    expect(getFallbackPathClarificationLines(PublicTxStatus.REVERSED)).toBeNull();
    expect(getFallbackPathClarificationLines(PublicTxStatus.EXPIRED)).toBeNull();
  });

  test('returns null for PENDING_INIT (v1 is IN_PROGRESS only)', () => {
    expect(getFallbackPathClarificationLines(PublicTxStatus.PENDING_INIT)).toBeNull();
  });

  test('for IN_PROGRESS: constrained-path semantics, compact copy, distinct from 017/018', () => {
    const lines = getFallbackPathClarificationLines(PublicTxStatus.IN_PROGRESS);
    expect(lines).not.toBeNull();
    expect(lines!.length).toBeGreaterThanOrEqual(1);
    expect(lines!.length).toBeLessThanOrEqual(2);
    const joined = lines!.join(' ');

    expect(joined).toMatch(/more time|extra checks|checks than|simplest withdrawal|simpler/i);
    expect(joined).toMatch(/normal way|move forward|processing/i);

    assertDistinctFromAdjacentStrips(joined);
    assertNoHighRiskSubstrings(joined);

    const lower = joined.toLowerCase();
    expect(lower.includes('loss'), 'should not imply loss').toBe(false);
    expect(lower.includes('lockup'), 'should not imply lockup').toBe(false);
  });
});
