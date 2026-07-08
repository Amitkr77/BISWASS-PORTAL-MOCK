import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import notices from '../../services/data/notices.json';
import { toRoutePath } from '../../utils/paths';
import { BellIcon, CloseIcon } from './icons';

const DISMISS_KEY = 'biswass-ticker-dismissed';

export default function NoticeTicker() {
  const [dismissed, setDismissed] = useState(() => window.sessionStorage.getItem(DISMISS_KEY) === '1');
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);

  const dismiss = useCallback(() => {
    window.sessionStorage.setItem(DISMISS_KEY, '1');
    setDismissed(true);
  }, []);

  if (dismissed) return null;

  const isPaused = paused || hovered;
  // Items are rendered twice back-to-back so the CSS translateX(-50%) loop is seamless.
  const items = [...notices, ...notices];

  return (
    <div
      id="notice-ticker"
      className="bg-govt-blue-light border-b border-govt-blue/20"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-3">
        <span className="shrink-0 hidden sm:inline-flex items-center bg-govt-red text-white text-xs font-bold px-2 py-1 rounded-sm">LATEST</span>
        <div className="relative flex-1 overflow-hidden">
          <div className={`ticker-track flex gap-10 whitespace-nowrap w-max${isPaused ? ' is-paused' : ''}`}>
            {items.map((notice, i) => (
              <Link key={`${notice.id}-${i}`} to={toRoutePath(notice.link)} className="inline-flex items-center gap-2 text-sm text-govt-blue-dark hover:underline">
                <BellIcon />
                {notice.isNew && <span className="bg-govt-red text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">NEW</span>}
                <span>{notice.title}</span>
                <span className="text-govt-gray-500 text-xs">({notice.date})</span>
              </Link>
            ))}
          </div>
        </div>
        <button
          type="button"
          aria-pressed={paused}
          className="shrink-0 text-xs font-semibold text-govt-blue-dark border border-govt-blue/30 rounded-sm px-2 py-1 hover:bg-white"
          onClick={() => setPaused((prev) => !prev)}
        >
          {paused ? '▶ Play' : '⏸ Pause'}
        </button>
        <button type="button" className="shrink-0 text-govt-gray-600 hover:text-govt-red" aria-label="Dismiss notice ticker" onClick={dismiss}>
          <CloseIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
