const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME?.trim() || 'duzuguldp'

const buildTransforms = ({ width, height, crop = 'fill', quality = 'auto' } = {}) => {
  const parts = ['f_auto', `q_${quality}`]
  if (width) parts.push(`w_${width}`)
  if (height) parts.push(`h_${height}`)
  if (width || height) parts.push(`c_${crop}`)
  return parts.join(',')
}

/** Uploaded assets in Cloudinary (new-jubba/static/...) */
export const cloudinaryImage = (publicId, options = {}) => {
  const transforms = buildTransforms(options)
  const id = publicId.replace(/^\//, '')
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms}/${id}`
}

/** Optimize remote URLs through Cloudinary CDN (WebP/AVIF, resize) */
export const cloudinaryFetch = (remoteUrl, options = {}) => {
  const transforms = buildTransforms(options)
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/fetch/${transforms}/${encodeURIComponent(remoteUrl)}`
}

export const brandLogoUrl = cloudinaryImage('new-jubba/static/new-jubba-logo', {
  width: 128,
  height: 128,
  crop: 'fill',
})

export const brandLogoUrlSmall = cloudinaryImage('new-jubba/static/new-jubba-logo', {
  width: 48,
  height: 48,
  crop: 'fill',
})

export const brandFaviconUrl = cloudinaryImage('new-jubba/static/new-jubba-logo', {
  width: 32,
  height: 32,
  crop: 'fill',
})

const heroRemote =
  'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1800&q=80'

const heroSideRemote =
  'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80'

const menuHeroRemote =
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1800&q=80'

export const homeHeroBackground = cloudinaryFetch(heroRemote, { width: 1400, crop: 'fill' })
export const homeHeroSideImage = cloudinaryFetch(heroSideRemote, { width: 800, crop: 'fill' })
export const menuPageHeroBackground = cloudinaryFetch(menuHeroRemote, { width: 1400, crop: 'fill' })

export const buildResponsiveSrcSet = (remoteUrl, widths = [480, 800, 1200]) =>
  widths.map((width) => `${cloudinaryFetch(remoteUrl, { width, crop: 'fill' })} ${width}w`).join(', ')

export const homeHeroSrcSet = buildResponsiveSrcSet(heroRemote, [480, 800, 1200])
export const homeHeroDefault = cloudinaryFetch(heroRemote, { width: 800, crop: 'fill' })
export const menuHeroSrcSet = buildResponsiveSrcSet(menuHeroRemote, [480, 800, 1200])
export const menuHeroDefaultSrc = cloudinaryFetch(menuHeroRemote, { width: 800, crop: 'fill' })

export const optimizeImageUrl = (url, options = {}) => {
  if (!url) return url

  const transforms = buildTransforms({ width: 640, crop: 'fill', ...options })

  if (url.includes('res.cloudinary.com') && url.includes('/image/upload/')) {
    const marker = '/image/upload/'
    const index = url.indexOf(marker)
    const prefix = url.slice(0, index + marker.length)
    const suffix = url.slice(index + marker.length)
    if (suffix.startsWith('f_auto')) return url
    return `${prefix}${transforms}/${suffix}`
  }

  if (/^https?:\/\//.test(url)) return cloudinaryFetch(url, options)

  return url
}

export const brandLogoUrlLarge = cloudinaryImage('new-jubba/static/new-jubba-logo', {
  width: 256,
  height: 256,
  crop: 'fill',
})

export const homeGalleryImages = [
  cloudinaryFetch(
    'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80',
    { width: 400, crop: 'fill' },
  ),
  cloudinaryFetch(
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80',
    { width: 400, crop: 'fill' },
  ),
  cloudinaryFetch(
    'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80',
    { width: 400, crop: 'fill' },
  ),
]

const menuFallbackRemotes = [
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80',
]

export const menuFallbackImageUrls = menuFallbackRemotes.map((url) =>
  cloudinaryFetch(url, { width: 640, crop: 'fill' }),
)
