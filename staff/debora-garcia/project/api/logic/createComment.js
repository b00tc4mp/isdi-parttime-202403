import { User, Post, Comment } from "../data/index.js"
import validate from "com/validate.js"
import { NotFoundError, SystemError } from "com/errors.js"

const createComment = (userId, postId, text) => {

    validate.id(userId, "userId")
    validate.id(postId, "postId")
    validate.text(text, "text", 100)

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError("user not found")

            return Post.findById(postId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(post => {
                    if (!post) throw new NotFoundError("post not found")

                    const comment = {
                        author: userId,
                        post: postId,
                        text,
                        date: Date.now()
                    }
                    return Comment.create(comment)
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => { })
                })
        })

}
//TODO SPEC
export default createComment



