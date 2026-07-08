import { useState } from 'react';

/**
 * A row of cards where the active (hovered/focused) card gets more width and the
 * rest shrink to match, with a smooth width transition — one card is wider by
 * default. Falls back to a simple stacked column below the `lg` breakpoint,
 * since the width-swap interaction needs a wide viewport: below that, the
 * shrunken cards don't have enough room left to stay readable.
 */
export default function ExpandingCardGroup({ items, getKey, renderCard, heightClassName = 'lg:h-96', activeWeight = 3 }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalWeight = activeWeight + (items.length - 1);

  return (
    <div className={`flex flex-col lg:flex-row gap-4 ${heightClassName}`}>
      {items.map((item, i) => {
        const isActive = i === activeIndex;
        const widthPct = ((isActive ? activeWeight : 1) / totalWeight) * 100;
        return (
          <div
            key={getKey(item, i)}
            onMouseEnter={() => setActiveIndex(i)}
            onFocus={() => setActiveIndex(i)}
            style={{ '--card-width': `${widthPct}%` }}
            className="min-h-[14rem] h-auto lg:h-full w-full lg:w-[var(--card-width)] shrink-0 transition-[width] duration-500 ease-in-out"
          >
            {renderCard(item, isActive, i)}
          </div>
        );
      })}
    </div>
  );
}
