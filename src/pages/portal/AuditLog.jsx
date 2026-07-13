import { useMemo, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { AUDIT_ACTIONS, actionLabel } from '../../services/rbac/auditActions';
import { ShieldIcon, UserIcon } from '../../components/common/icons';

const TONE_CLASSES = {
  blue: 'bg-govt-blue-light text-govt-blue',
  green: 'bg-govt-green/10 text-govt-green-dark',
  red: 'bg-govt-red/10 text-govt-red',
  saffron: 'bg-govt-saffron/15 text-govt-saffron-dark',
  gray: 'bg-govt-gray-100 text-govt-gray-600',
};

const EMPTY_FILTERS = { search: '', actor: '', role: '', action: '', from: '', to: '' };

export default function AuditLog() {
  const { auditLog } = useAuth();
  const [filters, setFilters] = useState(EMPTY_FILTERS);

  function setFilter(key, value) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  const actors = useMemo(
    () => [...new Set(auditLog.map((e) => e.actorName))].sort(),
    [auditLog]
  );

  const entries = useMemo(() => {
    const q = filters.search.trim().toLowerCase();
    return auditLog
      .filter((e) => !filters.action || e.action === filters.action)
      .filter((e) => !filters.actor || e.actorName === filters.actor)
      .filter((e) => !filters.role || e.actorRole === filters.role)
      .filter((e) => !filters.from || e.timestamp.slice(0, 10) >= filters.from)
      .filter((e) => !filters.to || e.timestamp.slice(0, 10) <= filters.to)
      .filter((e) => !q || e.actorName.toLowerCase().includes(q) || e.summary.toLowerCase().includes(q));
  }, [auditLog, filters]);

  const hasActiveFilters = Object.values(filters).some(Boolean);

  return (
    <div>
      <div className="mb-2">
        <h2 className="text-lg font-heading font-bold text-govt-blue-dark">Audit Log</h2>
        <p className="text-sm text-govt-gray-600 mt-1">Who did what, when &ndash; every login, create, update, delete and restore across the portal.</p>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 items-end">
        <div className="lg:col-span-2">
          <label htmlFor="audit-search" className="form-label">Search</label>
          <input
            id="audit-search"
            type="search"
            className="form-input"
            placeholder="Search user or details&hellip;"
            value={filters.search}
            onChange={(e) => setFilter('search', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="audit-actor-filter" className="form-label">User</label>
          <select
            id="audit-actor-filter"
            className="form-input"
            value={filters.actor}
            onChange={(e) => setFilter('actor', e.target.value)}
          >
            <option value="">All Users</option>
            {actors.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="audit-role-filter" className="form-label">Role</label>
          <select
            id="audit-role-filter"
            className="form-input"
            value={filters.role}
            onChange={(e) => setFilter('role', e.target.value)}
          >
            <option value="">All Roles</option>
            <option value="admin">Administrator</option>
            <option value="user">User</option>
          </select>
        </div>
        <div>
          <label htmlFor="audit-filter" className="form-label">Action</label>
          <select
            id="audit-filter"
            className="form-input"
            value={filters.action}
            onChange={(e) => setFilter('action', e.target.value)}
          >
            <option value="">All Activity</option>
            {Object.keys(AUDIT_ACTIONS).map((key) => (
              <option key={key} value={key}>{actionLabel(key)}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="audit-from-filter" className="form-label">From Date</label>
          <input
            id="audit-from-filter"
            type="date"
            className="form-input"
            value={filters.from}
            onChange={(e) => setFilter('from', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="audit-to-filter" className="form-label">To Date</label>
          <input
            id="audit-to-filter"
            type="date"
            className="form-input"
            value={filters.to}
            onChange={(e) => setFilter('to', e.target.value)}
          />
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="text-xs text-govt-gray-500">{entries.length} of {auditLog.length} entries shown</p>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={() => setFilters(EMPTY_FILTERS)}
            className="text-sm font-semibold text-govt-blue hover:underline shrink-0"
          >
            Clear filters
          </button>
        )}
      </div>

      <div className="mt-3 overflow-x-auto rounded-xl border border-govt-gray-200 bg-white shadow-sm">
        <table className="gov-table">
          <caption className="sr-only">Audit log</caption>
          <thead>
            <tr>
              <th scope="col" className="w-44">Time</th>
              <th scope="col">User</th>
              <th scope="col" className="w-44">Action</th>
              <th scope="col">Details</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => {
              const tone = AUDIT_ACTIONS[entry.action]?.tone || 'gray';
              return (
                <tr key={entry.id}>
                  <td className="whitespace-nowrap tabular-nums text-govt-gray-600">
                    {new Date(entry.timestamp).toLocaleString()}
                  </td>
                  <td>
                    <span className="inline-flex items-center gap-1.5 font-semibold text-govt-gray-900">
                      {entry.actorRole === 'admin' ? (
                        <ShieldIcon className="w-3.5 h-3.5 text-govt-saffron-dark shrink-0" />
                      ) : (
                        <UserIcon className="w-3.5 h-3.5 text-govt-blue shrink-0" />
                      )}
                      {entry.actorName}
                    </span>
                  </td>
                  <td>
                    <span className={`inline-flex text-[11px] font-bold uppercase tracking-wide px-2 py-1 rounded-full whitespace-nowrap ${TONE_CLASSES[tone]}`}>
                      {actionLabel(entry.action)}
                    </span>
                  </td>
                  <td className="text-govt-gray-700">{entry.summary}</td>
                </tr>
              );
            })}
            {entries.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center text-govt-gray-500 py-6">
                  {auditLog.length === 0 ? 'No activity recorded yet.' : 'No activity matches these filters.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
