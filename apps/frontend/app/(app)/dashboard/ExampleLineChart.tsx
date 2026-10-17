'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { balanceAt, formatUsd, type PositionEntry } from '../../../lib/state/last-visit';
import { formatLocalCurrency } from '../../../lib/utils/money';
import { countChanges, formatEventDate, mergeDots, placeLabels, selectLabels, type BalanceSample, type ChartEvent } from './lineLabels';
import type { DanielRead } from '../../../lib/engine/daniel-read';
import home from './synthetic-home.module.css';

/** §389: decorative reading-derived geometry; the consumer supplies the text alternative. */
function ReadingsLine({ reads }: { reads: readonly Pick<DanielRead, 'asOf' | 'localAmountZmwMinor'>[] }) {
  if (reads.length === 0 || reads.some(read => !Number.isFinite(read.localAmountZmwMinor) || !Number.isFinite(Date.parse(read.asOf)))) {
    throw new RangeError('ExampleLineChart needs non-empty finite readings');
  }
  const values = reads.map(read => read.localAmountZmwMinor);
  const minimum = Math.min(...values);
  const maximum = Math.max(...values);
  // Normalize geometry before padding so even extreme finite readings stay finite.
  const scale = Math.max(Math.abs(minimum), Math.abs(maximum), 1);
  const low = minimum / scale;
  const high = maximum / scale;
  const padding = high === low ? Math.max(Math.abs(low) * 0.1, 1 / scale) : (high - low) * 0.1;
  const lower = low - padding;
  const span = high + padding - lower;
  const first = Date.parse(reads[0].asOf);
  const elapsed = Date.parse(reads[reads.length - 1].asOf) - first;
  const points = reads.map(read => ({
    x: elapsed === 0 ? 6 : 6 + (Date.parse(read.asOf) - first) / elapsed * 288,
    y: 94 - (read.localAmountZmwMinor / scale - lower) / span * 88,
  }));
  const path = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');
  return (
    <div className={home.exampleLineChart} aria-hidden="true" data-testid="example-line-chart">
      <svg className={home.exampleLinePlot} viewBox="0 0 300 100" preserveAspectRatio="none" focusable="false">
        <path d={path} fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        {points.map((point, index) => <circle key={index} cx={point.x} cy={point.y} r="3" fill="currentColor" />)}
      </svg>
    </div>
  );
}

// §391: exact default Home compatibility; same geometry, markup and settle inputs.
const WIDTH = 1000;
const HEIGHT = 160;
const TOP = 24;
const BOTTOM = 8;

/** Centre the label on the marker, but keep it inside the plot near either edge. */
function visitLabelStyle(ratio: number) {
  if (ratio < 0.2) return { left: `${ratio * 100}%`, transform: 'none' };
  if (ratio > 0.8) return { right: `${(1 - ratio) * 100}%`, transform: 'none' };
  return { left: `${ratio * 100}%` };
}

type LineEvent = { kind: 'entry'; entry: PositionEntry } | { kind: 'visit'; at: number };

/**
 * HOME-EXPERIENCE-001 T3 position line, with HOME-SMALL-FIXES-001 (§355):
 * no max guide, max label, or axis dates. Derived only from completed ledger
 * entries (Activity order) and the last-visit value. Events are evenly spaced;
 * the line after the last visit uses the emphasis colour. Decorative for
 * assistive technology: the Observation states the same facts in words.
 */
