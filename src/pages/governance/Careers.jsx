import { Link } from "react-router-dom";
import Breadcrumb from "../../components/common/Breadcrumb";
import PageBanner from "../../components/common/PageBanner";
import { LocationIcon, UsersIcon, CalendarIcon } from "../../components/common/icons";

export const JOBS = [
  {
    id: "district-programme-coordinator",
    title: "District Programme Coordinator",
    type: "Contractual",
    location: "Multiple Districts",
    vacancies: 12,
    closingDate: "2026-07-31",
  },
  {
    id: "manager-grievance",
    title: "Manager (Grievance)",
    type: "Contractual",
    location: "State Office, Patna",
    vacancies: 2,
    closingDate: "2026-07-20",
  },
  {
    id: "deputy-general-manager-medical",
    title: "Deputy General Manager (Medical)",
    type: "Contractual",
    location: "State Office, Patna",
    vacancies: 1,
    closingDate: "2026-07-25",
  },
  {
    id: "data-entry-operator",
    title: "Data Entry Operator",
    type: "Contractual",
    location: "Multiple Districts",
    vacancies: 20,
    closingDate: "2026-08-05",
  },
  {
    id: "office-assistant",
    title: "Office Assistant",
    type: "Contractual",
    location: "State Office, Patna",
    vacancies: 3,
    closingDate: "2026-07-15",
  },
];

export default function Careers() {
  return (
    <>
      <Breadcrumb items={[{ label: "Governance" }, { label: "Careers" }]} />
      <PageBanner
        title="Careers"
        description="Current openings at the Bihar Swasthya Suraksha Samiti and how to apply."
      />

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="max-w-2xl mb-8">
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-govt-blue-dark">
            Current Openings
          </h2>
          <p className="text-sm text-govt-gray-600 mt-2">
            Detailed eligibility criteria and terms of engagement for each
            position are published along with individual recruitment notices
            under{" "}
            <Link to="/notifications/notification" className="text-govt-blue hover:underline">
              Notifications &amp; Circulars
            </Link>
            .
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {JOBS.map((job) => (
            <div key={job.id} className="info-card flex flex-col">
              <span className="inline-block self-start rounded-sm bg-govt-blue-light px-2 py-0.5 text-xs font-semibold text-govt-blue-dark">
                {job.type}
              </span>

              <h3 className="mt-3 font-heading text-lg font-bold text-govt-blue-dark">
                {job.title}
              </h3>

              <dl className="mt-3 space-y-1.5 text-sm text-govt-gray-700">
                <div className="flex items-center gap-2">
                  <LocationIcon className="h-4 w-4 shrink-0 text-govt-gray-400" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <UsersIcon className="h-4 w-4 shrink-0 text-govt-gray-400" />
                  <span>
                    {job.vacancies} {job.vacancies === 1 ? "vacancy" : "vacancies"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 shrink-0 text-govt-gray-400" />
                  <span>Apply by {job.closingDate}</span>
                </div>
              </dl>

              <Link
                to={`/governance/careers/apply?position=${encodeURIComponent(job.title)}`}
                className="btn-primary mt-5 self-start"
              >
                Apply Now
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
