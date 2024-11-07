import { User, Task } from '../data/index.js'
import { SystemError, MatchError, NotFoundError } from 'com/errors.js'
import validate from 'com/validate.js'

const modifyTaskVisible = (userId, taskId, visible) => {
    validate.id(userId)
    validate.id(taskId)
    validate.boolean(visible)

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

                    if (task.owner.toString() !== userId)
                        throw new MatchError('you are not the owner')
                    
                    const update = { visible }

                    return Task.updateOne( { _id: task._id }, update)
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => { })
                })
        })
}

export default modifyTaskVisible