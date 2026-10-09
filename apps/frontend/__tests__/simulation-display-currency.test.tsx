// @vitest-environment jsdom
import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { SimulationDisplayCurrencySelector } from '../components/SimulationDisplayCurrencySelector';
import { TrustDisclosureBanner } from '../components/TrustDisclosureBanner';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { DANIEL_FIXTURE_RATE_ZMW_PER_USD } from '../lib/engine/daniel-read';
import { FIXED_RATE_BY_QUOTE, FX_RATE_ZMW_PER_USD_DEFAULT, getFixedRate } from '../lib/fx';
import {
  SIMULATION_DISPLAY_CURRENCY_KEY as key,
  SIMULATION_DISPLAY_CURRENCIES,
  SIMULATION_DISPLAY_ESTIMATE_CAPTION,
  formatSimulationDisplayEstimate,
  formatSimulationDisplayFigure,
  getSimulationDisplayCurrency,
  getSimulationDisplayRate,
  setSimulationDisplayCurrency,
} from '../lib/state/simulation-display-currency';

beforeEach(() => {
  setSimulationDisplayCurrency('ZMW');
  localStorage.clear();
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllEnvs(); });

describe('isolated synthetic display preference', () => {
  it.each([
    ['ZMW', '81.00'], ['KES', '390.00'], ['NGN', '4,500.00'], ['GHS', '45.00'], ['PHP', '168.00'],
  ] as const)('formats the approved non-zero %s fixture', (currency, amount) => {
    expect(formatSimulationDisplayFigure(3, currency)).toBe(`≈ ${currency} ${amount}`);
    expect(SIMULATION_DISPLAY_ESTIMATE_CAPTION).toBe('display estimate');
    expect(formatSimulationDisplayEstimate(3, currency)).toBe(`≈ ${currency} ${amount} display estimate`);
  });

  it('keeps the bounded five fixtures and rounds only the formatted estimate', () => {
    expect(SIMULATION_DISPLAY_CURRENCIES.map(({ code }) => code)).toEqual(['ZMW', 'KES', 'NGN', 'GHS', 'PHP']);
    const usd = 1.23456;
    expect(formatSimulationDisplayEstimate(usd, 'KES')).toBe('≈ KES 160.49 display estimate');
    expect(usd).toBe(1.23456);
    expect(formatSimulationDisplayEstimate(0, 'ZMW')).toBe('≈ ZMW 0.00 display estimate');
  });

  it('falls back to ZMW for missing/invalid stored values and rejects invalid selections', () => {
    expect(getSimulationDisplayCurrency()).toBe('ZMW');
    for (const invalid of ['USD', 'ZM', 'kes', 'null', '{"code":"KES"}']) {
      localStorage.setItem(key, invalid);
      expect(getSimulationDisplayCurrency()).toBe('ZMW');
    }
    setSimulationDisplayCurrency('KES');
    setSimulationDisplayCurrency('USD');
    expect(localStorage.getItem(key)).toBe('KES');
  });

  it('persists only a validated ISO code and updates mounted entry/Settings without financial events', () => {
    localStorage.setItem('hedgr.market', 'NG');
    localStorage.setItem('hedgr:ledger', '{"transactions":[]}');
    localStorage.setItem('hedgr:wallet', '{"usdBalance":3}');
    const dispatch = vi.spyOn(window, 'dispatchEvent');
    const { unmount } = render(<><SimulationDisplayCurrencySelector placement="entry" /><SimulationDisplayCurrencySelector placement="settings" /></>);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'PHP' } });
    expect(screen.getByRole('button', { name: /Display currency/ }).textContent).toContain('PHP');
    expect(localStorage.getItem(key)).toBe('PHP');
    expect(localStorage.getItem('hedgr.market')).toBe('NG');
    expect(localStorage.getItem('hedgr:ledger')).toBe('{"transactions":[]}');
    expect(localStorage.getItem('hedgr:wallet')).toBe('{"usdBalance":3}');
    expect(dispatch).not.toHaveBeenCalled();
    unmount();
    render(<SimulationDisplayCurrencySelector placement="entry" />);
    expect((screen.getByRole('combobox') as HTMLSelectElement).value).toBe('PHP');
  });

  it('remains usable with denied reads and writes', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('blocked'); });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('blocked'); });
    render(<SimulationDisplayCurrencySelector placement="entry" />);
    expect((screen.getByRole('combobox') as HTMLSelectElement).value).toBe('ZMW');
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'GHS' } });
    expect((screen.getByRole('combobox') as HTMLSelectElement).value).toBe('GHS');
    expect(getSimulationDisplayCurrency()).toBe('GHS');
  });

  it('keeps a choice in memory when writes fail but an older value remains readable', () => {
    localStorage.setItem(key, 'KES');
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('quota'); });
    setSimulationDisplayCurrency('NGN');
    expect(getSimulationDisplayCurrency()).toBe('NGN');
    expect(localStorage.getItem(key)).toBe('KES');
  });

  it('preserves the enabled default market control while hiding it in research', () => {
    vi.stubEnv('NEXT_PUBLIC_ENABLE_MARKET_SWITCHER', 'true');
    vi.stubEnv('NEXT_PUBLIC_AUTH_MODE', 'mock');
    vi.stubEnv('NEXT_PUBLIC_APP_ENV', 'dev');
    const { rerender } = render(<TrustDisclosureBanner consolidateTechnicalDetails />);
    expect(screen.getByLabelText('Simulation currency display')).toBeTruthy();
    rerender(<TrustDisclosureBanner consolidateTechnicalDetails syntheticResearch />);
    expect(screen.queryByLabelText('Simulation currency display')).toBeNull();
    expect(screen.getByText(/The display currency preference changes illustrative/)).toBeTruthy();
  });
});

