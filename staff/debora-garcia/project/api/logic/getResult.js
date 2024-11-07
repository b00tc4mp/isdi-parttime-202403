import { User, Result } from "../data/index.js"
import { SystemError, NotFoundError } from "com/errors.js"
import validate from "com/validate.js"

const getResult = (userId, resultId) => {
    validate.id(userId, "userId")
    validate.id(resultId, "resultId")

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError("user not found")

            return Result.findById(resultId).lean()
                .populate("athlete")
                .populate({
                    path: "workout",
                    populate: { path: "movements" }
                })
                .select("-__v")
                .lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(result => {
                    if (!result) throw new NotFoundError("result not found")

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

                    return result
                })
        })
}

export default getResult