import { describe, test, expect } from 'vitest';
import { formatUsd, formatLocalCurrency } from '../lib/utils/money';

describe('money formatting utilities', () => {
  describe('formatUsd', () => {
    test('formats positive amounts with $ symbol', () => {
      expect(formatUsd(100)).toBe('$100.00');
      expect(formatUsd(1234.56)).toBe('$1,234.56');
    });

    test('formats zero correctly', () => {
      expect(formatUsd(0)).toBe('$0.00');
    });

    test('rounds to 2 decimal places', () => {
      expect(formatUsd(100.999)).toBe('$101.00');
      expect(formatUsd(50.555)).toBe('$50.56');
    });
  });

  describe('formatLocalCurrency', () => {
    test('formats ZMW with currency code (not symbol)', () => {
      expect(formatLocalCurrency(1000, 'ZMW')).toBe('ZMW 1,000.00');
      expect(formatLocalCurrency(24850, 'ZMW')).toBe('ZMW 24,850.00');
    });

    test('formats NGN with currency code', () => {
      expect(formatLocalCurrency(50000, 'NGN')).toBe('NGN 50,000.00');
    });

    test('formats KES with currency code', () => {
      expect(formatLocalCurrency(15000, 'KES')).toBe('KES 15,000.00');
    });

    test('formats zero correctly', () => {
      expect(formatLocalCurrency(0, 'ZMW')).toBe('ZMW 0.00');
    });

    test('includes thousands separators', () => {
      expect(formatLocalCurrency(1234567.89, 'ZMW')).toBe('ZMW 1,234,567.89');
    });

    test('rounds to 2 decimal places', () => {
      expect(formatLocalCurrency(100.999, 'ZMW')).toBe('ZMW 101.00');
      expect(formatLocalCurrency(50.555, 'ZMW')).toBe('ZMW 50.56');
    });
  });
});
