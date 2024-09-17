import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const modifyTaskObservations= (taskId, observations) => {
    validate.id(taskId)
    validate.observations(observations)

    return fetch(`${import.meta.env.VITE_API_URL}/tasks/${taskId}/modify-task-observations`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ observations })
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

export default modifyTaskObservations