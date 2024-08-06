import { User, Task } from '../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'
import { Types } from 'mongoose'

const { ObjectId } = Types

const deleteTask = (owner, taskId) => {
    validate.id(owner, 'owner')
    validate.id(taskId, 'taskId')

    return User.findById(owner).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user owner not found')

            return Task.findById(taskId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(task => {
                    if (!task) throw new NotFoundError('task not found')

                    if (task.owner.toString() !== owner)
                        throw new MatchError('task owner does not match owner')

                    return Task.deleteOne({ _id: new ObjectId(taskId) })
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => { })
                })
        })
}

export default deleteTask