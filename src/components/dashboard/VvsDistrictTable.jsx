import { useMemo, useState } from 'react';
import { UP_DISTRICTS } from '../../utils/upDistricts';
import { VVS_DISTRICT_REPORT, VVS_REPORT_DATES } from '../../services/data/vvsData';
import { fmtIN } from '../../utils/format';

function toCsv(rows) {
  const header = ['S.No', 'District', ...VVS_REPORT_DATES.map((d) => `Card Generated (${d})`), 'Total Card Generated'];
  const lines = [header.join(',')];
  rows.forEach((row, i) => {
    lines.push([i + 1, row.district, ...row.daily.map((d) => d.value), row.total].join(','));
  });
  return lines.join('\n');
}

function downloadCsv(rows) {
  const blob = new Blob([toCsv(rows)], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'vvs-district-report.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/** District wise search/filter/export table for the Vay Vandana Scheme (VVS)
 *  report. Shared by the standalone VVS report page and the VVS programme
 *  report tab so both show the same live table instead of a summary teaser. */
export default function VvsDistrictTable() {
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [appliedDistrict, setAppliedDistrict] = useState('');

  const rows = useMemo(
    () => (appliedDistrict ? VVS_DISTRICT_REPORT.filter((r) => r.district === appliedDistrict) : VVS_DISTRICT_REPORT),
    [appliedDistrict]
  );

  return (
    <div className="info-card">
      <div className="flex flex-wrap items-end gap-3 mb-6">
        <div>
          <label htmlFor="vvs-district" className="block text-sm text-govt-gray-700 mb-1">Select District</label>
          <select
            id="vvs-district"
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
          <caption className="sr-only">District wise report of VAY VANDANA SCHEME (VVS)</caption>
          <thead>
            <tr>
              <th scope="col" className="w-16">S. No</th>
              <th scope="col">District</th>
              {VVS_REPORT_DATES.map((date) => (
                <th key={date} scope="col">Card Generated ({date})</th>
              ))}
              <th scope="col">Total Card Generated</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.district}>
                <td className="tabular-nums text-govt-gray-500">{i + 1}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => { setSelectedDistrict(row.district); setAppliedDistrict(row.district); }}
                    className="font-semibold text-govt-blue hover:underline"
                  >
                    {row.district.toUpperCase()}
                  </button>
                </td>
                {row.daily.map((d) => (
                  <td key={d.date} className="text-right tabular-nums">{fmtIN(d.value)}</td>
                ))}
                <td className="text-right tabular-nums font-semibold text-govt-gray-900">{fmtIN(row.total)}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-govt-gray-500 py-6">No data available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
