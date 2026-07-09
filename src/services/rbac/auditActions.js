/** Human labels + a colour tone for each audit log action, used by the
 *  Audit Log screen for the action badge and the filter dropdown. */
export const AUDIT_ACTIONS = {
  login: { label: 'Login', tone: 'blue' },
  logout: { label: 'Logout', tone: 'gray' },
  create_record: { label: 'Created Record', tone: 'green' },
  update_record: { label: 'Updated Record', tone: 'blue' },
  delete_record: { label: 'Deleted Record', tone: 'red' },
  restore_record: { label: 'Restored Record', tone: 'green' },
  permanent_delete_record: { label: 'Permanently Deleted', tone: 'red' },
  create_user: { label: 'Created User', tone: 'saffron' },
  update_user: { label: 'Updated User', tone: 'saffron' },
  activate_user: { label: 'Activated User', tone: 'green' },
  deactivate_user: { label: 'Deactivated User', tone: 'red' },
  create_module: { label: 'Created Module', tone: 'saffron' },
  update_module: { label: 'Updated Module', tone: 'saffron' },
};

export function actionLabel(action) {
  return AUDIT_ACTIONS[action]?.label || action;
}
