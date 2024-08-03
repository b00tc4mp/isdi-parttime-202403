import { User } from '../data/index.js'
import { SystemError } from 'com/errors.js'

const getArtistsByCity = (city, discipline) => {
  if (!city) {
    throw new SystemError('City is required')
  }

  return User.find({ city: city, discipline: discipline, role: 'artist' })
    .lean()
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then((artistsList) => {
      return artistsList
    })
}

export default getArtistsByCity
