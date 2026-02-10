/**
 * Market Policy Schema (v1)
 *
 * Zod schemas and inferred TypeScript types for the Market Policy Layer.
 * All policy objects must remain static and serializable (no functions).
 *
 * Enums are explicit and stable — do not reorder or remove values
 * without a version bump.
 */

import { z } from 'zod';

// ---------------------------------------------------------------------------
// Enums
// ---------------------------------------------------------------------------

export const MarketSchema = z.enum(['ZW', 'ZA', 'KE', 'UNKNOWN']);
export type Market = z.infer<typeof MarketSchema>;

export const PolicyVersionSchema = z.literal('v1');
export type PolicyVersion = z.infer<typeof PolicyVersionSchema>;

export const EarnModeSchema = z.enum(['off', 'pilot', 'on']);
export type EarnMode = z.infer<typeof EarnModeSchema>;

export const PolicyModeSchema = z.enum(['manual', 'auto']);
export type PolicyMode = z.infer<typeof PolicyModeSchema>;

// ---------------------------------------------------------------------------
// Sub-schemas
// ---------------------------------------------------------------------------

export const FeaturesSchema = z.object({
  earn: z.boolean(),
  earnMode: EarnModeSchema,
  payLinks: z.boolean(),
  stablecoinSend: z.boolean(),
});
export type Features = z.infer<typeof FeaturesSchema>;

export const LimitsSchema = z.object({
  maxDepositUSD: z.number().nonnegative(),
  maxWithdrawUSD: z.number().nonnegative(),
  maxSingleTransferUSD: z.number().nonnegative(),
});
export type Limits = z.infer<typeof LimitsSchema>;

export const SettlementSchema = z.object({
  localCurrencyFirst: z.boolean(),
  localCurrency: z.string(),
});
export type Settlement = z.infer<typeof SettlementSchema>;

export const FxSchema = z.object({
  requireProvenance: z.boolean(),
  requiredFields: z.array(z.string()),
});
export type Fx = z.infer<typeof FxSchema>;

export const DisclosuresSchema = z.object({
  requiredKeys: z.array(z.string()),
});
export type Disclosures = z.infer<typeof DisclosuresSchema>;

// ---------------------------------------------------------------------------
// Full Policy schema
// ---------------------------------------------------------------------------

export const PolicySchema = z.object({
  features: FeaturesSchema,
  limits: LimitsSchema,
  settlement: SettlementSchema,
  fx: FxSchema,
  disclosures: DisclosuresSchema,
  bannedClaims: z.array(z.string()),
});
export type Policy = z.infer<typeof PolicySchema>;

// ---------------------------------------------------------------------------
// Resolved policy envelope (returned by API)
// ---------------------------------------------------------------------------

export const ResolvedPolicySchema = z.object({
  version: PolicyVersionSchema,
  market: MarketSchema,
  resolvedAt: z.string(),
  policy: PolicySchema,
});
export type ResolvedPolicy = z.infer<typeof ResolvedPolicySchema>;
