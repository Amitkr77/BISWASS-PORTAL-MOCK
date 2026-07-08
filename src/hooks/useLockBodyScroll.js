import { useEffect } from 'react';

export function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return undefined;
    document.body.classList.add('overflow-hidden');
    return () => document.body.classList.remove('overflow-hidden');
  }, [locked]);
}
