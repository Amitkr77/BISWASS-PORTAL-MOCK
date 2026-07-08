import { Outlet } from 'react-router-dom';
import UtilityBar from '../components/layout/UtilityBar';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import BackToTop from '../components/common/BackToTop';
import { useScrollRestoration } from '../hooks/useScrollRestoration';

export default function DashboardLayout() {
  useScrollRestoration();

  return (
    <div data-root="" className="min-h-screen flex flex-col bg-white text-govt-gray-900">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <UtilityBar />
      <DashboardHeader />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-govt-blue-dark text-white mt-12 py-6">
        <p className="text-center text-xs text-govt-gray-300">&copy; <span>{new Date().getFullYear()}</span> Bihar Swasthya Suraksha Samiti (BSSS) Data Portal. All rights reserved.</p>
      </footer>
      <BackToTop />
    </div>
  );
}
