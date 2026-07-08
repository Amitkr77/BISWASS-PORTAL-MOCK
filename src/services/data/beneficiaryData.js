import { BIHAR_DISTRICTS } from '../../utils/biharDistricts';
import { districtBreakdown } from '../../utils/mockRandom';

const FAMILY_TOTAL = 4307073;
const BENEFICIARY_TOTAL = 7883794;
const PMJAY_FAMILY_SHARE = 0.63;
const PMJAY_BENEFICIARY_SHARE = 0.6;

const pmjayFamilies = Math.round(FAMILY_TOTAL * PMJAY_FAMILY_SHARE);
const mcsyFamilies = FAMILY_TOTAL - pmjayFamilies;
const pmjayBeneficiaries = Math.round(BENEFICIARY_TOTAL * PMJAY_BENEFICIARY_SHARE);
const mcsyBeneficiaries = BENEFICIARY_TOTAL - pmjayBeneficiaries;

export const BENEFICIARY_ENROLLMENT_TOTALS = {
  pmjay: { families: pmjayFamilies, beneficiaries: pmjayBeneficiaries },
  mcsy: { families: mcsyFamilies, beneficiaries: mcsyBeneficiaries },
  total: { families: FAMILY_TOTAL, beneficiaries: BENEFICIARY_TOTAL }
};

const pmjayFamilyByDistrict = districtBreakdown('benef-pmjay-family', pmjayFamilies, BIHAR_DISTRICTS);
const pmjayBeneficiaryByDistrict = districtBreakdown('benef-pmjay-beneficiary', pmjayBeneficiaries, BIHAR_DISTRICTS);
const mcsyFamilyByDistrict = districtBreakdown('benef-mcsy-family', mcsyFamilies, BIHAR_DISTRICTS);
const mcsyBeneficiaryByDistrict = districtBreakdown('benef-mcsy-beneficiary', mcsyBeneficiaries, BIHAR_DISTRICTS);

function lookup(arr, district) {
  return arr.find((d) => d.district === district).value;
}

/** District Name x PMJAY/MCSY/Total families & beneficiaries (see Beneficiary Enrolment Statistics spec). */
export const BENEFICIARY_ENROLLMENT_DISTRICT_TABLE = BIHAR_DISTRICTS
  .map((district) => {
    const pmjayFamiliesD = lookup(pmjayFamilyByDistrict, district);
    const pmjayBeneficiariesD = lookup(pmjayBeneficiaryByDistrict, district);
    const mcsyFamiliesD = lookup(mcsyFamilyByDistrict, district);
    const mcsyBeneficiariesD = lookup(mcsyBeneficiaryByDistrict, district);
    return {
      district,
      pmjayFamilies: pmjayFamiliesD,
      pmjayBeneficiaries: pmjayBeneficiariesD,
      mcsyFamilies: mcsyFamiliesD,
      mcsyBeneficiaries: mcsyBeneficiariesD,
      totalFamilies: pmjayFamiliesD + mcsyFamiliesD,
      totalBeneficiaries: pmjayBeneficiariesD + mcsyBeneficiariesD
    };
  })
  .sort((a, b) => b.totalBeneficiaries - a.totalBeneficiaries);
