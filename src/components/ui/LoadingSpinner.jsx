const LoadingSpinner = ({ label = 'Fadlan sug...' }) => {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-4">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-gold/20 border-t-brand-gold" />
      <p className="text-sm uppercase tracking-[0.25em] text-brand-cream/55">{label}</p>
    </div>
  )
}

export default LoadingSpinner
