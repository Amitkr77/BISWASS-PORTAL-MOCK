import Breadcrumb from '../../components/common/Breadcrumb';
import PageBanner from '../../components/common/PageBanner';
import DeEmpanelledFinder from '../../components/common/DeEmpanelledFinder';

export default function DeEmpanelledHospitals() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Citizen Guides' }, { label: 'De-Empanelled / Suspended Hospitals' }]} />
      <PageBanner
        title="De-Empanelled / Suspended Hospitals"
        description="Hospitals listed below have been temporarily suspended or de-empanelled following audit or compliance review. Beneficiaries are advised not to seek cashless treatment at these facilities until further notice."
      />
      <section className="max-w-7xl mx-auto px-4 py-10">
        <DeEmpanelledFinder />
      </section>
    </>
  );
}
