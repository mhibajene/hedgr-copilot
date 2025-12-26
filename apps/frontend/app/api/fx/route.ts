import { NextResponse } from 'next/server';
import { getFxMode, FX_RATE_ZMW_PER_USD_DEFAULT } from '../../../lib/fx';
import { fetchCoinGeckoRate } from '../../../lib/fx/providers/coingecko';

export async function GET() {
  try {
    const mode = getFxMode();
    let rate: number;

    if (mode === 'fixed') {
      rate = FX_RATE_ZMW_PER_USD_DEFAULT;
    } else if (mode === 'coingecko') {
      // Only fetch from CoinGecko if not in CI
      if (process.env.CI === 'true') {
        // Fallback to fixed rate in CI
        rate = FX_RATE_ZMW_PER_USD_DEFAULT;
      } else {
        const fxData = await fetchCoinGeckoRate();
        rate = fxData.rate;
      }
    } else {
      // Default to fixed
      rate = FX_RATE_ZMW_PER_USD_DEFAULT;
    }

    return NextResponse.json({
      base: 'USD',
      quote: 'ZMW',
      rate,
      ts: Date.now(),
    });
  } catch (error) {
    console.error('FX API error:', error);
    // Fallback to fixed rate on error
    return NextResponse.json(
      {
        base: 'USD',
        quote: 'ZMW',
        rate: FX_RATE_ZMW_PER_USD_DEFAULT,
        ts: Date.now(),
      },
      { status: 200 } // Still return 200 with fallback rate
    );
  }
}

