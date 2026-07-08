import { useMemo, useState } from 'react';
import hospitals from '../../services/data/hospitals.json';

export default function DeEmpanelledFinder() {
  const [query, setQuery] = useState('');
  const [district, setDistrict] = useState('');
  const [status, setStatus] = useState('');

  const districts = useMemo(
    () => [...new Set(hospitals.deEmpanelled.map((h) => h.district))].sort(),
    []
  );
  const statuses = useMemo(
    () => [...new Set(hospitals.deEmpanelled.map((h) => h.status))].sort(),
    []
  );

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    return hospitals.deEmpanelled.filter((h) => {
      const matchesQuery = !q || h.name.toLowerCase().includes(q) || h.reason.toLowerCase().includes(q);
      const matchesDistrict = !district || h.district === district;
      const matchesStatus = !status || h.status === status;
      return matchesQuery && matchesDistrict && matchesStatus;
    });
  }, [query, district, status]);

  return (
    <>
      <div className="grid sm:grid-cols-4 gap-4 mb-5">
        <div className="sm:col-span-2">
          <label htmlFor="de-empanelled-search" className="form-label">Search by name or reason</label>
          <input
            type="search"
            id="de-empanelled-search"
            className="form-input"
            placeholder="e.g. Muzaffarpur, audit..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="de-empanelled-district-filter" className="form-label">Filter by district</label>
          <select
            id="de-empanelled-district-filter"
            className="form-input"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          >
            <option value="">All Districts</option>
            {districts.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="de-empanelled-status-filter" className="form-label">Filter by status</label>
          <select
            id="de-empanelled-status-filter"
            className="form-input"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All Statuses</option>
            {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <p className="text-xs text-govt-gray-500 mb-3">{matches.length} of {hospitals.deEmpanelled.length} hospitals shown</p>
      <div className="overflow-x-auto">
        <table className="gov-table">
          <caption className="sr-only">De-empanelled and suspended hospitals</caption>
          <thead><tr><th scope="col">Hospital</th><th scope="col">District</th><th scope="col">Status</th><th scope="col">Reason</th></tr></thead>
          <tbody>
            {matches.map((h) => (
              <tr key={h.name}>
                <td className="font-semibold text-govt-gray-900">{h.name}</td>
                <td>{h.district}</td>
                <td><span className="inline-block px-2 py-0.5 rounded-sm text-xs font-semibold bg-govt-red/10 text-govt-red">{h.status}</span></td>
                <td>{h.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {matches.length === 0 && (
          <p className="text-sm text-govt-gray-600 mt-4">No hospitals match your search. Try a different name, district or status.</p>
        )}
      </div>
    </>
  );
}
