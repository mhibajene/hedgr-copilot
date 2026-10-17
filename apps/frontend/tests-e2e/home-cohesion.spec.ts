import { createHash } from 'node:crypto';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { expect, test, type Page } from '@playwright/test';

const ROUTES = ['/dashboard-synthetic-journey', '/dashboard?journey=class-a-val-002'];
const OPTIONS = ['Your own simulation', "Daniel's reserve", "Sarah's course fee"];
const CAPTION = 'Example figure, not a quote';
const RATE = 'Example rate: ZMW 27 per US dollar. Not a live rate.';
const NOW = Date.parse('2026-10-15T00:00:00Z');
const row = (type: 'deposit' | 'withdrawal', amount: number, at: number, status = 'settled') => ({
  txn_ref: `${type}-${at}`, type, status, amount_usd: amount, amount_zmw: amount * 20, fx_rate: 20, created_at: at, updated_at: at,
});
test.beforeEach(async ({ context, page }) => {
  await context.route('**/*', route => ['localhost', '127.0.0.1', '::1'].includes(new URL(route.request().url()).hostname) ? route.continue() : route.abort());
  await page.clock.install({ time: NOW });
  await page.clock.setFixedTime(NOW);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/login'); await page.getByPlaceholder('you@example.com').fill('cohesion@hedgr.test');
  await page.getByRole('button', { name: 'Continue' }).click(); await expect(page).toHaveURL(/\/dashboard/);
});
async function seed(page: Page, rows = [row('deposit', 800, 1000)], since: number | null = null, currency = 'ZMW') {
  await page.evaluate(({ rows, since, currency }) => {
    localStorage.setItem('hedgr:ledger', JSON.stringify({ version: 2, transactions: rows }));
    if (since === null) localStorage.removeItem('hedgr:last-home-visit'); else localStorage.setItem('hedgr:last-home-visit', String(since));
    localStorage.setItem('hedgr.simulation.display-currency', currency);
  }, { rows, since, currency });
}
const url = (route: string, example: string) => `${route}${route.includes('?') ? '&' : '?'}example=${example}`;
for (const width of [390, 1440]) test(`T1 T2 T3 T7: real journey cohesion at ${width}`, async ({ page }) => {
  await page.setViewportSize({ width, height: 1000 });
  for (const route of ROUTES) for (const [index, example] of ['own', 'daniel', 'sarah'].entries()) {
    await seed(page); await page.goto(url(route, example));
    const hero = page.locator('[data-component="HomeHero"]');
    await expect(hero).toHaveCount(1); await expect(hero).toBeVisible();
    const picker = page.getByRole('combobox', { name: 'Choose an example' });
    await expect(picker.locator('option')).toHaveText(OPTIONS);
    await expect(picker.locator('option:checked')).toHaveText(OPTIONS[index]);
    await expect(page.getByTestId('example-picker-value')).toHaveText(OPTIONS[index]);
    await expect(hero.locator('[data-component="LocalFigure"]')).toHaveText(`${example === 'sarah' ? '≈ ZMW 27,000.00' : '≈ ZMW 21,600.00'} ${CAPTION}`);
    await expect(hero.getByText(CAPTION, { exact: true })).toBeVisible();
    await expect(page.locator('[data-component="RateLine"]')).toHaveCount(1);
    await expect(page.getByText(RATE, { exact: true })).toBeVisible();
    const text = await page.locator('main').evaluate(main => {
      const clone = main.cloneNode(true) as HTMLElement;
      clone.querySelector('label[for="dashboard-example-picker"]')?.parentElement?.remove();
      clone.querySelectorAll('dialog:not([open]), details:not([open]), .sr-only, [aria-hidden="true"]').forEach(n => n.remove());
      return clone.textContent!;
    });
    for (const figure of [example === 'sarah' ? '$1000.00' : '$800.00', example === 'sarah' ? '≈ ZMW 27,000.00' : '≈ ZMW 21,600.00', RATE]) expect(text.split(figure).length - 1, figure).toBe(1);
    if (example !== 'own') {
      const name = example === 'daniel' ? 'Daniel’s reserve' : 'Sarah’s course fee';
      expect(text.split(name).length - 1).toBe(1);
      await expect(page.getByRole('heading', { level: 1 })).toHaveText('Example');
      await expect(page.locator(`#dashboard-${example}-label`)).toHaveText(`Fictional example · ${name}`);
      await expect(page.getByTestId(`${example}-read-as-of`)).toHaveText('Example date: 9 Oct 2026');
      const card = page.locator('[data-component="ExampleCard"]');
      await expect(card).toHaveCount(1);
      expect(await card.evaluate(n => n.lastElementChild!.textContent)).toBe(example === 'daniel' ? 'This is what happened in the example. It doesn’t tell you what will happen next.' : 'Fictional course fee. This figure is not a payment quote. This read does not establish whether Sarah can pay the fee.');
      if (example === 'daniel') {
        await expect(page.getByTestId('daniel-observation').last()).toHaveText('9 Oct · shown above');
        await expect(page.getByTestId('daniel-read-holding')).toHaveCount(0);
      }
    }
    const suffix = hero.locator('[data-component="UsdSuffix"]');
    expect(await suffix.evaluate(n => parseFloat(getComputedStyle(n).fontSize))).toBeLessThan(await hero.locator('[data-component="UsdFigure"]').evaluate(n => parseFloat(getComputedStyle(n).fontSize)));
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  }
});
test('T11 one locked own-sim rate for every supported currency', async ({ page }) => {
  const rates = { ZMW: '27', KES: '130', NGN: '1,500', GHS: '15', PHP: '56' };
  for (const [code, rate] of Object.entries(rates)) {
    await seed(page, undefined, null, code); await page.goto(ROUTES[0]);
    await expect(page.locator('[data-component="RateLine"]')).toHaveText(`Example rate: ${code} ${rate} per US dollar. Not a live rate.`);
    await expect(page.getByTestId('local-balance-figure')).toContainText(`≈ ${code} `);
  }
});
test('F5 negative-pending and negative-historical-animation use accepted persisted state', async ({ page }) => {
  await seed(page, [row('deposit', -25, 1000, 'pending')]); await page.goto(ROUTES[0]);
  await expect(page.getByTestId('usd-balance')).toHaveText('$-25.00');
  await expect(page.getByTestId('local-balance-figure')).toHaveText('≈ ZMW -675.00');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await seed(page, [row('withdrawal', 100, 1000), row('deposit', 200, 3000)], 2000);
  await page.addInitScript(() => {
    const frames: FrameRequestCallback[] = [];
    performance.now = () => 0;
    window.requestAnimationFrame = cb => { frames.push(cb); return frames.length; };
    window.cancelAnimationFrame = () => {};
    Object.defineProperty(window, 'cohesionFrame', { value: (elapsed: number) => frames.shift()?.(elapsed) });
  });
  await page.goto(ROUTES[0]);
  await expect(page.getByTestId('usd-balance')).toHaveText('$-100.00');
  await expect(page.getByTestId('local-balance-figure')).toHaveText('≈ ZMW -2,700.00');
  // Advance actual page easing; do not substitute ledger/projection/interpolation.
  await page.evaluate(() => (window as typeof window & { cohesionFrame: (elapsed: number) => void }).cohesionFrame(600 * (1 - Math.cbrt(0.75))));
  await expect(page.getByTestId('usd-balance')).toHaveText('$-50.00');
  await expect(page.getByTestId('local-balance-figure')).toHaveText('≈ ZMW -1,350.00');
  await page.evaluate(() => (window as typeof window & { cohesionFrame: (elapsed: number) => void }).cohesionFrame(600));
  await expect(page.getByTestId('usd-balance')).toHaveText('$100.00');
  await expect(page.locator('[data-component="HomeHero"]')).toHaveCount(1);
});
test.describe('protected route preservation', () => {
  test.use({ timezoneId: 'UTC' });
  test('T10 preservation: protected route text is pinned before green', async ({ page }, info) => {
    const baseline: Record<string, string> = {};
    const text: Record<string, string> = {};
    // Complete the login Home's visit/review effects before preparing any fixture.
    await expect.poll(() => page.evaluate(() => localStorage.getItem('hedgr:last-home-visit'))).toBe(String(NOW));
    await expect.poll(() => page.evaluate(() => localStorage.getItem('hedgr:engine-review-snapshot-fingerprint'))).not.toBeNull();
    for (const route of ['/dashboard', '/withdraw?journey=class-a-val-002', '/deposit?journey=class-a-val-002', '/activity?journey=class-a-val-002']) {
      for (const [index, state] of ['first', 'one', 'several', 'no-change'].entries()) {
        const rows = [row('deposit', 1000, 1000)];
        if (state !== 'first') rows.push(row('deposit', 205.37, 3000));
        if (state === 'several') rows.push(row('withdrawal', 5, 3500));
        // An inert same-origin document unmounts Home before storage is seeded.
        // Its late visit/review effects must never overwrite the next cell's inputs.
        await page.goto('/api/policy');
        await seed(page, rows, state === 'first' ? null : state === 'no-change' ? 4000 : 2000);
        await page.goto(route);
        await expect(page.locator('main')).toBeVisible();
        if (route === '/dashboard') {
          await expect(page.getByTestId('usd-balance')).toBeVisible();
          await expect(page.getByTestId('dashboard-position-line')).toHaveAttribute('data-state', 'line');
          await expect(page.getByTestId('dashboard-position-line-visit')).toHaveCount(state === 'first' ? 0 : 1);
          if (state !== 'first') await expect(page.getByTestId('dashboard-current-status')).toHaveAttribute('data-home-state', `since-${state}`);
          await expect(page.getByTestId('engine-stability-review-memory-entry')).toHaveCount(Math.min(index + 1, 2));
          await expect(page.getByTestId('engine-stability-review-snapshot-change-signal')).toBeAttached();
          if (state === 'one' || state === 'several') await expect(page.getByTestId('dashboard-arrival-announcement')).not.toBeEmpty();
        }
        if (route.startsWith('/withdraw')) await expect(page.getByTestId('withdraw-amount')).toBeVisible();
        if (route.startsWith('/deposit')) await expect(page.getByTestId('deposit-amount')).toBeVisible();
        if (route.startsWith('/activity')) {
          await expect(page.getByRole('heading', { name: 'Activity', exact: true })).toBeVisible();
          await expect(page.locator('[data-testid^="activity-row-"]')).toHaveCount(rows.length);
        }
        text[`${route}:${state}`] = (await page.locator('main').textContent())!;
        if (route === '/dashboard') text[`${route}:${state}`] = scPreRuntime(text[`${route}:${state}`], SC_HOME_TEXT_EDITS);
        baseline[`${route}:${state}`] = createHash('sha256').update(text[`${route}:${state}`]).digest('hex');
      }
    }
    await info.attach('protected-route-text', { body: JSON.stringify({ timezone: 'UTC', now: NOW, text, hashes: baseline }, null, 2), contentType: 'application/json' });
    expect(baseline).toEqual(PRE_GREEN_ROUTE_TEXT);
  });
});
test('screenshots of three Homes at required viewports', async ({ page }, info) => {
  const directory = process.env.COH_SCREENSHOT_DIR ?? info.outputPath('cohesion'); mkdirSync(directory, { recursive: true });
  for (const [width, scale] of [[1440, 1], [390, 1], [320, 2]]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const example of ['own', 'daniel', 'sarah']) {
      await seed(page); await page.goto(url(ROUTES[0], example));
      if (scale === 2) await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
      await expect(page.locator('[data-component="HomeHero"]')).toBeVisible();
      await page.screenshot({ path: join(directory, `${example}-${width}-${scale * 100}pct.png`), fullPage: true });
    }
  }
});
// Captured from immutable red 78077ea (runtime 56ce3e6), browser UTC, fixed 2026-10-15T00:00:00Z.
// Complete main.textContent() for all 16 original cells; raw text/provenance retained in runtime/.
const PRE_GREEN_ROUTE_TEXT: Record<string, string> = {
  "/dashboard:first": "0d8a91740ac80d8b36f5bdd5d533fb65ef4106912e570c8f7081369dd6b6c15e",
  "/dashboard:one": "beff4e250408d854186d41887fe771e9c27b702eaba81034e05482ffaea3c8a9",
  "/dashboard:several": "8cac9770753067e14e237e1f692a05518d340787861769ff7c8ae37136bb227a",
  "/dashboard:no-change": "86533c41f41b82f22ed48f8b7ef524309b44b2380778f0b8f25426287454a576",
  "/withdraw?journey=class-a-val-002:first": "4ca20d49912f152257d74097f80839480988a373f94b6f2b5bad4ee9e829be86",
  "/withdraw?journey=class-a-val-002:one": "33d1a8c0fdecb65aca6620d21cd46178dc0a566f7efb1a130385fdb2dc69d3b8",
  "/withdraw?journey=class-a-val-002:several": "747cb2e5ad12be67aefb663b81dd094d014852ba8017df5f571dde2066bb560f",
  "/withdraw?journey=class-a-val-002:no-change": "33d1a8c0fdecb65aca6620d21cd46178dc0a566f7efb1a130385fdb2dc69d3b8",
  "/deposit?journey=class-a-val-002:first": "02de236cb1e593ea7227f666157337e898070af2382002126d58d693b7f032cb",
  "/deposit?journey=class-a-val-002:one": "02de236cb1e593ea7227f666157337e898070af2382002126d58d693b7f032cb",
  "/deposit?journey=class-a-val-002:several": "02de236cb1e593ea7227f666157337e898070af2382002126d58d693b7f032cb",
  "/deposit?journey=class-a-val-002:no-change": "02de236cb1e593ea7227f666157337e898070af2382002126d58d693b7f032cb",
  "/activity?journey=class-a-val-002:first": "6f6d9903f428aa8ac62d1c9fc292cb40581f1063f1774a3de30b287c90166f59",
  "/activity?journey=class-a-val-002:one": "c98ed8633a47f9776883b2f4128b89d51c967f1c491011cb19ebcd5f46e91a7b",
  "/activity?journey=class-a-val-002:several": "c86e810a8df4b46acc740898a477d6910da04889d7eff822d325c0825a61de64",
  "/activity?journey=class-a-val-002:no-change": "c98ed8633a47f9776883b2f4128b89d51c967f1c491011cb19ebcd5f46e91a7b"
};

