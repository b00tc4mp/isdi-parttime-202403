import { User, Task } from '../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const addTask = (owner, name, description, status, priority, visible, observations) => {
    validate.id(owner, 'owner')
    validate.text(name, 'name', 60)
    validate.text(description, 'description', 200)
    validate.status(status)
    validate.priority(priority)
    validate.boolean(visible)
    validate.observations(observations, 'observations', 200)

    return User.findById(owner).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            const task = {
                owner,
                name,
                description,
                status,
                priority,
                visible,
                observations,
                completionTime: null
            }

            return Task.create(task)
                .catch(error => { throw new SystemError(error.message) })
                .then(() => { })
        })
}

export default addTask