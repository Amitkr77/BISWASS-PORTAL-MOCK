import Breadcrumb from "../../components/common/Breadcrumb";
import PageBanner from "../../components/common/PageBanner";

export default function Posh() {
  return (
    <>
      <Breadcrumb items={[{ label: "Governance" }, { label: "POSH" }]} />
      <PageBanner
        title="Prevention of Sexual Harassment (POSH)"
        description="BSSS is committed to providing a safe and respectful workplace for all employees."
      />

      <section className="max-w-7xl mx-auto px-4 py-10 gov-prose">
        <h2>Policy Statement</h2>
        <p>
          The Bihar Swasthya Suraksha Samiti (BSSS) is committed to providing a
          safe, respectful and harassment-free workplace for all employees, in
          accordance with the Sexual Harassment of Women at Workplace
          (Prevention, Prohibition and Redressal) Act, 2013.
        </p>
        <h2>Internal Complaints Committee (ICC)</h2>
        <p>
          An Internal Complaints Committee has been constituted at the State
          Office to receive, inquire into and dispose of complaints of sexual
          harassment in accordance with the Act. The composition of the
          Committee is notified through an Office Order and made available under{" "}
          <strong>Notifications & Circulars &rsaquo; Office Orders</strong>.
        </p>
        <h2>Filing a Complaint</h2>
        <p>
          Any aggrieved employee may submit a written complaint to the Internal
          Complaints Committee within the prescribed timeline. Complaints are
          handled with strict confidentiality, and the Committee is required to
          complete its inquiry within 90 days of receipt.
        </p>
      </section>
    </>
  );
}