// §391: deterministic event dates and current-year presentation.
test.use({ timezoneId: 'UTC' });

// §394: exact approved copy reversal only; all 16 original route hashes remain.
const SC_HOME_TEXT_EDITS = [
  [
    "eturn opportunity when conditions allow.Stability target20%ReserveSupporting guidanceA buffer target, kept ready if needed.Stability target30%Guidance only. This planning structure is context, not an instruction. It does not show current money or prove that simulated money was divided or moved.Planning targets. The percentages show intended stability priorities in this simulation only.Verify what stability targets meanTarget role. A lower Conser",
    "eturn opportunity when conditions allow.Target20%ReserveSupporting guidanceA buffer target, kept ready if needed.Target30%Targets only. They are not an instruction, and they do not divide or move your balance.Planning targets. The percentages show how Hedgr divides its plan.What these targets meanTarget role. A lower Conser"
  ],
  [
    "ts are guidance, not current money.Hedgr's guidance makes its priorities visible in this simulation: preserve value first, keep access and risk visible, and understand the situation before action.Hedgr represents those priorities through three distinct target roles.Core stability targetPrimary stability rolePreserve value as the primary stability priority.Conservative yieldSupporting roleKeep return opportunity limited and conditional.ReserveSupporting roleKeep a buffer ready if needed.These percentages describe a simulated planning structure for those roles. They are guidance, not current money.Core stability targetPrimary stability guidanceThe largest target, focused on preserving value.Stability target50%Conservative yieldSupporting gui",
    "ts are guidance, not current money.Hedgr shows its targets here: what it sets first, how access works and what the risks are.These percentages are Hedgr's planning targets for each role. They are not money.Main targetPlanning targetOne of the three targets.Target50%Conservative yieldSupporting gui"
  ],
  [
    " kept ready in principle if you need it.Most of the structure is held steady. Conservative yield and a reserve are quieter supporting lanes. This shows system intent, not a map of where funds sit.When the system is more cautious, protection and the reserve can outweigh conservative yield. Posture reflects that caution. It does not describe completed movement.Targets are not accounting truth. Your ",
    " kept ready in principle if you need it.The three planning targets show a plan. None of them shows where money sits.When Hedgr is more cautious, the Reserve target goes up and the target for earning goes down. Nothing is moved.Targets are not accounting truth. Your "
  ],
  [
    "ciple; these targets stay informational.A protective posture does not, on its own, mean withdrawals are blocked or delayed.Protection in plain termsViewHedgr treats stability and protection as deliberate design choices. In tougher conditions, these informational targets may emphasize protection and liquidity ahead of conservative yield. That is visible intent you can review, not a nudge to move funds.Caution can limit conservative yield before protection is stressed. The split reflects that priority, not completed movement.The Reserve above still means readiness",
    "ciple; these targets stay informational.When targets changeViewIn harder conditions, Hedgr may raise the Reserve target and lower the target for earning. You can see this here. It is not a prompt to do anything.The Reserve above still means readiness"
  ],
  [
    " your prior check.Oct 15, 2026, 12:00 AMProtection in plain termsViewHedgr treats stability and protection as deliberate design choices. In tougher conditions, these informational targets may emphasize protection and liquidity ahead of conservative yield. That is visible intent you can review, not a nudge to move funds.Caution can limit conservative yield before protection is stressed. The split reflects that priority, not completed movement.The Reserve above still means readiness",
    " your prior check.Oct 15, 2026, 12:00 AMWhen targets changeViewIn harder conditions, Hedgr may raise the Reserve target and lower the target for earning. You can see this here. It is not a prompt to do anything.The Reserve above still means readiness"
  ],
  [
    "ets or adviceWhere things stand: within expected rangeLast viewed locallyNo prior local view in this browser.Review detailsViewUse this snapshot for a calm, regular check-in. Protective conditions stay visible here without nudging you to act.“Available” still means read",
    "ets or adviceWhere things stand: within the usual rangeLast viewed locallyNo prior local view in this browser.Review detailsViewCheck in here whenever you like. Nothing here asks you to act.“Available” still means read"
  ],
  [
    "ets or adviceWhere things stand: within expected rangeLast viewed locallyOct 15, 2026, 12:00 AMReview detailsViewUse this snapshot for a calm, regular check-in. Protective conditions stay visible here without nudging you to act.Since you last opened this r",
    "ets or adviceWhere things stand: within the usual rangeLast viewed locallyOct 15, 2026, 12:00 AMReview detailsViewCheck in here whenever you like. Nothing here asks you to act.Since you last opened this r"
  ],
  [
    "informational posture, not ledger truth.Stable balance — The primary holding lane. It is held steady to preserve value.Conservative yield — A supporting lane",
    "informational posture, not ledger truth.Main target — One of the three planning targets. It is a percentage, not money set aside.Conservative yield — A supporting lane"
  ],
  [
    "hown within the guidance.Current state. The simulated balance shown above is separate from this guidance. The percentages do not divide it.No instruction or movement. Guidance does not tell you what to do, and a target does not divide or move simulated money.How Hedgr interprets stabilityReviewReview snapshotIllustrative exampl",
    "hown within the guidance.Current state. Your balance shown above is separate from these targets.How Hedgr sets its targetsReviewReview snapshotIllustrative exampl"
  ],
  [
    " not live targets or adviceNORMALWithin expected range. Most of your balance stays steady, with conservative yield and reserve capacity kept visible.There is nothing here you need to manag",
    " not live targets or adviceNORMALWithin the usual range. The main target is the largest of the three planning targets.There is nothing here you need to manag"
  ],
  [
    "nformational, not your ledger balance.A protective posture does not by itself stop a withdrawal from processing or imply lockup.Why your balance is structured this way",
    "nformational, not your ledger balance.A higher Reserve target does not stop or delay a withdrawal.Why your balance is structured this way"
  ],
  [
    " real money is split or moved.How Hedgr interprets stabilityReviewReview snapshotIllustrative exampl",
    " real money is split or moved.How Hedgr sets its targetsReviewReview snapshotIllustrative exampl"
  ],
  [
    "allDepositJan 1+$1000.00Planning targetsStability guidanceIllustrative example values, not live ta",
    "allDepositJan 1+$1000.00Planning targetsPlanning targetsIllustrative example values, not live ta"
  ],
  [
    ".37DepositJan 1+$1000.00Planning targetsStability guidanceIllustrative example values, not live ta",
    ".37DepositJan 1+$1000.00Planning targetsPlanning targetsIllustrative example values, not live ta"
  ],
  [
    "ckend events.Where things stand: within expected rangeInformational targets unchanged si",
    "ckend events.Where things stand: within the usual rangeInformational targets unchanged si"
  ],
  [
    "026, 12:00 AMWhere things stand: within expected rangeInformational targets unchanged si",
    "026, 12:00 AMWhere things stand: within the usual rangeInformational targets unchanged si"
  ],
  [
    "nciple; these targets stay informational.A protective posture does not, on its own, mean withdrawals are blocked or delayed.This comparison is about system targets",
    "nciple; these targets stay informational.This comparison is about system targets"
  ],
  [
    " or adviceSee the planning position shown in this simulation and why it is structured this way. The",
    " or adviceSee the planning position shown and why it is structured this way. The"
  ]
];

function scPreRuntime(value: string, edits: readonly (readonly string[])[]): string {
  for (const [before, after] of edits) value = value.replaceAll(after, before);
  return value;
}
