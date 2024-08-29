import validate from 'com/validate'
import errors, { SystemError } from 'com/errors'

const updateTaskDescription = (description, taskId) => {
    validate.text(description, 'description', 200)
    validate.id(taskId, 'taskId')


    return fetch(`${import.meta.env.VITE_API_URL}/description/${taskId}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description })
    })
        .catch(() => { throw new SystemError('server error') })
        .then(response => {
            if (response.status === 200) return

            return response.json()
                .catch(() => { throw new SystemError('server error') })
                .then(body => {
                    const { error, message } = body
                    const constructor = errors[error]
                    throw new constructor(message)
                })
        })
}

export default updateTaskDescription