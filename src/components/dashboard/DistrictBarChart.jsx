import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);

function fmt(n) {
  return n.toLocaleString('en-IN');
}

export default function DistrictBarChart({ labels, values, color, ariaLabel }) {
  const data = useMemo(() => ({
    labels,
    datasets: [{ label: 'Value', data: values, backgroundColor: color, borderRadius: 4, maxBarThickness: 22 }]
  }), [labels, values, color]);

  const options = useMemo(() => ({
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: (ctx) => fmt(ctx.parsed.x) } }
    },
    scales: {
      x: { beginAtZero: true, ticks: { callback: (value) => fmt(value), font: { size: 10 } }, grid: { color: '#e1e0d9' } },
      y: { grid: { display: false }, ticks: { font: { size: 10 } } }
    }
  }), []);

  const height = Math.max(320, labels.length * 20 + 40);

  return (
    <div style={{ height: `${height}px` }}>
      <Bar data={data} options={options} role="img" aria-label={ariaLabel} />
    </div>
  );
}
