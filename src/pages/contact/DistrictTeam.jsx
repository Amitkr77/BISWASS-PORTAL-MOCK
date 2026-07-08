import Breadcrumb from '../../components/common/Breadcrumb';
import PageBanner from '../../components/common/PageBanner';
import districtTeam from '../../services/data/team-district.json';

export default function DistrictTeam() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Contact Us' }, { label: 'District Team' }]} />
      <PageBanner title="District Team" description="District Programme Coordinators responsible for AB-PMJAY implementation in each district." />

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="overflow-x-auto">
          <table className="gov-table">
            <caption className="sr-only">Team directory</caption>
            <thead>
              <tr>
                <th scope="col">District</th>
                <th scope="col">Name</th>
                <th scope="col">Designation</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
              </tr>
            </thead>
            <tbody>
              {districtTeam.map((m) => (
                <tr key={m.email}>
                  <td className="font-semibold text-govt-gray-900">{m.district}</td>
                  <td>{m.name}</td>
                  <td>{m.designation}</td>
                  <td><a href={`mailto:${m.email}`} className="text-govt-blue hover:underline">{m.email}</a></td>
                  <td className="whitespace-nowrap">{m.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
