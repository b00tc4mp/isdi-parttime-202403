import { User, Result } from "../data/index.js"
import { MatchError, NotFoundError, SystemError } from "com/errors.js"
import validate from "com/validate.js"


const deleteResult = (userId, resultId) => {
    validate.id(userId, "userId")
    validate.id(resultId, "resultId")

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError("user not found")

            return Result.findById(resultId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(result => {
                    if (!result) throw new NotFoundError("result not found")
                    if (result.athlete.toString() !== userId) {
                        throw new MatchError("result doesn't match user")
                    }

                    return Result.deleteOne({ _id: resultId })
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => { })
                })

        })
}

export default deleteResult