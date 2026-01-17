import type { NextApiRequest, NextApiResponse } from 'next';
import { CopilotModel } from '../../lib/chat/copilotModel';
import { normalizeMessages } from '../../lib/chat/normalize';
import type { Message } from '../../lib/chat/normalize';
import type { CacheContext } from '../../lib/chat/copilotModel';
import { buildSystemPrompt, buildContextBlock } from '../../lib/server/copilotPrompt';
import type { Environment, DataMode } from '../../lib/server/copilotPrompt';
import { enforcePolicy, ADVICE_REFUSAL_RESPONSE } from '../../lib/server/copilotPolicy';
import { deriveRecommendation } from '../../lib/server/copilotSignals';
import type { CopilotSignals } from '../../lib/server/copilotSignals';
import { isInvestmentAdviceRequest } from '../../lib/server/copilotIntent';

type ErrorCode = 'SERVICE_UNAVAILABLE' | 'INVALID_REQUEST' | 'INTERNAL_ERROR' | 'METHOD_NOT_ALLOWED';

interface ErrorResponse {
  error: {
    code: ErrorCode;
    message: string;
  };
  requestId: string;
}

interface SuccessResponse {
  message: {
    role: 'assistant';
    content: string;
  };
  source: 'stub' | 'openai' | 'cache';
}

/**
 * Generates a request ID for error tracking
 */
function generateRequestId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Sends an error response with structured format
 */
function sendError(
  res: NextApiResponse<ErrorResponse>,
  code: ErrorCode,
  message: string,
  statusCode: number,
  requestId: string
): void {
  res.status(statusCode).json({
    error: { code, message },
    requestId,
  });
}

/**
 * Extract userId from request.
 * 
 * Currently returns 'anon' as placeholder.
 * In production, this should extract from:
 * - Session cookie
 * - Authorization header (JWT/Magic token)
 * - x-user-id header (for trusted internal services)
 */
function extractUserId(req: NextApiRequest): string {
  // TODO: Implement actual auth extraction when auth is fully integrated
  // For now, check for x-user-id header (trusted internal services) or return 'anon'
  const userId = req.headers['x-user-id'];
  if (typeof userId === 'string' && userId.length > 0) {
    return userId;
  }
  return 'anon';
}

/**
 * Get the cache control header from request.
 */
function getCacheHeader(req: NextApiRequest): string | null {
  const header = req.headers['x-copilot-cache'];
  if (Array.isArray(header)) {
    return header[0] ?? null;
  }
  return header ?? null;
}

/**
 * Get the deployment environment from NEXT_PUBLIC_APP_ENV.
 * Defaults to 'dev' if not set or invalid.
 */
function getEnvironment(): Environment {
  const env = process.env.NEXT_PUBLIC_APP_ENV;
  if (env === 'stg' || env === 'prod') {
    return env;
  }
  return 'dev';
}

/**
 * Determine data mode based on system mode flags.
 * Returns 'mock' if ANY integration is in mock mode, otherwise 'live'.
 * 
 * Aligns with TrustDisclosureBanner logic.
 */
