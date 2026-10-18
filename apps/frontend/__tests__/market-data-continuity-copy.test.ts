import { describe, expect, test } from 'vitest';
import {
  getMarketDataContinuityCopy,
  getMarketDataContinuityCopyJoined,
} from '../lib/fx/market-data-continuity-copy';

const HIGH_RISK = [
  'guaranteed',
  'we will recover',
  'backend will',
  'system is down',
  'everything is broken',
] as const;

function assertNoHighRisk(text: string) {
  const lower = text.toLowerCase();
  for (const s of HIGH_RISK) {
    expect(lower.includes(s), `unexpected "${s}" in: ${text}`).toBe(false);
  }
}

describe('market-data-continuity-copy (MC-S2-020)', () => {
  test.each(['deposit', 'withdraw'] as const)('RELEASE-GATE-FIX-001 T1 %s locked example-rate copy', (route) => {
      const copy = getMarketDataContinuityCopyJoined(route);
      expect(copy).toContain("The example rate didn't load. This simulation uses a fixed example rate, not market data.");
      expect(copy).toContain('Confirm turns on once the example rate loads.');
      expect(copy).not.toMatch(/payment method|We could not load current market data|Confirm stays off/);
  });
  test('deposit: four body lines and headline cover trust structure', () => {
    const c = getMarketDataContinuityCopy('deposit');
    expect(c.headline.length).toBeGreaterThan(10);
    expect(c.lines).toHaveLength(3);
    const [a, b, e] = c.lines;
    expect(a).toMatch(/could not load|market data|exchange rate/i);
    expect(b).toMatch(/conversion|local|USD/i);
    expect(e).toMatch(/Confirm|off until|rate|without/i);
  });

  test('withdraw: four body lines distinguish route from transaction status', () => {
    const c = getMarketDataContinuityCopy('withdraw');
    expect(c.lines).toHaveLength(4);
    const joined = c.lines.join(' ');
    expect(joined).toMatch(/Withdraw|USD balance|payout|methods/i);
    expect(joined).not.toMatch(/IN_PROGRESS|processing your withdrawal request submitted/i);
  });

  test('joined copy: lean denylist for deposit and withdraw', () => {
    for (const route of ['deposit', 'withdraw'] as const) {
      const joined = getMarketDataContinuityCopyJoined(route);
      assertNoHighRisk(joined);
      expect(joined.length).toBeGreaterThan(80);
    }
  });
});


test('RELEASE-GATE-FIX-002 T2 exact Withdraw line 3 and method denylist', () => {
  const copy = getMarketDataContinuityCopy('withdraw');
  expect(copy.lines[2]).toBe('You are still on Withdraw. Your simulated balance stays visible.');
  expect(getMarketDataContinuityCopyJoined('withdraw')).not.toMatch(/(?:payment|payout)[ -]+methods?/i);
});

test('RELEASE-GATE-FIX-002 T4 DEPOSIT and other WITHDRAW lines remain locked', () => {
  expect(getMarketDataContinuityCopy('deposit')).toEqual({
    headline: 'Exchange rate data is temporarily unavailable',
    lines: [
      "The example rate didn't load. This simulation uses a fixed example rate, not market data.",
      'That means we cannot show a reliable conversion between your local amount and USD.',
      'Confirm turns on once the example rate loads.',
    ],
  });
  const copy = getMarketDataContinuityCopy('withdraw');
  expect(copy.headline).toBe('Exchange rate data is temporarily unavailable');
  expect([copy.lines[0], copy.lines[1], copy.lines[3]]).toEqual([
    "The example rate didn't load. This simulation uses a fixed example rate, not market data.",
    'That means we cannot show a reliable local-currency estimate for your withdrawal while the rate is missing.',
    'Confirm turns on once the example rate loads.',
  ]);
});
