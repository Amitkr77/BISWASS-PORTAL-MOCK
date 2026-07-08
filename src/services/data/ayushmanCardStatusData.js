import { BIHAR_DISTRICTS } from '../../utils/biharDistricts';
import { districtBreakdown, seededRandom, seededInt } from '../../utils/mockRandom';

/** Same headline totals already shown elsewhere on the site (Family Wise / Individual Wise KPIs),
 *  kept here so the numbers stay consistent across pages. */
export const CARD_STATUS_TOTALS = {
  familyTarget: 12100000,
  familyAchievement: 11086742,
  memberTarget: 62000000,
  memberAchievement: 58432150
};

const BLOCK_NAME_STEMS = [
  'Rampur', 'Fatehpur', 'Chandpur', 'Islampur', 'Bishunpur', 'Mahua', 'Barhara', 'Bikram', 'Dumraon', 'Rajpur',
  'Kharagpur', 'Simri', 'Bakhtiyarpur', 'Bihta', 'Phulwari', 'Danapur', 'Maner', 'Naubatpur', 'Paliganj', 'Masaurhi',
  'Dhanarua', 'Punpun', 'Sampatchak', 'Fatuha', 'Athmalgola', 'Belaganj', 'Konch', 'Manpur', 'Tekari', 'Wazirganj',
  'Amas', 'Sherghati', 'Barachatti', 'Dumaria', 'Imamganj', 'Guraru', 'Khizarsarai', 'Mohanpur', 'Parnami', 'Sadar'
];

const VILLAGE_NAME_STEMS = [
  'Rampur', 'Sherpur', 'Chakhaji', 'Nawada', 'Bishunpur', 'Sultanpur', 'Islamganj', 'Madhopur', 'Bhagwanpur', 'Devipur',
  'Lalganj', 'Harnaut', 'Bakhorapur', 'Chandi', 'Karari', 'Piparpanti', 'Sohsa', 'Dariyapur', 'Alinagar', 'Basdeopur',
  'Milki', 'Jalalpur', 'Kotwa', 'Bhojpur', 'Sarairanjan', 'Bishanpur', 'Bara', 'Kudra', 'Amethi', 'Barh',
  'Manikpur', 'Ratanpur', 'Shivpur', 'Gopalpur', 'Krishnapur', 'Ramnagar', 'Naya Tola', 'Purani Basti', 'Chak Alam', 'Mahadeva'
];

function seededShuffleTake(seedKey, pool, count) {
  const arr = [...pool];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(seededRandom(`${seedKey}-shuf-${i}`) * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, count);
}

export function getBlocksForDistrict(district) {
  const count = seededInt(`blocks-count-${district}`, 8, 18);
  return seededShuffleTake(`blocks-${district}`, BLOCK_NAME_STEMS, count);
}

export function getVillagesForBlock(district, block) {
  const key = `${district}::${block}`;
  const count = seededInt(`villages-count-${key}`, 10, 30);
  return seededShuffleTake(`villages-${key}`, VILLAGE_NAME_STEMS, count);
}

function computeAchievement(seedKey, target, minRate, maxRate) {
  const rate = minRate + seededRandom(seedKey) * (maxRate - minRate);
  return Math.round(target * rate);
}

/** Distributes familyTargetTotal/memberTargetTotal across `items`, then derives an
 *  achievement (always <= target) per item, sorted by Family Achievement % descending. */
function buildCardStatusRows(seedPrefix, items, familyTargetTotal, memberTargetTotal) {
  const familyTargets = districtBreakdown(`${seedPrefix}-family-target`, familyTargetTotal, items, { sort: false });
  const memberTargets = districtBreakdown(`${seedPrefix}-member-target`, memberTargetTotal, items, { sort: false });

  return items
    .map((item, i) => {
      const familyTarget = familyTargets[i].value;
      const memberTarget = memberTargets[i].value;
      const familyAchievement = computeAchievement(`${seedPrefix}-family-ach-${item}`, familyTarget, 0.55, 0.98);
      const memberAchievement = computeAchievement(`${seedPrefix}-member-ach-${item}`, memberTarget, 0.45, 0.9);
      return {
        name: item,
        familyTarget,
        familyAchievement,
        familyPct: familyTarget ? +((familyAchievement / familyTarget) * 100).toFixed(2) : 0,
        memberTarget,
        memberAchievement,
        memberPct: memberTarget ? +((memberAchievement / memberTarget) * 100).toFixed(2) : 0
      };
    })
    .sort((a, b) => b.familyPct - a.familyPct);
}

export function getDistrictCardStatusRows() {
  return buildCardStatusRows('card-status-district', BIHAR_DISTRICTS, CARD_STATUS_TOTALS.familyTarget, CARD_STATUS_TOTALS.memberTarget);
}

export function getBlockCardStatusRows(district) {
  const districtRow = getDistrictCardStatusRows().find((r) => r.name === district);
  if (!districtRow) return [];
  const blocks = getBlocksForDistrict(district);
  return buildCardStatusRows(`card-status-block-${district}`, blocks, districtRow.familyTarget, districtRow.memberTarget);
}

export function getVillageCardStatusRows(district, block) {
  const blockRow = getBlockCardStatusRows(district).find((r) => r.name === block);
  if (!blockRow) return [];
  const villages = getVillagesForBlock(district, block);
  return buildCardStatusRows(`card-status-village-${district}-${block}`, villages, blockRow.familyTarget, blockRow.memberTarget);
}
