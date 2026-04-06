import { describe, expect, test } from 'vitest';
import { getMockEngineState } from '../lib/engine/mock';
import { ENGINE_NOTICE_COPY } from '../lib/engine/notices';
import type { EnginePosture } from '../lib/engine/types';

const NON_NORMAL: Exclude<EnginePosture, 'normal'>[] = [
  'tightening',
  'tightened',
  'recovery',
];

describe('ENGINE_NOTICE_COPY', () => {
  test.each(NON_NORMAL)(
    '%s has non-empty title and body with shipped informational / non-ledger framing',
    (posture) => {
      const notice = ENGINE_NOTICE_COPY[posture];
      expect(notice.title.length).toBeGreaterThan(0);
      expect(notice.body.length).toBeGreaterThan(0);
      const body = notice.body.toLowerCase();
      expect(body).toMatch(/informational/);
      expect(body).toMatch(/not your ledger/);
    },
  );
});

describe('getMockEngineState', () => {
  test('normal omits notice', () => {
    expect(getMockEngineState('normal').notice).toBeUndefined();
  });

  test.each(NON_NORMAL)('%s notice matches ENGINE_NOTICE_COPY', (posture) => {
    expect(getMockEngineState(posture).notice).toEqual(
      ENGINE_NOTICE_COPY[posture],
    );
  });
});
