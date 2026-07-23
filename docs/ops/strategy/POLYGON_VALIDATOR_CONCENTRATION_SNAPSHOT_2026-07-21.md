# Polygon PoS Validator Concentration Snapshot

**Evidence status:** Point-in-time supporting evidence; non-authoritative and not an implementation recommendation

**Retrieved:** 2026-07-21T13:48:23Z

**Source:** <https://staking-api.polygon.technology/api/v3/validators?limit=105>
**Source type:** Official Polygon staking API; provider-operated primary source, not independent assurance

## Snapshot

The endpoint returned 102 rows with `status` equal to `active`.

| Measure | Result |
|---|---:|
| Active validators included | 102 |
| Total reported `totalStake` | 3,582,824,368.431963 POL |
| Total reported base units | 3,582,824,368,431,963,579,299,464,000 |
| Largest validator share | 11.6269% |
| Top-three share | 29.0678% |
| Top-five share | 42.5037% |
| Top-ten share | 68.3073% |

When positions were sorted from largest to smallest, the first four positions cumulatively exceeded one-third of reported stake (35.8929%), and the first ten exceeded two-thirds (68.3073%). These are mechanical concentration observations only. They do not demonstrate common ownership, coordination, collusion, or effective control.

## Calculation method

1. Retrieve the JSON response from the source URL at the timestamp above.
2. Select rows whose `status`, case-normalised, equals `active`.
3. Parse each row's `totalStake` value as an integer using arbitrary-precision `BigInt` arithmetic.
4. Sum all selected `totalStake` values to obtain the denominator.
5. Sort selected rows by `totalStake` in descending order.
6. For each reported group size, divide the sum of its largest `N` positions by the total selected stake and multiply by 100.
7. Display shares to four decimal places. Convert base units to POL using 10^18 base units per POL and display six decimal places.

The calculation uses the API's reported `totalStake` field; it does not independently reconstruct stake from contracts, deduplicate related operators, or infer beneficial ownership.

## Interpretation boundaries

- The snapshot can change after retrieval and should be refreshed before report closure or any later decision.
- Validator names and stake values are accepted as reported by the official API.
- Delegated stake contributes to a validator's reported stake but is not evidence that the validator economically owns that stake.
- Stake concentration is relevant to the network's documented consensus thresholds, but it is not by itself proof of failure, censorship, or coordinated behaviour.
- This artifact does not assess common hosting, shared key infrastructure, validator independence, multisig control, legal identity, or current timelocks.
- It creates no provider, network, implementation, custody, settlement, or customer-money authority.

Context sources: [validator admission and the 105-validator cap](https://docs.polygon.technology/pos/get-started/becoming-a-validator) and [Polygon PoS consensus/governance thresholds](https://docs.polygon.technology/pos/governance/governance-fundamentals).

## Reproducibility note

The API response was streamed directly into the calculation and was not retained as a raw file. No provider was contacted and no personal or customer data was collected.
