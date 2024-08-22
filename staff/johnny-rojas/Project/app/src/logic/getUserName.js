import errors, { SystemError } from "com/errors"
import extractPayloadFromJWT from "../../utils/extractPayloadFromJWT"

const getUserName = () => {
  const { sub: userId } = extractPayloadFromJWT(sessionStorage.token)

  return fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/manage`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }
  })

    .catch(() => { throw new SysTemError('network error') })
    .then(response => {
      if (response.status == 200) {

        return response.json()
          .catch(error => { throw new SysTemError(error.message) })
          .then(name => name)
      }

      return response.json()
        .catch(() => { throw new SystemError('network error') })
        .then(body => {
          const { error, message } = body

          const constructor = errors[error]

          throw new constructor(message)
        })

    })
}

export default getUserName