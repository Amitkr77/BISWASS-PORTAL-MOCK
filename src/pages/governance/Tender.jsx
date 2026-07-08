import Breadcrumb from '../../components/common/Breadcrumb';
import PageBanner from '../../components/common/PageBanner';
import tenders from '../../services/data/tenders.json';

export default function Tender() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Governance' }, { label: 'Tender' }]} />
      <PageBanner title="Tender" description="Tenders published by BSSS for procurement of goods, works and services." />

      <section className="max-w-7xl mx-auto px-4 py-10">
        <p className="text-sm text-govt-gray-600 mb-5 max-w-3xl">Bidders may download detailed tender documents from the reference number quoted, and submit bids as per the instructions therein.</p>
        <div className="overflow-x-auto">
          <table className="gov-table">
            <caption className="sr-only">Tenders</caption>
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
              {tenders.map((t) => (
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
