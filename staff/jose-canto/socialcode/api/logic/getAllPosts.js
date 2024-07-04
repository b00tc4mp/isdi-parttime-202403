import { User, Post } from "../data/index.js"
import { SystemError, MatchError } from "com/errors.js"
import validate from "com/validate.js"


const getAllPosts = (userId, page, limit, callback) => {

  validate.id(userId, "userId")
  validate.callback(callback)

  User.findById(userId).lean()
    .then(user => {
      if (!user) {

        callback(new MatchError("❌ User not found ❌"))

        return
      }

      Post.find({}).populate("author", "username").select("-__v").populate("comments.author", "username").sort({ date: -1 }).lean()
        .then(posts => {
          posts.forEach(post => {
            post.id = post._id.toString() // sobreescribimos el id en objeto para cambiarlo a un string y asi evitar que no se sepa que se usa mongo por debajo. Sanear datos.
            delete post._id

            if (post.author._id) {

              post.author.id = post.author._id.toString()
              delete post.author._id
            }

            post.liked = post.liked.map(userObjectId => userObjectId = userObjectId.toString())

            post.comments.forEach(comment => {

              if (comment.author._id) {
                comment.author.id = comment.author._id.toString()
                delete comment.author._id
              }
            })
          })

          const startIndex = (page - 1) * limit
          const endIndex = startIndex + limit

          const paginatedPost = posts.slice(startIndex, endIndex)

          callback(null, paginatedPost);
        })
        .catch(error => callback(new SystemError(error.message)))
    })
    .catch(error => callback(error))
}

export default getAllPosts