import type { DanielRead } from '../../../lib/engine/daniel-read';
import home from './synthetic-home.module.css';

/** §389: decorative reading-derived geometry; the consumer supplies the text alternative. */
export function ExampleLineChart({ reads }: { reads: readonly Pick<DanielRead, 'asOf' | 'localAmountZmwMinor'>[] }) {
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
