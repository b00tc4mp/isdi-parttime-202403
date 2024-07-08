import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

import extractPayloadFromJWT from '../utils/extractPayloadFromJWT'

const getUserName = (callback) => {
  validate.callback(callback)

  const { sub: userId } = extractPayloadFromJWT(sessionStorage.token)

  fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.token}`,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json().then((name) => {
          callback(null, name)
        })
      } else {
        return response.json().then(({ error, message }) => {
          const constructor = errors[error]
          callback(new constructor(message))
        })
      }
    })
    .catch((error) => callback(new SystemError(error.message)))
}

export default getUserName
