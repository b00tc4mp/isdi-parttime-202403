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

      if (updateData.dates) {
        updateData.dates.forEach((date) => {
          if (!user.dates.includes(date)) {
            user.dates.push(date)
          }
        })
      }

      return user.save()
    })
    .catch((error) => {
      console.error('Error in updateArtist:', error)
      throw new SystemError('Server error while updating artist')
    })
}

export default updateArtist
