import errors from "com/errors"
import extractPayloadFormJWT from "../utils/extractPayloadFormJWT"
import validate from "com/validate"

const getUsername = callback => {
    validate.callback(callback)

    const { sub: username } = extractPayloadFormJWT(sessionStorage.token)

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        if (xhr.status === 200) {
            const username = JSON.parse(xhr.response)

            callback(null, username)

            return
        }

        const { error, message } = JSON.parse(xhr.response)

        const constructor = errors[error]

        callback(new constructor(message))
    }

    xhr.open("GET", `${import.meta.env.VITE_API_URL}/users/${username}`)

    xhr.setRequestHeader("Authorization", `Bearer ${sessionStorage.token}`)

    xhr.send()
}

export default getUsername
