import { User } from '../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const getArtistData = (userId, targetUserId) => {
  validate.id(userId, 'userId')
  validate.id(targetUserId, 'targetUserId')

  return User.findById(userId)
    .lean()
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then((user) => {
      if (!user) throw new NotFoundError('User not found')

      return User.findById(targetUserId)
        .lean()
        .catch((error) => {
          throw new SystemError(error.message)
        })
        .then((user) => {
          if (!user) {
            throw new NotFoundError('targetUser not found')
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
        })
    })
}

export default getArtistData
