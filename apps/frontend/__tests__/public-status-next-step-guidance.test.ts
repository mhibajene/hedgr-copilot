import { describe, expect, test } from 'vitest';
import { getNextStepGuidanceLines } from '../lib/tx/public-status-next-step-guidance';
import { PublicTxStatus } from '../lib/tx';

/** MC-S2-018: small high-risk denylist — guarantees, escalation, support promises, timing, manual ops. */
const HIGH_RISK_SUBSTRINGS = [
  'guaranteed',
  'escalate',
  'support will',
  'resolved soon',
  'manually handled',
  'immediately',
  'completed now',
] as const;

function assertNoHighRiskSubstrings(text: string) {
  const lower = text.toLowerCase();
  for (const s of HIGH_RISK_SUBSTRINGS) {
    expect(lower.includes(s), `unexpected substring "${s}" in: ${text}`).toBe(false);
  }
}

describe('getNextStepGuidanceLines (MC-S2-018)', () => {
  test('returns null for terminal public statuses', () => {
    expect(getNextStepGuidanceLines(PublicTxStatus.SUCCESS)).toBeNull();
    expect(getNextStepGuidanceLines(PublicTxStatus.FAILED)).toBeNull();
    expect(getNextStepGuidanceLines(PublicTxStatus.REVERSED)).toBeNull();
    expect(getNextStepGuidanceLines(PublicTxStatus.EXPIRED)).toBeNull();
  });

  test('returns null for PENDING_INIT (v1 is IN_PROGRESS only)', () => {
    expect(getNextStepGuidanceLines(PublicTxStatus.PENDING_INIT)).toBeNull();
  });

  test('for IN_PROGRESS: positive semantics and compact copy', () => {
    const lines = getNextStepGuidanceLines(PublicTxStatus.IN_PROGRESS);
    expect(lines).not.toBeNull();
    expect(lines!.length).toBeGreaterThanOrEqual(1);
    expect(lines!.length).toBeLessThanOrEqual(2);
    const joined = lines!.join(' ');

    expect(joined).toMatch(/in progress|still in progress/i);
    expect(joined).toMatch(/not gone quiet|gone quiet/i);
    expect(joined).toMatch(/does not mean failure|non-final/i);
    expect(joined).toMatch(/not shown yet|completion/i);

    const lower = joined.toLowerCase();
    expect(lower.includes('loss'), 'should not imply loss').toBe(false);
    expect(lower.includes('lockup'), 'should not imply lockup').toBe(false);

    assertNoHighRiskSubstrings(joined);
  });
});
