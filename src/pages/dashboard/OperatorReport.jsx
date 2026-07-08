import { Link } from 'react-router-dom';
import OperatorDistrictTable from '../../components/dashboard/OperatorDistrictTable';

export default function OperatorReport() {
  return (
    <>
      <div className="bg-govt-blue-light border-b border-govt-blue/10 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-govt-blue-dark">Operator Wise Report (As Per Beneficiary District)</h1>
          <p className="text-sm text-govt-gray-700 mt-2">Search, review and export CSC / VLE operator activity for any beneficiary district.</p>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-end mb-4">
          <Link to="/dashboard/operator" className="text-sm font-semibold text-govt-blue hover:underline shrink-0">
            &larr; Back to Operator Dashboard
          </Link>
        </div>
        <OperatorDistrictTable />
      </section>
    </>
  );
}
