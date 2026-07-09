import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FIELD_TYPES } from '../../services/rbac/modules';
import { canManageUsers } from '../../services/rbac/permissions';
import Modal from '../../components/portal/Modal';
import { PlusIcon, EditIcon, TrashIcon } from '../../components/common/icons';

function emptyExtraField() {
  return { label: '', type: 'text', required: false, options: '', existingKey: null };
}

/** Turns an existing module's fields (minus the forced Title field) back
 *  into the field-builder's editable shape, preserving each field's key so
 *  saving an edit doesn't orphan data already stored under it. */
function extraFieldsFromModule(mod) {
  const rest = mod.fields.slice(1);
  if (rest.length === 0) return [emptyExtraField()];
  return rest.map((f) => ({
    label: f.label,
    type: f.type,
    required: !!f.required,
    options: f.type === 'select' ? (f.options || []).join(', ') : '',
    existingKey: f.key,
  }));
}

function ModuleFormModal({ mod, onSave, onClose }) {
  const isEdit = !!mod;
  const [label, setLabel] = useState(mod?.label || '');
  const [singular, setSingular] = useState(mod?.singular || '');
  const [description, setDescription] = useState(mod?.description || '');
  const [extraFields, setExtraFields] = useState(() => (isEdit ? extraFieldsFromModule(mod) : [emptyExtraField()]));
  const [error, setError] = useState('');

  function updateField(index, patch) {
    setExtraFields((prev) => prev.map((f, i) => (i === index ? { ...f, ...patch } : f)));
  }

  function addField() {
    setExtraFields((prev) => [...prev, emptyExtraField()]);
  }

  function removeField(index) {
    setExtraFields((prev) => prev.filter((_, i) => i !== index));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!label.trim() || !singular.trim()) {
      setError('Module name and singular label are required.');
      return;
    }
    const namedFields = extraFields.filter((f) => f.label.trim());
    for (const f of namedFields) {
      if (f.type === 'select' && !f.options.trim()) {
        setError(`Provide comma-separated options for the "${f.label}" dropdown.`);
        return;
      }
    }

    const fields = [
      { label: 'Title', type: 'text', required: true, existingKey: 'title' },
      ...namedFields.map((f) => ({
        label: f.label.trim(),
        type: f.type,
        required: f.required,
        existingKey: f.existingKey,
        ...(f.type === 'select' ? { options: f.options.split(',').map((o) => o.trim()).filter(Boolean) } : {}),
      })),
    ];

    setError('');
    onSave({ label: label.trim(), singular: singular.trim(), description: description.trim(), fields });
  }

  return (
    <Modal title={isEdit ? `Edit Module: ${mod.label}` : 'New Module'} onClose={onClose} wide>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {error && (
          <p className="bg-govt-red/10 border border-govt-red text-govt-red px-4 py-3 rounded-sm text-sm" role="alert">
            {error}
          </p>
        )}

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="mod-label" className="form-label">Module Name <span aria-hidden="true">*</span></label>
            <input id="mod-label" type="text" className="form-input" value={label} onChange={(e) => setLabel(e.target.value)} placeholder="e.g. Grievance Management" />
          </div>
          <div>
            <label htmlFor="mod-singular" className="form-label">Singular Label <span aria-hidden="true">*</span></label>
            <input id="mod-singular" type="text" className="form-input" value={singular} onChange={(e) => setSingular(e.target.value)} placeholder="e.g. Grievance" />
          </div>
        </div>

        <div>
          <label htmlFor="mod-description" className="form-label">Description</label>
          <textarea id="mod-description" rows={2} className="form-input" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <fieldset>
          <legend className="form-label mb-2">Fields</legend>

          <div className="rounded-sm border border-govt-gray-200 bg-govt-gray-50 px-3 py-2.5 text-sm text-govt-gray-600 mb-3">
            Every module always starts with a required <strong>Title</strong> field. Add any extra fields below.
          </div>

          <div className="space-y-3">
            {extraFields.map((f, i) => (
              <div key={i} className="flex flex-wrap items-start gap-2 rounded-sm border border-govt-gray-200 p-3">
                <div className="flex-1 min-w-[10rem]">
                  <label className="form-label text-xs" htmlFor={`field-label-${i}`}>Field Label</label>
                  <input
                    id={`field-label-${i}`}
                    type="text"
                    className="form-input"
                    value={f.label}
                    onChange={(e) => updateField(i, { label: e.target.value })}
                    placeholder="e.g. Venue"
                  />
                </div>
                <div className="w-36">
                  <label className="form-label text-xs" htmlFor={`field-type-${i}`}>Type</label>
                  <select
                    id={`field-type-${i}`}
                    className="form-input"
                    value={f.type}
                    onChange={(e) => updateField(i, { type: e.target.value })}
                  >
                    {FIELD_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>
                {f.type === 'select' && (
                  <div className="flex-1 min-w-[10rem]">
                    <label className="form-label text-xs" htmlFor={`field-options-${i}`}>Options (comma separated)</label>
                    <input
                      id={`field-options-${i}`}
                      type="text"
                      className="form-input"
                      value={f.options}
                      onChange={(e) => updateField(i, { options: e.target.value })}
                      placeholder="e.g. Open, In Progress, Resolved"
                    />
                  </div>
                )}
                <div className="flex items-center gap-2 pt-6">
                  <label className="flex items-center gap-1.5 text-xs text-govt-gray-700 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded-sm border-govt-gray-300 text-govt-blue focus:ring-govt-blue"
                      checked={f.required}
                      onChange={(e) => updateField(i, { required: e.target.checked })}
                    />
                    Required
                  </label>
                  <button
                    type="button"
                    onClick={() => removeField(i)}
                    disabled={extraFields.length === 1}
                    aria-label="Remove field"
                    className="text-govt-red hover:bg-govt-red/10 disabled:opacity-30 disabled:cursor-not-allowed rounded-sm p-1.5"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button type="button" onClick={addField} className="btn-outline mt-3 text-sm">
            <PlusIcon className="w-3.5 h-3.5" />
            Add Field
          </button>
        </fieldset>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="btn-outline">Cancel</button>
          <button type="submit" className="btn-primary">{isEdit ? 'Save Changes' : 'Create Module'}</button>
        </div>
      </form>
    </Modal>
  );
}

export default function ModuleManagement() {
  const { currentUser, modules, createModule, updateModule } = useAuth();
  const [formState, setFormState] = useState(null); // null | { mod: null|obj }
  const [banner, setBanner] = useState(null);

  if (!canManageUsers(currentUser)) {
    return <Navigate to="/portal" replace />;
  }

  function handleSave(values) {
    if (formState.mod) {
      const res = updateModule(currentUser, formState.mod.id, values);
      setBanner(res.ok ? { type: 'success', text: `"${res.module.label}" module updated.` } : { type: 'error', text: res.error });
    } else {
      const res = createModule(currentUser, values);
      setBanner(res.ok ? { type: 'success', text: `"${res.module.label}" module created. Assign it to users from User Management.` } : { type: 'error', text: res.error });
    }
    setFormState(null);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-heading font-bold text-govt-blue-dark">Module Management</h1>
          <p className="text-sm text-govt-gray-600 mt-1">Create or edit modules, then assign them to users from User Management.</p>
        </div>
        <button type="button" onClick={() => setFormState({ mod: null })} className="btn-primary shrink-0">
          <PlusIcon className="w-4 h-4" />
          New Module
        </button>
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

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
        {modules.map((mod) => (
          <div key={mod.id} className="info-card flex flex-col">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-heading font-bold text-govt-blue-dark">{mod.label}</h3>
              <button
                type="button"
                onClick={() => setFormState({ mod })}
                aria-label={`Edit ${mod.label}`}
                className="inline-flex items-center justify-center w-8 h-8 rounded-sm text-govt-blue hover:bg-govt-blue-light transition-colors shrink-0"
              >
                <EditIcon className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-govt-gray-600 mt-1">{mod.description}</p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {mod.fields.map((f) => (
                <span key={f.key} className="text-[11px] font-semibold text-govt-blue-dark bg-govt-blue-light px-2 py-0.5 rounded-sm">
                  {f.label}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {formState && (
        <ModuleFormModal mod={formState.mod} onSave={handleSave} onClose={() => setFormState(null)} />
      )}
    </div>
  );
}
