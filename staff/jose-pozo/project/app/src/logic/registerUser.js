import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const registerUser = (username, email, password, passwordRepeat) => {
    validate.username(username)
    validate.email(email)
    validate.password(password)
    validate.passwordsMatch(password, passwordRepeat)

    return fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            email,
            password,
            passwordRepeat
        })
    })
        .catch(() => { throw new SystemError('connection error') })
        .then(response => {
            if (response.status === 201) {
                return
            }

            return response.json()
                .catch(() => { throw new SystemError('connection error') })
                .then(body => {
                    const { error, message } = body
                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default registerUser
