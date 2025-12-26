import { NextRequest, NextResponse } from 'next/server';
import { Magic } from '@magic-sdk/admin';

let magicAdminInstance: Magic | null = null;

function getMagicAdmin(): Magic {
  if (!magicAdminInstance) {
    const secretKey = process.env.MAGIC_SECRET_KEY;
    if (!secretKey) {
      throw new Error('MAGIC_SECRET_KEY is not set');
    }
    magicAdminInstance = new Magic(secretKey);
  }
  return magicAdminInstance;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const didToken = body.didToken;

    if (!didToken || typeof didToken !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid didToken' },
        { status: 401 }
      );
    }

    const magic = getMagicAdmin();
    const metadata = await magic.users.getMetadataByToken(didToken);

    if (!metadata || !metadata.email) {
      return NextResponse.json(
        { error: 'Invalid token or missing email' },
        { status: 401 }
      );
    }

    // Establish session - using Zustand via server action or httpOnly cookie
    // For now, we'll return success and let client handle session
    // In a real implementation, you'd set an httpOnly cookie here
    const response = NextResponse.json(
      { ok: true, email: metadata.email },
      { status: 200 }
    );

    // TODO: Set httpOnly session cookie here
    // response.cookies.set('session', sessionToken, { httpOnly: true, secure: true });

    return response;
  } catch (error) {
    console.error('Magic verify error:', error);
    return NextResponse.json(
      { error: 'Token verification failed' },
      { status: 401 }
    );
  }
}

