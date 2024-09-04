import validate from 'com/validate.js'
import { User, Room, Booking } from '../data/index.js'
import { MatchError, NotFoundError, SystemError } from 'com/errors.js'
import mongoose from 'mongoose'

const { ObjectId } = mongoose.Types

const deleteBookingByHost = (userId, roomId, bookingId) => {
  validate.id(userId, 'userId')
  validate.id(roomId, 'roomId')
  validate.id(bookingId, 'bookingId')

  return User.findById(userId).lean()
    .catch(error => { throw new SystemError(error.message) })
    .then(user => {
      if (!user) {
        throw new NotFoundError('user not found')
      }
      return Room.findById(roomId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(room => {
          if (!room) {
            throw new NotFoundError('room not found')
          }

          if (room.author.toString() !== userId) {
            throw new MatchError('user cannot delete the booking')
          }

          return Booking.findOne({ room: roomId, isBlocked: false }).lean()
            .catch(error => { throw new SystemError(error.message) })
            .then(booking => {
              if (!booking) {
                throw new NotFoundError('booking not found')
              }
              return Booking.updateOne({ _id: new ObjectId(bookingId) }, {$set: {isBlocked: true}})
                .catch(error => { throw new SystemError(error.message) })
                .then(() => { })
            })
        })
    })
}

export default deleteBookingByHost