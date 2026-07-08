import { Link } from 'react-router-dom';
import Breadcrumb from '../components/common/Breadcrumb';
import PageBanner from '../components/common/PageBanner';
import { NAV_ITEMS } from '../utils/navigation';

const OTHER_LINKS = [
  { labelEn: 'Login', href: '/login' },
  { labelEn: 'Programme Dashboard', href: '/dashboard' },
  { labelEn: 'Terms & Conditions', href: '/terms-and-conditions' },
  { labelEn: 'Sitemap', href: '/sitemap' }
];

const SECTIONS = [
  { titleEn: 'Home', links: [{ labelEn: 'Home', href: '/' }] },
  ...NAV_ITEMS.map((item) => ({
    titleEn: item.labelEn,
    links: item.groups ? item.groups.flatMap((g) => g.links) : item.links
  })),
  { titleEn: 'Other', links: OTHER_LINKS }
];

export default function Sitemap() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Sitemap' }]} />
      <PageBanner title="Sitemap" description="A complete list of pages on this website, organised by section." />
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {SECTIONS.map((section) => (
            <div key={section.titleEn}>
              <h2 className="font-semibold text-govt-blue-dark mb-2">{section.titleEn}</h2>
              <ul className="space-y-1.5">
                {section.links.map((link) => (
                  <li key={link.href}><Link to={link.href} className="text-govt-blue hover:underline text-sm">{link.labelEn}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
