/** Pure RBAC permission checks, shared by the sidebar, route guards and the
 *  module CRUD screens so the rules live in exactly one place. */

export function isAdmin(user) {
  return !!user && user.role === 'admin';
}

export function hasModuleAccess(user, moduleId) {
  if (!user) return false;
  if (isAdmin(user)) return true;
  return user.permissions.includes(moduleId);
}

export function canCreate(user, moduleId) {
  return hasModuleAccess(user, moduleId);
}

export function canRead(user, moduleId) {
  return hasModuleAccess(user, moduleId);
}

export function canUpdate(user, moduleId, record) {
  if (!hasModuleAccess(user, moduleId)) return false;
  if (isAdmin(user)) return true;
  return record.createdBy === user.id;
}

export function canDelete(user, moduleId, record) {
  return canUpdate(user, moduleId, record);
}

export function canManageUsers(user) {
  return isAdmin(user);
}

export function canAccessRecycleBin(user) {
  return isAdmin(user);
}

export function visibleModuleIds(user, modules) {
  if (!user) return [];
  if (isAdmin(user)) return modules.map((m) => m.id);
  return modules.filter((m) => user.permissions.includes(m.id)).map((m) => m.id);
}
