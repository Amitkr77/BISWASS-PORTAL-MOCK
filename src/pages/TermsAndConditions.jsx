import Breadcrumb from "../components/common/Breadcrumb";
import PageBanner from "../components/common/PageBanner";

export default function TermsAndConditions() {
  return (
    <>
      <Breadcrumb items={[{ label: "Terms & Conditions" }]} />
      <PageBanner
        title="Terms & Conditions"
        description="Terms governing the use of this website."
      />
      <section className="max-w-7xl mx-auto px-4 py-10 gov-prose">
        <h2>Content Ownership</h2>
        <p>
          This website is a public information portal maintained on behalf of
          the Bihar Swasthya Suraksha Samiti (BSSS), Government of Bihar.
          Content is provided for general informational purposes regarding the
          Ayushman Bharat &ndash; Pradhan Mantri Jan Arogya Yojana (AB-PMJAY)
          and Mukhyamantri Jan Arogya Yojana (MMJAY) schemes.
        </p>
        <h2>Accuracy of Information</h2>
        <p>
          While every effort is made to keep information on this website
          accurate and up to date, BSSS makes no warranty regarding the
          completeness or accuracy of the content. In case of any discrepancy,
          the official scheme guidelines issued by the National Health Authority
          and Government of Bihar shall prevail.
        </p>
        <h2>Hyperlinking Policy</h2>
        <p>
          This website may contain links to external portals for services such
          as card creation or hospital login. BSSS is not responsible for the
          content or privacy practices of external websites.
        </p>
        <h2>Grievances</h2>
        <p>
          Any concerns regarding the content or functioning of this website may
          be raised through the <strong>Contact Us</strong> page.
        </p>
      </section>
    </>
  );
}
