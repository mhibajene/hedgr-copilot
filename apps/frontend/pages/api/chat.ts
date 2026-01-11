import type { NextApiRequest, NextApiResponse } from 'next';
import { CopilotModel } from '../../lib/chat/copilotModel';
import { normalizeMessages } from '../../lib/chat/normalize';
import type { Message } from '../../lib/chat/normalize';

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

    // Normalize messages (trim, drop empty, prepend system message)
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

    // Generate reply
    const reply = await CopilotModel.generateReply(normalizedMessages);

    return res.status(200).json(reply);
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
