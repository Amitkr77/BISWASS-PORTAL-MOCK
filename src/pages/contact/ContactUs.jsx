import Breadcrumb from '../../components/common/Breadcrumb';
import PageBanner from '../../components/common/PageBanner';
import { useValidatedForm } from '../../hooks/useValidatedForm';
import { FormErrorSummary, FormSuccessBox } from '../../components/common/FormStatus';
import FormField from '../../components/common/FormField';

const SUCCESS_MESSAGE = 'Thank you for writing to us. Your message has been received and will be responded to within 3 working days.';

const SUBJECT_OPTIONS = ['General Enquiry', 'Ayushman Card', 'Hospital Empanelment', 'Grievance', 'Media / Press'];

export default function ContactUs() {
  const { formRef, errors, submitted, showErrorSummary, handleBlur, handleInput, handleSubmit } = useValidatedForm();

  return (
    <>
      <Breadcrumb items={[{ label: 'Contact Us' }]} />
      <PageBanner title="Contact Us" description="Reach the BSSS State Office for general enquiries, or use the helpline for urgent assistance." />

      <section className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-govt-blue-dark mb-4">Write to Us</h2>
          <form ref={formRef} className="space-y-5" noValidate onSubmit={handleSubmit}>
            <FormErrorSummary show={showErrorSummary} />
            <FormSuccessBox show={submitted}>{SUCCESS_MESSAGE}</FormSuccessBox>
            <div className="grid sm:grid-cols-2 gap-5">
              <FormField
                id="contact-name"
                label="Full Name"
                required
                autoComplete="name"
                error={errors['contact-name']}
                onBlur={handleBlur}
                onInput={handleInput}
              />
              <FormField
                id="contact-email"
                label="Email Address"
                type="email"
                required
                autoComplete="email"
                error={errors['contact-email']}
                onBlur={handleBlur}
                onInput={handleInput}
              />
              <FormField
                id="contact-phone"
                label="Mobile Number"
                type="tel"
                autoComplete="tel"
                error={errors['contact-phone']}
                onBlur={handleBlur}
                onInput={handleInput}
              />
              <FormField
                as="select"
                id="contact-subject"
                label="Subject"
                required
                error={errors['contact-subject']}
                onBlur={handleBlur}
                onInput={handleInput}
              >
                <option value="" disabled>Select an option</option>
                {SUBJECT_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
              </FormField>
            </div>
            <FormField
              as="textarea"
              id="contact-message"
              label="Message"
              required
              error={errors['contact-message']}
              onBlur={handleBlur}
              onInput={handleInput}
            />
            <button type="submit" className="btn-primary">Send Message</button>
          </form>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-govt-blue-dark mb-4">Office Address</h2>
          <div className="info-card">
            <p className="font-semibold text-govt-gray-900">Bihar Swasthya Suraksha Samiti (BSSS)</p>
            <p className="text-sm text-govt-gray-700 mt-2 leading-relaxed">State Health Society Bihar Campus,<br />Sheikhpura, Patna &ndash; 800014,<br />Bihar, India</p>
            <p className="text-sm text-govt-gray-700 mt-3">Toll-Free Helpline: <a href="tel:14555" className="text-govt-blue hover:underline">14555</a></p>
            <p className="text-sm text-govt-gray-700">Email: <a href="mailto:helpdesk-biswass@bihar.gov.in" className="text-govt-blue hover:underline">helpdesk-biswass@bihar.gov.in</a></p>
            <p className="text-sm text-govt-gray-700 mt-3">Office Hours: Monday &ndash; Saturday, 10:00 AM &ndash; 5:00 PM (closed on gazetted holidays)</p>
          </div>
          <div className="placeholder-media h-56 rounded-sm mt-5" role="img" aria-label="Placeholder map showing the location of the BSSS State Office in Patna">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-14 h-14 opacity-25" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" /></svg>
          </div>
        </div>
      </section>
    </>
  );
}
