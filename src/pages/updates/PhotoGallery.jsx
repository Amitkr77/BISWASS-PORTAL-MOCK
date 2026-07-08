import Breadcrumb from '../../components/common/Breadcrumb';
import PageBanner from '../../components/common/PageBanner';
import { placeholderImageFor } from '../../utils/placeholderImage';
import gallery from '../../services/data/gallery.json';

export default function PhotoGallery() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Impact & Updates' }, { label: 'Photo Gallery' }]} />
      <PageBanner title="Photo Gallery" description="Photographs from enrolment camps, review meetings and beneficiary outreach across Bihar." />
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {gallery.map((g, i) => (
            <figure key={g.title} className="info-card p-0 overflow-hidden">
              <img
                src={placeholderImageFor(i, 0)}
                loading="lazy"
                width={400}
                height={300}
                alt={g.alt}
                className="w-full h-44 object-cover"
              />
              <figcaption className="p-3">
                <p className="text-sm font-semibold text-govt-gray-900">{g.title}</p>
                <p className="text-xs text-govt-gray-500 mt-0.5">{g.date}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
