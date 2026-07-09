import { useState } from 'react';
import Modal from './Modal';

function buildInitialValues(fields, record) {
  const values = {};
  fields.forEach((f) => {
    values[f.key] = record ? (record[f.key] ?? '') : '';
  });
  return values;
}

function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function RecordFormModal({ mod, record, onSave, onClose }) {
  const [values, setValues] = useState(() => buildInitialValues(mod.fields, record));
  const [errors, setErrors] = useState({});
  const isEdit = !!record;

  function setField(key, value) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleFileChange(key, fileList) {
    const file = fileList?.[0];
    if (!file) return;
    setField(key, { name: file.name, size: file.size, url: URL.createObjectURL(file) });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = {};
    mod.fields.forEach((f) => {
      const isEmpty = f.type === 'file' ? !values[f.key] : !String(values[f.key] || '').trim();
      if (f.required && isEmpty) {
        nextErrors[f.key] = 'This field is required.';
      }
    });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    onSave(values);
  }

  return (
    <Modal title={isEdit ? `Edit ${mod.singular}` : `New ${mod.singular}`} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {mod.fields.map((f) => (
          <div key={f.key}>
            <label htmlFor={`field-${f.key}`} className="form-label">
              {f.label}
              {f.required && <span aria-hidden="true"> *</span>}
            </label>

            {f.type === 'textarea' && (
              <textarea
                id={`field-${f.key}`}
                rows={4}
                className="form-input"
                value={values[f.key]}
                onChange={(e) => setField(f.key, e.target.value)}
                aria-invalid={errors[f.key] ? 'true' : undefined}
              />
            )}

            {f.type === 'select' && (
              <select
                id={`field-${f.key}`}
                className="form-input"
                value={values[f.key]}
                onChange={(e) => setField(f.key, e.target.value)}
                aria-invalid={errors[f.key] ? 'true' : undefined}
              >
                <option value="">-- Select {f.label} --</option>
                {f.options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            )}

            {(f.type === 'text' || f.type === 'date') && (
              <input
                id={`field-${f.key}`}
                type={f.type}
                className="form-input"
                value={values[f.key]}
                onChange={(e) => setField(f.key, e.target.value)}
                aria-invalid={errors[f.key] ? 'true' : undefined}
              />
            )}

            {f.type === 'file' && (
              <>
                <input
                  id={`field-${f.key}`}
                  type="file"
                  className="form-input"
                  onChange={(e) => handleFileChange(f.key, e.target.files)}
                  aria-invalid={errors[f.key] ? 'true' : undefined}
                />
                {values[f.key] && (
                  <div className="mt-2 flex items-center justify-between gap-2 rounded-sm bg-govt-blue-light px-3 py-2 text-xs">
                    <span className="truncate text-govt-blue-dark font-semibold">
                      {values[f.key].name} <span className="text-govt-gray-500 font-normal">({formatFileSize(values[f.key].size)})</span>
                    </span>
                    <button type="button" onClick={() => setField(f.key, '')} className="text-govt-red font-semibold shrink-0">
                      Remove
                    </button>
                  </div>
                )}
              </>
            )}

            {errors[f.key] && <p className="form-error">{errors[f.key]}</p>}
          </div>
        ))}

        <div className="flex items-center justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="btn-outline">
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            {isEdit ? 'Save Changes' : `Create ${mod.singular}`}
          </button>
        </div>
      </form>
    </Modal>
  );
}
