import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const registerUser = (
  name,
  surname,
  email,
  username,
  password,
  passwordRepeat,
  callback
) => {
  validate.name(name)
  validate.name(surname, 'surname')
  validate.email(email)
  validate.username(username)
  validate.password(password)
  validate.passwordsMatch(password, passwordRepeat)
  validate.callback(callback)

  fetch(`${import.meta.env.VITE_API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      surname,
      email,
      username,
      password,
      passwordRepeat,
      callback,
    }),
  })
    .then((response) => {
      if (response.status === 201) {
        callback(null)

        return
      }

      return response
        .json()
        .then(({ error, message }) => {
          const constructor = errors[error]

          callback(new constructor(message))
        })

        .catch((error) => callback(new SystemError(error.message)))
    })
    .catch((error) => callback(new SystemError(error)))
}

export default registerUser
