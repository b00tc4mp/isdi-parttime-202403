import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const loginUser = async (email, password) => {
  try {
    validate.email(email)
    validate.password(password)

    const response = await fetch(`${import.meta.env.VITE_API_URL}users/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    if (response.status === 200) {
      try {
        const body = await response.json()

        const { token, role } = body

        sessionStorage.token = token

        sessionStorage.role = role

        return
      } catch (error) {
        throw new SystemError(`${response.statusText}`)
      }
    }
    try {
      body = await response.json()
    } catch (jsonError) {
      throw new SystemError(`${response.statusText}`)
    }

    const { error, message } = body

    const constructor = errors[error]

    throw new constructor(message)
  } catch (error) {
    if (!(error instanceof SystemError)) {
      throw new SystemError('server error')
    }
    throw error
  }
}

export default loginUser
