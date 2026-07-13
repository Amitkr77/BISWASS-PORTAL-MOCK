/** Human-readable label for a user's role, shared by the portal
 *  header, dashboard and User Management table. */
export function userTypeLabel(user) {
  if (!user) return '';
  if (user.role === 'admin') return 'Administrator';
  return 'User';
}
