import Breadcrumb from "../../components/common/Breadcrumb";
import PageBanner from "../../components/common/PageBanner";

export default function RtiAct() {
  return (
    <>
      <Breadcrumb items={[{ label: "RTI" }, { label: "RTI Act" }]} />
      <PageBanner
        title="Right to Information (RTI) Act"
        description="Provisions of the RTI Act, 2005 as applicable to the Bihar Swasthya Suraksha Samiti (BSSS)."
      />
      <section className="max-w-7xl mx-auto px-4 py-10 gov-prose">
        <h2>About the Act</h2>
        <p>
          The Right to Information Act, 2005 empowers citizens to seek
          information from public authorities in order to promote transparency
          and accountability in the working of every public authority, including
          the Bihar Swasthya Suraksha Samiti (BSSS).
        </p>
        <h2>Public Information Officer (PIO)</h2>
        <p>
          Requests for information under Section 6(1) of the Act may be
          addressed to the State Public Information Officer (SPIO), BSSS, State
          Health Society Bihar Campus, Sheikhpura, Patna &ndash; 800014. The
          prescribed application fee and any additional copying charges are
          payable as per the RTI Rules notified by the Government of Bihar.
        </p>
        <h2>Response Timeline</h2>
        <ul>
          <li>
            Information must ordinarily be provided within{" "}
            <strong>30 days</strong> of receipt of a valid application.
          </li>
          <li>
            Where the request concerns life or liberty of a person, information
            must be provided within <strong>48 hours</strong>.
          </li>
          <li>
            If dissatisfied with the response, an applicant may file a{" "}
            <strong>first appeal</strong> with the designated Appellate
            Authority within 30 days, and thereafter a{" "}
            <strong>second appeal</strong> with the Bihar State Information
            Commission.
          </li>
        </ul>
        <p>
          Applications and appeals may be submitted using the form on the{" "}
          <strong>RTI Appeal / Apply</strong> page.
        </p>
      </section>
    </>
  );
}
