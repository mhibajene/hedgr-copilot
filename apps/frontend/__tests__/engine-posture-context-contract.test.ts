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
});
