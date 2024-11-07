import { User, Task } from '../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const getMyInProgressTasks = (userId) => {
    validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            return Task.find({ owner: userId, status: 'inProgress' }).lean()
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

export default getMyInProgressTasks