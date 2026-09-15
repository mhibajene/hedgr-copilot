// @vitest-environment jsdom
import React from 'react';
import { afterEach, expect, test, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { CurrencyInsight } from '../app/(app)/dashboard/CurrencyInsight';
import { makeCurrencyExample } from '../lib/narrative/simulation-currency-insight';

(globalThis as typeof globalThis & { React: typeof React }).React = React;
const dialogMethods = ['showModal', 'close'] as const;
const originalDialogMethods = dialogMethods.map(name => Object.getOwnPropertyDescriptor(HTMLDialogElement.prototype, name));
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  dialogMethods.forEach((name, index) => {
    const descriptor = originalDialogMethods[index];
    if (descriptor) Object.defineProperty(HTMLDialogElement.prototype, name, descriptor);
    else Reflect.deleteProperty(HTMLDialogElement.prototype, name);
  });
});
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

test('research detail preserves comparison limits, stays read-only and returns focus', () => {
  const writes = vi.spyOn(Storage.prototype, 'setItem');
  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', { configurable: true, value: function (this: HTMLDialogElement) { this.open = true; } });
  Object.defineProperty(HTMLDialogElement.prototype, 'close', { configurable: true, value: function (this: HTMLDialogElement) { this.open = false; this.dispatchEvent(new Event('close')); } });
  render(<CurrencyInsight {...props} redesigned />);
  const trigger = screen.getByRole('button', { name: 'Understand the comparison' });
  fireEvent.click(trigger);
  const dialog = screen.getByRole('dialog', { name: 'Currency context' });
  expect(dialog.textContent).toContain('ZMW 5,700.00');
  expect(dialog.textContent).toContain('ZMW 6,000.00');
  expect(dialog.textContent).toContain('It does not mean you held this amount for 30 days.');
  expect(dialog.textContent).toContain('Not your account history or live market data.');
  expect(dialog.textContent).toContain('not earnings, purchasing power, guaranteed protection or a conversion quote');
  fireEvent.click(screen.getByRole('button', { name: 'Back to Home' }));
  expect(document.activeElement).toBe(trigger);
  expect(writes).not.toHaveBeenCalled();
});

test('research unavailable comparison cannot expose an invented detail', () => {
  render(<CurrencyInsight {...props} redesigned pending />);
  expect(screen.getByText('Currency comparison unavailable.')).toBeDefined();
  expect(screen.queryByRole('button', { name: 'Understand the comparison' })).toBeNull();
  expect(screen.queryByTestId('currency-insight-direction')).toBeNull();
});


test.each([
  [300, 20, 20, 'Same local estimate.', 'The exchange rates are equal in this comparison.'],
  [0.01, 0.2, 0.19, 'Same estimate at this display precision.', 'Only the exchange rate changes in this comparison.'],
] as const)('research detail describes equal and rounded-zero estimates accurately (%s, %s)', (usdAmount, latestDisplayRate, earlierRate, title, meaning) => {
  const example = makeCurrencyExample(latestDisplayRate);
  example.earlier.rate = earlierRate;
  render(<CurrencyInsight {...props} usdAmount={usdAmount} latestDisplayRate={latestDisplayRate} example={example} redesigned />);
  expect(screen.getByText(title, { exact: false })).toBeDefined();
  expect(screen.getByText(meaning)).toBeDefined();
  expect(screen.queryByText('Different local estimate.', { exact: false })).toBeNull();
});
