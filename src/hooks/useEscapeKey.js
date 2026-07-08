import { useEffect } from 'react';

export function useEscapeKey(handler, when = true) {
  useEffect(() => {
    if (!when) return undefined;
    function onKeydown(e) {
      if (e.key === 'Escape') handler(e);
    }
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  }, [handler, when]);
}
