/** In-memory seed data for the RBAC demo. Nothing here persists to a
 *  backend - AuthContext copies these arrays into React state on load. */

export const SEED_USERS = [
  {
    id: 'u-admin',
    name: 'System Administrator',
    email: 'admin@demo.com',
    password: 'admin123',
    role: 'admin',
    permissions: [],
    scope: null,
    district: null,
    active: true,
  },
  {
    id: 'u-notice',
    name: 'Notice Desk Officer',
    email: 'notice@demo.com',
    password: 'user123',
    role: 'user',
    permissions: ['notices'],
    scope: 'state',
    district: null,
    active: true,
  },
  {
    id: 'u-event',
    name: 'Event Desk Officer',
    email: 'event@demo.com',
    password: 'user123',
    role: 'user',
    permissions: ['events'],
    scope: 'district',
    district: 'Muzaffarpur',
    active: true,
  },
];

export const DEMO_CREDENTIALS = [
  { label: 'Administrator', email: 'admin@demo.com', password: 'admin123' },
  { label: 'Notice User', email: 'notice@demo.com', password: 'user123' },
  { label: 'Event User', email: 'event@demo.com', password: 'user123' },
];

export const SEED_RECORDS = {
  notices: [
    {
      id: 'n-1',
      title: 'Revised Claim Settlement Timelines for Empanelled Hospitals',
      category: 'Circular',
      date: '2026-06-18',
      description: 'All empanelled hospitals must adhere to the revised 15-day claim settlement turnaround effective 1 July 2026.',
      createdBy: 'u-admin',
      createdAt: '2026-06-18T09:00:00.000Z',
      deletedAt: null,
    },
    {
      id: 'n-2',
      title: 'District Enrolment Camps Extended Through July',
      category: 'Advisory',
      date: '2026-06-25',
      description: 'Ayushman Card enrolment camps in all 38 districts are extended through the end of July to cover remaining households.',
      createdBy: 'u-notice',
      createdAt: '2026-06-25T09:00:00.000Z',
      deletedAt: null,
    },
  ],
  events: [
    {
      id: 'e-1',
      title: 'State Level Review Meeting - AB-PMJAY Bihar',
      venue: 'BSSS State Office, Patna',
      date: '2026-07-15',
      description: 'Quarterly review of enrolment, claims and hospital empanelment progress with district nodal officers.',
      createdBy: 'u-admin',
      createdAt: '2026-06-20T09:00:00.000Z',
      deletedAt: null,
    },
    {
      id: 'e-2',
      title: 'Mobile Enrolment Van Launch - Muzaffarpur',
      venue: 'Muzaffarpur District Collectorate',
      date: '2026-07-22',
      description: 'Flag-off of mobile enrolment vans equipped with biometric kits for remote block coverage.',
      createdBy: 'u-event',
      createdAt: '2026-06-28T09:00:00.000Z',
      deletedAt: null,
    },
  ],
};
