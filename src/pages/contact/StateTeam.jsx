import Breadcrumb from '../../components/common/Breadcrumb';
import PageBanner from '../../components/common/PageBanner';
import stateTeam from '../../services/data/team-state.json';

export default function StateTeam() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Contact Us' }, { label: 'State Team' }]} />
      <PageBanner title="State Team" description="Key functionaries at the BSSS State Office, Patna." />

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="overflow-x-auto">
          <table className="gov-table">
            <caption className="sr-only">Team directory</caption>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Designation</th>
                <th scope="col">Department</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
              </tr>
            </thead>
            <tbody>
              {stateTeam.map((m) => (
                <tr key={m.email}>
                  <td className="font-semibold text-govt-gray-900">{m.name}</td>
                  <td>{m.designation}</td>
                  <td>{m.department}</td>
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
