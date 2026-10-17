// @vitest-environment jsdom
import React from 'react';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { afterEach, expect, test, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { CurrencyInsight } from '../app/(app)/dashboard/CurrencyInsight';
import { ExampleLineChart } from '../app/(app)/dashboard/ExampleLineChart';
(globalThis as typeof globalThis & {React:typeof React}).React=React;
afterEach(()=>{cleanup();vi.restoreAllMocks();});
const source=(path:string)=>readFileSync(resolve(__dirname,'..',path),'utf8');
test('HOME-SOFTHALO-RATESLIDER-BUNDLE-001 AC3 AC4',()=>{
 Object.defineProperty(HTMLDialogElement.prototype,'showModal',{configurable:true,value(){this.open=true;}});
 render(<CurrencyInsight usdAmount={800} currency="ZMW" latestDisplayRate={27} ready/>);
 fireEvent.click(screen.getByRole('button',{name:'Currency context',exact:true}));
 const dialog=screen.getByRole('dialog');const slider=within(dialog).getByRole('slider',{name:'Try an example rate'}) as HTMLInputElement;
 expect([slider.type,slider.min,slider.max,slider.step,slider.value]).toEqual(['range','0','2','1','1']);
 expect(slider.getAttribute('aria-valuetext')).toBe('Example rate ZMW 27 per US dollar, about ZMW 21,600.00');
 expect(within(dialog).getAllByText(/^ZMW (24\.5|27|29\.5)$/).map(n=>n.textContent)).toEqual(['ZMW 24.5','ZMW 27','ZMW 29.5']);
 const nodes=[screen.getByTestId('currency-rate-card'),slider,within(dialog).getByText('Three example rates. Not a live rate and not a forecast.'),within(dialog).getByRole('heading',{name:'What this means'}),within(dialog).getByText('How this is calculated')];
 nodes.slice(1).forEach((n,i)=>expect(nodes[i].compareDocumentPosition(n)&Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy());
 const figure=screen.getByTestId('currency-rate-figure');expect(figure.getAttribute('aria-live')).toBe('polite');expect(figure.getAttribute('aria-atomic')).toBe('true');
 expect(dialog.querySelectorAll('[role="alert"],progress,meter,[role="progressbar"]')).toHaveLength(0);
 const css=source('app/(app)/dashboard/currency-insight.module.css');expect(css).toContain('height: 44px');expect(css).toContain('prefers-reduced-motion: reduce');expect(css).toContain('transition: none; animation: none');expect(css).not.toMatch(/linear-gradient/);
});
test('HOME-SOFTHALO-RATESLIDER-BUNDLE-001 AC1',()=>{
 render(<ExampleLineChart mode="step" series={[{at:'2026-06-12T00:00:00Z',value:500,currency:'USD'},{at:'2026-08-14T00:00:00Z',value:800,currency:'USD'}]} events={[]} example/>);
 const chart=screen.getByTestId('example-line-chart');const wash=chart.querySelector('[data-chart-wash]')!;
 expect(wash.getAttribute('d')).toMatch(/^M .*H .*V .* V 100 H .* Z$/);expect(chart.querySelectorAll('[data-chart-wash]')).toHaveLength(1);
 const latest=chart.querySelector('[data-chart-latest]')!;expect(latest.getAttribute('aria-hidden')).toBe('true');expect(latest.textContent).toBe('');expect(chart.querySelectorAll('[data-chart-latest]')).toHaveLength(1);
 const css=source('app/(app)/dashboard/synthetic-home.module.css');expect(css).toContain('height: 10rem');expect(css).toContain('@media (min-width: 64rem) { .visualiserPlot { height: 180px; } }');expect(css).toContain('background: #B4846C');
 expect(within(chart).getByRole('heading',{level:2,name:'All changes · example dates'})).toBeDefined();
 expect(chart.querySelector('[data-testid="dashboard-position-line-visit"]')).toBeNull();
});
