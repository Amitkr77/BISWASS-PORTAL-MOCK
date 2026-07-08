import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronPrevIcon, ChevronNextIcon } from './icons';
import ban1 from '../../assets/images/banners/ban-1.jpg';
import ban2 from '../../assets/images/banners/ban-2.jpg';
import ban3 from '../../assets/images/banners/ban-3.jpg';
import ban4 from '../../assets/images/banners/ban-4.jpg';
import ban5 from '../../assets/images/banners/ban-5.jpg';

const AUTOPLAY_MS = 6000;

const SLIDES = [
  { src: ban1, alt: 'Ayushman Bharat Bihar banner: a family under an umbrella illustration alongside a beneficiary family photo, with the message "Ayushman Bharat Bihar – 5 lakh tak ka muft ilaj tay" (health cover up to Rs. 5 lakh guaranteed) and the BSSS emblem.' },
  { src: ban2, alt: 'Ayushman Bharat Bihar banner: a beneficiary family photographed under a tree, with the message "Aapka swasthya, hamara saath" and details of the Rs. 5 lakh per family annual health cover at government and listed private hospitals.' },
  { src: ban3, alt: 'Ayushman Bharat Bihar banner: a beneficiary family photograph beside the BSSS emblem, with the scheme name "Pradhanmantri Jan Arogya Yojna" and tagline "Swasthya aapka, saath hamara".' },
  { src: ban4, alt: 'Ayushman Bharat Bihar banner: beneficiary family photographs beside the BSSS emblem, with the tagline "Swasthya aapka, saath hamara".' },
  { src: ban5, alt: 'PM-JAY banner: a beneficiary family photograph with the message "Muft ilaj tay PM-JAY – Ayushman Bharat Bihar", listed under PM-JAY, and health benefit of up to Rs. 5 lakh per year.' }
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);
  const rootRef = useRef(null);

  const next = useCallback(() => setCurrent((c) => (c + 1) % SLIDES.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length), []);

  const goTo = useCallback((index) => {
    setCurrent(index);
    setPlaying(true);
  }, []);

  useEffect(() => {
    if (!playing) return undefined;
    const timer = window.setInterval(next, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [playing, next]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowRight') { next(); setPlaying(true); }
    if (e.key === 'ArrowLeft') { prev(); setPlaying(true); }
  }, [next, prev]);

  return (
    <section
      ref={rootRef}
      id="hero-carousel"
      className="relative bg-govt-blue-dark focus:outline-none"
      aria-roledescription="carousel"
      aria-label="Featured programme highlights"
      tabIndex={0}
      onMouseEnter={() => setPlaying(false)}
      onMouseLeave={() => setPlaying(true)}
      onFocus={() => setPlaying(false)}
      onBlur={() => setPlaying(true)}
      onKeyDown={handleKeyDown}
    >
      <div className="relative aspect-video sm:aspect-[1550/431] overflow-hidden">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            className={`carousel-slide absolute inset-0 transition-opacity duration-700 ${i === current ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            aria-hidden={i !== current}
          >
            <img src={slide.src} alt={slide.alt} width="1550" height="431" loading={i === 0 ? 'eager' : 'lazy'} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
      <button type="button" aria-label="Previous slide" className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2" onClick={() => { prev(); setPlaying(true); }}>
        <ChevronPrevIcon />
      </button>
      <button type="button" aria-label="Next slide" className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2" onClick={() => { next(); setPlaying(true); }}>
        <ChevronNextIcon />
      </button>
      <div className="carousel-dots absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            className={`carousel-dot w-2.5 h-2.5 rounded-full ${i === current ? 'bg-govt-saffron' : 'bg-white/50'}`}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === current}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </section>
  );
}
