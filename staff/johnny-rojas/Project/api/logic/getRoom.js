import validate from "com/validate.js"
import { User, Room } from '../data/index.js'
import { NotFoundError, SystemError } from "com/errors.js"

const getRoom = (userId, roomId) => {
  validate.id(userId, 'userId')
  validate.id(roomId, 'roomId')

  return User.findById(userId).lean()
    .catch(error => { throw new SystemError(error.message) })
    .then(user => {
      if (!user) {
        throw new NotFoundError('user not found')
      }

      return Room.findById(roomId).select('-__v').lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(room => {
          if (!room) {
            throw new NotFoundError('room not foun')
          }

          room.id = room._id.toString()
          delete room._id

          return room
      })
    })

}

export default getRoom