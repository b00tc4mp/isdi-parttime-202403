import { User, Task } from "../data/index.js"
import { NotFoundError, SystemError } from "com/errors.js"
import Validate from "com/validate.js"

const getTasksForDay = (userId, dayOfMonth) => {
    Validate.id(userId, 'userId')

    const today = new Date()
    const date = new Date(today.getFullYear(), today.getMonth(), dayOfMonth)
    const startOfDay = new Date(date.setHours(0, 0, 0, 0))
    const endOfDay = new Date(date.setHours(23, 59, 59, 999))

    return User.findById(userId).lean()
        .catch(error => {
            throw new SystemError(error.message)
        })
        .then(user => {
            if (!user) {
                throw new NotFoundError("user not found")
            }

            const { family } = user

            return Task.find({
                family,
                date: {
                    $gte: startOfDay,
                    $lte: endOfDay
                }
            }).lean()
                .catch(error => {
                    throw new SystemError(error.message)
                })
                .then(tasks => {
                    tasks.forEach(task => {
                        task.id = task._id.toString()
                        delete task._id
                    })

                    return tasks
                })
        })
}

export default getTasksForDay