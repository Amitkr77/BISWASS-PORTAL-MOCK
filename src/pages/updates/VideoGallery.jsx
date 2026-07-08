import Breadcrumb from '../../components/common/Breadcrumb';
import PageBanner from '../../components/common/PageBanner';
import { placeholderImageFor } from '../../utils/placeholderImage';
import videos from '../../services/data/videos.json';

export default function VideoGallery() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Impact & Updates' }, { label: 'Video Gallery' }]} />
      <PageBanner title="Video Gallery" description="Tutorial videos, awareness films and beneficiary testimonials." />
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {videos.map((v, i) => (
            <article key={v.title} className="info-card p-0 overflow-hidden">
              <div className="relative">
                <img
                  src={placeholderImageFor(i, 3)}
                  loading="lazy"
                  width={400}
                  height={300}
                  alt={`Video thumbnail: ${v.title}`}
                  className="w-full h-44 object-cover"
                />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-12 h-12 rounded-full bg-white/85 flex items-center justify-center text-govt-blue-dark" aria-hidden="true">
                    <svg className="w-5 h-5 ml-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M6.3 4.6a1 1 0 011.5-.86l8 5.4a1 1 0 010 1.72l-8 5.4a1 1 0 01-1.5-.86V4.6z" />
                    </svg>
                  </span>
                </span>
                <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded-sm">{v.duration}</span>
              </div>
              <div className="p-3">
                <p className="text-sm font-semibold text-govt-gray-900">{v.title}</p>
                <p className="text-xs text-govt-gray-500 mt-0.5">{v.category} &middot; {v.date}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
