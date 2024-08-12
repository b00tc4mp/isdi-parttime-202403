import { User } from '../data/index.js'
import { SystemError } from 'com/errors.js'

const getArtistsByCity = (city, discipline, excludedDate) => {
  if (!city || !discipline || !excludedDate) {
    throw new SystemError('City, discipline, and excludedDate are required')
  }

  const formattedExcludedDate = excludedDate.trim()

  return User.find({
    city: city,
    discipline: discipline,
    role: 'artist',
    dates: { $not: { $elemMatch: { $eq: formattedExcludedDate } } },
  })
    .lean()
    .catch((error) => {
      throw new SystemError(`Database query failed: ${error.message}`)
    })
    .then((artistsList) => {
      return artistsList
    })
}

export default getArtistsByCity
