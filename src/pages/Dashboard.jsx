import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import VvsDashboardContent from "../components/dashboard/VvsDashboardContent";
import OperatorDashboardContent from "../components/dashboard/OperatorDashboardContent";
import AyushmanCardStatusOverview from "../components/dashboard/AyushmanCardStatusOverview";
import { SearchIcon } from "../components/common/icons";
import {
  DASHBOARD_TYPE_LIST,
  getDashboardType,
  getOverviewCard,
} from "../services/data/dashboardData";
import {
  HOSPITAL_TOTALS,
  HOSPITAL_DISTRICT_TABLE,
  ALL_PUBLIC_HOSPITALS,
  ALL_PRIVATE_HOSPITALS,
} from "../services/data/hospitalData";
import { BENEFICIARY_ENROLLMENT_DISTRICT_TABLE } from "../services/data/beneficiaryData";
import { BIHAR_DISTRICTS } from "../utils/biharDistricts";
import {
  getDistrictCardStatusRows,
  getBlockCardStatusRows,
  getVillageCardStatusRows,
} from "../services/data/ayushmanCardStatusData";
import { fmtIN } from "../utils/format";

const CARD_TABS = [
  { id: "hospital-empanelment", label: "Hospital Empanelment" },
  { id: "beneficiary-enrollment", label: "Beneficiary Enrollment" },
  { id: "treatment-support", label: "Treatment Support" },
  // { id: "ayushman-card-status", label: "Ayushman Card Status" },
];

const HOSPITAL_PAGE_SIZE = 20;

function SearchBox({ value, onChange, placeholder, className = "w-64" }) {
  return (
    <div className={`relative ${className} max-w-full`}>
      <span className="absolute left-3 top-1/2 -translate-y-1/2">
        <SearchIcon />
      </span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="form-input pl-9 w-full"
      />
    </div>
  );
}

function KpiRow({ kpis }) {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 ${kpis.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}
    >
      {kpis.map((kpi) => (
        <div key={kpi.label} className="kpi-card">
          <p className="kpi-label">{kpi.label}</p>
          <p className={`kpi-value ${kpi.className || ""}`}>{kpi.value}</p>
        </div>
      ))}
    </div>
  );
}

function ProgressBar({ pct, colorClass }) {
  const width = Math.min(Math.max(pct, 0), 100);
  return (
    <div className="relative h-6 min-w-[7rem] rounded-full bg-govt-gray-100 overflow-hidden">
      <div
        className={`h-full ${colorClass} rounded-full flex items-center justify-center px-2 text-[11px] font-semibold text-white whitespace-nowrap`}
        style={{ width: `${width}%` }}
      >
        {pct}%
      </div>
    </div>
  );
}

function cardStatusCsv(rows, nameLabel) {
  const header = [
    nameLabel,
    "Family Target",
    "Total Family Achievement",
    "Family Achievement (%)",
    "Member Target",
    "Total Member Achievement",
    "Member Achievement (%)",
  ];
  const lines = [header.join(",")];
  rows.forEach((row) => {
    lines.push(
      [
        row.name,
        row.familyTarget,
        row.familyAchievement,
        row.familyPct,
        row.memberTarget,
        row.memberAchievement,
        row.memberPct,
      ].join(","),
    );
  });
  return lines.join("\n");
}

