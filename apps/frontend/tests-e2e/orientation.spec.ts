import { expect, test } from '@playwright/test';
import { ORIENTATION_SURFACE } from '../lib/narrative/orientation-surface';

test.describe('CLASS-A-VAL-002-ORIENT-001 orientation surface', () => {
  test('renders the informational orientation page without the product wallet shell', async ({
    page,
  }) => {
    await page.goto('/orientation');

    await expect(page).toHaveURL(/\/orientation$/);
    await expect(page).toHaveTitle(/Hedgr/i);

    const surface = page.getByTestId('orientation-surface');
    await expect(surface).toBeVisible();
    await expect(surface.getByRole('img', { name: 'Hedgr' })).toBeVisible();
    await expect(surface.getByTestId('orientation-disclosure')).toContainText(
      'informational research experience',
    );
    await expect(surface.getByRole('heading', { level: 1 })).toHaveText(
      ORIENTATION_SURFACE.title,
    );

    for (const block of ORIENTATION_SURFACE.blocks) {
      await expect(
        surface.getByTestId(`orientation-block-${block.id}`),
      ).toContainText(block.heading);
    }

    await expect(page.getByRole('navigation')).toHaveCount(0);
    await expect(page.getByTestId('synthetic-journey-shell')).toHaveCount(0);
    await expect(page.getByTestId('trust-disclosure-banner')).toHaveCount(0);
    await expect(surface).not.toContainText('Financial Stability Companion');
    await expect(surface).not.toContainText('crypto');
    await expect(surface).not.toContainText('DeFi');

    const continueLink = surface.getByTestId('orientation-continue');
    await expect(continueLink).toHaveText(ORIENTATION_SURFACE.continue.label);
    await expect(continueLink).toHaveAttribute(
      'href',
      '/dashboard-synthetic-journey',
    );
    await expect(surface).toContainText('not a deposit prompt');
  });
});
