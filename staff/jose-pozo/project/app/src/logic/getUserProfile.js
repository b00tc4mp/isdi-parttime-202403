import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'


const getUserProfile = (targetUserId) => {
    validate.id(targetUserId, 'targetUserId')

    return fetch(`${import.meta.env.VITE_API_URL}/users/${targetUserId}/profile`, {
        method: 'GET',

        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }
    })

        .catch(() => { throw new SystemError('server error') })
        .then(response => {
            if (response.status === 200) {
                return response.json()
                    .catch(() => { throw new SystemError('server error') })
                    .then(userProfile => userProfile)
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


export default getUserProfile

