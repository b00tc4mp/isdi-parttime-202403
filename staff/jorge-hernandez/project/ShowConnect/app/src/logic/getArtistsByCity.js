import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const getArtistsByCity = async (discipline, city, excludedDate) => {
  const date = new Date(excludedDate)
  validate.discipline(discipline)
  validate.city(city)
  validate.date(date, 'excludedDate')

  const isoExcludedDate = date.toISOString()

  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }users/search-artists/${discipline}/discipline/${city}/dates/${isoExcludedDate}`
    )

    if (response.status === 200) {
      return response.json()
    }

    try {
      body = await response.json()
    } catch (jsonError) {
      throw new SystemError(`${response.statusText}`)
    }

    const { error, message } = body

    const constructor = errors[error]

    throw new constructor(message)
  } catch (error) {
    throw new SystemError('Server error')
  }
}

export default getArtistsByCity
