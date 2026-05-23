const Badge = ({ children, className = '' }) => {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-brand-gold/20 bg-brand-surface/70 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-brand-cream/65 ${className}`}
    >
      {children}
    </span>
  )
}

export default Badge