function downloadCardStatusCsv(rows, nameLabel) {
  const blob = new Blob([cardStatusCsv(rows, nameLabel)], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "ayushman-card-status.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function AyushmanCardStatusPanel() {
  const [level, setLevel] = useState("district");
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");
  const [appliedDistrictFilter, setAppliedDistrictFilter] = useState("");

  const districtRows = useMemo(() => getDistrictCardStatusRows(), []);
  const blockRows = useMemo(
    () => (selectedDistrict ? getBlockCardStatusRows(selectedDistrict) : []),
    [selectedDistrict],
  );
  const villageRows = useMemo(
    () =>
      selectedDistrict && selectedBlock
        ? getVillageCardStatusRows(selectedDistrict, selectedBlock)
        : [],
    [selectedDistrict, selectedBlock],
  );

  const visibleDistrictRows = useMemo(
    () =>
      appliedDistrictFilter
        ? districtRows.filter((r) => r.name === appliedDistrictFilter)
        : districtRows,
    [districtRows, appliedDistrictFilter],
  );

  function goToBlock(district) {
    setSelectedDistrict(district);
    setSelectedBlock(null);
    setLevel("block");
  }
  function goToVillage(block) {
    setSelectedBlock(block);
    setLevel("village");
  }
  function backToDistrict() {
    setLevel("district");
    setSelectedDistrict(null);
    setSelectedBlock(null);
  }
  function backToBlock() {
    setLevel("block");
    setSelectedBlock(null);
  }

  const rows =
    level === "district"
      ? visibleDistrictRows
      : level === "block"
        ? blockRows
        : villageRows;
  const nameLabel =
    level === "district"
      ? "District"
      : level === "block"
        ? "Block Name"
        : "Village Name";

  return (
    <>
      <p className="text-sm text-govt-gray-600 mb-5">
        District / Member Wise Ayushman Card Status (AB-PMJAY and MMJAY scheme
        data, drill down to block and village level).
      </p>

      <div className="info-card mb-4">
        <div className="flex flex-wrap items-end gap-3">
          <div>
            <label
              className="block text-sm text-govt-gray-700 mb-1"
              htmlFor="card-status-from"
            >
              From Date
            </label>
            <input
              id="card-status-from"
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="form-input w-40"
            />
          </div>
          <div>
            <label
              className="block text-sm text-govt-gray-700 mb-1"
              htmlFor="card-status-to"
            >
              To Date
            </label>
            <input
              id="card-status-to"
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="form-input w-40"
            />
          </div>
          {level === "district" && (
            <div>
              <label
                className="block text-sm text-govt-gray-700 mb-1"
                htmlFor="card-status-district"
              >
                Select District
              </label>
              <select
                id="card-status-district"
                value={districtFilter}
                onChange={(e) => setDistrictFilter(e.target.value)}
                className="form-input w-56"
              >
                <option value="">-- All Districts --</option>
                {BIHAR_DISTRICTS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          )}
          <button
            type="button"
            onClick={() => setAppliedDistrictFilter(districtFilter)}
            className="btn-primary"
          >
            Search
          </button>
          <button
            type="button"
            onClick={() => downloadCardStatusCsv(rows, nameLabel)}
            className="inline-flex items-center gap-2 bg-govt-green hover:bg-govt-green-dark text-white font-semibold px-5 py-2.5 rounded-sm transition-colors"
          >
            Export Excel
          </button>
          {level !== "district" && (
            <button
              type="button"
              onClick={level === "village" ? backToBlock : backToDistrict}
              className="ml-auto btn-outline text-sm"
            >
              &larr; Back to {level === "village" ? "Block" : "District"}
            </button>
          )}
        </div>
      </div>

      {level !== "district" && (
        <div className="rounded-lg bg-govt-blue-light border border-govt-blue/10 px-4 py-3 mb-4">
          <p className="text-sm font-semibold text-govt-blue-dark">
            {level === "block"
              ? `Block wise report for : ${selectedDistrict}`
              : `Village wise report for : ${selectedDistrict} / ${selectedBlock}`}
          </p>
        </div>
      )}

      <div className="info-card">
        <div className="overflow-x-auto">
          <table className="gov-table">
            <caption className="sr-only">
              District / Member Wise Ayushman Card Status
            </caption>
            <thead>
              <tr>
                <th scope="col">{nameLabel}</th>
                <th scope="col">Family Target</th>
                <th scope="col">Total Family Achievement</th>
                <th scope="col">Family Achievement (%)</th>
                <th scope="col">Member Target</th>
                <th scope="col">Total Member Achievement</th>
                <th scope="col">Member Achievement (%)</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.name}>
                  <td className="font-medium text-govt-gray-900">
                    {level === "village" ? (
                      row.name
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          level === "district"
                            ? goToBlock(row.name)
                            : goToVillage(row.name)
                        }
                        className="font-semibold text-govt-blue hover:underline"
                      >
                        {row.name}
                      </button>
                    )}
                  </td>
                  <td className="text-right tabular-nums">
                    {fmtIN(row.familyTarget)}
                  </td>
                  <td className="text-right tabular-nums">
                    {fmtIN(row.familyAchievement)}
                  </td>
                  <td>
                    <ProgressBar
                      pct={row.familyPct}
                      colorClass="bg-govt-green"
                    />
                  </td>
                  <td className="text-right tabular-nums">
                    {fmtIN(row.memberTarget)}
                  </td>
                  <td className="text-right tabular-nums">
                    {fmtIN(row.memberAchievement)}
                  </td>
                  <td>
                    <ProgressBar
                      pct={row.memberPct}
                      colorClass="bg-govt-saffron"
                    />
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center text-govt-gray-500 py-6"
                  >
                    No data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function HospitalEmpanelmentPanel() {
  return (
    <>
      <p className="text-sm text-govt-gray-600 mb-5">
        Public and private hospitals empanelled under AB-PMJAY / MMJAY, by
        district.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="kpi-card">
          <p className="kpi-label">Public Hospitals</p>
          <p className="kpi-value">{fmtIN(HOSPITAL_TOTALS.public)}</p>
        </div>
        <div className="kpi-card">
          <p className="kpi-label">Private Hospitals</p>
          <p className="kpi-value text-govt-green">
            {fmtIN(HOSPITAL_TOTALS.private)}
          </p>
        </div>
      </div>
      <div className="info-card">
        <h3 className="font-semibold text-govt-blue-dark mb-4">
          District Wise Hospital Empanelment
        </h3>
        <div className="overflow-x-auto">
          <table className="gov-table">
            <caption className="sr-only">
              District Wise Hospital Empanelment: Public and Private hospital
              counts
            </caption>
            <thead>
              <tr>
                <th scope="col">District</th>
                <th scope="col">Public</th>
                <th scope="col">Private</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              {HOSPITAL_DISTRICT_TABLE.map((row) => (
                <tr key={row.district}>
                  <td className="font-medium text-govt-gray-900">
                    {row.district}
                  </td>
                  <td className="text-right tabular-nums">
                    <Link
                      to={`/dashboard/ab-pmjay/hospitals/${encodeURIComponent(row.district)}/public`}
                      className="text-govt-blue hover:underline"
                    >
                      {fmtIN(row.public)}
                    </Link>
                  </td>
                  <td className="text-right tabular-nums">
                    <Link
                      to={`/dashboard/ab-pmjay/hospitals/${encodeURIComponent(row.district)}/private`}
                      className="text-govt-blue hover:underline"
                    >
                      {fmtIN(row.private)}
                    </Link>
                  </td>
                  <td className="text-right tabular-nums font-semibold text-govt-gray-900">
                    {fmtIN(row.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function BeneficiaryEnrollmentPanel({ card }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () =>
      BENEFICIARY_ENROLLMENT_DISTRICT_TABLE.filter((row) =>
        row.district.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [query],
  );

  return (
    <>
      <p className="text-sm text-govt-gray-600 mb-5">{card.description}</p>
      <KpiRow kpis={card.kpis} />
      <div className="info-card">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h3 className="font-semibold text-govt-blue-dark">
            District Wise Beneficiary Enrolment (PMJAY / MCSY)
          </h3>
          <SearchBox
            value={query}
            onChange={setQuery}
            placeholder="Search district&hellip;"
            className="w-56"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="gov-table">
            <caption className="sr-only">
              Beneficiary Enrolment Statistics by district and scheme
            </caption>
            <thead>
              <tr>
                <th scope="col" rowSpan={2} className="align-bottom">
                  District Name
                </th>
                <th scope="colgroup" colSpan={2} className="text-center">
                  PMJAY
                </th>
                <th scope="colgroup" colSpan={2} className="text-center">
                  MCSY
                </th>
                <th scope="colgroup" colSpan={2} className="text-center">
                  Total
                </th>
              </tr>
              <tr>
                <th scope="col">Families</th>
                <th scope="col">Beneficiaries</th>
                <th scope="col">Families</th>
                <th scope="col">Beneficiaries</th>
                <th scope="col">Families</th>
                <th scope="col">Beneficiaries</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row.district}>
                  <td className="font-medium text-govt-gray-900">
                    {row.district}
                  </td>
                  <td className="text-right tabular-nums">
                    {fmtIN(row.pmjayFamilies)}
                  </td>
                  <td className="text-right tabular-nums">
                    {fmtIN(row.pmjayBeneficiaries)}
                  </td>
                  <td className="text-right tabular-nums">
                    {fmtIN(row.mcsyFamilies)}
                  </td>
                  <td className="text-right tabular-nums">
                    {fmtIN(row.mcsyBeneficiaries)}
                  </td>
                  <td className="text-right tabular-nums font-semibold text-govt-gray-900">
                    {fmtIN(row.totalFamilies)}
                  </td>
                  <td className="text-right tabular-nums font-semibold text-govt-gray-900">
                    {fmtIN(row.totalBeneficiaries)}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center text-govt-gray-500 py-6"
                  >
                    No districts match &ldquo;{query}&rdquo;.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function HospitalStatsTable({ hospitals, typeLabel }) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return hospitals;
    return hospitals.filter(
      (h) =>
        h.id.toLowerCase().includes(q) || h.district.toLowerCase().includes(q),
    );
  }, [hospitals, query]);

  useEffect(() => {
    setPage(1);
  }, [query]);

  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / HOSPITAL_PAGE_SIZE),
  );
  const pageRows = filtered.slice(
    (page - 1) * HOSPITAL_PAGE_SIZE,
    page * HOSPITAL_PAGE_SIZE,
  );

  return (
    <div className="info-card">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h3 className="font-semibold text-govt-blue-dark">
          {typeLabel} Hospitals
        </h3>
        <div className="flex items-center gap-3">
          <span className="text-xs text-govt-gray-500">
            {fmtIN(filtered.length)} of {fmtIN(hospitals.length)}
          </span>
          <SearchBox
            value={query}
            onChange={setQuery}
            placeholder="Search Hospital ID or District&hellip;"
            className="w-72"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="gov-table">
          <caption className="sr-only">
            {typeLabel} Hospitals: Beneficiary Treatment Statistics
          </caption>
          <thead>
            <tr>
              <th scope="col">Hospital ID</th>
              <th scope="col">Hospital District</th>
              <th scope="col">Beneficiary Count</th>
              <th scope="col">No. of Pre-authorizations</th>
              <th scope="col">Pre-authorized Amount (&#8377;)</th>
              <th scope="col">No. of Claims</th>
              <th scope="col">Claimed Amount (&#8377;)</th>
            </tr>
          </thead>
          <tbody>
            {pageRows.map((h) => (
              <tr key={h.id}>
                <td className="font-medium text-govt-gray-900 whitespace-nowrap">
                  {h.id}
                </td>
                <td>{h.district}</td>
                <td className="text-right tabular-nums">
                  {fmtIN(h.beneficiaryCount)}
                </td>
                <td className="text-right tabular-nums">
                  {fmtIN(h.preAuthCount)}
                </td>
                <td className="text-right tabular-nums">
                  &#8377;{fmtIN(h.preAuthAmount)}
                </td>
                <td className="text-right tabular-nums">
                  {fmtIN(h.claimsCount)}
                </td>
                <td className="text-right tabular-nums">
                  &#8377;{fmtIN(h.claimedAmount)}
                </td>
              </tr>
            ))}
            {pageRows.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center text-govt-gray-500 py-6">
                  No hospitals match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <button
            type="button"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="btn-outline text-xs disabled:opacity-40 disabled:cursor-not-allowed"
          >
            &larr; Prev
          </button>
          <span className="text-xs text-govt-gray-600">
            Page {page} of {totalPages}
          </span>
          <button
            type="button"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="btn-outline text-xs disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next &rarr;
          </button>
        </div>
      )}
    </div>
  );
}

function TreatmentSupportPanel({ card }) {
  const [subTab, setSubTab] = useState("public");

  return (
    <>
      <p className="text-sm text-govt-gray-600 mb-5">{card.description}</p>
      <KpiRow kpis={card.kpis} />
      <div className="flex flex-wrap gap-2 mb-5">
        {[
          { id: "public", label: "Public Hospitals" },
          { id: "private", label: "Private Hospitals" },
        ].map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setSubTab(t.id)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
              subTab === t.id
                ? "bg-govt-blue text-white border-govt-blue"
                : "bg-white text-govt-gray-700 border-govt-gray-200 hover:border-govt-blue hover:text-govt-blue"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      {subTab === "public" ? (
        <HospitalStatsTable
          hospitals={ALL_PUBLIC_HOSPITALS}
          typeLabel="Public"
        />
      ) : (
        <HospitalStatsTable
          hospitals={ALL_PRIVATE_HOSPITALS}
          typeLabel="Private"
        />
      )}
    </>
  );
}

export default function Dashboard() {
  const { type: typeSlug } = useParams();
  const location = useLocation();
  const type = getDashboardType(typeSlug);
  const [activeCard, setActiveCard] = useState(() => {
    const hashId = location.hash.slice(1);
    return CARD_TABS.some((t) => t.id === hashId) ? hashId : CARD_TABS[0].id;
  });

  useEffect(() => {
    const hashId = location.hash.slice(1);
    if (CARD_TABS.some((t) => t.id === hashId)) setActiveCard(hashId);
  }, [location.hash]);

  if (!type) {
    return <Navigate to="/dashboard/ab-pmjay" replace />;
  }

  const beneficiaryCard = getOverviewCard(type.slug, "beneficiary-enrollment");
  const treatmentCard = getOverviewCard(type.slug, "treatment-support");

  return (
    <>
      <div className="bg-govt-blue-light border-b border-govt-blue/10 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-govt-blue-dark">
            {type.label}
          </h1>
          <div className="flex flex-wrap items-center justify-between gap-2 mt-2">
            <p className="text-sm text-govt-gray-700 max-w-2xl">
              {type.description}
            </p>
            <p className="text-xs font-semibold text-govt-blue-dark shrink-0">
              Last Updated <span aria-hidden="true">:</span>{" "}
              <span className="font-normal text-govt-gray-600">
                02-07-2026, 10:00 AM
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* <div className="max-w-7xl mx-auto px-4 pt-6">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Select dashboard">
          {DASHBOARD_TYPE_LIST.map((t) => (
            <Link
              key={t.slug}
              to={`/dashboard/${t.slug}`}
              role="tab"
              aria-selected={t.slug === type.slug}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                t.slug === type.slug
                  ? 'bg-govt-blue text-white border-govt-blue'
                  : 'bg-white text-govt-gray-700 border-govt-gray-200 hover:border-govt-blue hover:text-govt-blue'
              }`}
            >
              {t.shortLabel}
            </Link>
          ))}
        </div>
      </div> */}

      {type.slug === "vvs" && (
        <div className="pt-8">
          <VvsDashboardContent />
        </div>
      )}

      {type.slug === "operator" && (
        <div className="pt-8">
          <OperatorDashboardContent />
        </div>
      )}

      {type.slug === "ab-pmjay" && <AyushmanCardStatusOverview />}

      {type.slug === "ab-pmjay" && (
        <div className="max-w-7xl mx-auto px-4 pt-8">
          <div
            className="flex flex-wrap gap-1 border-b border-govt-gray-200 mb-6"
            role="tablist"
            aria-label="Dashboard section"
          >
            {CARD_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeCard === tab.id}
                onClick={() => setActiveCard(tab.id)}
                className={`px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-colors ${
                  activeCard === tab.id
                    ? "border-govt-blue text-govt-blue-dark"
                    : "border-transparent text-govt-gray-500 hover:text-govt-blue-dark hover:border-govt-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeCard === "hospital-empanelment" && (
            <section id="hospital-empanelment">
              <HospitalEmpanelmentPanel />
            </section>
          )}

          {activeCard === "beneficiary-enrollment" && beneficiaryCard && (
            <section id="beneficiary-enrollment">
              <BeneficiaryEnrollmentPanel card={beneficiaryCard} />
            </section>
          )}

          {activeCard === "treatment-support" && treatmentCard && (
            <section id="treatment-support">
              <TreatmentSupportPanel card={treatmentCard} />
            </section>
          )}

          {activeCard === "ayushman-card-status" && (
            <section id="ayushman-card-status">
              <AyushmanCardStatusPanel />
            </section>
          )}
        </div>
      )}
      <div className="h-6" />
    </>
  );
}
