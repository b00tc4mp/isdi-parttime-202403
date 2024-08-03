import errors, { SystemError } from 'com/errors'

const getArtistsByCity = (city, discipline) => {
  return fetch(
    `http://localhost:8080/users/city/${city}/discipline/${discipline}`
  )
    .catch(() => {
      throw new SystemError('server error')
    })
    .then((response) => {
      if (response.ok) {
        return response.json().catch(() => {
          throw new SystemError('server error')
        })
      } else {
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
      }
    })
}

export default getArtistsByCity
