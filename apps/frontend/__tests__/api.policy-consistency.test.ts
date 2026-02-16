/**
 * MC2-6  UI ↔ Copilot policy consistency tests
 *
 * Ensures that the policy surfaced by GET /api/policy (consumed by the UI)
 * and the policy injected into the Copilot system message are identical in
 * version, market, and feature-flag state.
 *
 * Both code paths call resolvePolicyFromEnv() under the same env context, so
 * any drift would indicate a wiring bug.
 *
 * The test parses the machine-readable [POLICY] stanza emitted by
 * buildPolicySummary rather than relying on English prose formatting.
 *
 * Hermetic: CopilotModel is stubbed, no network calls, no new env secrets.
 */

// @vitest-environment node

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { NextApiRequest, NextApiResponse } from 'next';

// ---------------------------------------------------------------------------
// Module-level mocks (must appear before any dynamic imports)
// ---------------------------------------------------------------------------

vi.mock('../lib/chat/mode', () => ({
  getChatMode: vi.fn(() => 'stub'),
}));

vi.mock('../lib/server/semanticCache', () => ({
  isCacheEnabled: vi.fn(() => false),
  parseCacheHeader: vi.fn(() => 'none'),
  makeCacheKey: vi.fn(() => 'mock-cache-key'),
  getCachedReply: vi.fn(() => null),
  setCachedReply: vi.fn(),
  clearCache: vi.fn(),
  getPromptVersion: vi.fn(() => 'v1'),
}));

vi.mock('../lib/chat/copilotModel', () => ({
  CopilotModel: {
    generateReply: vi.fn(),
  },
}));

vi.mock('../lib/chat/providers/openai', () => ({
  generateWithOpenAI: vi.fn(),
}));

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

type MockRes = Partial<NextApiResponse> & {
  _json?: unknown;
  statusCode?: number;
  _headers?: Record<string, string>;
};

function createMockRes(): NextApiResponse & { _json?: unknown; _headers?: Record<string, string> } {
  const res: MockRes = { _headers: {} };
  res.status = (code: number) => {
    res.statusCode = code;
    return res as NextApiResponse;
  };
  res.json = (data: unknown) => {
    res._json = data;
    return res as NextApiResponse;
  };
  res.setHeader = (name: string, value: string) => {
    res._headers![name] = value;
    return res as NextApiResponse;
  };
  return res as NextApiResponse & { _json?: unknown; _headers?: Record<string, string> };
}

function makePostRequest(content: string): NextApiRequest {
  return {
    method: 'POST',
    headers: {},
    body: { messages: [{ role: 'user', content }] },
  } as unknown as NextApiRequest;
}

/**
 * Parse the machine-readable [POLICY] stanza from the system message.
 *
 * Expected format (single line):
 *   [POLICY] market=KE version=v1 earn=enabled payLinks=disabled stablecoinSend=disabled
 *
 * Returns a Record<string, string> of key/value pairs, or null if missing.
 */
function parsePolicyStanza(systemMessage: string): Record<string, string> | null {
  const match = systemMessage.match(/^\[POLICY\]\s+(.+)$/m);
  if (!match) return null;

  const pairs: Record<string, string> = {};
  for (const token of match[1].split(/\s+/)) {
    const [key, value] = token.split('=');
    if (key && value) pairs[key] = value;
  }
  return pairs;
}

// ---------------------------------------------------------------------------
// Markets to test — intentionally NOT hardcoded feature expectations.
// All assertions are derived from the /api/policy response payload.
// ---------------------------------------------------------------------------

const MARKETS = ['KE', 'ZW', 'ZA', 'UNKNOWN'] as const;

// ---------------------------------------------------------------------------
// Lifecycle
// ---------------------------------------------------------------------------

const originalEnv = { ...process.env };

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
});

