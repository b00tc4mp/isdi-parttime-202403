import validate from 'com/validate.js'
import { Activity, User } from '../../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'

import { Types } from 'mongoose'

const { ObjectId } = Types

const editActivity = (userId, activityId, title, description) => {
    validate.id(userId, 'userId')
    validate.id(activityId, 'activityId')
    if (title !== '') validate.text(title, 'title', 50)
    if (description !== '') validate.text(description, 'description', 200)

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

                    const updates = {}
                    if (title !== '') updates.title = title
                    if (description !== '') updates.description = description

                    return Activity.updateOne({ _id: new ObjectId(activityId) }, { $set: updates })
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => { })
                })
        })
}

export default editActivity