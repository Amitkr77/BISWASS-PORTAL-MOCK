import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumb({ items }) {
  const lastIndex = items.length - 1;

  return (
    <nav
      aria-label="Breadcrumb"
      className="border-b border-slate-200 bg-white"
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-6">
        <ol className="flex items-center gap-0.5 overflow-x-auto whitespace-nowrap py-2.5 text-xs [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-2 sm:py-4 sm:text-sm [&::-webkit-scrollbar]:hidden">

          {/* Home */}
          <li className="shrink-0">
            <Link
              to="/"
              className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-blue-700 sm:py-1"
            >
              <Home className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">Home</span>
            </Link>
          </li>

          {items.map((item, index) => {
            const isCurrent = index === lastIndex;
            return (
              <li key={item.label} className="flex shrink-0 items-center gap-0.5 sm:gap-2">

                <ChevronRight
                  className="h-3.5 w-3.5 shrink-0 text-slate-300 sm:h-4 sm:w-4"
                  strokeWidth={2}
                />

                {isCurrent ? (
                  <span
                    aria-current="page"
                    className="rounded-lg bg-blue-50 px-2.5 py-1.5 font-medium text-blue-700 sm:px-3 sm:py-1"
                  >
                    {item.label}
                  </span>
                ) : item.href ? (
                  <Link
                    to={item.href}
                    className="rounded-lg px-2 py-1.5 text-slate-600 transition-colors hover:bg-slate-100 hover:text-blue-700 sm:py-1"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="px-2 py-1.5 text-slate-500 sm:py-1">
                    {item.label}
                  </span>
                )}

              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}