'use client';

import home from './synthetic-home.module.css';
import { formatShortDate, formatUsd, type PositionEntry } from '../../../lib/state/last-visit';

type PositionLineProps = {
  entries: PositionEntry[];
  lastVisit: number | null;
};

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
 * HOME-EXPERIENCE-001 T3 position line. Derived only from completed ledger
 * entries (Activity order) and the last-visit value. Events are evenly spaced;
 * the line after the last visit uses the emphasis colour. Decorative for
 * assistive technology: the Observation states the same facts in words.
 */
export function PositionLine({ entries, lastVisit }: PositionLineProps) {
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
    target.push(`H ${ex}`, `V ${y(event.entry.balanceAfter)}`);
    current = event.entry.balanceAfter;
    dots.push({ x: ex, y: y(current) });
  });
  target.push(`H ${WIDTH}`);

  const area = `${[...before, ...after.filter((step) => !step.startsWith('M'))].join(' ')} V ${HEIGHT} H 0 Z`;
  const startAt = Math.min(entries[0].at, lastVisit ?? entries[0].at);
  const pct = (value: number, total: number) => `${(value / total) * 100}%`;

  return (
    <div className={home.positionLine} data-testid="dashboard-position-line" data-state="line" aria-hidden="true">
      <div className={home.positionLinePlot}>
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio="none" focusable="false">
          <line className={home.positionLineGuide} x1="0" x2={WIDTH} y1={y(max)} y2={y(max)} vectorEffect="non-scaling-stroke" />
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
        <span className={home.positionLineTop} style={{ top: pct(y(max), HEIGHT) }}>{formatUsd(max)}</span>
        {visitX !== null ? (
          <span
            className={home.positionLineVisitLabel}
            style={visitLabelStyle(visitX / WIDTH)}
            data-testid="dashboard-position-line-visit"
          >
            Your last visit
          </span>
        ) : null}
      </div>
      <div className={home.positionLineAxis}>
        <span>{formatShortDate(startAt)}</span>
        <span>Today</span>
      </div>
    </div>
  );
}
