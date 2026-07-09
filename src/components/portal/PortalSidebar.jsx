import { NavLink } from 'react-router-dom';
import { visibleModuleIds, canManageUsers, canAccessRecycleBin } from '../../services/rbac/permissions';
import { BellIcon, CalendarIcon, UsersIcon, TrashIcon, PlusIcon, ClockIcon } from '../common/icons';

const MODULE_ICONS = {
  notices: BellIcon,
  events: CalendarIcon,
};

function DashboardIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M3 3.75A.75.75 0 013.75 3h4.5a.75.75 0 01.75.75v4.5a.75.75 0 01-.75.75h-4.5A.75.75 0 013 8.25v-4.5zM3 12.75a.75.75 0 01.75-.75h4.5a.75.75 0 01.75.75v3.5a.75.75 0 01-.75.75h-4.5a.75.75 0 01-.75-.75v-3.5zM11.75 3a.75.75 0 00-.75.75v3.5c0 .414.336.75.75.75h4.5A.75.75 0 0017 7.25v-3.5a.75.75 0 00-.75-.75h-4.5zM11 12.75a.75.75 0 01.75-.75h4.5a.75.75 0 01.75.75v4.5a.75.75 0 01-.75.75h-4.5a.75.75 0 01-.75-.75v-4.5z" />
    </svg>
  );
}

function FolderIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M2 5.5A1.5 1.5 0 013.5 4h3.379a1.5 1.5 0 011.06.44l1.122 1.12A1.5 1.5 0 0010.12 6H16.5A1.5 1.5 0 0118 7.5v7A1.5 1.5 0 0116.5 16h-13A1.5 1.5 0 012 14.5v-9z" />
    </svg>
  );
}

function NavItem({ to, icon: Icon, label, end, onNavigate }) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onNavigate}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-semibold transition-colors ${
          isActive
            ? 'bg-govt-blue text-white'
            : 'text-govt-gray-700 hover:bg-govt-blue-light hover:text-govt-blue-dark'
        }`
      }
    >
      <Icon className="w-4 h-4 shrink-0" />
      <span className="truncate">{label}</span>
    </NavLink>
  );
}

export default function PortalSidebar({ user, modules, onNavigate }) {
  const moduleIds = visibleModuleIds(user, modules);
  const visibleModules = modules.filter((m) => moduleIds.includes(m.id));

  return (
    <nav aria-label="Portal navigation" className="flex flex-col gap-1 p-3">
      <NavItem to="/portal" end icon={DashboardIcon} label="Dashboard" onNavigate={onNavigate} />

      {visibleModules.length > 0 && (
        <p className="px-3 pt-4 pb-1 text-[11px] font-bold uppercase tracking-widest text-govt-gray-500">
          Modules
        </p>
      )}
      {visibleModules.map((mod) => (
        <NavItem
          key={mod.id}
          to={`/portal/${mod.id}`}
          icon={MODULE_ICONS[mod.id] || FolderIcon}
          label={mod.label}
          onNavigate={onNavigate}
        />
      ))}

      {(canManageUsers(user) || canAccessRecycleBin(user)) && (
        <p className="px-3 pt-4 pb-1 text-[11px] font-bold uppercase tracking-widest text-govt-gray-500">
          Administration
        </p>
      )}
      {canManageUsers(user) && (
        <NavItem to="/portal/modules" icon={PlusIcon} label="Module Management" onNavigate={onNavigate} />
      )}
      {canManageUsers(user) && (
        <NavItem to="/portal/users" icon={UsersIcon} label="User Management" onNavigate={onNavigate} />
      )}
      {canAccessRecycleBin(user) && (
        <NavItem to="/portal/recycle-bin" icon={TrashIcon} label="Recycle Bin" onNavigate={onNavigate} />
      )}
      {canManageUsers(user) && (
        <NavItem to="/portal/audit-log" icon={ClockIcon} label="Audit Log" onNavigate={onNavigate} />
      )}
    </nav>
  );
}
