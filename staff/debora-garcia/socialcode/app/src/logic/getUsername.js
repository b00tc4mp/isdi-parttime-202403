import errors from "com/errors"
import extractPayloadFormJWT from "../utils/extractPayloadFormJWT"
import validate from "com/validate"

const getUsername = callback => {
    validate.callback(callback)

    const { sub: userId } = extractPayloadFormJWT(sessionStorage.token)

    fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }
    })
        .then(response => {
            if (response.status === 200) {

                return response.json()
                    .then(username => callback(null, username))

            }
            return response.json()
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    callback(new constructor(message))
                })
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))

}

export default getUsername
