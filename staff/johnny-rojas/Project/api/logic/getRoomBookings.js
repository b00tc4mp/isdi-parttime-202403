import validate from "com/validate.js"
import { Booking } from "../data/index.js"
import { NotFoundError, SystemError } from "com/errors.js"

const getRoomBookings = (bookingId) => {
  validate.id(bookingId, 'bookingId')

  return Booking.find(room.id).lean()
    .catch((error) => { throw new SystemError(error.message) })
    .then(bookings => {
      if (!bookings) {
      throw new NotFoundError('booking not found')
      }
      bookings.forEach(bookings => {
        bookings.id = bookings._id.toString()
        delete bookings._id
      })
      return bookings
  })
}

export default getRoomBookings