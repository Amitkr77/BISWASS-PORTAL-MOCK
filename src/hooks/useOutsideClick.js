import { useEffect } from 'react';

export function useOutsideClick(ref, handler, when = true) {
  useEffect(() => {
    if (!when) return undefined;
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) handler(e);
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [ref, handler, when]);
}
