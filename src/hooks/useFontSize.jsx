import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'biswass-font-step';
const MIN_STEP = -2;
const MAX_STEP = 2;
const STEP_SIZE = 0.1; // 10% per step
const BASE_PERCENT = 100;

const FontSizeContext = createContext(null);

function getStoredStep() {
  if (typeof window === 'undefined') return 0;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  const step = raw === null ? 0 : parseInt(raw, 10);
  if (Number.isNaN(step)) return 0;
  return Math.min(MAX_STEP, Math.max(MIN_STEP, step));
}

export function FontSizeProvider({ children }) {
  const [step, setStep] = useState(getStoredStep);

  useEffect(() => {
    const percent = BASE_PERCENT + step * STEP_SIZE * 100;
    document.documentElement.style.fontSize = `${percent}%`;
    window.localStorage.setItem(STORAGE_KEY, String(step));
  }, [step]);

  const decrease = useCallback(() => setStep((s) => Math.max(MIN_STEP, s - 1)), []);
  const increase = useCallback(() => setStep((s) => Math.min(MAX_STEP, s + 1)), []);
  const reset = useCallback(() => setStep(0), []);

  return (
    <FontSizeContext.Provider value={{ step, decrease, increase, reset }}>
      {children}
    </FontSizeContext.Provider>
  );
}

export function useFontSize() {
  const ctx = useContext(FontSizeContext);
  if (!ctx) throw new Error('useFontSize must be used within a FontSizeProvider');
  return ctx;
}
