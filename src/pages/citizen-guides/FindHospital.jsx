import Breadcrumb from '../../components/common/Breadcrumb';
import PageBanner from '../../components/common/PageBanner';
import HospitalFinder from '../../components/common/HospitalFinder';

export default function FindHospital() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Citizen Guides' }, { label: 'Find Empanelled Hospital' }]} />
      <PageBanner
        title="Find Empanelled Hospital"
        description="Search the directory of hospitals empanelled under AB-PMJAY and MMJAY in Bihar by name, district, type or specialty."
      />
      <section className="max-w-7xl mx-auto px-4 py-10">
        <HospitalFinder />
      </section>
    </>
  );
}
