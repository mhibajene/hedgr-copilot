/**
 * Balance Mode Configuration
 * 
 * Controls the source of truth for user balances:
 * - 'ledger': Balances are computed from ledger transactions (SSoT)
 * - 'wallet': Balances use the legacy wallet store (deprecated)
 * 
 * Set via NEXT_PUBLIC_BALANCE_FROM_LEDGER env var.
 * Default: 'ledger' (SSoT enabled)
 * 
 * Rollback: Set NEXT_PUBLIC_BALANCE_FROM_LEDGER=false to revert to wallet store.
 */
export type BalanceMode = 'ledger' | 'wallet';

export function getBalanceMode(): BalanceMode {
  const flag = process.env.NEXT_PUBLIC_BALANCE_FROM_LEDGER;
  // Default to ledger (SSoT) unless explicitly disabled
  if (flag === 'false' || flag === '0') {
    return 'wallet';
  }
  return 'ledger';
}

export function isBalanceFromLedger(): boolean {
  return getBalanceMode() === 'ledger';
}

