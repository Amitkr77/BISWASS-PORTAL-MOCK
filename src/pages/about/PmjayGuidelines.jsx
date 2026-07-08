import Breadcrumb from "../../components/common/Breadcrumb";
import PageBanner from "../../components/common/PageBanner";

export default function PmjayGuidelines() {
  return (
    <>
      <Breadcrumb
        items={[{ label: "About" }, { label: "AB-PMJAY Guidelines" }]}
      />
      <PageBanner
        title="AB-PMJAY Guidelines"
        description="Operational guidelines issued by the National Health Authority and Bihar Swasthya Suraksha Samiti for implementation of the scheme."
      />
      <section className="bg-slate-50 py-10 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-6 top-0 hidden h-full w-px bg-slate-200 md:block" />

            <div className="space-y-8 sm:space-y-10 lg:space-y-14">
              {[
                {
                  no: "01",
                  title: "Beneficiary Identification",
                  description:
                    "Eligible families are identified using the Socio-Economic Caste Census (SECC) 2011 deprivation and occupational criteria, with additional beneficiaries included under Mukhyamantri Jan Arogya Yojana (MMJAY). Verification is completed through the Beneficiary Identification System (BIS) using demographic and biometric authentication.",
                },
                {
                  no: "02",
                  title: "Hospital Empanelment",
                  description:
                    "Public and private hospitals meeting National Health Authority standards for infrastructure, manpower, bed capacity and quality are empanelled through the Hospital Empanelment Module. Hospitals are regularly reviewed to ensure continued compliance.",
                },
                {
                  no: "03",
                  title: "Claims & Health Benefit Packages",
                  description:
                    "Treatments are provided under predefined Health Benefit Packages (HBP) with standardised rates. Hospitals submit claims through the Transaction Management System (TMS), supported by the required clinical documentation.",
                },
                {
                  no: "04",
                  title: "Grievance Redressal",
                  description:
                    "A three-tier grievance redressal system operates at the district, state and national levels. Beneficiaries and hospitals can submit complaints through the Grievance Portal, with cases resolved within prescribed timelines.",
                },
              ].map((item) => (
                <div
                  key={item.no}
                  className="relative grid gap-3 sm:gap-4 md:grid-cols-[70px_260px_1fr] md:gap-8"
                >
                  {/* Timeline Circle */}
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-blue-600 text-sm font-bold text-white shadow-sm">
                    {item.no}
                  </div>

                  {/* Title */}
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">
                      {item.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <div>
                    <p className="leading-7 text-slate-600 sm:leading-8">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
