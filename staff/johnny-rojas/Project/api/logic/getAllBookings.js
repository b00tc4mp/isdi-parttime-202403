import { SystemError } from "com/errors.js";
import { Booking } from '../data/index.js'


const getAllBookings = () => {

  return Booking.find({}).select('-__v')
    .catch(error => { throw new SystemError(error.message) })
    .then(bookings => {
      bookings.forEach(booking => {
        booking.id = booking._id.toString()
        delete booking._id
      })

      return bookings
    })
}

export default getAllBookings