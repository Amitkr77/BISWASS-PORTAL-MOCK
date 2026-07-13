import { Navigate, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { canManageUsers } from '../services/rbac/permissions';
import { UsersIcon, TrashIcon, ClockIcon, FolderIcon } from '../components/common/icons';

const TABS = [
  { to: '/portal/settings/users', label: 'Users', icon: UsersIcon },
  { to: '/portal/settings/modules', label: 'Modules', icon: FolderIcon },
  { to: '/portal/settings/recycle-bin', label: 'Recycle Bin', icon: TrashIcon },
  { to: '/portal/settings/audit-log', label: 'Audit Log', icon: ClockIcon },
];

/** Shell for every admin-only surface (Users, Modules, Recycle Bin, Audit
 *  Log). One access guard and one "Settings" identity for all four, instead
 *  of four unrelated top-level pages each re-implementing the same guard. */
export default function SettingsLayout() {
  const { currentUser } = useAuth();

  if (!canManageUsers(currentUser)) {
    return <Navigate to="/portal" replace />;
  }

  return (
    <div>
      <div className="mb-5">
        <p className="text-xs font-bold uppercase tracking-widest text-govt-saffron-dark mb-1">Administration</p>
        <h1 className="text-xl sm:text-2xl font-heading font-bold text-govt-blue-dark">Settings</h1>
        <p className="text-sm text-govt-gray-600 mt-1">Manage users, modules, deleted records and system activity.</p>
      </div>

      <div
        role="tablist"
        aria-label="Settings sections"
        className="flex gap-1 overflow-x-auto border-b border-govt-gray-200 mb-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {TABS.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            role="tab"
            className={({ isActive }) =>
              `shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-colors ${
                isActive
                  ? 'border-govt-blue text-govt-blue-dark'
                  : 'border-transparent text-govt-gray-500 hover:text-govt-blue-dark hover:border-govt-gray-300'
              }`
            }
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </NavLink>
        ))}
      </div>

      <Outlet />
    </div>
  );
}
