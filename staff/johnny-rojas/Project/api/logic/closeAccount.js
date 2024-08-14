import { NotFoundError, SystemError } from 'com/errors.js'
import { User } from '../data/index.js'
import validate from 'com/validate.js'


const closeAccount = (userId) => {
  validate.id(userId, 'userId')

  return User.findById(userId).lean()
    .catch(error => { throw new SystemError(error.message) })
    .then(user => {
      if (!user) {
        throw new NotFoundError('user not found')
      }

      return User.deleteOne({ _id: userId })
        .catch(error => new SystemError(error.message))
        .then(() => { })
    })
}


export default closeAccount
