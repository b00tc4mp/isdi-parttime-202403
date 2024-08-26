import validate from 'com/validate.js';
import { User, Answer, Exercise, Activity } from '../../data/index.js';
import { DuplicityError, NotFoundError, SystemError } from 'com/errors.js';

const submitAnswer = (userId, activityId, exerciseId, answer) => {
    validate.id(userId, 'userId')
    validate.id(activityId, 'activityId')
    validate.id(exerciseId, 'exerciseId')
    validate.text(answer, 'answer')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            return Activity.findById(activityId)
                .catch(error => { throw new SystemError(error.message) })
                .then(activity => {
                    if (!activity)
                        throw new NotFoundError('activity not found')

                    return Exercise.findById(exerciseId).lean()
                        .catch(error => { throw new SystemError(error.message) })
                        .then(exercise => {
                            if (!exercise)
                                throw new NotFoundError('exercise not found')

                            return Answer.findOne({ student: userId, exercise: exerciseId }).lean()
                                .catch(error => { throw new SystemError(error.message) })
                                .then(existingAnswer => {
                                    if (existingAnswer)
                                        throw new DuplicityError('Answer already exists for this exercise')

                                    const newAnswer = {
                                        student: userId,
                                        activity: activityId,
                                        exercise: exerciseId,
                                        answer
                                    }

                                    return Answer.create(newAnswer)
                                        .catch(error => { throw new SystemError(error.message) })
                                        .then(answer => {
                                            answer.id = answer._id.toString()

                                            delete answer._id

                                            return answer
                                        })
                                })
                        })
                })
        })
}

export default submitAnswer