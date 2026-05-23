const variants = {
  primary: 'gold-gradient text-brand-black hover:scale-[1.02] hover:shadow-glow',
  accent: 'bg-brand-red text-white hover:scale-[1.02] hover:shadow-red',
  outline:
    'border border-brand-gold/40 bg-transparent text-brand-gold hover:bg-brand-gold/10 hover:scale-[1.01]',
  ghost: 'bg-brand-surface/50 text-brand-cream hover:bg-brand-navy/60',
  danger: 'bg-brand-error text-white hover:scale-[1.02]',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-3 text-sm sm:text-base',
  lg: 'px-6 py-3.5 text-base',
}

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  disabled = false,
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-300 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />}
      {children}
    </button>
  )
}

export default Button
