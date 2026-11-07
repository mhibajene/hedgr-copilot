import { expect, test, type Locator, type Page } from '@playwright/test';
import { PLAN_INTENT_COPY as copy } from '../lib/copy/plan-intent-copy';
import { formatExampleRateLine } from '../app/(app)/dashboard/RateLine';
import { SIMULATION_INTENT_KEY } from '../lib/state/simulation-intent';
import { getSimulationDisplayRate } from '../lib/state/simulation-display-currency';

test.beforeEach(async ({ context, page }) => {
  await context.route('**/*', route => ['localhost', '127.0.0.1', '::1'].includes(new URL(route.request().url()).hostname) ? route.continue() : route.abort());
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/login');
  await page.getByPlaceholder('you@example.com').fill('plan-intent@hedgr.test');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await expect(page).toHaveURL(/\/dashboard/);
});

test('PLAN-INTENT-001 hierarchy places movement before intent and removes Home targets', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => {
    localStorage.setItem('hedgr:ledger', JSON.stringify({ version: 2, transactions: [
      { txn_ref: 'plan-intent-deposit', type: 'deposit', status: 'settled', amount_zmw: 100, amount_usd: 5, fx_rate: 20, created_at: 1000, updated_at: 1000 },
      { txn_ref: 'plan-intent-withdrawal', type: 'withdrawal', status: 'settled', amount_zmw: 0, amount_usd: 2, fx_rate: 0, created_at: 2000, updated_at: 2000 },
    ] }));
    localStorage.setItem('hedgr:last-home-visit', String(Date.now()));
  });
  await page.goto('/dashboard-synthetic-journey');
  await expect(page.getByTestId('usd-balance')).toHaveText('$3.00');
  const regions = [page.locator('[data-component="HomeHero"]'), ...[
    'dashboard-current-status', 'dashboard-simulation-utilities', 'dashboard-position-line',
    'planning-read-card', 'currency-insight', 'dashboard-disclosures', 'dashboard-restart-journey',
  ].map(id => page.getByTestId(id))];
  for (let i = 1; i < regions.length; i++) {
    const previous = (await regions[i - 1].boundingBox())!;
    const next = (await regions[i].boundingBox())!;
    expect(next.y).toBeGreaterThanOrEqual(previous.y + previous.height);
  }
  await expect(page.getByTestId('research-planning-targets')).toHaveCount(0);
  const rate = page.locator('[data-component="RateLine"]');
  await expect(rate).toHaveText('Example rate: ZMW 27 per US dollar. Not a live rate.');
  await expect(page.getByTestId('currency-insight').locator('..').locator('[data-component="RateLine"]')).toHaveCount(1);
  await expect(page.getByRole('button', { name: 'Currency context', exact: true })).toBeVisible();
});

