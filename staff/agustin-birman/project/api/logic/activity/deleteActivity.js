import validate from 'com/validate.js';
import { Activity, Answer, Exercise, User } from '../../data/index.js';
import { MatchError, NotFoundError, SystemError } from 'com/errors.js';
import { Types } from 'mongoose';

const { ObjectId } = Types

const deleteActivity = (userId, activityId) => {
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

                    if (activity.teacher.toString() !== userId)
                        throw new MatchError('you are not the owner of the activity')

                    return Activity.deleteOne({ _id: new ObjectId(activityId) })
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => {

                            return Exercise.deleteMany({ activity: new ObjectId(activityId) })
                                .catch(error => { throw new SystemError(error.message) })
                                .then(() => {
                                    return Answer.deleteMany({ activity: new ObjectId(activityId) })
                                        .catch(error => { throw new SystemError(error.message) })
                                        .then(() => { })
                                })
                        })
                })
        })
}

export default deleteActivity