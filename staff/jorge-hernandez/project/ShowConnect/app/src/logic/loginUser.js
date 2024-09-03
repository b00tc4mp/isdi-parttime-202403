import errors, { CredentialsError, SystemError } from 'com/errors'
import validate from 'com/validate'

const loginUser = async (email, password) => {
  validate.email(email)
  validate.password(password)

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}users/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    let body

    try {
      body = await response.json()
    } catch (jsonError) {
      throw new SystemError('Server error')
    }

    if (response.status === 200) {
      const { token, role } = body

      sessionStorage.setItem('token', token)
      sessionStorage.setItem('role', role)
      return
    }
    const { error, message } = body
    const constructor = errors[error] || SystemError

    throw new constructor(message)
  } catch (error) {
    if (!(error instanceof CredentialsError)) {
      throw new SystemError('Server error')
    }
    throw error
  }
}

export default loginUser
