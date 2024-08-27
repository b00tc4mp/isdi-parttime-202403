import { User, Task } from '../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const getDayWithTask = (userId) => {
    validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .catch((error) => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError('user not found')
            }
            const { family } = user

            const currentDate = new Date()

            const startOfDay = new Date(currentDate.setHours(0, 0, 0, 0))
            const endOfDay = new Date(currentDate.setHours(23, 59, 59, 999))

            return Task.exists({
                family,
                date: {
                    $gte: startOfDay,
                    $lte: endOfDay
                }
            }).lean()
                .catch((error) => { throw new SystemError(error.message) })
                .then(tasksExist => !!tasksExist)
        })
}

export default getDayWithTask