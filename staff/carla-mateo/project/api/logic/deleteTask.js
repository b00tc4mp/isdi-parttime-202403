import { User, Task } from '../data/index.js'
import { NotFoundError, SystemError, MatchError } from 'com/errors.js'
import validate from 'com/validate.js'

const deleteTask = (userId, taskId) => {
    validate.id(userId, 'userId')
    validate.id(taskId, 'taskId')

    return User.findById(userId).lean()
        .catch(() => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Task.findById(taskId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(task => {
                    if (!task) throw new NotFoundError('task not found')

                    if (task.parent.toString() !== userId)
                        throw new MatchError('task does not match user')

                    return Task.deleteOne({ _id: taskId })
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => { })
                })
        })
}

export default deleteTask