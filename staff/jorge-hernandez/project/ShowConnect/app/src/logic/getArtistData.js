import errors, { SystemError } from 'com/errors'

import extractPayloadFromJWT from '../utils/extractPayloadFromJWT'

const getArtistData = (targetUserId) => {
  const { sub: userId } = extractPayloadFromJWT(sessionStorage.token)

  return fetch(`http://localhost:8080/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.token}`,
    },
  })
    .catch(() => {
      throw new SystemError('server error')
    })
    .then((response) => {
      if (response.status === 200)
        return response.json().catch(() => {
          throw new SystemError('server error')
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

export default getArtistData
