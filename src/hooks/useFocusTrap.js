import { useEffect } from 'react';

/** Traps Tab/Shift+Tab focus within `ref` and restores focus to the previously
 *  active element when `active` becomes false. */
export function useFocusTrap(ref, active, initialFocusRef) {
  useEffect(() => {
    if (!active) return undefined;

    const lastFocused = document.activeElement;
    const target = initialFocusRef?.current ?? ref.current;
    if (target && typeof target.focus === 'function') target.focus();

    function onKeydown(e) {
      if (e.key !== 'Tab' || !ref.current) return;
      const focusables = ref.current.querySelectorAll('a[href], button:not([disabled])');
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeydown);
    return () => {
      document.removeEventListener('keydown', onKeydown);
      if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    };
  }, [active, ref, initialFocusRef]);
}
