import { SystemError } from 'com/errors.js'
import { Booking, Room } from '../data/index.js'
import validate from 'com/validate.js'


const getBlockedDatesByRoom = (roomId) => {
  validate.id(roomId, 'roomId')

  return Room.findById(roomId).select('-__V').lean()
    .catch(error => { throw new SystemError(error.message) })
    .then(() => {
      return Booking.find({ room: roomId }).lean()
        .catch(error => { throw new SystemError(error.message) })
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

    })
}

export default getBlockedDatesByRoom
