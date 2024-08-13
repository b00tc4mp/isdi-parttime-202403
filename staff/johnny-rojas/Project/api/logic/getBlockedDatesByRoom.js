import { Booking } from '../data/index.js'

const getBlockedDatesByRoom = (roomId) => {
  return Booking.find({ room: roomId }).lean()
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

export default getBlockedDatesByRoom
