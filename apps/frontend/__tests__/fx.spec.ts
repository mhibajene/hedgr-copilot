import { test, expect } from 'vitest';
import { FX_RATE_ZMW_PER_USD, zmwToUsd } from '../lib/fx';

test('zmw->usd conversion exact', () => {
  expect(FX_RATE_ZMW_PER_USD).toBe(20);
  expect(zmwToUsd(100)).toBe(5);
});

