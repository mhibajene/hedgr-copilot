import { describe, expect, test } from 'vitest';
import { getUnresolvedPathClarificationLines } from '../lib/tx/public-status-unresolved-path-clarification';
import { PublicTxStatus } from '../lib/tx';

/** MC-S2-017: small high-risk denylist — escalation, execution overclaim, timing promise. */
const HIGH_RISK_SUBSTRINGS = [
  'guaranteed',
  'escalated',
  'resolved soon',
  'moved',
  'reallocated',
  'immediately',
] as const;

function assertNoHighRiskSubstrings(text: string) {
  const lower = text.toLowerCase();
  for (const s of HIGH_RISK_SUBSTRINGS) {
    expect(lower.includes(s), `unexpected substring "${s}" in: ${text}`).toBe(false);
  }
}

describe('getUnresolvedPathClarificationLines (MC-S2-017)', () => {
  test('returns null for terminal public statuses', () => {
    expect(getUnresolvedPathClarificationLines(PublicTxStatus.SUCCESS)).toBeNull();
    expect(getUnresolvedPathClarificationLines(PublicTxStatus.FAILED)).toBeNull();
    expect(getUnresolvedPathClarificationLines(PublicTxStatus.REVERSED)).toBeNull();
    expect(getUnresolvedPathClarificationLines(PublicTxStatus.EXPIRED)).toBeNull();
  });

  test('returns null for PENDING_INIT (v1 anchor is IN_PROGRESS only)', () => {
    expect(getUnresolvedPathClarificationLines(PublicTxStatus.PENDING_INIT)).toBeNull();
  });

  test('returns at most two lines for IN_PROGRESS with trust framing', () => {
    const lines = getUnresolvedPathClarificationLines(PublicTxStatus.IN_PROGRESS);
    expect(lines).not.toBeNull();
    expect(lines!.length).toBeGreaterThanOrEqual(1);
    expect(lines!.length).toBeLessThanOrEqual(2);
    const joined = lines!.join(' ');
    expect(joined).toMatch(/unresolved/i);
    expect(joined).toMatch(/not been forgotten|has not been forgotten/i);
    expect(joined).toMatch(/does not automatically mean something is wrong/i);
    assertNoHighRiskSubstrings(joined);
  });
});