function LegacyLine({ entries, lastVisit, settle = 1, visitLabel = 'Your last visit' }: LegacyProps) {
  if (entries.length === 0) {
    return (
      <div className={home.positionLineEmpty} data-testid="dashboard-position-line" data-state="empty">
        <span className={home.positionLineRing} aria-hidden="true" />
        <p>Your line starts with your first deposit</p>
      </div>
    );
  }

  const events: LineEvent[] = entries.map((entry) => ({ kind: 'entry', entry }));
  if (lastVisit !== null) {
    const index = events.findIndex((event) => event.kind === 'entry' && event.entry.at > lastVisit);
    events.splice(index === -1 ? events.length : index, 0, { kind: 'visit', at: lastVisit });
  }

  const max = Math.max(...entries.map((entry) => entry.balanceAfter), 0);
  const seen = lastVisit !== null ? balanceAt(entries, lastVisit) : 0;
  const level = (entry: PositionEntry) =>
    lastVisit !== null && entry.at > lastVisit ? seen + (entry.balanceAfter - seen) * settle : entry.balanceAfter;
  const y = (value: number) =>
    max === 0 ? HEIGHT - BOTTOM : TOP + (1 - value / max) * (HEIGHT - TOP - BOTTOM);
  const x = (index: number) => ((index + 1) / (events.length + 1)) * WIDTH;

  const before: string[] = [`M 0 ${y(0)}`];
  const after: string[] = [];
  const dots: { x: number; y: number }[] = [];
  let visitX: number | null = null;
  let current = 0;
  let target = before;

  events.forEach((event, index) => {
    const ex = x(index);
    if (event.kind === 'visit') {
      target.push(`H ${ex}`);
      visitX = ex;
      target = after;
      target.push(`M ${ex} ${y(current)}`);
      return;
    }
    target.push(`H ${ex}`, `V ${y(level(event.entry))}`);
    current = level(event.entry);
    dots.push({ x: ex, y: y(current) });
  });
  target.push(`H ${WIDTH}`);

  const area = `${[...before, ...after.filter((step) => !step.startsWith('M'))].join(' ')} V ${HEIGHT} H 0 Z`;
  const pct = (value: number, total: number) => `${(value / total) * 100}%`;

  return (
    <div className={home.positionLine} data-testid="dashboard-position-line" data-state="line" aria-hidden="true">
      <div className={home.positionLinePlot}>
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio="none" focusable="false">
          <path className={home.positionLineArea} d={area} />
          <path className={home.positionLineBefore} d={before.join(' ')} vectorEffect="non-scaling-stroke" />
          {after.length ? <path className={home.positionLineAfter} d={after.join(' ')} vectorEffect="non-scaling-stroke" /> : null}
          {visitX !== null ? (
            <line className={home.positionLineVisit} x1={visitX} x2={visitX} y1="0" y2={HEIGHT} vectorEffect="non-scaling-stroke" />
          ) : null}
        </svg>
        {dots.map((dot, index) => (
          <span
            key={index}
            className={index === dots.length - 1 ? home.positionLineDotCurrent : home.positionLineDot}
            style={{ left: pct(dot.x, WIDTH), top: pct(dot.y, HEIGHT) }}
          />
        ))}
        {visitX !== null ? (
          <span
            className={home.positionLineVisitLabel}
            style={visitLabelStyle(visitX / WIDTH)}
            data-testid="dashboard-position-line-visit"
          >
            {visitLabel}
          </span>
        ) : null}
      </div>
    </div>
  );
}


type ChartProps =
  | { mode?: 'readings'; reads: readonly Pick<DanielRead, 'asOf' | 'localAmountZmwMinor'>[] }
  | ({ mode: 'legacy' } & LegacyProps)
  | { mode: 'step'; series: readonly BalanceSample[]; events: readonly ChartEvent[]; lastVisit?: number | null; settle?: number; example?: boolean; heroAmount?: number };

type LegacyProps = { entries: PositionEntry[]; lastVisit: number | null; settle?: number; visitLabel?: string };

/** One shared chart entry point; new interactions are explicitly journey-only. */
export function ExampleLineChart(props: ChartProps) {
  if (props.mode === 'step') return <ActivityLine {...props} />;
  if (props.mode === 'legacy') return <LegacyLine {...props} />;
  return <ReadingsLine reads={props.reads} />;
}

