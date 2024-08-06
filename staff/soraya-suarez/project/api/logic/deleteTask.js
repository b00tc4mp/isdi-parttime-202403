import { User, Task } from '../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'
import { Types } from 'mongoose'

const { ObjectId } = Types

const deleteTask = (userId, taskId) => {
    validate.id(userId, 'userId')
    validate.id(taskId, 'taskId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user owner of task not found')

            return Task.findById(taskId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(task => {
                    if (!task) throw new NotFoundError('task not found')

                    //if (task.owner.toString() !== owner)
                    if (task.creator.toString() !== userId)
                        throw new MatchError('task creator does not match userId')

                    return Task.deleteOne({ _id: new ObjectId(taskId) })
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => { })
                })
        })
}

export default deleteTask