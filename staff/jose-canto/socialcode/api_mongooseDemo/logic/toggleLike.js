import data from "../data/index.js"
import { MatchError, SystemError } from "com/errors.js"
import validate from "com/validate.js"
import { ObjectId } from "mongodb"


const toggleLike = (username, postId, callback) => {
  validate.username(username)
  validate.id(postId, "postId")
  validate.callback(callback)


  data.users.findOne({ username })
    .then(user => {
      if (!user) {
        callback(new MatchError('❌ User not found ❌'));
        return
      }

      data.posts.findOne({ _id: new ObjectId(postId) })
        .then(post => {
          if (!post) {
            callback(new MatchError("❌ Post not found ❌"));
            return
          }

          const userIndex = post.liked.indexOf(username);
          if (userIndex === -1) {
            post.liked.push(username);
          } else {
            post.liked.splice(userIndex, 1);
          }

          data.posts.updateOne({ _id: new ObjectId(postId) }, { $set: post })
            .then(() => {
              if (userIndex === -1) {
                callback(null, true)
              } else {
                callback(null)
              }
            })

            .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
    })
    .catch(error => callback(new SystemError(error.message)))
}

export default toggleLike;
