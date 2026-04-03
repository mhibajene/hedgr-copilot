import { expect, type Page } from '@playwright/test';

/**
 * Deposit and withdraw keep Confirm disabled until `useLatestFx` succeeds against
 * `NEXT_PUBLIC_API_BASE_URL/v1/fx/latest` (MC-S2-020). E2E must wait for this
 * after navigation / amount entry, before asserting preview or clicking Confirm.
 */
export async function waitForDepositFxReady(page: Page) {
  await expect(page.getByRole('button', { name: 'Confirm' })).toBeEnabled({ timeout: 20_000 });
}

export async function waitForWithdrawFxReady(page: Page) {
  await expect(page.getByRole('button', { name: 'Confirm' })).toBeEnabled({ timeout: 20_000 });
}
