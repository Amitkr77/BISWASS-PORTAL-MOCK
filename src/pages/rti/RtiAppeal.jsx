import Breadcrumb from '../../components/common/Breadcrumb';
import PageBanner from '../../components/common/PageBanner';
import { useValidatedForm } from '../../hooks/useValidatedForm';
import { FormErrorSummary, FormSuccessBox } from '../../components/common/FormStatus';
import FormField from '../../components/common/FormField';

const SUCCESS_MESSAGE = 'Your RTI request has been recorded. An acknowledgement with a reference number has been sent to your registered email / mobile number. A response will be provided within the statutory timeline of 30 days.';

const REQUEST_TYPES = ['New RTI Application', 'First Appeal', 'Second Appeal'];

export default function RtiAppeal() {
  const { formRef, errors, submitted, showErrorSummary, handleBlur, handleInput, handleSubmit } = useValidatedForm();

  return (
    <>
      <Breadcrumb items={[{ label: 'RTI' }, { label: 'RTI Appeal / Apply' }]} />
      <PageBanner title="RTI Appeal / Apply" description="Submit a new RTI application, or file an appeal against a previous response." />
      <section className="max-w-3xl mx-auto px-4 pb-14">
        <h2 className="text-xl sm:text-2xl font-heading font-bold text-govt-blue-dark mb-2">Submit an RTI Application / Appeal</h2>
        <p className="text-sm text-govt-gray-600 mb-6">Use this form to request information under Section 6(1) of the RTI Act, 2005, or to file a first appeal under Section 19. You will receive an acknowledgement with a reference number.</p>
        <form ref={formRef} className="space-y-5" noValidate onSubmit={handleSubmit}>
          <FormErrorSummary show={showErrorSummary} />
          <FormSuccessBox show={submitted}>{SUCCESS_MESSAGE}</FormSuccessBox>

          <div className="grid sm:grid-cols-2 gap-5">
            <FormField
              id="rti-name"
              label="Applicant Name"
              required
              autoComplete="name"
              error={errors['rti-name']}
              onBlur={handleBlur}
              onInput={handleInput}
            />
            <FormField
              id="rti-email"
              label="Email Address"
              type="email"
              required
              autoComplete="email"
              error={errors['rti-email']}
              onBlur={handleBlur}
              onInput={handleInput}
            />
            <FormField
              id="rti-phone"
              label="Mobile Number"
              type="tel"
              required
              autoComplete="tel"
              error={errors['rti-phone']}
              onBlur={handleBlur}
              onInput={handleInput}
            />
            <FormField
              as="select"
              id="rti-type"
              label="Request Type"
              required
              error={errors['rti-type']}
              onBlur={handleBlur}
              onInput={handleInput}
            >
              <option value="" disabled>Select an option</option>
              {REQUEST_TYPES.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </FormField>
          </div>

          <div>
            <FormField
              as="textarea"
              id="rti-address"
              label="Postal Address"
              error={errors['rti-address']}
              onBlur={handleBlur}
              onInput={handleInput}
            />
            <p className="text-xs text-govt-gray-600 mt-1">Required if you wish to receive a response by post.</p>
          </div>

          <div>
            <FormField
              as="textarea"
              id="rti-details"
              label="Information Sought / Grounds of Appeal"
              required
              error={errors['rti-details']}
              onBlur={handleBlur}
              onInput={handleInput}
            />
            <p className="text-xs text-govt-gray-600 mt-1">Be as specific as possible to help the PIO locate the relevant records.</p>
          </div>

          <button type="submit" className="btn-primary">Submit</button>
        </form>
      </section>
    </>
  );
}
