import Breadcrumb from "../../components/common/Breadcrumb";
import PageBanner from "../../components/common/PageBanner";

export default function Features() {
  return (
    <>
      <Breadcrumb
        items={[
          //
          { label: "About" },
          { label: "Ayushman Features" },
        ]}
      />
      <PageBanner
        title="Ayushman Features"
        description="The defining features that make AB-PMJAY Bihar one of the largest publicly funded health assurance schemes in the world."
      />
      <section className="bg-gradient-to-b from-white to-slate-50 ">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Split Layout */}
          <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white sm:mt-16">
            <div className="grid lg:grid-cols-[1.7fr_1fr]">
              {/* LEFT PANEL */}
              <div className="divide-y divide-slate-200">
                {[
                  {
                    no: "01",
                    title: "₹5 Lakh Annual Health Cover",
                    desc: "Annual health benefit of ₹5,00,000 per eligible family for secondary and tertiary care hospitalization on a cashless and paperless basis.",
                  },
                  {
                    no: "02",
                    title: "Over 5.5 Crore Eligible Families",
                    desc: "Provides financial protection to more than 5.5 crore poor and vulnerable families across the country.",
                  },
                  {
                    no: "03",
                    title: "Flexible State Implementation",
                    desc: "States can choose to implement the scheme through Insurance, Trust, or a Mixed model based on local requirements.",
                  },
                  {
                    no: "04",
                    title: "Nationwide Portability",
                    desc: "Beneficiaries can receive cashless treatment at any empanelled hospital across India, regardless of their home state.",
                  },
                  {
                    no: "05",
                    title: "Entitlement-Based Scheme",
                    desc: "Every eligible family member is covered with no restriction on family size, age or gender.",
                  },
                ].map((item) => (
                  <div
                    key={item.no}
                    className="grid gap-3 p-5 sm:gap-6 sm:p-8 md:grid-cols-[80px_1fr]"
                  >
                    <div className="text-3xl font-light text-slate-200 sm:text-5xl">
                      {item.no}
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-base leading-7 text-slate-600">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* RIGHT PANEL */}
              <aside className="border-t border-slate-200 bg-slate-50 p-6 sm:p-10 lg:border-l lg:border-t-0">
                <div className="lg:sticky lg:top-24">
                  <span className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-700">
                    Implementation Highlights
                  </span>

                  <h3 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">
                    Built for Universal Access
                  </h3>

                  <p className="mt-4 leading-7 text-slate-600">
                    The scheme combines financial protection with flexible
                    implementation to ensure equitable healthcare delivery
                    across the country.
                  </p>

                  <div className="mt-6 space-y-5 sm:mt-10 sm:space-y-6">
                    {[
                      "Annual benefit cover of ₹5,00,000 per family",
                      "Cashless & paperless treatment",
                      "No limit on family size",
                      "Insurance / Trust / Mixed implementation model",
                      "Convergence with Central & State Health Schemes",
                      "Alliance with State Health Insurance Schemes",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-4">
                        <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                          ✓
                        </div>

                        <p className="leading-7 text-slate-700">{item}</p>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Highlight */}

                  <div className="mt-8 rounded-2xl bg-blue-600 p-6 text-white sm:mt-12 sm:p-8">
                    <p className="text-sm uppercase tracking-[0.25em] text-blue-100">
                      Annual Benefit
                    </p>

                    <div className="mt-2 text-4xl font-bold sm:text-5xl">₹5 Lakh</div>

                    <p className="mt-4 leading-7 text-blue-100">
                      Every eligible family receives financial protection for
                      secondary and tertiary hospitalization every year.
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
