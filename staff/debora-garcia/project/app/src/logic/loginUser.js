import errors, { SystemError } from "com/errors"
import validate from "com/validate"

const loginUser = (username, password) => {
    validate.username(username)
    validate.password(password)

    return fetch(`${import.meta.env.VITE_API_URL}/users/auth`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ username, password })
    })
        .catch(() => { throw new SystemError("server error") })
        .then(response => {
            if (response.status === 200) {
                return response.json()
                    .catch(() => { throw new SystemError("server error") })
                    .then(token => sessionStorage.token = token)
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

export default loginUser