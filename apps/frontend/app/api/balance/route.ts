import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { computeBalanceFromLedger, type BalanceProjection } from '../../../lib/state/balance';
import { getBalanceMode } from '../../../lib/state/balance.mode';
import type { Tx } from '../../../lib/state/ledger';

/**
 * GET /api/balance
 * 
 * Returns the canonical balance for the authenticated user.
 * When BALANCE_FROM_LEDGER is enabled (default), computes balance
 * from ledger transactions only.
 * 
 * Response shape: { total, available, pending, currency, asOf }
 * 
 * Note: In the current client-side architecture, the ledger is stored
 * in localStorage. This endpoint reads from a cookie-synced ledger
 * or returns a zero balance if no ledger data is available server-side.
 * 
 * For full SSoT in production, the ledger should be persisted server-side.
 */
export async function GET(request: Request) {
  try {
    const mode = getBalanceMode();
    
    // Check for ledger data from request (client can send current state)
    const url = new URL(request.url);
    const ledgerParam = url.searchParams.get('ledger');
    
    let balance: BalanceProjection;
    
    if (mode === 'ledger') {
      // Parse ledger from query param if provided (client-side sync)
      let transactions: Tx[] = [];
      
      if (ledgerParam) {
        try {
          transactions = JSON.parse(decodeURIComponent(ledgerParam));
        } catch {
          // Invalid ledger data, use empty
          transactions = [];
        }
      } else {
        // Try to read from cookie (if synced)
        const cookieStore = await cookies();
        const ledgerCookie = cookieStore.get('hedgr:ledger');
        if (ledgerCookie?.value) {
          try {
            const parsed = JSON.parse(decodeURIComponent(ledgerCookie.value));
            transactions = parsed.state?.transactions || [];
          } catch {
            transactions = [];
          }
        }
      }
      
      balance = computeBalanceFromLedger(transactions);
    } else {
      // Legacy wallet mode - return zero balance (client handles)
      balance = {
        total: 0,
        available: 0,
        pending: 0,
        currency: 'USD',
        asOf: Date.now(),
      };
    }

    return NextResponse.json(balance);
  } catch (error) {
    console.error('Balance API error:', error);
    return NextResponse.json(
      {
        total: 0,
        available: 0,
        pending: 0,
        currency: 'USD',
        asOf: Date.now(),
        error: 'Failed to compute balance',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/balance
 * 
 * Accepts ledger transactions in the request body and returns computed balance.
 * This is the preferred method for balance calculation as it allows
 * the client to send the full ledger state.
 */
export async function POST(request: Request) {
  try {
    const mode = getBalanceMode();
    
    if (mode !== 'ledger') {
      return NextResponse.json({
        total: 0,
        available: 0,
        pending: 0,
        currency: 'USD',
        asOf: Date.now(),
      });
    }

    const body = await request.json();
    const transactions: Tx[] = body.transactions || [];
    
    const balance = computeBalanceFromLedger(transactions);
    
    return NextResponse.json(balance);
  } catch (error) {
    console.error('Balance API error:', error);
    return NextResponse.json(
      {
        total: 0,
        available: 0,
        pending: 0,
        currency: 'USD',
        asOf: Date.now(),
        error: 'Failed to compute balance',
      },
      { status: 500 }
    );
  }
}

