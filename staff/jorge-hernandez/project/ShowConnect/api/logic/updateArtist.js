import { User } from '../data/index.js'
import { SystemError } from 'com/errors.js'

const updateArtist = (userId, updateData) => {
  return User.findByIdAndUpdate(userId, updateData)
    .then((user) => {
      if (!user) {
        throw new SystemError('Artist not found')
      }
      return user
    })
    .catch((error) => {
      throw new SystemError(error.message)
    })
}

export default updateArtist
