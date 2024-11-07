import { User } from '../data/index.js'
import { SystemError } from 'com/errors.js'

import validate from 'com/validate.js'

const updateArtist = async (userId, updateData) => {
  validate.id(userId)

  if (updateData.artisticName) {
    validate.name(updateData.artisticName, 'artisticName')
  }

  if (updateData.description) {
    validate.text(updateData.description, 'description')
  }

  if (updateData.image) {
    validate.url(updateData.image, 'image')
  }

  if (updateData.video) {
    validate.url(updateData.video, 'video')
  }

  try {
    const user = await User.findById(userId)
    if (!user) {
      throw new SystemError('Artist not found')
    }
    if (updateData.artisticName) user.artisticName = updateData.artisticName
    if (updateData.image) user.image = updateData.image
    if (updateData.description) user.description = updateData.description
    if (updateData.dates) user.dates = updateData.dates
    if (updateData.video) user.video = updateData.video

    await user.save()

    return user
  } catch (error) {
    throw new SystemError(error.message)
  }
}

export default updateArtist
