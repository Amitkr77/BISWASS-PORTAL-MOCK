import { UP_DISTRICTS } from '../../utils/upDistricts';
import { districtBreakdown, seededInt } from '../../utils/mockRandom';

export const VVS_TOTALS = {
  districtsCovered: UP_DISTRICTS.length,
  blocksCovered: 791,
  individualsCovered: 2236543
};

/** District-wise individuals covered (a.k.a. cards generated), kept in natural district order to match the reference chart/report. */
export const VVS_DISTRICT_DATA = districtBreakdown('vvs-individuals', VVS_TOTALS.individualsCovered, UP_DISTRICTS, { sort: false });

export const VVS_REPORT_DATES = ['30-06-2026', '01-07-2026', '02-07-2026'];

function lookup(district) {
  return VVS_DISTRICT_DATA.find((d) => d.district === district).value;
}

/** District x recent daily card-generation counts + lifetime total, for the VVS district report. */
export const VVS_DISTRICT_REPORT = UP_DISTRICTS.map((district) => ({
  district,
  daily: VVS_REPORT_DATES.map((date, i) => ({ date, value: seededInt(`vvs-daily-${district}-${i}`, 5, 95) })),
  total: lookup(district)
}));
