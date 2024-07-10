import errors, { SystemError } from "com/error"
import validate from "com/validate"

const loginUser = (username, password) => {
    validate.username(username)
    validate.password(password)

    // const xhr = new XMLHttpRequest

    // xhr.onload = () => {
    //     if (xhr.status === 200) {
    //         const token = JSON.parse(xhr.response)
    //         sessionStorage.token = token

    //         callback(null)

    //         return
    //     }

    //     const { error, message } = JSON.parse(xhr.response)

    //     const constructor = errors[error]

    //     callback(new constructor(message))
    // }

    // xhr.open('POST', `${import.meta.env.VITE_API_URL}/users/auth`)

    // const body = { username, password }

    // const json = JSON.stringify(body)

    // xhr.setRequestHeader('Content-Type', 'application/json')
    // xhr.send(json)

    return fetch(`${import.meta.env.VITE_API_URL}/users/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
        .catch(() => { throw new SystemError('server error') })
        .then(response => {
            if (response.status === 200) {
                callback(null)

                return response.json()
                    .catch(() => {throw new SystemError('server error')})
                    .then(token => sessionStorage.token = token)

            }

            return response.json()
                .catch(() => { throw new SystemError('server error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })

        })
}

export default loginUser