/**
 * Copilot Canonical Response Templates
 *
 * Trust-first response templates that shape how Hedgr Copilot communicates.
 * This module is server-only and must never be imported by client code.
 *
 * Design Principles (Non-Negotiable):
 * - Predictable Structure: users recognize Copilot's "shape" after a few interactions
 * - Trust > Persuasion: no language that nudges, pressures, or optimizes for action
 * - Separation of Concerns: templates describe form, not decision logic
 * - Composability: works with prompt exemplars, policy enforcement, future localization
 *
 * Security boundaries:
 * - No user input accepted (params are curated-only)
 * - No process.env reads (accepts params only)
 * - Deterministic (same inputs always produce same output)
 * - No I/O operations
 *
 * @module lib/server/copilotResponses
 */

// ============================================================================
// Constants (Canonical Phrases)
// ============================================================================

/**
 * Canonical user control phrase.
 * Must appear in all response templates to reinforce user agency.
 */
export const CONTROL_PHRASE = "You're always in control";

/**
 * Maximum length for curated param strings.
 * Prevents injection and keeps responses concise.
 */
const MAX_PARAM_LENGTH = 256;

/**
 * Patterns for forbidden content in params.
 * These are stripped during sanitization.
 */
const FORBIDDEN_PATTERNS = [
  /\d+(\.\d+)?%/g, // percentages (e.g., "5.2%")
  /\$[\d,]+(\.\d+)?/g, // dollar amounts (e.g., "$1,000")
  /[\d,]+\s*(?:dollars?|usd|zmw)/gi, // currency amounts
  /\bapy\b/gi, // APY mentions
  /\byield\b/gi, // yield mentions
  /\breturn(?:s)?\b/gi, // return mentions (financial)
  /\d{2,}/g, // any number with 2+ digits (conservative)
] as const;

// ============================================================================
// Type Definitions
// ============================================================================

export type CopilotResponseType =
  | "proceed"
  | "proceed_cautiously"
  | "wait"
  | "refusal";

export interface ResponseTemplateParams {
  /**
   * Custom acknowledge text (curated-only, never raw user input).
   * Will be sanitized and length-capped.
   */
  acknowledge?: string;
  /**
   * Custom explanation text (curated-only, never raw user input).
   * Will be sanitized and length-capped.
   */
  explanation?: string;
}

// ============================================================================
// Canonical Templates (4-Part Structure)
// ============================================================================

/**
 * Canonical response templates by outcome type.
 *
 * Each template follows the mandatory 4-part structure:
 * 1. Acknowledge
 * 2. Recommend or Refuse
 * 3. Explain Why
 * 4. Reinforce User Control (MUST be last)
 */
export const RESPONSE_TEMPLATES = {
  /**
   * proceed: Calm affirmation without encouragement or urgency.
   */
  proceed: {
    acknowledge: "I understand what you're asking about.",
    recommend: "Based on the information available, it may be reasonable to proceed.",
    explain: "Conditions appear stable, and there are no clear signals suggesting elevated risk right now.",
    control: `${CONTROL_PHRASE}, and it's okay to pause or reassess at any time.`,
  },

  /**
   * proceed_cautiously: Conditional, measured, explicitly non-urgent.
   */
  proceed_cautiously: {
    acknowledge: "I see what you're considering.",
    recommend: "You may choose to proceed cautiously.",
    explain: "Some signals suggest increased uncertainty, so moving slowly or waiting for more clarity could be sensible.",
    control: `${CONTROL_PHRASE}, and choosing to wait is a valid option.`,
  },

  /**
   * wait: Normalize inaction and reduce anxiety.
   */
  wait: {
    acknowledge: "Thanks for raising this.",
    recommend: "I recommend waiting for now.",
    explain: "Current conditions are unclear, and taking time can help reduce unnecessary risk.",
    control: `${CONTROL_PHRASE}, and waiting is an active decision, not a missed opportunity.`,
  },

  /**
   * refusal: Firm boundary with supportive redirection.
   */
  refusal: {
    acknowledge: "I understand what you're asking.",
    recommend: "I can't provide financial advice or tell you what to invest in.",
    explain: "My role is to explain how Hedgr works and share general information about saving safely.",
    control: `${CONTROL_PHRASE}, and the final decision is yours.`,
  },
} as const;

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Sanitizes curated param text by removing forbidden patterns.
 *
 * This is a defense-in-depth measure. Params should already be curated,
 * but this ensures no digits, percentages, or financial terms slip through.
 *
 * @param text - Curated text to sanitize
 * @returns Sanitized text with forbidden patterns removed
 */
