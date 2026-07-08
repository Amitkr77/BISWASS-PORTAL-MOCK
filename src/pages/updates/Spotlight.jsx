import Breadcrumb from '../../components/common/Breadcrumb';
import PageBanner from '../../components/common/PageBanner';
import { placeholderImageFor } from '../../utils/placeholderImage';

const ITEMS = [
  { title: 'Bihar crosses 1.21 crore Ayushman Card enrolments', date: '2026-06-25', text: 'The state has crossed a key milestone in Ayushman Card creation, with sustained enrolment drives across all 38 districts.' },
  { title: 'BSSS launches mobile enrolment vans for remote blocks', date: '2026-05-18', text: 'Mobile vans equipped with biometric kits are now reaching under-served blocks to bring card creation closer to beneficiaries.' },
  { title: 'AB-PMJAY Bihar recognised for claims settlement efficiency', date: '2026-04-08', text: 'The state was recognised at the national review meeting for maintaining claims settlement turnaround within prescribed timelines.' }
];

export default function Spotlight() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Impact & Updates' }, { label: 'Spotlight' }]} />
      <PageBanner title="Spotlight" description="Programme milestones, achievements and highlights from across the state." />
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ITEMS.map((it, i) => (
            <article key={it.title} className="info-card flex flex-col">
              <img
                src={placeholderImageFor(i, 1)}
                loading="lazy"
                width={400}
                height={300}
                alt={`Illustrative graphic for spotlight story: ${it.title}`}
                className="w-full h-40 object-cover rounded-sm mb-3"
              />
              <h3 className="font-semibold text-govt-blue-dark">{it.title}</h3>
              <p className="text-sm text-govt-gray-600 mt-1 flex-1">{it.text}</p>
              <p className="text-xs text-govt-gray-500 mt-3">{it.date}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
