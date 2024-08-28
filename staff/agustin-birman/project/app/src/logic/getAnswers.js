import errors, { SystemError } from '../../../com/errors'
import validate from '../../../com/validate'

const getAnswers = exerciseId => {
    validate.id(exerciseId, 'exerciseId')

    return fetch(`${import.meta.env.VITE_API_URL}/answers/${exerciseId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.token}`
        }
    })
        .catch(() => { throw new SystemError('server error') })
        .then(response => {
            if (response.status === 200)
                return response.json()
                    .catch(() => { throw new SystemError('server error') })
                    .then(answers => answers)

            return response.json()
                .catch(() => { throw new SystemError('server error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default getAnswers