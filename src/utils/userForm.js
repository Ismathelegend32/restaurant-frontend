export const validateCreateUserFields = ({ name, email, phoneNumber, password }) => {
  const errors = {}
  if (!name?.trim()) errors.name = 'Magaca waa waajib'
  if (!email?.trim()) errors.email = 'Email waa waajib'
  else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Geli email sax ah'
  if (!phoneNumber?.trim()) errors.phoneNumber = 'Lambarka telefoonka waa waajib'
  else if (phoneNumber.replace(/\D/g, '').length < 7)
    errors.phoneNumber = 'Geli lambarka telefoonka sax ah (ugu yaraan 7 lambar)'
  if (!password?.trim()) errors.password = 'Password waa waajib'
  else if (password.length < 8) errors.password = 'Password-ku ugu yaraan waa inuu ahaadaa 8 xaraf'
  return errors
}

export const validatePasswordField = (password) => {
  if (!password?.trim()) return 'Password waa waajib'
  if (password.length < 8) return 'Password-ku ugu yaraan waa inuu ahaadaa 8 xaraf'
  return null
}

export const formatApiError = (error) => {
  const data = error?.response?.data
  if (data?.errors?.length) return data.errors.join(' • ')
  return data?.message || error?.message || 'Something went wrong'
}
