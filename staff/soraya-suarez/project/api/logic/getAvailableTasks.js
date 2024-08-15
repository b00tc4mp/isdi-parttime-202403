import { User, Task } from '../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const getAvailableTasks = (userId) => {
    validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

                return Task.find({ status: 'toDo', visible: true }).lean()
                    .catch(error => { throw new SystemError(error.message) })
                    .then(tasks => {
                        tasks.forEach((task) => {
                            task.id = task._id.toString()
                            delete task._id
                        })

                        return Task.find({ status: 'canceled', visible: true }).lean()
                            .catch(error => { throw new SystemError(error.message) })
                            .then(tasksOwner => {
                                tasksOwner.forEach((taskCanceled) => {
                                    taskCanceled.id = taskCanceled._id.toString()
                                    delete taskCanceled._id

                                    const exist = tasks.some(task => task.id === taskCanceled.id)

                                    if (!exist) {
                                        tasks.push(taskOwner)
                                    }
                                })
                                return tasks

                            })
                    })
        })
}

export default getAvailableTasks