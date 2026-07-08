import Breadcrumb from '../../components/common/Breadcrumb';
import PageBanner from '../../components/common/PageBanner';

const ROLES = [
  ['Chief Executive Officer (CEO)', 'Overall administration and policy implementation of BSSS.'],
  ['State Nodal Officer, AB-PMJAY', 'Programme management, coordination with the National Health Authority.'],
  ['General Manager (IT)', 'Management of BIS, TMS and other digital platforms.'],
  ['General Manager (Finance)', 'Financial planning, claims disbursement and audit compliance.'],
  ['Deputy General Manager (Medical)', 'Quality assurance and hospital empanelment oversight.'],
  ['District Programme Coordinator', 'District-level implementation, camp coordination and monitoring.'],
  ['Manager (Grievance)', 'Grievance redressal across beneficiary and hospital channels.']
];

export default function RolesResponsibilities() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Governance' }, { label: 'Roles and Responsibilities' }]} />
      <PageBanner title="Roles and Responsibilities" description="Key functionaries within BSSS and their principal areas of responsibility." />

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="overflow-x-auto">
          <table className="gov-table">
            <caption className="sr-only">Roles and Responsibilities</caption>
            <thead>
              <tr>
                <th scope="col">Role</th>
                <th scope="col">Principal Responsibility</th>
              </tr>
            </thead>
            <tbody>
              {ROLES.map((r) => (
                <tr key={r[0]}>
                  <td className="font-semibold text-govt-gray-900">{r[0]}</td>
                  <td>{r[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
