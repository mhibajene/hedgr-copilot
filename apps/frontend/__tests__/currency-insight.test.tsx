// @vitest-environment jsdom
import React from 'react';
import { afterEach, expect, test, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { CurrencyInsight } from '../app/(app)/dashboard/CurrencyInsight';
(globalThis as typeof globalThis & { React: typeof React }).React = React;
const props = {usdAmount:800,currency:'ZMW' as const,latestDisplayRate:27,ready:true};
const limits='Three example rates. Not a live rate and not a forecast.';
const meaning='The dollar amount is the same at each rate. The rate sets the local figure.';
const calculation='Your US dollar amount is multiplied by each example rate and rounded to two decimal places. Deposits, withdrawals, fees and spreads are not included. This is not your account history or live market data. No money moves.';
const original = ['showModal','close'].map(k=>Object.getOwnPropertyDescriptor(HTMLDialogElement.prototype,k));
function open() {
  Object.defineProperty(HTMLDialogElement.prototype,'showModal',{configurable:true,value(){this.open=true;}});
  Object.defineProperty(HTMLDialogElement.prototype,'close',{configurable:true,value(){this.open=false;this.dispatchEvent(new Event('close'));}});
  fireEvent.click(screen.getByRole('button',{name:'Currency context',exact:true}));return screen.getByRole('dialog',{name:'Currency context'});
}
afterEach(()=>{cleanup();vi.restoreAllMocks();['showModal','close'].forEach((key,i)=>{const d=original[i];if(d)Object.defineProperty(HTMLDialogElement.prototype,key,d);else Reflect.deleteProperty(HTMLDialogElement.prototype,key);});});
// HOME-SOFTHALO-RATESLIDER-BUNDLE-001: old arrows/delta/two-date panels are positively
// replaced by native stops/card/limits; readiness, invalid/pending, disclosure,
// storage neutrality, focus and exact meaning protections remain.
test('HOME-SOFTHALO-RATESLIDER-BUNDLE-001 AC3',()=>{
 const writes=vi.spyOn(Storage.prototype,'setItem');render(<CurrencyInsight {...props}/>);const dialog=open();
 expect(within(dialog).getByTestId('currency-rate-card').textContent).toBe('$800.00≈ ZMW 21,600.00');
 expect(within(dialog).getByText(limits)).toBeDefined();expect(within(dialog).getByText(meaning)).toBeDefined();
 const summary=within(dialog).getByText('How this is calculated');const detail=summary.closest('details')!;expect(detail.open).toBe(false);summary.focus();fireEvent.click(summary);expect(detail.open).toBe(true);expect(detail.textContent).toContain(calculation);expect(writes).not.toHaveBeenCalled();
});
test.each([[0,'≈ ZMW 19,600.00'],[1,'≈ ZMW 21,600.00'],[2,'≈ ZMW 23,600.00']] as const)('HOME-SOFTHALO-RATESLIDER-BUNDLE-001 AC5 %s',(stop,figure)=>{
 render(<CurrencyInsight {...props}/>);const dialog=open();fireEvent.change(within(dialog).getByRole('slider'),{target:{value:String(stop)}});expect(within(dialog).getByTestId('currency-rate-figure').textContent).toBe(figure);
});
test('HOME-SOFTHALO-RATESLIDER-BUNDLE-001 AC5 precision',()=>{
 render(<CurrencyInsight {...props} usdAmount={0.01}/>);open();expect(screen.getByTestId('currency-rate-figure').textContent).toBe('≈ ZMW 0.27');expect(document.body.textContent).not.toMatch(/rounded-zero|No exchange-rate difference/);
});
test('HOME-SOFTHALO-RATESLIDER-BUNDLE-001 AC4 readiness',()=>{
 const {rerender}=render(<CurrencyInsight {...props} ready={false}/>);expect(screen.queryByTestId('currency-insight')).toBeNull();
 rerender(<CurrencyInsight {...props} usdAmount={0}/>);expect(screen.getByText('No position to compare yet.')).toBeDefined();
 for(const state of [{pending:true},{usdAmount:NaN},{usdAmount:Infinity},{usdAmount:-1}]){rerender(<CurrencyInsight {...props} {...state}/>);expect(screen.getByText('Currency comparison unavailable.')).toBeDefined();expect(screen.queryByRole('button')).toBeNull();expect(screen.queryByText('How this is calculated')).toBeNull();expect(screen.queryByRole('slider')).toBeNull();}
});
test.each([0,NaN,Infinity,-1])('HOME-SOFTHALO-RATESLIDER-BUNDLE-001 AC4 rate %s',rate=>{
 render(<CurrencyInsight {...props} latestDisplayRate={rate}/>);expect(screen.getByText('The latest example rate is unavailable.')).toBeDefined();expect(screen.queryByRole('button')).toBeNull();
});
test('HOME-SOFTHALO-RATESLIDER-BUNDLE-001 AC4 focus',()=>{
 const writes=vi.spyOn(Storage.prototype,'setItem');render(<CurrencyInsight {...props}/>);const trigger=screen.getByRole('button',{name:'Currency context',exact:true});expect(trigger.textContent).toBe('Currency contextTry example exchange rates');expect(trigger.getAttribute('aria-haspopup')).toBe('dialog');expect(screen.queryByRole('dialog')).toBeNull();open();fireEvent.click(screen.getByRole('button',{name:'Back to Home'}));expect(screen.queryByRole('dialog')).toBeNull();expect(document.activeElement).toBe(trigger);expect(writes).not.toHaveBeenCalled();
});
test('HOME-SOFTHALO-RATESLIDER-BUNDLE-001 AC4 pending',()=>{
 render(<CurrencyInsight {...props} pending/>);expect(screen.getByText('Waiting for the simulated position to settle.')).toBeDefined();expect(screen.queryByRole('button')).toBeNull();expect(document.querySelector('[aria-live]')).toBeNull();
});
test('HOME-SOFTHALO-RATESLIDER-BUNDLE-001 AC3 retirement',()=>{
 render(<CurrencyInsight {...props}/>);const dialog=open();expect(dialog.textContent).not.toMatch(/Day 0|Day 30|30-day|What this does not show|Invented research example|Same USD amount|Different local estimate|yield|today|forecast[^.] /i);expect(dialog.textContent).toContain(meaning);expect(dialog.textContent).toContain(calculation);expect(dialog.textContent).not.toContain('He made two deposits and none since');
});
test('HOME-SOFTHALO-RATESLIDER-BUNDLE-001 AC4 reset',()=>{
 render(<CurrencyInsight {...props}/>);open();fireEvent.change(screen.getByRole('slider'),{target:{value:'2'}});fireEvent.click(screen.getByRole('button',{name:'Back to Home'}));open();expect((screen.getByRole('slider') as HTMLInputElement).value).toBe('1');
});
test.each([['KES',130,'104,000.00'],['NGN',1500,'1,200,000.00'],['GHS',15,'12,000.00'],['PHP',56,'44,800.00']] as const)('HOME-SOFTHALO-RATESLIDER-BUNDLE-001 D1 %s',(currency,rate,amount)=>{
 render(<CurrencyInsight {...props} currency={currency} latestDisplayRate={rate}/>);const dialog=open();expect(dialog.textContent).toContain(`≈ ${currency} ${amount}`);expect(within(dialog).getByText(`Example rate: ${currency} ${rate.toLocaleString('en-US')} per US dollar. Not a live rate.`)).toBeDefined();expect(within(dialog).queryByRole('slider')).toBeNull();expect(dialog.textContent).not.toMatch(/Three example rates|ZMW|forecast/);
});
test('HOME-SOFTHALO-RATESLIDER-BUNDLE-001 D1 once',()=>{
 render(<><p>Example rate: KES 130 per US dollar. Not a live rate.</p><CurrencyInsight {...props} currency="KES" latestDisplayRate={130} rateLineOnHome/></>);open();expect(document.body.textContent!.split('Example rate: KES 130 per US dollar. Not a live rate.')).toHaveLength(2);expect(screen.getByTestId('currency-rate-figure').getAttribute('aria-live')).toBe('polite');expect(screen.getByTestId('currency-rate-figure').getAttribute('aria-atomic')).toBe('true');
});
