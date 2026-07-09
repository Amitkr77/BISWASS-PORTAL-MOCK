import { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { hasModuleAccess, canCreate, canUpdate, canDelete } from '../../services/rbac/permissions';
import RecordFormModal from '../../components/portal/RecordFormModal';
import ConfirmDialog from '../../components/portal/ConfirmDialog';
import { PlusIcon, EditIcon, TrashIcon } from '../../components/common/icons';

export default function ModulePage() {
  const { moduleId } = useParams();
  const { currentUser, getModuleDef, getRecords, createRecord, updateRecord, softDeleteRecord, getUserName } = useAuth();
  const [formState, setFormState] = useState(null); // null | { record: null|obj }
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [banner, setBanner] = useState(null);

  const mod = getModuleDef(moduleId);

  if (!mod || !hasModuleAccess(currentUser, moduleId)) {
    return <Navigate to="/portal" replace />;
  }

  const records = getRecords(moduleId);
  const allowCreate = canCreate(currentUser, moduleId);

  function handleSave(values) {
    if (formState.record) {
      const res = updateRecord(moduleId, formState.record.id, values, currentUser);
      setBanner(res.ok ? { type: 'success', text: `${mod.singular} updated.` } : { type: 'error', text: res.error });
    } else {
      const res = createRecord(moduleId, values, currentUser);
      setBanner(res.ok ? { type: 'success', text: `${mod.singular} created.` } : { type: 'error', text: res.error });
    }
    setFormState(null);
  }

  function handleDelete() {
    const res = softDeleteRecord(moduleId, deleteTarget.id, currentUser);
    setBanner(res.ok ? { type: 'success', text: `${mod.singular} moved to Recycle Bin.` } : { type: 'error', text: res.error });
    setDeleteTarget(null);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-heading font-bold text-govt-blue-dark">{mod.label}</h1>
          <p className="text-sm text-govt-gray-600 mt-1">{mod.description}</p>
        </div>
        {allowCreate && (
          <button type="button" onClick={() => setFormState({ record: null })} className="btn-primary shrink-0">
            <PlusIcon className="w-4 h-4" />
            New {mod.singular}
          </button>
        )}
      </div>

      {banner && (
        <p
          className={`mt-4 px-4 py-3 rounded-sm text-sm ${
            banner.type === 'success'
              ? 'bg-govt-green/10 border border-govt-green text-govt-green-dark'
              : 'bg-govt-red/10 border border-govt-red text-govt-red'
          }`}
          role="status"
        >
          {banner.text}
        </p>
      )}

      <div className="mt-5 overflow-x-auto rounded-xl border border-govt-gray-200 bg-white shadow-sm">
        <table className="gov-table">
          <caption className="sr-only">{mod.label} records</caption>
          <thead>
            <tr>
              {mod.columns.map((col) => (
                <th key={col} scope="col" className="capitalize">{col}</th>
              ))}
              <th scope="col">Created By</th>
              <th scope="col" className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => {
              const editAllowed = canUpdate(currentUser, moduleId, record);
              const deleteAllowed = canDelete(currentUser, moduleId, record);
              return (
                <tr key={record.id}>
                  {mod.columns.map((col) => {
                    const fieldDef = mod.fields.find((f) => f.key === col);
                    return (
                      <td key={col} className={col === mod.columns[0] ? 'font-semibold text-govt-gray-900' : ''}>
                        {fieldDef?.type === 'file' ? (
                          record[col] ? (
                            <a
                              href={record[col].url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-govt-blue hover:underline"
                            >
                              {record[col].name}
                            </a>
                          ) : (
                            <span className="text-govt-gray-400">&mdash;</span>
                          )
                        ) : (
                          record[col]
                        )}
                      </td>
                    );
                  })}
                  <td>{getUserName(record.createdBy)}</td>
                  <td className="text-right whitespace-nowrap">
                    <span className="inline-flex items-center gap-1">
                      <button
                        type="button"
                        disabled={!editAllowed}
                        onClick={() => setFormState({ record })}
                        aria-label={`Edit ${record.title}`}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-sm text-govt-blue hover:bg-govt-blue-light disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors"
                      >
                        <EditIcon className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        disabled={!deleteAllowed}
                        onClick={() => setDeleteTarget(record)}
                        aria-label={`Delete ${record.title}`}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-sm text-govt-red hover:bg-govt-red/10 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </span>
                  </td>
                </tr>
              );
            })}
            {records.length === 0 && (
              <tr>
                <td colSpan={mod.columns.length + 2} className="text-center text-govt-gray-500 py-6">
                  No {mod.label.toLowerCase()} records yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {formState && (
        <RecordFormModal
          mod={mod}
          record={formState.record}
          onSave={handleSave}
          onClose={() => setFormState(null)}
        />
      )}

      {deleteTarget && (
        <ConfirmDialog
          title={`Delete ${mod.singular}`}
          message={`Move "${deleteTarget.title}" to the Recycle Bin? An administrator can restore or permanently delete it later.`}
          confirmLabel="Delete"
          danger
          onConfirm={handleDelete}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
