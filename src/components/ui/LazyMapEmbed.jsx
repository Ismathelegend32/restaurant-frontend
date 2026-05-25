import { useEffect, useRef, useState } from 'react'

const LazyMapEmbed = ({ title, src, className = '', minHeight = 360 }) => {
  const containerRef = useRef(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const node = containerRef.current
    if (!node) return undefined

    if (!('IntersectionObserver' in window)) {
      setShouldLoad(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className={className} style={{ minHeight }}>
      {shouldLoad ? (
        <iframe
          title={title}
          src={src}
          className="h-full w-full border-0"
          style={{ minHeight }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center bg-brand-surface/40 text-sm text-brand-cream/60"
          style={{ minHeight }}
        >
          Khariidada waa la soo rarayaa...
        </div>
      )}
    </div>
  )
}

export default LazyMapEmbed
