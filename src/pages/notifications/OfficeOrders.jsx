import Breadcrumb from "../../components/common/Breadcrumb";
import PageBanner from "../../components/common/PageBanner";
import { EyeIcon, DownloadIcon } from "../../components/common/icons";

const DOCUMENT_URL = "/sample-document.pdf";

const ICON_PDF = (
  <svg
    className="w-4 h-4 text-govt-red inline-block align-text-bottom mr-1.5"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V7.414A2 2 0 0017.414 6L14 2.586A2 2 0 0012.586 2H4zm3 10a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm1-4a1 1 0 100 2h4a1 1 0 100-2H8z"
      clipRule="evenodd"
    />
  </svg>
);

const ROWS = [
  {
    date: "2026-06-20",
    subject:
      "Office Order regarding constitution of District Grievance Redressal Committees",
    ref: "BSSS/OO/2026/033",
  },
  {
    date: "2026-05-15",
    subject:
      "Office Order on transfer and posting of District Programme Coordinators",
    ref: "BSSS/OO/2026/029",
  },
  {
    date: "2026-04-18",
    subject:
      "Office Order constituting the Empanelment Review Committee for FY 2026-27",
    ref: "BSSS/OO/2026/024",
  },
  {
    date: "2026-03-25",
    subject: "Office Order on delegation of financial powers to district units",
    ref: "BSSS/OO/2026/019",
  },
  {
    date: "2026-02-12",
    subject:
      "Office Order regarding constitution of Internal Complaints Committee (POSH)",
    ref: "BSSS/OO/2026/011",
  },
];

export default function OfficeOrders() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Notifications & Circulars" },
          { label: "Office Orders" },
        ]}
      />
      <PageBanner
        title="Office Orders"
        description="Internal office orders relating to postings, committee constitution and administrative matters."
      />
      <section className="max-w-7xl mx-auto px-4 py-10">
        <p className="text-sm text-govt-gray-600 mb-5 max-w-3xl">
          Latest office orders issued by BSSS. Documents are published in PDF
          format on the official portal; reference numbers may be quoted when
          corresponding with BSSS.
        </p>
        <div className="overflow-x-auto">
          <table className="gov-table">
            <caption className="sr-only">Office Orders</caption>
            <thead>
              <tr>
                <th scope="col">S.No.</th>
                <th scope="col">Date</th>
                <th scope="col">Subject</th>
                <th scope="col">Reference No.</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r, i) => (
                <tr key={r.ref}>
                  <td>{i + 1}</td>
                  <td className="whitespace-nowrap">{r.date}</td>
                  <td>
                    {ICON_PDF}
                    {r.subject}
                  </td>
                  <td>{r.ref}</td>
                  <td className="whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <a
                        href={DOCUMENT_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-govt-blue hover:text-govt-blue-dark hover:underline"
                      >
                        <EyeIcon className="h-3.5 w-3.5" />
                        View
                      </a>
                      <a
                        href={DOCUMENT_URL}
                        download={`${r.ref}.pdf`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-govt-blue hover:text-govt-blue-dark hover:underline"
                      >
                        <DownloadIcon className="h-3.5 w-3.5" />
                        Download
                      </a>
                    </div>
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
