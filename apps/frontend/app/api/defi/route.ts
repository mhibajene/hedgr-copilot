import { NextResponse } from 'next/server';
import { getDefiAdapter } from '../../../lib/defi';

export async function GET() {
  try {
    const adapter = getDefiAdapter();
    const apy = await adapter.getNetApy();

    return NextResponse.json({
      apy,
      ts: Date.now(),
    });
  } catch (error) {
    console.error('DeFi API error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

