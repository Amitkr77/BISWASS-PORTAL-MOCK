import Breadcrumb from "../../components/common/Breadcrumb";
import PageBanner from "../../components/common/PageBanner";

export default function HospitalEmpanelment() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Citizen Guides" },
          { label: "Hospital Empanelment Process" },
        ]}
      />
      <PageBanner
        title="Hospital Empanelment Process"
        description="How public and private hospitals can apply to become empanelled under AB-PMJAY and MMJAY."
      />
      <section className="max-w-7xl mx-auto px-4 py-10 gov-prose">
        <h2>Eligibility Criteria</h2>
        <ul>
          <li>
            Minimum bed strength and infrastructure as prescribed by the
            National Health Authority.
          </li>
          <li>
            Registration under applicable state clinical establishment
            regulations.
          </li>
          <li>Availability of qualified medical, nursing and support staff.</li>
          <li>
            Compliance with fire safety, biomedical waste management and other
            statutory requirements.
          </li>
        </ul>
        <h2>Application Steps</h2>
        <ol>
          <li>
            Register the hospital on the Hospital Empanelment Module (HEM) with
            basic facility details.
          </li>
          <li>
            Upload supporting documents: registration certificate,
            infrastructure details, and staff credentials.
          </li>
          <li>
            District Empanelment Committee conducts a physical verification
            visit.
          </li>
          <li>
            State Empanelment Committee reviews the recommendation and grants
            provisional or full empanelment.
          </li>
          <li>
            Empanelled hospitals are onboarded onto the Transaction Management
            System (TMS) for claims processing.
          </li>
        </ol>
      </section>
    </>
  );
}
