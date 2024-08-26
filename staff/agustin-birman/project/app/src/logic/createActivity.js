import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const createActivity = (title, description) => {
    validate.text(title, 'title', 50)
    validate.text(description, 'description', 200)

    return fetch(`${import.meta.env.VITE_API_URL}/activity`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description })
    })
        .catch(() => { throw new SystemError('server error') })
        .then(response => {
            if (response.status === 201)
                return response.json()
                    .catch(() => { throw new SystemError('server error') })
                    .then(data => {
                        const { activityId } = data
                        return activityId
                    })

            return response.json()
                .catch(() => { throw new SystemError('server error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default createActivity

