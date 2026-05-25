let previewHandler = null

export const registerReceiptPreview = (handler) => {
  previewHandler = handler
  return () => {
    if (previewHandler === handler) previewHandler = null
  }
}

export const openReceiptPreview = (order, payment) => {
  if (!previewHandler) return false
  previewHandler({ order, payment })
  return true
}

export const isMobileDevice = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia('(max-width: 1023px)').matches ||
    window.matchMedia('(hover: none) and (pointer: coarse)').matches)
