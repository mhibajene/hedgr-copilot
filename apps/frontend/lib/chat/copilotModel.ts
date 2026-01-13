import { getChatMode } from './mode';
import { generateWithOpenAI } from './providers/openai';
import { sendMessage } from './chatClient.stub';
import type { Message } from './normalize';
import {
  isCacheEnabled,
  parseCacheHeader,
  makeCacheKey,
  getCachedReply,
  setCachedReply,
  getPromptVersion,
  type Reply,
} from '../server/semanticCache';
import { env } from '../../config/env';

// Re-export Reply type for consumers
export type { Reply };

/**
 * Context needed for cache key generation and bypass handling.
 * Passed from the API route to CopilotModel.generateReply.
 */
export interface CacheContext {
  userId: string;                    // authenticated user or 'anon'
  cacheHeader?: string | null;       // x-copilot-cache header value
  model?: string;                    // model name if applicable
}

/**
 * CopilotModel - Server abstraction for generating chat replies
 * 
 * Integrates with semantic cache for deterministic caching:
 * - Checks cache before generating (if enabled and not bypassed)
 * - Stores replies in cache after generation (if enabled and not bypassed)
 * - Respects per-request bypass/refresh headers
 */
export class CopilotModel {
  /**
   * Generates a reply based on the current mode (stub or openai).
   * Integrates with semantic cache for deduplication.
   * 
   * @param messages - Normalized messages array
   * @param context - Cache context with userId and headers
   * @returns Reply with source indicator
   */
  static async generateReply(messages: Message[], context: CacheContext): Promise<Reply> {
    const mode = getChatMode();
    const bypassMode = parseCacheHeader(context.cacheHeader);
    const cacheEnabled = isCacheEnabled();
    
    // Determine if we should read from cache
    // bypass: skip read + write
    // refresh: skip read, allow write
    const shouldReadCache = cacheEnabled && bypassMode === 'none';
    const shouldWriteCache = cacheEnabled && bypassMode !== 'bypass';
    
    // Build cache key
    const cacheKey = makeCacheKey({
      env: env.NEXT_PUBLIC_APP_ENV || process.env.NODE_ENV || 'development',
      mode,
      model: context.model,
      userId: context.userId,
      normalizedMessages: messages,
      promptVersion: getPromptVersion(),
    });
    
    // Check cache first (if enabled and not bypassed)
    if (shouldReadCache) {
      const cached = getCachedReply(cacheKey);
      if (cached) {
        return cached;
      }
    }

    // Generate response from provider
    let content: string;

    if (mode === 'openai') {
      content = await generateWithOpenAI(messages);
    } else {
      // Stub mode
      content = await sendMessage(messages);
    }

    const reply: Reply = {
      message: { role: 'assistant', content },
      source: mode,
    };

    // Cache the response (if enabled and not fully bypassed)
    if (shouldWriteCache) {
      setCachedReply(cacheKey, reply);
    }

    return reply;
  }
}
