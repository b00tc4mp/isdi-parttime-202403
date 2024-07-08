import errors, { SystemError } from "com/errors"
import validate from "com/validate"

const loginUser = (username, password, callback) => {
    validate.username(username)
    validate.password(password)
    validate.callback(callback)

    fetch(`${import.meta.env.VITE_API_URL}/users/auth`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({ username, password })
    })
        .then(response => {
            if (response.status === 200) {
                return response.json()
                    .then(token => {
                        sessionStorage.token = token

                        callback(null)
                    })
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

export default loginUser