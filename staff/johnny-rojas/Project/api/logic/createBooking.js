import { Booking, Room } from '../data/index.js'
import { DuplicityError, NotFoundError, SystemError } from "com/errors.js"
import validate from "com/validate.js"

const createBooking = (userId, roomId, startDate, endDate) => {
  validate.id(userId, 'userId')
  validate.id(roomId, 'roomId')

  return Booking.find({ room: roomId })
    .catch(error => { throw new SystemError(error.message) })
    .then((booking) => {

      const requestedStartDate = new Date(startDate)
      const requestedEndDate = new Date(endDate)

      const isAvailable = !booking.some(booking => {
        const existingStartDate = new Date(booking.startDate)
        const existingEndDate = new Date(booking.endDate)

        return requestedStartDate < existingEndDate && requestedEndDate > existingStartDate
      })
      if (!isAvailable) {
        throw new DuplicityError('unavailable dates')
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

}


export default createBooking