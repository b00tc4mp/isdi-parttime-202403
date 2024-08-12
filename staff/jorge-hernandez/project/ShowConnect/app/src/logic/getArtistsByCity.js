import errors, { SystemError } from 'com/errors'

const getArtistsByCity = (city, discipline, excludedDate) => {
  return fetch(
    `http://localhost:8080/users/city/${city}/discipline/${discipline}/dates/${excludedDate}`
  )
    .catch(() => {
      throw new SystemError('server error')
    })
    .then((response) => {
      if (response.status === 200) {
        return response.json().catch(() => {
          throw new SystemError('server error')
        })
      }

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

export default getArtistsByCity
