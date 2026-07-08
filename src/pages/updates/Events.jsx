import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/common/Breadcrumb';
import PageBanner from '../../components/common/PageBanner';
import events from '../../services/data/events.json';

export default function Events() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Impact & Updates' }, { label: 'Events' }]} />
      <PageBanner title="Events" description="Upcoming and recent events, camps and workshops organised by BSSS and district units." />
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="overflow-x-auto">
          <table className="gov-table">
            <caption className="sr-only">Events</caption>
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Event</th>
                <th scope="col">Venue</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.slug}>
                  <td className="whitespace-nowrap">{event.date}</td>
                  <td>
                    <Link to={`/updates/events/${event.slug}`} className="font-semibold text-govt-blue hover:underline">
                      {event.title}
                    </Link>
                  </td>
                  <td>{event.venue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
