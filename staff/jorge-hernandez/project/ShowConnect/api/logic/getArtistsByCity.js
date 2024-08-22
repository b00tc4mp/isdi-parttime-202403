import validate from 'com/validate.js'
import { User } from '../data/index.js'

const getArtistsByCity = (discipline, city, excludedDate) => {
  const date = new Date(excludedDate)

  validate.text(city, 'city')
  validate.text(discipline, 'discipline')
  validate.date(date, 'date')

  return User.find({
    city: city,
    discipline: discipline,
    role: 'artist',
    dates: { $not: { $elemMatch: { $eq: date } } },
  })
    .lean()
    .catch((error) => {
      console.error(error.message)
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
        dates: artist.dates.map((date) => date.toISOString()),
      }))
    })
}

export default getArtistsByCity
