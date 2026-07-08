import { useMemo, useState } from 'react';
import hospitals from '../../services/data/hospitals.json';

export default function HospitalFinder() {
  const [query, setQuery] = useState('');
  const [district, setDistrict] = useState('');
  const [type, setType] = useState('');

  const districts = useMemo(
    () => [...new Set(hospitals.empanelled.map((h) => h.district))].sort(),
    []
  );
  const types = useMemo(
    () => [...new Set(hospitals.empanelled.map((h) => h.type))].sort(),
    []
  );

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    return hospitals.empanelled.filter((h) => {
      const matchesQuery = !q || h.name.toLowerCase().includes(q) || h.specialties.toLowerCase().includes(q);
      const matchesDistrict = !district || h.district === district;
      const matchesType = !type || h.type === type;
      return matchesQuery && matchesDistrict && matchesType;
    });
  }, [query, district, type]);

  return (
    <>
      <div className="grid sm:grid-cols-4 gap-4 mb-5">
        <div className="sm:col-span-2">
          <label htmlFor="hospital-search" className="form-label">Search by name or specialty</label>
          <input
            type="search"
            id="hospital-search"
            className="form-input"
            placeholder="e.g. Patna, Cardiology..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="hospital-district-filter" className="form-label">Filter by district</label>
          <select
            id="hospital-district-filter"
            className="form-input"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          >
            <option value="">All Districts</option>
            {districts.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="hospital-type-filter" className="form-label">Filter by type</label>
          <select
            id="hospital-type-filter"
            className="form-input"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">All Types</option>
            {types.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>
      <p className="text-xs text-govt-gray-500 mb-3">{matches.length} of {hospitals.empanelled.length} hospitals shown</p>
      <div className="overflow-x-auto">
        <table className="gov-table">
          <caption className="sr-only">Empanelled hospital directory</caption>
          <thead><tr><th scope="col">Hospital</th><th scope="col">District</th><th scope="col">Type</th><th scope="col">Specialties</th></tr></thead>
          <tbody>
            {matches.map((h) => (
              <tr key={h.name}>
                <td className="font-semibold text-govt-gray-900">{h.name}</td>
                <td>{h.district}</td>
                <td>{h.type}</td>
                <td>{h.specialties}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {matches.length === 0 && (
          <p className="text-sm text-govt-gray-600 mt-4">No hospitals match your search. Try a different name, district or type.</p>
        )}
      </div>
    </>
  );
}
