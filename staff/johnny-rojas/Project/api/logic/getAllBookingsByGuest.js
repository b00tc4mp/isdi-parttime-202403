import { NotFoundError, SystemError } from 'com/errors.js';
import { Booking, User } from '../data/index.js'
import validate from 'com/validate.js';


const getAllBookingByGuest = (userId) => {
  validate.id(userId, 'userId')

  return User.findById(userId)
    .catch(error => { throw new SystemError(error.message) })
    .then(user => {
      if (!user) {
        throw new NotFoundError('user not found')
      }

      return Booking.find({ user: userId }).populate({
        path: 'room',
        populate: {
          path: 'manager'
        }
      }).select('-__v')
        .catch(error => { throw new SystemError(error.message) })
        .then(bookings => {
          return Booking.populate(bookings, {
            path: 'room.manager.user',
            select: '-__v'
          })
            .then(bookingsWithManager => {
              return bookingsWithManager
            })
            .catch(error => { throw new SystemError(error.mesagge) })
        })
    })

}

export default getAllBookingByGuest