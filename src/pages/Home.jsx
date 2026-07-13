import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NoticeTicker from "../components/common/NoticeTicker";
import HeroCarousel from "../components/common/HeroCarousel";
import ExpandingCardGroup from "../components/common/ExpandingCardGroup";
import CardCarousel from "../components/common/CardCarousel";
import { LocationIcon } from "../components/common/icons";
import { placeholderImageFor } from "../utils/placeholderImage";
import successStories from "../services/data/success-stories.json";
import events from "../services/data/events.json";
import iecItems from "../services/data/iec.json";
import { getOverviewCard } from "../services/data/dashboardData";
import { HOSPITAL_TOTALS } from "../services/data/hospitalData";
import { fmtIN } from "../utils/format";

const BENEFICIARY_ENROLLMENT = getOverviewCard(
  "ab-pmjay",
  "beneficiary-enrollment",
);
const TREATMENT_SUPPORT = getOverviewCard("ab-pmjay", "treatment-support");

const QUICK_SERVICES = [
  {
    titleEn: "Check Eligibility",
    descEn: "Verify whether your family is eligible for the scheme.",
    href: "/citizen-guides/eligibility-verification",
    gradient: "from-govt-blue to-govt-blue-mid",
    icon: (
      <svg
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    titleEn: "Create Ayushman Card",
    descEn: "Create or download your Ayushman Card online.",
    href: "/citizen-guides/ayushman-card",
    gradient: "from-govt-green-dark to-govt-green",
    icon: (
      <svg
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden="true"
      >
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <circle cx="8.5" cy="12" r="1.8" />
        <path strokeLinecap="round" d="M13 10h5M13 14h5" />
      </svg>
    ),
  },
  {
    titleEn: "Find a Hospital",
    descEn: "Search empanelled hospitals near you.",
    href: "/citizen-guides/find-hospital",
    gradient: "from-govt-saffron-dark to-govt-saffron",
    icon: (
      <svg
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 20V9l8-5 8 5v11"
        />
        <path strokeLinecap="round" d="M9 20v-5h6v5M12 8v4M10 10h4" />
      </svg>
    ),
  },
  {
    titleEn: "Submit a Grievance",
    descEn: "Raise and track a grievance about treatment or claims.",
    href: "/citizen-guides/grievance-submission",
    gradient: "from-govt-blue-mid to-govt-blue-dark",
    icon: (
      <svg
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 5h16M4 5v13a1 1 0 001 1h9l4 3v-3h1a1 1 0 001-1V5"
        />
        <path strokeLinecap="round" d="M8 10h8M8 13h5" />
      </svg>
    ),
  },
];

const STAT_TILES = [
  { value: "Rs. 5 Lakh", labelEn: "Cover per family, per year" },
  { value: "1.21 Crore", labelEn: "Families enrolled in Bihar" },
  { value: "5.5 Crore", labelEn: "Beneficiaries covered" },
  { value: "38", labelEn: "Districts of Bihar covered" },
];

const FEATURES = [
  {
    n: "01",
    titleEn: "Rs. 5 Lakh Cover",
  },
  {
    n: "02",
    titleEn: "5.5 Crore Beneficiaries",
  },
  {
    n: "03",
    titleEn: "State Flexibility",
  },
  {
    n: "04",
    titleEn: "Portability",
  },
  {
    n: "05",
    titleEn: "Entitlement-Based",
  },
];

const STORY_GRADIENTS = [
  "from-govt-blue to-govt-blue-mid",
  "from-govt-green-dark to-govt-blue-mid",
  "from-govt-saffron-dark to-govt-blue-dark",
];

const SPOTLIGHT_ITEMS = [
  {
    title: "Bihar crosses 1.21 crore Ayushman Card enrolments",
    date: "2026-06-25",
    text: "The state has crossed a key milestone in Ayushman Card creation, with sustained enrolment drives across all 38 districts.",
    accent: "blue",
    icon: (p) => (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 17l6-6 4 4 8-8M21 7v6h-6"
        {...p}
      />
    ),
  },
  {
    title: "BSSS launches mobile enrolment vans for remote blocks",
    date: "2026-05-18",
    text: "Mobile vans equipped with biometric kits are now reaching under-served blocks to bring card creation closer to beneficiaries.",
    accent: "green",
    icon: (p) => (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 16V8a1 1 0 011-1h9v5h5.5l2.5 3.2V16a1 1 0 01-1 1h-1"
          {...p}
        />
        <circle cx="7.5" cy="17" r="1.8" {...p} />
        <circle cx="16.5" cy="17" r="1.8" {...p} />
      </>
    ),
  },
  {
    title: "AB-PMJAY Bihar recognised for claims settlement efficiency",
    date: "2026-04-08",
    text: "The state was recognised at the national review meeting for maintaining claims settlement turnaround within prescribed timelines.",
    accent: "saffron",
    icon: (p) => (
      <>
        <circle cx="12" cy="9" r="5.5" {...p} />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.3 13.8L7 21l5-2.7 5 2.7-1.3-7.2"
          {...p}
        />
      </>
    ),
  },
];

const SPOTLIGHT_ACCENTS = {
  blue: { gradient: "from-govt-blue to-govt-blue-mid", text: "text-govt-blue" },
  green: {
    gradient: "from-govt-green-dark to-govt-green",
    text: "text-govt-green-dark",
  },
  saffron: {
    gradient: "from-govt-saffron-dark to-govt-saffron",
    text: "text-govt-saffron-dark",
  },
};

const MONTH_ABBR = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

function formatEventDate(iso) {
  const [, month, day] = iso.split("-").map(Number);
  return { day: String(day).padStart(2, "0"), month: MONTH_ABBR[month - 1] };
}

const HOME_EVENTS = events.slice(0, 6);

function EventCard(event, i) {
  const { day, month } = formatEventDate(event.date);
  return (
    <Link
      to={`/updates/events/${event.slug}`}
      className="group relative block h-56 rounded-xl overflow-hidden border border-govt-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <img
        src={placeholderImageFor(i, 2)}
        loading="lazy"
        width={400}
        height={300}
        alt=""
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"
        aria-hidden="true"
      />
      <div className="absolute top-3 left-3 flex flex-col items-center justify-center w-12 h-12 rounded-lg bg-white shadow-md">
        <span className="text-base font-heading font-extrabold text-govt-blue-dark leading-none tabular-nums">
          {day}
        </span>
        <span className="text-[9px] font-bold uppercase tracking-widest text-govt-blue mt-0.5">
          {month}
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-4">
        <h3 className="font-heading font-bold text-white text-base leading-snug line-clamp-2">
          {event.title}
        </h3>
        <p className="text-white/85 text-xs mt-1.5 flex items-start gap-1">
          <LocationIcon className="w-3.5 h-3.5 shrink-0 mt-0.5 text-white/70" />
          <span className="truncate">{event.venue}</span>
        </p>
      </div>
    </Link>
  );
}

function IecShowcase({ items }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;
    const timer = window.setInterval(
      () => setIndex((i) => (i + 1) % items.length),
      3500,
    );
    return () => window.clearInterval(timer);
  }, [paused, items.length]);

  const item = items[index];

  return (
    <div
      className="group relative h-full w-full overflow-hidden rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {items.map((it, i) => (
        <img
          key={it.slug}
          src={placeholderImageFor(i, 1)}
          alt=""
          loading={i === 0 ? "eager" : "lazy"}
          width={400}
          height={300}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"
        aria-hidden="true"
      />

      <div className="relative h-full flex flex-col justify-end p-5 sm:p-6">
        <span className="inline-flex w-fit items-center bg-white/15 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-sm mb-2 ring-1 ring-white/30">
          IEC Corner
        </span>
        <span className="text-govt-saffron text-xs font-bold uppercase tracking-wide">
          {item.category}
        </span>
        <h3 className="font-heading font-bold text-white text-xl sm:text-2xl mt-1 leading-snug line-clamp-2">
          {item.title}
        </h3>
        <p className="text-white/85 text-sm mt-1.5 max-w-xl line-clamp-2">
          {item.description}
        </p>

        <div className="flex items-center justify-between mt-4">
          <div
            className="flex gap-1.5"
            role="tablist"
            aria-label="IEC materials"
          >
            {items.map((it, i) => (
              <button
                key={it.slug}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Show ${it.title}`}
                onClick={() => setIndex(i)}
                className={`w-2 h-2 rounded-full transition-colors ${i === index ? "bg-govt-saffron" : "bg-white/40 hover:bg-white/70"}`}
              />
            ))}
          </div>
          <Link
            to="/updates/iec"
            className="text-xs font-semibold text-white hover:text-govt-saffron underline underline-offset-2 shrink-0"
          >
            Browse All &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

function SpotlightCard(item, isActive) {
  const accent = SPOTLIGHT_ACCENTS[item.accent];
  return (
    <Link
      to="/updates/spotlight"
      className="group relative flex h-full w-full overflow-hidden rounded-xl shadow-sm transition-shadow duration-300 hover:shadow-lg"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${accent.gradient}`}
        aria-hidden="true"
      />
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        className="absolute -right-3 -bottom-3 w-20 h-20 sm:-right-4 sm:-bottom-4 sm:w-28 sm:h-28 text-white/15 pointer-events-none"
        aria-hidden="true"
      >
        {item.icon({})}
      </svg>
      <div className="relative flex h-full w-full flex-col justify-end p-4 sm:p-6 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
        <span className="inline-flex w-fit items-center bg-white/15 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-sm mb-2 ring-1 ring-white/30">
          Spotlight
        </span>
        <h3
          className={`font-heading font-bold text-white leading-snug transition-all duration-300 text-base line-clamp-3 ${isActive ? "lg:text-xl" : "lg:text-sm lg:line-clamp-2"}`}
        >
          {item.title}
        </h3>
        <p
          className={`text-white/85 text-sm mt-2 leading-relaxed line-clamp-3 transition-opacity duration-300 ${isActive ? "lg:delay-150" : "lg:opacity-0"}`}
        >
          {item.text}
        </p>
        <p
          className={`text-white/70 text-xs mt-3 transition-opacity duration-300 ${isActive ? "lg:delay-150" : "lg:opacity-0"}`}
        >
          {item.date}
        </p>
      </div>
    </Link>
  );
}

export default function Home() {
  return (
    <>
      <h1 className="sr-only">
        Bihar Swasthya Suraksha Samiti &ndash; Ayushman Bharat Bihar: Home
      </h1>

      <NoticeTicker />
      <HeroCarousel />

      <section
        className="bg-white border-b border-govt-gray-200"
        aria-labelledby="events-heading"
      >
        <div className="max-w-7xl mx-auto px-4 py-8 sm:py-10">
          <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-govt-saffron-dark mb-1">
                What&rsquo;s On
              </p>
              <h2
                id="events-heading"
                className="text-xl sm:text-2xl font-heading font-bold text-govt-blue-dark"
              >
                Upcoming Events
              </h2>
            </div>
            <Link
              to="/updates/events"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-govt-blue hover:text-govt-blue-dark transition-colors shrink-0"
            >
              View All
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 010-1.06L10.94 10 7.21 6.29a.75.75 0 111.06-1.06l4.25 4.24a.75.75 0 010 1.06l-4.25 4.24a.75.75 0 01-1.06 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>

          <CardCarousel
            items={HOME_EVENTS}
            getKey={(e) => e.slug}
            renderItem={EventCard}
          />
        </div>
      </section>

      <section className="bg-govt-blue-light border-y border-govt-blue/10">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:py-10">
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 items-start">
            <div className="lg:col-span-2">
              <h2 className="text-lg sm:text-2xl font-heading font-bold text-govt-blue-dark mb-2 sm:mb-3">
                About Ayushman Bharat
              </h2>
              <p className="text-sm sm:text-base text-govt-gray-700 leading-relaxed">
                Ayushman Bharat &ndash; Pradhan Mantri Jan Arogya Yojana
                (AB-PMJAY) is the flagship health assurance scheme of the
                Government of India, providing a health cover of Rs. 5 lakh per
                family per year for secondary and tertiary care hospitalisation.
                In Bihar, the scheme is implemented by the Bihar Swasthya
                Suraksha Samiti (BSSS) in convergence with the state-funded
                Mukhyamantri Jan Arogya Yojana (MMJAY), extending cashless and
                paperless treatment to crores of eligible families across the
                state.
              </p>
              <Link
                to="/about/about-ayushman-bharat"
                className="btn-primary mt-4 sm:mt-5"
              >
                Read More
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {STAT_TILES.map((tile) => (
                <div key={tile.labelEn} className="stat-tile">
                  <p className="text-xl sm:text-3xl font-heading font-bold text-govt-blue-dark">
                    {tile.value}
                  </p>
                  <p className="text-xs text-govt-gray-600 mt-1">
                    {tile.labelEn}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-govt-blue/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-bold text-govt-blue-dark">
                Key Features
              </h3>
              <Link
                to="/about/features"
                className="text-sm font-semibold text-govt-blue hover:underline shrink-0"
              >
                View All &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
              {FEATURES.map((f) => (
                <Link
                  key={f.n}
                  to="/about/features"
                  className="group bg-white rounded-xl border border-govt-gray-200 p-4 hover:-translate-y-1 hover:shadow-lg hover:border-govt-blue/30 transition-all duration-300"
                >
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-govt-saffron/10 text-govt-saffron-dark group-hover:bg-govt-saffron group-hover:text-white font-heading font-extrabold text-sm transition-colors">
                    {f.n}
                  </span>
                  <p className="text-sm font-semibold text-govt-blue-dark mt-3 leading-snug">
                    {f.titleEn}
                  </p>
                </Link>
              ))}
            </div>
          </div> */}
        </div>
      </section>

      <section
        className="max-w-7xl mx-auto px-4 py-8 sm:py-10"
        aria-labelledby="quick-services-heading"
      >
        <div className="max-w-2xl mx-auto mb-6 text-center">
          <h2
            id="quick-services-heading"
            className="text-xl sm:text-2xl font-heading font-bold text-govt-blue-dark"
          >
            What would you like to do?
          </h2>
          <p className="text-sm sm:text-base text-govt-gray-600 mt-2">
            Quick access to the services beneficiaries use most.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {QUICK_SERVICES.map((service) => (
            <Link
              key={service.href}
              to={service.href}
              className="group relative flex flex-col items-start bg-white rounded-xl border border-govt-gray-200 shadow-sm p-5 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-govt-blue/30"
            >
              <span
                className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} text-white shadow-md shrink-0 mb-4`}
              >
                {service.icon}
              </span>
              <h3 className="font-heading font-bold text-govt-blue-dark">
                {service.titleEn}
              </h3>
              <p className="text-sm text-govt-gray-600 mt-1.5">
                {service.descEn}
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-govt-blue mt-4 group-hover:gap-1.5 transition-all">
                Get Started
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.21 14.77a.75.75 0 010-1.06L10.94 10 7.21 6.29a.75.75 0 111.06-1.06l4.25 4.24a.75.75 0 010 1.06l-4.25 4.24a.75.75 0 01-1.06 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section
        className="bg-govt-gray-50 border-b border-govt-gray-200"
        aria-labelledby="dashboard-heading"
      >
        <div className="max-w-7xl mx-auto ">
          <div className="relative  p-5 sm:p-8 overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div>
                <h2
                  id="dashboard-heading"
                  className="text-xl sm:text-2xl font-heading font-bold text-govt-blue-dark flex items-center gap-2"
                >
                  <span
                    className="relative inline-flex w-2.5 h-2.5"
                    aria-hidden="true"
                  >
                    <span className="absolute inset-0 rounded-full bg-govt-green animate-ping opacity-60" />
                    <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-govt-green" />
                  </span>
                  Programme Dashboard
                </h2>
                <p className="text-xs sm:text-sm text-govt-gray-600 mt-1">
                  Last Updated <span aria-hidden="true">:</span>{" "}
                  <span className="font-semibold text-govt-gray-700">
                    02-07-2026, 10:00 AM
                  </span>
                </p>
              </div>
              <Link to="/dashboard" className="btn-secondary text-sm">
                View Full Dashboard &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <Link
                to="/dashboard/ab-pmjay#hospital-empanelment"
                className="group relative flex flex-col bg-white rounded-xl border border-govt-gray-200 shadow-sm p-5 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-govt-blue/30"
              >
                <span
                  className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br from-govt-blue to-govt-blue-mid opacity-[0.06] group-hover:opacity-[0.14] group-hover:scale-125 transition-all duration-500"
                  aria-hidden="true"
                />
                <div className="relative flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-govt-blue to-govt-blue-mid text-white shadow-md shrink-0">
                    <svg
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 20V9l8-5 8 5v11"
                      />
                      <path
                        strokeLinecap="round"
                        d="M9 20v-5h6v5M12 8v4M10 10h4"
                      />
                    </svg>
                  </span>
                  <h3 className="font-heading font-bold text-govt-blue-dark">
                    Hospital Empanelment
                  </h3>
                </div>
                <div className="relative grid grid-cols-2 gap-3 mt-auto">
                  <div className="rounded-lg bg-govt-gray-50 border border-govt-gray-100 px-3 py-3 text-center">
                    <p className="text-lg font-heading font-extrabold text-govt-gray-900 tabular-nums">
                      {fmtIN(HOSPITAL_TOTALS.public)}
                    </p>
                    <p className="text-[11px] font-semibold text-govt-gray-500 uppercase tracking-wide mt-1">
                      Public Hospitals
                    </p>
                  </div>
                  <div className="rounded-lg bg-govt-gray-50 border border-govt-gray-100 px-3 py-3 text-center">
                    <p className="text-lg font-heading font-extrabold text-govt-gray-900 tabular-nums">
                      {fmtIN(HOSPITAL_TOTALS.private)}
                    </p>
                    <p className="text-[11px] font-semibold text-govt-gray-500 uppercase tracking-wide mt-1">
                      Private Hospitals
                    </p>
                  </div>
                </div>
                <span className="relative inline-flex items-center gap-1 text-xs font-semibold text-govt-blue mt-4 group-hover:gap-1.5 transition-all">
                  District Wise Details
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 010-1.06L10.94 10 7.21 6.29a.75.75 0 111.06-1.06l4.25 4.24a.75.75 0 010 1.06l-4.25 4.24a.75.75 0 01-1.06 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </Link>

              <div className="group relative flex flex-col bg-white rounded-xl border border-govt-gray-200 shadow-sm p-5 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-govt-green/30">
                <span
                  className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br from-govt-green-dark to-govt-green opacity-[0.06] group-hover:opacity-[0.14] group-hover:scale-125 transition-all duration-500"
                  aria-hidden="true"
                />
                <div className="relative flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-govt-green-dark to-govt-green text-white shadow-md shrink-0">
                    <svg
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="8" r="3.5" />
                      <path
                        strokeLinecap="round"
                        d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6"
                      />
                    </svg>
                  </span>
                  <h3 className="font-heading font-bold text-govt-blue-dark">
                    Beneficiary Enrollment
                  </h3>
                </div>
                <dl className="relative divide-y divide-govt-gray-100 border-y border-govt-gray-100">
                  {BENEFICIARY_ENROLLMENT.kpis.map((kpi) => (
                    <div
                      key={kpi.label}
                      className="flex items-center justify-between py-2.5"
                    >
                      <dt className="text-xs text-govt-gray-600">
                        {kpi.label}
                      </dt>
                      <dd className="text-base font-heading font-bold text-govt-gray-900 tabular-nums">
                        {kpi.value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <Link
                  to="/dashboard/ab-pmjay#beneficiary-enrollment"
                  className="relative inline-flex items-center gap-1 text-xs font-semibold text-govt-blue mt-4 ml-auto hover:gap-1.5 transition-all"
                >
                  More
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 010-1.06L10.94 10 7.21 6.29a.75.75 0 111.06-1.06l4.25 4.24a.75.75 0 010 1.06l-4.25 4.24a.75.75 0 01-1.06 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>

              <div className="group relative flex flex-col bg-white rounded-xl border border-govt-gray-200 shadow-sm p-5 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-govt-saffron/30">
                <span
                  className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br from-govt-saffron-dark to-govt-saffron opacity-[0.06] group-hover:opacity-[0.14] group-hover:scale-125 transition-all duration-500"
                  aria-hidden="true"
                />
                <div className="relative flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-govt-saffron-dark to-govt-saffron text-white shadow-md shrink-0">
                    <svg
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 3.5h7l4 4V20a1 1 0 01-1 1H7a1 1 0 01-1-1V4.5a1 1 0 011-1z"
                      />
                      <path
                        strokeLinecap="round"
                        d="M14 3.5V8h4M8.5 12h7M8.5 15.5h7M8.5 19h4"
                      />
                    </svg>
                  </span>
                  <h3 className="font-heading font-bold text-govt-blue-dark">
                    Treatment Support
                  </h3>
                </div>
                <dl className="relative divide-y divide-govt-gray-100 border-y border-govt-gray-100">
                  {TREATMENT_SUPPORT.kpis.map((kpi) => (
                    <div
                      key={kpi.label}
                      className="flex items-center justify-between py-2"
                    >
                      <dt className="text-xs text-govt-gray-600">
                        {kpi.label}
                      </dt>
                      <dd className="text-base font-heading font-bold text-govt-gray-900 tabular-nums">
                        {kpi.value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <Link
                  to="/dashboard/ab-pmjay#treatment-support"
                  className="relative inline-flex items-center gap-1 text-xs font-semibold text-govt-blue mt-4 ml-auto hover:gap-1.5 transition-all"
                >
                  More
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 010-1.06L10.94 10 7.21 6.29a.75.75 0 111.06-1.06l4.25 4.24a.75.75 0 010 1.06l-4.25 4.24a.75.75 0 01-1.06 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-8 sm:py-10">
        <div className="grid lg:grid-cols-2 gap-8">
          <div aria-labelledby="iec-heading">
            <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-govt-saffron-dark mb-1">
                  Outreach Material
                </p>
                <h2
                  id="iec-heading"
                  className="text-xl sm:text-2xl font-heading font-bold text-govt-blue-dark"
                >
                  IEC Corner
                </h2>
              </div>
              <Link
                to="/updates/iec"
                className="text-sm font-semibold text-govt-blue hover:underline shrink-0"
              >
                View All &rarr;
              </Link>
            </div>
            <div className="h-64 sm:h-80">
              <IecShowcase items={iecItems} />
            </div>
          </div>

          <div aria-labelledby="success-stories-heading">
            <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-govt-saffron-dark mb-1">
                  Real Beneficiaries
                </p>
                <h2
                  id="success-stories-heading"
                  className="text-xl sm:text-2xl font-heading font-bold text-govt-blue-dark"
                >
                  Success Stories
                </h2>
              </div>
              <Link
                to="/updates/success-stories"
                className="text-sm font-semibold text-govt-blue hover:underline shrink-0"
              >
                View All &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-3 h-64 sm:h-80">
              {successStories.map((story, i) => (
                <article
                  key={story.name}
                  className={`group relative overflow-hidden rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300 ${i === 2 ? "col-span-2" : ""}`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${STORY_GRADIENTS[i % STORY_GRADIENTS.length]} transition-transform duration-500 ease-out group-hover:scale-105`}
                    role="img"
                    aria-label={`Illustrative photo representing the story of ${story.name}`}
                  />
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="absolute w-16 h-16 -right-2 -bottom-2 text-white/15 pointer-events-none"
                    aria-hidden="true"
                  >
                    <path d="M10 2h4v8h8v4h-8v8h-4v-8H2v-4h8V2z" />
                  </svg>

                  <div className="relative h-full flex flex-col justify-end p-3 sm:p-4 bg-gradient-to-t from-black/80 via-black/35 to-transparent">
                    <span className="inline-flex w-fit items-center bg-white/15 backdrop-blur-sm text-white text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-sm mb-1 ring-1 ring-white/30">
                      Success Story
                    </span>
                    <h3 className="font-heading font-bold text-white text-sm line-clamp-1">
                      {story.title}
                    </h3>
                    <p className="text-white/70 text-[11px] mt-1">
                      {story.name} &middot; {story.date}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="max-w-7xl mx-auto px-4 py-8 sm:py-10"
        aria-labelledby="spotlight-heading"
      >
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-govt-saffron-dark mb-1">
              Programme Highlights
            </p>
            <h2
              id="spotlight-heading"
              className="text-xl sm:text-2xl font-heading font-bold text-govt-blue-dark"
            >
              Spotlight
            </h2>
          </div>
          <Link
            to="/updates/spotlight"
            className="text-sm font-semibold text-govt-blue hover:underline shrink-0"
          >
            View All &rarr;
          </Link>
        </div>

        <ExpandingCardGroup
          items={SPOTLIGHT_ITEMS}
          getKey={(item) => item.title}
          renderCard={SpotlightCard}
        />
      </section>
    </>
  );
}
