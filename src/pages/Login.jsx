import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  UtensilsCrossed,
} from 'lucide-react'
import logo from '../assets/new-jubba-logo.png'
import Button from '../components/ui/Button'
import IconInput from '../components/ui/IconInput'
import { useAuth } from '../hooks/useAuth'

const highlights = [
  { icon: UtensilsCrossed, label: 'Dalbo & la soco dalabyadaada' },
  { icon: ShieldCheck, label: 'Xogtaada waa la ilaaliyaa' },
]

const AuthField = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  icon,
  trailing,
}) => (
  <div className="space-y-2">
    <label htmlFor={id} className="field-label">
      {label}
    </label>
    <IconInput
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      icon={icon}
      error={error}
      trailing={trailing}
      autoComplete={id === 'password' ? 'current-password' : 'email'}
    />
    {error && (
      <p className="text-sm text-brand-error" role="alert">
        {error}
      </p>
    )}
  </div>
)

const Login = () => {
  const [values, setValues] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const { login, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const validate = () => {
    const nextErrors = {}
    if (!values.email.trim()) nextErrors.email = 'Email waa waajib'
    if (!values.password.trim()) nextErrors.password = 'Password waa waajib'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!validate()) return

    const fallback = location.state?.from || '/'
    const route = await login(values)
    navigate(route || fallback)
  }

  return (
    <div className="relative flex min-h-[calc(100vh-10rem)] items-center justify-center overflow-hidden py-10 sm:py-14">
      <div
        className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-brand-gold/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-1/4 h-64 w-64 rounded-full bg-brand-red/10 blur-3xl"
        aria-hidden
      />

      <div className="container-shell relative z-10 w-full max-w-5xl animate-fadeIn">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-brand-navy/30 shadow-card backdrop-blur-2xl">
          <div className="grid lg:grid-cols-[1.05fr_1fr]">
            <div className="relative hidden overflow-hidden bg-[radial-gradient(ellipse_at_20%_0%,rgba(251,192,45,0.22),transparent_55%),radial-gradient(ellipse_at_80%_100%,rgba(183,28,28,0.12),transparent_50%),linear-gradient(165deg,rgba(55,71,79,0.95)_0%,rgba(38,50,56,1)_100%)] p-10 lg:flex lg:flex-col lg:justify-between">
              <div className="pointer-events-none absolute inset-0 opacity-30 hero-grid" aria-hidden />
              <div className="relative">
                <p className="inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
                  <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  New Jubba
                </p>
                <div className="mt-10 flex justify-center">
                  <div className="relative">
                    <div
                      className="absolute -inset-3 rounded-full bg-brand-gold/20 blur-xl"
                      aria-hidden
                    />
                    <img
                      src={logo}
                      alt="New Jubba Restaurant"
                      className="relative h-44 w-44 rounded-full border-4 border-white/15 object-cover shadow-glow animate-float"
                    />
                  </div>
                </div>
                <h2 className="mt-8 text-center text-3xl leading-tight">
                  Makhaayad casri ah,
                  <span className="mt-1 block brand-gradient-text">waayo-aragnimo heer sare ah</span>
                </h2>
              </div>

              <ul className="relative mt-10 space-y-4">
                {highlights.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-brand-cream/90 backdrop-blur-sm"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-gold/15 text-brand-gold">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    {label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-white/8 bg-brand-black/40 p-8 sm:p-10 lg:border-t-0 lg:border-l lg:border-white/8">
              <div className="mb-8 flex items-center gap-4 lg:hidden">
                <img
                  src={logo}
                  alt=""
                  className="h-14 w-14 shrink-0 rounded-full border-2 border-brand-gold/30 object-cover"
                />
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold">
                    New Jubba
                  </p>
                  <p className="text-sm text-brand-cream/70">Restaurant</p>
                </div>
              </div>

              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-gold">
                Ku soo laabo
              </p>
              <h1 className="mt-3 font-heading text-4xl tracking-tight sm:text-[2.75rem]">
                Gal koontadaada
              </h1>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-brand-cream/70">
                Si ammaan ah uga gal koontadaada, dalabyadaada, iyo qaybaha maamulka.
              </p>

              <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
                <AuthField
                  id="email"
                  label="Email"
                  type="email"
                  value={values.email}
                  onChange={(event) => setValues({ ...values, email: event.target.value })}
                  placeholder="adiga@example.com"
                  error={errors.email}
                  icon={Mail}
                />

                <AuthField
                  id="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={(event) => setValues({ ...values, password: event.target.value })}
                  placeholder="Geli password-kaaga"
                  error={errors.password}
                  icon={Lock}
                  trailing={
                    <button
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                      className="input-action rounded-lg p-1.5 text-brand-cream/50 transition hover:bg-white/5 hover:text-brand-gold"
                      aria-label={showPassword ? 'Qari password-ka' : 'Muuji password-ka'}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" aria-hidden />
                      ) : (
                        <Eye className="h-4 w-4" aria-hidden />
                      )}
                    </button>
                  }
                />

                <Button type="submit" className="mt-2 w-full" size="lg" loading={loading}>
                  Soo gal
                </Button>
              </form>

              <p className="mt-8 border-t border-white/8 pt-6 text-center text-sm text-brand-cream/65">
                Ma ku cusub tahay?{' '}
                <Link
                  to="/register"
                  className="font-semibold text-brand-gold underline-offset-4 transition hover:text-amber-200 hover:underline"
                >
                  Samee akoon
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
