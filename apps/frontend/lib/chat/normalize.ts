export type Message = { role: 'user' | 'assistant' | 'system'; content: string };

const SYSTEM_POLICY_V1 = {
  role: 'system' as const,
  content: 'You are Hedgr Copilot, an educational assistant for savings and financial planning. You provide helpful explanations about balances, transactions, FX rates, and guide users through safe financial actions. You do not provide investment advice or execute transactions.',
};

/**
 * Normalizes messages for processing:
 * - Trims content of all messages
 * - Drops empty user messages
 * - Prepends SYSTEM_POLICY_V1 system message
 * 
 * @param messages - Array of messages to normalize
 * @returns Normalized message array with system message prepended
 * @throws Error if all user messages are empty after trimming
 */
export function normalizeMessages(messages: Message[]): Message[] {
  // Trim all message content
  const trimmed = messages.map((msg) => ({
    ...msg,
    content: msg.content.trim(),
  }));

  // Filter out empty user messages
  const filtered = trimmed.filter((msg) => {
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

  // Prepend system message if not already present
  const hasSystemMessage = filtered.some((msg) => msg.role === 'system');
  if (!hasSystemMessage) {
    return [SYSTEM_POLICY_V1, ...filtered];
  }

  return filtered;
}
