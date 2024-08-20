import validate from "com/validate.js"
import { Booking, Room } from "../data/index.js"
import { NotFoundError, SystemError } from "com/errors.js"

const getRoomBookings = (roomId) => {
  validate.id(roomId, 'roomId')

  return Room.findById(roomId)
    .catch(error => { throw new SystemError(error.message) })
    .then(room => {
      if (!room) {
        throw new NotFoundError('room not found')
      }

      return Booking.find({ room: roomId }).populate('user').lean()
        .catch((error) => { throw new SystemError(error.message) })
        .then(bookings => {

          bookings.forEach(bookings => {
            bookings.id = bookings._id.toString()
            delete bookings._id
          })
          return bookings
        })
    })


}
export default getRoomBookings