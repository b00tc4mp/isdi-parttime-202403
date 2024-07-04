import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const registerUser = (name, surname, email, username, password, passwordRepeat, callback) => {
    validate.name(name)
    validate.name(surname, 'surname')
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.passwordsMatch(password, passwordRepeat)
    validate.callback(callback)

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        if (xhr.status === 201) {
            callback(null)

            return
        }

        try {
            const { error, message } = JSON.parse(xhr.response)

            const constructor = errors[error]

            callback(new constructor(message))
        } catch (error) {
            callback(new SystemError(error.message))
        }
    }

    xhr.onerror = () => callback(new SystemError('netword error'))

    xhr.open('POST', `${import.meta.env.VITE_API_URL}/users`)

    const body = { name, surname, email, username, password, passwordRepeat }

    const json = JSON.stringify(body)

    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(json)
}

export default registerUser