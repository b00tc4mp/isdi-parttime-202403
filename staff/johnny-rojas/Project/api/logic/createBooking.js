import { Booking, Room, User } from '../data/index.js'
import { NotFoundError, SystemError, DuplicityError, MatchError } from 'com/errors.js'
import validate from 'com/validate.js'

const createBooking = (userId, roomId, startDate, endDate) => {
  validate.id(userId, 'userId')
  validate.id(roomId, 'roomId')

  return User.findById(userId).select('-__v').lean()
    .catch(error => { throw new SystemError(error.message) })
    .then(user => {
      if (!user) {
        throw new NotFoundError('user not found')
      }

      return Room.findById(roomId).select('-__v').lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(room => {
          if (!room) {
            throw new NotFoundError('room not found')
          }

          return Booking.find({ room: roomId, isBlocked: false }).select('-__v').lean()
            .catch(error => { throw new SystemError(error.message) })
            .then((existingBooking) => {

              const requestedStartDate = new Date(startDate)
              const requestedEndDate = new Date(endDate)

              const isAvailable = !existingBooking.some(existingBooking => {
                const existingStartDate = new Date(existingBooking.startDate)
                const existingEndDate = new Date(existingBooking.endDate)

                return requestedStartDate < existingEndDate && requestedEndDate > existingStartDate
              })
              if (!isAvailable) {
                throw new DuplicityError('unavailable dates')
              }
              return Room.findById(roomId)
                .catch(error => { throw new SystemError(error.message) })
                .then(room => {
                  if (!room) {
                    throw new NotFoundError('room not found')
                  }
                  if (room.manager.toString() === userId) {
                    throw new MatchError('manager cannot book their own rooms')
                  }
                  const newBooking = {
                    user: userId,
                    room: roomId,
                    startDate,
                    endDate
                  }
                  return Booking.create(newBooking)
                    .catch(error => { throw new SystemError(error.message) })
                    .then((booking) => booking)
                })
            })


        })


    })

}

export default createBooking

