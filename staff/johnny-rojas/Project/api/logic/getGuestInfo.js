import { NotFoundError, SystemError } from 'com/errors.js'
import { Booking, User } from '../data/index.js'
import validate from 'com/validate.js'

const getGuestInfo = (bookingId, userId) => {
  validate.id(bookingId, 'bookingId')
  validate.id(userId, 'userId')

  return User.findById(userId)
    .catch(error => { throw new SystemError(error.message) })
    .then(user => {
      if (!user) {
        throw new NotFoundError('user not found')
      }

      return Booking.findById(bookingId).populate('user').lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(booking => {
          if (!booking) {
            throw new NotFoundError('booking not found')
          }
          return booking
        })
    })

}

export default getGuestInfo

