import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const loginUser = (username, password) => {
  validate.username(username)
  validate.password(password)

  return fetch(`${import.meta.env.VITE_API_URL}/users/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
    .catch((error) => callback(new SystemError(error)))
    .then((response) => {
      if (response.status === 200) {
        return response
          .json()
          .catch((error) => callback(new SystemError(error)))
          .then((token) => {
            sessionStorage.token = token
          })
      }

      return response
        .json()
        .then(({ error, message }) => {
          const constructor = errors[error]

          throw new constructor(message)
        })

        .catch((error) => {
          throw new SystemError(error.message)
        })
    })
}

export default loginUser
