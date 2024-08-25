import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const toggleDoneTask = (taskId) => {
    validate.id(taskId, 'taskId')

    return fetch(`${import.meta.env.VITE_API_URL}/task/${taskId}done`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.token}`
        }
    })
        .catch(() => { throw new SystemError('server error') })
        .then(response => {
            if (response.status === 204) return

            return response.json()
                .catch(() => { throw new SystemError('server error') })
                .then(body => {
                    const { error, message } = body
                    const constructor = errors[error]
                    throw new constructor(message)
                })
        })
}

export default toggleDoneTask