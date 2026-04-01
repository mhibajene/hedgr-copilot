import { describe, expect, test } from 'vitest';
import { getExceptionPathClarificationLines } from '../lib/tx/public-status-exception-clarification';
import { PublicTxStatus } from '../lib/tx';

const HIGH_RISK_SUBSTRINGS = [
  'guaranteed',
  'will complete',
  'locked',
  'lockup',
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

describe('getExceptionPathClarificationLines (MC-S2-015)', () => {
  test('returns null for terminal public statuses', () => {
    expect(getExceptionPathClarificationLines(PublicTxStatus.SUCCESS)).toBeNull();
    expect(getExceptionPathClarificationLines(PublicTxStatus.FAILED)).toBeNull();
    expect(getExceptionPathClarificationLines(PublicTxStatus.REVERSED)).toBeNull();
    expect(getExceptionPathClarificationLines(PublicTxStatus.EXPIRED)).toBeNull();
  });

  test('returns lines for non-final in-flight statuses', () => {
    const pending = getExceptionPathClarificationLines(PublicTxStatus.PENDING_INIT);
    const progress = getExceptionPathClarificationLines(PublicTxStatus.IN_PROGRESS);
    expect(pending).not.toBeNull();
    expect(progress).not.toBeNull();
    expect(pending).toEqual(progress);
    expect(pending!.length).toBeGreaterThanOrEqual(2);
  });

  test('trust contract: calm framing without high-risk implication substrings', () => {
    const lines = getExceptionPathClarificationLines(PublicTxStatus.IN_PROGRESS)!;
    const joined = lines.join(' ');
    assertNoHighRiskSubstrings(joined);
    expect(joined).toMatch(/not final|still processing|taking more time/i);
    expect(joined).toMatch(/completion time|promised|screen/i);
  });
});
