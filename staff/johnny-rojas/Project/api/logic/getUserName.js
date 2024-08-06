import { User } from '../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const getUserName = (userId, targetUserId) => {
  validate.id(userId, 'userId')

  return User.findById(userId).lean()
    .catch(error => { throw new SystemError(error.message) })
    .then(user => {
      if (!user) {
        throw new NotFoundError('user not found')
      }

      return User.findById(targetUserId).select('-__v').lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
          if (!user) {
            throw new NotFoundError('tragetUser not found')
          }

          return user.name
        })

    })
}

export default getUserName