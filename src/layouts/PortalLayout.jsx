import { useState } from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import PortalSidebar from '../components/portal/PortalSidebar';
import { userTypeLabel } from '../services/rbac/userLabel';
import { ShieldIcon, UserIcon, LogOutIcon, MenuIcon, CloseIcon } from '../components/common/icons';
import bsssLogo from '../assets/images/BSSS.jpg';

export default function PortalLayout() {
  const { currentUser, modules, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-govt-gray-50">
      <header className="sticky top-0 z-40 bg-white border-b border-govt-gray-200 shadow-gov">
        <div className="px-4 py-2.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              className="lg:hidden p-2 -ml-2 text-govt-blue-dark shrink-0"
              aria-expanded={mobileOpen}
              aria-controls="portal-sidebar"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileOpen((prev) => !prev)}
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
            <Link to="/portal" className="flex items-center gap-2 min-w-0">
              <img src={bsssLogo} alt="BSSS logo" width="36" height="36" className="h-9 w-9 rounded-full object-cover ring-1 ring-govt-gray-200 shrink-0" />
              <span className="hidden sm:block font-heading font-bold text-govt-blue-dark text-sm truncate">
                BSSS RBAC Demo Portal
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="hidden sm:flex items-center gap-2 text-sm">
              <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full ${currentUser.role === 'admin' ? 'bg-govt-saffron/15 text-govt-saffron-dark' : 'bg-govt-blue-light text-govt-blue'}`}>
                {currentUser.role === 'admin' ? <ShieldIcon className="w-3.5 h-3.5" /> : <UserIcon className="w-3.5 h-3.5" />}
              </span>
              <span className="leading-tight">
                <span className="block font-semibold text-govt-gray-900">{currentUser.name}</span>
                <span className="block text-xs text-govt-gray-500">{userTypeLabel(currentUser)}</span>
              </span>
            </span>
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-govt-gray-600 hover:text-govt-red transition-colors"
            >
              <LogOutIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 min-h-0">
        <aside id="portal-sidebar" className="hidden lg:block w-64 shrink-0 border-r border-govt-gray-200 bg-white overflow-y-auto">
          <PortalSidebar user={currentUser} modules={modules} />
        </aside>

        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div className="absolute inset-0 bg-govt-blue-dark/50" onClick={() => setMobileOpen(false)} aria-hidden="true" />
            <div className="relative w-72 max-w-[80vw] bg-white h-full overflow-y-auto shadow-gov">
              <div className="flex items-center justify-between px-4 py-3 border-b border-govt-gray-200">
                <span className="font-heading font-bold text-govt-blue-dark text-sm">Menu</span>
                <button type="button" onClick={() => setMobileOpen(false)} aria-label="Close menu" className="text-govt-gray-500">
                  <CloseIcon className="w-5 h-5" />
                </button>
              </div>
              <PortalSidebar user={currentUser} modules={modules} onNavigate={() => setMobileOpen(false)} />
            </div>
          </div>
        )}

        <main className="flex-1 min-w-0 px-4 sm:px-6 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
