import { User, Task } from '../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const getDatesWithTask = (userId, selectedDate) => {
    validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .catch((error) => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError('user not found')
            }
            const { family } = user

            selectedDate = new Date(selectedDate)

            const startDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
            const endDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1)

            return Task.find({
                family,
                date: {
                    $gte: startDate,
                    $lt: endDate
                }
            }).lean()
                .catch((error) => { throw new SystemError(error.message) })
                .then(tasks => {
                    const dates = []

                    tasks.forEach(task => {
                        if (!dates.some(date => date.toISOString() === task.date.toISOString())) {
                            dates.push(task.date)
                        }
                    })
                    return dates.sort()
                })
        })
}

export default getDatesWithTask