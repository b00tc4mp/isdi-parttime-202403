import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const loginUser = (email, password) => {
  validate.email(email)
  validate.password(password)

  return fetch(`${import.meta.env.VITE_API_URL}users/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .catch(() => {
      throw new SystemError('server error')
    })
    .then((response) => {
      if (response.status === 200)
        return response
          .json()
          .catch(() => {
            throw new SystemError('server error')
          })
          .then(({ token, role }) => {
            sessionStorage.token = token
            sessionStorage.role = role
          })

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

export default loginUser
