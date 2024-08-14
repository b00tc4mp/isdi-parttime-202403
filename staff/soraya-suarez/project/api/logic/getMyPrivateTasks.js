import { User, Task } from '../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const getMyPrivateTasks = (userId) => {
    validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            return Task.find({ creator: userId, visible: false }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(tasks => {
                    tasks.forEach((task) => {
                        task.id = task._id.toString()
                        delete task._id
                    })
                    return tasks
                })
        })
}

export default getMyPrivateTasks