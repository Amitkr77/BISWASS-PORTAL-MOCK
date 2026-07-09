import Modal from './Modal';

export default function ConfirmDialog({ title, message, confirmLabel = 'Confirm', danger = false, onConfirm, onClose }) {
  return (
    <Modal title={title} onClose={onClose}>
      <p className="text-sm text-govt-gray-700 leading-relaxed">{message}</p>
      <div className="flex items-center justify-end gap-3 pt-5">
        <button type="button" onClick={onClose} className="btn-outline">
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className={`inline-flex items-center justify-center gap-2 font-semibold px-5 py-2.5 rounded-sm transition-colors ${
            danger
              ? 'bg-govt-red hover:bg-govt-red/90 text-white'
              : 'bg-govt-blue hover:bg-govt-blue-dark text-white'
          }`}
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
