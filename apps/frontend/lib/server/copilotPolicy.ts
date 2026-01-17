/**
 * Copilot Policy Enforcement Layer
 *
 * Trust-first post-model response sanitization.
 * This module is server-only and must never be imported by client code.
 *
 * Design Principles (Non-Negotiable):
 * - Defense in Depth: prompt rules alone are insufficient
 * - Fail-Safe Behavior: unsafe output → sanitize or override
 * - Determinism: same inputs → same sanitized output
 * - Minimal Intervention: preserve model intent where safe
 *
 * Security boundaries:
 * - No user input accepted (operates on model output only)
 * - No process.env reads (accepts params only)
 * - Deterministic (same inputs always produce same output)
 * - No I/O operations
 * - Must not throw
 * - Must always return non-empty string
 *
 * @module lib/server/copilotPolicy
 */

// ============================================================================
// Constants (Canonical Phrases & Patterns)
// ============================================================================

/**
 * Required phrase for WAIT recommendations.
 * Case-insensitive match is acceptable.
 */
const WAIT_PHRASE_RECOMMEND = "recommend waiting";

/**
 * Required phrase for user agency.
 * Must appear exactly or as canonical variant.
 */
const WAIT_PHRASE_CONTROL = "you're always in control";

/**
 * Alternative apostrophe forms to normalize.
 * Handles curly quotes and other Unicode apostrophe variants.
 */
