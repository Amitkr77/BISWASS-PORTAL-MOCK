import Breadcrumb from "../../components/common/Breadcrumb";
import PageBanner from "../../components/common/PageBanner";

export default function CoverFamilyBenefits() {
  return (
    <>
      <Breadcrumb
        items={[{ label: "About" }, { label: "Cover Family and Benefits" }]}
      />
      <PageBanner
        title="Cover Family and Benefits"
        description="Who is covered under the scheme, and what benefits are available to enrolled families."
      />
      <section className="max-w-7xl mx-auto px-4 py-10 gov-prose">
        <h2>Family Coverage</h2>
        <p>
          The scheme covers entire families identified as eligible under the
          SECC 2011 deprivation criteria or applicable MMJAY state criteria
          &mdash; with no restriction on family size, age or gender of members.
          Newborns and members added through marriage are automatically included
          in the family unit upon verification.
        </p>
        <h2>Benefits Covered</h2>
        <ul>
          <li>
            Cashless and paperless hospitalisation up to Rs. 5 lakh per family
            per year.
          </li>
          <li>
            Coverage for pre-existing diseases from the first day of enrolment.
          </li>
          <li>
            Pre-hospitalisation expenses for up to 3 days and
            post-hospitalisation expenses for up to 15 days.
          </li>
          <li>
            Coverage for medical examination, treatment, medicines and
            consumables, diagnostic services, and food during hospital stay.
          </li>
          <li>
            Complications arising during treatment, and follow-up care where
            applicable.
          </li>
        </ul>
        <h2>Exclusions</h2>
        <p>
          Certain services such as outpatient department (OPD) consultations,
          cosmetic procedures and organ transplant donor costs (beyond specified
          limits) may be excluded, in accordance with the current Health Benefit
          Package guidelines issued by the National Health Authority.
        </p>
      </section>
    </>
  );
}
