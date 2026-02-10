/**
 * Policy Resolver (v1)
 *
 * Deterministic, hermetic resolver that merges the GM-RP baseline with a
 * per-market overlay and validates the result against the Zod schema.
 *
 * ────────────────────────────────────────────────────────────────────────
 * MERGE SEMANTICS (shallow only — no deep merge)
 *
 *   1. Start with BASELINE_POLICY (GM-RP).
 *   2. Look up the overlay for the resolved market.
 *   3. For each **top-level key** present in the overlay (e.g. `features`,
 *      `settlement`, `limits`), the overlay value **replaces** the baseline
 *      value for that key entirely.  Nested objects are NOT merged
 *      recursively — the overlay's object wins as a whole.
 *   4. Top-level keys absent from the overlay retain their baseline value.
 *   5. Validate the merged result with PolicySchema.
 *
 * Merge order: baseline → overlay(market) → schema validate
 * ────────────────────────────────────────────────────────────────────────
 *
 * No live network calls. No secrets required. Env is read only for
 * NEXT_PUBLIC_MARKET_SELECTED and NEXT_PUBLIC_MARKET_MODE.
 */

import {
  MarketSchema,
  PolicyModeSchema,
  PolicySchema,
  ResolvedPolicySchema,
  type Market,
  type PolicyMode,
  type Policy,
  type ResolvedPolicy,
} from './schema';
import { BASELINE_POLICY } from './defaults';
import { OVERLAYS } from './overlays';

// ---------------------------------------------------------------------------
// Version constant — owned by the resolver, not env
// ---------------------------------------------------------------------------
export const POLICY_VERSION = 'v1' as const;

// ---------------------------------------------------------------------------
// Input type
// ---------------------------------------------------------------------------
export interface ResolvePolicyInput {
  market: Market;
  mode: PolicyMode;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Coerce an unknown market string into a valid Market enum value.
 * Returns 'UNKNOWN' for any value that is missing, empty, or not in the enum.
 */
export function coerceMarket(raw: string | undefined | null): Market {
  const result = MarketSchema.safeParse(raw);
  return result.success ? result.data : 'UNKNOWN';
}

/**
 * Coerce an unknown mode string into a valid PolicyMode enum value.
 * Returns 'manual' for any value that is missing or not in the enum.
 */
export function coerceMode(raw: string | undefined | null): PolicyMode {
  const result = PolicyModeSchema.safeParse(raw);
  return result.success ? result.data : 'manual';
}

// ---------------------------------------------------------------------------
// Resolver
// ---------------------------------------------------------------------------

/**
 * Resolve a market policy by shallow-merging the GM-RP baseline with
 * the per-market overlay for the given market.
 *
 * In "auto" mode, MC-1 always resolves to UNKNOWN (no detection logic yet).
 *
 * @throws {Error} If the merged result fails schema validation.
 */
export function resolvePolicy(input: ResolvePolicyInput): ResolvedPolicy {
  // Auto mode → UNKNOWN for MC-1
  const effectiveMarket: Market = input.mode === 'auto' ? 'UNKNOWN' : input.market;

  const overlay = OVERLAYS[effectiveMarket] ?? {};

  // Shallow merge: overlay top-level keys replace baseline top-level keys
  const merged: Policy = {
    ...BASELINE_POLICY,
    ...overlay,
  };

  // Validate merged policy
  const policyResult = PolicySchema.safeParse(merged);
  if (!policyResult.success) {
    throw new Error(
      `Policy validation failed for market ${effectiveMarket}: ${policyResult.error.message}`
    );
  }

  const resolved: ResolvedPolicy = {
    version: POLICY_VERSION,
    market: effectiveMarket,
    resolvedAt: new Date().toISOString(),
    policy: policyResult.data,
  };

  // Validate full envelope
  const envelopeResult = ResolvedPolicySchema.safeParse(resolved);
  if (!envelopeResult.success) {
    throw new Error(
      `ResolvedPolicy envelope validation failed: ${envelopeResult.error.message}`
    );
  }

  return envelopeResult.data;
}

// ---------------------------------------------------------------------------
// Convenience: resolve from env
// ---------------------------------------------------------------------------

/**
 * Read NEXT_PUBLIC_MARKET_SELECTED and NEXT_PUBLIC_MARKET_MODE from env,
 * coerce them to safe values, and resolve the policy.
 */
export function resolvePolicyFromEnv(): ResolvedPolicy {
  const market = coerceMarket(process.env.NEXT_PUBLIC_MARKET_SELECTED);
  const mode = coerceMode(process.env.NEXT_PUBLIC_MARKET_MODE);
  return resolvePolicy({ market, mode });
}
