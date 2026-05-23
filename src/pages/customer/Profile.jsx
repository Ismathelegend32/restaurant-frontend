import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import { useAuth } from '../../hooks/useAuth'
import { roleLabels, STORAGE_KEYS, neighborhoods } from '../../utils/constants'

const Profile = () => {
  const { user, updateLocalProfile } = useAuth()
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    favoriteNeighborhood: neighborhoods[0],
  })

  useEffect(() => {
    const draft = localStorage.getItem(STORAGE_KEYS.profileDraft)
    if (draft) {
      setForm((current) => ({ ...current, ...JSON.parse(draft) }))
    }
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    localStorage.setItem(STORAGE_KEYS.profileDraft, JSON.stringify(form))
    updateLocalProfile({ name: form.name })
    toast.success('Doorashooyinka profile-ka waa la kaydiyay')
  }

  return (
    <div className="container-shell grid gap-6 py-10 lg:grid-cols-[0.7fr_1.3fr]">
      <Card className="p-6">
        <p className="text-sm uppercase tracking-[0.35em] text-brand-gold">Profile-ka</p>
        <h1 className="mt-3 text-3xl">{user?.name}</h1>
        <p className="mt-2 text-brand-cream/65">{user?.email}</p>
        <p className="mt-2 rounded-full bg-brand-gold/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-brand-gold">
          {roleLabels[user?.role] || user?.role}
        </p>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl">Wax Ka Beddel Doorashooyinka Profile-ka</h2>
        <p className="mt-2 text-sm text-brand-cream/65">
          Kaydi magaca aad rabto iyo degmada aad doorbidayso si dalabku u fududaado.
        </p>
        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
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

          <Button type="submit">Kaydi Doorashooyinka</Button>
        </form>
      </Card>
    </div>
  )
}

export default Profile
