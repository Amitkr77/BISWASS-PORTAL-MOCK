import { Link } from 'react-router-dom';
import Breadcrumb from '../components/common/Breadcrumb';
import PageBanner from '../components/common/PageBanner';

const CITIZEN_SERVICES = [
  { titleEn: 'Ayushman Card Creation', descEn: 'Create or download your Ayushman Card online.', href: '/citizen-guides/ayushman-card' },
  { titleEn: 'Grievance Portal', descEn: 'Submit and track a grievance regarding treatment or claims.', href: '/citizen-guides/grievance-submission' },
  { titleEn: 'Ayushman Card Creation Video', descEn: 'Watch a step-by-step video tutorial.', href: '/citizen-guides/ayushman-card-creation-video' },
  { titleEn: 'Eligibility Verification', descEn: 'Check whether your family is eligible for the scheme.', href: '/citizen-guides/eligibility-verification' }
];

const HOSPITAL_DIRECTORIES = [
  { titleEn: 'Find Empanelled Hospital', descEn: 'Search hospitals empanelled under AB-PMJAY and MMJAY by name, district, type or specialty.', href: '/citizen-guides/find-hospital' },
  { titleEn: 'De-Empanelled / Suspended Hospitals', descEn: 'Hospitals temporarily suspended or de-empanelled following audit or compliance review.', href: '/citizen-guides/de-empanelled-hospitals' }
];

const PORTAL_LOGINS = [
  { id: 'bis-login', titleEn: 'BIS Login', descEn: 'Beneficiary Identification System – used by state and district functionaries for beneficiary verification.', href: '/login' },
  { id: 'tms-login', titleEn: 'TMS Login', descEn: 'Transaction Management System – used by empanelled hospitals to raise pre-authorisation and claims.', href: '/login' },
  { id: 'hospital-login', titleEn: 'Hospital Login', descEn: 'Portal access for empanelled hospital administrators and Arogya Mitras.', href: '/login' }
];

export default function ImportantLinks() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Important Links' }]} />
      <PageBanner title="Important Links" description="Quick access to services and portals used by beneficiaries, hospitals and programme staff." />

      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-xl sm:text-2xl font-heading font-bold text-govt-blue-dark mb-5">Citizen Services</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CITIZEN_SERVICES.map((item) => (
            <Link key={item.href} to={item.href} className="info-card block">
              <h3 className="font-semibold text-govt-blue-dark">{item.titleEn}</h3>
              <p className="text-sm text-govt-gray-600 mt-1">{item.descEn}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-govt-gray-50 border-y border-govt-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-govt-blue-dark mb-5">Portal Logins</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PORTAL_LOGINS.map((login) => (
              <div key={login.id} id={login.id} className="scroll-mt-48">
                <div className="info-card">
                  <h3 className="font-semibold text-govt-blue-dark">{login.titleEn}</h3>
                  <p className="text-sm text-govt-gray-600 mt-1 mb-3">{login.descEn}</p>
                  <Link to={login.href} className="btn-secondary text-sm">Proceed to Login</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-xl sm:text-2xl font-heading font-bold text-govt-blue-dark mb-5">Hospital Directories</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {HOSPITAL_DIRECTORIES.map((item) => (
            <Link key={item.href} to={item.href} className="info-card block">
              <h3 className="font-semibold text-govt-blue-dark">{item.titleEn}</h3>
              <p className="text-sm text-govt-gray-600 mt-1">{item.descEn}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
