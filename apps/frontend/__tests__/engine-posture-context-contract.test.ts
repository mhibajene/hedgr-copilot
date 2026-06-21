import { describe, expect, test } from 'vitest';
import { ENGINE_POSTURE_CONTEXT } from '../lib/engine/posture-context';
import type { EnginePosture } from '../lib/engine/types';
import { ENGINE_TRUST_INFORMATIONAL_DENYLIST } from './engine-trust-framing-denylist';

const ALL_POSTURES: EnginePosture[] = [
  'normal',
  'tightening',
  'tightened',
  'recovery',
];

const HELD_OR_REJECTED_PRIMARY_TERMS = [
  /\bbalanced\b/i,
  /\bmonitoring\b/i,
  /\bmonitoring volatility\b/i,
  /\bprotected\b/i,
  /\bprotective mode active\b/i,
];

describe('ENGINE_POSTURE_CONTEXT', () => {
  test.each(ALL_POSTURES)('%s has non-empty shipped context line', (posture) => {
    expect(ENGINE_POSTURE_CONTEXT[posture].trim().length).toBeGreaterThan(0);
  });

  test.each(ALL_POSTURES)(
    '%s posture context avoids execution, accounting, and hype framing drift',
    (posture) => {
      const lower = ENGINE_POSTURE_CONTEXT[posture].toLowerCase();
      for (const forbidden of ENGINE_TRUST_INFORMATIONAL_DENYLIST) {
        expect(lower).not.toContain(forbidden);
      }
      expect(lower).not.toMatch(/\bexecuted\b/);
      expect(lower).not.toMatch(/\bguaranteed\b/);
    },
  );

  test('uses promoted posture-language patterns without held or rejected primary terms', () => {
    expect(ENGINE_POSTURE_CONTEXT.normal).toMatch(/within expected range/i);
    expect(ENGINE_POSTURE_CONTEXT.recovery).toMatch(/within expected range/i);
    expect(ENGINE_POSTURE_CONTEXT.tightening).toMatch(/protective posture/i);
    expect(ENGINE_POSTURE_CONTEXT.tightened).toMatch(/protective posture/i);
    expect(ENGINE_POSTURE_CONTEXT.normal).toMatch(/conservative yield/i);

    for (const copy of Object.values(ENGINE_POSTURE_CONTEXT)) {
      for (const forbidden of HELD_OR_REJECTED_PRIMARY_TERMS) {
        expect(copy).not.toMatch(forbidden);
      }
    }
  });
});