async function checkCard(card: Locator) {
  const text = await card.innerText();
  expect(text.split(copy.limits)).toHaveLength(2);
  expect(text).not.toMatch(/\d|[$£€%]|\b(?:USD|ZMW|KES|NGN|GHS|PHP|yield|first|then|before|priority|ready|covered|enough|safe|protected|locked|growth|earnings|returns)\b|your money|emergency fund|will be there/i);
  const aria = await card.locator('[aria-label], [aria-description]').evaluateAll(nodes => nodes.map(n => `${n.getAttribute('aria-label')} ${n.getAttribute('aria-description')}`).join(' '));
  expect(aria).not.toMatch(/\d|[$£€%]|yield/i);
  await expect(card.getByRole('switch')).toHaveCount(0);
  await expect(card.getByRole('checkbox')).toHaveCount(0);
  expect(text).not.toMatch(/You told us|Nothing has moved/);
}
async function chooser(card: Locator) {
  await checkCard(card);
  await expect(card.getByRole('group', { name: copy.question })).toBeVisible();
  await expect(card.getByRole('radio')).toHaveCount(3);
  await expect(card.locator('input:checked')).toHaveCount(0);
  await expect(card.getByRole('button', { name: copy.answers.skip })).toBeVisible();
  await expect(card.getByRole('button', { name: copy.change })).toHaveCount(0);
  await expect(card.getByTestId('planning-read-stance')).toHaveCount(0);
}
async function seedHistory(page: Page) {
  await page.evaluate(() => localStorage.setItem('hedgr:ledger', JSON.stringify({ version: 2, transactions: [
    {txn_ref:'intent-history',type:'deposit',status:'settled',amount_zmw:100,amount_usd:5,fx_rate:20,created_at:1000,updated_at:1000},
    {txn_ref:'intent-withdrawal',type:'withdrawal',status:'settled',amount_zmw:0,amount_usd:2,fx_rate:0,created_at:2000,updated_at:2000},
  ] })));
  await page.goto('/dashboard-synthetic-journey');
  await expect(page.getByTestId('usd-balance')).toHaveText('$3.00');
}
test('PLAN-INTENT-001 post-select collapses the chooser and offers Change', async ({ page }) => {
  await page.goto('/dashboard-synthetic-journey');
  const card = page.getByTestId('planning-read-card'); await chooser(card);
  await card.getByRole('radio', { name: copy.labels.regular, exact: true }).click();
  await expect(card.getByRole('group', { name: copy.question })).toHaveCount(0);
  await expect(card.getByRole('button', { name: copy.change, exact: true })).toBeVisible();
});
test('all purpose/Skip transitions update only intent; Change clears immediately', async ({ page }) => {
  await seedHistory(page);
  const card = page.getByTestId('planning-read-card');
  const hero = page.locator('[data-component="HomeHero"]');
  const activity = page.getByTestId('dashboard-position-line');
  const original = [await hero.innerHTML(), await activity.innerHTML(), page.url()];
  for (const label of ['regular', 'reserve', 'goals'] as const) {
    await chooser(card);
    await card.getByRole('radio', { name: copy.labels[label], exact: true }).click();
    await checkCard(card);
    await expect(card.getByRole('radio')).toHaveCount(0);
    await expect(card.getByRole('button', { name: copy.answers.skip })).toHaveCount(0);
    await expect(card.getByTestId('planning-read-stance')).toHaveText(copy.confirmation(copy.labels[label]));
    await expect(card.getByTestId('planning-read-why')).toHaveText(copy.why[label]);
    await expect(card.getByTestId('planning-read-labels')).toHaveCount(0);
    await expect(card.getByTestId('planning-read-dated')).toHaveCount(label === 'goals' ? 1 : 0);
    if (label === 'goals') await expect(card.getByTestId('planning-read-dated')).toHaveText(copy.dated);
    expect([await hero.innerHTML(), await activity.innerHTML(), page.url()]).toEqual(original);
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await card.getByRole('button', { name: copy.change, exact: true }).click();
    await chooser(card);
    expect(await page.evaluate(key => localStorage.getItem(key), SIMULATION_INTENT_KEY)).toBeNull();
  }
  await card.getByRole('button', { name: copy.answers.skip }).click();
  await checkCard(card);
  await expect(card.getByTestId('planning-read-stance')).toHaveText(copy.skipped);
  await expect(card.getByTestId('planning-read-why')).toHaveCount(0);
  await expect(card.getByRole('radio')).toHaveCount(0);
  expect((await card.innerText()).replace(/\s+/g,' ').trim()).toBe(copy.skipped + ' ' + copy.change);
  await card.getByRole('button', { name: copy.change }).click(); await chooser(card);
  expect([await hero.innerHTML(), await activity.innerHTML(), page.url()]).toEqual(original);
});
test('all answers survive refresh/client navigation; Change removes stored choice across refresh', async ({ page }) => {
  await page.goto('/dashboard-synthetic-journey');
  const card = page.getByTestId('planning-read-card');
  for (const label of ['regular','reserve','goals','skip'] as const) {
    if (label === 'skip') await card.getByRole('button', { name: copy.answers.skip }).click();
    else await card.getByRole('radio', { name: copy.labels[label], exact: true }).click();
    const stance = label === 'skip' ? copy.skipped : copy.confirmation(copy.labels[label]);
    await page.reload(); await expect(card.getByTestId('planning-read-stance')).toHaveText(stance);
    await page.getByTestId('synthetic-bottom-nav').getByRole('link', { name:'Activity',exact:true }).click();
    await page.getByTestId('synthetic-bottom-nav').getByRole('link', { name:'Home',exact:true }).click();
    await expect(card.getByTestId('planning-read-stance')).toHaveText(stance);
    await card.getByRole('button', { name:copy.change }).click();
    expect(await page.evaluate(key => localStorage.getItem(key), SIMULATION_INTENT_KEY)).toBeNull();
    await page.reload(); await chooser(card);
  }
});
test('Restart cancellation preserves intent; accepted Restart and reset URL clear it', async ({ page }) => {
  await seedHistory(page);
  const card=page.getByTestId('planning-read-card');
  await card.getByRole('radio', {name:copy.labels.goals,exact:true}).click();
  page.once('dialog', dialog => dialog.dismiss());
  await page.getByRole('button',{name:'Restart simulated journey',exact:true}).click();
  await expect(card.getByTestId('planning-read-stance')).toHaveText(copy.confirmation(copy.labels.goals));
  page.once('dialog', dialog => dialog.accept());
  await page.getByRole('button',{name:'Restart simulated journey',exact:true}).click();
  await chooser(card); await expect(page.getByTestId('usd-balance')).toHaveText('$0.00');
  await page.reload(); await chooser(card);
  await card.getByRole('button',{name:copy.answers.skip}).click();
  await page.goto('/dashboard-synthetic-journey?reset=1'); await chooser(card);
  expect(await page.evaluate(key=>localStorage.getItem(key),SIMULATION_INTENT_KEY)).toBeNull();
});
test('only own-simulation routes expose the card', async ({ page }) => {
  for (const route of ['/dashboard', '/dashboard?example=own', '/dashboard-synthetic-journey?example=sarah', '/dashboard-synthetic-journey?example=daniel', '/dashboard?journey=class-a-val-002&example=sarah', '/dashboard?journey=class-a-val-002&example=daniel']) {
    await page.goto(route);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByTestId('planning-read-card')).toHaveCount(0);
  }
});