describe('imports the Engine ZMW fixture while preserving all other display and fixed FX rates', () => {
  it('imports the Engine ZMW fixture while preserving all other display and fixed FX rates', async () => {
    expect(getSimulationDisplayRate('ZMW')).toBe(DANIEL_FIXTURE_RATE_ZMW_PER_USD);
    expect(getSimulationDisplayRate('ZMW')).toBe(27);
    expect(Object.fromEntries(SIMULATION_DISPLAY_CURRENCIES.filter(({ code }) => code !== 'ZMW').map(({ code, unitsPerUsd }) => [code, unitsPerUsd])))
      .toEqual({ KES: 130, NGN: 1500, GHS: 15, PHP: 56 });
    // Dependency, not coincidence: the ZMW entry imports the Engine constant rather than a second literal.
    const source = readFileSync(resolve(__dirname, '../lib/state/simulation-display-currency.ts'), 'utf8');
    expect(source).toMatch(/import \{ DANIEL_FIXTURE_RATE_ZMW_PER_USD \} from '\.\.\/engine\/daniel-read';/);
    expect(source).toMatch(/code: 'ZMW', name: 'Zambian kwacha', unitsPerUsd: DANIEL_FIXTURE_RATE_ZMW_PER_USD \}/);
    vi.resetModules();
    vi.doMock('../lib/engine/daniel-read', async (importOriginal) => ({
      ...(await importOriginal<typeof import('../lib/engine/daniel-read')>()),
      DANIEL_FIXTURE_RATE_ZMW_PER_USD: 31,
    }));
    const rewired = await import('../lib/state/simulation-display-currency');
    expect(rewired.getSimulationDisplayRate('ZMW')).toBe(31);
    expect(rewired.getSimulationDisplayRate('KES')).toBe(130);
    vi.doUnmock('../lib/engine/daniel-read');
    vi.resetModules();
    // Fixed/live-boundary FX stays at 20.
    expect(getFixedRate('ZMW')).toBe(20);
    expect(FIXED_RATE_BY_QUOTE.ZMW).toBe(20);
    expect(FX_RATE_ZMW_PER_USD_DEFAULT).toBe(20);
  });
});
