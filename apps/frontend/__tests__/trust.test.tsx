// @vitest-environment jsdom
// Stub/live badge behaviour is covered by getEnvironmentMode() in __tests__/env/mode.test.ts.

import React from 'react';
import { describe, test, expect, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TrustPage from '../app/(app)/settings/trust/page';

describe('Trust & Risk page', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  test('renders "Who holds my funds?"', () => {
    vi.stubEnv('NEXT_PUBLIC_AUTH_MODE', 'mock');
    render(<TrustPage />);
    expect(screen.getByRole('heading', { name: /who holds my funds\?/i })).toBeTruthy();
  });

  test('renders environment badge', () => {
    vi.stubEnv('NEXT_PUBLIC_AUTH_MODE', 'mock');
    render(<TrustPage />);
    const badges = screen.getAllByTestId('environment-badge');
    expect(badges.length).toBeGreaterThanOrEqual(1);
    expect(badges[0].textContent).toBe('Mock');
  });

  test('when AUTH_MODE is mock, badge shows Mock', () => {
    vi.stubEnv('NEXT_PUBLIC_AUTH_MODE', 'mock');
    render(<TrustPage />);
    const badges = screen.getAllByTestId('environment-badge');
    expect(badges.length).toBeGreaterThanOrEqual(1);
    expect(badges[0].textContent).toBe('Mock');
  });

  test('page copy does not contain forbidden words (guarantee, fully secure, insured)', () => {
    vi.stubEnv('NEXT_PUBLIC_AUTH_MODE', 'mock');
    const { container } = render(<TrustPage />);
    const text = container.textContent ?? '';
    const lower = text.toLowerCase();
    expect(lower).not.toMatch(/\bguarantee(s|d)?\b/);
    expect(lower).not.toMatch(/\bfully secure\b/);
    expect(lower).not.toMatch(/\binsured\b/);
  });
});
