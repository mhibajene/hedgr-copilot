import type { NextApiRequest, NextApiResponse } from 'next';
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { didToken } = req.body;

    if (!didToken || typeof didToken !== 'string') {
      return res.status(401).json({ error: 'Missing or invalid didToken' });
    }

    const magic = getMagicAdmin();
    const metadata = await magic.users.getMetadataByToken(didToken);

    if (!metadata || !metadata.email) {
      return res.status(401).json({ error: 'Invalid token or missing email' });
    }

    // Establish session - using Zustand via server action or httpOnly cookie
    // For now, we'll return success and let client handle session
    // In a real implementation, you'd set an httpOnly cookie here
    return res.status(200).json({ ok: true, email: metadata.email });
  } catch (error) {
    console.error('Magic verify error:', error);
    return res.status(401).json({ error: 'Token verification failed' });
  }
}

