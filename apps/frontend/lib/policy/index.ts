/**
 * Market Policy Layer — barrel exports
 *
 * Single import point for the policy module.
 *
 * Usage:
 *   import { resolvePolicy, POLICY_VERSION, type Market } from '@/lib/policy';
 */

// Schema + types
export {
  MarketSchema,
  PolicyVersionSchema,
  EarnModeSchema,
  PolicyModeSchema,
  FeaturesSchema,
  LimitsSchema,
  SettlementSchema,
  FxSchema,
  DisclosuresSchema,
  PolicySchema,
  ResolvedPolicySchema,
  type Market,
  type PolicyVersion,
  type EarnMode,
  type PolicyMode,
  type Features,
  type Limits,
  type Settlement,
  type Fx,
  type Disclosures,
  type Policy,
  type ResolvedPolicy,
} from './schema';

// Defaults
export { BASELINE_POLICY } from './defaults';

// Overlays
export { OVERLAYS, type PolicyOverlay } from './overlays';

// Resolver
export {
  POLICY_VERSION,
  resolvePolicy,
  resolvePolicyFromEnv,
  coerceMarket,
  coerceMode,
  type ResolvePolicyInput,
} from './resolve';
