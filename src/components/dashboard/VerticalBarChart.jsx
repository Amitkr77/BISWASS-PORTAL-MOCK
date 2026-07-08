import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function fmt(n) {
  return n.toLocaleString('en-IN');
}

export default function VerticalBarChart({ labels, values, color = '#155ba6', legendLabel, yAxisLabel, ariaLabel }) {
  const data = useMemo(() => ({
    labels,
    datasets: [{ label: legendLabel, data: values, backgroundColor: color, borderRadius: 2, maxBarThickness: 22 }]
  }), [labels, values, color, legendLabel]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: 'top', align: 'start', labels: { boxWidth: 14, color: '#3d4650', font: { size: 12 } } },
      tooltip: { callbacks: { label: (ctx) => fmt(ctx.parsed.y) } }
    },
    scales: {
      x: { grid: { display: false }, ticks: { autoSkip: false, maxRotation: 60, minRotation: 60, font: { size: 9 }, color: '#5a6472' } },
      y: {
        beginAtZero: true,
        ticks: { callback: (value) => fmt(value), font: { size: 10 } },
        grid: { color: '#e1e0d9' },
        title: yAxisLabel ? { display: true, text: yAxisLabel, color: '#3d4650', font: { size: 11 } } : undefined
      }
    }
  }), [yAxisLabel]);

  // Many categories (e.g. all-district charts) squeeze into unreadable slivers on
  // narrow screens; give them a scrollable minimum width instead of shrinking bars
  // past legibility. Chosen so it stays under typical desktop container widths
  // (no scrollbar there) while forcing a comfortable scroll on phones/tablets.
  const minWidth = labels.length > 20 ? Math.min(labels.length * 12, 900) : undefined;

  return (
    <div className="overflow-x-auto">
      <div style={{ height: '460px', minWidth: minWidth ? `${minWidth}px` : undefined }}>
        <Bar data={data} options={options} role="img" aria-label={ariaLabel} />
      </div>
    </div>
  );
}
