import Breadcrumb from "../../components/common/Breadcrumb";
import PageBanner from "../../components/common/PageBanner";

export default function AyushmanCard() {
  return (
    <>
      <Breadcrumb
        items={[{ label: "Citizen Guides" }, { label: "Create Ayushman Card" }]}
      />
      <PageBanner
        title="Create Ayushman Card"
        description="Three ways to create your Ayushman Card, and what documents you will need."
      />
      <section className="max-w-7xl mx-auto px-4 py-10 gov-prose">
        <h2>Documents Required</h2>
        <ul>
          <li>Aadhaar Card (or Aadhaar enrolment slip)</li>
          <li>
            Ration Card / valid proof of household inclusion in the beneficiary
            list
          </li>
          <li>Active mobile number for OTP verification</li>
        </ul>
        <h2>Ways to Create Your Card</h2>
        <ol>
          <li>
            <strong>Online:</strong> Visit the official card creation portal,
            verify your family details using your ration card number, complete
            e-KYC using Aadhaar, and download your card once approved.
          </li>
          <li>
            <strong>Common Service Centre (CSC):</strong> Visit your nearest CSC
            with the required documents; the operator will complete the process
            and print your card on the spot.
          </li>
          <li>
            <strong>Empanelled Hospital:</strong> At the time of admission, the
            Pradhan Mantri Arogya Mitra (PMAM) can assist in creating your card
            if you are not already enrolled.
          </li>
        </ol>
        <p>
          For a visual walkthrough, see the{" "}
          <strong>Ayushman Card Creation Video</strong> and{" "}
          <strong>Ayushman Vay Vandana Card Creation Video</strong> guides.
        </p>
      </section>
    </>
  );
}
