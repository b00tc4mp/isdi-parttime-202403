import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const getExerciseType = activityId => {
    validate.id(activityId, 'activityId')

    return fetch(`${import.meta.env.VITE_API_URL}/activities/${activityId}/type`, {
        headers: {
            Authorization: `Bearer ${localStorage.token}`
        }
    })
        .catch(() => { throw new SystemError('server error') })
        .then(response => {
            if (response.status === 200) {
                return response.json()
                    .catch(() => { throw new SystemError('server error') })
                    .then(type => type)
            }
            return response.json()
                .catch(() => { throw new SystemError('server error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default getExerciseType