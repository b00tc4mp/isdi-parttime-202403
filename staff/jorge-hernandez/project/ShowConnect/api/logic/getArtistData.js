import { User } from '../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const getArtistData = async (userId) => {
  validate.id(userId, 'userId')

  try {
    const user = await User.findById(userId).lean()

    if (!user) {
      throw new NotFoundError('user not found')
    }

    return {
      name: user.name,
      artisticName: user.artisticName,
      description: user.description,
      image: user.image,
      video: user.video,
      email: user.email,
      dates: user.dates,
      id: user._id.toString(),
    }
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error
    }
    throw new SystemError(error.message)
  }
}

export default getArtistData
