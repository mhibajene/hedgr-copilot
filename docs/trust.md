# Trust and simulation safety

Hedgr's current frontend is a research and product-testing experience. It uses
simulated information: balances, transactions, and returns shown in the app are
not real, and no real customer money is held or moved.

## Customer-facing disclosure

The authenticated app shell keeps a visible simulation disclosure. Its current
detail destination is **Settings → Trust & information** at
`/settings/trust`. The earlier `/docs/trust` path redirects there as a
compatibility seam.

The customer-facing information surface states only the current material
boundaries:

- rates are fixed for the walkthrough;
- no live financial service is connected;
- country selection changes simulated currency display only;
- no financial account is opened;
- nothing in the experience is financial advice; and
- participants must not enter real personal or financial information.

When `journey=class-a-val-002` is present, Trust information navigation must
preserve that query. Returning to Settings must remain inside the bounded
synthetic research context, where **About Hedgr** is withheld before unaided
evidence is captured.

## CI-safe environment modes

Automated tests remain deny-by-default and hermetic. The required safe values
are:

| Variable | CI-safe value |
| --- | --- |
| `NEXT_PUBLIC_AUTH_MODE` | `mock` |
| `NEXT_PUBLIC_FX_MODE` | `fixed` |
| `NEXT_PUBLIC_DEFI_MODE` | `mock` |
| `STUB_MODE` | `true` |
| `OPENAI_MODE` | `stub` |

No CI or E2E test may depend on a live external service. The trust checks run as
part of `pnpm run validate` and the protected frontend workflow.

## Verification

Run the repository checks from the repo root:

```bash
pnpm trust:check
pnpm trust:phrases
pnpm run validate
```

Route behavior and research-query preservation are covered by the frontend
Playwright route-hygiene suite.
