const IconInput = ({
  id,
  icon: Icon,
  trailing,
  error,
  className = '',
  ...props
}) => (
  <div
    className={`input-icon-field ${trailing ? 'input-icon-field--trailing' : ''} ${
      error ? 'border-brand-error/60 focus-within:border-brand-error focus-within:ring-brand-error/25' : ''
    } ${className}`}
  >
    {Icon && (
      <span className="input-icon-wrap" aria-hidden>
        <Icon className="input-icon" />
      </span>
    )}
    <input id={id} className="input-icon-control" {...props} />
    {trailing && <span className="input-trailing-wrap">{trailing}</span>}
  </div>
)

export default IconInput
