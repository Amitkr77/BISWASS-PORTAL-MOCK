import { Link } from 'react-router-dom';
import VvsDistrictTable from '../../components/dashboard/VvsDistrictTable';

export default function VvsReport() {
  return (
    <>
      <div className="bg-govt-blue-light border-b border-govt-blue/10 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-govt-blue-dark">District Wise Report of Vay Vandana Scheme (VVS)</h1>
          <p className="text-sm text-govt-gray-700 mt-2">Search, review and export VVS card generation figures for any district of Uttar Pradesh.</p>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-end mb-4">
          <Link to="/dashboard/vvs" className="text-sm font-semibold text-govt-blue hover:underline shrink-0">
            &larr; Back to VVS Dashboard
          </Link>
        </div>
        <VvsDistrictTable />
      </section>
    </>
  );
}
