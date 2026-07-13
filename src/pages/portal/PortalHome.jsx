import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { visibleModuleIds, isAdmin } from '../../services/rbac/permissions';
import { userTypeLabel } from '../../services/rbac/userLabel';
import { actionLabel } from '../../services/rbac/auditActions';
import { UsersIcon, TrashIcon, ShieldIcon, UserIcon, ClockIcon, FolderIcon } from '../../components/common/icons';

export default function PortalHome() {
  const { currentUser, users, modules, getRecords, recycleBinItems, auditLog } = useAuth();
  const moduleIds = visibleModuleIds(currentUser, modules);
  const visibleModules = modules.filter((m) => moduleIds.includes(m.id));
  const admin = isAdmin(currentUser);

  return (
    <div>
      <div className="rounded-xl bg-gradient-to-br from-govt-blue to-govt-blue-mid text-white p-6 sm:p-8 shadow-gov">
        <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${admin ? 'bg-govt-saffron text-govt-blue-dark' : 'bg-white/15'}`}>
          {admin ? <ShieldIcon className="w-3 h-3" /> : <UserIcon className="w-3 h-3" />}
          {userTypeLabel(currentUser)}
        </span>
        <h1 className="text-xl sm:text-2xl font-heading font-bold mt-3">Welcome, {currentUser.name}</h1>
        <p className="text-sm text-white/85 mt-1 max-w-2xl">
          {admin
            ? 'You have full access to every module, all user accounts and the recycle bin.'
            : `You have access to ${visibleModules.length || 'no'} module${visibleModules.length === 1 ? '' : 's'}: ${visibleModules.map((m) => m.label).join(', ') || 'none assigned yet'}.`}
        </p>
      </div>

      {visibleModules.length > 0 ? (
        <section className="mt-8" aria-labelledby="your-modules-heading">
          <h2 id="your-modules-heading" className="text-sm font-bold uppercase tracking-widest text-govt-gray-500 mb-3">
            Your Modules
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {visibleModules.map((mod) => (
              <Link key={mod.id} to={`/portal/${mod.id}`} className="kpi-card text-left hover:shadow-gov transition-shadow">
                <p className="kpi-label">{mod.label}</p>
                <p className="kpi-value">{getRecords(mod.id).length}</p>
                <p className="text-xs text-govt-gray-500 mt-1">records visible to you</p>
              </Link>
            ))}
          </div>
        </section>
      ) : (
        !admin && (
          <p className="mt-6 text-sm text-govt-gray-600 bg-white border border-govt-gray-200 rounded-sm p-5">
            No modules have been assigned to your account yet. Please contact the administrator.
          </p>
        )
      )}

      {admin && (
        <section className="mt-8" aria-labelledby="admin-overview-heading">
          <h2 id="admin-overview-heading" className="text-sm font-bold uppercase tracking-widest text-govt-gray-500 mb-3">
            Administration
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <Link to="/portal/settings/users" className="kpi-card text-left hover:shadow-gov transition-shadow">
              <p className="kpi-label flex items-center gap-1.5"><UsersIcon className="w-3.5 h-3.5" /> User Accounts</p>
              <p className="kpi-value">{users.length}</p>
              <p className="text-xs text-govt-gray-500 mt-1">{users.filter((u) => u.active).length} active</p>
            </Link>
            <Link to="/portal/settings/modules" className="kpi-card text-left hover:shadow-gov transition-shadow">
              <p className="kpi-label flex items-center gap-1.5"><FolderIcon className="w-3.5 h-3.5" /> Modules</p>
              <p className="kpi-value">{modules.length}</p>
              <p className="text-xs text-govt-gray-500 mt-1">configured module types</p>
            </Link>
            <Link to="/portal/settings/recycle-bin" className="kpi-card text-left hover:shadow-gov transition-shadow">
              <p className="kpi-label flex items-center gap-1.5"><TrashIcon className="w-3.5 h-3.5" /> Recycle Bin</p>
              <p className="kpi-value">{recycleBinItems().length}</p>
              <p className="text-xs text-govt-gray-500 mt-1">deleted records awaiting review</p>
            </Link>
          </div>
        </section>
      )}

      {admin && (
        <section className="mt-8" aria-labelledby="recent-activity-heading">
          <div className="flex items-center justify-between mb-3">
            <h2 id="recent-activity-heading" className="text-sm font-bold uppercase tracking-widest text-govt-gray-500">
              Recent Activity
            </h2>
            <Link to="/portal/settings/audit-log" className="text-sm font-semibold text-govt-blue hover:underline">
              View Full Audit Log &rarr;
            </Link>
          </div>
          <div className="rounded-xl border border-govt-gray-200 bg-white shadow-sm divide-y divide-govt-gray-100">
            {auditLog.slice(0, 5).map((entry) => (
              <div key={entry.id} className="flex items-center gap-3 px-4 py-3 text-sm">
                <ClockIcon className="w-4 h-4 text-govt-gray-400 shrink-0" />
                <span className="text-govt-gray-700 truncate">{entry.summary}</span>
                <span className="ml-auto text-xs text-govt-gray-400 shrink-0 whitespace-nowrap">
                  {actionLabel(entry.action)}
                </span>
              </div>
            ))}
            {auditLog.length === 0 && (
              <p className="px-4 py-6 text-center text-sm text-govt-gray-500">No activity recorded yet.</p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
