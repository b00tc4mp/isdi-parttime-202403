import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const editActivity = (activityId, title, description) => {
    validate.id(activityId, 'activityId')
    if (title !== '') {
        validate.text(title, 'title', 50)
    }
    if (description !== '') {
        validate.text(description, 'description', 200)
    }

    return fetch(`${import.meta.env.VITE_API_URL}/activities/${activityId}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${localStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ activityId, title, description })
    })
        .catch(() => { throw new SystemError('server error') })
        .then(response => {
            if (response.status === 200)
                return

            return response.json()
                .catch(() => { throw new SystemError(error.message) })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default editActivity