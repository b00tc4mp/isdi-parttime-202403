import { User } from '../data/index.js'
import { SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const getArtistsByCity = (city, discipline, excludedDate) => {
  //TODO VALIDATES
  if (!city || !discipline || !excludedDate) {
    throw new SystemError('City, discipline, and excludedDate are required')
  }

  return User.find({
    city: city,
    discipline: discipline,
    role: 'artist',
    dates: { $not: { $elemMatch: { $eq: excludedDate } } },
  })
    .lean()
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then((artistsList) => {
      return artistsList
    })
}

export default getArtistsByCity
