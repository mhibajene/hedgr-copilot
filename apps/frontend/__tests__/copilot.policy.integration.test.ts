/**
 * Copilot ↔ Market Policy integration tests (MC2-4)
 *
 * Verifies that the chat route handler resolves the market policy from env,
 * builds a human-readable summary, and injects it into the system message
 * sent to the model.
 *
 * All tests are hermetic: CopilotModel is stubbed, no OpenAI network calls.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { NextApiRequest, NextApiResponse } from 'next';

// ---------------------------------------------------------------------------
// Module-level mocks (must appear before dynamic imports)
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
 * Returns the system message content from the first call to
 * CopilotModel.generateReply.
 */
async function captureSystemMessage(
  req: NextApiRequest,
): Promise<string> {
  const { CopilotModel } = await import('../lib/chat/copilotModel');
  vi.mocked(CopilotModel.generateReply).mockResolvedValue({
    message: { role: 'assistant', content: 'Stub reply.' },
    source: 'stub',
  });

  const handler = (await import('../pages/api/chat')).default;
  const res = createMockRes();
  await handler(req, res);

  expect(res.statusCode).toBe(200);

  const messages = vi.mocked(CopilotModel.generateReply).mock.calls[0][0];
  const systemMsg = messages.find((m: { role: string }) => m.role === 'system');
  expect(systemMsg).toBeDefined();
  return systemMsg!.content as string;
}

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

describe('Copilot policy injection (MC2-4)', () => {
  it('injects ## Market Policy section into system message', async () => {
    process.env.NEXT_PUBLIC_MARKET_SELECTED = 'UNKNOWN';
    process.env.NEXT_PUBLIC_MARKET_MODE = 'manual';

    const system = await captureSystemMessage(makePostRequest('Hello'));
    expect(system).toContain('## Market Policy');
  });

  it('system message contains Market line for UNKNOWN', async () => {
    process.env.NEXT_PUBLIC_MARKET_SELECTED = 'UNKNOWN';
    process.env.NEXT_PUBLIC_MARKET_MODE = 'manual';

    const system = await captureSystemMessage(makePostRequest('Can I use Earn?'));
    expect(system).toContain('Market: UNKNOWN');
  });

  it('earn is disabled for UNKNOWN market', async () => {
    process.env.NEXT_PUBLIC_MARKET_SELECTED = 'UNKNOWN';
    process.env.NEXT_PUBLIC_MARKET_MODE = 'manual';

    const system = await captureSystemMessage(makePostRequest('Can I use Earn?'));
    expect(system).toContain('earn (disabled)');
  });

  it('earn is enabled for KE market', async () => {
    process.env.NEXT_PUBLIC_MARKET_SELECTED = 'KE';
    process.env.NEXT_PUBLIC_MARKET_MODE = 'manual';

    const system = await captureSystemMessage(makePostRequest('Tell me about Earn'));
    expect(system).toContain('Market: KE');
    expect(system).toContain('earn (enabled)');
  });

  it('system message contains no-timelines constraint', async () => {
    process.env.NEXT_PUBLIC_MARKET_SELECTED = 'UNKNOWN';
    process.env.NEXT_PUBLIC_MARKET_MODE = 'manual';

    const system = await captureSystemMessage(makePostRequest('When will Earn launch?'));
    expect(system).toContain('must not speculate on timelines');
  });

  it('system message contains no-APY / no-yields constraint', async () => {
    process.env.NEXT_PUBLIC_MARKET_SELECTED = 'KE';
    process.env.NEXT_PUBLIC_MARKET_MODE = 'manual';

    const system = await captureSystemMessage(makePostRequest('What APY can I get?'));
    expect(system).toContain('must not quote specific APY numbers or promise yields');
  });

  it('system message contains user-cannot-override constraint', async () => {
    process.env.NEXT_PUBLIC_MARKET_SELECTED = 'UNKNOWN';
    process.env.NEXT_PUBLIC_MARKET_MODE = 'manual';

    const system = await captureSystemMessage(makePostRequest('Change my market to KE'));
    expect(system).toContain('user cannot override or change the market policy');
  });

  it('degrades gracefully when policy resolution throws', async () => {
    // Force an invalid market to trigger resolver failure is hard because
    // the resolver coerces unknown values. Instead, mock the resolver.
    vi.doMock('../lib/policy/resolve', () => ({
      resolvePolicyFromEnv: () => {
        throw new Error('simulated resolver failure');
      },
    }));

    const { CopilotModel } = await import('../lib/chat/copilotModel');
    vi.mocked(CopilotModel.generateReply).mockResolvedValue({
      message: { role: 'assistant', content: 'Stub reply.' },
      source: 'stub',
    });

    const handler = (await import('../pages/api/chat')).default;
    const res = createMockRes();
    await handler(makePostRequest('Hello'), res);

    // Handler should still succeed (200), just without policy context
    expect(res.statusCode).toBe(200);

    const messages = vi.mocked(CopilotModel.generateReply).mock.calls[0][0];
    const systemMsg = messages.find((m: { role: string }) => m.role === 'system');
    expect(systemMsg).toBeDefined();

    // Canonical prompt is still present, but no ## Market Policy section
    expect(systemMsg!.content).toContain('Hedgr Copilot');
    expect(systemMsg!.content).not.toContain('## Market Policy');
  });
});
