import validate from 'com/validate.js'
import { Activity, Answer, Exercise, User } from '../../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'
import { Types } from 'mongoose'

const { ObjectId } = Types
const deleteExercise = (userId, exerciseId) => {
    validate.id(userId, 'userId')
    validate.id(exerciseId, 'exerciseId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            return Exercise.findById(new ObjectId(exerciseId))
                .catch(error => { throw new SystemError(error.message) })
                .then(exercise => {
                    if (!exercise)
                        throw new NotFoundError('exercise not found')

                    return Activity.findById(exercise.activity)
                        .catch(error => { throw new SystemError(error.message) })
                        .then(activity => {
                            if (!activity)
                                throw new NotFoundError('activity not found')

                            if (activity.teacher.toString() !== userId)
                                throw new MatchError('you are not the owner of the exercise')

                            return Exercise.deleteOne({ _id: new ObjectId(exerciseId) })
                                .catch(error => { throw new SystemError(error.message) })
                                .then(() => {

                                    return Exercise.find({ activity: exercise.activity, index: { $gt: exercise.index } }).sort({ index: 1 })
                                        .catch(error => { throw new SystemError(error.message) })
                                        .then(exercises => {
                                            const updatePromises = exercises.map((_exercise, index) => {
                                                return Exercise.updateOne({ _id: new ObjectId(_exercise._id) }, { $set: { index: exercise.index + index } })
                                            })
                                            return Promise.all(updatePromises)
                                                .catch(error => { throw new SystemError(error.message) })
                                                .then(() => {

                                                    return Answer.deleteMany({ exercise: exerciseId })
                                                        .catch(error => { throw new SystemError(error.message) })
                                                        .then(() => { })
                                                })
                                        })
                                })
                        })
                })
        })
}

export default deleteExercise