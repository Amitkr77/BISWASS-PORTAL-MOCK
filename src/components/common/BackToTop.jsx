import { useEffect, useState } from 'react';
import { ArrowUpIcon } from './icons';

/** Floating button that appears once the page is scrolled down and jumps back to top. */
export default function BackToTop({ threshold = 400 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > threshold);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-5 right-4 sm:bottom-8 sm:right-8 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-govt-blue text-white shadow-gov transition-all duration-300 hover:bg-govt-blue-dark focus-visible:outline-offset-2 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <ArrowUpIcon className="h-5 w-5" />
    </button>
  );
}
