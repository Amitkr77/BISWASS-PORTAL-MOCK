import { useMemo, useState } from 'react';
import { UP_DISTRICTS } from '../../utils/upDistricts';
import { OPERATOR_DISTRICT_REPORT } from '../../services/data/operatorData';
import { fmtIN } from '../../utils/format';

function toCsv(rows) {
  const header = ['District', 'Total Operators', 'Active Operators Last 3 Days', 'Total Card Requested', 'Total Card Approved'];
  const lines = [header.join(',')];
  rows.forEach((row) => {
    lines.push([row.district, row.totalOperators, row.activeOperatorsLast3Days, row.totalCardRequested, row.totalCardApproved].join(','));
  });
  return lines.join('\n');
}

function downloadCsv(rows) {
  const blob = new Blob([toCsv(rows)], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'operator-district-report.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/** District wise search/filter/export table for CSC / VLE operator activity.
 *  Shared by the standalone Operator report page and the Operator programme
 *  report tab so both show the same live table instead of a summary teaser. */
export default function OperatorDistrictTable() {
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [appliedDistrict, setAppliedDistrict] = useState('');

  const rows = useMemo(
    () => (appliedDistrict ? OPERATOR_DISTRICT_REPORT.filter((r) => r.district === appliedDistrict) : OPERATOR_DISTRICT_REPORT),
    [appliedDistrict]
  );

  return (
    <div className="info-card">
      <div className="flex flex-wrap items-end gap-3 mb-6">
        <div>
          <label htmlFor="operator-district" className="block text-sm text-govt-gray-700 mb-1">Select Beneficiary District</label>
          <select
            id="operator-district"
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="form-input w-64"
          >
            <option value="">-- All Districts --</option>
            {UP_DISTRICTS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
        <button type="button" onClick={() => setAppliedDistrict(selectedDistrict)} className="btn-primary">
          Search
        </button>
        <button
          type="button"
          onClick={() => downloadCsv(rows)}
          className="inline-flex items-center gap-2 bg-govt-green hover:bg-govt-green-dark text-white font-semibold px-5 py-2.5 rounded-sm transition-colors"
        >
          Export Excel
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="gov-table">
          <caption className="sr-only">Operator Wise Report as per Beneficiary District</caption>
          <thead>
            <tr>
              <th scope="col">District</th>
              <th scope="col">Total Operators</th>
              <th scope="col">Active Operators Last 3 Days</th>
              <th scope="col">Total Card Requested</th>
              <th scope="col">Total Card Approved</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.district}>
                <td>
                  <button
                    type="button"
                    onClick={() => { setSelectedDistrict(row.district); setAppliedDistrict(row.district); }}
                    className="font-semibold text-govt-blue hover:underline"
                  >
                    {row.district}
                  </button>
                </td>
                <td className="text-right tabular-nums">{fmtIN(row.totalOperators)}</td>
                <td className="text-right tabular-nums">{fmtIN(row.activeOperatorsLast3Days)}</td>
                <td className="text-right tabular-nums">{fmtIN(row.totalCardRequested)}</td>
                <td className="text-right tabular-nums">{fmtIN(row.totalCardApproved)}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center text-govt-gray-500 py-6">No data available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
