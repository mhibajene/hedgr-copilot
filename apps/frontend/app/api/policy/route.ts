import { NextResponse } from 'next/server';
import { resolvePolicyFromEnv } from '../../../lib/policy/resolve';

/**
 * GET /api/policy
 *
 * Returns the resolved market policy for the current environment.
 *
 * Response shape: { version, market, resolvedAt, policy }
 *
 * Pure, deterministic, no side effects. The policy version is owned
 * by the resolver (not read from env).
 */
export async function GET() {
  try {
    const resolved = resolvePolicyFromEnv();
    return NextResponse.json(resolved);
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to resolve policy',
        detail: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
