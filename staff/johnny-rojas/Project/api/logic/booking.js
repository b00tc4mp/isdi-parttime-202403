import { NotFoundError, SystemError } from "com/errors.js"
import { Room, Booking } from '../data/index.js'
import validate from "com/validate.js"

const booking = (userId, roomId, startDate, endDate) => {
  validate.id(userId, 'userId')
  validate.id(roomId, 'roomId')
  //TODO Validate Dates

  const start = new Date(startDate)
  const end = new Date(endDate)

  if (start >= end) {
    throw new SystemError('end date must be after start date')
  }

  return Room.findById(roomId).lean()
    .catch(error => { throw new SystemError(error.message) })
    .then(room => {
      if (!room) {
        throw new NotFoundError('room not found')
      }
    })

}