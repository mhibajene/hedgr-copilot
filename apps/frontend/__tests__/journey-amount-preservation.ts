import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';

// JOURNEY-REVIEW-001: exact amount-only source substitutions, 2026-11-19.
// Literal matches and counts fail closed; financial and unrelated source bytes stay pinned.
const AMOUNT_EDITS: Record<string, readonly (readonly [string, string, number])[]> = {
  "lib/utils/money.ts": [
    [
      "export function formatLocalCurrency(amount: number, currencyCode: string): string {",
      "export function formatLocalCurrency(amount: number, currencyCode = ''): string {",
      1
    ],
    [
      "return `${currencyCode} ${formattedNumber}`;",
      "return currencyCode ? `${currencyCode} ${formattedNumber}` : formattedNumber;",
      1
    ],
    [
      " * @param currencyCode - The ISO 4217 currency code (e.g., \"ZMW\", \"NGN\", \"KES\")",
      " * @param currencyCode - Optional ISO 4217 prefix; omit when the caller supplies the currency label",
      1
    ]
  ],
  "lib/state/last-visit.ts": [
    [
      "import { PublicTxStatus, type TxLifecycle } from '../tx';",
      "import { PublicTxStatus, type TxLifecycle } from '../tx';\nimport { formatLocalCurrency } from '../utils/money';",
      1
    ],
    [
      "return `$${Math.abs(amount).toFixed(2)}`;",
      "return `$${formatLocalCurrency(Math.abs(amount))}`;",
      1
    ]
  ],
  "lib/state/simulation-display-currency.ts": [
    [
      "import { useSyncExternalStore } from 'react';",
      "import { useSyncExternalStore } from 'react';\nimport { formatLocalCurrency } from '../utils/money';",
      1
    ],
    [
      "  const amount = (usd * getSimulationDisplayRate(currency)).toLocaleString('en-US', {\n    minimumFractionDigits: 2,\n    maximumFractionDigits: 2,\n  });\n  return `≈ ${currency} ${amount}`;",
      "  return `≈ ${formatLocalCurrency(usd * getSimulationDisplayRate(currency), currency)}`;",
      1
    ]
  ],
  "app/(app)/deposit/page.tsx": [
    [
      "usdToCredit.toFixed(2)",
      "formatLocalCurrency(usdToCredit)",
      2
    ],
    [
      "(balanceBefore + usdToCredit).toFixed(2)",
      "formatLocalCurrency(balanceBefore + usdToCredit)",
      1
    ],
    [
      "usdPreview.toFixed(2)",
      "formatLocalCurrency(usdPreview)",
      2
    ],
    [
      "`${receiptQuote} ${amountLocalNum.toFixed(2)}`",
      "formatLocalCurrency(amountLocalNum, receiptQuote)",
      1
    ],
    [
      "{amountLocalNum.toFixed(0)} {quote}",
      "{formatLocalCurrency(amountLocalNum, quote)}",
      1
    ]
  ],
  "app/(app)/withdraw/page.tsx": [
    [
      "import { useLatestFx } from '../../../lib/hooks/useLatestFx';",
      "import { useLatestFx } from '../../../lib/hooks/useLatestFx';\nimport { formatLocalCurrency } from '../../../lib/utils/money';",
      1
    ],
    [
      "usd.toFixed(2)",
      "formatLocalCurrency(usd)",
      2
    ],
    [
      "remainingAfterWithdrawal.toFixed(2)",
      "formatLocalCurrency(remainingAfterWithdrawal)",
      2
    ],
    [
      "`${receiptQuote} ${(usd * receiptRate).toFixed(2)}`",
      "formatLocalCurrency(usd * receiptRate, receiptQuote)",
      1
    ]
  ],
  "app/(app)/dashboard/page.tsx": [
    [
      "available.toFixed(2)",
      "formatLocalCurrency(available)",
      1
    ],
    [
      "pending.toFixed(2)",
      "formatLocalCurrency(pending)",
      1
    ],
    [
      "tx.amountUSD.toFixed(2)",
      "formatLocalCurrency(tx.amountUSD)",
      1
    ]
  ]
};
const BEFORE_AMOUNT_SHA256: Record<string, string> = {
  "lib/utils/money.ts": "4e8b5facdb53cb181daf3a6d9d886b2ef5fdb462d819d7772f388794edc436f7",
  "lib/state/last-visit.ts": "bd69972757312288a5b6cdc91043713aa544fb207880973d6913d016d29e6fe9",
  "lib/state/simulation-display-currency.ts": "11f5e8da325a2bd94f5922d68ec532b7e538c3d5cbed8c00f0a9b361a05a93d0",
  "app/(app)/deposit/page.tsx": "5ef2ffc71d0b97de531972b0641cae304e37c86f2450c205bcad0e9f3c0aa14c",
  "app/(app)/withdraw/page.tsx": "78f973bdb609fad1ac9b56f303e32d52eff1137d1123558f32088780d94b10d5",
  "app/(app)/dashboard/page.tsx": "d17265d76fb92c07b9467f57fd5d30646737157ab35acf80fc50206563e7da59"
};

export function amountSourceBefore(path: string, value: string): string {
  for (const [before, after, count] of [...(AMOUNT_EDITS[path] ?? [])].reverse()) {
    if (value.split(after).length - 1 !== count) throw new Error(`JOURNEY-REVIEW-001 exact amount source mismatch: ${path}`);
    value = value.split(after).join(before);
  }
  return value;
}

export function assertAmountSourceReversal(paths: readonly string[]): void {
  for (const path of paths) {
    const current = readFileSync(resolve(__dirname, '..', path), 'utf8');
    const before = amountSourceBefore(path, current);
    if (createHash('sha256').update(before).digest('hex') !== BEFORE_AMOUNT_SHA256[path]) throw new Error(`JOURNEY-REVIEW-001 non-amount source drift: ${path}`);
    let rejected = false;
    try { amountSourceBefore(path, before); } catch { rejected = true; }
    if (!rejected) throw new Error(`JOURNEY-REVIEW-001 source reversal escaped: ${path}`);
  }
}
