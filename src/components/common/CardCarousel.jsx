import { useRef } from 'react';
import { ChevronPrevIcon, ChevronNextIcon } from './icons';

/** Horizontal, swipeable card row (native scroll-snap) with prev/next
 *  buttons on larger screens. Used for any homepage "carousel of cards"
 *  section (Events, IEC, ...) instead of a tall stacked grid, keeping the
 *  section compact vertically while still fitting many cards. */
export default function CardCarousel({ items, getKey, renderItem, cardClassName = 'w-[85%] sm:w-80' }) {
  const trackRef = useRef(null);

  function scrollByPage(direction) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.9, behavior: 'smooth' });
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => (
          <div key={getKey(item, i)} className={`snap-start shrink-0 ${cardClassName}`}>
            {renderItem(item, i)}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scrollByPage(-1)}
        aria-label="Scroll left"
        className="hidden sm:flex items-center justify-center absolute -left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white text-govt-blue-dark shadow-gov border border-govt-gray-200 hover:bg-govt-blue-light transition-colors"
      >
        <ChevronPrevIcon className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => scrollByPage(1)}
        aria-label="Scroll right"
        className="hidden sm:flex items-center justify-center absolute -right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white text-govt-blue-dark shadow-gov border border-govt-gray-200 hover:bg-govt-blue-light transition-colors"
      >
        <ChevronNextIcon className="w-4 h-4" />
      </button>
    </div>
  );
}
