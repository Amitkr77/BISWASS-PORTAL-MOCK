/** Human-readable label for a user's role/scope, shared by the portal
 *  header, dashboard and User Management table. */
export function userTypeLabel(user) {
  if (!user) return '';
  if (user.role === 'admin') return 'Administrator';
  if (user.scope === 'district') return `District User${user.district ? ` (${user.district})` : ''}`;
  return 'State User';
}
