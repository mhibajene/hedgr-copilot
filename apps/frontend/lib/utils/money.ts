/**
 * Currency formatting utilities
 *
 * This module provides consistent currency formatting across the app.
 * - USD uses the "$" symbol (Intl formatting)
 * - Local currencies use their ISO 4217 code (e.g., "ZMW", "NGN", "KES")
 */

/**
 * Format an amount as USD with the "$" symbol.
 *
 * @param amount - The numeric amount to format
 * @returns Formatted string, e.g., "$1,234.56"
 */
export function formatUsd(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format an amount in local currency using the currency code (not symbol).
 *
 * This avoids Intl.NumberFormat's symbol resolution which may return
 * ambiguous symbols like "ZK" for ZMW. Instead, we always use the
 * ISO 4217 currency code for clarity.
 *
 * @param amount - The numeric amount to format
 * @param currencyCode - The ISO 4217 currency code (e.g., "ZMW", "NGN", "KES")
 * @returns Formatted string, e.g., "ZMW 24,850.00"
 */
export function formatLocalCurrency(amount: number, currencyCode: string): string {
  const formattedNumber = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return `${currencyCode} ${formattedNumber}`;
}
