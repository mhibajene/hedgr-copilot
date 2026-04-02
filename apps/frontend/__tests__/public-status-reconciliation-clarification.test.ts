import { describe, expect, test } from 'vitest';
import { getReconciliationClarificationLines } from '../lib/tx/public-status-reconciliation-clarification';
import { PublicTxStatus } from '../lib/tx';

/** Small high-risk set: finality, execution, or timing overclaim (MC-S2-016). */
const HIGH_RISK_SUBSTRINGS = [
  'guaranteed',
  'settled',
  'completed now',
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

describe('getReconciliationClarificationLines (MC-S2-016)', () => {
  test('returns null for terminal public statuses', () => {
    expect(getReconciliationClarificationLines(PublicTxStatus.SUCCESS)).toBeNull();
    expect(getReconciliationClarificationLines(PublicTxStatus.FAILED)).toBeNull();
    expect(getReconciliationClarificationLines(PublicTxStatus.REVERSED)).toBeNull();
    expect(getReconciliationClarificationLines(PublicTxStatus.EXPIRED)).toBeNull();
  });

  test('returns null for PENDING_INIT (v1 anchor is IN_PROGRESS only)', () => {
    expect(getReconciliationClarificationLines(PublicTxStatus.PENDING_INIT)).toBeNull();
  });

  test('returns lines for IN_PROGRESS with positive trust framing', () => {
    const lines = getReconciliationClarificationLines(PublicTxStatus.IN_PROGRESS);
    expect(lines).not.toBeNull();
    expect(lines!.length).toBeGreaterThanOrEqual(2);
    const joined = lines!.join(' ');
    expect(joined).toMatch(/not final/i);
    expect(joined).toMatch(/confirm/i);
    expect(joined).toMatch(/does not automatically mean something is wrong/i);
    expect(joined).toMatch(/does not promise when/i);
    assertNoHighRiskSubstrings(joined);
  });
});
