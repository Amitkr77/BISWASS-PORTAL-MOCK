export default function FormField({
  as = 'input',
  id,
  name,
  label,
  type = 'text',
  required,
  error,
  onBlur,
  onInput,
  rows,
  children,
  ...rest
}) {
  const Tag = as;
  return (
    <div>
      <label htmlFor={id} className="form-label">
        {label}{required && <span aria-hidden="true"> *</span>}
      </label>
      <Tag
        id={id}
        name={name || id}
        type={as === 'input' ? type : undefined}
        rows={as === 'textarea' ? rows || 4 : undefined}
        defaultValue={as === 'select' ? '' : undefined}
        required={required}
        className="form-input"
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        onBlur={onBlur}
        onInput={onInput}
        {...rest}
      >
        {as === 'select' ? children : undefined}
      </Tag>
      <p id={`${id}-error`} className={`form-error ${error ? '' : 'hidden'}`}>{error}</p>
    </div>
  );
}
