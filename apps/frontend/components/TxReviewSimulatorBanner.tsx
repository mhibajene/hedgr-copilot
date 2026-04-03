'use client';

export type TxReviewSimulatorBannerProps = {
  /** Route-specific test id (e.g. deposit-tx-review-simulator-banner). */
  'data-testid': string;
};

/**
 * MC-S2-021: Required disclosure when the local tx review seam is active.
 * Not a product surface — separates mocked review state from runtime truth.
 */
export function TxReviewSimulatorBanner(props: TxReviewSimulatorBannerProps) {
  const testId = props['data-testid'];
  return (
    <aside
      role="note"
      data-testid={testId}
      className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-950"
    >
      <p className="font-medium">Local review seam active</p>
      <p className="mt-1 text-amber-900/90">
        Transaction state may be surfaced for QA only via URL parameters. This is not live product
        behavior, pricing, or execution authority.
      </p>
    </aside>
  );
}
