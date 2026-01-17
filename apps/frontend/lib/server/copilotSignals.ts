/**
 * Copilot Signal Mapping Engine
 *
 * Deterministic, trust-first signal-to-recommendation mapping.
 * This module is server-only and must never be imported by client code.
 *
 * Design Principles (Non-Negotiable):
 * - Fail-safe defaults: missing, conflicting, or ambiguous signals → wait
 * - Determinism: same inputs always produce the same output
 * - No implicit knowledge: signals must be explicitly provided
 * - Trust > Growth: never optimize for action; "proceed" is allowed, not a goal
 *
 * Security boundaries:
 * - No user input accepted
 * - No process.env reads (accepts params only)
 * - Deterministic (same inputs always produce same output)
 * - No I/O operations
 * - Must not throw
 *
 * @module lib/server/copilotSignals
 */

// ============================================================================
// Signal Type Definitions (SSoT)
// ============================================================================

export type EnvironmentSignal = {
  environment: "dev" | "stg" | "prod";
};

export type MarketSignal = {
  fxVolatilityLevel: "low" | "elevated" | "high";
  marketStatus: "normal" | "uncertain";
};

export type YieldSignal = {
  yieldAvailability: "normal" | "reduced" | "uncertain";
  yieldRiskLevel: "low" | "elevated";
};

export type UserSignal = {
  recentDeposit: boolean;
  liquiditySensitivity: "low" | "medium" | "high";
};

/**
 * Copilot signal input model.
 *
 * All top-level signal groups are optional to support incremental rollout.
 * Absence of any required group triggers conservative handling.
 *
 * Note: `environment` is included for completeness but is excluded from
 * recommendation logic in v1. It may be used for logging/auditing only.
 */
export type CopilotSignals = {
  environment?: EnvironmentSignal;
  market?: MarketSignal;
  yield?: YieldSignal;
  user?: UserSignal;
};

// ============================================================================
// Recommendation Output (Canonical)
// ============================================================================

/**
 * The only valid recommendation outputs.
 * No other outputs are permitted.
 */
export type CopilotRecommendation = "proceed" | "proceed_cautiously" | "wait";

// ============================================================================
// Internal Validation Helpers
// ============================================================================

const VALID_FX_VOLATILITY_LEVELS = ["low", "elevated", "high"] as const;
const VALID_MARKET_STATUSES = ["normal", "uncertain"] as const;
const VALID_YIELD_AVAILABILITIES = ["normal", "reduced", "uncertain"] as const;
const VALID_YIELD_RISK_LEVELS = ["low", "elevated"] as const;
const VALID_LIQUIDITY_SENSITIVITIES = ["low", "medium", "high"] as const;

/**
 * Validates that a MarketSignal has all required fields with valid values.
 */
function isValidMarketSignal(signal: MarketSignal | undefined): signal is MarketSignal {
  if (!signal) return false;
  if (!VALID_FX_VOLATILITY_LEVELS.includes(signal.fxVolatilityLevel as typeof VALID_FX_VOLATILITY_LEVELS[number])) return false;
  if (!VALID_MARKET_STATUSES.includes(signal.marketStatus as typeof VALID_MARKET_STATUSES[number])) return false;
  return true;
}

/**
 * Validates that a YieldSignal has all required fields with valid values.
 */
function isValidYieldSignal(signal: YieldSignal | undefined): signal is YieldSignal {
  if (!signal) return false;
  if (!VALID_YIELD_AVAILABILITIES.includes(signal.yieldAvailability as typeof VALID_YIELD_AVAILABILITIES[number])) return false;
  if (!VALID_YIELD_RISK_LEVELS.includes(signal.yieldRiskLevel as typeof VALID_YIELD_RISK_LEVELS[number])) return false;
  return true;
}

/**
 * Validates that a UserSignal has all required fields with valid values.
 */
function isValidUserSignal(signal: UserSignal | undefined): signal is UserSignal {
  if (!signal) return false;
  if (typeof signal.recentDeposit !== "boolean") return false;
  if (!VALID_LIQUIDITY_SENSITIVITIES.includes(signal.liquiditySensitivity as typeof VALID_LIQUIDITY_SENSITIVITIES[number])) return false;
  return true;
}

// ============================================================================
// Unsafe Condition Detection
// ============================================================================

/**
 * Determines if any unsafe condition is present in the signals.
 *
 * Unsafe conditions trigger immediate "wait" recommendation.
 * These represent elevated risk that warrants conservative behavior.
 *
 * @param market - Validated market signal
 * @param yieldSignal - Validated yield signal
 * @param user - Validated user signal
 * @returns true if any unsafe condition is detected
 */
