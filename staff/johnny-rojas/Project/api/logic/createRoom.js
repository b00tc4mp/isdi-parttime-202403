import { User, Room } from "../data/index.js";
import validate from "com/validate.js";
import { NotFoundError, SystemError } from "com/errors.js";

const changeUserRole = (userId, newRole) => {
  return User.findById(userId)
    .then(user => {
      if (!user) {
        throw new NotFoundError('User not found');
      }
      user.role = newRole;
      return user.save();
    })
    .then(() => {
      console.log(`User role updated to ${newRole}`);
    })
    .catch(error => {
      throw new SystemError(`Error updating user role: ${error.message}`);
    });
};

const createRoom = (userId, nameRoom, region, city, image, description, services, price, availability, likes, coordinates) => {
  validate.id(userId, 'userId');
  validate.nameRoom(nameRoom, 'name room');
  validate.region(region, 'region');
  validate.text(city, 'city');
  validate.url(image, 'image');
  validate.text(description, 'description');
  validate.price(price, 'price');

  const { startDate, endDate } = availability;

  return User.findById(userId)
    .catch(error => { throw new SystemError(error.message); })
    .then(user => {
      if (!user) {
        throw new NotFoundError('userId not found');
      }

      if (user.role === 'guest') {
        const newRole = 'host';
        return changeUserRole(userId, newRole).then(() => user);
      }

      return user;
    })
    .then(user => {
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
        city,
        contact,
        image,
        description,
        services,
        price,
        availability: {
          startDate: new Date(startDate),
          endDate: new Date(endDate)
        },
        likes,
        location: {
          type: 'Point',
          coordinates: [coordinates.lng, coordinates.lat]
        }
      });

      return room.save()
        .catch(error => { throw new SystemError(error.message); })
        .then(createdRoom => {

          return User.findByIdAndUpdate(userId, { $push: { rooms: createdRoom._id } }, { new: true })
            .catch(error => { throw new SystemError(error.message) })
            .then(() => ({ room: createdRoom }))
        });
    })
};

export default createRoom;