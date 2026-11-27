// @vitest-environment jsdom
import React from 'react';
import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { CurrencyInsight } from '../app/(app)/dashboard/CurrencyInsight';

import { mountRateAttribution } from '../app/(app)/dashboard/RateAttribution';

(globalThis as typeof globalThis & { React: typeof React }).React = React;
const props = { usdAmount: 300, currency: 'ZMW' as const, latestDisplayRate: 27, ready: true, previousExampleRate: null };
const now = Date.parse('2026-11-27T16:00:00Z');
const fresh = { rate: 20.58, asOf: '2026-11-27T08:21:00.000Z', available: true };
const unavailable = { rate: null, asOf: null, available: false };
const disclosure = 'The daily rate on the currency sheet is for display only and is not used in any figure. Rates By Exchange Rate API.';
const originalShowModal = Object.getOwnPropertyDescriptor(HTMLDialogElement.prototype, 'showModal');
let readRoute: ReturnType<typeof vi.fn<typeof fetch>>;

beforeEach(() => {
  vi.spyOn(Date, 'now').mockReturnValue(now);
  readRoute = vi.fn<typeof fetch>().mockImplementation(async () => Response.json(fresh));
  vi.stubGlobal('fetch', readRoute);
  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', { configurable: true, value(this: HTMLDialogElement) { this.open = true; } });
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  vi.useRealTimers();
  if (originalShowModal) Object.defineProperty(HTMLDialogElement.prototype, 'showModal', originalShowModal);
  else Reflect.deleteProperty(HTMLDialogElement.prototype, 'showModal');
});

async function home(showMount = true) {
  render(<main>
    <CurrencyInsight {...props} />
    <details data-testid="dashboard-disclosures"><summary>Important disclosures</summary><div ref={showMount ? mountRateAttribution : undefined}><p>Existing disclosure</p></div></details>
  </main>);
  const disclosures = screen.getByTestId('dashboard-disclosures') as HTMLDetailsElement;
  expect(disclosures.open).toBe(false);
  expect(disclosures.textContent).toBe('Important disclosuresExisting disclosure');
  return disclosures;
}

function openSheet() {
  fireEvent.click(screen.getByRole('button', { name: 'Currency context' }));
}

describe('JOURNEY-REVIEW-001 item 3 (d2) disclosure and co-presence', () => {
  test('success mounts exact attribution in the collapsed accordion, with the exact safe link', async () => {
    const disclosures = await home();
    openSheet();
    expect(await screen.findByText('Daily rate', { exact: true })).toBeDefined();
    expect(disclosures.open).toBe(false);
    expect(disclosures.textContent).toBe('Important disclosuresExisting disclosure' + disclosure);
    const link = within(disclosures).getByText('Rates By Exchange Rate API', { exact: true });
    expect(link.tagName).toBe('A');
    expect(link.getAttribute('href')).toBe('https://www.exchangerate-api.com');
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('rel')).toBe('noopener noreferrer');
    expect(readRoute).toHaveBeenCalledExactlyOnceWith('/api/live-rate', expect.objectContaining({ credentials: 'omit' }));
  });

  const failures: [string, () => Promise<Response>][] = [
    ['network error', async () => { throw new TypeError('offline'); }],
    ['429', async () => new Response(null, { status: 429 })],
    ['timeout', async () => { throw new DOMException('timeout', 'TimeoutError'); }],
    ['out-of-band', async () => Response.json({ ...fresh, rate: 60.01 })],
    ['stale', async () => Response.json({ ...fresh, asOf: new Date(now - 172_800_000).toISOString() })],
    ['CI unavailable', async () => Response.json(unavailable)],
  ];
  test.each(failures)('%s preserves the closed accordion bytes and adds neither row nor attribution', async (_, response) => {
    readRoute.mockImplementationOnce(response);
    const disclosures = await home();
    const preserved = disclosures.outerHTML;
    openSheet();
    await act(async () => {});
    expect(readRoute).toHaveBeenCalledTimes(1);
    expect(disclosures.outerHTML).toBe(preserved);
    expect(screen.queryByText('Daily rate', { exact: true })).toBeNull();
    expect(screen.getByTestId('currency-rate-figure').textContent).toBe('≈ ZMW 8,100.00');
  });

  test('without a mounted attribution neither surface appears and no request starts', async () => {
    await home(false);
    openSheet();
    await act(async () => {});
    expect(screen.queryByText('Daily rate', { exact: true })).toBeNull();
    expect(screen.queryByText('Rates By Exchange Rate API', { exact: true })).toBeNull();
    expect(readRoute).not.toHaveBeenCalled();
  });

  test('a provider date expiring while open removes both the row and the attribution', async () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
    readRoute.mockImplementationOnce(async () => Response.json({ ...fresh, asOf: new Date(now - 172_800_000 + 1000).toISOString() }));
    const disclosures = await home();
    openSheet();
    await act(async () => {});
    expect(screen.getByText('Daily rate', { exact: true })).toBeDefined();
    expect(disclosures.querySelector('a')).not.toBeNull();
    vi.spyOn(Date, 'now').mockReturnValue(now + 1000);
    await act(async () => { await vi.advanceTimersByTimeAsync(1000); });
    expect(screen.queryByText('Daily rate', { exact: true })).toBeNull();
    expect(disclosures.querySelector('a')).toBeNull();
    expect(readRoute).toHaveBeenCalledTimes(1);
  });
});
