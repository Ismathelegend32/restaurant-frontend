import { User } from 'lucide-react'
import { optimizeImageUrl } from '../../utils/cloudinaryAssets'

const sizeClasses = {
  sm: 'h-9 w-9 text-sm',
  md: 'h-10 w-10 text-base',
  lg: 'h-14 w-14 text-xl',
  xl: 'h-24 w-24 text-3xl',
}

const UserAvatar = ({ user, size = 'md', className = '' }) => {
  const sizeClass = sizeClasses[size] || sizeClasses.md
  const imageUrl = user?.profileImageUrl?.trim()

  if (imageUrl) {
    return (
      <img
        src={optimizeImageUrl(imageUrl, { width: 128, height: 128, crop: 'fill' })}
        alt={user?.name ? `${user.name} profile` : 'Profile'}
        className={`shrink-0 rounded-full border-2 border-brand-gold/35 object-cover ${sizeClass} ${className}`}
      />
    )
  }

  const initial = user?.name?.trim()?.charAt(0)?.toUpperCase() || null

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full border-2 border-brand-gold/35 bg-brand-gold/15 font-semibold text-brand-gold ${sizeClass} ${className}`}
      aria-hidden={!initial}
    >
      {initial || <User className="h-[45%] w-[45%]" />}
    </div>
  )
}

export default UserAvatar
