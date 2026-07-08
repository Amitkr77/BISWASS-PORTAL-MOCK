export function FormErrorSummary({ show }) {
  if (!show) return null;
  return (
    <p className="form-error-summary bg-govt-red/10 border border-govt-red text-govt-red px-4 py-3 rounded-sm text-sm mb-4" role="alert">
      Please correct the highlighted fields below and resubmit the form.
    </p>
  );
}

export function FormSuccessBox({ show, children }) {
  if (!show) return null;
  return (
    <p className="form-success-box mb-4" tabIndex={-1} role="status">
      {children || 'Thank you. Your submission has been received.'}
    </p>
  );
}
