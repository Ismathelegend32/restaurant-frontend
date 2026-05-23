import { KeyRound, Plus, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import Modal from '../../components/ui/Modal'
import userService from '../../services/userService'
import { roleLabels } from '../../utils/constants'
import { formatDate } from '../../utils/formatDate'
import { validateCreateUserFields, validatePasswordField } from '../../utils/userForm'

const roles = ['Customer', 'Cashier', 'KitchenStaff']

const defaultForm = {
  name: '',
  email: '',
  phoneNumber: '',
  password: '',
  role: 'Customer',
}

const ManageUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(defaultForm)
  const [formErrors, setFormErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [passwordUser, setPasswordUser] = useState(null)
  const [newPassword, setNewPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordSubmitting, setPasswordSubmitting] = useState(false)

  const loadUsers = async () => {
    try {
      setLoading(true)
      const data = await userService.getAll()
      setUsers(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const handleRoleChange = async (id, role) => {
    try {
      await userService.updateRole(id, role)
      toast.success('Doorka isticmaalaha waa la cusboonaysiiyay')
      await loadUsers()
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    const nextErrors = validateCreateUserFields(form)
    setFormErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    try {
      setSubmitting(true)
      await userService.create(form)
      toast.success('Isticmaalaha si guul leh ayaa loo sameeyay')
      setForm(defaultForm)
      setFormErrors({})
      setOpen(false)
      await loadUsers()
    } catch (error) {
      toast.error(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handlePasswordUpdate = async (event) => {
    event.preventDefault()
    const error = validatePasswordField(newPassword)
    setPasswordError(error || '')
    if (error || !passwordUser) return

    try {
      setPasswordSubmitting(true)
      await userService.updatePassword(passwordUser.id, newPassword)
      toast.success('Password-ka isticmaalaha waa la cusboonaysiiyay')
      setPasswordUser(null)
      setNewPassword('')
      setPasswordError('')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setPasswordSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await userService.remove(id)
      toast.success('Isticmaalaha waa la saaray')
      await loadUsers()
    } catch (error) {
      toast.error(error.message)
    }
  }

  if (loading) return <LoadingSpinner label="Waxaa la soo rarayaa isticmaaleyaasha" />

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.25em] text-brand-gold sm:text-sm sm:tracking-[0.35em]">
            Isticmaaleyaasha Maamulka
          </p>
          <h1 className="section-title mt-2 break-words text-2xl sm:text-3xl lg:text-4xl">
            Maamul isticmaaleyaasha iyo shaqaalaha
          </h1>
        </div>
        <Button onClick={() => setOpen(true)} className="w-full shrink-0 sm:w-auto">
          <Plus size={16} />
          Ku Dar Isticmaale
        </Button>
      </div>

      {!users.length && (
        <Card className="p-8 text-center text-brand-cream/70">Weli isticmaale lama helin.</Card>
      )}

      {!!users.length && (
        <>
          <div className="grid gap-4 lg:hidden">
            {users.map((user) => (
              <Card key={user.id} className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-lg font-semibold text-white">{user.name}</p>
                    <p className="mt-1 break-all text-sm text-brand-cream/65">{user.email}</p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setPasswordUser(user)
                        setNewPassword('')
                        setPasswordError('')
                      }}
                      className="rounded-full border border-brand-gold/30 p-2 text-brand-gold"
                      aria-label="Beddel password"
                    >
                      <KeyRound size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(user.id)}
                      className="rounded-full border border-brand-error/30 p-2 text-brand-error"
                      aria-label="Tirtir isticmaale"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 text-sm">
                  <div>
                    <p className="text-brand-cream/50">Telefoon</p>
                    <p className="mt-1 font-medium text-white">{user.phoneNumber || 'Ma jiro'}</p>
                  </div>
                  <div>
                    <p className="text-brand-cream/50">La sameeyay</p>
                    <p className="mt-1 font-medium text-white">{formatDate(user.createdAt)}</p>
                  </div>
                  <div>
                    <p className="mb-2 text-brand-cream/50">Door</p>
                    {user.role === 'Admin' ? (
                      <span className="inline-flex rounded-full bg-brand-gold/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-brand-gold">
                        {roleLabels[user.role] || user.role}
                      </span>
                    ) : (
                      <select
                        value={user.role}
                        onChange={(event) => handleRoleChange(user.id, event.target.value)}
                        className="w-full"
                      >
                        {roles.map((role) => (
                          <option key={role} value={role} className="bg-brand-surface text-white">
                            {roleLabels[role] || role}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="hidden overflow-x-auto p-4 sm:p-6 lg:block">
            <table className="min-w-full text-left text-sm">
              <thead className="text-brand-cream/55">
                <tr>
                  <th className="pb-4">Isticmaale</th>
                  <th className="pb-4">Email</th>
                  <th className="pb-4">Telefoon</th>
                  <th className="pb-4">Door</th>
                  <th className="pb-4">La Sameeyay</th>
                  <th className="pb-4">Ficillo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-gold/10">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="py-4 font-medium text-white">{user.name}</td>
                    <td className="py-4 text-brand-cream/75">{user.email}</td>
                    <td className="py-4 text-brand-cream/75">{user.phoneNumber || 'Ma jiro'}</td>
                    <td className="py-4">
                      {user.role === 'Admin' ? (
                        <span className="rounded-full bg-brand-gold/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-brand-gold">
                          {roleLabels[user.role] || user.role}
                        </span>
                      ) : (
                        <select
                          value={user.role}
                          onChange={(event) => handleRoleChange(user.id, event.target.value)}
                          className="max-w-[180px]"
                        >
                          {roles.map((role) => (
                            <option key={role} value={role} className="bg-brand-surface text-white">
                              {roleLabels[role] || role}
                            </option>
                          ))}
                        </select>
                      )}
                    </td>
                    <td className="py-4 text-brand-cream/75">{formatDate(user.createdAt)}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setPasswordUser(user)
                            setNewPassword('')
                            setPasswordError('')
                          }}
                          className="text-brand-gold"
                          aria-label="Beddel password"
                        >
                          <KeyRound size={18} />
                        </button>
                        <button onClick={() => handleDelete(user.id)} className="text-brand-error">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </>
      )}

      <Modal
        isOpen={open}
        onClose={() => {
          setOpen(false)
          setFormErrors({})
        }}
        title="Samee Macmiil ama Shaqaale"
      >
        <form className="space-y-5" onSubmit={handleCreate}>
          <div>
            <label className="field-label">Magaca oo Dhan</label>
            <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
            {formErrors.name && <p className="mt-2 text-sm text-brand-error">{formErrors.name}</p>}
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="field-label">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
              />
              {formErrors.email && <p className="mt-2 text-sm text-brand-error">{formErrors.email}</p>}
            </div>
            <div>
              <label className="field-label">Lambarka Telefoonka</label>
              <input
                type="tel"
                value={form.phoneNumber}
                onChange={(event) => setForm({ ...form, phoneNumber: event.target.value })}
                placeholder="612344432 ama +252..."
              />
              {formErrors.phoneNumber && (
                <p className="mt-2 text-sm text-brand-error">{formErrors.phoneNumber}</p>
              )}
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="field-label">Password</label>
              <input
                type="password"
                value={form.password}
                minLength={8}
                onChange={(event) => setForm({ ...form, password: event.target.value })}
                placeholder="Ugu yaraan 8 xaraf"
              />
              {formErrors.password && <p className="mt-2 text-sm text-brand-error">{formErrors.password}</p>}
            </div>
            <div>
              <label className="field-label">Doorka</label>
              <select value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })}>
                {roles.map((role) => (
                  <option key={role} value={role} className="bg-brand-surface text-white">
                    {roleLabels[role] || role}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <Button type="submit" loading={submitting}>
            Samee Isticmaale
          </Button>
        </form>
      </Modal>

      <Modal
        isOpen={Boolean(passwordUser)}
        onClose={() => {
          setPasswordUser(null)
          setNewPassword('')
          setPasswordError('')
        }}
        title={passwordUser ? `Beddel Password — ${passwordUser.name}` : 'Beddel Password'}
      >
        <form className="space-y-5" onSubmit={handlePasswordUpdate}>
          <div>
            <label className="field-label">Password Cusub</label>
            <input
              type="password"
              value={newPassword}
              minLength={8}
              onChange={(event) => setNewPassword(event.target.value)}
              placeholder="Ugu yaraan 8 xaraf"
            />
            {passwordError && <p className="mt-2 text-sm text-brand-error">{passwordError}</p>}
          </div>
          <Button type="submit" loading={passwordSubmitting}>
            Kaydi Password-ka
          </Button>
        </form>
      </Modal>
    </div>
  )
}

export default ManageUsers
