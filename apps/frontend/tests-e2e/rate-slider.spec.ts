// HOME-SOFTHALO-RATESLIDER-BUNDLE-001 RED amendment register (§406 / P1 / P2 / P3):
// currency-insight unit/E2E: retire old arrows/deltas/two-date rows, details, limits,
// compact descriptions; replace with exact card/stops/fixed-rate/state checks.
// simulation-currency-insight: retire comparison API; retain decimal rounding,
// finite/invalid, zero/pending and immutable inputs via three-stop/fixed-rate cases.
// dashboard.page: old inline delta -> prescribed launcher; only S18 replaced region
// is normalised. Both fixed non-journey hashes, roots/digest and earn controls stay.
// home-stability-claims: SC9 exact state limits; SC14 exact bounded source reversals
// for page/Daniel/Sarah/CurrencyInsight; SC10 and other pins remain exact.
// sarah-home: only CurrencyInsight exact reversal; all other pins stay exact.
// daniel-home unit/E2E: chart/list scopes move under hero with every row/date kept;
// DOM order inserts chart before as-of; no new controls in preserved Home content.
// activity-visualiser/home-cohesion: closed dialogs excluded from visible counts.
// shared-baseline/wallet-redesign: retired delta -> positive card/slider/explanation;
// all ordinary route, storage, keyboard and disclosure controls retained.
// sarah-home: as-of/due time scopes follow the named elements after chart relocation.
// first-deposit: additive wash/latest/decorative/order contracts. Example tick
// assertions were already absent; own-simulation and legacy ticks stay exact.
// AC6 below counts visible/accessible content by state and heading/launcher role;
// Home facts once, modal explanation once when open, non-ZMW fixed-rate once.
// Card figures may repeat Home while open; the polite modal figure is separate.
import { expect, test, type Page } from '@playwright/test';
const ROUTES=['/dashboard-synthetic-journey','/dashboard?journey=class-a-val-002'];
const NOW=Date.parse('2026-10-15T12:00:00Z');
const FIRST=Date.parse('2026-10-08T12:00:00Z');const NEXT=Date.parse('2026-10-09T12:00:00Z');
const LIMIT='Three example rates. Not a live rate and not a forecast.';
const MEANING='The dollar amount is the same at each rate. The rate sets the local figure.';
const CALC='Your US dollar amount is multiplied by each example rate and rounded to two decimal places. Deposits, withdrawals, fees and spreads are not included. This is not your account history or live market data. No money moves.';
const INVARIANT='He made two deposits and none since. Each kwacha figure uses the example rate for its date.';
const row=(type:'deposit'|'withdrawal',amount:number,at:number)=>({txn_ref:`${type}-${at}`,type,status:'settled',amount_usd:amount,amount_zmw:amount*27,fx_rate:27,created_at:at,updated_at:at});
const rows=[row('deposit',500,FIRST),row('withdrawal',20,NEXT)];
test.use({timezoneId:'UTC'});
test.beforeEach(async({page,context})=>{
 await context.route('**/*',r=>['localhost','127.0.0.1','::1'].includes(new URL(r.request().url()).hostname)?r.continue():r.abort());
 await page.clock.install({time:NOW});await page.clock.setFixedTime(NOW);await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/login');await page.getByPlaceholder('you@example.com').fill('rate-slider@hedgr.test');await page.getByRole('button',{name:'Continue',exact:true}).click();await expect(page).toHaveURL(/\/dashboard$/);
});
async function seed(page:Page,state:string,currency='ZMW'){
 await page.goto('/api/policy');await page.evaluate(({state,currency,rows,FIRST,NEXT})=>{
  localStorage.setItem('hedgr:ledger',JSON.stringify({version:2,transactions:rows}));
  if(state==='no-visit')localStorage.removeItem('hedgr:last-home-visit');else localStorage.setItem('hedgr:last-home-visit',String(state==='no-change'?NEXT+1:FIRST+1));
  localStorage.setItem('hedgr.simulation.display-currency',currency);
 },{state,currency,rows,FIRST,NEXT});
}
async function visibleText(page:Page){return page.locator('main').evaluate(main=>{
 const clone=main.cloneNode(true) as HTMLElement;clone.querySelector('label[for="dashboard-example-picker"]')?.parentElement?.remove();
 clone.querySelectorAll('dialog:not([open]),details:not([open]),.sr-only,[aria-hidden="true"]').forEach(n=>n.remove());return clone.textContent!;
});}
function once(text:string,claim:string,count=1){expect(text.split(claim).length-1,claim).toBe(count);}
async function retained(page:Page,kind:string,state:string){
 const text=await visibleText(page);
 once(text,'Example figure, not a quote');
 if(kind==='daniel'){once(text,INVARIANT);once(text,'Example rate: ZMW 27 per US dollar. Not a live rate.');}
 else if(kind==='sarah'){once(text,'Fictional course fee. This figure is not a payment quote. This read does not establish whether Sarah can pay the fee.');once(text,'Due 1 Oct 2027.');}
 else{
  once(text,state==='no-change'?'Includes your simulated activity.':'This simulated withdrawal is included in the balance above.');
  once(text,'This is what happened in your simulation. It doesn’t tell you what will happen next.');
  if(state==='no-change')once(text,'No changes since your last visit');
 }
}
for(const [width,scale] of [[1440,1],[390,1],[320,2]])test(`HOME-SOFTHALO-RATESLIDER-BUNDLE-001 AC1 AC2 AC6 ${width}`,async({page},info)=>{
 test.setTimeout(180000);await page.setViewportSize({width,height:1000});
 for(const route of ROUTES)for(const cell of [
  {kind:'own',state:'no-visit',currency:'ZMW'},{kind:'own',state:'returning',currency:'ZMW'},{kind:'own',state:'no-change',currency:'ZMW'},
  {kind:'daniel',state:'no-visit',currency:'ZMW'},{kind:'sarah',state:'no-visit',currency:'ZMW'},
  ...['KES','NGN','GHS','PHP'].map(currency=>({kind:'own',state:'returning',currency})),
 ]){
  const {kind,state,currency}=cell;await seed(page,state,currency);await page.goto(`${route}${route.includes('?')?'&':'?'}example=${kind}`);
  await page.getByTestId(kind==='own'?'usd-balance':`${kind}-read-figure`).waitFor();await page.evaluate(scale=>document.documentElement.style.fontSize=`${16*scale}px`,scale);
  const chart=page.getByTestId('example-line-chart');await expect(chart).toHaveCount(1);await expect(chart.locator('[data-chart-wash]')).toHaveCount(1);await expect(chart.locator('[data-chart-latest]')).toHaveCount(1);
  const plot=chart.locator('[class*="visualiserPlot"]');await expect(plot).toHaveCSS('height',`${width===1440?180:160*scale}px`);
  await expect(chart.locator('[data-chart-latest]')).toHaveCSS('background-color','rgb(180, 132, 108)');
  await expect(chart.locator('[data-chart-latest]')).toHaveAttribute('aria-hidden','true');
  await expect(chart.locator('[data-chart-wash]')).toHaveCSS('fill','rgb(31, 39, 71)');
  await expect(chart.locator('[data-testid="dashboard-position-line-visit"]')).toHaveCount(kind==='own'&&state!=='no-visit'?1:0);
  if(kind!=='own')expect(await chart.evaluate(n=>n.previousElementSibling?.getAttribute('data-component'))).toBe('HomeHero');
  await retained(page,kind,state);const launcher=page.getByRole('button',{name:'Currency context',exact:true});await expect(launcher).toHaveCount(kind==='sarah'?0:1);
  await expect(page.getByRole('heading',{name:'Currency context',exact:true})).toHaveCount(0);
  const before=await visibleText(page);once(before,MEANING,0);once(before,LIMIT,0);
  const usdFigure=kind==='sarah'?'$1000.00':kind==='daniel'?'$800.00':'$480.00';
  once(before,usdFigure);
  if(kind==='sarah'){await expect(page.getByRole('slider')).toHaveCount(0);continue;}
  await expect(launcher).toHaveAccessibleDescription('Try example exchange rates');expect((await launcher.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  await launcher.click();const dialog=page.getByRole('dialog',{name:'Currency context',exact:true});await expect(dialog).toBeVisible();await expect(page.getByRole('heading',{level:2,name:'Currency context',exact:true})).toHaveCount(1);
  await retained(page,kind,state);const openText=await visibleText(page);once(openText,MEANING);once(openText,LIMIT,currency==='ZMW'?1:0);once(openText,usdFigure,2);
  const slider=dialog.getByRole('slider',{name:'Try an example rate'});await expect(slider).toHaveCount(currency==='ZMW'?1:0);
  const usd=kind==='daniel'?800:480;const rate={ZMW:27,KES:130,NGN:1500,GHS:15,PHP:56}[currency]!;
  const amount=(usd*rate).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});await expect(dialog.getByTestId('currency-rate-figure')).toHaveText(`≈ ${currency} ${amount}`);
  await expect(dialog.getByTestId('currency-rate-figure')).toHaveAttribute('aria-live','polite');
  if(currency==='ZMW'){
   await expect(slider).toHaveAttribute('type','range');await expect(slider).toHaveAttribute('step','1');await expect(slider).toHaveValue('1');await expect(slider).toHaveAttribute('aria-valuetext',`Example rate ZMW 27 per US dollar, about ZMW ${amount}`);
   expect((await slider.boundingBox())!.height).toBeGreaterThanOrEqual(44);
   await slider.focus();await page.keyboard.press('ArrowLeft');await expect(slider).toHaveValue('0');await expect(dialog.getByTestId('currency-rate-figure')).toHaveText(`≈ ZMW ${(usd*24.5).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}`);
   await page.keyboard.press('ArrowRight');await page.keyboard.press('ArrowRight');await expect(slider).toHaveValue('2');await expect(dialog.getByTestId('currency-rate-figure')).toHaveText(`≈ ZMW ${(usd*29.5).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}`);
   await expect(dialog.getByTestId('currency-rate-figure')).toHaveCSS('transition-duration','0s');
  }else{once(openText,`Example rate: ${currency} ${rate.toLocaleString('en-US')} per US dollar. Not a live rate.`);expect(await dialog.innerText()).not.toMatch(/ZMW|forecast|Three example rates/);}
  const summary=dialog.locator('summary');await summary.focus();await page.keyboard.press('Enter');await expect(dialog.getByText(CALC,{exact:true})).toBeVisible();once(await visibleText(page),CALC);
  await page.keyboard.press('Tab');await expect(dialog.getByRole('button',{name:'Back to Home'})).toBeFocused();await page.keyboard.press('Shift+Tab');await expect(summary).toBeFocused();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(1);
  expect(await dialog.evaluate(n=>n.scrollWidth-n.clientWidth)).toBeLessThanOrEqual(1);
  if(route===ROUTES[0]&&currency==='ZMW'&&state==='no-visit')await page.screenshot({path:info.outputPath(`${kind}-${width}-modal.png`),fullPage:true});
  await page.keyboard.press('Escape');await expect(dialog).not.toBeVisible();await expect(launcher).toBeFocused();await retained(page,kind,state);
  await launcher.click();if(currency==='ZMW')await expect(slider).toHaveValue('1');await page.keyboard.press('Escape');
 }
});
test('HOME-SOFTHALO-RATESLIDER-BUNDLE-001 AC3 AC4',async({page})=>{
 await seed(page,'no-visit');await page.goto('/dashboard-synthetic-journey?example=daniel');
 const launcher=page.getByRole('button',{name:'Currency context',exact:true});await launcher.click();
 const slider=page.getByRole('slider',{name:'Try an example rate'});await expect(slider).toHaveValue('1');
 await expect(slider).toHaveAttribute('aria-valuetext','Example rate ZMW 27 per US dollar, about ZMW 21,600.00');
 await slider.focus();await page.keyboard.press('ArrowLeft');await expect(page.getByTestId('currency-rate-figure')).toHaveText('≈ ZMW 19,600.00');
 await page.keyboard.press('ArrowRight');await page.keyboard.press('ArrowRight');await expect(page.getByTestId('currency-rate-figure')).toHaveText('≈ ZMW 23,600.00');
 await page.keyboard.press('Escape');await expect(launcher).toBeFocused();await launcher.click();await expect(slider).toHaveValue('1');
});
