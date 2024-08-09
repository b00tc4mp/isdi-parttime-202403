import { MatchError, NotFoundError, SystemError } from 'com/errors.js'
import { User, Room } from '../data/index.js'
import validate from 'com/validate.js'
import { Types } from 'mongoose'

const { ObjectId } = Types

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
            throw new NotFoundError('room nor found')
          }

          if (room.author.toString() !== userId) {
            throw new MatchError('room author do not match')
          }

          return Room.deleteOne({ _id: new Object(roomId) })
            .catch(error => new SystemError(error.message))
            .then(() => { })
        })

    })
}

export default deleteRoom