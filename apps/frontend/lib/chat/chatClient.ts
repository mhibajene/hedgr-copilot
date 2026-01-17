/**
 * Chat Client Adapter
 *
 * Provides a unified interface for chat functionality.
 * Always calls /api/chat — server decides stub vs live based on OPENAI_MODE.
 *
 * This ensures:
 * - Single client path (no client-side environment gating)
 * - Policy enforcement runs server-side for all requests
 * - Consistent behavior across dev/test/prod
 */

/**
 * Send a message to the chat assistant via the API.
 *
 * @param message - User message
 * @returns Promise resolving to assistant response content
 * @throws Error if the request fails
 */
export async function sendMessage(message: string): Promise<string> {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: [{ role: 'user', content: message }] }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage =
      errorData?.error?.message || `Chat request failed: ${response.status}`;
    throw new Error(errorMessage);
  }

  const data = await response.json();
  return data.message.content;
}
