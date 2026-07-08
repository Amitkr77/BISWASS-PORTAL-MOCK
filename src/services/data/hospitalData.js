import { BIHAR_DISTRICTS } from '../../utils/biharDistricts';
import { districtBreakdown, seededRandom, seededInt } from '../../utils/mockRandom';

export const HOSPITAL_TOTALS = { public: 433, private: 891 };

export const HOSPITAL_DISTRICT_BREAKDOWN = {
  public: districtBreakdown('hospital-public', HOSPITAL_TOTALS.public, BIHAR_DISTRICTS),
  private: districtBreakdown('hospital-private', HOSPITAL_TOTALS.private, BIHAR_DISTRICTS)
};

/** District x Public/Private/Total, sorted by total empanelled hospitals highest to lowest. */
export const HOSPITAL_DISTRICT_TABLE = BIHAR_DISTRICTS
  .map((district) => {
    const publicCount = HOSPITAL_DISTRICT_BREAKDOWN.public.find((d) => d.district === district).value;
    const privateCount = HOSPITAL_DISTRICT_BREAKDOWN.private.find((d) => d.district === district).value;
    return { district, public: publicCount, private: privateCount, total: publicCount + privateCount };
  })
  .sort((a, b) => b.total - a.total);

export function getHospitalCount(district, type) {
  const row = HOSPITAL_DISTRICT_BREAKDOWN[type]?.find((d) => d.district === district);
  return row ? row.value : 0;
}

const PUBLIC_KINDS = ['Sadar Hospital', 'District Hospital', 'Referral Hospital', 'Primary Health Centre', 'Community Health Centre', 'Sub-Divisional Hospital', 'Additional PHC'];
const PRIVATE_KINDS = ['Multi-Specialty Hospital', 'Nursing Home', 'Medical Centre', 'Charitable Hospital', 'Trust Hospital', 'Super-Specialty Hospital'];
const ADDRESS_AREAS = ['Near Collectorate', 'Civil Lines', 'Station Road', 'Court Road', 'Hospital Chowk', 'Ward No. 5', 'Gandhi Maidan Road', 'Bus Stand Road', 'NH Bypass Road', 'Sadar Bazar'];
const SPECIALTY_POOL = [
  'General Medicine', 'General Surgery', 'Orthopedics', 'Gynaecology & Obstetrics', 'Pediatrics',
  'Cardiology', 'Nephrology', 'Oncology', 'Neurology', 'ENT', 'Ophthalmology', 'Urology',
  'Gastroenterology', 'Trauma Care', 'Dermatology', 'Psychiatry', 'Pulmonology', 'Emergency Medicine'
];

function pickSpecialties(seed, count) {
  const pool = [...SPECIALTY_POOL];
  const picked = [];
  for (let i = 0; i < count && pool.length; i += 1) {
    const idx = Math.floor(seededRandom(`${seed}-sp${i}`) * pool.length);
    picked.push(pool.splice(idx, 1)[0]);
  }
  return picked;
}

/** A few districts share the same first 3 letters (Sheohar/Sheikhpura, Madhubani/Madhepura) — append
 *  the district's index so generated hospital IDs stay unique across the whole state. */
function districtCode(district) {
  const prefix = district.replace(/\s+/g, '').slice(0, 3).toUpperCase();
  return `${prefix}${String(BIHAR_DISTRICTS.indexOf(district)).padStart(2, '0')}`;
}

function buildHospital(district, type, i) {
  const seed = `hosp-${type}-${district}-${i}`;
  const kinds = type === 'public' ? PUBLIC_KINDS : PRIVATE_KINDS;
  const kind = kinds[Math.floor(seededRandom(`${seed}-kind`) * kinds.length)];
  const code = type === 'public' ? 'PUB' : 'PVT';
  const area = ADDRESS_AREAS[Math.floor(seededRandom(`${seed}-area`) * ADDRESS_AREAS.length)];
  const pincode = 800000 + seededInt(`${seed}-pin`, 1, 899);
  const specialtyCount = seededInt(`${seed}-spc`, type === 'public' ? 2 : 4, type === 'public' ? 5 : 9);
  const phoneStart = seededInt(`${seed}-ph1`, 70, 99);
  const phoneRest = seededInt(`${seed}-ph2`, 10000000, 99999999);

  return {
    id: `BSSS/${code}/${districtCode(district)}/${String(i + 1).padStart(4, '0')}`,
    name: `${kind} – ${district} #${i + 1}`,
    type: type === 'public' ? 'Public' : 'Private',
    district,
    address: `${kind}, ${area}, ${district}, Bihar - ${pincode}`,
    contactNumber: `+91 ${phoneStart}${phoneRest}`,
    specialties: pickSpecialties(seed, specialtyCount)
  };
}

/** Generates a stable, deterministic list of mock empanelled hospitals for a district + type. */
export function getHospitalsForDistrict(district, type) {
  const count = getHospitalCount(district, type);
  return Array.from({ length: count }, (_, i) => buildHospital(district, type, i));
}

const ALL_PUBLIC_SHELLS = BIHAR_DISTRICTS.flatMap((district) => getHospitalsForDistrict(district, 'public'));
const ALL_PRIVATE_SHELLS = BIHAR_DISTRICTS.flatMap((district) => getHospitalsForDistrict(district, 'private'));
const ALL_HOSPITAL_IDS = [...ALL_PUBLIC_SHELLS, ...ALL_PRIVATE_SHELLS].map((h) => h.id);

/** Treatment Support totals (see Beneficiary Treatment Statistics spec), distributed across every empanelled hospital. */
export const TREATMENT_SUPPORT_TOTALS = {
  beneficiaries: 2746047,
  casesRegistered: 6948235,
  claimsSubmitted: 6882696
};

const BENEFICIARY_COUNT_BY_ID = new Map(
  districtBreakdown('treatment-beneficiaries', TREATMENT_SUPPORT_TOTALS.beneficiaries, ALL_HOSPITAL_IDS).map((d) => [d.district, d.value])
);
const PREAUTH_COUNT_BY_ID = new Map(
  districtBreakdown('treatment-preauth', TREATMENT_SUPPORT_TOTALS.casesRegistered, ALL_HOSPITAL_IDS).map((d) => [d.district, d.value])
);
const CLAIMS_COUNT_BY_ID = new Map(
  districtBreakdown('treatment-claims', TREATMENT_SUPPORT_TOTALS.claimsSubmitted, ALL_HOSPITAL_IDS).map((d) => [d.district, d.value])
);

function withTreatmentStats(hospital) {
  const beneficiaryCount = BENEFICIARY_COUNT_BY_ID.get(hospital.id) || 0;
  const preAuthCount = PREAUTH_COUNT_BY_ID.get(hospital.id) || 0;
  const claimsCount = CLAIMS_COUNT_BY_ID.get(hospital.id) || 0;
  const preAuthAmount = preAuthCount * seededInt(`${hospital.id}-paa`, 18000, 55000);
  const claimedAmount = claimsCount * seededInt(`${hospital.id}-ca`, 16000, 50000);
  return { ...hospital, beneficiaryCount, preAuthCount, preAuthAmount, claimsCount, claimedAmount };
}

/** Every empanelled hospital with its Beneficiary Treatment Statistics attached (see 5.3.3). */
export const ALL_PUBLIC_HOSPITALS = ALL_PUBLIC_SHELLS.map(withTreatmentStats);
export const ALL_PRIVATE_HOSPITALS = ALL_PRIVATE_SHELLS.map(withTreatmentStats);
