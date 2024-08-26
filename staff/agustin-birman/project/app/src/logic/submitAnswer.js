import errors, { SystemError } from "com/errors"
import validate from "com/validate"

const submitAnswer = (activityId, exerciseId, answer) => {
    validate.id(activityId, 'activityId')
    validate.id(exerciseId, 'exerciseId')
    validate.text(answer, 'answer')

    return fetch(`${import.meta.env.VITE_API_URL}/answer`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ activityId, exerciseId, answer })
    })
        .catch(() => { throw new SystemError('server error') })
        .then(response => {
            if (response.status === 201)
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
export default submitAnswer