function getDataMode(): DataMode {
  const authMode = process.env.NEXT_PUBLIC_AUTH_MODE;
  const defiMode = process.env.NEXT_PUBLIC_DEFI_MODE;
  const fxMode = process.env.NEXT_PUBLIC_FX_MODE;

  // If any subsystem is in mock mode, the entire system is in mock mode
  const isAuthMock = authMode !== 'magic';
  const isDefiMock = defiMode !== 'aave';
  const isFxMock = fxMode !== 'coingecko';

  return (isAuthMock || isDefiMock || isFxMock) ? 'mock' : 'live';
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  const requestId = generateRequestId();

  // Only allow POST
  if (req.method !== 'POST') {
    return sendError(
      res,
      'METHOD_NOT_ALLOWED',
      'Method not allowed',
      405,
      requestId
    );
  }

  try {
    // Parse request body
    let messages: Message[];

    if (typeof req.body === 'string') {
      try {
        req.body = JSON.parse(req.body);
      } catch {
        return sendError(
          res,
          'INVALID_REQUEST',
          'Invalid JSON in request body',
          400,
          requestId
        );
      }
    }

    // Support both { messages: Message[] } and { message: string } formats
    if (req.body.messages && Array.isArray(req.body.messages)) {
      messages = req.body.messages;
    } else if (req.body.message && typeof req.body.message === 'string') {
      // Legacy format: convert single message to array
      messages = [{ role: 'user', content: req.body.message }];
    } else {
      return sendError(
        res,
        'INVALID_REQUEST',
        'Request must include either "messages" array or "message" string',
        400,
        requestId
      );
    }

    // Normalize messages (trim, collapse whitespace, normalize newlines, drop empty)
    let normalizedMessages: Message[];
    try {
      normalizedMessages = normalizeMessages(messages);
    } catch {
      // normalizeMessages throws if all user messages are empty
      return sendError(
        res,
        'INVALID_REQUEST',
        'At least one non-empty user message is required',
        400,
        requestId
      );
    }

    // ──────────────────────────────────────────────────────────────────────────
    // Intent-Based Refusal (Pre-Model Check)
    // ──────────────────────────────────────────────────────────────────────────
    // Refuse investment advice requests BEFORE invoking the model.
    // This is a policy decision, not a model decision — deterministic across stub/live.
    const lastUserMessage = normalizedMessages
      .slice()
      .reverse()
      .find((m) => m.role === 'user');

    if (lastUserMessage && isInvestmentAdviceRequest(lastUserMessage.content)) {
      res.setHeader('x-copilot-source', 'policy');
      res.setHeader('x-copilot-recommendation', 'refused');

      return res.status(200).json({
        message: {
          role: 'assistant',
          content: ADVICE_REFUSAL_RESPONSE,
        },
        source: 'stub', // Marked as stub since model was not invoked
      });
    }

    // Determine environment and data mode
    const environment = getEnvironment();
    const dataMode = getDataMode();

    // Build system prompt + context block
    const systemPrompt = buildSystemPrompt(environment, dataMode);
    const contextBlock = buildContextBlock(); // Empty for v1

    // Construct system message
    const systemMessage: Message = {
      role: 'system',
      content: contextBlock ? `${systemPrompt}\n\n${contextBlock}` : systemPrompt,
    };

    // Assemble final message stack (system message first, immutable order)
    const messagesWithSystem = [systemMessage, ...normalizedMessages];

    // Build cache context
    const cacheContext: CacheContext = {
      userId: extractUserId(req),
      cacheHeader: getCacheHeader(req),
      model: 'gpt-4o-mini', // Default model used by OpenAI provider
    };

    // Generate reply with cache integration
    const reply = await CopilotModel.generateReply(messagesWithSystem, cacheContext);

    // ──────────────────────────────────────────────────────────────────────────
    // Policy Enforcement Layer
    // ──────────────────────────────────────────────────────────────────────────
    // Apply trust-first policy enforcement on model output.
    // This runs BEFORE caching to ensure cached responses are also policy-compliant.
    //
    // Note: Signal derivation is placeholder until full signal integration.
    // In production, signals should be derived from real market/user data.

    // Derive recommendation from signals (placeholder signals for v1)
    const signals: CopilotSignals = {
      environment: { environment },
      // Market and user signals will be integrated in future tickets
      // For now, default to conservative "wait" recommendation
    };
    const recommendation = deriveRecommendation(signals);

    // Enforce policy on model output
    const enforcedContent = enforcePolicy({
      content: reply.message.content,
      recommendation,
      environment,
    });

    // Set cache source header for observability
    res.setHeader('x-copilot-source', reply.source);
    res.setHeader('x-copilot-recommendation', recommendation);

    return res.status(200).json({
      ...reply,
      message: {
        ...reply.message,
        content: enforcedContent,
      },
    });
  } catch (error) {
    // Log error internally for debugging
    console.error('Chat API error:', error);

    // Check for specific error types
    if (error instanceof Error) {
      // Missing API key or service unavailable
      if (
        error.message.includes('OPENAI_API_KEY') ||
        error.message.includes('service unavailable') ||
        error.message.includes('authentication failed')
      ) {
        return sendError(
          res,
          'SERVICE_UNAVAILABLE',
          'Chat service is currently unavailable',
          503,
          requestId
        );
      }
    }

    // Generic internal error
    return sendError(
      res,
      'INTERNAL_ERROR',
      'An error occurred processing your request',
      500,
      requestId
    );
  }
}
