import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const addTask = (owner, name, description, status, priority, visible) => {
    validate.id(owner, 'owner')
    validate.text(name, 'name', 60)
    validate.text(description, 'description', 200)
    validate.status(status)
    validate.priority(priority)
    validate.boolean(visible)

    return fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ owner, name, description, status, priority, visible })
    })
        .catch(() => { throw new SystemError('server error') })
        .then(response => {
            if (response.status === 201)
                return

            return response.json()
                .catch(() => { throw new SystemError('server error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default addTask