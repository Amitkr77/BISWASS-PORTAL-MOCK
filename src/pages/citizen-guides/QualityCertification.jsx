import Breadcrumb from "../../components/common/Breadcrumb";
import PageBanner from "../../components/common/PageBanner";

export default function QualityCertification() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Citizen Guides" },
          { label: "Get Quality Certification" },
        ]}
      />
      <PageBanner
        title="Get Quality Certification"
        description="Guidance for empanelled hospitals seeking National Quality Assurance Standards (NQAS) certification."
      />
      <section className="max-w-7xl mx-auto px-4 py-10 gov-prose">
        <h2>Why Quality Certification Matters</h2>
        <p>
          Hospitals empanelled under AB-PMJAY are encouraged to obtain National
          Quality Assurance Standards (NQAS) certification to demonstrate
          compliance with prescribed clinical and infrastructural quality
          benchmarks, and may be eligible for incentive packages accordingly.
        </p>
        <h2>Certification Process</h2>
        <ol>
          <li>
            Hospital registers for self-assessment on the NQAS portal and
            completes the internal quality checklist.
          </li>
          <li>
            District Quality Assurance Committee conducts a preliminary
            assessment visit.
          </li>
          <li>
            State-level assessors carry out a detailed external assessment
            against NQAS checklists.
          </li>
          <li>
            Certification is granted for facilities scoring above the prescribed
            threshold, valid for a fixed period subject to renewal.
          </li>
        </ol>
        <p>
          Hospitals may contact their District Programme Coordinator for support
          in preparing for assessment.
        </p>
      </section>
    </>
  );
}
