import { expect, test } from '@playwright/test';

const studyEntry = '/orientation?study=stability-scenarios';

async function enterStudy(page: import('@playwright/test').Page) {
  await page.goto(studyEntry);
  await page.getByTestId('orientation-continue').click();
  await expect(page).toHaveURL(/\/research\/stability-scenarios$/);
}

test.describe('authored Sarah interpretation stimulus', () => {
  test('keeps the ordinary orientation and presents neutral Sarah facts before reveal', async ({ page }) => {
    await page.goto('/orientation');
    await expect(page.getByTestId('orientation-continue')).toHaveAttribute('href', '/dashboard-synthetic-journey?reset=1');
    await expect(page.getByRole('combobox')).toBeVisible();

    await page.goto(studyEntry);
    await expect(page.getByTestId('orientation-disclosure')).toContainText('No real money moves');
    await expect(page.getByTestId('orientation-data-boundary')).toContainText('Do not enter real personal or financial information.');
    await expect(page.getByRole('combobox')).toBeVisible();
    await expect(page.getByTestId('stability-study-currency-note')).toContainText('selected currency for Sarah');
    await expect(page.getByTestId('stability-study-currency-note')).not.toContainText(/kwacha|dollars|currency mismatch|exposure/i);
    await page.getByTestId('orientation-continue').click();

    const stimulus = page.getByTestId('stability-stimulus');
    await expect(stimulus).toContainText('Fictional research example · no real money');
    await expect(page.getByTestId('sarah-facts')).toContainText('Situation on 1 October 2026');
    await expect(page.getByTestId('sarah-facts')).toContainText('Sarah already has K6,000 set aside');
    await expect(page.getByTestId('sarah-facts')).toContainText('Those contributions have not happened yet');
    await expect(page.getByTestId('course-fee')).toHaveText('The course costs USD 1,000. Payment is due in US dollars on 1 October 2027.');
    await expect(page.getByTestId('study-question')).toContainText('In your own words, what is happening for Sarah?');
    await expect(page.getByTestId('study-interpretation')).toHaveCount(0);
    await expect(stimulus).not.toContainText(/currency mismatch|stability exposure|goal-relative interpretation|what Hedgr noticed|\bS[0-3]\b/i);
    await expect(stimulus.locator('input, textarea, form')).toHaveCount(0);
  });

  test('preserves the matched facts, exact prompts, authored interpretation and transfer boundary', async ({ page }) => {
    await enterStudy(page);
    const facts = page.getByTestId('sarah-facts');
    const baselineFacts = await facts.innerText();

    await page.getByTestId('study-continue').click();
    await expect(page.getByRole('heading', { name: 'Sarah’s course savings', level: 2 })).toBeFocused();
    await expect(page.getByTestId('study-question')).toContainText('What, if anything, can you conclude about Sarah\'s progress toward the course from this information?');
    await expect(page.getByTestId('study-question')).toContainText('What would you still need to know?');
    await expect(page.getByTestId('study-interpretation')).toHaveCount(0);
    expect(await facts.innerText()).toBe(baselineFacts);

    await page.getByTestId('study-reveal').click();
    await expect(page.getByRole('heading', { name: 'Example interpretation', level: 2 })).toBeFocused();
    expect(await facts.innerText()).toBe(baselineFacts);
    await expect(page.getByTestId('study-interpretation').locator('p')).toHaveText([
      'Sarah is saving in kwacha for a course priced in US dollars.',
      'Her kwacha savings can grow without that alone telling her how much of the USD course fee they will cover when payment is due.',
      'The relationship between the two currencies at that time also matters.',
      'This example cannot predict the future exchange rate, assume Sarah\'s planned contributions will happen, or establish that the course will be fully funded.',
    ]);
    await expect(page.getByTestId('study-question')).toContainText('Does this change anything about how you understand Sarah\'s situation? If so, what?');

    await page.getByTestId('study-transfer').click();
    await expect(page.getByRole('heading', { name: 'Sarah’s changed course fee', level: 2 })).toBeFocused();
    await expect(page.getByTestId('study-interpretation')).toHaveCount(0);
    await expect(page.getByTestId('course-fee')).toHaveText('The provider now fixes the course fee at K29,500 payable in Zambian kwacha on 1 October 2027, instead of USD 1,000 payable in US dollars.');
    await expect(facts).toContainText('Sarah already has K6,000 set aside');
    await expect(facts).toContainText('Those contributions have not happened yet');
    await expect(page.getByTestId('study-question')).toContainText('All other facts remain the same.');
    await expect(page.getByTestId('study-question')).toContainText('What changes in your interpretation, and what stays the same?');
  });

  test('keeps each selected savings denomination consistent through the matched reveal and transfer', async ({ page }) => {
    for (const [currency, prefix, name, possessive] of [
      ['ZMW', 'K', 'kwacha', 'kwacha savings'],
      ['KES', 'KES ', 'Kenyan shillings', 'savings in Kenyan shillings'],
      ['NGN', 'NGN ', 'Nigerian naira', 'savings in Nigerian naira'],
      ['GHS', 'GHS ', 'Ghanaian cedis', 'savings in Ghanaian cedis'],
      ['PHP', 'PHP ', 'Philippine pesos', 'savings in Philippine pesos'],
    ] as const) {
      await page.goto(studyEntry);
      await page.getByRole('combobox').selectOption(currency);
      await expect(page.getByTestId('stability-study-currency-note')).not.toContainText(/currency mismatch|exposure|US dollars/i);
      await page.getByTestId('orientation-continue').click();

      const facts = page.getByTestId('sarah-facts');
      await expect(facts).toContainText(`${prefix}6,000`);
      await expect(facts).toContainText(`${prefix}2,000`);
      await expect(page.getByTestId('course-fee')).toHaveText('The course costs USD 1,000. Payment is due in US dollars on 1 October 2027.');
      const baselineFacts = await facts.innerText();
      await page.getByTestId('study-continue').click();
      await page.getByTestId('study-reveal').click();
      expect(await facts.innerText()).toBe(baselineFacts);
      await expect(page.getByTestId('study-interpretation').locator('p')).toHaveText([
        `Sarah is saving in ${name} for a course priced in US dollars.`,
        `Her ${possessive} can grow without that alone telling her how much of the USD course fee they will cover when payment is due.`,
        'The relationship between the two currencies at that time also matters.',
        'This example cannot predict the future exchange rate, assume Sarah\'s planned contributions will happen, or establish that the course will be fully funded.',
      ]);
      await page.getByTestId('study-transfer').click();
      await expect(page.getByTestId('course-fee')).toContainText(`${prefix}29,500 payable in`);
      await expect(facts).toContainText(`${prefix}6,000`);
      await expect(facts).toContainText(`${prefix}2,000`);
      await expect(page.getByTestId('course-fee')).toContainText('instead of USD 1,000 payable in US dollars');
    }
  });

  test('keeps the sequence readable and operable at small width and enlarged text', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 720 });
    await enterStudy(page);
    await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
    for (const button of ['study-continue', 'study-reveal', 'study-transfer']) {
      await expect(page.getByTestId(button)).toBeVisible();
      await page.getByTestId(button).focus();
      await expect(page.getByTestId(button)).toBeFocused();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      await page.getByTestId(button).click();
    }
    await expect(page.getByTestId('course-fee')).toContainText('K29,500');
    for (const width of [320, 390, 1280, 1440]) {
      await page.setViewportSize({ width, height: 800 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    }
  });
});
