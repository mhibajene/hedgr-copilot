/**
 * Chat Client Adapter
 * 
 * Provides a unified interface for chat functionality.
 * Currently delegates to stub implementation.
 * Future: will switch to real client based on feature flags.
 */

import { sendMessage as sendMessageStub } from './chatClient.stub';

/**
 * Send a message to the chat assistant.
 * 
 * @param message - User message
 * @returns Promise resolving to assistant response
 */
export async function sendMessage(message: string): Promise<string> {
  // Currently using stub implementation
  // Future: switch based on feature flags or environment
  return sendMessageStub(message);
}
