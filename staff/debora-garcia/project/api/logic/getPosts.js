import { User, Post } from "../data/index.js"
import { SystemError, NotFoundError } from "com/errors.js"
import validate from "com/validate.js"
const getPosts = (userId) => {
    validate.id(userId, "userId")
    // validate.number(time, "time")
    // validate.number(repetitions, "repetitions")
    // validate.number(weight, "weight")

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
                        post.coments.map(userObjectId => userObjectId.toString())


                    })
                    return (posts)

                })
        })

}
export default getPosts