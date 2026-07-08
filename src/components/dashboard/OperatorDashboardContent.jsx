import { Link } from 'react-router-dom';
import VerticalBarChart from './VerticalBarChart';
import { OPERATOR_TOTALS, OPERATOR_DISTRICT_DATA } from '../../services/data/operatorData';
import { fmtIN } from '../../utils/format';

const STAT_CARDS = [
  { label: 'Districts', value: OPERATOR_TOTALS.districtsCovered },
  { label: 'Operators', value: OPERATOR_TOTALS.operators },
  { label: 'Card Requests', value: OPERATOR_TOTALS.cardRequests },
  { label: 'Card Approved', value: OPERATOR_TOTALS.cardApproved, className: 'text-govt-green' }
];

export default function OperatorDashboardContent() {
  return (
    <div className="max-w-7xl mx-auto px-4 pb-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {STAT_CARDS.map((stat) => (
          <div key={stat.label} className="kpi-card">
            <p className="kpi-label">{stat.label}</p>
            <p className={`kpi-value ${stat.className || ''}`}>{fmtIN(stat.value)}</p>
          </div>
        ))}
      </div>

      <div className="info-card">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h3 className="font-semibold text-govt-blue-dark">District wise Operators</h3>
          <Link to="/dashboard/operator/districts-report" className="text-sm font-semibold text-govt-blue hover:underline">
            More Details &rarr;
          </Link>
        </div>
        <VerticalBarChart
          labels={OPERATOR_DISTRICT_DATA.map((d) => d.district)}
          values={OPERATOR_DISTRICT_DATA.map((d) => d.value)}
          legendLabel="Total Operators"
          yAxisLabel="Number of Operators"
          ariaLabel="District wise Operators, all 75 districts of Uttar Pradesh. Use More Details for the full data table."
        />
      </div>
    </div>
  );
}
