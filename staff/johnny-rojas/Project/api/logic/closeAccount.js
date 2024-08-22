import { NotFoundError, SystemError } from 'com/errors.js'
import { User, Room, Booking } from '../data/index.js'
import validate from 'com/validate.js'


const closeAccount = (userId) => {
  validate.id(userId, 'userId')

  return User.findById(userId).lean()
    .catch(error => { throw new SystemError(error.message) })
    .then(user => {
      if (!user) {
        throw new NotFoundError('user not found')
      }

      return User.updateOne({ _id: userId }, { $set: { isBlocked: true } })
        .catch(error => { throw new SystemError(error.message) })
        .then(() => {

          return Room.find({ manager: user._id }).lean()
            .catch(error => { throw new SystemError(error.message) })
            .then(rooms => {

              return Promise.all(rooms.map(room => {
                return Room.updateOne({ _id: room._id }, { $set: { isBlocked: true } })
                  .catch(error => { throw new SystemError(error.message) })
                  .then(() => {

                    return Booking.find({ room: room._id }).lean()
                      .catch(error => { throw new SystemError(error.message) })
                      .then(bookings => {

                        return Promise.all(bookings.map(booking => {

                          return Booking.updateOne({ _id: booking._id }, { $set: { isBlocked: true } })
                            .catch(error => { throw new SystemError(error.message) })
                            .then(() => { })
                        }))
                      })

                  })
              }))

            })

        })

    })
}


export default closeAccount
