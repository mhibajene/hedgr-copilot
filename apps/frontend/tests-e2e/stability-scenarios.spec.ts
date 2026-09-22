import { expect, test } from '@playwright/test';

test.describe('humanised authored Stability scenario stimulus', () => {
  test('branches only from explicit study orientation and preserves ordinary entry', async ({ page }) => {
    await page.goto('/orientation');
    await expect(page.getByTestId('orientation-continue')).toHaveAttribute('href', '/dashboard-synthetic-journey?reset=1');
    await expect(page.getByTestId('stability-study-currency-note')).toHaveCount(0);

    await page.goto('/orientation?study=stability-scenarios');
    await expect(page.getByTestId('orientation-disclosure')).toContainText('No real money moves');
    await expect(page.getByTestId('orientation-data-boundary')).toContainText('Do not enter real personal or financial information.');
    await expect(page.getByTestId('stability-study-currency-note')).toContainText('not converted estimates');
    await expect(page.getByTestId('orientation-continue')).toHaveAttribute('href', '/research/stability-scenarios');
    await page.getByTestId('orientation-continue').click();
    await expect(page).toHaveURL(/\/research\/stability-scenarios$/);
    await expect(page.getByTestId('scenario-case')).toContainText('Sarah’s situation');
    await expect(page.getByTestId('scenario-interpretation')).toHaveCount(0);
    await expect(page.locator('input, textarea, form')).toHaveCount(0);
    await expect(page.getByTestId('stability-stimulus')).not.toContainText(/\bS[0-3]\b|outside stock|envelope|authored comparison|\bU\b/);
  });

  test('keeps first answer and predictions before the authored reveal, resetting through Sarah', async ({ page }) => {
    await page.goto('/orientation?study=stability-scenarios');
    await page.getByTestId('orientation-continue').click();
    await expect(page.getByText('What, if anything, can you tell from Sarah’s situation?')).toBeVisible();
    await expect(page.getByText('K6,000 − K5,000')).toHaveCount(0);
    await page.getByTestId('scenario-reveal').click();
    await expect(page.getByTestId('scenario-interpretation')).toContainText('K1,000');
    await expect(page.getByTestId('scenario-interpretation')).toContainText('not free money');
    await expect(page.getByTestId('scenario-interpretation')).toContainText('authored fictional example');

    for (const [name, change, conclusion] of [
      ['The payment changes', 'K8,000', 'K2,000 short'],
      ['The money becomes available later', 'Day 12', 'None of the supplied money'],
      ['One amount is unknown', 'amount she needs to pay is unknown', 'cannot be determined'],
    ]) {
      await page.getByRole('button', { name }).click();
      await expect(page.getByTestId('scenario-change')).toContainText(change);
      await expect(page.getByText('What, if anything, would you expect to change? Why?')).toBeVisible();
      await expect(page.getByTestId('scenario-interpretation')).toHaveCount(0);
      await page.getByTestId('scenario-reveal').click();
      await expect(page.getByTestId('scenario-interpretation')).toContainText(conclusion);
      await expect(page.getByTestId('scenario-interpretation')).toContainText('This payment, considered on its own');
      await expect(page.getByTestId('scenario-interpretation')).toContainText('not a complete assessment');
      await page.getByRole('button', { name: 'Return to Sarah’s situation' }).click();
      await expect(page.getByTestId('scenario-interpretation')).toHaveCount(0);
      await page.getByTestId('scenario-reveal').click();
    }
  });

  test('uses all selected local denominations without converting or changing the case arithmetic', async ({ page }) => {
    for (const [currency, label] of [
      ['ZMW', 'K'], ['KES', 'KES '], ['NGN', 'NGN '], ['GHS', 'GHS '], ['PHP', 'PHP '],
    ]) {
      await page.goto('/orientation?study=stability-scenarios');
      await page.getByRole('combobox').selectOption(currency);
      await page.getByTestId('orientation-continue').click();
      await expect(page.getByTestId('stability-stimulus')).toContainText(`${label}18,000`);
      await expect(page.getByTestId('stability-stimulus')).toContainText(`${label}6,000`);
      await expect(page.getByTestId('stability-stimulus')).toContainText(`${label}5,000`);
      await expect(page.getByTestId('stability-stimulus')).toContainText('not exchange-rate estimates');
      await page.getByTestId('scenario-reveal').click();
      await expect(page.getByTestId('scenario-interpretation')).toContainText(`${label}1,000`);
      await page.getByRole('button', { name: 'The payment changes' }).click();
      await page.getByTestId('scenario-reveal').click();
      await expect(page.getByTestId('scenario-interpretation')).toContainText(`${label}2,000 short`);
    }
  });

  test('keeps fictional facts readable at mobile and enlarged text', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 720 });
    await page.goto('/research/stability-scenarios');
    await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
    await expect(page.getByTestId('stability-stimulus')).toBeVisible();
    await expect(page.getByTestId('scenario-reveal')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.getByTestId('scenario-reveal').focus();
    await expect(page.getByTestId('scenario-reveal')).toBeFocused();
    await page.getByTestId('scenario-reveal').click();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.getByRole('button', { name: 'The money becomes available later' }).click();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.getByTestId('scenario-reveal').click();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });
});
