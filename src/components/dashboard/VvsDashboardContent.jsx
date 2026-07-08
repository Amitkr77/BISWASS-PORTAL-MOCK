import { Link } from 'react-router-dom';
import VerticalBarChart from './VerticalBarChart';
import { VVS_TOTALS, VVS_DISTRICT_DATA } from '../../services/data/vvsData';
import { fmtIN } from '../../utils/format';

const STAT_CARDS = [
  { label: 'Districts Covered', value: VVS_TOTALS.districtsCovered },
  { label: 'Blocks Covered', value: VVS_TOTALS.blocksCovered },
  { label: 'Individuals Covered', value: VVS_TOTALS.individualsCovered }
];

export default function VvsDashboardContent() {
  return (
    <div className="max-w-7xl mx-auto px-4 pb-10">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {STAT_CARDS.map((stat) => (
          <div key={stat.label} className="kpi-card">
            <p className="kpi-label">{stat.label}</p>
            <p className="kpi-value">{fmtIN(stat.value)}</p>
          </div>
        ))}
      </div>

      <div className="info-card">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h3 className="font-semibold text-govt-blue-dark">District Wise Individuals Covered</h3>
          <Link to="/dashboard/vvs/districts-report" className="text-sm font-semibold text-govt-blue hover:underline">
            More Details &rarr;
          </Link>
        </div>
        <VerticalBarChart
          labels={VVS_DISTRICT_DATA.map((d) => d.district)}
          values={VVS_DISTRICT_DATA.map((d) => d.value)}
          legendLabel="Family Achievement"
          ariaLabel="District Wise Individuals Covered under Vay Vandana Scheme, all 75 districts of Uttar Pradesh. Use More Details for the full data table."
        />
      </div>
    </div>
  );
}
