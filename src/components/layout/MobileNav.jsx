import { useState } from 'react';
import { Link } from 'react-router-dom';
import { NAV_ITEMS } from '../../utils/navigation';
import { useLang } from '../../hooks/useLang';
import { ChevronDownIcon, LoginIcon } from '../common/icons';

export default function MobileNav({ onNavigate }) {
  const { t } = useLang();
  const [openId, setOpenId] = useState(null);
  const [openSubId, setOpenSubId] = useState(null);

  return (
    <div id="mobile-nav" className="lg:hidden border-t border-govt-gray-200 bg-white max-h-[75vh] overflow-y-auto">
      {NAV_ITEMS.map((item) => {
        if (item.href) {
          return (
            <Link
              key={item.id}
              to={item.href}
              onClick={onNavigate}
              className="block px-4 py-3 border-b border-govt-gray-200 text-sm font-semibold text-govt-gray-900"
            >
              {t(item.labelEn, item.labelHi)}
            </Link>
          );
        }

        const isOpen = openId === item.id;
        const panelId = `mobile-panel-${item.id}`;
        return (
          <div key={item.id} className="border-b border-govt-gray-200">
            <button
              type="button"
              className="mobile-accordion-trigger w-full flex items-center justify-between px-4 py-3 text-left text-sm font-semibold text-govt-gray-900"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenId((prev) => (prev === item.id ? null : item.id))}
            >
              <span>{t(item.labelEn, item.labelHi)}</span>
              <ChevronDownIcon />
            </button>
            <div id={panelId} className={isOpen ? 'pb-2' : 'hidden'}>
              {item.groups ? (
                <>
                  {item.groups[0].links.map((link) => (
                    <MobileLink key={link.href} link={link} t={t} onNavigate={onNavigate} />
                  ))}
                  <div className="mt-1">
                    <button
                      type="button"
                      className="mobile-accordion-trigger w-full flex items-center justify-between px-4 py-2 pl-4 text-left text-xs font-bold uppercase tracking-wide text-govt-blue"
                      aria-expanded={openSubId === item.id}
                      aria-controls={`${panelId}-sub`}
                      onClick={() => setOpenSubId((prev) => (prev === item.id ? null : item.id))}
                    >
                      {item.groups[1].titleEn}
                      <ChevronDownIcon />
                    </button>
                    <div id={`${panelId}-sub`} className={openSubId === item.id ? '' : 'hidden'}>
                      {item.groups[1].links.map((link) => (
                        <MobileLink key={link.href} link={link} t={t} onNavigate={onNavigate} pl="pl-7" />
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {item.links.map((link) => (
                    <MobileLink key={link.href} link={link} t={t} onNavigate={onNavigate} />
                  ))}
                  {item.viewAllHref && (
                    <Link
                      to={item.viewAllHref}
                      onClick={onNavigate}
                      className="block px-4 py-2 text-sm font-semibold text-govt-blue"
                    >
                      {item.viewAllLabelEn} &rarr;
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>
        );
      })}
      <div className="p-4">
        <Link to="/login" onClick={onNavigate} className="btn-login w-full justify-center">
          <LoginIcon />
          <span>{t('Login', 'लॉगिन')}</span>
        </Link>
      </div>
    </div>
  );
}

function MobileLink({ link, t, onNavigate, pl = '' }) {
  return (
    <Link
      to={link.href}
      onClick={onNavigate}
      className={`block px-4 py-2 ${pl || ''} text-sm text-govt-gray-700 hover:bg-govt-blue-light rounded-sm`}
    >
      {t(link.labelEn, link.labelHi)}
    </Link>
  );
}
