/**
 * Substrings that must not appear in selected shipped informational engine trust
 * copy paths (Vitest regression only). Aligns with read-only / non-ledger posture;
 * does not introduce new product rules beyond guarding against obvious drift.
 */
export const ENGINE_TRUST_INFORMATIONAL_DENYLIST: readonly string[] = [
  'your money is currently in',
  'funds are placed into',
  'the system has moved',
  'rebalance',
  'you have been allocated',
  'settled allocation',
  'streak',
  'leaderboard',
  'risk-free',
  'get rich',
  'instant profit',
  'your score',
];
