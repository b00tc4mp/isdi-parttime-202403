import { User, Result } from "../data/index.js"
import { MatchError, NotFoundError, SystemError } from "com/errors.js"
import validate from "com/validate.js"
import { Types } from 'mongoose'

const { ObjectId } = Types

const updateResult = (userId, resultId, time, repetitions, weight) => {
    validate.id(userId, "userId")
    validate.id(resultId, "resultId")
    validate.number(time, "time");
    validate.number(repetitions, "repetitions");
    validate.number(weight, "weight");
    /*    if (time !== undefined) validate.number(time, "time");
       if (repetitions !== undefined) validate.number(repetitions, "repetitions");
       if (weight !== undefined) validate.number(weight, "weight"); */

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError("user not found")

            return Result.findById(resultId)
                .catch(error => { throw new SystemError(error.message) })
                .then(result => {
                    if (!result) throw new NotFoundError("result not found")
                    if (result.athlete.toString() !== userId) {
                        throw new MatchError("result doesn't match user")
                    }

                    const changes = {}

                    if (time !== undefined) changes.time = time;
                    if (repetitions !== undefined) changes.repetitions = repetitions;
                    if (weight !== undefined) changes.weight = weight;

                    return Result.updateOne({ _id: resultId }, { $set: changes })
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => { })
                })
        })

}

export default updateResult