const APOSTROPHE_VARIANTS = /[''`ʼʻ]/g;

/**
 * Environment disclosure note for non-production environments.
 */
const ENV_DISCLOSURE_NOTE =
  "Note: this environment may use mock or simulated data.";

/**
 * Canonical refusal response when financial advice is detected.
 * This completely replaces the model output.
 */
const ADVICE_REFUSAL_RESPONSE = `I'm not able to provide financial advice, investment recommendations, or tell you what to do with your money.

Hedgr Copilot is designed to help you understand your options and provide educational information, but the decision is always yours.

If you're looking for personalized financial guidance, consider consulting a licensed financial advisor.

You're always in control of your savings decisions.`;

/**
 * Safe fallback response when all content is sanitized away.
 */
const SAFE_FALLBACK_RESPONSE = `I want to help, but I need to be careful about how I respond.

Could you rephrase your question? I'm happy to provide educational information about savings, but I can't make specific recommendations about what you should do.

You're always in control of your decisions.`;

// ============================================================================
// Urgency Blacklist (Case-Insensitive)
// ============================================================================

/**
 * Terms that indicate urgency, hype, or sales-like behavior.
 * Sentences containing these terms will be removed entirely.
 */
const URGENCY_BLACKLIST = [
  "act now",
  "don't miss",
  "dont miss",
  "limited time",
  "guarantee",
  "guaranteed",
  "risk-free",
  "risk free",
  "best investment",
  "apy",
  "buy",
  "sell",
] as const;

// ============================================================================
// Advice Detection Patterns (High-Precision)
// ============================================================================

/**
 * High-precision patterns for detecting prescriptive financial advice.
 *
 * These patterns require:
 * 1. Imperative or directive phrasing ("you should", "I recommend", etc.)
 * 2. Financial action verbs (invest, buy, sell, allocate, put money)
 *
 * Deliberately excludes:
 * - Disclaimers ("I can't recommend...", "I'm not able to advise...")
 * - Educational content ("investing generally involves...", "when people buy...")
 * - Hypotheticals ("if you were to invest...", "some people choose to...")
 */
const ADVICE_PATTERNS = [
  // Direct imperatives with financial actions
  /\byou\s+should\s+(?:invest|buy|sell|allocate|put\s+(?:your\s+)?money)/i,
  /\byou\s+need\s+to\s+(?:invest|buy|sell|allocate|put\s+(?:your\s+)?money)/i,
  /\byou\s+must\s+(?:invest|buy|sell|allocate|put\s+(?:your\s+)?money)/i,
  /\byou\s+have\s+to\s+(?:invest|buy|sell|allocate|put\s+(?:your\s+)?money)/i,

  // Recommendations with financial actions
  /\bi\s+recommend\s+(?:you\s+)?(?:invest|buy|sell|allocat|put(?:ting)?\s+(?:your\s+)?money)/i,
  /\bi\s+suggest\s+(?:you\s+)?(?:invest|buy|sell|allocat|put(?:ting)?\s+(?:your\s+)?money)/i,
  /\bi\s+advise\s+(?:you\s+)?(?:to\s+)?(?:invest|buy|sell|allocat|put\s+(?:your\s+)?money)/i,

  // "Best" prescriptions
  /\bthe\s+best\s+(?:option|choice|thing|move)\s+(?:is|would\s+be)\s+to\s+(?:invest|buy|sell|allocate|put)/i,
  /\byour\s+best\s+(?:bet|option|choice|move)\s+is\s+to\s+(?:invest|buy|sell|allocate|put)/i,

  // Direct allocations
  /\bput\s+(?:your\s+)?money\s+(?:in|into)\b/i,
  /\ballocate\s+(?:your\s+)?(?:funds|money|savings)\s+(?:to|into)\b/i,

  // Percentage/amount recommendations
  /\binvest\s+(?:\d+%|\$[\d,]+|[\d,]+\s*(?:dollars?|zmw|usd))/i,
  /\bput\s+(?:\d+%|\$[\d,]+|[\d,]+\s*(?:dollars?|zmw|usd))\s+(?:in|into)\b/i,
] as const;

// ============================================================================
// Type Definitions
// ============================================================================

export type PolicyEnvironment = "dev" | "stg" | "prod";
export type PolicyRecommendation = "proceed" | "proceed_cautiously" | "wait";

export interface PolicyParams {
  content: string;
  recommendation: PolicyRecommendation;
  environment: PolicyEnvironment;
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Normalizes apostrophes in text to standard ASCII apostrophe.
 * This ensures consistent matching regardless of quote style.
 *
 * @param text - Input text
 * @returns Text with normalized apostrophes
 */
function normalizeApostrophes(text: string): string {
  return text.replace(APOSTROPHE_VARIANTS, "'");
}

/**
 * Detects if content contains prescriptive financial advice.
 *
 * High-precision detection: only triggers on imperative/directive phrasing
 * combined with financial action verbs. Does NOT flag:
 * - Disclaimers ("I can't tell you to invest...")
 * - Educational content ("investing involves risk...")
 * - General information ("some people choose to...")
 *
 * @param content - Model output to check
 * @returns true if prescriptive financial advice is detected
 */
function containsAdvice(content: string): boolean {
  const normalized = normalizeApostrophes(content);

  for (const pattern of ADVICE_PATTERNS) {
    if (pattern.test(normalized)) {
      return true;
    }
  }

  return false;
}

/**
 * Detects if a sentence contains urgency or hype language.
 *
 * @param sentence - Single sentence to check
 * @returns true if urgency/hype terms are found
 */
function sentenceContainsUrgency(sentence: string): boolean {
  const normalizedSentence = normalizeApostrophes(sentence.toLowerCase());

  for (const term of URGENCY_BLACKLIST) {
    // Use word boundary matching to avoid partial matches
    // e.g., "buy" should match "buy now" but not "buyer"
    const termPattern = new RegExp(`\\b${term}\\b`, "i");
    if (termPattern.test(normalizedSentence)) {
      return true;
    }
  }

  return false;
}

/**
 * Removes sentences containing urgency/hype language.
 *
 * Removes entire sentences (not substring replacement) to preserve
 * coherence. If all sentences are removed, returns safe fallback.
 *
 * @param content - Model output to sanitize
 * @returns Sanitized content with urgency sentences removed
 */
function removeUrgencySentences(content: string): string {
  // Split into sentences (handles ., !, ?)
  // Preserves sentence boundaries for reconstruction
  const sentencePattern = /[^.!?]+[.!?]+/g;
  const sentences = content.match(sentencePattern) || [];

  // Handle content without sentence-ending punctuation
  const lastMatch = sentences.join("");
  const remainder = content.slice(lastMatch.length).trim();

  // Filter out sentences containing urgency terms
  const safeSentences = sentences.filter(
    (sentence) => !sentenceContainsUrgency(sentence)
  );

  // Check remainder for urgency (unpunctuated trailing content)
  const safeRemainder =
    remainder && !sentenceContainsUrgency(remainder) ? remainder : "";

  // Reconstruct content
  let result = safeSentences.join("").trim();
  if (safeRemainder) {
    result = result ? `${result} ${safeRemainder}` : safeRemainder;
  }

  // If everything was removed, return safe fallback
  if (!result) {
    return SAFE_FALLBACK_RESPONSE;
  }

  return result;
}

/**
 * Checks if content contains the required WAIT phrases.
 *
 * @param content - Content to check
 * @returns Object indicating which phrases are present
 */
function checkWaitPhrases(content: string): {
  hasRecommendWaiting: boolean;
  hasControl: boolean;
} {
  const normalized = normalizeApostrophes(content.toLowerCase());

  return {
    hasRecommendWaiting: normalized.includes(WAIT_PHRASE_RECOMMEND),
    hasControl: normalized.includes(WAIT_PHRASE_CONTROL.toLowerCase()),
  };
}

/**
 * Ensures WAIT recommendation content contains required phrases.
 *
 * If either required phrase is missing, prepends a neutral paragraph
 * containing both phrases.
 *
 * @param content - Content to enforce
 * @returns Content with required phrases guaranteed
 */
function ensureWaitPhrases(content: string): string {
  const { hasRecommendWaiting, hasControl } = checkWaitPhrases(content);

  // If both phrases are present, return unchanged
  if (hasRecommendWaiting && hasControl) {
    return content;
  }

  // Prepend a neutral paragraph with both required phrases
  const enforcementParagraph = `Based on the current conditions, I recommend waiting before making any changes. Remember, you're always in control of your savings decisions.`;

  return `${enforcementParagraph}\n\n${content}`;
}

/**
 * Checks if content already mentions simulation/mock data.
 *
 * @param content - Content to check
 * @returns true if simulation disclosure is already present
 */
function hasSimulationDisclosure(content: string): boolean {
  const lower = content.toLowerCase();
  return (
    lower.includes("mock") ||
    lower.includes("simulated") ||
    lower.includes("simulation") ||
    lower.includes("test environment") ||
    lower.includes("test data")
  );
}

/**
 * Appends environment disclosure for non-production environments.
 *
 * @param content - Content to append to
 * @param environment - Current environment
 * @returns Content with disclosure appended if needed
 */
function appendEnvironmentDisclosure(
  content: string,
  environment: PolicyEnvironment
): string {
  // Only add for non-prod environments
  if (environment === "prod") {
    return content;
  }

  // Skip if already mentions simulation
  if (hasSimulationDisclosure(content)) {
    return content;
  }

  return `${content}\n\n${ENV_DISCLOSURE_NOTE}`;
}

// ============================================================================
// Public API
// ============================================================================

/**
 * Enforces trust-first policy on model output.
 *
 * This is the canonical policy enforcement function for Hedgr Copilot.
 * It is a pure function that:
 * - Does not read from process.env
 * - Does not throw
 * - Always returns a non-empty string
 * - Produces deterministic output for the same input
 * - Does not mutate inputs
 *
 * Enforcement order (critical, do not change):
 * 1. Advice refusal override (takes precedence over all)
 * 2. Urgency/hype sanitization (remove whole sentences)
 * 3. WAIT phrase enforcement (prepend if missing)
 * 4. Environment disclosure (append for non-prod)
 *
 * @param params - Policy parameters
 * @param params.content - Model output to enforce
 * @param params.recommendation - Current recommendation ("proceed" | "proceed_cautiously" | "wait")
 * @param params.environment - Deployment environment ("dev" | "stg" | "prod")
 * @returns Policy-compliant content (never empty)
 */
export function enforcePolicy(params: PolicyParams): string {
  const { content, recommendation, environment } = params;

  // ──────────────────────────────────────────────────────────────────────────
  // Guard: Empty input → safe fallback
  // ──────────────────────────────────────────────────────────────────────────
  if (!content || content.trim().length === 0) {
    return SAFE_FALLBACK_RESPONSE;
  }

  let result = content;

  // ──────────────────────────────────────────────────────────────────────────
  // Step 1: Advice refusal override (highest priority)
  // ──────────────────────────────────────────────────────────────────────────
  // If prescriptive financial advice is detected, replace entire output.
  // This override takes precedence over all other rules.

  if (containsAdvice(result)) {
    return ADVICE_REFUSAL_RESPONSE;
  }

  // ──────────────────────────────────────────────────────────────────────────
  // Step 2: Urgency/hype sanitization
  // ──────────────────────────────────────────────────────────────────────────
  // Remove entire sentences containing blacklisted terms.
  // If all content is removed, returns safe fallback.

  result = removeUrgencySentences(result);

  // ──────────────────────────────────────────────────────────────────────────
  // Step 3: WAIT phrase enforcement
  // ──────────────────────────────────────────────────────────────────────────
  // For WAIT recommendations, ensure required phrases are present.
  // Prepends enforcement paragraph if either phrase is missing.

  if (recommendation === "wait") {
    result = ensureWaitPhrases(result);
  }

  // ──────────────────────────────────────────────────────────────────────────
  // Step 4: Environment disclosure (defensive)
  // ──────────────────────────────────────────────────────────────────────────
  // For non-production environments, append disclosure if not already present.

  result = appendEnvironmentDisclosure(result, environment);

  // ──────────────────────────────────────────────────────────────────────────
  // Final guard: ensure non-empty return
  // ──────────────────────────────────────────────────────────────────────────

  if (!result || result.trim().length === 0) {
    return SAFE_FALLBACK_RESPONSE;
  }

  return result;
}

// ============================================================================
// Exported Constants
// ============================================================================

/**
 * Canonical refusal response for investment advice requests.
 * Exported for use in intent-based refusal at API boundary.
 */
export { ADVICE_REFUSAL_RESPONSE };

/**
 * Constants bundle for testing.
 */
export const POLICY_CONSTANTS = {
  WAIT_PHRASE_RECOMMEND,
  WAIT_PHRASE_CONTROL,
  ENV_DISCLOSURE_NOTE,
  ADVICE_REFUSAL_RESPONSE,
  SAFE_FALLBACK_RESPONSE,
  URGENCY_BLACKLIST,
} as const;
