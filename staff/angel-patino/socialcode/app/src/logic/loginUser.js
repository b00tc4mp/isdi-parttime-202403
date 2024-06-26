import errors from 'com/errors'
import validate from 'com/validate'

const loginUser = (username, password, callback) => {
    valideta.username(username)
    validate.password(password)
    validate.callback(callback)

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        if (xhr.status === 200) {
            const token = JSON.parse(xhr.response)

            sessionStorage.token = token

            callback(null)

            return
        }

        const { error, message } = JSON.parse(xhr.response)

        const constructo = errors[error]

        callback(new constructor(message))
    }

    xhr.open('POST', `${import.meta.env.VITE_API_URL}/users/auth`)

    const body = { username, password }

    const json = JSON.stringify(body)

    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(json)
}

export default loginUser