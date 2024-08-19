import { User } from '../data/index.js'
import { SystemError } from 'com/errors.js'

const updateArtist = (userId, updateData) => {
  return User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new SystemError('Artist not found')
      }

      if (updateData.artisticName) user.artisticName = updateData.artisticName
      if (updateData.image) user.image = updateData.image
      if (updateData.description) user.description = updateData.description
      if (updateData.dates) user.dates = updateData.dates
      if (updateData.dates) user.video = updateData.video

      return user.save().catch((error) => {
        throw new SystemError(error.message)
      })
    })
    .catch((error) => {
      throw new SystemError(error.message)
    })
}

export default updateArtist
