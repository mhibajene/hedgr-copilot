import { expect, test } from '@playwright/test';
import {
  ORIENTATION_FORBIDDEN_PARTICIPANT_TERMS,
  ORIENTATION_SURFACE,
} from '../lib/narrative/orientation-surface';

test.describe('CLASS-A-VAL-002-ORIENT-003 orientation surface', () => {
  test('renders only the approved research-entry boundary before the product', async ({
    page,
  }) => {
    await page.goto('/orientation');

    await expect(page).toHaveURL(/\/orientation$/);
    await expect(page).toHaveTitle(/Hedgr/i);

    const surface = page.getByTestId('orientation-surface');
    await expect(surface).toBeVisible();
    await expect(surface.getByRole('img', { name: 'Hedgr' })).toBeVisible();
    await expect(surface).toContainText(ORIENTATION_SURFACE.eyebrow);
    await expect(surface.getByRole('heading', { level: 1 })).toHaveText(
      ORIENTATION_SURFACE.title,
    );

    const disclosure = surface.getByTestId('orientation-disclosure');
    await expect(disclosure).toContainText(
      ORIENTATION_SURFACE.disclosure.heading,
    );
    await expect(disclosure).toContainText(ORIENTATION_SURFACE.disclosure.body);
    await expect(surface.getByTestId('orientation-data-boundary')).toHaveText(
      ORIENTATION_SURFACE.dataBoundary,
    );

    await expect(page.getByRole('navigation')).toHaveCount(0);
    await expect(page.getByTestId('synthetic-journey-shell')).toHaveCount(0);
    await expect(page.getByTestId('trust-disclosure-banner')).toHaveCount(0);
    await expect(page.getByTestId(/^orientation-block-/)).toHaveCount(0);

    for (const term of ORIENTATION_FORBIDDEN_PARTICIPANT_TERMS) {
      await expect(surface).not.toContainText(new RegExp(term, 'i'));
    }

    await expect(surface).not.toContainText('Hedgr helps');
    await expect(surface).not.toContainText('Why Hedgr exists');
    await expect(surface).not.toContainText('bounded research invitation');

    const continueLink = surface.getByTestId('orientation-continue');
    await expect(continueLink).toHaveText(ORIENTATION_SURFACE.continue.label);
    await expect(continueLink).toHaveAttribute(
      'href',
      '/dashboard-synthetic-journey?reset=1',
    );

    await page.keyboard.press('Tab');
    await expect(continueLink).toBeFocused();
  });
});
