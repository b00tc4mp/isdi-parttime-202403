import validate from 'com/validate.js'
import { Activity, Answer, Exercise, User } from '../../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'

const getExercises = (userId, activityId) => {
    validate.id(userId, 'userId')
    validate.id(activityId, 'activityId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            return Activity.findById(activityId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(activity => {
                    if (!activity)
                        throw new NotFoundError('activity not found')

                    return Answer.countDocuments({ activity: activityId }).lean()
                        .catch(error => { throw new SystemError(error.message) })
                        .then(count => {

                            return Exercise.find({ activity: activityId })
                                .catch(error => { throw new SystemError(error.message) })
                                .then(exercises => {
                                    const transformedExercises = exercises.map(exercise => {
                                        const exerciseObj = exercise.toObject()
                                        exerciseObj.id = exerciseObj._id
                                        delete exerciseObj._id
                                        return exerciseObj
                                    })

                                    return {
                                        exercises: transformedExercises,
                                        count: count
                                    }
                                })
                        })
                })
        })
}


export default getExercises

// exercises.forEach(exercise => {
//     exercise.id = exercise._id.toString()

//     delete exercise._id
// })