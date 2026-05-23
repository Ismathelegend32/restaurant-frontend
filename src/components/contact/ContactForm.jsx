import { MessageCircle, Phone, Send, User } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import Button from '../ui/Button'
import IconInput from '../ui/IconInput'
import staticFormsService from '../../services/staticFormsService'
import { restaurantContact, whatsappUrl } from '../../utils/constants'

const initialForm = {
  name: '',
  phone: '',
  subject: '',
  message: '',
}

const ContactForm = ({ className = '' }) => {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }))
    setErrors((current) => ({ ...current, [field]: '' }))
  }

  const validate = () => {
    const next = {}

    if (!form.name.trim()) next.name = 'Magaca waa lagama maarmaan'
    if (!form.phone.trim()) {
      next.phone = 'Telefoonka waa lagama maarmaan'
    } else if (form.phone.trim().length < 7) {
      next.phone = 'Telefoon sax ah geli'
    }
    if (!form.subject.trim()) next.subject = 'Mawduuca waa lagama maarmaan'
    if (!form.message.trim()) next.message = 'Fariinta waa lagama maarmaan'

    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!validate()) return

    try {
      setSending(true)
      await staticFormsService.submitContact({
        name: form.name.trim(),
        phone: form.phone.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
      })
      toast.success('Fariinta waa la diray! Waad ku mahadsan tahay.')
      setForm(initialForm)
    } catch (error) {
      toast.error(error.message || 'Fariinta lama diri karin')
    } finally {
      setSending(false)
    }
  }

  return (
    <form className={`space-y-5 ${className}`} onSubmit={handleSubmit} noValidate>
      <Field label="Magacaaga" id="contact-name" error={errors.name}>
        <IconInput
          id="contact-name"
          name="name"
          value={form.name}
          onChange={updateField('name')}
          placeholder="Tusaale: Ismacil Dahir"
          icon={User}
          error={errors.name}
        />
      </Field>

      <Field label="Telefoonkaaga" id="contact-phone" error={errors.phone}>
        <IconInput
          id="contact-phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={updateField('phone')}
          placeholder="+252 61 XXX XXXX"
          icon={Phone}
          error={errors.phone}
        />
      </Field>

      <Field label="Mawduuca" id="contact-subject" error={errors.subject}>
        <IconInput
          id="contact-subject"
          name="subject"
          value={form.subject}
          onChange={updateField('subject')}
          placeholder="Tusaale: Dalab gaar ah, su'aal..."
          icon={MessageCircle}
          error={errors.subject}
        />
      </Field>

      <Field label="Fariinta" id="contact-message" error={errors.message}>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={form.message}
          onChange={updateField('message')}
          placeholder="Qor fariintaada halkan..."
          className={errors.message ? 'border-brand-error/60' : ''}
        />
      </Field>

      <Button type="submit" className="w-full justify-center py-3.5" loading={sending}>
        <Send size={16} />
        Dir Fariinta
      </Button>

      <p className="text-center text-xs leading-6 text-brand-cream/50">
        Waxaa laguugu soo celin doonaa{' '}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-gold hover:underline"
        >
          {restaurantContact.whatsapp.display}
        </a>{' '}
        ama {restaurantContact.email}
      </p>
    </form>
  )
}

const Field = ({ label, id, error, children }) => (
  <div className="space-y-2">
    <label htmlFor={id} className="field-label">
      {label}
    </label>
    {children}
    {error && (
      <p className="text-sm text-brand-error" role="alert">
        {error}
      </p>
    )}
  </div>
)

export default ContactForm
