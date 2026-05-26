import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import ImageUploadField from '../components/ui/ImageUploadField'
import UserAvatar from '../components/ui/UserAvatar'
import { useAuth } from '../hooks/useAuth'
import authService from '../services/authService'
import mediaService from '../services/mediaService'
import { roleDashboardPaths, roleLabels, STORAGE_KEYS, neighborhoods } from '../utils/constants'

const Profile = ({ staffMode = false }) => {
  const { user, updateLocalProfile, refreshProfile } = useAuth()
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    profileImageUrl: user?.profileImageUrl || '',
    favoriteNeighborhood: neighborhoods[0],
  })
  const [uploadingImage, setUploadingImage] = useState(false)
  const [saving, setSaving] = useState(false)

  const backPath = staffMode
    ? roleDashboardPaths[user?.role] || '/staff'
    : '/dashboard'

  useEffect(() => {
    if (user) {
      setForm((current) => ({
        ...current,
        name: user.name || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        profileImageUrl: user.profileImageUrl || '',
      }))
    }
  }, [user])

  useEffect(() => {
    if (staffMode) return
    const draft = localStorage.getItem(STORAGE_KEYS.profileDraft)
    if (draft) {
      try {
        const parsed = JSON.parse(draft)
        setForm((current) => ({ ...current, ...parsed }))
      } catch {
        localStorage.removeItem(STORAGE_KEYS.profileDraft)
      }
    }
  }, [staffMode])

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setUploadingImage(true)
      let imageUrl
      try {
        const result = await mediaService.uploadProfileImage(file)
        imageUrl = result.imageUrl
      } catch {
        const result = await mediaService.uploadImageDirect(file)
        imageUrl = result.imageUrl
      }

      const updated = await authService.updateProfile({ profileImageUrl: imageUrl })
      setForm((current) => ({ ...current, profileImageUrl: imageUrl }))
      updateLocalProfile(updated)
      await refreshProfile()
      toast.success('Sawirka profile-ka waa la kaydiyay')
    } catch (error) {
      toast.error(error.message || 'Sawirka lama soo rarin')
    } finally {
      setUploadingImage(false)
      event.target.value = ''
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      setSaving(true)
      const updated = await authService.updateProfile({
        name: form.name.trim(),
        profileImageUrl: form.profileImageUrl || '',
      })

      updateLocalProfile(updated)
      await refreshProfile()

      if (!staffMode) {
        localStorage.setItem(
          STORAGE_KEYS.profileDraft,
          JSON.stringify({
            name: form.name,
            favoriteNeighborhood: form.favoriteNeighborhood,
          }),
        )
      }

      toast.success('Profile-ka waa la cusboonaysiiyay')
    } catch (error) {
      toast.error(error.message || 'Profile lama kaydin')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className={staffMode ? 'space-y-6' : 'container-shell grid gap-6 py-10 lg:grid-cols-[0.85fr_1.15fr]'}>
      <Card className={staffMode ? 'p-6' : 'p-6'}>
        <p className="text-sm uppercase tracking-[0.35em] text-brand-gold">Profile-ka</p>
        <div className="mt-6 flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left sm:gap-6">
          <UserAvatar user={form} size="xl" />
          <div className="mt-4 min-w-0 sm:mt-0">
            <h1 className="text-2xl font-semibold text-white sm:text-3xl">{user?.name}</h1>
            <p className="mt-1 truncate text-brand-cream/65">{user?.email}</p>
            <p className="mt-2 inline-block rounded-full bg-brand-gold/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-brand-gold">
              {roleLabels[user?.role] || user?.role}
            </p>
          </div>
        </div>
        <Link
          to={backPath}
          className="mt-6 inline-block text-sm font-medium text-brand-gold hover:text-white"
        >
          ← Ku noqo dashboard-ka
        </Link>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl">Sawirka & Magaca</h2>
        <p className="mt-2 text-sm text-brand-cream/65">
          Sawirka halkan wuxuu ka muuqan doonaa kor midig (navbar) iyo qaybta shaqada.
        </p>

        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="field-label">Sawirka Profile-ka</label>
            <ImageUploadField
              imageUrl={form.profileImageUrl}
              uploading={uploadingImage}
              onFileSelect={handleImageUpload}
              onClear={async () => {
                try {
                  setSaving(true)
                  const updated = await authService.updateProfile({ profileImageUrl: '' })
                  setForm((current) => ({ ...current, profileImageUrl: '' }))
                  updateLocalProfile(updated)
                  await refreshProfile()
                  toast.success('Sawirka waa la tirtiray')
                } catch (error) {
                  toast.error(error.message)
                } finally {
                  setSaving(false)
                }
              }}
            />
          </div>

          <div>
            <label className="field-label">Magaca Lagu Muujinayo</label>
            <input
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
            />
          </div>

          <div>
            <label className="field-label">Email</label>
            <input value={form.email} disabled />
          </div>

          <div>
            <label className="field-label">Lambarka Telefoonka</label>
            <input value={form.phoneNumber} disabled />
          </div>

          {!staffMode && (
            <div>
              <label className="field-label">Degmada Aad Doorbidayso</label>
              <select
                value={form.favoriteNeighborhood}
                onChange={(event) =>
                  setForm({ ...form, favoriteNeighborhood: event.target.value })
                }
              >
                {neighborhoods.map((item) => (
                  <option key={item} value={item} className="bg-brand-surface text-white">
                    {item}
                  </option>
                ))}
              </select>
            </div>
          )}

          <Button type="submit" loading={saving} className="w-full sm:w-auto">
            Kaydi Profile-ka
          </Button>
        </form>
      </Card>
    </div>
  )
}

export default Profile
