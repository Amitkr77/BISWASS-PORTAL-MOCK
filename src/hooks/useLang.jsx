import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'biswass-lang';
const LangContext = createContext(null);

function getStoredLang() {
  if (typeof window === 'undefined') return 'en';
  return window.localStorage.getItem(STORAGE_KEY) || 'en';
}

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(getStoredLang);

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang === 'hi' ? 'hi' : 'en');
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const toggleLang = useCallback(() => {
    setLangState((prev) => (prev === 'hi' ? 'en' : 'hi'));
  }, []);

  const t = useCallback((en, hi) => (lang === 'hi' ? hi ?? en : en), [lang]);

  return <LangContext.Provider value={{ lang, toggleLang, t }}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within a LangProvider');
  return ctx;
}
