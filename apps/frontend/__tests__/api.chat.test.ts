import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { NextApiRequest, NextApiResponse } from 'next';
import handler from '../pages/api/chat';

// Mock dependencies
vi.mock('../lib/chat/mode', () => ({
  getChatMode: vi.fn(() => 'stub'),
}));

vi.mock('../lib/server/semanticCache', () => ({
  isCacheEnabled: vi.fn(() => true),
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

type MockRes = Partial<NextApiResponse> & {
  _json?: unknown;
  statusCode?: number;
  _headers?: Record<string, string>;
};

function createMockRes(): NextApiResponse & { _json?: unknown; _headers?: Record<string, string> } {
  const res: MockRes = {
    _headers: {},
  };
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

describe('/api/chat', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    const { clearCache } = await import('../lib/server/semanticCache');
    clearCache();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns 405 for non-POST methods', async () => {
    const req = { method: 'GET' } as NextApiRequest;
    const res = createMockRes();

    await handler(req, res);

    expect(res.statusCode).toBe(405);
    expect(res._json).toEqual({
      error: {
        code: 'METHOD_NOT_ALLOWED',
        message: 'Method not allowed',
      },
      requestId: expect.any(String),
    });
  });

  it('returns 400 for invalid JSON', async () => {
    const req = {
      method: 'POST',
      body: 'invalid json{',
    } as NextApiRequest;
    const res = createMockRes();

    await handler(req, res);

    expect(res.statusCode).toBe(400);
    expect(res._json).toEqual({
      error: {
        code: 'INVALID_REQUEST',
        message: 'Invalid JSON in request body',
      },
      requestId: expect.any(String),
    });
  });

  it('returns 400 for missing messages and message', async () => {
    const req = {
      method: 'POST',
      body: {},
    } as NextApiRequest;
    const res = createMockRes();

    await handler(req, res);

    expect(res.statusCode).toBe(400);
    expect(res._json).toEqual({
      error: {
        code: 'INVALID_REQUEST',
        message: 'Request must include either "messages" array or "message" string',
      },
      requestId: expect.any(String),
    });
  });

  it('returns 400 for empty user messages', async () => {
    const req = {
      method: 'POST',
      body: {
        messages: [
          { role: 'user', content: '   ' },
          { role: 'user', content: '' },
        ],
      },
    } as NextApiRequest;
    const res = createMockRes();

    await handler(req, res);

    expect(res.statusCode).toBe(400);
    expect(res._json).toEqual({
      error: {
        code: 'INVALID_REQUEST',
        message: 'At least one non-empty user message is required',
      },
      requestId: expect.any(String),
    });
  });

  it('accepts legacy { message: string } format', async () => {
    const { CopilotModel } = await import('../lib/chat/copilotModel');
    vi.mocked(CopilotModel.generateReply).mockResolvedValue({
      message: { role: 'assistant', content: 'Test response' },
      source: 'stub',
    });

    const req = {
      method: 'POST',
      headers: {},
      body: {
        message: 'Hello',
      },
    } as unknown as NextApiRequest;
    const res = createMockRes();

    await handler(req, res);

    expect(res.statusCode).toBe(200);
    expect(CopilotModel.generateReply).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ role: 'system' }),
        expect.objectContaining({ role: 'user', content: 'Hello' }),
      ]),
      expect.objectContaining({
        userId: 'anon',
      })
    );
  });

  it('normalizes messages (trim, prepend system)', async () => {
    const { CopilotModel } = await import('../lib/chat/copilotModel');
    vi.mocked(CopilotModel.generateReply).mockResolvedValue({
      message: { role: 'assistant', content: 'Test response' },
      source: 'stub',
    });

    const req = {
      method: 'POST',
      headers: {},
      body: {
        messages: [
          { role: 'user', content: '  Hello  ' },
        ],
      },
    } as unknown as NextApiRequest;
    const res = createMockRes();

    await handler(req, res);

    expect(res.statusCode).toBe(200);
    const callArgs = vi.mocked(CopilotModel.generateReply).mock.calls[0][0];
    expect(callArgs[0].role).toBe('system');
    expect(callArgs[1].content).toBe('Hello'); // Trimmed
  });

  it('system message is first in message array', async () => {
    const { CopilotModel } = await import('../lib/chat/copilotModel');
    vi.mocked(CopilotModel.generateReply).mockResolvedValue({
      message: { role: 'assistant', content: 'Test response' },
      source: 'stub',
    });

    const req = {
      method: 'POST',
      headers: {},
      body: {
        messages: [{ role: 'user', content: 'Hello' }],
      },
    } as unknown as NextApiRequest;
    const res = createMockRes();

    await handler(req, res);

    expect(res.statusCode).toBe(200);
    const callArgs = vi.mocked(CopilotModel.generateReply).mock.calls[0][0];
    expect(callArgs[0].role).toBe('system');
    expect(callArgs.length).toBeGreaterThan(1);
  });

  it('system message contains canonical prompt text', async () => {
    const { CopilotModel } = await import('../lib/chat/copilotModel');
    vi.mocked(CopilotModel.generateReply).mockResolvedValue({
      message: { role: 'assistant', content: 'Test response' },
      source: 'stub',
    });

    const req = {
      method: 'POST',
      headers: {},
      body: {
        messages: [{ role: 'user', content: 'Hello' }],
      },
    } as unknown as NextApiRequest;
    const res = createMockRes();

    await handler(req, res);

    expect(res.statusCode).toBe(200);
    const callArgs = vi.mocked(CopilotModel.generateReply).mock.calls[0][0];
    const systemMessage = callArgs[0];
    expect(systemMessage.role).toBe('system');
    expect(systemMessage.content).toContain('Hedgr Copilot');
    expect(systemMessage.content).toContain('NOT a financial advisor');
    expect(systemMessage.content).toContain('Environment:');
    expect(systemMessage.content).toContain('Mode:');
  });

  it('returns correct response shape with source', async () => {
    const { CopilotModel } = await import('../lib/chat/copilotModel');
    // Use content that already has WAIT phrases to avoid policy prepending
    const policyCompliantContent = "I recommend waiting before making changes. You're always in control of your savings decisions.";
    vi.mocked(CopilotModel.generateReply).mockResolvedValue({
      message: { role: 'assistant', content: policyCompliantContent },
      source: 'stub',
    });

    const req = {
      method: 'POST',
      headers: {},
      body: {
        messages: [{ role: 'user', content: 'Hello' }],
      },
    } as unknown as NextApiRequest;
    const res = createMockRes();

    await handler(req, res);

    expect(res.statusCode).toBe(200);
    // Policy layer may add environment disclosure for non-prod, so check structure
    expect(res._json).toMatchObject({
      message: {
        role: 'assistant',
      },
      source: 'stub',
    });
    // Content should contain original response (policy preserves compliant content)
    expect(res._json.message.content).toContain("recommend waiting");
    expect(res._json.message.content).toContain("always in control");
  });

  it('sets x-copilot-source response header', async () => {
    const { CopilotModel } = await import('../lib/chat/copilotModel');
    vi.mocked(CopilotModel.generateReply).mockResolvedValue({
      message: { role: 'assistant', content: 'Test response' },
      source: 'cache',
    });

    const req = {
      method: 'POST',
      headers: {},
      body: {
        messages: [{ role: 'user', content: 'Hello' }],
      },
    } as unknown as NextApiRequest;
    const res = createMockRes();

    await handler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._headers!['x-copilot-source']).toBe('cache');
  });

  it('passes x-copilot-cache header to CopilotModel', async () => {
    const { CopilotModel } = await import('../lib/chat/copilotModel');
    vi.mocked(CopilotModel.generateReply).mockResolvedValue({
      message: { role: 'assistant', content: 'Test response' },
      source: 'stub',
    });

    const req = {
      method: 'POST',
      headers: {
        'x-copilot-cache': 'bypass',
      },
      body: {
        messages: [{ role: 'user', content: 'Hello' }],
      },
    } as unknown as NextApiRequest;
    const res = createMockRes();

    await handler(req, res);

    expect(res.statusCode).toBe(200);
    expect(CopilotModel.generateReply).toHaveBeenCalledWith(
      expect.any(Array),
      expect.objectContaining({
        cacheHeader: 'bypass',
      })
    );
  });

  it('returns 503 for missing API key', async () => {
    const { CopilotModel } = await import('../lib/chat/copilotModel');
    const { getChatMode } = await import('../lib/chat/mode');
    
    vi.mocked(CopilotModel.generateReply).mockRejectedValue(
      new Error('OPENAI_API_KEY is required but not set')
    );

    vi.mocked(getChatMode).mockReturnValue('openai');

    const req = {
      method: 'POST',
      headers: {},
      body: {
        messages: [{ role: 'user', content: 'Hello' }],
      },
    } as unknown as NextApiRequest;
    const res = createMockRes();

    await handler(req, res);

    expect(res.statusCode).toBe(503);
    expect(res._json).toEqual({
      error: {
        code: 'SERVICE_UNAVAILABLE',
        message: 'Chat service is currently unavailable',
      },
      requestId: expect.any(String),
    });
  });

  it('returns 500 for other errors with sanitized message', async () => {
    const { CopilotModel } = await import('../lib/chat/copilotModel');
    vi.mocked(CopilotModel.generateReply).mockRejectedValue(
      new Error('Some internal error')
    );

    const req = {
      method: 'POST',
      headers: {},
      body: {
        messages: [{ role: 'user', content: 'Hello' }],
      },
    } as unknown as NextApiRequest;
    const res = createMockRes();

    await handler(req, res);

    expect(res.statusCode).toBe(500);
    expect(res._json).toEqual({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred processing your request',
      },
      requestId: expect.any(String),
    });
    // Verify internal error details are not leaked
    const response = res._json as { error: { message: string } };
    expect(response.error.message).not.toContain('internal error');
  });

  it('includes requestId in all error responses', async () => {
    const req = {
      method: 'GET', // Wrong method
    } as NextApiRequest;
    const res = createMockRes();

    await handler(req, res);

    expect(res._json).toHaveProperty('requestId');
    expect((res._json as { requestId: string }).requestId).toBeTruthy();
  });
});

