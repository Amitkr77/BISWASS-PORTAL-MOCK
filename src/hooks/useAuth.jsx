import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { SEED_USERS, SEED_RECORDS } from '../services/rbac/seedData';
import { SEED_MODULES, makeModuleId, makeFieldKey } from '../services/rbac/modules';
import { canCreate, canUpdate, canDelete, isAdmin } from '../services/rbac/permissions';

const AuthContext = createContext(null);

function makeId(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

/** Assigns each field a stable key: reuses `existingKey` (set by the edit
 *  form for fields that already existed) so existing records don't get
 *  orphaned data, and mints a fresh unique key for brand-new fields. */
function prepareFields(fields) {
  const seenKeys = [];
  return fields.map((f) => {
    const key = f.existingKey || makeFieldKey(f.label, seenKeys.map((k) => ({ key: k })));
    seenKeys.push(key);
    return {
      key,
      label: f.label.trim(),
      type: f.type,
      required: !!f.required,
      ...(f.type === 'select' ? { options: f.options } : {}),
    };
  });
}

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(SEED_USERS);
  const [records, setRecords] = useState(SEED_RECORDS);
  const [modules, setModules] = useState(SEED_MODULES);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [auditLog, setAuditLog] = useState([]);

  const currentUser = useMemo(
    () => users.find((u) => u.id === currentUserId) || null,
    [users, currentUserId]
  );

  const logActivity = useCallback((actor, action, summary) => {
    setAuditLog((prev) => [
      {
        id: makeId('log'),
        timestamp: new Date().toISOString(),
        actorId: actor.id,
        actorName: actor.name,
        actorRole: actor.role,
        action,
        summary,
      },
      ...prev,
    ]);
  }, []);

  const login = useCallback(
    (email, password) => {
      const normalized = email.trim().toLowerCase();
      const match = users.find((u) => u.email.toLowerCase() === normalized);
      if (!match || match.password !== password) {
        return { ok: false, error: 'Invalid email or password.' };
      }
      if (!match.active) {
        return { ok: false, error: 'This account has been deactivated. Please contact the administrator.' };
      }
      setCurrentUserId(match.id);
      logActivity(match, 'login', `${match.name} logged in.`);
      return { ok: true, user: match };
    },
    [users, logActivity]
  );

  const logout = useCallback(() => {
    if (currentUser) logActivity(currentUser, 'logout', `${currentUser.name} logged out.`);
    setCurrentUserId(null);
  }, [currentUser, logActivity]);

  // --- User management (admin only in the UI; not re-enforced here since
  // this is a frontend-only demo with no real security boundary) ---
  const createUser = useCallback((actor, { name, email, password, permissions, scope, district }) => {
    const normalized = email.trim().toLowerCase();
    let error = null;
    let created = null;
    setUsers((prev) => {
      if (prev.some((u) => u.email.toLowerCase() === normalized)) {
        error = 'A user with this email already exists.';
        return prev;
      }
      created = {
        id: makeId('u'),
        name: name.trim(),
        email: email.trim(),
        password,
        role: 'user',
        permissions: [...permissions],
        scope,
        district: scope === 'district' ? district : null,
        active: true,
      };
      return [...prev, created];
    });
    if (created) logActivity(actor, 'create_user', `${actor.name} created ${created.scope} user "${created.name}" (${created.email}).`);
    return { ok: !error, error };
  }, [logActivity]);

  const updateUser = useCallback((actor, id, patch) => {
    let updated = null;
    setUsers((prev) => prev.map((u) => {
      if (u.id !== id) return u;
      updated = { ...u, ...patch };
      return updated;
    }));
    if (updated) logActivity(actor, 'update_user', `${actor.name} updated user "${updated.name}".`);
  }, [logActivity]);

  const setUserActive = useCallback((actor, id, active) => {
    let target = null;
    setUsers((prev) => prev.map((u) => {
      if (u.id !== id) return u;
      target = u;
      return { ...u, active };
    }));
    if (target) {
      logActivity(actor, active ? 'activate_user' : 'deactivate_user', `${actor.name} ${active ? 'activated' : 'deactivated'} user "${target.name}".`);
    }
  }, [logActivity]);

  // --- Module management (admin only in the UI) ---
  const createModule = useCallback((actor, { label, singular, description, fields }) => {
    if (!isAdmin(actor)) return { ok: false, error: 'Only the administrator can create modules.' };
    if (!label.trim() || !singular.trim()) return { ok: false, error: 'Module name and singular label are required.' };
    if (!fields || fields.length === 0) return { ok: false, error: 'Add at least one field.' };

    let newModule = null;
    setModules((prev) => {
      const id = makeModuleId(label, prev);
      const preparedFields = prepareFields(fields);
      newModule = {
        id,
        label: label.trim(),
        singular: singular.trim(),
        description: description.trim(),
        fields: preparedFields,
        columns: preparedFields.slice(0, 4).map((f) => f.key),
      };
      return [...prev, newModule];
    });
    setRecords((prev) => (newModule ? { ...prev, [newModule.id]: [] } : prev));
    if (newModule) logActivity(actor, 'create_module', `${actor.name} created module "${newModule.label}".`);
    return { ok: true, module: newModule };
  }, [logActivity]);

  const updateModule = useCallback((actor, moduleId, { label, singular, description, fields }) => {
    if (!isAdmin(actor)) return { ok: false, error: 'Only the administrator can edit modules.' };
    if (!label.trim() || !singular.trim()) return { ok: false, error: 'Module name and singular label are required.' };
    if (!fields || fields.length === 0) return { ok: false, error: 'Add at least one field.' };

    let updated = null;
    setModules((prev) => prev.map((m) => {
      if (m.id !== moduleId) return m;
      const preparedFields = prepareFields(fields);
      updated = {
        ...m,
        label: label.trim(),
        singular: singular.trim(),
        description: description.trim(),
        fields: preparedFields,
        columns: preparedFields.slice(0, 4).map((f) => f.key),
      };
      return updated;
    }));
    if (updated) logActivity(actor, 'update_module', `${actor.name} updated module "${updated.label}".`);
    return updated ? { ok: true, module: updated } : { ok: false, error: 'Module not found.' };
  }, [logActivity]);

  const getModuleDef = useCallback((moduleId) => modules.find((m) => m.id === moduleId) || null, [modules]);

  // --- Record CRUD, scoped per module ---
  const getRecords = useCallback(
    (moduleId) => (records[moduleId] || []).filter((r) => !r.deletedAt),
    [records]
  );

  const getRecord = useCallback(
    (moduleId, id) => (records[moduleId] || []).find((r) => r.id === id) || null,
    [records]
  );

  const createRecord = useCallback(
    (moduleId, data, actor) => {
      if (!canCreate(actor, moduleId)) return { ok: false, error: 'You do not have permission to create records in this module.' };
      const record = {
        id: makeId(moduleId),
        ...data,
        createdBy: actor.id,
        createdAt: new Date().toISOString(),
        deletedAt: null,
      };
      setRecords((prev) => ({ ...prev, [moduleId]: [record, ...(prev[moduleId] || [])] }));
      const modLabel = modules.find((m) => m.id === moduleId)?.label || moduleId;
      logActivity(actor, 'create_record', `${actor.name} created a ${modLabel} record: "${record.title}".`);
      return { ok: true, record };
    },
    [modules, logActivity]
  );

  const updateRecord = useCallback(
    (moduleId, id, data, actor) => {
      const existing = (records[moduleId] || []).find((r) => r.id === id);
      if (!existing) return { ok: false, error: 'Record not found.' };
      if (!canUpdate(actor, moduleId, existing)) return { ok: false, error: 'You can only edit records you created.' };
      setRecords((prev) => ({
        ...prev,
        [moduleId]: prev[moduleId].map((r) => (r.id === id ? { ...r, ...data } : r)),
      }));
      const modLabel = modules.find((m) => m.id === moduleId)?.label || moduleId;
      logActivity(actor, 'update_record', `${actor.name} updated a ${modLabel} record: "${data.title || existing.title}".`);
      return { ok: true };
    },
    [records, modules, logActivity]
  );

  const softDeleteRecord = useCallback(
    (moduleId, id, actor) => {
      const existing = (records[moduleId] || []).find((r) => r.id === id);
      if (!existing) return { ok: false, error: 'Record not found.' };
      if (!canDelete(actor, moduleId, existing)) return { ok: false, error: 'You can only delete records you created.' };
      setRecords((prev) => ({
        ...prev,
        [moduleId]: prev[moduleId].map((r) =>
          r.id === id ? { ...r, deletedAt: new Date().toISOString(), deletedBy: actor.id } : r
        ),
      }));
      const modLabel = modules.find((m) => m.id === moduleId)?.label || moduleId;
      logActivity(actor, 'delete_record', `${actor.name} deleted a ${modLabel} record: "${existing.title}" (moved to Recycle Bin).`);
      return { ok: true };
    },
    [records, modules, logActivity]
  );

  const restoreRecord = useCallback((moduleId, id, actor) => {
    if (!isAdmin(actor)) return { ok: false, error: 'Only the administrator can restore records.' };
    const existing = (records[moduleId] || []).find((r) => r.id === id);
    setRecords((prev) => ({
      ...prev,
      [moduleId]: prev[moduleId].map((r) => (r.id === id ? { ...r, deletedAt: null, deletedBy: null } : r)),
    }));
    if (existing) {
      const modLabel = modules.find((m) => m.id === moduleId)?.label || moduleId;
      logActivity(actor, 'restore_record', `${actor.name} restored a ${modLabel} record: "${existing.title}".`);
    }
    return { ok: true };
  }, [records, modules, logActivity]);

  const permanentlyDeleteRecord = useCallback((moduleId, id, actor) => {
    if (!isAdmin(actor)) return { ok: false, error: 'Only the administrator can permanently delete records.' };
    const existing = (records[moduleId] || []).find((r) => r.id === id);
    if (existing) {
      const modLabel = modules.find((m) => m.id === moduleId)?.label || moduleId;
      logActivity(actor, 'permanent_delete_record', `${actor.name} permanently deleted a ${modLabel} record: "${existing.title}".`);
    }
    setRecords((prev) => ({
      ...prev,
      [moduleId]: prev[moduleId].filter((r) => r.id !== id),
    }));
    return { ok: true };
  }, [records, modules, logActivity]);

  const recycleBinItems = useCallback(() => {
    return modules.flatMap((mod) =>
      (records[mod.id] || [])
        .filter((r) => r.deletedAt)
        .map((r) => ({ ...r, moduleId: mod.id, moduleLabel: mod.label }))
    ).sort((a, b) => new Date(b.deletedAt) - new Date(a.deletedAt));
  }, [records, modules]);

  const getUserName = useCallback((id) => users.find((u) => u.id === id)?.name || 'Unknown', [users]);

  const value = useMemo(
    () => ({
      currentUser,
      users,
      modules,
      login,
      logout,
      createUser,
      updateUser,
      setUserActive,
      createModule,
      updateModule,
      getModuleDef,
      getRecords,
      getRecord,
      createRecord,
      updateRecord,
      softDeleteRecord,
      restoreRecord,
      permanentlyDeleteRecord,
      recycleBinItems,
      getUserName,
      auditLog,
    }),
    [
      currentUser,
      users,
      modules,
      login,
      logout,
      createUser,
      updateUser,
      setUserActive,
      createModule,
      updateModule,
      getModuleDef,
      getRecords,
      getRecord,
      createRecord,
      updateRecord,
      softDeleteRecord,
      restoreRecord,
      permanentlyDeleteRecord,
      recycleBinItems,
      getUserName,
      auditLog,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
