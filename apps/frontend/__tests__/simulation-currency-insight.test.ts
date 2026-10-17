import { describe, expect, test } from 'vitest';
import { computeRateFigure, formatRateCents, ZMW_EXAMPLE_RATES } from '../lib/narrative/simulation-currency-insight';
import { SIMULATION_DISPLAY_CURRENCIES } from '../lib/state/simulation-display-currency';
const figure = (usdAmount = 300, rate = 27, pending = false) => computeRateFigure({ usdAmount, rate, pending });
// HOME-SOFTHALO-RATESLIDER-BUNDLE-001 P1: retired two-date/delta contracts become
// three-stop/fixed-rate controls; decimal, finite, zero/pending and non-mutation stay.
describe('HOME-SOFTHALO-RATESLIDER-BUNDLE-001 AC5', () => {
  test.each([['ZMW',810000n],['KES',3900000n],['NGN',45000000n],['GHS',450000n],['PHP',1680000n]] as const)('fixed %s', (code,cents) => {
    const rate = SIMULATION_DISPLAY_CURRENCIES.find(c => c.code === code)!.unitsPerUsd;
    expect(figure(300,rate)).toEqual({kind:'figure', cents});
  });
  test.each(SIMULATION_DISPLAY_CURRENCIES)('three stops and fixed $code', ({unitsPerUsd}) => {
    expect(ZMW_EXAMPLE_RATES).toEqual([24.5,27,29.5]);
    expect(ZMW_EXAMPLE_RATES.map(rate => figure(800,rate))).toEqual([1960000n,2160000n,2360000n].map(cents => ({kind:'figure',cents})));
    expect(figure(1,unitsPerUsd)).toEqual({kind:'figure',cents:BigInt(unitsPerUsd*100)});
  });
  test('decimal half cents and tiny amounts', () => {
    expect(figure(1,1.005)).toEqual({kind:'figure',cents:101n});
    expect(figure(1,0.995)).toEqual({kind:'figure',cents:100n});
    expect(figure(0.01,0.2)).toEqual({kind:'figure',cents:0n});
    expect(figure(1e-7,27)).toEqual({kind:'figure',cents:0n});
  });
  test('large finite and formatted integer cents', () => {
    expect(figure(1e21,20)).toEqual({kind:'figure',cents:2000000000000000000000000n});
    expect(figure(Number.MAX_VALUE,Number.MAX_VALUE).kind).toBe('figure');
    expect(formatRateCents(-2250000n)).toBe('22,500.00');
    expect(formatRateCents(1n)).toBe('0.01');expect(formatRateCents(100n)).toBe('1.00');
  });
  test('zero and pending are distinct', () => {
    expect(figure(0)).toEqual({kind:'empty'});
    expect(figure(0,27,true)).toEqual({kind:'unavailable',reason:'Waiting for the simulated position to settle.'});
  });
  test.each([NaN,Infinity,-Infinity,-1])('invalid amount %s', value => {
    expect(figure(value)).toEqual({kind:'unavailable',reason:'The simulated position is unavailable.'});
  });
  test.each([0,-1,NaN,Infinity,-Infinity,null,undefined])('invalid fixed rate %s', rate => {
    expect(figure(300,rate as number)).toEqual({kind:'unavailable',reason:'The latest example rate is unavailable.'});
  });
  test('three distinct positive stops use their own rate', () => {
    expect(ZMW_EXAMPLE_RATES.map(rate => figure(0.01,rate))).toEqual([25n,27n,30n].map(cents=>({kind:'figure',cents})));
    expect(SIMULATION_DISPLAY_CURRENCIES.map(c=>c.unitsPerUsd)).toEqual([27,130,1500,15,56]);
  });
  test('input and stop table are not mutated', () => {
    const input=Object.freeze({usdAmount:800,rate:27,pending:false});
    expect(computeRateFigure(input)).toEqual({kind:'figure',cents:2160000n});
    expect(input).toEqual({usdAmount:800,rate:27,pending:false});expect(Object.isFrozen(ZMW_EXAMPLE_RATES)).toBe(true);
  });
});
