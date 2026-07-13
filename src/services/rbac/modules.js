/**
 * Seed module registry for the RBAC demo portal. Each entry drives the
 * sidebar nav, the generic CRUD screen and the record form for that module.
 * This is only the *starting* list - the admin can create additional
 * modules at runtime (see AuthContext.createModule), which are held in
 * React state alongside these, not in this file.
 */
export const SEED_MODULES = [
  {
    id: 'notices',
    label: 'Notice Management',
    singular: 'Notice',
    description: 'Circulars, advisories and press notes published to citizens and staff.',
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true },
      {
        key: 'category',
        label: 'Category',
        type: 'select',
        required: true,
        options: ['Circular', 'Advisory', 'Press Release', 'Notification'],
      },
      { key: 'date', label: 'Date', type: 'date', required: true },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'attachment', label: 'Attachment', type: 'file' },
    ],
    columns: ['title', 'category', 'date', 'attachment'],
  },
  {
    id: 'events',
    label: 'Event Management',
    singular: 'Event',
    description: 'Camps, workshops and outreach events organised by BSSS and district units.',
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true },
      { key: 'venue', label: 'Venue', type: 'text', required: true },
      { key: 'date', label: 'Date', type: 'date', required: true },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'attachment', label: 'Attachment', type: 'file' },
    ],
    columns: ['title', 'venue', 'date', 'attachment'],
  },
];

export const FIELD_TYPES = [
  { value: 'text', label: 'Text' },
  { value: 'textarea', label: 'Text Area' },
  { value: 'date', label: 'Date' },
  { value: 'select', label: 'Dropdown' },
  { value: 'file', label: 'File Upload' },
];

function slugify(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function camelKey(text) {
  const parts = text.trim().toLowerCase().replace(/[^a-z0-9]+/g, ' ').split(' ').filter(Boolean);
  return parts.map((p, i) => (i === 0 ? p : p[0].toUpperCase() + p.slice(1))).join('') || 'field';
}

/** Route segments already claimed under /portal/* (the dashboard home and
 *  the whole /portal/settings/* admin area) - a module can never take one
 *  of these ids, or it would be permanently unreachable at /portal/:moduleId. */
export const RESERVED_MODULE_IDS = ['settings', 'users', 'modules', 'recycle-bin', 'audit-log'];

/** Turns a module label into a unique, URL-safe id (used for routes and as
 *  the key into the records map), avoiding collisions with existing modules
 *  and with reserved portal routes. */
export function makeModuleId(label, existingModules) {
  const base = slugify(label) || 'module';
  let id = base;
  let n = 2;
  while (existingModules.some((m) => m.id === id) || RESERVED_MODULE_IDS.includes(id)) {
    id = `${base}-${n}`;
    n += 1;
  }
  return id;
}

/** Turns a field label into a unique object key within one module's field list. */
export function makeFieldKey(label, existingFields) {
  const base = camelKey(label);
  let key = base;
  let n = 2;
  while (existingFields.some((f) => f.key === key)) {
    key = `${base}${n}`;
    n += 1;
  }
  return key;
}
