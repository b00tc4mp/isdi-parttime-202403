import { NotFoundError, SystemError } from 'com/errors.js'
import { Room } from '../data/index.js'

const getAllRooms = () => {

      return Room.find({}).select('-__v').lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(rooms => {
          rooms.forEach(room => {
            room.id = room._id.toString()
            delete room._id
          })

          return rooms
        })
    }

export default getAllRooms
