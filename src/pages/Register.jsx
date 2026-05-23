import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/new-jubba-logo.png'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import { useAuth } from '../hooks/useAuth'
import { STORAGE_KEYS } from '../utils/constants'

const Register = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const { register, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEYS.registerDraft)
    if (raw) {
      setValues((current) => ({ ...current, ...JSON.parse(raw) }))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.registerDraft, JSON.stringify(values))
  }, [values])

  const validate = () => {
    const nextErrors = {}
    if (!values.name.trim()) nextErrors.name = 'Magaca waa waajib'
    if (!values.email.trim()) nextErrors.email = 'Email waa waajib'
    if (!/\S+@\S+\.\S+/.test(values.email)) nextErrors.email = 'Geli email sax ah'
    if (!values.phoneNumber.trim()) nextErrors.phoneNumber = 'Lambarka telefoonka waa waajib'
    if (!values.password.trim()) nextErrors.password = 'Password waa waajib'
    if (values.password.length < 8) nextErrors.password = 'Password-ku ugu yaraan waa inuu ahaadaa 8 xaraf'
    if (values.password !== values.confirmPassword)
      nextErrors.confirmPassword = 'Labada password isma laha'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!validate()) return
    const route = await register({
      name: values.name,
      email: values.email,
      phoneNumber: values.phoneNumber,
      password: values.password,
    })
    localStorage.removeItem(STORAGE_KEYS.registerDraft)
    navigate(route)
  }

  return (
    <div className="container-shell flex min-h-[80vh] items-center justify-center py-12">
      <Card className="w-full max-w-5xl overflow-hidden">
        <div className="grid lg:grid-cols-[1fr_1fr]">
          <div className="hidden bg-[radial-gradient(circle_at_top,_rgba(201,168,76,0.28),_transparent_50%),_linear-gradient(180deg,_rgba(45,45,45,1),_rgba(26,26,26,1))] p-10 lg:block">
            <img src={logo} alt="New Jubba Restaurant" className="mx-auto h-64 w-64 rounded-full object-cover shadow-glow" />
            <h2 className="mt-8 text-center text-4xl">Ku Biir New Jubba</h2>
            <p className="mt-4 text-center text-sm leading-7 text-brand-cream/65">
              Samee akoonkaaga macmiilnimo si aad u dalbato, ula socoto gaarsiinta, oo aad
              uga faa'iidaysato waayo-aragnimo makhaayadeed oo heer sare ah.
            </p>
          </div>

          <div className="p-8 sm:p-10">
            <p className="text-sm uppercase tracking-[0.35em] text-brand-gold">Isdiiwaangelinta Macmiilka</p>
            <h1 className="mt-3 text-4xl">Samee akoonkaaga</h1>

            <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
              <div>
                <label className="field-label">Magaca oo Dhan</label>
                <input
                  value={values.name}
                  onChange={(event) => setValues({ ...values, name: event.target.value })}
                  placeholder="Magacaaga oo dhan"
                />
                {errors.name && <p className="mt-2 text-sm text-brand-error">{errors.name}</p>}
              </div>

              <div>
                <label className="field-label">Email</label>
                <input
                  type="email"
                  value={values.email}
                  onChange={(event) => setValues({ ...values, email: event.target.value })}
                  placeholder="you@example.com"
                />
                {errors.email && <p className="mt-2 text-sm text-brand-error">{errors.email}</p>}
              </div>

              <div>
                <label className="field-label">Lambarka Telefoonka</label>
                <input
                  type="tel"
                  value={values.phoneNumber}
                  onChange={(event) => setValues({ ...values, phoneNumber: event.target.value })}
                  placeholder="+252 61 234 5678"
                />
                {errors.phoneNumber && (
                  <p className="mt-2 text-sm text-brand-error">{errors.phoneNumber}</p>
                )}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                <label className="field-label">Password</label>
                  <input
                    type="password"
                    value={values.password}
                    onChange={(event) => setValues({ ...values, password: event.target.value })}
                    placeholder="Ugu yaraan 8 xaraf"
                  />
                  {errors.password && (
                    <p className="mt-2 text-sm text-brand-error">{errors.password}</p>
                  )}
                </div>

                <div>
                  <label className="field-label">Xaqiiji Password-ka</label>
                  <input
                    type="password"
                    value={values.confirmPassword}
                    onChange={(event) =>
                      setValues({ ...values, confirmPassword: event.target.value })
                    }
                    placeholder="Ku celi password-ka"
                  />
                  {errors.confirmPassword && (
                    <p className="mt-2 text-sm text-brand-error">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>

              <Button type="submit" className="w-full" loading={loading}>
                Samee Akoon
              </Button>
            </form>

            <p className="mt-5 text-sm text-brand-cream/65">
              Haddii aad hore akoon u lahayd?{' '}
              <Link to="/login" className="font-semibold text-brand-gold">
                Soo gal
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Register
