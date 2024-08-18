import { User, Task } from '../data/index.js'
import { DuplicityError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const addTask = (creator, owner, name, description, status, priority, visible) => {
    validate.id(creator)
    validate.id(owner)
    validate.text(name, 'name', 60)
    validate.text(description, 'description', 200)
    validate.status(status)
    validate.priority(priority)
    validate.boolean(visible)

    return User.findById(creator).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            const newTask = {
                creator,
                owner,
                name,
                description,
                status,
                priority,
                visible,
                observations: '',
                completionTime: 0
            }

            return Task.create(newTask)
                .catch(error => { throw new SystemError(error.message) })
                .then(() => { })
            
        })
}

export default addTask