/**
 * Semantic Cache for Copilot Replies
 * 
 * Server-only, deterministic, in-process cache with:
 * - SHA-256 keying over normalized inputs
 * - LRU eviction (max 500 entries)
 * - TTL expiration (5 minutes)
 * - Environment isolation
 * - Per-request bypass controls
 * 
 * @module lib/server/semanticCache
 */

import { createHash } from 'crypto';
import type { Message } from '../chat/normalize';

// ============================================================================
// Constants
// ============================================================================

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
const CACHE_MAX_ENTRIES = 500;
const PROMPT_VERSION = 'v2'; // Updated for canonical system prompt (S09-COPILOT-PROMPT)

// ============================================================================
// Types
// ============================================================================

export type CacheSource = 'cache' | 'openai' | 'stub';

export interface CacheKeyInput {
  env: string;                    // NEXT_PUBLIC_APP_ENV or NODE_ENV
  mode: 'stub' | 'openai';        // resolved chat mode
  model?: string;                 // if applicable (e.g., 'gpt-4o-mini')
  userId: string;                 // authenticated user or 'anon'
  normalizedMessages: Message[];  // output of normalizeMessages()
  promptVersion: string;          // static constant (e.g., 'v1')
}

export interface Reply {
  message: { role: 'assistant'; content: string };
  source: CacheSource;
}

export type CacheBypassMode = 'none' | 'bypass' | 'refresh';

interface CacheEntry {
  reply: Reply;
  expiresAt: number;
}

// ============================================================================
// Cache Storage (LRU Map)
// ============================================================================

/**
 * LRU cache implementation using Map's insertion order.
 * On access, entries are moved to the end (most recently used).
 * On eviction, entries are removed from the beginning (least recently used).
 */
const cache = new Map<string, CacheEntry>();

// ============================================================================
// Public API
// ============================================================================

/**
 * Check if the cache is globally enabled.
 * 
 * Cache is enabled by default unless COPILOT_CACHE_ENABLED=false.
 */
export function isCacheEnabled(): boolean {
  const envValue = process.env.COPILOT_CACHE_ENABLED;
  // Default to true if not set
  if (envValue === undefined || envValue === '') {
    return true;
  }
  return envValue.toLowerCase() === 'true';
}

/**
 * Parse the x-copilot-cache header value into a bypass mode.
 * 
 * @param headerValue - Value of the x-copilot-cache header
 * @returns 'bypass' | 'refresh' | 'none'
 */
export function parseCacheHeader(headerValue: string | undefined | null): CacheBypassMode {
  if (!headerValue) return 'none';
  const normalized = headerValue.toLowerCase().trim();
  if (normalized === 'bypass') return 'bypass';
  if (normalized === 'refresh') return 'refresh';
  return 'none';
}

/**
 * Generate a deterministic cache key from input parameters.
 * 
 * Uses SHA-256 hash over JSON-serialized input to ensure:
 * - Determinism: same inputs always produce the same key
 * - No collisions across envs, modes, users, or models
 * - No raw prompt strings in keys
 * 
 * @param input - Cache key input parameters
 * @returns SHA-256 hash string (hex)
 */
export function makeCacheKey(input: CacheKeyInput): string {
  // Ensure deterministic JSON serialization
  const payload = JSON.stringify({
    env: input.env,
    mode: input.mode,
    model: input.model ?? null,
    userId: input.userId,
    promptVersion: input.promptVersion,
    messages: input.normalizedMessages,
  });
  
  return createHash('sha256').update(payload).digest('hex');
}

/**
 * Get a cached reply if available and not expired.
 * 
 * Implements lazy expiration: expired entries are removed on access.
 * Updates LRU order on cache hit.
 * 
 * @param key - Cache key from makeCacheKey()
 * @returns Cached Reply or null if miss/expired
 */
export function getCachedReply(key: string): Reply | null {
  const entry = cache.get(key);
  
  if (!entry) {
    logDebug('cache miss', { key: truncateKey(key) });
    return null;
  }
  
  // Lazy expiration check
  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    logDebug('cache expired', { key: truncateKey(key) });
    return null;
  }
  
  // Update LRU order: delete and re-add to move to end
  cache.delete(key);
  cache.set(key, entry);
  
  logDebug('cache hit', { key: truncateKey(key) });
  return entry.reply;
}

/**
 * Store a reply in the cache with TTL.
 * 
 * Implements LRU eviction when cache exceeds max entries.
 * 
 * @param key - Cache key from makeCacheKey()
 * @param reply - Reply to cache
 */
export function setCachedReply(key: string, reply: Reply): void {
  const expiresAt = Date.now() + CACHE_TTL_MS;
  
  // If key already exists, delete first to update LRU order
  if (cache.has(key)) {
    cache.delete(key);
  }
  
  // Evict oldest entries if at capacity
  while (cache.size >= CACHE_MAX_ENTRIES) {
    const oldestKey = cache.keys().next().value;
    if (oldestKey) {
      cache.delete(oldestKey);
      logDebug('cache evict (LRU)', { key: truncateKey(oldestKey) });
    }
  }
  
  cache.set(key, { reply, expiresAt });
  logDebug('cache set', { key: truncateKey(key), size: cache.size });
}

/**
 * Get the current prompt version constant.
 * Used for cache key generation.
 */
export function getPromptVersion(): string {
  return PROMPT_VERSION;
}

/**
 * Clear all cache entries.
 * Useful for testing.
 */
export function clearCache(): void {
  cache.clear();
  logDebug('cache cleared', {});
}

/**
 * Get current cache size.
 * Useful for testing and observability.
 */
export function getCacheSize(): number {
  return cache.size;
}

// ============================================================================
// Internal Helpers
// ============================================================================

/**
 * Truncate cache key for safe logging (never log full hash).
 */
function truncateKey(key: string): string {
  return key.slice(0, 8) + '...';
}

/**
 * Log cache operations at debug level only.
 * Never logs prompt content.
 */
function logDebug(event: string, data: Record<string, unknown>): void {
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_CACHE === 'true') {
    console.debug(`[semanticCache] ${event}`, data);
  }
}
