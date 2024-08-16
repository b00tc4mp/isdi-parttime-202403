import { MatchError, NotFoundError, SystemError } from 'com/errors.js'
import { User, Room, Booking } from '../data/index.js'
import validate from 'com/validate.js'
import mongoose from 'mongoose'

const { ObjectId } = mongoose.Types

const deleteRoom = (userId, roomId) => {
  validate.id(userId, 'userId')
  validate.id(roomId, 'RoomId')

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
            throw new MatchError('room author do not match')
          }

          return Booking.findOne({ room: roomId }).lean()
            .catch(error => { throw new SystemError(error.message) })
            .then(booking => {
              if (booking) {
                throw new MatchError('you cannot delete a room with bookings')
              }

              return Room.deleteOne({ _id: new ObjectId(roomId) })
                .catch(error => { throw new SystemError(error.message) })
                .then(() => { })
            })
        })
    })
}

export default deleteRoom

//TODO Error is not defined