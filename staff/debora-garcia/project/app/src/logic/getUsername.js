import errors, { SystemError } from "com/errors"
import extractPayloadFormJWT from "../utils/extractPayloadFormJWT"

const getUsername = () => {
    const { sub: userId } = extractPayloadFormJWT(sessionStorage.token)

    return fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }
    })
        .catch(() => { throw new SystemError("server error") })
        .then(response => {
            if (response.status === 200) {
                return response.json()
                    .catch(() => { throw new SystemError("server error") })
                    .then(username => username)
            }
            return response.json()
                .catch(() => { throw new SystemError("server error") })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })

}

export default getUsername