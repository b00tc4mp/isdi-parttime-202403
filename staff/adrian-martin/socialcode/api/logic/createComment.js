import { User, Post } from '../data/index.js'
import { MatchError, SystemError } from 'com/error.js'
import validate from 'com/validate.js'
import { ObjectId } from 'mongodb'

const createComment = (username, postId, textComment, callback) => {
  validate.username(username)
  validate.id(postId, 'postId')
  validate.text(textComment, 'description', 200)
  validate.callback(callback)

  User.findOne({ username }).load()  //buscamos el usuario
    .then(user => {
      if (!user) {   //revisamos que el ususario exista

        callback(new MatchError('User not found'))
        return
      }

      Post.findById({ _id: new ObjectId(postId) }) //buscamos el post
        .then(post => {
          if (!post) {    //revisamos que el post exista

            callback(new MatchError('Post not found'))
            return
          }

          Post.create({ _id: new ObjectId(postId) }, { $push: { comments: { author: username, text: textComment, date: new Date() } } })
            .then(() => callback(null))
            .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
    })
    .catch(error => callback(new SystemError(error.message)))
}

export default createComment