function sanitizeParam(text: string): string {
  let result = text;

  for (const pattern of FORBIDDEN_PATTERNS) {
    // Reset lastIndex for global patterns
    pattern.lastIndex = 0;
    result = result.replace(pattern, "");
  }

  // Clean up multiple spaces left by removals
  result = result.replace(/\s{2,}/g, " ").trim();

  return result;
}

/**
 * Enforces maximum length on param text.
 *
 * Truncates at word boundary when possible to avoid cutting mid-word.
 *
 * @param text - Text to cap
 * @param maxLength - Maximum allowed length
 * @returns Text capped to maxLength
 */
function enforceMaxLength(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }

  // Try to truncate at word boundary
  const truncated = text.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");

  if (lastSpace > maxLength * 0.7) {
    // Found a reasonable word boundary
    return truncated.slice(0, lastSpace).trim();
  }

  // Fall back to hard truncation
  return truncated.trim();
}

/**
 * Processes a curated param: sanitizes and enforces length cap.
 *
 * @param text - Curated param text (or undefined)
 * @returns Processed text, or undefined if input was empty/undefined
 */
function processParam(text: string | undefined): string | undefined {
  if (!text || text.trim().length === 0) {
    return undefined;
  }

  const sanitized = sanitizeParam(text.trim());
  if (sanitized.length === 0) {
    return undefined;
  }

  return enforceMaxLength(sanitized, MAX_PARAM_LENGTH);
}

// ============================================================================
// Public API
// ============================================================================

/**
 * Builds a canonical response template for the given outcome type.
 *
 * This is the authoritative response builder for Hedgr Copilot.
 * It is a pure function that:
 * - Does not read from process.env
 * - Does not throw
 * - Always returns a non-empty string
 * - Produces deterministic output for the same input
 * - Does not mutate inputs
 * - Sanitizes params to prevent injection
 *
 * Response structure (mandatory, in order):
 * 1. Acknowledge
 * 2. Recommend or Refuse
 * 3. Explain Why
 * 4. Reinforce User Control (always last)
 *
 * @param type - Response outcome type
 * @param params - Optional curated params for customization
 * @param params.acknowledge - Custom acknowledge text (curated-only)
 * @param params.explanation - Custom explanation text (curated-only)
 * @returns Complete, well-formed response text
 */
export function buildResponseTemplate(
  type: CopilotResponseType,
  params?: ResponseTemplateParams
): string {
  const template = RESPONSE_TEMPLATES[type];

  // Process optional params (sanitize + cap length)
  const customAcknowledge = processParam(params?.acknowledge);
  const customExplanation = processParam(params?.explanation);

  // Build response using canonical structure
  const acknowledge = customAcknowledge ?? template.acknowledge;
  const recommend = template.recommend;
  const explain = customExplanation ?? template.explain;
  const control = template.control;

  // Assemble in mandatory order: Acknowledge → Recommend → Explain → Control
  return `${acknowledge}\n${recommend}\n${explain}\n${control}`;
}

// ============================================================================
// Exported Constants (for testing)
// ============================================================================

export const RESPONSE_CONSTANTS = {
  CONTROL_PHRASE,
  MAX_PARAM_LENGTH,
  FORBIDDEN_PATTERNS,
} as const;
