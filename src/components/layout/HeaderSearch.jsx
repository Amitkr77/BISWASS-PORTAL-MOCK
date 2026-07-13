import { useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SEARCH_INDEX } from '../../utils/navigation';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { useEscapeKey } from '../../hooks/useEscapeKey';
import { SearchIcon } from '../common/icons';

const MAX_RESULTS = 8;

export default function HeaderSearch() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const rootRef = useRef(null);

  const close = () => setOpen(false);
  useOutsideClick(rootRef, close, open);
  useEscapeKey(close, open);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return SEARCH_INDEX.filter((item) => item.labelEn.toLowerCase().includes(q)).slice(0, MAX_RESULTS);
  }, [query]);

  function goTo(href) {
    navigate(href);
    setOpen(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (matches.length > 0) goTo(matches[0].href);
  }

  return (
    <div ref={rootRef} className="relative w-48 xl:w-64">
      <form role="search" onSubmit={handleSubmit}>
        <label htmlFor="site-search" className="sr-only">Search the site</label>
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-govt-gray-400 pointer-events-none" />
          <input
            id="site-search"
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            placeholder="Search this site&hellip;"
            autoComplete="off"
            aria-expanded={open && matches.length > 0}
            className="w-full border border-govt-gray-300 rounded-full pl-9 pr-3 py-2 text-sm focus:border-govt-blue focus:ring-2 focus:ring-govt-blue/30 outline-none"
          />
        </div>
      </form>

      {open && query.trim() && (
        <div className="absolute right-0 top-full mt-1 w-72 max-w-[80vw] bg-white border border-govt-gray-200 rounded-sm shadow-lg py-1 z-40">
          {matches.length > 0 ? (
            <ul>
              {matches.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    onClick={() => goTo(item.href)}
                    className="block px-4 py-2 text-sm text-govt-gray-700 hover:bg-govt-blue-light hover:text-govt-blue-dark"
                  >
                    {item.labelEn}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-3 text-sm text-govt-gray-500">No pages match &ldquo;{query}&rdquo;.</p>
          )}
        </div>
      )}
    </div>
  );
}
