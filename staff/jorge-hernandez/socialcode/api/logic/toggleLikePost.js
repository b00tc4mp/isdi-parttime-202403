import { User, Post } from '../data/index.js'
import validate from 'com/validate.js'
import { MatchError, SystemError } from 'com/errors.js'
import { ObjectId } from 'mongodb'

function toggleLikePost(userId, postId, callback) {
  validate.id(userId, 'userId')
  validate.id(postId, 'postId')
  validate.callback(callback)

  User.findById(userId)
    .lean()
    .then((user) => {
      if (!user) {
        callback(new MatchError('user not found'))

        return
      }

      Post.findById(postId)
        .then((post) => {
          if (!post) {
            callback(new MatchError('post not found'))

            return
          }

          const included = post.likes.some((id) => id.toString() === userId)

          Post.updateOne(
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
            .then(() => callback(null))
            .catch((error) => callback(new SystemError(error.message)))
        })
        .catch((error) => callback(new SystemError(error.message)))
    })
    .catch((error) => callback(new SystemError(error.message)))
}

export default toggleLikePost
