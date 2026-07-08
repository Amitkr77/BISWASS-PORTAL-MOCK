import { fmtIN } from '../../utils/format';
import { BENEFICIARY_ENROLLMENT_TOTALS } from './beneficiaryData';
import { TREATMENT_SUPPORT_TOTALS } from './hospitalData';

export const DASHBOARD_TYPES = {
  'ab-pmjay': {
    id: 'ab-pmjay',
    slug: 'ab-pmjay',
    label: 'AB-PMJAY Dashboard',
    shortLabel: 'AB-PMJAY',
    reportLabel: 'AB-PMJAY Report',
    description: 'Key performance indicators for AB-PMJAY / MMJAY enrolment and card issuance in Bihar.',
    overviewCards: {
      'beneficiary-enrollment': {
        id: 'beneficiary-enrollment',
        title: 'Beneficiary Enrollment',
        description: 'Families and beneficiaries verified for enrolment under AB-PMJAY / MMJAY, by district and scheme (PMJAY / MCSY).',
        kpis: [
          { label: 'Families Verified', value: fmtIN(BENEFICIARY_ENROLLMENT_TOTALS.total.families) },
          { label: 'Beneficiaries Verified', value: fmtIN(BENEFICIARY_ENROLLMENT_TOTALS.total.beneficiaries) }
        ]
      },
      'treatment-support': {
        id: 'treatment-support',
        title: 'Treatment Support',
        description: 'Hospitalisation cases registered and claims submitted for beneficiaries, across empanelled public and private hospitals.',
        kpis: [
          { label: 'No of Beneficiaries', value: fmtIN(TREATMENT_SUPPORT_TOTALS.beneficiaries) },
          { label: 'No of Cases Registered', value: fmtIN(TREATMENT_SUPPORT_TOTALS.casesRegistered) },
          { label: 'No of Claims Submitted', value: fmtIN(TREATMENT_SUPPORT_TOTALS.claimsSubmitted) }
        ]
      }
    }
  },

  vvs: {
    id: 'vvs',
    slug: 'vvs',
    label: 'VVS Dashboard',
    shortLabel: 'VVS',
    reportLabel: 'VVS Report',
    description: 'Vay Vandana Scheme (VVS): Ayushman Vay Vandana card generation for senior citizens, block and district wise, across Uttar Pradesh.'
  },

  operator: {
    id: 'operator',
    slug: 'operator',
    label: 'Operator Dashboard',
    shortLabel: 'Operator',
    reportLabel: 'Operator Report',
    description: 'CSC / VLE operator activity: card requests and approvals by beneficiary district, across Uttar Pradesh.'
  }
};

export const DASHBOARD_TYPE_LIST = Object.values(DASHBOARD_TYPES);

export function getDashboardType(slug) {
  return DASHBOARD_TYPES[slug];
}

export function getOverviewCard(typeSlug, cardId) {
  const type = DASHBOARD_TYPES[typeSlug];
  return type?.overviewCards?.[cardId] || null;
}
