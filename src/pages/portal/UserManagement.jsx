import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { userTypeLabel } from '../../services/rbac/userLabel';
import Modal from '../../components/portal/Modal';
import { PlusIcon, EditIcon, ShieldIcon, UserIcon } from '../../components/common/icons';

function emptyForm() {
  return { name: '', email: '', password: '', permissions: [] };
}

function UserFormModal({ user, modules, onSave, onClose }) {
  const isEdit = !!user;
  const [form, setForm] = useState(() =>
    user
      ? {
          name: user.name,
          email: user.email,
          password: '',
          permissions: [...user.permissions],
        }
      : emptyForm()
  );
  const [error, setError] = useState('');

  function togglePermission(moduleId) {
    setForm((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(moduleId)
        ? prev.permissions.filter((id) => id !== moduleId)
        : [...prev.permissions, moduleId],
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setError('Name and email are required.');
      return;
    }
    if (!isEdit && !form.password.trim()) {
      setError('Password is required for a new user.');
      return;
    }
    setError('');
    onSave(form);
  }

  return (
    <Modal title={isEdit ? 'Edit User' : 'New User'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {error && (
          <p className="bg-govt-red/10 border border-govt-red text-govt-red px-4 py-3 rounded-sm text-sm" role="alert">
            {error}
          </p>
        )}
        <div>
          <label htmlFor="user-name" className="form-label">Full Name <span aria-hidden="true">*</span></label>
          <input
            id="user-name"
            type="text"
            className="form-input"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          />
        </div>
        <div>
          <label htmlFor="user-email" className="form-label">Email <span aria-hidden="true">*</span></label>
          <input
            id="user-email"
            type="email"
            className="form-input"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
          />
        </div>
        <div>
          <label htmlFor="user-password" className="form-label">
            {isEdit ? 'Reset Password (leave blank to keep current)' : 'Password'}
            {!isEdit && <span aria-hidden="true"> *</span>}
          </label>
          <input
            id="user-password"
            type="text"
            className="form-input"
            value={form.password}
            onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
            placeholder={isEdit ? 'Unchanged' : ''}
          />
        </div>
        <fieldset>
          <legend className="form-label">Module Permissions</legend>
          <div className="space-y-2 mt-1">
            {modules.map((mod) => (
              <label key={mod.id} className="flex items-center gap-2 text-sm text-govt-gray-700">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded-sm border-govt-gray-300 text-govt-blue focus:ring-govt-blue"
                  checked={form.permissions.includes(mod.id)}
                  onChange={() => togglePermission(mod.id)}
                />
                {mod.label}
              </label>
            ))}
          </div>
        </fieldset>
        <div className="flex items-center justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="btn-outline">Cancel</button>
          <button type="submit" className="btn-primary">{isEdit ? 'Save Changes' : 'Create User'}</button>
        </div>
      </form>
    </Modal>
  );
}

export default function UserManagement() {
  const { currentUser, users, modules, createUser, updateUser, setUserActive } = useAuth();
  const [formState, setFormState] = useState(null);
  const [banner, setBanner] = useState(null);

  function handleSave(values) {
    if (formState.user) {
      const patch = {
        name: values.name.trim(),
        email: values.email.trim(),
        permissions: values.permissions,
      };
      if (values.password.trim()) patch.password = values.password.trim();
      updateUser(currentUser, formState.user.id, patch);
      setBanner({ type: 'success', text: 'User updated.' });
    } else {
      const res = createUser(currentUser, {
        name: values.name.trim(),
        email: values.email.trim(),
        password: values.password.trim(),
        permissions: values.permissions,
      });
      setBanner(res.ok ? { type: 'success', text: 'User created.' } : { type: 'error', text: res.error });
    }
    setFormState(null);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
        <div>
          <h2 className="text-lg font-heading font-bold text-govt-blue-dark">Users</h2>
          <p className="text-sm text-govt-gray-600 mt-1">Create users and assign the modules they can access.</p>
        </div>
        <button type="button" onClick={() => setFormState({ user: null })} className="btn-primary shrink-0">
          <PlusIcon className="w-4 h-4" />
          New User
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

      <div className="mt-5 overflow-x-auto rounded-xl border border-govt-gray-200 bg-white shadow-sm">
        <table className="gov-table">
          <caption className="sr-only">User accounts</caption>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Type</th>
              <th scope="col">Permissions</th>
              <th scope="col">Status</th>
              <th scope="col" className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td className="font-semibold text-govt-gray-900">{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <span className={`inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide px-2 py-1 rounded-full whitespace-nowrap ${u.role === 'admin' ? 'bg-govt-saffron/15 text-govt-saffron-dark' : 'bg-govt-blue-light text-govt-blue'}`}>
                    {u.role === 'admin' ? <ShieldIcon className="w-3 h-3" /> : <UserIcon className="w-3 h-3" />}
                    {userTypeLabel(u)}
                  </span>
                </td>
                <td>
                  {u.role === 'admin' ? (
                    <span className="text-xs text-govt-gray-500">All modules</span>
                  ) : u.permissions.length === 0 ? (
                    <span className="text-xs text-govt-gray-400">None assigned</span>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {u.permissions.map((id) => {
                        const mod = modules.find((m) => m.id === id);
                        return (
                          <span key={id} className="text-[11px] font-semibold text-govt-blue-dark bg-govt-blue-light px-2 py-0.5 rounded-sm">
                            {mod ? mod.label : id}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </td>
                <td>
                  <span className={`text-xs font-bold uppercase tracking-wide ${u.active ? 'text-govt-green-dark' : 'text-govt-red'}`}>
                    {u.active ? 'Active' : 'Deactivated'}
                  </span>
                </td>
                <td className="text-right whitespace-nowrap">
                  <button
                    type="button"
                    onClick={() => setFormState({ user: u })}
                    disabled={u.role === 'admin'}
                    aria-label={`Edit ${u.name}`}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-sm text-govt-blue hover:bg-govt-blue-light disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors"
                  >
                    <EditIcon className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserActive(currentUser, u.id, !u.active)}
                    disabled={u.role === 'admin'}
                    className="text-xs font-semibold text-govt-blue hover:underline disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:no-underline ml-1"
                  >
                    {u.active ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {formState && (
        <UserFormModal user={formState.user} modules={modules} onSave={handleSave} onClose={() => setFormState(null)} />
      )}
    </div>
  );
}
