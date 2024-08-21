import { NotFoundError, SystemError } from 'com/errors.js'
import validate from '../../com/validate.js'
import { Room } from '../data/index.js'

const editRoom = (userId, roomId, updates) => {
  validate.id(userId, 'userId')
  validate.id(roomId, 'roomId')

  const updateFields = {}

  if (updates.nameRoom) {
    validate.nameRoom(updates.nameRoom, 'nameRoom')
    updateFields.nameRoom = updates.nameRoom
  }
  if (updates.region) {
    validate.region(updates.region, 'region')
    updateFields.region = updates.region
  }
  if (updates.city) {
    validate.text(updates.city, 'city')
    updateFields.city = updates.city
  }
  if (updates.image) {
    validate.url(updates.image, 'image')
    updateFields.image = updates.image
  }
  if (updates.description) {
    validate.text(updates.description, 'description')
    updateFields.description = updates.description
  }
  if (updates.price) {
    validate.price(updates.price, 'price')
    updateFields.price = updates.price
  }

  return Room.findByIdAndUpdate(roomId, updateFields, { new: true }).lean()
    .catch(error => { throw new SystemError(error.message) })
    .then(room => {
      if (!room) {
        throw new NotFoundError('room not found')
      }
    })
}
export default editRoom