import Breadcrumb from '../../components/common/Breadcrumb';
import PageBanner from '../../components/common/PageBanner';
import { useValidatedForm } from '../../hooks/useValidatedForm';
import { FormErrorSummary, FormSuccessBox } from '../../components/common/FormStatus';
import FormField from '../../components/common/FormField';

const DEMO_MESSAGE = 'Based on the details provided, your household may be eligible. Please visit your nearest Common Service Centre with your ration card and Aadhaar to complete formal verification.';

const DISTRICTS = ['Patna', 'Gaya', 'Muzaffarpur', 'Bhagalpur', 'Darbhanga', 'Purnia', 'Nalanda', 'Begusarai'];

export default function EligibilityVerification() {
  const { formRef, errors, submitted, showErrorSummary, handleBlur, handleInput, handleSubmit } = useValidatedForm();

  return (
    <>
      <Breadcrumb items={[{ label: 'Citizen Guides' }, { label: 'Eligibility Verification' }]} />
      <PageBanner title="Eligibility Verification" description="Get a preliminary indication of your household&rsquo;s eligibility for AB-PMJAY / MMJAY coverage." />

      <section className="max-w-3xl mx-auto px-4 pb-14">
        <h2 className="text-xl sm:text-2xl font-heading font-bold text-govt-blue-dark mb-2">Check Your Eligibility</h2>
        <p className="text-sm text-govt-gray-600 mb-6">Enter your details below for a preliminary indication of eligibility. This is not a final determination &ndash; please visit your nearest Common Service Centre or empanelled hospital for formal verification using the Beneficiary Identification System (BIS).</p>
        <form ref={formRef} className="space-y-5" noValidate onSubmit={handleSubmit}>
          <FormErrorSummary show={showErrorSummary} />
          <FormSuccessBox show={submitted}>{DEMO_MESSAGE}</FormSuccessBox>

          <div className="grid sm:grid-cols-2 gap-5">
            <FormField
              id="elig-name"
              label="Head of Household Name"
              required
              autoComplete="name"
              error={errors['elig-name']}
              onBlur={handleBlur}
              onInput={handleInput}
            />
            <FormField
              id="elig-ration"
              label="Ration Card Number"
              required
              placeholder="e.g. BR-12-034-567"
              error={errors['elig-ration']}
              onBlur={handleBlur}
              onInput={handleInput}
            />
            <FormField
              as="select"
              id="elig-district"
              label="District"
              required
              error={errors['elig-district']}
              onBlur={handleBlur}
              onInput={handleInput}
            >
              <option value="" disabled>Select an option</option>
              {DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
            </FormField>
            <FormField
              id="elig-phone"
              label="Mobile Number"
              type="tel"
              required
              autoComplete="tel"
              error={errors['elig-phone']}
              onBlur={handleBlur}
              onInput={handleInput}
            />
          </div>
          <button type="submit" className="btn-primary">Check Eligibility</button>
        </form>
      </section>
    </>
  );
}
