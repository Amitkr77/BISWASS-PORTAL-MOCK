import { useState, useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { DASHBOARD_TYPE_LIST, getDashboardType } from "../../services/data/dashboardData";
import VvsDistrictTable from "../../components/dashboard/VvsDistrictTable";
import OperatorDistrictTable from "../../components/dashboard/OperatorDistrictTable";
import {
  CARD_STATUS_TOTALS,
  getDistrictCardStatusRows,
} from "../../services/data/ayushmanCardStatusData";
import { fmtIN } from "../../utils/format";
import Breadcrumb from "../../components/common/Breadcrumb";
import PageBanner from "../../components/common/PageBanner";
// import ProgressBar from "../../components/common";
import {
  getBlockCardStatusRows,
  getVillageCardStatusRows,
  // downloadCardStatusCsv,
} from "../../services/data/ayushmanCardStatusData";
import { BIHAR_DISTRICTS } from "../../utils/biharDistricts";

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
const TOP_N = 10;

function CardStatusReportSection() {
  const top = getDistrictCardStatusRows().slice(0, TOP_N);
  return (
    <section className="max-w-7xl mx-auto px-4 pt-10 pb-4">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
        <h2 className="text-xl sm:text-2xl font-heading font-bold text-govt-blue-dark">
          Ayushman Card Status
        </h2>
        <Link
          to="/dashboard/ab-pmjay#ayushman-card-status"
          className="text-sm font-semibold text-govt-blue hover:underline"
        >
          View Full Details on Dashboard &rarr;
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="kpi-card">
          <p className="kpi-label">Family Target</p>
          <p className="kpi-value">{fmtIN(CARD_STATUS_TOTALS.familyTarget)}</p>
        </div>
        <div className="kpi-card">
          <p className="kpi-label">Family Achievement</p>
          <p className="kpi-value text-govt-green">
            {fmtIN(CARD_STATUS_TOTALS.familyAchievement)}
          </p>
        </div>
        <div className="kpi-card">
          <p className="kpi-label">Member Target</p>
          <p className="kpi-value">{fmtIN(CARD_STATUS_TOTALS.memberTarget)}</p>
        </div>
        <div className="kpi-card">
          <p className="kpi-label">Member Achievement</p>
          <p className="kpi-value text-govt-saffron-dark">
            {fmtIN(CARD_STATUS_TOTALS.memberAchievement)}
          </p>
        </div>
      </div>
      <div className="info-card">
        <h3 className="font-semibold text-govt-blue-dark mb-4">
          Top {TOP_N} Districts &ndash; Family Achievement (%)
        </h3>
        <div className="overflow-x-auto">
          <table className="gov-table">
            <caption className="sr-only">
              Ayushman Card Status &ndash; top {TOP_N} districts
            </caption>
            <thead>
              <tr>
                <th scope="col" className="w-16">
                  Rank
                </th>
                <th scope="col">District</th>
                <th scope="col">Family Achievement (%)</th>
                <th scope="col">Member Achievement (%)</th>
              </tr>
            </thead>
            <tbody>
              {top.map((row, idx) => (
                <tr key={row.name}>
                  <td className="tabular-nums text-govt-gray-500">{idx + 1}</td>
                  <td className="font-medium text-govt-gray-900">{row.name}</td>
                  <td className="text-right tabular-nums">{row.familyPct}%</td>
                  <td className="text-right tabular-nums">{row.memberPct}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
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
    <section className="max-w-7xl mx-auto px-4 pt-10 pb-4">
      <p className="text-sm text-govt-gray-600 mb-5">
        District / Member Wise Ayushman Card Status (AB-PMJAY and MMJAY scheme
        data, drill down to block and village level).
      </p>

      <div className="info-card mb-4">
        <div className="flex  flex-wrap  items-end gap-3">
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
    </section>
  );
}

export default function Report() {
  const { type: typeSlug } = useParams();
  const type = getDashboardType(typeSlug);

  if (!type) {
    return <Navigate to="/dashboard/reports/ab-pmjay" replace />;
  }

  return (
    <>
      <div className="bg-govt-blue-light border-b border-govt-blue/10 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-xs font-bold uppercase tracking-widest text-govt-blue mb-1">
            Programme Report
          </p>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-govt-blue-dark">
            {type.reportLabel}
          </h1>
          <div className="flex flex-wrap items-center justify-between gap-2 mt-2">
            <p className="text-sm text-govt-gray-700 max-w-2xl">
              {type.description}
            </p>
            <p className="text-xs font-semibold text-govt-blue-dark shrink-0">
              Report Generated <span aria-hidden="true">:</span>{" "}
              <span className="font-normal text-govt-gray-600">
                02-07-2026, 10:00 AM
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* <div className="max-w-7xl mx-auto px-4 pt-6">
        <div
          className="flex flex-wrap gap-2"
          role="tablist"
          aria-label="Select report"
        >
          {DASHBOARD_TYPE_LIST.map((t) => (
            <Link
              key={t.slug}
              to={`/dashboard/reports/${t.slug}`}
              role="tab"
              aria-selected={t.slug === type.slug}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                t.slug === type.slug
                  ? "bg-govt-blue text-white border-govt-blue"
                  : "bg-white text-govt-gray-700 border-govt-gray-200 hover:border-govt-blue hover:text-govt-blue"
              }`}
            >
              {t.shortLabel}
            </Link>
          ))}
        </div>
      </div> */}

      {type.slug === "ab-pmjay" && <AyushmanCardStatusPanel />}

      {type.slug === "vvs" && (
        <section className="max-w-7xl mx-auto px-4 pt-8 pb-4">
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-govt-blue-dark mb-5">
            Vay Vandana Scheme (VVS)
          </h2>
          <VvsDistrictTable />
        </section>
      )}

      {type.slug === "operator" && (
        <section className="max-w-7xl mx-auto px-4 pt-8 pb-4">
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-govt-blue-dark mb-5">
            Operator Dashboard
          </h2>
          <OperatorDistrictTable />
        </section>
      )}
      <div className="h-6" />
    </>
  );
}
