import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const registerClient = (name, email, message, password, passwordRepeat) => {
  validate.name(name)
  validate.email(email)
  validate.text(message, 'message')
  validate.password(password)
  validate.passwordsMatch(password, passwordRepeat)

  return fetch(`http://localhost:8080/clients`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      message,
      password,
      passwordRepeat,
    }),
  })
    .catch(() => {
      throw new SystemError('server error')
    })
    .then((response) => {
      if (response.status === 201) return

      return response
        .json()
        .catch(() => {
          throw new SystemError('server error')
        })
        .then((body) => {
          const { error, message } = body

          const constructor = errors[error]

          throw new constructor(message)
        })
    })
}

export default registerClient
