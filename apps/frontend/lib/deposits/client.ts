/**
 * Backend deposit contract client — POST /v1/deposits with idempotency via txn_ref.
 * SSoT for creating deposits; no raw server error text exposed to UI.
 */

export interface PostDepositParams {
  txn_ref: string;
  amount_zmw: number;
}

export interface PostDepositResponse {
  depositId: string;
  txn_ref: string;
}

const SANITIZED_ERROR = 'Deposit request failed';

function getBaseUrl(): string {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  if (!base) {
    throw new Error(SANITIZED_ERROR);
  }
  try {
    const u = new URL(base);
    if (u.protocol !== 'http:' && u.protocol !== 'https:') {
      throw new Error();
    }
    return base.replace(/\/$/, '');
  } catch {
    throw new Error(SANITIZED_ERROR);
  }
}

/**
 * Create a deposit via backend contract. Idempotent: same txn_ref returns same depositId.
 * @throws Sanitized error on non-2xx or invalid response (no raw body/message to UI).
 */
export async function postDeposit({
  txn_ref,
  amount_zmw,
}: PostDepositParams): Promise<PostDepositResponse> {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/v1/deposits`;

  let res: Response;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ txn_ref, amount_zmw }),
    });
  } catch {
    throw new Error(SANITIZED_ERROR);
  }

  if (!res.ok) {
    throw new Error(SANITIZED_ERROR);
  }

  let data: unknown;
  try {
    data = await res.json();
  } catch {
    throw new Error(SANITIZED_ERROR);
  }

  if (
    data == null ||
    typeof data !== 'object' ||
    typeof (data as Record<string, unknown>).depositId !== 'string' ||
    typeof (data as Record<string, unknown>).txn_ref !== 'string'
  ) {
    throw new Error(SANITIZED_ERROR);
  }

  const obj = data as { depositId: string; txn_ref: string };
  return {
    depositId: obj.depositId,
    txn_ref: obj.txn_ref,
  };
}
