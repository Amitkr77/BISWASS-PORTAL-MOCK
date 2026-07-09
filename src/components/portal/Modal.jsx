import { useRef } from 'react';
import { useEscapeKey } from '../../hooks/useEscapeKey';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import { CloseIcon } from '../common/icons';

export default function Modal({ title, onClose, children, wide = false }) {
  const panelRef = useRef(null);
  useEscapeKey(onClose, true);
  useLockBodyScroll(true);

  return (
    <div className="fixed inset-0 z-[60] flex items-start sm:items-center justify-center bg-govt-blue-dark/50 p-4 overflow-y-auto">
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`w-full ${wide ? 'max-w-2xl' : 'max-w-lg'} bg-white rounded-xl shadow-gov my-8`}
      >
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-govt-gray-200">
          <h2 className="font-heading font-bold text-govt-blue-dark">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="text-govt-gray-500 hover:text-govt-red transition-colors"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="px-5 py-5">{children}</div>
      </div>
    </div>
  );
}
