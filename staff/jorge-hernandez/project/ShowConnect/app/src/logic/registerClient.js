import errors, { SystemError, DuplicityError } from 'com/errors'
import validate from 'com/validate'

const registerClient = async (name, email, password, passwordRepeat) => {
  validate.name(name)
  validate.email(email)
  validate.password(password)
  validate.passwordsMatch(password, passwordRepeat)

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}users/clients`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          passwordRepeat,
        }),
      }
    )

    if (response.status === 201) {
      return
    }

    try {
      body = await response.json()
    } catch (jsonError) {
      throw new SystemError(`${response.statusText}`)
    }

    const { error, message } = body

    if (error === 'DuplicityError') {
      throw new DuplicityError(message || 'User already exists')
    }

    const constructor = errors[error]
    throw new constructor(message)
  } catch (error) {
    if (!(error instanceof DuplicityError) && !(error instanceof SystemError)) {
      throw new SystemError('Server error')
    }
    throw error
  }
}

export default registerClient
