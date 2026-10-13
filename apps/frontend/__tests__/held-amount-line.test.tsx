// @vitest-environment jsdom
import React from 'react';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { afterEach, expect, test } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { DANIEL_HOME_TIMELINE } from '../lib/state/daniel-home-fixture';
(globalThis as typeof globalThis & {React:typeof React}).React=React;
afterEach(cleanup);
async function component(){
  expect(existsSync(resolve(__dirname,'../app/(app)/dashboard/HeldAmountLine.tsx')), '§377 HeldAmountLine is absent before runtime').toBe(true);
  const path='../app/(app)/dashboard/HeldAmountLine'; return (await import(path)).HeldAmountLine;
}
test('HeldAmountLine starts at the first observation on a fixed zero-based scale',async()=>{
  const HeldAmountLine=await component();
  expect(DANIEL_HOME_TIMELINE.map(r=>[r.asOf,r.localAmountZmwMinor])).toEqual([
    ['2026-09-09T00:00:00.000Z',1960000],['2026-09-25T00:00:00.000Z',2360000],['2026-10-09T00:00:00.000Z',2160000]]);
  for(const width of [1440,390,320]){
    const view=render(<div style={{width}}><HeldAmountLine reads={DANIEL_HOME_TIMELINE}/></div>);
    const graphic=screen.getByTestId('held-amount-line'); const svg=graphic.querySelector('svg')!;
    expect(graphic.getAttribute('aria-hidden')).toBe('true'); expect(svg.getAttribute('focusable')).toBe('false');
    expect(svg.getAttribute('viewBox')).toBe('0 0 300 100');
    const dots=Array.from(svg.querySelectorAll('circle')); expect(dots).toHaveLength(3);
    const xs=dots.map(n=>Number(n.getAttribute('cx'))),ys=dots.map(n=>Number(n.getAttribute('cy')));
    expect(xs).toEqual([6,159.6,294]);
    [1960000,2360000,2160000].forEach((value,i)=>expect((94-ys[i])/88).toBeCloseTo(value/3000000,10));
    expect((xs[1]-xs[0])/(xs[2]-xs[0])).toBeCloseTo(16/30,10);
    const path=svg.querySelector('path')!;expect(svg.querySelectorAll('path')).toHaveLength(1);
    const commands=path.getAttribute('d')!;expect(commands.match(/[ML]/g)).toEqual(['M','L','L']);expect(commands).not.toMatch(/[ZCHVQAST]/i);
    const coordinates=commands.match(/-?\d+(?:\.\d+)?/g)!.map(Number);
    expect(coordinates).toEqual(xs.flatMap((x,i)=>[x,ys[i]]));
    expect(path.getAttribute('fill')).toBe('none');expect(path.getAttribute('stroke-dasharray')).toBeNull();
    expect(new Set(dots.map(n=>n.getAttribute('r'))).size).toBe(1);
    expect(graphic.textContent).toBe('K0K30,000');
    expect(svg.querySelectorAll('line, rect, polygon, animate, title, desc, a, [tabindex]')).toHaveLength(0);
    view.unmount();
  }
});
test('Out-of-domain points stop rather than clip or invent a scale',async()=>{
  const HeldAmountLine=await component();
  for(const value of [-1,3000001]) expect(()=>render(<HeldAmountLine reads={DANIEL_HOME_TIMELINE.map((r,i)=>i===1?{...r,localAmountZmwMinor:value}:r)}/>)).toThrow(/domain/i);
  for(const value of [0,3000000]) {const view=render(<HeldAmountLine reads={DANIEL_HOME_TIMELINE.map((r,i)=>i===1?{...r,localAmountZmwMinor:value}:r)}/>);
    expect(Number(screen.getByTestId('held-amount-line').querySelectorAll('circle')[1].getAttribute('cy'))).toBe(value===0?94:6);view.unmount();}
});
