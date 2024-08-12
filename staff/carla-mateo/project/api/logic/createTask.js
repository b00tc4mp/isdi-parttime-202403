import { Task, User } from '../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const createTask = (parent, assign, title) => {
    validate.id(parent, 'parent')
    validate.id(assign, 'assign')
    validate.text(title, 'title', 60)

    return User.findById(parent).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            const task = {
                parent,
                assign,
                title,
                date: new Date,
                done: []
            }

            return Task.create(task)
                .catch(error => { throw new SystemError(error.message) })
                .then(() => { })
        })
}

export default createTask