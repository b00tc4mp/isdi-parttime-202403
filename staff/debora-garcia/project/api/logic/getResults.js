import { User, Result } from "../data/index.js"
import { SystemError, NotFoundError } from "com/errors.js"
import validate from "com/validate.js"
const getResults = (userId) => {
    validate.id(userId, "userId")

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError("user not found")

            return Result.find({ athlete: userId })
                .populate("workout")
                .populate("athlete")
                .select("-__v")
                .sort({ date: -1 })
                .lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(results => {
                    if (results.length === 0) throw new NotFoundError("you did't submit any result")
                    results.forEach(result => {
                        result.id = result._id.toString()
                        delete result._id

                        if (result.workout._id) {
                            result.workout.id = result.workout._id.toString()
                            delete result.workout._id
                        }

                        if (result.athlete._id) {
                            result.athlete.id = result.athlete._id.toString()
                            delete result.athlete._id
                        }
                    })

                    return results
                })
        })
}

export default getResults