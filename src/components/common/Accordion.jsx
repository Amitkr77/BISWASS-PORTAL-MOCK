import { ChevronDownIcon } from './icons';

/** items: [{ question, answer }] — answer may be a string or JSX. Uses native
 *  <details>/<summary> so no open/close state management is needed. */
export default function Accordion({ items }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details key={item.question} className="group border border-govt-gray-200 rounded-sm bg-white">
          <summary className="cursor-pointer list-none flex items-center justify-between gap-3 px-4 py-3 font-semibold text-govt-blue-dark hover:bg-govt-blue-light">
            <span>{item.question}</span>
            <ChevronDownIcon className="w-4 h-4 shrink-0 transition-transform group-open:rotate-180" />
          </summary>
          <div className="px-4 pb-4 text-sm text-govt-gray-700 leading-relaxed">{item.answer}</div>
        </details>
      ))}
    </div>
  );
}
