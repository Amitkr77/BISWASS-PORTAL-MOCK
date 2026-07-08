import { useCallback, useRef, useState } from 'react';

function messageFor(field) {
  const v = field.validity;
  if (v.valid) return '';
  if (v.valueMissing) return 'This field is required.';
  if (v.typeMismatch && field.type === 'email') return 'Please enter a valid email address.';
  if (v.typeMismatch && field.type === 'tel') return 'Please enter a valid phone number.';
  if (v.tooShort) return `Please enter at least ${field.minLength} characters.`;
  if (v.patternMismatch) return field.dataset.patternMessage || 'Please match the requested format.';
  return 'This field is invalid.';
}

/** Generic client-side validation + success/error state for a <form>, mirroring
 *  native HTML5 constraint validation. No backend exists, so a valid submit
 *  just shows a confirmation and resets the form. */
export function useValidatedForm() {
  const formRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showErrorSummary, setShowErrorSummary] = useState(false);

  const handleBlur = useCallback((e) => {
    const field = e.target;
    const key = field.name || field.id;
    setErrors((prev) => ({ ...prev, [key]: messageFor(field) }));
  }, []);

  const handleInput = useCallback((e) => {
    const field = e.target;
    const key = field.name || field.id;
    setErrors((prev) => (prev[key] ? { ...prev, [key]: messageFor(field) } : prev));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const form = formRef.current;
    const fields = Array.from(form.querySelectorAll('input, textarea, select'));
    const nextErrors = {};
    let firstInvalid = null;

    fields.forEach((field) => {
      const message = messageFor(field);
      const key = field.name || field.id;
      nextErrors[key] = message;
      if (message && !firstInvalid) firstInvalid = field;
    });

    setErrors(nextErrors);

    if (firstInvalid) {
      setShowErrorSummary(true);
      setSubmitted(false);
      firstInvalid.focus();
      return;
    }

    setShowErrorSummary(false);
    setSubmitted(true);
    form.reset();
    setErrors({});
  }, []);

  return { formRef, errors, submitted, showErrorSummary, handleBlur, handleInput, handleSubmit };
}
