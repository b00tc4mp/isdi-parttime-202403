import validate from 'com/validate.js'
import { User, Activity } from '../../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'

const createActivity = (userId, title, description) => {
    validate.id(userId, 'userId')
    validate.text(title, 'title', 50)
    validate.text(description, 'description', 200)

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            const newActivity = {
                teacher: userId,
                title,
                description
            }

            return Activity.create(newActivity)
                .catch(error => { throw new SystemError(error.message) })
                .then(activity => {
                    activity.id = activity._id.toString()

                    delete activity._id

                    return activity.id
                })
        })
}

export default createActivity