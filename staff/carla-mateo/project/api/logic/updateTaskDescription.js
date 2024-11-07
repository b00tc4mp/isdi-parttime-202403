import validate from "com/validate.js"
import { User, Task } from '../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'

const updateTaskDescription = (userId, taskId, description) => {
    validate.id(userId, 'userId')
    validate.id(taskId, 'taskId')
    validate.text(description, 'description', 50)

    return User.findById(userId).lean()
        .catch(() => { throw new SystemError('server error') })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Task.findById(taskId).lean()
                .catch(() => { throw new SystemError('server error') })
                .then(task => {
                    if (!task) throw new NotFoundError('task not found')

                    return Task.findByIdAndUpdate(taskId, { description: description }, { new: true })
                        .catch(() => { throw new SystemError('server error') })
                        .then(() => { })
                })
        })
}

export default updateTaskDescription