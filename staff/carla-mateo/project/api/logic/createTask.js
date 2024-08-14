import { Task, User } from '../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const createTask = (parent, assign, title, description) => {
    validate.id(parent, 'parent')
    validate.id(assign, 'assign')
    validate.text(title, 'title', 60)
    validate.text(description, 'description', 200)

    return User.findOne({ name: assign }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {

            const { _id: assignId } = user

            return User.findById(parent).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(user => {
                    if (!user) throw new NotFoundError('admin not found')

                    const task = {
                        parent,
                        assign: assignId,
                        title,
                        description,
                        date: new Date(),
                        done: []
                    }

                    return Task.create(task)
                        .catch(error => { throw new SystemError(error.message) })
                        .then((task) => {
                            return task
                        })
                })
        })
}

export default createTask