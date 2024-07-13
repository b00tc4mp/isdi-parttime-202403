import { MatchError, SystemError } from 'com/errors.js'
import { User, Post } from '../data/index.js'
import validate from 'com/validate.js'

const createPostComment = (userId, postId, comment) => {
  validate.id(userId, 'userId')
  validate.id(postId, 'postId')
  validate.text(comment, 'comment', 150)


  return User.findById(userId).lean()
    .catch(error => { throw new SystemError(error.message) })
    .then(user => {
      if (!user) {
        throw new NotFounError('user not found')
      }

      return Post.findById(postId).lean()
        .catch(error => callback(new SystemError(error.message)))
        .then(post => {
          if (!post) {
            throw new MatchError('post not found')
          }

          return Post.findByIdAndUpdate((postId), { $push: { comments: { author: userId, comment: comment, date: Date.now() } } }, { new: true })
            .catch(error => { throw new SystemError(error.message) })
            .then(() => { })
        })
    })
}

export default createPostComment