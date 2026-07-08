import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { useLang } from "../../hooks/useLang";
import {
  FOOTER_QUICK_LINKS,
  FOOTER_CITIZEN_SERVICES,
} from "../../utils/navigation";
import bsssLogo from "../../assets/images/BSSS.jpg";
import pmjayLogo from "../../assets/images/PMJAY.png";
import mmjayLogo from "../../assets/images/MMJAY.jpg";

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-7.02h2.36l.36-2.74h-2.72v-1.57c0-.79.22-1.34 1.36-1.34h1.45V5.84c-.7-.08-1.42-.11-2.13-.11-2.11 0-3.56 1.29-3.56 3.65v1.86H8.2v2.74h2.46V21h2.84z" />
    </svg>
  );
}

function TwitterIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.9 3h2.7l-5.9 6.75L22.4 21h-5.4l-4.24-5.55L7.7 21H5l6.3-7.2L4.4 3h5.53l3.83 5.07L18.9 3zm-1.9 16.2h1.5L8.1 4.7H6.5l10.5 14.5z" />
    </svg>
  );
}

function YoutubeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M21.6 7.2s-.21-1.5-.86-2.16c-.82-.87-1.74-.87-2.16-.92C15.6 4 12 4 12 4h-.01s-3.6 0-6.58.12c-.42.05-1.34.05-2.16.92-.65.66-.86 2.16-.86 2.16S2.18 9 2.18 10.8v1.68c0 1.8.21 3.6.21 3.6s.21 1.5.86 2.16c.82.87 1.9.84 2.38.93 1.73.17 7.36.22 7.36.22s3.6-.01 6.58-.13c.42-.05 1.34-.05 2.16-.92.65-.66.86-2.16.86-2.16s.21-1.8.21-3.6V10.8c0-1.8-.21-3.6-.21-3.6zM9.98 14.9v-6l5.4 3-5.4 3z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://www.facebook.com/", Icon: FacebookIcon },
  { label: "Twitter", href: "https://twitter.com/", Icon: TwitterIcon },
  { label: "YouTube", href: "https://www.youtube.com/", Icon: YoutubeIcon },
];

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-govt-blue-dark text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img
              src={bsssLogo}
              alt="Bihar Swasthya Suraksha Samiti (BSSS) logo"
              width="56"
              height="56"
              className="h-14 w-14 rounded-full object-cover bg-white ring-1 ring-white/30"
            />
            <img
              src={pmjayLogo}
              alt="Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY) logo"
              width="56"
              height="56"
              className="h-14 w-14 rounded-full object-cover bg-white ring-1 ring-white/30"
            />
            <img
              src={mmjayLogo}
              alt="Mukhyamantri Jan Arogya Yojana (MMJAY) logo"
              width="56"
              height="56"
              className="h-14 w-14 rounded-full object-cover bg-white ring-1 ring-white/30"
            />
          </div>
          <p className="text-sm text-govt-gray-300 leading-relaxed">
            Bihar Swasthya Suraksha Samiti (BSSS) is the State Health Agency
            implementing Ayushman Bharat &ndash; Pradhan Mantri Jan Arogya
            Yojana (AB-PMJAY) and Mukhyamantri Jan Arogya Yojana (MMJAY) across
            Bihar.
          </p>
          <p className="flex items-start gap-2 text-sm text-govt-gray-300 mt-4">
            <MapPin
              className="h-4 w-4 shrink-0 mt-0.5 text-govt-saffron"
              aria-hidden="true"
            />
            <span>
              State Health Society Bihar Campus, Sheikhpura, Patna &ndash;
              800014, Bihar, India
            </span>
          </p>
        </div>

        <div>
          <h2 className="footer-heading">{t("Quick Links", "त्वरित लिंक")}</h2>
          <ul className="space-y-2">
            {FOOTER_QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link to={link.href} className="footer-link">
                  {link.labelEn}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="footer-heading">
            {t("Citizen Services", "नागरिक सेवाएं")}
          </h2>
          <ul className="space-y-2">
            {FOOTER_CITIZEN_SERVICES.map((link) => (
              <li key={link.href}>
                <Link to={link.href} className="footer-link">
                  {link.labelEn}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="footer-heading">
            {t("Connect With Us", "हमसे जुड़ें")}
          </h2>
          <ul className="space-y-2.5 text-sm text-govt-gray-300">
            <li className="flex items-center gap-2">
              <Phone
                className="h-4 w-4 shrink-0 text-govt-saffron"
                aria-hidden="true"
              />
              <span>
                {t("Toll-Free Helpline", "टोल-फ्री हेल्पलाइन")}:{" "}
                <a href="tel:14555" className="footer-link">
                  14555
                </a>
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Mail
                className="h-4 w-4 shrink-0 text-govt-saffron"
                aria-hidden="true"
              />
              <a
                href="mailto:helpdesk-biswass@bihar.gov.in"
                className="footer-link"
              >
                helpdesk-biswass@bihar.gov.in
              </a>
            </li>
            <li>
              <Link to="/contact/contact-us" className="footer-link">
                {t("Contact Us", "संपर्क करें")}
              </Link>
            </li>
            <li>
              <Link to="/about/faq" className="footer-link">
                {t("FAQs", "सामान्य प्रश्न")}
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-3 mt-5">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`BSSS on ${label} (opens in new tab)`}
                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/10 text-white hover:bg-govt-saffron hover:text-govt-blue-dark transition-colors"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-govt-gray-300">
          <p>
            &copy; <span>{year}</span> Bihar Swasthya Suraksha Samiti (BSSS),
            Government of Bihar. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <span>
              {t(
                "Last Reviewed & Updated: 02 July 2026",
                "अंतिम समीक्षा और अद्यतन: 02 जुलाई 2026",
              )}
            </span>
            <span>{t("Visitors: 12,84,392", "आगंतुक: 12,84,392")}</span>
            <Link to="/sitemap" className="footer-link">
              {t("Sitemap", "साइटमैप")}
            </Link>
            <Link to="/terms-and-conditions" className="footer-link">
              {t("Terms & Conditions", "नियम और शर्तें")}
            </Link>
            <Link to="/about/about-ayushman-bharat" className="footer-link">
              {t("Department", "विभाग")}
            </Link>
            <Link to="/contact/contact-us" className="footer-link">
              {t("Contact", "संपर्क")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
