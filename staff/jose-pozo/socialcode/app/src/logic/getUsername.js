import errors from '../errors'

import extractPayloadFromJWT from '../utils/extractPayloadFromJWT'

const getUserName = callback => {
    if (typeof callback !== 'function')
        throw new TypeError('callback is not a function')

    const xhr = new XMLHttpRequest

    const { sub: username } = extractPayloadFromJWT(sessionStorage.token)

    xhr.onload = () => {
        if (xhr.status === 200) {
            const name = JSON.parse(xhr.response)

            callback(null, name)

            return
        }

        const { error, message } = JSON.parse(xhr.response)

        const constructor = errors[error]

        callback(new constructor(message))
    }

    xhr.open('GET', `http://localhost:8080/users/${username}`)

    xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.token}`)

    xhr.send()
}


export default getUserName