function isUnsafe(
  market: MarketSignal,
  yieldSignal: YieldSignal,
  user: UserSignal
): boolean {
  // Market uncertainty → unsafe (cannot confidently assess conditions)
  if (market.marketStatus === "uncertain") return true;

  // High FX volatility → unsafe (currency risk too elevated)
  if (market.fxVolatilityLevel === "high") return true;

  // Yield availability uncertain → unsafe (cannot predict returns)
  if (yieldSignal.yieldAvailability === "uncertain") return true;

  // High liquidity sensitivity → unsafe (user cannot tolerate lock-ups)
  if (user.liquiditySensitivity === "high") return true;

  return false;
}

// ============================================================================
// Recommendation Derivation (Public API)
// ============================================================================

/**
 * Derives a recommendation from the provided signals.
 *
 * This is the canonical recommendation engine for Hedgr Copilot.
 * It is a pure function that:
 * - Does not read from process.env
 * - Does not throw
 * - Always returns a valid CopilotRecommendation
 * - Produces deterministic output for the same input
 *
 * Decision logic (in order):
 * 1. Missing/invalid signals → wait (trust-first default)
 * 2. Unsafe conditions → wait (risk mitigation)
 * 3. Cautious conditions → proceed_cautiously (elevated but manageable risk)
 * 4. Stable conditions → proceed (all clear)
 * 5. Fallback → wait (no implicit "proceed")
 *
 * Note: The `environment` signal is excluded from recommendation logic in v1.
 * It is reserved for logging, auditing, and future extensibility.
 *
 * @param signals - The copilot signals to evaluate
 * @returns The recommendation: "proceed", "proceed_cautiously", or "wait"
 */
export function deriveRecommendation(signals: CopilotSignals): CopilotRecommendation {
  // ──────────────────────────────────────────────────────────────────────────
  // Guard: Missing or invalid signals → wait (trust-first default)
  // ──────────────────────────────────────────────────────────────────────────
  // Missing information = uncertainty → conservative default is to wait.
  // This includes both missing signal objects and invalid field values.

  if (!isValidMarketSignal(signals.market)) {
    return "wait";
  }

  if (!isValidYieldSignal(signals.yield)) {
    return "wait";
  }

  if (!isValidUserSignal(signals.user)) {
    return "wait";
  }

  // At this point, all required signals are validated
  const { market } = signals;
  const yieldSignal = signals.yield;
  const { user } = signals;

  // ──────────────────────────────────────────────────────────────────────────
  // Guard: Unsafe conditions → wait (risk mitigation)
  // ──────────────────────────────────────────────────────────────────────────
  // Any single unsafe condition is sufficient to recommend waiting.
  // This prevents action under elevated risk.

  if (isUnsafe(market, yieldSignal, user)) {
    return "wait";
  }

  // ──────────────────────────────────────────────────────────────────────────
  // Check: Cautious conditions → proceed_cautiously
  // ──────────────────────────────────────────────────────────────────────────
  // All of the following must be true:
  // - Market status is normal (no systemic concerns)
  // - FX volatility is elevated but not high (manageable currency risk)
  // - Yield risk is elevated (higher than normal but acceptable)
  // - User has a recent deposit (actively engaged)

  const isCautious =
    market.marketStatus === "normal" &&
    market.fxVolatilityLevel === "elevated" &&
    yieldSignal.yieldRiskLevel === "elevated" &&
    user.recentDeposit === true;

  if (isCautious) {
    return "proceed_cautiously";
  }

  // ──────────────────────────────────────────────────────────────────────────
  // Check: Stable conditions → proceed
  // ──────────────────────────────────────────────────────────────────────────
  // All of the following must be true:
  // - Market status is normal (no systemic concerns)
  // - FX volatility is low (minimal currency risk)
  // - Yield risk is low (predictable returns)
  // - User liquidity sensitivity is not high (already checked above)

  const isStable =
    market.marketStatus === "normal" &&
    market.fxVolatilityLevel === "low" &&
    yieldSignal.yieldRiskLevel === "low" &&
    user.liquiditySensitivity !== "high"; // redundant but explicit for clarity

  if (isStable) {
    return "proceed";
  }

  // ──────────────────────────────────────────────────────────────────────────
  // Fallback: wait (non-negotiable)
  // ──────────────────────────────────────────────────────────────────────────
  // If no rule above matched exactly, default to waiting.
  // There is no implicit "proceed". This is foundational to Hedgr's trust posture.

  return "wait";
}
