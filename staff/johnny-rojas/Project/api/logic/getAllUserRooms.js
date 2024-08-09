import { NotFoundError, SystemError } from "com/errors.js";
import { User, Room } from '../data/index.js'
import validate from "com/validate.js";

const getAllUserRooms = (userId) => {
  validate.id(userId, 'userId')

  return User.findById(userId).lean()
    .catch((error) => { throw new SystemError(error.message) })
    .then(user => {
      if (!user) {
        throw new NotFoundError('user not found')
      }
      
      return Room.find({author: userId}).select('-__v').lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(rooms => {
          if (!rooms) {
            throw new NotFoundError('rooms not found')
          }
          rooms.forEach(rooms => {
            rooms.id = rooms._id.toString()
            delete rooms._id
          })
          return rooms
        })
    })
}

export default getAllUserRooms

//TODO Quiero que con esta logica puedas ir a tus habitaciones y desde ahi poder eliminarlas y editarlas 