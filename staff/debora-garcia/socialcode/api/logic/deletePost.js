import { User } from "../data/index.js" // importamos el objeto data
import { Post } from "../data/index.js" // importamos el objeto data
import { NotFoundError, SystemError } from "com/errors.js"
import validate from "com/validate.js"
import { Types } from "mongoose"
const { ObjectId } = Types

const deletePost = (userId, postId) => {
    validate.id(userId, "userId")
    validate.id(postId, "postId")

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError("user not found")

            return Post.findById(postId)
                .catch(error => { throw new SystemError(error.message) })
                .then(post => {
                    if (!post)
                        throw new NotFoundError("post not found")
                    //el autor es ubn Object Id por lo que lo convertimos a estring para poder comparar
                    if (post.author.toString() !== userId)
                        throw new NotFoundError("post author does not match user")

                    return Post.deleteOne({ _id: new ObjectId(postId) })
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => { })
                })
        })
}

export default deletePost