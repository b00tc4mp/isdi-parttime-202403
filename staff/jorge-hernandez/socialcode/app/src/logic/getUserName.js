import errors from "com/errors"
import validate from "com/validate"

import extractPayloadFromJWT from '../utils/extractPayloadFromJWT'

const getUserName = (callback) => {
    validate.callback(callback)

    const { sub: userId } = extractPayloadFromJWT(sessionStorage.token)

    const xhr = new XMLHttpRequest

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

    xhr.open('GET', `${import.meta.env.VITE_API_URL}/users/${userId}`)

    xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.token}`)

    xhr.send()
}

export default getUserName