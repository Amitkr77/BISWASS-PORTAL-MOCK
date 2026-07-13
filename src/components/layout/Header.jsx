import { useState } from "react";
import { Link } from "react-router-dom";
import UtilityBar from "./UtilityBar";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import HeaderSearch from "./HeaderSearch";
import { useLang } from "../../hooks/useLang";
import { useStickyHeader } from "../../hooks/useStickyHeader";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import { MenuIcon, CloseIcon, LoginIcon } from "../common/icons";
import bsssLogo from "../../assets/images/BSSS.jpg";
import pmjayLogo from "../../assets/images/PMJAY.png";
import mmjayLogo from "../../assets/images/MMJAY.jpg";
import shsbLogo from "../../assets/images/SHSB.gif";

const LOGO_CLASS =
  "h-10 w-10 sm:h-14 sm:w-14 lg:h-20 lg:w-20 xl:h-24 xl:w-24 rounded-full object-cover shrink-0 ring-1 ring-govt-gray-200";

export default function Header() {
  const { t } = useLang();
  const condensed = useStickyHeader();
  const [mobileOpen, setMobileOpen] = useState(false);
  const hideUtilityBar = condensed && !mobileOpen;

  useLockBodyScroll(mobileOpen);

  return (
    <header
      id="site-header"
      className={`sticky top-0 z-40 bg-white border-b border-govt-gray-200 shadow-gov [overflow-anchor:none]${condensed ? " is-condensed" : ""}`}
    >
      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${hideUtilityBar ? "max-h-0 opacity-0" : "max-h-24 opacity-100"}`}
      >
        <UtilityBar />
      </div>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between gap-2 sm:gap-4 py-2">
          <Link
            to="/"
            className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 py-1"
          >
            <span className="flex items-center gap-1 sm:gap-2 shrink-0">
              <img
                src={bsssLogo}
                alt="Bihar Swasthya Suraksha Samiti (BSSS) logo"
                width="96"
                height="96"
                className={LOGO_CLASS}
              />
              <img
                src={pmjayLogo}
                alt="Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY) logo"
                width="96"
                height="96"
                className={LOGO_CLASS}
              />
              <img
                src={mmjayLogo}
                alt="Mukhyamantri Jan Arogya Yojana (MMJAY) logo"
                width="96"
                height="96"
                className={LOGO_CLASS}
              />
              {/* <img src={shsbLogo} alt="State Health Society, Bihar (SHSB) logo" width="96" height="96" className={LOGO_CLASS} /> */}
            </span>
            <span className="leading-tight min-w-0">
              <span className="block font-heading font-bold text-govt-blue-dark text-xs sm:text-sm lg:text-base truncate">
                Bihar Swasthya Suraksha Samiti
              </span>
              <span className="hidden sm:block text-xs lg:text-sm text-govt-gray-600 truncate">
                Ayushman Bharat &ndash; PM Jan Arogya Yojana, Bihar
              </span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <HeaderSearch />
            <Link to="/login" className="btn-login">
              <LoginIcon />
              <span>{t("Login", "लॉगिन")}</span>
            </Link>
          </div>

          <button
            type="button"
            className="lg:hidden p-2 text-govt-blue-dark shrink-0"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        <DesktopNav />
      </div>

      {mobileOpen && <MobileNav onNavigate={() => setMobileOpen(false)} />}
    </header>
  );
}
