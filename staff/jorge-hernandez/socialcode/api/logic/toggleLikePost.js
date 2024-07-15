import { User, Post } from '../data/index.js'
import validate from 'com/validate.js'
import { MatchError, SystemError } from 'com/errors.js'
import { ObjectId } from 'mongodb'

function toggleLikePost(userId, postId) {
  validate.id(userId, 'userId')
  validate.id(postId, 'postId')

  return User.findById(userId)
    .lean()
    .then((user) => {
      if (!user) {
        throw new MatchError('user not found')
      }

      return Post.findById(postId)
        .then((post) => {
          if (!post) {
            throw new MatchError('post not found')
          }

          const included = post.likes.some((id) => id.toString() === userId)

          return Post.updateOne(
            { _id: post._id },
            included
              ? {
                  $pull: {
                    likes: new ObjectId(userId),
                  },
                }
              : {
                  $push: {
                    likes: new ObjectId(userId),
                  },
                }
          )
            .catch((error) => {
              throw new SystemError(error.message)
            })
            .then(() => {})
        })
        .catch((error) => {
          throw new SystemError(error.message)
        })
    })
    .catch((error) => {
      throw new SystemError(error.message)
    })
}

export default toggleLikePost
