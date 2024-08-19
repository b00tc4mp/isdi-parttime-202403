import errors, { SystemError } from 'com/errors'

import extractPayloadFromJWT from '../utils/extractPayloadFromJWT'

const getUserName = () => {

    const { sub: userId } = extractPayloadFromJWT(sessionStorage.token)

    return fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {

        method: "GET",
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }
    })
        .catch(() => { throw new SystemError('conection error') })
        .then(response => {
            if (response.status === 200) {
                return response.json()
                    .catch(() => { throw new SystemError('conection error') })
                    .then(user => user)
            }

            return response.json()
                .catch(() => { throw new SystemError('conection error') })
                .then(body => {
                    const { error, message } = body
                    const constructor = errors[error]
                    throw new constructor(message)
                })
        })
}

export default getUserName