import { NotFoundError, SystemError } from "com/errors.js";
import { Booking } from '../data/index.js'


const getAllBookings = () => {

  return Booking.find({}).select('-__v').lean()
    .catch(error => { throw new SystemError(error.message) })
    .then(bookings => {
      if(!bookings){
        throw new NotFoundError('booking not found')
      }

      bookings.forEach(booking => {
        booking.id = booking._id.toString()
        delete booking._id
      })

      return bookings
  })
}

export default getAllBookings