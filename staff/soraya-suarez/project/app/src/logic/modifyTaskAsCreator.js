import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const modifyTaskAsCreator= (taskId, name, description, priority) => {
    validate.id(taskId)
    validate.name(name)
    validate.text(description, 'description', 200)
    validate.priority(priority)

    return fetch(`${import.meta.env.VITE_API_URL}/tasks/${taskId}/modifyAsCreator`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, description, priority })
    })
        .catch(() => { throw new SystemError('server error') })
        .then(response => {
            if (response.status === 200) 
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

export default modifyTaskAsCreator