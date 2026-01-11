import { getChatMode } from './mode';
import { getCachedResponse, setCachedResponse } from './cache';
import { generateWithOpenAI } from './providers/openai';
import { sendMessage } from './chatClient.stub';
import type { Message } from './normalize';

export type Reply = {
  message: { role: 'assistant'; content: string };
  source: 'stub' | 'openai' | 'cache';
};

/**
 * CopilotModel - Client abstraction for generating chat replies
 */
export class CopilotModel {
  /**
   * Generates a reply based on the current mode (stub or openai)
   * Checks cache first, then falls back to provider
   */
  static async generateReply(messages: Message[]): Promise<Reply> {
    // Check cache first
    const cached = getCachedResponse(messages);
    if (cached) {
      return {
        message: { role: 'assistant', content: cached },
        source: 'cache',
      };
    }

    // Get mode and generate response
    const mode = getChatMode();
    let content: string;

    if (mode === 'openai') {
      content = await generateWithOpenAI(messages);
    } else {
      // Stub mode
      content = await sendMessage(messages);
    }

    // Cache the response
    setCachedResponse(messages, content);

    return {
      message: { role: 'assistant', content },
      source: mode,
    };
  }
}
