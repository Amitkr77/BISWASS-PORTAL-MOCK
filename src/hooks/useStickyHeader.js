import { useEffect, useRef, useState } from 'react';

/** Returns true once the page has scrolled past `threshold`, for a condensed/sticky header.
 *  Throttled to one check per animation frame so it stays smooth under fast scrolling. */
export function useStickyHeader(threshold = 8) {
  const [condensed, setCondensed] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    function update() {
      ticking.current = false;
      setCondensed(window.scrollY > threshold);
    }
    function onScroll() {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(update);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return condensed;
}
