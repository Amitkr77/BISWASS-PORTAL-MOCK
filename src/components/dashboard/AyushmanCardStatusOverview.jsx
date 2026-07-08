import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { InfoIcon, ClockIcon, CheckCircleIcon } from '../common/icons';
import { CARD_STATUS_TOTALS, getDistrictCardStatusRows } from '../../services/data/ayushmanCardStatusData';
import { fmtIN } from '../../utils/format';
import CardStatusTrendChart from './CardStatusTrendChart';

function pct(part, whole) {
  return whole ? +((part / whole) * 100).toFixed(2) : 0;
}

const THEMES = {
  family: {
    banner: 'bg-violet-100 border border-violet-200 text-violet-900',
    icon: 'text-violet-700',
    card: 'bg-violet-50 border border-violet-100',
    cardIcon: 'text-violet-700/60',
    lastIcon: 'text-violet-700/70',
    achievementColor: '#8ec6f0',
    leftoverColor: '#f4a6b7',
    targetColor: '#f4a24c'
  },
  member: {
    banner: 'bg-rose-100 border border-rose-200 text-rose-900',
    icon: 'text-rose-700',
    card: 'bg-amber-50 border border-amber-100',
    cardIcon: 'text-blue-600/60',
    lastIcon: 'text-orange-600/70',
    achievementColor: '#8ec6f0',
    leftoverColor: '#f4a6b7',
    targetColor: '#f4a24c'
  }
};

function StatCard({ label, value, icon, className }) {
  return (
    <div className={`rounded-lg p-5 flex items-center justify-between gap-3 ${className}`}>
      <div>
        <p className="text-sm text-govt-gray-700">{label}</p>
        <p className="text-2xl font-heading font-bold text-govt-gray-900 mt-1">{value}</p>
      </div>
      {icon}
    </div>
  );
}

function CardStatusSection({ theme, moreDetailsHref, stats, chart }) {
  const t = THEMES[theme];
  return (
    <div className="mb-8">
      <div className={`rounded-lg px-5 py-4 flex items-start gap-2 mb-4 ${t.banner}`}>
        <InfoIcon className={`w-5 h-5 mt-0.5 shrink-0 ${t.icon}`} />
        <p className="text-sm sm:text-base">
          <span className="font-bold">{stats.title}</span> {stats.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.items.map((item, i) => (
          <StatCard
            key={item.label}
            label={item.label}
            value={item.value}
            className={t.card}
            icon={
              i === stats.items.length - 1
                ? <CheckCircleIcon className={`w-8 h-8 shrink-0 ${t.lastIcon}`} />
                : <ClockIcon className={`w-8 h-8 shrink-0 ${t.cardIcon}`} />
            }
          />
        ))}
      </div>

      <div className="info-card">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h3 className="font-semibold text-govt-blue-dark">{chart.heading}</h3>
          <Link to={moreDetailsHref} className="text-sm font-semibold text-govt-blue hover:underline">
            More Details &rarr;
          </Link>
        </div>
        <CardStatusTrendChart
          labels={chart.labels}
          achievement={chart.achievement}
          leftover={chart.leftover}
          target={chart.target}
          achievementLabel={chart.achievementLabel}
          leftoverLabel={chart.leftoverLabel}
          targetLabel={chart.targetLabel}
          achievementColor={t.achievementColor}
          leftoverColor={t.leftoverColor}
          targetColor={t.targetColor}
          ariaLabel={chart.ariaLabel}
        />
      </div>
    </div>
  );
}

export default function AyushmanCardStatusOverview() {
  const districtRows = useMemo(
    () => [...getDistrictCardStatusRows()].sort((a, b) => a.name.localeCompare(b.name)),
    []
  );

  const familiesLeft = CARD_STATUS_TOTALS.familyTarget - CARD_STATUS_TOTALS.familyAchievement;
  const familiesAchievementPct = pct(CARD_STATUS_TOTALS.familyAchievement, CARD_STATUS_TOTALS.familyTarget);
  const membersLeft = CARD_STATUS_TOTALS.memberTarget - CARD_STATUS_TOTALS.memberAchievement;
  const membersAchievementPct = pct(CARD_STATUS_TOTALS.memberAchievement, CARD_STATUS_TOTALS.memberTarget);

  return (
    <div className="max-w-7xl mx-auto px-4 pt-8">
      <CardStatusSection
        theme="family"
        moreDetailsHref="/dashboard/ab-pmjay#ayushman-card-status"
        stats={{
          title: 'District / Family Wise Ayushman Card Status',
          subtitle: '(AB-PMJAY and MMJAY schemes data excluding UO, PDDU, Patrakaar, PVTG, and VVS categories)',
          items: [
            { label: 'Target Families', value: fmtIN(CARD_STATUS_TOTALS.familyTarget) },
            { label: 'Families Covered', value: fmtIN(CARD_STATUS_TOTALS.familyAchievement) },
            { label: 'Families Left', value: fmtIN(familiesLeft) },
            { label: 'Families Achievement', value: `${familiesAchievementPct} %` }
          ]
        }}
        chart={{
          heading: 'District Wise Family Status',
          labels: districtRows.map((r) => r.name),
          achievement: districtRows.map((r) => r.familyAchievement),
          leftover: districtRows.map((r) => r.familyTarget - r.familyAchievement),
          target: districtRows.map((r) => r.familyTarget),
          achievementLabel: 'Family Achievement',
          leftoverLabel: 'Left over family',
          targetLabel: 'Target Family',
          ariaLabel: 'District wise family status: achievement, left over and target families, all districts.'
        }}
      />

      <CardStatusSection
        theme="member"
        moreDetailsHref="/dashboard/ab-pmjay#ayushman-card-status"
        stats={{
          title: 'District / Member Wise Ayushman Card Status',
          subtitle: '(AB-PMJAY and MMJAY schemes data excluding UO, PDDU, Patrakaar, PVTG, and VVS categories)',
          items: [
            { label: 'Target Individual', value: fmtIN(CARD_STATUS_TOTALS.memberTarget) },
            { label: 'Individual Covered', value: fmtIN(CARD_STATUS_TOTALS.memberAchievement) },
            { label: 'Individual Left', value: fmtIN(membersLeft) },
            { label: 'Individual Achievement', value: `${membersAchievementPct} %` }
          ]
        }}
        chart={{
          heading: 'District Wise Individual Status',
          labels: districtRows.map((r) => r.name),
          achievement: districtRows.map((r) => r.memberAchievement),
          leftover: districtRows.map((r) => r.memberTarget - r.memberAchievement),
          target: districtRows.map((r) => r.memberTarget),
          achievementLabel: 'Member Achievement',
          leftoverLabel: 'Left Over Members',
          targetLabel: 'Target Members',
          ariaLabel: 'District wise individual status: member achievement, left over and target members, all districts.'
        }}
      />
    </div>
  );
}
