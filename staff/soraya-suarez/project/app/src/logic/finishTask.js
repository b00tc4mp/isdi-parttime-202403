import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const finishTask = (taskId, completionTime) => {
    validate.id(taskId)
    validate.number(completionTime)

    return fetch(`${import.meta.env.VITE_API_URL}/tasks/${taskId}/finish`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completionTime })
    })
        .catch(() => { throw new SystemError('server error') })
        .then(response => {
            if (response.status === 204) 
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

export default finishTask