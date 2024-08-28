import { User, Post, Result } from "../data/index.js"
import validate from "com/validate.js"
import { NotFoundError, SystemError } from "com/errors.js"

const createPost = (userId, workoutId, image, description, time, repetitions, weight) => {
    validate.id(userId, "userId")
    validate.id(workoutId, "workoutId")

    validate.url(image, "image")
    validate.text(description, "description", 150)
    if (repetitions || repetitions === 0) validate.number(repetitions, "repetitions");
    if (weight || weight === 0) validate.number(weight, "weight");
    if (time || time === 0) validate.time(time, "time")

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError("user not found")
            const result = {
                workout: workoutId,
                athlete: userId,
                time,
                repetitions,
                weight,
                date: Date.now()
            }
            return Result.create(result)
                .catch(error => { throw new SystemError(error.message) })
                .then(result => {
                    const post = {
                        author: userId,
                        image: image,
                        workout: workoutId,
                        result: result._id,
                        description: description,
                        date: Date.now(),
                        likes: [],

                    }

                    return Post.create(post)
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => { })

                })
        })
}

export default createPost


