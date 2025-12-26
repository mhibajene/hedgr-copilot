'use client';

import { Magic } from 'magic-sdk';

let magicInstance: Magic | null = null;

function getMagicInstance(): Magic {
  if (!magicInstance) {
    const publishableKey = process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY;
    if (!publishableKey) {
      throw new Error('NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY is not set');
    }
    magicInstance = new Magic(publishableKey);
  }
  return magicInstance;
}

export async function loginWithEmail(email: string): Promise<string> {
  const magic = getMagicInstance();
  const didToken = await magic.auth.loginWithEmailOTP({ email });
  return didToken;
}

