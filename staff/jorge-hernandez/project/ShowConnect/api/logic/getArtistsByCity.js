import { User } from '../data/index.js'
import { SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const getArtistsByCity = (city, discipline, excludedDate) => {
  validate.text(city, 'city')
  validate.text(discipline, 'discipline')

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
      return artistsList.map((artist) => ({
        id: artist._id,
        artisticName: artist.artisticName,
        city: artist.city,
        image: artist.image,
        discipline: artist.discipline,
        description: artist.description,
        video: artist.video,
        dates: artist.dates,
      }))
    })
}

export default getArtistsByCity
