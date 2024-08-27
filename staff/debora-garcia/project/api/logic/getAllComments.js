import { User, Post, Comment } from "../data/index.js"
import { SystemError, NotFoundError } from "com/errors.js"
import validate from "com/validate.js"


const getAllComments = (userId, postId) => {
    validate.id(userId, "userId")
    validate.id(postId, "postId")

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError("user not found")

            return Post.findById(postId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(post => {
                    if (!post) throw new NotFoundError("post not found")

                    return Comment.find({ post: postId }).lean()
                        .populate("author", "username")
                        .select("-__v")
                        .sort({ date: -1 })
                        .lean()
                        .catch(error => { throw new SystemError(error.message) })
                        .then(comments => {
                            comments.forEach(comment => {
                                comment.id = comment._id.toString()
                                delete comment._id
                                if (comment.author._id) {
                                    comment.author.id = comment.author._id.toString()
                                    delete comment.author._id
                                }
                            })
                            return comments
                        })

                })
        })
}

export default getAllComments
