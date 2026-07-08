import { useCallback, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useEscapeKey } from "../../hooks/useEscapeKey";
import { ChevronDownIcon } from "../common/icons";
import { DASHBOARD_TYPE_LIST } from "../../services/data/dashboardData";
import bsssLogo from "../../assets/images/BSSS.jpg";

const DP_MENUS = [
  {
    id: "dashboard",
    label: "Dashboard",
    links: DASHBOARD_TYPE_LIST.map((type) => ({
      label: type.label,
      href: `/dashboard/${type.slug}`,
    })),
  },
  {
    id: "reports",
    label: "Reports",
    links: DASHBOARD_TYPE_LIST.map((type) => ({
      label: type.reportLabel,
      href: `/dashboard/reports/${type.slug}`,
    })),
  },
];

export default function DashboardHeader() {
  const [openId, setOpenId] = useState(null);
  const navRef = useRef(null);
  const location = useLocation();
  const close = useCallback(() => setOpenId(null), []);
  useOutsideClick(navRef, close, openId !== null);
  useEscapeKey(close, openId !== null);

  return (
    <header
      id="dashboard-header"
      className="sticky top-0 z-40 bg-white shadow-gov"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-3 min-w-0">
          <img
            src={bsssLogo}
            alt="Bihar Swasthya Suraksha Samiti (BSSS) logo"
            width="48"
            height="48"
            className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover ring-1 ring-govt-gray-200 shrink-0"
          />
          <span className="font-heading font-bold text-govt-blue-dark text-base sm:text-lg truncate">
            Bihar Swasthya Suraksha Samiti &ndash; Data Portal
          </span>
        </Link>
        <nav
          ref={navRef}
          aria-label="Data Portal"
          className="flex items-center"
        >
          <ul className="flex items-center gap-1">
            {DP_MENUS.map((menu) => {
              const isOpen = openId === menu.id;
              const isActive = menu.links.some((link) =>
                location.pathname.startsWith(link.href.split("#")[0]),
              );
              return (
                <li
                  key={menu.id}
                  className={`dp-nav-item${isOpen ? " is-open" : ""}`}
                >
                  <button
                    type="button"
                    className={`dp-nav-link${isActive ? " bg-govt-blue-light text-govt-blue-dark" : ""}`}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    aria-current={isActive ? "page" : undefined}
                    onClick={() =>
                      setOpenId((prev) => (prev === menu.id ? null : menu.id))
                    }
                  >
                    {menu.label} <ChevronDownIcon />
                  </button>
                  <div className="dp-nav-panel">
                    {menu.links.map((link) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        onClick={close}
                        aria-current={
                          location.pathname === link.href ? "page" : undefined
                        }
                        className={
                          location.pathname === link.href
                            ? "font-semibold text-govt-blue-dark bg-govt-blue-light"
                            : undefined
                        }
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </li>
              );
            })}
            <li>
              <Link
                to="/login"
                aria-current={location.pathname === "/login" ? "page" : undefined}
                className={`dp-nav-link${location.pathname === "/login" ? " bg-govt-blue-light text-govt-blue-dark" : ""}`}
              >
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
