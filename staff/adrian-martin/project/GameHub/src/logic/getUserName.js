import errors, { SystemError } from "com/errors";
import extractPayloadFromJWT from "../util/extractPayloadFromJWT";

const getUserName = () => {
    const { sub: userId } = extractPayloadFromJWT(sessionStorage.token)

    return fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            if (response.status === 200)
                return response.json()
                    .catch(() => { throw new SystemError('Connection error') })
                    .then(username => username)

            return response.json()
                .catch(() => { throw new SystemError('Connection error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default getUserName