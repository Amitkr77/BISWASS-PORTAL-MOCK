import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import BackToTop from '../components/common/BackToTop';
import { useLang } from '../hooks/useLang';
import { useScrollRestoration } from '../hooks/useScrollRestoration';

export default function MainLayout() {
  const { t } = useLang();
  useScrollRestoration();

  return (
    <div data-root="" className="min-h-screen flex flex-col bg-white text-govt-gray-900">
      <a href="#main-content" className="skip-link">{t('Skip to main content', 'मुख्य सामग्री पर जाएं')}</a>
      <Header />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
