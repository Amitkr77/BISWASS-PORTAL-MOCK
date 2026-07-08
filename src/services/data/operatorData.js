import { UP_DISTRICTS } from '../../utils/upDistricts';
import { districtBreakdown, seededInt } from '../../utils/mockRandom';

export const OPERATOR_TOTALS = {
  districtsCovered: UP_DISTRICTS.length,
  operators: 115351,
  cardRequests: 2928905,
  cardApproved: 2128060
};

/** District-wise operator count, kept in natural district order to match the reference chart/report. */
export const OPERATOR_DISTRICT_DATA = districtBreakdown('operator-total-operators', OPERATOR_TOTALS.operators, UP_DISTRICTS, { sort: false });

const cardRequestedByDistrict = districtBreakdown('operator-card-requested', OPERATOR_TOTALS.cardRequests, UP_DISTRICTS, { sort: false });

function lookup(arr, district) {
  return arr.find((d) => d.district === district).value;
}

/** District x operator activity, for the Operator Wise Report (As Per Beneficiary District).
 *  Card Approved is derived as a share of that same district's Card Requested, so it can never exceed it. */
export const OPERATOR_DISTRICT_REPORT = UP_DISTRICTS.map((district) => {
  const totalCardRequested = lookup(cardRequestedByDistrict, district);
  const approvalRate = seededInt(`operator-approval-rate-${district}`, 60, 85) / 100;
  return {
    district,
    totalOperators: lookup(OPERATOR_DISTRICT_DATA, district),
    activeOperatorsLast3Days: seededInt(`operator-active-${district}`, 30, 250),
    totalCardRequested,
    totalCardApproved: Math.round(totalCardRequested * approvalRate)
  };
});
