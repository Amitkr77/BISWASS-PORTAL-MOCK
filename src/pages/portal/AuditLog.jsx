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

export default function AuditLog() {
  const { auditLog } = useAuth();
  const [actionFilter, setActionFilter] = useState('');

  const entries = useMemo(
    () => (actionFilter ? auditLog.filter((e) => e.action === actionFilter) : auditLog),
    [auditLog, actionFilter]
  );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
        <div>
          <h2 className="text-lg font-heading font-bold text-govt-blue-dark">Audit Log</h2>
          <p className="text-sm text-govt-gray-600 mt-1">Who did what, when &ndash; every login, create, update, delete and restore across the portal.</p>
        </div>
        <div className="shrink-0">
          <label htmlFor="audit-filter" className="sr-only">Filter by action</label>
          <select
            id="audit-filter"
            className="form-input"
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
          >
            <option value="">All Activity</option>
            {Object.keys(AUDIT_ACTIONS).map((key) => (
              <option key={key} value={key}>{actionLabel(key)}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5 overflow-x-auto rounded-xl border border-govt-gray-200 bg-white shadow-sm">
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
                  No activity recorded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
