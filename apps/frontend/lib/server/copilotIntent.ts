/**
 * Copilot Intent Detection
 *
 * Deterministic intent classification for user messages.
 * Used at the API boundary to refuse certain request types
 * before invoking the model.
 *
 * Design principle:
 * - Refusal is a policy decision, not a model decision
 * - Intent gating makes refusal deterministic across stub/live
 * - High precision, low recall (avoid false positives)
 *
 * @module lib/server/copilotIntent
 */

// ============================================================================
// Investment Advice Intent Patterns
// ============================================================================

/**
 * High-precision patterns for detecting investment advice requests.
 *
 * These patterns are intentionally narrow to avoid false positives.
 * We prefer to miss some edge cases than to incorrectly refuse
 * legitimate educational questions.
 *
 * Matches:
 * - "What should I invest in?"
 * - "Should I buy Bitcoin?"
 * - "Where should I put my money?"
 * - "What coin should I buy?"
 *
 * Does NOT match:
 * - "What is investing?" (educational)
 * - "How does the stock market work?" (educational)
 * - "What are the risks of investing?" (educational)
 */
const INVESTMENT_ADVICE_PATTERNS = [
  // Direct investment advice requests
  'what should i invest',
  'what do i invest',
  'where should i invest',
  'how should i invest',

  // Buy/sell recommendations
  'what should i buy',
  'should i buy',
  'should i sell',
  'when should i buy',
  'when should i sell',

  // Money allocation requests
  'where should i put my money',
  'where do i put my money',
  'what should i do with my money',
  'how should i allocate',

  // Crypto-specific
  'what coin should i',
  'which coin should i',
  'what crypto should i',
  'which crypto should i',
  'what token should i',
  'which token should i',

  // Stock-specific
  'what stock should i',
  'which stock should i',
  'what shares should i',
  'which shares should i',

  // Explicit recommendation requests
  'investment recommendation',
  'recommend me a',
  'recommend an investment',
  'give me investment advice',
  'what do you recommend i invest',
] as const;

// ============================================================================
// Public API
// ============================================================================

/**
 * Detects if a user message is requesting investment advice.
 *
 * This is a deterministic, high-precision check used at the API boundary
 * to refuse investment advice requests before invoking the model.
 *
 * @param text - User message text
 * @returns true if the message is requesting investment advice
 *
 * @example
 * isInvestmentAdviceRequest("What should I invest in?") // true
 * isInvestmentAdviceRequest("What is investing?") // false
 * isInvestmentAdviceRequest("Should I buy Bitcoin?") // true
 * isInvestmentAdviceRequest("How does Bitcoin work?") // false
 */
export function isInvestmentAdviceRequest(text: string): boolean {
  const normalized = text.toLowerCase().trim();

  for (const pattern of INVESTMENT_ADVICE_PATTERNS) {
    if (normalized.includes(pattern)) {
      return true;
    }
  }

  return false;
}
