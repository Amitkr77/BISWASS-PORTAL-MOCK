import Breadcrumb from "../../components/common/Breadcrumb";
import PageBanner from "../../components/common/PageBanner";
import { useValidatedForm } from "../../hooks/useValidatedForm";
import {
  FormErrorSummary,
  FormSuccessBox,
} from "../../components/common/FormStatus";
import FormField from "../../components/common/FormField";

const DEMO_MESSAGE =
  "Your grievance has been recorded. A reference number has been sent to your registered mobile number and email. The concerned District Grievance Redressal Committee will respond within the prescribed timeline.";

const CATEGORIES = [
  "Ayushman Card Creation",
  "Treatment Denial",
  "Claim / Billing Issue",
  "Hospital Conduct",
  "Other",
];

export default function GrievanceSubmission() {
  const {
    formRef,
    errors,
    submitted,
    showErrorSummary,
    handleBlur,
    handleInput,
    handleSubmit,
  } = useValidatedForm();

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Citizen Guides" },
          { label: "Grievance Submission Process" },
        ]}
      />
      <PageBanner
        title="Grievance Submission Process"
        description="A three-tier mechanism to raise and resolve grievances related to the scheme."
      />

      <section className="max-w-7xl mx-auto px-4 py-10 gov-prose">
        <h2>Grievance Redressal Levels</h2>
        <ol>
          <li>
            <strong>District Level:</strong> First point of contact, handled by
            the District Grievance Redressal Committee. Most grievances are
            resolved within this tier.
          </li>
          <li>
            <strong>State Level:</strong> Escalated grievances are reviewed by
            the State Grievance Redressal Committee at BSSS.
          </li>
          <li>
            <strong>National Level:</strong> Unresolved grievances may be
            escalated to the National Health Authority&rsquo;s Central Grievance
            Redressal Management System.
          </li>
        </ol>
      </section>

      {/* <section className="max-w-3xl mx-auto px-4 pb-14">
        <h2 className="text-xl sm:text-2xl font-heading font-bold text-govt-blue-dark mb-2">
          Submit a Grievance
        </h2>
        <p className="text-sm text-govt-gray-600 mb-6">
          Use this form to report an issue with card creation, treatment or
          claims. You will receive a reference number once your grievance is
          logged.
        </p>
        <form
          ref={formRef}
          className="space-y-5"
          noValidate
          onSubmit={handleSubmit}
        >
          <FormErrorSummary show={showErrorSummary} />
          <FormSuccessBox show={submitted}>{DEMO_MESSAGE}</FormSuccessBox>

          <div className="grid sm:grid-cols-2 gap-5">
            <FormField
              id="griev-name"
              label="Full Name"
              required
              autoComplete="name"
              error={errors["griev-name"]}
              onBlur={handleBlur}
              onInput={handleInput}
            />
            <FormField
              id="griev-phone"
              label="Mobile Number"
              type="tel"
              required
              autoComplete="tel"
              error={errors["griev-phone"]}
              onBlur={handleBlur}
              onInput={handleInput}
            />
            <FormField
              id="griev-email"
              label="Email Address"
              type="email"
              autoComplete="email"
              error={errors["griev-email"]}
              onBlur={handleBlur}
              onInput={handleInput}
            />
            <FormField
              as="select"
              id="griev-category"
              label="Grievance Category"
              required
              error={errors["griev-category"]}
              onBlur={handleBlur}
              onInput={handleInput}
            >
              <option value="" disabled>
                Select an option
              </option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </FormField>
          </div>
          <FormField
            as="textarea"
            id="griev-details"
            label="Grievance Details"
            required
            error={errors["griev-details"]}
            onBlur={handleBlur}
            onInput={handleInput}
          />
          <p className="text-xs text-govt-gray-600 -mt-3">
            Please include relevant dates, hospital name and Ayushman Card
            number, if applicable.
          </p>
          <button type="submit" className="btn-primary">
            Submit Grievance
          </button>
        </form>
      </section> */}
    </>
  );
}
