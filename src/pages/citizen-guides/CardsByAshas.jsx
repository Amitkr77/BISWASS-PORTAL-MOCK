import Breadcrumb from "../../components/common/Breadcrumb";
import PageBanner from "../../components/common/PageBanner";

const DISTRICT_ROWS = [
  { district: "Patna", cardsCreated: "18,240", activeAshas: "612" },
  { district: "Gaya", cardsCreated: "14,905", activeAshas: "548" },
  { district: "Muzaffarpur", cardsCreated: "12,760", activeAshas: "501" },
  { district: "Bhagalpur", cardsCreated: "9,830", activeAshas: "402" },
  { district: "Darbhanga", cardsCreated: "8,415", activeAshas: "376" },
  { district: "Purnia", cardsCreated: "7,290", activeAshas: "334" },
];

export default function CardsByAshas() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Citizen Guides" },
          { label: "Cards Created by ASHAs" },
        ]}
      />
      <PageBanner
        title="Cards Created by ASHAs"
        description="Recognising the contribution of Accredited Social Health Activists (ASHAs) in expanding Ayushman Card coverage."
      />

      <section className="max-w-7xl mx-auto px-4 py-10 gov-prose">
        <p>
          ASHAs play a vital role in reaching households in remote and
          under-served areas, assisting eligible families with documentation and
          card creation during household visits and community camps. The table
          below summarises card creation facilitated by ASHAs across select
          districts during the current programme cycle.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-14">
        <div className="overflow-x-auto">
          <table className="gov-table">
            <caption className="sr-only">
              Cards created by ASHAs, by district
            </caption>
            <thead>
              <tr>
                <th scope="col">District</th>
                <th scope="col">Cards Created (This Cycle)</th>
                <th scope="col">Active ASHAs Participating</th>
              </tr>
            </thead>
            <tbody>
              {DISTRICT_ROWS.map((row) => (
                <tr key={row.district}>
                  <td>{row.district}</td>
                  <td>{row.cardsCreated}</td>
                  <td>{row.activeAshas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
