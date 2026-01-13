import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  makeCacheKey,
  getCachedReply,
  setCachedReply,
  isCacheEnabled,
  parseCacheHeader,
  clearCache,
  getCacheSize,
  getPromptVersion,
  type CacheKeyInput,
  type Reply,
} from '../lib/server/semanticCache';
import type { Message } from '../lib/chat/normalize';

describe('semanticCache', () => {
  beforeEach(() => {
    clearCache();
    vi.unstubAllEnvs();
  });

  afterEach(() => {
    clearCache();
    vi.unstubAllEnvs();
  });

  describe('makeCacheKey', () => {
    const baseInput: CacheKeyInput = {
      env: 'dev',
      mode: 'stub',
      userId: 'user-123',
      normalizedMessages: [
        { role: 'system', content: 'System prompt' },
        { role: 'user', content: 'Hello' },
      ],
      promptVersion: 'v1',
    };

    it('generates deterministic keys for same input', () => {
      const key1 = makeCacheKey(baseInput);
      const key2 = makeCacheKey(baseInput);
      expect(key1).toBe(key2);
    });

    it('generates different keys for different env', () => {
      const key1 = makeCacheKey({ ...baseInput, env: 'dev' });
      const key2 = makeCacheKey({ ...baseInput, env: 'stg' });
      expect(key1).not.toBe(key2);
    });

    it('generates different keys for different mode', () => {
      const key1 = makeCacheKey({ ...baseInput, mode: 'stub' });
      const key2 = makeCacheKey({ ...baseInput, mode: 'openai' });
      expect(key1).not.toBe(key2);
    });

    it('generates different keys for different userId', () => {
      const key1 = makeCacheKey({ ...baseInput, userId: 'user-123' });
      const key2 = makeCacheKey({ ...baseInput, userId: 'user-456' });
      expect(key1).not.toBe(key2);
    });

    it('generates different keys for different model', () => {
      const key1 = makeCacheKey({ ...baseInput, model: 'gpt-4o-mini' });
      const key2 = makeCacheKey({ ...baseInput, model: 'gpt-4o' });
      expect(key1).not.toBe(key2);
    });

    it('generates different keys for different messages', () => {
      const key1 = makeCacheKey(baseInput);
      const key2 = makeCacheKey({
        ...baseInput,
        normalizedMessages: [
          { role: 'system', content: 'System prompt' },
          { role: 'user', content: 'Goodbye' },
        ],
      });
      expect(key1).not.toBe(key2);
    });

    it('generates different keys for different promptVersion', () => {
      const key1 = makeCacheKey({ ...baseInput, promptVersion: 'v1' });
      const key2 = makeCacheKey({ ...baseInput, promptVersion: 'v2' });
      expect(key1).not.toBe(key2);
    });

    it('generates SHA-256 hex hash (64 characters)', () => {
      const key = makeCacheKey(baseInput);
      expect(key).toMatch(/^[a-f0-9]{64}$/);
    });

    it('handles undefined model consistently', () => {
      const key1 = makeCacheKey({ ...baseInput, model: undefined });
      const key2 = makeCacheKey({ ...baseInput, model: undefined });
      expect(key1).toBe(key2);
    });
  });

  describe('getCachedReply / setCachedReply', () => {
    const testReply: Reply = {
      message: { role: 'assistant', content: 'Hello there!' },
      source: 'stub',
    };

    it('returns null for cache miss', () => {
      const result = getCachedReply('nonexistent-key');
      expect(result).toBeNull();
    });

    it('returns cached reply on hit', () => {
      setCachedReply('test-key', testReply);
      const result = getCachedReply('test-key');
      expect(result).toEqual(testReply);
    });

    it('updates LRU order on access', () => {
      // Add entries
      setCachedReply('key-1', { ...testReply, message: { ...testReply.message, content: '1' } });
      setCachedReply('key-2', { ...testReply, message: { ...testReply.message, content: '2' } });
      setCachedReply('key-3', { ...testReply, message: { ...testReply.message, content: '3' } });

      // Access key-1 to move it to end
      getCachedReply('key-1');

      // Verify all entries still present
      expect(getCacheSize()).toBe(3);
    });

    it('overwrites existing entry with same key', () => {
      const reply1: Reply = { message: { role: 'assistant', content: 'First' }, source: 'stub' };
      const reply2: Reply = { message: { role: 'assistant', content: 'Second' }, source: 'cache' };

      setCachedReply('same-key', reply1);
      setCachedReply('same-key', reply2);

      const result = getCachedReply('same-key');
      expect(result).toEqual(reply2);
      expect(getCacheSize()).toBe(1);
    });
  });

  describe('TTL expiry', () => {
    it('expires entries after TTL', async () => {
      const testReply: Reply = {
        message: { role: 'assistant', content: 'Will expire' },
        source: 'stub',
      };

      // Use fake timers to control time
      vi.useFakeTimers();

      setCachedReply('expiring-key', testReply);
      expect(getCachedReply('expiring-key')).toEqual(testReply);

      // Advance time past TTL (5 minutes + 1ms)
      vi.advanceTimersByTime(5 * 60 * 1000 + 1);

      // Should now be expired
      expect(getCachedReply('expiring-key')).toBeNull();

      vi.useRealTimers();
    });

    it('does not expire entries before TTL', () => {
      const testReply: Reply = {
        message: { role: 'assistant', content: 'Will not expire' },
        source: 'stub',
      };

      vi.useFakeTimers();

      setCachedReply('valid-key', testReply);

      // Advance time just under TTL (5 minutes - 1s)
      vi.advanceTimersByTime(5 * 60 * 1000 - 1000);

      // Should still be valid
      expect(getCachedReply('valid-key')).toEqual(testReply);

      vi.useRealTimers();
    });
  });

  describe('LRU eviction', () => {
    it('evicts oldest entry when exceeding max size', () => {
      const testReply: Reply = {
        message: { role: 'assistant', content: 'Test' },
        source: 'stub',
      };

      // Fill cache to max (500 entries)
      for (let i = 0; i < 500; i++) {
        setCachedReply(`key-${i}`, { ...testReply, message: { ...testReply.message, content: `${i}` } });
      }

      expect(getCacheSize()).toBe(500);

      // Add one more - should evict oldest (key-0)
      setCachedReply('key-new', testReply);

      expect(getCacheSize()).toBe(500);
      expect(getCachedReply('key-0')).toBeNull(); // Evicted
      expect(getCachedReply('key-new')).toEqual(testReply); // Present
      expect(getCachedReply('key-1')).not.toBeNull(); // Still present
    });

    it('maintains LRU order for eviction', () => {
      const testReply: Reply = {
        message: { role: 'assistant', content: 'Test' },
        source: 'stub',
      };

      // Fill cache to max
      for (let i = 0; i < 500; i++) {
        setCachedReply(`key-${i}`, { ...testReply, message: { ...testReply.message, content: `${i}` } });
      }

      // Access key-0 to move it to end (most recently used)
      getCachedReply('key-0');

      // Add new entry - should evict key-1 (now oldest) instead of key-0
      setCachedReply('key-new', testReply);

      expect(getCachedReply('key-0')).not.toBeNull(); // Accessed, so not evicted
      expect(getCachedReply('key-1')).toBeNull(); // Now oldest, so evicted
    });
  });

  describe('isCacheEnabled', () => {
    it('returns true by default (env not set)', () => {
      delete process.env.COPILOT_CACHE_ENABLED;
      expect(isCacheEnabled()).toBe(true);
    });

    it('returns true when env is empty string', () => {
      vi.stubEnv('COPILOT_CACHE_ENABLED', '');
      expect(isCacheEnabled()).toBe(true);
    });

    it('returns true when env is "true"', () => {
      vi.stubEnv('COPILOT_CACHE_ENABLED', 'true');
      expect(isCacheEnabled()).toBe(true);
    });

    it('returns true when env is "TRUE" (case-insensitive)', () => {
      vi.stubEnv('COPILOT_CACHE_ENABLED', 'TRUE');
      expect(isCacheEnabled()).toBe(true);
    });

    it('returns false when env is "false"', () => {
      vi.stubEnv('COPILOT_CACHE_ENABLED', 'false');
      expect(isCacheEnabled()).toBe(false);
    });

    it('returns false when env is "FALSE" (case-insensitive)', () => {
      vi.stubEnv('COPILOT_CACHE_ENABLED', 'FALSE');
      expect(isCacheEnabled()).toBe(false);
    });

    it('returns false when env is any other value', () => {
      vi.stubEnv('COPILOT_CACHE_ENABLED', 'invalid');
      expect(isCacheEnabled()).toBe(false);
    });
  });

  describe('parseCacheHeader', () => {
    it('returns "none" for undefined header', () => {
      expect(parseCacheHeader(undefined)).toBe('none');
    });

    it('returns "none" for null header', () => {
      expect(parseCacheHeader(null)).toBe('none');
    });

    it('returns "none" for empty string', () => {
      expect(parseCacheHeader('')).toBe('none');
    });

    it('returns "bypass" for "bypass" header', () => {
      expect(parseCacheHeader('bypass')).toBe('bypass');
    });

    it('returns "bypass" for "BYPASS" header (case-insensitive)', () => {
      expect(parseCacheHeader('BYPASS')).toBe('bypass');
    });

    it('returns "refresh" for "refresh" header', () => {
      expect(parseCacheHeader('refresh')).toBe('refresh');
    });

    it('returns "refresh" for "REFRESH" header (case-insensitive)', () => {
      expect(parseCacheHeader('REFRESH')).toBe('refresh');
    });

    it('returns "none" for unknown header value', () => {
      expect(parseCacheHeader('invalid')).toBe('none');
    });

    it('handles whitespace around header value', () => {
      expect(parseCacheHeader('  bypass  ')).toBe('bypass');
      expect(parseCacheHeader('  refresh  ')).toBe('refresh');
    });
  });

  describe('getPromptVersion', () => {
    it('returns the prompt version constant', () => {
      expect(getPromptVersion()).toBe('v1');
    });
  });

  describe('clearCache', () => {
    it('removes all entries', () => {
      const testReply: Reply = {
        message: { role: 'assistant', content: 'Test' },
        source: 'stub',
      };

      setCachedReply('key-1', testReply);
      setCachedReply('key-2', testReply);
      expect(getCacheSize()).toBe(2);

      clearCache();

      expect(getCacheSize()).toBe(0);
      expect(getCachedReply('key-1')).toBeNull();
      expect(getCachedReply('key-2')).toBeNull();
    });
  });

  describe('key stability for equivalent normalized inputs', () => {
    it('generates same key for semantically identical messages', () => {
      const messages: Message[] = [
        { role: 'system', content: 'You are helpful.' },
        { role: 'user', content: 'Hello world' },
        { role: 'assistant', content: 'Hi there!' },
        { role: 'user', content: 'How are you?' },
      ];

      const input1: CacheKeyInput = {
        env: 'dev',
        mode: 'stub',
        userId: 'user-1',
        normalizedMessages: messages,
        promptVersion: 'v1',
      };

      const input2: CacheKeyInput = {
        env: 'dev',
        mode: 'stub',
        userId: 'user-1',
        normalizedMessages: [...messages], // Copy of same messages
        promptVersion: 'v1',
      };

      expect(makeCacheKey(input1)).toBe(makeCacheKey(input2));
    });

    it('message order affects cache key', () => {
      const messages1: Message[] = [
        { role: 'user', content: 'First' },
        { role: 'user', content: 'Second' },
      ];

      const messages2: Message[] = [
        { role: 'user', content: 'Second' },
        { role: 'user', content: 'First' },
      ];

      const input1: CacheKeyInput = {
        env: 'dev',
        mode: 'stub',
        userId: 'user-1',
        normalizedMessages: messages1,
        promptVersion: 'v1',
      };

      const input2: CacheKeyInput = {
        env: 'dev',
        mode: 'stub',
        userId: 'user-1',
        normalizedMessages: messages2,
        promptVersion: 'v1',
      };

      expect(makeCacheKey(input1)).not.toBe(makeCacheKey(input2));
    });
  });
});
