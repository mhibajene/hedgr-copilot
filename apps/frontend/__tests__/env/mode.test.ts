import { describe, test, expect, beforeEach } from 'vitest';
import { getEnvironmentMode } from '../../lib/env/mode';

describe('getEnvironmentMode', () => {
  beforeEach(() => {
    delete process.env.NEXT_PUBLIC_AUTH_MODE;
    delete process.env.NEXT_PUBLIC_FX_MODE;
  });

  test('returns mock when NEXT_PUBLIC_AUTH_MODE is mock', () => {
    process.env.NEXT_PUBLIC_AUTH_MODE = 'mock';
    expect(getEnvironmentMode()).toBe('mock');
  });

  test('returns mock when AUTH is mock regardless of FX_MODE', () => {
    process.env.NEXT_PUBLIC_AUTH_MODE = 'mock';
    process.env.NEXT_PUBLIC_FX_MODE = 'coingecko';
    expect(getEnvironmentMode()).toBe('mock');
  });

  test('returns stub when AUTH is not mock and FX_MODE is stub', () => {
    process.env.NEXT_PUBLIC_AUTH_MODE = 'magic';
    process.env.NEXT_PUBLIC_FX_MODE = 'stub';
    expect(getEnvironmentMode()).toBe('stub');
  });

  test('returns stub when AUTH is not mock and FX_MODE is fixed', () => {
    process.env.NEXT_PUBLIC_AUTH_MODE = 'magic';
    process.env.NEXT_PUBLIC_FX_MODE = 'fixed';
    expect(getEnvironmentMode()).toBe('stub');
  });

  test('returns live when AUTH is not mock and FX_MODE is coingecko', () => {
    process.env.NEXT_PUBLIC_AUTH_MODE = 'magic';
    process.env.NEXT_PUBLIC_FX_MODE = 'coingecko';
    expect(getEnvironmentMode()).toBe('live');
  });

  test('returns live when AUTH is not mock and FX_MODE is unset', () => {
    process.env.NEXT_PUBLIC_AUTH_MODE = 'magic';
    expect(getEnvironmentMode()).toBe('live');
  });
});
