import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const getArtistsByCity = (city, discipline, excludedDate) => {
  const date = new Date(excludedDate)
  validate.text(city, 'city')
  validate.text(discipline, 'discipline')
  validate.date(date, 'excludedDate')

  // Si decides no usar encodeURIComponent, simplemente usa el formato ISO directamente
  const isoExcludedDate = date.toISOString()

  return fetch(
    `http://localhost:8080/users/city/${city}/discipline/${discipline}/dates/${isoExcludedDate}`
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
          console.log('Error Type from server:', error) // Debugging line
          const Constructor = errors[error] || SystemError
          throw new Constructor(message)
        })
    })
}

export default getArtistsByCity
