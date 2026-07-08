import Breadcrumb from '../../components/common/Breadcrumb';
import PageBanner from '../../components/common/PageBanner';

const RFQS = [
  { refNo: 'BSSS/RFQ/2026/029', title: 'Supply of biometric devices for enrolment kiosks', publishDate: '2026-06-02', closingDate: '2026-06-20', status: 'Open' },
  { refNo: 'BSSS/RFQ/2026/028', title: 'Annual stationery and printing supplies for district offices', publishDate: '2026-05-10', closingDate: '2026-05-25', status: 'Closed' },
  { refNo: 'BSSS/RFQ/2026/027', title: 'Repair and maintenance of office equipment, State Office Patna', publishDate: '2026-04-15', closingDate: '2026-04-30', status: 'Closed' }
];

export default function Rfq() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Governance' }, { label: 'Request for Quotation' }]} />
      <PageBanner title="Request for Quotation" description="Requests for Quotation (RFQ) issued for procurement of goods and services below the tender threshold." />

      <section className="max-w-7xl mx-auto px-4 py-10">
        <p className="text-sm text-govt-gray-600 mb-5 max-w-3xl">Vendors registered with BSSS may respond to open RFQs within the specified closing date.</p>
        <div className="overflow-x-auto">
          <table className="gov-table">
            <caption className="sr-only">Requests for Quotation</caption>
            <thead>
              <tr>
                <th scope="col">Reference No.</th>
                <th scope="col">Title</th>
                <th scope="col">Published</th>
                <th scope="col">Closing Date</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {RFQS.map((t) => (
                <tr key={t.refNo}>
                  <td className="whitespace-nowrap">{t.refNo}</td>
                  <td>{t.title}</td>
                  <td className="whitespace-nowrap">{t.publishDate}</td>
                  <td className="whitespace-nowrap">{t.closingDate}</td>
                  <td>
                    <span className={`inline-block px-2 py-0.5 rounded-sm text-xs font-semibold ${t.status === 'Open' ? 'bg-govt-green/15 text-govt-green-dark' : 'bg-govt-gray-200 text-govt-gray-700'}`}>{t.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
