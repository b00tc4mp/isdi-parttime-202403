import errors, { SystemError } from 'com/errors'

import extractPayloadFromJWT from '../utils/extractPayloadFromJWT'

const getUserName = () => {
    const { sub: userId } = extractPayloadFromJWT(sessionStorage.token)

    return fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }
    })
        .catch(() => { throw new SystemError('server is not available') })
        .then(response => {
            if (response.status === 200)

                return response.json()
                    .then(name => name)
                    .catch(() => { throw new SystemError('server is not available') })


            return response.json()
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default getUserName
