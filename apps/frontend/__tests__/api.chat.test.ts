import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { NextApiRequest, NextApiResponse } from 'next';
import handler from '../pages/api/chat';

// Mock dependencies
vi.mock('../lib/chat/mode', () => ({
  getChatMode: vi.fn(() => 'stub'),
}));

vi.mock('../lib/chat/cache', () => ({
  getCachedResponse: vi.fn(() => null),
  setCachedResponse: vi.fn(),
  clearCache: vi.fn(),
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
};

function createMockRes(): NextApiResponse & { _json?: unknown } {
  const res: MockRes = {};
  res.status = (code: number) => {
    res.statusCode = code;
    return res as NextApiResponse;
  };
  res.json = (data: unknown) => {
    res._json = data;
    return res as NextApiResponse;
  };
  return res as NextApiResponse & { _json?: unknown };
}

describe('/api/chat', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    const { clearCache } = await import('../lib/chat/cache');
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
      body: {
        message: 'Hello',
      },
    } as NextApiRequest;
    const res = createMockRes();

    await handler(req, res);

    expect(res.statusCode).toBe(200);
    expect(CopilotModel.generateReply).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ role: 'system' }),
        expect.objectContaining({ role: 'user', content: 'Hello' }),
      ])
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
      body: {
        messages: [
          { role: 'user', content: '  Hello  ' },
        ],
      },
    } as NextApiRequest;
    const res = createMockRes();

    await handler(req, res);

    expect(res.statusCode).toBe(200);
    const callArgs = vi.mocked(CopilotModel.generateReply).mock.calls[0][0];
    expect(callArgs[0].role).toBe('system');
    expect(callArgs[1].content).toBe('Hello'); // Trimmed
  });

  it('returns correct response shape with source', async () => {
    const { CopilotModel } = await import('../lib/chat/copilotModel');
    vi.mocked(CopilotModel.generateReply).mockResolvedValue({
      message: { role: 'assistant', content: 'Test response' },
      source: 'stub',
    });

    const req = {
      method: 'POST',
      body: {
        messages: [{ role: 'user', content: 'Hello' }],
      },
    } as NextApiRequest;
    const res = createMockRes();

    await handler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._json).toEqual({
      message: {
        role: 'assistant',
        content: 'Test response',
      },
      source: 'stub',
    });
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
      body: {
        messages: [{ role: 'user', content: 'Hello' }],
      },
    } as NextApiRequest;
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
      body: {
        messages: [{ role: 'user', content: 'Hello' }],
      },
    } as NextApiRequest;
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
