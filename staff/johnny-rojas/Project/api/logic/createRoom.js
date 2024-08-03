import { User, Room } from "../data/index.js"
import validate from "com/validate.js";
import { NotFoundError, SystemError } from "com/errors.js";


const createRoom = (userId, name, region, image, description, price, availability, likes, coordinates) => {
  validate.id(userId, 'userId')
  validate.name(name);
  validate.url(image);
  validate.text(description, 'description');


  return User.findById(userId)
    .catch(error => { throw new SystemError(error.message) })
    .then(user => {
      if (!user)
        throw new NotFoundError('userId not found');

      const room = new Room({
        author: userId,
        name,
        region,
        image,
        description,
        price,
        availability,
        likes,
        location: {
          type: 'Point',
          coordinates
        }
      })

      return Room.create(room)
        .catch(error => { throw new SystemError(error.message) })
        .then(room => room);
    });
};

export default createRoom;