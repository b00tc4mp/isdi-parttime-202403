import { NotFoundError, SystemError } from 'com/errors.js'
import { Room } from '../data/index.js'

const getAllRooms = () => {

      return Room.find({}).select('-__v').lean()
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
    }

export default getAllRooms

//TODO location: { type: 'Point', coordinates: [Array] } OTRA LOGICA SIN USER ID