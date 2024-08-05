import { NotFoundError, SystemError } from 'com/errors.js'
import { User, Room } from '../data/index.js'
import validate from 'com/validate.js'


const getAllRooms = (userId) => {
  validate.id(userId, 'userId')

  return User.findById(userId).lean()
    .catch((error) => { throw new SystemError(error.message) })
    .then(user => {
      if (!user) {
      throw new NotFoundError('user not found')
      }
      
      return Room.find({}).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(room => {
          if (!room) {
            throw new NotFoundError('room not found')
          }
          return room
        })
      })
}
  
export default getAllRooms

//TODO location: { type: 'Point', coordinates: [Array] }