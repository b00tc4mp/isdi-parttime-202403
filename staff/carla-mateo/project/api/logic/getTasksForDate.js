import { User, Task } from "../data/index.js"
import { NotFoundError, SystemError } from "com/errors.js"
import validate from "com/validate.js"

const getTasksForDate = (userId, date) => {
    validate.id(userId, 'userId')
    validate.date(date, 'date')

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
            }, { __v: 0 }).lean()
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

export default getTasksForDate