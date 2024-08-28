import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const deleteExercise = exerciseId => {
    validate.id(exerciseId, 'exerciseId')

    return fetch(`${import.meta.env.VITE_API_URL}/exercises/${exerciseId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${localStorage.token}`
        }
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

export default deleteExercise