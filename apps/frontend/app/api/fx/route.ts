import { NextRequest, NextResponse } from 'next/server';
import { getFxMode, getFixedRate } from '../../../lib/fx';
import { fetchCoinGeckoRate } from '../../../lib/fx/providers/coingecko';
import { resolveLocalCurrencyCode, isSupportedQuote, type SupportedQuote } from '../../../config/market';

export async function GET(request: NextRequest) {
  const mode = getFxMode();

  // Quote is explicit input (for demo market switcher + future multi-market)
  const quoteParam = request.nextUrl.searchParams.get('quote');
  const defaultQuote = resolveLocalCurrencyCode(); // env-based fallback only
  const quote = quoteParam ?? defaultQuote;

  // Validate
  if (!isSupportedQuote(quote)) {
    return NextResponse.json(
      { error: `Unsupported quote currency: ${quote}`, base: 'USD', quote, ts: Date.now() },
      { status: 400 }
    );
  }

  try {
    if (mode === 'fixed') {
      // Quote-aware fixed rate mapping
      const rate = getFixedRate(quote as SupportedQuote);
      return NextResponse.json({ base: 'USD', quote, rate, ts: Date.now(), provider: 'fixed' });
    }

    if (mode === 'coingecko') {
      // Strong recommendation: in CI set FX_MODE=fixed rather than silently fallback here
      if (process.env.CI === 'true') {
        return NextResponse.json(
          { error: 'FX unavailable in CI when FX_MODE=coingecko', base: 'USD', quote, ts: Date.now() },
          { status: 503 }
        );
      }

      // Prefer: fetchCoinGeckoRate(quote) so provider doesn’t rely on env/defaults
      const fxData = await fetchCoinGeckoRate(quote);
      return NextResponse.json({
        base: 'USD',
        quote,
        rate: fxData.rate,
        ts: Date.now(),
        provider: 'coingecko',
      });
    }

    return NextResponse.json(
      { error: `Unsupported FX mode: ${mode}`, base: 'USD', quote, ts: Date.now() },
      { status: 400 }
    );
  } catch (error) {
    console.error('FX API error:', error);
    // No silent fallback. Let client degrade gracefully.
    return NextResponse.json(
      { error: 'FX provider error', base: 'USD', quote, ts: Date.now() },
      { status: 503 }
    );
  }
}