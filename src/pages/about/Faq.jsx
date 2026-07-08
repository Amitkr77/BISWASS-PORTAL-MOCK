import { Link } from "react-router-dom";
import Breadcrumb from "../../components/common/Breadcrumb";
import PageBanner from "../../components/common/PageBanner";
import Accordion from "../../components/common/Accordion";

const faqItems = [
  {
    question: "Who is eligible for AB-PMJAY in Bihar?",
    answer: (
      <>
        Families identified under the SECC 2011 deprivation and occupational
        criteria, along with additional families covered under the state-funded
        MMJAY scheme, are eligible. Eligibility can be checked on the{" "}
        <Link
          to="/citizen-guides/eligibility-verification"
          className="text-govt-blue hover:underline"
        >
          Eligibility Verification
        </Link>{" "}
        page.
      </>
    ),
  },
  {
    question: "How do I create my Ayushman Card?",
    answer: (
      <>
        You can create your Ayushman Card online through the card creation
        portal or by visiting your nearest Common Service Centre or empanelled
        hospital. Step-by-step instructions are available on the{" "}
        <Link
          to="/citizen-guides/ayushman-card"
          className="text-govt-blue hover:underline"
        >
          Create Ayushman Card
        </Link>{" "}
        page.
      </>
    ),
  },
  {
    question: "Is the treatment really cashless?",
    answer:
      "Yes. Beneficiaries do not need to pay for eligible treatment at any empanelled hospital, provided the treatment falls within the covered Health Benefit Package and pre-authorisation is approved.",
  },
  {
    question: "Can I use my Ayushman Card outside Bihar?",
    answer:
      "Yes. The scheme is fully portable — you can avail cashless treatment at any AB-PMJAY empanelled hospital anywhere in India.",
  },
  {
    question: "What do I do if my claim or treatment request is denied?",
    answer: (
      <>
        You may raise a grievance through the{" "}
        <Link
          to="/citizen-guides/grievance-submission"
          className="text-govt-blue hover:underline"
        >
          Grievance Submission Process
        </Link>{" "}
        page, which will be reviewed by the district or state grievance
        redressal committee.
      </>
    ),
  },
  {
    question: "How can a hospital apply for empanelment?",
    answer: (
      <>
        Hospitals meeting the eligibility criteria may apply through the
        Hospital Empanelment process described on the{" "}
        <Link
          to="/citizen-guides/hospital-empanelment"
          className="text-govt-blue hover:underline"
        >
          Hospital Empanelment Process
        </Link>{" "}
        page.
      </>
    ),
  },
];

export default function Faq() {
  return (
    <>
      <Breadcrumb
        items={[{ label: "About" }, { label: "Frequently Asked Questions" }]}
      />
      <PageBanner
        title="Frequently Asked Questions"
        description="Common questions from beneficiaries, hospitals and field functionaries about AB-PMJAY Bihar."
      />
      <section className="max-w-7xl mx-auto px-4 py-10">
        <Accordion items={faqItems} />
      </section>
    </>
  );
}
