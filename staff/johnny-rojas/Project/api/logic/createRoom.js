import { User, Room } from "../data/index.js";
import validate from "com/validate.js";
import { NotFoundError, SystemError } from "com/errors.js";

const createRoom = (userId, nameRoom, region, image, description, price, availability, likes, coordinates) => {
  validate.id(userId, 'userId');
  validate.nameRoom(nameRoom, 'name room');
  validate.region(region, 'region');
  validate.url(image, 'image');
  validate.text(description, 'description');
  validate.price(price, 'price');
  validate.availability(availability, 'availability');


  return User.findById(userId)
    .catch(error => { throw new SystemError(error.message); })
    .then(user => {
      if (!user) {
        throw new NotFoundError('userId not found');
      }

      const contact = {
        name: user.name,
        surname: user.surname,
        email: user.email,
        phone: user.phone
      };

      const room = new Room({
        author: userId,
        nameRoom,
        region,
        contact: contact,  
        image,
        description,
        price,
        availability,
        likes,
        location: {
          type: 'Point',
          coordinates
        }
      });

      return Room.create(room)
        .catch(error => { throw new SystemError(error.message); })
        .then(createdRoom => ({ room: createdRoom }))
    });
};

export default createRoom;