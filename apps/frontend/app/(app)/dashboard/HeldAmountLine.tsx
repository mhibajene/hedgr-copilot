import type { DanielRead } from '../../../lib/engine/daniel-read';
import home from './synthetic-home.module.css';

/** §377: fixed K0–K30,000 geometry; the consumer supplies the visible text alternative. */
export function HeldAmountLine({ reads }: { reads: readonly Pick<DanielRead, 'asOf' | 'localAmountZmwMinor'>[] }) {
  const domain = 3_000_000;
  if (reads.some((read) => !Number.isFinite(read.localAmountZmwMinor) || read.localAmountZmwMinor < 0 || read.localAmountZmwMinor > domain)) {
    throw new RangeError('HeldAmountLine point outside the fixed domain');
  }
  const first = Date.parse(reads[0].asOf);
  const elapsed = Date.parse(reads[reads.length - 1].asOf) - first;
  const points = reads.map((read) => ({
    x: 6 + (Date.parse(read.asOf) - first) / elapsed * 288,
    y: 94 - read.localAmountZmwMinor / domain * 88,
  }));
  const path = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');

  return (
    <div className={home.heldAmountLine} aria-hidden="true" data-testid="held-amount-line">
      <svg className={home.heldAmountPlot} viewBox="0 0 300 100" preserveAspectRatio="none" focusable="false">
        <path d={path} fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        {points.map((point, index) => <circle key={reads[index].asOf} cx={point.x} cy={point.y} r="3" fill="currentColor" />)}
      </svg>
      <div className={home.heldAmountBounds}><span>K0</span><span>K30,000</span></div>
    </div>
  );
}
