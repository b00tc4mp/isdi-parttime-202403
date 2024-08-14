import { NotFoundError, SystemError } from 'com/errors.js'
import { User, Room } from '../data/index.js'
import validate from 'com/validate.js'

const createRoom = (userId, nameRoom, region, city, image, description, price) => {
  validate.id(userId, 'userId')
  validate.nameRoom(nameRoom, 'Room name',)
  validate.region(region, 'region')
  validate.text(city, 'city')
  validate.url(image, 'imagen')
  validate.text(description, 'description')
  validate.price(price, 'price')

  return User.findById(userId)
    .catch(error => { throw new SystemError(error.message) })
    .then(user => {
      if (!user) {
        throw new NotFoundError('user not found')
      }

      user.role = "host"
      return user.save()
    })
    .then(() => {

      const room = {
        author: userId,
        nameRoom,
        region,
        city,
        image,
        description,
        price,
        likes: [],
        manager: userId
      }
      return Room.create(room)
    })
    .then(room => room)
    .catch(error => { throw new SystemError(error.message) })
}

export default createRoom

