// @vitest-environment jsdom
import React from 'react';
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { afterEach, expect, test } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { DANIEL_HOME_TIMELINE } from '../lib/state/daniel-home-fixture';
import { PositionLine } from '../app/(app)/dashboard/PositionLine';
(globalThis as typeof globalThis & {React:typeof React}).React=React;
afterEach(cleanup);
async function component(){
  expect(existsSync(resolve(__dirname,'../app/(app)/dashboard/ExampleLineChart.tsx')), '§377 ExampleLineChart is absent before runtime').toBe(true);
  const path='../app/(app)/dashboard/ExampleLineChart'; return (await import(path)).ExampleLineChart;
}
test('ExampleLineChart starts at the first observation on a padded reading-derived scale',async()=>{
  const ExampleLineChart=await component();
  expect(DANIEL_HOME_TIMELINE.map(r=>[r.asOf,r.localAmountZmwMinor])).toEqual([
    ['2026-09-09T00:00:00.000Z',1960000],['2026-09-25T00:00:00.000Z',2360000],['2026-10-09T00:00:00.000Z',2160000]]);
  for(const width of [1440,390,320]){
    const view=render(<div style={{width}}><ExampleLineChart reads={DANIEL_HOME_TIMELINE}/></div>);
    const graphic=screen.getByTestId('example-line-chart'); const svg=graphic.querySelector('svg')!;
    expect(graphic.getAttribute('aria-hidden')).toBe('true'); expect(svg.getAttribute('focusable')).toBe('false');
    expect(svg.getAttribute('viewBox')).toBe('0 0 300 100');
    const dots=Array.from(svg.querySelectorAll('circle')); expect(dots).toHaveLength(3);
    const xs=dots.map(n=>Number(n.getAttribute('cx'))),ys=dots.map(n=>Number(n.getAttribute('cy')));
    expect(xs).toEqual([6,159.6,294]);
    expect(ys.every(Number.isFinite)).toBe(true); expect(ys[1]).toBeLessThan(ys[2]); expect(ys[2]).toBeLessThan(ys[0]);
    expect(Math.min(...ys)).toBeGreaterThan(6); expect(Math.max(...ys)).toBeLessThan(94);
    expect((xs[1]-xs[0])/(xs[2]-xs[0])).toBeCloseTo(16/30,10);
    const path=svg.querySelector('path')!;expect(svg.querySelectorAll('path')).toHaveLength(1);
    const commands=path.getAttribute('d')!;expect(commands.match(/[ML]/g)).toEqual(['M','L','L']);expect(commands).not.toMatch(/[ZCHVQAST]/i);
    const coordinates=commands.match(/-?\d+(?:\.\d+)?/g)!.map(Number);
    expect(coordinates).toEqual(xs.flatMap((x,i)=>[x,ys[i]]));
    expect(path.getAttribute('fill')).toBe('none');expect(path.getAttribute('stroke-dasharray')).toBeNull();
    expect(new Set(dots.map(n=>n.getAttribute('r'))).size).toBe(1);
    expect(graphic.textContent).toBe('');
    expect(svg.querySelectorAll('line, rect, polygon, animate, title, desc, a, [tabindex]')).toHaveLength(0);
    view.unmount();
  }
});
test('T6 chart-no-throw-above-K30000 and finite degenerate geometry',async()=>{
  const ExampleLineChart=await component();
  for(const value of [-1,0,3000000,3000001,100000000]) {
    const view=render(<ExampleLineChart reads={DANIEL_HOME_TIMELINE.map((r,i)=>i===1?{...r,localAmountZmwMinor:value}:r)}/>);
    for(const dot of screen.getByTestId('example-line-chart').querySelectorAll('circle')) {
      expect(Number.isFinite(Number(dot.getAttribute('cy')))).toBe(true);
      expect(Number(dot.getAttribute('cy'))).toBeGreaterThanOrEqual(6);
      expect(Number(dot.getAttribute('cy'))).toBeLessThanOrEqual(94);
    }
    view.unmount();
  }
  for(const reads of [[DANIEL_HOME_TIMELINE[0]], DANIEL_HOME_TIMELINE.map(r=>({...r,asOf:DANIEL_HOME_TIMELINE[0].asOf,localAmountZmwMinor:0}))]) {
    const view=render(<ExampleLineChart reads={reads}/>);
    expect(screen.getByTestId('example-line-chart').querySelector('path')!.getAttribute('d')).not.toMatch(/NaN|Infinity/);
    expect(Number(screen.getByTestId('example-line-chart').querySelector('circle')!.getAttribute('cx'))).toBe(6);
    view.unmount();
  }
});
test('empty and non-finite readings reject instead of clipping or inventing a value',async()=>{
  const ExampleLineChart=await component();
  expect(()=>render(<ExampleLineChart reads={[]}/>)).toThrow(RangeError);
  for(const value of [NaN,Infinity,-Infinity]) expect(()=>render(<ExampleLineChart reads={DANIEL_HOME_TIMELINE.map(r=>({...r,localAmountZmwMinor:value}))}/>)).toThrow(RangeError);
  expect(()=>render(<ExampleLineChart reads={[{...DANIEL_HOME_TIMELINE[0],asOf:'not-a-date'}]}/>)).toThrow(RangeError);
});

test('V12 readings-mode-unchanged and default legacy DOM/geometry/motion', async () => {
  const ExampleLineChart = await component();
  const hash = (node: HTMLElement) => createHash('sha256').update(node.outerHTML.replace(/_([A-Za-z]+)_[a-z0-9]+/g, '$1')).digest('hex');
  const readings = render(<ExampleLineChart reads={DANIEL_HOME_TIMELINE} />);
  expect(hash(screen.getByTestId('example-line-chart'))).toBe('49e0f5591f0850349a2932d37f4860b85f7652cc9698d369cf2a047ccda93691');
  readings.unmount();
  const entries = [
    { id: 'd', type: 'DEPOSIT' as const, amountUSD: 500, at: 1000, balanceBefore: 0, balanceAfter: 500 },
    { id: 'w', type: 'WITHDRAW' as const, amountUSD: 20, at: 3000, balanceBefore: 500, balanceAfter: 480 },
  ];
  for (const settle of [0, 0.5, 1]) {
    const view = render(<PositionLine entries={entries} lastVisit={2000} settle={settle} />);
    expect(hash(screen.getByTestId('dashboard-position-line'))).toBe(new Map([[0, '17542abfe045ea0490a06ab268fdb8cf395102056b026209272bcaa7166395e8'], [0.5, '1f1f4591188bc13d71b449dde318fc56297341568cfe23d14b656ab35c5504d3'], [1, '85d9240498af285828145d2c8b4cb6be4a2bb67c671d58893df04f067362beeb']]).get(settle));
    view.unmount();
  }
});
