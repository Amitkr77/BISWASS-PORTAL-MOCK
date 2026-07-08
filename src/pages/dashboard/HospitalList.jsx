import { useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { getDashboardType } from '../../services/data/dashboardData';
import { getHospitalsForDistrict } from '../../services/data/hospitalData';
import { BIHAR_DISTRICTS } from '../../utils/biharDistricts';
import { SearchIcon } from '../../components/common/icons';

const TYPE_LABEL = { public: 'Public', private: 'Private' };

export default function HospitalList() {
  const { type: typeSlug, district: districtParam, hospitalType } = useParams();
  const type = getDashboardType(typeSlug);
  const district = decodeURIComponent(districtParam || '');
  const [query, setQuery] = useState('');

  const hospitals = useMemo(
    () => (TYPE_LABEL[hospitalType] ? getHospitalsForDistrict(district, hospitalType) : []),
    [district, hospitalType]
  );

  const filtered = useMemo(
    () => hospitals.filter((h) => h.name.toLowerCase().includes(query.trim().toLowerCase())),
    [hospitals, query]
  );

  if (!type || !TYPE_LABEL[hospitalType] || !BIHAR_DISTRICTS.includes(district)) {
    return <Navigate to="/dashboard/ab-pmjay" replace />;
  }

  return (
    <>
      <div className="bg-govt-blue-light border-b border-govt-blue/10 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <nav aria-label="Breadcrumb" className="text-xs text-govt-gray-600 mb-2">
            <Link to={`/dashboard/${type.slug}`} className="text-govt-blue hover:underline">{type.label}</Link>
            <span className="mx-1.5" aria-hidden="true">/</span>
            <Link to={`/dashboard/${type.slug}#hospital-empanelment`} className="text-govt-blue hover:underline">Hospital Empanelment</Link>
            <span className="mx-1.5" aria-hidden="true">/</span>
            <span aria-current="page">{district}</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-govt-blue-dark">{TYPE_LABEL[hospitalType]} Hospitals &ndash; {district}</h1>
          <p className="text-sm text-govt-gray-700 mt-2 max-w-2xl">Empanelled {TYPE_LABEL[hospitalType].toLowerCase()} hospitals in {district} district under AB-PMJAY / MMJAY.</p>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="info-card">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div>
              <label htmlFor="hospital-search" className="sr-only">Search hospital</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2"><SearchIcon /></span>
                <input
                  id="hospital-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search hospital&hellip;"
                  className="form-input pl-9 w-72 max-w-full"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-govt-gray-500">{filtered.length} of {hospitals.length} hospitals</span>
              <Link to={`/dashboard/${type.slug}#hospital-empanelment`} className="btn-outline text-xs">&larr; Back to Dashboard</Link>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="gov-table">
              <caption className="sr-only">{TYPE_LABEL[hospitalType]} hospitals in {district}</caption>
              <thead>
                <tr>
                  <th scope="col">Hospital ID</th>
                  <th scope="col">Hospital Name</th>
                  <th scope="col">Type</th>
                  <th scope="col">District</th>
                  <th scope="col">Address</th>
                  <th scope="col">Contact Number</th>
                  <th scope="col">Specialties</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((h) => (
                  <tr key={h.id}>
                    <td className="font-medium text-govt-gray-900 whitespace-nowrap">{h.id}</td>
                    <td>{h.name}</td>
                    <td>{h.type}</td>
                    <td>{h.district}</td>
                    <td className="text-govt-gray-600">{h.address}</td>
                    <td className="text-govt-gray-600 whitespace-nowrap">{h.contactNumber}</td>
                    <td className="text-govt-gray-600">{h.specialties.join(', ')}</td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center text-govt-gray-500 py-6">No hospitals match &ldquo;{query}&rdquo;.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
