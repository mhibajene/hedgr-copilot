// OpenAI provider (server-only, isolated)
// Must never run in CI - guard with env check
// This file should only be imported in server-side code (API routes)

import OpenAI from 'openai';
import { getChatMode } from '../mode';
import type { Message } from '../normalize';

/**
 * Generates a reply using OpenAI API
 * @throws Error if called in CI, missing API key, or OpenAI API error
 */
export async function generateWithOpenAI(messages: Message[]): Promise<string> {
  // Guard: Ensure we're in openai mode
  if (getChatMode() !== 'openai') {
    throw new Error('OpenAI provider requires OPENAI_MODE=openai');
  }

  // Guard: Never run in CI
  if (process.env.CI === 'true') {
    throw new Error('OpenAI provider must not run in CI. Use OPENAI_MODE=stub instead.');
  }

  // Guard: API key required
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is required but not set');
  }

  try {
    const client = new OpenAI({ apiKey });
    
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      temperature: 0.7,
      max_tokens: 500,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('OpenAI API returned empty response');
    }

    return content;
  } catch (error: unknown) {
    // Sanitize errors - don't leak internal details
    if (error instanceof OpenAI.APIError) {
      // Log full error internally for debugging
      console.error('OpenAI API error:', error);
      
      // Return sanitized error
      if (error.status === 401 || error.status === 403) {
        throw new Error('OpenAI API authentication failed');
      } else if (error.status === 429) {
        throw new Error('OpenAI API rate limit exceeded');
      } else if (error.status === 500 || error.status === 502 || error.status === 503) {
        throw new Error('OpenAI API service unavailable');
      } else {
        throw new Error('OpenAI API request failed');
      }
    }
    
    // Re-throw our own errors as-is
    if (error instanceof Error) {
      throw error;
    }
    
    // Unknown error
    console.error('Unknown OpenAI error:', error);
    throw new Error('OpenAI API request failed');
  }
}
