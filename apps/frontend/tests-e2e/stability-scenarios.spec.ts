import { expect, test } from '@playwright/test';

test.describe('authored Stability scenario stimulus', () => {
  test('branches only from explicit study orientation and preserves the ordinary entry', async ({ page }) => {
    await page.goto('/orientation');
    await expect(page.getByTestId('orientation-continue')).toHaveAttribute('href', '/dashboard-synthetic-journey?reset=1');

    await page.goto('/orientation?study=stability-scenarios');
    await expect(page.getByTestId('orientation-disclosure')).toContainText('No real money moves');
    await expect(page.getByTestId('orientation-data-boundary')).toContainText('Do not enter real personal or financial information.');
    await expect(page.getByTestId('orientation-continue')).toHaveAttribute('href', '/research/stability-scenarios');
    await page.getByTestId('orientation-continue').click();
    await expect(page).toHaveURL(/\/research\/stability-scenarios$/);
    await expect(page.getByTestId('scenario-case')).toContainText('S0 · Stated payment');
    await expect(page.getByTestId('scenario-interpretation')).toHaveCount(0);
    await expect(page.locator('input, textarea, form')).toHaveCount(0);
  });

  test('keeps first interpretation and each prediction before authored reveals, resetting through S0', async ({ page }) => {
    await page.goto('/orientation?study=stability-scenarios');
    await page.getByTestId('orientation-continue').click();
    await expect(page.getByText('What, if anything, can you tell from this information?')).toBeVisible();
    await expect(page.getByText('The supplied outside 360 U covers')).toHaveCount(0);
    await page.getByTestId('scenario-reveal').click();
    await expect(page.getByTestId('scenario-interpretation')).toContainText('80 U difference');
    await expect(page.getByTestId('scenario-interpretation')).toContainText('not free capital');

    for (const [name, change, conclusion] of [
      ['S1 · Payment amount', '400 U', '40 U below'],
      ['S2 · Access time', 'Day 12', 'No supplied stock is usable'],
      ['S3 · Missing amount', 'amount is withheld', 'cannot be determined'],
    ]) {
      await page.getByRole('button', { name }).click();
      await expect(page.getByTestId('scenario-change')).toContainText(change);
      await expect(page.getByText('What, if anything, would you expect to change? Why?')).toBeVisible();
      await expect(page.getByTestId('scenario-interpretation')).toHaveCount(0);
      await page.getByTestId('scenario-reveal').click();
      await expect(page.getByTestId('scenario-interpretation')).toContainText(conclusion);
      await expect(page.getByTestId('scenario-interpretation')).toContainText('fictional example');
      await expect(page.getByTestId('scenario-interpretation')).toContainText('The stated payment considered on its own');
      await expect(page.getByTestId('scenario-interpretation')).not.toContainText('Stability Position:');
      await page.getByRole('button', { name: 'Return to S0 before another comparison' }).click();
      await expect(page.getByTestId('scenario-case')).toContainText('S0 · Stated payment');
      await expect(page.getByTestId('scenario-interpretation')).toHaveCount(0);
      await page.getByTestId('scenario-reveal').click();
    }
  });

  test('keeps the fictional facts readable at mobile and enlarged text', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 720 });
    await page.goto('/research/stability-scenarios');
    await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
    await expect(page.getByTestId('stability-stimulus')).toBeVisible();
    await expect(page.getByTestId('scenario-reveal')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.getByTestId('scenario-reveal').focus();
    await expect(page.getByTestId('scenario-reveal')).toBeFocused();
  });
});
