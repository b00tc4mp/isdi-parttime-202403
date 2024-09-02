import { User } from '../data/index.js'
import { SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const deleteDate = async (artistId, dateToRemove) => {
  validate.id(artistId, 'artistId')

  const date = new Date(dateToRemove)

  validate.date(date, 'date')

  date.toISOString()

  try {
    const updatedUser = await User.findByIdAndUpdate(
      artistId,
      { $pull: { dates: date } },
      { new: true }
    ).lean()

    if (!updatedUser) {
      throw new SystemError('Artist not found')
    }
    return updatedUser
  } catch (error) {
    throw new SystemError(error.message)
  }
}

export default deleteDate
