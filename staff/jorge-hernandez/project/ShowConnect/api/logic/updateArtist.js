import { User } from '../data/index.js'
import { SystemError } from 'com/errors.js'

const updateArtist = (userId, updateData) => {
  return User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new SystemError('Artist not found')
      }

      if (updateData.artisticName) user.artisticName = updateData.artisticName
      if (updateData.images) user.images = updateData.images
      if (updateData.description) user.description = updateData.description
      if (updateData.dates) user.dates = updateData.dates

      return user.save()
    })
    .catch((error) => {
      throw new SystemError(error.message)
    })
}

export default updateArtist
