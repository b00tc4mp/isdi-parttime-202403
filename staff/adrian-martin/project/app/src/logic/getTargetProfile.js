import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const getTargetProfile = (targetProfileId) => {
    validate.id(targetProfileId, 'targetProfileId')

    return fetch(`${import.meta.env.VITE_API_URL}/profile/${targetProfileId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }
    })
        .catch(() => { throw new SystemError('Connection error') })
        .then(response => {
            if (response.status === 200)
                return response.json()
                    .catch(() => { throw new SystemError('Connection error') })
                    .then(profile => profile)

            return response.json()
                .catch(() => { throw new SystemError('Connection error') })
                .then(body => {
                    const { error, message } = body
                    const constructor = errors[error]
                    throw new constructor(message)
                })
        })
}

export default getTargetProfile
