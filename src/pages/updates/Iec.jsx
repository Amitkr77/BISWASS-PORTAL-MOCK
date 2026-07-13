import Breadcrumb from '../../components/common/Breadcrumb';
import PageBanner from '../../components/common/PageBanner';
import { placeholderImageFor } from '../../utils/placeholderImage';
import iecItems from '../../services/data/iec.json';

const DOCUMENT_URL = '/sample-document.pdf';

export default function Iec() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Impact & Updates' }, { label: 'IEC' }]} />
      <PageBanner
        title="IEC (Information, Education & Communication)"
        description="Posters, pamphlets, infographics and outreach material for beneficiaries, ASHA workers and empanelled hospitals. Available for download as PDF or JPG."
      />

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {iecItems.map((item, i) => {
            const imageSrc = placeholderImageFor(i, 1);
            return (
              <article key={item.slug} id={item.slug} className="scroll-mt-24 rounded-xl border border-govt-gray-200 bg-white shadow-sm overflow-hidden flex flex-col">
                <img
                  src={imageSrc}
                  loading="lazy"
                  width={400}
                  height={300}
                  alt={`Cover preview of ${item.title}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5 flex flex-col flex-1">
                  <span className="inline-flex w-fit items-center text-[11px] font-bold uppercase tracking-wide text-govt-saffron-dark bg-govt-saffron/10 px-2 py-1 rounded-sm mb-2">
                    {item.category}
                  </span>
                  <h3 className="font-heading font-bold text-lg text-govt-blue-dark leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-govt-gray-600 mt-2 flex-1">{item.description}</p>
                  <p className="text-xs text-govt-gray-500 mt-3">{item.date}</p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    <a
                      href={DOCUMENT_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold bg-govt-blue-light text-govt-blue-dark hover:bg-govt-blue hover:text-white px-3 py-2 rounded-sm transition-colors"
                    >
                      View / Download PDF
                    </a>
                    <a
                      href={imageSrc}
                      download={`${item.slug}.jpg`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold border border-govt-blue text-govt-blue hover:bg-govt-blue-light px-3 py-2 rounded-sm transition-colors"
                    >
                      View / Download JPG
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
