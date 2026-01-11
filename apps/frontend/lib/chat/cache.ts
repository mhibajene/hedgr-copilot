import { env } from '../../config/env';
import type { Message } from './normalize';
import { getChatMode } from './mode';

const PROMPT_VERSION = 'SYSTEM_POLICY_V1';
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

interface CacheEntry {
  content: string;
  expiresAt: number;
}

const cache = new Map<string, CacheEntry>();

/**
 * Generates a hash-like string from normalized messages for cache key
 */
function hashMessages(messages: Message[]): string {
  // Simple hash: JSON string of messages (deterministic)
  const json = JSON.stringify(messages);
  // Use a simple hash function (djb2-like)
  let hash = 5381;
  for (let i = 0; i < json.length; i++) {
    hash = ((hash << 5) + hash) + json.charCodeAt(i);
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36);
}

/**
 * Builds a composite cache key from mode, prompt version, app env, and message hash
 */
function buildCacheKey(messages: Message[]): string {
  const mode = getChatMode();
  const appEnv = env.NEXT_PUBLIC_APP_ENV;
  const messagesHash = hashMessages(messages);
  
  return `${mode}:${PROMPT_VERSION}:${appEnv}:${messagesHash}`;
}

/**
 * Gets a cached response if available and not expired
 */
export function getCachedResponse(messages: Message[]): string | null {
  const key = buildCacheKey(messages);
  const entry = cache.get(key);
  
  if (!entry) {
    return null;
  }
  
  // Check if expired
  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }
  
  return entry.content;
}

/**
 * Stores a response in cache with TTL
 */
export function setCachedResponse(messages: Message[], content: string): void {
  const key = buildCacheKey(messages);
  const expiresAt = Date.now() + CACHE_TTL_MS;
  
  cache.set(key, { content, expiresAt });
}

/**
 * Clears all cache entries (useful for testing)
 */
export function clearCache(): void {
  cache.clear();
}
