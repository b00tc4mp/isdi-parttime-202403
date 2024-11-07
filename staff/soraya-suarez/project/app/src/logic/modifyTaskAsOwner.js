import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const modifyTaskAsOwner= (taskId, status, observations) => {
    validate.id(taskId)
    validate.status(status)
    validate.observations(observations)

    return fetch(`${import.meta.env.VITE_API_URL}/tasks/${taskId}/modify-as-owner`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status, observations })
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

export default modifyTaskAsOwner