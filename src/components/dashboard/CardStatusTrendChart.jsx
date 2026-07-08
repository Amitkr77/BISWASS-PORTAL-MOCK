import { useMemo } from 'react';
import { Chart } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  BarController,
  LineElement,
  LineController,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(BarElement, BarController, LineElement, LineController, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

function fmt(n) {
  return n.toLocaleString('en-IN');
}

/** Stacked achievement/left-over bars with a target line overlay, district wise.
 *  Wrapped in a horizontally scrollable container with a minimum bar width so the
 *  ~75 district labels stay legible on narrow screens instead of squeezing unreadable. */
export default function CardStatusTrendChart({
  labels,
  achievement,
  leftover,
  target,
  achievementLabel,
  leftoverLabel,
  targetLabel,
  achievementColor,
  leftoverColor,
  targetColor,
  ariaLabel
}) {
  const data = useMemo(() => ({
    labels,
    datasets: [
      {
        type: 'bar',
        label: achievementLabel,
        data: achievement,
        backgroundColor: achievementColor,
        stack: 'total',
        maxBarThickness: 22,
        order: 2
      },
      {
        type: 'bar',
        label: leftoverLabel,
        data: leftover,
        backgroundColor: leftoverColor,
        stack: 'total',
        maxBarThickness: 22,
        order: 2
      },
      {
        type: 'line',
        label: targetLabel,
        data: target,
        borderColor: targetColor,
        backgroundColor: targetColor,
        pointBackgroundColor: targetColor,
        pointRadius: 3,
        borderWidth: 2,
        tension: 0.3,
        order: 1
      }
    ]
  }), [labels, achievement, leftover, target, achievementLabel, leftoverLabel, targetLabel, achievementColor, leftoverColor, targetColor]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: 'top', align: 'start', labels: { boxWidth: 14, color: '#3d4650', font: { size: 12 } } },
      tooltip: { callbacks: { label: (ctx) => `${ctx.dataset.label}: ${fmt(ctx.parsed.y)}` } }
    },
    scales: {
      x: { stacked: true, grid: { display: false }, ticks: { autoSkip: false, maxRotation: 60, minRotation: 60, font: { size: 9 }, color: '#5a6472' } },
      y: { stacked: true, beginAtZero: true, ticks: { callback: (value) => fmt(value), font: { size: 10 } }, grid: { color: '#e1e0d9' } }
    }
  }), []);

  const minWidth = labels.length > 20 ? Math.min(labels.length * 12, 900) : undefined;

  return (
    <div className="overflow-x-auto">
      <div style={{ height: '420px', minWidth: minWidth ? `${minWidth}px` : undefined }}>
        <Chart type="bar" data={data} options={options} role="img" aria-label={ariaLabel} />
      </div>
    </div>
  );
}
