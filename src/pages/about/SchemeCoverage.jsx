import Breadcrumb from "../../components/common/Breadcrumb";
import PageBanner from "../../components/common/PageBanner";

export default function SchemeCoverage() {
  return (
    <>
      <Breadcrumb
        items={[{ label: "About" }, { label: "Scheme Coverage and Process" }]}
      />
      <PageBanner
        title="Scheme Coverage and Process"
        description="How AB-PMJAY Bihar covers eligible families and the step-by-step process of availing cashless treatment."
      />
      <section className="max-w-7xl mx-auto px-4 py-10 gov-prose">
        <h2>Coverage</h2>
        <p>
          AB-PMJAY Bihar currently covers approximately 1.21 crore families,
          amounting to over 5.5 crore beneficiaries across all 38 districts of
          the state. Coverage extends to secondary and tertiary care
          hospitalisation across more than 1,500 medical and surgical procedures
          under the Health Benefit Package.
        </p>
        <h2>Treatment Process</h2>
        <ol>
          <li>
            Beneficiary visits an empanelled hospital and presents their
            Ayushman Card at the Pradhan Mantri Arogya Mitra (PMAM) desk.
          </li>
          <li>
            Eligibility is verified through the Beneficiary Identification
            System (BIS) using demographic or biometric authentication.
          </li>
          <li>
            The treating hospital raises a pre-authorisation request specifying
            the diagnosis and treatment package required.
          </li>
          <li>
            Upon approval, the beneficiary receives cashless treatment,
            including diagnostics, surgery, medicines and follow-up care as per
            the package.
          </li>
          <li>
            The hospital submits a final claim through the Transaction
            Management System (TMS) at the time of discharge.
          </li>
        </ol>
        <h2>Portability</h2>
        <p>
          Coverage under AB-PMJAY is fully portable &mdash; beneficiaries
          enrolled in Bihar can avail cashless treatment at any empanelled
          hospital anywhere in India, and vice versa.
        </p>
      </section>
    </>
  );
}
