import { Task, User } from '../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const createTask = (parentId, assignee, title, description) => {
    validate.id(parentId, 'parentId')
    validate.text(title, 'title', 60)
    validate.text(description, 'description', 200)

    if (assignee) {

        validate.id(assignee, 'assignee')

        return User.findOne({ username: assignee }).lean()
            .catch(error => { throw new SystemError(error.message) })
            .then(user => {
                if (!user) throw new NotFoundError('assignee not found')

                const { _id: assigneeId } = user

                return User.findById(parentId).lean()
                    .catch(error => { throw new SystemError(error.message) })
                    .then(user => {
                        if (!user) throw new NotFoundError('admin not found')

                        const task = {
                            parent: parentId,
                            assignee: assigneeId,
                            title,
                            description,
                            date: new Date(),
                            done: []
                        }

                        return Task.create(task)
                            .catch(error => { throw new SystemError(error.message) })
                            .then(() => { })
                    })
            })
    } else {
        return User.findById(parentId).lean()
            .catch(error => { throw new SystemError(error.message) })
            .then(user => {
                if (!user) throw new NotFoundError('admin not found')

                const task = {
                    parent: parentId,
                    title,
                    description,
                    date: new Date(),
                    done: []
                }
                return Task.create(task)
                    .catch(error => { throw new SystemError(error.message) })
                    .then(() => { })
            })
    }
}

export default createTask