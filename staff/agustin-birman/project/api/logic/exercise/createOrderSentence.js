import validate from "com/validate.js"
import { Activity, Exercise, User } from "../../data/index.js"
import { OrderSentenceExercise } from "../../data/Exercise.js"
import { NotFoundError, SystemError } from "com/errors.js"

const createOrderSentence = (userId, activityId, sentence, translate) => {
    validate.id(userId, 'userId')
    validate.id(activityId, 'activityId')
    validate.text(sentence, 'sentence')

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

                    return Exercise.countDocuments({ activity: activityId })
                        .catch(error => { throw new SystemError(error.message) })
                        .then(index => {

                            const newExercise = {
                                activity: activityId,
                                sentence,
                                translate,
                                index
                            }

                            return OrderSentenceExercise.create(newExercise)
                                .catch(error => { throw new SystemError(error.message) })
                                .then(() => { })
                        })
                })
        })
}
export default createOrderSentence