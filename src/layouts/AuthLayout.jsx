import { Outlet, Link, useNavigate } from 'react-router-dom';
import Footer from '../components/layout/Footer';
import { useLang } from '../hooks/useLang';
import { useScrollRestoration } from '../hooks/useScrollRestoration';
import bsssLogo from '../assets/images/BSSS.jpg';

/** Minimal header/footer shell for auth pages (login, etc.) - no utility bar,
 *  no full nav menu, no mobile hamburger. Just the brand, a way back to the
 *  homepage, and the page content. */
export default function AuthLayout() {
  const { t } = useLang();
  const navigate = useNavigate();
  useScrollRestoration();

  return (
    <div className="min-h-screen flex flex-col bg-white text-govt-gray-900">
      <a href="#main-content" className="skip-link">{t('Skip to main content', 'मुख्य सामग्री पर जाएं')}</a>

      <header className="border-b border-govt-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2.5 min-w-0">
            <img
              src={bsssLogo}
              alt="Bihar Swasthya Suraksha Samiti (BSSS) logo"
              width="40"
              height="40"
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-full object-cover shrink-0 ring-1 ring-govt-gray-200"
            />
            <span className="leading-tight min-w-0">
              <span className="block font-heading font-bold text-govt-blue-dark text-sm sm:text-base truncate">
                Bihar Swasthya Suraksha Samiti
              </span>
              <span className="hidden sm:block text-xs text-govt-gray-600 truncate">
                Ayushman Bharat &ndash; PM Jan Arogya Yojana, Bihar
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-govt-gray-600 hover:text-govt-blue-dark transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 010 1.06L9.06 10l3.73 3.71a.75.75 0 11-1.06 1.06l-4.25-4.24a.75.75 0 010-1.06l4.25-4.24a.75.75 0 011.06 0z" clipRule="evenodd" />
              </svg>
              <span className="hidden sm:inline">{t('Go Back', 'वापस जाएं')}</span>
            </button>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-govt-blue hover:text-govt-blue-dark transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-3a1 1 0 01-1-1v-3H9v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" />
              </svg>
              {t('Home', 'होम')}
            </Link>
          </div>
        </div>
      </header>

      <main id="main-content" className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
