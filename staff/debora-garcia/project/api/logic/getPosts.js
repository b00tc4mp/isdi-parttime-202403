import { User, Post } from "../data/index.js"
import { SystemError, NotFoundError } from "com/errors.js"
import validate from "com/validate.js"
const getPosts = (userId) => {
    validate.id(userId, "userId")

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError("user not found")

            return Post.find({})
                .populate("author", "username")
                .populate({
                    path: "workout",
                    populate: { path: "movements" } 
                })
                .populate("result")
                .select("-__v")
                .sort({ date: -1 })
                .lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(posts => {
                    if (posts.length === 0) throw new NotFoundError("there are no posts yet")
                    posts.forEach(post => {
                        post.id = post._id.toString()

                        delete post._id

                        if (post.author._id) {
                            post.author.id = post.author._id.toString()

                            delete post.author._id
                        }

                        if (post.workout._id) {
                            post.workout.id = post.workout._id.toString()
                            post.workout.movements.map(movement => movement.id = movement._id.toString())
                            delete post.workout._id
                        }

                        if (post.result._id) {
                            post.result.id = post.result._id.toString()

                            delete post.result._id
                        }

                        post.likes.map(userObjectId => userObjectId.toString())
                        //post.comments.map(userObjectId => userObjectId.toString())
                        //TODO COMMENTS

                    })
                    return (posts)

                })
        })

}
export default getPosts