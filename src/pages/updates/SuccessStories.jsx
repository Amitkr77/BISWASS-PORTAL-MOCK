import Breadcrumb from '../../components/common/Breadcrumb';
import PageBanner from '../../components/common/PageBanner';
import { placeholderImageFor } from '../../utils/placeholderImage';
import stories from '../../services/data/success-stories.json';

export default function SuccessStories() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Impact & Updates' }, { label: 'Success Stories' }]} />
      <PageBanner title="Success Stories" description="Real accounts of beneficiaries who received life-saving treatment under AB-PMJAY Bihar." />
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {stories.map((s, i) => (
            <article key={s.title} className="info-card flex flex-col">
              <img
                src={placeholderImageFor(i, 0)}
                loading="lazy"
                width={400}
                height={300}
                alt={`Illustrative photo representing the story of ${s.name}`}
                className="w-full h-40 object-cover rounded-sm mb-3"
              />
              <h3 className="font-semibold text-govt-blue-dark">{s.title}</h3>
              <p className="text-sm text-govt-gray-600 mt-1 flex-1">{s.excerpt}</p>
              <p className="text-xs text-govt-gray-500 mt-3">{s.name} &middot; {s.date}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
