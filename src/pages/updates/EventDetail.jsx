import { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import Breadcrumb from "../../components/common/Breadcrumb";
import PageBanner from "../../components/common/PageBanner";
import Accordion from "../../components/common/Accordion";
import { CalendarIcon, LocationIcon, EyeIcon, DownloadIcon } from "../../components/common/icons";
import { placeholderImageFor } from "../../utils/placeholderImage";
import events from "../../services/data/events.json";

const DOCUMENT_URL = "/sample-document.pdf";

const TABS = [
  { id: "about", label: "About" },
  { id: "gallery", label: "Gallery" },
  { id: "transcript", label: "Transcript / Proceedings" },
  { id: "news", label: "News & Media" },
  { id: "documents", label: "Related Documents" },
];

function AboutPanel({ event }) {
  return (
    <div className="max-w-3xl">
      <dl className="flex flex-wrap gap-x-8 gap-y-2 mb-6 text-sm text-govt-gray-700">
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-4 w-4 shrink-0 text-govt-gray-400" />
          <dt className="sr-only">Date</dt>
          <dd>{event.date}</dd>
        </div>
        <div className="flex items-center gap-2">
          <LocationIcon className="h-4 w-4 shrink-0 text-govt-gray-400" />
          <dt className="sr-only">Venue</dt>
          <dd>{event.venue}</dd>
        </div>
      </dl>
      <p className="text-sm sm:text-base text-govt-gray-700 leading-relaxed">{event.about}</p>
    </div>
  );
}

function GalleryPanel({ gallery }) {
  const photos = gallery.photos || [];
  const videos = gallery.videos || [];

  if (photos.length === 0 && videos.length === 0) {
    return <p className="text-sm text-govt-gray-600">No photos or videos have been published for this event yet.</p>;
  }

  return (
    <div className="space-y-10">
      {photos.length > 0 && (
        <div>
          <h3 className="font-semibold text-govt-blue-dark mb-4">Photos</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {photos.map((photo, i) => (
              <figure key={photo.title} className="info-card p-0 overflow-hidden">
                <img
                  src={placeholderImageFor(i, 0)}
                  loading="lazy"
                  width={400}
                  height={300}
                  alt={photo.alt}
                  className="w-full h-44 object-cover"
                />
                <figcaption className="p-3">
                  <p className="text-sm font-semibold text-govt-gray-900">{photo.title}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}

      {videos.length > 0 && (
        <div>
          <h3 className="font-semibold text-govt-blue-dark mb-4">Videos</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {videos.map((video, i) => (
              <article key={video.title} className="info-card p-0 overflow-hidden">
                <div className="relative">
                  <img
                    src={placeholderImageFor(i, 3)}
                    loading="lazy"
                    width={400}
                    height={300}
                    alt={`Video thumbnail: ${video.title}`}
                    className="w-full h-44 object-cover"
                  />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-12 h-12 rounded-full bg-white/85 flex items-center justify-center text-govt-blue-dark" aria-hidden="true">
                      <svg className="w-5 h-5 ml-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M6.3 4.6a1 1 0 011.5-.86l8 5.4a1 1 0 010 1.72l-8 5.4a1 1 0 01-1.5-.86V4.6z" />
                      </svg>
                    </span>
                  </span>
                  <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded-sm">{video.duration}</span>
                </div>
                <div className="p-3">
                  <p className="text-sm font-semibold text-govt-gray-900">{video.title}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function TranscriptPanel({ transcript }) {
  const items = [];
  if (transcript.speech) {
    items.push({ question: "Speech Transcript", answer: transcript.speech });
  }
  if (transcript.proceedings) {
    items.push({ question: "Event Proceedings", answer: transcript.proceedings });
  }

  if (items.length === 0) {
    return <p className="text-sm text-govt-gray-600">No transcript or proceedings have been published for this event yet.</p>;
  }

  return <Accordion items={items} />;
}

function NewsSection({ title, items, renderMeta }) {
  if (!items || items.length === 0) return null;
  return (
    <div>
      <h3 className="font-semibold text-govt-blue-dark mb-3">{title}</h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.title || item.text} className="info-card">
            <p className="text-sm font-semibold text-govt-gray-900">{item.title || item.text}</p>
            <p className="text-xs text-govt-gray-500 mt-1">{renderMeta(item)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function NewsPanel({ news }) {
  const hasAny =
    (news.pressReleases && news.pressReleases.length > 0) ||
    (news.newspaperCoverage && news.newspaperCoverage.length > 0) ||
    (news.socialMedia && news.socialMedia.length > 0);

  if (!hasAny) {
    return <p className="text-sm text-govt-gray-600">No press releases, newspaper coverage or social media posts have been published for this event yet.</p>;
  }

  return (
    <div className="space-y-8">
      <NewsSection
        title="Press Releases"
        items={news.pressReleases}
        renderMeta={(item) => `${item.source} · ${item.date}`}
      />
      <NewsSection
        title="Newspaper Coverage"
        items={news.newspaperCoverage}
        renderMeta={(item) => `${item.source} · ${item.date}`}
      />
      <NewsSection
        title="Social Media Posts"
        items={news.socialMedia}
        renderMeta={(item) => `${item.platform} · ${item.date}`}
      />
    </div>
  );
}

function DocumentsPanel({ documents }) {
  if (!documents || documents.length === 0) {
    return <p className="text-sm text-govt-gray-600">No documents have been published for this event yet.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="gov-table">
        <caption className="sr-only">Related Documents</caption>
        <thead>
          <tr>
            <th scope="col">Document</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.title}>
              <td>{doc.title}</td>
              <td className="whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <a
                    href={DOCUMENT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-govt-blue hover:text-govt-blue-dark hover:underline"
                  >
                    <EyeIcon className="h-3.5 w-3.5" />
                    View
                  </a>
                  <a
                    href={DOCUMENT_URL}
                    download={`${doc.title}.pdf`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-govt-blue hover:text-govt-blue-dark hover:underline"
                  >
                    <DownloadIcon className="h-3.5 w-3.5" />
                    Download
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function EventDetail() {
  const { slug } = useParams();
  const location = useLocation();
  const event = events.find((e) => e.slug === slug);

  const [activeTab, setActiveTab] = useState(() => {
    const hashId = location.hash.slice(1);
    return TABS.some((t) => t.id === hashId) ? hashId : TABS[0].id;
  });

  useEffect(() => {
    const hashId = location.hash.slice(1);
    if (TABS.some((t) => t.id === hashId)) setActiveTab(hashId);
  }, [location.hash]);

  if (!event) {
    return <Navigate to="/updates/events" replace />;
  }

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Impact & Updates" },
          { label: "Events", href: "/updates/events" },
          { label: event.title },
        ]}
      />
      <PageBanner title={event.title} description={`${event.date} · ${event.venue}`} />

      <section className="max-w-7xl mx-auto px-4 py-10">
        <Link to="/updates/events" className="text-sm font-semibold text-govt-blue hover:underline">
          &larr; Back to all events
        </Link>

        <div className="mt-6 mb-8 sm:flex sm:gap-8 sm:items-start">
          <div
            role="tablist"
            aria-label="Event detail section"
            aria-orientation="vertical"
            className="flex gap-1 overflow-x-auto whitespace-nowrap border-b border-govt-gray-200 sm:block sm:w-60 sm:shrink-0 sm:overflow-visible sm:whitespace-normal sm:border-b-0 sm:border-r sm:pr-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-colors sm:block sm:w-full sm:text-left sm:border-b-0 sm:border-l-2 sm:mb-0 sm:-ml-px sm:rounded-r-sm sm:px-4 sm:py-3 ${
                  activeTab === tab.id
                    ? "border-govt-blue text-govt-blue-dark sm:bg-govt-blue-light"
                    : "border-transparent text-govt-gray-500 hover:text-govt-blue-dark hover:border-govt-gray-300 sm:hover:bg-govt-gray-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex-1 min-w-0 mt-6 sm:mt-0">
            {activeTab === "about" && <AboutPanel event={event} />}
            {activeTab === "gallery" && <GalleryPanel gallery={event.gallery} />}
            {activeTab === "transcript" && <TranscriptPanel transcript={event.transcript} />}
            {activeTab === "news" && <NewsPanel news={event.news} />}
            {activeTab === "documents" && <DocumentsPanel documents={event.documents} />}
          </div>
        </div>
      </section>
    </>
  );
}
