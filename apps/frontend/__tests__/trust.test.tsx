// @vitest-environment jsdom

import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import TrustPage from '../app/(app)/settings/trust/page';
import { TrustDisclosureBanner } from '../components/TrustDisclosureBanner';

afterEach(() => {
  cleanup();
  vi.unstubAllEnvs();
});

describe('Trust information', () => {
  test('uses the current trust destination by default', () => {
    vi.stubEnv('NEXT_PUBLIC_AUTH_MODE', 'mock');
    vi.stubEnv('NEXT_PUBLIC_DEFI_MODE', 'mock');
    vi.stubEnv('NEXT_PUBLIC_FX_MODE', 'fixed');

    render(<TrustDisclosureBanner consolidateTechnicalDetails />);

    expect(screen.getByRole('link', { name: 'Learn more' }).getAttribute('href')).toBe(
      '/settings/trust'
    );
    expect(screen.getByText('Simulation · no real money')).toBeTruthy();
    expect(screen.getByText('How this simulation works')).toBeTruthy();
    expect(screen.queryByText(/Auth:\s*mock/i)).toBeNull();
    expect(screen.queryByText(/DeFi:\s*mock/i)).toBeNull();
    expect(screen.queryByText(/FX:\s*fixed/i)).toBeNull();
  });

  test('renders only current simulation and safety truths', async () => {
    const page = await TrustPage({ searchParams: Promise.resolve({}) });
    const { container } = render(page);

    expect(
      screen.getByRole('heading', { level: 1, name: 'About this simulation' })
    ).toBeTruthy();
    expect(screen.getByText(/No real customer money is held or moved/i)).toBeTruthy();
    expect(screen.getByText(/no live financial service is connected/i)).toBeTruthy();
    expect(screen.getByText(/Do not enter real personal or financial information/i)).toBeTruthy();
    expect(
      screen.getByRole('link', { name: 'Back to Settings' }).getAttribute('href')
    ).toBe('/settings');

    const text = container.textContent?.toLowerCase() ?? '';
    expect(text).not.toMatch(/custod|rebalanc|stability engine|live mode|risk model/);
    expect(text).not.toMatch(/\bguarantee(s|d)?\b|\bfully secure\b|\binsured\b/);
  });

  test('preserves the bounded synthetic journey when returning to Settings', async () => {
    const page = await TrustPage({
      searchParams: Promise.resolve({ journey: 'class-a-val-002' }),
    });
    render(page);

    expect(
      screen.getByRole('link', { name: 'Back to Settings' }).getAttribute('href')
    ).toBe('/settings?journey=class-a-val-002');
  });
});
