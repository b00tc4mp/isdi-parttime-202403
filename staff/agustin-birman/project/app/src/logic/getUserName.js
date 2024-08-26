import errors from 'com/errors'

import extractPayloadFromJWT from '../utils/extractPayloadFromJWT'

const getUserName = () => {

    const { sub: userrId } = extractPayloadFromJWT(localStorage.token)

    return fetch(`${import.meta.env.VITE_API_URL}/users/${userrId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.token}`
        }
    })
        .catch(() => { throw new SystemError('server error') })
        .then(response => {
            if (response.status === 200) {
                return response.json()
                    .catch(() => { throw new SystemError('server error') })
                    .then(name => name)
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

export default getUserName