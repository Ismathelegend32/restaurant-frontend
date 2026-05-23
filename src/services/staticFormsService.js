const API_KEY = import.meta.env.VITE_STATIC_FORMS_API_KEY

const getSubmitUrl = () =>
  import.meta.env.DEV ? '/api/staticforms/submit' : 'https://api.staticforms.dev/submit'

const staticFormsService = {
  async submitContact({ name, phone, subject, message }) {
    if (!API_KEY) {
      throw new Error('Static Forms API key lama helin (.env → VITE_STATIC_FORMS_API_KEY)')
    }

    const body = new FormData()
    body.append('apiKey', API_KEY)
    body.append('name', name)
    body.append('phone', phone)
    body.append('subject', subject)
    body.append('message', message)
    body.append('botcheck', '')

    const response = await fetch(getSubmitUrl(), {
      method: 'POST',
      body,
    })

    let payload = {}
    try {
      payload = await response.json()
    } catch {
      // Static Forms sometimes returns empty body on success
    }

    if (!response.ok) {
      throw new Error(payload?.message || payload?.error || 'Fariinta lama diri karin')
    }

    return payload
  },
}

export default staticFormsService
