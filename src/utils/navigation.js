/**
 * Single source of truth for primary navigation. Drives both the desktop
 * mega-menu and the mobile accordion so the link list only exists once.
 */
export const NAV_ITEMS = [
  {
    id: 'home',
    labelEn: 'Home',
    labelHi: 'होम',
    href: '/'
  },
  {
    id: 'about',
    labelEn: 'About',
    labelHi: 'हमारे बारे में',
    links: [
      { labelEn: 'About Ayushman Bharat', href: '/about/about-ayushman-bharat' },
      { labelEn: 'AB-PMJAY Guidelines', href: '/about/pmjay-guidelines' },
      { labelEn: 'Scheme Coverage and Process', href: '/about/scheme-coverage' },
      { labelEn: 'Cover Family and Benefits', href: '/about/cover-family-benefits' },
      { labelEn: 'Ayushman Features', href: '/about/features' },
      { labelEn: 'FAQs', href: '/about/faq' }
    ]
  },
  {
    id: 'notifications',
    labelEn: 'Notifications & Circulars',
    labelHi: 'सूचनाएं / परिपत्र',
    links: [
      { labelEn: 'Letters & Circulars', href: '/notifications/letters-circulars' },
      { labelEn: 'Office Orders', href: '/notifications/office-orders' },
      { labelEn: 'Notification', href: '/notifications/notification' }
    ]
  },
  {
    id: 'governance',
    labelEn: 'Governance',
    labelHi: 'शासन',
    links: [
      { labelEn: 'Careers', href: '/governance/careers' },
      { labelEn: 'Tender', href: '/governance/tender' },
      { labelEn: 'Request for Quotation', href: '/governance/rfq' },
      { labelEn: 'POSH', href: '/governance/posh' },
      { labelEn: 'Roles and Responsibilities', href: '/governance/roles-responsibilities' }
    ]
  },
  {
    id: 'rti',
    labelEn: 'RTI',
    labelHi: 'सूचना का अधिकार',
    links: [
      { labelEn: 'RTI Act', href: '/rti/rti-act' },
      { labelEn: 'RTI Appeal / Apply', href: '/rti/rti-appeal' }
    ]
  },
  {
    id: 'important-links',
    labelEn: 'Important Links',
    labelHi: 'महत्वपूर्ण लिंक',
    links: [
      { labelEn: 'Ayushman Card Creation', href: '/citizen-guides/ayushman-card' },
      { labelEn: 'BIS Login', href: '/important-links#bis-login' },
      { labelEn: 'TMS Login', href: '/important-links#tms-login' },
      { labelEn: 'Hospital Login', href: '/important-links#hospital-login' },
      { labelEn: 'Find Empanelled Hospital', href: '/citizen-guides/find-hospital' },
      { labelEn: 'De-Empanelled / Suspended Hospitals', href: '/citizen-guides/de-empanelled-hospitals' },
      { labelEn: 'Grievance Portal', href: '/citizen-guides/grievance-submission' }
    ],
  },
  {
    id: 'updates',
    labelEn: 'Impact & Updates',
    labelHi: 'अपडेट और कहानियां',
    links: [
      { labelEn: 'Success Stories', href: '/updates/success-stories' },
      { labelEn: 'Spotlight', href: '/updates/spotlight' },
      { labelEn: 'Events', href: '/updates/events' },
      { labelEn: 'Photo Gallery', href: '/updates/photo-gallery' },
      { labelEn: 'Video Gallery', href: '/updates/video-gallery' }
    ]
  },
  {
    id: 'citizen-guides',
    labelEn: 'Citizen Guides',
    labelHi: 'नागरिक मार्गदर्शिका',
    wide: true,
    groups: [
      {
        titleEn: 'Guides',
        links: [
          { labelEn: 'Get Quality Certification', href: '/citizen-guides/quality-certification' },
          { labelEn: 'Hospital Empanelment Process', href: '/citizen-guides/hospital-empanelment' },
          { labelEn: 'Eligibility Verification', href: '/citizen-guides/eligibility-verification' },
          { labelEn: 'Grievance Submission Process', href: '/citizen-guides/grievance-submission' }
        ]
      },
      {
        titleEn: 'Ayushman Card',
        links: [
          { labelEn: 'Create Ayushman Card', href: '/citizen-guides/ayushman-card' },
          { labelEn: 'Ayushman Card Creation Video', href: '/citizen-guides/ayushman-card-creation-video' },
          { labelEn: 'Ayushman Vay Vandana Card Creation Video', href: '/citizen-guides/vay-vandana-card-video' }
        ]
      }
    ]
  },
  {
    id: 'contact',
    labelEn: 'Contact Us',
    labelHi: 'संपर्क करें',
    links: [
      { labelEn: 'Contact Us', href: '/contact/contact-us' },
      { labelEn: 'State Team', href: '/contact/state-team' },
      { labelEn: 'District Team', href: '/contact/district-team' }
    ]
  }
];

export const FOOTER_QUICK_LINKS = [
  { labelEn: 'About Ayushman Bharat', href: '/about/about-ayushman-bharat' },
  { labelEn: 'Notifications', href: '/notifications/notification' },
  { labelEn: 'Careers', href: '/governance/careers' },
  { labelEn: 'Grievance Submission', href: '/citizen-guides/grievance-submission' },
  { labelEn: 'Contact Us', href: '/contact/contact-us' }
];

export const FOOTER_CITIZEN_SERVICES = [
  { labelEn: 'Create Ayushman Card', href: '/citizen-guides/ayushman-card' },
  { labelEn: 'Programme Dashboard', href: '/dashboard' },
  { labelEn: 'Find Empanelled Hospital', href: '/citizen-guides/find-hospital' },
  { labelEn: 'Eligibility Verification', href: '/citizen-guides/eligibility-verification' },
  { labelEn: 'State Team', href: '/contact/state-team' },
  { labelEn: 'District Team', href: '/contact/district-team' }
];

/** Flat, searchable list of every page reachable from the primary nav
 *  (home + every dropdown link + every mega-menu group link), built once
 *  from NAV_ITEMS so the header search bar has one source of truth. */
export const SEARCH_INDEX = NAV_ITEMS.flatMap((item) => {
  if (item.href) return [{ labelEn: item.labelEn, href: item.href }];
  if (item.groups) return item.groups.flatMap((group) => group.links);
  return item.links;
});
