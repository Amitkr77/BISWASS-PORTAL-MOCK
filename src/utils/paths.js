/** Converts a legacy relative `.html` link (as stored in the JSON data files)
 *  into a React Router path, e.g. "governance/careers.html" -> "/governance/careers". */
export function toRoutePath(href) {
  if (!href) return '/';
  const path = href.replace(/\.html$/, '');
  return path.startsWith('/') ? path : `/${path}`;
}
