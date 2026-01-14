export type Message = { role: 'user' | 'assistant' | 'system'; content: string };

// ============================================================================
// Content Normalization Helpers
// ============================================================================

/**
 * Normalize newlines to \n.
 * Converts \r\n (Windows) and \r (old Mac) to \n (Unix).
 */
function normalizeNewlines(content: string): string {
  return content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
}

/**
 * Collapse repeated whitespace (spaces/tabs) to single space.
 * Preserves newlines.
 */
function collapseWhitespace(content: string): string {
  // Replace multiple spaces/tabs with single space (but preserve newlines)
  return content.replace(/[^\S\n]+/g, ' ');
}

/**
 * Normalize message content for deterministic caching:
 * 1. Normalize newlines to \n
 * 2. Collapse repeated whitespace to single space
 * 3. Trim leading/trailing whitespace
 */
function normalizeContent(content: string): string {
  let normalized = normalizeNewlines(content);
  normalized = collapseWhitespace(normalized);
  normalized = normalized.trim();
  return normalized;
}

// ============================================================================
// Message Normalization
// ============================================================================

/**
 * Normalizes messages for processing:
 * - Normalizes newlines to \n
 * - Collapses repeated whitespace to single space
 * - Trims content of all messages
 * - Drops empty user messages
 * - Preserves casing and punctuation
 * - Includes full message history
 * 
 * Note: System message composition is handled by the API layer.
 * This function only normalizes user and assistant messages.
 * 
 * @param messages - Array of messages to normalize
 * @returns Normalized message array (user and assistant messages only)
 * @throws Error if all user messages are empty after trimming
 */
export function normalizeMessages(messages: Message[]): Message[] {
  // Normalize all message content
  const normalized = messages.map((msg) => ({
    ...msg,
    content: normalizeContent(msg.content),
  }));

  // Filter out empty user messages
  const filtered = normalized.filter((msg) => {
    if (msg.role === 'user') {
      return msg.content.length > 0;
    }
    return true; // Keep non-user messages (assistant, system)
  });

  // Check if we have at least one non-empty user message
  const hasUserMessage = filtered.some((msg) => msg.role === 'user');
  if (!hasUserMessage) {
    throw new Error('At least one non-empty user message is required');
  }

  return filtered;
}
