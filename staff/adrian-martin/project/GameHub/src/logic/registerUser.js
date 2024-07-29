import validate from "com/validate.js"
import errors, { SystemError } from "com/errors.js"

const registerUser = (name, username, email, password) => {
    validate.name(name)
    validate.username(username)
    validate.email(email)
    validate.password(password)

    return fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, username, email, password })
    })
        .catch(() => { throw new SystemError('Connection error') })
        .then(response => {
            if (response.status === 201) {
                console.log('User registered')
                return
            }

            return response.json()
                .catch(() => { throw new SystemError('Connection error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default registerUser