function ActivityLine({ series, events, lastVisit = null, settle = 1, example = false, heroAmount }: Extract<ChartProps, { mode: 'step' }>) {
  const plot = useRef<HTMLDivElement>(null);
  const listId = useId();
  const [size, setSize] = useState({ plot: 300, screen: 1440, gutter: 12 });
  const [opened, setOpened] = useState(example);
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const measure = () => {
      const next = {
        plot: plot.current?.getBoundingClientRect().width || 300,
        screen: window.innerWidth,
        gutter: (parseFloat(window.getComputedStyle(document.documentElement).fontSize) || 16) * 0.75,
      };
      setSize(previous => previous.plot === next.plot && previous.screen === next.screen && previous.gutter === next.gutter ? previous : next);
    };
    measure(); window.addEventListener('resize', measure);
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);
    if (plot.current) observer?.observe(plot.current);
    return () => { window.removeEventListener('resize', measure); observer?.disconnect(); };
  }, []);
  if (!series.length || series.some(point => !Number.isFinite(point.value) || !Number.isFinite(Date.parse(point.at)))) {
    throw new RangeError('ExampleLineChart needs non-empty finite readings');
  }
  const firstDeposit = events.find(event => event.kind === 'deposit');
  const firstIndex = series.findIndex(point => lastVisit !== null && Date.parse(point.at) > lastVisit);
  const visitIndex = lastVisit === null ? -1 : firstIndex < 0 ? series.length : firstIndex;
  const slots = series.length + (lastVisit === null ? 0 : 1);
  // Keep the complete 1.5rem tap target inside the plot, including enlarged text.
  const gutter = Math.min(size.plot / 2, size.gutter) / size.plot * 300;
  const x = (index: number) => slots <= 1 ? gutter : gutter + index / (slots - 1) * (300 - gutter * 2);
  const seen = series.filter(point => lastVisit !== null && Date.parse(point.at) <= lastVisit).at(-1)?.value ?? 0;
  const values = series.map(point => lastVisit !== null && Date.parse(point.at) > lastVisit ? seen + (point.value - seen) * settle : point.value);
  // Match reading-derived padding, without a zero floor or fabricated initial balance.
  const scale = Math.max(...series.map(point => Math.abs(point.value)), 1);
  const low = Math.min(...series.map(point => point.value / scale), ...(lastVisit === null ? [] : [seen / scale]));
  const high = Math.max(...series.map(point => point.value / scale), ...(lastVisit === null ? [] : [seen / scale]));
  const padding = high === low ? Math.max(Math.abs(low) * 0.1, 1 / scale) : (high - low) * 0.1;
  const y = (value: number) => 94 - (value / scale - low + padding) / (high - low + padding * 2) * 88;
  const points = series.map((point, index) => ({ ...point, x: x(index + (visitIndex >= 0 && index >= visitIndex ? 1 : 0)), y: y(values[index]) }));
  const path = points.map((point, index) => index === 0 ? `M ${point.x} ${point.y}` : `H ${point.x} V ${point.y}`).join(' ');
  const located = events.filter(event => event.kind !== 'reading').map(event => {
    const point = points.find(point => Date.parse(point.at) === event.at)!;
    return { ...event, x: (point.x / 300) * size.plot, y: point.y };
  });
  const groups = mergeDots(located);
  const labels = placeLabels(selectLabels(located, lastVisit, size.screen), size.plot);
  const title = example ? 'All changes · example dates' : 'All changes';
  const reveal = (id: string) => { setActive(id); setOpened(true); };
  const rowParts = (event: ChartEvent) => {
    if (event.kind === 'reading') return { prefix: event.prefix ?? '', suffix: event.suffix ?? '' };
    const first = event.id === firstDeposit?.id;
    const defers = !example && first && events.length === 1 && event.amount === heroAmount;
    const name = first ? 'First deposit' : event.kind === 'deposit' ? 'Deposit' : 'Withdrawal';
    if (defers) return { prefix: `${name} · `, suffix: ' · shown above' };
    const amount = event.currency === 'ZMW' ? formatLocalCurrency(event.amount!, event.currency) : formatUsd(event.amount!);
    return { prefix: `${name} ${event.kind === 'withdrawal' ? '−' : '+'}${amount} · `, suffix: '' };
  };
  return (
    <div className={home.visualiser} data-testid="example-line-chart">
      <div ref={plot} className={home.visualiserPlot}>
        <svg className={home.visualiserSvg} aria-hidden="true" viewBox="0 0 300 100" preserveAspectRatio="none" focusable="false">
          <path className={home.visualiserWash} data-chart-wash d={`${path} V 100 H ${points[0].x} Z`} />
          <path d={path} fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          {points.map((point, index) => <g key={index} transform={`translate(${point.x} ${point.y})`} data-series-at={point.at} data-series-value={point.value} data-series-y={point.y} data-series-currency={point.currency} />)}
          {lastVisit !== null ? <line x1={x(visitIndex)} x2={x(visitIndex)} y1="0" y2="100" className={home.visualiserVisitLine} vectorEffect="non-scaling-stroke" /> : null}
        </svg>
        {groups.map(group => {
          const first = group.events[0];
          const deposit = group.events.some(event => event.id === firstDeposit?.id);
          const merged = group.events.length > 1 ? `${group.events.length} changes on ${formatEventDate(first.at, example, false)}` : '';
          const name = deposit ? `First deposit, ${formatEventDate(firstDeposit!.at, example, false)}${merged ? ` · ${merged}` : ''}` : merged || countChanges(1, false);
          return <button key={first.id} type="button" data-testid="chart-event-dot" className={home.visualiserDot} style={{ left: `clamp(.75rem, ${group.x / size.plot * 100}%, calc(100% - .75rem))`, top: `${first.y}%` }} aria-label={name} aria-describedby={group.events.map(event => `${listId}-${event.id}`).join(' ')} aria-controls={listId} aria-expanded={opened} onFocus={() => reveal(first.id)} onClick={() => reveal(first.id)}>{group.events.length > 1 ? group.events.length : null}</button>;
        })}
        <span aria-hidden="true" data-chart-latest className={home.visualiserLatest} style={{ left: `${points.at(-1)!.x / 3}%`, top: `${points.at(-1)!.y}%` }} />
        {labels.map(label => <span key={label.id} className={home.visualiserLabel} data-chart-label data-placement={label.placement} style={{ left: `${label.left / size.plot * 100}%`, maxWidth: `${label.width}px`, top: `${located.find(event => event.id === label.id)?.y ?? 50}%`, transform: label.placement === 'below' ? `translateY(${1 + label.lane * 3}rem)` : undefined }}>{label.text}</span>)}
        {lastVisit !== null ? <span className={home.visualiserVisit} data-testid="dashboard-position-line-visit" style={{ left: `${Math.min(80, x(visitIndex) / 3)}%` }}>Your last visit</span> : null}
      </div>
      <div className={home.visualiserHeading}><button type="button" className={home.visualiserToggle} aria-expanded={opened} aria-controls={listId} onClick={() => setOpened(!opened)}>{title}</button></div>
      <ol id={listId} data-testid="chart-event-list" className={opened ? home.visualiserList : 'sr-only'}>
        {events.map(event => {
          const parts = rowParts(event);
          return <li key={event.id} id={`${listId}-${event.id}`} data-testid={event.testId} data-active={event.id === active ? 'true' : undefined}>{parts.prefix}<time dateTime={new Date(event.at).toISOString()}>{formatEventDate(event.at, example)}</time>{parts.suffix}</li>;
        })}
      </ol>
      {!firstDeposit ? <div className={home.visualiserEndpoints}><span>First entry</span><span>Latest entry</span></div> : null}
    </div>
  );
}
