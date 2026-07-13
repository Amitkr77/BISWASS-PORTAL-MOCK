import { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { NAV_ITEMS } from '../../utils/navigation';
import { useLang } from '../../hooks/useLang';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { useEscapeKey } from '../../hooks/useEscapeKey';
import { ChevronDownIcon } from '../common/icons';

export default function DesktopNav() {
  const { t } = useLang();
  const [openId, setOpenId] = useState(null);
  const navRef = useRef(null);

  const close = useCallback(() => setOpenId(null), []);
  useOutsideClick(navRef, close, openId !== null);
  useEscapeKey(close, openId !== null);

  return (
    <nav ref={navRef} id="main-nav" aria-label="Primary" className="hidden lg:block border-t border-govt-gray-200">
      <ul className="flex items-center">
        {NAV_ITEMS.map((item) => {
          if (item.href) {
            return (
              <li key={item.id}>
                <Link to={item.href} className="nav-link">
                  <span>{t(item.labelEn, item.labelHi)}</span>
                </Link>
              </li>
            );
          }

          const isOpen = openId === item.id;
          return (
            <li key={item.id} className={`nav-item relative${isOpen ? ' is-open' : ''}`}>
              <button
                type="button"
                className="nav-link"
                aria-expanded={isOpen}
                aria-haspopup="true"
                onClick={() => setOpenId((prev) => (prev === item.id ? null : item.id))}
              >
                <span>{t(item.labelEn, item.labelHi)}</span>
                <ChevronDownIcon />
              </button>

              {item.groups ? (
                <div className={`nav-panel${item.wide ? ' !min-w-[34rem] !p-2' : ''}`}>
                  <div className="grid grid-cols-2 divide-x divide-govt-gray-200">
                    {item.groups.map((group) => (
                      <div key={group.titleEn} className="py-2 px-1">
                        <p className="px-3 pt-1 pb-2 text-xs font-bold uppercase tracking-wide text-govt-blue">{group.titleEn}</p>
                        {group.links.map((link) => (
                          <Link key={link.href} to={link.href} onClick={close}>{t(link.labelEn, link.labelHi)}</Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="nav-panel">
                  {item.links.map((link) => (
                    <Link key={link.href} to={link.href} onClick={close}>{t(link.labelEn, link.labelHi)}</Link>
                  ))}
                  {item.viewAllHref && (
                    <div className="border-t border-govt-gray-200 mt-1 pt-2 px-4 pb-1">
                      <Link to={item.viewAllHref} onClick={close} className="text-sm font-semibold text-govt-blue hover:underline">
                        {item.viewAllLabelEn} &rarr;
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
