import validate from 'com/validate.js'
import { User } from '../data/index.js'
import { SystemError } from 'com/errors.js'

const getArtistsByCity = async (discipline, city, excludedDate) => {
  const date = new Date(excludedDate)

  validate.text(city, 'city')
  validate.text(discipline, 'discipline')
  validate.date(date, 'date')

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
  }

  try {
    const artistsList = await User.find({
      city: city,
      discipline: discipline,
      role: 'artist',
      dates: { $not: { $elemMatch: { $eq: date } } },
    }).lean()

    return artistsList.map((artist) => ({
      id: artist._id,
      artisticName: artist.artisticName,
      city: artist.city,
      image: artist.image,
      discipline: artist.discipline,
      description: artist.description,
      video: artist.video,
      dates: artist.dates.map((date) => formatDate(date)),
    }))
  } catch (error) {
    throw new SystemError(error.message)
  }
}

export default getArtistsByCity
