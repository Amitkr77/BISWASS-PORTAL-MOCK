import { Link, useSearchParams } from "react-router-dom";
import Breadcrumb from "../../components/common/Breadcrumb";
import PageBanner from "../../components/common/PageBanner";
import { useValidatedForm } from "../../hooks/useValidatedForm";
import { FormErrorSummary, FormSuccessBox } from "../../components/common/FormStatus";
import FormField from "../../components/common/FormField";
import { JOBS } from "./Careers";

const SUCCESS_MESSAGE =
  "Thank you. Your application has been received. Our recruitment team will contact you if your profile is shortlisted.";

export default function CareersApply() {
  const [searchParams] = useSearchParams();
  const preselectedPosition = searchParams.get("position") || "";
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
          { label: "Governance" },
          { label: "Careers", href: "/governance/careers" },
          { label: "Apply" },
        ]}
      />
      <PageBanner
        title="Apply for a Position"
        description="Submit your application for an open role at the Bihar Swasthya Suraksha Samiti."
      />

      <section className="max-w-3xl mx-auto px-4 py-10">
        <Link
          to="/governance/careers"
          className="text-sm font-semibold text-govt-blue hover:underline"
        >
          &larr; Back to all openings
        </Link>

        <p className="text-sm text-govt-gray-600 my-6">
          Fields marked with <span className="text-govt-red">*</span> are
          mandatory. Shortlisted candidates will be contacted via the email
          address or phone number provided below.
        </p>

        <form ref={formRef} className="space-y-5" noValidate onSubmit={handleSubmit}>
          <FormErrorSummary show={showErrorSummary} />
          <FormSuccessBox show={submitted}>{SUCCESS_MESSAGE}</FormSuccessBox>
          <div className="grid sm:grid-cols-2 gap-5">
            <FormField
              id="careers-name"
              label="Full Name"
              required
              autoComplete="name"
              error={errors["careers-name"]}
              onBlur={handleBlur}
              onInput={handleInput}
            />
            <FormField
              id="careers-email"
              label="Email Address"
              type="email"
              required
              autoComplete="email"
              error={errors["careers-email"]}
              onBlur={handleBlur}
              onInput={handleInput}
            />
            <div>
              <FormField
                id="careers-phone"
                label="Phone Number"
                type="tel"
                required
                autoComplete="tel"
                error={errors["careers-phone"]}
                onBlur={handleBlur}
                onInput={handleInput}
              />
              <p className="text-xs text-govt-gray-600 mt-1">
                10-digit mobile number
              </p>
            </div>
            <FormField
              as="select"
              id="careers-position"
              label="Position Applied For"
              required
              defaultValue={preselectedPosition}
              error={errors["careers-position"]}
              onBlur={handleBlur}
              onInput={handleInput}
            >
              <option value="" disabled>
                Select an option
              </option>
              {JOBS.map((job) => (
                <option key={job.id} value={job.title}>
                  {job.title}
                </option>
              ))}
            </FormField>
          </div>
          <FormField
            id="careers-qualification"
            label="Highest Qualification"
            required
            placeholder="e.g. MBBS, MBA, Graduate"
            error={errors["careers-qualification"]}
            onBlur={handleBlur}
            onInput={handleInput}
          />
          <div>
            <FormField
              as="textarea"
              id="careers-message"
              label="Cover Letter / Additional Information"
              error={errors["careers-message"]}
              onBlur={handleBlur}
              onInput={handleInput}
            />
            <p className="text-xs text-govt-gray-600 mt-1">
              Optional: briefly describe your relevant experience.
            </p>
          </div>
          <button type="submit" className="btn-primary">
            Submit Application
          </button>
        </form>
      </section>
    </>
  );
}
