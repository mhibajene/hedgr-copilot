import { describe, expect, test } from 'vitest';
import type {
  EngineNotice,
  EnginePosture,
  EngineState,
} from '../lib/engine/types';

const ALL_ENGINE_POSTURES = [
  'normal',
  'tightening',
  'tightened',
  'recovery',
] as const satisfies readonly EnginePosture[];

type MissingEnginePostures = Exclude<
  EnginePosture,
  (typeof ALL_ENGINE_POSTURES)[number]
>;
type EnginePostureContractIsExhaustive =
  MissingEnginePostures extends never ? true : never;

const enginePostureContractIsExhaustive: EnginePostureContractIsExhaustive =
  true;

const REQUIRED_ENGINE_STATE_KEYS = [
  'coreTargetPct',
  'liquidityTargetPct',
  'posture',
  'updatedAt',
  'yieldCapPct',
] as const satisfies readonly (keyof EngineState)[];

const ENGINE_NOTICE_KEYS = ['body', 'title'] as const satisfies readonly (keyof EngineNotice)[];

const SAMPLE_ENGINE_NOTICE: EngineNotice = {
  title: 'Sample notice',
  body: 'Sample body',
};

const SAMPLE_ENGINE_STATE: EngineState = {
  posture: 'normal',
  liquidityTargetPct: 42,
  coreTargetPct: 44,
  yieldCapPct: 14,
  updatedAt: '2026-04-28T00:00:00Z',
};

const SAMPLE_ENGINE_STATE_WITH_NOTICE: EngineState = {
  ...SAMPLE_ENGINE_STATE,
  posture: 'tightening',
  notice: SAMPLE_ENGINE_NOTICE,
};

describe('engine type exports contract', () => {
  test('EnginePosture remains the canonical four-posture union', () => {
    expect(enginePostureContractIsExhaustive).toBe(true);
    expect([...ALL_ENGINE_POSTURES]).toEqual([
      'normal',
      'tightening',
      'tightened',
      'recovery',
    ]);
  });

  test('EngineState required field shape remains stable', () => {
    expect(Object.keys(SAMPLE_ENGINE_STATE).sort()).toEqual([
      ...REQUIRED_ENGINE_STATE_KEYS,
    ]);
    expect(SAMPLE_ENGINE_STATE.notice).toBeUndefined();
  });

  test('EngineNotice shape remains title and body only when present', () => {
    expect(Object.keys(SAMPLE_ENGINE_STATE_WITH_NOTICE.notice ?? {}).sort()).toEqual([
      ...ENGINE_NOTICE_KEYS,
    ]);
  });
});
