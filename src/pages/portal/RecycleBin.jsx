import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { canAccessRecycleBin } from '../../services/rbac/permissions';
import ConfirmDialog from '../../components/portal/ConfirmDialog';
import { RestoreIcon, TrashIcon } from '../../components/common/icons';

export default function RecycleBin() {
  const { currentUser, recycleBinItems, restoreRecord, permanentlyDeleteRecord, getUserName } = useAuth();
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [banner, setBanner] = useState(null);

  if (!canAccessRecycleBin(currentUser)) {
    return <Navigate to="/portal" replace />;
  }

  const items = recycleBinItems();

  function handleRestore(item) {
    restoreRecord(item.moduleId, item.id, currentUser);
    setBanner({ type: 'success', text: `"${item.title}" restored to ${item.moduleLabel}.` });
  }

  function handlePermanentDelete() {
    permanentlyDeleteRecord(deleteTarget.moduleId, deleteTarget.id, currentUser);
    setBanner({ type: 'success', text: `"${deleteTarget.title}" permanently deleted.` });
    setDeleteTarget(null);
  }

  return (
    <div>
      <div>
        <h1 className="text-xl sm:text-2xl font-heading font-bold text-govt-blue-dark">Recycle Bin</h1>
        <p className="text-sm text-govt-gray-600 mt-1">
          Records deleted by users across all modules. Restore them or permanently delete &ndash; this cannot be undone.
        </p>
      </div>

      {banner && (
        <p className="mt-4 px-4 py-3 rounded-sm text-sm bg-govt-green/10 border border-govt-green text-govt-green-dark" role="status">
          {banner.text}
        </p>
      )}

      <div className="mt-5 overflow-x-auto rounded-xl border border-govt-gray-200 bg-white shadow-sm">
        <table className="gov-table">
          <caption className="sr-only">Recycle bin</caption>
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Module</th>
              <th scope="col">Deleted By</th>
              <th scope="col">Deleted At</th>
              <th scope="col" className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={`${item.moduleId}-${item.id}`}>
                <td className="font-semibold text-govt-gray-900">{item.title}</td>
                <td>{item.moduleLabel}</td>
                <td>{getUserName(item.deletedBy)}</td>
                <td className="whitespace-nowrap">{new Date(item.deletedAt).toLocaleString()}</td>
                <td className="text-right whitespace-nowrap">
                  <span className="inline-flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleRestore(item)}
                      aria-label={`Restore ${item.title}`}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-sm text-govt-green-dark hover:bg-govt-green/10 transition-colors"
                    >
                      <RestoreIcon className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(item)}
                      aria-label={`Permanently delete ${item.title}`}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-sm text-govt-red hover:bg-govt-red/10 transition-colors"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </span>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center text-govt-gray-500 py-6">
                  The recycle bin is empty.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {deleteTarget && (
        <ConfirmDialog
          title="Permanently Delete"
          message={`Permanently delete "${deleteTarget.title}"? This action cannot be undone.`}
          confirmLabel="Delete Permanently"
          danger
          onConfirm={handlePermanentDelete}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
