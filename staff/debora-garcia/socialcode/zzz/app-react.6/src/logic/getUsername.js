import errors from "../errors"
import extractPayloadFormJWT from "../utils/extractPayloadFormJWT"

const getUsername = callback => {
    if (typeof callback !== "function")
        throw new TypeError("callback is not a function")

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

    xhr.open("GET", `http://localhost:8080/users/${username}`)

    xhr.setRequestHeader("Authorization", `Bearer ${sessionStorage.token}`)

    xhr.send()
}

export default getUsername
