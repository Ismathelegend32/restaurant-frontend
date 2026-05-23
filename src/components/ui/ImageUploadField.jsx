import { ImagePlus, Loader2, Upload } from 'lucide-react'
import { useRef } from 'react'

const ImageUploadField = ({ imageUrl, uploading, onFileSelect, onClear }) => {
  const inputRef = useRef(null)

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={onFileSelect}
        disabled={uploading}
      />

      {imageUrl ? (
        <div className="relative overflow-hidden rounded-3xl border border-brand-gold/25 bg-brand-surface/20">
          <img src={imageUrl} alt="Preview" className="h-48 w-full object-cover" />
          <div className="absolute inset-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/70 to-transparent p-4">
            <p className="truncate text-xs text-brand-cream/90">Cloudinary ✓</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={uploading}
                className="rounded-full bg-brand-gold px-3 py-1.5 text-xs font-semibold text-brand-black"
              >
                Beddel
              </button>
              {onClear && (
                <button
                  type="button"
                  onClick={onClear}
                  className="rounded-full border border-white/30 px-3 py-1.5 text-xs text-white"
                >
                  Saar
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="upload-zone w-full"
        >
          {uploading ? (
            <Loader2 className="animate-spin text-brand-gold" size={36} />
          ) : (
            <ImagePlus className="text-brand-gold" size={40} />
          )}
          <div>
            <p className="font-semibold text-white">
              {uploading ? 'Waxaa la soo rarayaa Cloudinary...' : 'Guji si aad u doorato sawir'}
            </p>
            <p className="mt-1 text-xs text-brand-cream/60">
              Ka soo rar kombiyuutarkaaga — JPEG, PNG, WebP (5MB)
            </p>
          </div>
          {!uploading && (
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-gold/40 bg-brand-gold/10 px-4 py-2 text-xs font-semibold text-brand-gold">
              <Upload size={14} />
              Dooro Fayl
            </span>
          )}
        </button>
      )}
    </div>
  )
}

export default ImageUploadField