for (const currency of ['ZMW','KES','NGN','GHS','PHP'] as const) for (const [width,textScale] of [[390,1],[320,2]]) {
  test(`${currency} at ${width}px with ${textScale*100}% root text: chooser/read/Change and nav clearance`, async ({page},info)=>{
    await page.setViewportSize({width,height:844}); await page.goto('/dashboard-synthetic-journey');
    const hero=page.locator('[data-component="HomeHero"]');
    await hero.getByRole('combobox').selectOption(currency);
    await expect(hero.getByTestId('local-balance-figure')).toContainText(`≈ ${currency} `);
    await expect(page.locator('[data-component="RateLine"]')).toHaveText(formatExampleRateLine(currency,getSimulationDisplayRate(currency)));
    const card=page.getByTestId('planning-read-card');const normal=await card.evaluate(n=>parseFloat(getComputedStyle(n).fontSize));
    if(textScale===2)await page.addStyleTag({content:'html { font-size: 200% !important; }'});
    expect(await card.evaluate(n=>parseFloat(getComputedStyle(n).fontSize))).toBe(normal*textScale);
    await chooser(card);
    const labelWordLines = await card.getByRole('radio').evaluateAll(inputs => inputs.flatMap(input => {
      const text = input.nextElementSibling!.firstChild!;
      const value = text.textContent!;
      return [...value.matchAll(/\S+/g)].map(match => {
        const range = document.createRange(); range.setStart(text, match.index!); range.setEnd(text, match.index! + match[0].length);
        return range.getClientRects().length;
      });
    }));
    expect(labelWordLines.every(lines => lines === 1)).toBe(true);
    for(const input of await card.getByRole('radio').all()){
      await input.scrollIntoViewIfNeeded();const box=(await input.boundingBox())!;const nav=(await page.getByTestId('synthetic-bottom-nav').boundingBox())!;
      expect(box.y).toBeGreaterThanOrEqual(0);expect(box.y+box.height).toBeLessThanOrEqual(nav.y+1);
    }
    await card.getByRole('radio',{name:copy.labels.goals,exact:true}).click();await checkCard(card);
    await expect(card.getByTestId('planning-read-why')).toHaveText(copy.why.goals);
    const wordLines = await card.getByTestId('planning-read-stance').evaluate(node => {
      const text = node.firstChild!;
      return ['support', 'planning'].map(word => {
        const start = text.textContent!.indexOf(word);
        const range = document.createRange(); range.setStart(text, start); range.setEnd(text, start + word.length);
        return range.getClientRects().length;
      });
    });
    expect(wordLines).toEqual([1, 1]);
    const change=card.getByRole('button',{name:copy.change});await change.scrollIntoViewIfNeeded();
    const box=(await change.boundingBox())!;const nav=(await page.getByTestId('synthetic-bottom-nav').boundingBox())!;
    expect(box.y+box.height).toBeLessThanOrEqual(nav.y+1);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(1);
    const styles=await card.locator('*').evaluateAll(nodes=>nodes.flatMap(n=>{const s=getComputedStyle(n);return[s.color,s.backgroundColor,s.borderColor,s.accentColor];}));
    for(const color of styles){const rgb=color.match(/^rgb[a]?\((\d+), (\d+), (\d+)/)?.slice(1).map(Number);if(rgb){const[r,g,b]=rgb;expect(r>g*1.3&&r>b*1.3,color).toBe(false);expect(g>r*1.3&&g>b*1.3,color).toBe(false);}}
    await info.attach(`${currency}-${width}-${textScale*100}pct-text`,{body:await page.screenshot({fullPage:true}),contentType:'image/png'});
    await change.click();await chooser(card);
  });
}
