import { Booking, Room } from '../data/index.js'
import { CredentialsError, NotFoundError, SystemError, DuplicityError } from "com/errors.js"
import validate from "com/validate.js"

const createBooking = (userId, roomId, startDate, endDate) => {
  validate.id(userId, 'userId')
  validate.id(roomId, 'roomId')

  return Booking.find({ room: roomId }).select('-__v').lean()
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
    })


    .then(room => {
      if (!room) {
        throw new NotFoundError('room not found')
      }
      if (room.manager.toString() === userId) {
        throw new CredentialsError('manager cannot book their own rooms')
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


    .then(() => {
      return Booking.find({ room: roomId }).lean()
    })
    .then(allBookings => {
      const blockedDates = allBookings.flatMap(booking => {
        const dates = []
        let currentDate = new Date(booking.startDate)
        while (currentDate <= booking.endDate) {
          dates.push(new Date(currentDate))
          currentDate.setDate(currentDate.getDate() + 1)
        }
        return dates
      })
      return blockedDates
  })

}

export default createBooking

//TODO IF no tienes userId no puedes reservar y te lleve a login 
