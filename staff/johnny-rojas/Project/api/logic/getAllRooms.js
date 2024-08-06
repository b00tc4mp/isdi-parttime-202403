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
      
      return Room.find({}).select('-__v').populate('nameRoom').lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(rooms => {
          if (!rooms) {
            throw new NotFoundError('rooms not found')
          }

          rooms.forEach(room => {
            room.id = room._id.toString()
            delete room._id
          })

          return rooms
        })
      })
}
  
export default getAllRooms

//TODO location: { type: 'Point', coordinates: [Array] }