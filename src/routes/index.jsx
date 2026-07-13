import { lazy } from 'react';

const Home = lazy(() => import('../pages/Home'));
const Sitemap = lazy(() => import('../pages/Sitemap'));
const TermsAndConditions = lazy(() => import('../pages/TermsAndConditions'));
const ImportantLinks = lazy(() => import('../pages/ImportantLinks'));
const NotFound = lazy(() => import('../pages/NotFound'));

const AboutAyushmanBharat = lazy(() => import('../pages/about/AboutAyushmanBharat'));
const PmjayGuidelines = lazy(() => import('../pages/about/PmjayGuidelines'));
const SchemeCoverage = lazy(() => import('../pages/about/SchemeCoverage'));
const CoverFamilyBenefits = lazy(() => import('../pages/about/CoverFamilyBenefits'));
const Features = lazy(() => import('../pages/about/Features'));
const Faq = lazy(() => import('../pages/about/Faq'));

const AyushmanCard = lazy(() => import('../pages/citizen-guides/AyushmanCard'));
const AyushmanCardCreationVideo = lazy(() => import('../pages/citizen-guides/AyushmanCardCreationVideo'));
const CardsByAshas = lazy(() => import('../pages/citizen-guides/CardsByAshas'));
const DeEmpanelledHospitals = lazy(() => import('../pages/citizen-guides/DeEmpanelledHospitals'));
const EligibilityVerification = lazy(() => import('../pages/citizen-guides/EligibilityVerification'));
const FindHospital = lazy(() => import('../pages/citizen-guides/FindHospital'));
const GrievanceSubmission = lazy(() => import('../pages/citizen-guides/GrievanceSubmission'));
const HospitalEmpanelment = lazy(() => import('../pages/citizen-guides/HospitalEmpanelment'));
const QualityCertification = lazy(() => import('../pages/citizen-guides/QualityCertification'));
const VayVandanaCardVideo = lazy(() => import('../pages/citizen-guides/VayVandanaCardVideo'));

const ContactUs = lazy(() => import('../pages/contact/ContactUs'));
const DistrictTeam = lazy(() => import('../pages/contact/DistrictTeam'));
const StateTeam = lazy(() => import('../pages/contact/StateTeam'));

const Careers = lazy(() => import('../pages/governance/Careers'));
const CareersApply = lazy(() => import('../pages/governance/CareersApply'));
const Posh = lazy(() => import('../pages/governance/Posh'));
const Rfq = lazy(() => import('../pages/governance/Rfq'));
const RolesResponsibilities = lazy(() => import('../pages/governance/RolesResponsibilities'));
const Tender = lazy(() => import('../pages/governance/Tender'));

const LettersCirculars = lazy(() => import('../pages/notifications/LettersCirculars'));
const Notification = lazy(() => import('../pages/notifications/Notification'));
const OfficeOrders = lazy(() => import('../pages/notifications/OfficeOrders'));

const RtiAct = lazy(() => import('../pages/rti/RtiAct'));
const RtiAppeal = lazy(() => import('../pages/rti/RtiAppeal'));

const Events = lazy(() => import('../pages/updates/Events'));
const EventDetail = lazy(() => import('../pages/updates/EventDetail'));
const Iec = lazy(() => import('../pages/updates/Iec'));
const PhotoGallery = lazy(() => import('../pages/updates/PhotoGallery'));
const Spotlight = lazy(() => import('../pages/updates/Spotlight'));
const SuccessStories = lazy(() => import('../pages/updates/SuccessStories'));
const VideoGallery = lazy(() => import('../pages/updates/VideoGallery'));

/** Route table: path -> lazy page component. Mirrors the original site's folder/URL structure
 *  (minus the .html extensions), so old internal links only need their extension stripped.
 *  `/dashboard` is wired separately in App.jsx since it uses DashboardLayout, not MainLayout. */
export const ROUTES = [
  { path: '/', Component: Home },
  { path: '/sitemap', Component: Sitemap },
  { path: '/terms-and-conditions', Component: TermsAndConditions },
  { path: '/important-links', Component: ImportantLinks },

  { path: '/about/about-ayushman-bharat', Component: AboutAyushmanBharat },
  { path: '/about/pmjay-guidelines', Component: PmjayGuidelines },
  { path: '/about/scheme-coverage', Component: SchemeCoverage },
  { path: '/about/cover-family-benefits', Component: CoverFamilyBenefits },
  { path: '/about/features', Component: Features },
  { path: '/about/faq', Component: Faq },

  { path: '/citizen-guides/ayushman-card', Component: AyushmanCard },
  { path: '/citizen-guides/ayushman-card-creation-video', Component: AyushmanCardCreationVideo },
  { path: '/citizen-guides/cards-by-ashas', Component: CardsByAshas },
  { path: '/citizen-guides/de-empanelled-hospitals', Component: DeEmpanelledHospitals },
  { path: '/citizen-guides/eligibility-verification', Component: EligibilityVerification },
  { path: '/citizen-guides/find-hospital', Component: FindHospital },
  { path: '/citizen-guides/grievance-submission', Component: GrievanceSubmission },
  { path: '/citizen-guides/hospital-empanelment', Component: HospitalEmpanelment },
  { path: '/citizen-guides/quality-certification', Component: QualityCertification },
  { path: '/citizen-guides/vay-vandana-card-video', Component: VayVandanaCardVideo },

  { path: '/contact/contact-us', Component: ContactUs },
  { path: '/contact/district-team', Component: DistrictTeam },
  { path: '/contact/state-team', Component: StateTeam },

  { path: '/governance/careers', Component: Careers },
  { path: '/governance/careers/apply', Component: CareersApply },
  { path: '/governance/posh', Component: Posh },
  { path: '/governance/rfq', Component: Rfq },
  { path: '/governance/roles-responsibilities', Component: RolesResponsibilities },
  { path: '/governance/tender', Component: Tender },

  { path: '/notifications/letters-circulars', Component: LettersCirculars },
  { path: '/notifications/notification', Component: Notification },
  { path: '/notifications/office-orders', Component: OfficeOrders },

  { path: '/rti/rti-act', Component: RtiAct },
  { path: '/rti/rti-appeal', Component: RtiAppeal },

  { path: '/updates/events', Component: Events },
  { path: '/updates/events/:slug', Component: EventDetail },
  { path: '/updates/iec', Component: Iec },
  { path: '/updates/photo-gallery', Component: PhotoGallery },
  { path: '/updates/spotlight', Component: Spotlight },
  { path: '/updates/success-stories', Component: SuccessStories },
  { path: '/updates/video-gallery', Component: VideoGallery },

  { path: '*', Component: NotFound }
];