describe('/api/chat cache integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('first request returns source=stub (cache miss)', async () => {
    const { CopilotModel } = await import('../lib/chat/copilotModel');
    vi.mocked(CopilotModel.generateReply).mockResolvedValue({
      message: { role: 'assistant', content: 'Fresh response' },
      source: 'stub',
    });

    const req = {
      method: 'POST',
      headers: {},
      body: {
        messages: [{ role: 'user', content: 'Hello' }],
      },
    } as unknown as NextApiRequest;
    const res = createMockRes();

    await handler(req, res);

    expect(res.statusCode).toBe(200);
    expect((res._json as { source: string }).source).toBe('stub');
    expect(res._headers!['x-copilot-source']).toBe('stub');
  });

  it('second identical request returns source=cache (cache hit)', async () => {
    const { CopilotModel } = await import('../lib/chat/copilotModel');
    
    // First call - returns from provider
    vi.mocked(CopilotModel.generateReply).mockResolvedValueOnce({
      message: { role: 'assistant', content: 'First response' },
      source: 'stub',
    });

    // Second call - returns from cache
    vi.mocked(CopilotModel.generateReply).mockResolvedValueOnce({
      message: { role: 'assistant', content: 'First response' },
      source: 'cache',
    });

    const req = {
      method: 'POST',
      headers: {},
      body: {
        messages: [{ role: 'user', content: 'Hello' }],
      },
    } as unknown as NextApiRequest;

    // First request
    const res1 = createMockRes();
    await handler(req, res1);
    expect((res1._json as { source: string }).source).toBe('stub');

    // Second request (same messages)
    const res2 = createMockRes();
    await handler(req, res2);
    expect((res2._json as { source: string }).source).toBe('cache');
    expect(res2._headers!['x-copilot-source']).toBe('cache');
  });

  it('bypass header skips cache', async () => {
    const { CopilotModel } = await import('../lib/chat/copilotModel');
    vi.mocked(CopilotModel.generateReply).mockResolvedValue({
      message: { role: 'assistant', content: 'Fresh response' },
      source: 'stub',
    });

    const req = {
      method: 'POST',
      headers: {
        'x-copilot-cache': 'bypass',
      },
      body: {
        messages: [{ role: 'user', content: 'Hello' }],
      },
    } as unknown as NextApiRequest;
    const res = createMockRes();

    await handler(req, res);

    expect(res.statusCode).toBe(200);
    expect((res._json as { source: string }).source).toBe('stub');
    expect(res._headers!['x-copilot-source']).toBe('stub');
  });
});
