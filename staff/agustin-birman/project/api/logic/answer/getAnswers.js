import validate from "com/validate.js";
import { Answer, Exercise, User } from "../../data/index.js";
import { NotFoundError, SystemError } from "com/errors.js";
import { Types } from 'mongoose'

const { ObjectId } = Types

const getAnswers = (userId, exerciseId) => {
    validate.id(userId, 'userId')
    validate.id(exerciseId, 'exerciseId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            return Exercise.findById(exerciseId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(exercise => {
                    if (!exercise)
                        throw new NotFoundError('exercise not found')

                    return Answer.find({ exercise: new ObjectId(exerciseId) })
                        .catch(error => { throw new SystemError(error.message) })
                        .then(answers => {
                            return answers.map(answer => {
                                const answerObj = answer.toObject()
                                answerObj.id = answerObj._id
                                delete answerObj._id
                                return answerObj
                            })
                        })
                })
        })
}
export default getAnswers