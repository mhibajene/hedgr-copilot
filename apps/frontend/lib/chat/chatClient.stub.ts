/**
 * Stub Chat Client
 * 
 * Provides in-memory responses for chat messages.
 * No network calls - pure stub implementation for development/testing.
 */

/**
 * Send a message to the stub chat client.
 * Returns a response after an artificial delay.
 * 
 * @param message - User message
 * @returns Promise resolving to assistant response
 */
export async function sendMessage(message: string): Promise<string> {
  // Artificial delay to simulate network latency (500-1500ms)
  const delay = Math.floor(Math.random() * 1000) + 500;
  await new Promise((resolve) => setTimeout(resolve, delay));

  const normalizedMessage = message.toLowerCase().trim();

  // Special response for "hedgr" query
  if (normalizedMessage.includes('hedgr')) {
    return 'Hedgr is a savings platform that helps you grow your money safely through DeFi yield opportunities. It provides educational support to help you make informed savings decisions.';
  }

  // Generic educational response for other queries
  return "I'm here to help you learn about savings and financial planning. What would you like to know?";
}
