import { Task, User } from '../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const createTask = (userId, family, assigneeUsername, title, description) => {
    validate.id(userId, 'userId')
    validate.text(family, 'family')
    validate.text(title, 'title', 60)
    validate.text(description, 'description', 200)

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found')

            let assigneeId = null

            // Si se proporciona un assigneeUsername, buscar al usuario asignado
            if (assigneeUsername) {
                validate.text(assigneeUsername, 'assigneeUsername')

                return User.findOne({ username: assigneeUsername }).lean()
                    .catch(error => { throw new SystemError(error.message) })
                    .then(assigneeUser => {
                        if (!assigneeUser) throw new NotFoundError('Assignee not found')

                        assigneeId = assigneeUser._id

                        // Crear la tarea con el assignee encontrado
                        const task = {
                            family: user.family,
                            assignee: assigneeId,
                            title,
                            description,
                            date: new Date(),
                            done: []
                        }

                        return Task.create(task)
                            .catch(error => { throw new SystemError(error.message) })
                    })
            } else {
                // Crear la tarea sin assignee
                const task = {
                    family: user.family,
                    title,
                    description,
                    date: new Date(),
                    done: []
                }
                return Task.create(task)
                    .catch(error => { throw new SystemError(error.message) })
            }

        })
}

export default createTask