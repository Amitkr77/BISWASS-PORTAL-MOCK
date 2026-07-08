import Breadcrumb from "../../components/common/Breadcrumb";
import PageBanner from "../../components/common/PageBanner";

export default function VayVandanaCardVideo() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Citizen Guides" },
          { label: "Ayushman Vay Vandana Card Creation Video" },
        ]}
      />
      <PageBanner
        title="Ayushman Vay Vandana Card Creation Video"
        description="A dedicated video guide for creating the Ayushman Vay Vandana Card for senior citizens aged 70 and above."
      />

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div
          className="relative aspect-video rounded-sm overflow-hidden bg-gradient-to-br from-govt-blue to-govt-blue-mid"
          role="img"
          aria-label="Placeholder video frame: Ayushman Vay Vandana Card Creation Video"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="w-16 h-16 rounded-full bg-white/85 flex items-center justify-center text-govt-blue-dark"
              aria-hidden="true"
            >
              <svg
                className="w-7 h-7 ml-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M6.3 4.6a1 1 0 011.5-.86l8 5.4a1 1 0 010 1.72l-8 5.4a1 1 0 01-1.5-.86V4.6z" />
              </svg>
            </span>
          </div>
          <p className="absolute bottom-3 left-3 right-3 text-white text-xs sm:text-sm bg-black/40 rounded-sm px-3 py-1.5">
            Video placeholder &ndash; official BSSS video will be embedded here.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10 gov-prose">
        <h2>About the Vay Vandana Card</h2>
        <p>
          The Ayushman Vay Vandana Card extends AB-PMJAY coverage to all senior
          citizens aged 70 years and above, irrespective of their family&rsquo;s
          existing income or enrolment status, providing an additional top-up
          cover of Rs. 5 lakh per year exclusively for the senior citizen.
        </p>
        <h2>What This Video Covers</h2>
        <ol>
          <li>
            Verifying age and identity using Aadhaar for senior citizen
            applicants.
          </li>
          <li>Completing the Vay Vandana enrolment form on the portal.</li>
          <li>Downloading the Vay Vandana Card upon approval.</li>
        </ol>
      </section>
    </>
  );
}
