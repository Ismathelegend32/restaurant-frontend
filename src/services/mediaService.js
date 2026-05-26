import api, { extractData } from './api'

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

const mediaService = {
  async getCloudinaryStatus() {
    const response = await api.get('/media/cloudinary-status')
    return extractData(response)
  },

  async uploadImage(file) {
    const formData = new FormData()
    formData.append('file', file)

    const response = await api.post('/media/upload-image', formData)
    return extractData(response)
  },

  async uploadProfileImage(file) {
    const formData = new FormData()
    formData.append('file', file)

    const response = await api.post('/media/upload-profile-image', formData)
    return extractData(response)
  },

  async uploadImageDirect(file) {
    if (!cloudName || !uploadPreset) {
      throw new Error(
        'Cloudinary waa la waayay. Hubi backend (Cloudinary:CloudName) ama .env (VITE_CLOUDINARY_CLOUD_NAME, VITE_CLOUDINARY_UPLOAD_PRESET).',
      )
    }

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', uploadPreset)

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    })

    const payload = await response.json()
    if (!response.ok) {
      throw new Error(payload?.error?.message || 'Cloudinary upload failed')
    }

    return { imageUrl: payload.secure_url }
  },
}

export default mediaService