afterEach(() => {
  process.env = { ...originalEnv };
  vi.restoreAllMocks();
});

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('MC2-6: UI ↔ Copilot policy consistency', () => {
  for (const market of MARKETS) {
    describe(`market=${market}`, () => {
      /**
       * Shared setup: resolve the API policy payload AND capture the Copilot
       * system message under the same env snapshot.
       */
      async function resolveApiAndCopilot() {
        process.env.NEXT_PUBLIC_MARKET_SELECTED = market;
        process.env.NEXT_PUBLIC_MARKET_MODE = 'manual';

        // --- Step A: GET /api/policy (App Router handler, direct import) ---
        const { GET } = await import('../app/api/policy/route');
        const apiRes = await GET();
        const apiPolicy = await apiRes.json();

        // --- Step B: POST /api/chat (Pages Router handler, runtime path) ---
        const { CopilotModel } = await import('../lib/chat/copilotModel');
        vi.mocked(CopilotModel.generateReply).mockResolvedValue({
          message: { role: 'assistant', content: 'Stub reply.' },
          source: 'stub',
        });

        const handler = (await import('../pages/api/chat')).default;
        const res = createMockRes();
        await handler(makePostRequest('Tell me about Earn'), res);

        expect(res.statusCode).toBe(200);

        const messages = vi.mocked(CopilotModel.generateReply).mock.calls[0][0];
        const systemMsg = messages.find((m: { role: string }) => m.role === 'system');
        expect(systemMsg).toBeDefined();

        const stanza = parsePolicyStanza(systemMsg!.content as string);
        expect(stanza).not.toBeNull();

        return { apiPolicy, stanza: stanza!, systemContent: systemMsg!.content as string };
      }

      // -----------------------------------------------------------------
      // Version consistency
      // -----------------------------------------------------------------

      it('API version matches Copilot [POLICY] version', async () => {
        const { apiPolicy, stanza } = await resolveApiAndCopilot();
        expect(stanza.version).toBe(apiPolicy.version);
      });

      // -----------------------------------------------------------------
      // Market consistency
      // -----------------------------------------------------------------

      it('API market matches Copilot [POLICY] market', async () => {
        const { apiPolicy, stanza } = await resolveApiAndCopilot();
        expect(stanza.market).toBe(apiPolicy.market);
      });

      it('human-readable Market line matches API market', async () => {
        const { apiPolicy, systemContent } = await resolveApiAndCopilot();
        expect(systemContent).toContain(`Market: ${apiPolicy.market}`);
      });

      // -----------------------------------------------------------------
      // Feature-flag consistency (derived from API payload, not hardcoded)
      // -----------------------------------------------------------------

      it('feature flags in [POLICY] stanza match API features', async () => {
        const { apiPolicy, stanza } = await resolveApiAndCopilot();

        for (const key of ['earn', 'payLinks', 'stablecoinSend'] as const) {
          const expected = apiPolicy.policy.features[key] ? 'enabled' : 'disabled';
          expect(stanza[key]).toBe(expected);
        }
      });
    });
  }

  // -----------------------------------------------------------------------
  // Baseline: UNKNOWN market deny-by-default
  // -----------------------------------------------------------------------

  describe('UNKNOWN deny-by-default baseline', () => {
    it('all gated features are disabled for UNKNOWN market', async () => {
      process.env.NEXT_PUBLIC_MARKET_SELECTED = 'UNKNOWN';
      process.env.NEXT_PUBLIC_MARKET_MODE = 'manual';

      const { GET } = await import('../app/api/policy/route');
      const apiRes = await GET();
      const apiPolicy = await apiRes.json();

      expect(apiPolicy.market).toBe('UNKNOWN');
      expect(apiPolicy.policy.features.earn).toBe(false);
      expect(apiPolicy.policy.features.payLinks).toBe(false);
      expect(apiPolicy.policy.features.stablecoinSend).toBe(false);
    });

    it('Copilot [POLICY] stanza reflects deny-by-default for UNKNOWN', async () => {
      process.env.NEXT_PUBLIC_MARKET_SELECTED = 'UNKNOWN';
      process.env.NEXT_PUBLIC_MARKET_MODE = 'manual';

      const { CopilotModel } = await import('../lib/chat/copilotModel');
      vi.mocked(CopilotModel.generateReply).mockResolvedValue({
        message: { role: 'assistant', content: 'Stub reply.' },
        source: 'stub',
      });

      const handler = (await import('../pages/api/chat')).default;
      const res = createMockRes();
      await handler(makePostRequest('Can I use Earn?'), res);

      expect(res.statusCode).toBe(200);

      const messages = vi.mocked(CopilotModel.generateReply).mock.calls[0][0];
      const systemMsg = messages.find((m: { role: string }) => m.role === 'system');
      const stanza = parsePolicyStanza(systemMsg!.content as string);

      expect(stanza).not.toBeNull();
      expect(stanza!.earn).toBe('disabled');
      expect(stanza!.payLinks).toBe('disabled');
      expect(stanza!.stablecoinSend).toBe('disabled');
    });
  });
});
