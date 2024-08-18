import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const selectTask = (taskId) => {
    validate.id(taskId)

    return fetch(`${import.meta.env.VITE_API_URL}/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        },
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

export default selectTask