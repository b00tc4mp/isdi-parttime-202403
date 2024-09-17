import { User, Task } from '../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const getMyTasks = (userId) => {
    validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            return Task.find({ creator: userId }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(tasks => {
                    tasks.forEach((task) => {
                        task.id = task._id.toString()
                        delete task._id
                    })

                    return Task.find({ owner: userId }).lean()
                        .catch(error => { throw new SystemError(error.message) })
                        .then(tasksOwner => {
                            tasksOwner.forEach((taskOwner) => {
                                taskOwner.id = taskOwner._id.toString()
                                delete taskOwner._id

                                const exist = tasks.some(task => task.id === taskOwner.id)

                                if (!exist) {
                                    tasks.push(taskOwner)
                                }
                            })
                            return tasks

                        })
                })

                
        })
}

export default getMyTasks