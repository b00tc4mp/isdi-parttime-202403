import { User, Task } from '../data/index.js'
import { MatchError, NotFoundError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const selectTask = (userId, taskId) => {
    validate.id(userId)
    validate.id(taskId)

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Task.findById(taskId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(task => {
                    if (!task) throw new NotFoundError('task not found')

                    if (task.owner !== null)
                        throw new MatchError('task already have a owner')
                    
                    const update = { owner: userId, status: 'toDo' }

                    return Task.updateOne( { _id: task._id }, update)
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => { })
                })
        })
}

export default selectTask