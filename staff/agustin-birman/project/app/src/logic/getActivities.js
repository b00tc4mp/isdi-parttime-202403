import errors, { SystemError } from '../../../com/errors'

const getActivities = () => {
    return fetch(`${import.meta.env.VITE_API_URL}/activities`, {
        headers: {
            Authorization: `Bearer ${localStorage.token}`
        }
    })
        .catch(() => { throw new SystemError('server error') })
        .then(response => {
            if (response.status === 200) {
                return response.json()
                    .catch(() => { throw new SystemError('server error') })
                    .then(activities => activities)
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

export default getActivities