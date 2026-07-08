import Breadcrumb from "../../components/common/Breadcrumb";
import PageBanner from "../../components/common/PageBanner";

export default function AboutAyushmanBharat() {
  return (
    <>
      <Breadcrumb
        items={[{ label: "About" }, { label: "About Ayushman Bharat" }]}
      />
      <PageBanner
        title="About Ayushman Bharat"
        description="India’s flagship public health assurance scheme, implemented in Bihar by the Bihar Swasthya Suraksha Samiti (BSSS)."
      />
      <section className="bg-white  sm:py-16 ">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Intro */}
          <div className="grid gap-8 lg:grid-cols-[1fr_420px] lg:gap-16">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-700">
                Overview
              </span>

              <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                Ayushman Bharat – Pradhan Mantri Jan Arogya Yojana
              </h2>

              <div className="mt-6 space-y-6 text-base leading-7 text-slate-600 sm:mt-8 sm:text-lg sm:leading-8">
                <p>
                  Ayushman Bharat – Pradhan Mantri Jan Arogya Yojana (AB-PMJAY)
                  is the flagship health assurance programme of the Government
                  of India, providing financial protection against catastrophic
                  healthcare expenditure for economically vulnerable families.
                </p>

                <p>
                  The scheme provides an annual health cover of
                  <strong className="text-slate-900">
                    {" "}
                    ₹5 lakh per family
                  </strong>
                  for secondary and tertiary care hospitalization through a
                  completely <strong>cashless and paperless</strong> process at
                  empanelled hospitals.
                </p>

                <p>
                  In Bihar, the scheme is implemented by the
                  <strong> Bihar Swasthya Suraksha Samiti (BSSS)</strong> in
                  coordination with the National Health Authority and district
                  health administrations across all 38 districts.
                </p>
              </div>
            </div>

            {/* Highlight Card */}

            <aside className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-10">
              <p className="text-sm uppercase tracking-[0.25em] text-blue-700 font-semibold">
                At a Glance
              </p>

              <div className="mt-6 space-y-6 sm:mt-10 sm:space-y-8">
                <div>
                  <div className="text-3xl font-bold text-blue-700 sm:text-5xl">
                    ₹5 Lakh
                  </div>
                  <p className="mt-2 text-slate-600">Annual Health Cover</p>
                </div>

                <div>
                  <div className="text-3xl font-bold text-blue-700 sm:text-5xl">
                    38
                  </div>
                  <p className="mt-2 text-slate-600">Districts Covered</p>
                </div>

                <div>
                  <div className="text-3xl font-bold text-blue-700 sm:text-5xl">
                    Cashless
                  </div>
                  <p className="mt-2 text-slate-600">
                    Treatment at Empanelled Hospitals
                  </p>
                </div>
              </div>
            </aside>
          </div>

          {/* Objectives */}

          <div className="mt-12 sm:mt-16 lg:mt-24">
            <div className="max-w-2xl">
              <span className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-700">
                Objectives
              </span>

              <h3 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">
                Improving Healthcare Access Across Bihar
              </h3>
            </div>

            <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-8 md:grid-cols-2">
              {[
                "Reduce catastrophic out-of-pocket health expenditure for poor and vulnerable families.",
                "Provide access to quality secondary and tertiary healthcare through empanelled public and private hospitals.",
                "Improve health outcomes through early diagnosis, treatment and continuity of care.",
                "Strengthen Bihar's healthcare system through demand-side financing.",
              ].map((item, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 p-5 sm:p-8"
                >
                  <div className="text-blue-700 font-bold text-xl">
                    0{index + 1}
                  </div>

                  <p className="mt-4 text-slate-600 leading-7">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Implementation */}

          <div className="mt-12 border-t border-slate-200 pt-10 sm:mt-16 sm:pt-16 lg:mt-24">
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-700">
              Implementation in Bihar
            </span>

            <h3 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">
              Delivered Through Bihar Swasthya Suraksha Samiti
            </h3>

            <div className="mt-6 max-w-5xl space-y-6 text-base leading-7 text-slate-600 sm:mt-8 sm:text-lg sm:leading-8">
              <p>
                BSSS has expanded the reach of AB-PMJAY by integrating the
                Mukhyamantri Jan Arogya Yojana (MMJAY), enabling additional
                eligible families to receive health protection beyond the
                central scheme.
              </p>

              <p>
                The Samiti is responsible for hospital empanelment, beneficiary
                identification, claims processing, grievance redressal,
                awareness campaigns and overall implementation across Bihar.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
