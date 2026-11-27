// @vitest-environment jsdom
import React from 'react';
import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { CurrencyInsight } from '../app/(app)/dashboard/CurrencyInsight';

const attributionFiles = import.meta.glob<{ mountRateAttribution: (element: HTMLDivElement | null) => void }>(
  '../app/(app)/dashboard/RateAttribution.tsx',
);
const own = { usdAmount: 300, currency: 'ZMW' as const, latestDisplayRate: 27, ready: true, previousExampleRate: null };
const asOf = '2026-11-27T23:30:00.000Z';
const now = '2026-11-28T03:00:00.000Z';
const note = 'As of 27 November 2026. Not used in any figure on this sheet.';
const originalShowModal = Object.getOwnPropertyDescriptor(HTMLDialogElement.prototype, 'showModal');
const originalClose = Object.getOwnPropertyDescriptor(HTMLDialogElement.prototype, 'close');
let readRoute: ReturnType<typeof vi.fn<typeof fetch>>;

beforeEach(() => {
  vi.spyOn(Date, 'now').mockReturnValue(Date.parse(now));
  readRoute = vi.fn<typeof fetch>().mockImplementation(async () => Response.json({ rate: 20.58, asOf, available: true }));
  vi.stubGlobal('fetch', readRoute);
  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', { configurable: true, value(this: HTMLDialogElement) { this.open = true; } });
  Object.defineProperty(HTMLDialogElement.prototype, 'close', { configurable: true, value(this: HTMLDialogElement) { this.open = false; this.dispatchEvent(new Event('close')); } });
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  vi.useRealTimers();
  for (const [key, descriptor] of [['showModal', originalShowModal], ['close', originalClose]] as const) {
    if (descriptor) Object.defineProperty(HTMLDialogElement.prototype, key, descriptor);
    else Reflect.deleteProperty(HTMLDialogElement.prototype, key);
  }
});

async function mount() {
  const load = attributionFiles['../app/(app)/dashboard/RateAttribution.tsx'];
  expect(load, 'attribution mount exists').toBeDefined();
  return (await load()).mountRateAttribution;
}

function openSheet() {
  fireEvent.click(screen.getByRole('button', { name: 'Currency context' }));
  return within(screen.getByRole('dialog'));
}

describe('JOURNEY-REVIEW-001 item 3 (d) Daily rate row', () => {
  test('own ZMW uses the locked calculation sentence even with no attribution mount', async () => {
    render(<CurrencyInsight {...own} />);
    const sheet = openSheet();
    expect(sheet.getByText(/These figures use example rates only\. They are not your account history\./)).toBeDefined();
    await act(async () => {});
    expect(sheet.queryByText('Daily rate', { exact: true })).toBeNull();
    expect(readRoute).not.toHaveBeenCalled();
  });

  test('20.58 supplies only the Daily rate and provider date, leaving every example figure and storage intact', async () => {
    const attribution = await mount();
    const setItem = vi.spyOn(Storage.prototype, 'setItem');
    render(<main>
      <CurrencyInsight {...own} />
      <details data-testid="dashboard-disclosures"><summary>Important disclosures</summary><div ref={attribution} /></details>
    </main>);
    expect(readRoute).not.toHaveBeenCalled();
    const sheet = openSheet();
    const label = await sheet.findByText('Daily rate', { exact: true });
    const calculation = sheet.getByText('How this is calculated').closest('details')!;
    expect(calculation.contains(label)).toBe(true);
    expect(within(calculation).getByText('1 USD = 20.58 ZMW', { exact: true })).toBeDefined();
    expect(within(calculation).getByText(note, { exact: true })).toBeDefined();
    expect(calculation.querySelector('a')).toBeNull();
    expect(sheet.getByText('Three example rates. Not a live rate and not a forecast.', { exact: true })).toBeDefined();
    expect(sheet.getByText('Not a live rate.', { exact: true })).toBeDefined();
    const slider = sheet.getByRole('slider');
    for (const [stop, figure] of [['0', '≈ ZMW 7,350.00'], ['1', '≈ ZMW 8,100.00'], ['2', '≈ ZMW 8,850.00']]) {
      fireEvent.change(slider, { target: { value: stop } });
      expect(sheet.getByTestId('currency-rate-figure').textContent).toBe(figure);
    }
    expect(setItem).not.toHaveBeenCalled();
    fireEvent.click(sheet.getByRole('button', { name: 'Back to Home' }));
    expect(screen.queryByText('Daily rate', { exact: true })).toBeNull();
    expect(screen.queryByText('Rates By Exchange Rate API', { exact: true })).toBeNull();
    expect(await openSheet().findByText('Daily rate', { exact: true })).toBeDefined();
    expect(readRoute).toHaveBeenCalledTimes(1);
  });
});
