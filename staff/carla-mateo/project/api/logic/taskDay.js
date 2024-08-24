import { User, Task } from '../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'
import Validate from 'com/validate.js'

const taskDay = (userId, selectedDate) => {
    Validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .catch((error) => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError('user not found')
            }
            const { family } = user

            const startOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 0)
            const endOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0)

            return Task.find({
                family,
                date: {
                    $gte: startOfMonth,
                    $lte: endOfMonth
                }
            }).lean()
                .catch((error) => { throw new SystemError(error.message) })
                .then(tasks => {
                    const daysWithTasks = new Set()
                    tasks.forEach((task) => {
                        const taskDate = new Date(task.date)
                        const dayOfMonth = taskDate.getDate()
                        daysWithTasks.add(dayOfMonth)
                    })
                    return Array.from(daysWithTasks).sort((a, b) => a - b)
                })
        })
}

export default taskDay