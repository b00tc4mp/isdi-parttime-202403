import { User, Task } from '../data/index.js'
import validate from 'com/validate.js'
import { ContentError, NotFoundError, SystemError } from 'com/errors.js'

function toggleDoneTask(userId, taskId) {
    validate.id(userId, 'userId')
    validate.id(taskId, 'taskId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Task.findById(taskId)
                .catch(error => { throw new SystemError(error.message) })
                .then(task => {
                    if (!task) { throw new NotFoundError('task not found') }

                    if (task.assignee) {
                        const assigneeId = task.assignee.toString()
                        if (assigneeId !== userId) {
                            throw new ContentError('user is not assigned to this task')
                        }
                    }

                    const included = task.done.some(userObjectId => userObjectId.toString() === userId)

                    return Task.updateOne({ _id: task._id },
                        included ?
                            { $pull: { done: user._id } }
                            :
                            { $push: { done: user._id } }
                    )
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => { })
                })
        })
}

export default toggleDoneTask