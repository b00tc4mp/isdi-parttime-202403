import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const getArtistsByCity = (discipline, city, excludedDate) => {
  const date = new Date(excludedDate)
  validate.discipline(discipline)
  validate.city(city)
  validate.date(date, 'excludedDate')

  const isoExcludedDate = date.toISOString()

  return fetch(
    `${
      import.meta.env.VITE_API_URL
    }users/search-artists/${discipline}/discipline/${city}/dates/${isoExcludedDate}`
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
          const Constructor = errors[error]
        })
    })
}

export default getArtistsByCity
