import { User, Task } from '../data/index.js'
import { SystemError, MatchError, NotFoundError } from 'com/errors.js'
import validate from 'com/validate.js'

const modifyTaskPriority = (userId, taskId, priority) => {
    validate.id(userId)
    validate.id(taskId)
    validate.priority(priority)

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Task.findById(taskId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(task => {
                    if (!task) throw new NotFoundError('task not found')

                    if (task.creator.toString() !== userId)
                        throw new MatchError('you are not the creator')
                    
                    const update = { priority }

                    return Task.updateOne( { _id: task._id }, update)
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => { })
                })
        })
}

export default modifyTaskPriority