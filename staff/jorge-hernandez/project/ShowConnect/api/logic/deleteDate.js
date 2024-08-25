import { User } from '../data/index.js'
import { SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const deleteDate = (artistId, dateToRemove) => {
  validate.id(artistId, 'artistId')

  const date = new Date(dateToRemove)

  validate.date(date, 'date')

  date.toISOString()

  return User.findByIdAndUpdate(
    artistId,
    { $pull: { dates: date } },
    { new: true }
  )
    .lean()
    .catch((error) => {
      console.error(error)
      throw new SystemError(error.message)
    })
    .then((updatedUser) => {
      if (!updatedUser) {
        throw new SystemError('Artist not found')
      }
      return updatedUser
    })
}

export default deleteDate
