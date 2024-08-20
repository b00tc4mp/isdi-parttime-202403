import { Task, User } from '../data/index.js'
import { NotFoundError, SystemError, ContentError } from 'com/errors.js'
import validate from 'com/validate.js'

const createTask = (userId, family, assigneeUsername, title, description, date = null) => {
    validate.id(userId, 'userId')
    validate.text(family, 'family')
    validate.text(title, 'title', 60)
    validate.text(description, 'description', 200)

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            let assigneeId = null
            let taskDate = null

            if (date) {
                taskDate = new Date(date)
                if (isNaN(taskDate.getTime())) {
                    throw new ContentError('invalid date format')
                }
            }

            if (assigneeUsername) {
                validate.text(assigneeUsername, 'assigneeUsername')

                return User.findOne({ username: assigneeUsername }).lean()
                    .catch(error => { throw new SystemError(error.message) })
                    .then(assigneeUser => {
                        if (!assigneeUser) throw new NotFoundError('assignee not found')

                        assigneeId = assigneeUser._id

                        const task = {
                            family: user.family,
                            assignee: assigneeId,
                            title,
                            description,
                            date: taskDate,
                            done: []
                        }

                        return Task.create(task)
                            .catch(error => { throw new SystemError(error.message) })
                    })
            } else {
                const task = {
                    family: user.family,
                    title,
                    description,
                    date: taskDate,
                    done: []
                }
                return Task.create(task)
                    .catch(error => { throw new SystemError(error.message) })
            }

        })
}

export default createTask