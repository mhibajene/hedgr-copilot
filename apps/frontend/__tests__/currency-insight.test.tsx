// @vitest-environment jsdom
import React from 'react';
import { afterEach, expect, test, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { CurrencyInsight } from '../app/(app)/dashboard/CurrencyInsight';
import { makeCurrencyExample } from '../lib/narrative/simulation-currency-insight';

(globalThis as typeof globalThis & { React: typeof React }).React = React;
afterEach(() => { cleanup(); vi.restoreAllMocks(); });
const props = { usdAmount: 300, currency: 'ZMW' as const, latestDisplayRate: 20, ready: true };

test('keeps one compact difference, visible limits and a native calculation disclosure', () => {
  const writes = vi.spyOn(Storage.prototype, 'setItem');
  render(<CurrencyInsight {...props} />);
  expect(screen.getByTestId('currency-insight-headline').textContent).toContain('ZMW 300 higher from the rate change');
  expect(screen.getByText('FX comparison only—not earnings, purchasing power, guaranteed protection or a conversion quote.')).toBeDefined();
  const summary = screen.getByText('How this is calculated');
  const detail = summary.closest('details')!;
  expect(detail.open).toBe(false);
  summary.focus();
  expect(document.activeElement).toBe(summary);
  fireEvent.click(summary);
  expect(detail.open).toBe(true);
  expect(detail.textContent).toContain('ZMW 5,700.00');
  expect(detail.textContent).toContain('ZMW 6,000.00');
  expect(detail.textContent).toContain('No money has moved.');
  expect(detail.textContent).toContain('not your account history');
  expect(detail.textContent).toContain('It does not mean you held this amount for 30 days.');
  expect(writes).not.toHaveBeenCalled();
  expect(document.querySelector('[aria-live], [role="alert"], [role="status"]')).toBeNull();
});

test.each([
  [19, '↑', 'higher'], [21, '↓', 'lower'], [20, '—', 'No exchange-rate difference'],
] as const)('pairs the neutral decorative symbol with unambiguous words for rate %s', (earlierRate, symbol, words) => {
  const example = makeCurrencyExample(20);
  example.earlier.rate = earlierRate;
  render(<CurrencyInsight {...props} example={example} />);
  const arrow = screen.getByTestId('currency-insight-direction');
  expect(arrow.textContent).toBe(symbol);
  expect(arrow.getAttribute('aria-hidden')).toBe('true');
  expect(arrow.className).toContain('direction');
  expect(screen.getByTestId('currency-insight-headline').textContent).toContain(words);
});

test('distinguishes rounding from equal rates', () => {
  render(<CurrencyInsight {...props} usdAmount={0.01} latestDisplayRate={0.2} />);
  expect(screen.getByText('No difference at this display precision')).toBeDefined();
  expect(screen.queryByText('No exchange-rate difference')).toBeNull();
});

test('suppresses all content until ready, then handles zero, pending and invalid positions without direction', () => {
  const { rerender } = render(<CurrencyInsight {...props} ready={false} />);
  expect(screen.queryByTestId('currency-insight')).toBeNull();
  rerender(<CurrencyInsight {...props} usdAmount={0} />);
  expect(screen.getByText('No position to compare yet.')).toBeDefined();
  expect(screen.queryByTestId('currency-insight-direction')).toBeNull();
  for (const state of [{ pending: true }, { usdAmount: NaN }]) {
    rerender(<CurrencyInsight {...props} {...state} />);
    expect(screen.getByText('Currency comparison unavailable.')).toBeDefined();
    expect(screen.queryByTestId('currency-insight-direction')).toBeNull();
    expect(screen.queryByText('How this is calculated')).toBeNull();
  }
});

test.each(['earlier', 'latest'] as const)('withholds direction and detail when %s sample is unavailable', side => {
  const example = makeCurrencyExample(20);
  example[side].status = 'missing';
  render(<CurrencyInsight {...props} example={example} />);
  expect(screen.getByText(`The ${side} example rate is unavailable.`)).toBeDefined();
  expect(screen.queryByTestId('currency-insight-direction')).toBeNull();
  expect(screen.queryByText('How this is calculated')).toBeNull();
});
